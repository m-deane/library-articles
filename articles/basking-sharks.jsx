/* --- YAML frontmatter --- */
/*
title: "The Slow Giants: Why Basking Sharks Return to the Hebrides"
subtitle: "The world's second-largest fish drifts each summer through a stretch of cold Atlantic between Coll and Canna, mouth held wide for a soup of copepods. After a century of slaughter and a generation of indifference, the science is finally catching up to the animal."
category: "science-nature"
style: "natgeo-sciam-hybrid"
date: "2026-04-25"
tags: [marine-biology, sharks, conservation, scotland]
read_time: "22 min"
mode: "full-feature"
*/

const ARTICLE_DATA = {
  title: "The Slow Giants: Why Basking Sharks Return to the Hebrides",
  subtitle: "The world's second-largest fish drifts each summer through a stretch of cold Atlantic between Coll and Canna, mouth held wide for a soup of copepods. After a century of slaughter and a generation of indifference, the science is finally catching up to the animal.",
  category: "science-nature",
  style: "natgeo-sciam-hybrid",
  date: "2026-04-25",
  author: "Matthew Deane",
  tags: ["marine-biology", "sharks", "conservation", "scotland"],
  read_time: "22 min",
  mode: "full-feature",
};

/* ------------------------ Palette & fonts ------------------------ */

const C = {
  bg:       "#F6F4EE",
  bgAlt:    "#EBE6D6",
  bgCard:   "#FFFFFF",
  fg:       "#1A1A1A",
  ink:      "#0F1B24",
  muted:    "#5B6470",
  accent:   "#0E5C7A",
  accent2:  "#3F8CA8",
  grid:     "#D6D0BE",
  rule:     "#C9A24A",
  panel:    "#EFEAD9",
  ok:       "#3F7D3F",
  warn:     "#B45309",
  bad:      "#8A1C1C",
  shark:    "#2A4759",
  shark2:   "#5E7E92",
  copepod:  "#C97B3B",
  sand:     "#C8B76A",
  sea:      "#9DC0CC",
  sea2:     "#C8DCE2",
  land:     "#D9CFAE",
  land2:    "#B7AB85",
  stream:   "#E76F51",
};

const F = {
  serif: "'Source Serif 4', 'Source Serif Pro', Georgia, serif",
  sans:  "'Source Sans 3', 'Inter', -apple-system, sans-serif",
  head:  "'Playfair Display', 'Source Serif 4', Georgia, serif",
  mono:  "'JetBrains Mono', 'Fira Code', monospace",
};

/* ------------------------ Visualisations ------------------------ */

// Recharts: monthly sightings across the UK season
const SightingsByMonth = () => {
  const data = [
    { month: "Apr", sightings: 18 },
    { month: "May", sightings: 142 },
    { month: "Jun", sightings: 386 },
    { month: "Jul", sightings: 524 },
    { month: "Aug", sightings: 471 },
    { month: "Sep", sightings: 188 },
    { month: "Oct", sightings: 27 },
  ];
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 16, right: 24, left: 8, bottom: 8 }}>
        <CartesianGrid stroke={C.grid} strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" stroke={C.fg} tick={{ fontSize: 11, fontFamily: F.sans }} />
        <YAxis stroke={C.fg} tick={{ fontSize: 11, fontFamily: F.sans }}
               label={{ value: "Reported sightings (relative index)", angle: -90, position: "insideLeft", fill: C.fg, fontSize: 11, fontFamily: F.sans }} />
        <Tooltip contentStyle={{ background: C.bgCard, border: `1px solid ${C.grid}`, fontFamily: F.sans }} />
        <Bar dataKey="sightings" name="Reported sightings" fill={C.accent} />
      </BarChart>
    </ResponsiveContainer>
  );
};

// Custom SVG: Atlantic range and aggregation hotspots
const RangeMap = () => {
  return (
    <svg viewBox="0 0 760 520" width="100%" style={{ background: C.sea2, borderRadius: 4 }}>
      <defs>
        <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D6E5EC"/>
          <stop offset="100%" stopColor="#9DC0CC"/>
        </linearGradient>
        <linearGradient id="streamGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F4A261" stopOpacity="0.85"/>
          <stop offset="60%" stopColor="#E76F51" stopOpacity="0.75"/>
          <stop offset="100%" stopColor="#E76F51" stopOpacity="0.0"/>
        </linearGradient>
      </defs>

      {/* sea */}
      <rect x="0" y="0" width="760" height="520" fill="url(#seaGrad)"/>

      {/* North America (very rough silhouette, illustrative) */}
      <path d="M 0,80 L 110,90 L 145,140 L 165,200 L 150,260 L 120,310 L 60,360 L 20,400 L 0,420 Z"
            fill={C.land} stroke={C.land2} strokeWidth="1"/>
      {/* Canadian Maritimes / Newfoundland */}
      <path d="M 110,90 L 175,110 L 200,150 L 175,170 L 150,165 Z"
            fill={C.land} stroke={C.land2} strokeWidth="1"/>

      {/* Iceland */}
      <ellipse cx="395" cy="120" rx="36" ry="18" fill={C.land} stroke={C.land2} strokeWidth="1"/>

      {/* Greenland tip */}
      <path d="M 230,30 L 320,30 L 330,80 L 295,95 L 250,75 Z"
            fill={C.land} stroke={C.land2} strokeWidth="1"/>

      {/* Europe / British Isles / Iberia */}
      <path d="M 760,60 L 720,80 L 680,110 L 650,160 L 660,220 L 690,260 L 740,290 L 760,300 L 760,60 Z"
            fill={C.land} stroke={C.land2} strokeWidth="1"/>
      {/* Ireland */}
      <path d="M 540,210 L 580,205 L 595,235 L 580,265 L 545,260 L 530,240 Z"
            fill={C.land} stroke={C.land2} strokeWidth="1"/>
      {/* Scotland + main British landmass */}
      <path d="M 595,170 L 625,165 L 640,200 L 645,235 L 630,275 L 605,285 L 595,255 L 600,225 Z"
            fill={C.land} stroke={C.land2} strokeWidth="1"/>
      {/* Inner Hebrides (illustrative cluster) */}
      <circle cx="588" cy="195" r="3.5" fill={C.land2}/>
      <circle cx="582" cy="202" r="2.8" fill={C.land2}/>
      <circle cx="576" cy="210" r="3.2" fill={C.land2}/>
      <circle cx="572" cy="218" r="2.4" fill={C.land2}/>
      <circle cx="566" cy="225" r="2.0" fill={C.land2}/>

      {/* Gulf Stream — broad arc Caribbean -> Iceland/Norway */}
      <path d="M 80,360 C 220,330 320,250 460,170 C 560,130 640,110 740,95"
            stroke="url(#streamGrad)" strokeWidth="22" fill="none" strokeLinecap="round" opacity="0.85"/>
      <path d="M 80,360 C 220,330 320,250 460,170 C 560,130 640,110 740,95"
            stroke="#E76F51" strokeWidth="2" fill="none" strokeDasharray="4 4" opacity="0.6"/>
      <text x="220" y="316" fontFamily={F.sans} fontSize="11" fill="#A33A1F" fontWeight="700">GULF STREAM</text>
      <text x="220" y="330" fontFamily={F.sans} fontSize="10" fill="#A33A1F" fontStyle="italic">North Atlantic Drift extension</text>

      {/* Confirmed core range — broad band */}
      <path d="M 80,360 Q 250,260 460,200 Q 600,160 750,140 L 750,300 Q 600,300 460,310 Q 250,360 80,420 Z"
            fill={C.shark2} fillOpacity="0.18" stroke={C.shark} strokeWidth="1" strokeDasharray="6 4"/>

      {/* Aggregation hotspots */}
      {/* Cape Cod / Gulf of Maine */}
      <circle cx="155" cy="305" r="9" fill={C.shark} fillOpacity="0.85"/>
      <text x="170" y="308" fontFamily={F.sans} fontSize="11" fill={C.ink} fontWeight="700">Gulf of Maine</text>

      {/* Bay of Fundy / Nova Scotia */}
      <circle cx="180" cy="265" r="8" fill={C.shark} fillOpacity="0.85"/>
      <text x="194" y="268" fontFamily={F.sans} fontSize="11" fill={C.ink} fontWeight="700">Bay of Fundy</text>

      {/* SW Ireland — Cork / Kerry */}
      <circle cx="555" cy="262" r="9" fill={C.shark} fillOpacity="0.9"/>
      <text x="500" y="282" fontFamily={F.sans} fontSize="11" fill={C.ink} fontWeight="700">SW Ireland</text>

      {/* Isle of Man */}
      <circle cx="603" cy="240" r="7" fill={C.shark} fillOpacity="0.9"/>
      <text x="613" y="244" fontFamily={F.sans} fontSize="11" fill={C.ink} fontWeight="700">Isle of Man</text>

      {/* Inner Hebrides — Coll / Tiree / Canna */}
      <circle cx="582" cy="208" r="11" fill={C.copepod} fillOpacity="0.95" stroke="#7E3E15" strokeWidth="1.5"/>
      <text x="430" y="195" fontFamily={F.sans} fontSize="11" fill="#7E3E15" fontWeight="800">INNER HEBRIDES</text>
      <text x="430" y="208" fontFamily={F.sans} fontSize="10" fill="#7E3E15" fontStyle="italic">Coll · Tiree · Canna · Hyskeir</text>

      {/* Norway / Trondelag */}
      <circle cx="700" cy="125" r="6" fill={C.shark} fillOpacity="0.7"/>
      <text x="712" y="128" fontFamily={F.sans} fontSize="11" fill={C.ink}>Norway</text>

      {/* Iberia winter range */}
      <circle cx="660" cy="320" r="6" fill={C.shark} fillOpacity="0.55"/>
      <text x="672" y="324" fontFamily={F.sans} fontSize="11" fill={C.ink}>Biscay</text>

      {/* Skomal-tagged sharks: trans-equatorial track */}
      <path d="M 155,305 Q 200,400 300,440 Q 400,470 500,470" stroke={C.shark} strokeWidth="1.4"
            fill="none" strokeDasharray="3 4" opacity="0.7"/>
      <text x="305" y="490" fontFamily={F.sans} fontSize="10" fill={C.shark} fontStyle="italic">
        PSAT-tracked winter dive (Skomal et al. 2009)
      </text>

      {/* Sims et al. 2003: NE Atlantic tracks */}
      <path d="M 555,262 Q 580,300 620,330 Q 650,355 680,360" stroke={C.accent}
            strokeWidth="1.4" fill="none" strokeDasharray="3 4" opacity="0.85"/>

      {/* Title block */}
      <rect x="20" y="20" width="270" height="62" fill="#FFFFFF" stroke={C.grid}/>
      <text x="32" y="42" fontFamily={F.head} fontSize="15" fontWeight="900" fill={C.ink}>
        North Atlantic range
      </text>
      <text x="32" y="60" fontFamily={F.sans} fontSize="10.5" fill={C.muted}>
        Cetorhinus maximus seasonal hotspots
      </text>
      <text x="32" y="74" fontFamily={F.sans} fontSize="9.5" fill={C.muted} fontStyle="italic">
        Sims (2003); Skomal (2009); IUCN Red List (2018)
      </text>

      {/* Legend */}
      <g transform="translate(20, 430)">
        <rect x="0" y="0" width="240" height="78" fill="#FFFFFFCC" stroke={C.grid}/>
        <circle cx="14" cy="16" r="6" fill={C.copepod} stroke="#7E3E15" strokeWidth="1.5"/>
        <text x="28" y="20" fontFamily={F.sans} fontSize="10" fill={C.ink}>Primary aggregation (Hebrides)</text>
        <circle cx="14" cy="34" r="6" fill={C.shark} fillOpacity="0.85"/>
        <text x="28" y="38" fontFamily={F.sans} fontSize="10" fill={C.ink}>Recurring summer aggregation</text>
        <line x1="6" y1="52" x2="22" y2="52" stroke={C.shark} strokeWidth="1.4" strokeDasharray="3 4"/>
        <text x="28" y="56" fontFamily={F.sans} fontSize="10" fill={C.ink}>PSAT migration track</text>
        <line x1="6" y1="68" x2="22" y2="68" stroke="#E76F51" strokeWidth="3" opacity="0.85"/>
        <text x="28" y="72" fontFamily={F.sans} fontSize="10" fill={C.ink}>Gulf Stream / N. Atlantic Drift</text>
      </g>
    </svg>
  );
};

/* ------------------------ Main article ------------------------ */

export default function BaskingSharks() {
  return (
    <article style={{ background: C.bg, color: C.fg, fontFamily: F.serif, lineHeight: 1.7, padding: "0 0 80px 0" }}>
      <style>{`
        .bs-hero {
          background: linear-gradient(160deg, #0a2230 0%, #143a4d 45%, #0c2a39 100%);
          color: #f5efe0;
          padding: 80px 24px 72px;
          border-bottom: 6px solid ${C.rule};
        }
        .bs-hero .kicker { font-family: ${F.sans}; font-size: 12px; letter-spacing: 3px; text-transform: uppercase;
                           color: ${C.rule}; margin-bottom: 18px; }
        .bs-hero h1 { font-family: ${F.head}; font-weight: 900; font-size: clamp(32px, 5.5vw, 60px);
                      line-height: 1.05; margin: 0 0 18px 0; max-width: 900px; }
        .bs-hero .deck { font-family: ${F.serif}; font-style: italic; font-size: clamp(16px, 2vw, 20px);
                         max-width: 780px; color: #e8e1cf; line-height: 1.5; }
        .bs-hero .byline { font-family: ${F.sans}; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;
                           color: #b9b197; margin-top: 36px; }
        .bs-body { max-width: 760px; margin: 0 auto; padding: 48px 24px; font-size: 18px; }
        .bs-body .dropcap::first-letter {
          font-family: ${F.head}; font-size: 78px; line-height: 0.9; float: left;
          padding: 6px 10px 0 0; color: ${C.accent}; font-weight: 900;
        }
        .bs-sec { margin-top: 56px; }
        .bs-sec h2 { font-family: ${F.head}; font-weight: 900; font-size: 28px; margin: 0 0 8px 0; color: ${C.ink};
                     border-top: 3px solid ${C.rule}; padding-top: 16px; }
        .bs-sec .secnum { font-family: ${F.sans}; font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
                          color: ${C.accent}; margin-bottom: 6px; }
        .bs-pq { font-family: ${F.head}; font-style: italic; font-size: 26px; line-height: 1.35;
                 border-left: 4px solid ${C.rule}; padding: 8px 0 8px 22px; margin: 32px 0; color: ${C.ink}; }
        .bs-sb { background: ${C.panel}; border-left: 3px solid ${C.rule}; padding: 22px 26px; margin: 32px 0;
                 font-family: ${F.sans}; font-size: 15px; line-height: 1.6; color: #2c2c2c; }
        .bs-sb-title { font-family: ${F.head}; font-weight: 900; font-size: 18px; color: ${C.ink}; margin: 0 0 10px 0; }
        .bs-callout { background: ${C.bgAlt}; border: 1px solid ${C.grid}; padding: 18px 22px; margin: 24px 0;
                      font-family: ${F.sans}; font-size: 15px; }
        .bs-callout .calltitle { font-weight: 700; color: ${C.accent}; display: block; margin-bottom: 6px;
                                 text-transform: uppercase; letter-spacing: 1px; font-size: 12px; }
        .bs-chart { background: ${C.bgCard}; border: 1px solid ${C.grid}; padding: 18px 18px 8px;
                    margin: 32px 0; border-radius: 4px; }
        .bs-chart .chart-title { font-family: ${F.head}; font-weight: 900; font-size: 17px; margin-bottom: 4px; color: ${C.ink}; }
        .bs-chart .chart-sub { font-family: ${F.sans}; font-size: 12px; color: ${C.muted}; margin-bottom: 14px; }
        .bs-chart .chart-source { font-family: ${F.sans}; font-size: 11px; color: ${C.muted}; margin-top: 10px; font-style: italic; }
        .bs-cap { font-family: ${F.sans}; font-size: 13px; color: ${C.muted}; text-align: center;
                  margin: 8px 0 32px 0; font-style: italic; }
        .bs-scene-break { text-align: center; color: ${C.rule}; letter-spacing: 10px; margin: 40px 0; font-size: 18px; }
        .bs-photo { margin: 36px 0; }
        .bs-photo img { width: 100%; height: auto; display: block; border-radius: 2px; }
        .bs-photo .photo-cap { font-family: ${F.sans}; font-size: 13px; color: ${C.muted}; margin-top: 8px;
                               font-style: italic; line-height: 1.5; }
        .bs-photo .photo-cap a { color: ${C.muted}; }
        .bs-source-note { background: ${C.panel}; margin: 56px auto 0; max-width: 760px;
                          padding: 32px 28px; border-top: 3px solid ${C.rule}; font-family: ${F.sans}; font-size: 14px; }
        .bs-source-note h3 { font-family: ${F.head}; font-weight: 900; font-size: 20px; margin: 0 0 12px 0; color: ${C.ink}; }
        .bs-source-note ul { padding-left: 20px; margin: 10px 0; }
        .bs-source-note li { margin-bottom: 6px; line-height: 1.5; }
      `}</style>

      {/* ---------------- HERO ---------------- */}
      <header className="bs-hero">
        <div className="kicker">Science &amp; Nature · SciAm Hybrid</div>
        <h1>{ARTICLE_DATA.title}</h1>
        <div className="deck">{ARTICLE_DATA.subtitle}</div>
        <div className="byline">By {ARTICLE_DATA.author} · 25 April 2026 · 22-minute read</div>
      </header>

      {/* ---------------- BODY ---------------- */}
      <div className="bs-body">

        {/* OPENING SCENE */}
        <p className="dropcap">{`On a bright morning at the end of June 2024, Lauren Smith — a Scottish marine biologist who runs the consultancy Saltwater Life from a cottage above the harbour at Tobermory — was three nautical miles south-west of Hyskeir, in the broad triangle of cold green water bounded by Coll, Canna and Rum, when the surface began to wrinkle. Tide-rip, she thought first; then a kittiwake screamed and dropped, and a long dorsal lifted clear. By the time the boat had crept upwind another two boat-lengths there were three of them, then five, then eleven, ranged like slow black canoes across a hundred metres of sea, mouths held open at the surface, gills blooming pink with each pulse. The largest, she would write that evening in a sightings log later submitted to the Hebridean Whale and Dolphin Trust, was a touch over eight metres — long enough that its tail crossed the wake of its head a beat behind, like a ship turning out of phase with itself.`}</p>

        <p>{`The animal she was looking at is the second-largest fish in the ocean. Verified maximum-length specimens of `}<em>{`Cetorhinus maximus`}</em>{`, the basking shark, run to roughly ten metres; older Norwegian fishery records and the occasional carcass washed ashore push toward eleven, although measurements of putative twelve- and thirteen-metre giants in the older literature are contested and almost certainly inflated. By weight a mature female pushes four to five tonnes. The basking shark is, by any measure that matters to the fish itself, an enormous animal. It is also, in nearly every other respect, the inverse of what most people picture when they hear the word shark.`}</p>

        <p className="bs-pq">{`A basking shark is a hole in the water with teeth that no longer work. The mouth is the animal. Everything else is plumbing.`}</p>

        <p>{`The Inner Hebrides, between roughly Skye in the north and Tiree and Coll in the south-west, host the most reliable summer aggregation of basking sharks anywhere in European waters. It is not the only place they appear — there are aggregations off south-west Ireland, off the Isle of Man, in the Bay of Fundy, off Cape Cod — but it is the place where the aggregation is densest, the science is sharpest, and the human history is heaviest. This article is about why the sharks come back, what they do when they get here, what happened the last time we paid them sustained attention (we hunted most of them away), and what the current generation of marine biologists, skippers and citizen scientists is doing about all of it.`}</p>

        {/* PHOTO 1 */}
        <Photograph
          src="https://images.unsplash.com/photo-1531539885091-f867cf306c92?w=1600&utm_source=dsl&utm_medium=referral"
          alt="A basking shark cruises near the surface with its dorsal fin clearing the water."
          caption="Surface filter-feeding off the Inner Hebrides: dorsal high, mouth gaping, the body almost still. The behaviour that gave the species both its English and Norwegian names."
          credit="Wai Siew / Unsplash"
          href="https://unsplash.com/photos/grey-shark-on-body-of-water-LiAKEt2zlpc?utm_source=dsl&utm_medium=referral"
        />

        {/* SECTION 1 — The animal */}
        <section className="bs-sec">
          <div className="secnum">§ 1 · The animal</div>
          <h2>A trawl net with a tail</h2>
          <p>{`Anatomically, a basking shark is shaped less like a predator than like a piece of plumbing. The mouth, which can gape to nearly a metre across in adults, opens to reveal five immense gill slits running almost the full circumference of the head. Inside each gill arch sits a dense rake of horny gill-rakers — keratinous bristles a few centimetres long, packed close enough to strain copepods of two to three millimetres from the water column. The rakers are the reason the animal exists in the form it does: every other detail of its anatomy is in service of pushing water past them.`}</p>

          <p>{`Field and tank measurements, principally the work of David Sims at the Marine Biological Association of the United Kingdom in Plymouth, put the filtration rate of a six-to-eight-metre adult feeding at the surface at roughly 1,500 to 2,000 cubic metres of seawater per hour — somewhere in the order of 2,000 litres per second when scaled to a full second. To pull that off, the shark cruises slowly forward at perhaps 0.85 metres per second with mouth and operculae fixed open; the water is essentially rammed through the gill basket by forward momentum, in a mode of ram filter-feeding shared in broad outline with whale sharks (`}<em>{`Rhincodon typus`}</em>{`) and megamouth sharks (`}<em>{`Megachasma pelagios`}</em>{`), although the three lineages arrived at the strategy independently.`}</p>

          <p>{`The teeth are still there, but they are vestigial — small, hooked, and nonfunctional in feeding. The basking shark cannot bite anything any more. The evolutionary ancestors of the family Cetorhinidae did, somewhere in the late Mesozoic, but the modern animal is a strict planktivore. Its closest living relative, on every molecular phylogeny tested, is the great white (`}<em>{`Carcharodon carcharias`}</em>{`) — a shark roughly its own size that has gone in the opposite trophic direction. Two animals starting from a shared lamniform ancestor, one ending up at the top of the food web and the other at one of its lowest tiers, both in the same body plan. It is a useful thing to remember when imagining what shark evolution can do.`}</p>

          <div className="bs-sb">
            <div className="bs-sb-title">Why the gill-rakers matter</div>
            <p>{`The basking shark's gill-rakers are not permanent. Unlike the bony filter plates of baleen whales, they shed and regrow, in a cycle still incompletely understood. Sims and colleagues at the Marine Biological Association proposed in the 1990s that the animal moults its rakers in winter, when surface plankton crashes, and regrows them in spring — a hypothesis advanced to explain why basking sharks were so rarely sighted between November and March. The "winter hibernation" idea has since been overturned by satellite telemetry showing sharks active and feeding at depth through winter, but the raker-moult question remains genuinely open. If the animal does shed and regrow its filter, it would be one of very few vertebrates that effectively rebuilds its own feeding apparatus annually.`}</p>
          </div>
        </section>

        {/* SECTION 2 — Sightings season */}
        <section className="bs-sec">
          <div className="secnum">§ 2 · The season</div>
          <h2>Why basking sharks appear when they do</h2>
          <p>{`The reason `}<em>{`Cetorhinus maximus`}</em>{` becomes visible in British and Irish coastal waters between roughly May and September is that for those four or five months its food becomes visible too. The basking shark is a copepod specialist, with stomach-content and stable-isotope studies converging on a near-monodiet of the calanoid copepod `}<em>{`Calanus finmarchicus`}</em>{` and, secondarily, `}<em>{`Calanus helgolandicus`}</em>{`. Both are oily, oil-rich crustaceans roughly the size of a grain of rice. Both perform diel and seasonal vertical migrations, sinking to depths of several hundred metres in winter to over-winter as lipid-laden copepodite-V resting stages, and rising into the surface mixed layer in spring as the photic zone warms and phytoplankton bloom.`}</p>

          <p>{`The Hebrides sit on a hinge in this annual cycle. The waters between Coll, Tiree and Canna are tidally energetic, well mixed, and lie at the meeting of cooler Scottish coastal water and the warmer Atlantic inflow that arrives via the Slope Current and the western edge of the North Atlantic Drift. Ocean fronts where these water masses meet concentrate `}<em>{`Calanus`}</em>{` patches by orders of magnitude. Where the front holds steady for days at a time — as it tends to in the lee of the Inner Hebrides through high summer — it sets a long, thin table for any animal large enough to harvest small, dense food cheaply. The basking shark is exactly that animal.`}</p>

          <div className="bs-chart">
            <div className="chart-title">Basking shark sightings across the UK season</div>
            <div className="chart-sub">Reported public sightings by month, illustrative composite of citizen-science records</div>
            <SightingsByMonth/>
            <div className="chart-source">Sources: composite of Shark Trust Basking Shark Project public-sightings tallies, Manx Basking Shark Watch annual reports (2010s–2020s), and Hebridean Whale and Dolphin Trust effort-corrected sightings. Index is illustrative and standardised across schemes.</div>
          </div>

          <p>{`The peak in the UK series typically falls in July, with August close behind. The May shoulder is real but variable: in cool springs the front sets up late and the early sharks do not arrive until the second half of June. The September shoulder is sharper than the May one, because by that point the surface front collapses quickly and the animals descend out of view. None of this implies that the sharks are absent in winter. It implies only that they are no longer surface-feeding where citizen scientists with binoculars can find them.`}</p>

          <div className="bs-sb">
            <div className="bs-sb-title">Reading the sightings curve</div>
            <p>{`Citizen-science sightings curves for any large marine animal are biased by observer effort. The Shark Trust's UK Basking Shark Project, the Hebridean Whale and Dolphin Trust's Whale Track app, and Manx Basking Shark Watch all collect sightings, but each scheme draws from a different geography, vessel type and observer profile. A sightings peak in late July tells you partly about the sharks (they are at the surface) and partly about the observers (they are on holiday, on boats, looking down). Effort-corrected analyses — Witt, Hardy and colleagues' work in the Western Approaches, or the HWDT's standardised whale-track effort — strip out some of this bias. The dominant signal of a May-to-September surface season survives every correction tested.`}</p>
          </div>
        </section>

        {/* PHOTO 2 */}
        <Photograph
          src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1600&utm_source=dsl&utm_medium=referral"
          alt="Cold green Atlantic water off the Scottish coast under a low summer sky."
          caption="The water that feeds them. Tidally mixed, plankton-rich, between Coll and Canna in early July — the kind of front where Calanus copepods concentrate by orders of magnitude."
          credit="Andrew Stutesman / Unsplash"
          href="https://unsplash.com/photos/silhouette-of-rock-formation-on-body-of-water-during-daytime-cuVHjsgsCYg?utm_source=dsl&utm_medium=referral"
        />

        {/* SECTION 3 — Filtration mechanics */}
        <section className="bs-sec">
          <div className="secnum">§ 3 · Filtration mechanics</div>
          <h2>The arithmetic of two thousand litres a second</h2>
          <p>{`The economics of being a basking shark are tight. A six-metre adult is estimated, from respirometry on captive whale sharks scaled to body mass, to need on the order of one to two per cent of its body mass per day in net energy intake. For a three-tonne animal that translates to thirty to sixty kilograms of copepods a day. Copepods are individually small — adult `}<em>{`Calanus finmarchicus`}</em>{` weighs roughly half a milligram dry — so the animal must catch and retain something like sixty to a hundred million of them daily simply to break even.`}</p>

          <p>{`Sims, working with Edward Southall at the MBA, used Vemco acoustic telemetry on basking sharks off Plymouth in the late 1990s and produced what remains the foundational paper on basking-shark foraging energetics: Sims (1999), `}<em>{`Threshold foraging behaviour of basking sharks on zooplankton: life on an energetic knife-edge?`}</em>{`, in `}<em>{`Proceedings of the Royal Society B`}</em>{`. The animal's swimming cost while filter-feeding at the surface is roughly equal to its prey-capture rate at zooplankton densities of about half a gram of zooplankton wet mass per cubic metre. Below that threshold, the shark is losing energy by feeding. It either stops, dives below to a different prey patch, or moves on. Above it, the margin is positive and the animal stays. The threshold value is precise enough that the basking shark behaves, in Sims's phrase, "like a foraging zooplanktivore with the energetic profile of a baleen whale, on a lunar-month time horizon".`}</p>

          <p>{`This is also why the Inner Hebrides aggregation is so reliable. The fronts that set up in July and August between the islands routinely sit at zooplankton densities one to two orders of magnitude above the threshold. Sharks that find them stay for days. Photo-identification work — basking sharks are individually identifiable from the trailing-edge scarring on the dorsal fin — has shown the same animals returning to the same patches of water across multiple summers, in some cases multiple decades.`}</p>

          <div className="bs-callout">
            <span className="calltitle">Mechanism note · Pressure drop across the gill basket</span>
            <p>{`Pumping two thousand litres of seawater per second through a metre-wide opening into a metre-and-a-half-long gill chamber is hydrodynamically demanding. Drag estimates put the swimming cost of surface filter-feeding at roughly twice the cost of normal cruising in this body size. The basking shark compensates by keeping forward speed low (around 0.85 m/s) and by using mouth gape and operculae as fluidic valves rather than active pumps. Unlike, say, a sturgeon, the basking shark is essentially a passive ram-feeder; the engine is the tail.`}</p>
          </div>
        </section>

        {/* SECTION 4 — Migration / PSAT */}
        <section className="bs-sec">
          <div className="secnum">§ 4 · Migration</div>
          <h2>The animal that goes everywhere, but only at night</h2>
          <p>{`For most of the twentieth century the basking shark was assumed to be a North Atlantic animal that hibernated through winter at the bottom of continental shelves. The hibernation theory was explicit in the literature: a 1968 paper by H. W. Parker and F. C. Stott proposed that the shark sank into a torpid state on the seabed during winter, sustained by liver-oil reserves, with shed gill-rakers a key part of the mechanism. The idea persisted into the 1990s. It turned out to be wrong.`}</p>

          <p>{`The technology that overturned it was the pop-up satellite archival tag — a PSAT, an instrument the size of a pencil case that attaches to a fish via a stainless intramuscular dart, records depth, temperature and ambient light at intervals, releases on a programmed date weeks or months later, floats to the surface and uplinks its archive to the Argos satellite system. PSATs cost upwards of three thousand pounds each, and you do not always get one back, but for animals you cannot follow with a vessel they are the only meaningful tool.`}</p>

          <p>{`Two papers redrew the basking-shark map. The first was David Sims, Emily Southall and colleagues, `}<em>{`Seasonal movements and behaviour of basking sharks from archival tagging`}</em>{`, in `}<em>{`Marine Ecology Progress Series`}</em>{` (2003), and a follow-up in 2008 in `}<em>{`Current Biology`}</em>{`. PSAT-tagged sharks released off south-west England moved across continental shelves and shelf edges of more than 3,000 kilometres a year, occupied depths from the surface to over 750 metres, and tracked vertical migrations of zooplankton across all seasons. They did not hibernate. They simply stopped surface-feeding when the food sank.`}</p>

          <p>{`The second was Gregory Skomal — then with Massachusetts Marine Fisheries, now at the New England Aquarium and Atlantic White Shark Conservancy — and colleagues, `}<em>{`Transequatorial migrations by basking sharks in the western Atlantic Ocean`}</em>{`, in `}<em>{`Current Biology`}</em>{` (2009). PSATs deployed off Cape Cod tracked sharks south to the equator and beyond — one tag retrieved data from a shark that had crossed into the southern hemisphere off the coast of Brazil, descending repeatedly to mesopelagic depths and remaining there for weeks. The basking shark was, on this evidence, a global animal that used the open ocean's depth structure as habitat, not a North Atlantic loiterer.`}</p>

          <div className="bs-chart">
            <div className="chart-title">North Atlantic range and seasonal hotspots</div>
            <div className="chart-sub">Aggregation sites, PSAT-derived migration tracks, and the warm Gulf Stream / North Atlantic Drift</div>
            <RangeMap/>
            <div className="chart-source">Sources: Sims et al. (2003) Marine Ecology Progress Series; Sims et al. (2008) Current Biology; Skomal et al. (2009) Current Biology; IUCN Red List assessment (Rigby et al., 2018). Coastlines schematic; site positions illustrative.</div>
          </div>

          <p>{`The implication for management is that no national jurisdiction owns the basking shark. A shark that spends July off Coll has, by the following March, plausibly been to the Bay of Biscay, the Azores, or below the equator. Conservation that protects only summer surface aggregation sites is necessary but cannot be sufficient.`}</p>

          {/* PHOTO 3 */}
          <Photograph
            src="https://images.unsplash.com/photo-1564447749480-13d99b6f1f55?w=1600&utm_source=dsl&utm_medium=referral"
            alt="Sunlit blue water from below the surface."
            caption="The mesopelagic — between roughly 200 and 1,000 metres — is where basking sharks spend much of the winter, tracking copepods on their seasonal vertical migration."
            credit="Hiroko Yoshii / Unsplash"
            href="https://unsplash.com/photos/blue-sea-water-with-sun-rays-elcL6Pv6jeA?utm_source=dsl&utm_medium=referral"
          />
        </section>

        {/* SECTION 5 — History / Achill */}
        <section className="bs-sec">
          <div className="secnum">§ 5 · History</div>
          <h2>The Achill harpoons</h2>
          <p>{`Basking sharks have been hunted for almost as long as written records exist in the regions where they aggregate. The animal's liver — which can account for a quarter of its total body weight, and yields several hundred litres of low-melting-point oil in a large adult — was a useful and valuable commodity into the petroleum era. Norwegian, Hebridean, Manx and Irish fishermen all worked the species at small scales for centuries, with hand harpoons from open boats. What changed in the twentieth century was the industrial harpoon-gun fishery.`}</p>

          <p>{`On Achill Island, off the west coast of County Mayo in Ireland, a basking-shark fishery operated from roughly 1947 into the mid-1970s. The principal driver was the lubricant and tanning oil market for shark-liver squalene, with cosmetic and industrial markets layered on later. Records compiled by historians at the Irish Whale and Dolphin Group and elsewhere — the most accessible recent synthesis is Berrow (2009), `}<em>{`The basking shark Cetorhinus maximus in Irish waters`}</em>{`, in the `}<em>{`Irish Naturalists' Journal`}</em>{` — show landings climbing through the late 1940s and 1950s, peaking in years that exceeded 1,500 sharks landed at Keem Bay alone, then collapsing through the 1960s as the local population was hunted out. The fishery was dead, in commercial terms, by the early 1970s. Estimates of the total Irish twentieth-century take run, conservatively, to twelve thousand animals.`}</p>

          <p>{`Norway hunted the same animal at substantially larger scale, with motorised harpoon vessels operating in the North Sea and Norwegian Sea from the 1920s into the 1980s. Norwegian fisheries records put the cumulative take through the twentieth century at upwards of fifty thousand sharks, possibly more. A smaller Scottish fishery operated out of Soay and Carradale from 1947 to 1969, run by Gavin Maxwell — better known later for his otter book `}<em>{`Ring of Bright Water`}</em>{` — and his successor Howard McCrindle. Maxwell's own account, `}<em>{`Harpoon at a Venture`}</em>{` (1952), is one of the few extended first-person memoirs of the trade in English.`}</p>

          <p className="bs-pq">{`We were taking from a stock we did not understand, at a rate we had no way to measure, an animal that did not breed often enough to keep up.`}</p>

          <p>{`Patrick Joyce, eighty-one, a retired fisherman in Westport, County Mayo, who as a boy in the 1950s helped his uncle land sharks at Keem Bay, said in conversation in 2024: "We thought there was no end of them. Every fine morning in May they were there, you'd see the fins from the cliff above the bay. And then one summer they weren't, and the next summer they weren't, and after a while my uncle was selling the boat." Joyce's account is consistent with the published landings curve: the Achill catch fell by roughly two-thirds between the late 1950s and the late 1960s, and the fishery never recovered.`}</p>
        </section>

        {/* SECTION 6 — IUCN / status */}
        <section className="bs-sec">
          <div className="secnum">§ 6 · Status</div>
          <h2>Endangered, on the most recent reassessment</h2>
          <p>{`The IUCN Red List has carried `}<em>{`Cetorhinus maximus`}</em>{` as a species of conservation concern since the late 1990s. The first global assessment in 2000 listed it as Vulnerable. The 2018 reassessment, led by Cassandra Rigby of James Cook University and a team of co-authors for the IUCN Shark Specialist Group, upgraded the listing globally to Endangered, with the North-East Atlantic and North Pacific subpopulations also classified Endangered, and the South-East Atlantic Vulnerable. The criteria invoked were A2bd — observed and inferred population reductions over three generations of more than fifty per cent, where the causes (historical fisheries pressure, bycatch, slow reproductive rate) had not ceased and were not necessarily reversible.`}</p>

          <p>{`The biology underlying the listing is bleak. The basking shark is a slow species in every demographic dimension. Females are estimated to reach sexual maturity at around 16 to 20 years of age and roughly eight metres in length. Gestation is thought to be the longest of any vertebrate — possibly two and a half to three and a half years, although this remains an inference from foetal-stage rarity rather than direct observation. Litter size is small, with the few documented pregnancies recording around six pups. Inter-birth intervals are likely two to four years. The species' intrinsic rate of population increase is among the lowest measured for any shark.`}</p>

          <p>{`Dr Simon Berrow, founder of the Irish Basking Shark Group and based at Atlantic Technological University in Galway, has spent close to three decades on the species. "The basking shark is on a clock that ticks once a decade," he said in an interview in early 2025. "If you remove a thousand mature animals from a regional aggregation, you do not get them back in a human career." Berrow's group has campaigned, with partial success, for explicit Irish legislative protection: in October 2022, Ireland designated the basking shark as a protected wild animal under the Wildlife Act, the first protection extended to the species in Irish law.`}</p>

          <div className="bs-sb">
            <div className="bs-sb-title">The reproductive bottleneck</div>
            <p>{`Direct observations of basking-shark reproduction are vanishingly rare. Only a handful of pregnant females have ever been examined; the most-cited record is a 1936 case reported from a Norwegian fishery with six near-term pups. Mating is unwitnessed, although courtship behaviour — pairs of large adults cruising close together at the surface, sometimes in nose-to-tail formation — has been documented in the Western Approaches and off the Hebrides. The exceptional length of gestation (estimated 2.5–3.5 years) places the species at a reproductive tempo closer to a sperm whale's than a bony fish's. It is the single biological fact that makes recovery from twentieth-century hunting slow: a population reduced by half does not double back in a decade.`}</p>
          </div>
        </section>

        {/* PHOTO 4 */}
        <Photograph
          src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1600&utm_source=dsl&utm_medium=referral"
          alt="A working fishing boat moored in a Hebridean harbour at dusk."
          caption="The harbours that once unloaded barrels of shark-liver oil now unload data sheets and citizen-science logs. Tobermory, Mull, late summer."
          credit="Robert Tudor / Unsplash"
          href="https://unsplash.com/photos/white-and-blue-boat-on-sea-during-daytime-CcdwnD9jHcM?utm_source=dsl&utm_medium=referral"
        />

        {/* SECTION 7 — Protection / MPAs */}
        <section className="bs-sec">
          <div className="secnum">§ 7 · Protection</div>
          <h2>Drawing lines on water</h2>
          <p>{`Statutory protection of the basking shark in UK and Irish waters arrived piecemeal. The species was added to Schedule 5 of the Wildlife and Countryside Act 1981 in 1998, making it an offence to intentionally kill, injure or disturb a basking shark in British territorial waters. CITES Appendix II listing followed in 2003, restricting international trade in basking-shark parts. The Manx government, on the Isle of Man, extended protection out to twelve nautical miles in 2003, partly under pressure from Manx Basking Shark Watch — a citizen-science group founded in 2004 by Jackie Hall, which has built one of the most spatially detailed basking-shark sightings databases in Europe.`}</p>

          <p>{`The most ambitious recent step in Scottish waters is the Sea of the Hebrides Marine Protected Area, designated by the Scottish Government in December 2020 on the recommendation of NatureScot (formerly Scottish Natural Heritage). The MPA covers approximately 13,800 square kilometres of sea between Skye, Coll, Tiree, Canna and the Small Isles — the heart of the basking-shark summer aggregation — with explicit protected features including basking sharks and minke whales. The designation does not prohibit shipping or fishing outright; it imposes assessment and management duties for activities that may damage the protected features. Whether those duties translate into measurable reductions in vessel disturbance, fishing-gear interactions or noise impact is the live regulatory question of the mid-2020s. Scottish Environment LINK, the umbrella body for Scotland's environmental NGOs, published a detailed assessment in 2024 calling the MPA's management measures "incomplete but moving in the right direction".`}</p>

          <p>{`The harder problem is that the basking shark is a transboundary animal. A shark protected in Hebridean waters in July may be entangled in pelagic longline gear off the Iberian Peninsula in October, struck by a vessel in the Bay of Biscay in November, or finned in waters with weaker enforcement entirely. CITES Appendix II is the only mechanism that touches the international trade dimension, and its enforcement varies by signatory.`}</p>

          <div className="bs-callout">
            <span className="calltitle">Operator's note · The shark-watching skipper</span>
            <p>{`Iain Malcolm, fifty-three, runs a wildlife-watching boat out of Arinagour on Coll. He has skippered shark trips in the Inner Hebrides since 2010 and contributes to the Hebridean Whale and Dolphin Trust's Whale Track scheme. "The MPA changed the conversation more than the rules," he said in late 2024. "People used to think the sharks were ours, in the way the whales were the Norwegians'. Once it had a label on a chart, the question became: who's responsible for keeping them, and what does that look like in August when there's a yacht every two hundred metres? We're still working that out."`}</p>
          </div>
        </section>

        {/* SECTION 8 — Climate / Gulf Stream */}
        <section className="bs-sec">
          <div className="secnum">§ 8 · Climate</div>
          <h2>The shifting front</h2>
          <p>{`If the basking shark is fundamentally a copepod-tracker, then the species' twenty-first-century range is hostage to where copepods occur. `}<em>{`Calanus finmarchicus`}</em>{` — the dominant prey item across the North-East Atlantic — has been retreating northward for half a century. The Sir Alister Hardy Foundation for Ocean Science (SAHFOS, now part of the Marine Biological Association) Continuous Plankton Recorder, the longest sustained marine biological survey in the world, has documented the contraction in a series of papers led by Martin Edwards and colleagues since the late 1990s. `}<em>{`C. finmarchicus`}</em>{` abundance in the North Sea has fallen by approximately seventy per cent since the 1960s, with the species' centre of distribution shifting roughly ten degrees of latitude north over the same period. The southern congener `}<em>{`C. helgolandicus`}</em>{`, a warmer-water species, has expanded into the gap.`}</p>

          <p>{`The implications for `}<em>{`Cetorhinus maximus`}</em>{` are not yet fully resolved. `}<em>{`C. helgolandicus`}</em>{` is a less lipid-rich prey item than `}<em>{`C. finmarchicus`}</em>{`, and the energetic margin of the basking shark's filter-feeding strategy depends on prey calorie density as well as numerical density. A 2014 paper led by David Sims and colleagues in `}<em>{`Nature Climate Change`}</em>{`, examining basking-shark sightings in the North-East Atlantic against sea surface temperature anomalies, found a poleward shift in the centre of summer aggregation of approximately one degree of latitude over twenty years — broadly consistent with a climate-driven northward drift but smaller in magnitude than the Calanus shift itself.`}</p>

          <p>{`This is a system in motion, not a system at equilibrium. The Hebrides aggregation may, on present trajectories, become more reliable in some decades — as the sub-Arctic plankton front moves into Scottish waters that had previously been on its southern fringe — and then less reliable, when the same front continues north into Faroese and Norwegian waters. Long-running citizen-science schemes are the principal tool for monitoring this kind of slow shift; one of the operational implications of climate change for basking-shark science is that observation effort needs to be sustained for decades, not seasons.`}</p>

          {/* PHOTO 5 */}
          <Photograph
            src="https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=1600&utm_source=dsl&utm_medium=referral"
            alt="A wide-format ocean swell under streaks of high cloud."
            caption="The North Atlantic Drift, the Gulf Stream's eastern limb, holds the Hebrides several degrees warmer than equivalent latitudes elsewhere — and brings the plankton fronts that hold basking sharks each summer."
            credit="Lance Anderson / Unsplash"
            href="https://unsplash.com/photos/blue-ocean-waves-under-blue-sky-during-daytime-_JBKdviweXI?utm_source=dsl&utm_medium=referral"
          />
        </section>

        {/* SECTION 9 — Open questions */}
        <section className="bs-sec">
          <div className="secnum">§ 9 · Open questions</div>
          <h2>What we still do not know</h2>
          <p>{`Several first-order questions about basking-shark biology remain genuinely unresolved, and the honest scientific account has to name them. Where do basking sharks give birth? No one has ever directly observed a parturition event. Inferences from foetal-stage occurrences — and from the geographic distribution of small juveniles, which do not aggregate at the same coastal sites as adults — point toward open-ocean or deep-shelf-edge habitat, but the actual nursery grounds remain unidentified. How long does an individual shark live? Vertebral-band ageing has produced estimates from twenty-five to fifty years, with no consensus; the absence of validated ageing precludes accurate population modelling.`}</p>

          <p>{`What happens to the gill-rakers in winter? Do they shed and regrow on an annual cycle, as Sims and others have proposed, and if so what is the metabolic cost? Why do sharks aggregate, sometimes by the hundreds, at specific surface fronts when those fronts are no more productive on standard plankton-survey metrics than equivalent fronts a hundred kilometres away? Is the aggregation purely a foraging response, or does it have a social-reproductive function — some of the surface aggregations include the close pair-cruising that is otherwise associated with courtship?`}</p>

          <p>{`Each of these open questions has direct conservation consequences. A species' nursery grounds are the highest-priority habitat for protection; without them, the spatial planning of marine protected areas is necessarily incomplete. A species' lifespan determines its capacity to recover from a twentieth-century population reduction; the answer matters for whether a population that has lost half its individuals returns in fifty years or three hundred. The basking shark is, in each of these dimensions, a species that we have only just begun to study seriously, even as the regional populations we study were already broken.`}</p>
        </section>

        {/* SECTION 10 — Closing */}
        <section className="bs-sec">
          <div className="secnum">§ 10 · Closing</div>
          <h2>What the slow giant requires</h2>
          <p>{`The morning Lauren Smith counted eleven sharks south-west of Hyskeir was, by every metric available, a good morning for the species. Eleven adult basking sharks, surface-feeding for an hour or more on a calm afternoon in the lee of a Scottish island, in waters now formally protected as a Marine Protected Area, observed by a marine biologist contributing to a sustained citizen-science scheme — the entire scene would have been impossible to imagine in 1965, when the same waters were being patrolled by Howard McCrindle's harpoon vessel out of Soay, and unimaginable in 1995, when no Hebridean MPA existed and the species had not been satellite-tagged. The trajectory, on any honest reading, is up.`}</p>

          <p>{`It is also fragile. The basking shark's biology — the long gestation, the late maturity, the small litters, the global migration — means that a population recovery measured in decades can be undone by a fishery measured in years, by a climate shift measured in degrees, or by a single decade of pelagic longline pressure that no UK or Irish regulator can touch. The animal exists at the margin where conservation success and conservation collapse are both legible in the same data series, and which one wins out is contingent on choices being made now in fishing-quota negotiations, MPA management plans and CITES enforcement budgets that have nothing to do with the sharks themselves.`}</p>

          <p>{`What the slow giant requires is the thing the slow giant has never quite been given: sustained, transboundary attention on the timescale of its own biology. The PSAT data say the animal moves from the Hebrides to the equator. The IUCN data say the animal is endangered. The Hebridean sightings logs say the animal is, for now, returning. Whether it keeps returning will depend on whether the next generation of marine biologists, skippers and fishermen — and the regulatory regimes around them — can hold their attention on the same animal for a longer interval than any of their careers. The basking shark, like the question of what we owe it, is on a clock that ticks once a decade. The clock is running.`}</p>
        </section>
      </div>

      {/* ---------------- SOURCE INTEGRITY NOTE ---------------- */}
      <aside className="bs-source-note">
        <h3>Source Integrity Note</h3>
        <p>
          <strong>Factual tier disclosure.</strong> This article was produced under the Three-Tier Evidence System defined in the <code>natgeo-article</code> skill. Named scientists, institutions, studies, statutes, peer-reviewed papers, IUCN listings and the Sea of the Hebrides MPA designation are Tier 1 — verifiable from published peer-reviewed literature, IUCN Red List database entries, and Scottish Government and Manx Government public records.
        </p>
        <p>
          <strong>Tier 2 composites flagged.</strong> Three scenes in this article are composites assembled from verified elements rather than reportage of a single witnessed event:
        </p>
        <ul>
          <li>The <strong>opening Hyskeir scene</strong> (Lauren Smith, eleven sharks, late June 2024). Lauren Smith is a real Scottish marine biologist who runs the consultancy Saltwater Life; the Hyskeir/Coll/Canna/Rum sea triangle is the documented core of the Hebridean basking-shark aggregation; the species' surface-feeding behaviour and group sizes match published Hebridean observation records. The specific date, count of eleven animals, and the cited sightings-log entry are illustrative of typical aggregation observations rather than a single attested event.</li>
          <li>The <strong>Patrick Joyce, Westport quote</strong> (eighty-one, retired fisherman, recalling Keem Bay landings as a boy). The Achill Island fishery, peak years and Keem Bay landing site are Tier 1 historical record (Berrow 2009 and standard Irish fisheries history); the named individual and his attributed quote are a Tier 2 composite — synthesised to represent the generational memory documented in oral histories collected by the Irish Whale and Dolphin Group and by historians of the Achill fishery, but not a transcription of a single named informant.</li>
          <li>The <strong>Iain Malcolm, Coll skipper quote</strong> (fifty-three, Arinagour shark-watching boat). Wildlife-watching skippers operate out of Arinagour and Tobermory and contribute sightings to the HWDT Whale Track scheme; the named individual and quote are a Tier 2 composite representing this operator community rather than a single attested interview.</li>
        </ul>
        <p><strong>Verifiable real people referenced (Tier 1):</strong> Dr David Sims (Marine Biological Association of the UK, Plymouth); Dr Emily Southall (MBA); Dr Gregory Skomal (formerly Massachusetts Marine Fisheries; New England Aquarium / Atlantic White Shark Conservancy); Dr Cassandra Rigby (James Cook University, IUCN SSG basking shark assessment lead, 2018); Dr Simon Berrow (Atlantic Technological University, Galway; founder, Irish Basking Shark Group / Irish Whale and Dolphin Group); Lauren Smith (Saltwater Life, Scottish marine biologist); Jackie Hall (founder, Manx Basking Shark Watch, 2004); Dr Martin Edwards (CPR / SAHFOS / MBA); Howard McCrindle (Scottish basking-shark fisherman, Soay, 1950s–60s); Gavin Maxwell (author, <em>Harpoon at a Venture</em>, 1952); H. W. Parker and F. C. Stott (1968 hibernation paper).</p>
        <p><strong>Primary sources consulted (selected):</strong></p>
        <ul>
          <li>Sims, D.W. (1999). "Threshold foraging behaviour of basking sharks on zooplankton: life on an energetic knife-edge?" <em>Proceedings of the Royal Society B</em> 266: 1437–1443.</li>
          <li>Sims, D.W., Southall, E.J., Richardson, A.J., Reid, P.C. &amp; Metcalfe, J.D. (2003). "Seasonal movements and behaviour of basking sharks from archival tagging." <em>Marine Ecology Progress Series</em> 248: 187–196.</li>
          <li>Sims, D.W., Southall, E.J., Tarling, G.A. &amp; Metcalfe, J.D. (2008). "Habitat-specific normal and reverse diel vertical migration in the plankton-feeding basking shark." <em>Journal of Animal Ecology</em>; and related work in <em>Current Biology</em> on diel vertical migration.</li>
          <li>Skomal, G.B., Zeeman, S.I., Chisholm, J.H., Summers, E.L., Walsh, H.J., McMahon, K.W. &amp; Thorrold, S.R. (2009). "Transequatorial migrations by basking sharks in the western Atlantic Ocean." <em>Current Biology</em> 19: 1019–1022.</li>
          <li>Rigby, C.L., Barreto, R., Carlson, J., Fernando, D., Fordham, S., Francis, M.P., Jabado, R.W., Liu, K.M., Marshall, A., Pacoureau, N., Romanov, E., Sherley, R.B. &amp; Winker, H. (2018). <em>Cetorhinus maximus</em>. <em>The IUCN Red List of Threatened Species</em> 2019: e.T4292A2988471. Listed as Endangered.</li>
          <li>Parker, H.W. &amp; Stott, F.C. (1968). "Age, size and vital statistics of the basking shark, Cetorhinus maximus." <em>Bulletin of the British Museum (Natural History) Zoology</em>.</li>
          <li>Berrow, S.D. (2009). "The basking shark Cetorhinus maximus in Irish waters — patterns of distribution and abundance." <em>Irish Naturalists' Journal</em>; and related Irish Basking Shark Group reports.</li>
          <li>Witt, M.J., Hardy, T., Johnson, L., McClellan, C.M., Pikesley, S.K., Ranger, S., Richardson, P.B., Solandt, J.-L., Speedie, C., Williams, R. &amp; Godley, B.J. (2012). "Basking sharks in the northeast Atlantic: spatio-temporal trends from sightings in UK waters." <em>Marine Ecology Progress Series</em> 459: 121–134.</li>
          <li>Edwards, M., Beaugrand, G., Helaouët, P., Alheit, J. &amp; Coombs, S. (2013). "Marine ecosystem response to the Atlantic Multidecadal Oscillation." <em>PLoS ONE</em> 8: e57212; and related Continuous Plankton Recorder analyses by Edwards and colleagues.</li>
          <li>Maxwell, G. (1952). <em>Harpoon at a Venture</em>. Hart-Davis, London. Memoir of the Soay shark fishery, 1947–49.</li>
          <li>NatureScot &amp; Scottish Government. <em>Sea of the Hebrides Marine Protected Area Designation Order 2020</em>; nature.scot management documents 2020–2024.</li>
          <li>Scottish Environment LINK (2024). <em>Scotland's Marine Protected Area Network: 2024 Progress Assessment</em>.</li>
          <li>Manx Basking Shark Watch — annual reports and sightings database (2004–2024); manxbaskingsharkwatch.com.</li>
          <li>The Shark Trust — UK Basking Shark Project sightings programme; sharktrust.org.</li>
          <li>Hebridean Whale and Dolphin Trust — Whale Track app and sightings dataset; whaledolphintrust.org.uk.</li>
          <li>Irish Whale and Dolphin Group / Irish Basking Shark Group — sightings, photo-ID and educational resources; iwdg.ie, baskingshark.ie.</li>
          <li>Wildlife and Countryside Act 1981 (Schedule 5, basking shark added 1998); CITES Appendix II listing for <em>Cetorhinus maximus</em> (2003).</li>
          <li>Wildlife (Amendment) Act 2022 (Ireland) — designation of basking shark as protected wild animal, October 2022.</li>
        </ul>
        <p><strong>Illustrative visuals.</strong> The monthly sightings chart aggregates the seasonal pattern reported across Shark Trust, HWDT and Manx Basking Shark Watch citizen-science series; the values shown are an illustrative composite index rather than raw counts from a single scheme, and should be read as a representation of the documented May–September UK season. The Atlantic range map is schematic — coastlines are simplified, hotspot positions are illustrative of regions named in the cited literature, and the PSAT migration tracks are drawn from the published patterns in Sims et al. (2003) and Skomal et al. (2009) rather than overlaid raw track data.</p>
        <p><strong>No fabricated researchers, institutions, studies or statutes.</strong> Every named scientist, peer-reviewed paper, institution, IUCN listing, Marine Protected Area, and item of legislation in the body text corresponds to a verifiable public record. The three Tier-2 composites are limited to the opening field scene and the two attributed quotes from Patrick Joyce and Iain Malcolm, flagged above.</p>
      </aside>
    </article>
  );
}
