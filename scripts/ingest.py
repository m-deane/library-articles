#!/usr/bin/env python3
"""
ingest.py — Phase 2 auto-ingest for Claude Code JSX article artifacts.

Watches library-articles/articles/ for new .jsx files, validates them by
running build.py in a sandboxed copy, and if clean runs the real build +
jsx_to_markdown extractor in-place, commits, and pushes to both remotes
(hf + github). Intended to run every few minutes via launchd.

Python stdlib only — no third-party deps.
"""

from __future__ import annotations

import datetime as _dt
import fcntl
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import traceback
from pathlib import Path
from typing import Optional


# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------

SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR.parent  # .../library-articles/
ARTICLES_DIR = REPO_ROOT / "articles"
ASSETS_DIR = REPO_ROOT / "assets"
TOOLS_DIR = REPO_ROOT / "tools"
BUILD_SCRIPT = REPO_ROOT / "build.py"
JSX_TO_MD_SCRIPT = REPO_ROOT / "jsx_to_markdown.py"

LOCK_FILE = ARTICLES_DIR / ".ingest.lock"
INGESTED_JSON = ARTICLES_DIR / "_ingested.json"
REJECTED_DIR = ARTICLES_DIR / "_rejected"
HALTED_MARKER = ARTICLES_DIR / "_INGEST_HALTED"
RUN_LEDGER = ARTICLES_DIR / "_run_ledger.json"  # tracks last N run outcomes

# Regex for allowed slug filenames: lowercase + digits + hyphens
SLUG_RE = re.compile(r"^[a-z0-9][a-z0-9-]{2,80}\.jsx$")


# ---------------------------------------------------------------------------
# Logging helpers
# ---------------------------------------------------------------------------

def _stamp() -> str:
    return _dt.datetime.now(_dt.timezone.utc).isoformat(timespec="seconds")


def log(msg: str) -> None:
    print(f"[{_stamp()}] {msg}", flush=True)


def notify(message: str, title: str = "Article Ingest") -> None:
    """Fire a macOS notification via osascript. Best-effort, never raises."""
    try:
        # Escape double quotes for AppleScript
        safe_msg = message.replace('"', '\\"')
        safe_title = title.replace('"', '\\"')
        subprocess.run(
            [
                "osascript",
                "-e",
                f'display notification "{safe_msg}" with title "{safe_title}"',
            ],
            check=False,
            capture_output=True,
            timeout=10,
        )
    except Exception:  # noqa: BLE001
        pass


# ---------------------------------------------------------------------------
# Keychain / secrets
# ---------------------------------------------------------------------------

def get_hf_token() -> Optional[str]:
    """Read HF token from macOS Keychain. Return None if absent."""
    try:
        result = subprocess.run(
            [
                "security",
                "find-generic-password",
                "-s",
                "hf_token",
                "-a",
                "helwyr55",
                "-w",
            ],
            capture_output=True,
            text=True,
            check=True,
            timeout=15,
        )
        token = result.stdout.strip()
        return token or None
    except (subprocess.CalledProcessError, subprocess.TimeoutExpired):
        return None


# ---------------------------------------------------------------------------
# Persistent state (ingested + run ledger)
# ---------------------------------------------------------------------------

def load_json_list(path: Path) -> list:
    if not path.exists():
        return []
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
        return data if isinstance(data, list) else []
    except Exception:  # noqa: BLE001
        return []


def save_json_list(path: Path, data: list) -> None:
    path.write_text(json.dumps(data, indent=2), encoding="utf-8")


def append_ingested(entry: dict) -> None:
    data = load_json_list(INGESTED_JSON)
    data.append(entry)
    save_json_list(INGESTED_JSON, data)


def record_run_outcome(had_failure: bool) -> list:
    """Append a run outcome record; trim to last 3; return current list."""
    data = load_json_list(RUN_LEDGER)
    data.append({"ts": _stamp(), "failure": bool(had_failure)})
    data = data[-3:]
    save_json_list(RUN_LEDGER, data)
    return data


def three_strike_triggered(ledger: list) -> bool:
    if len(ledger) < 3:
        return False
    return all(entry.get("failure") for entry in ledger[-3:])


# ---------------------------------------------------------------------------
# Locking
# ---------------------------------------------------------------------------

class LockHeld(Exception):
    pass


def acquire_lock():
    """Non-blocking flock on the lock file. Returns the fh handle."""
    ARTICLES_DIR.mkdir(parents=True, exist_ok=True)
    fh = open(LOCK_FILE, "a+")  # noqa: SIM115  (kept open for process lifetime)
    try:
        fcntl.flock(fh.fileno(), fcntl.LOCK_EX | fcntl.LOCK_NB)
    except BlockingIOError as exc:
        fh.close()
        raise LockHeld("lock already held") from exc
    return fh


# ---------------------------------------------------------------------------
# Candidate discovery + validation
# ---------------------------------------------------------------------------

def find_candidates() -> list[Path]:
    """Return .jsx files that are new (no .html sibling, or .html older)."""
    if not ARTICLES_DIR.exists():
        return []
    cands: list[Path] = []
    for jsx in sorted(ARTICLES_DIR.glob("*.jsx")):
        html = jsx.with_suffix(".html")
        if not html.exists() or html.stat().st_mtime < jsx.stat().st_mtime:
            cands.append(jsx)
    return cands


def validate_filename(jsx: Path) -> Optional[str]:
    if not SLUG_RE.match(jsx.name):
        return (
            f"filename {jsx.name!r} does not match "
            r"^[a-z0-9][a-z0-9-]{2,80}\.jsx$"
        )
    return None


def validate_content(source: str) -> Optional[str]:
    if "const ARTICLE_DATA" not in source:
        return "missing `const ARTICLE_DATA` declaration"
    if "export default" not in source:
        return "missing `export default`"
    return None


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()


def already_ingested(sha: str) -> bool:
    for entry in load_json_list(INGESTED_JSON):
        if entry.get("sha256") == sha:
            return True
    return False


# ---------------------------------------------------------------------------
# Sandbox validation
# ---------------------------------------------------------------------------

def sandbox_validate(jsx: Path) -> tuple[bool, str]:
    """
    Copy just enough of the repo into a tempdir and run build.py there.
    Returns (ok, message). Aborts on non-zero exit or missing outputs.
    """
    tmp_root = Path(tempfile.mkdtemp(prefix="ingest-sandbox-"))
    try:
        # Mirror build.py + assets/ + tools/esbuild/
        # (esbuild is required for the Phase-1 pre-transpile path; without it
        # build.py falls back to raw JSX which the current template cannot
        # render at runtime.)
        shutil.copy2(BUILD_SCRIPT, tmp_root / "build.py")
        shutil.copytree(ASSETS_DIR, tmp_root / "assets")
        if TOOLS_DIR.exists():
            shutil.copytree(TOOLS_DIR, tmp_root / "tools")

        tmp_articles = tmp_root / "articles"
        tmp_articles.mkdir()
        shutil.copy2(jsx, tmp_articles / jsx.name)

        proc = subprocess.run(
            [sys.executable, "build.py"],
            cwd=tmp_root,
            capture_output=True,
            text=True,
            timeout=180,
        )
        if proc.returncode != 0:
            return False, (
                f"sandbox build.py exit={proc.returncode}\n"
                f"stdout:\n{proc.stdout[-2000:]}\n"
                f"stderr:\n{proc.stderr[-2000:]}"
            )

        slug = jsx.stem
        expected = [
            tmp_articles / f"{slug}.html",
            tmp_articles / f"{slug}.meta.json",
            tmp_root / "index.html",
            tmp_root / "_manifest.json",
        ]
        missing = [str(p.relative_to(tmp_root)) for p in expected if not p.exists()]
        if missing:
            return False, f"sandbox missing outputs: {missing}"

        return True, "sandbox ok"
    finally:
        shutil.rmtree(tmp_root, ignore_errors=True)


# ---------------------------------------------------------------------------
# Git helpers
# ---------------------------------------------------------------------------

def run_git(args: list[str], *, env: Optional[dict] = None) -> subprocess.CompletedProcess:
    return subprocess.run(
        ["git", *args],
        cwd=REPO_ROOT,
        capture_output=True,
        text=True,
        timeout=300,
        env=env,
    )


def current_commit_sha() -> Optional[str]:
    proc = run_git(["rev-parse", "HEAD"])
    if proc.returncode != 0:
        return None
    return proc.stdout.strip() or None


def git_commit(slug: str) -> tuple[bool, str]:
    add = run_git(["add", "-A"])
    if add.returncode != 0:
        return False, f"git add failed: {add.stderr.strip()}"
    status = run_git(["status", "--porcelain"])
    if not status.stdout.strip():
        return False, "no changes to commit"
    commit = run_git(["commit", "-m", f"auto-ingest: {slug}"])
    if commit.returncode != 0:
        return False, f"git commit failed: {commit.stderr.strip()}"
    return True, commit.stdout.strip()


def git_soft_reset_one() -> None:
    run_git(["reset", "--soft", "HEAD~1"])


def build_push_env(hf_token: Optional[str]) -> dict:
    env = os.environ.copy()
    # HF push uses an https remote; token is typically injected via askpass or
    # via a credential helper. We set common env vars that huggingface_hub /
    # git-credential-helpers understand if configured.
    if hf_token:
        env["HF_TOKEN"] = hf_token
        env["HUGGING_FACE_HUB_TOKEN"] = hf_token
    return env


def git_push_remote(remote: str, env: dict) -> tuple[bool, str]:
    proc = run_git(["push", remote, "main"], env=env)
    if proc.returncode != 0:
        return False, (proc.stderr.strip() or proc.stdout.strip() or "push failed")
    return True, "ok"


# ---------------------------------------------------------------------------
# Processing a single candidate
# ---------------------------------------------------------------------------

def move_to_rejected(jsx: Path, reason: str) -> None:
    try:
        REJECTED_DIR.mkdir(parents=True, exist_ok=True)
        ts = _dt.datetime.now(_dt.timezone.utc).strftime("%Y%m%dT%H%M%SZ")
        dest = REJECTED_DIR / f"{jsx.stem}.{ts}.jsx"
        shutil.move(str(jsx), str(dest))
        (REJECTED_DIR / f"{jsx.stem}.{ts}.reason.txt").write_text(
            reason + "\n", encoding="utf-8"
        )
        log(f"  rejected -> {dest}")
    except Exception as exc:  # noqa: BLE001
        log(f"  rejection move failed: {exc}")


def process_candidate(jsx: Path, hf_token: Optional[str]) -> bool:
    """
    Validate + build + commit + push one candidate. Returns True on success.
    On failure, moves candidate to _rejected/ and fires a notification.
    """
    slug = jsx.stem
    log(f"candidate: {jsx.name}")

    # Snapshot the HEAD before we do anything; if commit succeeds and a later
    # step fails we can reset it.
    pre_sha = current_commit_sha()

    # 1. Filename
    err = validate_filename(jsx)
    if err:
        log(f"  reject: {err}")
        move_to_rejected(jsx, err)
        notify(f"Ingest failed: {slug}")
        return False

    # 2. Content sanity
    try:
        source = jsx.read_text(encoding="utf-8")
    except Exception as exc:  # noqa: BLE001
        err = f"read error: {exc}"
        log(f"  reject: {err}")
        move_to_rejected(jsx, err)
        notify(f"Ingest failed: {slug}")
        return False

    err = validate_content(source)
    if err:
        log(f"  reject: {err}")
        move_to_rejected(jsx, err)
        notify(f"Ingest failed: {slug}")
        return False

    # 3. Dedup via sha256
    sha = sha256_file(jsx)
    if already_ingested(sha):
        err = "duplicate sha256 (already ingested)"
        log(f"  reject: {err}")
        move_to_rejected(jsx, err)
        notify(f"Ingest failed: {slug}")
        return False

    # 4. Sandbox build
    ok, msg = sandbox_validate(jsx)
    if not ok:
        log(f"  reject: sandbox validate failed\n{msg}")
        move_to_rejected(jsx, f"sandbox build failed\n{msg}")
        notify(f"Ingest failed: {slug}")
        return False
    log("  sandbox validate ok")

    commit_made = False
    try:
        # 5. In-place build
        proc = subprocess.run(
            [sys.executable, "build.py"],
            cwd=REPO_ROOT,
            capture_output=True,
            text=True,
            timeout=300,
        )
        if proc.returncode != 0:
            raise RuntimeError(
                f"in-place build.py failed ({proc.returncode}): "
                f"{proc.stderr[-1000:]}"
            )
        log("  in-place build ok")

        # 6. jsx_to_markdown extractor
        proc = subprocess.run(
            [sys.executable, str(JSX_TO_MD_SCRIPT)],
            cwd=REPO_ROOT,
            capture_output=True,
            text=True,
            timeout=300,
        )
        if proc.returncode != 0:
            # Don't abort for jsx_to_markdown failure — log a warning but
            # keep going. Markdown mirror is a secondary artifact.
            log(
                "  warn: jsx_to_markdown.py non-zero "
                f"({proc.returncode}); continuing.\n"
                f"  stderr: {proc.stderr[-600:]}"
            )
        else:
            log("  jsx_to_markdown ok")

        # 7. Commit
        ok, msg = git_commit(slug)
        if not ok:
            raise RuntimeError(f"commit stage: {msg}")
        commit_made = True
        commit_sha = current_commit_sha() or ""
        log(f"  committed {commit_sha[:12]}")

        # 8. Push
        push_status = {"hf": "skipped", "github": "pending"}
        env = build_push_env(hf_token)

        if hf_token is None:
            log(
                "  HF token missing. To enable auto-push:\n"
                "    security add-generic-password -s hf_token "
                "-a helwyr55 -w <token>"
            )
            push_status["hf"] = "skipped-no-token"
        else:
            ok, msg = git_push_remote("hf", env)
            push_status["hf"] = "ok" if ok else f"failed: {msg[:200]}"
            log(f"  push hf: {push_status['hf']}")

        ok, msg = git_push_remote("github", env)
        push_status["github"] = "ok" if ok else f"failed: {msg[:200]}"
        log(f"  push github: {push_status['github']}")

        # 9. Append to ingested ledger
        append_ingested(
            {
                "slug": slug,
                "sha256": sha,
                "ingested_at": _stamp(),
                "commit_sha": commit_sha,
                "push_status": push_status,
                "source": "library-articles/articles",
            }
        )

        log(f"  INGESTED {slug}")
        return True

    except Exception as exc:  # noqa: BLE001
        log(f"  ERROR: {exc}")
        log(traceback.format_exc())
        if commit_made:
            try:
                git_soft_reset_one()
                log("  rolled back commit via soft reset")
            except Exception as exc2:  # noqa: BLE001
                log(f"  soft reset failed: {exc2}")
        # Only move the jsx to rejected if it still exists where we expect.
        if jsx.exists():
            move_to_rejected(jsx, f"processing error: {exc}")
        notify(f"Ingest failed: {slug}")
        # Clean up any untracked build artefacts so the repo stays tidy.
        run_git(["checkout", "--", "."])
        # also ensure HEAD matches pre_sha (it should after soft reset, but
        # be defensive).
        if pre_sha:
            post = current_commit_sha()
            if post and post != pre_sha:
                log(f"  warn: HEAD drift pre={pre_sha[:12]} post={post[:12]}")
        return False


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> int:
    ARTICLES_DIR.mkdir(parents=True, exist_ok=True)

    # Circuit breaker
    if HALTED_MARKER.exists():
        log(
            f"HALTED marker present at {HALTED_MARKER}. "
            "Remove it to resume ingest."
        )
        return 0

    try:
        lock_fh = acquire_lock()
    except LockHeld:
        log("another ingest run is holding the lock; exiting.")
        return 0

    try:
        if not BUILD_SCRIPT.exists():
            log(f"missing build.py at {BUILD_SCRIPT}; exiting.")
            return 0
        if not ASSETS_DIR.exists():
            log(f"missing assets/ at {ASSETS_DIR}; exiting.")
            return 0

        candidates = find_candidates()
        if not candidates:
            log("no new candidates; exiting.")
            record_run_outcome(had_failure=False)
            return 0

        log(f"found {len(candidates)} candidate(s): "
            f"{[c.name for c in candidates]}")

        hf_token = get_hf_token()
        if hf_token is None:
            log(
                "HF token not in Keychain. Install with:\n"
                "  security add-generic-password -s hf_token "
                "-a helwyr55 -w <token>"
            )

        any_failure = False
        any_success = False
        for jsx in candidates:
            try:
                ok = process_candidate(jsx, hf_token)
            except Exception as exc:  # noqa: BLE001
                log(f"uncaught error on {jsx.name}: {exc}")
                log(traceback.format_exc())
                ok = False
            if ok:
                any_success = True
            else:
                any_failure = True

        # Record run outcome. "Failure" for circuit-breaker purposes = any
        # candidate failed AND none succeeded (so pure-success or mixed
        # successful runs don't trip the breaker).
        run_failure = any_failure and not any_success
        ledger = record_run_outcome(had_failure=run_failure)

        if three_strike_triggered(ledger):
            HALTED_MARKER.write_text(
                f"Halted at {_stamp()} after three consecutive failing "
                "ingest runs.\n"
                "Inspect articles/_rejected/ and ~/Library/Logs/"
                "article-ingest.log, then delete this file to resume.\n",
                encoding="utf-8",
            )
            log(f"THREE-STRIKE: wrote halt marker {HALTED_MARKER}")
            notify(
                "Three consecutive failing runs — ingest halted.",
                title="Article Ingest",
            )

        return 0
    finally:
        try:
            fcntl.flock(lock_fh.fileno(), fcntl.LOCK_UN)
        except Exception:  # noqa: BLE001
            pass
        try:
            lock_fh.close()
        except Exception:  # noqa: BLE001
            pass


if __name__ == "__main__":
    sys.exit(main())
