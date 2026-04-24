/* --- YAML frontmatter --- */
/*
title: "Looksmaxxing"
subtitle: "How a vocabulary from the incelosphere became the operating system of young male beauty"
category: "history"
style: "encyclopaedic"
date: "2026-04-24"
tags: [subcultures, masculinity, psychology, social-media]
*/

const ARTICLE_DATA = {
  title: "Looksmaxxing",
  subtitle: "How a vocabulary from the incelosphere became the operating system of young male beauty",
  category: "history",
  style: "encyclopaedic",
  date: "2026-04-24",
  author: "Matthew Deane",
  tags: ["subcultures", "masculinity", "psychology", "social-media"],
};

/* ═══════════════════════════════════════════════════════════════ */
/*  DESIGN TOKENS                                                  */
/* ═══════════════════════════════════════════════════════════════ */

const C = {
  bg: "#FAF8F5",
  bgAlt: "#F2EDE4",
  bgCard: "#F0EBE1",
  fg: "#1a1a1a",
  ink: "#1a1a1a",
  muted: "#8A8278",
  textMute: "#8A8278",
  textMuted: "#8A8278",
  accent: "#C4A35A",
  grid: "#E0DAD0",
  line: "#B8AE9C",
  rule: "#D8CFC0",
  panel: "#F0EBE1",
  ok: "#5A7A4A",
  yellow: "#FFCE00",
  dark: "#1a1a1a",
  navy: "#0C1420",
  red: "#B43A2E",
  blue: "#3C6FA0",
  green: "#5A7A4A",
  orange: "#C27A3A",
  purple: "#6B4A7A",
};

const F = {
  serif: "'Source Serif 4', Georgia, serif",
  sans: "'Source Sans 3', 'Helvetica Neue', sans-serif",
  head: "'Playfair Display', Georgia, serif",
  mono: "'JetBrains Mono', monospace",
};

/* ═══════════════════════════════════════════════════════════════ */
/*  RECHARTS — Google Trends–style interest over time              */
/*  Data pattern reconstructed from Google Trends publicly         */
/*  available "looksmaxxing" time series (relative 0–100).         */
/*  Labelled Illustrative because exact monthly indices shift.     */
/* ═══════════════════════════════════════════════════════════════ */

const trendsData = [
  { m: "Jan 23", v: 2 },
  { m: "Apr 23", v: 4 },
  { m: "Jul 23", v: 8 },
  { m: "Oct 23", v: 22 },
  { m: "Jan 24", v: 58 },
  { m: "Apr 24", v: 78 },
  { m: "Jul 24", v: 100 },
  { m: "Oct 24", v: 86 },
  { m: "Jan 25", v: 74 },
  { m: "Apr 25", v: 70 },
  { m: "Jul 25", v: 66 },
  { m: "Oct 25", v: 62 },
  { m: "Jan 26", v: 55 },
  { m: "Apr 26", v: 52 },
];

const TrendsChart = () => (
  <div style={{ width: "100%", background: C.bg, padding: "20px 0 8px" }}>
    <div style={{ fontFamily: F.sans, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.ink, marginBottom: 4 }}>
      Figure 1 · Relative Google search interest, worldwide
    </div>
    <div style={{ fontFamily: F.sans, fontSize: 12, color: C.muted, marginBottom: 12 }}>
      Term: "looksmaxxing". Peak of series = 100. Illustrative — reconstructed from Google Trends.
    </div>
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={trendsData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
        <CartesianGrid stroke={C.grid} strokeDasharray="2 4" />
        <XAxis dataKey="m" tick={{ fontFamily: F.mono, fontSize: 10, fill: C.muted }} stroke={C.line} />
        <YAxis tick={{ fontFamily: F.mono, fontSize: 10, fill: C.muted }} stroke={C.line} domain={[0, 100]} />
        <Tooltip contentStyle={{ fontFamily: F.sans, fontSize: 12, background: C.bgAlt, border: `1px solid ${C.line}` }} />
        <Line type="monotone" dataKey="v" stroke={C.red} strokeWidth={2.4} dot={{ r: 3, fill: C.red }} activeDot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
    <div style={{ fontFamily: F.sans, fontSize: 11, color: C.muted, marginTop: 6 }}>
      Sources: Google Trends, series pulled April 2026; corroborated by The Conversation (2024), Fortune (2024), Healthline (2024).
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/*  RECHARTS — Leg lengthening cost comparison                     */
/* ═══════════════════════════════════════════════════════════════ */

const costData = [
  { clinic: "Turkey (avg)", usd: 30 },
  { clinic: "UK (private)", usd: 65 },
  { clinic: "Paley · 5cm tibia", usd: 115 },
  { clinic: "Paley · 8cm femur", usd: 104 },
  { clinic: "Paley · 4in combo", usd: 196 },
  { clinic: "UK (top end)", usd: 315 },
];

const CostChart = () => (
  <div style={{ width: "100%", background: C.bg, padding: "20px 0 8px" }}>
    <div style={{ fontFamily: F.sans, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: C.ink, marginBottom: 4 }}>
      Figure 2 · Cost of cosmetic leg-lengthening surgery
    </div>
    <div style={{ fontFamily: F.sans, fontSize: 12, color: C.muted, marginBottom: 12 }}>
      Approximate self-pay price, thousands of USD (2024–2026). Turkey, Paley Institute, UK private clinics.
    </div>
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={costData} margin={{ top: 10, right: 20, left: 0, bottom: 28 }}>
        <CartesianGrid stroke={C.grid} strokeDasharray="2 4" />
        <XAxis dataKey="clinic" tick={{ fontFamily: F.mono, fontSize: 10, fill: C.muted }} stroke={C.line} angle={-18} textAnchor="end" height={50} />
        <YAxis tick={{ fontFamily: F.mono, fontSize: 10, fill: C.muted }} stroke={C.line} label={{ value: "USD (thousands)", angle: -90, position: "insideLeft", fontFamily: F.sans, fontSize: 11, fill: C.muted }} />
        <Tooltip contentStyle={{ fontFamily: F.sans, fontSize: 12, background: C.bgAlt, border: `1px solid ${C.line}` }} />
        <Bar dataKey="usd" fill={C.blue} />
      </BarChart>
    </ResponsiveContainer>
    <div style={{ fontFamily: F.sans, fontSize: 11, color: C.muted, marginTop: 6 }}>
      Sources: Paley Stature Center published price list (limblengthening.org, 2024); Euronews (Sept 2025); Leglengtheningsurgery.com price guide.
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/*  SVG — PSL scale as custom diagram                              */
/* ═══════════════════════════════════════════════════════════════ */

const PSLDiagram = () => (
  <svg viewBox="0 0 800 330" style={{ width: "100%", display: "block", borderRadius: 4 }}>
    <rect width="800" height="330" fill={C.bg} />
    <text x="400" y="26" fill={C.ink} fontSize="14" textAnchor="middle" fontFamily={F.sans} fontWeight="700">
      The PSL decile scale, as deployed on looksmax.org
    </text>
    <text x="400" y="44" fill={C.muted} fontSize="11" textAnchor="middle" fontFamily={F.sans}>
      A pseudoscientific 1–10 attractiveness grading schema inherited from defunct forums PuaHate, SlutHate and Lookism.
    </text>

    {/* scale bar */}
    <defs>
      <linearGradient id="pslGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#6b2d2d" />
        <stop offset="25%" stopColor={C.red} />
        <stop offset="55%" stopColor="#a88038" />
        <stop offset="80%" stopColor={C.green} />
        <stop offset="100%" stopColor="#2d4a6b" />
      </linearGradient>
    </defs>
    <rect x="60" y="90" width="680" height="28" rx="4" fill="url(#pslGrad)" opacity="0.85" />

    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n, i) => (
      <g key={n}>
        <line x1={60 + i * 75.6} y1="90" x2={60 + i * 75.6} y2="118" stroke="#fff" strokeWidth="1" opacity="0.5" />
        <text x={60 + i * 75.6 + 37} y="108" fill="#fff" fontSize="11" textAnchor="middle" fontFamily={F.mono} fontWeight="700">
          {n}
        </text>
      </g>
    ))}

    {/* labels below */}
    {[
      { x: 120, l: "Sub-5", d: "\"subhuman\"", c: "#6b2d2d" },
      { x: 260, l: "5 · Normie", d: "unremarkable", c: C.red },
      { x: 400, l: "6 · HTN", d: "high-tier normie", c: "#a88038" },
      { x: 540, l: "7 · Chadlite", d: "attractive", c: C.green },
      { x: 680, l: "8–10 · Chad", d: "\"genetically elite\"", c: "#2d4a6b" },
    ].map((b, i) => (
      <g key={i}>
        <line x1={b.x} y1="118" x2={b.x} y2="150" stroke={b.c} strokeWidth="1" />
        <text x={b.x} y="168" fill={C.ink} fontSize="11" textAnchor="middle" fontFamily={F.sans} fontWeight="700">
          {b.l}
        </text>
        <text x={b.x} y="184" fill={C.muted} fontSize="10" textAnchor="middle" fontFamily={F.sans}>
          {b.d}
        </text>
      </g>
    ))}

    {/* Vertices: "hard" factors */}
    <text x="60" y="225" fill={C.ink} fontSize="11" fontFamily={F.sans} fontWeight="700">
      Variables graded ("halos" and "failos"):
    </text>
    {[
      { x: 60, y: 250, l: "canthal tilt" },
      { x: 200, y: 250, l: "IPD (eye spacing)" },
      { x: 340, y: 250, l: "bizygomatic width" },
      { x: 480, y: 250, l: "gonial angle" },
      { x: 620, y: 250, l: "midface ratio" },
      { x: 60, y: 275, l: "hunter eyes" },
      { x: 200, y: 275, l: "jaw projection" },
      { x: 340, y: 275, l: "chin (mentum)" },
      { x: 480, y: 275, l: "forehead slope" },
      { x: 620, y: 275, l: "height (\"manlet wall\")" },
    ].map((t, i) => (
      <text key={i} x={t.x} y={t.y} fill={C.muted} fontSize="10" fontFamily={F.mono}>
        • {t.l}
      </text>
    ))}

    <text x="400" y="315" fill={C.muted} fontSize="10" textAnchor="middle" fontFamily={F.sans} fontStyle="italic">
      Source: Solea & Sugiura (2025); The Conversation (2026); looksmax.org thread archives.
    </text>
  </svg>
);

/* ═══════════════════════════════════════════════════════════════ */
/*  SVG — Soft vs Hard looksmaxxing taxonomy                       */
/* ═══════════════════════════════════════════════════════════════ */

const SoftHardDiagram = () => (
  <svg viewBox="0 0 800 360" style={{ width: "100%", display: "block", borderRadius: 4 }}>
    <rect width="800" height="360" fill={C.bg} />
    <text x="400" y="26" fill={C.ink} fontSize="14" textAnchor="middle" fontFamily={F.sans} fontWeight="700">
      Soft, hard and extreme looksmaxxing: a taxonomy
    </text>
    <text x="400" y="44" fill={C.muted} fontSize="11" textAnchor="middle" fontFamily={F.sans}>
      Reversibility decreases left to right. Evidence base weakens with each step.
    </text>

    {/* three columns */}
    {[
      {
        x: 40,
        title: "Softmaxxing",
        colour: C.green,
        notes: "Reversible. Largely grounded in standard dermatological and fitness practice.",
        items: ["Skincare routine", "Haircut / hair dye", "Dental whitening", "Posture & gait work", "Fitness / hypertrophy", "Mewing (tongue posture)"],
      },
      {
        x: 290,
        title: "Hardmaxxing",
        colour: C.orange,
        notes: "Medical procedures with recognised pathways but often chosen cosmetically.",
        items: [
          "Hair transplant (FUE)",
          "Rhinoplasty",
          "Chin / jaw implant",
          "Orthognathic (jaw) surgery",
          "Buccal-fat removal",
          "Canthoplasty / canthal tilt",
        ],
      },
      {
        x: 540,
        title: "Extreme",
        colour: C.red,
        notes: "High-risk, contested or pseudoscientific. Often pushed on .org forums.",
        items: [
          "Leg / limb lengthening",
          "Bone-smashing (self-trauma)",
          "Steroids / SARMs",
          "Melanotan (tanmaxxing)",
          "DIY microneedling of jaw",
          "Unlicensed fillers abroad",
        ],
      },
    ].map((col, i) => (
      <g key={i}>
        <rect x={col.x} y="70" width="220" height="32" fill={col.colour} opacity="0.9" rx="3" />
        <text x={col.x + 110} y="92" fill="#fff" fontSize="14" textAnchor="middle" fontFamily={F.sans} fontWeight="700">
          {col.title}
        </text>
        {col.items.map((t, j) => (
          <g key={j}>
            <rect x={col.x} y={114 + j * 30} width="220" height="26" fill={C.bgCard} stroke={col.colour} strokeWidth="0.8" rx="3" />
            <text x={col.x + 12} y={131 + j * 30} fill={C.ink} fontSize="11" fontFamily={F.sans}>
              {t}
            </text>
          </g>
        ))}
        <text x={col.x + 110} y="342" fill={C.muted} fontSize="10" textAnchor="middle" fontFamily={F.sans} fontStyle="italic">
          {col.notes}
        </text>
      </g>
    ))}

    {/* arrow gradient */}
    <defs>
      <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill={C.muted} />
      </marker>
    </defs>
    <line x1="260" y1="56" x2="540" y2="56" stroke={C.muted} strokeWidth="1" markerEnd="url(#arr)" />
    <text x="400" y="52" fill={C.muted} fontSize="10" textAnchor="middle" fontFamily={F.sans} fontStyle="italic">
      irreversibility · risk · monetary cost →
    </text>
  </svg>
);

/* ═══════════════════════════════════════════════════════════════ */
/*  HELPERS                                                        */
/* ═══════════════════════════════════════════════════════════════ */

const DC = ({ children }) => {
  const text = typeof children === "string" ? children : "";
  const f = text.charAt(0);
  const r = text.slice(1);
  return (
    <p style={{ fontFamily: F.serif, fontSize: 18, lineHeight: 1.8, color: C.ink, margin: "0 0 24px" }}>
      <span
        style={{
          float: "left",
          fontFamily: F.head,
          fontSize: 72,
          fontWeight: 900,
          lineHeight: "0.8",
          marginRight: 8,
          marginTop: 6,
          color: C.ink,
        }}
      >
        {f}
      </span>
      <span dangerouslySetInnerHTML={{ __html: r }} />
    </p>
  );
};

const P = ({ children, style = {} }) => (
  <p
    style={{ fontFamily: F.serif, fontSize: 18, lineHeight: 1.8, color: C.ink, margin: "0 0 22px", ...style }}
    dangerouslySetInnerHTML={{ __html: children }}
  />
);

const Sec = ({ title }) => (
  <h2
    style={{
      fontFamily: F.head,
      fontSize: 28,
      fontWeight: 900,
      color: C.ink,
      margin: "52px 0 18px",
      letterSpacing: "-0.01em",
      borderBottom: `2px solid ${C.yellow}`,
      paddingBottom: 8,
      display: "inline-block",
    }}
  >
    {title}
  </h2>
);

const SB = ({ title, children }) => (
  <div
    style={{
      background: C.bgCard,
      border: `1px solid ${C.rule}`,
      borderRadius: 4,
      padding: "28px 32px",
      margin: "36px 0",
      maxWidth: 700,
    }}
  >
    <div
      style={{
        fontFamily: F.sans,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: C.ink,
        marginBottom: 8,
        borderBottom: `2px solid ${C.yellow}`,
        paddingBottom: 6,
        display: "inline-block",
      }}
    >
      {title}
    </div>
    <div
      style={{
        fontFamily: F.sans,
        fontSize: 15,
        lineHeight: 1.7,
        color: C.ink,
        marginTop: 14,
      }}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  </div>
);

const PQ = ({ children }) => (
  <blockquote
    style={{
      fontFamily: F.head,
      fontStyle: "italic",
      fontSize: 26,
      lineHeight: 1.5,
      color: C.ink,
      borderLeft: `3px solid ${C.yellow}`,
      paddingLeft: 28,
      margin: "40px 0 40px 20px",
      maxWidth: 620,
    }}
  >
    {children}
  </blockquote>
);

const Callout = ({ title, children, kind = "info" }) => {
  const bar = kind === "warn" ? C.red : kind === "tip" ? C.green : C.blue;
  return (
    <div
      style={{
        background: C.bgCard,
        borderLeft: `4px solid ${bar}`,
        padding: "18px 22px",
        margin: "28px 0",
        fontFamily: F.sans,
        fontSize: 15,
        lineHeight: 1.6,
        color: C.ink,
      }}
    >
      <div
        style={{
          fontFamily: F.sans,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: bar,
          marginBottom: 6,
        }}
      >
        {title}
      </div>
      <div>{children}</div>
    </div>
  );
};

const IC = ({ func, caption }) => (
  <div style={{ padding: "10px 0 32px" }}>
    <span
      style={{
        fontFamily: F.sans,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: C.accent,
        marginRight: 10,
      }}
    >
      {func}
    </span>
    <span style={{ fontFamily: F.sans, fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{caption}</span>
  </div>
);

const BR = () => (
  <div
    style={{
      textAlign: "center",
      margin: "48px 0",
      color: C.accent,
      fontSize: 20,
      letterSpacing: 8,
      fontFamily: F.serif,
    }}
  >
    ❧
  </div>
);

/* ═══════════════════════════════════════════════════════════════ */
/*  HERO                                                           */
/* ═══════════════════════════════════════════════════════════════ */

const Hero = () => (
  <svg viewBox="0 0 1200 700" style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}>
    <defs>
      <linearGradient id="hg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0a0a0f" />
        <stop offset="60%" stopColor="#141820" />
        <stop offset="100%" stopColor="#22262e" />
      </linearGradient>
      <radialGradient id="rg" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor={C.yellow} stopOpacity="0.08" />
        <stop offset="100%" stopColor={C.yellow} stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="1200" height="700" fill="url(#hg)" />
    <circle cx="600" cy="350" r="360" fill="url(#rg)" />

    {/* Abstract face grid — caliper-like measurement diagram */}
    <g stroke={C.yellow} strokeWidth="0.8" fill="none" opacity="0.75">
      {/* skull outline */}
      <ellipse cx="600" cy="320" rx="140" ry="180" />
      {/* jaw */}
      <path d="M 480 360 Q 600 530 720 360" />
      {/* cheekbone line */}
      <line x1="470" y1="310" x2="730" y2="310" strokeDasharray="3 4" />
      {/* midline */}
      <line x1="600" y1="140" x2="600" y2="500" strokeDasharray="2 6" />
      {/* gonial angle */}
      <path d="M 500 430 L 530 460 L 580 470" />
      {/* canthal tilt marker */}
      <line x1="530" y1="280" x2="580" y2="276" />
      <line x1="620" y1="276" x2="670" y2="280" />
      {/* reference ticks around skull */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const x1 = 600 + Math.cos(rad) * 210;
        const y1 = 350 + Math.sin(rad) * 210;
        const x2 = 600 + Math.cos(rad) * 220;
        const y2 = 350 + Math.sin(rad) * 220;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
      })}
    </g>

    {/* Measurement annotations */}
    <g fill={C.yellow} fontFamily={F.mono} fontSize="10" opacity="0.75">
      <text x="480" y="300">IPD</text>
      <text x="470" y="360">bizygomatic</text>
      <text x="450" y="450">gonial</text>
      <text x="660" y="280">canthal</text>
      <text x="680" y="220">midface ratio</text>
    </g>

    {/* Ruler strip at base */}
    <g stroke="#2a3038" strokeWidth="0.6">
      <line x1="80" y1="640" x2="1120" y2="640" />
      {Array.from({ length: 51 }).map((_, i) => (
        <line
          key={i}
          x1={80 + i * 20.8}
          y1={i % 5 === 0 ? 632 : 636}
          x2={80 + i * 20.8}
          y2="640"
        />
      ))}
    </g>
    <text x="600" y="668" fill="#5a6270" fontSize="10" textAnchor="middle" fontFamily={F.mono}>
      the face, measured
    </text>
  </svg>
);

/* ═══════════════════════════════════════════════════════════════ */
/*  MAIN                                                           */
/* ═══════════════════════════════════════════════════════════════ */

export default function Looksmaxxing() {
  return (
    <article style={{ background: C.bg, minHeight: "100vh", margin: 0, padding: 0 }}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0}body{background:${C.bg}}`}</style>

      <div
        style={{
          background: C.navy,
          color: "#fff",
          fontFamily: F.sans,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          padding: "10px 24px",
          textAlign: "center",
        }}
      >
        Mode: Encyclopaedic&nbsp; · &nbsp;Category: History of a Subculture
      </div>
      <div style={{ height: 4, background: C.yellow }} />

      {/* HERO */}
      <div style={{ position: "relative", minHeight: "85vh", overflow: "hidden", background: C.navy }}>
        <Hero />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            minHeight: "85vh",
            padding: "60px 40px 50px",
          }}
        >
          <div
            style={{
              fontFamily: F.sans,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: C.yellow,
              marginBottom: 16,
            }}
          >
            ◆ FEATURE · SUBCULTURES
          </div>
          <h1
            style={{
              fontFamily: F.head,
              fontWeight: 900,
              fontSize: "clamp(40px,5.5vw,72px)",
              color: "#fff",
              lineHeight: 1.05,
              maxWidth: 900,
              marginBottom: 20,
            }}
          >
            Looksmaxxing
          </h1>
          <p
            style={{
              fontFamily: F.serif,
              fontStyle: "italic",
              fontSize: "clamp(16px,2vw,22px)",
              color: "rgba(255,255,255,0.82)",
              maxWidth: 720,
              lineHeight: 1.5,
              marginBottom: 30,
            }}
          >
            A vocabulary invented on a defunct incel forum in 2015 has become the operating system of young male
            appearance — an economy of apps, surgeries and self-inflicted microfractures, policed by a
            pseudoscientific scale and amplified by the machines that sell attention.
          </p>
          <div
            style={{
              fontFamily: F.sans,
              fontSize: 12,
              color: "rgba(255,255,255,0.45)",
              maxWidth: 460,
              lineHeight: 1.4,
              textAlign: "right",
              alignSelf: "flex-end",
            }}
          >
            A caliper diagram of the measurements that dominate looksmaxxing discourse: canthal tilt, gonial angle,
            interpupillary distance, bizygomatic width, midface ratio. The face, reduced to its parts.
          </div>
        </div>
      </div>

      {/* BODY */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "60px 24px 80px" }}>
        <DC>{`The first recorded use of the word "looksmaxxing" sits on the Internet Archive's capture of a forum called Lookism.net, timestamped June 29, 2015. In the post, a man who will remain forever anonymous asks the thread for advice on how to "maxx" his appearance — how to push every genetic and cosmetic variable in his face toward whatever higher number the board's readers will grant him. The word is a portmanteau of "looks" and "maxxing" — in the grammar of the forum, to maximise a trait toward an upper bound. It is also, in retrospect, the first entry in a dictionary that ten years later would be spoken fluently by millions of teenage boys with no knowledge of where it came from.`}</DC>

        <P>{`Lookism.net is now defunct. Its successor forum, <em>looksmax.org</em>, founded in 2018 by an Alabama-based administrator named Lamarcus Small, receives an estimated ten million page views a month and hosts an audience of which — by one 2022 poll of the site's own users — roughly 22.7 per cent self-identify as under eighteen. From there, the vocabulary has escaped. The hashtag <code>#looksmaxxing</code> on TikTok collects more than ten billion views across its variants; the adjacent <code>#looksmax</code> tag has passed sixteen billion. In July 2024 a Fortune profile of the sector described an app called Umax — a paid face-rating service powered in part by OpenAI's models — taking in roughly half a million US dollars a month from subscribers, most of them male teenagers. By any reasonable measure, the subculture has completed its journey from incel backwater to mainstream male teen practice. This is a history of that crossing, and of what it has cost.`}</P>

        <BR />

        {/* ═════ SECTION 1 ═════ */}
        <Sec title="1 · A vocabulary from the incelosphere" />

        <P>{`The words used on looksmax.org did not originate there. They were inherited, with minor mutations, from three earlier sites — PuaHate, SlutHate and Lookism.net — which together formed what users retrospectively nicknamed the "PSL" (Puahate · SlutHate · Lookism) axis. These boards had emerged in the early 2010s as a reaction against the pick-up-artist subculture. Where PUAs had promised that behaviour — scripts, "negs", routines — could win sexual success, the PSL forums argued the opposite: that behaviour was irrelevant, and that looks alone, graded against a harsh scale, dictated romantic outcomes. That argument calcified, over the latter half of the decade, into what users called the "blackpill": the claim that romantic prospects are fixed by genetic-facial characteristics and therefore, for many men, permanently closed.`}</P>

        <P>{`Anda Iulia Solea and Lisa Sugiura, criminologists at the University of Portsmouth, have traced this migration in detail. In a 2025 paper for <em>Crime, Media, Culture</em> — "Digital Subcultural Diffusion Theory: Rebranding the incel ideology through Looksmaxxing, Sub5s and the PSL scale" — they argue that the move from PSL forums onto TikTok was not a dilution of incel ideology but a rebrand. The same claims about genetic determinism, the same disdain for women, the same ranking of men into "Chads", "normies" and "sub-5s" (PSL scores of 5 or below, i.e. below average) persisted; what changed was the packaging. Instead of explicit misogyny, the content was reframed as "self-improvement" — a socially palatable surface that could be recommended by algorithms without tripping moderation filters.`}</P>

        <PQ>
          "The PSL framework facilitates the rebranding and mainstreaming of misogynist incel ideology, reframing
          overtly toxic, misogynistic and extremist rhetoric into socially palatable discourses of self-improvement."
          <div style={{ fontFamily: F.sans, fontStyle: "normal", fontSize: 14, color: C.muted, marginTop: 12 }}>
            — Solea &amp; Sugiura, <em>Crime, Media, Culture</em>, 2025
          </div>
        </PQ>

        <P>{`A parallel mapping was made in 2024 by researchers at GNET (the Global Network on Extremism and Technology), who traced what they called the "Newgen" — a cohort of TikTok creators who evade moderation by borrowing the looksmaxxing lexicon while quietly reproducing blackpill claims. The paper described a grammar of codewords: "sub-5", "subhuman", "failo" (a facial failing), "halo" (a facial halo, e.g. "jaw halo"), "canthal tilt", "mogged" (out-competed on appearance by a more attractive man). Each term carried its own deniability; taken together, they reproduced the blackpill almost verbatim.`}</P>

        <SB title="Glossary · the lexicon at a glance">
          {`<b>Chad</b> — the allegedly genetically dominant male, PSL 8+.
          <br/><b>Becky / Stacy</b> — female counterparts in the same hierarchy.
          <br/><b>PSL</b> — Puahate / SlutHate / Lookism decile scale, 1–10.
          <br/><b>Sub-5</b> — rated 5 or below; the cohort blackpill discourse regards as romantically "cooked".
          <br/><b>Mogging</b> — visibly out-competing another man on looks. Compilation videos under #mogging are a dominant TikTok genre.
          <br/><b>Halo / Failo</b> — a single feature that lifts ("halos") or ruins ("failos") a face.
          <br/><b>Mewing</b> — pressing the tongue to the palate, named after British orthodontist Mike Mew, purported to reshape the jaw.
          <br/><b>Bonesmashing</b> — repeatedly striking the face to induce microfractures, claimed to thicken bone.
          <br/><b>Tanmaxxing / heightmaxxing / jawmaxxing</b> — domain-specific maximisation. Any noun can take the suffix.`}
        </SB>

        <PSLDiagram />
        <IC func="Diagram" caption="The PSL decile scale, as deployed on looksmax.org. A pseudoscientific grading schema inherited from three defunct incel forums." />

        <BR />

        {/* ═════ SECTION 2 ═════ */}
        <Sec title="2 · Onto TikTok, circa 2023–24" />

        <P>{`Google's own search data places the inflection point in late 2023. Until that autumn, worldwide search volume for "looksmaxxing" hovered near the floor of the trend index. Within twelve months it had multiplied by a factor of more than twenty, peaking in mid-2024. The accelerant was TikTok. The platform's algorithmic recommendation system does not need a user to search for looksmaxxing content to serve it to them; several hours of videos coded as "self-improvement for men" are sufficient, and the feed will begin introducing sub-5 jokes, canthal-tilt edits, and mogging compilations — short sequences in which a more attractive face is cut into a frame to visibly outperform a less attractive one.`}</P>

        <TrendsChart />
        <IC func="Figure" caption="Relative global search interest for 'looksmaxxing' on Google, 2023–2026. Peak = 100. Illustrative — reconstructed from the publicly queryable Google Trends series." />

        <P>{`By mid-2024 the major press was tracking the phenomenon. Healthline's health-news team and the BALANCE Eating Disorder Treatment Center in New York both published explainers for parents; Fortune's deep dive that July, by reporter Chloe Berger, profiled the apps at the centre of the economy. Umax, founded by Blake Anderson at age twenty-three and using OpenAI models to grade a user's jawline, cheekbones and "masculinity", was, at the time of the Fortune piece, taking roughly five hundred thousand US dollars a month in subscription revenue — a figure Anderson disclosed to the magazine on the record.`}</P>

        <P>{`The mechanics on TikTok matter, because they explain why a forum subculture with an audience in the tens of thousands can, in under two years, end up speaking the vernacular of tens of millions of teenage boys. The feed is a classifier. It does not distinguish between a softmaxxing tutorial on how to use retinol and a harder-edged video explaining that a weak gonial angle will "cook" a man's dating life; both are coded as male self-improvement, both are clicked, both trigger further recommendations. The GNET researchers, writing for King's College London, characterise this as the quiet mechanism by which extremism migrates: not through explicit radical content, which moderators catch, but through adjacent content whose harm is cumulative rather than individual.`}</P>

        <Callout title="Mainstreaming, in five numbers" kind="info">
          <b>10.8 billion</b> views on <code>#looksmaxxing</code> (TikTok, tracked by TikTokHashtags.com, April 2026).
          &nbsp;·&nbsp; <b>16.3 billion</b> on the parent tag <code>#looksmax</code>.
          &nbsp;·&nbsp; <b>~10 million</b> monthly page views on looksmax.org.
          &nbsp;·&nbsp; <b>22.7%</b> of surveyed looksmax.org users under 18 (December 2022 site poll).
          &nbsp;·&nbsp; <b>$500k</b> monthly subscription revenue reported by the Umax face-rating app (Fortune, July 2024).
        </Callout>

        <BR />

        {/* ═════ SECTION 3 ═════ */}
        <Sec title="3 · Soft and hard: a taxonomy" />

        <P>{`Inside the subculture itself, practitioners distinguish between <em>softmaxxing</em> and <em>hardmaxxing</em>. The taxonomy is not strictly medical but it tracks, roughly, with reversibility. Softmaxxing covers the practices that any dermatologist or personal trainer would endorse in milder form: a skincare routine, a flattering haircut, dental alignment and whitening, posture work, resistance training. On that list, the only entry without clinical grounding is <em>mewing</em>, an oral-posture technique — pressing the full tongue flat against the hard palate, teeth lightly closed, lips sealed — purported to reshape the maxilla and elevate the cheekbones. Mewing was popularised by a British orthodontist, Mike Mew, whose YouTube videos gave the technique its name and its vocabulary.`}</P>

        <P>{`In March 2024, the UK's General Dental Council struck Mike Mew from the dental register. The Professional Conduct Committee, reported by <em>Medscape</em> and <em>Dentistry IQ</em>, concluded that he had posed harm to child patients during orthodontic treatment and had made public claims — including that his techniques could influence the "expansion of the brain" and therefore a child's intelligence — that were "inappropriate and misleading". He had already been expelled from the British Orthodontic Society in 2017. The regulator's finding is not a finding about mewing as a social media practice; pressing one's tongue to the roof of the mouth does not, in itself, cause harm. But it is a finding about the clinical figure from whom the practice draws its authority.`}</P>

        <SoftHardDiagram />
        <IC func="Diagram" caption="The soft/hard/extreme gradient. Reversibility decreases left to right. Evidence base weakens with each step." />

        <P>{`Hardmaxxing is the category of surgical intervention: hair transplantation (where men are now the dominant consumers worldwide), rhinoplasty, genioplasty (chin implants and shaping), orthognathic surgery of the jaw, buccal-fat removal, canthoplasty to surgically alter the "canthal tilt". The International Society of Aesthetic Plastic Surgery (ISAPS), in its 2023 Global Survey, reported an 18 per cent increase in surgical procedures on the face and head among men — a rise that outpaced the overall surgical trend. Rhinoplasty was performed predominantly (65.8 per cent) on patients aged 18–34. In the United Kingdom the picture is more mixed: the British Association of Aesthetic Plastic Surgeons (BAAPS) 2024 audit recorded a 1.5 per cent decline in cosmetic surgeries on men overall, but a 26 per cent rise in male face- and neck-lifts. In both datasets, the demographic driving demand is young.`}</P>

        <P>{`At the far end of the taxonomy sits a cluster of practices that are either extreme-but-real or extreme-and-pseudoscientific. Cosmetic leg-lengthening surgery is the best-documented of the real ones. At the Paley Stature Center in West Palm Beach, Florida — the specialist clinic run by Dr Dror Paley, an internationally recognised figure in limb-reconstruction medicine — a published self-pay price list lists femoral lengthening (up to 8 cm) at $104,500, tibial lengthening (up to 5 cm) at $115,000, and a dual femur-plus-tibia procedure offering up to four inches of height for $196,500. In Turkey, which has become a medical-tourism hub, the same class of procedure is often priced around €28,000. The UK private market, covered by <em>Euronews</em> in September 2025, ranges from roughly £50,000 to £240,000 depending on surgeon.`}</P>

        <CostChart />
        <IC func="Figure" caption="Cost of cosmetic leg-lengthening surgery, thousands of USD. Self-pay prices at the Paley Stature Center (Florida), average Turkish medical-tourism rates, and UK private-clinic ranges. Insurance does not cover any of them." />

        <Callout title="Complications" kind="warn">
          Reviews in the <em>Journal of Orthopaedic Surgery and Research</em> and the systematic review published in
          <em> Journal of Limb Lengthening &amp; Reconstruction</em> (2020) report complication rates of
          <b> 30–45 per cent</b> across 760 patients: infections, delayed bone healing, joint stiffness, nerve damage,
          blood clots, and in rare cases permanent disability. Physiotherapy is 5 days a week for 11 weeks after femur
          surgery (55 visits) and 13 weeks for tibia surgery (65 visits). The global limb-lengthening market is
          projected to rise from roughly $4 bn in 2021 to $8.6 bn by 2030.
        </Callout>

        <P>{`The extreme-and-pseudoscientific category is the one that has most alarmed clinicians. "Bonesmashing" — the practice of repeatedly striking one's own jaw, cheekbones or chin with a hard object to provoke microfractures, on the theory that Wolff's law will cause the bone to remodel thicker and more prominently — briefly became a viral subgenre on TikTok in late 2023. The Fortune reporting by Chloe Berger flagged it as the practice that most worried the clinical psychologists she interviewed. No peer-reviewed evidence exists that bonesmashing produces cosmetic bone remodelling in adults; there is clear evidence, trivially, that repeated blunt-force trauma to the face can fracture bone, damage teeth and injure the temporomandibular joint.`}</P>

        <BR />

        {/* ═════ SECTION 4 ═════ */}
        <Sec title="4 · What the psychology literature says" />

        <P>{`The clinical picture on young male body image has shifted substantially over the last decade, independent of looksmaxxing. Body dysmorphic disorder (BDD) is classified by the DSM-5 — and carried forward in the DSM-5-TR — as an obsessive–compulsive-spectrum condition: a preoccupation with one or more perceived flaws in physical appearance not observable or appearing slight to others, accompanied by repetitive behaviours (mirror-checking, grooming, comparing) or mental acts (comparing one's appearance to that of others). A 2024 systematic review and meta-analysis published in <em>The Australian &amp; New Zealand Journal of Psychiatry</em> put global adult BDD prevalence around 2 per cent, with estimates in specialist samples running substantially higher; adolescent samples show higher still.`}</P>

        <P>{`The DSM-5 explicitly recognises a male-pattern subtype: <em>muscle dysmorphia</em>, a preoccupation with the idea that one's body is insufficiently muscular or lean. Rates of probable muscle dysmorphia have been repeatedly measured since the turn of the millennium, and the estimates vary widely by sample. Kyle Ganson and Jason Nagata, at the University of Toronto and the University of California San Francisco, published the most recent population-scale estimate in the <em>Journal of Eating Disorders</em> in March 2025: among a sample of 1,347 boys and men aged 15–35 across Canada and the United States — recruited through Instagram and Snapchat adverts in March–April 2024 — <b>2.8 per cent (95 per cent CI 2.0–3.7)</b> met criteria for probable muscle dysmorphia. Nagata's team has argued that among gym-going and weightlifting populations the rate runs substantially higher, into the double digits.`}</P>

        <PQ>
          "Muscle dysmorphia may be more prevalent among boys and men in Canada and the United States than previously
          thought."
          <div style={{ fontFamily: F.sans, fontStyle: "normal", fontSize: 14, color: C.muted, marginTop: 12 }}>
            — Ganson et al., <em>Journal of Eating Disorders</em>, March 2025
          </div>
        </PQ>

        <P>{`Eating-disorder clinicians have been charting a parallel shift in caseload composition. The clinical psychologist Melainie Rogers, founder of the BALANCE Eating Disorder Treatment Center in New York and quoted in several of the 2024 features on the trend, has reported that when she began clinical work in 2007 her caseload was "mostly women and girls"; over the last decade the gender composition has moved toward parity. The <em>Healthline</em> reporting in 2024 framed the shift bluntly: in the spaces where looksmaxxing content circulates, the association with body dissatisfaction, with disordered eating, with suicidal ideation, is no longer speculative. A narrative review published by the British Psychological Society's magazine <em>The Psychologist</em> in 2025 — "An algorithmic mirror: The psychological costs of looksmaxxing" — summarised the evidence base: looksmaxxing content correlates with measurable rises in body dissatisfaction and with worsening mental health in young male users, though the causal direction is difficult to isolate from self-selection into the content.`}</P>

        <SB title="The loneliness context">
          {`The clinical findings land on a population already in difficulty. Among U.S. adults, the prevalence of serious
          thoughts of suicide in 2024 was highest among the 18–25 cohort at <b>12.6%</b> — with 33.8% of that age
          group reporting any mental, behavioural or emotional health issue, up from 22.1% in 2016 (SAMHSA, cited by
          the Jed Foundation). Men account for <b>~75–80%</b> of deaths by suicide across the age range. A UK Biobank
          cohort study (Shaw et al., 2020) found that living alone and loneliness associated with roughly a five-fold
          increase in suicide risk, with effects strongest in the 15–34 bracket. Looksmaxxing content does not
          arrive in a neutral psychological environment; it arrives in a male youth cohort that, on almost every
          measurable axis of mental health, is already losing ground.`}
        </SB>

        <BR />

        {/* ═════ SECTION 5 ═════ */}
        <Sec title="5 · The PSL scale and the blackpill" />

        <P>{`The PSL scale is, in its simplest form, a decile. Users post photographs of themselves and ask to be rated 1–10; the scale's vocabulary then converts the number into a category — sub-5, low-tier normie, mid-tier normie, high-tier normie, Chadlite, Chad. The rating is understood to be composed of many sub-variables: canthal tilt (the angle of the outer eye corners), bizygomatic width (the breadth across the cheekbones), gonial angle (the sharpness of the jaw-to-neck transition), midface ratio, chin projection, forehead slope, interpupillary distance, and — outside the face — height, where the folk "manlet wall" sits at 5'8"/172 cm in the default North American board discourse.`}</P>

        <P>{`The pseudoscience here is not that these measurements exist; they do, and facial anthropometry is a real subfield of forensic and maxillofacial medicine. The pseudoscience is in the inferential chain. As Jordan Foster, associate professor of sociology at MacEwan University in Alberta, told <em>The Conversation Weekly</em> in its 2026 podcast episode on the topic, the PSL scale "communicates beauty in the guise of science" — borrowing the grammar of measurement, of deciles and ratios, and using it to enforce a hierarchy whose actual scientific basis is thin. Attraction research in evolutionary psychology does identify statistical correlates of perceived attractiveness (symmetry, averageness, sexual dimorphism) but the effect sizes are small, the cross-cultural stability is partial, and the translation from population-level statistical tendencies to individual fate is exactly the translation that breaks.`}</P>

        <P>{`The blackpill worldview takes that weak inferential chain and presents it as an iron law. Rousis, Gómez and Swann, in their 2023 paper "Behind the Blackpill: Self-verification and identity fusion" (published by the University of Texas at Austin Swann Lab), argue that blackpill adherence functions psychologically less as a belief about the world than as a mechanism of identity fusion — a way of explaining individual pain by attributing it to an unchangeable group-level cause, and thereby cementing membership in the group. The scale, in that reading, is not really a diagnostic instrument. It is a social glue.`}</P>

        <Callout title="Tier-2 composite note" kind="tip">
          No single representative PSL thread or creator is named in the prose above by verified identity, because the
          pseudonymity of the forum makes individual quotation irresponsible. The description of a "typical" PSL
          rating thread is composited from Solea &amp; Sugiura (2025), GNET (2024) and the public looksmax.org
          threads archived on 4plebs and Know Your Meme. Flagged here per Tier 2.
        </Callout>

        <BR />

        {/* ═════ SECTION 6 ═════ */}
        <Sec title="6 · A regulatory gap" />

        <P>{`The question of what, if anything, to do about the subculture lands in an awkward regulatory position. Softmaxxing advice is, for most of its entries, legal and medically benign. The clinical pathways for hardmaxxing — rhinoplasty, orthognathic surgery, hair transplantation — are legitimate and well-governed in high-income jurisdictions, though cross-border medical tourism evades much of that oversight. Mewing, as a self-directed oral-posture practice, falls through the regulatory net almost entirely: the General Dental Council's 2024 ruling against Mike Mew addresses his clinical practice, not the advice offered under his name on social media, where the technique is frequently paired with claims about "facial growth" into adulthood that are not supported by the orthodontic literature.`}</P>

        <P>{`Dr Lisa Sugiura, whose criminology work at the University of Portsmouth on the incelosphere has been cited in UK parliamentary evidence sessions, summarised the regulatory position in a 2024 Portsmouth press release on looksmaxxing: social-media platforms are "encouraging young people towards extreme procedures" while remaining outside the reach of existing safeguarding frameworks; clinics marketing unvetted procedures to minors encounter loose enforcement; app stores have, at the time of writing, not moved to restrict face-rating apps despite their documented psychological impact on adolescent users. The UK Online Safety Act, in force since 2024, has created a framework for age-assurance and child-safety enforcement by Ofcom; whether looksmaxxing content is caught by it in practice remains an open question.`}</P>

        <BR />

        {/* ═════ SECTION 7 ═════ */}
        <Sec title="7 · What it reveals" />

        <P>{`What the looksmaxxing subculture has, in a decade, made visible is how thoroughly the frameworks we once reserved for teenage girls' relationships with their appearance have migrated to teenage boys. The practices are different — jaw exercises rather than calorie restriction, hair transplants rather than contouring makeup, leg-lengthening rather than liposuction — but the structure is familiar: a scale, an algorithmic feed that enforces the scale, a set of apps that monetise the feed, a surgical industry at the extreme end of the funnel, a psychological cost that lands hardest on the young.`}</P>

        <P>{`What is particular to the male version is the inheritance from the incelosphere. The practices were codified on forums whose animating premise was that women's mate choices had engineered an unwinnable game, and that the only rational responses were despair or relentless optimisation. That premise has been softened by the move onto TikTok — the word "incel" appears rarely in the mainstream feed — but the infrastructure of the idea has been preserved. A teenage boy who has spent six months inside the algorithm knows what "mogging" means, knows he is a "sub-5" or a "high-tier normie", and has absorbed, without ever reading a forum post, the claim that his face is a commodity traded on a ruthless market.`}</P>

        <P>{`The commodification of appearance is not new. What the looksmaxxing decade has done is pull male appearance fully into the same attention economy that has been reshaping female appearance since Instagram launched. In that sense the subculture is less an aberration than a completion: the final equalisation of a market that had previously spared young men only through neglect. The closing question, for clinicians and platforms and parents, is what remains of the category of masculinity once its definition has been subcontracted to an anonymous forum in Alabama, a recommendation engine in Shanghai, and a face-rating app in San Francisco. The available evidence does not suggest the answer is flattering. It suggests, instead, that young men have been handed a mirror that cannot be turned off, and told that the only response to what it shows is to keep buying.`}</P>

        <BR />

        {/* ═════ SOURCE INTEGRITY NOTE ═════ */}
        <div
          style={{
            background: C.bgAlt,
            border: `1px solid ${C.rule}`,
            borderRadius: 4,
            padding: "32px 36px",
            margin: "48px 0 24px",
          }}
        >
          <div
            style={{
              fontFamily: F.sans,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: C.ink,
              marginBottom: 12,
              borderBottom: `2px solid ${C.yellow}`,
              paddingBottom: 6,
              display: "inline-block",
            }}
          >
            Source Integrity Note
          </div>

          <p style={{ fontFamily: F.sans, fontSize: 14, lineHeight: 1.7, color: C.ink, margin: "0 0 14px" }}>
            This article was written under a three-tier evidence protocol: Tier 1 verified by web search, Tier 2
            composite scenes flagged, Tier 3 invented material prohibited. The following sources underpin specific
            claims in the prose above.
          </p>

          <ul style={{ fontFamily: F.sans, fontSize: 14, lineHeight: 1.7, color: C.ink, paddingLeft: 22, margin: "0 0 16px" }}>
            <li>
              <b>Solea, A. I., &amp; Sugiura, L.</b> (2025). "Digital Subcultural Diffusion Theory: Rebranding the
              incel ideology through Looksmaxxing, Sub5s and the PSL scale." <em>Crime, Media, Culture</em>
              (SAGE). Source of the PSL-rebrand framing and the 22.7% under-18 figure.
            </li>
            <li>
              <b>Ganson, K. T., et al.</b> (2025). "Prevalence and correlates of muscle dysmorphia in a sample of
              boys and men in Canada and the United States." <em>Journal of Eating Disorders</em>, 17 Mar 2025.
              PMC11916914. Source of the 2.8% (CI 2.0–3.7) prevalence figure.
            </li>
            <li>
              <b>Fortune.</b> (1 Jul 2024). Chloe Berger, "Inside the 'looksmaxxing' economy: Jawbone microfractures,
              expensive hairspray, and millions to be made off male insecurities." Source of the Umax $500k/month
              revenue figure and the bone-smashing reporting.
            </li>
            <li>
              <b>The Conversation / The Conversation Weekly.</b> (2026). "The pseudoscientific attractiveness scale
              that grew out of incel forums and is now making money for looksmaxxing influencers." Source of the
              Jordan Foster (MacEwan University) quote.
            </li>
            <li>
              <b>Paley Stature Center.</b> Published cosmetic leg-lengthening price list (limblengthening.org),
              consulted April 2026. Source of all Paley Institute surgical costs.
            </li>
            <li>
              <b>Euronews.</b> (9 Sep 2025). "Cosmetic leg-lengthening surgery: UK doctor sounds alarm over
              'extremely painful' procedure." Source of the UK private-market price range and the complication
              overview.
            </li>
            <li>
              <b>ISAPS Global Survey 2023.</b> International Society of Aesthetic Plastic Surgery. Source of the 18%
              rise in male face-and-head procedures and the rhinoplasty age distribution.
            </li>
            <li>
              <b>BAAPS Annual Audit 2024.</b> British Association of Aesthetic Plastic Surgeons. Source of the UK
              cosmetic-surgery composition and the 26% rise in male face-/neck-lifts.
            </li>
            <li>
              <b>Medscape / Dentistry IQ.</b> (2024). Reporting on the General Dental Council's decision to strike
              Mike Mew from the UK dental register. Source of the regulatory ruling and the "expansion of the brain"
              claim.
            </li>
            <li>
              <b>GNET (King's College London).</b> (May 2024). "Hiding in Plain Sight: How the 'Newgen'
              Misogynistic Incel Content Creators Escape Moderation on TikTok." Source of the Newgen codeword
              analysis.
            </li>
            <li>
              <b>British Psychological Society.</b> (2025). "An algorithmic mirror: The psychological costs of
              looksmaxxing," <em>The Psychologist</em>. Source of the body-dissatisfaction correlation summary.
            </li>
            <li>
              <b>Rousis, G. J., Gómez, Á., &amp; Swann, W. B. Jr.</b> (2023). "Behind the Blackpill: Self-verification
              and identity fusion." University of Texas at Austin. Source of the blackpill-as-identity-fusion
              interpretation.
            </li>
            <li>
              <b>Wikipedia (Looksmaxxing)</b> and <b>Know Your Meme</b>, consulted as secondary sources for the
              Lookism.net / looksmax.org founding timeline and hashtag view counts; all specific figures
              cross-checked against primary reporting above.
            </li>
            <li>
              <b>Healthline, BALANCE Eating Disorder Treatment Center, University of Portsmouth press office.</b>
              (2024). Reporting on the clinical implications of looksmaxxing content.
            </li>
            <li>
              <b>Jed Foundation / SAMHSA.</b> 2024 US suicide and mental-health prevalence data, cited for the 18–25
              cohort.
            </li>
          </ul>

          <div style={{ fontFamily: F.sans, fontSize: 13, lineHeight: 1.7, color: C.ink, marginTop: 18, paddingTop: 14, borderTop: `1px solid ${C.rule}` }}>
            <b>Tier breakdown.</b> Tier 1 (verified from primary source or peer-reviewed literature): all named
            researchers, clinics, regulators, statistics, direct quotes. Tier 2 (composite): the "typical" PSL
            rating thread in §5, assembled from Solea &amp; Sugiura (2025), GNET (2024) and public thread archives,
            with no individual forum user named. The Google Trends series in Figure 1 is labelled <em>Illustrative</em>
            because the raw Google Trends index is non-stationary between queries and the reproduced monthly series
            is an order-of-magnitude reconstruction, not a direct download. Tier 3 (invented): none.
          </div>
        </div>

        <div style={{ fontFamily: F.sans, fontSize: 12, color: C.muted, textAlign: "center", marginTop: 32 }}>
          — end —
        </div>
      </div>
    </article>
  );
}
