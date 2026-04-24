---
name: travel-photography-article
description: Generate deeply reported, photography-led travel articles for DESTINATIONS YOU VISIT — literary prose + FotoVue-style operational photography guide with GPS, compass bearings, golden-hour timing, and failure conditions per location. Trigger on "photography guide to [place]", "travel guide to [place]", "photo essay about [place]", "destination guide", "visual travel feature", "where to shoot in [place]", "a week in [place]", "[place] field guide for photographers", or "travel article on [destination]". Modes (auto-inferred): Classic Travel Narrative (literary), Photo Essay (photography-led), Service + Story Hybrid (mainstream guide), Slow Travel / Deep Place (single-location immersion), SciAm Hybrid (expedition/natural-history TRAVEL), Encyclopaedic (comprehensive DESTINATION guide). Do NOT use for non-travel science/nature/culture features (→ natgeo-article, even if they mention a place), DS/ML content (→ technical-ds-article), or quick DDODS explainers (→ article-generator). Disambiguation: if the subject is a phenomenon/species/concept that exists everywhere, use natgeo-article; if the subject is a specific place the reader could visit, use this skill.
version: 2.1.0
---

# SKILL: Travel & Photography Article Generator

## PURPOSE

Generate deeply researched, photography-led travel articles that work at two levels simultaneously: as **literary travel writing** worth reading at home, and as **operational photography guides** worth using in the field. Every article must treat photography and prose as co-equal storytelling elements — but with photography as the leading storyteller, since travel is fundamentally a visual genre.

The defining test of this skill's output is the **Field Test**: can a photographer who has never visited the destination open this guide at a specific location entry, read it in under two minutes, and know exactly where to stand, exactly when to arrive, exactly what settings to start with, and exactly what will make the shot fail? If the answer is no, the guide is not finished.

The secondary test is the **Armchair Test**: does the literary framing give the reader a reason to care about these places before they arrive — character, history, sensory texture, a reason beyond "it's photogenic"? If the answer is no, this is a spec sheet, not a guide.

Both tests must pass simultaneously. This is the tension the skill is designed to resolve.

This skill is grounded in deep study of two traditions that almost never appear in the same publication:

**The literary travel writing tradition**: Pico Iyer, Jan Morris, Bruce Chatwin, Colin Thubron, AFAR Magazine, Cereal, Sidetracked. These writers make you feel a place before you have arrived. They produce pieces worth reading years after the trip.

**The FotoVue location guide tradition**: Authors including David Noton, Mark Bauer, Ross Hoddinott, and Lizzie Shepherd. FotoVue books are the gold standard for operational photography guidance — GPS coordinates to the decimal, compass bearings, monthly timing tables, failure conditions, alternative compositions, parking specifics. A photographer in the field with a FotoVue book has everything they need. The prose is functional, not literary — but the operational precision is unmatched.

The gap this skill fills is the space between them: guides that are as precise as FotoVue and as readable as Pico Iyer. That combination does not currently exist as a standard form. This skill creates it.

---

## PART 1: THE TWO TRADITIONS IN DETAIL

### 1A. The Literary Travel Writing Standard

The best travel writing does not describe places — it inhabits them. Key characteristics:

**Voice**: First-person-adjacent (the narrator is present but not the subject). Curious, knowing, unhurried. Projecting discovery without naivety. Never performing wonder — earning it through specific detail.

**Structure**: Opens with a lead scene that drops the reader into a specific place, at a specific moment, with a specific sensory register. Followed by a nut graf that explains what is at stake and why this place matters. Unfolds through a three-act arc: arrival → complication → meaning. Closes on a cosmic kicker — a resonant image or thought that opens outward rather than summarising.

**The telling detail**: Every generic phrase must be replaced by the specific. Not "the ancient walls" but "the sixteenth-century bastions in globigerine, soft enough when quarried to cut with a handsaw, warm amber in afternoon light." Not "traditional fishing boats" but "the luzzu, each hull bearing the Eye of Osiris in an unbroken tradition from Phoenician seafaring, 2,700 years of the same apotropaic symbol."

**Named local characters**: At minimum three named local voices — not sources, not subjects, but characters with ages, occupations, direct quotes, and narrative function. These are the people who carry the story's human weight. They must be local experts and agents, not exotic backdrop.

**The failure modes to avoid**:
- Generic wonder: "the stunning landscape," "the majestic architecture," "the vibrant culture" — replace every instance with specific sensory data
- The colonial gaze: locals as backdrop, locals as colour, locals as objects of curiosity rather than subjects of their own lives
- Lecturing: facts delivered as facts rather than revealed through character and scene
- The checklist: a list of places dressed in prose — structure must follow narrative logic, not geography

### 1B. The FotoVue Operational Standard

FotoVue books work because they give a photographer every decision they need to make before arriving at a location. Key requirements:

**GPS Coordinates**: Every primary shooting position must have decimal degree coordinates (e.g., 35.9108°N, 14.5067°E). Secondary viewpoints and parking positions also need coordinates. This is non-negotiable — a photographer arriving before dawn in an unfamiliar city needs to navigate to the metre.

**Compass Bearings**: Every location entry must specify (a) the compass bearing of the primary composition (the direction you are shooting), and (b) the compass bearing toward the main subject (so the entry can be used with PhotoPills or The Photographer's Ephemeris to determine when the sun aligns). Example: "From Tignè Point, primary composition bearing 115°E toward Carmelite Church dome. In October, sunrise at 095° places the sun rising almost directly behind the dome at 07:15 local time."

**Golden-Hour Timing**: Every guide must include a timing reference — either a worked example per season ("in October, civil twilight 05:55, golden hour 06:25–06:55") or a full monthly table. The phrase "golden hour" without a time is operationally useless.

**Failure Conditions**: For every location, one clear statement of what makes the shot fail. This is the most valuable and most absent information in most photography guides. Examples: "This shot fails in sirocco conditions — dust haze flattens limestone colour and kills contrast." "Blue Lagoon boat trips do not run above Force 3 wind — check MeteoMalta the evening before." "The gallarija balconies face NNW; in summer they are in shadow all day. The shot exists only in winter late afternoon."

**Alternative Compositions**: Every location entry must offer a minimum of two alternative compositions beyond the primary shot — typically one tighter detail and one wider contextual view. A photographer spending three hours at a location needs three compositions minimum, not one.

**Parking and Access Specifics**: Parking coordinates or nearest lay-by, distance to shooting position, walking time, path difficulty. Access restrictions (time-based, permit-based, seasonal). Accessibility rating (for photographers with mobility considerations). This information cannot be found in any tourist guide and is essential for dawn shoots.

**Weather and Condition Dependencies**: For coastal locations — sea state requirements, wind direction effects, tide relevance. For landscape locations — cloud cover preferences, wind effects on vegetation or water. For urban locations — crowd patterns, market days, event calendars that transform or destroy compositions.

**Worked Exposure Starting Points**: Not generic gear advice, but location-specific starting exposures. Example: "St John's Co-Cathedral interior: 24mm, f/4, ISO 3200, 1/60s hand-held minimum — bring IBIS-capable body. Tripods technically prohibited; a beanbag on a pew is tolerated by staff."

**Sun Position App Integration**: Note when to use PhotoPills or The Photographer's Ephemeris and what to search for. For locations where Milky Way or moon alignment matters, specify the relevant dates and alignments.

---

## PART 2: THE FIVE MODES

Mode is inferred automatically from the user's prompt. All modes produce the dual literary/operational output; what changes is the proportion and the primary reader.

### Mode 1 — Classic Travel Narrative (Default)
**Primary reader**: Literary travel reader, armchair traveller, travel writer.
**Lead element**: Prose — a character, a journey, a place revealed through narrative.
**Photography**: Woven into the prose as beats rather than separated into entries.
**Operational content**: Present but integrated into the narrative rather than presented as a reference section.
**Length**: 3,000–6,000 words.
**Reference publications**: AFAR, Cereal, Condé Nast Traveler long-form, Sidetracked.

### Mode 2 — Photo Essay (Photography-Led)
**Primary reader**: Photographer, photo editor, visual storyteller.
**Lead element**: The photograph sequence — captions carry the narrative weight.
**Prose**: Minimal — an opening essay (300–500 words) and closing reflection only. The images and their captions tell the story.
**Operational content**: Each caption integrates the technical data (location, timing, lens, settings, conditions) within the narrative caption text rather than as separate spec rows.
**Length**: 500–1,000 words prose; 8–15 photograph briefs.
**Reference publications**: NatGeo Magazine (photography-led features), Magnum Photos essays.

### Mode 3 — Service + Story Hybrid (Default for "guide" prompts)
**Primary reader**: Photographer planning a trip, travel photographer wanting both inspiration and operational precision.
**Lead element**: A short literary opening (500–800 words) establishing place, character, and stakes — then a clean structural break into a reference section.
**Structure**: Part One (Literary) + Part Two (Operational Reference). These sections have different voices and information architectures. Do not blend them — the reader needs to know when they have crossed from inspiration to instruction.
**Operational content**: Full FotoVue standard for every location entry. See Part 3 for the complete location entry template.
**Length**: 1,000–1,500 words literary; full operational entries for every location.
**Reference publications**: FotoVue guidebooks, Outdoor Photography magazine location guides, The Photographer's Ephemeris blog.

### Mode 4 — Slow Travel / Deep Place
**Primary reader**: Photographer planning an extended stay at a single location (a week or more).
**Lead element**: A deeply immersive literary portrait of one place — its light across the seasons, its people across the days, its hidden compositions that only reveal themselves over time.
**Photography**: Structured as a progression from "first visit" shots to "return visit" shots to "resident" shots — the arc of deepening visual knowledge.
**Operational content**: More granular than Mode 3 — multiple visits per location, noting how each changes the composition.
**Length**: 4,000–8,000 words.
**Reference publications**: Orion Magazine (sense of place), David Ward's landscape photography writing, Charlie Waite's photography essays.

### Mode 5A — Scientific American Hybrid (Expedition / Natural History)
**Primary reader**: Expedition photographer, natural history documentary researcher.
**Lead element**: The scientific or ecological phenomenon being photographed — the photography serves the science, not vice versa.
**Operational content**: Includes scientific context that determines photographic decisions (migration timing, tidal cycles, geological formations, species behaviour windows).
**Length**: 3,000–5,000 words.
**Reference publications**: NatGeo (expedition features), BBC Wildlife Magazine, bioGraphic.

### Mode 5B — Encyclopaedic (Comprehensive Destination Guide)
**Primary reader**: Photographer wanting complete coverage of a destination.
**Lead element**: A brief literary introduction followed by systematic coverage of every significant photographic location in the destination.
**Structure**: Organised by island/region/area, not by priority. Every location covered to the same depth.
**Operational content**: Full FotoVue standard throughout; monthly timing table mandatory; full map specification required.
**Length**: As long as necessary for complete coverage.
**Reference publications**: FotoVue complete destination guides, Lonely Planet photography editions.

---

## PART 3: THE LOCATION ENTRY TEMPLATE (FOTOVUE STANDARD)

Every location entry in Modes 3, 4, and 5B must conform to this template. It is not optional. The order of elements is fixed — this is the order a photographer reads when planning a shoot.

```
LOCATION NAME
[Island/Region] · [Location Type: Coastal / Urban / Rural / Interior / Underground]

COORDINATES
Primary shooting position: [DD.DDDD°N, DD.DDDD°E]
Secondary viewpoint (if applicable): [DD.DDDD°N, DD.DDDD°E]
Parking: [DD.DDDD°N, DD.DDDD°E or "street parking on [road name]"]
Walking time from parking to position: [X minutes]
Path difficulty: [Easy flat / Uneven terrain / Clifftop (no barrier) / Steep descent]

THE SHOT
[One paragraph: the primary composition. What you are shooting, from where, facing which direction, at what time. Specific enough that a photographer who has never been there can visualise the frame before arriving.]

COMPASS BEARING: [Primary bearing] · SUBJECT BEARING: [Direction toward main subject]

TIMING
Best light: [Specific time window, e.g., "45 minutes before to 20 minutes after sunrise"]
Season modifier: [How the shot changes by season — which season is best and why]
Monthly reference: [E.g., "October sunrise 06:28; golden hour 06:28–06:58. Summer sunrise 05:45 but sun too high by 06:30 for raking light."]
Sun position app note: [What to search in PhotoPills / TPE to plan this shot]

WHAT MAKES THIS SHOT FAIL
[One to three specific failure conditions. Weather, light, crowd, tide, season, time-of-day errors. This is the most valuable information in the entry.]

ALTERNATIVE COMPOSITIONS
Alt 1 — [Name]: [Description of second composition from same location or within 5-min walk. Include lens and direction change.]
Alt 2 — [Name]: [Description of third composition.]
Alt 3 (optional) — [Name]: [Fourth composition if relevant.]

LENS GUIDE
Wide (16–24mm): [What it achieves at this location]
Standard (35–50mm): [What it achieves]
Telephoto (70–200mm+): [What it achieves]
Macro / Detail: [If relevant]

WORKED EXPOSURE
[Starting exposure for the primary shot. Format: focal length, aperture, shutter speed, ISO, filter if required. Note: this is a starting point, not a prescription.]
Example: "Valletta skyline at blue hour from Tignè: 70mm, f/8, 30s, ISO 200, on tripod. Adjust shutter to taste for harbour light balance."

FILTERS
[Polariser / ND / GND recommendations specific to this location and shot. Note why each filter matters here — not generic filter advice.]

ACCESS & PERMISSIONS
Opening hours: [If applicable]
Entry fee: [If applicable]
Photography restrictions: [Tripod prohibition, flash, drone, permits]
Booking required: [Yes/No — if yes, how far ahead and via what channel]
Accessibility: [Notes for photographers with mobility considerations]

COMBINE WITH
[One or two nearby locations that make a logical same-day pairing, with drive/walk time between them.]

LOCAL KNOWLEDGE
[One short paragraph — a piece of information that only comes from being there or from a local source. Market days, fisherman routines, seasonal events, the café that opens at 5am for dawn shooters, the guard who allows tripods if you ask politely. This is the paragraph that cannot be Googled.]
```

---

## PART 4: NAMED LOCAL CHARACTERS — MANDATORY REQUIREMENT

Every guide must include at minimum **three named local individuals** who appear in the literary opening and are woven into the location entries. These are not sources or subjects — they are characters.

Each character needs:
- **Full name** (or first name if appropriate)
- **Age and occupation**
- **One direct quote** — specific, not generic, in their own voice
- **One action or detail** that reveals something about their relationship to the place
- **Narrative function** — what does their presence tell us about this place that no amount of description could?

**Characters to seek**:
- A working local professional whose daily life is inseparable from the landscape being photographed (fisherman, farmer, salt worker, lighthouse keeper, quarry worker)
- A keeper of historical or cultural knowledge (local historian, temple guide, traditional craft practitioner)
- A younger local — someone whose relationship to the place reflects how it is changing

**What local characters must NOT be**:
- Generic "locals" serving as exotic atmosphere
- People described from the outside ("an old man mending nets") without name, quote, or interiority
- Tourist industry workers whose quotes are promotional rather than personal
- People whose presence in the guide would surprise or embarrass them

If field reporting for named characters is not possible (article is being generated rather than reported), the guide must acknowledge this explicitly and specify what characters a field reporter should seek.

---

## PART 5: MAPS AND DIAGRAMS — MANDATORY SPECIFICATIONS

Every guide must specify a minimum of one map and, where relevant, one diagram. These are not illustrations — they are information tools that carry content the prose cannot.

### The Destination Overview Map
Required for all guides covering more than one location. Must specify:
- All shooting locations numbered and positioned
- Inter-location travel routes (road, ferry, walking path)
- Approximate compass arcs for key sunrise/sunset directions from primary locations
- Distance scale
- Orientation (north indicator)
- Ferry terminals, car parks, and key access points

The map specification must be detailed enough to brief a cartographic illustrator. State: projection, coverage area, numbered locations with their names, key roads/ferries to show, what annotation layers to include.

### The Timing Diagram
Required for all guides. A visual reference tool showing:
- All 12 months on the horizontal axis
- Sunrise and sunset times plotted as a curve
- Golden hour windows shaded
- Seasonal annotations (crowds, harvest seasons, festivals, weather patterns)
- For destinations with tidal relevance: tidal pattern overlay

### Location Cross-Section or Orientation Diagram
Required for complex locations where spatial orientation matters (cliff locations, bay compositions, interior spaces). Shows: the photographer's position, the subject's position, the sun's arc, the compass orientation. A reader looking at this diagram should be able to instantly understand the spatial logic of the shot.

---

## PART 6: THE VISUAL NARRATIVE SPINE

Before writing any prose, map the full visual sequence. The visual spine is a planning document, not a template. It specifies the order in which images, diagrams, and prose take turns carrying the story — and ensures no element merely repeats what another element has already said.

```
VISUAL NARRATIVE SPINE

[HERO IMAGE] → Establishes: place, mood, scale. Answers: what does this place feel like?
[OPENING PROSE: Para 1–3] → Narrative function: [Lead scene, character intro, stakes]
[IMAGE 2] → Answers: [What does this image show that the prose cannot say?]
[PROSE: Para 4–6] → Narrative function: [Historical/cultural layering]
[MAP] → Answers: Where are these places in relation to each other? How do I get between them?
[PROSE: Para 7–9] → Narrative function: [Transition to operational section]
[LOCATION ENTRY 1] → Photography function: [Establishes the primary composition]
[IMAGE 3] → Answers: [What does this location actually look like? What is the quality of light?]
[LOCATION ENTRY 2–4] → Photography function: [Builds the visual argument for why the destination rewards repeated visits]
[TIMING DIAGRAM] → Answers: When should I be where?
[LOCATION ENTRY 5–8] → Photography function: [Completes the coverage]
[CLOSING PROSE] → Narrative function: [Cosmic kicker]
```

Adapt the spine to the specific destination and mode. The spine is a tool for ensuring visual logic, not a formula to fill in.

---

## PART 7: VOICE AND REGISTER CALIBRATION

The literary sections and the operational sections have deliberately different voices. Do not blend them — the reader needs to know which mode they are in.

### Literary Voice — DO:
- Drop the reader into a specific physical moment: dawn, a specific person, a sensory detail
- Use extended metaphors sustained across multiple paragraphs
- Let a single scene carry information that a list would flatten
- Name the limestone, the species, the boat, the person — never the generic category
- Write the failure alongside the beauty — the sirocco that ruins the shot, the cruise ship that destroys the harbour at 9am, the tourist coach that parks in front of the composition
- Give local characters interiority and agency, not just colour

### Literary Voice — AVOID:
- "Stunning," "vibrant," "charming," "magical," "breathtaking" — replace every instance with specific sensory data that would justify the adjective
- Causal claims beyond what evidence supports
- The colonial gaze — locals as backdrop or exotic atmosphere
- Lists and bullet points in narrative prose
- Subheadings in the literary section

### Operational Voice — DO:
- Be direct and scannable — a photographer planning a dawn shoot at 5am does not want to parse literary sentences
- Use imperative constructions where they clarify: "Arrive 45 minutes before sunrise. Park at the lay-by on [road], not the main car park — the gate closes at dusk and may not open until 08:00."
- State failure conditions bluntly: "This shot does not exist in flat overcast. Come back tomorrow."
- Note the specific staff member or policy that determines tripod access — not "tripods may be restricted" but "tripods prohibited in the nave; staff in the side chapels generally permit a beanbag on a pew if you ask first"

### Operational Voice — AVOID:
- Generic advice that applies to any destination (generic filter advice, camera settings for "indoor photography")
- Hedged language that avoids commitment: "you might want to consider" → "use a 6-stop ND"
- Advice that requires field verification before it is useful: "check locally for current conditions" → specify *what* to check, *where*, and *what the threshold is*

---

## PART 8: GOLDEN-HOUR TIMING — MANDATORY ELEMENT

Every guide must include specific timing information. "Golden hour" without a clock time is operationally useless. Choose one of the following formats depending on guide length and mode:

### Format A — Monthly Table (Encyclopaedic and Service + Story Hybrid for multi-season destinations)
A table covering all 12 months, giving for the destination's latitude:
- Civil twilight (start of usable light)
- Sunrise
- Golden hour window (sunrise to ~45 min after)
- Sunset
- Blue hour window (~20 min after sunset)
- Total golden light available (minutes)

### Format B — Seasonal Worked Examples (all other modes)
For each of the four seasons, one worked example giving:
- Month used for the example
- Civil twilight time
- Sunrise time
- Golden hour start / end
- Key note on light quality this season (sun angle, colour temperature, shadow length)

### Format C — Location-Specific Note (for guides where timing varies by composition direction)
For each location that faces a specific compass direction, note:
- Which season the shot exists (e.g., "the gallarija balconies face NNW — they are lit only in winter from October to February, late afternoon")
- The specific month and time window when the shot is at its best
- The specific month when the shot does not exist at all

---

## PART 9: FAILURE CONDITIONS — THE MOST IMPORTANT SECTION NO GUIDE INCLUDES

The single most valuable piece of information a photography guide can give is: what makes this shot fail.

Tourist guides never include this. Travel articles never include this. Even most photography guides are vague about it. FotoVue includes it as standard, and it is the reason working photographers carry FotoVue books rather than any other guide.

For every location entry, specify:

**Weather failures**: The wind direction, cloud type, or weather system that destroys this composition. Not "avoid bad weather" — specify: "sirocco from the SE flattens limestone colour and kills contrast in Valletta"; "easterly swell makes the clifftop path at Ħaġar Qim unsafe above Force 4."

**Time-of-day failures**: The hour at which the light turns against the composition. "By 08:30 in June the sun has risen above the cathedral roof and the shadow pattern that makes the street composition disappear until 16:00."

**Seasonal failures**: The month or season in which the shot does not exist. "The salt pans are dry stone from October to April — the mirror-reflection shot requires water in the pans, which means May–September only."

**Crowd failures**: The day of week, time of day, or event that makes the composition impossible. "On Sunday mornings between 09:00 and 13:00, the fish market crowds make environmental portraiture impossible — return in the afternoon when the stalls are packing up, for the quieter, more melancholic version of the same scene."

**Technical failures**: The gear limitation that matters here. "The Co-Cathedral interior requires a minimum ISO of 1600 at f/4 for hand-held shooting — cameras that produce unacceptable noise above ISO 3200 will struggle."

**Access failures**: The booking window, permit, or timing that means the shot simply cannot happen on short notice. "The Hypogeum accepts no same-day visitors — minimum booking lead time three months in peak season."

---

## PART 10: EXECUTION WORKFLOW

When a user provides a destination or prompt, proceed in this sequence.

### Step 0 — Mode Selection
Infer the mode from the prompt. Key signals:
- "guide," "handbook," "practical," "where to photograph" → Mode 3 (Service + Story Hybrid)
- "essay," "feature," "article about" → Mode 1 (Classic Travel Narrative)
- "photo essay," "captions," "images" → Mode 2 (Photo Essay)
- "week in," "living in," "extended time" → Mode 4
- "wildlife," "expedition," "natural history" → Mode 5A (Scientific American Hybrid)
- "complete guide," "comprehensive," "all locations" → Mode 5B (Encyclopaedic)

If ambiguous, default to Mode 3 and state the assumption.

### Step 1 — Research Phase
Use web search to gather, in this order of priority:
1. GPS coordinates for primary shooting positions at key locations (search "[location name] photography GPS coordinates" or "[location name] viewpoint coordinates")
2. Named local individuals who embody the destination — craftspeople, fishermen, guides, historians — with ages, occupations, and any available direct quotes
3. Current access restrictions, entry fees, photography permissions, booking requirements
4. Seasonal and timing specifics — when markets run, when harvests happen, when festivals transform locations
5. Failure conditions — forum discussions, photography blogs, trip reports that mention what went wrong (sirocco conditions, boat trip cancellations, crowd problems)
6. Historical and cultural context sufficient to support the literary sections
7. Monthly sunrise/sunset timing for the destination's latitude

Do not proceed to writing without GPS coordinates for at least the primary locations. If coordinates cannot be confirmed by research, state that they require field verification.

### Step 2 — Visual Spine Planning
Before writing a single word of prose:
- Map the visual narrative spine end-to-end (see Part 6)
- Identify what each photograph must show that the prose cannot
- Specify the map(s) and diagram(s) required
- Identify the three local characters and their narrative function

### Step 3 — Literary Opening
Write the literary opening section first, in the mode's appropriate register. Check:
- Does the lead sentence place the reader in a specific physical location with sensory detail?
- Is there at least one named local character with a direct quote within the first 500 words?
- Is every piece of historical context revealed through character or scene, not delivered as exposition?
- Has every instance of generic wonder language been replaced with specific sensory data?

### Step 4 — Operational Section
Write the location entries using the template in Part 3. For each entry, complete every field in the template. If a field cannot be confirmed by research, mark it [FIELD VERIFY] rather than leaving it blank or guessing.

### Step 5 — Assembly and Cross-Check
Assemble the full document in the correct structure for the mode. Then run the Quality Gate in Part 11 before delivering.

---

## PART 11: QUALITY GATE

Run every check before delivering. If any box is unchecked, revise before delivering.

### Literary Quality Gate
- [ ] Does the lead sentence place the reader in a **specific physical location with sensory detail** — not a general statement about the destination?
- [ ] Are there at least **three named local characters** with direct quotes, ages, occupations, and narrative function?
- [ ] Is every statistic inside a sentence with **human context** — not a standalone number?
- [ ] Has every instance of "stunning," "vibrant," "charming," "magical," or equivalent been replaced with **specific sensory data**?
- [ ] Are local voices **centred as experts and agents**, not described from the outside as exotic atmosphere?
- [ ] Does the article avoid **causal claims beyond what evidence supports**?
- [ ] Is the closing line a **cosmic kicker** — opens outward, does not summarise?
- [ ] Does the literary section avoid **lists, bullet points, and subheadings** in the narrative body?

### Photography Quality Gate
- [ ] Does every location entry include **GPS coordinates** for the primary shooting position?
- [ ] Does every location entry specify a **compass bearing** for the primary composition?
- [ ] Does every location entry include **specific timing** — not just "golden hour" but the actual time window for the season?
- [ ] Does every location entry state **at least one failure condition** — the specific circumstance that makes the shot fail?
- [ ] Does every location entry offer **at least two alternative compositions** beyond the primary shot?
- [ ] Does every location entry include **parking/access specifics** — coordinates or named road, walking distance, difficulty?
- [ ] Does every location entry include a **worked exposure starting point** for the primary shot?
- [ ] Does every location entry note relevant **weather or condition dependencies** (sea state, wind direction, tide, crowd patterns)?
- [ ] Is gear advice **location-specific**, not generic — tied to specific shots at specific locations?

### Visual Architecture Quality Gate
- [ ] Is there a **destination overview map** specification with all locations numbered?
- [ ] Is there a **golden-hour timing reference** (table or worked examples) for the destination's latitude?
- [ ] Does the **visual narrative spine** show a logical sequence in which images, diagrams, and prose each carry content the others cannot?
- [ ] Do image briefs answer questions **the prose does not** — not just illustrate sentences already in the text?
- [ ] Are `<Photograph>` components **placed inline at spine points** (hero + 5–10 interior + closing), not clustered in a separate image section? (See Part 15.)

### Operational Completeness Gate
- [ ] Are booking requirements specified with **lead times and booking channels**?
- [ ] Are photography restrictions (tripods, flash, drone, permits) stated **specifically** — not as "check locally"?
- [ ] Are **opening hours and entry fees** current (or flagged for verification)?
- [ ] Is there a **"Combine With"** pairing for each location noting travel time between them?
- [ ] Is there a **"Local Knowledge"** paragraph for each location that could not be found in a tourist guide?

---

## PART 12: COMPETITIVE STANDARD

When assessing quality, the benchmark is the following tier. If the generated guide would not hold its own against them, it is not finished.

| Dimension | Gold Standard |
|---|---|
| **Literary prose** | Pico Iyer, Jan Morris, Colin Thubron — specificity of place, depth of character, unhurried observation |
| **Photography integration** | NatGeo Magazine 1990s–2010s print era — images and prose as genuinely co-equal storytellers |
| **Operational precision** | FotoVue location guides — GPS coordinates, compass bearings, failure conditions, worked exposures |
| **Timing intelligence** | The Photographer's Ephemeris blog and PhotoPills community guides — month-by-month, direction-specific |
| **Local voice** | Orion Magazine — local expertise centred, not footnoted; communities as agents of their own landscape |
| **Service information** | Lonely Planet photography editions — prices, hours, access, booking, transport, verified and current |

The gap this skill aims to fill is: **none of these publications does all six simultaneously**. Literary travel writing ignores operational precision. FotoVue ignores prose quality and local voice. NatGeo has the photography but rarely the operational specifics. This skill produces guides that pass all six tests.

---

## PART 13: CRITICAL FAILURE MODES TO ACTIVELY AVOID

These are the documented failure patterns that turn a potentially excellent guide into a frustrating one. Every output must be actively checked against them.

### 1. The Armchair Guide That Fails in the Field
Beautiful prose, no GPS coordinates, no failure conditions, no timing specifics. A photographer reads it with pleasure at home and arrives at the location with no idea where to stand or when to be there. **Every location entry must pass the Field Test: can a photographer use this entry at 5:30am without a data connection?**

### 2. The Spec Sheet That Nobody Reads
GPS coordinates, exposure tables, access notes — and no reason to care about any of it. A list of locations dressed in functional prose. **Every guide must pass the Armchair Test: does the literary framing give the reader a reason to care about these places before they arrive?**

### 3. Generic Wonder Language
"The stunning architecture," "the vibrant market," "the magical light." These phrases carry zero information and lower the reader's trust in every specific claim that follows. **Replace every instance with the specific sensory data that would justify the adjective. If you cannot supply the data, cut the adjective.**

### 4. Locals as Backdrop
Describing people from the outside — "an old fisherman mending nets," "women in traditional dress" — without name, voice, or interiority. This is the colonial gaze operating at the level of prose style. **Every local person named in the guide is a character, not a detail. They have names, occupations, direct quotes, and things they know that you do not.**

### 5. Vague Timing
"Arrive at golden hour." "The light is best in the morning." "Visit at dusk for the best photographs." **None of these sentences is useful in the field. Every timing recommendation requires a clock time, a compass direction, and a month.**

### 6. Failure Conditions Omitted
This is the most common gap in travel photography guides and the most costly for the photographer who discovers it on location. "This shot does not exist when..." is the most valuable sentence in any location entry. **Every entry must include at least one explicit failure condition.**

### 7. Mode Incoherence
A guide that tries to be both a literary essay and a FotoVue reference simultaneously — blending literary prose and operational spec tables in the same paragraph — serves neither reader well. **The literary section and the operational section have different voices, different information densities, and different reading modes. Separate them clearly.**

### 8. The Azure Window Error
Describing a landmark, viewpoint, or attraction in the present tense when it no longer exists or has significantly changed. **Every factual claim about a physical location must be verified current. State the date of last verification for time-sensitive information.**

### 9. The Image Gallery At The End
Clustering every `<Photograph>` at the bottom of the JSX file instead of weaving images inline between sections. This reverts the article to prose-plus-appendix rather than genuinely co-equal storytelling. **Photographs must appear between `<Sec>`s at spine points. See Part 15.**

---

## PART 14: SOURCE INTEGRITY NOTE

Every guide must conclude with a source integrity note in the following format:

```
SOURCE INTEGRITY NOTE — [Destination], [Date of Generation]

GPS COORDINATES:
- [List any coordinates that could not be confirmed by research and require field verification]

TIMING DATA:
- [List any timing claims based on calculated values vs. verified field reports]

ACCESS AND PERMISSIONS:
- [List any access restrictions, fees, or booking requirements that change seasonally
  and should be verified before publication or use]

NAMED CHARACTERS:
- [If named local characters are composite, approximated, or placeholder, state this
  explicitly. Specify what a field reporter should seek.]

CONTESTED OR UNVERIFIABLE CLAIMS:
- [List any factual claims that could not be confirmed by research]

FAILURE CONDITIONS:
- [List any failure conditions that are based on inference rather than documented field reports]

LOCAL VOICES AND PERSPECTIVES TO ADD:
- [Specify the named characters or community perspectives that should be added
  in a full field-reported version of this guide]

DATE SENSITIVITY:
- [List any information with a high likelihood of changing: prices, ferry schedules,
  opening hours, access permits, booking windows]
```

---

## PART 15: INLINE PHOTO WEAVING IN JSX OUTPUT

This project's article surface (`library-articles/articles/*.jsx`) renders each article as interactive JSX. Photographs therefore live **as `<Photograph>` JSX components woven inline into the prose**, not as a separate gallery or caption list. This section binds the literary/operational spine above to the concrete JSX file the skill produces.

### The `<Photograph>` contract

Use the component exactly as defined in `shared-article-jsx-reference.md`:

```jsx
<Photograph
  src="<full https URL>"
  alt="<screen-reader alt, factual>"
  caption="<editorial prose, 12–25 words, picks up the narrative thread from the preceding Sec>"
  credit="<Photographer Name / Platform>"
  href="<link back to source; include UTM for Unsplash>"
/>
```

Do not use bare `<img>`. Do not use long-form names (`<ImgCaption>`); they are not recognised by `jsx_to_markdown.py` and will render as placeholders in the Streamlit mirror.

### Inline placement cadence (hard rule)

- **Hero shot** — immediately after the headline block, before the deck/drop-cap paragraph. This is the Field Test image: the reader should see the specific light and texture of the destination before a single word of prose.
- **Interior cadence** — one `<Photograph>` every 2–3 `<Sec>`s, always **between sections**, never inside a location entry's spec table, never mid-paragraph, never inside a `<Code>` or `<NB>`.
- **Volume per mode**:
  - Mode 1 (Classic Narrative): 5–8 interior photographs + hero
  - Mode 2 (Photo Essay): 8–15 photographs with captions carrying narrative weight
  - Mode 3 (Service + Story Hybrid): hero + 1 per location entry (directly after the entry's operational block) + closing shot
  - Mode 4 (Slow Travel / Deep Place): hero + 8–12 interior shots arranged as first-visit → return-visit → resident progression
  - Mode 5A (SciAm Hybrid): hero + 5–8 phenomenon-led shots
  - Mode 5B (Encyclopaedic): hero + 1 per location (often more) + timing-diagram companion
- **Closing shot** — place before the cosmic-kicker paragraph, never after it. The kicker is the last element.

### Caption writing — editorial, not alt-text

Captions are a second narrative register, not descriptive redundancy. Good caption: "At 05:55 Michele Vella's luzzu is already lit — the Marsaxlokk fleet sails by civil twilight, not sunrise." Bad caption: "A fishing boat at dawn."

- Pick up a name, a time, a specific verb from the section the photograph follows.
- Reveal information the prose did not (who, exactly when, what happened next).
- Never narrate what the photograph already shows.
- 12–25 words. Editorial prose, not sentence fragments.

### Operational-data caption extension (Modes 3, 4, 5B only)

When a `<Photograph>` sits directly inside or after a location entry, append a single-line technical tail to the caption, separated by " · ":

```
caption="Dawn from Tignè Point as the Sliema ferry crosses — limestone catches the first raking light at 06:25. · 70mm f/8 30s ISO 200 · 35.9108°N 14.5067°E · Oct"
```

This lets the caption serve both the Armchair Test (narrative) and the Field Test (operational) — the information density the skill exists to produce.

### Sourcing priority (from `shared-article-jsx-reference.md`)

1. **Unsplash** — travel, editorial, urban. `UNSPLASH_ACCESS_KEY`. UTM required: `?utm_source=dsl&utm_medium=referral`.
2. **Wikimedia Commons** — science, nature, history, archaeology. No auth. Attribution mandatory; pull the artist/licence from `extmetadata`.
3. **Pexels** — fallback for travel/lifestyle. `PEXELS_API_KEY`.

If all three return empty for a specific brief, fall back to an `<IC func="..." caption="..."/>` caption-only placeholder (an empty frame with prose) and flag the gap in the Source Integrity Note — do NOT embed a `<Photograph>` with a broken `src`.

### Common placement mistakes to avoid

- **The gallery cluster** — every `<Photograph>` at the end of the file. Violates co-equal storytelling; readers skim the text and scroll to a photo strip. Weave inline.
- **Mid-paragraph break** — splitting a paragraph to insert a `<Photograph>`. Keep paragraphs whole; photographs belong between `<P>`s or between `<Sec>`s.
- **Caption repeats prose** — if the caption paraphrases the sentence above it, either rewrite the caption to add content or delete the photograph; it is earning nothing.
- **Decorative duplication** — two `<Photograph>`s showing the same subject from almost the same angle. Each photograph must answer a question the others do not. Consult the visual spine.
- **Orphan hero** — a hero image with no caption. The hero still takes a caption; it sets the register for every caption that follows.
- **Location entry photographs inside `<NB>` or `<Code>`** — these are treated as preformatted text by the md extractor. Photographs inside them vanish from the mirror.

### Validation before delivery

For every JSX article the skill emits:

```
grep -c "<Photograph " articles/<slug>.jsx           # meets mode minimum (see volume above)
grep -c "src=\"https://" articles/<slug>.jsx         # same count (no bare <img>)
grep -c "<ImgCaption" articles/<slug>.jsx            # expect 0
grep -c "<Photograph[^/]*/>\s*<Photograph" articles/<slug>.jsx   # expect 0 (no back-to-back)
```

The operational-data tail should appear on every photograph caption in Modes 3/4/5B; this is a manual check during the Quality Gate.

---

## APPENDIX: FOTOVUE REFERENCE STANDARD

The following is a worked example of a FotoVue-standard location entry, using Valletta from the Malta guide as the test case. This is the operational benchmark every location entry in this skill should meet.

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
Facing east-southeast across Marsamxett Harbour toward Valletta's historic skyline.
The composition includes (L to R): the dome of St Paul's Anglican Pro-Cathedral,
the larger dome of the Carmelite Church, and the tower of St John's Co-Cathedral.
At 70–200mm, the domes compress into a layered skyline above the illuminated
battlements. At blue hour, harbour lights reflect in the water foreground. At
golden hour, the limestone facades glow amber against a deepening sky.

COMPASS BEARING: 115°E (shooting direction) · SUBJECT BEARING: 120°E (Carmelite dome)

TIMING
Best light: Blue hour — 20 minutes after sunset to 40 minutes after sunset
Golden hour alternative: Sunrise from 20 minutes before to 20 minutes after
October: Sunset 18:12; blue hour window 18:32–18:52; bring tripod
June: Sunset 20:02; blue hour window 20:22–20:42; harbour more active
Sun app: In PhotoPills, search "Valletta, Malta" and set AR to 120°E to visualise
sunrise alignment — in October, sunrise at 095° places sun slightly left of centre dome

WHAT MAKES THIS SHOT FAIL
1. Sirocco conditions (warm SE wind, common April–September): dust haze from
   North Africa flattens limestone colour and kills contrast. Check MeteoMalta
   for wind direction — NW or N wind gives clearest air.
2. Choppy harbour: no foreground reflection without calm water. Force 2+ wind
   from the east creates surface chop that destroys blue-hour reflections.
3. Arriving after blue hour: by 50 minutes post-sunset the sky goes black and
   the composition loses its sky-to-city balance. The window is 20 minutes wide.

ALTERNATIVE COMPOSITIONS
Alt 1 — Wider context at 24mm: Step back to the Tignè promenade benches
(35.9118°N, 14.5054°E) and shoot at 24mm to include the harbour wall and
foreground water. Loses dome compression but gains harbour scale.
Alt 2 — Sliema waterfront long exposure: Face west along the Sliema promenade
(35.9125°N, 14.5020°E) with the city lights reflected in the harbour.
Different mood — glittering rather than monumental.
Alt 3 — Dawn reverse: At sunrise (bearing 095°E), Valletta's east-facing walls
catch the first light while the promenade side is still in shade. Walk to the
Valletta waterfront (35.8985°N, 14.5140°E) and shoot back toward Tignè.

LENS GUIDE
16–24mm: Wide harbour panorama including water and full sky — loses dome detail
35–50mm: Balanced composition — good for environmental shots with people
70–200mm: Classic compressed-dome skyline — the definitive Valletta shot at 135mm
No macro requirement at this location.

WORKED EXPOSURE (Blue Hour)
135mm, f/8, 25–45s, ISO 200, tripod, 2-second timer or remote release.
Bracket ±1 stop. Aim for harbour lights at ~128 (histogram) without clipping.

FILTERS
No polariser needed at this time of day. Consider 3-stop ND to extend exposure
for smoother water if surface is lightly choppy. No GND required — sky and
city lights are in natural balance at blue hour.

ACCESS & PERMISSIONS
Open access — public promenade, no restrictions.
Entry fee: None.
Photography restrictions: None. Tripods freely usable on the promenade.
Drone: Heritage Malta permit required for flight over Valletta (visible from here).
Accessibility: Fully paved, flat. Accessible for wheelchair users.

COMBINE WITH
Grand Harbour viewpoint from Upper Barrakka Gardens (15-min walk through
Valletta via the ferry from Sliema — €2.50 crossing, 8 minutes). Shoot Tignè
at blue hour, then cross to Valletta for dawn from the Barrakka.

LOCAL KNOWLEDGE
The Tignè Point shopping development security staff occasionally challenge
photographers using tripods on the promenade adjacent to the building.
The public promenade 30 metres further toward the point is fully public land
with no such issue. Move past the development's edge before setting up.
```

This entry passes the Field Test. A photographer arriving at Tignè Point at 06:00 in October with no local knowledge can navigate to the exact position, know they have until approximately 06:25 before the golden-hour window opens, know that a sirocco wind would have cancelled the plan the night before, know two alternative compositions if the primary does not work, and know where not to set up a tripod.

This is the standard every location entry in this skill must meet.
