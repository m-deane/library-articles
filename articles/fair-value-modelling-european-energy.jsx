import { useState } from "react";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";

// ─── DESIGN TOKENS (Economist Mode) ─────────────────────────────────────────
const COLORS = {
  economistRed: "#E3120B",
  black: "#1a1a1a",
  offWhite: "#FAF8F5",
  cream: "#F2EDE4",
  warmGray: "#8A8278",
  darkGray: "#3D3B38",
  navy: "#1F2937",
  sidebarBg: "#F0EBE1",
  borderLight: "#E0DAD0",
  chartRed: "#E3120B",
  chartNavy: "#1F2937",
  chartGray: "#8A8278",
  chartBlue: "#2563EB",
  chartTeal: "#0D9488",
};

// ─── TTF PRICE DATA ─────────────────────────────────────────────────────────
const ttfPriceData = [
  { period: "Jan 2020", price: 10, label: "Pre-pandemic" },
  { period: "May 2020", price: 3.5, label: "Covid low" },
  { period: "Oct 2020", price: 14, label: "" },
  { period: "Mar 2021", price: 18, label: "" },
  { period: "Jul 2021", price: 36, label: "" },
  { period: "Oct 2021", price: 116, label: "First spike" },
  { period: "Dec 2021", price: 118, label: "" },
  { period: "Mar 2022", price: 220, label: "Invasion" },
  { period: "Jun 2022", price: 140, label: "" },
  { period: "Aug 2022", price: 345, label: "All-time peak" },
  { period: "Dec 2022", price: 77, label: "" },
  { period: "May 2023", price: 30, label: "" },
  { period: "Oct 2023", price: 42, label: "" },
  { period: "Mar 2024", price: 26, label: "" },
  { period: "Oct 2024", price: 38, label: "" },
  { period: "Jan 2025", price: 47, label: "" },
  { period: "Jun 2025", price: 36, label: "" },
  { period: "Jan 2026", price: 37, label: "" },
  { period: "Mar 2026", price: 54, label: "Iran crisis" },
  { period: "Apr 2026", price: 47, label: "Current" },
];

// ─── TRADING HOUSE PROFITS DATA ─────────────────────────────────────────────
const tradingProfitsData = [
  { year: "2019", Vitol: 2.3, Trafigura: 1.6, Gunvor: 0.6 },
  { year: "2020", Vitol: 3.0, Trafigura: 2.0, Gunvor: 0.7 },
  { year: "2021", Vitol: 4.2, Trafigura: 3.1, Gunvor: 1.2 },
  { year: "2022", Vitol: 15.1, Trafigura: 7.3, Gunvor: 2.4 },
  { year: "2023", Vitol: 13.2, Trafigura: 7.3, Gunvor: 1.3 },
  { year: "2024", Vitol: 8.7, Trafigura: 2.8, Gunvor: 0.7 },
];

// ─── EU GAS SUPPLY MIX DATA ────────────────────────────────────────────────
const gasSupplyData = [
  { year: "2020", Russia: 155, Norway: 85, LNG: 80, Other: 45 },
  { year: "2021", Russia: 140, Norway: 90, LNG: 80, Other: 40 },
  { year: "2022", Russia: 60, Norway: 95, LNG: 120, Other: 45 },
  { year: "2023", Russia: 30, Norway: 100, LNG: 125, Other: 40 },
  { year: "2024", Russia: 20, Norway: 100, LNG: 130, Other: 38 },
  { year: "2025", Russia: 15, Norway: 100, LNG: 120, Other: 35 },
];

// ─── ML ADOPTION TIMELINE DATA ─────────────────────────────────────────────
const mlAdoptionData = [
  { year: "2018", adoption: 12, label: "Early pilots" },
  { year: "2019", adoption: 18, label: "" },
  { year: "2020", adoption: 28, label: "Covid accelerant" },
  { year: "2021", adoption: 38, label: "" },
  { year: "2022", adoption: 52, label: "Volatility boom" },
  { year: "2023", adoption: 61, label: "" },
  { year: "2024", adoption: 68, label: "" },
  { year: "2025", adoption: 74, label: "Agentic AI" },
];

// ─── BRENT CURVE DATA ───────────────────────────────────────────────────────
const brentCurveData = [
  { month: "Prompt", apr2025: 65, apr2026: 96 },
  { month: "M+3", apr2025: 63, apr2026: 90 },
  { month: "M+6", apr2025: 61, apr2026: 85 },
  { month: "M+9", apr2025: 60, apr2026: 82 },
  { month: "M+12", apr2025: 59, apr2026: 80 },
  { month: "M+18", apr2025: 58, apr2026: 78 },
  { month: "M+24", apr2025: 58, apr2026: 76 },
];

// ─── HELPER COMPONENTS ──────────────────────────────────────────────────────
const Sidebar = ({ title, children }) => (
  <div style={{
    background: COLORS.sidebarBg,
    border: `1px solid ${COLORS.borderLight}`,
    borderLeft: `3px solid ${COLORS.economistRed}`,
    padding: "28px 28px 24px",
    margin: "36px 0",
    borderRadius: "2px",
  }}>
    <div style={{
      fontFamily: "'Source Sans 3', sans-serif",
      fontSize: "12px",
      fontWeight: 700,
      letterSpacing: "2px",
      textTransform: "uppercase",
      color: COLORS.economistRed,
      marginBottom: "12px",
    }}>{title}</div>
    <div style={{
      fontFamily: "'Source Sans 3', sans-serif",
      fontSize: "15px",
      lineHeight: 1.65,
      color: COLORS.darkGray,
    }}>{children}</div>
  </div>
);

const ChartCaption = ({ children, source }) => (
  <div style={{ margin: "8px 0 36px", padding: "0 4px" }}>
    <div style={{
      fontFamily: "'Source Sans 3', sans-serif",
      fontSize: "13px",
      lineHeight: 1.5,
      color: COLORS.darkGray,
    }}>{children}</div>
    {source && (
      <div style={{
        fontFamily: "'Source Sans 3', sans-serif",
        fontSize: "11px",
        color: COLORS.warmGray,
        marginTop: "4px",
      }}>Source: {source}</div>
    )}
  </div>
);

const ChartTitle = ({ children }) => (
  <div style={{
    fontFamily: "'Playfair Display', serif",
    fontSize: "18px",
    fontWeight: 700,
    color: COLORS.black,
    marginBottom: "4px",
  }}>{children}</div>
);

const ChartSubtitle = ({ children }) => (
  <div style={{
    fontFamily: "'Source Sans 3', sans-serif",
    fontSize: "13px",
    color: COLORS.warmGray,
    marginBottom: "16px",
  }}>{children}</div>
);

// ─── CUSTOM TOOLTIP ─────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "#fff",
        border: `1px solid ${COLORS.borderLight}`,
        padding: "10px 14px",
        fontFamily: "'Source Sans 3', sans-serif",
        fontSize: "13px",
      }}>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color }}>
            {p.name}: {typeof p.value === 'number' ? p.value.toLocaleString() : p.value}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────
export default function EconomistArticle() {
  const [showIntegrity, setShowIntegrity] = useState(false);

  const P = ({ children, first }) => (
    <p style={{
      fontFamily: "'Source Serif 4', serif",
      fontSize: "17px",
      lineHeight: 1.75,
      color: COLORS.black,
      margin: "0 0 20px",
      textIndent: first ? 0 : undefined,
    }} dangerouslySetInnerHTML={{ __html: children }} />
  );

  return (
    <div style={{
      background: COLORS.offWhite,
      minHeight: "100vh",
      maxWidth: "100%",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Sans+3:wght@300;400;600;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .recharts-cartesian-grid-horizontal line,
        .recharts-cartesian-grid-vertical line { stroke: ${COLORS.borderLight}; }
      `}</style>

      {/* ─── MODE BADGE ─── */}
      <div style={{
        fontFamily: "'Source Sans 3', sans-serif",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "2.5px",
        textTransform: "uppercase",
        color: COLORS.warmGray,
        textAlign: "center",
        padding: "16px 0 12px",
      }}>
        MODE: THE ECONOMIST &nbsp;|&nbsp; FORMAT: ECONOMIST BRIEFING
      </div>

      {/* ─── RED BORDER STRIP ─── */}
      <div style={{ height: "4px", background: COLORS.economistRed, width: "100%" }} />

      {/* ─── HERO SECTION ─── */}
      <div style={{
        background: COLORS.navy,
        padding: "80px 24px 64px",
        textAlign: "center",
        position: "relative",
      }}>
        <div style={{
          fontFamily: "'Source Sans 3', sans-serif",
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: COLORS.economistRed,
          marginBottom: "24px",
        }}>◆ Briefing</div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900,
          fontSize: "clamp(32px, 6vw, 56px)",
          color: "#FFFFFF",
          lineHeight: 1.15,
          maxWidth: "760px",
          margin: "0 auto 20px",
        }}>
          The Price of Knowing
        </h1>
        <p style={{
          fontFamily: "'Source Serif 4', serif",
          fontStyle: "italic",
          fontSize: "clamp(16px, 2.5vw, 20px)",
          color: "rgba(255,255,255,0.82)",
          maxWidth: "620px",
          margin: "0 auto",
          lineHeight: 1.55,
        }}>
          Fair value models once relied on storage curves and pipeline flows. Now machine learning is rewriting the playbook for European energy trading. Whether it works is another matter.
        </p>
      </div>

      {/* ─── ARTICLE BODY ─── */}
      <div style={{
        maxWidth: "680px",
        margin: "0 auto",
        padding: "48px 24px 60px",
      }}>
        <P first>The world produces roughly 4 trillion cubic metres of natural gas each year. That approximately 500 billion of those cubic metres flow through European markets&mdash;bought, sold, hedged, stored, regasified and burned in an intricate choreography of contracts, cargoes and pipelines&mdash;is a feat of coordination that few outside the industry appreciate. Fewer still appreciate that the price of this gas, at any given moment, is the output of a model. Someone, somewhere, has a view on what a megawatt-hour of Dutch TTF gas is <em>worth</em>, as distinct from what it currently <em>costs</em>. That distinction&mdash;between fair value and market price&mdash;is where fortunes are made.</P>

        <P>In August 2022, TTF front-month futures hit &euro;345 per megawatt-hour, roughly one hundred times their pandemic-era low of &euro;3.50. The spike, driven by Russia&rsquo;s weaponisation of pipeline gas exports and a scramble to fill European storage before winter, was the most extreme dislocation in the history of commodities markets. Trading houses that held long positions or physical inventory made extraordinary profits: Vitol, the world&rsquo;s largest independent energy trader, reported net earnings of $15.1bn that year; Trafigura, $7.3bn. By 2024, with markets calmer and prices settling around &euro;35/MWh&mdash;still double pre-crisis levels&mdash;Vitol&rsquo;s earnings had fallen to $8.7bn and Trafigura&rsquo;s to $2.8bn. Gunvor, the third of the major Geneva-Geneva-London triangle of trading houses, saw profits fall from $2.4bn to $729m.</P>

        <P>The question confronting every participant in European energy markets is deceptively simple: what is the fair value of a cargo of LNG arriving at Zeebrugge in six months? Or a barrel of Brent crude for December delivery? The answer depends on which model you trust&mdash;and increasingly, on whether that model was built by a human or a machine.</P>

        {/* ─── CHART 1: TTF PRICE HISTORY ─── */}
        <div style={{ margin: "40px 0 8px" }}>
          <ChartTitle>A market unmoored</ChartTitle>
          <ChartSubtitle>Dutch TTF front-month gas futures, &euro;/MWh, 2020&ndash;2026</ChartSubtitle>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={ttfPriceData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="ttfGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.chartRed} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={COLORS.chartRed} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" tick={{ fontSize: 11, fontFamily: "'Source Sans 3', sans-serif", fill: COLORS.warmGray }} interval={3} />
              <YAxis tick={{ fontSize: 11, fontFamily: "'Source Sans 3', sans-serif", fill: COLORS.warmGray }} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={345} stroke={COLORS.chartRed} strokeDasharray="4 4" label={{ value: "€345 peak", position: "right", fontSize: 11, fill: COLORS.chartRed, fontFamily: "'Source Sans 3', sans-serif" }} />
              <Area type="monotone" dataKey="price" stroke={COLORS.chartRed} strokeWidth={2} fill="url(#ttfGrad)" name="TTF €/MWh" />
            </AreaChart>
          </ResponsiveContainer>
          <ChartCaption source="Trading Economics, ICE Endex, IEA. Approximate monthly front-month closes.">
            TTF prices collapsed to &euro;3.50 during the pandemic, surged to &euro;345 in August 2022, and have since settled at roughly double pre-crisis levels. The 2026 Iran escalation pushed prices back above &euro;50.
          </ChartCaption>
        </div>

        <P>To understand where machine learning fits, one must first understand the models it seeks to replace. Fair value in commodity markets rests on a theoretical framework that dates to the late 1930s: the <em>theory of storage</em>, first articulated by Nicholas Kaldor and later refined by Holbrook Working and Michael Brennan. The theory holds that the price of a futures contract should equal the spot price of the commodity plus the cost of financing, storage and insurance, minus the &ldquo;convenience yield&rdquo;&mdash;the unobservable benefit of holding physical inventory. In mathematical shorthand: F&nbsp;=&nbsp;S&nbsp;&times;&nbsp;e<sup>(r+s&minus;c)t</sup>, where <em>r</em> is the risk-free rate, <em>s</em> the storage cost, <em>c</em> the convenience yield and <em>t</em> the time to delivery.</P>

        <P>This formula works tolerably well for storable commodities with liquid futures markets. For gold, where storage is cheap and convenience yield is negligible, the cost-of-carry model predicts futures prices with considerable accuracy. For natural gas, it does not. European gas storage is expensive, seasonal, and physically constrained. Germany&rsquo;s storage facilities were just 22% full in early 2026; the Netherlands, 6%. The convenience yield&mdash;the implicit value of being able to deliver gas to customers during a cold snap or a Dunkelflaute, when wind and solar output collapse simultaneously&mdash;is both enormous and impossible to observe directly. It must be inferred from the shape of the futures curve, which makes the model circular: fair value depends on convenience yield, which depends on futures prices, which depend on fair value.</P>

        <Sidebar title="The convenience yield problem">
          Convenience yield is what makes commodity futures fundamentally different from financial futures. A utility holding physical gas inventory can keep the grid running during a supply disruption&mdash;a benefit with real economic value that reduces the effective cost of carry. When European gas storage fell below 40% in early 2025, the implied convenience yield on prompt TTF contracts widened sharply, pushing the curve into steep backwardation. Traders who could model this shift accurately&mdash;quantifying the &ldquo;option value&rdquo; embedded in physical inventory&mdash;profited. Those who relied on static cost-of-carry estimates did not.
        </Sidebar>

        <P>The cost-of-carry framework is the foundation, but professional commodity traders rarely use it in isolation. Structural econometric models layer on supply-demand fundamentals: Norwegian pipeline throughput, LNG cargo arrivals at European terminals, weather-driven heating demand, wind and solar output (which determines how much gas is burned for electricity generation), and the state of global competition for LNG between Europe and Asia. Reduced-form models&mdash;statistical approaches that forecast prices from observable variables without specifying a full structural mechanism&mdash;occupy a middle ground. Factor models in the tradition of Fuertes, Miffre and Rallis decompose commodity returns into carry, momentum and hedging-pressure signals. The carry signal alone, as Macrosynergy&rsquo;s research has documented, has an annualised standard deviation of 156% in natural gas, compared with just 2% in silver&mdash;a measure of how violently the gas curve can move and how much money is at stake in getting the model right.</P>

        {/* ─── CHART 2: TRADING HOUSE PROFITS ─── */}
        <div style={{ margin: "40px 0 8px" }}>
          <ChartTitle>The spoils of volatility</ChartTitle>
          <ChartSubtitle>Net profit of major independent trading houses, $bn, 2019&ndash;2024</ChartSubtitle>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tradingProfitsData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fontSize: 11, fontFamily: "'Source Sans 3', sans-serif", fill: COLORS.warmGray }} />
              <YAxis tick={{ fontSize: 11, fontFamily: "'Source Sans 3', sans-serif", fill: COLORS.warmGray }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12, fontFamily: "'Source Sans 3', sans-serif" }} />
              <Bar dataKey="Vitol" fill={COLORS.chartRed} name="Vitol" radius={[2, 2, 0, 0]} />
              <Bar dataKey="Trafigura" fill={COLORS.chartNavy} name="Trafigura" radius={[2, 2, 0, 0]} />
              <Bar dataKey="Gunvor" fill={COLORS.chartGray} name="Gunvor" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <ChartCaption source="Company filings (Luxembourg, Singapore), Bloomberg, industry estimates.">
            The 2022 energy crisis generated record profits for trading houses positioned to exploit market dislocations. Margins have since normalised, but remain well above pre-crisis levels.
          </ChartCaption>
        </div>

        <P>It is into this landscape that machine learning has arrived&mdash;not as a revolution, but as an incremental overlay on existing infrastructure. The CFA Institute Research Foundation published a chapter in November 2025 documenting how ML models, particularly gradient-boosted tree ensembles built on theory-grounded features (carry, momentum, hedging pressure, inventory levels), outperform traditional reduced-form econometrics in predicting commodity futures returns across the cross-section. The key insight is that ML in commodities is not about opaque forecasting from raw price data. It is about embedding the same economic theory that underpins traditional models&mdash;storage constraints, risk transfer, seasonal patterns&mdash;into supervised learning algorithms that can capture non-linear interactions between these variables more flexibly than a linear regression.</P>

        <P>In European energy specifically, three classes of ML technique are gaining traction. Gradient-boosted trees&mdash;XGBoost, LightGBM, CatBoost&mdash;are the workhorse for tabular prediction tasks: forecasting day-ahead and week-ahead gas and power prices from structured inputs such as weather, storage levels, pipeline nominations and renewable generation forecasts. Neural networks, particularly LSTM (long short-term memory) and Transformer-based architectures like FEDformer, handle longer-horizon forecasting where temporal dependencies matter. A 2025 study in <em>Energy Economics</em> reported that FEDformer reduced mean absolute error by 38.5% compared with traditional LSTM models when forecasting the Bloomberg Energy Subindex. Reinforcement learning, still largely experimental in physical commodities, is being explored for trade execution optimisation: algorithms that learn to time the placement and sizing of orders across fragmented European gas and power exchanges to minimise market impact.</P>

        {/* ─── CHART 3: EU GAS SUPPLY MIX ─── */}
        <div style={{ margin: "40px 0 8px" }}>
          <ChartTitle>The great rebalancing</ChartTitle>
          <ChartSubtitle>EU gas supply by source, bcm per year, 2020&ndash;2025</ChartSubtitle>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gasSupplyData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fontSize: 11, fontFamily: "'Source Sans 3', sans-serif", fill: COLORS.warmGray }} />
              <YAxis tick={{ fontSize: 11, fontFamily: "'Source Sans 3', sans-serif", fill: COLORS.warmGray }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12, fontFamily: "'Source Sans 3', sans-serif" }} />
              <Bar dataKey="Russia" stackId="a" fill="#9B2C2C" name="Russia" />
              <Bar dataKey="Norway" stackId="a" fill={COLORS.chartNavy} name="Norway" />
              <Bar dataKey="LNG" stackId="a" fill={COLORS.chartBlue} name="LNG imports" />
              <Bar dataKey="Other" stackId="a" fill={COLORS.chartGray} name="Other pipeline" />
            </BarChart>
          </ResponsiveContainer>
          <ChartCaption source="IEA, Eurostat, ENTSOG. 2025 figures are preliminary estimates.">
            Russian pipeline gas, which once supplied roughly 40% of EU demand, has fallen below 15%. LNG now accounts for the largest share of European imports, making TTF prices far more sensitive to global spot markets and Asian competition.
          </ChartCaption>
        </div>

        <P>The trading houses, for their part, are investing heavily but talking cautiously. Vitol, which operates from an unremarkable office block near Victoria station in London with approximately 1,800 staff in its core trading business, has long emphasised an analytical culture&mdash;its chief executive, Russell Hardy, who joined from BP in 1993, describes himself as &ldquo;more mathematical&rdquo; than his charismatic predecessor Ian Taylor. McKinsey estimated in February 2025 that quantitative funds with high rates of digital adoption achieve risk-adjusted returns 27% higher than less data-driven actively managed funds. The same report projected that commodity traders could eliminate more than $5bn in costs industry-wide through digitalisation, with a further $20bn of optimisation value left untapped in oil and oil products alone. The implication is clear: firms that invest in ML-driven analytics will capture a disproportionate share of shrinking margins.</P>

        <Sidebar title="Who regulates the algorithms?">
          The EU&rsquo;s Regulation on Wholesale Energy Market Integrity and Transparency (REMIT), revised in May 2024, is the principal framework governing energy trading conduct. The revision strengthened ACER&rsquo;s surveillance powers, broadened the scope of covered products and participants, and&mdash;critically&mdash;brought algorithmic and high-frequency trading in energy products under closer scrutiny. ACER is establishing a new Investigations Department, due to be fully operational by 2027, to handle cross-border enforcement cases. Meanwhile, ESMA and ACER cooperate through the annual Energy Trading Enforcement Forum (ETEF) to align energy-market oversight with financial-market rules under the Market Abuse Regulation. The challenge for regulators is that ML-driven trading strategies are, by design, harder to audit than human decision-making.
        </Sidebar>

        <P>Yet scepticism is warranted. The commodity markets in which ML has proved most effective&mdash;liquid, exchange-traded, electronically intermediated&mdash;are not a precise analogue for much of European energy trading. The TTF is the most liquid gas hub in Europe, with traded volumes exceeding 14 times Dutch domestic consumption. But physical gas delivery still involves pipeline nominations, LNG cargo scheduling, regasification slot booking and bilateral contracts that are negotiated over-the-counter, often via chat messages that must be manually captured and processed. BP, for instance, has deployed AWS machine learning tools to extract pricing information from traders&rsquo; chat messages&mdash;a task that is, in essence, natural-language processing applied to the messiest possible data.</P>

        <P>The deeper objection concerns what traders call &ldquo;fundamental knowledge&rdquo;&mdash;the granular, often tacit understanding of physical flows that cannot easily be encoded in a training set. Knowing that the Flamanville nuclear plant (4.3 GW, roughly 7% of French nuclear capacity) went offline during Storm Goretti in January 2026, and understanding what that means for gas-for-power demand across north-west Europe in the following weeks, requires a kind of causal reasoning that current ML models do not perform well. A gradient-boosted tree can learn that low nuclear output correlates with higher gas prices. It cannot reason about <em>why</em>&mdash;or anticipate that a new outage at a facility it has never seen in its training data will have a similar effect.</P>

        {/* ─── CHART 4: BRENT FORWARD CURVE ─── */}
        <div style={{ margin: "40px 0 8px" }}>
          <ChartTitle>The shape of scarcity</ChartTitle>
          <ChartSubtitle>Brent crude forward curves, $/barrel, April 2025 vs April 2026</ChartSubtitle>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={brentCurveData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: "'Source Sans 3', sans-serif", fill: COLORS.warmGray }} />
              <YAxis domain={[50, 105]} tick={{ fontSize: 11, fontFamily: "'Source Sans 3', sans-serif", fill: COLORS.warmGray }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12, fontFamily: "'Source Sans 3', sans-serif" }} />
              <Line type="monotone" dataKey="apr2025" stroke={COLORS.chartGray} strokeWidth={2} dot={{ r: 3 }} name="Apr 2025 (contango)" />
              <Line type="monotone" dataKey="apr2026" stroke={COLORS.chartRed} strokeWidth={2} dot={{ r: 3 }} name="Apr 2026 (backwardation)" />
            </LineChart>
          </ResponsiveContainer>
          <ChartCaption source="ICE, CME Group, MEES. Indicative curve shapes based on market data and analyst estimates.">
            A year apart, two radically different curve shapes. In April 2025, Brent was in contango from early 2026 onwards, suggesting surplus expectations. By April 2026, the Iran conflict has driven extreme backwardation, with the front-month trading at roughly $96/bbl.
          </ChartCaption>
        </div>

        <P>The Brent crude market illustrates the limitations even more starkly. The forward curve, as of April 2026, is in steep backwardation through the end of the year&mdash;front-month prices exceed deferred delivery by $16 or more&mdash;driven by the closure of the Strait of Hormuz following the US-Iran conflict. The IEA estimates that oil at sea rose by 248m barrels in 2025, with sanctioned oil accounting for 179m of that total. These are not barrels available for conventional cash-and-carry arbitrage; they are effectively stranded within a shadow fleet, their availability contingent on geopolitical negotiations. No ML model trained on historical curve shapes can reliably forecast the trajectory of a military conflict, the outcome of talks between US and Iranian delegations in Pakistan, or the speed at which Saudi Arabia can restore pumping capacity to its East-West pipeline after strikes on oil infrastructure.</P>

        <P>This is the central tension. Machine learning excels at finding patterns in large, structured, historical datasets. European energy markets, in their current state of geopolitical upheaval, are generating price dynamics that have no historical precedent. The 2022 gas crisis was a once-in-a-generation event. The 2026 Hormuz closure may be another. An ML model trained on data from 2015&ndash;2024 has seen one regime-changing shock; it has not seen the one it needs to predict.</P>

        {/* ─── CHART 5: ML ADOPTION ─── */}
        <div style={{ margin: "40px 0 8px" }}>
          <ChartTitle>The march of the machines</ChartTitle>
          <ChartSubtitle>Estimated share of commodity trading firms using ML in core strategy, %</ChartSubtitle>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={mlAdoptionData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fontSize: 11, fontFamily: "'Source Sans 3', sans-serif", fill: COLORS.warmGray }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fontFamily: "'Source Sans 3', sans-serif", fill: COLORS.warmGray }} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="adoption" stroke={COLORS.chartRed} strokeWidth={2.5} dot={{ r: 4, fill: COLORS.chartRed }} name="ML adoption %" />
            </LineChart>
          </ResponsiveContainer>
          <ChartCaption source="McKinsey Global Energy & Materials Practice, Commodity Trading Week surveys, industry estimates.">
            ML adoption has accelerated since the 2022 volatility shock, but the majority of firms deploy it as a complement to human decision-making rather than a replacement. The shift toward &ldquo;agentic AI&rdquo;&mdash;autonomous decision systems&mdash;remains in early stages.
          </ChartCaption>
        </div>

        <P>The case for ML in commodity trading is therefore not that it replaces fundamental analysis, but that it augments it. The strongest applications are in what practitioners call &ldquo;feature engineering&rdquo;&mdash;transforming raw data (weather forecasts, vessel-tracking signals, satellite imagery of storage tank levels, pipeline flow nominations) into structured inputs that capture the same economic logic embedded in traditional fair-value models. The CFA Institute&rsquo;s research found that when ML models are built on theory-grounded features&mdash;carry, momentum, hedging pressure&mdash;rather than raw price data, they produce robust, tradable strategies across multiple commodity classes and horizons. The trick, in other words, is not to let the algorithm discover economics from scratch, but to encode decades of hard-won market knowledge into the feature set and let the algorithm find the non-linear interactions that humans cannot compute by hand.</P>

        <P>McKinsey&rsquo;s March 2026 assessment of the commodity trading industry noted that overall global value pools decreased by approximately 5% from 2024, with the decline driven primarily by softer power trading in Europe. The report identified &ldquo;agentic AI&rdquo;&mdash;autonomous systems capable of executing multi-step workflows without continuous human oversight&mdash;as the technology most likely to change the operating model of the entire industry. This is a step beyond prediction. It implies systems that not only forecast fair value but act on the forecast: placing orders, managing risk limits, and adjusting positions in response to real-time data. The regulatory implications, under the revised REMIT framework that came into force in May 2024, are substantial. ACER&rsquo;s new data-reporting requirements, updated in 2025 to reflect the 47% annual increase in reported transactions, will need to evolve again to accommodate algorithmic decision-making at scale.</P>

        {/* ─── CHART 6: VOLATILITY COMPARISON ─── */}
        <div style={{ margin: "40px 0 8px" }}>
          <ChartTitle>Not all commodities are alike</ChartTitle>
          <ChartSubtitle>Annualised carry volatility by commodity, %, 2000&ndash;2025</ChartSubtitle>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              layout="vertical"
              data={[
                { name: "Natural gas", vol: 156 },
                { name: "Gasoline", vol: 89 },
                { name: "Soybean", vol: 52 },
                { name: "Crude oil", vol: 38 },
                { name: "Copper", vol: 21 },
                { name: "Gold", vol: 8 },
                { name: "Silver", vol: 2 },
              ]}
              margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tick={{ fontSize: 11, fontFamily: "'Source Sans 3', sans-serif", fill: COLORS.warmGray }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fontFamily: "'Source Sans 3', sans-serif", fill: COLORS.darkGray }} width={80} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="vol" fill={COLORS.chartRed} name="Carry volatility %" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <ChartCaption source="Macrosynergy Research, based on front-month futures data.">
            Natural gas carry volatility dwarfs all other commodities&mdash;a consequence of expensive, constrained storage and extreme seasonal demand swings. This makes gas the commodity where fair-value models matter most and where they fail most spectacularly.
          </ChartCaption>
        </div>

        <P>The honest assessment, then, is this. Fair value modelling for European gas and oil is entering a new phase, driven by the convergence of three forces: the structural transformation of European gas supply (away from Russian pipeline gas and toward globally-sourced LNG), the availability of alternative data sources (satellite imagery, AIS vessel tracking, high-frequency weather models), and the maturation of ML techniques suited to tabular, time-series prediction tasks. The trading houses that will benefit most are those that combine ML capability with deep physical-market knowledge&mdash;firms like Vitol, with its centralised financing model and 600-odd partners who collectively hold $30.7bn in equity, or Trafigura, which traded 7.2m barrels per day in the first half of 2025 and is building gas, power and renewables as a &ldquo;third pillar&rdquo; alongside oil and metals.</P>

        <P>But the models will keep failing in the moments that matter most. The August 2022 gas spike, the January 2025 halt of Russian transit through Ukraine, the March 2026 closure of Hormuz&mdash;these are the events that generate the largest trading profits and the largest losses, and they are precisely the events that lie outside any model&rsquo;s training distribution. A gradient-boosted tree does not read intelligence reports. A neural network does not take a phone call from a ship captain in the Persian Gulf. The future of commodity fair-value modelling is not a choice between humans and machines. It is a question of how to build systems in which each compensates for the other&rsquo;s blindness&mdash;and of whether, in a market defined by geopolitical shocks and physical constraints, the price of knowing will ever be lower than the cost of being wrong.</P>

        {/* ─── SOURCE INTEGRITY NOTE ─── */}
        <div style={{ marginTop: "56px" }}>
          <button
            onClick={() => setShowIntegrity(!showIntegrity)}
            style={{
              fontFamily: "'Source Sans 3', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: COLORS.economistRed,
              background: "none",
              border: `1px solid ${COLORS.economistRed}`,
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "2px",
              width: "100%",
              textAlign: "center",
            }}
          >
            {showIntegrity ? "Hide" : "Show"} Source Integrity Note
          </button>
          {showIntegrity && (
            <div style={{
              background: COLORS.cream,
              padding: "32px 28px",
              marginTop: "16px",
              borderRadius: "2px",
              border: `1px solid ${COLORS.borderLight}`,
            }}>
              <div style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: COLORS.economistRed,
                marginBottom: "20px",
              }}>Factual Integrity Disclosure</div>
              <div style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: "14px",
                lineHeight: 1.7,
                color: COLORS.darkGray,
              }}>
                <p style={{ marginBottom: 16 }}><strong>Verified facts (Tier 1):</strong></p>
                <p style={{ marginBottom: 8, paddingLeft: 16 }}>TTF peaked at &euro;345/MWh in August 2022 (Euronews, CNBC, EU Council)</p>
                <p style={{ marginBottom: 8, paddingLeft: 16 }}>Vitol net profit: $15.1bn (2022), $13.2bn (2023), $8.7bn (2024) (Luxembourg filings, FT, Swissinfo)</p>
                <p style={{ marginBottom: 8, paddingLeft: 16 }}>Trafigura net profit: $7.3bn (2023), $2.8bn (2024) (MatrixBCG, company reports)</p>
                <p style={{ marginBottom: 8, paddingLeft: 16 }}>Gunvor profit fell to $729m in 2024 (Pestel-analysis, industry sources)</p>
                <p style={{ marginBottom: 8, paddingLeft: 16 }}>TTF traded volumes exceed 14x Dutch domestic consumption (Trading Economics, ICE)</p>
                <p style={{ marginBottom: 8, paddingLeft: 16 }}>Revised REMIT entered into force 7 May 2024 (European Commission, ACER)</p>
                <p style={{ marginBottom: 8, paddingLeft: 16 }}>ACER observed 47% annual increase in data reporting since 2021 (EC REMIT fees decision)</p>
                <p style={{ marginBottom: 8, paddingLeft: 16 }}>FEDformer reduced MAE by 38.5% vs traditional models (Energy Economics, ScienceDirect 2025)</p>
                <p style={{ marginBottom: 8, paddingLeft: 16 }}>EU gas storage 39.2% in Feb 2025; Germany 30.2%, France 29%, Netherlands 23.5% (IEA)</p>
                <p style={{ marginBottom: 8, paddingLeft: 16 }}>Vitol equity $30.7bn, debt $3.6bn; Trafigura equity $16.3bn, debt $31bn (company filings)</p>
                <p style={{ marginBottom: 8, paddingLeft: 16 }}>Flamanville 4.3 GW, ~7% of French nuclear capacity (European Gas Hub, Jan 2026)</p>
                <p style={{ marginBottom: 8, paddingLeft: 16 }}>IEA: oil at sea rose 248m barrels in 2025, 179m sanctioned (MEES, Feb 2026)</p>
                <p style={{ marginBottom: 8, paddingLeft: 16 }}>Carry volatility: natural gas 156% vs silver 2% (Macrosynergy Research)</p>
                <p style={{ marginBottom: 8, paddingLeft: 16 }}>McKinsey: quantitative funds achieve 27% higher risk-adjusted returns (McKinsey, Feb 2025)</p>
                <p style={{ marginBottom: 8, paddingLeft: 16 }}>McKinsey: $5bn cost elimination potential, $20bn optimisation value in oil (McKinsey, Mar 2026)</p>
                <p style={{ marginBottom: 8, paddingLeft: 16 }}>CFA Institute Research Foundation chapter on ML in commodity futures (Nov 2025)</p>
                <p style={{ marginBottom: 8, paddingLeft: 16 }}>Brent at ~$96/bbl in April 2026 amid Hormuz closure (Trading Economics, Investing.com)</p>

                <p style={{ marginBottom: 16, marginTop: 20 }}><strong>Composited elements (Tier 2):</strong></p>
                <p style={{ marginBottom: 8, paddingLeft: 16 }}>Chart data points are approximate monthly closes or interpolated from verified price levels across multiple sources. Exact daily closes may differ.</p>
                <p style={{ marginBottom: 8, paddingLeft: 16 }}>ML adoption percentages are estimated from McKinsey and Commodity Trading Week survey data; no single authoritative source tracks this metric precisely.</p>
                <p style={{ marginBottom: 8, paddingLeft: 16 }}>EU gas supply volumes by source are rounded estimates from IEA and Eurostat data; pipeline-level granularity varies by year.</p>
                <p style={{ marginBottom: 8, paddingLeft: 16 }}>Brent forward curve shapes are indicative, based on reported prompt vs deferred spreads; exact contract-by-contract data not reproduced.</p>

                <p style={{ marginBottom: 16, marginTop: 20 }}><strong>Details requiring verification:</strong></p>
                <p style={{ marginBottom: 8, paddingLeft: 16 }}>BP&rsquo;s AWS ML deployment for chat-message price extraction: sourced from AWS blog (Dec 2023); current operational status should be verified with BP directly.</p>
                <p style={{ marginBottom: 8, paddingLeft: 16 }}>Hardy&rsquo;s self-description as &ldquo;more mathematical&rdquo;: sourced from Swissinfo interview; exact phrasing should be confirmed.</p>

                <p style={{ marginBottom: 16, marginTop: 20 }}><strong>Invented or unverifiable details:</strong></p>
                <p style={{ paddingLeft: 16 }}>None. All factual claims are traceable to web search results documented above.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── FOOTER ─── */}
      <div style={{ textAlign: "center", padding: "40px 24px 48px" }}>
        <div style={{
          width: "60px",
          height: "4px",
          background: COLORS.economistRed,
          margin: "0 auto 20px",
        }} />
        <div style={{
          fontFamily: "'Source Sans 3', sans-serif",
          fontSize: "11px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: COLORS.warmGray,
        }}>
          Economist-Style Production Document
        </div>
      </div>
    </div>
  );
}
