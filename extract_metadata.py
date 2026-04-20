"""
Post-build metadata enrichment for the JSX articles.
Parses each .jsx to extract the real article title, subtitle, tags, and style,
rewrites the corresponding .meta.json with this richer data, and regenerates
the index.html + _manifest.json by re-running build.py.

Also creates markdown stub files in the main Streamlit library so every JSX
article appears in both the static HF space and the Streamlit app.
"""

import json
import re
import subprocess
from datetime import date
from pathlib import Path

LIB_ARTICLES = Path(__file__).resolve().parent
LIB = LIB_ARTICLES.parent / "library"
ARTICLES_DIR = LIB_ARTICLES / "articles"
LIB_MARKDOWN_DIR = LIB / "articles"

JSX_SPACE_BASE = "https://helwyr55-library-articles.static.hf.space/articles"

# Regex patterns for extracting article metadata from JSX
H1_RE = re.compile(r'<h1[^>]*>([^<]+)</h1>')
SUBTITLE_PATTERNS = [
    re.compile(r'<p[^>]*fontSize:\s*18[^>]*>\s*\{?["\'`]?([^"\'`<]+?)["\'`]?\}?\s*</p>', re.DOTALL),
    re.compile(r'<p[^>]*fontSize:["\s]*(?:17|18|19|20)[^>]*>[^<]*?\{?["\'`]([^"\'`]+)["\'`]\}?[^<]*?</p>', re.DOTALL),
]
HEADER_TAGS_RE = re.compile(
    r'<span[^>]*(?:letterSpacing|textTransform:\s*["\']?uppercase)[^>]*>([^<]+)</span>.*?'
    r'<span[^>]*>\s*([^<]+?)\s*</span>',
    re.DOTALL,
)
CATEGORY_LABEL_RE = re.compile(
    r'fontSize:\s*12[^}]*fontWeight:\s*600[^}]*letterSpacing[^}]*?\}\}>\s*([A-Z][A-Z0-9 \-·&]+)\s*</div>',
    re.DOTALL,
)

# Category / style inference from header tag text
CATEGORY_KEYWORDS = {
    "time-series": ["time series", "forecasting", "temporal", "ts "],
    "deep-learning": ["neural", "deep learning", "transformer"],
    "nlp": ["nlp", "llm", "language model", "rag"],
    "statistics": ["bayesian", "probabilistic", "statistical", "conformal"],
    "feature-engineering": ["feature engineering", "feature selection"],
    "machine-learning": ["ml ", "machine learning", "interpretability", "boosting",
                          "ensemble", "tree", "catboost", "ebm", "pfi", "shap"],
    "python": ["python", "scikit"],
    "mlops": ["deployment", "production", "mlops"],
}

STYLE_KEYWORDS = {
    "technical-ds": ["technical", "encyclopaedic article", "definitive guide"],
    "encyclopaedic": ["encyclopaedic"],
}

TAG_MAP = {
    "pfi-definitive-guide":           ("permutation-importance", "feature-importance", "interpretability"),
    "catboost-guide":                 ("catboost", "gradient-boosting", "tabular-ml"),
    "probabilistic-forecasting-guide":("probabilistic-forecasting", "time-series", "uncertainty"),
    "stochastic-dp-encyclopaedic-article":("stochastic-dp", "optimization", "reinforcement-learning"),
    "conformal-prediction-guide":     ("conformal-prediction", "uncertainty", "calibration"),
    "splitwise-python-article":       ("python", "software-engineering", "ddods"),
    "rag-2026-definitive-guide":      ("rag", "llm", "retrieval", "generative-ai"),
    "ts-feature-engineering-guide":   ("time-series", "feature-engineering", "forecasting"),
    "safe-ts-article":                ("safe", "feature-extraction", "time-series"),
    "ebm-definitive-guide":           ("ebm", "interpretable-ml", "glassbox"),
    "shapash-timeseries-technical-article":("shapash", "interpretability", "time-series"),
    "feature-selection-ts-deep-dive": ("feature-selection", "time-series", "forecasting"),
    "test-chart-article":             ("statistics", "visualisation", "test"),
}

CATEGORY_OVERRIDE = {
    "pfi-definitive-guide":           "machine-learning",
    "catboost-guide":                 "machine-learning",
    "probabilistic-forecasting-guide":"time-series",
    "stochastic-dp-encyclopaedic-article":"machine-learning",
    "conformal-prediction-guide":     "statistics",
    "splitwise-python-article":       "python",
    "rag-2026-definitive-guide":      "nlp",
    "ts-feature-engineering-guide":   "time-series",
    "safe-ts-article":                "feature-engineering",
    "ebm-definitive-guide":           "machine-learning",
    "shapash-timeseries-technical-article":"time-series",
    "feature-selection-ts-deep-dive": "time-series",
    "test-chart-article":             "statistics",
}

READ_TIME_OVERRIDE = {
    "pfi-definitive-guide":           "18 min",
    "catboost-guide":                 "20 min",
    "probabilistic-forecasting-guide":"22 min",
    "stochastic-dp-encyclopaedic-article":"30 min",
    "conformal-prediction-guide":     "20 min",
    "splitwise-python-article":       "12 min",
    "rag-2026-definitive-guide":      "25 min",
    "ts-feature-engineering-guide":   "18 min",
    "safe-ts-article":                "22 min",
    "ebm-definitive-guide":           "22 min",
    "shapash-timeseries-technical-article":"15 min",
    "feature-selection-ts-deep-dive": "20 min",
    "test-chart-article":             "3 min",
}


def humanize(slug: str) -> str:
    words = slug.replace("-", " ").replace("_", " ").split()
    keep_upper = {"pfi", "ebm", "rag", "ts", "llm", "ml", "ai", "sdp"}
    out = []
    for w in words:
        out.append(w.upper() if w.lower() in keep_upper else w.capitalize())
    return " ".join(out)


def extract_title_and_subtitle(jsx_text: str, slug: str) -> tuple[str, str]:
    """Extract h1 title and the immediately-following paragraph as subtitle."""
    # Find h1 — look for 'fontSize:"clamp' or 'fontFamily:F.h,fontSize:' pattern
    h1_match = re.search(
        r'<h1[^>]*?>([^<{]+?)</h1>',
        jsx_text,
    )
    title = h1_match.group(1).strip() if h1_match else humanize(slug)

    # Subtitle — look for paragraph with fontSize 17-20 near the h1 (within 1500 chars after)
    if h1_match:
        chunk = jsx_text[h1_match.end(): h1_match.end() + 2000]
        sub = re.search(
            r'<p[^>]*fontSize:\s*(?:17|18|19|20)[^>]*>\s*([^<{]+?)\s*</p>',
            chunk,
        )
        if not sub:
            sub = re.search(
                r'fontSize:\s*(?:17|18|19|20)[^}]*\}\}>\s*([^<{]+?)\s*</p>',
                chunk,
            )
        subtitle = sub.group(1).strip() if sub else ""
    else:
        subtitle = ""

    # Strip any remaining template braces / JSX expressions from subtitle
    subtitle = re.sub(r'\s+', ' ', subtitle).strip()
    subtitle = subtitle.strip('"\'`{}')
    if len(subtitle) > 220:
        subtitle = subtitle[:217] + "..."

    return title, subtitle


def process_jsx(jsx_path: Path) -> dict:
    """Extract metadata from a .jsx, return dict suitable for meta.json + markdown stub."""
    slug = jsx_path.stem
    jsx_text = jsx_path.read_text(encoding="utf-8")

    title, subtitle = extract_title_and_subtitle(jsx_text, slug)

    tags = list(TAG_MAP.get(slug, ("technical", "data-science")))
    category = CATEGORY_OVERRIDE.get(slug, "machine-learning")
    read_time = READ_TIME_OVERRIDE.get(slug, "15 min")
    style = "encyclopaedic" if "encyclopaedic" in slug or "definitive" in slug else "technical-ds"

    return {
        "slug": slug,
        "title": title,
        "subtitle": subtitle,
        "date": str(date.today()),
        "tags": tags,
        "read_time": read_time,
        "category": category,
        "style": style,
    }


def update_meta_json(meta_path: Path, new_meta: dict):
    """Merge new metadata into an existing meta.json, preserving other fields."""
    existing = {}
    if meta_path.exists():
        try:
            existing = json.loads(meta_path.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            existing = {}
    existing.update(new_meta)
    meta_path.write_text(json.dumps(existing, indent=2), encoding="utf-8")


def write_markdown_stub(md_dir: Path, meta: dict):
    """Write a minimal markdown stub that links to the JSX version."""
    slug = meta["slug"]
    md_path = md_dir / f"{slug}.md"

    tags_yaml = "[" + ", ".join(meta["tags"]) + "]"
    jsx_url = f"{JSX_SPACE_BASE}/{slug}.html"

    content = f"""---
title: "{meta['title']}"
subtitle: "{meta['subtitle']}"
date: {meta['date']}
tags: {tags_yaml}
read_time: "{meta['read_time']}"
category: {meta['category']}
style: {meta['style']}
jsx_space_url: "{jsx_url}"
---

# {meta['title']}

## {meta['subtitle']}

> This is a rich JSX article with custom data visualisations, typography,
> and interactive Recharts diagrams. View the full-fidelity version on the
> companion static space:

**[\U0001f4d1 View Full Article on the JSX Space \u2192]({jsx_url})**

---

## Summary

A {meta['read_time']} technical article covering **{meta['title'].lower()}** — part of
the Data Science Library encyclopaedic article series. Topics tagged:
{', '.join(f'`{t}`' for t in meta['tags'])}.

For the full interactive article with code walkthroughs, Recharts visualisations,
and production guidance, follow the link above.
"""
    md_path.write_text(content, encoding="utf-8")
    return md_path


def main():
    print(f"Base: {LIB_ARTICLES}")
    print(f"Markdown target: {LIB_MARKDOWN_DIR}")
    print()

    jsx_files = sorted(ARTICLES_DIR.glob("*.jsx"))
    print(f"Found {len(jsx_files)} JSX article(s).\n")

    metas = []
    for jsx in jsx_files:
        meta = process_jsx(jsx)
        metas.append(meta)
        print(f"- {meta['slug']}")
        print(f"    title: {meta['title']}")
        print(f"    subtitle: {meta['subtitle'][:80]}{'...' if len(meta['subtitle']) > 80 else ''}")
        print(f"    category={meta['category']} style={meta['style']} read={meta['read_time']}")

        # Update the .meta.json
        update_meta_json(ARTICLES_DIR / f"{meta['slug']}.meta.json", meta)

        # Write markdown stub in the Streamlit library
        md_path = write_markdown_stub(LIB_MARKDOWN_DIR, meta)
        print(f"    -> stub: {md_path.relative_to(LIB)}")
        print()

    print(f"Processed {len(metas)} articles. Re-running build.py to refresh index...")
    result = subprocess.run(
        ["python3", str(LIB_ARTICLES / "build.py")],
        capture_output=True,
        text=True,
    )
    if result.returncode == 0:
        print("build.py refreshed index + manifest successfully.")
    else:
        print("build.py failed:", result.stderr)


if __name__ == "__main__":
    main()
