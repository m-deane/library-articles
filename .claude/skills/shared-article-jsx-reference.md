---
name: shared-article-jsx-reference
description: Shared JSX artifact reference consumed by technical-ds-article, natgeo-article, and travel-photography-article. Defines the component library, build-pipeline requirements, metadata emission contract, and allowed style/category tokens. This skill is a REFERENCE — don't invoke it directly; other skills link to it for shared conventions.
---

# Shared JSX Article Reference

All three long-form article skills (`technical-ds-article`, `natgeo-article`, `travel-photography-article`) produce `.jsx` artifacts that flow through the same downstream pipeline:

```
generator skill → *.jsx in library-articles/articles/
                   ├─ library-articles/build.py → *.html (rendered on static HF Space)
                   └─ library-articles/jsx_to_markdown.py → *.md (for Streamlit library)
```

This file defines the shared contract. Individual article skills may add mode-specific design tokens (colours, fonts) but MUST conform to the conventions below.

## 1. JSX COMPONENT LIBRARY (short-name canonical — extractor-compatible)

Use THESE NAMES EXACTLY. Long-form synonyms (`<DropCap>`, `<Sidebar>`, `<ImgCaption>`, `<Section>`) will not extract — `library-articles/jsx_to_markdown.py` only recognises the short forms.

| Component | Purpose | Markdown-mirror mapping |
|-----------|---------|-------------------------|
| `<Sec n="N" title="X">` | Numbered major section wrapper | `## N. X` |
| `<H3>` | Subsection heading | `### X` |
| `<H4>` | Sub-subsection heading | `#### X` |
| `<P>{`...`}</P>` | Prose paragraph (template literals, `dangerouslySetInnerHTML` for inline `<em>`/`<code>`/`<strong>`) | plain paragraph |
| `<DC>{`...`}</DC>` | Drop-cap opening paragraph | plain paragraph (first) |
| `<SB title="...">{`...`}</SB>` | Sidebar with titled header | `<details><summary>title</summary>body</details>` |
| `<IC func="..." caption="..."/>` | Image caption block | `*caption*` |
| `<PQ>{`...`}</PQ>` | Pull quote | `> **"quote"**` |
| `<Callout type="info\|warn\|tip" title="...">{`...`}</Callout>` | Callout box | `> **icon title**: body` |
| `<NB title="file.py" n={N}>{`...`}</NB>` | Notebook-style code cell with file label + cell number | ` ```python\n# Cell N: file.py\n...\n``` ` |
| `<Code>{`...`}</Code>` | Standalone code block | ` ```python\n...\n``` ` |
| `<Cap>{`...`}</Cap>` | Figure caption (smaller type) | `*caption*` |
| `<BR/>` | Line break inside paragraphs | newline |
| `<Photograph src="..." alt="..." caption="..." credit="..." href="..." />` | Inline editorial photograph. `src` is the full URL; `caption` is editorial prose; `credit` is photographer + platform (e.g. "Kārlis Dambrāns / Unsplash"); `href` links back to source. | `![caption](src)\n\n*caption — [credit](href)*` |

## 2. BUILD-PIPELINE REQUIREMENTS (HARD)

`library-articles/build.py` parses each `.jsx` with strict rules. Violations break the build.

- **Default export mandatory**. One of:
  - `export default function ArticleName(...) { ... }` (preferred)
  - `export default ArticleName;` at end of file
  - `export default () => ( ... );` (arrow)
- **No ES import statements**. All imports are stripped. `React`, `ReactDOM`, hooks (`useState`, `useEffect`, `useRef`, `useMemo`, `useCallback`, `useReducer`), and every Recharts component (`LineChart`, `BarChart`, `AreaChart`, `ScatterChart`, `XAxis`, `YAxis`, `CartesianGrid`, `Tooltip`, `Legend`, `Line`, `Bar`, `Area`, `Cell`, `ResponsiveContainer`, `ReferenceLine`, `ReferenceArea`, `ComposedChart`, `Treemap`, `Radar`, `RadialBar`, `Pie`, `Funnel`, `Sankey`, `Sector`) are globally available via Babel Standalone + Recharts UMD at runtime.
- **Template literals** (backticks) MUST wrap prose inside `<P>{`...`}</P>` so special characters (apostrophes, quotes, dashes) survive transpilation.
- **No brace-escape double-wrapping**. Don't write `{"{"}expr{"}"}` — just use `${expr}`.

## 3. METADATA EMISSION — NON-NEGOTIABLE

Every generated `.jsx` MUST begin with BOTH a frontmatter comment AND an `ARTICLE_DATA` constant so `build.py`, `jsx_to_markdown.py`, and `library-article-publisher` can all read metadata without parsing the component tree.

```jsx
/* ---
title: "..."
subtitle: "..."
date: YYYY-MM-DD
tags: [tag1, tag2, tag3]
read_time: "N min"
category: <see §4 recognised category tokens>
style: <see §4 recognised style tokens>
mode: <free-form mode descriptor per article skill>
--- */

const ARTICLE_DATA = {
  title: "...",
  subtitle: "...",
  date: "YYYY-MM-DD",
  tags: ["tag1", "tag2"],
  read_time: "N min",
  category: "...",
  style: "...",
  mode: "...",
};
```

## 4. RECOGNISED TOKENS (from `library/lib/pages/articles.py`)

### Style tokens — `STYLE_BADGES` dict
Articles with a `style` value outside this set will still render but without the badge-colour treatment:

| Token | Produced by |
|-------|-------------|
| `ddods` | `article-generator` |
| `technical-ds` | `technical-ds-article` |
| `natgeo-classic` | `natgeo-article` (Classic mode) |
| `natgeo-sciam-hybrid` | `natgeo-article` (SciAm Hybrid mode) |
| `encyclopaedic` | `natgeo-article` (Encyclopaedic mode) |
| `economist` | `natgeo-article` (Economist mode) |
| `travel-literary` | `travel-photography-article` (Classic / Slow Travel / SciAm) |
| `travel-photo-essay` | `travel-photography-article` (Photo Essay mode) |
| `travel-service-hybrid` | `travel-photography-article` (Service Hybrid / Encyclopaedic) |
| `applied-project` | `project-from-article` |

### Category tokens — `CATEGORY_EMOJI` dict
Unknown categories fall back to a generic book emoji. Recognised keys:

```
machine-learning   deep-learning      time-series        statistics
data-engineering   nlp                python             feature-engineering
mlops              travel-photography science-nature     economics
energy             history            archaeology        neuroscience
```

## 5. FILENAME AND OUTPUT LOCATION

- Save to: `library-articles/articles/{kebab-slug}.jsx`
- Slug rule: lowercase, hyphen-separated, no date prefix, no trailing `-guide` unless distinct from same-topic siblings
- Examples: `shap-for-xgboost.jsx`, `malta-photography-guide.jsx`, `crispr-delivery-2026.jsx`
- In Claude.ai sandbox, save to `/mnt/user-data/outputs/` first and surface via `present_files` so the user can copy into the repo

## 6. PUBLISHER HANDOFF

After generating and saving the `.jsx`, invoke the `library-article-publisher` skill. It will:

1. Read `ARTICLE_DATA` + frontmatter from the `.jsx`
2. Write the markdown mirror at `library/articles/{slug}.md` (or `{slug}/article.md` if assets are co-located) with matching frontmatter
3. Run `library-articles/build.py` to regenerate `{slug}.html`, `{slug}.meta.json`, `index.html`, `_manifest.json`
4. Run `library-articles/jsx_to_markdown.py` to refresh the markdown body from the JSX (preserves prose, code, callouts)
5. Commit + push to both HF Spaces (`helwyr55/library` and `helwyr55/library-articles`)

## 7. IMAGE SOURCING

Use `<Photograph>` for every editorial image. Runtime environment dictates sourcing:

- **Claude.ai environment**: prefer `image_search(query)`; use the returned URL as `src`.
- **Claude Code CLI environment** (no `image_search`): fall back to free-image APIs in this order:
  1. **Unsplash API** — best for travel, editorial, lifestyle, urban. Auth via `UNSPLASH_ACCESS_KEY` env var. Endpoint: `GET https://api.unsplash.com/search/photos?query={q}&client_id={key}` → take `results[0].urls.regular`. Credit format: `{user.name} / Unsplash` with `href={links.html}`. Required UTM: `?utm_source=dsl&utm_medium=referral` appended to `href`.
  2. **Wikimedia Commons** — best for science, nature, history, archaeology, space. No auth. Endpoint: `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch={q}&gsrnamespace=6&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=1600&format=json` → take first result's `imageinfo[0].thumburl`. Credit format from `extmetadata.Artist.value` + licence code. Attribution is mandatory.
  3. **Pexels API** — fallback for travel/lifestyle when Unsplash rate-limited. Auth via `PEXELS_API_KEY` env var. Endpoint: `GET https://api.pexels.com/v1/search?query={q}&per_page=1` with header `Authorization: {key}`.

- **Placement cadence**: one `<Photograph>` every 2–3 `<Sec>`s, positioned BETWEEN sections (not inside code cells, tables, or hero). Minimum 5 per article for `natgeo` and `travel-photography` skills (10 in Encyclopaedic/Full-Feature modes). DS/ML articles may skip photographs entirely — Recharts and SVG diagrams already carry visual load.

- **Attribution**: mandatory for Wikimedia (licence compliance); UTM-required for Unsplash (developer guidelines); recommended for Pexels.

- **Caption style**: editorial prose, not alt-text. Should pick up narrative thread from the preceding `<Sec>`. 12–25 words.

- **Failure mode**: if all three APIs return empty, fall back to an `<IC func="..." caption="..."/>` caption-only placeholder rather than a broken image. Flag in the Source Integrity Note.

## 8. ANTI-PATTERNS (ALL articles — pipeline breakers)

- Using long component names: `<DropCap>`, `<Sidebar>`, `<ImgCaption>`, `<Section>` — USE `<DC>`, `<SB>`, `<IC>`, `<Sec>`
- Using `<img>` directly instead of `<Photograph>` — loses attribution, breaks the markdown-mirror mapping, bypasses the caption/credit style
- Missing the `ARTICLE_DATA` const — breaks `build.py` metadata extraction
- ES `import` statements — stripped, but better to omit so the file is clean
- Raw Recharts JSX without the global-scope guarantee (`<Recharts.LineChart>` works; `<LineChart>` works; `<LC>` does not)
- Writing files to `/mnt/user-data/outputs/` outside Claude.ai sandbox — the path doesn't exist locally and the publisher won't find them
- Non-kebab-case slugs — the Streamlit reader's `jsx_space_url` construction assumes kebab-case
- Mixing JSX `<Callout type="...">` AND Markdown callout blocks in the same article — pick one

## 9. QUICK VALIDATION CHECKLIST

Before calling `library-article-publisher`:

- [ ] File saved at `library-articles/articles/{kebab-slug}.jsx`
- [ ] File begins with `/* --- ... --- */` frontmatter comment
- [ ] `const ARTICLE_DATA = { ... };` present near top
- [ ] `export default function ...` or `export default X;` at bottom
- [ ] No `import` statements anywhere
- [ ] Uses short component names (`<Sec>`, `<DC>`, `<SB>`, `<IC>`)
- [ ] `category` is one of the 16 recognised tokens
- [ ] `style` is one of the 10 recognised tokens
