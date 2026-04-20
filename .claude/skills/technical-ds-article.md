---
name: technical-ds-article
description: Generate deeply researched, technical data science / ML / AI / statistics encyclopaedic articles with runnable Python, architectural diagrams, and practitioner-focused depth. Produces styled React JSX artifacts with a dark editorial aesthetic. Trigger on "technical DS article", "data science article", "ML technical guide", "practitioner's guide to [DS/ML topic]", "DS encyclopaedic article", "article with runnable code on [DS topic]", "definitive guide to [ML method]", "rewrite as a technical DS article", or any long-form request about ML/AI/statistics/DS that needs BOTH explanatory depth AND working Python. Do NOT use for travel/photography (→ travel-photography-article), science/nature/culture/exploration features (→ natgeo-article), short single-concept DDODS explainers under ~1,500 words (→ article-generator), or re-implementing an external article on local datasets (→ project-from-article).
---

# Technical Data Science Encyclopaedic Article Generator

## PURPOSE

Generate deeply researched, technically rigorous long-form articles that combine encyclopaedic breadth with practitioner-focused depth. The output should feel like the best article on the topic you've ever read — one that a senior data scientist would bookmark, a junior would learn from, and a product manager could follow. Every article treats concept explanation, code implementation, architectural diagrams, and use cases as co-equal elements — not decoration.

This skill produces styled React JSX artifacts (`.jsx`) that render in the Claude artifact viewer as production-grade reading experiences with custom typography, code blocks, SVG diagrams, callout boxes, and structured sections.

## SHARED CONVENTIONS

For component names, build-pipeline requirements, metadata contract, recognised style/category tokens, and output location — see `~/.claude/skills/shared-article-jsx-reference.md`. This skill overrides only the DESIGN SYSTEM (dark editorial aesthetic below) and the section taxonomy.

## OUTPUT FORMAT — REACT JSX ARTIFACT

Every article is delivered as a styled JSX file with this dark editorial design system:

### Design tokens
- **Backgrounds**: `#0f1117` or `#080c12` (dark editorial)
- **Fonts**:
  - `JetBrains Mono` — code
  - `DM Serif Display` — headings
  - `Instrument Sans` — body
- **Code blocks**: span-based syntax highlighting with token classes: `kw`, `fn`, `str`, `cm`, `num`, `cls`, `op`, `var`
- **Visual elements**: SVG architectural diagrams, callout boxes, comparison tables with badge ratings, decision use/avoid grids

### Article scope
Typically ten or more sections; mathematically rigorous with canonical source references. Section types to include:

1. **The Question the Method Answers** — problem framing, why now
2. **Algorithm / Approach** — visual diagram + mechanism explanation
3. **Mathematical Formulation** — formulas inline + intuition
4. **Code Walkthrough** — complete, runnable Python with output shown
5. **Critical Pitfalls** — multicollinearity, overfitting, leakage, etc.
6. **Train vs Test Considerations** — what changes, and why
7. **Visualisation / Interpretation** — how to read the output
8. **Workflow Diagram** — end-to-end pipeline
9. **Competitive Landscape** — vs SHAP, LIME, MDI, etc. with decision table
10. **When to Use / When Not To** — named alternatives

## MANDATORY ELEMENTS

### 1. Canonical references
Every method article must cite at least the seminal paper + one recent validation study. Use `web_fetch` on canonical package docs + `web_search` with author names and date-scoped queries (last 2–3 years from the current date) for grounded citations. In a Claude.ai environment also run `conversation_search` to pull in any prior research context from earlier sessions on the same topic.

### 2. Code that runs
Every code cell must be self-contained and produce visible output. Use numbered cells (Cell 0, Cell 1, ...) with file-name labels. Show output below the cell, including printed results with specific numbers, annotated inline arrows, and feature importance bars as text.

### 3. SVG diagrams
At least 4 custom SVGs per article: algorithm flow, pitfall diagram, workflow pipeline, comparison matrix. Use the article's internal colour constants (C.accent, C.amber, C.sky, C.green, C.red) consistently.

### 4. Callout boxes
- **Info** (type="info", blue): key insights
- **Warn** (type="warn", amber): common mistakes
- **Tip** (type="tip", green): best practices

### 5. Competitive-landscape table
Always include a side-by-side comparison of at least 5 alternative methods, with columns: Method, What It Measures, Scope, Retraining?, Robustness concerns.

### 6. Editorial photograph (optional)

DS/ML articles typically carry their visual load through Recharts + custom SVG, not photography. If the topic has a relatable real-world anchor (e.g. a financial article using a trading-floor photo), insert ONE `<Photograph>` between the opening `<Sec>`s near the top, using the shared sourcing spec (see shared-article-jsx-reference §7). Do NOT insert photographs inside code cells or diagram sections — they break the editorial flow.

## EXECUTION WORKFLOW

### Step 1: Topic grounding
- Identify the canonical paper(s) for the method — author, year, journal
- Find the reference Python implementation (scikit-learn, statsmodels, custom library)
- Locate at least 3 recent practitioner articles or benchmarks (last 2–3 years from the current date)

### Step 2: Structural outline
- 10+ sections, each mapped to a `<Sec>` component
- Identify which sections need SVG diagrams (aim for 4–6)
- Plan 3–5 code cells with explicit outputs

### Step 3: Write the JSX artifact
Use the standard component library:
- `<Sec n="N" title="X">` for numbered major sections
- `<H3>` for subsection headings
- `<P>` for paragraphs (with dangerouslySetInnerHTML for inline emphasis)
- `<NB title="file.py" n={N}>` for notebook-style code cells
- `<Code>` for standalone code blocks
- `<Callout type="info|warn|tip" title="...">` for callouts
- `<Cap>` for figure captions

### Step 4: Metadata emission — NON-NEGOTIABLE

Every generated `.jsx` file MUST begin with BOTH a frontmatter comment AND an `ARTICLE_DATA` constant so the downstream pipeline (`library-article-publisher`, `library-articles/build.py`, `library-articles/jsx_to_markdown.py`) can parse it:

```jsx
/* ---
title: "..."
subtitle: "..."
date: YYYY-MM-DD
tags: [tag1, tag2, tag3]
read_time: "N min"
category: <ONE OF: machine-learning | deep-learning | time-series | statistics | data-engineering | nlp | python | feature-engineering | mlops>
style: technical-ds
mode: standard
--- */

const ARTICLE_DATA = {
  title: "...",
  subtitle: "...",
  date: "YYYY-MM-DD",
  tags: ["tag1", "tag2", "tag3"],
  read_time: "N min",
  category: "machine-learning",
  style: "technical-ds",
};
```

**Category constraint**: use one of the keys above (matches `library/lib/pages/articles.py` `CATEGORY_EMOJI`). Unknown categories render with a generic emoji.

**Style constraint**: always `technical-ds` for articles from this skill (matches reader's `STYLE_BADGES` dict).

### Step 5: Deliver
- **Write the entire file in one call**. Use the `Write` tool (Claude Code) or `create_file` (Claude.ai). DO NOT use `str_replace` / edit-append for long articles — multi-part appends are prone to truncation, which matters for 800+ line technical articles with embedded SVGs and code cells.
- Save to `library-articles/articles/{kebab-slug}.jsx` via one `Write` / `create_file` call (lowercase, hyphen-separated, no date prefix, e.g. `shap-for-xgboost.jsx`)
- No ES `import` statements — `React`, hooks, and `Recharts.*` components are globally available via Babel Standalone at runtime
- `export default function ArticleName() { ... }` is mandatory (required by `build.py`)
- Then invoke the `library-article-publisher` skill to file the markdown mirror, commit, and push to both HF Spaces
- In a Claude.ai sandbox, save to `/mnt/user-data/outputs/` first and surface via `present_files` so the user can copy into the repo

## QUALITY CHECKLIST

- [ ] Title is specific and promises a concrete takeaway
- [ ] First paragraph grounds the reader in a practical scenario
- [ ] At least 4 SVG diagrams, each answering a different question
- [ ] At least 3 runnable code cells with output shown below
- [ ] All method claims traceable to a named paper/study
- [ ] Competitive-landscape table with 5+ alternatives
- [ ] "When NOT to use" section names specific alternatives
- [ ] No generic wonder language ("simply," "easily," "just")
- [ ] Every numbered statistic has a source
- [ ] Code blocks have a dark background with readable light text

## STYLE DON'TS
- No NatGeo-magazine prose — this is a technical reference, not a narrative
- No travel-style scene-setting — start with the practical problem
- No unsourced claims, especially about method performance
- No bullet-only sections — use prose paragraphs with bullets as emphasis

## DUAL PUBLISHING NOTE

After generating, this article can be published to the Data Science Library via the `library-article-publisher` skill. The JSX goes to `library-articles/articles/{slug}.jsx` (rendered on the static HF Space) and a markdown version with frontmatter goes to `library/articles/{slug}.md`.
