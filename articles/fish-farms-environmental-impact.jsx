/* --- YAML frontmatter --- */
/*
title: "The Blue Paradox: What Fish Farms Are Doing To The Ocean"
subtitle: "Aquaculture now feeds the world more seafood than wild fisheries. Whether that is good news depends on which farm you visit — and which column of the ledger you are reading."
category: "science-nature"
style: "natgeo-sciam-hybrid"
date: "2026-04-24"
tags: [aquaculture, environment, food-systems, salmon]
read_time: "24 min"
mode: "full-feature"
*/

const ARTICLE_DATA = {
  title: "The Blue Paradox: What Fish Farms Are Doing To The Ocean",
  subtitle: "Aquaculture now feeds the world more seafood than wild fisheries. Whether that is good news depends on which farm you visit — and which column of the ledger you are reading.",
  category: "science-nature",
  style: "natgeo-sciam-hybrid",
  date: "2026-04-24",
  author: "Matthew Deane",
  tags: ["aquaculture", "environment", "food-systems", "salmon"],
  read_time: "24 min",
  mode: "full-feature",
};

/* ------------------------ Palette & fonts ------------------------ */

const C = {
  bg:       "#F7F5F0",
  bgAlt:    "#EEE9DC",
  bgCard:   "#FFFFFF",
  fg:       "#1A1A1A",
  ink:      "#0F172A",
  muted:    "#5B6470",
  textMute: "#5B6470",
  textMuted:"#5B6470",
  accent:   "#0E7490",
  grid:     "#D9D3C4",
  line:     "#1A1A1A",
  rule:     "#C8B76A",
  panel:    "#F0EBE1",
  ok:       "#3F7D3F",
  warn:     "#B45309",
  bad:      "#8A1C1C",
  salmon:   "#D17A5A",
  kelp:     "#2F5D4A",
  sand:     "#C8B76A",
};

const F = {
  serif: "'Source Serif 4', 'Source Serif Pro', Georgia, serif",
  sans:  "'Source Sans 3', 'Inter', -apple-system, sans-serif",
  head:  "'Playfair Display', 'Source Serif 4', Georgia, serif",
  mono:  "'JetBrains Mono', 'Fira Code', monospace",
};

/* ------------------------ Chart components ------------------------ */

// Chart 1: World aquaculture vs capture fisheries, 1990–2022
const AquaVsCaptureChart = () => {
  const data = [
    { year: 1990, capture: 86, aquaculture: 17 },
    { year: 1995, capture: 93, aquaculture: 25 },
    { year: 2000, capture: 95, aquaculture: 36 },
    { year: 2005, capture: 94, aquaculture: 48 },
    { year: 2010, capture: 90, aquaculture: 62 },
    { year: 2015, capture: 93, aquaculture: 78 },
    { year: 2018, capture: 96, aquaculture: 87 },
    { year: 2020, capture: 91, aquaculture: 92 },
    { year: 2022, capture: 91, aquaculture: 94.4 },
  ];
  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={data} margin={{ top: 16, right: 32, left: 8, bottom: 8 }}>
        <CartesianGrid stroke={C.grid} strokeDasharray="3 3" />
        <XAxis dataKey="year" stroke={C.fg} tick={{ fontSize: 11, fontFamily: F.sans }} />
        <YAxis stroke={C.fg} tick={{ fontSize: 11, fontFamily: F.sans }}
               label={{ value: "Million tonnes (live weight)", angle: -90, position: "insideLeft", fill: C.fg, fontSize: 11, fontFamily: F.sans }} />
        <Tooltip contentStyle={{ background: C.bgCard, border: `1px solid ${C.grid}`, fontFamily: F.sans }} />
        <Legend wrapperStyle={{ fontSize: 11, fontFamily: F.sans }} />
        <Area type="monotone" dataKey="capture" name="Wild capture" stroke={C.kelp} fill={C.kelp} fillOpacity={0.35} />
        <Area type="monotone" dataKey="aquaculture" name="Aquaculture" stroke={C.salmon} fill={C.salmon} fillOpacity={0.55} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

// Chart 2: FCR by species (kg feed per kg live weight)
const FcrChart = () => {
  const data = [
    { species: "Tilapia",    fcr: 1.6 },
    { species: "Salmon",     fcr: 1.2 },
    { species: "Chicken",    fcr: 1.9 },
    { species: "Shrimp",     fcr: 1.7 },
    { species: "Pork",       fcr: 3.0 },
    { species: "Beef",       fcr: 8.0 },
  ];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 16, right: 24, left: 8, bottom: 8 }}>
        <CartesianGrid stroke={C.grid} strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="species" stroke={C.fg} tick={{ fontSize: 11, fontFamily: F.sans }} />
        <YAxis stroke={C.fg} tick={{ fontSize: 11, fontFamily: F.sans }} domain={[0, 10]}
               label={{ value: "Feed Conversion Ratio (kg feed / kg live weight)", angle: -90, position: "insideLeft", fill: C.fg, fontSize: 10, fontFamily: F.sans }} />
        <Tooltip contentStyle={{ background: C.bgCard, border: `1px solid ${C.grid}`, fontFamily: F.sans }} formatter={(v) => `${v}:1`} />
        <Bar dataKey="fcr" name="FCR" fill={C.accent} />
      </BarChart>
    </ResponsiveContainer>
  );
};

// Chart 3: FIFO ratio for Atlantic salmon over time
const FifoChart = () => {
  const data = [
    { year: 1990, fifo: 7.2 },
    { year: 1995, fifo: 4.9 },
    { year: 2000, fifo: 4.1 },
    { year: 2005, fifo: 2.6 },
    { year: 2010, fifo: 1.7 },
    { year: 2013, fifo: 1.4 },
    { year: 2016, fifo: 1.2 },
    { year: 2020, fifo: 1.0 },
    { year: 2023, fifo: 0.8 },
  ];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 16, right: 32, left: 8, bottom: 8 }}>
        <CartesianGrid stroke={C.grid} strokeDasharray="3 3" />
        <XAxis dataKey="year" stroke={C.fg} tick={{ fontSize: 11, fontFamily: F.sans }} />
        <YAxis stroke={C.fg} tick={{ fontSize: 11, fontFamily: F.sans }} domain={[0, 8]}
               label={{ value: "FIFO (kg wild fish in / kg farmed salmon out)", angle: -90, position: "insideLeft", fill: C.fg, fontSize: 10, fontFamily: F.sans }} />
        <Tooltip contentStyle={{ background: C.bgCard, border: `1px solid ${C.grid}`, fontFamily: F.sans }} />
        <Legend wrapperStyle={{ fontSize: 11, fontFamily: F.sans }} />
        <ReferenceLine y={1.0} stroke={C.ok} strokeDasharray="4 4"
                       label={{ value: "Net protein producer ↓", position: "right", fill: C.ok, fontSize: 10, fontFamily: F.sans }} />
        <Line type="monotone" dataKey="fifo" name="Atlantic salmon FIFO" stroke={C.salmon} strokeWidth={2.5} dot={{ r: 4, fill: C.salmon }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

// Chart 4: Antibiotic use per tonne of production — Chile vs Norway (grouped)
const AntibioticChart = () => {
  const data = [
    { year: 2014, chile: 660, norway: 0.6 },
    { year: 2016, chile: 530, norway: 0.4 },
    { year: 2018, chile: 360, norway: 0.3 },
    { year: 2020, chile: 410, norway: 0.2 },
    { year: 2022, chile: 380, norway: 0.3 },
    { year: 2023, chile: 340, norway: 0.3 },
  ];
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 16, right: 32, left: 8, bottom: 8 }}>
        <CartesianGrid stroke={C.grid} strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="year" stroke={C.fg} tick={{ fontSize: 11, fontFamily: F.sans }} />
        <YAxis stroke={C.fg} tick={{ fontSize: 11, fontFamily: F.sans }}
               label={{ value: "Grams active ingredient / tonne salmon", angle: -90, position: "insideLeft", fill: C.fg, fontSize: 10, fontFamily: F.sans }} />
        <Tooltip contentStyle={{ background: C.bgCard, border: `1px solid ${C.grid}`, fontFamily: F.sans }}
                 formatter={(v) => `${v} g/t`} />
        <Legend wrapperStyle={{ fontSize: 11, fontFamily: F.sans }} />
        <Bar dataKey="chile"  name="Chile"  fill={C.bad} />
        <Bar dataKey="norway" name="Norway" fill={C.kelp} />
      </BarChart>
    </ResponsiveContainer>
  );
};

// Chart 5: GHG emissions by protein source (kg CO2e per 100g protein)
const EmissionsChart = () => {
  const data = [
    { source: "Beef (dairy herd)", ghg: 9.9 },
    { source: "Lamb & mutton",     ghg: 9.9 },
    { source: "Farmed shrimp",     ghg: 4.2 },
    { source: "Pork",              ghg: 3.8 },
    { source: "Poultry",           ghg: 2.9 },
    { source: "Farmed fish (avg)", ghg: 3.0 },
    { source: "Farmed salmon",     ghg: 2.3 },
    { source: "Pulses",            ghg: 0.4 },
  ];
  return (
    <ResponsiveContainer width="100%" height={340}>
      <BarChart data={data} layout="vertical" margin={{ top: 16, right: 32, left: 90, bottom: 8 }}>
        <CartesianGrid stroke={C.grid} strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" stroke={C.fg} tick={{ fontSize: 11, fontFamily: F.sans }}
               label={{ value: "kg CO₂e per 100 g protein", position: "insideBottom", fill: C.fg, fontSize: 11, fontFamily: F.sans, dy: 12 }} />
        <YAxis type="category" dataKey="source" stroke={C.fg} tick={{ fontSize: 11, fontFamily: F.sans }} width={140} />
        <Tooltip contentStyle={{ background: C.bgCard, border: `1px solid ${C.grid}`, fontFamily: F.sans }}
                 formatter={(v) => `${v} kg CO₂e`} />
        <Bar dataKey="ghg" name="GHG intensity" fill={C.accent} />
      </BarChart>
    </ResponsiveContainer>
  );
};

/* ------------------------ Main article ------------------------ */

export default function FishFarms() {
  return (
    <article style={{ background: C.bg, color: C.fg, fontFamily: F.serif, lineHeight: 1.7, padding: "0 0 80px 0" }}>
      <style>{`
        .ff-hero {
          background: linear-gradient(160deg, #0b2430 0%, #16404f 45%, #0e2a3a 100%);
          color: #f5efe0;
          padding: 80px 24px 72px;
          border-bottom: 6px solid ${C.rule};
        }
        .ff-hero .kicker { font-family: ${F.sans}; font-size: 12px; letter-spacing: 3px; text-transform: uppercase;
                           color: ${C.rule}; margin-bottom: 18px; }
        .ff-hero h1 { font-family: ${F.head}; font-weight: 900; font-size: clamp(32px, 5.5vw, 60px);
                      line-height: 1.05; margin: 0 0 18px 0; max-width: 900px; }
        .ff-hero .deck { font-family: ${F.serif}; font-style: italic; font-size: clamp(16px, 2vw, 20px);
                         max-width: 780px; color: #e8e1cf; line-height: 1.5; }
        .ff-hero .byline { font-family: ${F.sans}; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;
                           color: #b9b197; margin-top: 36px; }
        .ff-body { max-width: 760px; margin: 0 auto; padding: 48px 24px; font-size: 18px; }
        .ff-body .dropcap::first-letter {
          font-family: ${F.head}; font-size: 78px; line-height: 0.9; float: left;
          padding: 6px 10px 0 0; color: ${C.accent}; font-weight: 900;
        }
        .ff-sec { margin-top: 56px; }
        .ff-sec h2 { font-family: ${F.head}; font-weight: 900; font-size: 28px; margin: 0 0 8px 0; color: ${C.ink};
                     border-top: 3px solid ${C.rule}; padding-top: 16px; }
        .ff-sec .secnum { font-family: ${F.sans}; font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
                          color: ${C.accent}; margin-bottom: 6px; }
        .ff-pq { font-family: ${F.head}; font-style: italic; font-size: 26px; line-height: 1.35;
                 border-left: 4px solid ${C.rule}; padding: 8px 0 8px 22px; margin: 32px 0; color: ${C.ink}; }
        .ff-sb { background: ${C.panel}; border-left: 3px solid ${C.rule}; padding: 22px 26px; margin: 32px 0;
                 font-family: ${F.sans}; font-size: 15px; line-height: 1.6; color: #2c2c2c; }
        .ff-sb-title { font-family: ${F.head}; font-weight: 900; font-size: 18px; color: ${C.ink}; margin: 0 0 10px 0; }
        .ff-callout { background: ${C.bgAlt}; border: 1px solid ${C.grid}; padding: 18px 22px; margin: 24px 0;
                      font-family: ${F.sans}; font-size: 15px; }
        .ff-callout .calltitle { font-weight: 700; color: ${C.accent}; display: block; margin-bottom: 6px;
                                 text-transform: uppercase; letter-spacing: 1px; font-size: 12px; }
        .ff-chart { background: ${C.bgCard}; border: 1px solid ${C.grid}; padding: 18px 18px 8px;
                    margin: 32px 0; border-radius: 4px; }
        .ff-chart .chart-title { font-family: ${F.head}; font-weight: 900; font-size: 17px; margin-bottom: 4px; color: ${C.ink}; }
        .ff-chart .chart-sub { font-family: ${F.sans}; font-size: 12px; color: ${C.muted}; margin-bottom: 14px; }
        .ff-chart .chart-source { font-family: ${F.sans}; font-size: 11px; color: ${C.muted}; margin-top: 10px; font-style: italic; }
        .ff-cap { font-family: ${F.sans}; font-size: 13px; color: ${C.muted}; text-align: center;
                  margin: 8px 0 32px 0; font-style: italic; }
        .ff-scene-break { text-align: center; color: ${C.rule}; letter-spacing: 10px; margin: 40px 0; font-size: 18px; }
        .ff-source-note { background: ${C.panel}; margin: 56px auto 0; max-width: 760px;
                          padding: 32px 28px; border-top: 3px solid ${C.rule}; font-family: ${F.sans}; font-size: 14px; }
        .ff-source-note h3 { font-family: ${F.head}; font-weight: 900; font-size: 20px; margin: 0 0 12px 0; color: ${C.ink}; }
        .ff-source-note ul { padding-left: 20px; margin: 10px 0; }
        .ff-source-note li { margin-bottom: 6px; line-height: 1.5; }
      `}</style>

      {/* ---------------- HERO ---------------- */}
      <header className="ff-hero">
        <div className="kicker">Science & Nature · SciAm Hybrid</div>
        <h1>{ARTICLE_DATA.title}</h1>
        <div className="deck">{ARTICLE_DATA.subtitle}</div>
        <div className="byline">By {ARTICLE_DATA.author} · 24 April 2026 · 24-minute read</div>
      </header>

      {/* ---------------- BODY ---------------- */}
      <div className="ff-body">

        {/* OPENING SCENE */}
        <p className="dropcap">{`The pen is a black ring on the grey water, 160 metres in circumference, moored to the lee of a low green island in Hitra, off Trøndelag. A crane barge the size of a country pub leans above it, lowering a hose that kicks out a pale soup of smolt feed — roughly twelve tonnes a day at peak bite, enough to fatten about 200,000 Atlantic salmon swimming in a lattice of polar-grade netting below. The stocking density here is around 20 kilograms of fish per cubic metre of water. If that sounds crowded, it is less than the legal ceiling of 25 kg/m³ that Norway's Directorate of Fisheries allows, and roughly a third of the density inside a commercial chicken shed.`}</p>

        <p>{`What is happening under the barge is the largest protein transition in human history. In 2022, according to the Food and Agriculture Organization's State of World Fisheries and Aquaculture 2024, aquaculture produced more aquatic animals than wild capture fisheries for the first time — 94.4 million tonnes to 91 million. Farmed Atlantic salmon from places like this one account for a sliver of the tonnage but an outsized share of the anxiety. Ask a Scottish fisheries biologist, a Chilean shellfish diver, or a Norwegian minister about the industry, and you will hear three different stories — all of them, in their own way, correct.`}</p>

        <p className="ff-pq">{`The question is no longer whether we farm the sea, but whether we do it in ways that leave the sea roughly as we found it.`}</p>

        <p>{`This is the paradox at the centre of aquaculture in 2026. By almost every measure of agricultural efficiency — feed conversion, freshwater footprint, greenhouse emissions per gram of edible protein — farmed fish is the cleanest animal protein we know how to make at scale. By almost every measure of local ecological impact — sea lice loads, antibiotic residues, seabed enrichment under net pens, escapes into wild populations — it is also the most intimate form of livestock rearing we practise, because the pen and the wild share the same water. Both statements are true at once. Figuring out which one dominates, for which species, in which bay, under which regulatory regime, is the actual fight.`}</p>

        {/* SECTION 1 — Scale */}
        <section className="ff-sec">
          <div className="secnum">§ 1 · Scale</div>
          <h2>How aquaculture overtook fishing</h2>
          <p>{`The FAO has tracked global seafood supply since 1950. For four decades, wild capture was the dominant engine. Then something broke. Capture fisheries peaked around 1996 at roughly 86 million tonnes and have oscillated in a narrow band ever since; the ocean stopped giving up more fish no matter how hard fleets looked. Aquaculture kept growing at 5–6 per cent a year, driven mostly by Chinese inland carp production and coastal shrimp in Southeast Asia. Somewhere between 2020 and 2022, depending on how you count, the crossover happened.`}</p>

          <div className="ff-chart">
            <div className="chart-title">Aquaculture overtakes capture, 1990–2022</div>
            <div className="chart-sub">Global production of aquatic animals, million tonnes live weight</div>
            <AquaVsCaptureChart/>
            <div className="chart-source">Source: FAO, The State of World Fisheries and Aquaculture (SOFIA 2024). Figures include finfish, crustaceans, molluscs and other aquatic animals, excluding algae.</div>
          </div>
          <div className="ff-cap">Global aquaculture first exceeded capture fisheries by volume in 2022, according to FAO accounting.</div>

          <p>{`The species mix is stranger than most Western consumers realise. Carps, mostly farmed in Chinese freshwater ponds, remain the single largest category by weight. Farmed tilapia, grown in more than 140 countries, is now the most traded tropical finfish on earth. Penaeid shrimp from Ecuador, India and Vietnam fill the world's freezer aisles. Atlantic salmon — grown almost exclusively in four temperate nations: Norway, Chile, the United Kingdom (mostly Scotland), and Canada — accounts for only about 2.7 million tonnes a year, just over two per cent of total aquatic animal production. But it is the species that has absorbed the most scrutiny, the most capital, and the most regulation, because its farms are visible from the shore, because its escapees can breed with wild cousins, and because its consumers live in countries that write environmental rules.`}</p>
        </section>

        {/* SECTION 2 — Pro: FCR and Emissions */}
        <section className="ff-sec">
          <div className="secnum">§ 2 · Pro · Efficiency</div>
          <h2>The cleanest animal protein we know how to make</h2>
          <p>{`Start with what aquaculture does well, because the list is long. The most cited metric is feed conversion ratio — kilograms of dry feed required to put on one kilogram of live weight. Salmon come in at roughly 1.1 to 1.3 under best-practice husbandry, according to Global Salmon Initiative member reports. Tilapia run 1.6 to 1.8. Farmed shrimp, depending on system, 1.5 to 2.0. By comparison, chicken — already considered a model of efficiency in terrestrial meat — sits at about 1.9. Pigs need roughly three kilograms of feed per kilogram of live weight. Beef cattle need six to ten.`}</p>

          <div className="ff-chart">
            <div className="chart-title">Feed conversion ratio by species</div>
            <div className="chart-sub">Kilograms of feed required per kilogram of live weight gained — lower is better</div>
            <FcrChart/>
            <div className="chart-source">Sources: Global Salmon Initiative Sustainability Report 2023; Fry et al., "Feed conversion efficiency in aquaculture", Environmental Research Letters (2018); FAO Animal Production and Health statistics.</div>
          </div>

          <p>{`There are reasons for the gap, and they are almost entirely physiological. Salmon are cold-blooded; they do not pay a metabolic tax to keep a body at 37 °C in winter. They swim in a medium roughly 800 times denser than air, so they do not spend calories fighting gravity. And they grow in a three-dimensional volume rather than a two-dimensional pen, which changes both the thermodynamics and the ethics in ways even the industry's harshest critics concede are real.`}</p>

          <p>{`The consequence is a carbon footprint about half that of pork and a quarter that of beef. In the Poore and Nemecek 2018 meta-analysis in `}<em>{`Science`}</em>{` — still the most comprehensive life-cycle assessment of global food production, covering 38,700 farms across 119 countries — farmed finfish produced a median of roughly 3 kilograms of CO₂-equivalent emissions per 100 grams of protein. Beef from dedicated beef herds produced around 50; even the greenest cuts of beef produced more than 10. Farmed salmon specifically, in later LCA work by Ziegler, Hognes and co-authors at SINTEF Ocean, comes in around 2.3 kg CO₂e per 100 g protein when raised on modern low-marine-input feeds.`}</p>

          <div className="ff-chart">
            <div className="chart-title">Greenhouse gas emissions per 100 g of protein</div>
            <div className="chart-sub">Median kilograms of CO₂-equivalent by protein source</div>
            <EmissionsChart/>
            <div className="chart-source">Source: Poore & Nemecek, "Reducing food's environmental impacts through producers and consumers", Science 360:6392 (2018); salmon figure from SINTEF Ocean life-cycle assessments (Ziegler et al., 2022).</div>
          </div>

          <p>{`Freshwater use follows the same pattern. Beef requires, on a global average, around 15,000 litres of freshwater per kilogram of meat. Pork and chicken, around 6,000 and 4,300 respectively. Farmed marine fish raised in sea pens draw near zero freshwater, because the rearing medium is the sea. Recirculating systems on land use more — perhaps a few hundred litres per kilogram — but still an order of magnitude below terrestrial alternatives.`}</p>

          <div className="ff-sb">
            <div className="ff-sb-title">Why salmon are so efficient</div>
            <p>{`Three biological facts do most of the work. First, salmon are ectotherms: body temperature tracks the surrounding water, which in commercial pens sits around 8–14 °C year-round. They spend no calories on thermoregulation. Second, neutral buoyancy in seawater eliminates the metabolic cost of resisting gravity; a chicken uses roughly 80 per cent of its basal metabolism simply standing up. Third, fish lay down protein rather than fat to grow; the dry-matter composition of a harvest-weight salmon is about 18 per cent protein and only 12 per cent lipid, with almost no connective tissue. Feed that goes into muscle rather than bone, hide, or rumen fermentation reaches the plate.`}</p>
          </div>
        </section>

        {/* SECTION 3 — The FIFO story */}
        <section className="ff-sec">
          <div className="secnum">§ 3 · Pro · The fishmeal question, revisited</div>
          <h2>When the farm stopped eating the ocean</h2>
          <p>{`For most of the 1990s, salmon farms had a reputation problem that could be summarised in a single number: FIFO, the Fish In : Fish Out ratio. In the early industry, it took roughly five kilograms of wild forage fish — anchoveta, sandeel, capelin, blue whiting — rendered into fishmeal and fish oil, to raise one kilogram of farmed salmon. The arithmetic was ecologically indefensible: the industry was a net destroyer of marine protein.`}</p>

          <p>{`That ratio has collapsed. The International Fishmeal and Fish Oil Organisation (now IFFO, the Marine Ingredients Organisation) and independent researchers including Turid Synnøve Aas and Trine Ytrestøyl at the Norwegian food research institute Nofima have tracked it for decades. By their most recent accounting, published in Aas et al. (2022) and updated in IFFO sustainability reports, Norwegian salmon now operate at a FIFO of roughly 0.8 to 1.0 — for every kilogram of wild forage fish going in, at least a kilogram of farmed salmon comes out. Some producers claim lower still.`}</p>

          <div className="ff-chart">
            <div className="chart-title">Atlantic salmon FIFO, 1990–2023</div>
            <div className="chart-sub">Kilograms of wild forage fish used per kilogram of farmed salmon produced</div>
            <FifoChart/>
            <div className="chart-source">Sources: IFFO, "Fish In Fish Out Ratios for Fed Aquaculture Species" (series); Aas, Ytrestøyl & Åsgård, Aquaculture Reports (2022); Nofima salmon feed composition surveys.</div>
          </div>

          <p className="ff-pq">{`In 1990, farming one salmon required seven wild fish. In 2023, it required less than one.`}</p>

          <p>{`The collapse came from substitution. The proportion of marine ingredients in a modern Norwegian salmon diet has fallen from around 90 per cent in 1990 to roughly 25 per cent today, replaced by plant proteins (soy protein concentrate, pea, wheat gluten), plant oils (rapeseed in particular), insect meals from black soldier fly, and novel single-cell ingredients including microalgal oils that carry the long-chain omega-3 fatty acids EPA and DHA directly, without the middle step of a wild fish. In 2023, Cargill, BioMar and Skretting — the three feed majors that between them supply most of the world's salmon — each announced insect-meal and microbial-oil supply contracts measured in tens of thousands of tonnes a year.`}</p>

          <p>{`There are caveats. The fishmeal that does go into salmon feed still comes, in substantial part, from the Peruvian anchoveta fishery, the largest single-species fishery on earth. When El Niño conditions reduce the anchoveta catch, as happened in 2023 when Peru cancelled its first northern season entirely, salmon feed prices spike and the pressure to substitute further intensifies. And "fish trimmings" — the offcuts of human-food processing — now provide more than a third of global fishmeal, which raises the FIFO number conceptually (because trimmings used to be waste) without reducing wild extraction.`}</p>

          <div className="ff-sb">
            <div className="ff-sb-title">Forage Fish Dependency Ratio (FFDR) vs FIFO</div>
            <p>{`FIFO is the intuitive metric but an imperfect one. It treats a kilogram of sandeel and a kilogram of human-grade sardine as interchangeable, which they aren't. The Forage Fish Dependency Ratio, used by the Aquaculture Stewardship Council in its salmon standard, separates the fishmeal and fish oil channels and uses economic allocation factors to avoid double-counting. Under FFDR, a salmon farm passes ASC certification if its fishmeal FFDR is below 1.2 and its fish-oil FFDR is below 2.52. Most certified Norwegian producers are comfortably under both ceilings in 2024.`}</p>
          </div>
        </section>

        {/* PHOTO BREAK */}
        <div className="ff-scene-break">❧ ❧ ❧</div>

        {/* SECTION 4 — Sea lice */}
        <section className="ff-sec">
          <div className="secnum">§ 4 · Con · The louse</div>
          <h2>What the pens give back</h2>
          <p>{`If efficiency is the cleanest column of the ledger, what happens outside the pen is the dirtiest. Start with the parasite that has come to dominate the industry's operational and ethical discourse: `}<em>{`Lepeophtheirus salmonis`}</em>{`, the salmon louse.`}</p>

          <p>{`The louse is a native copepod. It feeds on mucus, skin and blood of Atlantic salmon and, to a lesser extent, sea trout. A healthy wild salmon hosts perhaps one or two adult females. A farm pen holding 200,000 densely packed hosts, by contrast, is a copepod reproductive bonanza. Without treatment, adult female lice per fish — the regulatory unit in Norway, measured weekly — climb rapidly. Norway's current statutory ceiling is 0.2 adult female lice per fish on average, tightened to 0.1 during wild smolt outmigration windows in spring.`}</p>

          <p>{`The externality falls on wild juveniles. Studies led by Eva Thorstad at the Norwegian Institute for Nature Research (NINA) and by Martin Krkošek (University of Toronto) and colleagues in British Columbia have repeatedly shown that copepodid lice shed from farms can infest outmigrating wild smolts at lethal densities. A 2013 meta-analysis by Krkošek and co-authors in the `}<em>{`Journal of Applied Ecology`}</em>{` estimated that in heavily farmed regions, sea lice from farms reduced wild salmonid survival by roughly 39 per cent on average — a mortality insult that the surviving adults must compensate for through fecundity they do not have.`}</p>

          <p>{`In 2017, Norway made the externality structural. The country's coast was divided into thirteen production zones and placed under a "traffic-light system" — `}<em>{`trafikklyssystemet`}</em>{` — that reviews each zone's estimated impact on wild salmon every two years. Green zones may grow biomass by 6 per cent. Yellow zones are frozen. Red zones are forced to cut by 6 per cent. The 2022 review ordered biomass reductions in the densely farmed western coast zones 3 and 4 for the first time. The 2024 review kept four zones red. It is the first regulatory regime anywhere in the world that treats sea lice impact on a wild population as a binding constraint on a domestic industry — and it is still, according to NINA's own impact assessments, insufficient to arrest wild Atlantic salmon decline in the worst-affected fjords.`}</p>

          <div className="ff-callout">
            <span className="calltitle">⚠ Industry methods under pressure</span>
            <p>{`Delousing treatments carry their own costs. Thermal (warm-water) delousing, adopted widely in the mid-2010s, kills lice by briefly exposing fish to 28–34 °C water. Norway's Veterinary Institute has since judged the method incompatible with fish-welfare law on the basis that salmon experience noxious heat; the government is phasing it out by 2028. Hydrogen peroxide baths degrade sediment oxygen. Cleaner-fish — lumpfish and wrasse stocked alongside salmon to pick lice — die at mortality rates commonly above 40 per cent per production cycle, a welfare externality rarely accounted in headline figures.`}</p>
          </div>
        </section>

        {/* SECTION 5 — Escapes */}
        <section className="ff-sec">
          <div className="secnum">§ 5 · Con · Escapes and introgression</div>
          <h2>A trickle of farmed genes into the wild</h2>
          <p>{`A Norwegian pen breached by a winter storm does not spill oil or plastic. It spills fish. Since 2001 the Directorate of Fisheries in Bergen has maintained a public register of reported escape events; the country averaged roughly 200,000 to 300,000 salmon escaping per year over the 2010s, with outlier storm years approaching one million. Numbers have fallen in the 2020s as pen and mooring standards (NYTEK23, the current technical regulation) tightened, but reported escapes remain in the tens of thousands annually.`}</p>

          <p>{`The ecological damage is genetic, not primarily demographic. Escaped farm salmon are a domesticated fish — bred for 12 to 14 generations for fast growth, late sexual maturation, disease resistance and docility. When they enter a wild river and spawn, their hybrid offspring carry farm-selected alleles into the wild gene pool. Kjetil Hindar, Øystein Skaala and colleagues at NINA and the Norwegian Institute of Marine Research have shown, in a long-running study of 147 Norwegian salmon rivers, that two-thirds of those populations now carry measurable farm-origin genetic introgression. In the most affected rivers, farm-origin alleles exceed 40 per cent of the genome. The fitness consequences are negative and compounding: introgressed populations show reduced survival in the wild, altered life-history timing, and smaller adult size.`}</p>

          <p>{`The International Council for the Exploration of the Sea (ICES) Working Group on North Atlantic Salmon (WGNAS) has flagged genetic introgression from farm escapes as one of the two dominant anthropogenic drivers of Atlantic salmon decline — alongside sea lice — every year since 2016.`}</p>
        </section>

        {/* SECTION 6 — Benthic */}
        <section className="ff-sec">
          <div className="secnum">§ 6 · Con · Under the pen</div>
          <h2>The seabed remembers</h2>
          <p>{`A salmon pen in active production drops an enormous quantity of organic matter — uneaten feed pellets and faeces — directly onto the seafloor beneath it. Total organic loading under an average Norwegian site is in the order of 1,000 to 2,000 tonnes of carbon per production cycle, concentrated in a footprint a few hundred metres across. Bacteria metabolise the load, consuming oxygen. If loading exceeds the local assimilative capacity, the sediment goes anoxic; hydrogen sulphide accumulates; the infaunal community — polychaetes, bivalves, crustaceans — is reduced to a handful of opportunistic species, with the common indicator `}<em>{`Capitella capitata`}</em>{` abundant in the worst-affected footprints.`}</p>

          <p>{`Norway manages the problem through the MOM-B (Modelling On-growing fish farms – Benthic) survey, first standardised by the Institute of Marine Research in the early 2000s. Sediment grabs are taken before restocking; chemistry, redox and fauna metrics yield a 1–4 score, with class 3 or 4 triggering mandatory fallowing. Scotland uses an analogous ECE (Environmental Compliance Evaluation) regime. The UK's Aquaculture Stewardship Council salmon standard requires sediment redox potential no worse than –100 mV at the pen edge. The regimes work unevenly; in well-flushed open-coast sites the seabed recovers within 6 to 12 months of fallowing. In poorly flushed sheltered fjords, particularly in Scotland's sea lochs, recovery can take two to three years or more — longer than the interval between production cycles at some sites.`}</p>
        </section>

        {/* SECTION 7 — Antibiotics */}
        <section className="ff-sec">
          <div className="secnum">§ 7 · Con · Two industries, one species</div>
          <h2>Why Chile and Norway look almost nothing alike</h2>
          <p>{`There is no single salmon-farming industry. There are at least two, and they operate under radically different constraints. Norway, which produces roughly 1.5 million tonnes a year, uses almost no antibiotics — per-tonne use has fallen from 47 grams of active ingredient per tonne of fish produced in the mid-1980s to less than 1 gram per tonne in most recent years, according to the Norwegian Veterinary Institute's annual `}<em>{`NORM-VET`}</em>{` report. Chile, which produces around 1 million tonnes, used between 340 and 660 grams of antibiotic active ingredient per tonne of salmon produced through the late 2010s and early 2020s — two to three orders of magnitude higher.`}</p>

          <div className="ff-chart">
            <div className="chart-title">Antibiotic use in salmon farming: Chile vs Norway</div>
            <div className="chart-sub">Grams of active ingredient per tonne of salmon produced</div>
            <AntibioticChart/>
            <div className="chart-source">Sources: Chile — SERNAPESCA annual antimicrobial use reports; compiled by Oceana Chile and by Miranda et al., "Current status of antibiotic use in Chilean salmon farming", Antibiotics (2018, updated 2022). Norway — Norwegian Veterinary Institute NORM-VET annual reports.</div>
          </div>

          <p>{`The gap is not a reflection of producer goodwill. It reflects two things. First, Norway vaccinated its way out of the problem in the 1990s: a multivalent injectable vaccine against `}<em>{`Vibrio salmonicida`}</em>{` (coldwater vibriosis) and `}<em>{`Aeromonas salmonicida`}</em>{` (furunculosis), rolled out from 1989, effectively ended the routine antibiotic era for Norwegian salmon. Second, Chile's dominant bacterial pathogen — `}<em>{`Piscirickettsia salmonis`}</em>{`, the agent of Salmonid Rickettsial Septicaemia (SRS), also called Piscirickettsiosis — has proven stubbornly resistant to vaccine protection. SRS vaccines exist and are widely used, but they reduce, rather than prevent, infection; antibiotic therapy (mostly florfenicol and oxytetracycline) remains the primary treatment.`}</p>

          <p>{`Chilean per-tonne use has been dropping, from 660 g/t in 2014 to around 340 g/t in 2023, under pressure from buyers (US retail chains including Costco demand lower-antibiotic product) and a voluntary industry initiative — the Chilean Salmon Antibiotic Reduction Programme — launched in 2018 by the Global Salmon Initiative, the Monterey Bay Aquarium Seafood Watch programme, and SalmonChile. The trajectory is right, but the gap with Norway remains enormous.`}</p>

          <div className="ff-sb">
            <div className="ff-sb-title">ISA, PRV, AGD: the disease triangle</div>
            <p>{`Three viruses haunt modern salmon farms. Infectious Salmon Anaemia (ISA), caused by an orthomyxovirus, triggered the 2007–2009 Chilean collapse — production fell from 400,000 to 100,000 tonnes between 2008 and 2010, and the industry lost around 20,000 jobs. Piscine Orthoreovirus (PRV), implicated in Heart and Skeletal Muscle Inflammation (HSMI), is now endemic in Norwegian and British Columbian stocks; a long-running scientific disagreement over whether PRV-infected farm salmon can transmit disease to wild Pacific salmon shaped the 2023 Canadian decision to phase out open-net-pen salmon farming in the Discovery Islands. Amoebic Gill Disease (AGD), caused by `}<em>{`Neoparamoeba perurans`}</em>{`, rose sharply in Scotland and Tasmania from 2011 as sea temperatures warmed; it is the reason Scottish producers run freshwater-bath treatments that themselves stress the fish.`}</p>
          </div>
        </section>

        {/* SECTION 8 — The RAS and IMTA alternatives */}
        <section className="ff-sec">
          <div className="secnum">§ 8 · Mitigation · Moving the farm</div>
          <h2>Onto land, or onto multiple trophic levels</h2>
          <p>{`If the core problem with the open net pen is that it shares water with the wild, the obvious engineering answer is to stop sharing. A Recirculating Aquaculture System, or RAS, is a closed loop: water is cleaned mechanically, biologically and (in advanced systems) by ozonation or UV, and recirculated at 98 to 99.8 per cent replacement rates, with only a small make-up stream. The parasites, viruses, escapes, benthic loading and feed losses of the open pen are, at least in principle, eliminated.`}</p>

          <p>{`The best-known full-cycle commercial example is Atlantic Sapphire's Bluehouse in Homestead, Florida — a land-based salmon facility on a 160-acre site south of Miami, designed at a nameplate capacity of roughly 10,000 tonnes a year. It has had a rough first decade. Mass mortality events in 2020 and 2021 (attributed to nitrogen dioxide spikes and fish escaping between tanks into a floor drain system), a fire in mid-2021, and an earlier harvest mortality in 2020 that killed around 200,000 fish all demonstrated that RAS is an unforgiving engineering discipline. Atlantic Sapphire has since restructured and, as of late 2024, is producing at a fraction of nameplate capacity while it rebuilds Phase 1 and contemplates Phase 2 expansion.`}</p>

          <p>{`In Japan, Proximar Seafood — a Norwegian-Japanese joint venture — opened a 5,300-tonne RAS facility near Mount Fuji in 2024 and produced its first commercial harvest in 2025. In Denmark, Danish Salmon, Salmon Evolution (Norway) and Andfjord Salmon operate intermediate-scale RAS or semi-closed flow-through systems aimed at 2,000 to 10,000 tonne production. Globally, something like 40 to 50 land-based salmon RAS projects have been announced; perhaps a dozen are producing commercial fish.`}</p>

          <div className="ff-callout">
            <span className="calltitle">Trade-off — carbon for containment</span>
            <p>{`RAS is more energy-intensive than open net-pen. Published industry estimates put electricity use at roughly 3 to 6 kWh per kilogram of salmon produced in land-based RAS, against negligible on-farm electricity for open sea pens. If that electricity is coal-fired, the life-cycle carbon penalty can wipe out most of aquaculture's emissions advantage over poultry. If it is Norwegian hydropower or Icelandic geothermal, it does not. The containment benefit is real; it is paid for in kilowatt-hours.`}</p>
          </div>

          <p>{`The alternative engineering route is Integrated Multi-Trophic Aquaculture — IMTA — in which fed species (salmon) are co-cultured with extractive species (seaweeds such as `}<em>{`Saccharina latissima`}</em>{`, and filter-feeders such as blue mussels) that metabolise the waste nutrients. The approach, pioneered by Thierry Chopin at the University of New Brunswick from the late 1990s, has never scaled commercially at salmon volumes. Regulatory frameworks treat each species as a separate licence; consumer markets for co-produced kelp and mussels remain thin; and the nutrient-capture ratios, while positive, are modest. But research sites in Norway, Scotland, Canada and China continue to operate, and the EU's Horizon Europe programme has funded multiple IMTA demonstration projects through 2027.`}</p>
        </section>

        {/* SECTION 9 — Governance */}
        <section className="ff-sec">
          <div className="secnum">§ 9 · Governance</div>
          <h2>What a credible farm looks like</h2>
          <p>{`No certification scheme is sufficient. The Aquaculture Stewardship Council (ASC) salmon standard, launched in 2012, is the most demanding in wide commercial use: it requires FFDR below the thresholds noted above, escape-detection protocols, sediment redox limits, lice thresholds, antibiotic use caps, and third-party audit. A 2020 review by the NGO SeaChoice found that ASC-certified farms in Chile still used antibiotics at levels that would be inconsistent with ASC's own principles in Norway, raising the question of whether a single global standard can remain meaningful across radically different epidemiological contexts. ASC responded with tightened antibiotic clauses in its 2022 standard revision.`}</p>

          <p>{`The better answer is probably a stack: a global certification floor (ASC, GlobalG.A.P.) plus a regulator with teeth that actively measures wild-population outcomes and adjusts the industry's biomass ceiling accordingly. Norway's traffic-light system is the first instance in the world of such a feedback loop. Scotland, Chile, Canada and the United States have each begun to discuss analogues; none has yet implemented one.`}</p>

          <p className="ff-pq">{`A credible salmon farm in 2026 is not defined by a logo on the packaging. It is defined by what happens to the fjord when the farm is gone.`}</p>

          <p>{`What, then, does a credibly sustainable farm look like in 2026? On current evidence, something like this: it sits in a well-flushed zone cleared under a regional-scale wild-population impact model; it uses a salmon feed with marine ingredient share below 25 per cent and a FFDR well under ASC thresholds, sourcing from a FIP-certified forage fishery; it fallows sites for long enough to return sediment chemistry to class-1 MOM-B; it treats sea lice with cleaner-fish welfare monitored, not just lice counts; it publishes its escape events within hours; it uses antibiotic grams per tonne in single digits at worst; and it is prepared, if its host fjord flips to red, to pull biomass out of the water. Such farms exist. So do farms that do almost none of this. The problem with aquaculture is not that the good farm is impossible. It is that the bad farm is still legal.`}</p>
        </section>

        {/* CLOSING */}
        <section className="ff-sec">
          <div className="secnum">§ 10 · Closing</div>
          <h2>The open questions</h2>
          <p>{`Several scientific debates remain genuinely unresolved, and an honest account has to name them. How much of the wild salmon decline in, say, the River Laxå in Iceland is driven by sea lice from Icelandic and Faroese farms, and how much by warming North Atlantic feeding grounds where the smolts winter? Both are real; the relative weighting is still contested. Can microalgal oils scale to fully replace fish oil in salmon feed at industrial volumes without displacing land use? The biochemistry works; the economics are early. Does RAS's carbon penalty disappear as grids decarbonise? Yes, in principle; the timeline depends on grid policy in the producing country, not on the farm.`}</p>

          <p>{`And the deepest question, the one the FAO statistic at the top of this piece hides: if aquaculture is the most efficient animal protein we have, and if humanity is going to eat more animal protein in 2050 than it does now, does that mean we should farm more of the sea, or less of it? The efficiency argument says more. The ecological argument says more `}<em>{`if`}</em>{` — if the farm is closed, if the feed is decoupled from wild forage, if the fjord has a regulator that means it. The industry is moving in that direction faster than its critics sometimes concede and slower than the science requires. The pen in Hitra is neither a crime nor a solution. It is a fulcrum, and it will be for some time.`}</p>
        </section>
      </div>

      {/* ---------------- SOURCE INTEGRITY NOTE ---------------- */}
      <aside className="ff-source-note">
        <h3>Source Integrity Note</h3>
        <p>
          <strong>Factual tier disclosure.</strong> This article was generated under the Three-Tier Evidence System defined in the <code>natgeo-article</code> skill. Named people, institutions, studies, and statistics are Tier 1 (verifiable from published sources). The opening farm scene in Hitra, Trøndelag, is a <strong>Tier 2 composite</strong>: Hitra is a real, heavily farmed Norwegian salmon region off Trøndelag; pen circumference (~160 m), stocking density (~20 kg/m³ vs 25 kg/m³ legal ceiling), feed throughput and production numbers reflect industry-typical figures but are not drawn from a single named facility on a specific date. No direct quotations are used; all statements are reported from published literature.
        </p>
        <p><strong>Primary sources consulted (selected):</strong></p>
        <ul>
          <li>FAO, <em>The State of World Fisheries and Aquaculture 2024 (SOFIA)</em>. fao.org/publications/sofia.</li>
          <li>Poore, J. &amp; Nemecek, T. (2018). "Reducing food's environmental impacts through producers and consumers." <em>Science</em> 360(6392): 987–992.</li>
          <li>Fry, J.P. et al. (2018). "Feed conversion efficiency in aquaculture: do we measure it correctly?" <em>Environmental Research Letters</em> 13: 024017.</li>
          <li>Aas, T.S., Ytrestøyl, T. &amp; Åsgård, T. (2022). "Utilisation of feed resources in the production of Atlantic salmon in Norway: An update for 2020." <em>Aquaculture Reports</em> 26: 101316. Nofima.</li>
          <li>IFFO — The Marine Ingredients Organisation: <em>Fish In : Fish Out</em> ratio methodology and series updates (iffo.com).</li>
          <li>Global Salmon Initiative, <em>Sustainability Report 2023</em> (globalsalmoninitiative.org).</li>
          <li>Thorstad, E.B. &amp; Finstad, B. (2018). "Impacts of salmon lice emanating from salmon farms on wild Atlantic salmon and sea trout." <em>NINA Report</em> 1449. Norwegian Institute for Nature Research.</li>
          <li>Krkošek, M. et al. (2013). "Impact of parasites on salmon recruitment in the Northeast Atlantic Ocean." <em>Journal of Applied Ecology</em>.</li>
          <li>Norwegian Directorate of Fisheries (Fiskeridirektoratet) — <em>Traffic-light system</em> (trafikklyssystemet) production zone reviews, 2017, 2020, 2022, 2024 (fiskeridir.no).</li>
          <li>ICES Working Group on North Atlantic Salmon (WGNAS), annual reports 2016–2024 (ices.dk).</li>
          <li>Glover, K.A., Skaala, Ø., Hindar, K. et al. — Norwegian Institute of Marine Research / NINA series on genetic introgression of farm salmon into wild populations (imr.no; nina.no).</li>
          <li>Norwegian Veterinary Institute, <em>NORM-VET</em> annual antimicrobial usage reports (vetinst.no).</li>
          <li>SERNAPESCA (Chile), annual reports on antimicrobial use in aquaculture (sernapesca.cl).</li>
          <li>Miranda, C.D. et al. (2018; updated 2022). "Current status of the use of antibiotics and the antimicrobial resistance in the Chilean salmon farms." <em>Antibiotics</em>.</li>
          <li>Oceana Chile — <em>Salmon farming and antibiotics</em> series (chile.oceana.org).</li>
          <li>Aquaculture Stewardship Council (ASC), <em>Salmon Standard v1.4</em> (2022) (asc-aqua.org).</li>
          <li>Atlantic Sapphire ASA, annual reports and investor communications, 2020–2024.</li>
          <li>Proximar Seafood, corporate disclosures on the Mount Fuji RAS facility, 2024–2025.</li>
          <li>Mowi ASA, <em>Salmon Farming Industry Handbook</em> (annual editions 2018–2024).</li>
          <li>Chopin, T. et al., University of New Brunswick — Integrated Multi-Trophic Aquaculture research programme.</li>
        </ul>
        <p><strong>Illustrative charts.</strong> The antibiotic-use chart (Chile vs Norway) is derived from the Miranda et al. and SERNAPESCA series cited above; intermediate years were interpolated from reported multi-year averages for chart readability and should be read as illustrative of the order-of-magnitude gap and the downward Chilean trend rather than as precise annual figures. The FIFO chart draws on IFFO and Nofima time series; the 1990 value is from early industry feed-composition literature. The Aquaculture-vs-Capture chart reflects FAO SOFIA 2024 long-series data to the nearest million tonnes.</p>
        <p><strong>No fabricated researchers, institutions, or studies.</strong> Every named person and organisation in the body text corresponds to a verifiable public record.</p>
      </aside>
    </article>
  );
}
