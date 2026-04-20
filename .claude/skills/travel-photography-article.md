---
name: travel-photography-article
description: Generate deeply reported, photography-led travel articles for DESTINATIONS YOU VISIT — literary prose + FotoVue-style operational photography guide with GPS, compass bearings, golden-hour timing, and failure conditions per location. Trigger on "photography guide to [place]", "travel guide to [place]", "photo essay about [place]", "destination guide", "visual travel feature", "where to shoot in [place]", "a week in [place]", "[place] field guide for photographers", or "travel article on [destination]". Modes (auto-inferred): Classic Travel Narrative (literary), Photo Essay (photography-led), Service + Story Hybrid (mainstream guide), Slow Travel / Deep Place (single-location immersion), SciAm Hybrid (expedition/natural-history TRAVEL), Encyclopaedic (comprehensive DESTINATION guide). Do NOT use for non-travel science/nature/culture features (→ natgeo-article, even if they mention a place), DS/ML content (→ technical-ds-article), or quick DDODS explainers (→ article-generator). Disambiguation: if the subject is a phenomenon/species/concept that exists everywhere, use natgeo-article; if the subject is a specific place the reader could visit, use this skill.
---

# Travel & Photography Article Generator

## PURPOSE

Generate deeply researched, photography-led travel articles that work at two levels simultaneously: as **literary travel writing** worth reading at home, and as **operational photography guides** worth using in the field. Every article must treat photography and prose as co-equal storytelling elements — but with photography as the leading storyteller, since travel is fundamentally a visual genre.

### The two required tests

**Field Test**: Can a photographer who has never visited the destination open this guide at a specific location entry, read it in under two minutes, and know exactly where to stand, exactly when to arrive, exactly what settings to start with, and exactly what will make the shot fail? If the answer is no, the guide is not finished.

**Armchair Test**: Does the literary framing give the reader a reason to care about these places before they arrive — character, history, sensory texture, a reason beyond "it's photogenic"? If the answer is no, this is a spec sheet, not a guide.

Both tests must pass simultaneously.

## TWO TRADITIONS

### Literary travel writing standard

The best travel writing does not describe places — it inhabits them.

- **Voice**: First-person-adjacent. Curious, knowing, unhurried. Never performing wonder — earning it through specific detail.
- **Structure**: Lead scene → nut graf → three-act arc (arrival → complication → meaning) → cosmic kicker that opens outward.
- **The telling detail**: Never "ancient walls" but "sixteenth-century bastions in globigerine, soft enough when quarried to cut with a handsaw, warm amber in afternoon light."
- **Named local characters**: At minimum three named locals with ages, occupations, direct quotes, and narrative function.

### FotoVue operational standard

Every location entry must include GPS coordinates, compass bearings, golden-hour timing, failure conditions, alternative compositions, parking/access specifics, worked exposure starting points, and sun-app integration notes.

## FIVE MODES

| Mode | Primary reader | Lead element | Length |
|------|----------------|--------------|--------|
| **1. Classic Travel Narrative** (default) | Literary travel reader | Prose — character, journey | 3,000–6,000 |
| **2. Photo Essay** | Photographer, photo editor | Image sequence | 500–1,000 + 8–15 image briefs |
| **3. Service + Story Hybrid** (default for "guide" prompts) | Photographer planning a trip | Literary opening → operational reference | 1,000–1,500 + full entries |
| **4. Slow Travel / Deep Place** | Extended-stay photographer | Deep literary portrait | 4,000–8,000 |
| **5A. SciAm Hybrid** (expedition/natural history) | Expedition photographer | Scientific phenomenon | 3,000–5,000 |
| **5B. Encyclopaedic** | Comprehensive coverage | Systematic location coverage | As-needed |

Mode is inferred automatically. Keywords: "guide"→3, "essay"→2, "week in"→4, "wildlife"→5A, "complete guide"→5B; default → 1.

## LOCATION ENTRY TEMPLATE (FotoVue standard)

Every location in Modes 3, 4, 5B must conform to this template:

```
LOCATION NAME
[Island/Region] · [Location Type]

COORDINATES
Primary shooting position: [DD.DDDD°N, DD.DDDD°E]
Secondary viewpoint: [DD.DDDD°N, DD.DDDD°E]
Parking: [DD.DDDD°N, DD.DDDD°E]
Walking time: [X minutes]
Path difficulty: [Easy flat / Uneven / Clifftop / Steep]

THE SHOT
[One paragraph describing the primary composition.]

COMPASS BEARING: [Primary] · SUBJECT BEARING: [Toward subject]

TIMING
Best light: [Specific window]
Season modifier: [How the shot changes seasonally]
Monthly reference: [Worked example]
Sun position app note: [What to search in PhotoPills/TPE]

WHAT MAKES THIS SHOT FAIL
[1–3 specific failure conditions]

ALTERNATIVE COMPOSITIONS
Alt 1 — [Name]: [Description]
Alt 2 — [Name]: [Description]

LENS GUIDE / WORKED EXPOSURE / FILTERS / ACCESS & PERMISSIONS / COMBINE WITH / LOCAL KNOWLEDGE
```

## NAMED LOCAL CHARACTERS — MANDATORY

At least **three named locals** per guide, each with: full name, age, occupation, one direct quote, one action revealing relationship to place, narrative function. Never generic "locals" as backdrop.

## MAPS AND DIAGRAMS — MANDATORY

- **Destination Overview Map** (multi-location): numbered locations, routes, compass arcs, scale, north indicator
- **Timing Diagram** (all): 12-month axis, sunrise/sunset curves, golden hour, tidal overlay for coastal
- **Location Cross-Section** (complex): photographer position, subject position, sun arc, compass

## GOLDEN-HOUR TIMING — MANDATORY

- **Format A** (encyclopaedic): 12-month table
- **Format B** (other modes): Four worked seasonal examples
- **Format C** (direction-specific): Which month shot exists / doesn't

## FAILURE CONDITIONS — THE MOST IMPORTANT SECTION

For every location: weather failures, time-of-day failures, seasonal failures, crowd failures, technical failures, access failures — all stated specifically with thresholds.

## VOICE CALIBRATION

### Literary voice — DO
- Drop reader into specific physical moment
- Use extended metaphors across paragraphs
- Name the limestone, species, boat, person
- Write failure alongside beauty
- Give locals interiority and agency

### Literary voice — AVOID
- "Stunning," "vibrant," "charming," "magical" without specific data
- Causal claims beyond evidence
- Colonial gaze
- Lists in narrative prose

### Operational voice — DO
- Scannable, direct, imperative
- State failure conditions bluntly
- Name specific staff members / policies

### Operational voice — AVOID
- Generic advice applying to any destination
- Hedged language without thresholds
- "Check locally" without specifying what to check

## SHARED CONVENTIONS

For component names, build-pipeline requirements, metadata contract, recognised style/category tokens, and output location — see `~/.claude/skills/shared-article-jsx-reference.md`. This skill overrides only the DESIGN SYSTEM (warm editorial aesthetic below), the five-mode specification, the FotoVue location-entry template, and the literary/operational voice calibration.

## OUTPUT FORMAT — REACT JSX ARTIFACT

Delivered as a styled `.jsx` that renders in the Claude artifact viewer and on the companion static HF Space (`helwyr55/library-articles`).

### Design system
- **Palette**: `#FAF8F5` (offWhite), `#1a1a1a` (ink), `#C4A35A` (accent gold), `#8A8278` (warmGray), `#F0EBE1` (sidebar bg), `#F2EDE4` (cream source-note bg)
- **Fonts**: Playfair Display (headlines), Source Serif 4 (body), Source Sans 3 (sidebars, UI, captions), JetBrains Mono (code)
- **Hero**: 85vh, dark-tinted gradient overlay on a sourced photograph
- **Contrast**: body ink on offWhite; sidebars darkGray on `#F0EBE1`; hero white on dark overlay

### Required JSX component names (must match exactly for markdown-mirror extraction)
- `<Sec n="N" title="X">` — numbered section wrapper (NOT `<Section>`)
- `<P>{`...`}</P>` — prose paragraph (template literals, with `dangerouslySetInnerHTML` for inline `<em>`/`<strong>`)
- `<H3>`, `<H4>` — sub-headings
- `<DC>{`...`}</DC>` — drop-cap opening paragraph (NOT `<DropCap>`)
- `<SB title="Location Name">{`...`}</SB>` — sidebar (use for location entries)
- `<IC func="..." caption="..."/>` — image caption block (NOT `<ImgCaption>`)
- `<PQ>{`...`}</PQ>` — pull quote
- `<Callout type="info|warn|tip" title="...">{`...`}</Callout>` — use for Failure Conditions, Field Notes, Tips
- `<Photograph src="..." alt="..." caption="..." credit="..." href="..." />` — sourced photographs. MUST have a live src URL in final output. Sourcing order (CLI): Unsplash → Wikimedia Commons → Pexels (see shared-article-jsx-reference §7). Place one at the top of each LOCATION ENTRY sidebar, plus inter-section photographs every 2–3 `<Sec>`s.

### Build-pipeline requirements (hard)
- `export default function ArticleName() { ... }` or `export default ArticleName;`
- No ES `import` statements — `React`, `Recharts`, etc. are globally available via Babel Standalone at runtime
- No `/mnt/user-data/outputs/` — save directly into the library-articles repo

### Output location
- Save to `library-articles/articles/{kebab-slug}.jsx` via the Write tool
- Kebab-slug rule: lowercase, hyphen-separated, no date prefix (e.g., `malta-photography-guide.jsx`)
- Then invoke the `library-article-publisher` skill to file the markdown mirror in `library/articles/{slug}.md`, commit, and push to both HF Spaces

### Metadata emission — NON-NEGOTIABLE

Every generated `.jsx` MUST begin with BOTH a frontmatter comment AND an `ARTICLE_DATA` constant:

```jsx
/* ---
title: "..."
subtitle: "..."
date: YYYY-MM-DD
tags: [place-slug, tag1, tag2]
read_time: "N min"
category: travel-photography
style: <ONE OF (must match the mode chosen): travel-literary | travel-photo-essay | travel-service-hybrid>
mode: <classic | photo-essay | service-hybrid | slow-travel | sciam-hybrid | encyclopaedic>
--- */

const ARTICLE_DATA = {
  title: "...",
  subtitle: "...",
  date: "YYYY-MM-DD",
  tags: ["tag1", "tag2"],
  read_time: "N min",
  category: "travel-photography",
  style: "travel-literary",
  mode: "classic",
};
```

**Mode-to-style mapping** (the Streamlit reader's `STYLE_BADGES` has only three travel tokens; fall back per this table):
| Mode | `style:` token |
|------|----------------|
| Classic Travel Narrative | `travel-literary` |
| Photo Essay | `travel-photo-essay` |
| Service + Story Hybrid | `travel-service-hybrid` |
| Slow Travel / Deep Place | `travel-literary` (fallback) |
| SciAm Hybrid | `travel-literary` (fallback) |
| Encyclopaedic | `travel-service-hybrid` (fallback — comprehensive destination guide) |

**Category**: always `travel-photography` (matches the reader's `CATEGORY_EMOJI`).

## EXECUTION WORKFLOW

1. **Mode selection** (automatic from prompt)
2. **Research**: GPS coords, named locals, access restrictions, seasonal timing, failure conditions, historical context, sunrise/sunset data
3. **Visual spine planning** before writing a word of prose
4. **Literary opening** — lead scene + named character + revealed context
5. **Operational section** — full template per location, mark [FIELD VERIFY] where research can't confirm
6. **Quality gate** — run before delivery

## QUALITY GATE

### Literary
- [ ] Lead sentence places reader in specific physical location with sensory detail
- [ ] ≥3 named local characters with quotes, ages, occupations
- [ ] Every "stunning/vibrant/charming" replaced with specific data
- [ ] Local voices centred as experts, not backdrop
- [ ] Closing is cosmic kicker, not summary

### Photography
- [ ] GPS coords for every primary shooting position
- [ ] Compass bearing for primary composition
- [ ] Specific timing per season
- [ ] ≥1 failure condition per location
- [ ] ≥2 alternative compositions per location
- [ ] Worked exposure starting point

### Visual architecture
- [ ] Destination overview map specified
- [ ] Golden-hour timing reference
- [ ] Visual spine shows logical sequence

### Operational completeness
- [ ] Booking lead times and channels
- [ ] Photography restrictions stated specifically
- [ ] "Combine With" pairing per location
- [ ] "Local Knowledge" paragraph per location

## SOURCE INTEGRITY NOTE — MANDATORY

Every guide concludes with a section listing: unverified GPS coords, timing claims based on calculation vs verified reports, seasonal access items to verify before use, composite character flags, contested claims, inferred failure conditions, voices a field reporter should seek, date-sensitive items.

## COMPETITIVE STANDARD

Benchmark against Pico Iyer / Jan Morris (prose), NatGeo 1990s–2010s (photo integration), FotoVue (operational), PhotoPills community (timing), Orion Magazine (local voice), Lonely Planet (service info). This skill's niche: none of these does all six simultaneously.

## CRITICAL FAILURE MODES TO AVOID

1. **The Armchair Guide That Fails in the Field** — beautiful prose, no GPS
2. **The Spec Sheet That Nobody Reads** — no reason to care
3. **Generic Wonder Language** — no sensory data
4. **Locals as Backdrop** — no names, no interiority
5. **Vague Timing** — no clock time
6. **Failure Conditions Omitted**
7. **Mode Incoherence** — blending literary and operational in same paragraph
8. **The Azure Window Error** — present tense for landmarks that changed

## APPENDIX — WORKED EXAMPLE (operational benchmark)

This is the operational standard every location entry in this skill must meet. It is a FotoVue-style entry for Tignè Point in Valletta, Malta. Use it as the reference shape when populating the LOCATION ENTRY TEMPLATE.

```
TIGNÈ POINT VIEWPOINT — VALLETTA SKYLINE
Sliema, Malta · Urban Panorama

COORDINATES
Primary shooting position: 35.9108°N, 14.5067°E
(Far tip of Tignè Peninsula, adjacent to Tignè Point shopping development)
Parking: 35.9139°N, 14.5034°E (Tignè Street, free street parking)
Walking time to position: 8 minutes on flat pavement
Path difficulty: Easy — paved promenade throughout

THE SHOT
Facing east-southeast across Marsamxett Harbour toward Valletta's historic
skyline. The composition includes (L to R): the dome of St Paul's Anglican
Pro-Cathedral, the larger dome of the Carmelite Church, and the tower of
St John's Co-Cathedral. At 70–200mm, the domes compress into a layered
skyline above the illuminated battlements. At blue hour, harbour lights
reflect in the water foreground. At golden hour, the limestone facades
glow amber against a deepening sky.

COMPASS BEARING: 115°E (shooting direction) · SUBJECT BEARING: 120°E

TIMING
Best light: Blue hour — 20 minutes after sunset to 40 minutes after sunset
Golden hour alternative: Sunrise from 20 minutes before to 20 minutes after
October: Sunset 18:12; blue hour window 18:32–18:52; bring tripod
June: Sunset 20:02; blue hour window 20:22–20:42; harbour more active
Sun app: In PhotoPills, search "Valletta, Malta" and set AR to 120°E to
visualise sunrise alignment — in October, sunrise at 095° places sun
slightly left of centre dome

WHAT MAKES THIS SHOT FAIL
1. Sirocco conditions (warm SE wind, common April–September): dust haze
   from North Africa flattens limestone colour and kills contrast. Check
   MeteoMalta for wind direction — NW or N wind gives clearest air.
2. Choppy harbour: no foreground reflection without calm water. Force 2+
   wind from the east creates surface chop that destroys blue-hour
   reflections.
3. Arriving after blue hour: by 50 minutes post-sunset the sky goes black
   and the city lights lose their sky-to-city balance. The window is 20
   minutes wide.

ALTERNATIVE COMPOSITIONS
Alt 1 — Wider context at 24mm: Step back to the Tignè promenade benches
(35.9118°N, 14.5054°E) and shoot at 24mm to include the harbour wall and
foreground water. Loses dome compression but gains harbour scale.
Alt 2 — Sliema waterfront long exposure: Face west along the Sliema
promenade (35.9125°N, 14.5020°E) with the city lights reflected in the
harbour. Different mood — glittering rather than monumental.
Alt 3 — Dawn reverse: At sunrise (bearing 095°E), Valletta's east-facing
walls catch the first light while the promenade side is still in shade.
Walk to the Valletta waterfront (35.8985°N, 14.5140°E) and shoot back
toward Tignè.

LENS GUIDE
16–24mm: Wide harbour panorama including water and full sky — loses dome detail
35–50mm: Balanced composition — good for environmental shots with people
70–200mm: Classic compressed-dome skyline — the definitive Valletta shot at 135mm

WORKED EXPOSURE (Blue Hour)
135mm, f/8, 25–45s, ISO 200, tripod, 2-second timer or remote release.
Bracket ±1 stop. Aim for harbour lights at ~128 (histogram) without clipping.

FILTERS
No polariser needed at this time of day. Consider 3-stop ND to extend
exposure for smoother water if surface is lightly choppy. No GND required
— sky and city lights are in natural balance at blue hour.

ACCESS & PERMISSIONS
Open access — public promenade, no restrictions.
Entry fee: None.
Photography restrictions: None. Tripods freely usable on the promenade.
Drone: Heritage Malta permit required for flight over Valletta (visible from here).
Accessibility: Fully paved, flat. Accessible for wheelchair users.

COMBINE WITH
Grand Harbour viewpoint from Upper Barrakka Gardens (15-min walk through
Valletta via the ferry from Sliema — €2.50 crossing, 8 minutes). Shoot
Tignè at blue hour, then cross to Valletta for dawn from the Barrakka.

LOCAL KNOWLEDGE
The Tignè Point shopping development security staff occasionally challenge
photographers using tripods on the promenade adjacent to the building.
The public promenade 30 metres further toward the point is fully public
land with no such issue. Move past the development's edge before setting
up.
```

**Why this passes the Field Test**: A photographer arriving at Tignè Point at 06:00 in October with no local knowledge can navigate to the exact position, know they have until approximately 06:25 before the golden-hour window opens, know that a sirocco wind would have cancelled the plan the night before, know two alternative compositions if the primary does not work, and know where not to set up a tripod.

**Use this as the exemplar for every location entry you generate.**
