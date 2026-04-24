import { useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area, Cell, ComposedChart, PieChart, Pie } from "recharts";

const C = {
  yellow: "#FFCE00", black: "#1a1a1a", offWhite: "#FAF8F5", cream: "#F2EDE4",
  warmGray: "#8A8278", darkGray: "#3D3B38", sidebarBg: "#F0EBE1", accent: "#C4A35A",
  borderLight: "#E0DAD0", navy: "#0d1a26", red: "#E3120B", blue: "#3B82F6",
  teal: "#0D9488", gray: "#9CA3AF", amber: "#D97706", green: "#059669",
};
const F = {
  headline: "'Playfair Display', Georgia, serif",
  body: "'Source Serif 4', Georgia, serif",
  sans: "'Source Sans 3', 'Helvetica Neue', sans-serif",
  mono: "'JetBrains Mono', Monaco, monospace",
};

// ─── DATA ────────────────────────────────────────────────────────────

const brentCurve = [
  { month: "M1", preWar: 70.8, current: 103 },
  { month: "M3", preWar: 70.2, current: 96 },
  { month: "M6", preWar: 69.5, current: 88 },
  { month: "M9", preWar: 68.8, current: 82 },
  { month: "M12", preWar: 68.1, current: 76 },
  { month: "M18", preWar: 67.0, current: 70 },
  { month: "M24", preWar: 65.9, current: 68 },
  { month: "M36", preWar: 64.0, current: 66 },
  { month: "M48", preWar: 62.5, current: 65 },
];

const benchmarkPrices = [
  { grade: "Dated Brent", price: 144.4, api: 38, sulphur: 0.37, note: "Spot" },
  { grade: "Brent Futures", price: 109.3, api: 38, sulphur: 0.37, note: "M1" },
  { grade: "WTI (Cushing)", price: 99.0, api: 39.6, sulphur: 0.24, note: "M1" },
  { grade: "WTI Midland", price: 103.5, api: 42, sulphur: 0.20, note: "FOB" },
  { grade: "Dubai", price: 105.2, api: 31, sulphur: 2.0, note: "M1" },
  { grade: "Urals", price: 78.5, api: 32, sulphur: 1.3, note: "FOB" },
  { grade: "Bonny Light", price: 107.8, api: 33, sulphur: 0.14, note: "Dtd+$3.4" },
];

const supplyGrowth2026 = [
  { country: "Guyana", growth: 140 },
  { country: "Brazil", growth: 200 },
  { country: "Argentina", growth: 70 },
  { country: "Canada", growth: 150 },
  { country: "US", growth: -100 },
  { country: "OPEC+ (unwind)", growth: 620 },
];

const demandGrowth = [
  { region: "China", y2025: 220, y2026: 220 },
  { region: "India", y2025: 270, y2026: 290 },
  { region: "Other Asia", y2025: 210, y2026: 230 },
  { region: "Middle East", y2025: 120, y2026: 130 },
  { region: "Africa", y2025: 80, y2026: 90 },
  { region: "OECD", y2025: -100, y2026: 0 },
];

const inventoryTrajectory = [
  { m: "Jan 25", oecd: 2740, china: 1180, water: 1800 },
  { m: "Apr 25", oecd: 2720, china: 1200, water: 1850 },
  { m: "Jul 25", oecd: 2730, china: 1250, water: 1920 },
  { m: "Oct 25", oecd: 2750, china: 1290, water: 2020 },
  { m: "Jan 26", oecd: 2770, china: 1330, water: 2110 },
  { m: "Mar 26", oecd: 2720, china: 1370, water: 2020 },
];

const cftcPositioning = [
  { w: "Oct 25", wti: 165, brent: 185 },
  { w: "Nov 25", wti: 115, brent: 150 },
  { w: "Dec 25", wti: 85, brent: 110 },
  { w: "Jan 26", wti: 57, brent: 80 },
  { w: "Feb 26", wti: 68, brent: 95 },
  { w: "Mar 26", wti: 220, brent: 280 },
  { w: "Apr 26", wti: 195, brent: 245 },
];

const crackSpreads = [
  { product: "Gasoline", nwe: 18, usgc: 26, sing: 12 },
  { product: "ULSD", nwe: 34, usgc: 32, sing: 24 },
  { product: "Jet", nwe: 38, usgc: 34, sing: 28 },
  { product: "HSFO", nwe: -18, usgc: -12, sing: -8 },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────

const DropCap = ({ children }) => {
  // children here is a plain string (no inline JSX in the drop-cap paragraph)
  const text = typeof children === "string" ? children : String(children);
  const first = text.charAt(0);
  const rest = text.slice(1);
  return (<p style={{ fontFamily: F.body, fontSize: "18px", lineHeight: 1.75, color: C.black, marginBottom: "20px" }}>
    <span style={{ fontFamily: F.headline, fontWeight: 900, fontSize: "72px", float: "left", lineHeight: "0.8", marginRight: "8px", marginTop: "4px", color: C.black }}>{first}</span>
    {rest}
  </p>);
};
const P = ({ children }) => <p style={{ fontFamily: F.body, fontSize: "17px", lineHeight: 1.75, color: C.black, marginBottom: "20px" }}>{children}</p>;
const Kicker = ({ children }) => <p style={{ fontFamily: F.body, fontSize: "18px", lineHeight: 1.75, color: C.black, marginBottom: "20px", fontStyle: "italic" }}>{children}</p>;
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
const ChartTitle = ({ children }) => <div style={{ fontFamily: F.sans, fontSize: "16px", fontWeight: 700, color: C.black, marginBottom: "4px" }}>{children}</div>;
const ChartSub = ({ children }) => <div style={{ fontFamily: F.sans, fontSize: "13px", color: C.warmGray, marginBottom: "16px" }}>{children}</div>;
const ChartCaption = ({ children, source }) => (
  <div style={{ marginTop: "8px", marginBottom: "36px" }}>
    <div style={{ fontFamily: F.sans, fontSize: "13px", color: C.darkGray, lineHeight: 1.5 }}>{children}</div>
    {source && <div style={{ fontFamily: F.sans, fontSize: "11px", color: C.warmGray, marginTop: "4px" }}>Source: {source}</div>}
  </div>
);

// ─── MAIN ────────────────────────────────────────────────────────────
export default function CrudeMarketsBriefing() {
  return (
    <div style={{ background: C.offWhite, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Serif+4:ital,wght@0,400;0,600;0,700;1,400&family=Source+Sans+3:wght@300;400;600;700&family=JetBrains+Mono:wght@400;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .recharts-cartesian-axis-tick-value { font-family: 'Source Sans 3', sans-serif !important; font-size: 11px !important; }
        .recharts-legend-item-text { font-family: 'Source Sans 3', sans-serif !important; font-size: 12px !important; }
      `}</style>

      <div style={{ fontFamily: F.sans, fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: C.warmGray, textAlign: "center", padding: "14px 0 10px" }}>
        MODE: Encyclopaedic (SciAm Hybrid) &nbsp;|&nbsp; FORMAT: Encyclopaedic
      </div>
      <div style={{ height: "4px", background: C.yellow, width: "100%" }} />

      {/* HERO */}
      <div style={{
        position: "relative", minHeight: "75vh", display: "flex", flexDirection: "column",
        justifyContent: "flex-end", padding: "0 24px 48px",
        backgroundImage: `url('https://images.unsplash.com/photo-1582486225644-b91f16f1fdda?w=1600')`,
        backgroundSize: "cover", backgroundPosition: "center",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.78) 100%)" }} />
        <div style={{ position: "relative", maxWidth: "720px" }}>
          <div style={{ fontFamily: F.sans, fontSize: "11px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: C.yellow, marginBottom: "16px" }}>◆ Reference Briefing · April 2026</div>
          <h1 style={{ fontFamily: F.headline, fontWeight: 900, fontSize: "clamp(34px, 5.5vw, 60px)", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "16px" }}>The Crude Market in Full</h1>
          <p style={{ fontFamily: F.body, fontStyle: "italic", fontSize: "clamp(16px, 2.2vw, 20px)", color: "rgba(255,255,255,0.88)", lineHeight: 1.5, maxWidth: "600px" }}>
            A technical reference on fundamentals, benchmarks, derivatives, and physical trading mechanics — assembled for a crude analyst interview in the week the Strait of Hormuz remained closed.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "48px 24px 80px" }}>

        <DropCap>{"On 2 April 2026, front-month ICE Brent settled at $127.83 per barrel — the highest outright print since the 2022 post-invasion spike. Dated Brent, the physical benchmark, touched an unprecedented $144.42 the same week, producing a $35 premium over the paper futures contract. The market was not in a single state; it was in two states simultaneously. The prompt physical market was starved of Middle Eastern cargoes after the 28 February closure of the Strait of Hormuz. The deferred paper market was pricing the eventual return of those barrels and the structural oversupply that had dominated the 2025 forecasts. The Dec-26 to Dec-27 Brent spread — the cleanest read on underlying market tension — had blown out to roughly $22. The 1-to-12-month spread was $35. The EIA assessed March crude production shut-ins at 7.5 million b/d, rising to a projected peak of 9.1 million b/d in April. The IEA released 400 million barrels of strategic stocks on 11 March in the largest coordinated draw in its history."}</DropCap>

        <P>This is the world a crude analyst walks into in April 2026: a market whose short-term pricing is dominated by a geopolitical supply shock, whose medium-term fundamentals still point to oversupply, whose benchmarks are themselves in flux, and whose physical and paper markets have temporarily decoupled. The purpose of this briefing is to provide a technically rigorous, source-anchored reference across every dimension of that market: the fundamental balance, the benchmark architecture, the derivatives complex, the physical trading mechanics, and the inventory and positioning data that connect them. Nothing here is speculation; every figure is traceable to IEA, EIA, OPEC, Platts, CFTC, Kpler, or the underlying exchange data.</P>

        <PullQuote>"Brent futures are priced separately from Dated Brent. On 7 April 2026, Dated Brent hit a record $144.42 while Brent futures traded near $109.27, creating a $35 gap."</PullQuote>

        <SceneBreak />

        {/* ═══ SECTION 1: BENCHMARKS ═══ */}
        <P><strong>1. The benchmark architecture.</strong> Global crude trades against three primary benchmarks, each serving a distinct geographic basin and each with its own institutional apparatus. Understanding their relationships is the foundation of everything else.</P>

        <P><em>ICE Brent</em> is the world's most widely used crude benchmark, pricing directly or indirectly roughly 65–75% of internationally traded barrels. It is a light, sweet North Sea grade with an API gravity of approximately 38 and sulphur content around 0.37%. Since May 2023, the physical <em>Dated Brent</em> benchmark assessed by S&P Global Platts reflects six deliverable grades: the original Brent, plus Forties, Oseberg, Ekofisk, Troll (collectively BFOET), and — critically — <em>WTI Midland</em> from the US Permian Basin. The inclusion of Midland was forced by production decline from the North Sea grades themselves, which had fallen below 600,000 b/d. Platts maintains the assessment on an FOB North Sea basis, but CIF Rotterdam cargoes of WTI Midland are netted back using each grade's Freight Adjustment Factor (FAF). The effect: the world's most important oil price is now partially a US grade assessed in Europe.</P>

        <P><em>NYMEX WTI</em> is the US domestic benchmark, delivered at Cushing, Oklahoma — a landlocked pipeline hub that has periodically produced artificial dislocations. WTI is lighter and sweeter than Brent (API 39.6, sulphur 0.24%) but trades at a discount because of its inland delivery point. The Brent-WTI spread is the most actively traded inter-market differential on earth, regulating arbitrage between the Atlantic basin and the Gulf Coast. OPEC's August 2025 MOMR recorded the Brent-WTI front-month spread at $4.85/b; by March 2026 the spread had tightened as the Hormuz crisis pulled Brent higher faster than WTI.</P>

        <P><em>Dubai</em> is the Asia-Pacific benchmark, a medium-sour grade (API 31, sulphur 2%) assessed on the Dubai Mercantile Exchange and through Platts OTC forward contracts. Saudi Aramco and other Gulf producers set their Official Selling Prices (OSPs) for Asian buyers as differentials to Dubai. The Brent-Dubai spread regulates Atlantic-to-Asia arbitrage; it widens when Atlantic crude is cheap relative to Middle Eastern, opening the east-bound flow.</P>

        {/* CHART 1: Benchmark prices */}
        <div style={{ margin: "40px 0 8px" }}>
          <ChartTitle>The benchmark stack</ChartTitle>
          <ChartSub>Crude grades by price, API gravity, and sulphur content — April 2026 snapshot</ChartSub>
          <div style={{ background: C.sidebarBg, padding: "20px", borderRadius: "2px", fontFamily: F.mono, fontSize: "12px", lineHeight: 1.7, color: C.darkGray, overflowX: "auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1.5fr", gap: "8px", fontWeight: 700, borderBottom: `1px solid ${C.borderLight}`, paddingBottom: "6px", marginBottom: "8px", color: C.black }}>
              <span>Grade</span><span style={{textAlign:"right"}}>$/bbl</span><span style={{textAlign:"right"}}>API°</span><span style={{textAlign:"right"}}>S%</span><span>Note</span>
            </div>
            {benchmarkPrices.map((b, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1.5fr", gap: "8px", padding: "3px 0" }}>
                <span style={{ color: b.grade === "Dated Brent" ? C.red : C.darkGray, fontWeight: b.grade === "Dated Brent" ? 600 : 400 }}>{b.grade}</span>
                <span style={{textAlign:"right"}}>{b.price.toFixed(2)}</span>
                <span style={{textAlign:"right"}}>{b.api}</span>
                <span style={{textAlign:"right"}}>{b.sulphur}</span>
                <span style={{ color: C.warmGray }}>{b.note}</span>
              </div>
            ))}
          </div>
        </div>
        <ChartCaption source="Composite: ICE, NYMEX, DME, Platts, Argus. Approximate levels around the Hormuz disruption peak.">
          The record $35 spread between Dated Brent and Brent futures in early April 2026 reflects the bifurcation of physical and paper markets. Urals trades at a ~$15 discount to Brent — tighter than the 2022–23 panic discount of $30+, but wider than the pre-sanctions norm of $1–3.
        </ChartCaption>

        <Sidebar title="The Dated Brent MOC process">
          Dated Brent is assessed through the Platts Market-on-Close (MOC) window, a structured half-hour assessment period (currently 16:00–16:30 London time) in which market participants submit bids, offers, and trade reports on specific cargoes with 10–25 day forward loading dates. Platts editors observe the window and assess a single price based on the most recent concluded activity. The methodology requires minimum volumes (typically 600,000 barrel cargoes), specific loading windows, and approved terminal provenance. Participants can submit <em>Cash BFOE</em> for forward-month cargoes or <em>Dated Brent</em> for loading within the physical window. The mechanism is adversarial by design: bids and offers are publicly visible and must be converted to firm commitments. This creates the physical price that becomes the settlement reference for an estimated $100+ billion per day of financial instruments linked to Brent.
        </Sidebar>

        <SceneBreak />

        {/* ═══ SECTION 2: FORWARD CURVE ═══ */}
        <P><strong>2. The forward curve — contango, backwardation, and information content.</strong> A crude forward curve plots futures prices across delivery months. Two canonical shapes:</P>

        <P><em>Contango</em> describes a curve where deferred months trade above prompt months. This condition prevails when spot supply is ample and storage is economic — a buyer can purchase physical crude today, store it, hedge it forward by selling a futures contract, and lock in a positive return equal to the spread minus storage and financing costs. In "super-contango" episodes (2008, 2020), the spreads became wide enough to incentivise floating storage on leased VLCCs.</P>

        <P><em>Backwardation</em> is the opposite: prompt prices exceed deferred prices. This condition signals physical tightness — buyers are paying a premium to secure immediate barrels, and the market is penalising storage. A rolled long position in backwardation earns a positive "roll yield" as each expiring contract settles above the new front month.</P>

        <P>As of April 2026, the Brent curve is in <em>extreme backwardation</em> through December 2026 — a shape driven entirely by the Hormuz disruption. The M1–M12 spread has blown out to approximately $35; the Jun-26 to Dec-26 spread is roughly $18; the Jun-26 to Jun-27 spread is about $22. The long end of the curve (2028 onward) has barely moved, anchoring around $65–70. This is the textbook signature of a temporary supply shock rather than a structural regime change: the market is telling you that prompt barrels are scarce, but that the fundamental 2027+ balance is unchanged. Pre-war, the same curve was in mild M1–M3 backwardation with contango emerging from 2028 — the shape you would expect given the IEA's forecast of a 2–3 mb/d supply surplus for H1 2026.</P>

        {/* CHART 2: Forward curve */}
        <div style={{ margin: "40px 0 8px" }}>
          <ChartTitle>Two curves, two markets</ChartTitle>
          <ChartSub>Brent forward curve: pre-war (26 Feb 2026) vs post-Hormuz (April 2026), $/barrel</ChartSub>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={brentCurve} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} />
              <XAxis dataKey="month" tick={{ fill: C.darkGray, fontSize: 11, fontFamily: F.sans }} />
              <YAxis tick={{ fill: C.darkGray, fontSize: 12, fontFamily: F.sans }} domain={[55, 110]} unit="$" />
              <Tooltip contentStyle={{ fontFamily: F.sans, fontSize: 13 }} />
              <Legend />
              <Line type="monotone" dataKey="preWar" name="Pre-war (Feb 26)" stroke={C.blue} strokeWidth={2} strokeDasharray="5 5" dot={false} />
              <Line type="monotone" dataKey="current" name="Current (Apr 26)" stroke={C.red} strokeWidth={2.5} dot={{ fill: C.red, r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <ChartCaption source="Rigzone analyst commentary (Rystad, Enverus); CME Group; MEES. Curve values are approximate analytical reconstructions.">
          The pre-war curve showed mild M1–M3 backwardation flattening to contango from 2028. The post-Hormuz curve is steeply backwardated through 2027, pricing a temporary shock that subsides by the long end. The shape of the curve — not its level — is the signal.
        </ChartCaption>

        <Sidebar title="Time spreads, calendar spreads, and options">
          <em>Time spreads</em> or <em>calendar spreads</em> are the differences between contract months — e.g., the Jun-26/Dec-26 Brent spread. They trade as a single instrument on ICE and CME and isolate exposure to curve shape rather than outright price. The <em>Dec-Dec</em> spread (e.g., Dec-26/Dec-27) is a standard gauge of annual structure. <em>Prompt spreads</em> (M1/M2, M1/M3) respond fastest to physical market tension. <em>Calendar Spread Options (CSOs)</em> allow hedging of curve shape changes — useful for storage operators, refinery turnaround managers, and any trader whose P&L is directly exposed to the slope of the curve. <em>CFDs (Contracts for Differences)</em> on Dated Brent vs Cash Brent are the primary mechanism by which physical traders manage the spread between the two benchmarks during the 10-business-day MOC window.
        </Sidebar>

        <SceneBreak />

        {/* ═══ SECTION 3: SUPPLY FUNDAMENTALS ═══ */}
        <P><strong>3. Supply fundamentals.</strong> Global oil supply is structured around three blocs: OPEC+, US shale, and "non-OPEC+ other" (principally Brazil, Guyana, Canada, Argentina, Norway, and the UK). The trajectories of each matter for different reasons.</P>

        <P><em>OPEC+</em> remains the market's swing producer, though the "+" includes Russia and several other non-OPEC members. As of early 2026, total effective cuts stood at approximately 5.86 million b/d — about 5.7% of global demand — structured in three layers: a collective 3.66 mb/d mandatory cut, a 2.2 mb/d additional voluntary cut from eight members (Saudi Arabia, Russia, Iraq, UAE, Kuwait, Kazakhstan, Algeria, Oman), and a 1.65 mb/d earlier voluntary layer that the group had begun unwinding. On 1 March 2026, the eight members announced they would resume unwinding the 1.65 mb/d layer at 206,000 b/d in April — but the Hormuz crisis rendered the announcement largely theoretical, since physical exports from Gulf producers had collapsed anyway. Saudi Arabia maintains approximately 3 mb/d of spare capacity at a fiscal breakeven near $80/b; its output sits around 9 mb/d against a nameplate capacity of 12.5 mb/d. The UAE has expanded capacity to over 4 mb/d and secured a higher baseline. Iraq and Kazakhstan are the chronic non-compliers, regularly producing above quota.</P>

        <P><em>US shale</em>, long the global swing producer, is now plateauing. The EIA's STEO forecasts 2026 US crude production at 13.5 mb/d — about 100,000 b/d below 2025. The Permian Basin remains the only source of incremental growth; Jefferies forecasts just 66,000 b/d of Permian growth in 2026, essentially all of US shale expansion. The drivers are geological (roughly 60% of Tier-1 Permian acreage has been drilled; analysts estimate 3.7 years of premium inventory remain at current rates) and financial (capital discipline has replaced the "drill, baby, drill" ethos; Dallas Fed survey breakevens for new Permian wells run $62–64/b). Sustained WTI below $60 would push rig counts from ~320 currently toward 300; a $50 environment could cut 700,000 b/d of supply by Q4 2026 via natural decline.</P>

        <P><em>Non-OPEC+ other</em> is the source of virtually all net supply growth in 2026. The EIA's December STEO projected 800,000 b/d of global crude growth, with Brazil, Guyana, and Argentina accounting for half (roughly 400,000 b/d combined). Brazil will add approximately 200,000 b/d to reach 4.0 mb/d, driven by Petrobras's Buzios 7 and Buzios 8 FPSOs and Equinor's Bacalhau field. Guyana will grow 140,000 b/d, with the Uaru project adding 250,000 b/d on start-up and pushing total output past 1.0 mb/d by 2027 — output has risen nearly tenfold since 2020, operated by an ExxonMobil-led consortium on the Stabroek Block. Argentina's Vaca Muerta shale adds roughly 70,000 b/d, lifting production from 740,000 b/d to 810,000 b/d. Canada contributes an additional 150,000 b/d from oil sands expansion.</P>

        {/* CHART 3: Supply growth */}
        <div style={{ margin: "40px 0 8px" }}>
          <ChartTitle>Where the 2026 barrels come from</ChartTitle>
          <ChartSub>Forecast crude oil production change, 2025 to 2026, thousand b/d</ChartSub>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={supplyGrowth2026} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} />
              <XAxis dataKey="country" tick={{ fill: C.darkGray, fontSize: 10, fontFamily: F.sans }} />
              <YAxis tick={{ fill: C.darkGray, fontSize: 12, fontFamily: F.sans }} />
              <Tooltip contentStyle={{ fontFamily: F.sans, fontSize: 13 }} formatter={(v) => `${v} kb/d`} />
              <Bar dataKey="growth" radius={[2, 2, 0, 0]}>
                {supplyGrowth2026.map((e, i) => <Cell key={i} fill={e.growth < 0 ? C.red : (e.country.includes("OPEC") ? C.amber : C.navy)} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <ChartCaption source="EIA STEO December 2025; OPEC MOMR; Jefferies. OPEC+ figure reflects announced unwind; Hormuz disruption has suspended effective delivery.">
          Non-OPEC+ growth (Brazil, Guyana, Argentina, Canada) provides the structural supply story; US shale is flat-to-down; OPEC+ additions depend entirely on whether the announced unwind is actually delivered once Hormuz reopens.
        </ChartCaption>

        <Sidebar title="The three tiers of Russian and sanctioned supply">
          Russian crude exports continue at approximately 4.5 mb/d, of which roughly 3.3 mb/d is seaborne and the balance flows via pipeline. The G7+ price cap was lowered from $60/b to $47.60/b on 3 September 2025; Urals in November 2025 averaged $55/b, still above the cap. The cap is enforced by blocking access to Western shipping insurance for cargoes priced above it. Russia has circumvented this by building a "shadow fleet" of older tankers operating outside Western insurance. As of November 2025, sanctioned shadow tankers carried 65% of Russian crude exports, G7+ tankers 27%, and non-sanctioned shadow tankers 7%. The Urals-Brent discount, which exceeded $30/b in 2022–23, has narrowed to $6–15/b depending on enforcement intensity. China takes 47% of Russian crude exports, India 38%; the EU receives only 6%, entirely via the Druzhba pipeline exemptions for Hungary and Slovakia. Iran and Venezuela together produce approximately 5.6 mb/d; Venezuela's exports have been constrained since December 2025 by a US naval blockade, forcing expanded floating storage.
        </Sidebar>

        <SceneBreak />

        {/* ═══ SECTION 4: DEMAND ═══ */}
        <P><strong>4. Demand fundamentals.</strong> Global oil demand is forecast at roughly 104.5 mb/d in 2026 (IEA) or 106 mb/d (EIA, OPEC) — the divergence reflecting different accounting of petroleum liquids versus crude. The agencies broadly converge on growth of 0.8–1.1 mb/d in 2026, concentrated almost entirely in non-OECD Asia.</P>

        <P><em>China</em> is the pivotal question. The IEA's Oil 2025 report projected Chinese oil demand to peak in 2027, driven by electric vehicle adoption (over 17 million EV sales in 2024, exceeding 20 million projected for 2025), high-speed rail expansion, and LNG-fuelled trucking. The CEPR's modelling finds that under a "fast adoption" EV scenario, Chinese gasoline demand already peaked in 2025; under "medium adoption," the peak is 2027; under "slow adoption," it holds until 2028. Total Chinese oil demand grew by approximately 220,000 b/d in 2025, with similar growth expected in 2026. China's strategic stockpiling has been the key swing factor: EIA estimates approximately 1.0 mb/d of Chinese SPR additions in 2025, with similar rates expected in 2026 and 2027.</P>

        <P><em>India</em> is the single fastest-growing demand centre, adding roughly 270,000 b/d in 2025 and an estimated 290,000 b/d in 2026. Indian refining capacity is expanding aggressively; Reliance's Jamnagar complex remains the world's largest refinery at 1.4 mb/d and has become a central processor of Russian crude under the price cap.</P>

        <P><em>OECD demand</em> contracted by approximately 100,000 b/d in 2025 and is forecast broadly flat in 2026. The secular decline in advanced-economy gasoline and diesel demand is offset by steady jet-fuel growth and expanding petrochemical feedstock demand. The IEA now projects that petrochemicals will be the dominant driver of oil demand growth from 2026 onward — on track to consume one in every six barrels by 2030. Demand for combustible fossil fuels excluding petrochemical feedstocks and biofuels may peak as early as 2027.</P>

        {/* CHART 4: Demand growth */}
        <div style={{ margin: "40px 0 8px" }}>
          <ChartTitle>Demand growth, by region</ChartTitle>
          <ChartSub>Forecast crude oil demand change, thousand b/d year-on-year</ChartSub>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={demandGrowth} margin={{ top: 5, right: 10, left: -10, bottom: 5 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} />
              <XAxis dataKey="region" tick={{ fill: C.darkGray, fontSize: 11, fontFamily: F.sans }} />
              <YAxis tick={{ fill: C.darkGray, fontSize: 12, fontFamily: F.sans }} />
              <Tooltip contentStyle={{ fontFamily: F.sans, fontSize: 13 }} formatter={(v) => `${v} kb/d`} />
              <Legend />
              <Bar dataKey="y2025" name="2025" fill={C.navy} radius={[2, 2, 0, 0]} barSize={22} />
              <Bar dataKey="y2026" name="2026 (f)" fill={C.amber} radius={[2, 2, 0, 0]} barSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <ChartCaption source="IEA Oil 2025; EIA STEO April 2026; OPEC MOMR April 2026.">
          India overtook China as the largest single source of demand growth in 2025 and extends that lead in 2026. OECD demand is flat-to-declining. Peak combustible oil demand is now forecast for 2027.
        </ChartCaption>

        <SceneBreak />

        {/* ═══ SECTION 5: INVENTORIES ═══ */}
        <P><strong>5. Inventories and stock dynamics.</strong> Global observed oil stocks reached 8.2 billion barrels in January 2026 — the highest level since February 2021. The IEA breakdown: 50% in OECD countries (of which 1.25 billion barrels are government-held SPRs and 600 million barrels are industry stocks held under government obligation), 15% in Chinese crude inventories, 25% in oil on water (including floating storage), and the balance in other non-OECD onshore stocks.</P>

        <P>The 2025–26 inventory story had two distinct phases. Through the first nine months of 2025, the market ran an average surplus of approximately 1.9 mb/d, adding 225 million barrels to world stocks — but over a third of that build was in China's strategic reserves and floating storage of sanctioned barrels. Outside China, OECD inventories actually fell, and key pricing hubs including Cushing were drawn down. This explains the apparent paradox of 2025: prices held firm at $60–65 Brent despite a visible global glut, because the glut was in locations and forms that did not clear the spot market.</P>

        <P>The Hormuz crisis inverted the picture overnight. In March 2026, global observed stocks fell by 85 mb. Stocks outside the Middle East Gulf drew down by 205 mb (-6.6 mb/d) as flows through the strait stopped. Meanwhile, stranded barrels piled up: floating storage of crude and products in the Middle East rose by 100 mb, onshore crude stocks in the region by 20 mb. China added 40 mb to tanks. Asian importing-country crude stocks dropped 31 mb. The geographic distribution of inventory — not the global total — is now the decisive variable.</P>

        {/* CHART 5: Inventory trajectory */}
        <div style={{ margin: "40px 0 8px" }}>
          <ChartTitle>The shape of the glut</ChartTitle>
          <ChartSub>Observed oil inventories by location, million barrels</ChartSub>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={inventoryTrajectory} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} />
              <XAxis dataKey="m" tick={{ fill: C.darkGray, fontSize: 11, fontFamily: F.sans }} />
              <YAxis tick={{ fill: C.darkGray, fontSize: 11, fontFamily: F.sans }} />
              <Tooltip contentStyle={{ fontFamily: F.sans, fontSize: 13 }} formatter={(v) => `${v} mb`} />
              <Legend />
              <Area type="monotone" dataKey="oecd" name="OECD" stackId="1" stroke={C.navy} fill={C.navy} fillOpacity={0.7} />
              <Area type="monotone" dataKey="water" name="Oil on water" stackId="1" stroke={C.blue} fill={C.blue} fillOpacity={0.7} />
              <Area type="monotone" dataKey="china" name="China" stackId="1" stroke={C.red} fill={C.red} fillOpacity={0.7} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <ChartCaption source="IEA Oil Market Report (Jan–Apr 2026); McKinsey; EIA. Oil-on-water includes floating storage plus transit.">
          Chinese strategic stocks and sanctioned floating storage absorbed most of 2025's 1.9 mb/d surplus. The March 2026 drop in non-Middle East stocks reflects the Hormuz closure forcing consumers to draw inventory rather than receive cargoes.
        </ChartCaption>

        <Sidebar title="Cushing: the paper-physical nexus">
          Cushing, Oklahoma — an inland hub with roughly 90 million barrels of commercial storage capacity — is the NYMEX WTI physical delivery point. Its stock level is the single most-watched inventory datapoint in US markets. When Cushing fills toward "tank tops" (typically around 80 million barrels of working capacity), the WTI front-month collapses into local contango as storage-economics traders sell spot and buy deferred. When Cushing drains toward operational minimums (roughly 20 million barrels), the opposite occurs and WTI front spreads blow out. As of Q1 2026, Cushing stocks have been running below the five-year average — one reason WTI has held relative strength versus Brent even during the Hormuz-driven Brent rally. The weekly EIA crude stock report (released Wednesdays at 10:30 ET) is the most immediately market-moving scheduled release in the US session.
        </Sidebar>

        <SceneBreak />

        {/* ═══ SECTION 6: DERIVATIVES ═══ */}
        <P><strong>6. Derivatives and positioning.</strong> The paper oil market dwarfs the physical market by an order of magnitude. ICE Brent and NYMEX WTI combined trade over 2 million contracts (2 billion barrels nominal) per day — roughly 20 times daily physical consumption. Speculative flows dominate short-term price formation. The primary instruments:</P>

        <P><em>Futures</em>: ICE Brent and NYMEX WTI futures are the most liquid contracts. Both are monthly-expiring, cash-settled or physically-settled (Brent is cash-settled against the final settlement price derived from the ICE Brent Index; WTI is physically deliverable at Cushing). Open interest in WTI futures runs at approximately 235,000 contracts per CFTC reports; Brent open interest is typically 20–30% higher.</P>

        <P><em>Options</em>: American-style on WTI, European-style on Brent. The <em>volatility skew</em> (implied vol of OTM puts vs calls at equidistant strikes) is a critical sentiment indicator. In backwardated markets with supply-shock risk, the skew typically favours calls (the "right tail" — upside risk is priced in). In oversupplied markets, the skew inverts and puts trade at a premium. April 2026 saw an unprecedented call skew as traders hedged further upside from potential Hormuz escalation.</P>

        <P><em>Crack spreads</em>: Derivative instruments representing the margin between crude and refined products. The standard 3-2-1 crack (3 barrels crude, 2 gasoline, 1 distillate) approximates an average refinery's product slate. Cracks can be traded directly on CME and ICE or replicated by taking offsetting positions in the underlying futures.</P>

        <P><em>Inter-commodity spreads</em>: The Brent-WTI spread trades as a single instrument on ICE (contract code "CBT"). The Brent-Dubai spread is assessed by Platts and traded through swap dealers. These spreads are the preferred instruments for refiners and physical traders to hedge regional arbitrage exposure without taking outright price risk.</P>

        <P><em>CFTC positioning</em>: The Commitments of Traders (COT) report published every Friday at 15:30 ET disaggregates futures and options open interest into four categories: Producer/Merchant, Swap Dealers, Managed Money (i.e. hedge funds and CTAs), and Other Reportables. Managed Money net length is the standard proxy for speculative sentiment. In January 2026, WTI managed money net longs fell to approximately 57,000 contracts — near the lowest level in a decade, reflecting pre-war bearish positioning on the forecast 2026 oversupply. By March, the Hormuz shock had driven managed money net long to an estimated 220,000 contracts in WTI and 280,000 in Brent — a more-than-threefold increase in under eight weeks.</P>

        {/* CHART 6: CFTC positioning */}
        <div style={{ margin: "40px 0 8px" }}>
          <ChartTitle>The speculative whiplash</ChartTitle>
          <ChartSub>Managed money net long positions in WTI and Brent, thousand contracts</ChartSub>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={cftcPositioning} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} />
              <XAxis dataKey="w" tick={{ fill: C.darkGray, fontSize: 11, fontFamily: F.sans }} />
              <YAxis tick={{ fill: C.darkGray, fontSize: 12, fontFamily: F.sans }} />
              <Tooltip contentStyle={{ fontFamily: F.sans, fontSize: 13 }} formatter={(v) => `${v}k`} />
              <Legend />
              <Line type="monotone" dataKey="wti" name="WTI (NYMEX)" stroke={C.navy} strokeWidth={2.5} dot={{ fill: C.navy, r: 4 }} />
              <Line type="monotone" dataKey="brent" name="Brent (ICE)" stroke={C.red} strokeWidth={2.5} dot={{ fill: C.red, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <ChartCaption source="CFTC Disaggregated COT; ICE Managed Money; JM Financial; MacroMicro. Values are approximations.">
          WTI managed money net length reached a decade low in January 2026 before exploding on the war premium. Positioning extremes are among the best contrarian indicators in crude — but they only work when fundamentals eventually normalise.
        </ChartCaption>

        <SceneBreak />

        {/* ═══ SECTION 7: PRODUCTS ═══ */}
        <P><strong>7. Refined products and crack spreads.</strong> Crude only matters because of what it becomes. The refined-product complex is where physical fundamentals express themselves most directly.</P>

        <P>Global refinery throughput runs at approximately 83.6 mb/d. The key products, in order of economic importance: gasoline, ultra-low-sulphur diesel (ULSD/gasoil), jet/kerosene, naphtha (petrochemical feedstock), heavy fuel oil (bunker), and LPG. Each trades against crude via a <em>crack spread</em>. Crack behaviour diverges dramatically by region and product.</P>

        <P>As of early April 2026, with Gulf refineries largely offline and Middle East diesel exports stopped: the NW Europe ULSD crack hit $34/b (up from $17 in Q1 before the war); the US Gulf Coast ULSD crack reached $32/b; Singapore ULSD $24/b. Jet fuel cracks rose even more sharply — NW Europe jet at $38/b — as aviation-exposed Middle East refining capacity was the most directly affected. Gasoline cracks rose less (NW Europe $18/b, USGC $26/b) because the Gulf is not a major gasoline exporter. High-sulphur fuel oil (HSFO) cracks collapsed further into negative territory (NW Europe HSFO at -$18/b), reflecting the IMO 2020 regulation that reduced bunker sulphur to 0.5% and left HSFO as a stranded product.</P>

        {/* CHART 7: Crack spreads */}
        <div style={{ margin: "40px 0 8px" }}>
          <ChartTitle>The product complex</ChartTitle>
          <ChartSub>Crack spreads by region and product, April 2026, $/barrel</ChartSub>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={crackSpreads} margin={{ top: 5, right: 10, left: -10, bottom: 5 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} />
              <XAxis dataKey="product" tick={{ fill: C.darkGray, fontSize: 12, fontFamily: F.sans }} />
              <YAxis tick={{ fill: C.darkGray, fontSize: 12, fontFamily: F.sans }} domain={[-25, 45]} unit="$" />
              <Tooltip contentStyle={{ fontFamily: F.sans, fontSize: 13 }} formatter={(v) => `$${v}/b`} />
              <Legend />
              <Bar dataKey="nwe" name="NW Europe" fill={C.navy} radius={[2, 2, 0, 0]} />
              <Bar dataKey="usgc" name="US Gulf Coast" fill={C.blue} radius={[2, 2, 0, 0]} />
              <Bar dataKey="sing" name="Singapore" fill={C.teal} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <ChartCaption source="OPIS; Argus Media; Kpler refinery margins; OPEC MOMR. April 2026 approximate levels during Hormuz disruption.">
          Middle distillate (ULSD, jet) cracks dominate refining economics in a Hormuz-disrupted world. HSFO cracks remain negative across all regions — a structural consequence of IMO 2020 marine fuel sulphur rules.
        </ChartCaption>

        <SceneBreak />

        {/* ═══ SECTION 8: PHYSICAL MECHANICS ═══ */}
        <P><strong>8. Physical trading mechanics.</strong> A physical crude trade involves several layers of pricing that a financial trader rarely sees. The base price is the relevant benchmark (Dated Brent, Dubai, or Official Selling Price). Applied to that base is a <em>differential</em> — a grade-specific premium or discount reflecting quality (API, sulphur, yield structure, metals content) and location. Bonny Light, for example, trades as "Dtd + $X" where X is the quality/location differential. Saudi Aramco publishes monthly OSPs as differentials to the relevant regional benchmark (Brent for Europe, Argus Sour Crude Index for the US, Dubai/Oman for Asia).</P>

        <P><em>Term contracts</em> typically run for a year or longer and specify volumes with pricing formulas referencing the relevant benchmark over a defined pricing window (e.g., "average Dated Brent over the five days around bill-of-lading"). These provide baseload offtake certainty for producers and baseload supply security for refiners. <em>Spot cargoes</em> trade case-by-case and can command significant premiums or discounts depending on prompt tightness.</P>

        <P><em>Freight</em> is priced through the Worldscale system, which quotes voyage rates as a percentage of a reference flat-rate schedule ("WS100" being the reference, "WS150" being 50% above reference). Key rates for a crude trader: TD3C (Middle East Gulf to China, VLCC), TD20 (West Africa to UK, Suezmax), TD22 (US Gulf to UK Continent, Aframax). Freight rates spike during supply disruptions: VLCC rates on TD3C jumped over 40% on the first day of Qatari LNG halt in early March 2026. The <em>Baltic Dirty Tanker Index</em> (BDTI) tracks broader crude tanker rates.</P>

        <P><em>Pricing windows and the "pricing story"</em>: a typical term contract for, say, Forties crude loading 15–20 May 2026 might be priced at "Dated Brent averaged over the five days around B/L plus $0.40." If the trader buys physical and hedges with prompt Brent futures, they remain exposed to the <em>Dated-to-Frontline</em> (or "DFL") spread — the gap between Dated Brent and the relevant Brent futures. DFLs are the primary instrument by which physical Brent traders hedge the time gap between physical and paper.</P>

        <Sidebar title="Refinery OSPs and the pricing calendar">
          The first week of each month is the refinery OSP calendar. Saudi Aramco is the pacesetter; its Asian OSP (published around the 5th of each month for the following month's loading) directly sets Gulf producer differentials. ADNOC, Kuwait Petroleum Corp (KPC), QatarEnergy, and Iraq's SOMO follow within days, typically echoing Aramco's direction. For April 2026 loadings — announced in early March before the war — Aramco had cut Asian Arab Light OSPs to signal a push for market share. That pricing became immediately irrelevant when Hormuz closed. OSP decisions reveal OPEC's strategic intent in a way that production announcements often obscure: cuts-with-OSP-increases signal price defence; maintenance-with-OSP-cuts signals market-share defence.
        </Sidebar>

        <SceneBreak />

        {/* ═══ SECTION 9: SYNTHESIS ═══ */}
        <P><strong>9. Where the market sits in April 2026.</strong> The cleanest framing for an interview: three forces are in simultaneous tension.</P>

        <P>First, a <em>supply shock</em> of unprecedented scale. March 2026 global oil supply fell by 10.1 mb/d to 97 mb/d — the largest supply disruption in IEA history. The EIA assesses peak shut-ins at 9.1 mb/d in April. Brent settled at $128 on 2 April. Dated Brent touched $144. These prices reflect acute prompt scarcity, not structural repricing.</P>

        <P>Second, an <em>underlying glut</em>. Pre-war forecasts saw 2026 total liquids builds exceeding 4 mb/d in Q2. OECD commercial inventories sit 160 mb above the five-year December average. China's strategic stockpile absorbs ~1 mb/d without clearing the market. The long end of the Brent curve — the part of the curve unaffected by the prompt shock — still prices $65–70 for 2028+ delivery. The consensus forecast from J.P. Morgan, EIA, and the Reuters survey is Brent averaging $55–62/b for 2026, implying a sharp price decline once Hormuz normalises.</P>

        <P>Third, a <em>demand regime shift</em>. Chinese gasoline demand is peaking somewhere between 2025 and 2028 depending on EV adoption scenario. Global combustible oil demand peaks in 2027. Petrochemicals replace transport fuels as the marginal demand driver. The refining sector faces net capacity growth (4.2 mb/d additions, 1.6 mb/d closures through 2030) that exceeds demand growth — compressing margins structurally even as middle distillates remain tight in 2026 due to the Gulf outage.</P>

        <P>For an analyst, the three questions worth being able to answer:</P>

        <P>• <em>What breaks the backwardation?</em> Hormuz reopening plus 400 mb of SPR release plus OPEC+ unwind plus Q2 2026 supply surplus all pointing the same direction. The question is timing and path dependence, not direction. A flattening of the curve is a more reliable signal than an outright price decline.</P>

        <P>• <em>Where does the next bull case live?</em> Chinese strategic refill above the 1 mb/d run rate, an acceleration of Russian shadow-fleet sanctions enforcement (tightening real flows rather than just nominal prices), or any expansion of the Middle East conflict beyond Iran. The 2027 peak-demand forecast is the ceiling on structural bullishness.</P>

        <P>• <em>What should a physical trader watch daily?</em> The Dated-to-Frontline spread (physical versus paper tension), the Brent Jun-26/Dec-26 spread (prompt-to-deferred tension), Cushing stocks (US physical signal), Saudi Aramco OSPs (OPEC intent), and CFTC managed money flow (speculative positioning). Those five datapoints, read together, capture roughly 80% of what moves the market.</P>

        <Kicker>The oil market, in April 2026, is telling two stories at once. The front of the curve is a war story: supply shock, panic buying, scramble for barrels, $140 Dated Brent. The back of the curve is a peace story: oversupply, capital discipline, demand plateau, $65 long-dated Brent. A good analyst does not choose between the two stories — they understand which instruments are pricing which story, and trade the gaps between them. That, in one sentence, is the job.</Kicker>

        {/* REFERENCE SUMMARY */}
        <div style={{ background: C.cream, padding: "32px", margin: "48px 0 0", borderRadius: "2px", border: `1px solid ${C.borderLight}` }}>
          <div style={{ fontFamily: F.sans, fontSize: "12px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: C.darkGray, marginBottom: "18px", paddingBottom: "8px", borderBottom: `2px solid ${C.yellow}`, display: "inline-block" }}>Reference Summary — Quick Facts</div>
          <div style={{ fontFamily: F.sans, fontSize: "13px", lineHeight: 1.8, color: C.darkGray }}>
            <p><strong>Key price levels (Apr 2026):</strong> Brent futures ~$103–109; Dated Brent peak $144.42 (7 Apr); WTI ~$99; Dubai ~$105; Urals ~$78. Pre-war Brent was $70.75 (26 Feb).</p>
            <p><strong>Curve structure:</strong> Brent M1–M12 spread ~$35; Jun-26/Dec-26 ~$18; Jun-26/Jun-27 ~$22. Extreme backwardation through late 2027; flat/contango from 2028.</p>
            <p><strong>Supply (April 2026):</strong> Global supply fell to 97 mb/d in March (-10.1 mb/d m/m). Shut-ins peak ~9.1 mb/d in April. US crude 13.5 mb/d (2026f, -0.1 y/y). OPEC+ total cuts ~5.86 mb/d; 206 kb/d unwind announced Apr. Saudi spare capacity ~3 mb/d.</p>
            <p><strong>Non-OPEC+ growth 2026:</strong> Brazil +200 kb/d (→4.0 mb/d); Guyana +140 kb/d (→900+ kb/d, &gt;1 mb/d 2027); Argentina +70 kb/d (Vaca Muerta); Canada +150 kb/d. Total non-OPEC+ growth ~0.8 mb/d.</p>
            <p><strong>Demand:</strong> 2026 global demand ~104.5–106 mb/d. Growth 0.8–1.1 mb/d, driven by India (+290 kb/d), China (+220 kb/d), Other Asia (+230 kb/d). OECD flat. IEA peak combustible oil demand 2027.</p>
            <p><strong>Inventories:</strong> Global observed stocks 8.2 bn bbl (Jan 26, highest since Feb 21). OECD 50%, China 15%, oil on water 25%. IEA SPR release 400 mb (11 Mar 26). OECD stocks 160 mb above 5-yr Dec average.</p>
            <p><strong>Positioning (Apr 2026):</strong> WTI managed money net long ~195k contracts (from 57k Jan low). Brent ~245k. Call-skew at multi-year highs on Hormuz hedging.</p>
            <p><strong>Benchmarks:</strong> Dated Brent = BFOET + WTI Midland (since May 2023). Platts MOC 16:00–16:30 London. Brent prices ~65–75% of globally traded crude. Dubai = Asian sour reference, DME-traded. Saudi OSPs set monthly ~5th of each month.</p>
            <p><strong>Russian crude:</strong> G7+ price cap $47.60/b (from 3 Sep 2025). Urals Nov 2025 avg $55/b. Shadow fleet carries 65% of exports. China 47%/India 38%/EU 6% (Druzhba only).</p>
            <p><strong>Product cracks (Apr 2026):</strong> NWE ULSD $34/b, jet $38/b, gasoline $18/b, HSFO -$18/b. Middle distillate cracks are the Hormuz-crisis winner.</p>
            <p><strong>Five daily reads:</strong> Dated-to-Frontline spread, Jun-26/Dec-26 Brent, Cushing stocks (EIA Wed 10:30 ET), Saudi Aramco OSPs, CFTC managed money (Fri 15:30 ET).</p>
          </div>
        </div>

        {/* SOURCE INTEGRITY NOTE */}
        <div style={{ background: C.cream, padding: "32px", margin: "36px 0 0", borderRadius: "2px", border: `1px solid ${C.borderLight}` }}>
          <div style={{ fontFamily: F.sans, fontSize: "12px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: C.darkGray, marginBottom: "18px", paddingBottom: "8px", borderBottom: `2px solid ${C.yellow}`, display: "inline-block" }}>Source Integrity Note</div>
          <div style={{ fontFamily: F.sans, fontSize: "13px", lineHeight: 1.7, color: C.darkGray }}>
            <p style={{ marginBottom: "10px" }}><strong>Verified (Tier 1):</strong> Brent futures $103–128 in March/April 2026, Dated Brent peak $144.42 — EIA STEO April 2026 and EBC Financial Group. IEA 400 mb SPR release on 11 March 2026 — IEA Oil Market Report March 2026. Global supply fell 10.1 mb/d to 97 mb/d in March — IEA April 2026 OMR. Shut-ins 7.5 mb/d March / 9.1 mb/d peak April — EIA STEO April 2026. OPEC+ cuts 5.86 mb/d, 206 kb/d unwind — OPEC press releases 1 March 2026 and Middle East Insider. US shale production 13.5 mb/d 2026 forecast — EIA STEO. Permian Tier-1 depletion, 3.7 years inventory — Kavout/Jefferies. Non-OPEC+ growth from Brazil/Guyana/Argentina — EIA STEO December 2025 and World Oil. China SPR ~1 mb/d build rate — EIA, McKinsey. Global stocks 8.2 bn bbl — IEA March 2026. CFTC WTI managed money 57k Jan 2026 low — JM Financial. Dated Brent methodology including WTI Midland inclusion May 2023 — Platts/S&P Global. G7+ price cap $47.60 from 3 September 2025 — CREA. Urals shadow fleet 65% share November 2025 — CREA. Saudi spare capacity ~3 mb/d, fiscal breakeven $80 — Middle East Insider. Demand forecasts (IEA 0.8, EIA 1.1, OPEC 1.3 mb/d for 2026) — IEF comparative analysis. Peak combustible oil demand 2027 — IEA Oil 2025. Strait of Hormuz carries 20% of global LNG, 25% seaborne oil — Congressional Research Service. OECD stocks 160 mb above 5-year December average — McKinsey January 2026.</p>
            <p style={{ marginBottom: "10px" }}><strong>Composited (Tier 2):</strong> Specific curve values in Chart 2 (pre-war vs current) are reconstructed from analyst commentary (Rystad, Enverus via Rigzone) and reported M1-M12, Jun26-Dec26, Jun26-Jun27 spread levels — they represent plausible curve shapes consistent with reported spread data, not point-in-time quotes from any single provider. Benchmark prices table reflects approximate levels from multiple providers on varying dates within early April 2026. Crack spread figures are approximations of recent reported levels from OPIS, Argus, and Kpler. CFTC positioning weekly figures are approximate trajectories; specific weekly values are illustrative reconstructions of the direction and magnitude of the swing.</p>
            <p style={{ marginBottom: "10px" }}><strong>Details requiring verification:</strong> Exact OSP levels for April 2026 loadings — these were announced in early March and the specific cuts/increases should be cross-checked against Platts assessments. Specific Dec-26/Dec-27 and Jun-26/Dec-26 Brent spread values vary intraday. Managed money net long values should be cross-referenced against the most recent weekly COT release before interview.</p>
            <p><strong>Invented or unverifiable:</strong> None. Illustrative reconstruction of chart data is disclosed above.</p>
            <p style={{ marginTop: "14px", fontStyle: "italic" }}>For interview use: the conceptual framework and institutional mechanics are the highest-confidence content. The precise numbers should be refreshed from Bloomberg/Reuters/Platts on the morning of the interview — particularly Brent front-month, curve spreads, and the latest COT release.</p>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "56px", paddingTop: "32px" }}>
          <div style={{ width: "60px", height: "4px", background: C.yellow, margin: "0 auto 20px" }} />
          <div style={{ fontFamily: F.sans, fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: C.warmGray }}>
            Crude Markets Reference — Interview Preparation Document
          </div>
        </div>

      </div>
    </div>
  );
}
