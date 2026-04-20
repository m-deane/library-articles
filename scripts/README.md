# Article Auto-Ingest (Phase 2)

Automated pickup of Claude Code JSX article artifacts dropped into
`library-articles/articles/`. A launchd LaunchAgent runs
`scripts/ingest.py` every 5 minutes; each run discovers any new `.jsx`
files, validates them in a sandboxed copy of the repo, runs the real
`build.py` + `jsx_to_markdown.py`, commits, and pushes to both HF Spaces
and GitHub.

Python stdlib only — no pip installs required.

---

## What it does

1. Acquires an `fcntl` lock on `articles/.ingest.lock` (non-blocking —
   overlapping invocations just no-op).
2. Scans `articles/*.jsx` for "new" files: no sibling `.html`, or
   `.html` mtime older than `.jsx` mtime.
3. For each candidate:
   - Filename must match `^[a-z0-9][a-z0-9-]{2,80}\.jsx$`.
   - Content must contain both `const ARTICLE_DATA` and `export default`.
   - SHA-256 of file deduped against `articles/_ingested.json`.
   - Copies the file + `build.py` + `assets/` into a `tempfile.mkdtemp()`
     sandbox and runs `python3 build.py` there. Any non-zero exit or
     missing expected output aborts.
   - On pass: runs real `build.py` in-place, runs `jsx_to_markdown.py`
     (soft-failure only — markdown mirror is secondary), then
     `git add -A && git commit -m "auto-ingest: {slug}"`.
   - Pushes: `git push hf main` then `git push github main`. HF push is
     skipped with a clear log message if the Keychain token is missing.
4. On any failure: rolls back the commit (`git reset --soft HEAD~1`),
   moves the candidate to `articles/_rejected/{slug}.{ISO8601}.jsx`, and
   fires an `osascript` notification.
5. Appends a record to `articles/_ingested.json` with slug, sha256,
   ingested_at, commit_sha, push_status, source.
6. Three-strike circuit breaker: if the last 3 runs all produced
   failures, writes `articles/_INGEST_HALTED` — subsequent runs exit
   immediately until the operator deletes that marker.

## Files

| Path | Purpose |
| ---- | ------- |
| `scripts/ingest.py` | The ingest driver (stdlib only). |
| `scripts/launchd/com.mdeane.article-ingest.plist` | LaunchAgent definition. |
| `scripts/install.sh` | Copies the plist into `~/Library/LaunchAgents/` and bootstraps. |
| `articles/_ingested.json` | Append-only ledger of ingested files. |
| `articles/_run_ledger.json` | Last 3 run outcomes (for circuit-breaker). |
| `articles/_rejected/` | Quarantined failing candidates + reason files. |
| `articles/_INGEST_HALTED` | Circuit-breaker marker (delete to resume). |
| `articles/.ingest.lock` | flock target for overlap prevention. |

## Install

```bash
./scripts/install.sh
```

That copies the plist, `bootout`s any existing version, then
`bootstrap`s the new one into `gui/$(id -u)`. First run fires at load
(`RunAtLoad=true`) and then every 300 seconds.

## Secrets (HF token)

The ingest reads the HF token from Keychain at runtime:

```bash
security find-generic-password -s hf_token -a helwyr55 -w
```

If absent, HF push is skipped and the log prints the install command:

```bash
security add-generic-password -s hf_token -a helwyr55 -w <token>
```

GitHub push continues regardless (uses your existing credential
helper / SSH config).

## Inspect activity

```bash
# live log
tail -f ~/Library/Logs/article-ingest.log

# stderr (should normally be empty)
tail -f ~/Library/Logs/article-ingest.err

# last 5 ingested records
jq '.[-5:]' articles/_ingested.json

# launchd status
launchctl list | grep article-ingest
```

## Pause / resume

Unload the LaunchAgent:

```bash
launchctl bootout gui/$(id -u) ~/Library/LaunchAgents/com.mdeane.article-ingest.plist
```

Re-load with `./scripts/install.sh`.

## Clear the circuit breaker

After investigating `articles/_rejected/` and the log, run:

```bash
rm articles/_INGEST_HALTED
```

The next scheduled run will resume normally.

## Manual run

```bash
cd /Users/matthewdeane/Documents/Data\ Science/python/_projects/____p-library/library-articles
python3 scripts/ingest.py
```

Safe to invoke any time — it no-ops if no new files are present or if
another run is holding the lock.
