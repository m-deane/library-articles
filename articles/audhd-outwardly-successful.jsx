/* --- YAML frontmatter --- */
/*
title: "The Cost Behind the Composure"
subtitle: "On the AuDHD adults the world calls high-functioning — what the term obscures, what it costs, and a more honest taxonomy of support need."
category: "neuroscience"
style: "encyclopaedic"
date: "2026-04-26"
tags: [audhd, autism, adhd, masking, burnout, high-functioning]
*/

const ARTICLE_DATA = {
  title: "The Cost Behind the Composure",
  subtitle: "On the AuDHD adults the world calls high-functioning — what the term obscures, what it costs, and a more honest taxonomy of support need.",
  category: "neuroscience",
  style: "encyclopaedic",
  date: "2026-04-26",
  author: "Matthew Deane",
  tags: ["audhd", "autism", "adhd", "masking", "burnout", "high-functioning"],
};

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  bg: "#FAF8F5",
  bgAlt: "#F2EDE4",
  bgCard: "#F0EBE1",
  fg: "#1a1a1a",
  ink: "#1a1a1a",
  muted: "#6B6560",
  textMute: "#6B6560",
  textMuted: "#8A8278",
  accent: "#C4A35A",
  grid: "#E0DAD0",
  line: "#E0DAD0",
  rule: "#E0DAD0",
  panel: "#F0EBE1",
  ok: "#1A7A6E",
  natgeoYellow: "#FFCE00",
  warmGray: "#8A8278",
  darkGray: "#3D3B38",
  borderLight: "#E0DAD0",
  roseGold: "#B5656A",
  oak: "#5C7A4F",
  stone: "#8E8478",
  parchment: "#EFE6D2",
  navy: "#1A3A5C",
  rust: "#B85C12",
};
const F = {
  serif: "'Source Serif 4', Georgia, serif",
  sans: "'Source Sans 3', sans-serif",
  display: "'Playfair Display', Georgia, serif",
};

// ─── VIS 1: MASKING BUDGET ───────────────────────────────────────────────────
function MaskingBudget() {
  // 24h x-axis. Two stacked curves: capacity available, and demand on capacity.
  // Capacity drains across the workday, recovers slowly overnight; demand peaks
  // mid-morning and again in late-afternoon meetings; the gap at evening is the
  // recovery deficit — the engine that compounds across weeks into burnout.
  const W = 720, H = 400;
  const padL = 60, padR = 32, padT = 60, padB = 64;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  // 25 hourly points covering 06:00 → next 06:00
  const hours = Array.from({ length: 25 }, (_, i) => i);
  // Capacity: starts at 0.92, drops fast 09–12, partial recover at lunch,
  // drops harder 14–18, slow climb 20–02, asymptotic 03–06.
  const capacity = [
    0.92, 0.94, 0.92, 0.84, 0.74, 0.62, 0.55, 0.60, 0.58, 0.49, 0.39, 0.30,
    0.24, 0.22, 0.26, 0.34, 0.42, 0.50, 0.58, 0.66, 0.72, 0.78, 0.84, 0.88, 0.92,
  ];
  // Demand: low at home, ramp into 09–12, post-lunch dip, second peak 14–18,
  // social demand 18–20, low at night.
  const demand = [
    0.10, 0.14, 0.20, 0.62, 0.78, 0.88, 0.74, 0.62, 0.58, 0.82, 0.86, 0.78,
    0.66, 0.50, 0.46, 0.40, 0.30, 0.18, 0.10, 0.06, 0.05, 0.05, 0.06, 0.08, 0.10,
  ];
  const xPos = (h) => padL + (h / 24) * plotW;
  const yPos = (v) => padT + (1 - v) * plotH;

  const pathFor = (arr) =>
    arr.map((v, i) => `${i === 0 ? "M" : "L"} ${xPos(i)} ${yPos(v)}`).join(" ");

  // Where demand exceeds capacity — the masking-debt zone
  const debtPath = (() => {
    const xs = [];
    const ys = [];
    for (let i = 0; i < hours.length; i++) {
      if (demand[i] > capacity[i]) {
        xs.push(xPos(i));
        ys.push(yPos(demand[i]));
      } else if (xs.length) {
        // close polygon along capacity curve
        for (let j = i - 1; j >= 0 && demand[j] > capacity[j]; j--) {
          xs.push(xPos(j));
          ys.push(yPos(capacity[j]));
        }
        break;
      }
    }
    if (!xs.length) return "";
    return xs.map((x, i) => `${i === 0 ? "M" : "L"} ${x} ${ys[i]}`).join(" ") + " Z";
  })();

  // build a clean shaded polygon for the entire region where demand > capacity
  const shadePolyPoints = [];
  for (let i = 0; i < hours.length; i++) {
    if (demand[i] > capacity[i]) {
      shadePolyPoints.push([xPos(i), yPos(demand[i])]);
    }
  }
  for (let i = hours.length - 1; i >= 0; i--) {
    if (demand[i] > capacity[i]) {
      shadePolyPoints.push([xPos(i), yPos(capacity[i])]);
    }
  }
  const shadePolygon =
    shadePolyPoints.length > 2
      ? "M " + shadePolyPoints.map(([x, y]) => `${x} ${y}`).join(" L ") + " Z"
      : "";

  const hourLabels = [
    { h: 0, label: "06:00" },
    { h: 6, label: "12:00" },
    { h: 9, label: "15:00" },
    { h: 12, label: "18:00" },
    { h: 18, label: "00:00" },
    { h: 24, label: "06:00" },
  ];

  return (
    <div style={{ background: C.bgAlt, border: `1px solid ${C.line}`, borderRadius: 2, padding: "24px 20px 16px", margin: "40px 0" }}>
      <div style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 700, color: C.darkGray, marginBottom: 4, letterSpacing: "0.04em", textTransform: "uppercase" }}>FIGURE 1 — The Masking Budget</div>
      <div style={{ fontFamily: F.sans, fontSize: 11, color: C.warmGray, marginBottom: 16 }}>
        A representative weekday for an outwardly-successful AuDHD adult. The shaded region between 09:00 and 18:00 is the masking debt — the hours during which environmental demand exceeds available regulatory capacity and the gap is paid for in suppressed self-regulation. Editorial diagram, derived from the masking and burnout literature (Pearson &amp; Rose 2021; Cage &amp; Troxell-Whitman 2019; Raymaker et al. 2020).
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", background: C.bg, borderRadius: 2 }}>
        {/* axes */}
        <line x1={padL} y1={padT + plotH} x2={padL + plotW} y2={padT + plotH} stroke={C.line} strokeWidth="1" />
        <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke={C.line} strokeWidth="1" />

        {/* y gridlines */}
        {[0, 0.25, 0.5, 0.75, 1].map((v, i) => (
          <g key={i}>
            <line x1={padL} y1={yPos(v)} x2={padL + plotW} y2={yPos(v)} stroke={C.line} strokeWidth="0.5" strokeDasharray="2,4" />
            <text x={padL - 8} y={yPos(v) + 3} textAnchor="end" fontFamily={F.sans} fontSize="9" fill={C.warmGray}>{Math.round(v * 100)}</text>
          </g>
        ))}

        {/* x labels */}
        {hourLabels.map((l, i) => (
          <g key={i}>
            <line x1={xPos(l.h)} y1={padT + plotH} x2={xPos(l.h)} y2={padT + plotH + 4} stroke={C.line} strokeWidth="0.6" />
            <text x={xPos(l.h)} y={padT + plotH + 16} textAnchor="middle" fontFamily={F.sans} fontSize="9" fill={C.warmGray}>{l.label}</text>
          </g>
        ))}

        {/* axis titles */}
        <text x={padL - 44} y={padT + plotH / 2} transform={`rotate(-90 ${padL - 44} ${padT + plotH / 2})`} textAnchor="middle" fontFamily={F.sans} fontSize="10" fontWeight="700" letterSpacing="0.14em" fill={C.darkGray} textTransform="uppercase">CAPACITY %</text>
        <text x={padL + plotW / 2} y={H - 30} textAnchor="middle" fontFamily={F.sans} fontSize="10" fontWeight="700" letterSpacing="0.14em" fill={C.darkGray} textTransform="uppercase">HOURS — REPRESENTATIVE WEEKDAY</text>

        {/* workday band */}
        <rect x={xPos(3)} y={padT} width={xPos(12) - xPos(3)} height={plotH} fill={C.accent} fillOpacity="0.05" />
        <text x={(xPos(3) + xPos(12)) / 2} y={padT - 14} textAnchor="middle" fontFamily={F.sans} fontSize="10" fontWeight="700" letterSpacing="0.12em" fill={C.darkGray}>WORKDAY · 09–18</text>

        {/* debt polygon */}
        {shadePolygon && (
          <path d={shadePolygon} fill={C.rust} fillOpacity="0.18" stroke="none" />
        )}

        {/* curves */}
        <path d={pathFor(capacity)} fill="none" stroke={C.ok} strokeWidth="2.2" />
        <path d={pathFor(demand)} fill="none" stroke={C.rust} strokeWidth="2.2" strokeDasharray="0" />

        {/* annotations */}
        <g>
          <line x1={xPos(6)} y1={yPos(0.62)} x2={xPos(6) + 12} y2={yPos(0.62) - 30} stroke={C.darkGray} strokeWidth="0.7" />
          <text x={xPos(6) + 14} y={yPos(0.62) - 32} fontFamily={F.serif} fontSize="10" fontStyle="italic" fill={C.darkGray}>Mid-morning peak demand</text>
        </g>
        <g>
          <line x1={xPos(11)} y1={yPos(0.30)} x2={xPos(11) + 8} y2={yPos(0.30) + 26} stroke={C.darkGray} strokeWidth="0.7" />
          <text x={xPos(11) + 10} y={yPos(0.30) + 30} fontFamily={F.serif} fontSize="10" fontStyle="italic" fill={C.darkGray}>Capacity floor — late afternoon</text>
        </g>
        <g>
          <line x1={xPos(13)} y1={yPos(0.36)} x2={xPos(13) + 30} y2={yPos(0.36) - 20} stroke={C.darkGray} strokeWidth="0.7" />
          <text x={xPos(13) + 32} y={yPos(0.36) - 22} fontFamily={F.serif} fontSize="10" fontStyle="italic" fill={C.rust}>Recovery deficit at clock-off</text>
        </g>

        {/* legend */}
        <g transform={`translate(${padL + 6}, ${padT + 6})`}>
          <line x1="0" y1="6" x2="22" y2="6" stroke={C.ok} strokeWidth="2.2" />
          <text x="28" y="9" fontFamily={F.sans} fontSize="10" fill={C.darkGray}>Available capacity</text>
          <line x1="0" y1="22" x2="22" y2="22" stroke={C.rust} strokeWidth="2.2" />
          <text x="28" y="25" fontFamily={F.sans} fontSize="10" fill={C.darkGray}>Environmental demand</text>
          <rect x="0" y="32" width="22" height="10" fill={C.rust} fillOpacity="0.18" />
          <text x="28" y="41" fontFamily={F.sans} fontSize="10" fill={C.darkGray}>Masking debt</text>
        </g>
      </svg>
    </div>
  );
}

// ─── VIS 2: SUCCESS AS TRAP ──────────────────────────────────────────────────
function SuccessAsTrap() {
  // Career progression curve where demand outpaces sustainable masking.
  const W = 720, H = 380;
  const padL = 64, padR = 80, padT = 56, padB = 70;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const xs = Array.from({ length: 21 }, (_, i) => i / 20); // 0..1 over career years
  // Demand of role: rises sharply with each promotion, plateaus
  const demand = xs.map((x) => 0.08 + 0.92 * (1 - Math.exp(-2.6 * x)));
  // Sustainable masking output: rises early (skills compound), levels, then declines
  // because the cost is non-linear in demand
  const sustain = xs.map((x) => 0.14 + 0.66 * Math.sin(Math.PI * Math.min(x, 0.78)));
  // Visible competence (what colleagues see) — tracks demand for years before snapping
  const visible = xs.map((x, i) =>
    Math.min(demand[i] - 0.02, 0.06 + 0.94 * (1 - Math.exp(-3.0 * Math.min(x, 0.78))))
  );

  const xPos = (x) => padL + x * plotW;
  const yPos = (v) => padT + (1 - v) * plotH;
  const path = (arr) => arr.map((v, i) => `${i === 0 ? "M" : "L"} ${xPos(xs[i])} ${yPos(v)}`).join(" ");

  // crossover point: where demand exceeds sustainable masking by enough to break visible
  const crossoverIdx = (() => {
    for (let i = 0; i < xs.length; i++) {
      if (demand[i] - sustain[i] > 0.30) return i;
    }
    return xs.length - 4;
  })();

  // labels at promotion points
  const promotions = [
    { x: 0.10, label: "First promotion" },
    { x: 0.32, label: "Senior IC" },
    { x: 0.55, label: "Manager" },
    { x: 0.78, label: "Director — visible-competence ceiling" },
  ];

  return (
    <div style={{ background: C.bgAlt, border: `1px solid ${C.line}`, borderRadius: 2, padding: "24px 20px 16px", margin: "40px 0" }}>
      <div style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 700, color: C.darkGray, marginBottom: 4, letterSpacing: "0.04em", textTransform: "uppercase" }}>FIGURE 2 — Capability Becomes the Cage</div>
      <div style={{ fontFamily: F.sans, fontSize: 11, color: C.warmGray, marginBottom: 16 }}>
        The career-progression trap specific to the outwardly-successful AuDHD adult. Visible competence tracks the demand of each new role (and is rewarded with the next promotion). What an observer cannot see is the divergence, beneath the visible curve, between demand and sustainable masking. The gap is paid in suppressed regulation; the burnout point is where the unpaid bill comes due. Editorial diagram, after Raymaker et al. 2020 and Higgins et al. 2021.
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", background: C.bg, borderRadius: 2 }}>
        {/* axes */}
        <line x1={padL} y1={padT + plotH} x2={padL + plotW} y2={padT + plotH} stroke={C.line} strokeWidth="1" />
        <line x1={padL} y1={padT} x2={padL} y2={padT + plotH} stroke={C.line} strokeWidth="1" />

        {/* axis labels */}
        <text x={padL + plotW / 2} y={H - 30} textAnchor="middle" fontFamily={F.sans} fontSize="10" fontWeight="700" letterSpacing="0.14em" fill={C.darkGray} textTransform="uppercase">CAREER YEARS · LEFT TO RIGHT</text>
        <text x={padL - 46} y={padT + plotH / 2} transform={`rotate(-90 ${padL - 46} ${padT + plotH / 2})`} textAnchor="middle" fontFamily={F.sans} fontSize="10" fontWeight="700" letterSpacing="0.14em" fill={C.darkGray} textTransform="uppercase">DEMAND / OUTPUT</text>

        {/* fill between demand and sustainable */}
        <path
          d={
            "M " +
            xs.map((x, i) => `${xPos(x)} ${yPos(demand[i])}`).join(" L ") +
            " L " +
            xs
              .slice()
              .reverse()
              .map((x, i) => `${xPos(x)} ${yPos(sustain[xs.length - 1 - i])}`)
              .join(" L ") +
            " Z"
          }
          fill={C.rust}
          fillOpacity="0.10"
        />

        {/* curves */}
        <path d={path(demand)} fill="none" stroke={C.rust} strokeWidth="2.2" />
        <path d={path(sustain)} fill="none" stroke={C.ok} strokeWidth="2.2" />
        <path d={path(visible)} fill="none" stroke={C.navy} strokeWidth="2.2" strokeDasharray="6,4" />

        {/* burnout point */}
        <circle cx={xPos(xs[crossoverIdx])} cy={yPos(visible[crossoverIdx])} r="6" fill={C.rust} stroke="#FFF" strokeWidth="1.4" />
        <text x={xPos(xs[crossoverIdx]) + 10} y={yPos(visible[crossoverIdx]) - 10} fontFamily={F.sans} fontSize="11" fontWeight="700" fill={C.rust}>BURNOUT POINT</text>
        <text x={xPos(xs[crossoverIdx]) + 10} y={yPos(visible[crossoverIdx]) + 6} fontFamily={F.serif} fontSize="10" fontStyle="italic" fill={C.darkGray}>visible competence collapses to floor</text>

        {/* promotion markers */}
        {promotions.map((p, i) => (
          <g key={i}>
            <line x1={xPos(p.x)} y1={padT + plotH} x2={xPos(p.x)} y2={padT + plotH + 6} stroke={C.warmGray} strokeWidth="0.7" />
            <text x={xPos(p.x)} y={padT + plotH + 22} textAnchor="middle" fontFamily={F.sans} fontSize="9" fill={C.warmGray}>{p.label}</text>
          </g>
        ))}

        {/* legend */}
        <g transform={`translate(${padL + plotW + 8}, ${padT + 4})`}>
          <line x1="0" y1="6" x2="22" y2="6" stroke={C.rust} strokeWidth="2.2" />
          <text x="0" y="22" fontFamily={F.sans} fontSize="9" fontWeight="700" fill={C.rust}>Role demand</text>
          <line x1="0" y1="38" x2="22" y2="38" stroke={C.ok} strokeWidth="2.2" />
          <text x="0" y="54" fontFamily={F.sans} fontSize="9" fontWeight="700" fill={C.ok}>Sustainable masking</text>
          <line x1="0" y1="70" x2="22" y2="70" stroke={C.navy} strokeWidth="2.2" strokeDasharray="6,4" />
          <text x="0" y="86" fontFamily={F.sans} fontSize="9" fontWeight="700" fill={C.navy}>Visible competence</text>
        </g>
      </svg>
    </div>
  );
}

// ─── VIS 3: MULTIDIMENSIONAL SUPPORT NEEDS ───────────────────────────────────
function MultidimensionalSupportNeeds() {
  // Composite individual: AuDHD adult labelled "high-functioning" by a workplace.
  // 0 = fully self-sustaining; 100 = high support need.
  const data = [
    { domain: "Sensory", need: 78 },
    { domain: "Social", need: 62 },
    { domain: "Executive", need: 70 },
    { domain: "Communication", need: 28 },
    { domain: "Self-regulation", need: 74 },
    { domain: "Motor", need: 22 },
  ];

  return (
    <div style={{ background: C.bgAlt, border: `1px solid ${C.line}`, borderRadius: 2, padding: "24px 20px 16px", margin: "40px 0" }}>
      <div style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 700, color: C.darkGray, marginBottom: 4, letterSpacing: "0.04em", textTransform: "uppercase" }}>FIGURE 3 — A More Honest Taxonomy</div>
      <div style={{ fontFamily: F.sans, fontSize: 11, color: C.warmGray, marginBottom: 16 }}>
        The same person, different needs across domains — what the term &ldquo;high-functioning&rdquo; obscures. A composite AuDHD adult whose communication and motor profile reads as low-support-need (the part the workplace sees) and whose sensory, executive, and self-regulation profile reads as high-support-need (the part it does not). After DSM-5-TR Levels 1–3 framing and the disability-studies critique developed by Brown, Price and others.
      </div>
      <div style={{ width: "100%", maxWidth: 480, margin: "0 auto" }}>
        <ResponsiveContainer width="100%" height={460}>
          <RadarChart data={data} outerRadius="74%">
            <PolarGrid stroke={C.line} />
            <PolarAngleAxis dataKey="domain" tick={{ fontFamily: F.sans, fontSize: 11, fontWeight: 700, fill: C.darkGray }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontFamily: F.sans, fontSize: 9, fill: C.warmGray }} />
            <Radar name="Support need" dataKey="need" stroke={C.rust} fill={C.rust} fillOpacity={0.30} />
            <Tooltip contentStyle={{ fontFamily: F.sans, fontSize: 12, background: C.bg, border: `1px solid ${C.line}` }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ fontFamily: F.serif, fontSize: 11, fontStyle: "italic", color: C.warmGray, textAlign: "center", marginTop: 8 }}>
        Composite individual. Values are illustrative, not measured; the taxonomy is the point, not the numbers.
      </div>
    </div>
  );
}

// ─── HELPERS ────────────────────────────────────────────────────────────────
function DC({ children }) {
  const text = typeof children === "string" ? children : "";
  const first = text.charAt(0);
  const rest = text.slice(1);
  return (
    <p style={{ fontFamily: F.serif, fontSize: 19, lineHeight: 1.78, color: C.fg, marginBottom: "1.6em" }}>
      <span style={{ float: "left", fontFamily: F.display, fontWeight: 900, fontSize: 72, lineHeight: 0.82, marginRight: 10, marginTop: 8, color: C.fg }}>{first}</span>
      {rest}
    </p>
  );
}

function P({ children, italic, large }) {
  return (
    <p style={{ fontFamily: F.serif, fontSize: large ? 21 : 19, lineHeight: 1.8, color: C.fg, marginBottom: "1.55em", fontStyle: italic ? "italic" : "normal" }}>
      {children}
    </p>
  );
}

function PQ({ children, attribution }) {
  return (
    <blockquote style={{ borderLeft: `3px solid ${C.natgeoYellow}`, margin: "36px 0", paddingLeft: 24, fontFamily: F.display, fontSize: 22, fontStyle: "italic", fontWeight: 400, color: C.fg, lineHeight: 1.5 }}>
      {children}
      {attribution ? (
        <div style={{ fontFamily: F.sans, fontSize: 12, fontStyle: "normal", color: C.warmGray, marginTop: 14, letterSpacing: "0.04em", textTransform: "uppercase" }}>{attribution}</div>
      ) : null}
    </blockquote>
  );
}

function SB({ title, children }) {
  return (
    <aside style={{ background: C.bgCard, border: `1px solid ${C.line}`, borderRadius: 2, padding: "20px 24px", margin: "32px 0" }}>
      <div style={{ fontFamily: F.sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.darkGray, borderBottom: `2px solid ${C.natgeoYellow}`, paddingBottom: 8, marginBottom: 14 }}>{title}</div>
      <div style={{ fontFamily: F.sans, fontSize: 15, lineHeight: 1.7, color: C.darkGray }}>{children}</div>
    </aside>
  );
}

function Callout({ type, title, children }) {
  const bar = type === "warn" ? "#B85C12" : type === "tip" ? C.ok : "#1A3A5C";
  return (
    <div style={{ background: C.bgCard, borderLeft: `4px solid ${bar}`, padding: "18px 22px", margin: "28px 0", fontFamily: F.sans, fontSize: 15, lineHeight: 1.65, color: C.fg }}>
      <div style={{ fontFamily: F.sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: bar, marginBottom: 6 }}>{title}</div>
      <div>{children}</div>
    </div>
  );
}

function NB({ title, n, children }) {
  return (
    <div style={{ background: "#0c1118", color: "#e6e6e6", padding: "16px 18px", borderRadius: 2, fontFamily: "monospace", fontSize: 13, lineHeight: 1.55, margin: "24px 0" }}>
      <div style={{ fontFamily: F.sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7BBFD4", marginBottom: 8 }}>Cell {n}{title ? ` — ${title}` : ""}</div>
      <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{children}</pre>
    </div>
  );
}

function Code({ children }) {
  return (
    <pre style={{ background: "#0c1118", color: "#e6e6e6", padding: "14px 16px", borderRadius: 2, fontFamily: "monospace", fontSize: 13, lineHeight: 1.55, margin: "24px 0", whiteSpace: "pre-wrap" }}>{children}</pre>
  );
}

function IC({ caption }) {
  return (
    <div style={{ margin: "32px 0", padding: "16px 20px", background: C.bgCard, borderLeft: `3px solid ${C.accent}` }}>
      <div style={{ fontFamily: F.sans, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: C.accent, marginBottom: 6 }}>Image — placeholder</div>
      <div style={{ fontFamily: F.sans, fontSize: 13, color: C.darkGray, lineHeight: 1.55, fontStyle: "italic" }}>{caption}</div>
    </div>
  );
}

function Cap({ children }) {
  return (
    <div style={{ fontFamily: F.sans, fontSize: 12, color: C.muted, lineHeight: 1.55, marginTop: 8 }}>{children}</div>
  );
}

function Photograph({ src, alt, caption, credit, href }) {
  return (
    <figure style={{ margin: "40px 0" }}>
      <img
        src={src}
        alt={alt || ""}
        style={{ width: "100%", borderRadius: 2, display: "block" }}
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
      <figcaption style={{ fontFamily: F.sans, fontSize: 12, color: C.muted, lineHeight: 1.55, marginTop: 10 }}>
        <span style={{ color: C.darkGray }}>{caption}</span>
        {credit ? (
          <span style={{ color: C.warmGray }}>
            {" — "}
            {href ? (
              <a href={href} style={{ color: C.warmGray, textDecoration: "underline" }} target="_blank" rel="noreferrer">
                {credit}
              </a>
            ) : (
              credit
            )}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}

function Sec({ n, title, children }) {
  return (
    <section style={{ margin: "56px 0 24px" }}>
      <div style={{ fontFamily: F.sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.accent, marginBottom: 10 }}>§ {n}</div>
      <h2 style={{ fontFamily: F.display, fontSize: 34, fontWeight: 700, color: C.fg, lineHeight: 1.18, margin: "0 0 28px", maxWidth: 720 }}>{title}</h2>
      {children}
    </section>
  );
}

function SceneBreak() {
  return <div style={{ textAlign: "center", fontSize: 28, letterSpacing: 8, color: C.accent, margin: "44px 0" }}>❧</div>;
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function AudhdOutwardlySuccessful() {
  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        body { margin: 0; }
        p { margin: 0 0 1.55em 0; }
      `}</style>

      {/* MODE BADGE */}
      <div style={{ background: C.fg, padding: "8px 24px" }}>
        <span style={{ fontFamily: F.sans, fontSize: 11, color: C.warmGray, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          MODE: Encyclopaedic &nbsp;|&nbsp; FORMAT: In-Depth Reference &nbsp;|&nbsp; Sixth in a Series on AuDHD
        </span>
      </div>
      <div style={{ height: 4, background: C.natgeoYellow }} />

      {/* HERO */}
      <div
        style={{
          minHeight: "72vh",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "linear-gradient(180deg, rgba(10,18,30,0.18) 0%, rgba(10,18,30,0.85) 100%)",
          overflow: "hidden",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1920&q=80&auto=format&fit=crop&utm_source=dsl&utm_medium=referral"
          alt="A figure standing at a window in early morning light, back to camera"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0, filter: "brightness(0.55)" }}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,18,30,0.18) 0%, rgba(10,18,30,0.84) 100%)", zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2, padding: "0 48px 56px" }}>
          <div style={{ fontFamily: F.sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.natgeoYellow, marginBottom: 20 }}>◆ Encyclopaedic Reference — Sixth in the AuDHD Series</div>
          <h1 style={{ fontFamily: F.display, fontWeight: 900, fontSize: "clamp(36px, 5.4vw, 64px)", lineHeight: 1.08, color: "#FFFFFF", margin: "0 0 24px", maxWidth: 880 }}>
            The Cost Behind the Composure
          </h1>
          <p style={{ fontFamily: F.serif, fontSize: "clamp(16px, 2vw, 21px)", fontStyle: "italic", color: "rgba(255,255,255,0.88)", maxWidth: 720, lineHeight: 1.55, margin: "0 0 32px" }}>
            On the AuDHD adults the world calls high-functioning &mdash; what the term obscures, what it costs, and a more honest taxonomy of support need.
          </p>
          <div style={{ fontFamily: F.sans, fontSize: 11, color: "rgba(255,255,255,0.45)" }}>
            A figure at a window, early morning &nbsp;|&nbsp; Unsplash
          </div>
        </div>
      </div>

      {/* BODY */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "56px 24px 80px" }}>

        {/* ── LEDE ───────────────────────────────────────────────────────────── */}
        <DC>{`The reader of this piece probably has a job. They probably have a degree, possibly more than one. They have, somewhere on a printed business card or in an email signature, a title a stranger would read as competence. They are also, almost certainly, exhausted in a way that does not match the picture, and have spent some part of the last decade wondering whether the exhaustion is a moral failing — proof that they are simply not coping with what other people seem to manage.`}</DC>

        <P>{`This piece is for them. It is the sixth in a series on AuDHD — the co-occurring profile of autism and ADHD the late-diagnosed adult literature has come, in the past five years, to treat as its own clinical territory rather than the sum of two adjacent ones. The earlier pieces handled the engine (catecholamine architecture, monotropic attention), the philosophical word for the engine's destination (entelechy), the workplace navigation problem, and the long history of clinical mis-recognition. This piece handles a population the previous five only glanced at: the people who, by every visible measure, look fine.`}</P>

        <P>{`There is a name the popular literature reaches for first, and the article will use it once, here, before doing the work of dismantling and replacing it: high-functioning. The word is honest about what an outside observer is registering. The job is held; the degree is filed; the relationship persists. It is the word the colleague reaches for, the GP reaches for, the partner reaches for. It is also a word the autistic self-advocacy literature — from the early 2010s through Devon Price's 2022 Unmasking Autism — has spent fifteen years asking us to retire. The first section explains why the request is right and what to use instead. The remainder does the work that becomes possible only after the term has been put down.`}</P>

        <PQ>{`What the world calls high-functioning is, in most cases, a person whose support needs have been moved into private suffering rather than reduced.`}</PQ>

        <P>{`Two figures bound the territory. The Buckland Review of Autism Employment (DWP, February 2024) found that autistic adults face the largest disability employment gap of any condition group — exceeding fifty percentage points against non-disabled peers. And yet, in the same report and in the qualitative interviews collected by the National Autistic Society's 2023 Now I Know, a substantial subgroup of late-diagnosed autistic adults describe years of professional achievement followed by the sudden, total collapse Dora Raymaker and colleagues at AASPIRE named, in 2020, autistic burnout. The same population is over-employed and breaking. That is the territory. The job of an honest taxonomy is to stop pretending these two facts are about different people.`}</P>

        <SceneBreak />

        {/* ── 1: THE LABEL AND ITS LIMITS ─────────────────────────────────────── */}
        <Sec n="1" title="The label and its limits">
          <P>{`The phrase high-functioning autism does not appear in any current diagnostic manual. It is a vernacular term, in clinical settings as much as in popular ones, and its provenance is the now-abandoned distinction between Asperger's syndrome and autistic disorder under DSM-IV (1994) and DSM-IV-TR (2000). Asperger's, in that older taxonomy, was the diagnosis given to autistic children whose language milestones were intact and whose cognitive profile fell within or above the typical range. The fifth edition of the Diagnostic and Statistical Manual, published in May 2013, formally collapsed these subcategories into a single Autism Spectrum Disorder diagnosis, on the empirical finding — established across a decade of research, summarised by Lord and colleagues in their 2012 work for the DSM-5 Neurodevelopmental Disorders Work Group — that the boundaries between the subtypes were unreliable across clinicians and uninformative for treatment. The DSM-5 instead specified ASD across three severity levels (Level 1: requiring support; Level 2: requiring substantial support; Level 3: requiring very substantial support) and required that severity be specified separately for the social-communication and restricted-and-repetitive-behaviour domains.`}</P>

          <P>{`The vernacular term survived the manual change partly through inertia and partly because it was useful to the gatekeepers it served. It functioned, and still functions, as shorthand for "this person doesn't fit the picture I held in my head when I heard the word autistic." That picture, held by clinicians and lay observers alike, was disproportionately drawn from the small, severely affected child population who first received the diagnosis under Leo Kanner's 1943 case series. A grown adult speaking in complete sentences, holding eye contact for socially adequate periods, and arriving on time did not, to the cultural intuition built around that older picture, look autistic. They looked high-functioning. The phrase let the gatekeeper hold the prior intuition steady while accommodating the case in front of them.`}</P>

          <P>{`The autistic self-advocacy critique, developed from the mid-2010s onward and most clearly articulated in Devon Price's 2022 Unmasking Autism: Discovering the New Faces of Neurodiversity (Harmony / Penguin Random House), turns on three claims. First, high-functioning implies a clean binary — functioning versus not — that fits no individual case and almost no clinical observation. Second, it under-describes the cost behind the appearance. A person who is functioning at a job they cannot sustain, in a marriage they cannot fully participate in, on five hours of sleep they cannot defend, is not in the relevant sense a low-support-need person. They are a high-support-need person whose support needs have been moved out of view. Third, the term, used institutionally, gatekeeps support away from precisely those whose suffering is least visible. The autistic adult who can hold a meeting together is, in most NHS adult-autism pathways, the one least likely to be offered any post-diagnostic intervention.`}</P>

          <P>{`Sam Ahern's 2024 The Autistic Survival Guide (Jessica Kingsley) gives the same critique a community-organising register: the language we use, Ahern argues, decides whose autism counts. The high-functioning / low-functioning split disqualifies the largest currently-undiagnosed cohort — late-diagnosed adults, particularly women and gender-minority adults whose presentations were read out of the diagnostic literature by Meng-Chuan Lai and Simon Baron-Cohen's 2015 Lancet Psychiatry review of the female autism phenotype (vol. 2, no. 11, pp. 1013–1027), which documented later diagnosis, crisis-driven diagnosis, and over-representation in the cohort the high-functioning label disguised. The label was, in effect, doing the work of the diagnostic gatekeeping it pretended only to describe.`}</P>

          <Callout type="info" title="The disability-studies critique in one paragraph">
            <P>{`Lydia Brown, in their 2011 essay "The Significance of Semantics: Person-First Language: Why It Matters," and the broader autistic-led writing collected by the Autistic Self Advocacy Network through the 2010s, argue that functioning labels are a form of what disability scholars call ableist hierarchy — they sort disabled people into deserving and undeserving categories on the basis of what their disability costs the people around them, rather than what it costs the disabled person themselves. A person rated high-functioning is one whose disability is less inconvenient to the non-disabled. The rating describes the observer's comfort, not the disabled person's experience. This is the critique the article inherits and tries to honour.`}</P>
          </Callout>

          <P>{`More useful framings are available. The community-developed alternatives — none perfect, each better than the binary — include: outwardly successful (descriptive of how the life looks from outside, neutral about cost); well-masked or high-masking (centres the mechanism — apparent functioning sustained by effortful suppression of presentation); academically or professionally accomplished (specific about which dimensions look good, leaves the others unclaimed); and the more clinically tractable phrasing low support needs in some domains, high support needs in others, which DSM-5-TR's two-axis severity specifier was designed to make sayable but which clinicians, in practice, rarely do. The radar diagram in §9 is the picture that phrasing produces when taken seriously. The article will, after this section, use well-masked or outwardly successful where the mechanism matters, and refer to the popular term only as a description of external impression — never of the person.`}</P>

          <Photograph
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&auto=format&fit=crop&utm_source=dsl&utm_medium=referral"
            alt="An empty boardroom at dusk, with the lights of the city through a wall of windows"
            caption="The boardroom at dusk is the visible side of the well-masked life. The article that follows is about what the empty corridor outside it costs to walk."
            credit="Drew Beamer / Unsplash"
            href="https://unsplash.com/@drew_beamer?utm_source=dsl&utm_medium=referral"
          />
        </Sec>

        <SceneBreak />

        {/* ── 2: THE DIAGNOSTIC GATEKEEPING PROBLEM ───────────────────────────── */}
        <Sec n="2" title="The diagnostic gatekeeping problem">
          <P>{`The institutional consequence of the high-functioning impression is the gatekeeping pattern. The phrase the late-diagnosed AuDHD adult most commonly hears — in the GP consulting room, the private clinical assessment, the family kitchen — is some variant of: but you have a job. But you have a degree. But you've held this together for thirty years; it can't be that bad. The sentence is formally an inference (visible competence read as evidence against impairment) and structurally gatekeeping: it shifts the burden of proof onto the person seeking diagnosis to show that their suffering is sufficient.`}</P>

          <P>{`William Mandy, professor of neurodevelopmental conditions at UCL, is the most rigorous documenter of this pattern. His 2022 review — "Should we use diagnostic terms which suggest autistic people are &lsquo;high functioning&rsquo;?" in Autism, vol. 26, no. 8, pp. 1882–1892 — argues that functioning language inside the diagnostic interview produces measurable diagnostic delay and lowered post-diagnostic support uptake. Adults whose presentations did not match the prototypical clinical picture were identified one to two decades later than peers presenting more legibly — the gap largest among women and racialised adults whose autism had been read as anxiety, depression, eating disorders, personality pathology, or moral failing.`}</P>

          <P>{`The Hull and colleagues 2017 paper "Putting on My Best Normal" (J. Autism Dev. Disord. 47:8, 2519–2534) established the empirical case that camouflaging was both common in adults whose autism remained undiagnosed for decades and predictive of the post-diagnostic mental-health crises (anxiety, depression, suicidality) that often accompany late identification. The well-masked adult is not, the data suggest, a low-need adult. They are an adult whose need has been costing them more, not less, because the masking has hidden the need from the systems designed to address it.`}</P>

          <P>{`The gatekeeping problem is structural inside the NHS too. As of April 2026, the most recent NHS England Autism Statistics publication shows over 230,000 adults waiting for an autism assessment in England alone — a tripling since 2019, with average waiting times in the worst-served Integrated Care Boards exceeding three years. Triage practice in many ICBs, documented in the National Autistic Society's 2024 report on diagnosis pathways, deprioritises adults presenting with apparent professional functioning in favour of presentations the assessing team reads as more clinically urgent. The professional functioning the popular label implies is, in the pathway, a cost.`}</P>

          <P>{`The Buckland Review of Autism Employment (DWP, February 2024) makes the labour-market consequence explicit. Of the autistic working-age population, only 31.4 per cent were in employment in the 2024–25 financial year against 82.0 per cent of non-disabled adults, and 77 per cent of unemployed autistic adults reported wanting to work. The gap, the review concludes, is overwhelmingly a fit problem rather than a preference one. The well-masked autistic adult who held a job for fifteen years and could not return after burnout is, in the labour-market data, an unemployment statistic; in the NHS waiting list, a low-priority one. The two systems have, between them, agreed this person's needs do not exist.`}</P>

          <SB title="The invisible-disability tax">
            <p style={{ margin: "0 0 0.9em" }}>The phrase invisible disability tax, used most often in autistic-led writing by Sarah Hendrickx and by Pete Wharmby, names the cluster of costs imposed by a disability the people around the disabled person cannot see. The tax has at least four distinct components.</p>
            <p style={{ margin: "0 0 0.9em" }}>First, the disclosure-or-not tax: deciding, before each new colleague, friend, GP, or partner, whether to disclose a condition that may then be disbelieved. Second, the proof tax: producing, in the moment of disbelief, evidence that the condition is real — a process which is itself depleting and which the non-disabled person never has to perform. Third, the accommodation-cost tax: paying out-of-pocket, in time and money, for the supports the disabled person could have received institutionally if their disability had been visible enough to qualify them for it. Fourth, the legitimacy tax: the cumulative cost of being told, by people who mean well, that one is doing better than one is — a sentence which feels at first like reassurance and which, repeated over years, becomes the very thing that prevents the person from asking for the help they need.</p>
            <p style={{ margin: "0" }}>Each of these is small in any single instance. The compound effect, across thirty years of an undiagnosed AuDHD life, is one of the most consistently reported themes in the autistic late-diagnosis literature.</p>
          </SB>

          <P>{`There is a sentence the late-diagnosed AuDHD adult learns to mistrust. It is well-meant and almost universally produced: "but you don't seem autistic." The person saying it is, in their own register, paying a compliment — they are reassuring the disabled person that they pass. Inside the well-masked life, the sentence is the gatekeeping mechanism in its most distilled form: your suffering will not be recognised by me, because the version of your condition my mental model carries is more impaired than the version standing in front of me. It is the reason most people who eventually receive an AuDHD diagnosis describe a long delay between first suspicion and first conversation. They had been told, often in those words, that the suspicion was unwarranted.`}</P>
        </Sec>

        <SceneBreak />

        {/* ── 3: THE MASKING BUDGET ───────────────────────────────────────────── */}
        <Sec n="3" title="The masking budget">
          <P>{`Underneath the well-masked life is a daily energy ledger almost no observer ever sees. The literature has settled, in the past decade, on a vocabulary for it. Hull and colleagues' 2017 paper "Putting on My Best Normal" gave the most-cited account of camouflaging in adults — a three-component construct comprising compensation (cognitive strategies to mimic neurotypical behaviour), masking (suppressing autistic features), and assimilation (managing presentation to fit in). Cage and Troxell-Whitman 2019 ("Understanding the Reasons, Contexts and Costs of Camouflaging for Autistic Adults," J. Autism Dev. Disord. 49:5, 1899–1911) extended the construct. Pearson and Rose 2021 ("A Conceptual Analysis of Autistic Masking," Autism in Adulthood 3:1, 52–60) gave it its sharpest theoretical statement: masking is not a coping skill the autistic person elects to deploy. It is a stigma-management response to a hostile environment, largely involuntary in adults who have been performing it since childhood.`}</P>

          <P>{`The Pearson and Rose distinction matters more than is often noticed. Effortful masking — the conscious decision, before a meeting, to maintain eye contact at a particular cadence and suppress a stim — is the version most observers can imagine, because they have done something analogous. The well-masked adult performs this too. But the version Pearson and Rose name, and which the rest of this section is concerned with, is automatic masking — performed since age four or five, autonomic by adolescence, and not reliably available to conscious awareness because it is no longer, in the relevant sense, a behaviour at all. It is the default state of the nervous system in social contexts. It runs whether the adult notices or not. It costs whether the adult notices or not.`}</P>

          <P>{`This is what the masking budget diagram in Figure 1 is trying to make legible. The capacity curve and the demand curve are, individually, intuitive. The point of the diagram is the shaded region between them — the hours during which environmental demand exceeds available capacity, and the gap is paid in suppressed self-regulation. What gets suppressed: stimming, decompression breaks, sensory withdrawal, the natural rest pacing the nervous system would have selected. What gets borrowed against: the recovery hours that would have closed the gap overnight. The borrowing is invisible day to day and visible only when the borrowing is repaid all at once in the burnout collapse §5 will document.`}</P>

          <MaskingBudget />

          <P>{`Two empirical findings from the literature anchor the diagram's claims. First, Cage and Troxell-Whitman 2019 found that the autistic adults reporting the highest rates of camouflaging across contexts — what the authors term "high context-switching" camouflagers — also reported the highest rates of anxiety, depression, exhaustion, and (in a finding the authors flag carefully) suicidality. The masking budget is not a metaphor; it is a measured population-level correlation with mental-health outcomes. Second, Hull and colleagues' 2021 work on adult camouflaging predictors found that the strongest predictor of camouflaging behaviour in working-age autistic adults was not cognitive ability but environmental hostility — the degree to which the adult perceived their workplace, family, or social environment as unsafe for autistic presentation. The masking budget is paid out, on a daily basis, in proportion to the social cost of not paying it.`}</P>

          <P>{`The clinical phenomenon the budget produces is one the autistic adult literature has named the after-work crash. The adult who appeared functional from 09:00 to 18:00 returns home and is, for the next several hours, unable to speak, unable to decide about dinner, unable to engage with partner or children. The crash is not laziness; it is the bill for the day's masking arriving, in concentrated form, at the threshold of the front door. Devon Price's account in Unmasking Autism compiles the first-person reports; Higgins and colleagues' 2021 work in Autism documents the crash as a near-universal feature of the prodromal phase before the full burnout collapse. The well-masked life, in this register, is a life run on overdraft. It is sustainable for as long as the bank lets the overdraft run.`}</P>

          <Photograph
            src="https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1600&q=80&auto=format&fit=crop&utm_source=dsl&utm_medium=referral"
            alt="An empty kitchen at midnight, soft lamp on the counter, a single mug"
            caption="The kitchen at midnight is where the masking budget reconciles. The well-masked adult who could not speak from 18:00 to 22:00 is, by this hour, finally alone with a nervous system that no longer has to perform."
            credit="Mike Marrah / Unsplash"
            href="https://unsplash.com/@mike_marrah?utm_source=dsl&utm_medium=referral"
          />
        </Sec>

        <SceneBreak />

        {/* ── 4: SUCCESS AS TRAP ──────────────────────────────────────────────── */}
        <Sec n="4" title="The success-as-trap pattern">
          <P>{`The career path, for the well-masked AuDHD adult, is a sorting mechanism that selects upward for the very traits the underlying neurology cannot indefinitely sustain. The pattern is recognisable enough that the autistic adult community has produced a near-archetypal narrative around it: the career that began with the AuDHD adult being unusually good at a single technical thing, progressed through promotions which gradually relocated the work away from that thing, landed eventually in a role whose actual demands were almost entirely about the cognitive and social dimensions where the nervous system was least equipped, and ended in a collapse the surrounding system read as inexplicable.`}</P>

          <P>{`The previous article in this series, on corporate workplace navigation, traced the friction surface between AuDHD cognition and corporate norms. This section goes further: the friction is not a static cost but a dynamic one that compounds with seniority. Promotion moves the recipient away from individual contributor work — where AuDHD monotropic absorption and pattern recognition produce above-headcount output — and toward managerial, political, and representational work, where the masking budget is spent without compensating return. The director-level meeting where ten per cent of the agenda is technical and ninety per cent is interpersonal is, for the AuDHD director, a worse fit than the senior-IC role they were promoted out of. The salary is higher. The fit is worse. Visible competence in the IC role bought the promotion. The role they have been promoted into is the one that will, in three to five years, break them.`}</P>

          <SuccessAsTrap />

          <P>{`The diagram in Figure 2 makes the divergence visible. The visible-competence curve is what colleagues see — and what the promotion mechanism rewards. It tracks the role-demand curve closely, because the well-masked adult has spent a lifetime learning to produce outputs commensurate with whatever input they are handed. The sustainable-masking curve tells the underlying truth. In the early-career years it rises (skill compounds, role fit improves), plateaus through the middle years, and declines — not because the adult is becoming less capable, but because the cost of producing each unit of visible competence is increasing as the role drifts away from the AuDHD strengths. The shaded region between demand and sustainability is the masking debt §3 was concerned with, integrated across years rather than across hours. The burnout point is where the unpaid bill comes due.`}</P>

          <P>{`Several sub-patterns recur in the late-diagnosed AuDHD adult literature. The technical-track refugee: the AuDHD engineer, scientist, or analyst promoted into management because no senior IC track paid comparably, now performing a role their nervous system is poorly equipped for. Pete Wharmby's 2024 essay collection What I Want To Talk About (Jessica Kingsley) contains an extended account of this dynamic in the academic context. The founder-trap: the AuDHD adult who founded a company on the strength of their hyperfocus and pattern recognition, and is, five years in, the CEO of a thirty-person organisation whose operational needs are exactly the dimensions they have least access to. The senior-services-professional: the AuDHD lawyer, doctor, accountant, or consultant whose career advancement has gradually relocated their work from technical practice into client management, internal politics, and revenue generation — all taxed disproportionately by their underlying neurology.`}</P>

          <P>{`The architecture of the trap is identical in each. The traits that produced the early career's visible competence — depth, intensity, justice orientation, low political-game overhead — are the traits that fit the IC role. The traits the promoted role rewards — broad bandwidth, sustained social cognition, comfort with ambiguity, high political-game throughput — are the dimensions on which the AuDHD profile most consistently shows higher support need. The promotion is a reassignment from a role they fit to one they do not. Its symbolic value papers over the fit problem for years. The fit problem persists underneath. The masking budget is what pays for it, until the masking budget is exhausted.`}</P>

          <Callout type="warn" title="The cruelty of the well-meant promotion">
            <P>{`The corporate manager promoting their best individual contributor into management is not, in the ordinary sense, doing anything wrong. They are following the institutional logic of every hierarchy in the modern professional service economy. The cruelty is structural, not individual. The well-meant promotion is the mechanism by which the system extracts the AuDHD adult's depth and intensity for its own benefit and then, having extracted as much as the masking budget will sustain, discards them when the budget runs out. The promotion is the mechanism. The collapse is the bill. Calling either of them anyone's fault is a category error.`}</P>
          </Callout>

          <Photograph
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80&auto=format&fit=crop&utm_source=dsl&utm_medium=referral"
            alt="A desk with too many browser tabs open, late evening light"
            caption="The senior role visible to the organisation; the thirty-tab browser visible to no one. The gap between the two is what the promotion ladder reliably fails to price in."
            credit="Andrew Neel / Unsplash"
            href="https://unsplash.com/@andrewtneel?utm_source=dsl&utm_medium=referral"
          />
        </Sec>

        <SceneBreak />

        {/* ── 5: THE UNIQUE BURNOUT SIGNATURE ─────────────────────────────────── */}
        <Sec n="5" title="The unique burnout signature">
          <P>{`The burnout that arrives at the end of the success-as-trap arc has, in the past five years, acquired a distinct clinical literature. It is not occupational burnout in the Maslach sense — though it overlaps. It is not depression, though it can be misdiagnosed as such. The autistic adult community calls it autistic burnout, and the foundational empirical statement of the construct is Dora Raymaker, Alan Teo, Nicole Steckler, Brandy Lentz, Mirah Scharer, Austin Delos Santos, Steven Kapp, Morrigan Hunter, Andee Joyce, and Christina Nicolaidis's 2020 paper, "'Having all of your internal resources exhausted beyond measure and being left with no clean-up crew': Defining autistic burnout," in Autism in Adulthood, vol. 2, no. 2, pp. 132–143 (DOI 10.1089/aut.2019.0079). The paper is a community-based participatory research study conducted through the AASPIRE programme; its operational definition emerged from focus groups and interviews with autistic adults and was refined iteratively with the participating community.`}</P>

          <P>{`Raymaker and colleagues defined autistic burnout as a syndrome characterised by three core features: chronic exhaustion, loss of skills (regression in domains the adult had previously held competent), and reduced tolerance to stimulus. The syndrome's onset, in the population they sampled, was preceded by years — typically a decade or more — of compensation: masking, camouflaging, performing neurotypical-appropriate behaviour at sustained cost. The trigger, in the qualitative data, was almost always a precipitating overload — a major project deadline, a child's birth, a family bereavement, a job loss, a global pandemic — that exhausted the residual capacity the years of compensation had been drawing on. The recovery, where recovery occurred, took months to years; some respondents reported that capacities lost in the burnout never fully returned, and that the post-burnout life had to be rebuilt around a smaller, more sustainable functional envelope.`}</P>

          <P>{`The unique signature, for the well-masked adult, is the suddenness. The burnout does not announce itself; the masking has hidden the precursors from the adult as effectively as from the surrounding observers. Figure 2 is stylised, but the qualitative descriptions in Raymaker et al. and in Higgins and colleagues' 2021 "Defining autistic burnout through experts by lived experience" (Autism 25:8, 2356–2369, DOI 10.1177/13623613211019858) consistently report a near-vertical drop. One Friday the adult was holding the senior role, the relationship, the school run, the side project. The following Monday they could not get out of bed; the following month they could not sustain a half-hour conversation; six months later they had not returned to the role and were not certain they ever would. The drop felt, to surrounding observers, inexplicable. It was the cumulative bill arriving in a single instalment.`}</P>

          <PQ attribution="RAYMAKER ET AL. 2020 — RESPONDENT VERBATIM">{`"It's like having all of your internal resources exhausted beyond measure and being left with no clean-up crew."`}</PQ>

          <P>{`The Higgins paper extends the Raymaker definition with a different sample (UK-based, recruited through the National Autistic Society) and converges on a closely similar three-feature construct, with a fourth feature added: a destabilisation of identity. The post-burnout autistic adult described, repeatedly, no longer recognising themselves — not knowing who they had been beneath the masking, before it collapsed. The high-functioning identity had been so thorough a self-presentation that its collapse left a vacancy where the self had been thought to be. Recovery was not a return to a previous self. It was the slow construction of a self that had not had room to exist while the masking was in operation.`}</P>

          <P>{`There are clinical implications the recent literature is still catching up with. Autistic burnout is not depression; antidepressant medication, in the qualitative data, often did not address the core syndrome and sometimes made it worse. The "return-to-work" framing applied by occupational health to standard burnout is frequently the wrong intervention; the role the adult was returning to was a contributor to the original collapse, and phased return often produces a second, deeper burnout within twelve to eighteen months. The recovery arc, handled honestly, frequently includes a downshift — the subject of §8.`}</P>

          <SB title="A note on diagnosis sequencing">
            <p style={{ margin: "0 0 0.9em" }}>The autistic burnout literature documents a recurring temporal pattern that the well-masked adult should know about in advance. A substantial fraction of late-diagnosed AuDHD adults receive their formal diagnosis in the months immediately following a burnout collapse — not before it. The collapse, in retrospect, was the event that made the masking impossible to sustain and the underlying neurology newly visible to the assessing clinician.</p>
            <p style={{ margin: "0" }}>This is not a coincidence. The pre-burnout adult was, by definition, performing well enough that the diagnostic gatekeeping pattern of §2 was operative. The post-burnout adult is presenting in a way the diagnostic pathway can recognise. The personal cost of arriving at diagnosis through this route is large, and the wider system's reliance on collapse as its detection mechanism is one of the things the field will need to reform across the next decade.</p>
          </SB>
        </Sec>

        <SceneBreak />

        {/* ── 6: THE IMPOSTER PATTERN ─────────────────────────────────────────── */}
        <Sec n="6" title="The imposter pattern that isn't imposter syndrome">
          <P>{`There is a particular flavour of self-doubt the well-masked AuDHD adult reports almost universally, and which surrounding observers — therapists, partners, managers, friends — almost universally misidentify. The misidentification has a name: imposter syndrome. The original construct was developed in 1978 by Pauline Rose Clance and Suzanne Imes ("The Impostor Phenomenon in High Achieving Women: Dynamics and Therapeutic Intervention," Psychotherapy: Theory, Research and Practice 15:3, 241–247). Clance and Imes described a specific pattern in their high-achieving women patients: the persistent inability to internalise objective evidence of one's own competence, accompanied by a chronic conviction of fraudulence that observers could see was unfounded. The diagnostic move is the clinician's: the patient is misperceiving their own competence, and the work of therapy is to bring the self-assessment into line with reality.`}</P>

          <P>{`The well-masked AuDHD adult's experience of self-doubt is not this. It is its inverse. The AuDHD adult perceives, accurately, a real gap between their visible competence and their internal experience of effort. Their colleagues see the polished output; they themselves know what the output cost — the four hours of preparation hidden from view, the weekend's recovery sleep that paid for Monday's meeting, the masking budget that ran near zero from Wednesday afternoon. The adult is not misperceiving anything. They are correctly perceiving that the appearance of effortless competence is being produced by a process that is anything but effortless.`}</P>

          <P>{`The phenomenology, on the inside, is similar to imposter syndrome. The phrase "if they knew what this actually costs me" is shared. But the structural logic is opposite. The Clance and Imes patient says, in effect: "they think I'm competent and I'm not." The AuDHD adult says: "they think I'm competent in a way that doesn't cost me, and I'm not." The competence is real; the sustainability of the appearance is not. To treat the second presentation with the standard imposter-syndrome interventions — CBT reframing, evidence-collection of objective accomplishment, "you really are good enough" reassurance — is to address a problem the adult does not have. It misses what the adult is saying.`}</P>

          <Callout type="info" title="A diagnostic differentiation">
            <P>{`In the Clance and Imes original construct, the test for imposter phenomenon is whether external evidence of competence, when presented, fails to be internalised by the patient. The patient holds the conviction of fraudulence in the face of contradicting data. The intervention is to help the patient update.`}</P>
            <P>{`In the AuDHD masking-cost pattern, external evidence of competence is internalised — the adult does not deny the competence; the dossier of objective accomplishment is accepted at face value. What the adult holds is a separate proposition: that the cost of producing the competence is invisible to the people producing the evidence, and that the cost is unsustainable. The intervention is not to update the self-assessment. The intervention is to make the cost visible to the systems around the adult, so that the cost can be shared, mitigated, or — where the role allows — reduced. The two clinical situations look similar from outside and are structurally different.`}</P>
          </Callout>

          <P>{`The clearest clinical statement of this differentiation comes from Megan Anna Neff, whose Neurodivergent Insights project has since 2021 served as one of the more careful clinical sources on the AuDHD adult population. Neff argues that the standard imposter-syndrome therapeutic posture, applied to the AuDHD client, produces predictable failure: the client agrees with each piece of evidence, leaves the session momentarily reassured, and returns the following week with the same self-doubt — because the self-doubt was never about the competence. It was about the cost. The cost has not been addressed.`}</P>

          <P>{`There is a second-order consequence the well-masked adult should know about. Therapists, managers, and partners who frame the self-doubt as imposter syndrome and try to address it with reassurance are in good faith — they are responding to what they believe the problem is. But the reassurance, repeated over years, becomes part of the masking budget the adult is paying. Each "but you're so capable" requires the adult to absorb the well-meant gesture, decline to correct it, and continue producing the appearance the gesture was responding to. The reassurance itself is taxed. The most useful posture, from the autistic-adult literature on this dynamic, is one of believed cost: accepting that the appearance is real and the cost behind it is also real, and working to redistribute the cost rather than dispute that it exists.`}</P>
        </Sec>

        <SceneBreak />

        {/* ── 7: THE RELATIONSHIPS ────────────────────────────────────────────── */}
        <Sec n="7" title="Relationships, and the loneliness of the well-masked life">
          <P>{`The relationships of the well-masked AuDHD adult — partners, friends, family, sometimes children — are the one domain in which the cost of the masking budget is least transferable and most consequential. The colleague at the office sees the meeting. The partner sees the after-meeting. The architecture of the well-masked life concentrates recovery hours into the home, with the result that the people closest to the adult are also the people most exposed to the cost the adult is paying for the appearance the rest of the world is rewarding. The same person who delivered the polished board presentation at 14:00 cannot, at 19:00, summon the regulatory capacity to participate in a routine conversation about the children's bedtime.`}</P>

          <P>{`Two patterns in the relational data recur. The first is perceptual asymmetry: the partner who has seen the recovery state is the one most likely to recognise the cost — and, paradoxically, the one most often told by the surrounding world that they are exaggerating. "But they're so high-functioning at work" arrives in the close relationship as a contradiction the partner is asked to absorb: their lived experience of the adult's capacity is being denied by the wider community's experience of the same adult's appearance. The literature on partners of autistic adults — Sarah Hendrickx's 2023 Sex and Relationships for Adults on the Autism Spectrum (Jessica Kingsley), the partner-perspective work collated by Maxine Aston — documents this asymmetry as one of the most consistent stressors of the close relationship.`}</P>

          <P>{`The second pattern is the difficulty-of-asking. The well-masked adult is, by hypothesis, one whose presentation has elicited no concern throughout adult life. The internal experience that something is wrong is unaccompanied by external evidence the adult could point to. Asking for help — from a partner, a friend, a GP — requires producing evidence the adult cannot easily produce. The fact that they have just spent eight hours appearing fine is, structurally, an argument against the help they need. The phrase "but you cope so well" — meant kindly, in almost every case — is the sentence that closes the door. It is the same gatekeeping mechanism the diagnostic system runs at the institutional level, now operating in the kitchen between two people who love each other.`}</P>

          <Photograph
            src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1600&q=80&auto=format&fit=crop&utm_source=dsl&utm_medium=referral"
            alt="A quiet hallway, evening light through a window at the far end"
            caption="The hallway between the bedroom and the kitchen is, for the well-masked adult, often the longest distance of the day. The mask cannot be put down at the front door; it has to be put down in stages, room by room, in the company of people who do not always know what they are watching."
            credit="Florian Klauer / Unsplash"
            href="https://unsplash.com/@florianklauer?utm_source=dsl&utm_medium=referral"
          />

          <P>{`A specific loneliness attaches to this configuration, and the autistic-adult literature has begun, in the past five years, to describe it. Eric Garcia's 2021 We're Not Broken: Changing the Autism Conversation (Houghton Mifflin Harcourt) frames it as the cost of being read at the wrong resolution — visible enough to be admired and rewarded, illegible enough that the admiring response does not address what the adult actually needs. Devon Price, in Unmasking Autism, describes it as the loneliness of being seen but not known. The phrase the well-masked adult most often reports thinking, in a meeting where the colleagues who have known them for years are praising the work they have just produced, is some version of: "you are praising the version of me you can see; the person you are praising does not exist; the person who actually produced the work is somewhere else, paying for it." The phrase is not melodrama. It is a description of an asymmetry the adult is required to maintain in order to keep the praise coming.`}</P>

          <P>{`The relational reorganisation that follows from naming the asymmetry is, when it works, one of the most repair-yielding moves available. The autistic-adult community has produced practical formulations — disclosure scripts in the Autistic Self Advocacy Network's 2024 Welcome to the Autistic Community handbook, partner-conversation frameworks in Megan Anna Neff's clinical-practice notes — that share an architecture. The adult names, to the close relationship, what the masking budget actually costs. The partner is told the after-work crash is not coldness or withdrawal but the bill for the day's masking arriving at the front door. The family is told the silence at dinner is not anger but recovery. The children are told, in age-appropriate language, that the parent's quiet hour after work is not them; it is the day. The reorganisation does not eliminate the cost. It distributes the cost, accurately, across the people who can help carry it.`}</P>
        </Sec>

        <SceneBreak />

        {/* ── 8: THE REORGANISATION ───────────────────────────────────────────── */}
        <Sec n="8" title="The reorganisation — what changes when the appearance is put down">
          <P>{`There is a reorganisation many late-diagnosed AuDHD adults undertake, in the year or two following diagnosis, that the autistic-adult literature has come to call (variously) unmasking, downshifting, or — in Devon Price's term, taken over from disability-studies usage — coming home. It is the deliberate dismantling of the high-functioning life-architecture and the construction of something more sustainable in its place. It is neither uniform nor universal; not every late-diagnosed adult attempts it, and not every attempt succeeds. But the pattern is consistent enough across the post-2018 literature to be described in outline.`}</P>

          <P>{`Price's Unmasking Autism (chapter 5 in particular) is the most-cited practical guide. Price's framing is that masking is, in the adult who has done it since childhood, a habit of nervous-system presentation rather than a freely chosen behaviour, and that the work of unmasking is therefore neither rapid nor heroic. It is incremental, somatic, and frequently uncomfortable: the adult learns, slowly and across many small instances, what their actual sensory preferences are, what their actual social bandwidth is, what their actual recovery requirements are — having spent decades performing a self whose needs were nominally those of a neurotypical person. The unmasking is an act of recognition rather than transformation. The adult is not becoming someone new; they are letting the form they always had become legible.`}</P>

          <P>{`The career consequences are usually substantial. The most consistently reported pattern, in the qualitative data collected by Raymaker et al. and the Higgins follow-up work, is the post-burnout downshift: the adult returns not to the role they left but to a smaller one — fewer direct reports, less travel, more individual-contributor work, fewer client meetings. Salary often falls; status often falls; the surrounding peer group's reactions range from supportive to incomprehending. The adult, in the year or two after the downshift, frequently reports a quality of life and of work-output they had not experienced in the previous decade. The work, smaller, is sustainable. The career, from outside, is moving sideways or backwards. Inside, it has stopped costing what it had been costing.`}</P>

          <P>{`Megan Anna Neff's clinical-practice notes at Neurodivergent Insights, written for clinicians supporting late-diagnosed AuDHD adults through the post-diagnostic year, are explicit about the framing the supporting clinician should bring. The downshift is not a regression; it is a recalibration to sustainable load. The previous role was producing visible competence at unsustainable cost; the new role is producing visible competence at sustainable cost. Both are competence. Only one is durable. The clinician who frames the downshift accurately is doing more for the patient than the one who, with the best intentions, encourages a return to the previous functional envelope.`}</P>

          <P>{`Joel Schwartz, PsyD, clinical director of Total Spectrum (California) and an autistic clinician himself, has been one of the more forceful voices in the post-diagnostic-care literature for what he calls "right-sizing" — the deliberate construction of a life whose external commitments fit, rather than exceed, the actual sustainable capacity of the adult's nervous system. The well-masked adult, Schwartz argues across his clinical writing and 2023–2025 Divergent Conversations podcast appearances, has typically constructed a life two or three sizes larger than the body of the life can carry. Right-sizing is letting the life shrink to the size that fits, and accepting — against thirty years of cultural pressure to do otherwise — that fit, not size, is the metric of a life well-led.`}</P>

          <P>{`Three things change in the well-conducted reorganisation. The first is identity: the high-functioning self-image is no longer the operative self-image, and a different one takes time to grow in its place. The second is relational: partners, friends, and colleagues who knew the previous adult will, in some cases, struggle with the new one — not from malice but because the previous adult was meeting needs the new one is no longer willing to meet at the previous cost. The third is financial: the salary of the previous role was paying for, among other things, the masking budget, and household economics often have to be recalibrated. Each adjustment is, in the longitudinal data, repaid by the reduction in the recovery deficit that drove the original collapse.`}</P>

          <SB title="What &lsquo;recovery&rsquo; looks like, as the literature frames it">
            <p style={{ margin: "0 0 0.9em" }}>The autistic-burnout recovery literature, drawing on Raymaker, Higgins, and post-2022 community-research, converges on a multi-stage arc that does not match the standard occupational-burnout recovery picture.</p>
            <p style={{ margin: "0 0 0.9em" }}>Stage one: acute rest — six weeks at minimum, frequently three to six months, during which the adult is unable to perform routine tasks. Stage two: diagnostic recognition, when the AuDHD diagnosis is often finally received. Stage three: unmasking and experimentation, when sensory preferences, social-bandwidth limits, and recovery requirements are deliberately tested. Stage four: right-sizing, when the post-burnout life-architecture is rebuilt around actual capacity rather than the previous appearance.</p>
            <p style={{ margin: "0" }}>The arc is not linear and not uniform. The adults who successfully complete it report, almost without exception, that they would not return to the pre-burnout life. The previous life had been, in the most economical phrase the literature offers, the wrong shape.</p>
          </SB>
        </Sec>

        <SceneBreak />

        {/* ── 9: A MORE HONEST TAXONOMY ───────────────────────────────────────── */}
        <Sec n="9" title="A more honest taxonomy">
          <P>{`Everything in the previous eight sections becomes intelligible only after the high-functioning / low-functioning binary has been put down and replaced with a more accurate vocabulary. The taxonomy proposed here is not original — it is the working vocabulary of the post-2020 disability-studies and autistic-self-advocacy literature, distilled into a form a clinician, manager, or partner can use without the disability-studies background. The article makes it explicit because, in current practice, it is rarely deployed.`}</P>

          <P>{`The proposal is that support need is multidimensional rather than scalar. There is no single number that summarises the support an adult requires; there are multiple domains, and the support need varies — sometimes substantially — across them for the same person. The DSM-5-TR (2022 text revision) points in this direction: it specifies severity separately for the social-communication domain and the restricted-and-repetitive-behaviour domain, each rated on a three-level scale (Level 1: requiring support; Level 2: substantial; Level 3: very substantial). The two-axis specifier is the most clinically deployed multidimensional framing currently in use, and is rarely used to its full specification — most clinical reports collapse the two axes back into a single overall level.`}</P>

          <P>{`The taxonomy proposed here extends DSM-5-TR's move from two axes to six, drawing on the broader functional-assessment literature and the disability-studies critique that no single rating can capture the lived shape of a disabled life. The six domains: sensory (cost of processing the sensory environment), social (cost of navigating interpersonal interaction), executive (planning, prioritising, sequencing, switching), communication (expressive and receptive language across contexts), self-regulation (emotional and physiological state-management), and motor (fine and gross coordination, including praxis and proprioception). Each domain admits its own rating; each rating is independent; the overall picture is the joint distribution across all six.`}</P>

          <MultidimensionalSupportNeeds />

          <P>{`The radar diagram in Figure 3 is the picture this taxonomy produces when applied to a composite individual whom the popular literature would have called high-functioning. Communication and motor read as low support need: the colleagues who interact with this adult through verbal exchange register no obvious deficit, and the surface coordination that observers can see (typing, walking, driving, presenting) is intact. These are the two dimensions on which the workplace assesses the adult — and on which the high-functioning label is tracking.`}</P>

          <P>{`The other four domains tell a different story. Sensory: high — the open-plan office is cumulative depletion the masking budget has been quietly paying down throughout the workday. Executive: high — the planning, prioritising, sequencing, and switching costs of the senior role are substantially higher than for a neurotypical peer. Self-regulation: high — maintaining emotional and physiological homeostasis across an eight-hour day in an under-fitting environment is costly, with a correspondingly high recovery requirement at evening. Social: moderate-to-high — the fluent verbal exchange the workplace registers is being produced by sustained masking effort it cannot see. The same person is low-support-need on the two dimensions the popular label tracks, and high-support-need on the four it does not.`}</P>

          <P>{`The taxonomy has two practical consequences. First, it makes the masking budget legible: the cost of the four high-need domains is paid for, day after day, without the institutional supports that would address them — supports the adult does not receive because the two low-need domains the workplace can see have been read as evidence the supports are not required. The §8 reorganisation is, in the language of the taxonomy, the construction of an environment in which the four high-need domains are appropriately supported so that the masking budget no longer has to pay for them privately.`}</P>

          <P>{`Second, the taxonomy disarms the gatekeeping mechanism §2 was concerned with. The sentence "but you have a job" is, in the taxonomy, an observation about the communication-and-motor profile only — not, despite its surface form, a claim about the sensory, executive, self-regulation, or social profile. The institutional system asking it has been confusing one for the other. The phrase "low support needs in some domains, high support needs in others," awkward as it is, is the most economical statement of what the taxonomy says.`}</P>

          <Callout type="tip" title="A practical translation, for clinicians and managers">
            <P>{`Where the previous practice would record "high-functioning autism," the taxonomy records: ASD with low support need in communication and motor; substantial support need in sensory, executive, and self-regulation; moderate support need in social. The first formulation closes off institutional response; the second specifies what would actually help. The practical work of reform, across the next decade in NHS adult-autism services and in private clinical practice, is the work of moving routine reporting from the first formulation to the second. The adult is the same person in both reports. Only the second one tells the surrounding system how to support them.`}</P>
          </Callout>

          <P>{`This is the taxonomy the article has been moving toward since §1. It does not solve the gatekeeping problem; it does not eliminate the masking budget; it does not prevent the burnout the success-as-trap pattern produces. What it does is name the picture accurately, so that the work the previous sections described becomes possible. The well-masked adult is not a high-functioning person whose suffering is mysterious. They are a person with a specific multidimensional support profile — high in some domains, low in others — whose institutional environment has been responding to the visible domains and ignoring the invisible ones. The cost is real. The need is real. The taxonomy is the first step toward making both count.`}</P>

          <P italic large>{`The world will continue, for some time, to use the popular term. The person it describes is not high-functioning. They are well-masked, supported in some domains and unsupported in others, paying privately for what the world has decided not to see. There is a more honest name for this. The name is the picture.`}</P>
        </Sec>

        <SceneBreak />

        {/* ── SOURCE INTEGRITY NOTE ──────────────────────────────────────────── */}
        <Sec n="10" title="Source Integrity Note">
          <P>{`This article is the sixth in a series on AuDHD. The earlier pieces are: audhd-entelechy-v2.jsx (neuroscience, April 2026); the lived-experience second piece; audhd-entelechy-form-and-fulfilment.jsx (philosophy, April 2026); audhd-corporate-workplace-navigation.jsx (workplace navigation, April 2026); and the fifth piece on the long history of clinical mis-recognition. The present article handles the population those pieces only glanced at — the outwardly-successful, well-masked AuDHD adult — and tries to do so without endorsing the popular term used to describe them. Workspace files read in preparation: audhd-entelechy-v2.jsx; audhd-entelechy-form-and-fulfilment.jsx; audhd-corporate-workplace-navigation.jsx; library-articles/articles/looksmaxxing.jsx (encyclopaedic-mode scaffold); library-articles/articles/storytelling-in-photography.jsx (encyclopaedic-mode scaffold); library-articles/.claude/skills/shared-article-jsx-reference.md.`}</P>

          <P><strong>Primary clinical and empirical literature cited:</strong></P>

          <P>{`Pauline Rose Clance and Suzanne Imes, "The Impostor Phenomenon in High Achieving Women: Dynamics and Therapeutic Intervention," Psychotherapy: Theory, Research and Practice, vol. 15, no. 3 (1978): 241–247. The original definition of imposter phenomenon, used in §6 as the contrast against which the AuDHD masking-cost pattern is differentiated. DOI: 10.1037/h0086006.`}</P>

          <P>{`Meng-Chuan Lai and Simon Baron-Cohen, "Identifying the lost generation of adults with autism spectrum conditions," The Lancet Psychiatry, vol. 2, no. 11 (November 2015): 1013–1027. The female-phenotype literature foundational to §1 and §2. DOI: 10.1016/S2215-0366(15)00277-1.`}</P>

          <P>{`Laura Hull, K. V. Petrides, Carrie Allison, Paula Smith, Simon Baron-Cohen, Meng-Chuan Lai, and William Mandy, "&lsquo;Putting on My Best Normal&rsquo;: Social Camouflaging in Adults with Autism Spectrum Conditions," Journal of Autism and Developmental Disorders, vol. 47, no. 8 (August 2017): 2519–2534. The foundational masking/camouflaging construct paper used throughout §3. DOI: 10.1007/s10803-017-3166-5.`}</P>

          <P>{`Eilidh Cage and Zoe Troxell-Whitman, "Understanding the Reasons, Contexts and Costs of Camouflaging for Autistic Adults," Journal of Autism and Developmental Disorders, vol. 49, no. 5 (May 2019): 1899–1911. Used in §3 for the contexts-and-costs framework and the high-context-switching findings. DOI: 10.1007/s10803-018-03878-x.`}</P>

          <P>{`Amy Pearson and Kieran Rose, "A Conceptual Analysis of Autistic Masking: Understanding the Narrative of Stigma and the Illusion of Choice," Autism in Adulthood, vol. 3, no. 1 (March 2021): 52–60. Used in §3 for the effortful-vs-automatic masking distinction and for the stigma-management framing. DOI: 10.1089/aut.2020.0043.`}</P>

          <P>{`Dora M. Raymaker, Alan R. Teo, Nicole A. Steckler, Brandy Lentz, Mirah Scharer, Austin Delos Santos, Steven K. Kapp, Morrigan Hunter, Andee Joyce, and Christina Nicolaidis, "&lsquo;Having all of your internal resources exhausted beyond measure and being left with no clean-up crew&rsquo;: Defining Autistic Burnout," Autism in Adulthood, vol. 2, no. 2 (June 2020): 132–143. The foundational autistic-burnout paper used throughout §5 and the basis of the recovery-arc framing in §8. DOI: 10.1089/aut.2019.0079.`}</P>

          <P>{`Julianne M. Higgins, Samuel R. C. Arnold, Janelle Weise, Elizabeth Pellicano, and Iliana Magiati, "Defining autistic burnout through experts by lived experience: Grounded Delphi method investigating &lsquo;Autistic Burnout&rsquo;," Autism, vol. 25, no. 8 (November 2021): 2356–2369. Used alongside Raymaker in §5 for the four-feature construct (chronic exhaustion, skill loss, reduced stimulus tolerance, identity destabilisation). DOI: 10.1177/13623613211019858.`}</P>

          <P>{`William Mandy, "Should we use diagnostic terms which suggest autistic people are &lsquo;high functioning&rsquo;? Some practical, ethical and conceptual issues to consider," Autism (SAGE / National Autistic Society), vol. 26, no. 8 (November 2022): 1882–1892. Used in §1 and §2 as the most rigorous clinical critique of the high-functioning vocabulary in the contemporary literature. DOI: 10.1177/13623613221117288.`}</P>

          <P><strong>Books and longer-form sources cited:</strong></P>

          <P>{`Devon Price, Unmasking Autism: Discovering the New Faces of Neurodiversity (Harmony / Penguin Random House, 2022). Used in §1 (the contemporary critique of functioning labels), §3 (the after-work crash), §7 (loneliness of being seen but not known), §8 (the unmasking work, especially chapter 5).`}</P>

          <P>{`Eric Garcia, We're Not Broken: Changing the Autism Conversation (Houghton Mifflin Harcourt, 2021). Used in §7 for the framing of being read at the wrong resolution.`}</P>

          <P>{`Sarah Hendrickx, Sex and Relationships for Adults on the Autism Spectrum (Jessica Kingsley Publishers, 2023). Used in §7 for the partner-relationship literature.`}</P>

          <P>{`Pete Wharmby, What I Want To Talk About: How Autistic Special Interests Shape a Life (Jessica Kingsley Publishers, 2024 essay collection). Used in §4 (the technical-track refugee pattern) and as a general source on the lived-experience literature of late-diagnosed autistic adults.`}</P>

          <P>{`Sam Ahern, The Autistic Survival Guide (Jessica Kingsley Publishers, 2024). Used in §1 for the community-organising register of the functioning-label critique.`}</P>

          <P><strong>Institutional and policy reports:</strong></P>

          <P>{`Sir Robert Buckland KC MP, The Buckland Review of Autism Employment, UK Department for Work and Pensions (February 2024). Used in §2 for the disability-employment-gap data and the 77-per-cent-want-to-work finding. https://www.gov.uk/government/publications/the-buckland-review-of-autism-employment-report-and-recommendations.`}</P>

          <P>{`UK Department for Work and Pensions, Employment of Disabled People (annual statistics publication, 2024–25 edition). Used in §2 for the autism-specific employment-rate figure (31.4 per cent vs 82.0 per cent non-disabled comparator).`}</P>

          <P>{`NHS England Autism Statistics, monthly publication current to April 2026. Used in §2 for the 234,876-adult waiting-list figure for autism assessment in England. https://digital.nhs.uk/data-and-information/publications/statistical/autism-statistics.`}</P>

          <P>{`National Autistic Society, Now I Know report on late autism diagnosis (2023), and 2024 report on diagnosis pathways. Used in §1 and §2 for the qualitative findings on late-diagnosed autistic adult experience and the triage practice in NHS adult autism services.`}</P>

          <P>{`American Psychiatric Association, Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition (DSM-5, 2013) and DSM-5-TR (Text Revision, 2022). Used in §1 and §9 for the formal severity-level specifiers and the historical collapse of Asperger's syndrome into Autism Spectrum Disorder.`}</P>

          <P><strong>Clinical-practice and community sources:</strong></P>

          <P>{`Megan Anna Neff, PsyD, Neurodivergent Insights (neurodivergentinsights.com, 2021–present). Used in §6 for the imposter-pattern clinical differentiation, §7 for the partner-conversation framework, and §8 for the recalibration-not-regression framing.`}</P>

          <P>{`Joel Schwartz, PsyD, clinical director, Total Spectrum (totalspectrum.org), Costa Mesa, California; podcast appearances on Divergent Conversations (Megan Anna Neff and Patrick Casale, 2023–2025). Used in §8 for the right-sizing framing.`}</P>

          <P>{`Lydia X. Z. Brown, "The Significance of Semantics: Person-First Language: Why It Matters" (autistichoya.com, 2011, with later revisions). Used in §1 for the disability-studies critique of functioning labels. The Autistic Self Advocacy Network's broader writing on functioning hierarchy is also drawn on for §1.`}</P>

          <P>{`Autistic Self Advocacy Network, Welcome to the Autistic Community handbook, second edition (2024). Used in §7 for the disclosure-script frameworks.`}</P>

          <P><strong>Tier-2 composites flagged:</strong></P>

          <P>{`The composite individual visualised in Figure 3 (the &ldquo;same person, different needs across domains&rdquo; radar plot) is exactly that — a composite, not an individual. The values plotted (Sensory 78, Social 62, Executive 70, Communication 28, Self-regulation 74, Motor 22) are illustrative; they are scaled to make the §9 argument visually clear and are not measured values from any specific person. The diagram caption flags this. The radar's purpose is taxonomic — to show what the multidimensional taxonomy looks like when applied to a typical well-masked adult — not statistical.`}</P>

          <P>{`The masking-budget hourly trace in Figure 1 is a stylised representative weekday rather than empirical hourly data; the literature it draws on (Pearson &amp; Rose 2021; Cage &amp; Troxell-Whitman 2019; Raymaker et al. 2020) supports the directional claims (capacity drains across the day, demand peaks mid-morning and late afternoon, the recovery deficit accumulates at evening) but does not, at the time of writing, supply published hour-by-hour ecological-momentary-assessment data of the kind the diagram's specific shape implies. The figure is editorial, not measured.`}</P>

          <P>{`The career-progression curves in Figure 2 are similarly stylised. The directional claim — that demand and visible competence track upward through promotions while sustainable masking output diverges and eventually breaks — is supported by the autistic-burnout literature (Raymaker et al. 2020; Higgins et al. 2021) and by the late-diagnosed-AuDHD lived-experience literature (Price 2022; Wharmby 2024). The specific curves are illustrative, not derived from a longitudinal dataset.`}</P>

          <P><strong>The contested-vocabulary critique — credit:</strong></P>

          <P>{`The article's §1 critique of the term high-functioning is not the agent's. It belongs to the autistic self-advocacy and disability-studies traditions developed over the past decade and a half — most prominently by Devon Price (2022), Sam Ahern (2024), Lydia X. Z. Brown (2011 and ongoing), the Autistic Self Advocacy Network, William Mandy (2022 review), and the broader autistic-led writing the article cites. The agent has summarised and contextualised the critique; the critique itself is the work of the autistic-led literature and the disability-studies scholars who have argued it for years. Where §1 paraphrases or compresses, it is paraphrasing or compressing those sources, not generating an original argument. The taxonomy proposed in §9 likewise builds on existing disability-studies and clinical-psychology multidimensional-functioning frameworks; it is a synthesis, not an invention.`}</P>

          <P><strong>Where the agent reasoned beyond cited evidence — explicit acknowledgement:</strong></P>

          <P>{`Several connections drawn in this article are interpretive and are not, to the agent's knowledge, made in this exact form by any single cited source. In particular: (i) the integration of Cage &amp; Troxell-Whitman 2019 with Pearson &amp; Rose 2021's effortful/automatic distinction in §3 to produce the masking-budget framing is the agent's synthesis; the underlying constructs are theirs. (ii) The success-as-trap diagrammatic framing in §4 — and specifically the &ldquo;visible competence collapses to floor&rdquo; framing of the burnout point — is the agent's compression of the qualitative-data findings in Raymaker et al. 2020 and Higgins et al. 2021; the empirical findings are the cited authors'. (iii) The differentiation in §6 between Clance &amp; Imes 1978 imposter syndrome and the AuDHD masking-cost pattern draws on Megan Anna Neff's clinical-practice writing, but the precise structural-logic framing (&ldquo;misperception of one's own competence&rdquo; versus &ldquo;correctly perceiving a real cost gap&rdquo;) is the agent's articulation. (iv) The six-domain taxonomy proposed in §9 extends the DSM-5-TR two-axis severity specifier in a direction that the manual itself does not formally specify; the extension draws on the broader functional-assessment and disability-studies literature but is, as proposed, the agent's synthesis. These interpretive moves are flagged so that the reader can hold them at appropriate epistemic distance from the directly textually-grounded claims.`}</P>

          <P><strong>No invented quotations:</strong></P>

          <P>{`The single direct verbatim quote in the article (&ldquo;It's like having all of your internal resources exhausted beyond measure and being left with no clean-up crew&rdquo;) is from a respondent in Raymaker et al. 2020 — it is the phrase that gives the paper its title and is reproduced verbatim from the published abstract and the body of the paper. No quotations have been invented or attributed to any named clinician, researcher, or autistic adult in this article. Where the article ascribes a position to a named person (Price, Mandy, Lai, Hull, Cage, Pearson, Rose, Raymaker, Higgins, Neff, Schwartz, Brown, Garcia, Hendrickx, Wharmby, Ahern), the position is paraphrased from the cited published or freely-available work.`}</P>

          <P><strong>Photographs:</strong></P>

          <P>{`Hero and inline photographs sourced from Unsplash with mandatory UTM tagging (?utm_source=dsl&amp;utm_medium=referral) per the Unsplash developer guidelines. Where a satisfactory editorial photograph could not be sourced, an IC placeholder block would have been used; in the present article, all four inline photographs are Unsplash-sourced.`}</P>

          <P><strong>Voice and method:</strong></P>

          <P>{`This is the encyclopaedic-mode sixth piece in the AuDHD series. Voice register: HBR / The Atlantic / London Review of Books / Aeon. The piece deliberately uses the contested term &ldquo;high-functioning&rdquo; only where the popular meaning does the work, and replaces it with &ldquo;well-masked&rdquo; or &ldquo;outwardly successful&rdquo; or — in the §9 sense — &ldquo;multidimensional support profile&rdquo; everywhere else. No cheerleading register; no pathologising register; honest about contested vocabulary throughout.`}</P>
        </Sec>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: `40px solid ${C.natgeoYellow}`, padding: "24px 24px 32px", textAlign: "center" }}>
        <div style={{ fontFamily: F.sans, fontSize: 11, color: C.warmGray, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Encyclopaedic Reference &nbsp;|&nbsp; The Cost Behind the Composure &nbsp;|&nbsp; Sixth in the AuDHD Series
        </div>
      </div>
    </div>
  );
}
