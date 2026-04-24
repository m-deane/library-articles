#!/usr/bin/env python3
"""
Convert JSX article artifacts into full-length markdown bodies.

Strategy:
  - The "standard" JSX template (used by catboost, conformal, ebm, pfi,
    probabilistic-forecasting, rag, shapash, ts-feature-engineering,
    stochastic-dp, and loosely safe-ts / splitwise / feature-selection)
    uses template-literal prose inside component wrappers: <P>, <Sec>,
    <H3>, <Callout>, <NB>, <Code>, <Cap>, plus decorative SVG diagram
    components.
  - We walk the JSX source from `export default function ...` onward,
    tokenise top-level elements, and emit their markdown equivalents.
  - SVG diagrams we cannot faithfully render are replaced with a figure
    placeholder that points readers at the interactive version.
  - Non-standard files (feature-selection-ts-deep-dive uses a completely
    different className-based structure, safe-ts and splitwise are tab-
    based) get hand-tailored fallback extraction that grabs the visible
    prose in order.

Output markdown replaces everything *below* the "View Full JSX Version"
link in each library/articles/{slug}.md, preserving frontmatter and
header exactly.
"""

from __future__ import annotations

import html
import re
import sys
from pathlib import Path
from typing import Callable

sys.setrecursionlimit(10000)

# Repo-relative resolution — works on any host (local macOS dev AND Ubuntu CI).
# This script lives at library-articles/jsx_to_markdown.py; its parent is the
# library-articles repo root. `library/` is a sibling repo; if that sibling
# doesn't exist (e.g. CI checks out only this repo), MD_DIR is created inside
# the working tree and downstream markdown emission is a no-op.
_SCRIPT_DIR = Path(__file__).resolve().parent  # library-articles/
_PARENT = _SCRIPT_DIR.parent                    # ____p-library/ (local) or repo parent (CI)
BASE = _PARENT
JSX_DIR = _SCRIPT_DIR / "articles"
_SIBLING_MD = _PARENT / "library" / "articles"
MD_DIR = _SIBLING_MD if _SIBLING_MD.exists() else _SCRIPT_DIR / "_markdown_mirror"

SLUGS = [
    "catboost-guide",
    "conformal-prediction-guide",
    "ebm-definitive-guide",
    "feature-selection-ts-deep-dive",
    "pfi-definitive-guide",
    "probabilistic-forecasting-guide",
    "rag-2026-definitive-guide",
    "safe-ts-article",
    "shapash-timeseries-technical-article",
    "splitwise-python-article",
    "stochastic-dp-encyclopaedic-article",
    "ts-feature-engineering-guide",
    "virtual-barrels",
    "virtual-barrels-chapter-notes",
    "forty-classic-crude-oil-trades-chapter-notes",
    "advances-in-financial-machine-learning-chapter-notes",
    "bayesian-analysis-with-python-chapter-notes",
    "crude-oil-handbook-chapter-notes",
    "python-for-algorithmic-trading-cookbook-chapter-notes",
    "applied-bayesian-statistics-notes",
    "forecasting-principles-and-practice-notes",
    "london-housing-market-2026",
    "looksmaxxing",
    "fish-farms-environmental-impact",
    # ── 23-article standardisation batch (2026-04-19) ───────────────────
    "audhd-entelechy-v2",
    "autonomy-centred-coaching",
    "avoidance-based-behaviour",
    "crude-markets-briefing",
    "double-empathy-problem",
    "european-gas-markets-economist",
    "european-gas-trading",
    "european-refining-encyclopaedic",
    "european-refining-margins-economist",
    "fair-value-modelling-european-energy",
    "fort-st-elmo-sciam",
    "fort-st-elmo",
    "fort_st_elmo_ng",
    "malta-aqueduct",
    "malta-slavery-sciam",
    "malta-slavery",
    "radically-open-dbt",
    "renzulli-three-rings",
    "reverse-osmosis-desalination",
    "tanzanite-born-from-fire",
    "tanzanite-cover-story",
    "the-doers-and-the-knowers",
    "xlendi-wreck",
    "obsidian-and-claude-code",
    "obsidian-complete-guide-with-claude-code",
]


# ---------------------------------------------------------------------------
# helpers for inline HTML → markdown
# ---------------------------------------------------------------------------

INLINE_REPLACEMENTS: list[tuple[re.Pattern[str], str]] = [
    (re.compile(r"<strong(?:\s[^>]*)?>(.*?)</strong>", re.DOTALL), r"**\1**"),
    (re.compile(r"<b(?:\s[^>]*)?>(.*?)</b>", re.DOTALL), r"**\1**"),
    (re.compile(r"<em(?:\s[^>]*)?>(.*?)</em>", re.DOTALL), r"*\1*"),
    (re.compile(r"<i(?:\s[^>]*)?>(.*?)</i>", re.DOTALL), r"*\1*"),
    (re.compile(r"<code(?:\s[^>]*)?>(.*?)</code>", re.DOTALL), r"`\1`"),
    (re.compile(r"<br\s*/?>", re.IGNORECASE), "\n"),
    (re.compile(r"<sup(?:\s[^>]*)?>(.*?)</sup>", re.DOTALL), r"^\1^"),
    (re.compile(r"<sub(?:\s[^>]*)?>(.*?)</sub>", re.DOTALL), r"~\1~"),
    (re.compile(r"<cite(?:\s[^>]*)?>(.*?)</cite>", re.DOTALL), r"*\1*"),
]

# Strip any remaining simple tags like <span ...>text</span> → text.
# Keep the list wide — we want to ditch all pure-wrapping HTML elements.
TAG_STRIP = re.compile(
    r"</?(?:span|div|p|small|u|mark|a|font|blockquote|section|article|nav|header|footer|main|aside|figure|figcaption|time)(?:\s[^>]*)?/?>",
    re.IGNORECASE,
)
# Also strip any remaining JSX expression curly braces around a single token
# like `{" "}` or `{\n}` which are common spacing helpers.
SPACER_STRIP = re.compile(r'\{"\s*"\}|\{\s*\}')


JSX_EXPR_STRIP = re.compile(
    # Match bare JSX expression fragments that show up in text — single
    # identifiers or dotted/indexed property access. We deliberately keep
    # this narrow so that legitimate mathematical or code-like curly
    # content in prose survives.
    r"\{(?:[A-Za-z_][\w]*(?:\.[A-Za-z_][\w]*|\[\d+\])*)\}"
)


def inline_html_to_md(text: str) -> str:
    """Convert the small subset of HTML used inside JSX template literals."""
    out = text
    for pat, rep in INLINE_REPLACEMENTS:
        out = pat.sub(rep, out)
    out = TAG_STRIP.sub("", out)
    out = SPACER_STRIP.sub(" ", out)
    # Remove bare JSX expression fragments that leaked through as literal
    # text (e.g. `{s.b}`, `{t}`, `{row[0]}`).
    out = JSX_EXPR_STRIP.sub("", out)
    # HTML entities
    out = out.replace("&nbsp;", " ")
    out = html.unescape(out)
    # Collapse runs of whitespace inside a paragraph but preserve newlines
    lines = [re.sub(r"[ \t]+", " ", ln).strip() for ln in out.split("\n")]
    return "\n".join(lines).strip()


def _decode_template_literal(raw: str, *, preserve_escapes: bool = False) -> str:
    """Decode a JS template-literal body (between backticks) into plain text.

    For prose (``preserve_escapes=False``): `\\n` becomes a real newline,
    `\\t` becomes spaces. For Python code bodies (``preserve_escapes=True``)
    we keep the source-level representation, since `\\n` inside a JS
    template literal that contains Python code is meant to appear as the
    two-character Python escape sequence `\\n`, not an actual newline.
    """
    out = raw
    out = out.replace("\\`", "`")
    if not preserve_escapes:
        out = out.replace("\\n", "\n")
        out = out.replace("\\t", "    ")
    out = out.replace("\\\\", "\\")
    return out


# ---------------------------------------------------------------------------
# JSX tokeniser for standard-template articles
# ---------------------------------------------------------------------------


def _find_export_body(src: str) -> str:
    """Return JSX from the start of the export default function."""
    m = re.search(r"export default function\s+\w+\s*\([^)]*\)\s*\{", src)
    if not m:
        raise ValueError("no export default function found")
    return src[m.end() :]


def _balanced_jsx(src: str, start: int) -> tuple[str, int]:
    """Starting at src[start] == '<', return (substring, index_after)."""
    assert src[start] == "<"
    # parse tag name
    m = re.match(r"<([A-Za-z][\w.]*)", src[start:])
    if not m:
        # treat as text
        return src[start : start + 1], start + 1
    tag = m.group(1)
    i = start + 1
    depth = 1  # we are inside one tag's opening
    # Scan to find matching close. We handle self-closing tags and
    # nested same-tag elements.
    # Track whether we're inside a JSX expression {...}, a template literal `...`,
    # or a quoted string.
    n = len(src)
    in_template = False
    in_string: str | None = None
    brace_depth = 0
    open_tag_closed = False  # have we passed the first '>' of the opening tag?
    while i < n:
        ch = src[i]
        nxt = src[i + 1] if i + 1 < n else ""
        if in_string:
            if ch == "\\":
                i += 2
                continue
            if ch == in_string:
                in_string = None
            i += 1
            continue
        if in_template:
            if ch == "\\":
                i += 2
                continue
            if ch == "`":
                in_template = False
            i += 1
            continue
        if brace_depth > 0:
            if ch == "`":
                in_template = True
            elif ch in "'\"":
                in_string = ch
            elif ch == "{":
                brace_depth += 1
            elif ch == "}":
                brace_depth -= 1
            i += 1
            continue
        if ch == "{":
            brace_depth += 1
            i += 1
            continue
        if ch == "`":
            in_template = True
            i += 1
            continue
        # Note: bare apostrophes / quotes inside text nodes are NOT strings
        # and must not trigger string mode — they only matter inside
        # JSX expressions or attribute values, which are handled elsewhere.
        if ch == "<":
            # either open tag or close tag
            if nxt == "/":
                # closing tag; does it match?
                cm = re.match(r"</([A-Za-z][\w.]*)\s*>", src[i:])
                if cm:
                    depth -= 1
                    i += cm.end()
                    if depth == 0:
                        return src[start:i], i
                    continue
                else:
                    i += 1
                    continue
            else:
                # new opening tag: scan through it to find the terminating
                # '>' or '/>', skipping quoted attribute values. This keeps
                # the outer-tag 'open_tag_closed' state untouched.
                nm = re.match(r"<([A-Za-z][\w.]*)", src[i:])
                if not nm:
                    i += 1
                    continue
                j = i + nm.end()
                tag_in_string: str | None = None
                tag_brace_depth = 0
                tag_in_tmpl = False
                while j < n:
                    c = src[j]
                    if tag_in_string:
                        if c == "\\":
                            j += 2
                            continue
                        if c == tag_in_string:
                            tag_in_string = None
                        j += 1
                        continue
                    if tag_in_tmpl:
                        if c == "\\":
                            j += 2
                            continue
                        if c == "`":
                            tag_in_tmpl = False
                        j += 1
                        continue
                    if tag_brace_depth > 0:
                        if c == "`":
                            tag_in_tmpl = True
                        elif c in "'\"":
                            tag_in_string = c
                        elif c == "{":
                            tag_brace_depth += 1
                        elif c == "}":
                            tag_brace_depth -= 1
                        j += 1
                        continue
                    if c == "{":
                        tag_brace_depth += 1
                        j += 1
                        continue
                    if c in "'\"":
                        tag_in_string = c
                        j += 1
                        continue
                    if c == ">":
                        if j > 0 and src[j - 1] == "/":
                            # self-closing, does not change depth
                            j += 1
                            break
                        # non-self-closing: opens a new nested tag
                        depth += 1
                        j += 1
                        break
                    j += 1
                i = j
                continue
        if ch == ">":
            # This only matters for the root element's opening tag.
            if not open_tag_closed:
                # Check for self-close `/>`
                if src[i - 1] == "/":
                    depth -= 1
                    i += 1
                    if depth == 0:
                        return src[start:i], i
                    continue
                open_tag_closed = True
                i += 1
                continue
            i += 1
            continue
        i += 1
    # fallback: return rest
    return src[start:], n


def _extract_tag(element: str) -> tuple[str, str, str]:
    """Given a full JSX element string, return (tagname, attrs_str, inner_str).

    Inner string is empty for self-closing tags.
    """
    m = re.match(r"<([A-Za-z][\w.]*)([^>]*?)(/?)>", element, flags=re.DOTALL)
    if not m:
        return "", "", element
    tag = m.group(1)
    attrs = m.group(2)
    self_close = m.group(3) == "/"
    if self_close:
        return tag, attrs, ""
    # find matching closing tag at the end
    close = re.search(rf"</{re.escape(tag)}\s*>\s*$", element)
    inner = element[m.end() : close.start()] if close else element[m.end() :]
    return tag, attrs, inner


def _parse_attrs(attrs_str: str) -> dict[str, str]:
    """Parse a small subset of JSX attributes:
       key="value", key='value', key={literalOrNumber}, key={`template`}.
    """
    result: dict[str, str] = {}
    i = 0
    n = len(attrs_str)
    while i < n:
        # skip whitespace
        while i < n and attrs_str[i].isspace():
            i += 1
        if i >= n:
            break
        # read key
        m = re.match(r"([A-Za-z_][\w\-]*)", attrs_str[i:])
        if not m:
            i += 1
            continue
        key = m.group(1)
        i += m.end()
        if i >= n or attrs_str[i] != "=":
            result[key] = "true"
            continue
        i += 1  # skip '='
        if i >= n:
            break
        if attrs_str[i] == '"' or attrs_str[i] == "'":
            q = attrs_str[i]
            j = attrs_str.find(q, i + 1)
            if j == -1:
                break
            result[key] = attrs_str[i + 1 : j]
            i = j + 1
        elif attrs_str[i] == "{":
            # find matching }
            depth = 1
            j = i + 1
            in_tmpl = False
            in_str: str | None = None
            while j < n and depth > 0:
                c = attrs_str[j]
                if in_str:
                    if c == "\\":
                        j += 2
                        continue
                    if c == in_str:
                        in_str = None
                elif in_tmpl:
                    if c == "\\":
                        j += 2
                        continue
                    if c == "`":
                        in_tmpl = False
                elif c == "`":
                    in_tmpl = True
                elif c in '"\'':
                    in_str = c
                elif c == "{":
                    depth += 1
                elif c == "}":
                    depth -= 1
                j += 1
            value = attrs_str[i + 1 : j - 1].strip()
            # strip template literal wrapping backticks
            if value.startswith("`") and value.endswith("`"):
                value = _decode_template_literal(value[1:-1])
            else:
                # remove surrounding quotes if any
                if value.startswith(('"', "'")) and value.endswith(('"', "'")):
                    value = value[1:-1]
            result[key] = value
            i = j
        else:
            # bare value
            m2 = re.match(r"[^\s>]+", attrs_str[i:])
            if m2:
                result[key] = m2.group(0)
                i += m2.end()
            else:
                i += 1
    return result


def _extract_string_content(inner: str) -> str:
    """Extract the string content from a JSX child — handles `{\`...\`}`,
    `{"..."}`, or plain text children."""
    s = inner.strip()
    if s.startswith("{") and s.endswith("}"):
        inside = s[1:-1].strip()
        if inside.startswith("`") and inside.endswith("`"):
            return _decode_template_literal(inside[1:-1])
        if (inside.startswith('"') and inside.endswith('"')) or (
            inside.startswith("'") and inside.endswith("'")
        ):
            return inside[1:-1]
        return inside
    return s


def _extract_string_content_for_code(inner: str) -> str:
    """Like _extract_string_content but preserves source escapes so
    `\\n` stays as two chars — appropriate for Python code bodies."""
    s = inner.strip()
    if s.startswith("{") and s.endswith("}"):
        inside = s[1:-1].strip()
        if inside.startswith("`") and inside.endswith("`"):
            return _decode_template_literal(
                inside[1:-1], preserve_escapes=True
            )
        if (inside.startswith('"') and inside.endswith('"')) or (
            inside.startswith("'") and inside.endswith("'")
        ):
            return inside[1:-1]
        return inside
    return s


# ---------------------------------------------------------------------------
# Tokenise a region into a list of top-level JSX children
# ---------------------------------------------------------------------------


def _split_children(region: str) -> list[dict]:
    """Split a JSX region into a sequence of {kind, ...} tokens.

    Kinds: 'element' (tag, attrs, inner, raw), 'expr' ({...} content), 'text'.
    """
    tokens: list[dict] = []
    i = 0
    n = len(region)
    while i < n:
        ch = region[i]
        if ch.isspace():
            i += 1
            continue
        if ch == "<":
            elem, j = _balanced_jsx(region, i)
            tag, attrs, inner = _extract_tag(elem)
            if tag:
                tokens.append(
                    {
                        "kind": "element",
                        "tag": tag,
                        "attrs": _parse_attrs(attrs),
                        "inner": inner,
                        "raw": elem,
                    }
                )
            # else: stray '<' or unparseable — skip it silently
            # ensure forward progress
            if j <= i:
                j = i + 1
            i = j
            continue
        if ch == "{":
            depth = 1
            j = i + 1
            in_tmpl = False
            in_str: str | None = None
            while j < n and depth > 0:
                c = region[j]
                if in_str:
                    if c == "\\":
                        j += 2
                        continue
                    if c == in_str:
                        in_str = None
                elif in_tmpl:
                    if c == "\\":
                        j += 2
                        continue
                    if c == "`":
                        in_tmpl = False
                elif c == "`":
                    in_tmpl = True
                elif c in '"\'':
                    in_str = c
                elif c == "{":
                    depth += 1
                elif c == "}":
                    depth -= 1
                j += 1
            body = region[i + 1 : j - 1]
            tokens.append({"kind": "expr", "body": body})
            i = j
            continue
        # plain text until next < or {
        j = i
        while j < n and region[j] not in "<{":
            j += 1
        text = region[i:j].strip()
        if text:
            tokens.append({"kind": "text", "text": text})
        i = j
    return tokens


# ---------------------------------------------------------------------------
# Renderers
# ---------------------------------------------------------------------------

HEADER_CALLOUT_ICONS = {"info": "💡", "warn": "⚠️", "tip": "✅"}


_BRACE_ESC_RE = re.compile(r'\{"\{"\}|\{"\}"\}')


def _strip_brace_escapes(code: str) -> str:
    """JSX escapes literal `{` as `{"{"}` and `}` as `{"}"}` inside template
    literals that live inside JSX children. Unescape these back to plain
    braces for the emitted Python code."""
    def _sub(m: re.Match[str]) -> str:
        return "{" if m.group(0) == '{"{"}' else "}"

    return _BRACE_ESC_RE.sub(_sub, code)


def _render_nb_or_code(tag: str, attrs: dict[str, str], inner: str) -> str:
    """Render <NB title="..." n={N}>`...`</NB> or <Code>`...`</Code>."""
    s = _extract_string_content_for_code(inner)
    s = _strip_brace_escapes(s)
    # keep trailing newline-less
    code = s.rstrip()
    title = attrs.get("title", "")
    n = attrs.get("n", "")
    header = []
    if title or n:
        if title and n:
            header.append(f"# Cell {n}: {title}")
        elif title:
            header.append(f"# {title}")
        elif n:
            header.append(f"# Cell {n}")
    if header:
        code = "\n".join(header) + "\n" + code
    return f"```python\n{code}\n```"


def _render_callout(attrs: dict[str, str], inner: str) -> str:
    ctype = attrs.get("type", "info")
    title = attrs.get("title", "")
    icon = HEADER_CALLOUT_ICONS.get(ctype, "💡")
    body = _extract_string_content(inner)
    body_md = inline_html_to_md(body)
    # collapse to one logical paragraph
    body_md = re.sub(r"\s*\n\s*", " ", body_md).strip()
    return f"> **{icon} {title}**\n>\n> {body_md}"


def _render_sec(attrs: dict[str, str], inner: str) -> str:
    """<Sec n="1" title="Foo"> -> ## 1. Foo header, plus rendered inner."""
    n = attrs.get("n", "")
    title = attrs.get("title", "")
    heading = f"## {n}. {title}" if n else f"## {title}"
    body = _render_region(inner)
    return f"{heading}\n\n{body}" if body else heading


def _render_p(inner: str) -> str:
    s = _extract_string_content(inner)
    md = inline_html_to_md(s)
    # normalise internal hard-wraps
    md = re.sub(r"\n{3,}", "\n\n", md)
    return md


def _render_h3(inner: str) -> str:
    s = _extract_string_content(inner)
    s = inline_html_to_md(s)
    return f"### {s}"


def _render_cap(inner: str) -> str:
    s = _extract_string_content(inner)
    s = inline_html_to_md(s)
    return f"*{s}*"


def _render_quote(inner: str) -> str:
    s = _extract_string_content(inner)
    md = inline_html_to_md(s)
    return "> " + md.replace("\n", "\n> ")


def _diagram_placeholder(tag: str) -> str:
    # Human-readable names from CamelCase component name
    pretty = re.sub(r"([a-z])([A-Z])", r"\1 \2", tag)
    return f"*[Figure: {pretty} — see interactive JSX version]*"


def _render_region(region: str) -> str:
    """Recursively render a region of JSX children to markdown."""
    tokens = _split_children(region)
    parts: list[str] = []
    i = 0
    while i < len(tokens):
        tok = tokens[i]
        if tok["kind"] == "text":
            t = tok["text"]
            if t:
                parts.append(t)
        elif tok["kind"] == "expr":
            body = tok["body"].strip()
            # Strip wrappers like `...` or "..."
            if body.startswith("`") and body.endswith("`"):
                txt = _decode_template_literal(body[1:-1])
                parts.append(inline_html_to_md(txt))
            elif (body.startswith('"') and body.endswith('"')) or (
                body.startswith("'") and body.endswith("'")
            ):
                parts.append(inline_html_to_md(body[1:-1]))
            # else: ignore (likely logic)
        elif tok["kind"] == "element":
            tag = tok["tag"]
            attrs = tok["attrs"]
            inner = tok["inner"]
            if not tag:
                # malformed/unparseable — skip
                i += 1
                continue
            if tag == "Sec":
                parts.append(_render_sec(attrs, inner))
            elif tag in ("P", "p"):
                rendered = _render_p(inner)
                if rendered:
                    parts.append(rendered)
            elif tag in ("H3", "h3"):
                parts.append(_render_h3(inner))
            elif tag in ("H2", "h2"):
                s = inline_html_to_md(_extract_string_content(inner))
                parts.append(f"## {s}")
            elif tag in ("H4", "h4"):
                s = inline_html_to_md(_extract_string_content(inner))
                parts.append(f"#### {s}")
            elif tag in ("NB", "Code"):
                parts.append(_render_nb_or_code(tag, attrs, inner))
            elif tag == "Callout":
                parts.append(_render_callout(attrs, inner))
            elif tag == "Cap":
                parts.append(_render_cap(inner))
            elif tag == "DC":
                # drop-cap paragraph
                parts.append(_render_p(inner))
            elif tag == "PQ":
                parts.append(_render_quote(inner))
            elif tag == "SB":
                # sidebar box: title + body
                t = attrs.get("title", "")
                body = inline_html_to_md(_extract_string_content(inner))
                if t:
                    parts.append(f"> **{t}**\n>\n> {body}")
                else:
                    parts.append(f"> {body}")
            elif tag == "IC":
                # image caption: {func, caption}
                caption = attrs.get("caption", "")
                if caption:
                    parts.append(inline_html_to_md(f"*{caption}*"))
            elif tag == "Photograph":
                # Inline editorial photograph:
                #   ![caption or alt](src)
                #   *caption — [credit](href)*
                src = attrs.get("src", "")
                alt = attrs.get("alt", "")
                caption = attrs.get("caption", "")
                credit = attrs.get("credit", "")
                href = attrs.get("href", "")
                label = caption or alt
                if src:
                    lines: list[str] = []
                    lines.append(f"![{label}]({src})")
                    if caption and credit and href:
                        lines.append(f"*{caption} — [{credit}]({href})*")
                    elif caption and credit:
                        lines.append(f"*{caption} — {credit}*")
                    elif caption:
                        lines.append(f"*{caption}*")
                    elif credit and href:
                        lines.append(f"*[{credit}]({href})*")
                    elif credit:
                        lines.append(f"*{credit}*")
                    parts.append("\n\n".join(lines))
            elif tag == "BR":
                parts.append("\n---\n")
            elif tag == "Callout":
                parts.append(_render_callout(attrs, inner))
            elif tag == "div":
                # just recurse into inner content, drop styling
                parts.append(_render_region(inner))
            elif tag in ("style", "svg"):
                # these are decorative; skip entirely
                continue
            elif tag == "table":
                # Preserve as HTML if present
                parts.append(tok["raw"])
            else:
                # custom SVG-style component? render placeholder only if
                # it's self-closing or at the top level; otherwise render
                # its inner content (some non-standard wrappers contain
                # nested prose, e.g. header sections in non-standard files).
                if inner.strip() == "":
                    parts.append(_diagram_placeholder(tag))
                else:
                    # Try to render its inner — if nothing comes out,
                    # emit a placeholder instead.
                    rendered = _render_region(inner)
                    if rendered.strip():
                        parts.append(rendered)
                    else:
                        parts.append(_diagram_placeholder(tag))
        i += 1
    # join, ensuring blank lines between block-level pieces
    return "\n\n".join(p for p in parts if p.strip())


# ---------------------------------------------------------------------------
# Standard-template entry point
# ---------------------------------------------------------------------------


HERO_STRIP_MARKERS = [
    # drop hero <div> wrappers — detect the <Sec n="1" ...> as the true start
]


def convert_standard(src: str) -> str:
    body_region = _find_export_body(src)
    # Find the first <Sec n="1" – that's where real content begins. If the
    # file doesn't use <Sec ...> at the top level, its structure is
    # non-standard and we should route to the fallback extractor (which
    # is O(N) rather than recursive).
    m = re.search(r"<Sec\s+n=", body_region)
    if not m:
        raise ValueError("no <Sec> elements — non-standard template")
    slice_ = body_region[m.start() :]
    return _render_region(slice_)


# ---------------------------------------------------------------------------
# Fallback for non-standard files
# ---------------------------------------------------------------------------


def _collect_anchored(src: str, open_pat: str, close_lit: str) -> list[tuple[int, int, str]]:
    """Find non-overlapping (open_match, close_pos, body) by anchored search.

    `open_pat` is a regex for the OPENING marker (compiled without DOTALL); the
    close is a literal string. Returns a list of (start, end_after_close, body)
    tuples — body is the raw source between open end and close start.
    """
    out: list[tuple[int, int, str]] = []
    pat = re.compile(open_pat, re.DOTALL)
    i = 0
    n = len(src)
    while i < n:
        m = pat.search(src, i)
        if not m:
            break
        close_start = src.find(close_lit, m.end())
        if close_start == -1:
            break
        body = src[m.end() : close_start]
        out.append((m.start(), close_start + len(close_lit), body, m))
        i = close_start + len(close_lit)
    return out


def _find_all_events(src: str) -> list[tuple[int, str, dict]]:
    """Scan for all recognised content fragments and return them as
    (offset, kind, payload) triples sorted by offset. Uses literal-
    anchored scanning to avoid catastrophic backtracking."""
    events: list[tuple[int, str, dict]] = []

    # <Sec n="..." title="..."> — produce a heading
    for m in re.finditer(r'<Sec\s+n="([^"]*)"\s+title="([^"]*)"', src):
        events.append((m.start(), "sec", {"n": m.group(1), "title": m.group(2)}))

    # <Callout ...>{`...`}</Callout>  — scan by finding the opener, then the
    # next {`, then backtick-}, then </Callout>
    for m in re.finditer(r"<Callout\b([^>]*)>", src):
        attrs = _parse_attrs(m.group(1))
        # find {` right after
        s = m.end()
        if s < len(src) and src[s] == "{":
            tick_start = src.find("`", s)
            if tick_start == -1 or tick_start > s + 3:
                continue
            tick_end = _find_matching_backtick(src, tick_start + 1)
            if tick_end == -1:
                continue
            close = src.find("</Callout>", tick_end)
            if close == -1:
                continue
            body = src[tick_start + 1 : tick_end]
            events.append(
                (m.start(), "callout", {"attrs": attrs, "body": body})
            )

    # <NB title="..." n={N}>{`...`}</NB>
    for m in re.finditer(r'<NB\s+title="([^"]*)"\s+n=\{(\d+)\}>', src):
        title = m.group(1)
        n_val = m.group(2)
        s = m.end()
        if s < len(src) and src[s] == "{":
            tick_start = src.find("`", s)
            if tick_start == -1 or tick_start > s + 3:
                continue
            tick_end = _find_matching_backtick(src, tick_start + 1)
            if tick_end == -1:
                continue
            close = src.find("</NB>", tick_end)
            if close == -1:
                continue
            body = src[tick_start + 1 : tick_end]
            events.append(
                (m.start(), "nb", {"title": title, "n": n_val, "body": body})
            )

    # <Code ...>{`...`}</Code> — optional title
    for m in re.finditer(r'<Code(?:\s+title="([^"]*)")?>', src):
        title = m.group(1) or ""
        s = m.end()
        if s < len(src) and src[s] == "{":
            tick_start = src.find("`", s)
            if tick_start == -1 or tick_start > s + 3:
                continue
            tick_end = _find_matching_backtick(src, tick_start + 1)
            if tick_end == -1:
                continue
            close = src.find("</Code>", tick_end)
            if close == -1:
                continue
            body = src[tick_start + 1 : tick_end]
            events.append(
                (m.start(), "code", {"title": title, "body": body})
            )

    # <P>{`...`}</P>
    for m in re.finditer(r"<P>\{", src):
        s = m.end()
        tick_start = s - 1
        # we matched `<P>{` so tick should be next
        if src[s - 1] == "{" and src[s] == "`":
            tick_start = s
            tick_end = _find_matching_backtick(src, tick_start + 1)
            if tick_end == -1:
                continue
            close = src.find("</P>", tick_end)
            if close == -1:
                continue
            events.append(
                (m.start(), "p", {"body": src[tick_start + 1 : tick_end]})
            )

    # <DC>{`...`}</DC>
    for m in re.finditer(r"<DC>\{", src):
        s = m.end()
        if src[s - 1] == "{" and src[s] == "`":
            tick_end = _find_matching_backtick(src, s + 1)
            if tick_end == -1:
                continue
            close = src.find("</DC>", tick_end)
            if close == -1:
                continue
            events.append((m.start(), "p", {"body": src[s + 1 : tick_end]}))

    # <Cap>...</Cap>  (text children, no template wrapper in standard form)
    for m in re.finditer(r"<Cap>", src):
        close = src.find("</Cap>", m.end())
        if close == -1:
            continue
        body = src[m.end() : close]
        events.append((m.start(), "cap", {"body": body}))

    # <PQ>...</PQ> blockquote
    for m in re.finditer(r"<PQ>", src):
        close = src.find("</PQ>", m.end())
        if close == -1:
            continue
        events.append((m.start(), "pq", {"body": src[m.end() : close]}))

    # <SB title="...">{`...`}</SB>
    for m in re.finditer(r'<SB\s+title="([^"]*)">\{', src):
        title = m.group(1)
        s = m.end()
        if src[s - 1] == "{" and src[s] == "`":
            tick_end = _find_matching_backtick(src, s + 1)
            if tick_end == -1:
                continue
            close = src.find("</SB>", tick_end)
            if close == -1:
                continue
            events.append(
                (
                    m.start(),
                    "sb",
                    {"title": title, "body": src[s + 1 : tick_end]},
                )
            )

    # <IC func="..." caption="..."/>
    for m in re.finditer(
        r'<IC\s+func="[^"]*"\s+caption="([^"]*)"\s*/?>', src
    ):
        events.append((m.start(), "ic", {"caption": m.group(1)}))

    # <Photograph src="..." alt="..." caption="..." credit="..." href="..." />
    # Self-closing; attributes may appear in any order. Scan for the opener and
    # parse attributes via the shared _parse_attrs helper.
    for m in re.finditer(r"<Photograph\b([^>]*?)/?>", src):
        attrs = _parse_attrs(m.group(1))
        events.append((m.start(), "photograph", {"attrs": attrs}))

    # <H3>...</H3>
    for m in re.finditer(r"<H3>", src):
        close = src.find("</H3>", m.end())
        if close == -1:
            continue
        events.append((m.start(), "h3", {"text": src[m.end() : close]}))

    # <H3>{`...`}</H3> alt form — the above already catches it if no { directly

    # <N t="..." icon="..." title="..."> ... </N> — callout variant in
    # feature-selection article
    for m in re.finditer(r"<N\s+([^>]*)>", src):
        attrs = _parse_attrs(m.group(1))
        close = src.find("</N>", m.end())
        if close == -1:
            continue
        body = src[m.end() : close]
        events.append((m.start(), "n", {"attrs": attrs, "body": body}))

    # Chapter title blocks in feature-selection-ts-deep-dive:
    #   <div className="cht">TITLE</div>
    for m in re.finditer(r'<div\s+className="cht"\s*>', src):
        close = src.find("</div>", m.end())
        if close == -1:
            continue
        events.append((m.start(), "cht", {"text": src[m.end() : close]}))

    # chapter description/body paragraphs in ds items
    for m in re.finditer(r'<div\s+className="dbtit"\s*>', src):
        close = src.find("</div>", m.end())
        if close == -1:
            continue
        events.append((m.start(), "dbtit", {"text": src[m.end() : close]}))
    for m in re.finditer(r'<div\s+className="dbde"\s*>', src):
        close = src.find("</div>", m.end())
        if close == -1:
            continue
        events.append((m.start(), "dbde", {"text": src[m.end() : close]}))

    # Plain <p> (no template) — used in feature-selection article prose
    for m in re.finditer(r"<p>", src):
        close = src.find("</p>", m.end())
        if close == -1:
            continue
        events.append((m.start(), "p_html", {"text": src[m.end() : close]}))

    # JS-literal arrays of the form [["01","Title","Description"], ...]
    # used in feature-selection-ts-deep-dive for numbered diagnostic lists.
    # Match conservatively on three quoted strings per row.
    for m in re.finditer(
        r'\[\s*"(\d{2})"\s*,\s*"([^"]+)"\s*,\s*"([^"]+)"\s*\]',
        src,
    ):
        events.append(
            (
                m.start(),
                "ds_item",
                {
                    "num": m.group(1),
                    "title": m.group(2),
                    "desc": m.group(3),
                },
            )
        )

    # <p className="...">  (splitwise and similar)
    for m in re.finditer(r"<p\s+className=\"[^\"]*\"\s*>", src):
        close = src.find("</p>", m.end())
        if close == -1:
            continue
        events.append((m.start(), "p_html", {"text": src[m.end() : close]}))

    # <h2> headings — plain and with className
    for m in re.finditer(r"<h2(?:\s+className=\"[^\"]*\")?\s*>", src):
        close = src.find("</h2>", m.end())
        if close == -1:
            continue
        events.append((m.start(), "h2_html", {"text": src[m.end() : close]}))

    # <h3> headings with className (otherwise captured above)
    for m in re.finditer(r"<h3\s+className=\"[^\"]*\"\s*>", src):
        close = src.find("</h3>", m.end())
        if close == -1:
            continue
        events.append((m.start(), "h3_html", {"text": src[m.end() : close]}))

    # <h1 className="...">  headline
    for m in re.finditer(r"<h1(?:\s+className=\"[^\"]*\")?\s*>", src):
        close = src.find("</h1>", m.end())
        if close == -1:
            continue
        events.append((m.start(), "h1_html", {"text": src[m.end() : close]}))

    # <pre><code>CODE</code></pre>  — may include className on either
    for m in re.finditer(r"<pre(?:\s+[^>]*)?>", src):
        close = src.find("</pre>", m.end())
        if close == -1:
            continue
        inner = src[m.end() : close]
        # strip leading <code> wrapper if present
        cm = re.match(r"\s*<code(?:\s+[^>]*)?>", inner)
        if cm:
            code_start = cm.end()
            code_end = inner.rfind("</code>")
            if code_end > code_start:
                code = inner[code_start:code_end]
                events.append((m.start(), "code_block", {"code": code}))
                continue
        events.append((m.start(), "code_block", {"code": inner}))

    # <div className="callout ..."> body </div>  — splitwise-style callouts.
    # The callout contents may include other HTML, so find the *next* </div>
    # after the opening tag (single level — these are not nested).
    for m in re.finditer(r"<div\s+className=\"callout[^\"]*\"\s*>", src):
        close = _find_balanced_div(src, m.end())
        if close == -1:
            continue
        events.append(
            (m.start(), "callout_div", {"body": src[m.end() : close], "end": close + len("</div>")})
        )

    # <div className="sidebar-note">  for splitwise
    for m in re.finditer(
        r"<div\s+className=\"sidebar-note\"\s*>", src
    ):
        close = _find_balanced_div(src, m.end())
        if close == -1:
            continue
        events.append(
            (m.start(), "sidebar", {"body": src[m.end() : close], "end": close + len("</div>")})
        )

    # <div className="pull-quote">  for splitwise
    for m in re.finditer(r"<div\s+className=\"pull-quote\"\s*>", src):
        close = _find_balanced_div(src, m.end())
        if close == -1:
            continue
        events.append(
            (m.start(), "pq", {"body": src[m.end() : close], "end": close + len("</div>")})
        )

    # <blockquote>...</blockquote>
    for m in re.finditer(r"<blockquote[^>]*>", src):
        close = src.find("</blockquote>", m.end())
        if close == -1:
            continue
        events.append((m.start(), "pq", {"body": src[m.end() : close]}))

    events.sort(key=lambda x: x[0])
    return events


def _find_balanced_div(src: str, start: int) -> int:
    """Starting just past a <div ...> opening tag, find the offset of its
    matching </div>. Skips nested <div ...> .. </div> pairs. Ignores
    content inside template literals and strings only superficially —
    good enough for JSX content blocks like callouts."""
    depth = 1
    i = start
    n = len(src)
    while i < n:
        # find next <div or </div
        open_idx = src.find("<div", i)
        close_idx = src.find("</div>", i)
        if close_idx == -1:
            return -1
        if open_idx != -1 and open_idx < close_idx:
            # ensure it's a real tag (next char is whitespace or >)
            after = src[open_idx + 4 : open_idx + 5]
            if after in (" ", ">", "\t", "\n"):
                depth += 1
                i = open_idx + 4
                continue
            # not a div tag, skip past
            i = open_idx + 4
            continue
        depth -= 1
        if depth == 0:
            return close_idx
        i = close_idx + len("</div>")
    return -1


def _find_matching_backtick(src: str, start: int) -> int:
    """Find the closing backtick for a JS template literal starting at start.

    Skips escaped `\\`` and tolerates `${...}` expressions (balanced braces).
    Returns index of closing backtick, or -1 if not found.
    """
    i = start
    n = len(src)
    while i < n:
        ch = src[i]
        if ch == "\\":
            i += 2
            continue
        if ch == "$" and i + 1 < n and src[i + 1] == "{":
            # balanced braces
            depth = 1
            j = i + 2
            while j < n and depth > 0:
                c = src[j]
                if c == "{":
                    depth += 1
                elif c == "}":
                    depth -= 1
                j += 1
            i = j
            continue
        if ch == "`":
            return i
        i += 1
    return -1


def generic_text_extraction(src: str) -> str:
    """Walk the JSX from export onward and emit prose by scanning for
    individual recognised constructs using literal-anchored searches.

    Handles standard-template articles AND the non-standard ones
    (feature-selection-ts-deep-dive, safe-ts, splitwise) without
    risking catastrophic regex backtracking.
    """
    body = _find_export_body(src)
    events = _find_all_events(body)
    # Drop events that overlap an earlier consumed range — prevents double-
    # emitting prose when outer elements contain recognised children.
    # We walk forward; any event whose start is inside a previously
    # consumed span is dropped.
    consumed_end = -1
    parts: list[str] = []
    for off, kind, payload in events:
        if off < consumed_end:
            # nested inside something we already emitted; skip
            continue
        # update consumed_end for events that have a known end marker
        if "end" in payload:
            consumed_end = payload["end"]
        if kind == "sec":
            parts.append(f"## {payload['n']}. {payload['title']}")
            # don't extend consumed_end — Sec itself has no body here
            continue
        if kind == "callout":
            attrs = payload["attrs"]
            ctype = attrs.get("type", "info")
            title = attrs.get("title", "")
            icon = HEADER_CALLOUT_ICONS.get(ctype, "💡")
            body_md = inline_html_to_md(_decode_template_literal(payload["body"]))
            body_md = re.sub(r"\s*\n\s*", " ", body_md).strip()
            parts.append(f"> **{icon} {title}**\n>\n> {body_md}")
        elif kind == "nb":
            code = _strip_brace_escapes(
                _decode_template_literal(payload["body"], preserve_escapes=True)
            ).rstrip()
            header = f"# Cell {payload['n']}: {payload['title']}\n"
            parts.append(f"```python\n{header}{code}\n```")
        elif kind == "code":
            code = _strip_brace_escapes(
                _decode_template_literal(payload["body"], preserve_escapes=True)
            ).rstrip()
            header = (
                f"# {payload['title']}\n" if payload["title"] else ""
            )
            parts.append(f"```python\n{header}{code}\n```")
        elif kind == "p":
            text = inline_html_to_md(_decode_template_literal(payload["body"]))
            if text:
                parts.append(text)
        elif kind == "cap":
            text = inline_html_to_md(payload["body"])
            if text:
                parts.append(f"*{text}*")
        elif kind == "pq":
            text = inline_html_to_md(payload["body"])
            if text:
                parts.append("> " + text)
        elif kind == "sb":
            body_md = inline_html_to_md(
                _decode_template_literal(payload["body"])
            )
            parts.append(f"> **{payload['title']}**\n>\n> {body_md}")
        elif kind == "ic":
            txt = inline_html_to_md(payload["caption"])
            if txt:
                parts.append(f"*{txt}*")
        elif kind == "photograph":
            attrs = payload["attrs"]
            src_url = attrs.get("src", "")
            alt = attrs.get("alt", "")
            caption = attrs.get("caption", "")
            credit = attrs.get("credit", "")
            href = attrs.get("href", "")
            label = caption or alt
            if src_url:
                chunk: list[str] = [f"![{label}]({src_url})"]
                if caption and credit and href:
                    chunk.append(f"*{caption} — [{credit}]({href})*")
                elif caption and credit:
                    chunk.append(f"*{caption} — {credit}*")
                elif caption:
                    chunk.append(f"*{caption}*")
                elif credit and href:
                    chunk.append(f"*[{credit}]({href})*")
                elif credit:
                    chunk.append(f"*{credit}*")
                parts.append("\n\n".join(chunk))
        elif kind == "h3":
            txt = inline_html_to_md(payload["text"])
            if txt:
                parts.append(f"### {txt}")
        elif kind == "n":
            attrs = payload["attrs"]
            title = attrs.get("title", "")
            icon = attrs.get("icon", "💡")
            body_md = inline_html_to_md(payload["body"])
            body_md = re.sub(r"\s*\n\s*", " ", body_md).strip()
            parts.append(f"> **{icon} {title}**\n>\n> {body_md}")
        elif kind == "cht":
            parts.append(f"### {inline_html_to_md(payload['text'])}")
        elif kind == "dbtit":
            text = inline_html_to_md(payload["text"]).strip()
            # Skip bare JSX expressions like `{t}` that come from
            # template placeholders rather than literal content.
            if text and not re.fullmatch(r"\{\w+\}", text):
                parts.append(f"**{text}**")
        elif kind == "dbde":
            text = inline_html_to_md(payload["text"]).strip()
            if text and not re.fullmatch(r"\{\w+\}", text):
                parts.append(text)
        elif kind == "p_html":
            txt = inline_html_to_md(payload["text"])
            if txt:
                parts.append(txt)
        elif kind == "h1_html":
            txt = inline_html_to_md(payload["text"])
            if txt:
                parts.append(f"# {txt}")
        elif kind == "h2_html":
            txt = inline_html_to_md(payload["text"])
            # Insert a period+space between a leading section number and
            # the title text where the JSX used a <span> to visually
            # separate them (e.g. "01The Problem" → "01. The Problem").
            txt = re.sub(r"^(\d{1,3})([A-Z])", r"\1. \2", txt)
            if txt:
                parts.append(f"## {txt}")
        elif kind == "h3_html":
            txt = inline_html_to_md(payload["text"])
            if txt:
                parts.append(f"### {txt}")
        elif kind == "code_block":
            code = payload["code"]
            # HTML-decode (pre tags may contain &lt; etc.)
            code = html.unescape(code)
            # strip stray <span className="kw">...</span> colouring
            code = re.sub(r"<span\s+className=\"[^\"]*\">", "", code)
            code = code.replace("</span>", "")
            parts.append(f"```python\n{code.strip()}\n```")
        elif kind == "callout_div":
            raw = payload["body"]
            # Extract optional label: <div className="callout-label">X</div>
            label = "Note"
            lm = re.search(
                r'<div\s+className="callout-label"\s*>([\s\S]*?)</div>', raw
            )
            if lm:
                label = inline_html_to_md(lm.group(1)).strip() or "Note"
                # remove the label element from the body
                raw = raw[: lm.start()] + raw[lm.end() :]
            body_md = inline_html_to_md(raw)
            body_md = re.sub(r"\n{3,}", "\n\n", body_md).strip()
            # Indent every line with '> ' for markdown blockquote
            body_md = "\n".join("> " + ln if ln else ">" for ln in body_md.split("\n"))
            parts.append(f"> **💡 {label}**\n>\n{body_md}")
        elif kind == "ds_item":
            parts.append(
                f"**{payload['num']}. {payload['title']}** — {payload['desc']}"
            )
        elif kind == "sidebar":
            raw = payload["body"]
            label = "Note"
            lm = re.search(
                r'<div\s+className="sidebar-note-title"\s*>([\s\S]*?)</div>',
                raw,
            )
            if lm:
                label = inline_html_to_md(lm.group(1)).strip() or "Note"
                raw = raw[: lm.start()] + raw[lm.end() :]
            body_md = inline_html_to_md(raw).strip()
            body_md = "\n".join("> " + ln if ln else ">" for ln in body_md.split("\n"))
            parts.append(f"> **💡 {label}**\n>\n{body_md}")

    return "\n\n".join(p for p in parts if p.strip())


# ---------------------------------------------------------------------------
# Per-slug dispatcher
# ---------------------------------------------------------------------------


def convert_slug(slug: str) -> str:
    path = JSX_DIR / f"{slug}.jsx"
    src = path.read_text(encoding="utf-8")
    try:
        md = convert_standard(src)
        # heuristic: standard-template output should be substantial
        if len(md) < 1500:
            raise ValueError("standard output too short")
        return md
    except Exception as exc:
        sys.stderr.write(f"[fallback] {slug}: {exc}\n")
        return generic_text_extraction(src)


def _update_md(slug: str, new_body: str) -> tuple[int, int]:
    md_path = MD_DIR / f"{slug}.md"
    MD_DIR.mkdir(parents=True, exist_ok=True)
    if md_path.exists():
        existing = md_path.read_text(encoding="utf-8")
        # Keep everything up to and including the "View Full Article" line + one
        # blank line; discard the rest.
        m = re.search(
            r"(\*\*\[📑 View Full (?:Article|Interactive).+?\)\*\*\n)", existing
        )
        if m:
            header = existing[: m.end()]
        else:
            # Missing marker — rebuild a minimal header so the file stays usable.
            sys.stderr.write(
                f"[warn] {md_path}: no View-Full marker; regenerating minimal header\n"
            )
            header = (
                f"# {slug}\n\n"
                f"**[📑 View Full Article on the JSX Space →]"
                f"(https://helwyr55-library-articles.static.hf.space/articles/"
                f"{slug}.html)**\n"
            )
    else:
        # First-time generation (e.g. CI without the sibling library/ checkout).
        # Build a minimal header so the extractor has somewhere to anchor.
        header = (
            f"# {slug}\n\n"
            f"**[📑 View Full Article on the JSX Space →]"
            f"(https://helwyr55-library-articles.static.hf.space/articles/"
            f"{slug}.html)**\n"
        )
    new_content = header.rstrip() + "\n\n---\n\n" + new_body.rstrip() + "\n"
    md_path.write_text(new_content, encoding="utf-8")
    return len(new_content), new_content.count("\n")


def main() -> int:
    report: list[tuple[str, int, int]] = []
    for slug in SLUGS:
        try:
            md_body = convert_slug(slug)
        except Exception as exc:
            sys.stderr.write(f"[ERROR] {slug}: {exc}\n")
            continue
        chars, lines = _update_md(slug, md_body)
        report.append((slug, chars, lines))
    if not report:
        # CI environments may lack the sibling `library/` checkout; nothing to
        # write. Exit 0 so the build job doesn't fail for a missing-optional.
        sys.stderr.write(
            "[info] jsx_to_markdown: no slugs produced output (sibling library/ "
            "not present or no articles found). Skipping markdown-mirror step.\n"
        )
        return 0
    width = max(len(s) for s, _, _ in report)
    for slug, chars, lines in report:
        print(f"{slug.ljust(width)}  {chars:>7d} chars  {lines:>4d} lines")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
