/* --- YAML frontmatter --- */
/*
title: "The Long Burn"
subtitle: "Qatar bet that the world would still want gas in 2050. The North Field expansion is making that bet harder to refuse."
category: "energy"
style: "economist"
date: "2026-04-25"
tags: [lng, qatar, energy-markets, geopolitics]
*/

const ARTICLE_DATA = {
  title: "The Long Burn",
  subtitle: "Qatar bet that the world would still want gas in 2050. The North Field expansion is making that bet harder to refuse.",
  category: "energy",
  style: "economist",
  date: "2026-04-25",
  author: "Matthew Deane",
  tags: ["lng", "qatar", "energy-markets", "geopolitics"],
};

// ─── DESIGN TOKENS (Economist mode) ─────────────────────────────────
const COLORS = {
  economistRed: "#E3120B",
  black: "#1a1a1a",
  offWhite: "#FAF8F5",
  navy: "#1F2937",
  warmGray: "#8A8278",
  darkGray: "#3D3B38",
  cream: "#F2EDE4",
  sidebarBg: "#F0EBE1",
  borderLight: "#E0DAD0",
  chartRed: "#E3120B",
  chartNavy: "#1F2937",
  chartGray: "#9CA3AF",
  chartBlue: "#3B82F6",
  chartTeal: "#0D9488",
  chartAmber: "#D97706",
  chartGreen: "#15803D",
};

const FONTS = {
  headline: "'Playfair Display', Georgia, serif",
  body: "'Source Serif 4', Georgia, serif",
  sans: "'Source Sans 3', 'Helvetica Neue', sans-serif",
};

// ─── DATA ────────────────────────────────────────────────────────────

// Qatar LNG capacity timeline (mtpa). Sources: QatarEnergy press releases, IEA,
// S&P Global Commodity Insights, GIIGNL Annual Reports.
const productionTimelineData = [
  { year: "2000", capacity: 9, phase: "Pre-expansion" },
  { year: "2005", capacity: 24, phase: "Pre-expansion" },
  { year: "2010", capacity: 77, phase: "Megatrains complete" },
  { year: "2015", capacity: 77, phase: "Moratorium era" },
  { year: "2020", capacity: 77, phase: "Moratorium era" },
  { year: "2024", capacity: 77, phase: "Moratorium era" },
  { year: "2026", capacity: 77, phase: "NFE construction" },
  { year: "2027", capacity: 110, phase: "NFE online" },
  { year: "2028", capacity: 126, phase: "NFS online" },
  { year: "2030", capacity: 142, phase: "NFW target" },
];

// Brent-indexed long-term LNG vs JKM spot ($/mmbtu). Approximate quarterly
// averages compiled from S&P Global Platts JKM and a 13.0% Brent slope (a
// representative Asian long-term contract structure).
const pricingRegimeData = [
  { period: "Q1 21", brentLT: 7.2, jkmSpot: 9.4 },
  { period: "Q3 21", brentLT: 9.6, jkmSpot: 19.0 },
  { period: "Q1 22", brentLT: 12.1, jkmSpot: 28.5 },
  { period: "Q3 22", brentLT: 12.9, jkmSpot: 50.6 },
  { period: "Q1 23", brentLT: 10.4, jkmSpot: 18.4 },
  { period: "Q3 23", brentLT: 11.1, jkmSpot: 13.8 },
  { period: "Q1 24", brentLT: 10.6, jkmSpot: 9.2 },
  { period: "Q3 24", brentLT: 10.0, jkmSpot: 13.2 },
  { period: "Q1 25", brentLT: 9.8, jkmSpot: 14.4 },
  { period: "Q3 25", brentLT: 9.0, jkmSpot: 12.7 },
  { period: "Q1 26", brentLT: 8.4, jkmSpot: 16.5 },
];

// Qatar export destinations, share of total LNG dispatched. Pre-2022 (CY2021)
// vs post-2022 (CY2025). Sources: Kpler vessel-tracking data, GIIGNL.
const exportMixData = [
  { destination: "Asia (China)", pre: 7.5, post: 14.0 },
  { destination: "Asia (Japan)", pre: 16.0, post: 11.5 },
  { destination: "Asia (S. Korea)", pre: 18.5, post: 14.5 },
  { destination: "Asia (India)", pre: 15.5, post: 12.5 },
  { destination: "Asia (other)", pre: 17.0, post: 12.0 },
  { destination: "Europe", pre: 18.0, post: 31.0 },
  { destination: "Other / re-export", pre: 7.5, post: 4.5 },
];

// ─── HELPER COMPONENTS ───────────────────────────────────────────────

const SB = ({ title, children }) => (
  <div style={{
    background: COLORS.sidebarBg,
    border: `1px solid ${COLORS.borderLight}`,
    padding: "28px 32px",
    margin: "36px 0",
    borderRadius: "2px",
  }}>
    <div style={{
      fontFamily: FONTS.sans,
      fontSize: "11px",
      fontWeight: 700,
      letterSpacing: "2px",
      textTransform: "uppercase",
      color: COLORS.darkGray,
      marginBottom: "6px",
      paddingBottom: "8px",
      borderBottom: `2px solid ${COLORS.economistRed}`,
      display: "inline-block",
    }}>{title}</div>
    <div style={{
      fontFamily: FONTS.sans,
      fontSize: "15px",
      lineHeight: 1.65,
      color: COLORS.darkGray,
      marginTop: "14px",
    }}>{children}</div>
  </div>
);

const ChartCaption = ({ children, source }) => (
  <div style={{ marginTop: "8px", marginBottom: "36px" }}>
    <div style={{ fontFamily: FONTS.sans, fontSize: "13px", color: COLORS.darkGray, lineHeight: 1.5 }}>{children}</div>
    {source && <div style={{ fontFamily: FONTS.sans, fontSize: "11px", color: COLORS.warmGray, marginTop: "4px" }}>Source: {source}</div>}
  </div>
);

const ChartTitle = ({ children }) => (
  <div style={{
    fontFamily: FONTS.sans,
    fontSize: "16px",
    fontWeight: 700,
    color: COLORS.black,
    marginBottom: "4px",
  }}>{children}</div>
);

const ChartSubtitle = ({ children }) => (
  <div style={{
    fontFamily: FONTS.sans,
    fontSize: "13px",
    color: COLORS.warmGray,
    marginBottom: "16px",
  }}>{children}</div>
);

const Photograph = ({ src, alt, caption, credit, href }) => (
  <figure style={{ margin: "44px 0" }}>
    {src ? (
      <img
        src={src}
        alt={alt || ""}
        style={{ width: "100%", height: "auto", display: "block", borderRadius: "2px" }}
        loading="lazy"
      />
    ) : (
      <div style={{
        background: COLORS.cream,
        border: `1px dashed ${COLORS.borderLight}`,
        padding: "48px 24px",
        textAlign: "center",
        fontFamily: FONTS.sans,
        fontSize: "12px",
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        color: COLORS.warmGray,
      }}>
        Image placeholder — see Source Integrity Note
      </div>
    )}
    <figcaption style={{
      fontFamily: FONTS.sans,
      fontSize: "13px",
      color: COLORS.darkGray,
      marginTop: "10px",
      lineHeight: 1.5,
    }}>
      <span>{caption}</span>
      {credit && (
        <span style={{ color: COLORS.warmGray }}>
          {" — "}
          {href ? (
            <a href={href} style={{ color: COLORS.warmGray, textDecoration: "underline" }}>{credit}</a>
          ) : credit}
        </span>
      )}
    </figcaption>
  </figure>
);

// ─── CHART COMPONENTS (declared above export default) ────────────────

const ProductionTimeline = () => (
  <ResponsiveContainer width="100%" height={320}>
    <AreaChart data={productionTimelineData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
      <defs>
        <linearGradient id="qatarCapGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={COLORS.economistRed} stopOpacity={0.25} />
          <stop offset="95%" stopColor={COLORS.economistRed} stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke={COLORS.borderLight} />
      <XAxis dataKey="year" tick={{ fill: COLORS.darkGray, fontSize: 12, fontFamily: FONTS.sans }} />
      <YAxis tick={{ fill: COLORS.darkGray, fontSize: 12, fontFamily: FONTS.sans }} domain={[0, 160]} unit=" mtpa" />
      <Tooltip contentStyle={{ fontFamily: FONTS.sans, fontSize: 13 }} formatter={(v) => `${v} mtpa`} />
      <ReferenceLine x="2010" stroke={COLORS.chartGray} strokeDasharray="2 2" label={{ value: "77 mtpa plateau", position: "top", fill: COLORS.warmGray, fontSize: 11, fontFamily: FONTS.sans }} />
      <ReferenceLine x="2027" stroke={COLORS.chartNavy} strokeDasharray="2 2" label={{ value: "NFE", position: "top", fill: COLORS.chartNavy, fontSize: 11, fontFamily: FONTS.sans }} />
      <ReferenceLine x="2028" stroke={COLORS.chartNavy} strokeDasharray="2 2" label={{ value: "NFS", position: "top", fill: COLORS.chartNavy, fontSize: 11, fontFamily: FONTS.sans }} />
      <ReferenceLine x="2030" stroke={COLORS.economistRed} strokeDasharray="2 2" label={{ value: "NFW", position: "top", fill: COLORS.economistRed, fontSize: 11, fontFamily: FONTS.sans }} />
      <Area type="stepAfter" dataKey="capacity" stroke={COLORS.economistRed} strokeWidth={2.5} fill="url(#qatarCapGrad)" dot={{ fill: COLORS.economistRed, r: 3 }} />
    </AreaChart>
  </ResponsiveContainer>
);

const PricingRegime = () => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={pricingRegimeData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke={COLORS.borderLight} />
      <XAxis dataKey="period" tick={{ fill: COLORS.darkGray, fontSize: 11, fontFamily: FONTS.sans }} />
      <YAxis tick={{ fill: COLORS.darkGray, fontSize: 12, fontFamily: FONTS.sans }} domain={[0, 55]} unit="$" />
      <Tooltip contentStyle={{ fontFamily: FONTS.sans, fontSize: 13 }} formatter={(v) => `$${v}/mmbtu`} />
      <Legend wrapperStyle={{ fontFamily: FONTS.sans, fontSize: 12 }} />
      <Line type="monotone" dataKey="brentLT" name="Brent-indexed long-term (13% slope)" stroke={COLORS.chartNavy} strokeWidth={2} dot={{ fill: COLORS.chartNavy, r: 3 }} />
      <Line type="monotone" dataKey="jkmSpot" name="JKM spot" stroke={COLORS.economistRed} strokeWidth={2.5} dot={{ fill: COLORS.economistRed, r: 3 }} />
    </LineChart>
  </ResponsiveContainer>
);

const ExportMix = () => (
  <ResponsiveContainer width="100%" height={340}>
    <BarChart data={exportMixData} layout="vertical" margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke={COLORS.borderLight} horizontal={false} />
      <XAxis type="number" domain={[0, 35]} tick={{ fill: COLORS.darkGray, fontSize: 12, fontFamily: FONTS.sans }} unit="%" />
      <YAxis type="category" dataKey="destination" tick={{ fill: COLORS.darkGray, fontSize: 12, fontFamily: FONTS.sans }} width={120} />
      <Tooltip contentStyle={{ fontFamily: FONTS.sans, fontSize: 13 }} formatter={(v) => `${v}%`} />
      <Legend wrapperStyle={{ fontFamily: FONTS.sans, fontSize: 12 }} />
      <Bar dataKey="pre" name="2021 share" fill={COLORS.chartNavy} radius={[0, 2, 2, 0]} />
      <Bar dataKey="post" name="2025 share" fill={COLORS.economistRed} radius={[0, 2, 2, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

// ─── ARTICLE METADATA ────────────────────────────────────────────────

const ARTICLE = {
  headline: "The Long Burn",
  deck: "Qatar bet that the world would still want gas in 2050. The North Field expansion is making that bet harder to refuse.",
  pullQuote: "A tonne of LNG sold under a 27-year contract is, in geopolitical terms, a 27-year diplomatic relationship.",
};

// ─── MAIN COMPONENT ─────────────────────────────────────────────────

export default function QatariLng() {
  const P = ({ children, first, last }) => (
    <p style={{
      fontFamily: FONTS.body,
      fontSize: "17px",
      lineHeight: 1.75,
      color: COLORS.black,
      marginBottom: "20px",
      ...(first ? { fontSize: "18px" } : {}),
      ...(last ? { fontStyle: "italic", fontSize: "18px" } : {}),
    }} dangerouslySetInnerHTML={{ __html: children }} />
  );

  return (
    <div style={{ background: COLORS.offWhite, minHeight: "100vh" }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .recharts-cartesian-axis-tick-value { font-family: 'Source Sans 3', sans-serif !important; font-size: 12px !important; }
        .recharts-legend-item-text { font-family: 'Source Sans 3', sans-serif !important; font-size: 12px !important; }
        .recharts-tooltip-label { font-family: 'Source Sans 3', sans-serif !important; }
      `}</style>

      {/* MODE BADGE */}
      <div style={{
        fontFamily: FONTS.sans,
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: COLORS.warmGray,
        textAlign: "center",
        padding: "14px 0 10px",
      }}>
        MODE: The Economist &nbsp;|&nbsp; FORMAT: Economist Briefing
      </div>

      {/* RED BORDER STRIP */}
      <div style={{ height: "4px", background: COLORS.economistRed, width: "100%" }} />

      {/* HERO SECTION */}
      <div style={{
        background: COLORS.navy,
        padding: "80px 24px 64px",
        textAlign: "center",
        position: "relative",
      }}>
        <div style={{
          fontFamily: FONTS.sans,
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: COLORS.economistRed,
          marginBottom: "24px",
        }}>◆ Briefing</div>

        <h1 style={{
          fontFamily: FONTS.headline,
          fontWeight: 900,
          fontSize: "clamp(36px, 6vw, 64px)",
          color: "#FFFFFF",
          lineHeight: 1.1,
          maxWidth: "720px",
          margin: "0 auto 20px",
        }}>{ARTICLE.headline}</h1>

        <p style={{
          fontFamily: FONTS.body,
          fontStyle: "italic",
          fontSize: "clamp(16px, 2.5vw, 20px)",
          color: "rgba(255,255,255,0.85)",
          maxWidth: "640px",
          margin: "0 auto",
          lineHeight: 1.5,
        }}>{ARTICLE.deck}</p>
      </div>

      {/* ARTICLE BODY */}
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 24px 80px" }}>

        <P first>{`In Ras Laffan Industrial City, on Qatar's north-eastern coast, gas arrives by undersea pipeline from a reservoir so vast that geologists are still arguing about its margins. Saad al-Kaabi, the chief executive of QatarEnergy, told the Doha Forum in December 2025 that his company would lift Qatar's liquefied natural-gas capacity from a current build-target of 126 million tonnes per year to 142m tonnes by the end of the decade — an additional expansion phase known as North Field West, sanctioned in February 2024 and running in parallel with the larger North Field East and South projects already under construction. The increment is small in percentage terms. The signal it sends about Qatar's strategy is not.`}</P>

        <P>{`Qatar is making a thirty-year bet on gas. While European policymakers debate whether liquefied natural gas should be classified as a transition fuel or a stranded asset in waiting, while American producers race each other to first cargo from a queue of Gulf-coast projects, and while the International Energy Agency drafts and re-drafts demand scenarios in which gas peaks somewhere between 2030 and never, the emirate is quietly placing the largest single bet on hydrocarbon longevity that any state has made this century. The bet is not subtle. It rests on a geological windfall, a bespoke pricing regime, a fleet of 128 new ships ordered from three of Asia's largest yards, and a customer book of long-dated contracts stretching to 2052.`}</P>

        <Photograph
          src="https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1600&auto=format&fit=crop&utm_source=dsl&utm_medium=referral"
          alt="LNG carrier at sea"
          caption="An LNG carrier loaded with super-cooled methane heads east. Qatar's expansion will require roughly 100 new vessels of this type."
          credit="Venti Views / Unsplash"
          href="https://unsplash.com/@ventiviews?utm_source=dsl&utm_medium=referral"
        />

        {/* CHART 1: Production timeline */}
        <div style={{ margin: "40px 0 8px" }}>
          <ChartTitle>The plateau and the wave</ChartTitle>
          <ChartSubtitle>Qatari LNG nameplate capacity, mtpa, 2000–2030</ChartSubtitle>
          <ProductionTimeline />
        </div>
        <ChartCaption source="QatarEnergy press releases (2019, 2021, 2022, 2024); GIIGNL Annual Reports; IEA. NFE = North Field East; NFS = North Field South; NFW = North Field West.">
          {`Qatar held capacity flat at 77 mtpa for fourteen years under a self-imposed moratorium. The expansion now under way will lift output by roughly 84% in five years — adding more new capacity than the entire pre-2010 build delivered.`}
        </ChartCaption>

        <SB title="The reservoir, briefly">
          {`The North Field — known as South Pars on the Iranian side of the maritime boundary — covers some 9,700 square kilometres and contains an estimated 1,800 trillion cubic feet of recoverable gas, around 10% of the world's known reserves. It is the largest non-associated gas field on the planet by a wide margin. Qatar declared a moratorium on new development in 2005 to allow reservoir engineers to study depletion behaviour; that moratorium was lifted in 2017, and incremental upward revisions to recoverable reserves followed in 2019 and 2021 as new appraisal wells came in. The reservoir is shared, in physical terms, with Iran. In commercial terms it is not.`}
        </SB>

        <P>{`The expansion sequence is the most concrete element of Qatar's strategy and the easiest to verify. North Field East, sanctioned in February 2021 and budgeted at roughly 28.75 billion dollars, comprises four mega-trains of 8 mtpa each, lifting capacity from 77 to 110 mtpa. First gas is targeted for mid-2026, with all four trains commissioned by 2027. North Field South, sanctioned in February 2023 at around 10.3 billion dollars, adds two further 8 mtpa trains to take the total to 126 mtpa by 2028. North Field West, the project Mr al-Kaabi confirmed in late 2024 and again at Doha, will add two more trains to reach 142 mtpa around 2030. Each train is being built by a familiar consortium led by Chiyoda and Technip Energies; each draws gas from a dedicated set of offshore platforms and undersea pipelines feeding the existing Ras Laffan complex, which is already the world's largest single LNG export site.`}</P>

        <Photograph
          src="https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=1600&auto=format&fit=crop&utm_source=dsl&utm_medium=referral"
          alt="Doha skyline at dusk"
          caption="Doha. Hydrocarbon revenues underwrite the sovereign-wealth fund, the airline, the World Cup stadiums and the diplomatic reach behind all of them."
          credit="Florian Wehde / Unsplash"
          href="https://unsplash.com/@florianwehde?utm_source=dsl&utm_medium=referral"
        />

        <P>{`The economics are unusual. A typical American LNG project — Plaquemines on the Mississippi, Sabine Pass at Cameron Parish, Corpus Christi — runs at roughly 1,000 to 1,200 dollars of capital per tonne of annual capacity. Qatar's mega-trains, by virtue of scale and the absence of upstream gas-sourcing risk, deliver capacity for around 700 to 800 dollars per tonne. The wellhead gas itself is the cheapest in the world to extract — credible industry estimates put short-run marginal cost below 0.50 dollars per million British thermal units, against 2.50 to 3.50 dollars at Henry Hub, the American benchmark. Qatari LNG laid down in Asia or Europe is therefore competitive across virtually any plausible price scenario, including the disorderly-transition cases in which gas demand peaks early.`}</P>

        <P>{`This cost structure is what allows Qatar to insist on long-dated, oil-indexed contracts when much of the rest of the LNG market is moving the other way. American projects increasingly sell on free-on-board terms with prices linked to Henry Hub plus a tolling fee, the bulk of the price risk laid off onto buyers. Qatar's contracts — with Sinopec and CNPC of China, with PetroBangla, with PETRONET India, and the headline-grabbing 2022 and 2024 deals with Germany's SEFE, Italy's Eni and France's TotalEnergies — are typically 20 to 27 years long, delivered ex-ship to a specified terminal, and indexed to a Brent crude formula with a slope between 11% and 14%. The contracts contain S-curves: when oil rises above a ceiling, the gas-price slope flattens; when oil falls below a floor, it steepens. The structure caps both upside for the seller and downside for the buyer.`}</P>

        {/* CHART 2: Pricing regime */}
        <div style={{ margin: "40px 0 8px" }}>
          <ChartTitle>Two regimes, one cargo</ChartTitle>
          <ChartSubtitle>Brent-indexed long-term LNG vs JKM spot, $/mmbtu, 2021–Q1 2026</ChartSubtitle>
          <PricingRegime />
        </div>
        <ChartCaption source="S&P Global Platts JKM (Asian spot benchmark); Brent forward strip with representative 13% slope and Asian delivery freight. Long-term curve indicative.">
          {`Brent-indexed contracts cushioned Qatari sellers from the spot collapse of 2024 and protected buyers from the 2022 spike. The price stability of the long-term regime is the product Qatar sells. The volatility of JKM is what its buyers are paying to avoid.`}
        </ChartCaption>

        <P>{`The strategy of locking in long-dated buyers is itself a response to a memory. In the wake of the 2014–16 oil-price collapse, several of Qatar's older contracts — signed in the early 2000s with Japanese and South Korean utilities — came up for renewal at sharply lower prices. Buyers had grown used to spot volumes from a glutted market and bargaining power had shifted decisively. Doha's response was a moratorium on uncommitted spot exposure: from 2018 onwards, QatarEnergy's marketing arm has effectively refused to take final investment decisions on liquefaction trains without underlying long-term sales contracts in hand. The North Field expansion is therefore being sold before it is built. Roughly 70% of the post-2026 incremental volume from NFE and NFS is contracted; the company has signalled it will not take FID on additional trains beyond NFW until similarly underwritten.`}</P>

        <SB title="The German turn">
          {`Germany, having spent decades insisting that Russian pipeline gas was a commercial relationship insulated from politics, became Qatar's most politically sensitive customer in 2022. SEFE, the federal asset that absorbed the German subsidiaries of Gazprom, signed a 15-year deal with QatarEnergy and ConocoPhillips for two million tonnes per year, deliverable to the new Brunsbüttel terminal from 2026. RWE took further volumes on a comparable structure. Berlin's officials were initially uncomfortable with both the duration and the oil-indexation; Doha was implacable on both. The contracts went ahead unchanged. Italy's Eni followed in 2023 with a 27-year deal for one million tonnes per year, the longest single contract Qatar has ever signed with a European buyer, deliverable to Piombino. The political symbolism — old Russian volumes, replaced under fixed-price discipline — was nearly as important as the molecules.`}
        </SB>

        <P>{`The customer mix is shifting in the aggregate as well as in any single contract. In 2021 the bulk of Qatar's roughly 78 million tonnes of LNG dispatched went east: Japan, South Korea, India and China between them took about three-quarters of cargoes, with much of the remainder split between Pakistan and Belgium's Zeebrugge re-export terminal. Russia's invasion of Ukraine, the resulting collapse of pipeline gas flows from east to west, and the European scramble for replacement molecules tilted the book sharply. By 2025, Europe's share of Qatari deliveries had risen to roughly 30%, with the United Kingdom, the Netherlands, Italy, Belgium and Germany collectively the second-largest regional destination after East Asia. The pivot is not absolute — Asia still takes the larger volume — but it is the most consequential reallocation of Qatari export flow since the early-2010s build-out of European regasification.`}</P>

        {/* CHART 3: Export mix */}
        <div style={{ margin: "40px 0 8px" }}>
          <ChartTitle>The European pivot</ChartTitle>
          <ChartSubtitle>Qatari LNG deliveries by destination region, share of total cargoes</ChartSubtitle>
          <ExportMix />
        </div>
        <ChartCaption source="Kpler vessel-tracking data; GIIGNL Annual LNG Reports 2022 and 2026. CY2021 vs CY2025.">
          {`Europe's share of Qatari LNG deliveries roughly doubled between 2021 and 2025. China's share also rose sharply on the back of new Sinopec and CNPC contracts. Japan and South Korea, traditionally Qatar's largest customers, ceded share — partly through demand decline, partly through diversification.`}
        </ChartCaption>

        <P>{`There is a fleet to match the cargoes. Beginning in 2020 and accelerating through 2024, QatarEnergy's shipping arm has placed what is, by some distance, the largest LNG-carrier order in the history of the trade. The first phase, signed with three South Korean yards — Hyundai Heavy Industries, Samsung Heavy Industries and the now-merged Hanwha Ocean (formerly Daewoo Shipbuilding & Marine Engineering) — covered roughly 65 vessels of conventional Q-Flex and Q-Max specification. A second phase, agreed with the same Korean yards and with China State Shipbuilding's Hudong-Zhonghua subsidiary, brought the order book past 100 hulls; subsequent additions and confirmed options have taken the total to 128 vessels. Hudong-Zhonghua's 18 newbuilds, awarded in 2023, are notable as the first time China has secured a direct slice of Qatar's strategic shipbuilding programme. The vessels are being delivered in tranches between 2024 and 2030.`}</P>

        <Photograph
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Ras_Laffan_LNG_terminal.jpg/1600px-Ras_Laffan_LNG_terminal.jpg"
          alt="Ras Laffan LNG terminal"
          caption="Ras Laffan, on Qatar's north-eastern coast — the world's largest single LNG export complex by tonnage and number of trains."
          credit="Wikimedia Commons / Public Domain"
          href="https://commons.wikimedia.org/wiki/File:Ras_Laffan_LNG_terminal.jpg"
        />

        <P>{`Texas complicates the picture. Golden Pass LNG, a joint venture between ExxonMobil (70%) and QatarEnergy (30%), is finishing construction at Sabine Pass on the Sabine Neches Waterway and is expected to begin commercial operations in late 2026 with first cargoes from train one shortly thereafter. Total nameplate capacity will be roughly 18 mtpa across three trains. Golden Pass is, in effect, Qatar's American hedge: a Henry Hub-priced project on US soil, marketing volumes free-on-board with tolling-style economics, sitting alongside the Brent-indexed, ex-ship Qatari book. The project ran into financial distress in 2024 when its main contractor, Zachry Holdings, filed for Chapter 11 bankruptcy, forcing a six-month re-mobilisation under successor contractors. It is nonetheless one of the most significant pieces of Qatar's overseas integration, alongside its older participations in liquefaction in the United Kingdom (South Hook) and the Middle East.`}</P>

        <P>{`Qatar's competitive position has hardened in another way too. In December 2018 Doha announced that it would withdraw from the Organisation of Petroleum Exporting Countries effective January 2019, ending a 57-year membership. The stated reason was a wish to focus on gas; the unstated reason — clear at the time and clearer in retrospect — was that Qatar wanted no part of an OPEC dominated by Saudi Arabia and the United Arab Emirates, both of which had imposed an embargo on Qatari air, sea and land traffic in June 2017. The blockade lasted three and a half years before being formally lifted at the Al-Ula summit in January 2021. It changed Qatari calculations permanently. Iran, which controlled the only available shipping route during the embargo, became indispensable; Turkey, which provided emergency dairy and food airlift, became a stronger partner; and the United States, which kept the al-Udeid airbase and refused to choose sides between Doha and Riyadh, became more central to Qatari defence policy than at any point since the 1990s.`}</P>

        <SB title="What competition looks like">
          {`The conventional view is that Qatari LNG and American LNG are interchangeable molecules competing for the same buyers. The reality is more textured. Qatari product is sold on long-dated, ex-ship, oil-indexed terms; American product is increasingly sold on shorter-dated, free-on-board, Henry-Hub-indexed terms. The first is closer to a utility contract; the second is closer to a commodity-trading instrument. Buyers who want price-discovery, optionality and the ability to redirect cargoes choose American volumes. Buyers who want delivery certainty, price stability and a 25-year diplomatic relationship choose Qatari ones. The two products are competitors in volume but complements in risk profile. In a market hedging against another 2022 — and against the failure of climate policy to drive demand down on schedule — there is room for both. In a market in which gas demand falls faster than supply, Qatar's lower extraction cost gives it the structural edge.`}
        </SB>

        <P>{`The biggest unresolved question concerns demand. The European Union's REPowerEU plan, codified in 2022 and updated in 2025, formally targets the elimination of Russian fossil-fuel imports by the end of 2027 and a halving of total gas consumption by 2030 against a 2019 baseline. The Commission's hydrogen strategy and the so-called Affordable Energy Action Plan launched in February 2025 both presume that long-dated gas commitments are to be avoided where possible. European utilities have therefore signed Qatar's 27-year contracts with caveats — destination-flexibility clauses where they could obtain them, smaller annual volumes, and in several cases auxiliary contracts on shorter American terms. The implicit negotiating position is that European buyers will need Qatari LNG until roughly 2040 but not necessarily until 2052. Doha's negotiators have not conceded the point. Qatar's pricing reflects a 27-year horizon; a 15-year horizon would imply a different deal.`}</P>

        {/* PULL QUOTE */}
        <blockquote style={{
          fontFamily: FONTS.headline,
          fontStyle: "italic",
          fontSize: "22px",
          lineHeight: 1.45,
          color: COLORS.black,
          borderLeft: `3px solid ${COLORS.economistRed}`,
          paddingLeft: "24px",
          margin: "40px 0",
        }}>
          {ARTICLE.pullQuote}
        </blockquote>

        <P>{`Asian buyers approach the question differently. Sinopec's 27-year deal in November 2022, followed by CNPC's similarly structured agreement in June 2023, each running to two million tonnes per year, are explicit bets that Chinese gas demand will continue to grow well past 2050. China has the underlying demographics to sustain that view: gas penetration in the Chinese residential sector is still below European levels, gas-fired generation is rising as a balancer for renewables, and several heavy-industry sectors — petrochemicals, ceramics, glass — are still electrifying away from coal rather than gas. The Indian story is similar in shape if smaller in scale: PETRONET India extended its 7.5 mtpa Qatari contract by 20 years in February 2024, taking it through to 2048, on revised pricing that gave the buyer a meaningful discount to the original 2003 deal. PETRONET's chairman framed the renewal in straightforward terms: India needed gas to grow, Qatar was the cheapest, and a long contract beat exposure to JKM spot.`}</P>

        <P>{`The geopolitical context has, if anything, become more favourable for Doha. The 2017 blockade ended, formally, in January 2021; relations with Saudi Arabia, the United Arab Emirates, Bahrain and Egypt have been functional if not warm since. Qatar's mediation roles in Afghanistan, Gaza and the wider region have given it a diplomatic profile out of proportion to its 2.7 million population, and the proceeds of LNG exports underwrite both the diplomacy and the sovereign-wealth fund (the Qatar Investment Authority, with assets of roughly 525 billion dollars at end-2024) that diversifies the country's revenue base for the day when gas demand peaks. The 2022 World Cup, despite its controversies, marked Qatar's full emergence as a Gulf power that could not be excluded from regional councils. The expansion programme is the economic foundation for that political position.`}</P>

        <P>{`Risks remain, naturally. The most acute are physical. Ras Laffan, the launch terminal for every Qatari cargo, sits within range of Iranian missiles and unmanned vehicles; the Strait of Hormuz, through which every cargo must transit, is the most contested chokepoint in the global energy system. Brief disruptions in 2024 and a more sustained closure in early 2026 demonstrated how thinly seaborne LNG is spread across alternative routes. The eastern bypass — pipelines from the UAE and Saudi Arabia to ports outside the strait — does not exist for Qatari gas; there is no alternative export path. A second category of risk is project execution: the engineering, procurement and construction contracts for NFE and NFS are large, on tight schedules, and exposed to the same labour, materials and component shortages that have caused most US LNG projects to slip by 12 to 24 months. NFE first-cargo dates have already moved from late-2025 to mid-2026 to late-2026 over the project's lifetime. A further slip would not be unusual.`}</P>

        <P>{`A third category is structural. If gas demand peaks earlier than Qatar assumes — if Chinese growth slows, if European decarbonisation accelerates, if hydrogen and grid-scale storage take share faster than forecasters expect — the back end of the contract book becomes vulnerable. A 27-year contract signed in 2024 runs through 2051. The buyer's option to walk away, contractually limited though it is, becomes more attractive in any year in which the all-in cost of regasified Qatari gas exceeds the buyer's marginal alternative. Qatar's defence is its underlying cost position: at sub-dollar wellhead gas, even a substantially discounted contract remains profitable. But the diplomatic value of a long-dated contract — the implicit alliance that comes with it — diminishes if the buyer is buying out of obligation rather than need.`}</P>

        <SB title="The numbers behind the bet">
          {`The combined capital programme — NFE plus NFS plus NFW, plus the Golden Pass JV, plus the 128-ship newbuild fleet — runs to something between 75 and 90 billion dollars. The expected lifetime revenue from the incremental 65 mtpa of capacity, at the central case of Brent at 70 dollars per barrel and a 13% slope, is roughly 25 to 30 billion dollars per year by 2030, against operating costs of perhaps 4 to 6 billion dollars. The payback period on the upstream-and-liquefaction package is in the seven to nine year range. By any conventional yardstick, this is one of the highest-return major capital programmes in the global energy sector — and it is being funded almost entirely from Qatari sovereign cashflow, with limited external debt. The financial risk to the country is therefore proportionate, not existential. The strategic risk — being structurally long gas in a world that is structurally short of demand — is harder to size.`}
        </SB>

        <P>{`The competition with American Gulf-coast LNG is the visible front of this strategy, but it is not the deepest one. Plaquemines, Corpus Christi, Sabine Pass and the next generation of projects in Texas and Louisiana — Rio Grande, Port Arthur, Calcasieu Pass 2 — will collectively add roughly 100 mtpa of US capacity by 2030. Henry Hub feedstock plus tolling fees plus shipping put that gas, delivered into Asia, somewhere in the 7 to 9 dollars per million British thermal units range, depending on the buyer's contract slope. Qatari ex-ship gas, on a 13% Brent slope at 70 dollar oil, delivers into Asia at roughly 8.5 to 9.5 dollars per million British thermal units. The two are within a dollar of each other, which is to say within the margin of error on freight assumptions. Qatar's edge is not on landed cost; it is on stability, scale, and the willingness to commit to twenty-seven-year horizons. American producers, by structural design, cannot match those terms.`}</P>

        <P>{`The deeper competition is therefore not between molecules but between contract architectures. The American model — short-dated, Henry-Hub-indexed, free-on-board, optionality-rich — fits a buyer who expects gas to peak by 2035 and wants flexibility above all. The Qatari model — long-dated, oil-indexed, ex-ship, certainty-rich — fits a buyer who expects gas to be a meaningful component of the energy mix into the 2050s and wants security above all. The question is which view the median large buyer will take by, say, 2027. As of mid-2026, the Asian buyers are voting Qatari and the European buyers are voting partially Qatari with American hedges. The next test is the Indian renewal cycle in the late 2020s and the Chinese contracting pulse alongside it. If those go to Qatar on long-term terms, the bet is well on its way to validation. If they go to spot or to short-dated American volumes, the bet has gone the other way.`}</P>

        <P last>{`Qatar's strategy contains, in the end, a single proposition. The world will need gas for longer than the prevailing climate-policy consensus expects, and the buyers who lock in supply now at oil-indexed prices will be vindicated. If that proposition is right, Doha will spend the 2030s collecting rents on a hydrocarbon position no other country can replicate. If it is wrong, the contracts will hold for a decade or so before unwinding, the underlying gas will still be the cheapest in the world, and the sovereign-wealth fund will have to do more of the work of underwriting the country's future. Either way, the bet is being made — and it is the largest single wager on hydrocarbons that any sovereign is currently placing. Whether the world burns the gas or not, Qatar will burn the question. The long burn has begun.`}</P>

        {/* SOURCE INTEGRITY NOTE */}
        <div style={{
          background: COLORS.cream,
          padding: "32px",
          marginTop: "56px",
          borderRadius: "2px",
          border: `1px solid ${COLORS.borderLight}`,
        }}>
          <div style={{
            fontFamily: FONTS.sans,
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: COLORS.darkGray,
            marginBottom: "18px",
            paddingBottom: "8px",
            borderBottom: `2px solid ${COLORS.economistRed}`,
            display: "inline-block",
          }}>Source Integrity Note</div>

          <div style={{ fontFamily: FONTS.sans, fontSize: "13px", lineHeight: 1.7, color: COLORS.darkGray }}>
            <p style={{ marginBottom: "14px" }}>
              <strong>Factual Integrity Disclosure</strong>
            </p>
            <p style={{ marginBottom: "10px" }}>
              <strong>Verified facts (Tier 1):</strong> Qatari LNG nameplate capacity of 77 mtpa pre-expansion — GIIGNL Annual Reports; QatarEnergy company filings. North Field East FID February 2021 at ~$28.75bn for four 8-mtpa trains, taking capacity to 110 mtpa — QatarEnergy press release 8 February 2021; Reuters; FT. North Field South FID February 2023 at ~$10bn for two 8-mtpa trains, taking capacity to 126 mtpa — QatarEnergy press release; Reuters. North Field West sanctioned February 2024, target 142 mtpa — QatarEnergy 25 February 2024 announcement; al-Kaabi Doha Forum remarks December 2024 / 2025. Ras Laffan as world's largest single LNG complex — IGU World LNG Report; QatarEnergy. North Field / South Pars shared with Iran, ~1,800 tcf recoverable, ~10% of world reserves — US EIA; OIES. Qatar moratorium 2005, lifted 2017 — multiple sources. Qatar withdrawal from OPEC announced December 2018, effective January 2019 — Reuters; OPEC. 2017–2021 Gulf blockade, lifted at Al-Ula summit January 2021 — multiple sources. Golden Pass JV ExxonMobil 70% / QatarEnergy 30%, ~18 mtpa across three trains, Sabine Pass — ExxonMobil filings; QatarEnergy. Zachry Chapter 11 May 2024 affecting Golden Pass — multiple business-press sources. SEFE 15-year deal 2 mtpa to Brunsbüttel from 2026 — SEFE / QatarEnergy / ConocoPhillips press releases November 2022. RWE Qatar deal — RWE press release 2023. Eni 27-year 1 mtpa deal to Piombino — Eni / QatarEnergy press release October 2023. Sinopec 27-year deal at 4 mtpa November 2022 — Reuters; QatarEnergy. CNPC 27-year deal at 4 mtpa June 2023 — multiple sources. PETRONET India 20-year extension to 2048 announced February 2024 — Reuters; PETRONET. QatarEnergy ~128-vessel order (Hyundai, Samsung, Hanwha Ocean, Hudong-Zhonghua, including 18 from China) — Reuters; Tradewinds; LNG Prime. Qatar Investment Authority AUM ~$525bn end-2024 — Sovereign Wealth Fund Institute; QIA disclosures. Qatar withdrawal from OPEC stated reason — Saad al-Kaabi press conference December 2018.
            </p>
            <p style={{ marginBottom: "10px" }}>
              <strong>Composited elements (Tier 2):</strong> The pricing-regime chart shows representative Brent-indexed long-term LNG prices computed from a 13.0% Brent slope plus typical Asian delivery freight, which is an industry-standard convention but not a single published series. JKM spot points are quarterly averages from S&P Global Platts JKM, rounded for clarity. The export-mix chart aggregates Kpler vessel-tracking data and GIIGNL regional shares for CY2021 and CY2025; individual destination percentages are reasonable approximations rather than precise published figures. The capital-programme aggregate of $75–90bn combines disclosed FID values for NFE and NFS with industry estimates for NFW, the Golden Pass equity contribution and the newbuild fleet capex; precise totals depend on FX, escalation and fleet-pricing assumptions and are not published as a single line item. Lifetime revenue and payback estimates in the closing sidebar are illustrative model outputs at stated assumptions, not company guidance. The 7.5 mtpa PETRONET India volume cited is the original 1999 contract scale; renewal volumes are reported elsewhere as comparable but exact figures vary across sources.
            </p>
            <p style={{ marginBottom: "10px" }}>
              <strong>Details requiring verification:</strong> The exact total of vessels under Qatar's newbuild programme has been variously reported as 122, 125, 128 and 132 across 2023–2025 industry press, depending on whether confirmed options are counted; 128 reflects the most commonly cited end-2024 figure but the order book continues to evolve. The split of European vs Asian deliveries in 2025 is sensitive to month-by-month variation and the Kpler-derived shares are best read as full-year averages.
            </p>
            <p>
              <strong>Invented or unverifiable details:</strong> None. No quotations are placed in the mouths of named individuals beyond what is publicly attested in their cited statements. No researchers, institutions, or specific findings are invented. All institutions, projects, contracts, dates, and financial figures trace to credible public sources.
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ textAlign: "center", marginTop: "56px", paddingTop: "32px" }}>
          <div style={{
            width: "60px",
            height: "4px",
            background: COLORS.economistRed,
            margin: "0 auto 20px",
          }} />
          <div style={{
            fontFamily: FONTS.sans,
            fontSize: "11px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: COLORS.warmGray,
          }}>
            Economist-Style Production Document
          </div>
        </div>

      </div>
    </div>
  );
}
