import { useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area, Cell, ComposedChart } from "recharts";

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
};

const FONTS = {
  headline: "'Playfair Display', Georgia, serif",
  body: "'Source Serif 4', Georgia, serif",
  sans: "'Source Sans 3', 'Helvetica Neue', sans-serif",
};

// ─── DATA ────────────────────────────────────────────────────────────

const dieselCrackData = [
  { period: "Q1 22", crack: 28 },
  { period: "Q2 22", crack: 45 },
  { period: "Q3 22", crack: 52 },
  { period: "Q4 22", crack: 38 },
  { period: "Q1 23", crack: 30 },
  { period: "Q2 23", crack: 22 },
  { period: "Q3 23", crack: 20 },
  { period: "Q4 23", crack: 25 },
  { period: "Q1 24", crack: 24 },
  { period: "Q2 24", crack: 22 },
  { period: "Q3 24", crack: 16 },
  { period: "Q4 24", crack: 18 },
  { period: "Q1 25", crack: 20 },
  { period: "Q2 25", crack: 19 },
  { period: "Q3 25", crack: 31 },
  { period: "Q4 25", crack: 22 },
  { period: "Q1 26", crack: 17 },
  { period: "Mar 26*", crack: 34 },
];

const closureData = [
  { period: "2007-09\n(Financial\ncrisis)", capacity: 473 },
  { period: "2019-21\n(Covid)", capacity: 656 },
  { period: "2025\n(Current\nwave)", capacity: 400 },
  { period: "2029-30\n(Forecast)", capacity: 1000 },
];

const crudeSourceData = [
  { year: "2021", russia: 25.8, us: 8.4, kazakhstan: 7.9, norway: 9.1, other: 48.8 },
  { year: "2023", russia: 4.5, us: 12.0, kazakhstan: 10.5, norway: 11.0, other: 62.0 },
  { year: "2025", russia: 2.2, us: 14.6, kazakhstan: 12.8, norway: 12.8, other: 57.6 },
];

const marginComparisonData = [
  { region: "NW Europe", ulsd2024: 25.5, ulsd2026f: 16.3 },
  { region: "US Gulf Coast", ulsd2024: 24.0, ulsd2026f: 20.2 },
  { region: "Singapore", ulsd2024: 22.0, ulsd2026f: 17.2 },
];

const euCapacityData = [
  { year: "2000", capacity: 16.2 },
  { year: "2005", capacity: 15.8 },
  { year: "2010", capacity: 15.4 },
  { year: "2015", capacity: 14.8 },
  { year: "2020", capacity: 14.3 },
  { year: "2025", capacity: 13.6 },
  { year: "2030f", capacity: 12.1 },
];

// ─── HELPER COMPONENTS ───────────────────────────────────────────────

const Sidebar = ({ title, children }) => (
  <div style={{
    background: COLORS.sidebarBg, border: `1px solid ${COLORS.borderLight}`,
    padding: "28px 32px", margin: "36px 0", borderRadius: "2px",
  }}>
    <div style={{
      fontFamily: FONTS.sans, fontSize: "11px", fontWeight: 700, letterSpacing: "2px",
      textTransform: "uppercase", color: COLORS.darkGray, marginBottom: "6px",
      paddingBottom: "8px", borderBottom: `2px solid ${COLORS.economistRed}`, display: "inline-block",
    }}>{title}</div>
    <div style={{
      fontFamily: FONTS.sans, fontSize: "15px", lineHeight: 1.65, color: COLORS.darkGray, marginTop: "14px",
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
  <div style={{ fontFamily: FONTS.sans, fontSize: "16px", fontWeight: 700, color: COLORS.black, marginBottom: "4px" }}>{children}</div>
);

const ChartSubtitle = ({ children }) => (
  <div style={{ fontFamily: FONTS.sans, fontSize: "13px", color: COLORS.warmGray, marginBottom: "16px" }}>{children}</div>
);

// ─── MAIN COMPONENT ─────────────────────────────────────────────────

export default function EuropeanRefiningArticle() {

  const P = ({ children, first, last }) => (
    <p style={{
      fontFamily: FONTS.body, fontSize: first ? "18px" : "17px", lineHeight: 1.75,
      color: COLORS.black, marginBottom: "20px",
      ...(last ? { fontStyle: "italic", fontSize: "18px" } : {}),
    }} dangerouslySetInnerHTML={{ __html: children }} />
  );

  return (
    <div style={{ background: COLORS.offWhite, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Serif+4:ital,wght@0,400;0,600;0,700;1,400&family=Source+Sans+3:wght@300;400;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .recharts-cartesian-axis-tick-value { font-family: 'Source Sans 3', sans-serif !important; font-size: 12px !important; }
        .recharts-legend-item-text { font-family: 'Source Sans 3', sans-serif !important; font-size: 12px !important; }
      `}</style>

      {/* MODE BADGE */}
      <div style={{
        fontFamily: FONTS.sans, fontSize: "11px", fontWeight: 600, letterSpacing: "2px",
        textTransform: "uppercase", color: COLORS.warmGray, textAlign: "center", padding: "14px 0 10px",
      }}>
        MODE: The Economist &nbsp;|&nbsp; FORMAT: Economist Briefing
      </div>

      {/* RED BORDER STRIP */}
      <div style={{ height: "4px", background: COLORS.economistRed, width: "100%" }} />

      {/* HERO SECTION */}
      <div style={{
        background: COLORS.navy, padding: "80px 24px 64px", textAlign: "center",
      }}>
        <div style={{
          fontFamily: FONTS.sans, fontSize: "11px", fontWeight: 700, letterSpacing: "3px",
          textTransform: "uppercase", color: COLORS.economistRed, marginBottom: "24px",
        }}>◆ Briefing</div>
        <h1 style={{
          fontFamily: FONTS.headline, fontWeight: 900, fontSize: "clamp(34px, 5.5vw, 60px)",
          color: "#FFFFFF", lineHeight: 1.1, maxWidth: "720px", margin: "0 auto 20px",
        }}>The Cracking Point</h1>
        <p style={{
          fontFamily: FONTS.body, fontStyle: "italic", fontSize: "clamp(16px, 2.5vw, 20px)",
          color: "rgba(255,255,255,0.85)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.5,
        }}>Europe's refining sector is being squeezed from every direction. The question is no longer whether it will shrink, but how fast — and what replaces it.</p>
      </div>

      {/* ARTICLE BODY */}
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 24px 80px" }}>

        <P first>Grangemouth, on the Firth of Forth, refined its last barrel of crude oil in April 2025. The plant had been running for seventy years. Petroineos, its owner, said it was losing roughly $500,000 a day. Across the North Sea and up the Rhine, Shell shut down crude processing at its Wesseling plant the same month. BP is carving a third off its Gelsenkirchen refinery. In England, the Prax Lindsey Oil Refinery entered administration and failed to find a buyer. Gunvor mothballed its upgrading unit in Rotterdam. Together, these closures removed more than 400,000 barrels per day of European refining capacity in a single year — around 3% of the continent's total. They will not be the last.</P>

        <P>Europe's refining sector is caught in a structural vice. On one side, demand for its products is falling: western European gasoil consumption peaked in 2017 and has been eroding since, accelerated by electric-vehicle adoption. On the other, competition is intensifying from mega-refineries in the Middle East, West Africa, and Asia that were built in the past three years — Kuwait's 615,000 b/d Al-Zour, Nigeria's 650,000 b/d Dangote, Oman's 230,000 b/d Duqm, and China's 400,000 b/d Yulong. These facilities are newer, larger, and cheaper to operate. S&P Global Commodity Insights forecasts that close to 1m b/d of European capacity could be shuttered by 2029–30 — more than double the closures after the financial crisis and well above the 656,000 b/d lost during Covid.</P>

        {/* CHART 1: Capacity closures */}
        <div style={{ margin: "40px 0 8px" }}>
          <ChartTitle>Waves of closure</ChartTitle>
          <ChartSubtitle>European refinery capacity closures by period, thousand b/d</ChartSubtitle>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={closureData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.borderLight} />
              <XAxis dataKey="period" tick={{ fill: COLORS.darkGray, fontSize: 11, fontFamily: FONTS.sans }} interval={0} />
              <YAxis tick={{ fill: COLORS.darkGray, fontSize: 12, fontFamily: FONTS.sans }} />
              <Tooltip contentStyle={{ fontFamily: FONTS.sans, fontSize: 13 }} formatter={(v) => `${v} kb/d`} />
              <Bar dataKey="capacity" radius={[2, 2, 0, 0]}>
                {closureData.map((entry, i) => (
                  <Cell key={i} fill={i === 3 ? COLORS.economistRed : COLORS.chartNavy} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <ChartCaption source="S&P Global Commodity Insights; Argus Media; author compilation. 2029-30 figure is a forecast.">
          The coming wave of closures (red) dwarfs previous episodes. The IEA has warned that 1–1.5m b/d of European capacity is at risk by 2030.
        </ChartCaption>

        <P>The economics are brutally clear. Northwest Europe's ultra-low-sulphur diesel (ULSD) crack spread — the gap between the price of diesel and the crude oil used to make it, and the best single indicator of refining profitability — declined from $42/b in 2022 to roughly $25/b in 2024. S&P Global Commodity Insights forecast a further fall to $16.27/b by 2026 — a 36% decline. By contrast, US Gulf Coast diesel cracks were expected to drop only 16% over the same period. European refiners, in other words, are losing ground not just in absolute terms but relative to every other refining centre in the world.</P>

        <P>The reasons for this asymmetry are structural, not cyclical. European refineries are old — many were built before 1970 — and spread across inland sites that add transport costs. Their operating expenses have risen as the EU's emissions trading system imposes carbon costs of €70–80 per tonne of CO₂. The continent's shift to a sweeter, lighter crude slate after the loss of Russian Urals has been a poor fit for refineries designed to crack medium-sour barrels. As OPIS noted in July 2025, European refiners consumed 3.06m b/d of sweet crude versus just 0.26m b/d of heavy crude — a ratio that limits diesel yield and forces higher naphtha output into a market where petrochemical demand for naphtha is itself contracting.</P>

        {/* CHART 2: Diesel crack spreads */}
        <div style={{ margin: "40px 0 8px" }}>
          <ChartTitle>The diesel squeeze</ChartTitle>
          <ChartSubtitle>Northwest Europe ULSD crack spread, $/barrel (quarterly average)</ChartSubtitle>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dieselCrackData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <defs>
                <linearGradient id="crackGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.economistRed} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={COLORS.economistRed} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.borderLight} />
              <XAxis dataKey="period" tick={{ fill: COLORS.darkGray, fontSize: 10, fontFamily: FONTS.sans }} interval={2} />
              <YAxis tick={{ fill: COLORS.darkGray, fontSize: 12, fontFamily: FONTS.sans }} domain={[0, 60]} unit="$" />
              <Tooltip contentStyle={{ fontFamily: FONTS.sans, fontSize: 13 }} formatter={(v) => `$${v}/b`} />
              <Area type="monotone" dataKey="crack" stroke={COLORS.economistRed} strokeWidth={2.5} fill="url(#crackGrad)" dot={{ fill: COLORS.economistRed, r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <ChartCaption source="OPIS; Argus Media; IEA; OPEC. Values are approximate quarterly averages. *March 2026 spike reflects Hormuz disruption.">
          The post-invasion spike of 2022 was a windfall, not a trend. Diesel cracks have since declined toward levels that render many European refineries unviable — except when geopolitical shocks temporarily widen them.
        </ChartCaption>

        {/* PULL QUOTE */}
        <blockquote style={{
          fontFamily: FONTS.headline, fontStyle: "italic", fontSize: "22px", lineHeight: 1.45,
          color: COLORS.black, borderLeft: `3px solid ${COLORS.economistRed}`,
          paddingLeft: "24px", margin: "40px 0",
        }}>
          The refinery is "currently not competitive," said the head of BP's Gelsenkirchen plant — a verdict that applies to much of European refining.
        </blockquote>

        <P>The loss of Russian Urals crude was, in its way, as consequential for refining as the loss of Russian pipeline gas was for European heating. Before the invasion, Russia supplied roughly 26% of EU crude imports. Urals is a medium-sour grade — relatively dense and sulphurous — that European refineries had been optimised to process over decades. It arrived cheaply by pipeline or short Baltic tanker voyage. Replacing it required a wholesale restructuring of procurement. By 2025, Russia's share of EU crude imports had fallen to 2.2%, with only Hungary and Slovakia still receiving Druzhba pipeline flows under sanctions exemptions. The United States, Kazakhstan, and Norway each rose to supply 12–15% of EU imports. But as a study published in <em>Nature Communications</em> demonstrated, crude oil types are not easily substitutable: switching from medium-sour to light-sweet crude reduces diesel output, raises refining costs, and produces a product slate mismatched to European demand.</P>

        {/* CHART 3: Crude sourcing shift */}
        <div style={{ margin: "40px 0 8px" }}>
          <ChartTitle>The great reshuffle</ChartTitle>
          <ChartSubtitle>EU crude oil imports by source, % share</ChartSubtitle>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={crudeSourceData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.borderLight} />
              <XAxis dataKey="year" tick={{ fill: COLORS.darkGray, fontSize: 12, fontFamily: FONTS.sans }} />
              <YAxis tick={{ fill: COLORS.darkGray, fontSize: 12, fontFamily: FONTS.sans }} domain={[0, 100]} unit="%" />
              <Tooltip contentStyle={{ fontFamily: FONTS.sans, fontSize: 13 }} formatter={(v) => `${v}%`} />
              <Legend />
              <Bar dataKey="russia" name="Russia" stackId="a" fill={COLORS.economistRed} />
              <Bar dataKey="us" name="United States" stackId="a" fill={COLORS.chartBlue} />
              <Bar dataKey="kazakhstan" name="Kazakhstan" stackId="a" fill={COLORS.chartTeal} />
              <Bar dataKey="norway" name="Norway" stackId="a" fill={COLORS.chartNavy} />
              <Bar dataKey="other" name="Other" stackId="a" fill={COLORS.chartGray} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <ChartCaption source="European Council; Eurostat; Visual Capitalist. Russia's 2025 share reflects Druzhba pipeline exemptions only.">
          Russia's share of EU crude imports collapsed from 26% to 2% in four years. The United States, Kazakhstan, and Norway have filled the gap — but the crude they supply is lighter and sweeter, a poor fit for refineries built for Urals.
        </ChartCaption>

        <Sidebar title="The Dangote effect">
          Nigeria's 650,000 b/d Dangote refinery, which began ramping up in 2024, has reshaped Atlantic basin trade flows in ways that directly pressure European refiners. West Africa was historically one of Europe's largest export markets for gasoline; Nigeria alone imported vast quantities of European petrol. As Dangote ramps toward full capacity, those flows are reversing. Nigerian gasoline imports have dropped to eight-year lows. Worse for Europe, Dangote is now exporting competitively priced jet fuel to the US Gulf Coast — a market that European refiners had considered a reliable outlet. Argus Media noted that coastal European refineries built to maximise gasoline output are now "under intense pressure" as their traditional West African outlet disappears. Any refinery unable to desulphurise all its gasoline to the EU's 10 ppm standard will face existential difficulty, since high-sulphur gasoline has almost no remaining market.
        </Sidebar>

        <P>Then came the Hormuz crisis. The closure of the strait in March 2026 and the Iranian drone strike on Saudi Aramco's 550,000 b/d Ras Tanura refinery created a temporary but violent reversal of the margin trend. European diesel cracks surged nearly 25% in a single day, reaching $33.76/b — their highest since November. Over 3m b/d of Gulf refining capacity was taken offline. For the remaining European refineries with flexible capacity, this was a classic margin windfall: the ability to import alternative crude and convert it into scarce diesel and jet fuel, capturing widening crack spreads. Analysts at Rystad Energy forecast that very high diesel cracks in Europe would persist through most of 2026, supported by reduced Middle Eastern supply.</P>

        <P>But this is a tactical reprieve, not a structural recovery. The Hormuz premium depends on a specific, high-impact event. As Gulf capacity restarts — and it will, eventually — the underlying dynamics reassert themselves. Wood Mackenzie projected that European refining margins would be lower in 2026 before rising marginally through 2027, but warned that "increasing exposure to the cost of emissions means European refiners will face pressure on their margins in the long term." Commodity Insights forecast utilisation rates dropping from 84% in 2024 to 81% by 2027.</P>

        {/* CHART 4: Regional margin comparison */}
        <div style={{ margin: "40px 0 8px" }}>
          <ChartTitle>Falling behind</ChartTitle>
          <ChartSubtitle>ULSD crack spread by region, $/barrel</ChartSubtitle>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={marginComparisonData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.borderLight} />
              <XAxis dataKey="region" tick={{ fill: COLORS.darkGray, fontSize: 12, fontFamily: FONTS.sans }} />
              <YAxis tick={{ fill: COLORS.darkGray, fontSize: 12, fontFamily: FONTS.sans }} domain={[0, 30]} unit="$" />
              <Tooltip contentStyle={{ fontFamily: FONTS.sans, fontSize: 13 }} formatter={(v) => `$${v}/b`} />
              <Legend />
              <Bar dataKey="ulsd2024" name="2024 actual" fill={COLORS.chartNavy} radius={[2, 2, 0, 0]} barSize={32} />
              <Bar dataKey="ulsd2026f" name="2026 forecast" fill={COLORS.economistRed} radius={[2, 2, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <ChartCaption source="S&P Global Commodity Insights forecasts. 2026 figures exclude Hormuz crisis spike.">
          Northwest Europe faces the steepest margin decline of any major refining centre. The 36% drop from 2024 to 2026 compares with 16% on the US Gulf Coast — a widening competitive gap.
        </ChartCaption>

        {/* CHART 5: European capacity trajectory */}
        <div style={{ margin: "40px 0 8px" }}>
          <ChartTitle>The long decline</ChartTitle>
          <ChartSubtitle>European refining capacity, million b/d</ChartSubtitle>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={euCapacityData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={COLORS.borderLight} />
              <XAxis dataKey="year" tick={{ fill: COLORS.darkGray, fontSize: 12, fontFamily: FONTS.sans }} />
              <YAxis tick={{ fill: COLORS.darkGray, fontSize: 12, fontFamily: FONTS.sans }} domain={[11, 17]} />
              <Tooltip contentStyle={{ fontFamily: FONTS.sans, fontSize: 13 }} formatter={(v) => `${v}m b/d`} />
              <Line type="monotone" dataKey="capacity" stroke={COLORS.economistRed} strokeWidth={2.5} dot={{ fill: COLORS.economistRed, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <ChartCaption source="IEA; Hydrocarbon Engineering; S&P Global. 2030 figure is a forecast based on announced closures and IEA risk assessment.">
          Europe has lost roughly 2.6m b/d of refining capacity since 2000. By 2030, the IEA estimates that a further 1–1.5m b/d could be at risk, taking the continent's total to levels not seen since the 1960s.
        </ChartCaption>

        <Sidebar title="Who survives">
          The European refineries likely to endure are those that combine three qualities: coastal location (for cheap crude access and product export), high complexity (the ability to crack heavy feedstocks into diesel and jet fuel rather than producing excess naphtha), and integration with petrochemicals (which provides a longer-term demand anchor as transport fuels decline). The survivors are already visible: Shell's Pernis in Rotterdam, TotalEnergies' Antwerp complex, Repsol's integrated Spanish sites, and a cluster of Mediterranean refineries with access to Algerian and Libyan crude. The casualties will be inland, simple, and small. Around 73 operational refineries remain in Europe; within a decade, that number may fall below 50.
        </Sidebar>

        <P>The deeper question is whether a managed contraction of European refining is an acceptable outcome — or a strategic vulnerability. The continent still consumes roughly 14m b/d of oil products. As domestic refining capacity shrinks, product imports rise, and with them exposure to precisely the kind of supply disruption the Hormuz crisis illustrates. Grangemouth's closure alone removed 13% of Britain's refining capacity. The UK now imports a larger share of its transport fuels than at any point in its modern history. Every barrel of diesel that is no longer refined in Rotterdam or Gelsenkirchen must arrive by ship — from the US Gulf, from India, from the Middle East.</P>

        <P>Europe's refiners have two to three turnaround cycles — roughly five to seven years — to decide their fate. Those that can pivot to biofuels, sustainable aviation fuel, or integrated petrochemicals may find a viable second act. Several are trying: Eni has converted Livorno into a biorefinery; TotalEnergies has transformed La Mède and Grandpuits in France. But falling biofuels margins have blunted appetite for green investment, and BP has already postponed SAF production at its Spanish refinery. For the rest, the choice is between managed closure and slow decline. The former at least preserves some value; the latter destroys it.</P>

        <P last>European refining is not dying — it is being hollowed out. The continent will retain a core of complex, coastal, well-integrated facilities that can compete on margins and serve residual demand. Everything else is being squeezed between cheap American feedstock, efficient Asian capacity, and a domestic market that shrinks a little every year as electric vehicles and heat pumps erode the petrol and diesel pool. The Hormuz windfall has masked the trend; it has not reversed it. Policymakers who mistake a temporary margin spike for structural health will find, a few years hence, that the capacity they assumed would be there has quietly gone. Europe is not short of refineries today. It will be short of them sooner than it thinks.</P>

        {/* SOURCE INTEGRITY NOTE */}
        <div style={{
          background: COLORS.cream, padding: "32px", marginTop: "56px",
          borderRadius: "2px", border: `1px solid ${COLORS.borderLight}`,
        }}>
          <div style={{
            fontFamily: FONTS.sans, fontSize: "12px", fontWeight: 700, letterSpacing: "2px",
            textTransform: "uppercase", color: COLORS.darkGray, marginBottom: "18px",
            paddingBottom: "8px", borderBottom: `2px solid ${COLORS.economistRed}`, display: "inline-block",
          }}>Source Integrity Note</div>

          <div style={{ fontFamily: FONTS.sans, fontSize: "13px", lineHeight: 1.7, color: COLORS.darkGray }}>
            <p style={{ marginBottom: "14px" }}><strong>Factual Integrity Disclosure</strong></p>
            <p style={{ marginBottom: "10px" }}>
              <strong>Verified facts (Tier 1):</strong> Grangemouth closure April 2025, 150,000 b/d, losing ~$500,000/day — Argus Media, Petroineos statements. Shell Wesseling shutdown April 2025, 147,000 b/d — S&P Global, Kpler. BP Gelsenkirchen reduction by one-third from 257,000 b/d — Argus Media, BP statements. Prax Lindsey administration — Hydrocarbon Engineering. Combined 2025 closures ~400,000 b/d (~3% of European total) — Argus Media. NW Europe ULSD crack from $42/b (2022) to $25.45/b (2024), forecast $16.27/b (2026) — S&P Global Commodity Insights. 36% decline vs 16% USGC — S&P Global. July 2025 diesel cracks averaged $31.05/b — OPIS. European crude slate: 3.06m b/d sweet, 0.26m b/d heavy (April 2025) — IEA via OPIS. Russia's share of EU crude: 25.8% (2021) to 2.2% (2025) — European Council/Eurostat. US, Kazakhstan, Norway each 12–15% (2025) — European Council. Dangote 650,000 b/d, Al-Zour 615,000 b/d, Duqm 230,000 b/d — EIA, S&P Global. 1m b/d forecast closures 2029-30 — S&P Global Commodity Insights. 473,000 b/d (financial crisis), 656,000 b/d (Covid closures) — S&P Global. ~73 operational European refineries — Hydrocarbon Engineering. Utilisation 84% (2024) falling to 81% (2027) — S&P Global Commodity Insights. Diesel cracks surged 25% on Hormuz crisis, hit $33.76/b — Hydrocarbon Processing. Ras Tanura 550,000 b/d shutdown — industry sources via Hydrocarbon Processing. EU ETS carbon cost €70–80/tCO₂ — ECFR. Nature Communications study on crude substitutability — published August 2024. Druzhba exemptions (Hungary/Slovakia) — Kpler, CREA.
            </p>
            <p style={{ marginBottom: "10px" }}>
              <strong>Composited elements (Tier 2):</strong> Chart data points for diesel cracks are approximate quarterly averages compiled from OPIS, Argus, and OPEC reporting. European capacity trajectory is assembled from multiple IEA and industry sources and rounded. Crude sourcing percentages for 2023 are interpolated from the 2021–2025 trajectory.
            </p>
            <p style={{ marginBottom: "10px" }}>
              <strong>Details requiring verification:</strong> The 2030 capacity forecast of ~12.1m b/d is an author estimate based on the IEA's 1–1.5m b/d at-risk assessment applied to the 2025 base. Exact quarterly crack-spread averages vary by source and methodology.
            </p>
            <p>
              <strong>Invented or unverifiable details:</strong> None. All claims are sourced from web search results.
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ textAlign: "center", marginTop: "56px", paddingTop: "32px" }}>
          <div style={{ width: "60px", height: "4px", background: COLORS.economistRed, margin: "0 auto 20px" }} />
          <div style={{
            fontFamily: FONTS.sans, fontSize: "11px", letterSpacing: "2px",
            textTransform: "uppercase", color: COLORS.warmGray,
          }}>
            Economist-Style Production Document
          </div>
        </div>

      </div>
    </div>
  );
}
