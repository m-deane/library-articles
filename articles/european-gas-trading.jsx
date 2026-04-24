import { useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, ReferenceLine } from "recharts";

// ─── DESIGN TOKENS ───
const COLORS = {
  natgeoYellow: "#FFCE00",
  black: "#1a1a1a",
  offWhite: "#FAF8F5",
  cream: "#F2EDE4",
  warmGray: "#8A8278",
  darkGray: "#3D3B38",
  sidebarBg: "#F0EBE1",
  accent: "#C4A35A",
  borderLight: "#E0DAD0",
  diagramDark: "#0d1a26",
  diagramMid: "#1a3a52",
  diagramAccent: "#3a9bdc",
  diagramWarm: "#e87d3e",
};

const FONTS = {
  headline: "'Playfair Display', Georgia, serif",
  body: "'Source Serif 4', Georgia, serif",
  sans: "'Source Sans 3', 'Helvetica Neue', sans-serif",
};

// ─── DATA FOR CHARTS ───
const ttfVolumesData = [
  { year: "2015", volume: 12500 },
  { year: "2016", volume: 14800 },
  { year: "2017", volume: 18200 },
  { year: "2018", volume: 23100 },
  { year: "2019", volume: 28700 },
  { year: "2020", volume: 40390 },
  { year: "2021", volume: 43200 },
  { year: "2022", volume: 38900 },
  { year: "2023", volume: 53000 },
  { year: "2024", volume: 66250 },
];

const hubSpreadData = [
  { month: "Jan 22", TTF_TRF: 0.3, TTF_THE: 0.8, TTF_PSV: 2.1 },
  { month: "Apr 22", TTF_TRF: 5.2, TTF_THE: 3.1, TTF_PSV: 8.4 },
  { month: "Jul 22", TTF_TRF: 12.8, TTF_THE: 6.5, TTF_PSV: 15.3 },
  { month: "Oct 22", TTF_TRF: 4.1, TTF_THE: 2.2, TTF_PSV: 5.6 },
  { month: "Jan 23", TTF_TRF: -0.2, TTF_THE: 0.4, TTF_PSV: 1.2 },
  { month: "Apr 23", TTF_TRF: 0.1, TTF_THE: 0.3, TTF_PSV: 0.8 },
  { month: "Jul 23", TTF_TRF: -0.1, TTF_THE: 0.2, TTF_PSV: 0.5 },
  { month: "Oct 23", TTF_TRF: 0.0, TTF_THE: 0.1, TTF_PSV: 0.3 },
  { month: "Jan 24", TTF_TRF: 0.1, TTF_THE: 0.2, TTF_PSV: 0.4 },
  { month: "Apr 24", TTF_TRF: -0.1, TTF_THE: 0.1, TTF_PSV: 0.3 },
  { month: "Jul 24", TTF_TRF: 0.0, TTF_THE: 0.1, TTF_PSV: 0.2 },
];

const storageValueData = [
  { year: "2017", intrinsic: 0.8, extrinsic: 1.2 },
  { year: "2018", intrinsic: 1.5, extrinsic: 2.8 },
  { year: "2019", intrinsic: 2.2, extrinsic: 3.1 },
  { year: "2020", intrinsic: 5.0, extrinsic: 2.5 },
  { year: "2021", intrinsic: 12.0, extrinsic: 18.0 },
  { year: "2022", intrinsic: 8.5, extrinsic: 22.0 },
  { year: "2023", intrinsic: 5.5, extrinsic: 6.7 },
  { year: "2024", intrinsic: 3.5, extrinsic: 4.0 },
];

const storageFillData = [
  { month: "Apr", y2022: 26, y2023: 55, y2024: 59, y2025: 35 },
  { month: "May", y2022: 38, y2023: 62, y2024: 66, y2025: 45 },
  { month: "Jun", y2022: 52, y2023: 72, y2024: 74, y2025: 59 },
  { month: "Jul", y2022: 65, y2023: 80, y2024: 82, y2025: 70 },
  { month: "Aug", y2022: 77, y2023: 88, y2024: 89, y2025: 80 },
  { month: "Sep", y2022: 86, y2023: 94, y2024: 93, y2025: 88 },
  { month: "Oct", y2022: 93, y2023: 98, y2024: 95, y2025: 91 },
  { month: "Nov", y2022: 91, y2023: 99, y2024: 92, y2025: null },
  { month: "Dec", y2022: 82, y2023: 87, y2024: 80, y2025: null },
  { month: "Jan", y2022: 52, y2023: 72, y2024: 68, y2025: null },
  { month: "Feb", y2022: 30, y2023: 61, y2024: 58, y2025: null },
  { month: "Mar", y2022: 26, y2023: 55, y2024: 48, y2025: null },
];

const mlPerformanceData = [
  { model: "ARIMA", mape: 12.8 },
  { model: "SVM", mape: 10.2 },
  { model: "Random Forest", mape: 9.6 },
  { model: "FNN", mape: 9.1 },
  { model: "LSTM", mape: 8.5 },
  { model: "CNN-LSTM", mape: 7.2 },
  { model: "TCN-BiLSTM-Attn", mape: 5.8 },
  { model: "VMD-CNN-BiLSTM", mape: 3.5 },
];

const pipelineFlowData = [
  { year: "2019", russia: 170, norway: 115, lng: 85, northAfrica: 35 },
  { year: "2020", russia: 155, norway: 110, lng: 80, northAfrica: 30 },
  { year: "2021", russia: 140, norway: 115, lng: 80, northAfrica: 32 },
  { year: "2022", russia: 55, norway: 120, lng: 155, northAfrica: 35 },
  { year: "2023", russia: 25, norway: 110, lng: 175, northAfrica: 38 },
  { year: "2024", russia: 15, norway: 108, lng: 170, northAfrica: 36 },
  { year: "2025", russia: 10, norway: 105, lng: 185, northAfrica: 34 },
];

// ─── HELPER COMPONENTS ───
const DropCap = ({ children }) => {
  const text = String(children);
  const first = text.charAt(0);
  const rest = text.slice(1);
  return (
    <p style={{ fontFamily: FONTS.body, fontSize: "19px", lineHeight: 1.78, color: COLORS.black, marginBottom: "1.3em" }}>
      <span style={{ float: "left", fontFamily: FONTS.headline, fontWeight: 900, fontSize: "72px", lineHeight: "0.82", marginRight: "6px", marginTop: "4px", color: COLORS.black }}>{first}</span>
      <span dangerouslySetInnerHTML={{ __html: rest }} />
    </p>
  );
};

const Para = ({ children, style = {} }) => (
  <p style={{ fontFamily: FONTS.body, fontSize: "19px", lineHeight: 1.78, color: COLORS.black, marginBottom: "1.3em", ...style }} dangerouslySetInnerHTML={{ __html: children }} />
);

const Sidebar = ({ title, children }) => (
  <div style={{ background: COLORS.sidebarBg, border: `1px solid ${COLORS.borderLight}`, borderRadius: "3px", padding: "28px 32px", margin: "36px 0", }}>
    <div style={{ fontFamily: FONTS.sans, fontSize: "12px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: COLORS.darkGray, marginBottom: "4px" }}>{title}</div>
    <div style={{ width: "28px", height: "2px", background: COLORS.natgeoYellow, marginBottom: "16px" }} />
    <div style={{ fontFamily: FONTS.sans, fontSize: "15px", lineHeight: 1.7, color: COLORS.darkGray }} dangerouslySetInnerHTML={{ __html: children }} />
  </div>
);

const ImgCaption = ({ label, text }) => (
  <div style={{ marginTop: "6px", marginBottom: "36px" }}>
    <span style={{ fontFamily: FONTS.sans, fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: COLORS.accent }}>{label} </span>
    <span style={{ fontFamily: FONTS.sans, fontSize: "13px", color: "#6B6560", lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: text }} />
  </div>
);

const SceneBreak = () => (
  <div style={{ textAlign: "center", margin: "48px 0", letterSpacing: "8px", fontSize: "22px", color: COLORS.accent }}>❧</div>
);

const PullQuote = ({ text }) => (
  <blockquote style={{ borderLeft: `3px solid ${COLORS.natgeoYellow}`, marginLeft: 0, marginRight: 0, padding: "12px 0 12px 28px", margin: "36px 0", fontFamily: FONTS.headline, fontStyle: "italic", fontSize: "24px", lineHeight: 1.5, color: COLORS.black, fontWeight: 400 }}>
    {text}
  </blockquote>
);

const ChartTitle = ({ children }) => (
  <div style={{ fontFamily: FONTS.sans, fontSize: "14px", fontWeight: 700, color: COLORS.black, marginBottom: "8px", marginTop: "32px" }}>{children}</div>
);

const ChartSource = ({ children }) => (
  <div style={{ fontFamily: FONTS.sans, fontSize: "11px", color: COLORS.warmGray, marginTop: "4px", marginBottom: "8px" }}>{children}</div>
);

const ChartCaption = ({ label, text }) => (
  <div style={{ marginTop: "6px", marginBottom: "36px" }}>
    <span style={{ fontFamily: FONTS.sans, fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: COLORS.accent }}>{label} </span>
    <span style={{ fontFamily: FONTS.sans, fontSize: "13px", color: "#6B6560", lineHeight: 1.5 }}>{text}</span>
  </div>
);

// ─── MAIN COMPONENT ───
export default function EuropeanGasTrading() {
  return (
    <div style={{ background: COLORS.offWhite, minHeight: "100vh", fontFamily: FONTS.body }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Sans+3:wght@300;400;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400;1,600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .recharts-default-tooltip { font-family: 'Source Sans 3', sans-serif !important; font-size: 12px !important; }
      `}</style>

      {/* Mode badge */}
      <div style={{ fontFamily: FONTS.sans, fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: COLORS.warmGray, padding: "14px 24px", textAlign: "center" }}>
        MODE: Encyclopaedic | FORMAT: Encyclopaedic
      </div>

      {/* Yellow border strip */}
      <div style={{ height: "4px", background: COLORS.natgeoYellow, width: "100%" }} />

      {/* HERO SECTION */}
      <div style={{
        position: "relative",
        minHeight: "85vh",
        backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Gas_pipeline_Lanzhot_01.jpg/1280px-Gas_pipeline_Lanzhot_01.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center 40%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "60px clamp(24px, 6vw, 80px)",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.72) 100%)",
        }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "820px" }}>
          <div style={{ fontFamily: FONTS.sans, fontSize: "12px", fontWeight: 700, letterSpacing: "3px", color: COLORS.natgeoYellow, marginBottom: "16px" }}>◆ FEATURE</div>
          <h1 style={{ fontFamily: FONTS.headline, fontWeight: 900, fontSize: "clamp(38px, 5.5vw, 68px)", lineHeight: 1.08, color: "#FFFFFF", marginBottom: "20px" }}>
            The Invisible Arbitrage
          </h1>
          <p style={{ fontFamily: FONTS.body, fontStyle: "italic", fontSize: "clamp(17px, 2.2vw, 22px)", lineHeight: 1.45, color: "rgba(255,255,255,0.88)", maxWidth: "680px" }}>
            How traders exploit the price differentials hidden inside Europe's pipeline network — and how algorithms are learning to do it faster.
          </p>
        </div>
        <div style={{ position: "absolute", bottom: "18px", right: "24px", fontFamily: FONTS.sans, fontSize: "11px", color: "rgba(255,255,255,0.5)", zIndex: 1, textAlign: "right", maxWidth: "300px" }}>
          A gas pipeline interconnection point on the Czech–Slovak border at Lanžhot, where molecules become price signals.
        </div>
      </div>

      {/* ARTICLE BODY */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "48px clamp(20px, 4vw, 40px) 80px" }}>

        <DropCap>
          {"On a winter morning in January 2025, as temperatures across northern Europe dropped below minus twelve degrees Celsius, a trader at a commodity desk in London noticed something that no thermometer could measure: the price of natural gas at the Dutch Title Transfer Facility was trading at €48 per megawatt hour, while the same molecule — separated only by a pipeline running beneath the North Sea and a booking on ENTSOG's capacity platform — was priced at €46.20 at the British National Balancing Point. The spread, just €1.80, had been widening for three days. By the time the trader had booked interruptible capacity on the BBL interconnector and executed a simultaneous buy at NBP and sell at TTF, the window had already begun to close. Within four hours, algorithmic systems at three competing trading houses had noticed the same signal and arbitraged the spread back to its typical range of €0.40."}
        </DropCap>

        <Para>
          {"This is the world of European gas location spread trading — a discipline that sits at the intersection of physical infrastructure and financial engineering, where the price of moving a molecule from one virtual trading point to another is determined not by the distance it must travel but by the capacity available to carry it, the regulatory tariffs imposed at each border, and the willingness of hundreds of competing market participants to bet on which direction the differential will move next. It is, in the words of Patrick Heather, the Senior Research Fellow at the Oxford Institute for Energy Studies who has tracked the development of European gas hubs for over a decade, a market that has <em>\"rebalanced\"</em> after the most turbulent period in its history — but one whose rebalancing has revealed entirely new patterns of opportunity."}
        </Para>

        <Para>
          {"To understand location spreads is to understand the plumbing of Europe itself. The continent's gas network is not a single unified system but a patchwork of national transmission grids, each operated by its own Transmission System Operator, connected at cross-border interconnection points where capacity must be booked, paid for, and scheduled. Every border crossing introduces friction. Every unit of friction creates a price differential. Every persistent differential is, to a trader, a signal — and the question that now consumes an entire industry of quantitative analysts, portfolio optimisers, and machine learning engineers is whether those signals can be read, predicted, and exploited faster than the market can arbitrage them away."}
        </Para>

        <PullQuote text="The TTF is far and away the leading European traded gas hub — its volumes are now nearly five times greater than all the other hubs reviewed put together." />

        <SceneBreak />

        {/* === SECTION: THE ARCHITECTURE OF A SPREAD === */}
        <Para>
          {"The architecture of a European gas location spread begins with the entry-exit system — the regulatory framework that governs how gas moves between market areas. Under EU Regulation 2009/715, subsequently refined through the Capacity Allocation Mechanism network code, anyone wishing to transport gas into or out of a market area must book entry and exit capacities at explicit auctions, paying corresponding tariffs. This system, administered by ENTSOG — the European Network of Transmission System Operators for Gas, founded in 2009 — replaced the older point-to-point contract path model with a more flexible arrangement that treats each national grid as a single zone. Gas enters through an entry point, joins the virtual pool, and exits at an exit point. The price of gas at the virtual trading point in each zone reflects the balance of supply and demand within that zone."}
        </Para>

        <Para>
          {"The spread between any two hubs — say, the Dutch TTF and the German Trading Hub Europe (THE) — is therefore a composite of several components: the tariff cost of exiting the Dutch system, the tariff cost of entering the German system, the physical capacity available at the interconnection point, and the supply-demand balance within each zone. When pipeline capacity is abundant and both systems are well supplied, the spread narrows toward the bare transport cost. When capacity is constrained — because a compressor station is under maintenance, because an unexpected cold snap has increased withdrawals from German storage, because an LNG cargo that was expected at Rotterdam has been diverted to Asia — the spread widens, sometimes dramatically."}
        </Para>

        {/* CHART: Hub spreads */}
        <ChartTitle>Month-Ahead Basis Spreads: TTF vs. European Hubs, 2022–2024</ChartTitle>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={hubSpreadData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.borderLight} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: FONTS.sans, fill: COLORS.darkGray }} />
            <YAxis tick={{ fontSize: 11, fontFamily: FONTS.sans, fill: COLORS.darkGray }} label={{ value: "€/MWh", angle: -90, position: "insideLeft", style: { fontSize: 11, fontFamily: FONTS.sans, fill: COLORS.warmGray } }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 11, fontFamily: FONTS.sans }} />
            <ReferenceLine y={0} stroke={COLORS.warmGray} strokeDasharray="3 3" />
            <Line type="monotone" dataKey="TTF_TRF" name="TTF–TRF (France)" stroke="#e87d3e" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="TTF_THE" name="TTF–THE (Germany)" stroke="#3a9bdc" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="TTF_PSV" name="TTF–PSV (Italy)" stroke="#9b59b6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
        <ChartSource>Source: ICIS, Oxford Institute for Energy Studies (Heather, 2024). Positive values indicate TTF premium over the regional hub.</ChartSource>
        <ChartCaption label="Data" text="The 2022 energy crisis blew European hub spreads to unprecedented levels — the TTF–PSV spread exceeded €15/MWh in July 2022, driven by infrastructure constraints. By mid-2023, spreads had largely rebalanced to pre-crisis norms." />

        <Sidebar title="The Five Key Elements" children={`Patrick Heather's methodology for assessing the maturity of European gas hubs evaluates five dimensions: the number of active market participants, the range of traded products (from day-ahead through to multi-year forwards and options), total traded volumes, the churn ratio (traded volume divided by physical consumption — a measure of financial liquidity above and beyond physical needs), and the bid-offer spread on screen-traded products. By 2024, only one hub — the Dutch TTF — scored in the highest category across all five elements. The TTF's churn ratio reached 20.3 times in 2024, meaning that for every unit of gas physically consumed, the equivalent volume changed hands more than twenty times on the trading market. The British NBP, once Europe's dominant hub, has seen its churn decline and now functions as an active regional hub for the British Isles rather than a continental benchmark.`} />

        <Para>
          {"The turbulence of 2022 demonstrated just how violent these spreads can become. When Russia cut pipeline flows through Nord Stream and the Yamal corridor, the supply shock did not propagate evenly across Europe. Countries with large LNG import capacity — the Netherlands, France, Belgium — could substitute seaborne cargoes for lost pipeline volumes, but at a cost: their hubs were flooded with gas that had to be regasified and pushed into the grid, while landlocked countries further east faced physical shortages. The TTF-to-TRF spread (the Netherlands versus France), which had historically hovered near zero or slightly negative, went sharply positive in 2022 as enormous LNG volumes poured into French terminals. The TTF-to-PSV spread (the Netherlands versus Italy) blew out to over €15 per megawatt hour in the summer of 2022, reflecting the bottleneck of moving gas across the Alps when every pipeline was running at capacity."}
        </Para>

        <SceneBreak />

        {/* === SECTION: THE HUBS === */}
        <Para>
          {"To navigate this market requires first understanding its geography. Europe now has more than twenty gas trading hubs, though they vary enormously in maturity. The landscape, as mapped by Heather in his annual surveys for the Oxford Institute, resembles a solar system: the TTF is the sun, the NBP a large planet, and everything else orbits at varying distances. The German THE, formed in October 2021 from the merger of the former NCG and GASPOOL zones, has grown rapidly — EEX Group reported that German THE spot market volumes rose 25 percent in 2025 alone. The French TRF and Italian PSV are classified as <em>active</em> hubs, capable of pricing local supply and demand but lacking the forward curve depth for sophisticated risk management. The Austrian VTP, Spanish PVB, and Belgian ZTP are <em>poor</em> hubs — functional for balancing but thinly traded. Beyond these lie the <em>nascent</em> hubs: Slovenia, Croatia, Serbia, Moldova, each with a virtual trading point but virtually no speculative or curve trading."}
        </Para>

        {/* CHART: TTF Volumes */}
        <ChartTitle>TTF Total Traded Volumes, 2015–2024</ChartTitle>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={ttfVolumesData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.borderLight} />
            <XAxis dataKey="year" tick={{ fontSize: 11, fontFamily: FONTS.sans, fill: COLORS.darkGray }} />
            <YAxis tick={{ fontSize: 11, fontFamily: FONTS.sans, fill: COLORS.darkGray }} label={{ value: "TWh", angle: -90, position: "insideLeft", style: { fontSize: 11, fontFamily: FONTS.sans, fill: COLORS.warmGray } }} />
            <Tooltip formatter={(v) => `${v.toLocaleString()} TWh`} />
            <Bar dataKey="volume" name="TTF Traded Volume" fill={COLORS.natgeoYellow} radius={[3,3,0,0]} />
          </BarChart>
        </ResponsiveContainer>
        <ChartSource>Source: OIES (Heather, 2020–2025), LEBA, ICE-Endex, PEGAS. Includes OTC and exchange volumes across all products.</ChartSource>
        <ChartCaption label="Data" text="TTF traded volumes have grown near-exponentially since 2014. By 2024, TTF volumes exceeded 66,000 TWh — nearly five times greater than all other European hubs combined." />

        <Para>
          {"The hierarchy matters because it determines where a location spread can be practically traded. A spread between TTF and THE has deep liquidity on both sides: a trader can buy a month-ahead contract at THE on the EEX exchange and sell the equivalent at TTF on ICE-Endex, constructing a clean basis position. A spread between TTF and the Austrian VTP is harder to execute because VTP liquidity is thin — the bid-offer spread is wider, the available contract months are fewer, and the risk of being unable to exit the position at a fair price is correspondingly greater. A spread between TTF and the Croatian virtual trading point is virtually untradeable in the financial markets, even though a physical price differential exists."}
        </Para>

        <Para>
          {"This liquidity gradient creates a paradox that lies at the heart of location spread trading: the most liquid spreads — TTF versus THE, TTF versus NBP — are also the most efficiently priced, meaning that the opportunities for sustained excess return are smallest. The widest and most persistent mispricings occur at the periphery of the network — TTF versus PSV, TTF versus PVB, or even within-country spreads at specific physical delivery points — but these are precisely the markets where execution is most difficult and transaction costs are highest. The skill of the trader is to identify which spreads offer a favourable ratio of expected return to execution risk, and to hold those positions through the noise of daily price movements until the underlying fundamental signal materialises."}
        </Para>

        <SceneBreak />

        {/* === SECTION: THE MECHANICS OF TRADING === */}
        <Para>
          {"The practical mechanics of trading a pipeline location spread in Europe involve three distinct layers: the physical layer, the financial layer, and the capacity layer. Miss any one of the three and the trade collapses."}
        </Para>

        <Para>
          {"In the <em>financial layer</em>, the trader establishes opposing positions at two hubs — buying at the hub expected to become relatively cheaper and selling at the hub expected to become relatively more expensive. Month-ahead contracts are the most commonly traded instrument for this purpose, as Heather's research confirms, because the month-ahead is the contract most used to price underlying physical gas supply agreements and therefore attracts the deepest liquidity from both physical hedgers and financial speculators. But spreads can also be traded on a day-ahead, weekend, quarter-ahead, or even season-ahead basis, depending on the nature of the signal being exploited."}
        </Para>

        <Para>
          {"The <em>capacity layer</em> is what makes European gas spread trading fundamentally different from, say, crude oil location spreads. To physically arbitrage a price differential between two hubs, a trader must hold transportation capacity at the relevant interconnection point. Under the EU Capacity Allocation Mechanism, this capacity is auctioned at the cross-border point by the adjoining TSOs — typically through the PRISMA platform — in products ranging from annual firm capacity (booked a year in advance) to within-day interruptible capacity (booked hours before the flow). The tariff paid for this capacity is a critical input to the spread trade's economics. Research by Çam and Lencz, published in <em>Energy Economics</em>, demonstrated that the EU's multiplier system — which sets the price of short-term capacity as a multiple of the annual tariff — was originally designed to incentivise long-term bookings but had the unintended effect of preventing arbitrageurs from exploiting short-term regional price spreads without committing to a full year of capacity."}
        </Para>

        <Sidebar title="Intrinsic vs. Extrinsic Value" children={`The gas trading industry distinguishes two forms of optionality value. <em>Intrinsic value</em> is the profit available by optimising an asset (a storage facility, a swing contract, a transportation booking) against the currently observable forward curve — buying summer and selling winter at today's prices. <em>Extrinsic value</em> is the additional profit available from the <em>optionality</em> to re-optimise as prices change. The industry standard for monetising both is the <em>rolling intrinsic</em> strategy, pioneered and extensively modelled by Timera Energy, a London-based consultancy whose storage optimisation model has been used to support multiple gas storage investments across Europe. Under this strategy, the trader locks in observable forward spreads and then adjusts positions only when doing so is risk-free — capturing extrinsic value incrementally without exposing the position to downside. Timera's backtesting of a generic 180-day-cycle TTF storage asset showed returns of roughly €7.50/MWh in storage year 2024, down from crisis peaks but still at least double pre-2020 levels.`} />

        <Para>
          {"The <em>physical layer</em> closes the loop. A trader who holds capacity and has established a financial spread can choose to physically flow gas across the border, nominating volumes through the TSO's scheduling system. In practice, most location spread traders operate in the financial layer alone — buying and selling contracts at the two hubs without moving physical gas — and rely on the <em>physical arbitrageurs</em> (typically large portfolio players like Vitol, Gunvor, Trafigura, or the trading arms of major utilities like RWE, Shell, and TotalEnergies) to enforce the physical convergence that keeps spreads tethered to transport costs. When the financial spread exceeds the cost of physical transport plus capacity, these players flow gas across the border until the arbitrage is closed."}
        </Para>

        <SceneBreak />

        {/* === SECTION: STORAGE AND SEASONAL SPREADS === */}
        <Para>
          {"If location spreads exploit differences in price across <em>space</em>, the closely related discipline of storage trading exploits differences across <em>time</em>. The two are inseparable in practice, because the same infrastructure — pipelines, compression stations, and underground caverns — mediates both. Europe's underground gas storage facilities, with a total working capacity of roughly 1,100 terawatt-hours spread across depleted gas fields, aquifers, and salt caverns from the Netherlands to Ukraine, function as the continent's shock absorber: gas is injected during the warmer months when demand is lower and prices are typically cheaper, then withdrawn during winter when heating demand pushes prices higher."}
        </Para>

        {/* CHART: Storage fill */}
        <ChartTitle>European Gas Storage Fill Levels (% of Working Volume)</ChartTitle>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={storageFillData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.borderLight} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: FONTS.sans, fill: COLORS.darkGray }} />
            <YAxis domain={[20, 100]} tick={{ fontSize: 11, fontFamily: FONTS.sans, fill: COLORS.darkGray }} label={{ value: "%", angle: -90, position: "insideLeft", style: { fontSize: 11, fontFamily: FONTS.sans, fill: COLORS.warmGray } }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 11, fontFamily: FONTS.sans }} />
            <ReferenceLine y={90} stroke="#e74c3c" strokeDasharray="5 5" label={{ value: "EU 90% mandate", position: "right", style: { fontSize: 10, fontFamily: FONTS.sans, fill: "#e74c3c" } }} />
            <Line type="monotone" dataKey="y2022" name="2022–23" stroke="#8A8278" strokeWidth={1.5} dot={false} />
            <Line type="monotone" dataKey="y2023" name="2023–24" stroke="#3a9bdc" strokeWidth={1.5} dot={false} />
            <Line type="monotone" dataKey="y2024" name="2024–25" stroke="#e87d3e" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="y2025" name="2025–26" stroke="#1a1a1a" strokeWidth={2} dot={false} connectNulls={false} />
          </LineChart>
        </ResponsiveContainer>
        <ChartSource>Source: GIE AGSI+. Mandate line reflects EU Gas Storage Regulation (EU/2022/1032) requiring 90% fill by 1 November.</ChartSource>
        <ChartCaption label="Data" text="The 2025–26 cycle began from a weaker starting position, with storage dropping below 30% by late February 2026. The EU's 90% mandate, extended through 2027 though under discussion for reduction to 83%, creates a regulatory floor beneath summer injection demand — and therefore beneath the summer-winter spread." />

        <Para>
          {"The traditional business model of storage — buy summer, sell winter, pocket the spread minus costs — has been under pressure since 2024. The summer-winter spread on TTF, which reached €3.16/MWh in 2023 and was sufficient to incentivise profitable injections across most European facilities, narrowed to an average of just €1.42/MWh for the 2025 summer-winter period. Industry consensus, as reported by the energy market analysis firm Elenger and independently by the European Gas Hub research platform, is that a spread of at least €2.50–3.00/MWh is needed to cover the full costs of storage operations — injection, cushion gas financing, working capital, and the opportunity cost of capital tied up in inventory."}
        </Para>

        <Para>
          {"Yet many operators continued injecting even below breakeven, because their long-term storage agreements treat reservation fees as sunk costs. As Elenger's Q2 2025 market review documented, injection decisions were often made by comparing the spread only against financing costs — roughly €1/MWh — making injections economically viable on a marginal basis even when the absolute spread was too narrow to cover full-cycle costs. The EU's Gas Storage Regulation, which mandates that Member States fill storage to at least 90 percent of capacity by 1 November (a target extended through 2027 and under discussion for reduction to 83 percent), creates a regulatory floor beneath summer injection demand that overrides pure market economics."}
        </Para>

        {/* CHART: Storage value capture */}
        <ChartTitle>Gas Storage Value Capture: Intrinsic vs. Extrinsic (€/MWh, TTF 180-Day Asset)</ChartTitle>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={storageValueData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.borderLight} />
            <XAxis dataKey="year" tick={{ fontSize: 11, fontFamily: FONTS.sans, fill: COLORS.darkGray }} />
            <YAxis tick={{ fontSize: 11, fontFamily: FONTS.sans, fill: COLORS.darkGray }} label={{ value: "€/MWh", angle: -90, position: "insideLeft", style: { fontSize: 11, fontFamily: FONTS.sans, fill: COLORS.warmGray } }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 11, fontFamily: FONTS.sans }} />
            <Bar dataKey="intrinsic" name="Intrinsic Value" stackId="a" fill={COLORS.natgeoYellow} />
            <Bar dataKey="extrinsic" name="Extrinsic Value" stackId="a" fill="#3a9bdc" radius={[3,3,0,0]} />
          </BarChart>
        </ResponsiveContainer>
        <ChartSource>Source: Timera Energy gas storage optimisation model (rolling intrinsic backtest). Storage years run April to March.</ChartSource>
        <ChartCaption label="Data" text="The energy crisis of 2021–22 saw total storage value surge tenfold above pre-crisis levels, driven overwhelmingly by extrinsic value — the ability to re-optimise positions against volatile prompt price spreads. Post-crisis, extrinsic value has eased but remains structurally above pre-2020 norms." />

        <Sidebar title="The Rolling Intrinsic Strategy" children={`The dominant optimisation framework for gas storage and swing contracts in Europe is the <em>rolling intrinsic</em> strategy. The trader begins by hedging the maximum available summer-winter spread on the forward curve — for a 180-day-cycle facility, this means selling winter contracts and buying summer contracts at observed prices. As time passes and the forward curve evolves, the trader <em>rolls</em> — adjusting positions only when the adjustment is risk-free, meaning the new spread exceeds the old by more than the transaction cost. Timera Energy's widely used storage model formalises this approach as a simulation: for each day of the storage year, the model evaluates all available forward prices, identifies profitable adjustments to the hedge, and records the cumulative margin. The result is a distinctive asymmetric return distribution: downside is floored at the initial intrinsic hedge, while upside depends on the volatility and de-correlation of forward contract prices — what Timera calls the <em>under-estimated</em> driver of storage value.`} />

        <SceneBreak />

        {/* === SECTION: SUPPLY REVOLUTION === */}
        <Para>
          {"The structural transformation of European gas supply is the force that has reshaped every spread, every storage position, and every trading signal on the continent. Before 2022, roughly 40 percent of Europe's gas arrived through pipelines from Russia — via the Yamal corridor through Belarus and Poland, the Nord Stream pipelines under the Baltic Sea, the transit system through Ukraine, and TurkStream through Turkey and the Balkans. By 2024, Russian pipeline flows to the EU had collapsed to roughly 15 billion cubic metres, a fraction of the pre-crisis level. The transit agreement through Ukraine expired on 31 December 2024 and was not renewed. The EU has adopted legislation to phase out remaining Russian pipeline gas imports by September 2027 and LNG imports by January 2027."}
        </Para>

        {/* CHART: Pipeline flows */}
        <ChartTitle>EU Gas Import Sources by Corridor (bcm/year)</ChartTitle>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={pipelineFlowData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.borderLight} />
            <XAxis dataKey="year" tick={{ fontSize: 11, fontFamily: FONTS.sans, fill: COLORS.darkGray }} />
            <YAxis tick={{ fontSize: 11, fontFamily: FONTS.sans, fill: COLORS.darkGray }} label={{ value: "bcm", angle: -90, position: "insideLeft", style: { fontSize: 11, fontFamily: FONTS.sans, fill: COLORS.warmGray } }} />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: 11, fontFamily: FONTS.sans }} />
            <Bar dataKey="russia" name="Russia (pipeline)" stackId="a" fill="#c0392b" />
            <Bar dataKey="norway" name="Norway (North Sea)" stackId="a" fill="#2980b9" />
            <Bar dataKey="lng" name="LNG (global)" stackId="a" fill="#27ae60" />
            <Bar dataKey="northAfrica" name="North Africa" stackId="a" fill="#f39c12" radius={[3,3,0,0]} />
          </BarChart>
        </ResponsiveContainer>
        <ChartSource>Source: Bruegel European Natural Gas Imports dataset, ENTSOG Transparency Platform, IEA Gas Trade Flows.</ChartSource>
        <ChartCaption label="Data" text="The collapse of Russian pipeline gas — from 170 bcm in 2019 to roughly 10 bcm in 2025 — has been replaced primarily by LNG, fundamentally altering the geography of European gas pricing and the direction of pipeline flows." />

        <Para>
          {"The replacement of pipeline gas with LNG has inverted the traditional flow pattern of the European grid. Gas that once entered from the east — through interconnection points in the Baumgarten hub in Austria, the Mallnow compressor station on the German-Polish border, the Uzhgorod metering station in Ukraine — now enters primarily from the west and north: through LNG regasification terminals in the Netherlands (GATE at Rotterdam, the new Eemshaven FSRU), Belgium (Zeebrugge), France (Dunkerque, Montoir, Fos-sur-Mer), Spain (six terminals from Barcelona to Huelva), and the rapidly built German FSRUs at Wilhelmshaven, Brunsbüttel, and Lubmin. This means that the <em>direction</em> of spread signals has changed: before 2022, gas typically flowed west-to-east, with TTF priced at a discount to eastern hubs that reflected the transport cost from the source; now gas flows east-from-west, with TTF often priced at a premium to peripheral hubs that can source cheaper LNG locally."}
        </Para>

        <Sidebar title="ENTSOG: The Data Backbone" children={`The European Network of Transmission System Operators for Gas, founded in 2009, provides the data infrastructure that underpins all European gas trading. Its Transparency Platform publishes real-time and historical data on physical gas flows, capacity bookings, congestion, and planned maintenance at every cross-border interconnection point across 31 participating countries. The spatial and temporal granularity is remarkable: researchers can track flows at individual pipeline interconnectors rather than aggregated national borders, allowing them to distinguish, for example, between gas flowing through the Czech system via the dedicated Gazelle transit pipeline versus gas entering the national transmission grid. The ENTSOG-GIE System Capacity Map, published jointly with Gas Infrastructure Europe and updated in its latest 2026 edition to include Ukraine and Moldova, has become what GIE Secretary General Lucie Boost described as a tool that <em>\"can say more than a thousand words\"</em> — a comprehensive picture of European gas infrastructure serving policymakers, traders, and researchers alike.`} />

        <SceneBreak />

        {/* === SECTION: ML AND QUANT APPROACHES === */}
        <Para>
          {"The question of whether machine learning can improve gas price forecasting — and by extension, trading signals — has produced a substantial body of academic literature over the past five years, accelerated by both the availability of high-frequency data and the extreme volatility of the 2021–22 crisis. The landscape of published research reveals a clear hierarchy of model performance, though with important caveats about the gap between academic backtests and live trading."}
        </Para>

        <Para>
          {"At the foundation are the classical econometric models: autoregressive integrated moving averages (ARIMA) and vector autoregressive (VAR) specifications, including the Diebold-Yilmaz connectedness framework that has been applied to measure time-varying spillovers between European gas hubs. A 2022 study in <em>Energy Economics</em> by researchers examining four major European markets — TTF, NBP, NCG, and PSV — using a time-varying parameters VAR model with stochastic volatility demonstrated that the European gas market had become increasingly integrated, with TTF and the German NCG (now THE) acting as the primary net transmitters of price and volatility shocks. Critically, the study showed that the position of the British NBP had decreased as a shock transmitter while the Italian PSV had gained importance — a finding that aligned with the physical reality of growing LNG imports through southern European terminals and the commissioning of the Trans-Adriatic Pipeline from Azerbaijan."}
        </Para>

        {/* CHART: ML Performance */}
        <ChartTitle>Natural Gas Price Forecasting: Model Performance Comparison (MAPE, %)</ChartTitle>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mlPerformanceData} layout="vertical" margin={{ top: 10, right: 30, left: 100, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.borderLight} />
            <XAxis type="number" tick={{ fontSize: 11, fontFamily: FONTS.sans, fill: COLORS.darkGray }} label={{ value: "MAPE (%)", position: "insideBottom", style: { fontSize: 11, fontFamily: FONTS.sans, fill: COLORS.warmGray } }} />
            <YAxis dataKey="model" type="category" tick={{ fontSize: 11, fontFamily: FONTS.sans, fill: COLORS.darkGray }} width={120} />
            <Tooltip formatter={(v) => `${v}%`} />
            <Bar dataKey="mape" name="Mean Absolute % Error" fill="#3a9bdc" radius={[0,3,3,0]} />
          </BarChart>
        </ResponsiveContainer>
        <ChartSource>Source: Composite from published research — Mouchtaris et al. (Energies, 2021), PMC 7256398 (2020), PMC 12668636 (2025), MDPI Energies 18/19 (2025). Henry Hub benchmarks; European TTF studies show comparable patterns.</ChartSource>
        <ChartCaption label="Data" text="Hybrid deep learning architectures consistently outperform traditional models. The VMD-CNN-BiLSTM-Attention framework achieves MAPE of roughly 3.5% at four-step-ahead horizons — but all models show degrading accuracy as the prediction horizon extends, reflecting the fundamental unpredictability of supply shocks and geopolitical events." />

        <Para>
          {"The machine learning frontier has moved rapidly beyond single models. A 2025 study published in <em>PLOS ONE</em> systematically compared feedforward neural networks, support vector machines, random forests, and LSTM networks on Henry Hub daily prices from 1997 to 2024, finding that LSTM achieved the lowest one-step-ahead mean absolute percentage error at 8.53 percent. But the most impressive results have come from hybrid architectures: CNN-BiLSTM-Attention models that combine convolutional layers (for extracting features from the price series) with bidirectional LSTM layers (for capturing both forward and backward temporal dependencies) and attention mechanisms (for weighting which historical observations matter most for the current prediction). A 2025 study in <em>Energies</em> reported R² values above 95 percent for one-step-ahead forecasts and above 87 percent at longer horizons."}
        </Para>

        <Para>
          {"The most sophisticated approaches integrate signal decomposition as a preprocessing step. Ensemble Empirical Mode Decomposition (EEMD) and Variational Mode Decomposition (VMD) break the raw price series into multiple Intrinsic Mode Functions — each representing a different frequency component of the price signal, from the high-frequency noise of daily fluctuations to the low-frequency trend of seasonal and structural price movements. Each decomposed component is then forecast separately using an optimised machine learning model, and the individual forecasts are aggregated. A VMD-CNN-BiLSTM-Attention model applied to NYMEX natural gas futures daily closing prices achieved a four-step forecast MAPE of 3.5 percent or lower and R² above 98 percent, substantially outperforming non-decomposition approaches."}
        </Para>

        <Sidebar title="Feature Engineering for Gas Spreads" children={`Multivariate gas price models have expanded far beyond simple autoregressive inputs. A 2025 study in <em>Petroleum Science</em> identified 16 variables across five dimensions that materially improve natural gas price prediction: production metrics (US output, rig counts), marketing variables (storage inventories, import/export volumes), commodity cross-correlations (crude oil, coal, electricity prices), political/economic indicators (geopolitical risk indices, exchange rates, interest rates), and temperature data. The feature selection process — using LASSO regression, grey relation analysis, and random forest importance ranking — was critical: not all variables improve prediction, and including irrelevant features degrades model performance. For European spread trading specifically, the most important features are typically: storage injection/withdrawal rates (from GIE AGSI+), pipeline flow data (from ENTSOG), LNG arrival schedules, weather forecasts, and the TTF forward curve shape.`} />

        <Para>
          {"Reinforcement learning represents the newest frontier. A comprehensive 2025 review in <em>Energies</em> documented the growing application of RL frameworks — including Deep Q-Networks, Proximal Policy Optimization, Deep Deterministic Policy Gradient, and Advantage Actor-Critic methods — to energy trading and real options problems. A 2023 paper by Giorgi and colleagues proposed an RL algorithm for commodity trading that benchmarked against the analytical optimal solution under linear dynamics and quadratic transaction costs, showing that the RL agent could closely replicate the optimal strategy, then outperform it in non-linear settings more representative of real WTI spot prices. The ART-DRL framework, published in 2025 in the <em>Journal of Risk and Financial Management</em>, introduced an adaptive switching mechanism that dynamically selects among competing DRL agents based on real-time performance — an approach explicitly designed for the non-stationary, regime-shifting nature of energy commodity markets."}
        </Para>

        <Para>
          {"The application to <em>spread</em> trading specifically — rather than outright price forecasting — remains an active research frontier. The theoretical advantage of RL for spread trading is substantial: the agent can learn a policy that simultaneously considers the state of storage inventories, pipeline capacity utilisation, weather forecasts, forward curve shape, and cross-hub correlations, then outputs a continuous action (the size and direction of the spread position) rather than a discrete classification. The challenge is the reward function: in live trading, the relationship between an action taken today and the reward received when the spread converges (or diverges) days or weeks later creates a credit assignment problem that standard supervised learning cannot handle but that RL is architecturally designed to address."}
        </Para>

        <SceneBreak />

        {/* === SECTION: OPTIMISATION FRAMEWORKS === */}
        <Para>
          {"For practitioners managing real portfolios — utilities with physical gas supply obligations, trading houses with storage capacity, LNG importers with regasification slots — the question is not whether ML can forecast prices but how optimisation frameworks can translate forecasts into actionable trading decisions under constraints. The gas portfolio optimisation problem is fundamentally a stochastic dynamic program: at each decision point, the trader must choose how much gas to inject, withdraw, flow across a border, buy, sell, or leave in the ground, subject to physical constraints (injection rates, withdrawal rates, pipeline capacity, linepack limits), contractual constraints (take-or-pay obligations, storage mandates), and financial constraints (margin requirements, risk limits, collateral availability)."}
        </Para>

        <Para>
          {"Timera Energy's approach to this problem — which has become something of an industry standard in European gas markets — uses the rolling intrinsic strategy as the base layer, supplemented by stochastic modelling for delta hedging when warranted. Their backtest methodology, applied daily across each storage year, evaluates the full set of available forward prices, identifies all profitable adjustments to the existing hedge position, and records the cumulative margin. The result, as their May 2025 analysis showed, is a combination of forward trading (month-ahead trades to lock in seasonal shape) and within-month trades (to capture value from short-term prompt volatility). Storage value capture in 2024 reached approximately €7.50/MWh for a generic 180-day-cycle TTF asset — down 38 percent from 2023 but still at least double pre-crisis levels."}
        </Para>

        <Para>
          {"The three core strategies form a spectrum. At one extreme, <em>spot optimisation</em> — dispatching the asset purely against current and expected spot prices with no forward hedging — produces the widest distribution of returns: high expected value but high risk. At the other extreme, <em>static intrinsic</em> — locking in the observed summer-winter spread at the start of the storage year and holding to maturity — produces the narrowest distribution: low risk but no access to extrinsic value. Rolling intrinsic sits in between, and its dominance in European markets reflects the industry's collective judgment that the trade-off between additional return and additional risk favours the middle ground."}
        </Para>

        <Para>
          {"The emerging opportunity is to use ML models not to replace these frameworks but to enhance them at the margin. A price forecast with a MAPE of 3–4 percent, if properly calibrated for confidence intervals, can improve the rolling intrinsic strategy in two ways: first, by identifying moments when the probability-weighted expected gain from adjusting a hedge exceeds the threshold that pure backward-looking rules would set; and second, by providing better estimates of forward price volatility and correlation — the inputs that drive the calculation of extrinsic value and therefore the reservation price at which storage capacity should be offered to the market."}
        </Para>

        <Sidebar title="The Capacity Auction Problem" children={`A lesser-known optimisation challenge in European gas trading is the <em>capacity booking</em> decision. At each cross-border interconnection point, capacity is auctioned by the TSOs in products of varying duration: annual firm capacity (auctioned roughly a year in advance), quarterly, monthly, daily, and within-day. The EU multiplier system prices short-term products at a multiple of the annual tariff — typically 1.5x for quarterly and up to 3x or more for daily capacity. A trader considering a location spread must decide which capacity product to book. Annual capacity is cheapest per unit but commits capital for a year; daily capacity is most flexible but most expensive per unit and may not be available if the interconnection point is congested. The optimisation — which tenure of capacity to hold, at which points, and how to integrate that capacity cost into the spread trade's expected profitability — is itself a stochastic programming problem that is well suited to reinforcement learning, though published applications remain scarce.`} />

        <SceneBreak />

        {/* === SECTION: MARKET INTEGRATION AND CONVERGENCE === */}
        <Para>
          {"The ultimate goal of European gas market liberalisation — the Gas Target Model promoted by the European Commission — is price convergence: a state in which gas prices at all European hubs move in lockstep, with the spread between any two hubs reflecting only the physical cost of transportation. Academics have tested this hypothesis using a range of econometric tools. A study by researchers at the Cambridge Judge Business School, published as an Energy Policy Research Group working paper, applied network theory — specifically time-varying Granger causality networks — to measure the density and directionality of causal connections between European gas hub prices. Their finding was nuanced: network density (a proxy for integration) varied substantially over time, reaching its highest observation on 29 January 2018 and its lowest on 10 October 2018, suggesting that integration is not a steady state but a dynamic condition that fluctuates with market stress, infrastructure availability, and seasonal demand patterns."}
        </Para>

        <Para>
          {"The 2022 crisis provided a dramatic natural experiment. Correlation coefficients between the three large northwestern European LNG importers (TTF, NBP, TRF) and the benchmark TTF had shown near-perfect correlation before April 2022. During the crisis, as Heather documented, the NBP, Belgian hubs, and French TRF diverged sharply from the other five hubs for most of the period from April to September 2022. The divergence was driven by specific physical bottlenecks: infrastructure constraints in getting regasified LNG into national grids and across borders, especially into Germany. Markets began rebalancing from as early as Q4 2022, and since approximately May 2023, the selected hubs have become well correlated again, with price convergence broadly similar to the pre-crisis period. Volatility at the French TRF, however, remained the highest among the continental hubs throughout 2023 and into 2024 — a persistent anomaly that offers persistent spread trading opportunities for those willing to take the TRF liquidity risk."}
        </Para>

        <Para>
          {"A 2022 study published in <em>Energy Economics</em>, using the Diebold-Yilmaz connectedness approach with a time-varying parameters VAR model with stochastic volatility, showed that the European natural gas market had become increasingly integrated over the period studied, but also revealed an important structural shift: the Dutch TTF and the German NCG had supplanted the British NBP as the primary net transmitters of price and volatility shocks across the European system. In more recent years, the dominance of these two markets had weakened, while spillovers from the Italian PSV had gained importance — a shift the researchers attributed to the growing role of LNG supply through southern European terminals and the commissioning of the Trans-Adriatic Pipeline carrying Azerbaijani gas to Italy."}
        </Para>

        <SceneBreak />

        {/* === SECTION: THE FUTURE === */}
        <Para>
          {"The European gas market of 2026 sits at a structural inflection point. The EU has legislated the phase-out of Russian gas imports by 2027. A wave of new global LNG export capacity — from the US Gulf Coast (Plaquemines, Golden Pass, Rio Grande), Qatar (North Field expansion), and Mozambique — is beginning to arrive, adding roughly 100 million tonnes per annum to global supply by 2028. European gas demand is declining — compressed by efficiency gains, electrification, heat pump deployment, and renewables growth — but not fast enough to eliminate the continent's dependence on imported molecules. Storage, which accounts for roughly a quarter of Europe's winter supply, faces a tension between regulatory mandates (fill to 90 percent by November) and market economics (spreads too narrow to incentivise commercial injection). And the price-setting power of TTF, already the world's most liquid gas hub, continues to grow: traded volumes on the EEX Group alone increased 24 percent year-on-year in 2025, with TTF derivatives rising 25 percent."}
        </Para>

        <Para>
          {"For spread traders, this environment creates both opportunity and complexity. The location spreads that exist today are the residue of infrastructure that was built for a supply geography that no longer exists — pipelines designed to carry Russian gas westward now operate in reverse or sit idle, while LNG terminals built as marginal supply sources now carry the baseload. The <em>transitional friction</em> of this reorientation — a compressor station calibrated for eastward flow that loses efficiency in reverse, a border point where capacity auction rules were written for a world of annual Russian contracts, a storage facility in eastern Germany that cannot fill because there is no longer a direct pipeline connection to Russian supply — generates the price signals that algorithms are learning to read."}
        </Para>

        <Para>
          {"The risk, acknowledged by every practitioner in the market, is that the signals are becoming noisier, not cleaner. The extreme volatility of 2022 produced enormous trading profits for those positioned correctly and enormous losses for those who were not — the total value at risk in European gas trading increased by orders of magnitude. The structural shift from pipeline to LNG supply has introduced a new source of correlation: European gas prices are now linked to Asian LNG prices with a correlation coefficient that Elenger calculated at 0.95 in 2024, meaning that a cold snap in Tokyo or a maintenance shutdown at a Queensland LNG plant can move TTF prices in Amsterdam within hours. The ML models that performed well on historical Henry Hub data — a deep, liquid, predominantly domestic market with a single pipeline grid — face a harder problem on TTF, where the price is determined by the intersection of global LNG flows, Norwegian pipeline maintenance schedules, European storage mandates, renewable generation intermittency, and the geopolitical risk premium of a continent that until recently depended on an adversary for 40 percent of its gas supply."}
        </Para>

        {/* === CLOSING MOVEMENT === */}
        <Para>
          {"The gas molecule does not know it has a price. It flows where pressure gradients push it, indifferent to the billions of euros of financial contracts constructed around its journey from well to burner tip. But the infrastructure through which it travels — the 200,000 kilometres of high-pressure transmission pipeline, the 160 underground storage facilities, the 40 LNG regasification terminals, the thousands of cross-border interconnection points catalogued on ENTSOG's System Capacity Map — is not indifferent. It was built by humans, regulated by humans, and priced by humans. The algorithms now learning to trade the spreads embedded in this infrastructure are, in the end, learning to read the signature of human decisions crystallised in steel and concrete: where a pipeline was routed, how a tariff was set, which storage cavern was filled and which was left empty."}
        </Para>

        <Para>
          {"The question is whether the algorithms will make the market more efficient — closing spreads faster, allocating gas more rationally, smoothing the seasonal swings that once made winters in Europe a matter of genuine uncertainty — or whether they will introduce new forms of fragility: flash crashes in thinly traded hubs, herding behaviour among models trained on the same data, or a false confidence in predictions that are only as good as the stable regime from which the training data was drawn. The answer will depend not on the sophistication of the models but on the humility of the people who deploy them — and on whether the physical infrastructure beneath the algorithms can keep up with the financial demands placed upon it."}
        </Para>

        <p style={{ fontFamily: FONTS.body, fontStyle: "italic", fontSize: "21px", lineHeight: 1.78, color: COLORS.black, marginBottom: "1.3em", marginTop: "28px" }}>
          In the control room of a Dutch TSO, a screen shows real-time flows at every interconnection point on the network — green arrows for gas moving within normal parameters, amber for approaching capacity limits, red for congestion. On a cold February morning in 2026, with European storage below 30 percent and the injection season still six weeks away, nearly every arrow between the Netherlands and Germany is amber. Somewhere in London, in Singapore, in Houston, an algorithm is reading those same data feeds, calculating the probability that amber will turn red, and placing a trade. The molecule continues to flow, unbothered by its own price.
        </p>

        <SceneBreak />

        {/* === REFERENCE SUMMARY === */}
        <div style={{ background: COLORS.cream, border: `1px solid ${COLORS.borderLight}`, borderRadius: "3px", padding: "32px", margin: "48px 0" }}>
          <div style={{ fontFamily: FONTS.sans, fontSize: "14px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: COLORS.darkGray, marginBottom: "20px" }}>Reference Summary</div>
          <div style={{ fontFamily: FONTS.sans, fontSize: "14px", lineHeight: 1.7, color: COLORS.darkGray }}>
            <p style={{ marginBottom: "12px" }}><strong>Classification:</strong> Commodity market / Energy trading / Financial derivatives</p>
            <p style={{ marginBottom: "12px" }}><strong>Key statistics:</strong> TTF traded volumes: ~66,250 TWh (2024, +25% YoY). TTF churn ratio: 20.3x (2024). EU storage capacity: ~1,100 TWh working volume. Russian pipeline imports: ~10 bcm (2025, down from 170 bcm in 2019). EU LNG imports: ~185 bcm (2025). EEX Group gas volumes: 8,823 TWh (2025, +24% YoY). Summer-winter spread: ~€1.42/MWh (2025 avg); breakeven ~€2.50–3.00/MWh. LSTM one-step MAPE: 8.53%; hybrid VMD-CNN-BiLSTM: ≤3.5%.</p>
            <p style={{ marginBottom: "12px" }}><strong>Key hubs:</strong> TTF (Netherlands, mature/global benchmark), NBP (UK, active/regional), THE (Germany, active), TRF (France, active), PSV (Italy, active), VTP (Austria, poor), PVB (Spain, poor), ZTP (Belgium, poor).</p>
            <p style={{ marginBottom: "12px" }}><strong>Key figures:</strong> Patrick Heather (OIES, Senior Research Fellow — decade-long series on European hub development). Timera Energy (London — storage optimisation model, rolling intrinsic backtesting). ENTSOG/GIE (transparency infrastructure). Piotr Kuś (ENTSOG General Director). Lucie Boost (GIE Secretary General).</p>
            <p style={{ marginBottom: "12px" }}><strong>Regulatory framework:</strong> EU Regulation 2009/715 (entry-exit system). EU Gas Storage Regulation 2022/1032 (90% fill mandate, extended to 2027, proposed reduction to 83%). CAM network code (capacity auctions). REPowerEU. Phase-out: Russian pipeline gas by Sep 2027, Russian LNG by Jan 2027.</p>
            <p style={{ marginBottom: "0" }}><strong>Primary sources:</strong> Oxford Institute for Energy Studies (Heather, NG192 2024, NG198 2025); Timera Energy blog series (2020–2025); ENTSOG Transparency Platform; GIE AGSI+; EEX Group annual volumes; Elenger market reviews; Bruegel European Natural Gas Imports dataset; Çam & Lencz (Energy Economics, 2021); Diebold-Yilmaz connectedness studies (Energy Economics, 2022).</p>
          </div>
        </div>

        {/* === SOURCE INTEGRITY NOTE === */}
        <div style={{ background: COLORS.cream, border: `1px solid ${COLORS.borderLight}`, borderRadius: "3px", padding: "32px", margin: "48px 0" }}>
          <div style={{ fontFamily: FONTS.sans, fontSize: "14px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: COLORS.darkGray, marginBottom: "20px" }}>Source Integrity Note</div>
          <div style={{ fontFamily: FONTS.sans, fontSize: "13px", lineHeight: 1.7, color: COLORS.darkGray }}>
            <p style={{ marginBottom: "16px" }}><strong>FACTUAL INTEGRITY DISCLOSURE</strong></p>
            <p style={{ marginBottom: "8px" }}><strong>Verified facts (Tier 1):</strong></p>
            <p style={{ marginBottom: "4px" }}>— TTF volumes, churn ratios, hub classifications: Patrick Heather/OIES papers NG192 (2024), NG198 (2025)</p>
            <p style={{ marginBottom: "4px" }}>— TTF set up by Gasunie in 2003, trades in EUR/MWh: Wikipedia/verified</p>
            <p style={{ marginBottom: "4px" }}>— European traded volumes +23% YoY (2024): Heather/OIES NG198</p>
            <p style={{ marginBottom: "4px" }}>— EEX Group gas volumes 8,823.2 TWh (+24% YoY, 2025): EEX press release Jan 2026</p>
            <p style={{ marginBottom: "4px" }}>— TTF-TRF spread behaviour 2022: Heather/OIES NG192</p>
            <p style={{ marginBottom: "4px" }}>— Summer-winter spread €1.42/MWh avg (2025): Elenger Q2 2025 market review</p>
            <p style={{ marginBottom: "4px" }}>— Breakeven €2.50–3.00/MWh: Elenger, energynews.pro</p>
            <p style={{ marginBottom: "4px" }}>— EU storage regulation 90% target, extension to 2027, proposed 83% reduction: Elenger Q2 2025, European Parliament</p>
            <p style={{ marginBottom: "4px" }}>— Storage below 30% by Feb 2026: European Gas Hub (Feb 27, 2026)</p>
            <p style={{ marginBottom: "4px" }}>— Timera storage model rolling intrinsic methodology and results: Timera Energy blog (2020–2025 series)</p>
            <p style={{ marginBottom: "4px" }}>— LSTM MAPE 8.53%: PMC 12668636 (2025)</p>
            <p style={{ marginBottom: "4px" }}>— Hybrid model R² above 95%: MDPI Energies 18/19 (2025)</p>
            <p style={{ marginBottom: "4px" }}>— VMD-CNN-BiLSTM MAPE ≤3.5%: MDPI Energies/ResearchGate</p>
            <p style={{ marginBottom: "4px" }}>— EU Diebold-Yilmaz gas connectedness study: ScienceDirect, Energy Economics (2022)</p>
            <p style={{ marginBottom: "4px" }}>— ENTSOG founded 2009: verified multiple sources</p>
            <p style={{ marginBottom: "4px" }}>— Entry-exit system from EU Regulation 2009/715: Çam & Lencz (Energy Economics, 2021)</p>
            <p style={{ marginBottom: "4px" }}>— Multiplier system and short-term capacity: Çam & Lencz (Energy Economics, 2021)</p>
            <p style={{ marginBottom: "4px" }}>— LNG-TTF correlation 0.95 (2024): Elenger Q4 2024 review</p>
            <p style={{ marginBottom: "4px" }}>— Russian transit Ukraine expired Dec 2024: Bruegel, OIES</p>
            <p style={{ marginBottom: "4px" }}>— Phase-out legislation: Bruegel European Natural Gas Imports (Dec 2025 agreement)</p>
            <p style={{ marginBottom: "4px" }}>— Patrick Heather biography: OIES website, joined 2006, Senior Research Fellow</p>
            <p style={{ marginBottom: "4px" }}>— Piotr Kuś (ENTSOG General Director), Lucie Boost (GIE Secretary General): energiesmedia.com (Jan 2026)</p>

            <p style={{ marginBottom: "8px", marginTop: "16px" }}><strong>Composited scenes (Tier 2):</strong></p>
            <p style={{ marginBottom: "4px" }}>— Opening scene (London trader, BBL interconnector arbitrage): Constructed from verified market mechanics. The €48 TTF price is consistent with late Dec 2024 TTF levels (Statista/TradingEconomics). BBL is a verified interconnector. The trading mechanics described are standard industry practice.</p>
            <p style={{ marginBottom: "4px" }}>— Closing scene (Dutch TSO control room, amber arrows): Constructed. ENTSOG publishes real-time flow data; TSOs do operate network monitoring systems with colour-coded flow displays. Storage below 30% in Feb 2026 is verified (European Gas Hub).</p>

            <p style={{ marginBottom: "8px", marginTop: "16px" }}><strong>Details requiring verification:</strong></p>
            <p style={{ marginBottom: "4px" }}>— Specific traded volume figures (TWh) for individual years prior to 2023: Approximated from OIES charts and text; exact figures require access to LEBA/ICE-Endex primary data.</p>
            <p style={{ marginBottom: "4px" }}>— Pipeline flow volumes (bcm) for 2025: Estimated from ENTSOG/Bruegel trends; final 2025 data may differ.</p>

            <p style={{ marginBottom: "8px", marginTop: "16px" }}><strong>Invented or unverifiable details:</strong></p>
            <p style={{ marginBottom: "4px" }}>— Chart data points are representative approximations based on described ranges and trends in verified sources. They are designed to illustrate the shape and magnitude of trends accurately, but the specific numerical values at individual data points may differ from actual market data. All charts should be considered editorial illustrations of verified trends.</p>

            <p style={{ marginBottom: "8px", marginTop: "16px" }}><strong>EDITORIAL PRODUCTION NOTES</strong></p>
            <p style={{ marginBottom: "4px" }}><strong>Claims requiring expert verification:</strong> Specific ML model MAPE figures are drawn from academic studies and may not generalise to European spread forecasting. Storage value backtests reflect Timera's published methodology; actual trading results vary by asset and strategy.</p>
            <p style={{ marginBottom: "4px" }}><strong>Voices that should be added:</strong> Interviews with active gas traders at major commodity houses (Vitol, Trafigura, Gunvor); TSO operational perspectives; ACER regulatory officials; storage facility operators (Uniper, Storengy); ML researchers working specifically on European gas spread models; Central and Eastern European market participants.</p>
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ textAlign: "center", marginTop: "60px", paddingTop: "40px" }}>
          <div style={{ width: "40px", height: "4px", background: COLORS.natgeoYellow, margin: "0 auto 20px" }} />
          <p style={{ fontFamily: FONTS.sans, fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: COLORS.warmGray }}>
            National Geographic-Style Production Document
          </p>
        </div>
      </div>
    </div>
  );
}
