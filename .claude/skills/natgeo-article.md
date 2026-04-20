---
name: natgeo-article
description: Generate deeply researched National Geographic-style articles about SCIENCE, NATURE, WILDLIFE, CULTURE, HISTORY, EXPLORATION, or GEOPOLITICS — co-equal prose, photojournalism briefs, and professional data visualisations. Trigger on "NatGeo-style article", "long-form feature on [science/nature/culture topic]", "magazine feature about [phenomenon/species]", "Scientific American style piece", "analytical briefing on [policy/economics]", "Economist-style article", "long-form piece on [non-travel subject]", "deep dive on [natural/cultural/scientific phenomenon]". Four modes (auto-inferred): NatGeo Classic (literary narrative, default), Scientific American Hybrid (technical/mechanistic depth), Encyclopaedic (comprehensive synthesis), The Economist (argument-driven analytical briefing, British English, no bylines). Do NOT use for destination/travel photography features (→ travel-photography-article), DS/ML technical content (→ technical-ds-article), or quick DDODS explainers (→ article-generator). Disambiguation rule: if the subject is a place the reader could visit (travel logistics, itinerary, photo locations), use travel-photography-article; if it's a phenomenon/species/concept/event, use this skill.
---

# National Geographic-Style Article Generator

## PURPOSE

Generate deeply researched, literary-narrative articles in the style of National Geographic magazine. Every article must treat photography, data visualisation, and prose as co-equal storytelling elements — not decoration. The final output should feel like a premium print feature that could run in the magazine's golden era (pre-2023 layoffs), with the rigour of a two-year editorial development cycle compressed into a single generation session.

Four prose modes:
- **NatGeo Classic** — literary nonfiction, character-driven, sensory (default)
- **Scientific American Hybrid** — technical depth with NatGeo visual architecture
- **Encyclopaedic** — comprehensive information-driven synthesis
- **The Economist** — argument-driven analytical briefing with institutional voice

Mode is inferred automatically from the prompt.

## WHAT MAKES NATGEO NATGEO

**Literary nonfiction anchored in field reporting**, where scientific rigour and cinematic storytelling are treated as inseparable. A typical feature:
- Opens with a vivid, sensory **lead scene** — specific place, specific person, specific time
- **Nut graf** — paragraph explaining stakes and scope
- Three-act arc: Setup → Complication → Resolution
- **Cosmic kicker** — resonant image or thought that opens outward
- **Telling detail** — compelling anecdote, colourful character, lively quote
- Novelistic quality (David Quammen style)
- Three core tonal values: **arresting, pioneering, illuminating**
- Scientific data woven into narrative, not quarantined in sidebars
- **Photography and prose as co-equal storytellers** — never redundant

## CRITICAL WEAKNESSES TO ACTIVELY AVOID

1. **The Colonial Gaze** — Locals as exotic backdrop. Centre non-Western voices as experts and agents.
2. **Advocacy without evidence** — Don't make causal claims the research doesn't support. Distinguish consensus, emerging evidence, contested science.
3. **Prose that lectures** — Ground every statistic in human context; every claim in a scene, character, or consequence.
4. **Visuals that merely decorate** — Images and diagrams must each carry narrative weight the prose does not.
5. **Weak digital presentation** — Post-2017 NatGeo online has been criticised for prioritising navigation, ads, and menus over storytelling. When producing digital/artifact output, the visual narrative spine takes precedence over conventional navigation patterns.
6. **Generic wonder** — Replace "the majestic landscape" with specific detail. Not "stunning coral" but "a colony of Acropora table coral, two metres wide, that has been growing since before the Spanish Armada."
7. **Fabrication disguised as specificity** — A fabricated researcher name with plausible institution is more dangerous than vague writing. See the Factual Integrity Protocol below.

## FACTUAL INTEGRITY PROTOCOL — NON-NEGOTIABLE

### Three-Tier Evidence System

- **Tier 1 — Verified**: From web search, traceable to a source. Use freely with attribution.
- **Tier 2 — Composited**: Scenes assembled from verified elements the writer didn't witness. Legitimate but must be flagged in Source Integrity Note.
- **Tier 3 — Invented**: Anything not supported by search. **Prohibited in article body.**

### Specific prohibitions
- **Fabricated researchers** — every named person must be verified
- **Fabricated studies/statistics** — every citation traceable to search
- **Fabricated quotes** — use reported speech if no real quote is available
- **Fabricated institutions** — every org must be verifiable
- **Fabricated geographic/taxonomic details** — use verified broader category
- **Fabricated historical events/dates**
- **False precision** — "4,127" when source said "about 4,000"

### What IS permitted
- Sensory detail in verified scenes
- Reasonable inferences clearly marked ("likely")
- Composite characters with explicit disclosure
- Round numbers and ranges

## FOUR ARTICLE MODES

### Mode 1: NATGEO CLASSIC (default)
Literary nonfiction. Narrative-first, character-driven, sensory prose. Science woven into story. 2,000–4,000 words (Standard) or 5,000–8,000+ (Full Feature).

### Mode 2: SCIENTIFIC AMERICAN HYBRID
Technical depth of SciAm with NatGeo's visual architecture. Key shifts:
- **Lead** opens in a lab, dataset, or methodology — sensory detail applies to research environment
- **Technical density increases** — jargon defined in context, not avoided
- **Mechanism over metaphor** — one analogy per concept, not sustained conceit
- **Data foregrounded** — effect sizes, CIs, sample sizes in prose
- **Expert voices shift register** — methodology and interpretation, not anecdotes
- **Sidebars become technical deep-dives** (250–400 words)
- **Kicker opens toward unanswered questions**, not poetic resonance
- Visual architecture remains identical (hero, photojournalism, data viz, spine, source note)

### Mode 3: ENCYCLOPAEDIC
The definitive reference article. Combines Classic voice, SciAm technical depth, and Wikipedia-like completeness.
- **Research phase expands** — 10–20+ searches across academic, institutional, journalistic sources
- **Prose register shifts fluidly** — Classic for cultural sections, SciAm for mechanistic
- **Every claim attributed** — named researcher + institution + dated finding
- **Sections separated by scene breaks (❧)** not subheadings
- **Reference Summary block** — compressed essential facts
- **Sidebars expand** (300–600 words, 4–8 of them)
- **Visual package: 10–15+ images, 5–8+ diagrams**
- **Cosmic kicker synthesises rather than opens**
- No preset word count — length determined by available evidence (min ~4,000)

### Mode 4: THE ECONOMIST
Argument-driven analytical briefing.
- **Unsigned, institutional voice** — no byline, no "I", "your correspondent" if needed
- **Dry wit, deployed sparingly** — understatement, not direct criticism
- **Clarity above all** — short sentences, tight paragraphs, minimal jargon
- **British English** — organisation, labour, defence, centre
- **Hook, not scene** — striking fact or counterintuitive observation
- **Thesis stated explicitly by paragraph 3**
- **Body structured as claim → evidence → counterargument → rebuttal**
- **No named characters as narrative anchors** — people mentioned for roles only
- **Data foregrounded** — often opens sentences
- **Closing is a verdict, not a kicker**
- **Visual package: 3–6 charts/maps** — no photojournalism
- **Red border strip** (#E3120B) replaces NatGeo yellow
- 1,500–3,000 words, tight

## MANDATORY ARTICLE STRUCTURE

1. **Visual opening** — Hero Image Brief with Subject/Location/Time-of-day/Camera-angle/Action/Emotional-truth/Caption/Visual-function fields
2. **Title package** — Headline (max 8 words) + Deck + Pull Quote
3. **Feature prose** — Lead scene + nut graf + 3+ named characters + woven data + extended metaphor + 2–3 short sidebars + cosmic kicker. No headers/bullet lists in prose body.
4. **Photojournalism package** — 5–7 image briefs (8–12 for Full Feature, 10–15+ for Encyclopaedic) with full production details
5. **Data visualisation specs** — 2–4 visuals (3–5 Full, 5–8+ Encyclopaedic) with Type/Title/Data/Hierarchy/Palette/Labels/Function/Placement/Reference-style
6. **Visual narrative spine** — sequence document showing prose/image/diagram interleaving
7. **Source Integrity Note** — with Factual Integrity Disclosure (Tier 1/2/3 breakdown)

## LENGTH FORMATS

| Element | Standard | Full Feature | Encyclopaedic | Economist |
|---------|----------|--------------|---------------|-----------|
| Words | 2,000–4,000 | 5,000–8,000+ | 4,000+ (evidence-bound) | 1,500–3,000 |
| Narrative threads | 1 linear | 2–3 braided | Thematic dimensions | Argument only |
| Named characters | 3 | 5–8 | 5+ | None required |
| Sidebars | 2–3 | 3–5 | 4–8 | 1–2 |
| Photo briefs | 5–7 | 8–12 | 10–15+ | 0–1 hero only |
| Data viz | 2–3 | 3–5 | 5–8+ | 3–6 (primary) |

## SHARED CONVENTIONS

For component names, build-pipeline requirements, metadata contract, recognised style/category tokens, and output location — see `~/.claude/skills/shared-article-jsx-reference.md`. This skill overrides only the DESIGN SYSTEM (NatGeo print aesthetic below), the four-mode specification, and the Factual Integrity Protocol.

## OUTPUT FORMAT — STYLED JSX ARTIFACT

Every article delivered as `.jsx` that renders in Claude artifact viewer.

### Design system
- **Fonts**: Playfair Display (headlines, 900), Source Serif 4 (body, 400/600), Source Sans 3 (UI/sidebars, 300–700), JetBrains Mono (code)
- **Colours**:
  - natgeoYellow `#FFCE00` — border strip, underlines, labels
  - black `#1a1a1a` — primary text
  - offWhite `#FAF8F5` — page bg
  - cream `#F2EDE4` — card bg, source note
  - warmGray `#8A8278` — captions
  - darkGray `#3D3B38` — sidebar text
  - accent `#C4A35A` — scene breaks
- **Contrast rules**: body black on offWhite; sidebar darkGray on sidebarBg `#F0EBE1`; hero white on dark gradient; SVG labels white on dark / dark on light. Yellow is accent only — never body text.

### Key layout elements
- Yellow border strip (4px `#FFCE00`) below mode badge
- Hero section 85vh, dark background with sourced photograph + gradient overlay
- Drop cap (72px Playfair, float-left) on first paragraph
- Pull quote (Playfair italic, 28px, 3px yellow left border)
- Scene breaks (❧ centred, accent colour, letter-spacing 8px)
- Sidebars (`#F0EBE1` bg, 2px yellow underline on title)
- Photojournalism scenes — real photographs from image_search
- Data visualisations — Recharts or hand-coded SVG
- Source integrity note (cream bg)

### Component architecture
1. Design tokens (COLORS, FONTS objects)
2. Data viz components (Recharts / SVG)
3. Helpers (component names MUST match these exactly for markdown-mirror extraction):
   - `<Sec n="N" title="X">` — numbered section wrapper (NOT `<Section>`)
   - `<DC>` — drop-cap first paragraph (NOT `<DropCap>`)
   - `<SB title="...">` — sidebar with titled header (NOT `<Sidebar>`)
   - `<IC func="..." caption="..."/>` — image caption block (NOT `<ImgCaption>`)
   - `<P>`, `<H3>`, `<PQ>` (pull quote), `<Callout type="info|warn|tip" title="...">`
   - `<Photograph src="..." alt="..." caption="..." credit="..." href="..." />` — sourced photographs. Full prop set is MANDATORY: `src` (image URL), `alt` (a11y), `caption` (editorial prose, 12–25 words), `credit` (e.g. "Jane Doe / Unsplash"), `href` (link back to source). Sourcing per shared-article-jsx-reference §7.
   - Why: `library-articles/jsx_to_markdown.py` recognises only the short forms. Using long names (`DropCap/Sidebar/ImgCaption/Section`) produces `*[Figure: ...]*` placeholders instead of extracted prose in the Streamlit library's markdown mirror.
4. Main component with <style> @import, hero, article body interleaving prose/photos/diagrams/sidebars, source integrity, footer

## EXECUTION WORKFLOW

### Step 0 — Mode selection (automatic)
Infer from keywords. State mode and format at top of output.

### Step 1 — Research
Web search for: data, named researchers (verify every one), locations, contested science, 3–5 human characters, indigenous knowledge, access/permissions. **Do not proceed with unverified characters or statistics.** Encyclopaedic mode: 10–20+ searches.

### Step 2 — Visual planning
- Map visual spine end-to-end
- Image search for hero + each photojournalism brief
- Plan data viz: which Recharts, which custom SVG

### Step 3 — Writing
Apply Factual Integrity Protocol continuously. Before every named person, statistic, quote, study, institution, geographic/taxonomic detail, date — verify from search results. Omit rather than invent.

### Step 4 — Metadata emission — NON-NEGOTIABLE

Every generated `.jsx` MUST begin with BOTH a frontmatter comment AND an `ARTICLE_DATA` constant:

```jsx
/* ---
title: "..."
subtitle: "..."
date: YYYY-MM-DD
tags: [tag1, tag2, tag3]
read_time: "N min"
category: <ONE OF: science-nature | history | archaeology | neuroscience | economics | energy | culture | statistics | machine-learning>
style: <ONE OF (must match the mode chosen): natgeo-classic | natgeo-sciam-hybrid | encyclopaedic | economist>
mode: <standard | full-feature | encyclopaedic | economist-briefing>
--- */

const ARTICLE_DATA = {
  title: "...",
  subtitle: "...",
  date: "YYYY-MM-DD",
  tags: ["tag1", "tag2"],
  read_time: "N min",
  category: "science-nature",
  style: "natgeo-classic",
  mode: "standard",
};
```

**Mode-to-style mapping** (must match the Streamlit reader's `STYLE_BADGES` dict):
| Mode (Step 0) | `style:` token |
|---------------|----------------|
| NatGeo Classic | `natgeo-classic` |
| Scientific American Hybrid | `natgeo-sciam-hybrid` |
| Encyclopaedic | `encyclopaedic` |
| The Economist | `economist` |

### Step 5 — Artifact assembly
- Read reference artifact
- Assemble JSX with embedded photos + Recharts/SVG diagrams
- Save to `library-articles/articles/{kebab-slug}.jsx` via the Write tool
- No ES `import` statements — `React`, hooks, `Recharts.*` are globally available via Babel Standalone at runtime
- `export default function ArticleName() { ... }` mandatory (required by `build.py`)
- Use the short component names (`<Sec>`, `<DC>`, `<SB>`, `<IC>`) — see §Component architecture above
- Then invoke the `library-article-publisher` skill to file the markdown mirror, commit, and push to both HF Spaces
- In a Claude.ai sandbox environment, save to `/mnt/user-data/outputs/` first and surface via `present_files`

## QUALITY GATE

### Factual integrity (FIRST)
- [ ] Every named person verified by web search with correct institution
- [ ] Every statistic traceable to a specific source
- [ ] Every cited study confirmed by search
- [ ] Every direct quote sourced or replaced with reported speech
- [ ] Every named institution verifiable
- [ ] No false precision
- [ ] Composited scenes flagged in Source Integrity Note

### Editorial quality
- [ ] Lead sentence places reader in specific physical location with sensory detail
- [ ] Every statistic inside sentence with human context
- [ ] Images and diagrams each answer questions prose does not
- [ ] Closing is cosmic kicker
- [ ] Image briefs specific enough to brief a photographer
- [ ] Diagram specs detailed enough for an infographic artist
- [ ] No lists/bullets/subheadings in narrative body
- [ ] ≥3 named human characters with quotes and backstory
- [ ] No causal claims beyond evidence
- [ ] Non-Western voices centred, not footnoted
- [ ] No generic wonder language

### Artifact-specific
- [ ] Google Fonts load
- [ ] Yellow border strip visible (RED `#E3120B` strip in Economist mode)
- [ ] Hero 85vh with sourced photograph + gradient (or navy block / illustrated image in Economist mode)
- [ ] Drop cap renders as float-left initial (skip in Economist mode)
- [ ] Sidebars visually distinct
- [ ] Scene breaks (❧) centred (skip in Economist mode — no scene breaks)
- [ ] Every photograph is a real URL via `<Photograph src alt caption credit href />` — sourced by `image_search` in Claude.ai OR Unsplash/Wikimedia/Pexels in Claude Code CLI (see shared-article-jsx-reference §7). One per 2–3 Secs, minimum 5 per article (10 in Encyclopaedic / Full-Feature modes).
- [ ] Every data viz is working Recharts/SVG with titles, axes, units, legends, sources
- [ ] All hero text fully legible (contrast)
- [ ] Yellow only as accent — never body text

### Mode-specific gates (add to the standard gate for the chosen mode only)

#### NatGeo Classic mode (default)
- [ ] ≥3 named human characters with quotes, ages, occupations, narrative function
- [ ] Closing is a cosmic kicker that opens outward, not a summary
- [ ] Lead scene places reader in a specific physical location with sensory detail
- [ ] Extended metaphor sustained across 2+ paragraphs at least once

#### Scientific American Hybrid mode
- [ ] ≥3 named researchers; quotes focus on methodology/interpretation not emotion
- [ ] Every major scientific claim includes quantitative detail (effect size, sample size, date, or measurement)
- [ ] Methodological details present for any study cited as central evidence
- [ ] Sidebars are ≥250 words each and function as technical deep-dives
- [ ] Closing opens toward unanswered research questions, not poetic resonance
- [ ] At least one moment explicitly addresses scientific uncertainty or contested interpretation

#### Encyclopaedic mode
- [ ] Research phase ran ≥10 web searches across academic, institutional, journalistic, reference sources
- [ ] ≥5 named human characters drawn from across the subject's dimensions
- [ ] Reference Summary block included after prose body
- [ ] ≥4 sidebars of 300–600 words each functioning as deep-reference modules
- [ ] ≥10 image briefs with ≥2 multi-image sequences
- [ ] ≥5 data visualisations incl. ≥1 annotated map and ≥1 timeline/process diagram
- [ ] Closing synthesis movement spans 3–5 paragraphs
- [ ] Length proportional to available evidence (minimum ~4,000 words)

#### The Economist mode
- [ ] Voice is unsigned and institutional — no byline, no first-person
- [ ] Thesis explicitly stated by paragraph 3
- [ ] Body structured as claim → evidence → counterargument → rebuttal → verdict
- [ ] Closing paragraph delivers a clear verdict — not a poetic kicker or open question
- [ ] British English throughout (organisation, labour, defence, centre, colour)
- [ ] ≥3 data visualisations functioning as the primary visual package (no photojournalism)
- [ ] Red border strip `#E3120B` (replaces NatGeo yellow)
- [ ] Named characters NOT required (the general "≥3 named characters" rule is waived for this mode — people mentioned by role only)
- [ ] No scene-setting, no character development, no extended metaphor
- [ ] Statistics and quantitative data foregrounded (often opening sentences)
- [ ] 1,500–3,000 words, tight, no padding

#### Full Feature format (applies to Classic or SciAm Hybrid at 5,000+ words)
- [ ] ≥2 braided narrative threads that converge toward the close
- [ ] ≥5 fully rendered scenes across multiple locations or timeframes
- [ ] ≥2 named characters developed across multiple paragraphs and recurring in more than one scene
- [ ] ≥1 multi-image sequence (3+ related images with shared narrative arc)
- [ ] Closing movement spans 2–3 paragraphs, not just a single kicker line
- [ ] Visual narrative spine interleaves ≥8 media elements with prose

## COMPETITIVE STANDARD

### Dimensions of excellence — benchmark against these when assessing quality

- Prose: New Yorker science features (Kolbert, Gawande)
- Photography integration: NatGeo 1990s–2010s print
- Data viz: Scientific American info graphics
- Voice balance: Smithsonian Magazine
- Local/ecological depth: Orion Magazine
- Digital science writing: Quanta Magazine
- Essayistic depth: Aeon
- Infographic design in print: Delayed Gratification
- Climate/data journalism: Carbon Brief

### Full competitive landscape — where this skill's output sits

No single competitor replicates NatGeo's combination of scientific depth, literary narrative, world-class photography, and global cultural coverage. Understanding the landscape helps calibrate what to match and what to improve on:

| Publication | Closest NatGeo Overlap | Key Difference |
|-------------|------------------------|----------------|
| **Smithsonian Magazine** | Overall closest analogue — science, history, culture, photography | Longer/denser prose, stronger on American history and art, slightly less visual |
| **The New Yorker** (science features) | Highest literary quality in science writing | Essayistic and personal; minimal photography; science is one strand among many |
| **GEO Magazine** (Germany) | Explicit NatGeo formula clone — geography, nature, culture | European perspective; published in 20+ countries |
| **Scientific American** | Far deeper technical coverage; expert bylines from working scientists | Minimal visual storytelling; no cultural or geographic breadth |
| **Outside Magazine** | Adventure and expedition storytelling; survival narratives | Stronger on outdoor recreation and gear; less science depth |
| **Condé Nast Traveler** | Overlaps on travel features | Luxury-skewed; no science or environmental coverage |
| **New Scientist** (UK) | Accessible science writing with global scope; weekly news cycle | Newsier and shorter-form; less literary |
| **BBC Wildlife Magazine** (UK) | Matches NatGeo photographic standard for nature/wildlife | More practical and species-focused |
| **BBC Science Focus** (UK) | Science and technology for general audience | More consumer/tech-oriented; shorter features |
| **Nature** (UK) | World's highest-impact scientific journal | Audience is working scientists; no literary narrative |
| **The Economist** (UK) | Analytical depth on global affairs with strong data viz | Institutional voice (unsigned); no photography tradition; argument-driven — matches this skill's Economist mode |
| **Delayed Gratification** (UK) | "Slow journalism"; strong infographics and data viz | Quarterly; retrospective rather than discovery-oriented |
| **Monocle** (UK/Global) | Global culture, design, and affairs with premium visual identity | Design-culture and lifestyle focus; no science depth |
| **Quanta Magazine** (digital-only) | Highest-quality science writing online; maths, physics, biology, CS | Foundation-funded, free; strong custom illustration + interactive diagrams |
| **Aeon** (digital-only) | Long-form essays on science, philosophy, culture; expert contributors | Essayistic rather than reportorial; no field photography |
| **Carbon Brief** (UK, digital-only) | Deep data-driven climate and energy journalism | Narrowly focused on climate/energy policy; more analytical than narrative |
| **Atlas Obscura** (digital-first) | Spirit of wonder and exploration; hidden places | Community-driven, more playful; lacks scientific rigour |
| **Nautilus** (digital-first) | Thematic science storytelling; each issue explores one big idea | Magazine-of-ideas format; more philosophical than field-based |
| **Orion Magazine** (digital-first) | Literary nature writing | Nonprofit, ad-free; more philosophical/activist |
| **Hakai Magazine** (Canada) | Award-winning narrative journalism on coastal science | Ceased publication December 2024; team moved to bioGraphic |
| **Undark** (digital-only) | Science journalism at intersection of science, society, policy | MIT Knight Science Journalism–affiliated; shorter features; policy-focused |

**Gap filled**: none of these publications does prose + photography + data viz + science + culture + local voice all simultaneously. Quanta sets the digital standard; Aeon sets the essayistic depth; Smithsonian is the closest analogue but less visual. This skill targets the intersection.
