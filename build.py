#!/usr/bin/env python3
"""
build.py — Convert articles/*.jsx into static HTML wrappers that render
in-browser (pre-transpiled JSX; see assets/template.html).

stdlib only for the default path. Safe to run repeatedly; regenerates all
*.html / *.meta.json / index.html / _manifest.json from the .jsx sources.

Usage:
    python3 build.py                  # fast path — HTML + metadata only
    python3 build.py --pdf            # also render per-article PDFs
    BUILD_PDFS=1 python3 build.py     # same, env-var form (used by CI)

PDF rendering requires Playwright + Chromium:
    pip install -r requirements-build.txt && playwright install chromium

When PDFs are built, the whole-library ZIP (library-articles-offline.zip)
is also built at the repo root for plane-trip offline reading.
"""

from __future__ import annotations

import datetime as _dt
import html
import json
import os
import platform
import re
import subprocess
import sys
import time
import zipfile
from pathlib import Path


ROOT = Path(__file__).resolve().parent
ARTICLES_DIR = ROOT / "articles"
ASSETS_DIR = ROOT / "assets"
TOOLS_DIR = ROOT / "tools" / "esbuild"
TEMPLATE_PATH = ASSETS_DIR / "template.html"
INDEX_TEMPLATE_PATH = ASSETS_DIR / "index-template.html"
INDEX_OUT = ROOT / "index.html"
MANIFEST_OUT = ROOT / "_manifest.json"
ZIP_OUT = ROOT / "library-articles-offline.zip"


# -------------------------------------------------------------------
# esbuild — JSX pre-transpile (replaces runtime Babel Standalone)
# -------------------------------------------------------------------

def _esbuild_binary() -> Path | None:
    """Locate a bundled esbuild static binary for the current platform.

    We commit pinned esbuild binaries under tools/esbuild/ so local builds
    and CI agree on output. Fall back to a system-installed esbuild on PATH.
    """
    system = platform.system().lower()
    machine = platform.machine().lower()
    candidates: list[Path] = []
    if system == "darwin":
        if "arm" in machine or "aarch64" in machine:
            candidates.append(TOOLS_DIR / "esbuild-darwin-arm64")
        else:
            candidates.append(TOOLS_DIR / "esbuild-darwin-x64")
    elif system == "linux":
        if "aarch64" in machine or "arm64" in machine:
            candidates.append(TOOLS_DIR / "esbuild-linux-arm64")
        else:
            candidates.append(TOOLS_DIR / "esbuild-linux-x64")
    for c in candidates:
        if c.exists():
            return c
    # Fall back to system PATH
    from shutil import which
    which_path = which("esbuild")
    if which_path:
        return Path(which_path)
    return None


_ESBUILD_WARNED = False


def transpile_jsx(jsx_source: str) -> str:
    """Transpile a JSX source string to plain JS using esbuild (classic mode).

    Uses --jsx=transform which emits React.createElement(...) calls. These
    resolve against the UMD React global loaded ahead of the transpiled
    payload, so we can drop Babel Standalone at runtime.

    Returns the transpiled JS. If esbuild is unavailable, logs a warning once
    and returns the original JSX unchanged — the caller's template must then
    keep Babel Standalone as a fallback.
    """
    global _ESBUILD_WARNED
    binary = _esbuild_binary()
    if binary is None:
        if not _ESBUILD_WARNED:
            print(
                "[warn] esbuild not found; JSX will not be pre-transpiled. "
                "Install a static binary under tools/esbuild/ "
                "(e.g. esbuild-darwin-arm64 or esbuild-linux-x64) "
                "or put `esbuild` on PATH. Falling back to raw JSX output.",
                file=sys.stderr,
            )
            _ESBUILD_WARNED = True
        return jsx_source

    try:
        proc = subprocess.run(
            [
                str(binary),
                "--loader=jsx",
                "--jsx=transform",
                "--target=es2018",
            ],
            input=jsx_source,
            capture_output=True,
            text=True,
            check=True,
        )
    except subprocess.CalledProcessError as e:
        err = (e.stderr or "").strip()
        raise RuntimeError(f"esbuild failed: {err or e}") from e
    return proc.stdout


# -------------------------------------------------------------------
# Regex patterns
# -------------------------------------------------------------------

FRONTMATTER_RE = re.compile(r"^/\*\s*---\s*\n(.*?)\n\s*---\s*\*/", re.DOTALL)
# Matches `const ARTICLE_DATA = { ... };` — we capture the { ... } body.
ARTICLE_DATA_RE = re.compile(
    r"const\s+ARTICLE_DATA\s*=\s*(\{[\s\S]*?\})\s*;",
    re.MULTILINE,
)
IMPORT_RE = re.compile(
    r"^\s*import\s+.*?from\s+['\"][^'\"]+['\"]\s*;?\s*$",
    re.MULTILINE,
)
# Bare `import 'foo';`
IMPORT_BARE_RE = re.compile(
    r"^\s*import\s+['\"][^'\"]+['\"]\s*;?\s*$",
    re.MULTILINE,
)
EXPORT_DEFAULT_NAMED_RE = re.compile(
    r"^\s*export\s+default\s+(\w+)\s*;?\s*$",
    re.MULTILINE,
)
EXPORT_DEFAULT_FUNC_RE = re.compile(
    r"^(\s*)export\s+default\s+function\s+(\w+)\s*\(",
    re.MULTILINE,
)
EXPORT_DEFAULT_FUNC_ANON_RE = re.compile(
    r"^(\s*)export\s+default\s+function\s*\(",
    re.MULTILINE,
)
EXPORT_DEFAULT_ARROW_RE = re.compile(
    r"^(\s*)export\s+default\s+(\([^)]*\)\s*=>|\w+\s*=>)",
    re.MULTILINE,
)
EXPORT_NAMED_RE = re.compile(
    r"^\s*export\s+\{[^}]*\}\s*;?\s*$",
    re.MULTILINE,
)
# `export const Foo = ...` / `export function Foo(...)` — strip the leading `export `
EXPORT_CONST_RE = re.compile(
    r"^(\s*)export\s+(const|let|var|function|class)\s+",
    re.MULTILINE,
)


# -------------------------------------------------------------------
# Metadata extraction
# -------------------------------------------------------------------

def _unquote(s: str) -> str:
    s = s.strip().rstrip(",").strip()
    if (len(s) >= 2) and s[0] == s[-1] and s[0] in ("'", '"', '`'):
        return s[1:-1]
    return s


def _parse_js_object_lite(body: str) -> dict:
    """
    Very small JS-object literal parser — sufficient for ARTICLE_DATA with
    string/number values and simple arrays of strings. Not a JS parser.
    """
    out: dict = {}
    # Strip the enclosing braces
    body = body.strip()
    if body.startswith("{"):
        body = body[1:]
    if body.endswith("}"):
        body = body[:-1]

    # Split top-level by commas (naive, but good enough for flat ARTICLE_DATA)
    tokens: list[str] = []
    depth = 0
    cur: list[str] = []
    in_str: str | None = None
    i = 0
    while i < len(body):
        ch = body[i]
        if in_str:
            cur.append(ch)
            if ch == "\\" and i + 1 < len(body):
                cur.append(body[i + 1])
                i += 2
                continue
            if ch == in_str:
                in_str = None
            i += 1
            continue
        if ch in ("'", '"', '`'):
            in_str = ch
            cur.append(ch)
        elif ch in "[{(":
            depth += 1
            cur.append(ch)
        elif ch in "]})":
            depth -= 1
            cur.append(ch)
        elif ch == "," and depth == 0:
            tokens.append("".join(cur))
            cur = []
        else:
            cur.append(ch)
        i += 1
    if cur:
        tokens.append("".join(cur))

    for tok in tokens:
        tok = tok.strip()
        if not tok:
            continue
        # Split key : value at first colon that's at depth 0
        depth = 0
        in_str = None
        split_at = -1
        for idx, ch in enumerate(tok):
            if in_str:
                if ch == "\\":
                    continue
                if ch == in_str:
                    in_str = None
                continue
            if ch in ("'", '"', '`'):
                in_str = ch
                continue
            if ch in "[{(":
                depth += 1
            elif ch in "]})":
                depth -= 1
            elif ch == ":" and depth == 0:
                split_at = idx
                break
        if split_at < 0:
            continue
        key = _unquote(tok[:split_at])
        value = tok[split_at + 1:].strip().rstrip(",").strip()

        if value.startswith("["):
            # Array of strings
            inner = value.strip()[1:-1] if value.endswith("]") else value[1:]
            items = [_unquote(x) for x in _split_top_level(inner, ",") if x.strip()]
            out[key] = items
        elif value.startswith(("'", '"', '`')):
            out[key] = _unquote(value)
        elif value in ("true", "false"):
            out[key] = value == "true"
        else:
            # number or bare identifier — try number, else string
            try:
                out[key] = int(value)
            except ValueError:
                try:
                    out[key] = float(value)
                except ValueError:
                    out[key] = value
    return out


def _split_top_level(s: str, sep: str) -> list[str]:
    parts: list[str] = []
    depth = 0
    in_str: str | None = None
    cur: list[str] = []
    i = 0
    while i < len(s):
        ch = s[i]
        if in_str:
            cur.append(ch)
            if ch == "\\" and i + 1 < len(s):
                cur.append(s[i + 1])
                i += 2
                continue
            if ch == in_str:
                in_str = None
            i += 1
            continue
        if ch in ("'", '"', '`'):
            in_str = ch
            cur.append(ch)
        elif ch in "[{(":
            depth += 1
            cur.append(ch)
        elif ch in "]})":
            depth -= 1
            cur.append(ch)
        elif ch == sep and depth == 0:
            parts.append("".join(cur))
            cur = []
        else:
            cur.append(ch)
        i += 1
    if cur:
        parts.append("".join(cur))
    return parts


def _parse_frontmatter(yaml_like: str) -> dict:
    """
    Very small YAML-subset parser — key: value and key: [a, b, c].
    """
    out: dict = {}
    for raw_line in yaml_like.splitlines():
        line = raw_line.rstrip()
        if not line.strip() or line.strip().startswith("#"):
            continue
        if ":" not in line:
            continue
        k, v = line.split(":", 1)
        key = k.strip()
        value = v.strip()
        if not value:
            out[key] = ""
            continue
        if value.startswith("[") and value.endswith("]"):
            inner = value[1:-1]
            items = [_unquote(x) for x in _split_top_level(inner, ",") if x.strip()]
            out[key] = items
        elif (
            (value.startswith('"') and value.endswith('"'))
            or (value.startswith("'") and value.endswith("'"))
        ):
            out[key] = value[1:-1]
        else:
            out[key] = value
    return out


def _line_comment_meta(source: str) -> dict:
    """Look for leading `// key: value` lines at the top of the file."""
    out: dict = {}
    for raw_line in source.splitlines():
        line = raw_line.strip()
        if not line:
            continue
        if not line.startswith("//"):
            # Stop scanning once we hit non-comment content
            break
        body = line.lstrip("/").strip()
        if ":" in body:
            k, v = body.split(":", 1)
            key = k.strip().lower()
            value = v.strip()
            if value.startswith("[") and value.endswith("]"):
                inner = value[1:-1]
                items = [_unquote(x) for x in _split_top_level(inner, ",") if x.strip()]
                out[key] = items
            else:
                out[key] = _unquote(value) if value.startswith(("'", '"')) else value
    return out


def extract_metadata(source: str, slug: str) -> dict:
    """Extract metadata. Priority: frontmatter > ARTICLE_DATA > line comments > defaults."""
    meta: dict = {}

    m = FRONTMATTER_RE.match(source)
    if m:
        meta.update(_parse_frontmatter(m.group(1)))

    if not meta:
        m2 = ARTICLE_DATA_RE.search(source)
        if m2:
            try:
                meta.update(_parse_js_object_lite(m2.group(1)))
            except Exception as e:  # noqa: BLE001
                print(f"    [warn] ARTICLE_DATA parse failed for {slug}: {e}")

    if not meta:
        meta.update(_line_comment_meta(source))

    # Defaults
    meta.setdefault("title", slug.replace("-", " ").title())
    meta.setdefault("subtitle", "")
    meta.setdefault("date", "")
    meta.setdefault("tags", [])
    meta.setdefault("read_time", "")
    meta.setdefault("category", "general")
    meta.setdefault("style", "")
    return meta


# -------------------------------------------------------------------
# JSX transformation
# -------------------------------------------------------------------

def strip_frontmatter_comment(source: str) -> str:
    return FRONTMATTER_RE.sub("", source, count=1).lstrip("\n")


def process_jsx(source: str, slug: str) -> tuple[str, str]:
    """
    Strip ES module syntax, capture the default-exported component name.

    Returns (processed_jsx, component_name).
    """
    src = strip_frontmatter_comment(source)

    # Strip imports
    src = IMPORT_RE.sub("", src)
    src = IMPORT_BARE_RE.sub("", src)

    component_name: str | None = None

    # export default function ComponentName(...) { ... }
    m = EXPORT_DEFAULT_FUNC_RE.search(src)
    if m:
        component_name = m.group(2)
        src = EXPORT_DEFAULT_FUNC_RE.sub(r"\1function " + component_name + "(", src, count=1)

    # export default function(...) { ... }   — anon
    if component_name is None:
        m = EXPORT_DEFAULT_FUNC_ANON_RE.search(src)
        if m:
            component_name = "__DefaultExport"
            src = EXPORT_DEFAULT_FUNC_ANON_RE.sub(
                r"\1function " + component_name + "(", src, count=1,
            )

    # export default ComponentName;     — named reference
    if component_name is None:
        m = EXPORT_DEFAULT_NAMED_RE.search(src)
        if m:
            component_name = m.group(1)
            src = EXPORT_DEFAULT_NAMED_RE.sub("", src, count=1)

    # export default (...) => ...       — arrow
    if component_name is None:
        m = EXPORT_DEFAULT_ARROW_RE.search(src)
        if m:
            component_name = "__DefaultExport"
            # Replace just the `export default` with `const __DefaultExport =`
            src = EXPORT_DEFAULT_ARROW_RE.sub(
                r"\1const " + component_name + " = \2", src, count=1,
            )

    # Strip `export { ... };`
    src = EXPORT_NAMED_RE.sub("", src)

    # Strip `export ` prefix from `export const Foo = ...` / `export function Foo() {}`
    src = EXPORT_CONST_RE.sub(r"\1\2 ", src)

    if component_name is None:
        raise ValueError(
            f"{slug}: could not find a default export component. Expected one of:\n"
            f"  export default function ComponentName(...) {{...}}\n"
            f"  export default ComponentName;\n"
            f"  export default () => (...);"
        )

    return src, component_name


# -------------------------------------------------------------------
# Template rendering
# -------------------------------------------------------------------

def style_badge_html(style: str) -> str:
    if not style:
        return ""
    palette = {
        "technical-ds": "#7c4dff",
        "ddods": "#2196f3",
        "natgeo-classic": "#ff9800",
        "natgeo-sciam-hybrid": "#00acc1",
        "encyclopaedic": "#5d4037",
        "economist": "#e3120b",
        "travel-literary": "#8d6e63",
        "travel-photo-essay": "#6d4c41",
        "travel-service-hybrid": "#795548",
        "applied-project": "#4caf50",
    }
    color = palette.get(style, "#555")
    labels = {
        "technical-ds": "Technical DS",
        "ddods": "DDODS",
        "natgeo-classic": "NatGeo Classic",
        "natgeo-sciam-hybrid": "NatGeo SciAm",
        "encyclopaedic": "Encyclopaedic",
        "economist": "The Economist",
        "travel-literary": "Travel Literary",
        "travel-photo-essay": "Photo Essay",
        "travel-service-hybrid": "Travel Guide",
        "applied-project": "Applied Project",
    }
    label = labels.get(style, style)
    return (
        f'<span class="style-badge" style="background:{color}15; color:{color}; '
        f'border:1px solid {color}55;">{html.escape(label)}</span>'
    )


def category_emoji(category: str) -> str:
    mapping = {
        "machine-learning": "\U0001f916",
        "deep-learning": "\U0001f9e0",
        "time-series": "\U0001f4c8",
        "statistics": "\U0001f4ca",
        "data-engineering": "\U0001f527",
        "nlp": "\U0001f4ac",
        "python": "\U0001f40d",
        "feature-engineering": "\U0001f9ea",
        "mlops": "\u2699\ufe0f",
        "travel-photography": "\U0001f4f8",
        "science-nature": "\U0001f30d",
        "economics": "\U0001f4b9",
        "energy": "\u26a1",
        "history": "\U0001f4dc",
        "archaeology": "\U0001f3db\ufe0f",
        "neuroscience": "\U0001f9e0",
        "general": "\U0001f4d6",
    }
    return mapping.get(category, "\U0001f4d6")


def render_template(
    template: str,
    *,
    title: str,
    subtitle: str,
    date: str,
    read_time: str,
    style: str,
    category: str,
    tags: list,
    processed_jsx: str,
    component_name: str,
    slug: str,
) -> str:
    tags_html = " ".join(
        f'<span class="tag">{html.escape(str(t))}</span>' for t in (tags or [])
    )
    # We substitute with .replace — placeholders are literal `{{FOO}}` strings
    replacements = {
        "{{TITLE}}": html.escape(title),
        "{{SUBTITLE}}": html.escape(subtitle),
        "{{DATE}}": html.escape(str(date)),
        "{{READ_TIME}}": html.escape(read_time),
        "{{STYLE_BADGE}}": style_badge_html(style),
        "{{CATEGORY}}": html.escape(category),
        "{{TAGS_HTML}}": tags_html,
        "{{COMPONENT_NAME}}": component_name,
        "{{SLUG}}": html.escape(slug),
    }
    out = template
    for k, v in replacements.items():
        out = out.replace(k, v)
    # JS last — the transpiled payload can contain any characters, including
    # `{{foo}}` patterns, so substitute it after all smaller placeholders.
    # Templates use {{TRANSPILED_JS}} (pre-transpiled via esbuild); older
    # templates used {{PROCESSED_JSX}} for the Babel-Standalone path.
    out = out.replace("{{TRANSPILED_JS}}", processed_jsx)
    out = out.replace("{{PROCESSED_JSX}}", processed_jsx)
    return out


def render_index(
    template: str,
    articles: list[dict],
    zip_size_mb: int | None = None,
) -> str:
    cards: list[str] = []
    for a in articles:
        tags = a.get("tags") or []
        tags_html = "".join(
            f'<span class="tag">{html.escape(str(t))}</span>' for t in tags[:5]
        )
        search_blob = " ".join(
            [
                a.get("title", ""),
                a.get("subtitle", ""),
                a.get("category", ""),
                a.get("style", ""),
                " ".join(str(t) for t in tags),
            ]
        )
        slug_esc = html.escape(a["slug"])
        cat_esc = html.escape(a.get("category", ""))
        style_esc = html.escape(a.get("style", ""))
        search_esc = html.escape(search_blob)
        date_str = str(a.get("date", ""))
        read_time = a.get("read_time", "")
        title_esc = html.escape(a.get("title", ""))
        subtitle_esc = html.escape(a.get("subtitle", ""))
        emoji = category_emoji(a.get("category", "general"))
        badge = style_badge_html(a.get("style", ""))

        meta_bits: list[str] = []
        meta_bits.append(f'<span>{emoji} {cat_esc}</span>')
        if date_str:
            meta_bits.append('<span>&middot;</span>')
            meta_bits.append(f'<span>{html.escape(date_str)}</span>')
        if read_time:
            meta_bits.append('<span>&middot;</span>')
            meta_bits.append(f'<span>{html.escape(read_time)}</span>')
        if badge:
            meta_bits.append(badge)

        # The card itself is a link to the HTML article. We append a tiny
        # inline PDF link as a sibling inside the card so it doesn't nest
        # <a> tags (which is invalid HTML). A small JS stopPropagation is
        # attached inline so clicking the PDF icon doesn't trigger the card's
        # href navigation.
        card = (
            f'<div class="article-card-wrap" '
            f'data-category="{cat_esc}" data-style="{style_esc}" '
            f'data-date="{html.escape(date_str)}" '
            f'data-title="{title_esc}" '
            f'data-search="{search_esc}">'
            f'<a class="article-card" href="articles/{slug_esc}.html">'
            f'<div class="card-meta">{"".join(meta_bits)}</div>'
            f'<h3>{title_esc}</h3>'
            f'<p class="card-subtitle">{subtitle_esc}</p>'
            f'<div class="card-tags">{tags_html}</div>'
            f'</a>'
            f'<a class="pdf-link" href="articles/{slug_esc}.pdf" download '
            f'title="Download PDF" aria-label="Download PDF">📑</a>'
            f'</div>'
        )
        cards.append(card)
    html_out = template.replace("{{CARDS_HTML}}", "\n".join(cards))
    html_out = html_out.replace("{{ARTICLE_COUNT}}", str(len(articles)))
    # ZIP button — show a non-functional placeholder state if the ZIP hasn't
    # been built yet (user ran `python3 build.py` without --pdf/BUILD_PDFS=1).
    if zip_size_mb is not None:
        zip_button = (
            f'<a class="zip-download-btn" href="library-articles-offline.zip" '
            f'download title="Download all articles as PDFs">'
            f'📦 Download all PDFs ({zip_size_mb} MB)</a>'
        )
    else:
        zip_button = ""
    html_out = html_out.replace("{{ZIP_BUTTON}}", zip_button)
    html_out = html_out.replace(
        "{{ZIP_SIZE_MB}}", str(zip_size_mb) if zip_size_mb is not None else "?"
    )
    return html_out


# -------------------------------------------------------------------
# Playwright PDF rendering (opt-in — BUILD_PDFS=1 or --pdf)
# -------------------------------------------------------------------

def render_pdfs(html_paths: list[Path], out_dir: Path) -> list[tuple[str, str]]:
    """Render each HTML article to a sibling PDF using headless Chromium.

    Incremental: skips an article whose .pdf is already newer than the .html.
    Returns a list of (slug, error_message) tuples for articles that failed
    to render. Each failure is logged and skipped — the build does not crash.
    """
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print(
            "[error] playwright not installed. Run:\n"
            "    pip install -r requirements-build.txt && playwright install chromium",
            file=sys.stderr,
        )
        return [("__all__", "playwright not installed")]

    failures: list[tuple[str, str]] = []
    rendered = 0
    skipped = 0

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        for html_path in html_paths:
            slug = html_path.stem
            pdf_path = html_path.with_suffix(".pdf")
            try:
                if (
                    pdf_path.exists()
                    and pdf_path.stat().st_mtime >= html_path.stat().st_mtime
                ):
                    skipped += 1
                    print(f"[pdf] {slug} up-to-date, skipping")
                    continue

                start = time.monotonic()
                page.goto(f"file://{html_path.absolute()}")
                # Give React/Recharts time to mount and render charts. The
                # network-idle wait handles same-origin vendor-script loads;
                # the 500 ms buffer covers React-render + Recharts animation
                # settle. Fonts are local so they typically load < 50 ms, but
                # we still gate on document.fonts.ready to be safe.
                page.wait_for_load_state("networkidle")
                page.evaluate("() => document.fonts.ready")
                page.wait_for_timeout(500)

                page.pdf(
                    path=str(pdf_path),
                    format="A4",
                    print_background=True,
                    margin={
                        "top": "20mm",
                        "bottom": "20mm",
                        "left": "18mm",
                        "right": "18mm",
                    },
                )
                ms = int((time.monotonic() - start) * 1000)
                print(f"[pdf] {slug} rendered in {ms} ms")
                rendered += 1
            except Exception as e:  # noqa: BLE001
                err = str(e).splitlines()[0] if str(e) else type(e).__name__
                print(f"[pdf] {slug} FAILED: {err}", file=sys.stderr)
                failures.append((slug, err))
        browser.close()

    print(
        f"[pdf] summary: {rendered} rendered, {skipped} up-to-date, "
        f"{len(failures)} failed"
    )
    return failures


# -------------------------------------------------------------------
# Whole-library ZIP bundle (Phase 5)
# -------------------------------------------------------------------

def build_library_zip(articles_dir: Path, out_path: Path) -> None:
    """Zip every articles/*.pdf into a single downloadable bundle.

    The ZIP has this layout (for nice extraction in Finder / Files.app):

        library-articles-offline/
          README.md
          articles/
            virtual-barrels.pdf
            ...

    The readme inside the ZIP gives the recipient a one-line orientation
    and a build date. Re-runs always rebuild from scratch.
    """
    pdfs = sorted(articles_dir.glob("*.pdf"))
    if not pdfs:
        print(
            "[zip] no PDFs found — skipping ZIP build "
            "(run with BUILD_PDFS=1 or --pdf first)"
        )
        return

    today = _dt.date.today().isoformat()
    readme = (
        f"# Data Science Library — Articles (offline PDF bundle)\n"
        f"\n"
        f"Generated: {today}\n"
        f"Count: {len(pdfs)} articles\n"
        f"\n"
        f"Every article from the Data Science Library as a PDF. Open any "
        f"file in Preview, Acrobat, or any PDF reader — works fully offline.\n"
        f"\n"
        f"Live viewer: https://helwyr55-library-articles.static.hf.space/\n"
    )

    if out_path.exists():
        out_path.unlink()

    with zipfile.ZipFile(out_path, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as zf:
        zf.writestr("library-articles-offline/README.md", readme)
        for pdf in pdfs:
            zf.write(pdf, arcname=f"library-articles-offline/articles/{pdf.name}")

    size_mb = out_path.stat().st_size / (1024 * 1024)
    print(f"[zip] wrote {out_path.name} — {size_mb:.1f} MB, {len(pdfs)} PDFs")


def _zip_size_mb(zip_path: Path) -> int | None:
    if not zip_path.exists():
        return None
    return max(1, round(zip_path.stat().st_size / (1024 * 1024)))


# -------------------------------------------------------------------
# Main build loop
# -------------------------------------------------------------------

def main() -> int:
    if not TEMPLATE_PATH.exists():
        print(f"[error] missing template: {TEMPLATE_PATH}")
        return 2
    if not INDEX_TEMPLATE_PATH.exists():
        print(f"[error] missing index template: {INDEX_TEMPLATE_PATH}")
        return 2
    if not ARTICLES_DIR.exists():
        print(f"[error] missing articles dir: {ARTICLES_DIR}")
        return 2

    template = TEMPLATE_PATH.read_text(encoding="utf-8")
    index_template = INDEX_TEMPLATE_PATH.read_text(encoding="utf-8")

    manifest: list[dict] = []
    failures: list[tuple[str, str]] = []

    jsx_files = sorted(ARTICLES_DIR.glob("*.jsx"))
    if not jsx_files:
        print("[warn] no .jsx files found in articles/")

    for jsx in jsx_files:
        slug = jsx.stem
        print(f"-> {slug}.jsx")
        try:
            source = jsx.read_text(encoding="utf-8")
            meta = extract_metadata(source, slug)
            processed, component_name = process_jsx(source, slug)

            # Strip any cross-origin @import url(...) for Google Fonts that
            # some articles embed inside their own inline <style> blocks.
            # The template already loads assets/fonts/fonts.css same-origin,
            # so these @imports are both redundant and would reintroduce a
            # runtime cross-origin fetch (breaking the offline-ready goal).
            # Missing specialty families (Newsreader, IBM Plex, Libre Franklin)
            # degrade to the Georgia/system fallback declared alongside them.
            processed = re.sub(
                r"@import\s+url\(['\"]?https?://fonts\.googleapis\.com[^'\")]+['\"]?\);?",
                "",
                processed,
            )

            # Pre-transpile JSX to plain JS via esbuild. If esbuild is not
            # available, transpile_jsx() falls back to returning the raw JSX
            # (the template must then keep Babel Standalone for runtime
            # transpilation, which is the legacy path).
            transpiled = transpile_jsx(processed)

            html_out = render_template(
                template,
                title=meta.get("title", slug),
                subtitle=meta.get("subtitle", ""),
                date=str(meta.get("date", "")),
                read_time=meta.get("read_time", ""),
                style=meta.get("style", ""),
                category=meta.get("category", "general"),
                tags=meta.get("tags", []),
                processed_jsx=transpiled,
                component_name=component_name,
                slug=slug,
            )

            html_path = ARTICLES_DIR / f"{slug}.html"
            html_path.write_text(html_out, encoding="utf-8")

            meta_out = {
                "slug": slug,
                "title": meta.get("title", slug),
                "subtitle": meta.get("subtitle", ""),
                "date": str(meta.get("date", "")),
                "read_time": meta.get("read_time", ""),
                "category": meta.get("category", "general"),
                "style": meta.get("style", ""),
                "tags": list(meta.get("tags", [])) if isinstance(meta.get("tags"), list) else [],
                "component": component_name,
                "url": f"articles/{slug}.html",
                "pdf_url": f"articles/{slug}.pdf",
            }
            (ARTICLES_DIR / f"{slug}.meta.json").write_text(
                json.dumps(meta_out, indent=2), encoding="utf-8"
            )

            manifest.append(meta_out)
            print(f"   component={component_name}  title={meta.get('title','?')[:60]!r}")
        except Exception as e:  # noqa: BLE001
            print(f"   [FAIL] {slug}: {e}", file=sys.stderr)
            failures.append((slug, str(e)))

    # Sort manifest by date desc, then title
    manifest.sort(key=lambda m: (m.get("date") or "", m.get("title") or ""), reverse=True)
    MANIFEST_OUT.write_text(json.dumps(manifest, indent=2), encoding="utf-8")

    # -------- PDFs + ZIP (opt-in) --------
    want_pdfs = "--pdf" in sys.argv or os.environ.get("BUILD_PDFS") == "1"
    pdf_failures: list[tuple[str, str]] = []
    if want_pdfs:
        html_paths = [ARTICLES_DIR / f"{m['slug']}.html" for m in manifest]
        html_paths = [p for p in html_paths if p.exists()]
        print(f"\n[pdf] rendering {len(html_paths)} article(s) with Playwright…")
        pdf_failures = render_pdfs(html_paths, ARTICLES_DIR)
        # Build the offline ZIP from every *.pdf that actually exists.
        print("\n[zip] building whole-library ZIP…")
        build_library_zip(ARTICLES_DIR, ZIP_OUT)
    else:
        print(
            "\n[pdf] skipped (run `BUILD_PDFS=1 python3 build.py` or "
            "`python3 build.py --pdf` to render PDFs + ZIP bundle)"
        )

    # Index is rendered last so it can reference the ZIP size once built.
    zip_size_mb = _zip_size_mb(ZIP_OUT)
    INDEX_OUT.write_text(
        render_index(index_template, manifest, zip_size_mb=zip_size_mb),
        encoding="utf-8",
    )

    print(
        f"\nBuilt {len(manifest)} article(s). "
        f"{len(failures)} failure(s). index.html + _manifest.json written."
    )
    if failures:
        print("\nFAILURES:")
        for slug, err in failures:
            print(f"  - {slug}: {err}")
        return 1
    if pdf_failures and pdf_failures != [("__all__", "playwright not installed")]:
        print("\nPDF RENDER FAILURES:")
        for slug, err in pdf_failures:
            print(f"  - {slug}: {err}")
        # Don't fail the whole build on PDF render errors — HTML build succeeded.
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
