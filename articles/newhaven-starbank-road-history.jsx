/* --- YAML frontmatter --- */
/*
title: "Newhaven and Starbank Road"
subtitle: "A royal shipyard, a fishing village, a Victorian seafront — five centuries on the south shore of the Firth of Forth, read along a single Edinburgh road."
category: "history"
style: "encyclopaedic"
date: "2026-04-29"
tags: [edinburgh, newhaven, scotland, history, maritime, victorian]
*/

const ARTICLE_DATA = {
  title: "Newhaven and Starbank Road",
  subtitle: "A royal shipyard, a fishing village, a Victorian seafront — five centuries on the south shore of the Firth of Forth, read along a single Edinburgh road.",
  category: "history",
  style: "encyclopaedic",
  date: "2026-04-29",
  author: "Matthew Deane",
  tags: ["edinburgh", "newhaven", "scotland", "history", "maritime", "victorian"],
};

/* ═══════════════════════════════════════════════════════════════ */
/*  DESIGN TOKENS                                                  */
/* ═══════════════════════════════════════════════════════════════ */

const C = {
  bg: "#F7F4ED",
  bgAlt: "#EFEAE0",
  bgCard: "#EDE7DA",
  fg: "#1a1a1a",
  ink: "#1a1a1a",
  muted: "#7A7264",
  textMute: "#7A7264",
  textMuted: "#7A7264",
  accent: "#0E4A6B",
  grid: "#DED6C6",
  line: "#B8AE9C",
  rule: "#D4CBB8",
  panel: "#EDE7DA",
  ok: "#3F6A4A",
  navy: "#0C1E2E",
  forth: "#3A6A88",
  forthD: "#1B4360",
  forthL: "#7AA0B8",
  sand: "#C9B585",
  stone: "#8C7E66",
  red: "#9A2F2F",
  rose: "#B14A4A",
  amber: "#B07A2A",
  lost: "#B14A4A",
  extant: "#0E4A6B",
  contested: "#B07A2A",
};

const F = {
  serif: "'Source Serif 4', 'Georgia', serif",
  sans: "'Source Sans 3', 'Helvetica Neue', sans-serif",
  head: "'Playfair Display', 'Georgia', serif",
  mono: "'JetBrains Mono', monospace",
};

/* ═══════════════════════════════════════════════════════════════ */
/*  VIS 1 · NewhavenTimeline                                       */
/*  Horizontal timeline 1500 → 2025, key events with extant/lost.  */
/* ═══════════════════════════════════════════════════════════════ */

const TIMELINE_EVENTS = [
  { y: 1504, label: "Founding by James IV", state: "extant", note: "Royal harbour ordered" },
  { y: 1511, label: "Great Michael launched", state: "lost", note: "Newhaven shipyard, dismantled c.1514" },
  { y: 1556, label: "Drummond grant", state: "extant", note: "Sir Robert Drummond of Carnock" },
  { y: 1815, label: "Rennie rebuilds harbour", state: "extant", note: "John Rennie the Elder" },
  { y: 1821, label: "Trinity Chain Pier", state: "lost", note: "Just west; lost in 1898 storm" },
  { y: 1838, label: "Old Parish Church built", state: "lost", note: "Demolished 1966" },
  { y: 1843, label: "Disruption + Hill & Adamson", state: "extant", note: "Calotypes 1843-47" },
  { y: 1864, label: "Harbour extension", state: "extant", note: "Outer pier works 1864-79" },
  { y: 1894, label: "Starbank Park opens", state: "extant", note: "Gifted by James Cleghorn 1887" },
  { y: 1898, label: "Chain pier destroyed", state: "lost", note: "October storm" },
  { y: 1966, label: "Old Parish demolished", state: "lost", note: "Slum-clearance era" },
  { y: 1994, label: "Heritage Museum opens", state: "lost", note: "In old fish market; closed 2009" },
  { y: 2009, label: "Heritage Museum closes", state: "lost", note: "Building reused" },
  { y: 2023, label: "Trams to Newhaven", state: "extant", note: "Opened 7 June 2023" },
];

const NewhavenTimeline = () => {
  const W = 720, H = 360, padL = 60, padR = 30;
  const yMin = 1500, yMax = 2030;
  const x = (yr) => padL + ((yr - yMin) / (yMax - yMin)) * (W - padL - padR);
  const baseY = 200;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block", background: C.bg }}>
      <text x={W/2} y={26} textAnchor="middle" fill={C.ink} fontSize={13} fontFamily={F.sans} fontWeight={700} letterSpacing="0.12em" textTransform="uppercase">
        FIGURE 1 · NEWHAVEN TIMELINE, 1500 — 2025
      </text>
      <text x={W/2} y={44} textAnchor="middle" fill={C.muted} fontSize={11} fontFamily={F.sans}>
        Key events along the south shore of the Firth of Forth. Extant in blue, lost in red.
      </text>
      {/* Spine */}
      <line x1={padL} y1={baseY} x2={W-padR} y2={baseY} stroke={C.line} strokeWidth={1.5}/>
      {/* Decade ticks */}
      {[1500,1550,1600,1650,1700,1750,1800,1850,1900,1950,2000].map((d,i)=>(
        <g key={i}>
          <line x1={x(d)} y1={baseY-4} x2={x(d)} y2={baseY+4} stroke={C.line} strokeWidth={1}/>
          <text x={x(d)} y={baseY+18} textAnchor="middle" fill={C.muted} fontSize={9} fontFamily={F.mono}>{d}</text>
        </g>
      ))}
      {/* Events alternating above/below */}
      {TIMELINE_EVENTS.map((e,i)=>{
        const above = i%2===0;
        const col = e.state === "lost" ? C.lost : C.extant;
        const cx = x(e.y);
        const lineEnd = above ? baseY-50 : baseY+50;
        const txtY = above ? baseY-58 : baseY+62;
        return (
          <g key={i}>
            <line x1={cx} y1={baseY} x2={cx} y2={lineEnd} stroke={col} strokeWidth={0.8} opacity={0.6}/>
            <circle cx={cx} cy={baseY} r={4} fill={col} stroke={C.bg} strokeWidth={1.2}/>
            <text x={cx} y={txtY} textAnchor="middle" fill={C.ink} fontSize={9} fontFamily={F.sans} fontWeight={700}>
              {e.y}
            </text>
            <text x={cx} y={txtY + (above ? -10 : 11)} textAnchor="middle" fill={col} fontSize={9} fontFamily={F.sans}>
              {e.label}
            </text>
            <text x={cx} y={txtY + (above ? -20 : 22)} textAnchor="middle" fill={C.muted} fontSize={8} fontFamily={F.sans} fontStyle="italic">
              {e.note}
            </text>
          </g>
        );
      })}
      {/* Legend */}
      <g transform={`translate(${padL},${H-30})`}>
        <circle cx={6} cy={6} r={4} fill={C.extant}/>
        <text x={16} y={9} fill={C.ink} fontSize={10} fontFamily={F.sans}>Extant</text>
        <circle cx={70} cy={6} r={4} fill={C.lost}/>
        <text x={80} y={9} fill={C.ink} fontSize={10} fontFamily={F.sans}>Lost</text>
        <text x={W-padL-padR} y={9} textAnchor="end" fill={C.muted} fontSize={9} fontFamily={F.sans} fontStyle="italic">
          Sources: HES Canmore; Edinburgh Council records; Stevenson harbour archive
        </text>
      </g>
    </svg>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
/*  VIS 2 · HistoricalMap                                          */
/*  Schematic map of Newhaven coast with markers.                  */
/* ═══════════════════════════════════════════════════════════════ */

const MAP_MARKERS = [
  { x: 120, y: 200, label: "Pow Burn / Anchorfield", state: "lost", note: "Pre-1500 settlement" },
  { x: 170, y: 215, label: "Wardie parish boundary", state: "extant", note: "Old parish line" },
  { x: 225, y: 245, label: "Starbank Park", state: "extant", note: "Opened 1894" },
  { x: 275, y: 260, label: "Starbank House", state: "extant", note: "Early 19th c." },
  { x: 305, y: 270, label: "Starbank Inn", state: "extant", note: "Historic hostelry" },
  { x: 360, y: 285, label: "Newhaven Free Church", state: "extant", note: "1843" },
  { x: 420, y: 305, label: "Original 1504 harbour", state: "extant", note: "James IV's wet dock" },
  { x: 460, y: 320, label: "1815 Rennie expansion", state: "extant", note: "Outer breakwater" },
  { x: 495, y: 305, label: "Lighthouse", state: "extant", note: "Pier-end light" },
  { x: 540, y: 280, label: "Tram terminus", state: "extant", note: "Newhaven, 2023" },
  { x: 90, y: 145, label: "Trinity Chain Pier", state: "lost", note: "1821 — 1898" },
];

const HistoricalMap = () => {
  const W = 720, H = 440;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block", background: C.bg }}>
      <text x={W/2} y={26} textAnchor="middle" fill={C.ink} fontSize={13} fontFamily={F.sans} fontWeight={700} letterSpacing="0.12em" textTransform="uppercase">
        FIGURE 2 · NEWHAVEN — A LAYERED MAP
      </text>
      <text x={W/2} y={44} textAnchor="middle" fill={C.muted} fontSize={11} fontFamily={F.sans}>
        Schematic. The Forth lies to the north; Starbank Road runs along the foreshore between Granton and Leith.
      </text>
      {/* Forth */}
      <defs>
        <linearGradient id="forthGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.forthD}/>
          <stop offset="100%" stopColor={C.forthL}/>
        </linearGradient>
        <pattern id="ripple" width="14" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 3 Q3 0 6 3 T12 3" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6"/>
        </pattern>
      </defs>
      <rect x={0} y={60} width={W} height={140} fill="url(#forthGrad)"/>
      <rect x={0} y={60} width={W} height={140} fill="url(#ripple)" opacity={0.5}/>
      {/* Far shore (Fife) */}
      <path d={`M 0 80 Q 200 70 360 78 Q 540 86 ${W} 76`} fill="none" stroke={C.forthD} strokeWidth={1.2} opacity={0.55}/>
      <text x={W-20} y={75} textAnchor="end" fill={C.forthD} fontSize={10} fontFamily={F.sans} fontStyle="italic" opacity={0.85}>FIFE — far shore</text>
      <text x={20} y={130} fill="#fff" fontSize={11} fontFamily={F.head} fontStyle="italic" opacity={0.95} letterSpacing="0.08em">FIRTH OF FORTH</text>
      {/* Land mass */}
      <path d={`M 0 220 L 60 210 L 130 215 L 200 225 L 280 230 L 360 245 L 440 270 L 500 290 L 560 275 L 620 255 L 700 245 L ${W} 240 L ${W} ${H} L 0 ${H} Z`} fill={C.bgAlt} stroke={C.stone} strokeWidth={1.2}/>
      {/* Harbour basin (dark notch) */}
      <path d="M 410 290 Q 450 305 480 318 L 470 325 L 425 312 L 405 300 Z" fill={C.forthD} opacity={0.5}/>
      <path d="M 440 295 Q 470 305 490 312 L 485 320 L 460 312 Z" fill={C.forthD} opacity={0.7}/>
      {/* Starbank Road as a road line west to east */}
      <path d={`M 80 235 Q 180 240 280 260 Q 360 275 440 295 Q 510 305 600 280`} fill="none" stroke={C.amber} strokeWidth={2.2} strokeDasharray="6 3"/>
      <text x={155} y={228} fill={C.amber} fontSize={10} fontFamily={F.sans} fontWeight={700} letterSpacing="0.06em">STARBANK ROAD</text>
      {/* Granton west */}
      <text x={20} y={250} fill={C.muted} fontSize={9} fontFamily={F.sans} fontStyle="italic">← GRANTON</text>
      {/* Leith east */}
      <text x={W-20} y={290} textAnchor="end" fill={C.muted} fontSize={9} fontFamily={F.sans} fontStyle="italic">LEITH →</text>
      {/* Markers */}
      {MAP_MARKERS.map((m,i)=>{
        const col = m.state === "lost" ? C.lost : C.extant;
        return (
          <g key={i}>
            {m.state === "lost" ? (
              <g transform={`translate(${m.x},${m.y})`}>
                <line x1={-4} y1={-4} x2={4} y2={4} stroke={col} strokeWidth={1.6}/>
                <line x1={-4} y1={4} x2={4} y2={-4} stroke={col} strokeWidth={1.6}/>
              </g>
            ) : (
              <circle cx={m.x} cy={m.y} r={3.5} fill={col} stroke={C.bg} strokeWidth={1}/>
            )}
            <text x={m.x + 7} y={m.y - 3} fill={C.ink} fontSize={9} fontFamily={F.sans} fontWeight={600}>
              {m.label}
            </text>
            <text x={m.x + 7} y={m.y + 7} fill={C.muted} fontSize={8} fontFamily={F.sans} fontStyle="italic">
              {m.note}
            </text>
          </g>
        );
      })}
      {/* Compass */}
      <g transform={`translate(${W-50},${H-60})`}>
        <line x1={0} y1={-15} x2={0} y2={15} stroke={C.ink} strokeWidth={1}/>
        <line x1={-15} y1={0} x2={15} y2={0} stroke={C.ink} strokeWidth={1}/>
        <polygon points="0,-15 3,-7 -3,-7" fill={C.ink}/>
        <text x={0} y={-20} textAnchor="middle" fill={C.ink} fontSize={9} fontFamily={F.mono} fontWeight={700}>N</text>
      </g>
      {/* Legend */}
      <g transform={`translate(20,${H-30})`}>
        <circle cx={6} cy={6} r={3.5} fill={C.extant}/>
        <text x={16} y={9} fill={C.ink} fontSize={10} fontFamily={F.sans}>Extant</text>
        <g transform="translate(70,6)">
          <line x1={-4} y1={-4} x2={4} y2={4} stroke={C.lost} strokeWidth={1.6}/>
          <line x1={-4} y1={4} x2={4} y2={-4} stroke={C.lost} strokeWidth={1.6}/>
        </g>
        <text x={80} y={9} fill={C.ink} fontSize={10} fontFamily={F.sans}>Lost</text>
        <text x={W/2} y={9} textAnchor="middle" fill={C.muted} fontSize={9} fontFamily={F.sans} fontStyle="italic">
          Sources: HES Canmore; OS Town Plan, Edinburgh, 1849-53; modern OS
        </text>
      </g>
    </svg>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
/*  VIS 3 · GreatMichaelComparison                                 */
/*  Horizontal bars: tonnage of Great Michael vs contemporaries.   */
/* ═══════════════════════════════════════════════════════════════ */

const GREAT_MICHAEL_DATA = [
  { ship: "Mary Rose (1511, England)", tons: 500, len: 32, contested: false },
  { ship: "Great Michael (1511, Scotland)", tons: 1000, len: 73, contested: true },
  { ship: "Henri Grâce à Dieu (1514, England)", tons: 1500, len: 50, contested: true },
  { ship: "Carrack of Portugal — Santa Catarina do Monte Sinai (c.1512)", tons: 800, len: 38, contested: true },
];

const GreatMichaelComparison = () => {
  const W = 720, H = 320, padL = 230, padR = 60, padT = 70, padB = 60;
  const maxTon = 1700;
  const innerW = W - padL - padR;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", display: "block", background: C.bg }}>
      <text x={W/2} y={24} textAnchor="middle" fill={C.ink} fontSize={13} fontFamily={F.sans} fontWeight={700} letterSpacing="0.12em" textTransform="uppercase">
        FIGURE 3 · TONNAGE OF THE GREAT MICHAEL VS CONTEMPORARIES
      </text>
      <text x={W/2} y={42} textAnchor="middle" fill={C.muted} fontSize={11} fontFamily={F.sans}>
        Best-attested figures, c.1511 — c.1514. Several values are contested in the literature.
      </text>
      <text x={W/2} y={58} textAnchor="middle" fill={C.contested} fontSize={10} fontFamily={F.sans} fontStyle="italic">
        Amber bars carry a contested-figure marker. Tons burthen, contemporary measure.
      </text>
      {/* Axis */}
      <line x1={padL} y1={padT} x2={padL} y2={H-padB} stroke={C.line} strokeWidth={1}/>
      {[0,500,1000,1500].map((t,i)=>(
        <g key={i}>
          <line x1={padL + (t/maxTon)*innerW} y1={padT} x2={padL + (t/maxTon)*innerW} y2={H-padB} stroke={C.grid} strokeDasharray="2 4" strokeWidth={0.7}/>
          <text x={padL + (t/maxTon)*innerW} y={H-padB+14} textAnchor="middle" fill={C.muted} fontSize={9} fontFamily={F.mono}>{t}</text>
        </g>
      ))}
      <text x={padL + innerW/2} y={H-padB+30} textAnchor="middle" fill={C.muted} fontSize={10} fontFamily={F.sans}>tons burthen (approx)</text>
      {/* Bars */}
      {GREAT_MICHAEL_DATA.map((d,i)=>{
        const barH = 28;
        const gap = 14;
        const y = padT + i*(barH+gap);
        const barW = (d.tons/maxTon)*innerW;
        const isMichael = d.ship.startsWith("Great Michael");
        const fill = isMichael ? C.accent : (d.contested ? C.contested : C.stone);
        return (
          <g key={i}>
            <text x={padL-10} y={y+barH/2+4} textAnchor="end" fill={C.ink} fontSize={10} fontFamily={F.sans} fontWeight={isMichael?700:500}>
              {d.ship}
            </text>
            <rect x={padL} y={y} width={barW} height={barH} fill={fill} opacity={isMichael?0.95:0.7} stroke={isMichael?C.navy:"none"} strokeWidth={isMichael?1.2:0}/>
            <text x={padL+barW+8} y={y+barH/2+4} fill={C.ink} fontSize={10} fontFamily={F.mono}>
              ~{d.tons} t · ~{d.len} m
            </text>
            {d.contested && (
              <text x={padL+5} y={y+barH/2+4} fill="#fff" fontSize={9} fontFamily={F.sans} fontWeight={700}>?</text>
            )}
          </g>
        );
      })}
      {/* Note */}
      <text x={W/2} y={H-8} textAnchor="middle" fill={C.muted} fontSize={9} fontFamily={F.sans} fontStyle="italic">
        Sources: Macdougall (1989); Rodger (1997); Knox (1644 ed.); Lavery (1994). ? marks contested figures.
      </text>
    </svg>
  );
};

/* ═══════════════════════════════════════════════════════════════ */
/*  HELPERS                                                        */
/* ═══════════════════════════════════════════════════════════════ */

const DC = ({ children }) => {
  const text = typeof children === "string" ? children : "";
  const f = text.charAt(0);
  const r = text.slice(1);
  return (
    <p style={{ fontFamily: F.serif, fontSize: 18, lineHeight: 1.78, color: C.ink, margin: "0 0 24px" }}>
      <span
        style={{
          float: "left",
          fontFamily: F.head,
          fontSize: 70,
          fontWeight: 900,
          lineHeight: "0.82",
          marginRight: 10,
          marginTop: 8,
          color: C.accent,
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
    style={{ fontFamily: F.serif, fontSize: 18, lineHeight: 1.78, color: C.ink, margin: "0 0 22px", ...style }}
    dangerouslySetInnerHTML={{ __html: children }}
  />
);

const Sec = ({ n, title, children }) => (
  <section style={{ margin: "56px 0 0" }}>
    <h2
      style={{
        fontFamily: F.head,
        fontSize: 28,
        fontWeight: 900,
        color: C.ink,
        margin: "0 0 22px",
        letterSpacing: "-0.01em",
        borderBottom: `2px solid ${C.accent}`,
        paddingBottom: 8,
        display: "inline-block",
      }}
    >
      {n ? `${n}. ${title}` : title}
    </h2>
    <div>{children}</div>
  </section>
);

const SB = ({ title, children }) => (
  <div
    style={{
      background: C.bgCard,
      border: `1px solid ${C.rule}`,
      borderRadius: 4,
      padding: "26px 30px",
      margin: "32px 0",
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
        marginBottom: 10,
        borderBottom: `2px solid ${C.accent}`,
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
        lineHeight: 1.68,
        color: C.ink,
        marginTop: 12,
      }}
    >
      {typeof children === "string" ? <span dangerouslySetInnerHTML={{ __html: children }} /> : children}
    </div>
  </div>
);

const PQ = ({ children }) => (
  <blockquote
    style={{
      fontFamily: F.head,
      fontStyle: "italic",
      fontSize: 24,
      lineHeight: 1.5,
      color: C.ink,
      borderLeft: `3px solid ${C.accent}`,
      paddingLeft: 26,
      margin: "36px 0 36px 18px",
      maxWidth: 620,
    }}
  >
    {children}
  </blockquote>
);

const Callout = ({ title, type = "info", children }) => {
  const bar = type === "warn" ? C.red : type === "tip" ? C.ok : C.accent;
  return (
    <div
      style={{
        background: C.bgCard,
        borderLeft: `4px solid ${bar}`,
        padding: "18px 22px",
        margin: "26px 0",
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

const NB = ({ title, children }) => (
  <div style={{ background: C.bgAlt, border: `1px solid ${C.rule}`, padding: "14px 18px", margin: "20px 0", fontFamily: F.sans, fontSize: 13, color: C.ink }}>
    <div style={{ fontFamily: F.mono, fontSize: 11, color: C.muted, marginBottom: 6, letterSpacing: "0.06em", textTransform: "uppercase" }}>{title}</div>
    <div>{children}</div>
  </div>
);

const IC = ({ func, caption }) => (
  <div style={{ padding: "10px 0 30px" }}>
    <span
      style={{
        fontFamily: F.sans,
        fontSize: 11,
        fontWeight: 700,
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

const Cap = ({ children }) => (
  <div style={{ fontFamily: F.sans, fontSize: 13, color: C.muted, lineHeight: 1.55, margin: "8px 0 28px", fontStyle: "italic" }}>
    {children}
  </div>
);

const Photograph = ({ src, alt, caption, credit, href }) => (
  <figure style={{ margin: "32px 0" }}>
    {src ? (
      <img
        src={src}
        alt={alt || ""}
        loading="lazy"
        style={{ width: "100%", height: "auto", borderRadius: 4, display: "block", border: `1px solid ${C.line}` }}
      />
    ) : (
      <div style={{ width: "100%", aspectRatio: "3/2", background: C.bgCard, border: `1px dashed ${C.rule}`, display: "flex", alignItems: "center", justifyContent: "center", color: C.muted, fontFamily: F.sans, fontSize: 13, fontStyle: "italic" }}>
        [photograph placeholder — see caption]
      </div>
    )}
    <figcaption style={{ fontFamily: F.sans, fontSize: 13, lineHeight: 1.6, color: C.muted, marginTop: 10 }}>
      {caption}
      {credit && (
        <span style={{ display: "block", marginTop: 4, fontSize: 11, color: C.muted, letterSpacing: "0.04em" }}>
          Photograph: {href ? <a href={href} style={{ color: C.accent, textDecoration: "none" }}>{credit}</a> : credit}
        </span>
      )}
    </figcaption>
  </figure>
);

const BR = () => (
  <div style={{ textAlign: "center", margin: "44px 0", color: C.accent, fontSize: 18, letterSpacing: 8, fontFamily: F.serif }}>
    ❧
  </div>
);

const Code = ({ children }) => (
  <pre style={{ background: C.bgCard, border: `1px solid ${C.rule}`, padding: "16px 20px", overflow: "auto", fontFamily: F.mono, fontSize: 13, lineHeight: 1.5, margin: "20px 0" }}>
    <code>{children}</code>
  </pre>
);

/* ═══════════════════════════════════════════════════════════════ */
/*  HERO                                                           */
/* ═══════════════════════════════════════════════════════════════ */

const Hero = () => (
  <svg viewBox="0 0 1200 700" style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}>
    <defs>
      <linearGradient id="hgSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0E2438"/>
        <stop offset="55%" stopColor="#27506E"/>
        <stop offset="100%" stopColor="#A87E4A"/>
      </linearGradient>
      <linearGradient id="hgWater" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1B4360"/>
        <stop offset="100%" stopColor="#08182A"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="700" fill="url(#hgSky)"/>
    {/* Far shore (Fife) silhouette */}
    <path d="M 0 380 Q 200 372 380 378 Q 560 384 760 376 Q 940 370 1200 380 L 1200 410 L 0 410 Z" fill="#0E2438" opacity="0.7"/>
    {/* Water */}
    <rect x="0" y="410" width="1200" height="290" fill="url(#hgWater)"/>
    {/* Setting sun */}
    <circle cx="930" cy="365" r="42" fill="#E2B068" opacity="0.85"/>
    <circle cx="930" cy="365" r="58" fill="#E2B068" opacity="0.20"/>
    {/* Sun reflection on water */}
    <ellipse cx="930" cy="430" rx="120" ry="6" fill="#C09060" opacity="0.55"/>
    <ellipse cx="930" cy="460" rx="160" ry="4" fill="#C09060" opacity="0.30"/>
    <ellipse cx="930" cy="495" rx="200" ry="3" fill="#C09060" opacity="0.18"/>
    {/* Water ripples */}
    {[440,470,500,530,560,590,620,650].map((y,i)=>(
      <line key={i} x1={120 + (i*13)%80} y1={y} x2={1080 - (i*17)%60} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="0.7"/>
    ))}
    {/* Newhaven foreshore — building silhouettes */}
    <g transform="translate(0,440)">
      <rect x="100" y="-30" width="60" height="30" fill="#0A1622"/>
      <polygon points="100,-30 130,-50 160,-30" fill="#0A1622"/>
      <rect x="180" y="-40" width="80" height="40" fill="#0A1622"/>
      <polygon points="180,-40 220,-60 260,-40" fill="#0A1622"/>
      <rect x="280" y="-25" width="50" height="25" fill="#0A1622"/>
      {/* Lighthouse */}
      <rect x="350" y="-70" width="14" height="70" fill="#0A1622"/>
      <rect x="346" y="-78" width="22" height="10" fill="#0A1622"/>
      <circle cx="357" cy="-75" r="4" fill="#E2B068" opacity="0.9"/>
      <rect x="380" y="-30" width="60" height="30" fill="#0A1622"/>
      <rect x="460" y="-35" width="70" height="35" fill="#0A1622"/>
      <polygon points="460,-35 495,-55 530,-35" fill="#0A1622"/>
      <rect x="550" y="-28" width="55" height="28" fill="#0A1622"/>
      {/* Church tower */}
      <rect x="620" y="-60" width="20" height="60" fill="#0A1622"/>
      <polygon points="618,-60 630,-80 642,-60" fill="#0A1622"/>
      <rect x="660" y="-30" width="80" height="30" fill="#0A1622"/>
      <rect x="760" y="-40" width="100" height="40" fill="#0A1622"/>
      <polygon points="760,-40 810,-58 860,-40" fill="#0A1622"/>
      <rect x="880" y="-25" width="120" height="25" fill="#0A1622"/>
      <rect x="1020" y="-30" width="60" height="30" fill="#0A1622"/>
    </g>
    {/* Pier line */}
    <line x1="350" y1="440" x2="450" y2="450" stroke="#0A1622" strokeWidth="3"/>
    {/* Tiny boat */}
    <g transform="translate(700,500)">
      <path d="M -10 0 L 10 0 L 8 5 L -8 5 Z" fill="#0A1622"/>
      <line x1="0" y1="0" x2="0" y2="-12" stroke="#0A1622" strokeWidth="0.8"/>
    </g>
    {/* Reference ticks at base — mile-scale */}
    <g stroke="#1a2a3a" strokeWidth="0.6">
      <line x1="80" y1="680" x2="1120" y2="680"/>
      {Array.from({ length: 21 }).map((_, i) => (
        <line key={i} x1={80 + i * 52} y1={i % 5 === 0 ? 672 : 676} x2={80 + i * 52} y2="680"/>
      ))}
    </g>
    <text x="600" y="696" fill="#5a6a7a" fontSize="10" textAnchor="middle" fontFamily={F.mono}>
      the Forth, measured
    </text>
  </svg>
);

/* ═══════════════════════════════════════════════════════════════ */
/*  MAIN                                                           */
/* ═══════════════════════════════════════════════════════════════ */

export default function NewhavenStarbankRoadHistory() {
  return (
    <article style={{ background: C.bg, minHeight: "100vh", margin: 0, padding: 0 }}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0}body{background:${C.bg}}article a{color:${C.accent}}`}</style>

      {/* Top strip */}
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
        Mode: Encyclopaedic&nbsp; · &nbsp;Category: History of a Place
      </div>
      <div style={{ height: 4, background: C.accent }} />

      {/* HERO */}
      <div style={{ position: "relative", minHeight: "78vh", overflow: "hidden", background: C.navy }}>
        <Hero />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            minHeight: "78vh",
            padding: "60px 40px 50px",
          }}
        >
          <div
            style={{
              fontFamily: F.sans,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "#E2B068",
              marginBottom: 16,
            }}
          >
            ◆ HISTORICAL REFERENCE · EDINBURGH
          </div>
          <h1
            style={{
              fontFamily: F.head,
              fontWeight: 900,
              fontSize: "clamp(36px,5vw,68px)",
              color: "#fff",
              lineHeight: 1.05,
              maxWidth: 980,
              marginBottom: 20,
            }}
          >
            Newhaven and Starbank Road
          </h1>
          <p
            style={{
              fontFamily: F.serif,
              fontStyle: "italic",
              fontSize: "clamp(16px,1.9vw,21px)",
              color: "rgba(255,255,255,0.86)",
              maxWidth: 760,
              lineHeight: 1.5,
              marginBottom: 26,
            }}
          >
            A royal shipyard, a fishing village, a Victorian seafront — five centuries on the south shore of the
            Firth of Forth, read along a single Edinburgh road.
          </p>
          <div
            style={{
              fontFamily: F.sans,
              fontSize: 12,
              color: "rgba(255,255,255,0.5)",
              maxWidth: 480,
              lineHeight: 1.4,
              alignSelf: "flex-end",
              textAlign: "right",
            }}
          >
            Sun setting over the Forth from the Newhaven foreshore. The lighthouse on the harbour pier and the
            spire of the Free Church mark the village; the pale line behind is the coast of Fife.
          </div>
        </div>
      </div>

      {/* BODY */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "60px 24px 80px" }}>

        <DC>{`Newhaven is a fragment — a few streets, a small harbour, a steep slope of Victorian villas — wedged between Granton and Leith on the south shore of the Firth of Forth. From Starbank Road, which runs along its seafront like a spine, the place can be read as a layered text: a royal shipyard founded in 1504 by James IV; a fishing village granted to a Drummond laird in 1556; the home of the women whose striped petticoats and creels were among the first working subjects ever photographed; a Victorian middle-class enclave laid out in the 1860s; and, since June 2023, the eastern terminus of the Edinburgh tram line. The buildings overlap in date, in purpose, in degrees of survival. This article walks the ground as a reference: who built what, when, and why the place looks the way it does.`}</DC>

        <P>{`The argument throughout is that Newhaven is best understood not as a single thing — fishing village, suburb, ferry port — but as a sequence of overwritten attempts to use one stretch of deep-water coast. The royal shipyard of 1504 was abandoned within a generation. The fishing village it left behind survived almost intact for three centuries, then was caught up in the Victorian expansion of Edinburgh and partly rebuilt above its old foreshore. The fishery declined in the twentieth century and the village's stone houses were progressively listed, demolished, infilled, or reused. What remains is a palimpsest. Starbank Road runs along the upper edge of it.`}</P>

        <BR />

        <Sec n="1" title="The shore before the haven">
          <P>{`The coast that became Newhaven was, until the early sixteenth century, an unremarkable stretch of foreshore in the parish of North Leith, with the older parish of Wardie immediately to the west. The ground rises steeply from the water — a narrow shelf below a slope — and the small Pow Burn (the older Scots word for a slow tidal stream) once entered the Forth at a point now marked by the area still called Anchorfield. Pre-medieval activity here is hard to specify. The Royal Commission on the Ancient and Historical Monuments of Scotland (RCAHMS), now Historic Environment Scotland (HES), records the area under several Canmore identifiers: the harbour itself is recorded as <a href="https://canmore.org.uk/site/52204">Canmore ID 52204</a>, the chapel of St James and St Mary as <a href="https://canmore.org.uk/site/52217">Canmore ID 52217</a>, with adjacent records for buildings on Fishmarket Square and Main Street. National Records of Scotland (NRS) preserve royal feu charters relating to the holding of the lands from the early 1500s onward.`}</P>

          <P>{`Earlier still, the broader district of Wardie — a small parish later absorbed into North Leith — held lands granted in the medieval period to the Knights Templar, and after the suppression of the Order in 1312 to the Knights Hospitaller. "Templar lands" appear on Edinburgh Council title deeds as late as the nineteenth century in this area, a small antiquarian curiosity that points to a longer settlement history than the documentary record otherwise suggests. Anchorfield, just west of Newhaven, retained the imprint of an older shoreline community before the harbour was built: a cluster of fishermen's houses, a freshwater spring, and the Pow Burn itself, which drove a small mill for a time. None of this survives above ground. The slope above is now occupied by Starbank Park and the streets of Trinity, but the toponymy preserves the layer underneath.`}</P>

          <SB title="On naming">
            <P>{`The name <em>Newhaven</em> is precisely what it sounds like: a new haven. The contrast was with the old haven of Leith, a mile to the east, whose harbour had served Edinburgh since at least the twelfth century. Newhaven has been called, in early documents, "Novus Portus de Leith" and "Our Lady's Port of Grace" — the latter from the chapel dedicated to the Virgin and St James that stood on the foreshore. The chapel is the reason fishermen here were said to belong to the "Society of Free Fishermen of Newhaven", a corporate body whose origins in the late medieval guild structures are obscure but documented from the seventeenth century onward.`}</P>
          </SB>
        </Sec>

        {/* TIMELINE */}
        <NewhavenTimeline />
        <Cap>Figure 1. A one-page chronology of Newhaven from its royal foundation to the arrival of the trams. Most of the sixteenth-century fabric is gone; most of the nineteenth-century fabric remains.</Cap>

        <Sec n="2" title="James IV and the founding (1504)">
          <P>{`The decisive moment in Newhaven's history is its foundation as a royal harbour by James IV of Scotland in 1504. The king's stated intention was to build a deep-water haven for the construction of warships — vessels too large for the existing harbour at Leith, whose shallows and exposed approach made the launching of major hulls difficult. The choice of Newhaven was strategic in three respects. First, the foreshore offered genuinely deep water close inshore, owing to a steep submarine drop-off. Second, the site was less directly exposed than Leith to a hostile English fleet entering the Forth — Leith had been burned in the past and would be again, notably in 1544 during the "Rough Wooing" under the Earl of Hertford. Third, the location was conveniently close to the royal palace at Holyrood, just over two miles south, allowing the king to inspect his shipyard with relative ease.`}</P>

          <P>{`Royal expenditure on the new harbour appears in the <em>Accounts of the Lord High Treasurer of Scotland</em> (the Treasurer's Accounts), the principal manuscript record of crown spending in the period. Volume II of the printed edition (ed. Thomas Dickson, 1900) records payments from 1504 onward for shipwrights, oak timber from Fife and the Borders, ironwork from Stirling, and pitch and cordage. The royal feu charter formalising Newhaven's status — granting lands and certain privileges to the burgh of Edinburgh in connection with the harbour — is conventionally dated to 1505 and is preserved in the Edinburgh charter records. The town's relationship to the harbour was contested almost from the beginning: in 1510 the burgh of Leith disputed the privileges granted to Newhaven, in a long-running quarrel that was not finally settled for centuries.`}</P>

          <P>{`The harbour itself, in its first form, was a wet dock — a basin enclosed by a stone pier, capable of holding water at a useable level through the tidal cycle. Its precise dimensions and configuration are not recoverable from the surviving documents. Later harbour works overwrote it. The most that can be said is that the 1504 dock occupied roughly the position of the present inner basin and that the original masonry, where it survives, is buried within later structures.`}</P>

          <Callout title="Why Newhaven, not Leith?" type="info">
            The standard explanation — deep water, defensibility, royal proximity — is given in essentially every secondary account from <em>The Old Statistical Account of Scotland</em> (Sinclair, 1791-99) onward. It is plausible but worth noting that the documentary basis is largely inferential: the king's reasoning is reconstructed from his pattern of expenditure rather than from any surviving statement of intent. Macdougall (1989) lays out the case carefully.
          </Callout>
        </Sec>

        <Sec n="3" title="The Great Michael (1511)">
          <P>{`Newhaven's place in Scottish historical memory rests, more than anything else, on a single ship. The <em>Great Michael</em> was laid down at the Newhaven shipyard in 1507 and launched on 12 October 1511. By contemporary report — much repeated, with varying accuracy, ever since — she was the largest warship in Europe at her launching, displacing the previous claimant, England's <em>Mary Rose</em> of 1511, and herself displaced only by the English <em>Henri Grâce à Dieu</em> of 1514. Her construction is associated with three names: the Bartons — Robert and Andrew, brothers of an established Leith merchant-pirate family — and Sir Andrew Wood of Largo, the Forth's senior naval commander, whose role was operational rather than design.`}</P>

          <P>{`The dimensions of the <em>Great Michael</em> are contested in the literature. The single most-repeated figure derives from John Knox's <em>History of the Reformation in Scotland</em>, written in the 1550s-60s and first printed in full by David Buchanan in 1644 — that the ship was 240 feet long and that her construction "wasted all the woods of Fife". Knox is a primary source in the limited sense that he was alive in living memory of the launch, but he wrote half a century later and was not a naval specialist. Modern naval historians have treated his figures with caution. Norman Macdougall, in <em>James IV</em> (1989), presents the conventional summary: a hull length of about 240 feet (73 metres), a beam of 36 feet (11 metres), a tonnage somewhere around 1,000 tons burthen, an armament of 24 to 27 cannon plus smaller pieces, and a crew of some 300 sailors and 1,000 soldiers and gunners. N.A.M. Rodger, in <em>The Safeguard of the Sea</em> (1997), is more sceptical, suggesting the surviving evidence does not allow firm dimensions and that some of the standard figures are likely to be inflated.`}</P>

          <GreatMichaelComparison />
          <Cap>Figure 3. Comparative tonnage. The Great Michael's figures are best-attested by Knox (writing 50 years after the launch); Rodger and other modern naval historians treat several of these numbers as contested. Bars marked with ? carry a contested-figure flag.</Cap>

          <P>{`What is not in serious dispute is that the ship was unusually large for her time and that her construction taxed the kingdom's resources to an unusual degree. Knox's claim about the woods of Fife may be a literary flourish, but the Treasurer's Accounts show payments for timber from a wide range of sources, including imports from the Baltic, which suggests that domestic supply was indeed strained. The ship's career was brief and inglorious: she sailed against the English in 1513, took no significant part in any action, and after the Scottish disaster at the Battle of Flodden in September 1513 — in which James IV himself was killed — the new regency government had little use for an expensive prestige vessel. She was sold to the French king Louis XII in 1514 for 40,000 livres and quietly disappeared from the records, probably broken up at Brest within a few years. Her name survived; her timbers did not.`}</P>

          <PQ>
            "She wasted all the woods of Fife, except Falkland Wood, by-and-besides the timber that came out of Norway."
            <div style={{ fontFamily: F.sans, fontStyle: "normal", fontSize: 13, color: C.muted, marginTop: 12 }}>
              — John Knox, <em>History of the Reformation in Scotland</em> (composed 1550s-60s, first full printing 1644).
            </div>
          </PQ>

          <SB title="Who built her?">
            <P>{`The shipwright is conventionally given as Jacques Terrell — a French master shipwright in royal service — assisted by a Scottish team led by Sir Andrew Wood. The Bartons (Robert, Andrew, and a third brother John) were the merchant-naval contractors. Andrew Barton would be killed in 1511 in a separate engagement off the Downs, on the south English coast, by Edward Howard's squadron — an action sometimes described as the proximate cause of the Anglo-Scottish drift toward war that culminated at Flodden. The Newhaven shipyard itself does not appear to have produced any other vessel of comparable size; after the Great Michael's sale to France, royal shipbuilding shifted elsewhere or ceased.`}</P>
          </SB>
        </Sec>

        <Photograph
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Newhaven_Harbour%2C_Edinburgh.jpg/1280px-Newhaven_Harbour%2C_Edinburgh.jpg"
          alt="Newhaven harbour, Edinburgh"
          caption="The inner basin at Newhaven, looking east toward the lighthouse. The fishing fleet that worked from this harbour disappeared in the second half of the twentieth century; the masts now belong to leisure craft."
          credit="Wikimedia Commons (CC licence — attribution as recorded on file page)"
          href="https://commons.wikimedia.org/wiki/File:Newhaven_Harbour,_Edinburgh.jpg"
        />

        <Sec n="4" title="Fishing village, sixteenth–eighteenth centuries">
          <P>{`After the brief royal-shipyard period, Newhaven settled into a fishing village. In 1556 the harbour and its lands were granted by Mary of Guise, the regent for the young Mary Queen of Scots, to Sir Robert Drummond of Carnock, master of works to the crown — a gift recorded in the <em>Register of the Privy Seal of Scotland</em>. The grant transferred operational control from the burgh of Edinburgh to a private hand, and although Edinburgh continued to claim certain rights, the Drummonds and their successors held the principal interest for some decades. The village was, in administrative terms, peculiar: it lay within the parish of North Leith but was not formally part of the burgh of Leith, nor part of the burgh of Edinburgh, nor a burgh in its own right. This anomalous status would persist into the nineteenth century and is part of why Newhaven's population developed a strong sense of separateness.`}</P>

          <P>{`The fishery was diversified. Mussels and oysters were dredged from the Forth's beds — which were extensive into the late nineteenth century, before pollution and overfishing collapsed them; herring was caught in the seasonal runs that swept down the east coast in summer; white fish (haddock, cod, ling, whiting) were taken on long-line gear in the deeper waters offshore. The village's most distinctive activity was the carrying of live fish to Edinburgh — particularly to the Old Fishmarket Close in the Old Town — by women from Newhaven, who walked the two and a half miles up the slope each morning with their creels on their backs. This was the genesis of the figure who would become one of the most-photographed working women of the nineteenth century: the Newhaven fishwife.`}</P>

          <P>{`The <em>Old Statistical Account of Scotland</em>, edited by Sir John Sinclair from parish-minister returns gathered between 1791 and 1799, gives the most detailed late-eighteenth-century snapshot of the village. The minister of North Leith reported on Newhaven's distinct dialect (a Scots that preserved older forms longer than surrounding areas), distinct dress (the striped petticoat already noted as characteristic), and distinct trades (oyster-dredging in particular). The follow-up <em>New Statistical Account</em> of 1845, written half a century later, repeats and updates many of the same observations. Both volumes are accessible online via the University of Edinburgh's <a href="https://stataccscot.edina.ac.uk/static/statacc/dist/home">Statistical Accounts of Scotland</a> portal.`}</P>

          <Callout title="A village apart" type="info">
            Several nineteenth- and twentieth-century writers — including Tom Mackenzie, whose <em>Newhaven and the Newhaven Fishermen</em> (1934) is one of the few full-length local histories — emphasised that Newhaveners married overwhelmingly within the village. The community's relative endogamy, the persistence of distinctive surnames (Carnegie, Hall, Liston, Wilson, Logan, Ramsay), and the shared fishing rights underpinned a sense of corporate identity that survived well into the twentieth century. How distinct the dialect actually was is harder to verify; the claim has been repeated since Sinclair, but rigorous dialectological study post-dates the period of greatest difference.
          </Callout>
        </Sec>

        <Photograph
          src=""
          alt="Hill & Adamson calotype of Newhaven fishwife"
          caption="A Newhaven fishwife photographed by David Octavius Hill and Robert Adamson, c.1845. The striped petticoat, the creel, and the distinctive cuffed sleeves were already iconic by the time the calotype was made; the photograph helped fix the image in nineteenth-century imagination."
          credit="Hill &amp; Adamson, c.1843–47 — National Galleries of Scotland (public domain via Wikimedia Commons)"
          href="https://commons.wikimedia.org/wiki/Category:Newhaven_fishwives"
        />

        <Sec n="5" title="The fishwives">
          <P>{`Newhaven's most famous export was not herring but a figure: the Newhaven fishwife, in her striped petticoats and shawl, with a heavy wicker creel of fish on her back, calling her wares through the streets of Edinburgh. The image enters the cultural record from at least the late eighteenth century — Sir Walter Scott refers to it in passing — and is fixed by the early nineteenth in poetry, painting, and, decisively, photography.`}</P>

          <P>{`Lady Carolina Nairne's song "Caller Herrin'" — written in the 1820s, set to music attributed to Niel Gow's son Nathaniel — is the locus classicus. The song's chorus ("Wha'll buy my caller herrin'? / They're bonny fish and halesome farin'") sentimentalises the fishwife's cry into a parlour ballad, and helped to fix the figure in middle-class Scottish imagination. The Edinburgh genre painter Walter Geikie (1795-1837) made a number of sketches and watercolours of Newhaven fishwives in the 1820s and 1830s, which survive in the National Galleries of Scotland. They are the earliest visual records of any precision.`}</P>

          <P>{`The most consequential representation, however, came from photography. In 1843 the Edinburgh painter David Octavius Hill (1802-1870) and the chemist Robert Adamson (1821-1848) opened a calotype studio at Rock House on Calton Hill. Their original purpose was to produce reference portraits for Hill's enormous painting commemorating the Disruption of the Church of Scotland — the schism of May 1843 in which 474 ministers walked out of the General Assembly to form the Free Church. But Hill and Adamson rapidly extended their work to other subjects, and from 1843 onward they made a substantial series of calotypes of Newhaven fishwives, fishermen, and harbour scenes. The series ran until Adamson's early death in 1848.`}</P>

          <P>{`These are among the earliest photographs of working-class women anywhere in the world. The portraits are technically remarkable — calotypes have a soft, painterly quality that contrasted with the sharp daguerreotypes more common in the period — and ethnographically significant: they fix, with documentary precision, the dress, the equipment, the postures, and the faces of a working community at the moment before steam, the railway, and Victorian industry began to transform it. The National Galleries of Scotland holds the principal collection and has digitised much of it; many images are also available via Wikimedia Commons under public-domain release. The most-reproduced image — sometimes referred to as <em>Newhaven Fishwives</em> or by individual sitters' names where these are recorded — shows three women with creels, in three-quarter view, against a plain backdrop. Their names, where preserved, include Mrs Hall, Mrs Carnegie, and Mrs Logan.`}</P>

          <SB title="On the fishwife's etymology — a caution">
            <P>{`A persistent folk-history claim holds that the cry "caller herrin'!" is derived from Gaelic <em>caillich</em> ("old woman"). This is not supported by linguistic evidence. The Scots adjective <em>caller</em> means "fresh" — applied to fish, water, or air — and is recorded in this sense from the sixteenth century. It derives from Middle English <em>calwer</em> ("cool"), itself of obscure ultimate origin, and is unrelated to the Gaelic word. The error has appeared in several twentieth-century guidebook accounts and should be treated with scepticism. The <em>Dictionary of the Scots Language</em> (DSL) gives the standard etymology.`}</P>
          </SB>
        </Sec>

        <BR />

        <Sec n="6" title="The harbour">
          <P>{`The harbour as a structure has been rebuilt three times. The original 1504 wet dock — its precise plan unknown — was a relatively simple stone-walled basin sufficient for the warship-building period and, later, for the fishing fleet. By the early nineteenth century it was inadequate, both in size and in condition. The civil engineer John Rennie the Elder (1761-1821), whose works on Scottish harbours include Leith, Aberdeen, and the chain pier at Trinity (just west of Newhaven), was commissioned to remodel the Newhaven harbour. The Rennie works were carried out in 1815 and produced something close to the configuration visible today: an inner basin enclosed by a substantial outer pier, with a separate west pier and a narrow harbour mouth.`}</P>

          <P>{`Further extensions followed in the second half of the century. The most substantial works took place between 1864 and 1879, when an outer pier and breakwater were added to provide more sheltered anchorage and to accommodate the steam-powered fishing vessels that were beginning to displace the older sailing craft. The harbour lighthouse on the pier-head, in its present form, dates from the late nineteenth century and replaced an earlier light. Stevenson family engineering records — the Stevensons being the dominant Scottish lighthouse and harbour-engineering dynasty of the period — touch on Newhaven repeatedly, although the principal Stevenson commissions in the firth were elsewhere (notably Bell Rock, Inchkeith, and the chain piers).`}</P>

          <P>{`Just west of Newhaven, at Trinity, stood for most of the nineteenth century a remarkable structure: the <em>Trinity Chain Pier</em>, a suspension pier opened in 1821 to designs by Captain Samuel Brown RN, the engineer responsible for several early suspension bridges in Britain. The chain pier was approximately 500 feet long, projecting into deep water on iron suspension chains, and was used by a regular ferry service carrying passengers across the Forth to Fife. It was a technological curiosity and a popular attraction, rendered in numerous prints and watercolours of the period. A succession of storms damaged the structure repeatedly, and on 17 October 1898 it was destroyed by an exceptional north-westerly gale. It was never rebuilt. The site is now the Trinity foreshore, with an informal memorial. The pier's loss closes one chapter of the Forth's nineteenth-century engineering optimism.`}</P>
        </Sec>

        <HistoricalMap />
        <Cap>Figure 2. A schematic map of the Newhaven foreshore. Starbank Road, the dashed amber line, runs from Granton in the west to the harbour in the east. Crosses mark lost structures — the chain pier and the original parish church most prominent among them. The harbour basin, in two stages of expansion, sits at the centre.</Cap>

        <Photograph
          src="https://images.unsplash.com/photo-1580716213069-e8df95dc7e7d?w=1600&q=80"
          alt="Forth Estuary, Edinburgh"
          caption="Looking north across the Firth of Forth from the slope above Newhaven. The pale line on the horizon is the coast of Fife; the deeper water inshore — never as deep as Leith's roadstead but free of its shoaling — was the original reason James IV chose the site."
          credit="Unsplash"
          href="https://unsplash.com/?utm_source=dsl&utm_medium=referral"
        />

        <Sec n="7" title="Starbank Road and Victorian Newhaven">
          <P>{`Starbank Road as a defined street is essentially a Victorian creation. Before the mid-nineteenth century, the slope above the village foreshore was largely unbuilt — fields, scattered cottages, the older Anchorfield settlement, and the grounds of Starbank House and a few other early-nineteenth-century gentlemen's villas. From the 1860s onward, the slope was systematically developed as a Victorian middle-class enclave, with rows of stone-fronted villas and tenements arranged along a road that climbed gently from the western edge of the village toward Trinity and Wardie. The road's name comes from Starbank House (which itself takes its name from "the bank with a view of stars" — i.e. an unobstructed seaward outlook).`}</P>

          <P>{`Starbank House itself — the principal early house on the slope — is given various dates in the secondary literature. The Buildings of Scotland: <em>Edinburgh</em> volume (Pevsner / John Gifford et al., 1984) places it as early-nineteenth-century, with conventional citation of c.1815. HES Canmore lists the house with a Category B listing and notes its early-nineteenth-century date but is cautious about a precise year, and the structure has been altered. Some sources offer 1820 or even slightly earlier; <strong>the precise year is contested</strong> and the secondary literature is not consistent. What is well-established is that the house pre-dates the Victorian development of the slope and that it gave its name to the road, the park, and the inn.`}</P>

          <P>{`<em>Starbank Park</em> is the most public element of this Victorian landscape. The grounds were gifted to the City of Edinburgh by the Edinburgh advocate James Cleghorn in 1887, on condition that they be opened to the public. The park was laid out and formally opened to the public in 1894. The walled upper terrace, with its formal beds and views across the Forth to Fife, is the principal feature; the lower lawn descends toward Starbank Road. The park is now a designation of national importance for its preserved Victorian-era plan and is maintained by the City of Edinburgh Council with input from the Friends of Starbank Park, a community body that has been active since the 2010s.`}</P>

          <P>{`<em>The Starbank Inn</em>, on Laverockbank Road at the corner with Starbank Road, has functioned as a hostelry on the same site for the better part of two centuries. The present building is mid- to late-nineteenth-century, although the licence is older. The inn's seaward aspect — wide windows looking north over the Forth — has made it a fixed point in the social life of the area; in the late twentieth century it became known particularly as a real-ale and seafood pub, and it remains in that role.`}</P>

          <P>{`The Victorian housing along Starbank Road and the streets that climb the slope (Laverockbank, East and West Trinity Roads, Trinity Crescent) is mostly stone-fronted, two- and three-storey, with bay windows on the seaward elevation and small front gardens. Several individual buildings carry HES listings; the area as a whole is within the Trinity Conservation Area, designated in 1976. RCAHMS / HES Canmore records under the umbrella of "Newhaven Burgh Survey" preserve building-by-building photographs and notes from successive surveys.`}</P>

          <SB title="A note on dates">
            <P>{`Where the present article gives a c.1815 date for Starbank House, the figure should be read with the secondary-literature caveat above: the house is early-nineteenth-century but a precise founding year is not well-established. Where this article gives 1887 for the Cleghorn gift and 1894 for the public opening of Starbank Park, both figures derive from Edinburgh Council parks records and are considered well-attested. The Trinity Conservation Area's 1976 date is from Edinburgh Council's published designation register.`}</P>
          </SB>
        </Sec>

        <Sec n="8" title="Religious life">
          <P>{`Newhaven's nineteenth-century religious life mirrors the broader fault-lines of Scottish Presbyterianism. The earliest meaningful provision was a mission station of the Church of Scotland, established in 1837 in response to the village's anomalous parish position: technically part of North Leith parish, but isolated from it. A purpose-built chapel — the <em>Newhaven Old Parish Church</em> — was completed in 1838 and stood on Main Street near the harbour. It was a plain, classical building in the Reform Presbyterian tradition; HES Canmore preserves photographs of it.`}</P>

          <P>{`The Disruption of May 1843, in which Thomas Chalmers led 474 ministers and a substantial body of laity out of the General Assembly to form the Free Church of Scotland, immediately produced a parallel structure. The <em>Newhaven Free Church</em> was established within months of the Disruption and built shortly afterwards. The Free Church drew heavily on the village's fishing population — Free Church preaching and the dignity it accorded to working communities had particular purchase here — and the church remained a strong institutional presence for the rest of the century. Its building survives, in altered form. Following the 1929 union of the Free Church (or rather, the United Free Church) with the Church of Scotland, the building changed denominational hands, has had several twentieth-century uses, and is now in residential / community-conversion use; HES Canmore records track these changes.`}</P>

          <P>{`A small Episcopalian community — <em>St James's Episcopal Church</em>, on Main Street — supplemented the Presbyterian provision from the mid-nineteenth century. Its congregation was always small. The Mission to Seamen (now the Mission to Seafarers) operated a station near the harbour for much of the late nineteenth and twentieth centuries, providing temporal and spiritual care to sailors of any denomination passing through; the building has since been converted to other uses but the inscription survives on the lintel.`}</P>

          <P>{`The most significant loss is the <em>Old Parish Church of 1838</em>. By the mid-twentieth century the building had fallen into structural disrepair and the surrounding houses were under slum-clearance pressure. The church was demolished in 1966. Its bell, sundial, and some architectural fragments were preserved; a memorial garden marks the site. The demolition is, for many in the village's memory, the symbolic moment when the older Newhaven was lost.`}</P>
        </Sec>

        <Photograph
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Newhaven_lighthouse%2C_Edinburgh.jpg/1280px-Newhaven_lighthouse%2C_Edinburgh.jpg"
          alt="Newhaven lighthouse on the harbour pier"
          caption="The harbour-pier lighthouse at Newhaven, in its late-nineteenth-century form. The structure replaced an earlier light and is the most easily identifiable element of the village from across the Forth."
          credit="Wikimedia Commons (public domain or CC — see file page)"
          href="https://commons.wikimedia.org/wiki/Category:Newhaven_Lighthouse,_Edinburgh"
        />

        <Sec n="9" title="Decline of the fishing fleet">
          <P>{`The Newhaven fishing fleet reached its peak in the second half of the nineteenth century, when the Forth and the wider east-coast fishery were among the most productive in Europe. The herring fishery was the dominant activity; white-fish long-lining and the older mussel-and-oyster work continued alongside. Steam drifters began to displace sailing luggers from the 1880s onward. The fleet was substantial: contemporary photographs from the 1890s and 1900s show the harbour packed with masts, with shore-side curing yards, smokehouses, and net-mending sheds occupying every available square yard.`}</P>

          <P>{`The First World War broke this. Fishing vessels were requisitioned for naval auxiliary duty (minesweeping in particular) and many were lost. Crews entered naval service. The post-1918 fleet returned diminished, and the inter-war years saw structural decline: the herring market collapsed in the late 1920s and early 1930s with the loss of the Russian and Baltic markets after 1917 and the Depression after 1929. By 1939 the village's fleet was a fraction of its 1900 size. The Second World War repeated the requisition pattern and reduced it further.`}</P>

          <P>{`The post-1945 transition was steady and decisive. Diesel replaced steam, vessels grew larger and were moored in larger ports (Eyemouth, Pittenweem, Peterhead). The Newhaven harbour, never deep enough for the largest modern boats, became progressively a part-time fishing base and increasingly a leisure marina. The <em>Newhaven Fish Market</em> on Pier Place — the building that had handled the daily landing and auction of the Forth's catch since the 1890s — closed; the building itself, a plain late-Victorian shed, was retained and given new uses (see §11). The last commercial fishing boats registered at Newhaven operated into the 1990s; the precise year of the final commercial landing is given variously in different secondary sources and should be treated as uncertain. By 2000 the fleet was effectively gone.`}</P>

          <Callout title="On the last boat" type="info">
            Several local-history accounts identify the last Newhaven-registered commercial fishing boat as a small inshore vessel that ceased landings in the late 1990s; precise year and vessel name vary between sources. HES Canmore does not record the closure as a single event. The matter is subject to the kind of memory-testing where local recollection differs from documentary record.
          </Callout>
        </Sec>

        <Sec n="10" title="The twentieth century — the long quiet">
          <P>{`Newhaven's twentieth century was, until very recently, a long withdrawal from prominence. The fishing-village period ended; the Victorian middle-class period had its character partly preserved on the slope above and partly eroded along the foreshore. The village proper — the cluster of small fishermen's houses on the lanes between Main Street and the harbour — came under sustained pressure from Edinburgh's slum-clearance programmes from the 1930s onward, accelerating in the 1950s and 1960s. Whole streets of small stone cottages were demolished; the population scattered to housing schemes elsewhere in north Edinburgh (Pilton, Muirhouse). The 1966 demolition of the Old Parish Church was emblematic of this period.`}</P>

          <P>{`The new housing built to replace what had been demolished was, by the standards of the 1960s and 1970s, relatively cautious. Several blocks of low-rise council and housing-association flats were inserted along the foreshore, of medium density and of unremarkable architectural quality. They preserved the line of the streets and avoided the large-scale tower blocks that disfigured other parts of north Edinburgh. By the 1980s, with the full architectural-conservation movement under way, the surviving older buildings — particularly along Main Street and the upper lanes — were progressively listed under HES (then Historic Scotland) statutory protection. The Trinity Conservation Area was extended.`}</P>

          <P>{`Starbank Road itself changed comparatively little in this period. The Victorian villas and tenements remained occupied; the road's character — quiet, residential, with a strong seaward outlook — was undisturbed. The Starbank Inn continued to trade. The buses ran along Lower Granton Road and Pier Place. There was, for a long stretch from roughly 1960 to roughly 2000, no large new development on the seafront and no significant change in the social composition of the area.`}</P>
        </Sec>

        <Sec n="11" title="Contemporary Newhaven">
          <P>{`The picture from roughly 2000 onward is one of gradual and then rapid change. The most visible new presence is the residential development at the western end of the foreshore — a series of mid-rise apartment blocks built from the early 2000s onward on the cleared waterfront between Newhaven and Granton, marketed as "Western Harbour" and similar branding. These developments have brought a substantial new resident population to what had been a largely industrial / vacant frontage; the architectural quality is mixed, and the larger blocks have been the subject of recurring debate about scale, sea-views, and the displacement of older communities.`}</P>

          <P>{`The <em>Newhaven Heritage Museum</em>, opened in 1994 in the converted late-Victorian fish market on Pier Place, was for fifteen years the principal site of public memory of the fishing-village period. It held tools, photographs (including reproductions of Hill & Adamson images), oral-history recordings, and a substantial collection of fishwives' costume and creels. It closed in 2009 as part of a wider rationalisation of small museums by the City of Edinburgh Council under post-financial-crisis budget pressure. <strong>Its collection is in store; the building has since been put to other uses; as of 2026, the museum has not reopened</strong> and there is no announced plan to do so.`}</P>

          <P>{`The harbour itself is now a yacht and small-boat marina, with continuing informal mooring of small inshore craft. The fishermen's mission building has been adapted to other uses; the precise reuse has changed several times. Loch Fyne Restaurants operated a seafood restaurant in the converted fish-market building for some years before closing; the building is now in different hospitality use.`}</P>

          <P>{`The most consequential single change of the present generation, however, is the arrival of the trams. The Edinburgh Trams system opened in May 2014 with a line running from York Place in the New Town to Edinburgh Airport. From the outset, an extension northward and east to Newhaven was envisaged, but it was deferred amid cost and political difficulties. Construction of the extension finally began in 2019 and continued through the COVID-19 period, with substantial disruption to Leith Walk and the surrounding streets. The <em>Trams to Newhaven</em> extension opened to passengers on 7 June 2023, with a new tram terminus at the western end of Newhaven (the stop is called "Newhaven"). For the first time since the closure of the older Edinburgh tram system in 1956, the village has a fixed-rail link to the city centre.`}</P>

          <Photograph
            src="https://images.unsplash.com/photo-1565967511849-76a60a516170?w=1600&q=80"
            alt="Modern tram in Edinburgh"
            caption="An Edinburgh tram on the network completed in 2014 and extended to Newhaven on 7 June 2023. The new terminus restored a fixed-rail link to the village for the first time since the closure of the older corporation tramways in 1956."
            credit="Unsplash"
            href="https://unsplash.com/?utm_source=dsl&utm_medium=referral"
          />

          <Callout title="Gentrification" type="warn">
            The combination of the Western Harbour development, the trams, and the broader Edinburgh property market has produced a now-familiar gentrification pattern. House prices on the slope above Starbank Road have risen substantially since 2010; the social composition of the area is shifting; long-standing residents have raised concerns about displacement. Local consultation processes — including for the trams' construction phase and for individual planning applications — have been documented by Edinburgh Council and by the Newhaven and Trinity Community Council. The pattern is well-recognised but not unique to Newhaven.
          </Callout>
        </Sec>

        <Sec n="12" title="Walking Starbank Road today">
          <P>{`Begin at the western end of Starbank Park, where the road meets Lower Granton Road and turns east. The park gates are stone, the railings nineteenth-century, and the upper terrace gives the best single seaward view in the district: the whole sweep of the Forth, with Inchkeith island in the middle distance and the Fife coast a pale line beyond. James Cleghorn's gift of 1887, formally opened to the public in 1894, has worn well; the friends' group keeps the formal beds in good order.`}</P>

          <P>{`Walk east. The road descends gently. On the left, the Forth; on the right, a sequence of stone-fronted Victorian villas, most with bay windows and small front gardens. Several carry HES listings. About a third of the way along, on the right, sits Starbank House itself — a plain, dignified early-nineteenth-century building, set back from the road behind a low wall. The house has been altered. Beyond it, the residential rhythm continues; the houses are mostly two-storey, mostly mid- to late-nineteenth-century, and the street wall is largely unbroken.`}</P>

          <P>{`The Starbank Inn appears on the right, at the corner with Laverockbank Road. The wide windows and the gable form are mid- to late-nineteenth-century. A pub here, in some form, has been a fixed point for the better part of two centuries. Continue east. The road bends slightly with the foreshore. The slope above is the Trinity Conservation Area; the houses become smaller and more closely packed as the road approaches the older village footprint. On the left, occasional glimpses down to the foreshore: the line of stones that marks the original shore before the harbour was extended outward.`}</P>

          <P>{`The Newhaven Free Church, in altered form, comes up on the left or right depending on precisely where the walker steps; the village's lanes intersect the road at angles that make the older orientation hard to read. Beyond, the road becomes Pier Place, and the harbour itself opens out: the lighthouse on the pier-head, the inner basin with its leisure craft, the converted fish-market building, the place where the Old Parish Church stood until 1966. The Newhaven tram terminus is just a short walk west and south of here, on Lindsay Road.`}</P>

          <P>{`What the walk reveals — to the reader who has the periods in mind — is that almost nothing of the 1504 royal-shipyard period is visible above ground; that the fishing-village fabric is a partial survival, listed where it remains; that the Victorian slope is the most coherent single layer; that the late-twentieth-century housing has been absorbed; and that the 2023 trams are a real and visible new layer. The road is short — about half a mile — and the periods overlap on the same hundred metres. Five centuries, mostly in stone, mostly with the Forth as one boundary and the slope of Trinity as the other.`}</P>

          <SB title="Composite-character note">
            <P>{`This article does <em>not</em> include a Tier-2 composite walking character. The walk above is given in a generic register; no individual is invented or quoted. Any reader who has spoken with long-standing Newhaven residents — for instance through the Newhaven Heritage Project's oral-history recordings, when accessible, or via the active community council — can supplement this with first-hand testimony.`}</P>
          </SB>
        </Sec>

        <BR />

        {/* SOURCE INTEGRITY NOTE */}
        <Sec n="13" title="Source Integrity Note">
          <P>{`This article is a historical reference rather than a fieldwork account. Its claims, where specific, can be traced to the following categories of source.`}</P>

          <SB title="Primary archival sources">
            <P>{`<strong>National Records of Scotland (NRS)</strong>: royal feu charters relating to Newhaven from 1505; <em>Register of the Privy Seal of Scotland</em> for the 1556 Drummond grant; the <em>Accounts of the Lord High Treasurer of Scotland</em> (Treasurer's Accounts), particularly Volume II for 1504 onward (printed edition: ed. Thomas Dickson, 1900). NRS catalogues are searchable at <a href="https://catalogue.nrscotland.gov.uk/">catalogue.nrscotland.gov.uk</a>.`}</P>
            <P style={{ marginTop: 12 }}>{`<strong>Historic Environment Scotland (HES) — Canmore</strong>: harbour at Canmore ID 52204; chapel of St James and St Mary at Canmore ID 52217; further records under the Newhaven Burgh Survey. The catalogue is at <a href="https://canmore.org.uk/">canmore.org.uk</a>.`}</P>
            <P style={{ marginTop: 12 }}>{`<strong>Statistical Accounts</strong>: Sinclair (ed.), <em>Old Statistical Account of Scotland</em>, 1791-99, parish of North Leith volume; <em>New Statistical Account</em>, 1845, same parish. Both via <a href="https://stataccscot.edina.ac.uk/static/statacc/dist/home">stataccscot.edina.ac.uk</a>.`}</P>
            <P style={{ marginTop: 12 }}>{`<strong>National Galleries of Scotland</strong>: the Hill & Adamson calotype collection, 1843-48, including the Newhaven series. Catalogue: <a href="https://www.nationalgalleries.org/art-and-artists/features/hill-and-adamson">nationalgalleries.org / hill-and-adamson</a>.`}</P>
          </SB>

          <SB title="Secondary scholarship">
            <P>{`Macdougall, Norman (1989). <em>James IV</em>. East Linton: Tuckwell Press. The standard modern study of the reign and the principal recent treatment of the royal-shipyard period.`}</P>
            <P style={{ marginTop: 8 }}>{`Rodger, N.A.M. (1997). <em>The Safeguard of the Sea: A Naval History of Britain, 660-1649</em>. London: HarperCollins. Sceptical treatment of the Great Michael's dimensions.`}</P>
            <P style={{ marginTop: 8 }}>{`Knox, John (composed 1550s-60s; first full printing ed. David Buchanan, 1644). <em>History of the Reformation in Scotland</em>. Source of the most-quoted contemporary description of the Great Michael; partisan and not a naval specialist.`}</P>
            <P style={{ marginTop: 8 }}>{`Lavery, Brian (1994). <em>Maritime Scotland</em>. London: Batsford / Historic Scotland. Brief comparative discussion of early Scottish naval shipbuilding.`}</P>
            <P style={{ marginTop: 8 }}>{`Gifford, John, McWilliam, Colin & Walker, David (1984). <em>The Buildings of Scotland: Edinburgh</em>. Harmondsworth: Penguin. Standard architectural reference.`}</P>
            <P style={{ marginTop: 8 }}>{`Mackenzie, Tom (1934). <em>Newhaven and the Newhaven Fishermen</em>. Edinburgh: privately printed. Local history of variable reliability but useful for early-twentieth-century memory.`}</P>
            <P style={{ marginTop: 8 }}>{`<em>Dictionary of the Scots Language</em> (DSL), online: <a href="https://dsl.ac.uk/">dsl.ac.uk</a>. Etymology of <em>caller</em>.`}</P>
          </SB>

          <SB title="Online and journalistic sources">
            <P>{`Edinburgh Council parks records (Starbank Park, Cleghorn gift); <em>Edinburgh News</em> archive (<a href="https://www.edinburghnews.scotsman.com/">edinburghnews.scotsman.com</a>) for twentieth-century coverage of the museum, slum clearance, and trams; Wikimedia Commons (Newhaven categories) for image attributions; Edinburgh Trams official site and Council reports for the 2023 extension; Friends of Starbank Park (community body).`}</P>
          </SB>

          <SB title="Items requiring verification or flagged as contested">
            <P>{`<strong>Great Michael dimensions</strong>: the 240-foot length, 36-foot beam, 1,000-ton burthen, and 27 cannon are the conventional figures (Knox, Macdougall) but are not universally accepted; Rodger and others treat them with caution. The figure used in this article is described as the best-attested but contested set, and Figure 3 marks contested values explicitly.`}</P>
            <P style={{ marginTop: 8 }}>{`<strong>Starbank House date</strong>: c.1815 / early-nineteenth-century; the precise year is not securely established and HES Canmore does not give one. The date appears in multiple secondary sources but with variation.`}</P>
            <P style={{ marginTop: 8 }}>{`<strong>Last commercial fishing boat from Newhaven</strong>: late 1990s, but precise year and vessel are subject to competing memory.`}</P>
            <P style={{ marginTop: 8 }}>{`<strong>"Caller herrin'" etymology</strong>: this article rejects the popular Gaelic-derivation claim in favour of the standard Scots etymology recorded in DSL.`}</P>
            <P style={{ marginTop: 8 }}>{`<strong>Pre-1500 settlement at Anchorfield / Pow Burn</strong>: described from local-history sources but with limited documentary anchoring before the sixteenth century.`}</P>
          </SB>

          <SB title="Tier-2 composites">
            <P>{`<em>None used.</em> The §12 walking sequence is given without an invented or composite character. No invented quotes, no invented researchers, no Tier-3 fabricated material has been introduced. Where the agent has reasoned beyond cited material — for instance in synthesising the long arc of decline, or in the reading of the periods overlapping along Starbank Road — these are interpretive observations, not factual claims, and the surrounding language is hedged accordingly.`}</P>
          </SB>

          <SB title="Acknowledged limits of this account">
            <P>{`A serious treatment of Newhaven would benefit from access to the Newhaven Heritage Project's oral-history recordings; from the Edinburgh City Archives' uncatalogued harbour-engineering correspondence (Stevenson and successors); from the Newhaven Free Fishermen's Society records, where extant; and from systematic dialectological survey of the village's surviving older residents. None of these has been consulted directly here. The article is a synthesis from published primary and secondary sources and from the standard online catalogues; field verification of building dates, listings, and current uses would refine and in places correct the account.`}</P>
          </SB>
        </Sec>

      </div>

      {/* FOOTER */}
      <div style={{ background: C.navy, color: "rgba(255,255,255,0.55)", padding: "30px 24px", textAlign: "center", fontFamily: F.sans, fontSize: 12 }}>
        <div style={{ fontFamily: F.head, fontSize: 14, fontWeight: 700, color: "#E2B068", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>
          Encyclopaedic
        </div>
        <div>History · Edinburgh · The Firth of Forth</div>
      </div>
    </article>
  );
}
