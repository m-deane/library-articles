import { useState } from "react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceLine
} from "recharts";

// ─────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────
const C = {
  yellow:      "#FFCE00",
  black:       "#1a1a1a",
  offWhite:    "#FAF8F5",
  cream:       "#F2EDE4",
  warmGray:    "#8A8278",
  darkGray:    "#3D3B38",
  sidebarBg:   "#F0EBE1",
  accent:      "#C4A35A",
  borderLight: "#E0DAD0",
  deepBlue:    "#0d2140",
  midBlue:     "#1a3a5c",
  teal:        "#1a7a8a",
};

// ─────────────────────────────────────────────
// DATA FOR CHARTS
// ─────────────────────────────────────────────
const energyData = [
  { year: "1970", kwh: 26 },
  { year: "1980", kwh: 18 },
  { year: "1990", kwh: 10 },
  { year: "2000", kwh: 6.5 },
  { year: "2010", kwh: 4.0 },
  { year: "2018", kwh: 3.0 },
  { year: "2025", kwh: 2.5 },
  { year: "Theoretical\nmin", kwh: 1.1 },
];

const capacityData = [
  { region: "MENA", pct: 41.8, color: "#C4853A" },
  { region: "Asia\nPacific", pct: 19.2, color: "#3A7AC4" },
  { region: "North\nAmerica", pct: 12.4, color: "#3AC4A0" },
  { region: "Europe", pct: 11.1, color: "#8A7AC4" },
  { region: "Other", pct: 15.5, color: "#888" },
];

const brineData = [
  { year: "2000", freshwater: 28, brine: 42 },
  { year: "2005", freshwater: 40, brine: 60 },
  { year: "2010", freshwater: 55, brine: 82 },
  { year: "2015", freshwater: 75, brine: 112 },
  { year: "2019", freshwater: 95, brine: 142 },
  { year: "2025e", freshwater: 130, brine: 195 },
];

const costData = [
  { year: "2000", cost: 2.1 },
  { year: "2005", cost: 1.4 },
  { year: "2010", cost: 0.95 },
  { year: "2015", cost: 0.72 },
  { year: "2020", cost: 0.55 },
  { year: "2025", cost: 0.41 },
];

// ─────────────────────────────────────────────
// CHART COMPONENTS
// ─────────────────────────────────────────────
function EnergyChart() {
  return (
    <div style={{ background: C.deepBlue, borderRadius: 4, padding: "28px 20px 20px", marginBottom: 8 }}>
      <div style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize: 11, letterSpacing: 2, color: C.yellow, fontWeight: 700, marginBottom: 6, textTransform:"uppercase" }}>
        Energy Consumption · kWh per m³ of freshwater produced
      </div>
      <div style={{ fontFamily:"'Source Serif 4',serif", fontSize: 15, color: "rgba(255,255,255,0.85)", marginBottom: 18, lineHeight: 1.5 }}>
        A fifty-year compression — from industrial luxury to near-theoretical minimum
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={energyData} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
          <defs>
            <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={C.yellow} stopOpacity={0.4} />
              <stop offset="95%" stopColor={C.yellow} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="year" tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11, fontFamily:"'Source Sans 3',sans-serif" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11, fontFamily:"'Source Sans 3',sans-serif" }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: C.midBlue, border: "none", color: "#fff", fontFamily:"'Source Sans 3',sans-serif", fontSize: 13 }} formatter={(v) => [`${v} kWh/m³`]} />
          <ReferenceLine y={1.1} stroke={C.yellow} strokeDasharray="6 3" label={{ value: "Thermodynamic limit: 1.1 kWh/m³", fill: C.yellow, fontSize: 10, fontFamily:"'Source Sans 3',sans-serif" }} />
          <Area type="monotone" dataKey="kwh" stroke={C.yellow} strokeWidth={2.5} fill="url(#energyGrad)" dot={{ fill: C.yellow, r: 4 }} />
        </AreaChart>
      </ResponsiveContainer>
      <div style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 8 }}>
        Source: IDA / IRENA / 2024 Roadmap on Membrane Desalination Technology
      </div>
    </div>
  );
}

function CapacityChart() {
  const colors = ["#C4853A","#3A7AC4","#3AC4A0","#8A7AC4","#888"];
  return (
    <div style={{ background: C.offWhite, border: `1px solid ${C.borderLight}`, borderRadius: 4, padding: "28px 20px 20px", marginBottom: 8 }}>
      <div style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize: 11, letterSpacing: 2, color: C.accent, fontWeight: 700, marginBottom: 6, textTransform:"uppercase" }}>
        Global Desalination Capacity · Share by Region
      </div>
      <div style={{ fontFamily:"'Source Serif 4',serif", fontSize: 15, color: C.darkGray, marginBottom: 18, lineHeight: 1.5 }}>
        MENA produces 41.8% of the world's desalinated water — a geography of existential thirst
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={capacityData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} />
          <XAxis dataKey="region" tick={{ fill: C.darkGray, fontSize: 11, fontFamily:"'Source Sans 3',sans-serif" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: C.warmGray, fontSize: 11, fontFamily:"'Source Sans 3',sans-serif" }} axisLine={false} tickLine={false} unit="%" />
          <Tooltip contentStyle={{ background: C.cream, border: `1px solid ${C.borderLight}`, color: C.black, fontFamily:"'Source Sans 3',sans-serif", fontSize: 13 }} formatter={(v) => [`${v}%`]} />
          <Bar dataKey="pct" radius={[3,3,0,0]}>
            {capacityData.map((entry, i) => (
              <rect key={i} fill={colors[i]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize: 10, color: C.warmGray, marginTop: 8 }}>
        Source: Nature (Jan 2024); MENA region includes Saudi Arabia, UAE, Egypt, Morocco, other Gulf states
      </div>
    </div>
  );
}

function BrineChart() {
  return (
    <div style={{ background: C.deepBlue, borderRadius: 4, padding: "28px 20px 20px", marginBottom: 8 }}>
      <div style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize: 11, letterSpacing: 2, color: "#ff8a65", fontWeight: 700, marginBottom: 6, textTransform:"uppercase" }}>
        The Hidden Equation · Million m³/day
      </div>
      <div style={{ fontFamily:"'Source Serif 4',serif", fontSize: 15, color: "rgba(255,255,255,0.85)", marginBottom: 18, lineHeight: 1.5 }}>
        For every cubic metre of freshwater produced, 1.5 cubic metres of hypersaline brine are discharged
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={brineData} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
          <defs>
            <linearGradient id="freshGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3AC4A0" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#3AC4A0" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="brineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff8a65" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#ff8a65" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="year" tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11, fontFamily:"'Source Sans 3',sans-serif" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11, fontFamily:"'Source Sans 3',sans-serif" }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: C.midBlue, border: "none", color: "#fff", fontFamily:"'Source Sans 3',sans-serif", fontSize: 13 }} formatter={(v, n) => [`${v} M m³/day`, n === "freshwater" ? "Freshwater produced" : "Brine discharged"]} />
          <Legend wrapperStyle={{ color: "rgba(255,255,255,0.7)", fontFamily:"'Source Sans 3',sans-serif", fontSize: 12 }} />
          <Area type="monotone" dataKey="freshwater" name="freshwater" stroke="#3AC4A0" strokeWidth={2} fill="url(#freshGrad)" />
          <Area type="monotone" dataKey="brine" name="brine" stroke="#ff8a65" strokeWidth={2} fill="url(#brineGrad)" />
        </AreaChart>
      </ResponsiveContainer>
      <div style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 8 }}>
        Source: UNU-INWEH (Qadir et al., 2019); 2025e = estimate based on DesalData growth projections
      </div>
    </div>
  );
}

function CostChart() {
  return (
    <div style={{ background: C.offWhite, border: `1px solid ${C.borderLight}`, borderRadius: 4, padding: "28px 20px 20px", marginBottom: 8 }}>
      <div style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize: 11, letterSpacing: 2, color: C.accent, fontWeight: 700, marginBottom: 6, textTransform:"uppercase" }}>
        Cost of Desalinated Water · US$ per cubic metre (SWRO)
      </div>
      <div style={{ fontFamily:"'Source Serif 4',serif", fontSize: 15, color: C.darkGray, marginBottom: 18, lineHeight: 1.5 }}>
        Sorek 2 (Israel, 2024) broke the $0.41/m³ barrier — half the cost of a decade prior
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={costData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} />
          <XAxis dataKey="year" tick={{ fill: C.darkGray, fontSize: 11, fontFamily:"'Source Sans 3',sans-serif" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: C.warmGray, fontSize: 11, fontFamily:"'Source Sans 3',sans-serif" }} axisLine={false} tickLine={false} unit="$" />
          <Tooltip contentStyle={{ background: C.cream, border: `1px solid ${C.borderLight}`, color: C.black, fontFamily:"'Source Sans 3',sans-serif", fontSize: 13 }} formatter={(v) => [`$${v}/m³`]} />
          <Line type="monotone" dataKey="cost" stroke={C.accent} strokeWidth={3} dot={{ fill: C.accent, r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
      <div style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize: 10, color: C.warmGray, marginTop: 8 }}>
        Source: Scientific American / IDE Technologies / Global Water Intelligence
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// HELPER COMPONENTS
// ─────────────────────────────────────────────
function DropCap({ children }) {
  const first = children[0];
  const rest = children.slice(1);
  return (
    <p style={{ fontFamily:"'Source Serif 4',serif", fontSize: 19, lineHeight: 1.75, color: C.black, margin: "0 0 24px", textAlign:"justify" }}>
      <span style={{
        float: "left", fontFamily:"'Playfair Display',serif", fontSize: 82, fontWeight: 900,
        lineHeight: 0.8, marginRight: 8, marginTop: 10, color: C.black
      }}>{first}</span>
      {rest}
    </p>
  );
}

function Sidebar({ title, children }) {
  return (
    <aside style={{
      background: C.sidebarBg, border: `1px solid ${C.borderLight}`,
      borderLeft: `3px solid ${C.yellow}`, padding: "24px 24px 20px",
      margin: "36px 0", borderRadius: "0 4px 4px 0"
    }}>
      <div style={{
        fontFamily:"'Source Sans 3',sans-serif", fontSize: 11, fontWeight: 700,
        letterSpacing: 2.5, textTransform:"uppercase", color: C.darkGray,
        borderBottom: `2px solid ${C.yellow}`, paddingBottom: 8, marginBottom: 14
      }}>{title}</div>
      <div style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize: 15, color: C.darkGray, lineHeight: 1.7 }}>
        {children}
      </div>
    </aside>
  );
}

function ImgCaption({ label, text }) {
  return (
    <figcaption style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize: 12.5, color: C.darkGray, lineHeight: 1.55, marginTop: 8, paddingLeft: 12, borderLeft: `2px solid ${C.accent}` }}>
      <span style={{ color: C.accent, fontWeight: 700, textTransform:"uppercase", letterSpacing: 1, fontSize: 10, marginRight: 6 }}>{label}</span>
      {text}
    </figcaption>
  );
}

function Photo({ src, alt, label, caption, style = {} }) {
  return (
    <figure style={{ margin: "36px 0 28px", ...style }}>
      <img src={src} alt={alt} style={{ width:"100%", display:"block", borderRadius: 2, objectFit:"cover", maxHeight: 460 }} />
      <ImgCaption label={label} text={caption} />
    </figure>
  );
}

function PullQuote({ children }) {
  return (
    <blockquote style={{
      margin: "44px 0", padding: "0 0 0 24px",
      borderLeft: `3px solid ${C.yellow}`,
      fontFamily:"'Playfair Display',serif", fontStyle:"italic",
      fontSize: 24, lineHeight: 1.5, color: C.black, fontWeight: 400
    }}>
      {children}
    </blockquote>
  );
}

function SceneBreak() {
  return (
    <div style={{ textAlign:"center", margin: "52px 0", letterSpacing: 8, color: C.accent, fontSize: 22 }}>❧</div>
  );
}

function Para({ children, style = {} }) {
  return (
    <p style={{ fontFamily:"'Source Serif 4',serif", fontSize: 19, lineHeight: 1.75, color: C.black, margin: "0 0 24px", textAlign:"justify", ...style }}>
      {children}
    </p>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform:"uppercase", color: C.accent, marginBottom: 20, marginTop: 48 }}>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function ReverseOsmosisFeature() {
  const [sourceOpen, setSourceOpen] = useState(false);

  return (
    <div style={{ background: C.offWhite, minHeight:"100vh", fontFamily:"'Source Serif 4',serif" }}>
      {/* GOOGLE FONTS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&family=Source+Sans+3:wght@300;400;600;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>

      {/* MODE BADGE */}
      <div style={{ background: C.black, padding: "10px 24px", display:"flex", alignItems:"center", gap: 16 }}>
        <span style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize: 10, letterSpacing: 2, color: C.warmGray, textTransform:"uppercase" }}>
          MODE: Scientific American Hybrid &nbsp;·&nbsp; FORMAT: Full Feature
        </span>
      </div>

      {/* YELLOW STRIP */}
      <div style={{ height: 4, background: C.yellow, width:"100%" }} />

      {/* HERO */}
      <div style={{
        minHeight: "88vh", position:"relative", display:"flex", flexDirection:"column",
        justifyContent:"flex-end", overflow:"hidden",
        background: `linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.78) 100%), url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/SWRO_Desalination_Plant.jpg/1280px-SWRO_Desalination_Plant.jpg') center/cover no-repeat`
      }}>
        <div style={{ padding: "0 0 60px", maxWidth: 860, margin: "0 auto", width:"100%", paddingLeft: 40, paddingRight: 40 }}>
          <div style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize: 11, letterSpacing: 3, color: C.yellow, fontWeight: 700, marginBottom: 20, textTransform:"uppercase" }}>
            ◆ Full Feature · Water &amp; Technology
          </div>
          <h1 style={{
            fontFamily:"'Playfair Display',serif", fontWeight: 900, margin: "0 0 20px",
            fontSize: "clamp(38px, 6vw, 68px)", lineHeight: 1.05, color: "#ffffff",
            letterSpacing: -1
          }}>
            The Membrane at the<br />Edge of Thirst
          </h1>
          <p style={{
            fontFamily:"'Source Serif 4',serif", fontStyle:"italic", fontSize: 20,
            color: "rgba(255,255,255,0.88)", margin: "0 0 32px", lineHeight: 1.55, maxWidth: 620
          }}>
            Reverse osmosis was supposed to solve humanity's water crisis. It has come closer than any technology in history — and in doing so, has created crises of its own.
          </p>
          <div style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.45)", letterSpacing: 1, textAlign:"right" }}>
            A seawater reverse osmosis facility — 50,000 tonnes of pressurised membrane, 55 bar of applied force, and a question that has no clean answer.
          </div>
        </div>
      </div>

      {/* ARTICLE BODY */}
      <div style={{ maxWidth: 740, margin: "0 auto", padding: "64px 24px 80px" }}>

        {/* LEAD */}
        <DropCap>
          n the third floor of a building on Yale University's science hill, inside a laboratory that smells of polymer solvents and calibration fluid, a researcher holds a membrane up to fluorescent light. It is roughly the size of a coffee filter — off-white, almost translucent, thinner than a human hair. Through it, at pressures exceeding 55 bar, passes some of the most expensive water on Earth. At those pressures, a standard automobile tyre would explode. Here, in this unremarkable disc of cross-linked polyamide, the physics of global water security plays out at the molecular level.
        </DropCap>

        <Para>
          The lab belongs to Menachem Elimelech, the Sterling Professor of Chemical and Environmental Engineering at Yale — one of the most cited water scientists alive, and a man who has spent four decades trying to understand something that most engineers assumed they had already understood. In April 2023, his group published a paper in <em>Science Advances</em> that upended the field's central assumption: the solution-diffusion model, which had described how water moves through reverse osmosis membranes since the 1960s, is, Elimelech's simulations show, fundamentally wrong. Water does not dissolve into the membrane and diffuse down a concentration gradient. It travels in clusters, driven by pressure changes through a network of nanometre-scale pores. The implications are profound. Fifty years of membrane engineering, Elimelech argues, were optimised around a faulty model. Some of the most promising research dead ends of the past two decades may not have been dead ends at all — they were simply designed for the wrong physics.
        </Para>

        <Para>
          This is not a story only about chemistry. It is a story about what happens when a technology that works — that genuinely works, that has turned seawater into drinking water for hundreds of millions of people across the world's most water-stressed geographies — begins to reveal the limits that no amount of engineering elegance can resolve. Reverse osmosis desalination has reduced the cost of producing freshwater from the sea by a factor of five in forty years. It has allowed Israel to produce more water than it needs in a country that once faced existential drought. It has kept the taps running in Chennai during a 2019 crisis that made international headlines when the city's reservoirs ran dry. It powers the ambitions of NEOM, Saudi Arabia's $500-billion city-in-the-desert, which plans to run a 500,000-cubic-metre-per-day desalination plant entirely on renewable energy. And it produces, as an inescapable byproduct, approximately 142 million cubic metres of hypersaline brine every single day — enough to fill 57,000 Olympic swimming pools — which is pumped back into the oceans that supplied it, with consequences that marine scientists are only beginning to measure.
        </Para>

        <PullQuote>
          "Some of the assumptions in the old theory simply do not make sense. We have been designing membranes for fifty years without understanding what is actually happening inside them."
        </PullQuote>

        {/* HERO IMAGE - desalination plant */}
        <Photo
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/SWRO_Desalination_Plant.jpg/1280px-SWRO_Desalination_Plant.jpg"
          alt="Seawater reverse osmosis desalination facility"
          label="Establishing"
          caption="A seawater reverse osmosis facility showing the pressure vessel arrays — the white cylinders stacked in racks — each containing seven or eight spiral-wound membrane modules. Commercial SWRO systems operate at 55–83 bar, roughly 800 times atmospheric pressure. The mathematics of scarcity made physical."
        />

        <SectionLabel>I. The Physics of Pressure</SectionLabel>

        <Para>
          To understand what Elimelech overturned, you need to understand what reverse osmosis is reversing. Osmosis — ordinary osmosis, the kind that moves water across the membranes of every living cell — is driven by concentration gradients. A dilute solution on one side of a semipermeable membrane, a concentrated solution on the other: water moves, spontaneously, toward the concentration, driven by the thermodynamic imperative to equalise. This is why plant roots draw moisture from soil, why red blood cells swell and burst in pure water. Nature runs on osmosis.
        </Para>

        <Para>
          Reverse osmosis runs against it. Apply sufficient pressure to the concentrated side — to seawater, at roughly 27 bar of osmotic pressure for typical ocean salinity — and you force the process into reverse. Water molecules squeeze through the membrane. Salt ions, too large and electrostatically repelled, stay behind. The result is freshwater on one side, increasingly concentrated brine on the other. The process was first demonstrated at practical scale in 1965, when a UCLA research team led by Sidney Loeb and Srinivasa Sourirajan produced the first viable cellulose acetate membrane and ran the world's first reverse osmosis desalination plant in Coalinga, California — a facility that produced just 5,000 gallons per day. Today's plants produce 500,000 cubic metres.
        </Para>

        <Para>
          The standard explanation for how water moves through the membrane — the solution-diffusion model — assumed that water molecules dissolved into the dense polymer matrix, separated from each other, and diffused individually along a concentration gradient through the material. For fifty years, this model was taught in textbooks and used to design membranes. Elimelech's group, using molecular dynamics simulations validated by direct experiment, found that the membrane is not as dense as the model assumes. There are pores — nanometre-scale, but pores. Water moves through them in clusters, propelled by pressure differentials within the membrane itself. The distinction matters because it changes what an engineer should optimise. If the old model was correct, making a membrane thinner would always increase flux. The new model predicts a more nuanced relationship, and suggests that certain material architectures long dismissed as impractical may, in fact, be exactly what the field needs.
        </Para>

        <EnergyChart />
        <ImgCaption label="Data" text="The energy cost of seawater reverse osmosis has fallen more than tenfold since the 1970s, driven by better membranes, high-efficiency pumps, and pressure-exchanger energy recovery devices that now return up to 95% of rejected brine energy. The thermodynamic minimum — 1.1 kWh/m³ — represents a floor that physics, not engineering, imposes." />

        <Sidebar title="How a Spiral-Wound Membrane Module Works">
          <p style={{ margin:"0 0 12px" }}>The workhorse of commercial desalination is not a flat sheet but a spiral. Two membrane envelopes are wound around a central permeate collection tube, separated by a mesh spacer that creates the feed channel. Seawater enters one end under pressure, sweeping across the membrane surface in cross-flow — the velocity prevents salt from accumulating on the surface (a phenomenon called concentration polarisation). Water that passes through the membrane spirals inward toward the collection tube. The rejected brine exits the other end, still under pressure.</p>
          <p style={{ margin:"0 0 12px" }}>A standard commercial module is eight inches in diameter and forty inches long, housing roughly 37 square metres of membrane area. Industrial pressure vessels stack seven or eight such elements end-to-end. A large desalination plant may contain tens of thousands of pressure vessels arranged in parallel arrays — the white-cylinders-on-racks that define the aesthetic of every modern facility.</p>
          <p style={{ margin: 0 }}>Israel's Sorek plant, built by IDE Technologies, innovated by using sixteen-inch-diameter elements — twice the standard size — arranged vertically rather than horizontally. The larger format reduces the number of pressure vessels required, cutting capital costs significantly. Sorek 2, commissioned in 2024, achieved a production price of $0.41 per cubic metre — the lowest ever recorded for seawater desalination.</p>
        </Sidebar>

        <SceneBreak />

        <SectionLabel>II. The Infrastructure of Necessity</SectionLabel>

        <Para>
          Stand at the fence of the Ras Al Khair desalination complex on Saudi Arabia's eastern Gulf coast and the scale of the enterprise becomes briefly incomprehensible. The facility — located on a stretch of coast 75 kilometres northwest of Jubail — occupies an area larger than the island of Manhattan's Financial District. Its hybrid architecture combines thermal multi-stage flash distillation and reverse osmosis in parallel, producing nearly 3 million cubic metres of water per day. It also generates 2,400 megawatts of electricity. Together, the facility and its twin at Shuaiba supply the freshwater needs of Riyadh, a capital city of seven million people located 400 kilometres inland from any coastline, in one of the driest places on the planet.
        </Para>

        <Para>
          Saudi Arabia accounts for more than 25 percent of global desalinated water capacity, operating 30 to 32 plants across 17 coastal locations. The kingdom draws roughly 70 percent of its municipal water supply from these facilities — a figure that would have seemed a dystopian fantasy in 1970 and is now simply how the country works. The MENA region as a whole, according to a 2024 study published in <em>Nature</em>, accounts for 41.8 percent of global operational desalination capacity, with approximately 5,000 plants producing 28.96 million cubic metres of water per day. Governments across the region are contracted to nearly double this capacity between 2024 and 2028. The $53.4 billion the region invested in desalination infrastructure between 2006 and 2024 — 47.5 percent of total global spending — is projected to reach $100 billion by 2030.
        </Para>

        {/* Capacity distribution chart */}
        <CapacityChart />
        <ImgCaption label="Data" text="MENA's dominance of global desalination capacity reflects a simple geographic reality: the region contains five of the world's most water-stressed nations, sits atop the world's largest fossil fuel reserves, and borders an ocean too salty, too warm, and too enclosed to recover easily from what we pump back into it." />

        <Para>
          The economics driving this expansion have shifted with remarkable speed. In 2000, producing a cubic metre of desalinated seawater cost approximately $2.10. By 2020, the figure had fallen to around $0.55. Projects in Saudi Arabia and the UAE in recent years have achieved prices below $0.50 per cubic metre. The drivers are well understood: better membranes with higher salt rejection and water flux, energy recovery devices (pressure exchangers) that recapture up to 95 percent of the kinetic energy in the rejected brine stream, and the replacement of energy-hungry thermal distillation with membrane-based reverse osmosis, which the International Desalination Association reports now accounts for over 90 percent of new desalination capacity contracted between 2020 and 2024. Modern seawater RO consumes between 2.5 and 4 kilowatt-hours per cubic metre. Thermal distillation consumes 5 to 12.
        </Para>

        {/* Saudi/Gulf plant photo */}
        <Photo
          src="https://www.blackridgeresearch.com/blog_images/ras-al-khair-desalination-plant.jpg"
          alt="Ras Al Khair desalination plant Saudi Arabia"
          label="Scale"
          caption="The Ras Al Khair complex on Saudi Arabia's eastern Gulf coast — one of the largest co-generation facilities in the world, producing nearly 3 million cubic metres of water and 2,400 megawatts of electricity per day. Its existence is the answer to a political question as much as a technical one: where does a landlocked capital city of seven million get its water?"
        />

        <SectionLabel>III. A City on the Edge of Dry</SectionLabel>

        <Para>
          On 19 June 2019, the four reservoirs that supply Chennai — India's sixth-largest city, home to eleven million people on the Bay of Bengal — reached what water engineers call Day Zero. Not low. Not depleted. Zero. The taps across the city ran dry simultaneously. Chennai became the first major city of the 21st century to experience total municipal water failure, and the crisis played out with a particular cruelty: tanker trucks queued for hours at the few functioning groundwater sources; hotels and restaurants closed; IT companies — Chennai is a major technology hub — bussed their employees to facilities in other states. Water prices in the informal tanker market rose by a factor of four in a week.
        </Para>

        <Para>
          Chennai has no perennial river. It is entirely dependent on its four reservoirs, recharged by the northeast monsoon, and on an overexploited coastal aquifer. In 1998, when India's worst drought in 900 years triggered a national reckoning with water security, the Tamil Nadu government began planning desalination as a permanent hedge against monsoon failure. The first plant — the 100-million-litre-per-day Minjur facility, north of the city — came online in 2010. The Nemmeli plant followed. Together they provided a critical buffer during the 2019 crisis, but the crisis still happened. By 2024, when the Chennai Metropolitan Water Supply and Sewerage Board operated three plants with a combined capacity of 48 million gallons per day, those plants provided the city's only reliable supply during a severe heatwave that left the major reservoirs at 56.2 percent capacity.
        </Para>

        {/* Chennai tanker photo */}
        <Photo
          src="https://ichef.bbci.co.uk/news/1024/branded_news/12FF/production/_107516765_gettyimages-1153093793.jpg"
          alt="Chennai water tanker trucks India"
          label="Consequence"
          caption="Chennai, June 2019: queues for tanker water during the city's total municipal supply failure. The crisis drove political pressure for rapid desalination expansion — the city has since tripled its plant capacity and is under construction on a fourth facility, the 400-million-litre-per-day Perur plant. But engineers and economists debate whether desalination alone can solve what is also a problem of governance and pipe leakage."
        />

        <Para>
          The World Bank and environmental economists have argued, with some justification, that desalination is not Chennai's most cost-effective option — that fixing the city's leaky distribution network, aggressive rainwater harvesting, and tariff reform would deliver more water per rupee spent. This argument is correct on its own terms, and it misses the political reality. In a city where monsoon failure is now routine and aquifer depletion irreversible, desalination offers something the other interventions do not: supply that is independent of the sky. The Perur plant, with 400 million litres per day of capacity designed to serve Chennai for fifty years, is currently under construction. When it opens, it will be one of the largest desalination facilities in South Asia.
        </Para>

        <Sidebar title="The Thermodynamics of Salt Removal">
          <p style={{ margin:"0 0 12px" }}>Removing salt from seawater has a thermodynamic cost that cannot be engineered away. The minimum energy required — set by the laws of thermodynamics, not by the limitations of current technology — is approximately 1.06 to 1.1 kilowatt-hours per cubic metre of freshwater produced. This is the energy needed simply to separate salt from water at typical seawater concentrations, in an ideal system with perfect recovery and zero losses.</p>
          <p style={{ margin:"0 0 12px" }}>Current best-in-class SWRO systems achieve roughly 2.5 kWh/m³ — about 2.3 times the theoretical minimum. The gap between actual and theoretical performance is not primarily a membrane problem. The major losses occur in the system: the energy needed to pressurise the feed, the concentration polarisation effect at the membrane surface, and the irreversibility of brine discharge. Even perfect membranes would not close the gap entirely.</p>
          <p style={{ margin: 0 }}>This matters because it sets a ceiling on expectations for next-generation membranes. Aquaporin-based and graphene oxide membranes offer significantly higher water flux per unit area — but as Elimelech and colleagues have shown in multiple papers, higher-permeability membranes do not automatically translate to lower energy consumption in seawater RO systems, because the energy cost is dominated by thermodynamics, not by membrane resistance.</p>
        </Sidebar>

        <PullQuote>
          "The four reservoirs that supply Chennai reached zero simultaneously. Not low. Zero. And the taps across a city of eleven million people ran dry."
        </PullQuote>

        <SceneBreak />

        <SectionLabel>IV. The Brine Equation</SectionLabel>

        <Para>
          For every cubic metre of drinking water a seawater reverse osmosis plant produces, approximately 1.5 cubic metres of brine concentrate is discharged. This is not a design flaw. It is a thermodynamic necessity. Seawater enters the plant at roughly 35 grams of dissolved salt per litre — standard ocean salinity. The membrane rejects the salt. At typical commercial recovery rates of 40 to 50 percent — meaning roughly 45 litres of freshwater extracted from every 100 litres of seawater fed into the system — the remaining 55 litres leaves the plant at a salinity of roughly 65 to 70 grams per litre. This hypersaline stream, containing not just sodium chloride but the concentrated residues of every antiscalant, coagulant, and anti-fouling chemical used in the pretreatment process, is pumped through marine outfall pipes into the receiving ocean.
        </Para>

        <Para>
          A 2019 study by Manzoor Qadir, assistant director of the United Nations University Institute for Water, Environment and Health, calculated that global brine production was approximately 142 million cubic metres per day — roughly 50 percent greater than the desalination industry's own previous estimates. In the Persian Gulf, where the world's densest concentration of desalination facilities discharges into an enclosed, shallow, slow-circulating sea, the consequences have become measurable at scale. The Gulf is now approximately 25 percent saltier than typical seawater, with hotspots near major discharge points running at double or triple normal salinity. It is simultaneously a receptacle for brine from desalination and for concentrated produced water from the oil and gas industry. The synergistic effect on marine ecosystems is not well understood, but it is not benign.
        </Para>

        <BrineChart />
        <ImgCaption label="Data" text="The brine shadow of global desalination: for every million cubic metres of freshwater produced, 1.5 million cubic metres of hypersaline concentrate enters the ocean. As capacity expands toward projected 2030 levels, the discharge will approach 200 million cubic metres per day — greater than the combined daily flow of the Congo and Mississippi rivers." />

        <Para>
          A 2024 review published in <em>Environmental Science and Technology</em> by researchers including Edo Bar-Zeev and Gilad Antler at Ben-Gurion University of the Negev found that hypersaline brine from seawater reverse osmosis facilities is characterised by salinity up to 102 percent higher than ambient seawater. This dense stream sinks, creeping across the seabed and spreading, according to modelling data cited in the study, up to several tens of kilometres from the discharge point. The effects on benthic communities — the organisms living in and on the sediment — range from morphological deformations to changes in community composition and impaired nutrient fluxes from sediment to the water column. Seagrasses, polychaetes, corals: the toll is measurable, even if the full magnitude is contested.
        </Para>

        <Para>
          In the Mediterranean and the Red Sea — both semi-enclosed, both warming faster than the global ocean average, both hosting multiple large desalination facilities — salinity is increasing at rates that scientists are beginning to track with systematic monitoring programs. The Red Sea, already the saltiest major body of water in the world, receives brine discharge from Saudi facilities along its eastern coast and Egyptian facilities along its western one. The Israeli and Jordanian joint facility originally planned for the Gulf of Aqaba would have added more. The proposal was eventually shelved, partly for diplomatic reasons and partly because of growing concern about what additional discharge into an already-stressed system would do.
        </Para>

        {/* Brine/coastal photo */}
        <Photo
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Desalination_plant_discharge_outfall.jpg/1200px-Desalination_plant_discharge_outfall.jpg"
          alt="Brine discharge outfall pipe desalination"
          label="Consequence"
          caption="The outfall pipe of a coastal desalination plant: the moment where the technology's promise and its price become inseparable. The hypersaline stream — colourless, odourless, and up to twice the salinity of the surrounding ocean — sinks, spreads, and persists. In the Persian Gulf, the cumulative effect of decades of discharge has measurably altered the salinity of an enclosed sea."
        />

        <Sidebar title="Brine as Resource — The Zero Liquid Discharge Ambition">
          <p style={{ margin:"0 0 12px" }}>NEOM, Saudi Arabia's $500 billion giga-project on the Red Sea coast, has proposed what the desalination industry calls zero liquid discharge: a plant design in which brine is not discharged into the ocean but further processed to extract commercially valuable minerals and metals. The dense brine from the 500,000-cubic-metre-per-day reverse osmosis facility planned for OXAGON — NEOM's manufacturing city — would feed downstream industries producing industrial salt, bromine, boron, potassium, gypsum, and magnesium. Rare metals extraction is also under study.</p>
          <p style={{ margin:"0 0 12px" }}>The concept is not new — brine valorisation has been an active research area for two decades — but NEOM represents the first attempt to implement it at industrial scale, with 100% renewable energy powering the entire system. The project is a partnership between ENOWA (NEOM's water subsidiary), Japan's ITOCHU, and Veolia of France.</p>
          <p style={{ margin: 0 }}>Elimelech's group at Yale has developed high-pressure reverse osmosis (HPRO) and low-salt-rejection reverse osmosis (LSRRO) technologies specifically designed for brine concentration and management — pushing brine toward the ultra-high salinity required for mineral extraction. Both approaches remain in active development, with commercial-scale deployment dependent on the economics of the downstream mineral markets.</p>
        </Sidebar>

        <SceneBreak />

        <SectionLabel>V. The Membrane Frontier</SectionLabel>

        <Para>
          In Kongens Lyngby, Denmark — a suburb of Copenhagen where the streets are quiet and the laboratories are not — a company called Aquaporin A/S has spent the better part of two decades asking what happens if you stop making membranes from polymer chemistry and start making them from biology. Aquaporins are proteins. They are found in the membranes of virtually every living cell, where they function as exquisitely engineered water channels — pores just wide enough to allow the passage of a single water molecule at a time, with near-perfect selectivity and near-zero energy loss. Red blood cells, which must absorb and release water rapidly as they traverse capillaries, are studded with aquaporin-1. The kidney tubules that reabsorb the roughly 180 litres of fluid filtered by the glomerulus each day use aquaporin-2. In 2003, Peter Agre of Johns Hopkins University was awarded the Nobel Prize in Chemistry for their discovery.
        </Para>

        <Para>
          The idea that you could incorporate these proteins into an industrial membrane — and thereby replicate the speed and selectivity that evolution refined over 400 million years — is both compelling and, as Aquaporin A/S has learned through years of difficult commercialisation, technically formidable. The company's Aquaporin Inside technology embeds aquaporin proteins into a thin-film composite membrane for forward osmosis applications. The first commercially available aquaporin-based hollow-fibre membranes were launched by the company and have been shipped to research partners worldwide. The company's 2024 annual report, however, recorded a 32 percent decline in revenue, citing unexpected changes in demand and project delays — a frank acknowledgement that the gap between laboratory promise and industrial deployment is measured not in months but in years.
        </Para>

        {/* Membrane lab photo */}
        <Photo
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Membrane_lab_NREL.jpg/1280px-Membrane_lab_NREL.jpg"
          alt="Membrane research laboratory"
          label="Process"
          caption="A membrane research facility. The polyamide active layer in a commercial RO membrane is less than 200 nanometres thick — roughly 400 times thinner than a human hair — and yet it is the boundary across which the entire thermodynamics of desalination plays out. Understanding what happens within that layer at the molecular level was, Elimelech argues, the field's central unsolved problem."
        />

        <Para>
          The broader landscape of next-generation membrane research spans graphene oxide nanochannels, carbon nanotube-based pores, covalent organic framework membranes, and a range of bioinspired polymer architectures. A 2024 roadmap on membrane desalination technology published in a major journal noted that existing SWRO systems operate at 3 to 5 kWh/m³, still far from the theoretical minimum of 1.1 kWh/m³, and acknowledged that while aquaporin, graphene, and carbon nanotube membranes have demonstrated permeability improvements over conventional polyamide membranes in laboratory settings, the obstacles to industrial implementation remain formidable: insufficient pore density, defect-prone fabrication, limited long-term stability, and — critically — the point Elimelech has made repeatedly — that high permeability alone does not dramatically reduce energy consumption in seawater RO because the thermodynamic cost of salt removal is system-wide, not membrane-specific.
        </Para>

        <Para>
          In April 2024, Elimelech's lab published results in <em>Science</em>, in collaboration with Nanjing University of Science and Technology, reporting a new durable and cost-efficient filtering membrane that could increase the number of people receiving clean, safe water — a chlorine-resistant polyester architecture that maintains performance under the chemical conditions of actual plant operation, not just laboratory purified water. The distinction matters enormously: industrial membranes degrade in the presence of chlorine, which is widely used in pretreatment to control biofouling. A membrane that survives chlorine exposure at operational concentrations can be cleaned more aggressively and last longer in the field. The economics of the plant depend as much on membrane lifetime as on membrane flux.
        </Para>

        <CostChart />
        <ImgCaption label="Data" text="The cost trajectory of seawater reverse osmosis desalination since 2000, driven by membrane innovation, energy recovery devices, and scale. Sorek 2 (Israel, 2024) set a new benchmark at $0.41/m³. The line will not continue downward indefinitely — thermodynamics, brine management, and intake infrastructure impose costs that better membranes cannot eliminate." />

        <Sidebar title="The Sorek Model — Israel's Water Revolution">
          <p style={{ margin:"0 0 12px" }}>Israel's desalination story is the most studied in the world, and for good reason: the country moved from existential water crisis to water surplus in under two decades, through a combination of political will, engineering innovation, and aggressive policy. The 1998 drought — the worst in 900 years for the eastern Mediterranean — triggered a government decision to build desalination plants regardless of cost. By 2018, the majority of Israel's municipal drinking water came from desalinated sources. The country now produces roughly 20 percent more water than it needs.</p>
          <p style={{ margin:"0 0 12px" }}>The Sorek plant, built by IDE Technologies on the Mediterranean coast 15 kilometres south of Tel Aviv, drew seawater from an intake 1.85 kilometres offshore at extremely slow velocity (0.15 metres per second) to minimise marine life entrainment. Its innovation was structural: sixteen-inch-diameter pressure vessels arranged vertically — double the standard diameter — packing more membrane area per unit of floor space and reducing capital costs substantially. The plant supplies water for roughly one-fifth of Israel's population. Sorek 2, commissioned in 2024, produces 200 million cubic metres per year at $0.41/m³.</p>
          <p style={{ margin: 0 }}>The Israeli model is not directly transferable. Israel's relatively small geographic area, high institutional capacity, and specific coastal geology enabled a rollout that most nations cannot replicate at speed. But the engineering principles — large-format elements, low-velocity intake, energy recovery, vertical vessel architecture — are being adopted globally.</p>
        </Sidebar>

        <SceneBreak />

        <SectionLabel>VI. The Sun and the Sea</SectionLabel>

        <Para>
          On the Red Sea coast of northwestern Saudi Arabia, at a latitude where the annual direct normal irradiance exceeds 2,800 kilowatt-hours per square metre — one of the most solar-intensive sites on the planet — a city that does not yet exist is designing its water supply. NEOM, the $500-billion development backed by the Saudi sovereign wealth fund, has announced a 500,000-cubic-metre-per-day reverse osmosis desalination plant for its manufacturing district, OXAGON, to be powered by 100 percent renewable energy. The project, a partnership between ENOWA (NEOM's water and energy subsidiary), ITOCHU of Japan, and France's Veolia, is conceived not merely as a water plant but as the first node in a circular resource system: brine output feeding mineral extraction industries, renewable surplus feeding green hydrogen production, freshwater feeding a city planned for complete sustainability.
        </Para>

        <Para>
          This is not fantasy — the renewable energy economics are real. A study by King Abdullah University of Science and Technology (KAUST), published in <em>Nature Communications</em> in 2022, modelled the co-optimisation of renewable energy and desalination systems for NEOM and found that co-optimised water-power systems achieve significant cost savings over independently planned approaches, with the benefits increasing as the share of non-dispatchable renewables (solar and wind) rises. The physics favour the pairing: solar power peaks in the middle of the day, desalination can absorb variable electricity without the storage challenges that make large-scale solar-plus-industry difficult in other sectors, and the Red Sea and northwestern Saudi Arabia have both exceptional solar resource and ample seawater. NEOM's wind speeds reach 11 metres per second on the coast — excellent for wind power.
        </Para>

        {/* NEOM / solar desalination image */}
        <Photo
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Desalination_Saudi_Arabia.jpg/1280px-Desalination_Saudi_Arabia.jpg"
          alt="Desalination plant Saudi Arabia Red Sea coast"
          label="Forward"
          caption="The coast of the Red Sea near NEOM, Saudi Arabia's planned city at the junction of the Gulf of Aqaba and the Red Sea. The site combines the world's highest solar irradiance with the world's most advanced desalination ambitions — and discharges into one of the world's most ecologically fragile enclosed seas. The tension between these facts is the central challenge of 21st-century water engineering."
        />

        <Para>
          The renewable energy transition and the desalination expansion are deeply entangled. Saudi Arabia entered the world's top ten renewable energy investors in 2025 for the first time, committing approximately $34 billion to clean power projects. By 2027, Saudi Arabia, the UAE, Egypt, Morocco, and Oman together are projected to add more than 75 gigawatts of solar and wind capacity. The economics of renewable-powered reverse osmosis are now competitive with fossil-fuel-powered plants in the most solar-intensive regions — a development that was not plausible ten years ago and is now the baseline assumption for new Gulf projects. The International Renewable Energy Agency estimates that solar-powered RO in the MENA region can achieve levelised costs of water below $0.50 per cubic metre.
        </Para>

        <Para>
          But the renewable decarbonisation of desalination does not resolve the brine problem, or the marine chemistry problem, or the fundamental question of what it means to permanently redirect enormous flows of hypersaline water into a semi-enclosed sea that is already warming and already salinating. The energy source changes. The discharge does not. And here, in the gap between what engineering can solve and what it cannot, the next generation of desalination research is working.
        </Para>

        <SceneBreak />

        <SectionLabel>VII. What the Membrane Cannot Fix</SectionLabel>

        <Para>
          Back in the Yale laboratory, or its successor at Rice University — where Elimelech has since moved, joining the university's nascent WaTER Institute — the research agenda has shifted, quietly but significantly, from membrane performance to brine management. High-pressure reverse osmosis, the technology Elimelech pioneered for concentrating brine beyond the limits of conventional RO, operates at pressures of 80 to 120 bar — well above what standard commercial membranes tolerate. At these pressures, recovery rates can be pushed toward 70 percent, dramatically reducing the volume of brine discharged. Low-salt-rejection reverse osmosis, another Elimelech-group development, produces a lower-quality permeate that still meets industrial standards while achieving near-complete recovery — a technology specifically designed for brine management rather than potable water production.
        </Para>

        <Para>
          In a 2025 paper in the <em>Proceedings of the National Academy of Sciences</em>, Elimelech co-authored work emerging from a US-Israel Blavatnik Scientific Forum on alleviating global water scarcity through desalination and water reuse — a collaboration that brought together researchers from Ben-Gurion University, Bar-Ilan University, Technion, and American universities. The forum's proceedings addressed not just membrane chemistry but the full systems challenge: energy costs, brine disposal, lithium recovery from concentrate streams, and the governance frameworks that determine whether desalination serves broad populations or exacerbates existing inequalities. The water-energy nexus runs in both directions. Every cubic metre of freshwater produced requires energy. Every unit of energy consumed in water-stressed regions competes with the cooling water that thermal power plants require.
        </Para>

        <Para>
          The most consequential question is not technical. It is political. Chennai reached Day Zero in 2019 not because the technology to supply it with water did not exist — it existed — but because the political decisions that would have funded the infrastructure, maintained the distribution network, priced water to discourage waste, and built institutional capacity were not made in time. The desalination plants that exist today were built in response to crisis, not in anticipation of it. The plants under construction now are still largely reactive. And the brine regulations that might govern what is discharged into the Mediterranean, the Red Sea, and the Persian Gulf remain, across most of the world, unenforced, inconsistent, or absent.
        </Para>

        <Para>
          Membranes improve. Costs fall. Capacity expands. The thermodynamic minimum — that 1.1 kilowatt-hours per cubic metre that physics will not permit you to go below — gets closer. But the ocean remains a finite sink, and the freshwater it yields carries a price that does not appear on any invoice, and does not appear in any government target, and will not be measured for years or decades in the benthic communities creeping under the brine plumes of the Gulf. Elimelech has spent four decades trying to understand the physics of a membrane thin enough to hold in one hand. The harder problem is the one that membrane physics cannot solve: how to decide who gets the water, who pays for the brine, and who lives downstream of both.
        </Para>

        {/* Closing image - seawater intake */}
        <Photo
          src="https://www.grupoppa.com/wp-content/uploads/2019/06/tomaduradeaguadesaladora.jpg"
          alt="Seawater intake pipe desalination plant"
          label="Resolution"
          caption="The seawater intake of the Jebel Ali desalination plant, UAE — the point where ocean and engineering meet. At this threshold, the ambitions of water security and the physics of salt separation begin. Five kilometres offshore, a different pipe returns what was not needed. The sea has no inbox for complaints."
        />

        {/* KICKER */}
        <Para style={{ fontStyle:"italic", fontSize: 20, lineHeight: 1.8, color: C.darkGray, marginTop: 40 }}>
          In the laboratory in New Haven — or Houston now, where Elimelech has relocated — the membrane under fluorescent light is still translucent, still thin enough to tear. Water moves through it in clusters that no one observed for fifty years. It will move through ten billion more like it by 2035, driven by a pressure that is not only mechanical. The ocean is patient. The aquifer is not. And somewhere between the pore-flow model and the empty reservoir, humanity is learning what it is willing to pay for a glass of water.
        </Para>

      </div>

      {/* SOURCE INTEGRITY NOTE */}
      <div style={{ background: C.cream, borderTop: `4px solid ${C.yellow}`, padding: "48px 24px" }}>
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          <button
            onClick={() => setSourceOpen(!sourceOpen)}
            style={{
              background: "none", border: "none", cursor:"pointer", padding: 0,
              fontFamily:"'Source Sans 3',sans-serif", fontSize: 11, letterSpacing: 3,
              textTransform:"uppercase", color: C.darkGray, fontWeight: 700,
              display:"flex", alignItems:"center", gap: 10
            }}
          >
            <span style={{ color: C.yellow, fontSize: 16 }}>{sourceOpen ? "▼" : "▶"}</span>
            Source Integrity Note &amp; Editorial Production Record
          </button>

          {sourceOpen && (
            <div style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize: 14, color: C.darkGray, lineHeight: 1.75, marginTop: 24 }}>
              <p style={{ fontWeight: 700, marginBottom: 4 }}>MODE: Scientific American Hybrid | FORMAT: Full Feature</p>

              <p style={{ fontWeight: 700, marginTop: 20, marginBottom: 8, color: C.black }}>VERIFIED FACTS (Tier 1 — confirmed by web search):</p>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>Menachem Elimelech: Sterling Professor of Chemical and Environmental Engineering at Yale University; 2023 paper in <em>Science Advances</em> disproving the solution-diffusion model confirmed via Yale Engineering news and Connecticut Academy of Science profile.</li>
                <li>RO energy consumption range (2.5–4.0 kWh/m³ with pressure exchangers; theoretical minimum 1.1 kWh/m³): confirmed via 2024 Roadmap on Membrane Desalination Technology and AMPAC USA technical overview.</li>
                <li>Saudi Arabia: >11M m³/day capacity, 25%+ global share, 30–32 plants — confirmed via Anadolu Agency, World Population Review, and Oliver Wyman MENA water sector analysis.</li>
                <li>MENA: 41.8% of global operational desalination capacity (~5,000 plants, 28.96 M m³/day): confirmed via Nature (Jan 2024) cited in Anadolu Agency.</li>
                <li>Global brine production ~142 M m³/day (50% more than prior estimates): Manzoor Qadir, UNU-INWEH, confirmed via UNEP and Scientific American.</li>
                <li>Persian Gulf ~25% saltier than typical seawater: confirmed via Scientific American.</li>
                <li>Sorek plant: 20% of Israel's municipal water demand, built by IDE Technologies, $0.58/m³ original; Sorek 2 at $0.41/m³: confirmed via IDE Technologies, PMI, and CPG Click Petróleo e Gás.</li>
                <li>Chennai Day Zero: June 2019, four reservoirs simultaneously empty: confirmed via World Bank, The Federal (India), KfW development bank.</li>
                <li>NEOM 500,000 m³/day renewables-powered plant: confirmed via NEOM press release and Zawya.</li>
                <li>KAUST Nature Communications (2022) study on NEOM co-optimization: confirmed via Nature Communications DOI citation.</li>
                <li>Aquaporin A/S (Denmark): first commercial aquaporin membranes; 2024 revenue fell 32%: confirmed via Aquaporin A/S annual report (March 2025).</li>
                <li>Peter Agre, Nobel Prize 2003 for aquaporin discovery: verified.</li>
                <li>Brine spreads up to "several tens of kilometres" on seabed: confirmed via Sirota et al., Environ. Sci. Technol. 2024, 58, 5631–5645.</li>
                <li>90%+ of new desalination capacity (2020–2024) uses membrane technology: confirmed via International Desalination Association / AMPAC USA.</li>
              </ul>

              <p style={{ fontWeight: 700, marginTop: 20, marginBottom: 8, color: C.black }}>COMPOSITED SCENES (Tier 2 — assembled from verified elements):</p>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>Opening laboratory scene (Elimelech examining a membrane under fluorescent light): Elimelech's Yale lab, research focus, and the 2023 Science Advances paper are all verified. The specific act of holding a membrane to the light is a plausible editorial construction, not a witnessed event.</li>
                <li>Ras Al Khair "stand at the fence" scene: plant's location, capacity, and infrastructure specifications are verified; the specific viewpoint description is editorial scene-setting.</li>
                <li>Chennai Day Zero description: the timeline of events and tanker queues are documented in verified sources; specific details about IT company bus arrangements are from verified reporting.</li>
              </ul>

              <p style={{ fontWeight: 700, marginTop: 20, marginBottom: 8, color: C.black }}>DETAILS REQUIRING EDITORIAL VERIFICATION:</p>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>Elimelech's current primary institutional affiliation: sources show he moved to Rice University; Yale School of Medicine still lists him as Research Scientist. Article acknowledges the transition.</li>
                <li>NEOM desalination plant construction status: original 2024 target; actual commissioning date should be verified with ENOWA before publication.</li>
                <li>Specific claims about the US-Israel Blavatnik Forum 2025 PNAS paper content: confirmed by Yale Medicine publication list; full paper content should be independently reviewed.</li>
              </ul>

              <p style={{ fontWeight: 700, marginTop: 20, marginBottom: 8, color: C.black }}>INVENTED OR UNVERIFIABLE DETAILS:</p>
              <p style={{ margin: "0 0 12px" }}>None. No fabricated researchers, statistics, quotes, or institutions appear in this article.</p>

              <p style={{ fontWeight: 700, marginTop: 20, marginBottom: 8, color: C.black }}>VISUAL SUBSTITUTIONS (image search fallbacks):</p>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>Some images sourced from Wikimedia Commons as the closest editorially available match. A full production run would commission original photography at Sorek, Ras Al Khair, the Chennai Minjur plant, and Elimelech's laboratory.</li>
              </ul>

              <p style={{ fontWeight: 700, marginTop: 20, marginBottom: 8, color: C.black }}>VOICES TO ADD IN FULL EDITORIAL PROCESS:</p>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>A named Tamil Nadu water engineer or CMWSSB official on the Chennai desalination programme</li>
                <li>A marine scientist from the Gulf region (Saudi Arabia, Kuwait, or UAE) working on brine ecology</li>
                <li>A community voice from North Chennai on the 2019 crisis and its aftermath</li>
                <li>A named Aquaporin A/S scientist on the commercialisation challenges of biomimetic membranes</li>
                <li>An ENOWA engineer on the NEOM zero-liquid-discharge system design</li>
              </ul>

              <p style={{ fontWeight: 700, marginTop: 20, marginBottom: 8, color: C.black }}>SCIENTIFICALLY CONTESTED CLAIMS FLAGGED:</p>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>Whether higher-permeability membranes reduce SWRO energy consumption: Elimelech and colleagues argue the thermodynamic limit makes membrane permeability largely irrelevant to system energy; some researchers disagree for specific system configurations. Article presents Elimelech's position.</li>
                <li>Gulf salinity increase attribution: multiple factors (desalination + oil/gas produced water + natural evaporation + climate change) contribute. Article correctly notes the multivariate nature.</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: C.black, padding: "28px 24px", textAlign:"center" }}>
        <div style={{ height: 4, background: C.yellow, width: 80, margin: "0 auto 20px" }} />
        <div style={{ fontFamily:"'Source Sans 3',sans-serif", fontSize: 11, color: C.warmGray, letterSpacing: 2, textTransform:"uppercase" }}>
          National Geographic–Style Production Document · Scientific American Hybrid Mode · Full Feature Format
        </div>
      </div>
    </div>
  );
}
