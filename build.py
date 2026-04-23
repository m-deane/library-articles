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
MD_TEMPLATE_PATH = ASSETS_DIR / "md-template.html"
INDEX_OUT = ROOT / "index.html"
MANIFEST_OUT = ROOT / "_manifest.json"
ZIP_OUT = ROOT / "library-articles-offline.zip"

# Phase 6 + 7 — offline search + plain-HTML markdown reader
MD_SOURCE_DIR = ROOT.parent / "library" / "articles"   # sibling repo
MD_OUT_DIR = ROOT / "md"
SEARCH_INDEX_OUT = ROOT / "search-index.json"
SEARCH_STORE_OUT = ROOT / "search-store.json"

# Wave 4 — PWA layer (service worker + manifest + escape hatch)
PWA_SRC_DIR = ASSETS_DIR / "pwa"
ICONS_DIR = ASSETS_DIR / "icons"
SW_OUT = ROOT / "sw.js"
WEBMANIFEST_OUT = ROOT / "manifest.webmanifest"
SW_RESET_OUT = ROOT / "sw-reset.html"


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
# Phase 6 + 7 — markdown source loading (shared helpers)
# -------------------------------------------------------------------

# Matches a YAML frontmatter block at the very top of a markdown file:
#   ---\n<key: value ...>\n---\n
_MD_FRONTMATTER_RE = re.compile(r"\A---\s*\n(.*?)\n---\s*\n", re.DOTALL)
# Matches the standard "View Full Article on the JSX Space" preamble plus the
# trailing "---" horizontal rule that jsx_to_markdown.py emits. We use this to
# strip the preamble so the search index + plain reader both see clean prose.
_MD_VIEW_FULL_RE = re.compile(
    r"\*\*\[\U0001f4d1 View Full (?:Article|Interactive)[^\n]*\n",
)


def _strip_md_preamble(md_source: str) -> tuple[dict, str]:
    """Return (frontmatter_dict, body_after_preamble).

    The body has:
      - the YAML frontmatter block stripped,
      - the leading `# Title`, `## Subtitle`, optional blockquote and the
        "View Full Article on the JSX Space" link stripped,
      - the first horizontal-rule `---` divider after the preamble stripped.
    """
    fm: dict = {}
    body = md_source
    m = _MD_FRONTMATTER_RE.match(body)
    if m:
        fm = _parse_frontmatter(m.group(1))
        body = body[m.end():]
    # If the "View Full Article …" line is present, drop everything up to and
    # including the next `---` divider line (on its own line).
    vm = _MD_VIEW_FULL_RE.search(body)
    if vm:
        after_view = body[vm.end():]
        # Find the next line that is exactly `---` (possibly surrounded by
        # blank lines). `re.MULTILINE` anchors ^/$ to line boundaries.
        dm = re.search(r"(?m)^\s*---\s*$", after_view)
        if dm:
            body = after_view[dm.end():].lstrip("\n")
        else:
            body = after_view.lstrip("\n")
    else:
        # No explicit marker — try to just strip the first `# Title` heading if
        # it looks like a duplicate of the frontmatter title.
        title = fm.get("title", "").strip()
        if title:
            lines = body.splitlines()
            if lines and lines[0].startswith("# "):
                lines = lines[1:]
                if lines and lines[0].startswith("## "):
                    lines = lines[1:]
                body = "\n".join(lines).lstrip("\n")
    return fm, body


def _md_to_plain(md_body: str) -> str:
    """Very rough markdown → plain text for search indexing.

    Strips fences, inline code, links, emphasis markers, images, and image
    placeholder lines like `*[Figure: foo — see interactive JSX version]*`.
    Returns a single-line-ish blob with words separated by spaces.
    """
    s = md_body
    # Remove fenced code blocks entirely — code is noise for prose search.
    s = re.sub(r"```.*?```", " ", s, flags=re.DOTALL)
    # Remove figure placeholders — every md mirror has a lot of these.
    s = re.sub(r"\*\[Figure:[^\]]*\]\*", " ", s)
    # Remove html/markdown image refs.
    s = re.sub(r"!\[[^\]]*\]\([^)]*\)", " ", s)
    # Convert markdown links [text](url) → text
    s = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", s)
    # Strip headings markers / blockquote markers / list markers.
    s = re.sub(r"^\s*#+\s*", "", s, flags=re.MULTILINE)
    s = re.sub(r"^\s*>\s?", "", s, flags=re.MULTILINE)
    s = re.sub(r"^\s*[-*+]\s+", "", s, flags=re.MULTILINE)
    # Strip inline code backticks + common emphasis markers.
    s = re.sub(r"`([^`]+)`", r"\1", s)
    s = re.sub(r"\*\*([^*]+)\*\*", r"\1", s)
    s = re.sub(r"__([^_]+)__", r"\1", s)
    s = re.sub(r"\*([^*]+)\*", r"\1", s)
    s = re.sub(r"_([^_]+)_", r"\1", s)
    # Collapse whitespace.
    s = re.sub(r"\s+", " ", s).strip()
    return s


# -------------------------------------------------------------------
# Phase 6 — offline search index (lunr.js port)
# -------------------------------------------------------------------

def build_search_index(manifest: list[dict]) -> tuple[int, int]:
    """Build `search-index.json` + `search-store.json` from markdown mirrors.

    Inputs: every `manifest` entry whose slug has a matching
    `../library/articles/{slug}.md`. The markdown body (with frontmatter and
    the "View Full Article" preamble stripped) becomes the lunr `body` field.

    Also generates a companion `search-store.json` — a flat dict of
    `{slug: {title, subtitle, category, date, url, md_url}}` — so the client
    can render hit cards without re-loading the whole index body.

    Returns (index_bytes, store_bytes). If the `lunr` Python port isn't
    installed, falls back to emitting a simple `{docs: [...]}` JSON that the
    client can search with substring matching; this still satisfies the
    offline-search requirement for ~20 articles.
    """
    docs: list[dict] = []
    store: dict[str, dict] = {}

    # Union the JSX manifest with md-only slugs so articles that exist in the
    # markdown mirror but don't (yet) have a JSX reader are still searchable
    # via the plain reader + (optionally) a PDF if one was rendered.
    entries_by_slug: dict[str, dict] = {e["slug"]: e for e in manifest}
    if MD_SOURCE_DIR.exists():
        for md_path in sorted(MD_SOURCE_DIR.glob("*.md")):
            entries_by_slug.setdefault(md_path.stem, {"slug": md_path.stem})

    for slug, entry in entries_by_slug.items():
        md_path = MD_SOURCE_DIR / f"{slug}.md"
        if not md_path.exists():
            print(f"[search] no markdown mirror for {slug} — skipping")
            continue
        raw = md_path.read_text(encoding="utf-8")
        fm, body = _strip_md_preamble(raw)

        # Prefer manifest metadata (derived from JSX frontmatter) over the md
        # frontmatter, since the manifest is the canonical source for the
        # static site. Fall back to the md frontmatter for slugs that only
        # exist in the markdown mirror (e.g. the-monotonic-constraint-trick).
        title = entry.get("title") or fm.get("title", slug)
        subtitle = entry.get("subtitle") or fm.get("subtitle", "")
        category = entry.get("category") or fm.get("category", "general")
        tags = entry.get("tags") or fm.get("tags", []) or []
        date = entry.get("date") or str(fm.get("date", ""))

        # JSX reader exists only if the manifest had the slug.
        has_jsx = slug in {m["slug"] for m in manifest}
        jsx_url = f"articles/{slug}.html" if has_jsx else f"md/{slug}.html"

        docs.append(
            {
                "slug": slug,
                "title": title,
                "subtitle": subtitle,
                "category": category,
                "tags": " ".join(tags) if isinstance(tags, list) else str(tags),
                "body": _md_to_plain(body),
            }
        )
        store[slug] = {
            "title": title,
            "subtitle": subtitle,
            "category": category,
            "date": date,
            "url": jsx_url,
            "md_url": f"md/{slug}.html",
            "pdf_url": f"articles/{slug}.pdf",
        }

    # Build a snippet-optimised body map — truncated bodies are plenty for
    # the client's first-match highlighting, keep the JSON reasonable.
    snippet_map = {
        d["slug"]: (d["body"][:3000] if d["body"] else "")
        for d in docs
    }

    # Try lunr Python port first. On failure, fall back to a plain doc list.
    index_payload: dict
    try:
        from lunr import lunr as _lunr_build  # type: ignore

        index = _lunr_build(
            ref="slug",
            fields=[
                {"field_name": "title", "boost": 3},
                {"field_name": "subtitle", "boost": 2},
                {"field_name": "category", "boost": 1.5},
                {"field_name": "tags", "boost": 1.5},
                {"field_name": "body", "boost": 1},
            ],
            documents=docs,
        )
        index_payload = {
            "format": "lunr",
            "version": "2.3.9",
            "index": index.serialize(),
            # Lightweight docs for snippet rendering — no duplicated bodies.
            "docs": [
                {
                    "slug": d["slug"],
                    "title": d["title"],
                    "subtitle": d["subtitle"],
                    "body": snippet_map.get(d["slug"], ""),
                }
                for d in docs
            ],
        }
    except Exception as e:  # noqa: BLE001
        print(
            f"[search] lunr Python port unavailable or failed ({e!r}); "
            f"emitting a naive-search index instead"
        )
        # In naive mode we still need bodies for substring search — use the
        # full body (not truncated) because this path has no other index
        # structure to fall back on.
        index_payload = {
            "format": "naive",
            "docs": docs,
        }

    SEARCH_INDEX_OUT.write_text(
        json.dumps(index_payload, ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )
    SEARCH_STORE_OUT.write_text(
        json.dumps(store, ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )
    idx_kb = SEARCH_INDEX_OUT.stat().st_size / 1024
    store_kb = SEARCH_STORE_OUT.stat().st_size / 1024
    print(
        f"[search] wrote {SEARCH_INDEX_OUT.name} ({idx_kb:.1f} KB) + "
        f"{SEARCH_STORE_OUT.name} ({store_kb:.1f} KB) — {len(docs)} doc(s)"
    )
    return (SEARCH_INDEX_OUT.stat().st_size, SEARCH_STORE_OUT.stat().st_size)


# -------------------------------------------------------------------
# Phase 7 — plain-HTML markdown reader
# -------------------------------------------------------------------

def _render_md_template(
    template: str,
    *,
    title: str,
    subtitle: str,
    date: str,
    read_time: str,
    category: str,
    slug: str,
    body_html: str,
) -> str:
    replacements = {
        "{{TITLE}}": html.escape(title),
        "{{SUBTITLE}}": html.escape(subtitle),
        "{{DATE}}": html.escape(date),
        "{{READ_TIME}}": html.escape(read_time),
        "{{CATEGORY}}": html.escape(category),
        "{{SLUG}}": html.escape(slug),
    }
    out = template
    for k, v in replacements.items():
        out = out.replace(k, v)
    # Body last — may contain arbitrary HTML that must not be mangled.
    out = out.replace("{{BODY_HTML}}", body_html)
    return out


def build_md_reader(manifest: list[dict]) -> int:
    """Render every markdown mirror into `md/{slug}.html` for plain reading.

    The plain reader is script-free HTML + CSS + local fonts. Wonderful for
    offline / low-bandwidth / accessibility / printing. Uses the same header
    bar chrome as the JSX template with toggle links back to the full JSX
    reader and the PDF.

    Returns the number of files written. Slugs without a matching markdown
    mirror are skipped with a warning — the build does not crash.
    """
    if not MD_TEMPLATE_PATH.exists():
        print(f"[md] missing template: {MD_TEMPLATE_PATH}", file=sys.stderr)
        return 0
    try:
        import markdown as _markdown  # type: ignore
    except ImportError:
        print(
            "[md] `markdown` package not installed. Run:\n"
            "    pip install -r requirements-build.txt",
            file=sys.stderr,
        )
        return 0

    template = MD_TEMPLATE_PATH.read_text(encoding="utf-8")
    MD_OUT_DIR.mkdir(parents=True, exist_ok=True)

    md_converter = _markdown.Markdown(
        extensions=["extra", "codehilite", "sane_lists", "toc", "tables"],
        output_format="html5",
    )

    # Union with md-only slugs (same pattern as build_search_index — keeps
    # the plain reader in sync with the search index and discoverable even
    # when a JSX artifact hasn't been authored yet).
    entries_by_slug: dict[str, dict] = {e["slug"]: e for e in manifest}
    if MD_SOURCE_DIR.exists():
        for md_path in sorted(MD_SOURCE_DIR.glob("*.md")):
            entries_by_slug.setdefault(md_path.stem, {"slug": md_path.stem})

    written = 0
    for slug, entry in entries_by_slug.items():
        md_path = MD_SOURCE_DIR / f"{slug}.md"
        if not md_path.exists():
            print(f"[md] no markdown mirror for {slug} — skipping")
            continue
        try:
            raw = md_path.read_text(encoding="utf-8")
            fm, body = _strip_md_preamble(raw)
            md_converter.reset()
            body_html = md_converter.convert(body)

            title = entry.get("title") or fm.get("title", slug)
            subtitle = entry.get("subtitle") or fm.get("subtitle", "")
            date = entry.get("date") or str(fm.get("date", ""))
            read_time = entry.get("read_time") or fm.get("read_time", "")
            category = entry.get("category") or fm.get("category", "general")

            rendered = _render_md_template(
                template,
                title=title,
                subtitle=subtitle,
                date=str(date),
                read_time=read_time,
                category=category,
                slug=slug,
                body_html=body_html,
            )
            (MD_OUT_DIR / f"{slug}.html").write_text(rendered, encoding="utf-8")
            written += 1
        except Exception as e:  # noqa: BLE001
            print(f"[md] {slug} FAILED: {e}", file=sys.stderr)

    # Build a minimal plain-reader index (md/index.html).
    _build_md_index(manifest)

    print(f"[md] wrote {written} plain-HTML reader page(s) to md/")
    return written


def _build_md_index(manifest: list[dict]) -> None:
    """Generate `md/index.html` — a minimal list of plain-reader pages.

    Mirrors the main index filter/sort layout but stripped down: just a list
    of articles linking to their `md/{slug}.html` page with a back-link to
    the full index and the PDF.
    """
    # Union with md-only slugs — see build_search_index() for rationale.
    entries_by_slug: dict[str, dict] = {e["slug"]: e for e in manifest}
    if MD_SOURCE_DIR.exists():
        for md_path in sorted(MD_SOURCE_DIR.glob("*.md")):
            entries_by_slug.setdefault(md_path.stem, {"slug": md_path.stem})

    rows: list[str] = []
    for slug, entry in sorted(
        entries_by_slug.items(),
        key=lambda kv: (kv[1].get("date") or "", kv[1].get("title") or kv[0]),
        reverse=True,
    ):
        md_exists = (MD_SOURCE_DIR / f"{slug}.md").exists()
        if not md_exists:
            continue
        title = entry.get("title") or slug.replace("-", " ").title()
        subtitle = entry.get("subtitle") or ""
        category = entry.get("category") or "general"
        emoji = category_emoji(category)
        date_str = str(entry.get("date", ""))
        read_time = entry.get("read_time", "")
        meta_bits = [f'<span>{emoji} {html.escape(category)}</span>']
        if date_str:
            meta_bits.append('<span>&middot;</span>')
            meta_bits.append(f'<span>{html.escape(date_str)}</span>')
        if read_time:
            meta_bits.append('<span>&middot;</span>')
            meta_bits.append(f'<span>{html.escape(read_time)}</span>')
        rows.append(
            f'<a class="md-index-row" href="{html.escape(slug)}.html">'
            f'<div class="md-index-meta">{"".join(meta_bits)}</div>'
            f'<h3>{html.escape(title)}</h3>'
            f'<p>{html.escape(subtitle)}</p>'
            f'</a>'
        )

    page = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Plain Reader — Data Science Library</title>
<meta name="description" content="Plain-HTML markdown reader for offline reading." />
<link rel="stylesheet" href="../assets/fonts/fonts.css" />
<link rel="stylesheet" href="../assets/styles.css" />
<link rel="stylesheet" href="../assets/md-styles.css" />
<link rel="manifest" href="/manifest.webmanifest" />
<meta name="theme-color" content="#7c4dff" />
<link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon-180.png" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name="apple-mobile-web-app-title" content="DS Articles" />
</head>
<body class="md-body">
<header class="article-header-bar">
  <div class="header-inner">
    <a class="back-link" href="../index.html">&larr; Full index</a>
    <div class="header-meta">
      <span class="header-title">Plain Reader</span>
      <span class="header-sep">&middot;</span>
      <span class="header-date">{len(rows)} articles</span>
    </div>
    <a class="index-link" href="../index.html">Full reader index</a>
  </div>
</header>
<main class="md-container">
  <article class="md-article md-index-article">
    <h1>Plain-HTML Reader</h1>
    <p class="md-index-subtitle">Lightweight, script-free markdown rendering of every article. Ideal for offline / low-bandwidth reading. Toggle to the full JSX reader for interactive charts.</p>
    <div class="md-index-list">
      {"".join(rows)}
    </div>
  </article>
</main>
<footer class="article-footer">
  <div class="footer-inner">
    <span>📄 {len(rows)} plain-reader pages · companion to the <a href="../index.html">full reader</a></span>
    <a href="https://huggingface.co/spaces/helwyr55/library" target="_blank" rel="noopener">← Return to Data Science Library</a>
  </div>
</footer>
<script>
  if ('serviceWorker' in navigator) {{
    window.addEventListener('load', function () {{
      navigator.serviceWorker.register('/sw.js').catch(function (err) {{
        console.warn('SW register failed:', err);
      }});
    }});
  }}
</script>
</body>
</html>
"""
    (MD_OUT_DIR / "index.html").write_text(page, encoding="utf-8")


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
# Wave 4 — PWA layer (service worker + manifest + escape hatch)
# -------------------------------------------------------------------

def _build_version() -> str:
    """Return a short build identifier used to namespace the SW cache.

    Prefers a short git SHA so deploys produce stable, diffable cache names.
    Falls back to epoch-seconds if the repo is not a git checkout or the
    `git` binary is unavailable.
    """
    try:
        proc = subprocess.run(
            ["git", "rev-parse", "--short", "HEAD"],
            capture_output=True,
            text=True,
            cwd=str(ROOT),
            check=True,
        )
        sha = proc.stdout.strip()
        if sha:
            return sha
    except Exception:  # noqa: BLE001
        pass
    return str(int(time.time()))


def _collect_precache_urls() -> list[str]:
    """Enumerate every same-origin URL the service worker should pre-cache.

    Explicitly EXCLUDES articles/*.pdf and library-articles-offline.zip —
    these are intentionally distributed via direct download / the separate
    ZIP and are not part of the PWA install budget (decision Q4).

    Paths are emitted as absolute (starting with '/') so the SW can treat
    them as URLs relative to the scope root.
    """
    urls: list[str] = []

    # Shell / index / manifest.
    urls.append("/")
    urls.append("/index.html")
    urls.append("/_manifest.json")

    # Shared stylesheets.
    urls.append("/assets/styles.css")
    urls.append("/assets/md-styles.css")
    urls.append("/assets/fonts/fonts.css")

    # Vendored JS runtime.
    vendor_files = [
        "react.production.min.js",
        "react-dom.production.min.js",
        "prop-types.min.js",
        "recharts.js",
        "lunr.min.js",
    ]
    for name in vendor_files:
        if (ASSETS_DIR / "vendor" / name).exists():
            urls.append(f"/assets/vendor/{name}")

    # Vendored fonts (woff2 files).
    fonts_dir = ASSETS_DIR / "fonts"
    if fonts_dir.exists():
        for woff in sorted(fonts_dir.glob("*.woff2")):
            urls.append(f"/assets/fonts/{woff.name}")

    # Icons — the manifest points at icon-192 / icon-512, the SW should pre-
    # cache all three so the home-screen icon works offline on iOS too.
    if ICONS_DIR.exists():
        for png in sorted(ICONS_DIR.glob("*.png")):
            urls.append(f"/assets/icons/{png.name}")

    # The webmanifest itself.
    urls.append("/manifest.webmanifest")

    # Article HTML — walk the manifest so we cache only what we just built.
    if MANIFEST_OUT.exists():
        try:
            manifest = json.loads(MANIFEST_OUT.read_text(encoding="utf-8"))
            for entry in manifest:
                slug = entry.get("slug")
                if not slug:
                    continue
                html_path = ARTICLES_DIR / f"{slug}.html"
                if html_path.exists():
                    urls.append(f"/articles/{slug}.html")
        except Exception as e:  # noqa: BLE001
            print(f"[pwa] warn: couldn't parse manifest ({e}) — falling back to glob")

    # Fall back to a glob if the manifest read failed (or to include md-only
    # articles that aren't in the JSX manifest).
    for html_path in sorted(ARTICLES_DIR.glob("*.html")):
        u = f"/articles/{html_path.name}"
        if u not in urls:
            urls.append(u)

    # Plain-HTML markdown reader pages (including the md-reader index).
    if MD_OUT_DIR.exists():
        if (MD_OUT_DIR / "index.html").exists():
            urls.append("/md/index.html")
        for md_html in sorted(MD_OUT_DIR.glob("*.html")):
            if md_html.name == "index.html":
                continue
            urls.append(f"/md/{md_html.name}")

    # Search payloads.
    if SEARCH_INDEX_OUT.exists():
        urls.append("/search-index.json")
    if SEARCH_STORE_OUT.exists():
        urls.append("/search-store.json")

    # De-dupe while preserving order — the SW's addAll will already dedupe,
    # but a clean list is nicer to read in DevTools.
    seen: set[str] = set()
    dedup: list[str] = []
    for u in urls:
        if u in seen:
            continue
        seen.add(u)
        # Hard rule: never precache PDFs or the ZIP.
        if u.startswith("/articles/") and u.endswith(".pdf"):
            continue
        if u == "/library-articles-offline.zip":
            continue
        dedup.append(u)
    return dedup


def build_pwa_files() -> tuple[str, int]:
    """Copy sw.js / manifest.webmanifest / sw-reset.html to the Space root.

    The SW's `{{BUILD_VERSION}}` and `{{PRECACHE_URLS}}` placeholders get
    substituted here — everything else is copied verbatim. Called from main()
    AFTER all other build passes so the precache list reflects final state.

    Returns (build_version, precache_count) for logging.
    """
    if not PWA_SRC_DIR.exists():
        print(f"[pwa] missing source dir: {PWA_SRC_DIR}")
        return ("", 0)

    sw_src = PWA_SRC_DIR / "sw.js"
    manifest_src = PWA_SRC_DIR / "manifest.webmanifest"
    reset_src = PWA_SRC_DIR / "sw-reset.html"

    if not sw_src.exists() or not manifest_src.exists() or not reset_src.exists():
        print(
            "[pwa] one or more source files missing; expected "
            "sw.js / manifest.webmanifest / sw-reset.html under assets/pwa/"
        )
        return ("", 0)

    build_version = _build_version()
    precache_urls = _collect_precache_urls()

    sw_content = sw_src.read_text(encoding="utf-8")
    sw_content = sw_content.replace("{{BUILD_VERSION}}", build_version)
    sw_content = sw_content.replace(
        "{{PRECACHE_URLS}}",
        json.dumps(precache_urls, separators=(",", ":")),
    )
    SW_OUT.write_text(sw_content, encoding="utf-8")

    WEBMANIFEST_OUT.write_text(
        manifest_src.read_text(encoding="utf-8"),
        encoding="utf-8",
    )
    SW_RESET_OUT.write_text(
        reset_src.read_text(encoding="utf-8"),
        encoding="utf-8",
    )

    print(
        f"[pwa] wrote sw.js (v{build_version}, {len(precache_urls)} precache URLs), "
        f"manifest.webmanifest, sw-reset.html"
    )
    return (build_version, len(precache_urls))


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

    # -------- Phase 6 — offline search index (always on) --------
    # Runs after the JSX build so titles/categories are fresh, BEFORE PDF
    # render so the opt-in PDF loop doesn't gate search.
    print("\n[search] building offline search index…")
    try:
        build_search_index(manifest)
    except Exception as e:  # noqa: BLE001
        print(f"[search] build failed: {e}", file=sys.stderr)

    # -------- Phase 7 — plain-HTML markdown reader (always on) --------
    print("\n[md] building plain-HTML markdown reader…")
    try:
        build_md_reader(manifest)
    except Exception as e:  # noqa: BLE001
        print(f"[md] build failed: {e}", file=sys.stderr)

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

    # -------- Wave 4 — PWA layer (always on) --------
    # Runs AFTER everything else so the precache list reflects the final
    # state of the build output (articles/*.html, md/*.html, search JSON,
    # index.html, vendor files, fonts, icons).
    print("\n[pwa] building service worker + manifest + reset page…")
    try:
        build_pwa_files()
    except Exception as e:  # noqa: BLE001
        print(f"[pwa] build failed: {e}", file=sys.stderr)

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
