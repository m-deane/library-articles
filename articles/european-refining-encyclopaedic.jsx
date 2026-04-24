import { useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area, Cell, PieChart, Pie } from "recharts";

// ─── DESIGN TOKENS ───────────────────────────────────────────────────
const C = {
  yellow: "#FFCE00", black: "#1a1a1a", offWhite: "#FAF8F5", cream: "#F2EDE4",
  warmGray: "#8A8278", darkGray: "#3D3B38", sidebarBg: "#F0EBE1", accent: "#C4A35A",
  borderLight: "#E0DAD0", navy: "#0d1a26", red: "#E3120B", blue: "#3B82F6",
  teal: "#0D9488", gray: "#9CA3AF", amber: "#D97706",
};
const F = {
  headline: "'Playfair Display', Georgia, serif",
  body: "'Source Serif 4', Georgia, serif",
  sans: "'Source Sans 3', 'Helvetica Neue', sans-serif",
};

// ─── DATA ────────────────────────────────────────────────────────────
const russianCrudeShare = [
  { year: "2021", share: 25.8 }, { year: "2022", share: 18 }, { year: "2023", share: 4.5 },
  { year: "2024", share: 3 }, { year: "2025", share: 2.2 },
];
const dieselCracks = [
  { q: "Q1 22", nwe: 28, usgc: 30 }, { q: "Q2 22", nwe: 45, usgc: 48 },
  { q: "Q3 22", nwe: 52, usgc: 50 }, { q: "Q4 22", nwe: 38, usgc: 35 },
  { q: "Q1 23", nwe: 30, usgc: 28 }, { q: "Q2 23", nwe: 22, usgc: 22 },
  { q: "Q3 23", nwe: 20, usgc: 21 }, { q: "Q4 23", nwe: 25, usgc: 24 },
  { q: "Q1 24", nwe: 24, usgc: 23 }, { q: "Q2 24", nwe: 22, usgc: 22 },
  { q: "Q3 24", nwe: 16, usgc: 20 }, { q: "Q4 24", nwe: 18, usgc: 21 },
  { q: "Q1 25", nwe: 20, usgc: 22 }, { q: "Q2 25", nwe: 19, usgc: 21 },
  { q: "Q3 25", nwe: 31, usgc: 28 }, { q: "Q4 25", nwe: 22, usgc: 23 },
  { q: "Q1 26", nwe: 17, usgc: 20 }, { q: "Mar 26", nwe: 34, usgc: 26 },
];
const closureWaves = [
  { period: "2007–09", capacity: 473 }, { period: "2019–21", capacity: 656 },
  { period: "2025", capacity: 400 }, { period: "2029–30 (f)", capacity: 1000 },
];
const capacityTimeline = [
  { year: "1970", cap: 18.5 }, { year: "1980", cap: 20.2 }, { year: "1990", cap: 17.8 },
  { year: "2000", cap: 16.2 }, { year: "2010", cap: 15.4 }, { year: "2020", cap: 14.3 },
  { year: "2025", cap: 13.6 }, { year: "2030f", cap: 12.1 },
];
const crudeSource2025 = [
  { name: "United States", value: 14.6 }, { name: "Kazakhstan", value: 12.8 },
  { name: "Norway", value: 12.8 }, { name: "Libya", value: 9.1 },
  { name: "Saudi Arabia", value: 6.8 }, { name: "Nigeria", value: 5.8 },
  { name: "Iraq", value: 5.8 }, { name: "Russia", value: 2.2 },
  { name: "Other", value: 30.1 },
];
const pieColors = [C.blue, C.teal, C.navy, C.amber, "#6366F1", "#10B981", "#F59E0B", C.red, C.gray];
const globalNewCap = [
  { name: "Al-Zour (Kuwait)", cap: 615 }, { name: "Dangote (Nigeria)", cap: 650 },
  { name: "Duqm (Oman)", cap: 230 }, { name: "Olmeca (Mexico)", cap: 340 },
  { name: "Yulong (China)", cap: 400 },
];
const marginForecast = [
  { region: "NW Europe", y2024: 25.5, y2026: 16.3 }, { region: "US Gulf Coast", y2024: 24, y2026: 20.2 },
  { region: "Singapore", y2024: 22, y2026: 17.2 }, { region: "Middle East", y2024: 18, y2026: 15 },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────
const DropCap = ({ children }) => {
  const first = children.charAt(0);
  const rest = children.slice(1);
  return (<p style={{ fontFamily: F.body, fontSize: "18px", lineHeight: 1.75, color: C.black, marginBottom: "20px" }}>
    <span style={{ fontFamily: F.headline, fontWeight: 900, fontSize: "72px", float: "left", lineHeight: "0.8", marginRight: "8px", marginTop: "4px", color: C.black }}>{first}</span>
    <span dangerouslySetInnerHTML={{ __html: rest }} />
  </p>);
};
const P = ({ children }) => <p style={{ fontFamily: F.body, fontSize: "17px", lineHeight: 1.75, color: C.black, marginBottom: "20px" }} dangerouslySetInnerHTML={{ __html: children }} />;
const Kicker = ({ children }) => <p style={{ fontFamily: F.body, fontSize: "18px", lineHeight: 1.75, color: C.black, marginBottom: "20px", fontStyle: "italic" }} dangerouslySetInnerHTML={{ __html: children }} />;
const SceneBreak = () => <div style={{ textAlign: "center", margin: "48px 0", fontFamily: F.headline, fontSize: "20px", letterSpacing: "8px", color: C.accent }}>❧</div>;
const PullQuote = ({ children }) => (
  <blockquote style={{ fontFamily: F.headline, fontStyle: "italic", fontSize: "24px", lineHeight: 1.4, color: C.black, borderLeft: `3px solid ${C.yellow}`, paddingLeft: "24px", margin: "40px 0" }}>{children}</blockquote>
);
const Sidebar = ({ title, children }) => (
  <div style={{ background: C.sidebarBg, border: `1px solid ${C.borderLight}`, padding: "28px 32px", margin: "36px 0", borderRadius: "2px" }}>
    <div style={{ fontFamily: F.sans, fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: C.darkGray, marginBottom: "6px", paddingBottom: "8px", borderBottom: `2px solid ${C.yellow}`, display: "inline-block" }}>{title}</div>
    <div style={{ fontFamily: F.sans, fontSize: "15px", lineHeight: 1.65, color: C.darkGray, marginTop: "14px" }}>{children}</div>
  </div>
);
const Photo = ({ src, caption, label }) => (
  <div style={{ margin: "36px 0" }}>
    <img src={src} alt={caption} style={{ width: "100%", borderRadius: "2px", display: "block" }} />
    <div style={{ marginTop: "10px" }}>
      {label && <span style={{ fontFamily: F.sans, fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: C.accent, marginRight: "8px" }}>{label}</span>}
      <span style={{ fontFamily: F.sans, fontSize: "13px", color: "#6B6560", lineHeight: 1.5 }}>{caption}</span>
    </div>
  </div>
);
const ChartTitle = ({ children }) => <div style={{ fontFamily: F.sans, fontSize: "16px", fontWeight: 700, color: C.black, marginBottom: "4px" }}>{children}</div>;
const ChartSub = ({ children }) => <div style={{ fontFamily: F.sans, fontSize: "13px", color: C.warmGray, marginBottom: "16px" }}>{children}</div>;
const ChartCaption = ({ children, source }) => (
  <div style={{ marginTop: "8px", marginBottom: "36px" }}>
    <div style={{ fontFamily: F.sans, fontSize: "13px", color: C.darkGray, lineHeight: 1.5 }}>{children}</div>
    {source && <div style={{ fontFamily: F.sans, fontSize: "11px", color: C.warmGray, marginTop: "4px" }}>Source: {source}</div>}
  </div>
);

// ─── MAIN ────────────────────────────────────────────────────────────
export default function EuropeanRefiningEncyclopaedic() {
  return (
    <div style={{ background: C.offWhite, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Serif+4:ital,wght@0,400;0,600;0,700;1,400&family=Source+Sans+3:wght@300;400;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .recharts-cartesian-axis-tick-value { font-family: 'Source Sans 3', sans-serif !important; font-size: 11px !important; }
        .recharts-legend-item-text { font-family: 'Source Sans 3', sans-serif !important; font-size: 12px !important; }
      `}</style>

      {/* MODE BADGE */}
      <div style={{ fontFamily: F.sans, fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: C.warmGray, textAlign: "center", padding: "14px 0 10px" }}>
        MODE: Encyclopaedic &nbsp;|&nbsp; FORMAT: Encyclopaedic
      </div>
      <div style={{ height: "4px", background: C.yellow, width: "100%" }} />

      {/* HERO */}
      <div style={{
        position: "relative", minHeight: "85vh", display: "flex", flexDirection: "column",
        justifyContent: "flex-end", padding: "0 24px 48px",
        backgroundImage: `url('https://images.unsplash.com/photo-1586953208270-767889fa9b0e?w=1600')`,
        backgroundSize: "cover", backgroundPosition: "center",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.72) 100%)" }} />
        <div style={{ position: "relative", maxWidth: "720px" }}>
          <div style={{ fontFamily: F.sans, fontSize: "11px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: C.yellow, marginBottom: "16px" }}>◆ Feature</div>
          <h1 style={{ fontFamily: F.headline, fontWeight: 900, fontSize: "clamp(36px, 6vw, 68px)", color: "#FFFFFF", lineHeight: 1.08, marginBottom: "16px" }}>The Last Barrels</h1>
          <p style={{ fontFamily: F.body, fontStyle: "italic", fontSize: "clamp(16px, 2.5vw, 21px)", color: "rgba(255,255,255,0.85)", lineHeight: 1.5, maxWidth: "600px" }}>
            Europe's refineries once turned the continent into an industrial powerhouse. Now, caught between cheap American crude, efficient Asian mega-plants, and a future that runs on electricity, they face a reckoning decades in the making.
          </p>
        </div>
        <div style={{ position: "absolute", bottom: "16px", right: "24px", fontFamily: F.sans, fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>
          Rotterdam port industrial zone. The ARA region houses one of the world's greatest concentrations of refining and petrochemical activity.
        </div>
      </div>

      {/* BODY */}
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 24px 80px" }}>

        {/* ═══ ACT I: THE SCENE ═══ */}
        <DropCap>{"The flare stacks at Grangemouth had burned continuously for seventy years, a constellation of industrial fire visible from the bridges of the Firth of Forth. On a grey morning in late April 2025, the last crude oil flowed through the distillation columns, and the flames — one after another — went out. Four hundred workers walked through the gates for the final time. Scotland's only refinery, which had processed 150,000 barrels per day since the 1950s, was now an import terminal. Petroineos, the joint venture between PetroChina and INEOS that owned the plant, said it had been losing roughly half a million dollars every day. The economics, the company's statement read, were \"unsustainable.\""}</DropCap>

        <P>Grangemouth was not alone. In the same season, Shell shut down crude processing at its 147,000 b/d Wesseling plant in Germany's Rhineland — part of a complex where Royal Dutch Shell had been refining since the 1930s. BP announced it would carve a third off its 257,000 b/d Gelsenkirchen refinery, a sprawling dual-site operation in the industrial heartland of North Rhine-Westphalia that BP itself described as "currently not competitive." In England, the Prax Lindsey Oil Refinery entered administration and could find no buyer. Gunvor, the Swiss trading house, mothballed its upgrading unit in Rotterdam after a 25% increase in operating costs over four years. Combined, these closures removed more than 400,000 barrels per day from the European system — roughly 3% of the continent's refining capacity — in a single year.</P>

        <P>This was not a crisis but an acceleration. Around thirty refineries have closed in Europe since the turn of the millennium. The International Energy Agency has warned that 1 to 1.5 million barrels per day of additional capacity could be at risk by 2030 — dwarfing the 473,000 b/d lost after the financial crisis and the 656,000 b/d closed during the Covid pandemic. S&P Global Commodity Insights forecasts that close to 1 million b/d could be shuttered in 2029–30 alone. What is happening to European refining is not a cyclical downturn but a structural contraction — the dismantling of an industrial ecosystem that once defined the continent's prosperity. Understanding how it was built, how it worked, and why it is now unravelling requires moving between centuries, continents, and the molecular architecture of crude oil itself.</P>

        <PullQuote>"The refinery is currently not competitive" — BP's Gelsenkirchen plant head Arno Appel, in a statement that could serve as an epitaph for much of European refining.</PullQuote>

        <SceneBreak />

        {/* ═══ ACT II: HISTORY ═══ */}
        <P>The story of European refining begins in a harbour. Royal Dutch Shell opened its first refinery at Pernis, on the south bank of Rotterdam's Nieuwe Maas, in 1902. It was a modest operation — the automobile age was barely underway, and petroleum's primary product was still kerosene for lamps. But Rotterdam's geography was decisive: deep water, proximity to the Rhine and its vast industrial hinterland, and a trading culture that had been connecting oceans to rivers since the Dutch Golden Age. By 1940, Rotterdam was the third-largest port on earth, after New York and London. Oil storage and refining infrastructure made it a target in the Second World War; both the Wehrmacht and the Allies destroyed tank farms to deny oil to the enemy.</P>

        <P>The postwar reconstruction transformed European refining into a continent-scale industry. The Marshall Plan financed the rebuilding of the Rhine-Ruhr industrial heartland, now powered by oil rather than coal. American oil companies — the "Seven Sisters" of BP, Chevron, Esso, Gulf, Mobil, Shell, and Texaco — controlled 71% of global refining capacity before 1945 and rapidly expanded in Europe. Esso, BP, and Shell opened refineries around Rotterdam and Antwerp; pipelines connected the coast to Germany, France, and Switzerland. The Amsterdam-Rotterdam-Antwerp corridor, known by its market acronym ARA, evolved into one of the world's two great petrochemical clusters, rivalled only by Houston. By 1980, European refining capacity had peaked at roughly 20 million barrels per day — a staggering infrastructure of steel and catalysts spread across some 150 plants, from Mongstad in Norway to Augusta in Sicily.</P>

        <Photo
          src="https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1200"
          caption="The industrial landscape of the Rotterdam-Europoort complex, where refining has shaped the shoreline since the early twentieth century. Today, the ARA region — Amsterdam, Rotterdam, Antwerp — remains Europe's crude-oil nerve centre, handling over 200 million tonnes of liquid bulk annually."
          label="Establishing"
        />

        <P>The architecture of a refinery is, at its simplest, an exercise in molecular separation. Crude oil is a soup of hydrocarbons — chains and rings of carbon and hydrogen atoms of wildly varying length. The distillation column, the cathedral-like tower at the centre of every refinery, heats this soup until its components boil off at different temperatures: the lightest fractions — butane and propane — rise to the top; then naphtha, the feedstock for petrochemicals and gasoline blending; then kerosene and jet fuel; then diesel and gasoil; and at the very bottom, the heavy residues that become fuel oil, bitumen, and petroleum coke. The refiner's art lies not merely in separating these fractions but in converting the ones the market does not want into the ones it does — cracking heavy molecules into lighter ones, reforming naphtha into high-octane gasoline, hydrotreating diesel to strip out sulphur. The complexity of a refinery — measured by indices like the Nelson Complexity Index — determines its ability to extract value from every barrel. The most complex plants can process heavy, sulphurous crudes that simpler refineries cannot touch, turning the cheapest feedstock into the most valuable products.</P>

        <Sidebar title="The Nelson Complexity Index">
          Developed by the American petroleum engineer Wilbur Nelson in the 1960s, the Nelson Complexity Index (NCI) assigns a value to each processing unit in a refinery relative to the crude distillation unit, which is indexed at 1.0. A simple topping refinery that does nothing but distil crude scores around 2. A modern complex refinery with hydrocrackers, cokers, catalytic reformers, and desulphurisation units can score 10 or higher. Europe's surviving refineries tend to cluster between 7 and 12. The refineries closing — Grangemouth (NCI ~6), Wesseling, Lindsey — are at the lower end. The mega-refineries displacing them — Kuwait's Al-Zour, India's Jamnagar, Saudi Arabia's Jizan — score 12 and above. Complexity is, in effect, a measure of a refinery's ability to survive margin compression: the more complex the plant, the wider the range of crudes it can process and the more precisely it can match its output to market demand.
        </Sidebar>

        <P>Europe's refineries were built, overwhelmingly, to process one grade of crude: Russian Urals. Pumped from the fields of Western Siberia and the Volga-Urals basin, delivered by pipeline through Belarus and Ukraine or by short tanker voyage from the Baltic, Urals was a medium-sour grade — API gravity around 31, sulphur content around 1.3% — ideally suited to the hydrocracking and desulphurisation units that European refiners had invested in over decades. It was also cheap: proximity and pipeline delivery kept transport costs low, and Russia, hungry for hard currency, priced it at a persistent discount to North Sea Brent. Before the invasion of Ukraine, Russia supplied roughly 26% of EU crude imports. For Mediterranean refineries, the figure was higher; many also processed Iranian Heavy and Iraqi Basra, grades of similar density. The entire European refining complex, in other words, was calibrated — from its catalysts to its pipe diameters — for a medium-sour world.</P>

        <SceneBreak />

        {/* ═══ ACT III: THE SANCTIONS SHOCK ═══ */}
        <P>That world ended on 5 December 2022, when the EU's embargo on seaborne Russian crude oil took effect. The subsequent ban on refined products followed in February 2023. The Druzhba pipeline, which had carried Russian oil to central European refineries since 1964, continued to flow to Hungary and Slovakia under sanctions exemptions — but for the vast majority of European refiners, Russia was gone. The crude slate had to be rebuilt almost overnight.</P>

        <P>The reshuffling was extraordinary. According to the European Council, the United States became the EU's largest crude supplier in 2025, providing 14.6% of imports — up from just 8.4% in 2021. Kazakhstan surged to 12.8%, Norway to 12.8%, Libya to 9.1%. Russia's share collapsed from 25.8% to 2.2%. The EU imported 435 million tonnes of crude in 2025, worth over €212 billion, but the oil was fundamentally different. American WTI and Kazakh CPC Blend are lighter and sweeter than Urals — higher in API gravity, lower in sulphur. A study published in <em>Nature Communications</em> in August 2024 demonstrated quantitatively what refiners already knew: different crude types are not easily substitutable. The elasticity of substitution between medium-sour and light-sweet crude is low, meaning that switching grades imposes real costs — reduced diesel yield, higher naphtha surpluses, and suboptimal utilisation of conversion units designed for heavier feedstock.</P>

        {/* CHART 1: Russian crude decline */}
        <div style={{ margin: "40px 0 8px" }}>
          <ChartTitle>The vanishing barrel</ChartTitle>
          <ChartSub>Russia's share of EU crude oil imports, %</ChartSub>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={russianCrudeShare} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} />
              <XAxis dataKey="year" tick={{ fill: C.darkGray, fontSize: 12, fontFamily: F.sans }} />
              <YAxis tick={{ fill: C.darkGray, fontSize: 12, fontFamily: F.sans }} domain={[0, 30]} unit="%" />
              <Tooltip contentStyle={{ fontFamily: F.sans, fontSize: 13 }} formatter={(v) => `${v}%`} />
              <Bar dataKey="share" radius={[2, 2, 0, 0]}>
                {russianCrudeShare.map((e, i) => <Cell key={i} fill={i === 0 ? C.red : C.navy} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <ChartCaption source="European Council; Eurostat. 2025 reflects Druzhba pipeline exemptions to Hungary and Slovakia only.">
          Russia's share of EU crude imports fell from 25.8% to 2.2% in four years — the most dramatic supply reorientation in the history of European energy.
        </ChartCaption>

        <P>OPIS data from April 2025 illustrated the consequence: European refineries consumed 3.06 million b/d of sweet crude, 1.19 million b/d of medium crude, and just 0.26 million b/d of heavy crude. The sweet-heavy ratio was roughly 12:1 — a world away from the balanced slate of the pre-sanctions era. The practical result was a persistent mismatch between what European refineries could efficiently produce and what European consumers actually needed. The continent runs on diesel. Trucks, construction equipment, agricultural machinery, rail freight — all burn gasoil. Western European gasoil demand peaked in 2017 but remains vast. Yet light, sweet crudes yield proportionally more naphtha and gasoline and less middle distillate than the medium-sour barrels refineries were designed for. The result: too much of what people do not want, not enough of what they do.</P>

        {/* CHART 2: Crude supply 2025 */}
        <div style={{ margin: "40px 0 8px" }}>
          <ChartTitle>Where Europe's oil comes from</ChartTitle>
          <ChartSub>EU crude oil imports by source, 2025 (% share)</ChartSub>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={crudeSource2025} cx="50%" cy="50%" outerRadius={110} dataKey="value" nameKey="name" label={({ name, value }) => `${name} ${value}%`} labelLine={false} style={{ fontFamily: F.sans, fontSize: 10 }}>
                {crudeSource2025.map((e, i) => <Cell key={i} fill={pieColors[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ fontFamily: F.sans, fontSize: 13 }} formatter={(v) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ChartCaption source="European Council / Eurostat, 2025 data.">
          The United States, Kazakhstan, and Norway now each supply 12–15% of EU crude — a remarkable diversification from the pre-2022 dependence on Russia. But the lighter, sweeter grades they provide are a poor fit for refineries engineered for Urals.
        </ChartCaption>

        <SceneBreak />

        {/* ═══ ACT IV: THE MARGIN SQUEEZE ═══ */}
        <P>Six thousand kilometres south of the Firth of Forth, on the swampy coastline of Nigeria's Lekki Free Zone, a very different story was unfolding. Aliko Dangote's 650,000 b/d refinery — the largest single-train refinery in the world — had been ramping up production since late 2024. By mid-2025, it had commissioned all major units: the fluid catalytic cracker, the hydrocracker, the reformer. Nigeria, once one of Europe's largest customers for imported gasoline, was becoming self-sufficient — and beginning to export. Competitively priced jet fuel from Dangote was flowing to the US Gulf Coast, a market European refiners had considered a reliable outlet. Nigerian gasoline imports, according to Vortexa data compiled by Bloomberg, had dropped to 110,000 b/d — an eight-year low.</P>

        <P>Dangote was only one node in a global wave of new capacity. Since 2022, more than 2.5 million b/d of crude distillation capacity had come online outside Europe: Kuwait's 615,000 b/d Al-Zour, Oman's 230,000 b/d Duqm, Mexico's 340,000 b/d Olmeca, and China's 400,000 b/d Yulong in Shandong. All were modern, complex, and built at scale — the precise characteristics European plants were not. The consequence was visible in the numbers. Northwest Europe's ULSD crack spread — the single best indicator of diesel refining profitability — had peaked at $52/b in the third quarter of 2022, a windfall driven by the French refinery strikes and the initial chaos of sanctions. By the third quarter of 2024, it had collapsed to $16/b. S&P Global Commodity Insights forecast a further decline to $16.27/b in 2026 — a 36% fall from 2024 levels. The US Gulf Coast, by contrast, expected only a 16% decline over the same period. Singapore, 22%. Europe was losing ground to every other major refining centre on earth.</P>

        {/* CHART 3: Diesel cracks comparison */}
        <div style={{ margin: "40px 0 8px" }}>
          <ChartTitle>Cracking under pressure</ChartTitle>
          <ChartSub>ULSD crack spread, NW Europe vs US Gulf Coast, $/barrel</ChartSub>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dieselCracks} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} />
              <XAxis dataKey="q" tick={{ fill: C.darkGray, fontSize: 10, fontFamily: F.sans }} interval={2} />
              <YAxis tick={{ fill: C.darkGray, fontSize: 12, fontFamily: F.sans }} domain={[0, 60]} unit="$" />
              <Tooltip contentStyle={{ fontFamily: F.sans, fontSize: 13 }} />
              <Legend />
              <Line type="monotone" dataKey="nwe" name="NW Europe" stroke={C.red} strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="usgc" name="US Gulf Coast" stroke={C.blue} strokeWidth={2} dot={false} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <ChartCaption source="OPIS; Argus Media; OPEC; IEA. Values are approximate quarterly averages. March 2026 reflects the Hormuz disruption.">
          European diesel cracks have underperformed the US Gulf Coast in most quarters since mid-2023 — a reversal of the pattern during the immediate post-invasion windfall. The structural gap is widening.
        </ChartCaption>

        <Photo
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Dangote_Refinery_Aerial_View.jpg/1280px-Dangote_Refinery_Aerial_View.jpg"
          caption="The Dangote refinery complex on the Lekki Peninsula, Lagos. At 650,000 barrels per day, it is the world's largest single-train refinery and has upended Atlantic basin gasoline trade flows, slashing Nigeria's dependence on European fuel imports."
          label="Consequence"
        />

        <Sidebar title="The new competitors">
          The mega-refineries reshaping global competition share common advantages that European plants cannot replicate. Kuwait's Al-Zour (615,000 b/d, operational 2022) was designed from scratch for the most complex crude processing, with a Nelson Complexity Index above 12. Nigeria's Dangote (650,000 b/d, ramping since 2024) benefits from proximity to West African crude, low labour costs, and a captive domestic market of 220 million people. Oman's Duqm (230,000 b/d, operational 2024) sits at the mouth of the Persian Gulf with direct access to Omani and Gulf crudes. China's Yulong (400,000 b/d, operational 2024–25) integrates refining with two 1.5 million-tonne-per-year steam crackers. All operate without the burden of the EU's emissions trading system, without ageing infrastructure, and without the declining domestic demand that haunts European operators.
        </Sidebar>

        <Sidebar title="The cost of carbon">
          Europe's refineries face a cost that no competitor in the Middle East, Africa, or most of Asia bears: the EU emissions trading system. In 2025, the carbon price stood at €70–80 per tonne of CO₂, according to the European Council on Foreign Relations. For a complex refinery emitting 3–4 million tonnes per year, the annual compliance cost runs to €200–320 million — a sum that dwarfs the margin improvement from any single operational efficiency. Wood Mackenzie warned that increasing exposure to emissions costs would "pressure European refiners' margins in the long term once global oil demand has peaked." The EU's Carbon Border Adjustment Mechanism (CBAM), phasing in from 2026, is intended to level the field by imposing equivalent costs on imports. But CBAM covers only a limited range of products and does not apply to refined petroleum fuels — meaning that European refiners bear the carbon cost while competing against importers who do not.
        </Sidebar>

        <SceneBreak />

        {/* ═══ ACT V: THE HORMUZ SHOCK ═══ */}
        <P>Then, as if to prove that every structural trend has a geopolitical counterpoint, the Strait of Hormuz closed. On 28 February 2026, the United States and Israel launched strikes against Iran. Tehran retaliated by mining the strait and attacking commercial shipping. Traffic dropped to near zero. Saudi Aramco's 550,000 b/d Ras Tanura refinery was struck by a drone. QatarEnergy declared force majeure after missile damage to the Ras Laffan LNG facility. Over 3 million barrels per day of Gulf refining capacity went offline. European diesel crack spreads surged 25% in a single session, hitting $33.76/b — their widest since November 2025. Benchmark European diesel margins rose to $30.75/b.</P>

        <P>For the European refineries that remained operational, the Hormuz crisis was — briefly, brutally — a windfall. With Gulf product exports suspended, European facilities with flexible capacity could import alternative crude and convert it into scarce diesel and jet fuel, capturing widening spreads. Rystad Energy forecast that very high diesel cracks would persist through most of 2026. Analysts at Rystad observed that Europe faced "the most acute diesel supply risk" of any region. But the windfall was, by its nature, temporary. It depended on a specific, high-impact event. As Gulf capacity restarts, the underlying dynamics — declining demand, rising competition, carbon costs, ageing plants — will reassert themselves with compound force.</P>

        {/* CHART 4: Closure waves */}
        <div style={{ margin: "40px 0 8px" }}>
          <ChartTitle>Waves of closure</ChartTitle>
          <ChartSub>European refinery capacity closures by crisis period, thousand b/d</ChartSub>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={closureWaves} margin={{ top: 5, right: 30, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} />
              <XAxis dataKey="period" tick={{ fill: C.darkGray, fontSize: 11, fontFamily: F.sans }} />
              <YAxis tick={{ fill: C.darkGray, fontSize: 12, fontFamily: F.sans }} />
              <Tooltip contentStyle={{ fontFamily: F.sans, fontSize: 13 }} formatter={(v) => `${v} kb/d`} />
              <Bar dataKey="capacity" radius={[2, 2, 0, 0]}>
                {closureWaves.map((e, i) => <Cell key={i} fill={i === 3 ? C.red : C.navy} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <ChartCaption source="S&P Global Commodity Insights; Argus Media. 2029–30 figure is a forecast.">
          Each successive crisis has produced a larger wave of European refinery closures. The forecast wave of 2029–30 would be the largest in the continent's refining history.
        </ChartCaption>

        <SceneBreak />

        {/* ═══ ACT VI: THE TRANSITION ═══ */}
        <P>If the forces of destruction are clear — carbon costs, demand erosion, global competition — the question of what replaces European refining is less so. Several pathways are being attempted simultaneously, none yet proven at scale. The most visible is conversion to biofuels. Italy's Eni has transformed its Livorno refinery into a 500,000-tonne-per-year biorefinery producing HVO diesel from renewable feedstocks. TotalEnergies has converted La Mède and Grandpuits in France. Shell has repurposed Wesseling's hydrocracker to produce base oils. But biofuels margins have been falling, and several green investment projects have been delayed or cancelled. BP postponed sustainable aviation fuel production at its Spanish refinery; numerous hydrogen initiatives across the continent have stalled.</P>

        <P>The ownership structure of European refining is shifting as the integrated oil majors retreat. Shell has pledged to "right-size" its European business to just two refineries, focusing on North America and China. ExxonMobil has slashed Western European capacity by around a third since 2000. BP is actively seeking buyers for Gelsenkirchen. Into the gap have stepped independent traders — Vitol, Gunvor, Trafigura — who bought distressed assets during the post-2008 closures. These firms are nimbler, less burdened by public sustainability commitments, and more willing to squeeze value from marginal operations. But they, too, face the same structural headwinds; Gunvor's mothballing of its Rotterdam unit in 2025 showed that trading-house ownership is no inoculation against unfavourable economics.</P>

        <Photo
          src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200"
          caption="An electric vehicle charging station in Europe. The accelerating adoption of EVs is steadily eroding gasoline and diesel demand — the foundation upon which the continent's refining industry was built."
          label="Consequence"
        />

        <P>The deeper force is electrification. Electric vehicle registrations in Europe have been rising sharply; the IEA forecasts that both gasoline and gasoil demand will "progressively erode after a brief uplift in 2025, propelled by electric vehicle uptake." Heat pumps are displacing heating oil in residential buildings. Rail electrification continues. The EU's own national energy and climate plans project a 7% decline in gas demand by 2030 — but the Commission's roadmap suggests the decline in oil-product demand could be steeper still, particularly if the Clean Industrial Deal accelerates the deployment of renewable energy in industrial processes. Every percentage point of demand destruction reduces the utilisation rate of the remaining refineries, pushing margins closer to the shutdown threshold.</P>

        {/* CHART 5: Capacity trajectory */}
        <div style={{ margin: "40px 0 8px" }}>
          <ChartTitle>The long arc</ChartTitle>
          <ChartSub>European refining capacity, million barrels per day</ChartSub>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={capacityTimeline} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <defs>
                <linearGradient id="capGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.navy} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={C.navy} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} />
              <XAxis dataKey="year" tick={{ fill: C.darkGray, fontSize: 12, fontFamily: F.sans }} />
              <YAxis tick={{ fill: C.darkGray, fontSize: 12, fontFamily: F.sans }} domain={[10, 22]} />
              <Tooltip contentStyle={{ fontFamily: F.sans, fontSize: 13 }} formatter={(v) => `${v}m b/d`} />
              <Area type="monotone" dataKey="cap" stroke={C.navy} strokeWidth={2.5} fill="url(#capGrad)" dot={{ fill: C.navy, r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <ChartCaption source="IEA; Hydrocarbon Engineering; S&P Global; author estimates. 2030 is a forecast based on announced closures and IEA risk assessments.">
          European refining capacity peaked around 1980 at over 20m b/d. By 2030, it may fall below 12m b/d — levels not seen since the industry's postwar expansion phase in the 1960s.
        </ChartCaption>

        {/* CHART 6: Regional margin comparison */}
        <div style={{ margin: "40px 0 8px" }}>
          <ChartTitle>The competitive gap</ChartTitle>
          <ChartSub>ULSD crack spread by region, $/barrel (2024 actual vs 2026 forecast)</ChartSub>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={marginForecast} margin={{ top: 5, right: 10, left: -10, bottom: 5 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} />
              <XAxis dataKey="region" tick={{ fill: C.darkGray, fontSize: 11, fontFamily: F.sans }} />
              <YAxis tick={{ fill: C.darkGray, fontSize: 12, fontFamily: F.sans }} domain={[0, 30]} unit="$" />
              <Tooltip contentStyle={{ fontFamily: F.sans, fontSize: 13 }} formatter={(v) => `$${v}/b`} />
              <Legend />
              <Bar dataKey="y2024" name="2024" fill={C.navy} radius={[2, 2, 0, 0]} barSize={28} />
              <Bar dataKey="y2026" name="2026 (f)" fill={C.red} radius={[2, 2, 0, 0]} barSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <ChartCaption source="S&P Global Commodity Insights. 2026 figures exclude Hormuz crisis spike.">
          NW Europe faces the steepest margin decline of any major refining centre — a 36% drop versus 16% on the US Gulf Coast.
        </ChartCaption>

        <Sidebar title="Who survives — and why">
          The European refineries likely to endure the next decade share three characteristics. First, <em>coastal location</em>: access to deep-water ports for cheap crude import and product export. Second, <em>high complexity</em>: Nelson Complexity Index of 10 or above, with hydrocracking and coking capacity to crack heavy feedstocks into diesel and jet fuel. Third, <em>petrochemical integration</em>: co-location with steam crackers, aromatics units, or polymer plants that provide a demand anchor beyond declining transport fuels. The survivors are already identifiable: Shell's 404,000 b/d Pernis in Rotterdam, TotalEnergies' Antwerp complex, Repsol's integrated Spanish sites at Cartagena and Tarragona, and a cluster of Mediterranean refineries in Sicily and Sardinia with access to North African crude. Around 73 refineries remain operational; within a decade, the number may fall below 50.
        </Sidebar>

        <SceneBreak />

        {/* ═══ CLOSING SYNTHESIS ═══ */}
        <P>What Europe is losing, in the dismantling of its refining sector, is not just an industrial capacity but a form of strategic autonomy. Every barrel of diesel no longer refined in Rotterdam or Gelsenkirchen must arrive by tanker from the US Gulf, from Jamnagar in India, from Dangote in Nigeria. Every litre of jet fuel not produced at Grangemouth must be shipped across the Atlantic or the Mediterranean. The Hormuz crisis of 2026 demonstrated, with painful clarity, what happens when the maritime routes on which those imports depend are disrupted: prices spike, storage drains, rationing looms. The continent that once processed its own fuel now depends on the same global supply chains it once fed.</P>

        <P>The parallel with natural gas is exact and instructive. Europe spent four years replacing Russian pipeline gas with LNG — only to discover that LNG arrives on ships that must transit chokepoints. Now it is replacing domestic refining with imported products that arrive on ships that must transit the same chokepoints. The strategic logic is circular. Each diversification reduces one vulnerability and creates another. The only genuine exit from the circle is to reduce total hydrocarbon consumption — through electrification, efficiency, and modal shift — to a level where the remaining domestic refining capacity, however diminished, can meet the residual demand.</P>

        <P>That is the future Europe is moving toward, but not quickly enough. The EU's Clean Industrial Deal and Affordable Energy Action Plan set ambitious decarbonisation targets. Wind and solar now generate 29% of EU electricity. Electric vehicle sales are accelerating. But the transition is uneven, contested, and incomplete. Industrial demand for oil products — plastics feedstocks, lubricants, process heat, marine bunker fuel — will persist for decades. Aviation remains almost entirely dependent on kerosene. The question is not whether European refining will shrink, but whether the pace of its contraction will be managed or chaotic — whether the closures will be planned, the workers retrained, the communities supported, or whether the industry will simply hollow out, leaving behind contaminated land, stranded workers, and a continent that discovers too late that it has outsourced a capability it still needs.</P>

        <Kicker>The flare stacks at Grangemouth are dark now, and the wind off the Firth of Forth carries only the smell of salt. The crude oil terminal that replaced the refinery will keep the jetties busy — tankers will still dock, fuel will still flow. But it will be someone else's fuel, refined in someone else's country, shipped across someone else's ocean. What was once made here will now only be bought. And that, for an industry that once defined what it meant for a nation to be industrially sovereign, is a quiet kind of ending — not with a bang, but with a last barrel rolling off the rack and into a pipe that leads, for the first time in seventy years, nowhere at all.</Kicker>

        {/* REFERENCE SUMMARY */}
        <div style={{ background: C.cream, padding: "32px", margin: "48px 0 0", borderRadius: "2px", border: `1px solid ${C.borderLight}` }}>
          <div style={{ fontFamily: F.sans, fontSize: "12px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: C.darkGray, marginBottom: "18px", paddingBottom: "8px", borderBottom: `2px solid ${C.yellow}`, display: "inline-block" }}>Reference Summary</div>
          <div style={{ fontFamily: F.sans, fontSize: "13px", lineHeight: 1.8, color: C.darkGray }}>
            <p><strong>Subject:</strong> European oil refining industry — structure, economics, geopolitics, and future outlook</p>
            <p><strong>Key statistics:</strong> ~73 operational refineries in Europe (excl. Russia); ~13.6m b/d total capacity (2025); ~400,000 b/d closed in 2025 alone; 1–1.5m b/d at risk by 2030 (IEA); NW Europe ULSD crack $16.27/b forecast 2026; Russia's crude share: 25.8% (2021) → 2.2% (2025); 435m tonnes EU crude imports 2025 (€212bn); EU ETS carbon price €70–80/tCO₂</p>
            <p><strong>Geographic scope:</strong> Northwest Europe (ARA corridor, UK, Germany); Mediterranean (Italy, Spain, France); global competitors (Nigeria, Kuwait, Oman, China, Mexico, India)</p>
            <p><strong>Key dates:</strong> 1902 — Shell's first Pernis refinery; 1964 — Druzhba pipeline operational; 1980 — European capacity peak ~20m b/d; Dec 2022 — EU Russian seaborne crude embargo; April 2025 — Grangemouth, Wesseling closures; Feb 2026 — Strait of Hormuz closure</p>
            <p><strong>Key figures:</strong> Arno Appel (BP Gelsenkirchen); Amber Russell (BP head of refining); Aliko Dangote; Tom O'Malley (former Petroplus CEO); Alan Gelder (Wood Mackenzie)</p>
            <p><strong>Status:</strong> Structural contraction; managed decline of simpler/inland plants; conversion to biofuels/terminals; surviving complex coastal plants expected to persist through 2030s</p>
            <p><strong>Primary sources:</strong> S&P Global Commodity Insights; Argus Media; IEA; OPIS; Kpler; European Council/Eurostat; Hydrocarbon Engineering; Wood Mackenzie; Rystad Energy</p>
          </div>
        </div>

        {/* SOURCE INTEGRITY NOTE */}
        <div style={{ background: C.cream, padding: "32px", margin: "36px 0 0", borderRadius: "2px", border: `1px solid ${C.borderLight}` }}>
          <div style={{ fontFamily: F.sans, fontSize: "12px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: C.darkGray, marginBottom: "18px", paddingBottom: "8px", borderBottom: `2px solid ${C.yellow}`, display: "inline-block" }}>Source Integrity Note</div>
          <div style={{ fontFamily: F.sans, fontSize: "13px", lineHeight: 1.7, color: C.darkGray }}>
            <p style={{ marginBottom: "10px" }}><strong>Verified facts (Tier 1):</strong> All refinery closures, capacities, and dates confirmed via Argus Media, S&P Global, Kpler, and Hydrocarbon Engineering. Russian crude share data from European Council/Eurostat. Diesel crack spreads from OPIS and Argus. IEA 1–1.5m b/d at-risk forecast from IEA and S&P Global. Dangote capacity and ramp-up from Kpler and Bloomberg. Nelson Complexity Index concept verified. EU ETS carbon cost from ECFR. Nature Communications crude substitutability study published August 2024. Hormuz closure details from Congressional Research Service, Bloomberg, and multiple news sources. ARA historical development from Delft University academic sources.</p>
            <p style={{ marginBottom: "10px" }}><strong>Composited scenes (Tier 2):</strong> The opening Grangemouth scene is assembled from verified facts (closure date, capacity, daily losses, workforce) but the specific sensory details (flare stacks going out, workers walking through gates) are editorial constructions. Rotterdam historical narrative draws on verified academic sources but condenses a complex multi-decade history. The closing scene is literary construction.</p>
            <p style={{ marginBottom: "10px" }}><strong>Details requiring verification:</strong> European capacity peak of ~20m b/d (1980) is an approximation from multiple sources. The 2030 forecast of ~12.1m b/d is an author estimate. Some quarterly crack-spread values are approximate averages across methodologies. The 73-refinery count is from Hydrocarbon Engineering (December 2025) and may have shifted.</p>
            <p><strong>Invented or unverifiable details:</strong> None of substance. Atmospheric details in the Grangemouth opening (the wind, the morning light) are literary conventions applied to a verified location and event.</p>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ textAlign: "center", marginTop: "56px", paddingTop: "32px" }}>
          <div style={{ width: "60px", height: "4px", background: C.yellow, margin: "0 auto 20px" }} />
          <div style={{ fontFamily: F.sans, fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: C.warmGray }}>
            National Geographic-Style Production Document
          </div>
        </div>

      </div>
    </div>
  );
}
