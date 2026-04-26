/* --- YAML frontmatter --- */
/*
title: "The Corporate Field Manual"
subtitle: "An in-depth practical reference for AuDHD adults working inside a corporate hierarchy — strengths, frictions, and a navigable toolkit for the politics of office life."
category: "neuroscience"
style: "encyclopaedic"
date: "2026-04-26"
tags: [audhd, autism, adhd, workplace, corporate, career]
*/

const ARTICLE_DATA = {
  title: "The Corporate Field Manual",
  subtitle: "An in-depth practical reference for AuDHD adults working inside a corporate hierarchy — strengths, frictions, and a navigable toolkit for the politics of office life.",
  category: "neuroscience",
  style: "encyclopaedic",
  date: "2026-04-26",
  author: "Matthew Deane",
  tags: ["audhd", "autism", "adhd", "workplace", "corporate", "career"],
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

// ─── VIS 1: STRENGTHS / CHALLENGES MATRIX ────────────────────────────────────
function StrengthsChallengesMatrix() {
  // Each trait sits in one of four quadrants:
  // x: amplified vs suppressed by corporate context
  // y: net-positive vs net-negative valence for the individual
  const items = [
    { x: 0.18, y: 0.18, label: "Monotropic absorption", note: "amplified in deep-work roles; suppressed by interruption culture" },
    { x: 0.30, y: 0.30, label: "Pattern recognition", note: "high-leverage in analysis, audit, security, design" },
    { x: 0.22, y: 0.42, label: "Anomaly detection", note: "regulated industries reward this directly" },
    { x: 0.40, y: 0.52, label: "Direct communication", note: "saves cycles in technical settings; punishes in political ones" },
    { x: 0.48, y: 0.70, label: "Justice orientation", note: "asset in compliance, ethics, internal audit" },
    { x: 0.60, y: 0.78, label: "Original synthesis", note: "from unusual reading; visible only with shipped work" },
    { x: 0.56, y: 0.62, label: "Loyalty when fitted", note: "long-tenure pattern when manager and role hold steady" },
    // suppressed / costly side
    { x: 0.78, y: 0.22, label: "Open-plan tolerance", note: "the sensory tax compounds across the day" },
    { x: 0.72, y: 0.36, label: "Performative extraversion", note: "after-hours drinks, lunch-table politics" },
    { x: 0.85, y: 0.30, label: "Implicit-rule reading", note: "unwritten hierarchy, dress codes, escalation paths" },
    { x: 0.80, y: 0.50, label: "Bell-curve review process", note: "spiky profiles get scored to the median" },
    { x: 0.66, y: 0.42, label: "Energy density", note: "real, but priced into burnout if not budgeted" },
    { x: 0.74, y: 0.62, label: "Vague task assignments", note: "the hidden tax of high-context cultures" },
  ];

  // SVG layout
  const W = 720, H = 440;
  const padL = 64, padR = 48, padT = 60, padB = 64;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const xPos = (x) => padL + x * plotW;
  const yPos = (y) => padT + y * plotH;

  return (
    <div style={{ background: C.bgAlt, border: `1px solid ${C.line}`, borderRadius: 2, padding: "24px 20px 16px", margin: "40px 0" }}>
      <div style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 700, color: C.darkGray, marginBottom: 4, letterSpacing: "0.04em", textTransform: "uppercase" }}>FIGURE 1 — AuDHD Traits in the Corporate Field</div>
      <div style={{ fontFamily: F.sans, fontSize: 11, color: C.warmGray, marginBottom: 16 }}>
        Two axes. Horizontal: how the corporate context handles a given trait — does it amplify the trait's value, or suppress and tax it. Vertical: arbitrary placement to spread the labels. The same trait can appear on either side of the vertical line depending on the role, the manager, and the team. Editorial diagram.
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", background: C.bg, borderRadius: 2 }}>
        {/* axes */}
        <line x1={padL} y1={padT + plotH} x2={padL + plotW} y2={padT + plotH} stroke={C.line} strokeWidth="1" />
        <line x1={xPos(0.5)} y1={padT - 6} x2={xPos(0.5)} y2={padT + plotH + 6} stroke={C.accent} strokeWidth="1" strokeDasharray="4,4" />

        {/* axis labels */}
        <text x={padL} y={padT - 22} fontFamily={F.sans} fontSize="10" fontWeight="700" letterSpacing="0.16em" fill={C.darkGray} textTransform="uppercase">AMPLIFIED BY CORPORATE CONTEXT</text>
        <text x={padL + plotW} y={padT - 22} fontFamily={F.sans} fontSize="10" fontWeight="700" letterSpacing="0.16em" fill={C.rust} textAnchor="end" textTransform="uppercase">SUPPRESSED / TAXED BY CORPORATE CONTEXT</text>
        <text x={W / 2} y={H - 18} textAnchor="middle" fontFamily={F.serif} fontSize="11" fontStyle="italic" fill={C.warmGray}>Same trait, different fate — depending on role, manager, and team norms.</text>

        {/* quadrant tints */}
        <rect x={padL} y={padT} width={plotW / 2} height={plotH} fill={C.ok} fillOpacity="0.06" />
        <rect x={padL + plotW / 2} y={padT} width={plotW / 2} height={plotH} fill={C.rust} fillOpacity="0.06" />

        {/* points */}
        {items.map((it, i) => {
          const left = it.x < 0.5;
          return (
            <g key={i}>
              <circle cx={xPos(it.x)} cy={yPos(it.y)} r="4.5" fill={left ? C.ok : C.rust} />
              <text x={xPos(it.x) + (left ? 9 : -9)} y={yPos(it.y) - 2} fontFamily={F.sans} fontSize="11" fontWeight="700" fill={C.fg} textAnchor={left ? "start" : "end"}>{it.label}</text>
              <text x={xPos(it.x) + (left ? 9 : -9)} y={yPos(it.y) + 11} fontFamily={F.serif} fontSize="9.5" fontStyle="italic" fill={C.warmGray} textAnchor={left ? "start" : "end"}>{it.note}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── VIS 2: MEETING FIELD GUIDE ──────────────────────────────────────────────
function MeetingFieldGuide() {
  const W = 720, H = 360;
  const subtypes = [
    { x: 90, y: 90, w: 240, h: 100, label: "INFORMATIONAL", purpose: "to transmit fact, status, plan", move: "skim agenda or notes; ask only on ambiguity", colour: C.navy },
    { x: 390, y: 90, w: 240, h: 100, label: "DECISIONAL", purpose: "to make a binding choice", move: "arrive with written option-set + recommendation", colour: C.ok },
    { x: 90, y: 220, w: 240, h: 100, label: "THEATRICAL", purpose: "to perform alignment / visibility", move: "speak once early, briefly, on the agenda topic", colour: C.rust },
    { x: 390, y: 220, w: 240, h: 100, label: "SOCIAL", purpose: "to maintain rapport and trust", move: "show up, leave on time, contribute one sincere line", colour: C.accent },
  ];

  return (
    <div style={{ background: C.bgAlt, border: `1px solid ${C.line}`, borderRadius: 2, padding: "24px 20px 16px", margin: "40px 0" }}>
      <div style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 700, color: C.darkGray, marginBottom: 4, letterSpacing: "0.04em", textTransform: "uppercase" }}>FIGURE 2 — The Meeting Field Guide</div>
      <div style={{ fontFamily: F.sans, fontSize: 11, color: C.warmGray, marginBottom: 16 }}>
        Most calendar invites collapse four very different events into the same forty-minute box. Naming the subtype before the meeting starts is the single highest-leverage move available to an AuDHD attendee. The right behaviour for one subtype is the wrong behaviour for the other three.
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", background: C.bg, borderRadius: 2 }}>
        {/* corner labels for axes */}
        <text x={W / 2} y={26} textAnchor="middle" fontFamily={F.sans} fontSize="10" fontWeight="700" letterSpacing="0.16em" fill={C.darkGray}>WHAT THE MEETING IS REALLY DOING</text>
        <text x={W / 2} y={48} textAnchor="middle" fontFamily={F.serif} fontSize="11" fontStyle="italic" fill={C.warmGray}>Read the room before deciding which behaviour the room rewards.</text>

        {subtypes.map((s, i) => (
          <g key={i}>
            <rect x={s.x} y={s.y} width={s.w} height={s.h} fill={C.bgCard} stroke={s.colour} strokeWidth="1.4" rx="3" />
            <text x={s.x + 14} y={s.y + 22} fontFamily={F.sans} fontSize="11" fontWeight="700" letterSpacing="0.14em" fill={s.colour}>{s.label}</text>
            <text x={s.x + 14} y={s.y + 44} fontFamily={F.serif} fontSize="11" fontStyle="italic" fill={C.fg}>{s.purpose}</text>
            <line x1={s.x + 14} y1={s.y + 56} x2={s.x + s.w - 14} y2={s.y + 56} stroke={C.line} strokeWidth="0.6" strokeDasharray="2,3" />
            <text x={s.x + 14} y={s.y + 74} fontFamily={F.sans} fontSize="9" fontWeight="700" letterSpacing="0.12em" fill={C.warmGray}>AuDHD MOVE</text>
            <text x={s.x + 14} y={s.y + 90} fontFamily={F.sans} fontSize="11" fill={C.fg}>{s.move}</text>
          </g>
        ))}

        <text x={W / 2} y={H - 12} textAnchor="middle" fontFamily={F.serif} fontSize="10" fontStyle="italic" fill={C.warmGray}>If you cannot tell which subtype it is in the first five minutes, ask: "What would success look like by the end of this call?"</text>
      </svg>
    </div>
  );
}

// ─── VIS 3: ACCOMMODATIONS LADDER ────────────────────────────────────────────
function AccommodationsLadder() {
  const W = 720, H = 480;
  // x is rung position 0..3 (informal habit → team convention → documented accommodation → legal protection)
  const rungs = [
    { x: 0, label: "PERSONAL HABIT", sub: "no permission needed", colour: C.accent },
    { x: 1, label: "TEAM CONVENTION", sub: "negotiated with peers + manager", colour: C.ok },
    { x: 2, label: "DOCUMENTED ACCOMMODATION", sub: "HR + occupational health on file", colour: C.navy },
    { x: 3, label: "LEGAL PROTECTION", sub: "Equality Act / ADA grounds", colour: C.rust },
  ];

  const items = [
    { rung: 0, label: "Noise-cancelling headphones", note: "brought from home, worn quietly" },
    { rung: 0, label: "Camera-off in non-decisional calls", note: "where team norms allow" },
    { rung: 0, label: "Lunch eaten alone, away from desk", note: "named as a working habit" },
    { rung: 1, label: "Async-first defaults", note: "Slack / docs over ad-hoc meetings" },
    { rung: 1, label: "Written meeting agendas + notes", note: "team-wide convention" },
    { rung: 1, label: "Core-hours model", note: "fixed overlap window, flexible edges" },
    { rung: 2, label: "Reduced meeting load", note: "documented cap; protected calendar blocks" },
    { rung: 2, label: "Quiet workspace assignment", note: "named seat away from open-plan core" },
    { rung: 2, label: "Written performance feedback", note: "in advance of 1:1 review conversations" },
    { rung: 2, label: "Flexible start / finish times", note: "to manage commute sensory load" },
    { rung: 3, label: "Reasonable adjustments — UK", note: "Equality Act 2010 s.20–21 duty" },
    { rung: 3, label: "Reasonable accommodations — US", note: "ADA Title I, as amended by ADAAA 2008" },
    { rung: 3, label: "Protection from harassment", note: "EA 2010 s.26 / ADA equivalents" },
    { rung: 3, label: "Disability-related disclosure protections", note: "recruitment + employment phases" },
  ];

  const padL = 60, padR = 40, padT = 60, padB = 60;
  const plotW = W - padL - padR;
  const rungY = (rung) => padT + (rung / 3) * (H - padT - padB);

  return (
    <div style={{ background: C.bgAlt, border: `1px solid ${C.line}`, borderRadius: 2, padding: "24px 20px 16px", margin: "40px 0" }}>
      <div style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 700, color: C.darkGray, marginBottom: 4, letterSpacing: "0.04em", textTransform: "uppercase" }}>FIGURE 3 — The Accommodations Ladder</div>
      <div style={{ fontFamily: F.sans, fontSize: 11, color: C.warmGray, marginBottom: 16 }}>
        From left (no permission needed, no record) to right (statutory protection). Most working accommodation lives in the middle two rungs. Climbing the ladder costs disclosure and visibility; staying low costs legal cover. The right rung depends on the manager, the team, and the cost of repair if the role goes wrong.
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", background: C.bg, borderRadius: 2 }}>
        {/* spine */}
        <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke={C.accent} strokeWidth="1.2" />

        {/* rung markers + labels */}
        {rungs.map((r, i) => {
          const y = rungY(r.x);
          return (
            <g key={i}>
              <circle cx={padL} cy={y} r="6" fill={r.colour} />
              <text x={padL - 14} y={y - 8} textAnchor="end" fontFamily={F.sans} fontSize="10" fontWeight="700" letterSpacing="0.14em" fill={r.colour}>{r.label}</text>
              <text x={padL - 14} y={y + 6} textAnchor="end" fontFamily={F.serif} fontSize="9.5" fontStyle="italic" fill={C.warmGray}>{r.sub}</text>
              <line x1={padL} y1={y} x2={padL + plotW} y2={y} stroke={C.line} strokeWidth="0.5" strokeDasharray="2,4" />
            </g>
          );
        })}

        {/* items — stack vertically inside their rung band */}
        {items.map((it, i) => {
          const sameRungItems = items.filter(x => x.rung === it.rung);
          const idxInRung = sameRungItems.indexOf(it);
          const totalInRung = sameRungItems.length;
          const baseY = rungY(it.rung);
          const offset = (idxInRung - (totalInRung - 1) / 2) * 14;
          const y = baseY + offset;
          const xCol = padL + 36 + (it.rung % 2 === 0 ? 0 : plotW * 0.42);
          const colour = rungs[it.rung].colour;
          return (
            <g key={i}>
              <circle cx={xCol} cy={y} r="3" fill={colour} />
              <text x={xCol + 8} y={y + 1} fontFamily={F.sans} fontSize="10.5" fontWeight="700" fill={C.fg}>{it.label}</text>
              <text x={xCol + 8} y={y + 13} fontFamily={F.serif} fontSize="9.5" fontStyle="italic" fill={C.warmGray}>{it.note}</text>
            </g>
          );
        })}

        <line x1={padL} y1={H - 28} x2={padL + plotW} y2={H - 28} stroke={C.line} strokeWidth="0.6" />
        <text x={padL} y={H - 12} fontFamily={F.sans} fontSize="9" fontStyle="italic" fill={C.warmGray}>Legal claims are illustrative summaries, not legal advice — confirm with an employment lawyer in your jurisdiction before relying on them. Current as of April 2026.</text>
      </svg>
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
export default function AudhdCorporateWorkplaceNavigation() {
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
          MODE: Encyclopaedic &nbsp;|&nbsp; FORMAT: Practical Reference &nbsp;|&nbsp; Fourth in a Four-Part Series on AuDHD
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
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80&auto=format&fit=crop&utm_source=dsl&utm_medium=referral"
          alt="An empty meeting room at dusk, table polished, chairs pushed in, city windows behind"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0, filter: "brightness(0.55)" }}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,18,30,0.18) 0%, rgba(10,18,30,0.84) 100%)", zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2, padding: "0 48px 56px" }}>
          <div style={{ fontFamily: F.sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.natgeoYellow, marginBottom: 20 }}>◆ Practical Reference — Part Four of Four</div>
          <h1 style={{ fontFamily: F.display, fontWeight: 900, fontSize: "clamp(36px, 5.4vw, 64px)", lineHeight: 1.08, color: "#FFFFFF", margin: "0 0 24px", maxWidth: 880 }}>
            The Corporate Field Manual
          </h1>
          <p style={{ fontFamily: F.serif, fontSize: "clamp(16px, 2vw, 21px)", fontStyle: "italic", color: "rgba(255,255,255,0.88)", maxWidth: 720, lineHeight: 1.55, margin: "0 0 32px" }}>
            An in-depth practical reference for AuDHD adults working inside a corporate hierarchy &mdash; strengths, frictions, and a navigable toolkit for the politics of office life.
          </p>
          <div style={{ fontFamily: F.sans, fontSize: 11, color: "rgba(255,255,255,0.45)" }}>
            Empty conference room at dusk &nbsp;|&nbsp; Unsplash
          </div>
        </div>
      </div>

      {/* BODY */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "56px 24px 80px" }}>

        {/* ── LEDE ───────────────────────────────────────────────────────────── */}
        <DC>{`The reader of this piece has a job. They have a manager and a quarterly review cycle and a 1:1 schedule. They have a problem — or, more likely, a small recurring set of problems — that the previous three articles in this series did not solve. The first article gave them the engine: catecholamine architecture, monotropic attention, the salience network. The third gave them the philosophical word for the engine's destination. Neither article told them what to do on Monday morning.`}</DC>

        <P>{`This is the practical companion. It assumes the diagnosis (or strong self-recognition) and skips the explanation of why the brain works the way it does. Its subject is the place — the open-plan office, the Slack channel, the Tuesday all-hands — and the task is navigation. The piece is in four parts. Part I inventories the genuine, evidence-backed strengths AuDHD brings to corporate work. Part II catalogues the specific, corporate-shaped frictions. Part III is the toolkit. Part IV collects the four short frameworks that hold the rest together.`}</P>

        <P>{`Two notes on register. First, this is not a cheerleading piece about neurodiverse superpowers. The strengths chapter is honest about the conditions under which each strength operates and the conditions under which it does not. Second, the practical recommendations are framed as options, not commands. The AuDHD reader knows their own configuration; the article supplies the menu.`}</P>

        <PQ>{`The corporate workplace was not designed against the AuDHD nervous system. It was designed without it in mind. The result is the same.`}</PQ>

        <P>{`Two figures from the UK and US literature anchor the urgency. In the 2024/25 financial year only 31.4 per cent of UK working-age adults whose main health condition is autism were in employment, against 82.0 per cent of non-disabled adults — by some margin the largest employment gap of any disability group, as the DWP's annual Employment of Disabled People report and the National Autistic Society have both documented. The Buckland Review of Autism Employment (DWP, February 2024) makes the corollary explicit: 77 per cent of unemployed autistic adults want to work. The gap, in other words, is not preference. It is fit. The aim of this manual is to lower the friction by enough degrees, on enough Mondays, that more of the working life on the inside is bearable — and, where possible, used well.`}</P>

        <SceneBreak />

        {/* ─────────────────────────────────────────────────────────────────────
            PART I — STRENGTHS
            ─────────────────────────────────────────────────────────────────── */}

        <Sec n="I" title="Strengths — the genuine inventory">
          <P>{`The strengths chapter of an AuDHD workplace book is usually where the writing gets weakest. The temptation to compensate for thirty years of deficit-language by overcorrecting into superpower-language is large, and it is rarely resisted. This chapter tries to resist. Each strength below is real, but each comes with the conditions under which it actually functions. A genuine strength under the wrong manager and on the wrong team is not a strength; it is a costed liability.`}</P>

          <StrengthsChallengesMatrix />
        </Sec>

        {/* I.1 */}
        <Sec n="I.1" title="Monotropic absorption as competitive advantage">
          <P>{`Dinah Murray, Mike Lesser, and Wenn Lawson's 2005 paper in the journal Autism — "Attention, Monotropism and the Diagnostic Criteria for Autism" (vol. 9, no. 2, pp. 139–156) — is the canonical statement of the most useful workplace concept available to an AuDHD adult. Their thesis is that autistic attention differs from neurotypical attention not in quantity but in distribution: the autistic mind directs a small number of interest-streams at very high arousal, where the polytropic mind splits across many at lower arousal each. From outside the tunnel this looks like inflexibility; from inside it is the laser, not the floodlight.`}</P>

          <P>{`In a corporate setting this is the strength a great many high-skilled jobs are actually paying for, even when the job description does not say so. Quantitative research, regulatory drafting, security-incident investigation, machine-learning debugging, long-form technical writing, audit fieldwork, infrastructure design — all are jobs whose useful output is a function of how long someone can stay properly inside a single problem. This is the empirical finding behind the Microsoft, SAP, Dell, JPMorgan Chase and EY neurodiversity hiring programmes, all designed on the bet that within tightly bounded technical roles AuDHD employees deliver disproportionate productivity gains. Microsoft's programme, marking its tenth anniversary in April 2025, expanded from software-engineering roles into data-centre operations precisely because the underlying bet kept paying out.`}</P>

          <P>{`The condition under which this strength functions is interruption hygiene. Monotropic absorption requires uninterrupted blocks. The thirty-minute slot followed by another thirty-minute slot is, for this attention style, the equivalent of being repeatedly woken from sleep. The AuDHD analyst with two free afternoons per week and three back-to-back morning stand-ups has been given a job in name and prevented from doing it in fact. The scenario in which the strength shows up is the Friday afternoon when the team has finally gone quiet and the AuDHD researcher closes a question the rest of the team had been circling for six weeks. The scenario in which it does not is any week of a normal corporate calendar without that protected block.`}</P>
        </Sec>

        {/* I.2 */}
        <Sec n="I.2" title="Pattern recognition and anomaly detection">
          <P>{`A second strength, related but distinct, is the AuDHD tendency toward bottom-up perception: building a picture of a situation from concrete particulars rather than fitting the particulars into a pre-existing top-down schema. The clinical literature has framed this in different vocabularies — weak central coherence (Frith and Happé), enhanced perceptual functioning (Mottron), predictive-processing differences in computational accounts. The behavioural signature is consistent. AuDHD analysts notice the line in the spreadsheet that does not match the others, the clause in the contract that contradicts the section above, the regulatory submission using last quarter's template language for this quarter's filing.`}</P>

          <P>{`This is exactly the cognitive shape that pays for itself in compliance, internal audit, security operations, anti-money-laundering, quality assurance, code review, and data engineering. Annabi and Locke's 2019 framework on autism employment in IT (Journal of Management & Organization) — adapted from the earlier OIMIB framework on women in tech — is explicit that pattern-recognition strength is among the most robust productivity findings in the autism-employment literature, conditional on neurotypical colleagues being knowledgeable enough about autism to make use of it. The scenario is the AuDHD risk analyst who, given clean read access and an undisturbed afternoon, finds the four counterparty exposures the bank had aggregated under different identifiers since 2019.`}</P>

          <P>{`The condition is permission to dwell. Pattern recognition is not a flash; it is the cumulative effect of a long, undirected look. It disappears the moment a manager interprets the long look as inactivity and reroutes the analyst into status calls.`}</P>
        </Sec>

        {/* I.3 */}
        <Sec n="I.3" title="Direct communication and low political-game overhead">
          <P>{`The third strength is an asset that sits awkwardly inside corporate vocabulary: directness. AuDHD adults typically optimise communication for information transfer rather than status maintenance. They say what they think the answer is, name the trade-off the room is dancing around, and give a question a real answer rather than the politic one. In a meeting whose actual purpose is to decide, this saves time. In a team whose technical work is genuinely difficult, it saves money.`}</P>

          <P>{`There is a second-order saving executives sometimes notice. The political game costs cycles. An employee not playing it has more cycles for the technical work. Eric Garcia's 2021 book We're Not Broken makes the argument in cultural register; the economic version is the one that survives translation into the language of the board: low political-game overhead is a form of cost discipline.`}</P>

          <P>{`The condition is a manager who values it. Directness becomes a political liability the moment the manager treats every meeting as a status performance. The scenario where it pays is the technical lead who, six weeks before launch, says clearly that the architecture will not scale and proposes the three-week refactor — and is heard. The scenario where it does not is the same lead in a culture where "let's keep an eye on this" is the only sentence the room is willing to receive.`}</P>
        </Sec>

        {/* I.4 */}
        <Sec n="I.4" title="Justice orientation and the regulated industries">
          <P>{`Fourth is a temperamental rather than cognitive strength: the strong AuDHD tendency toward justice orientation. The ethics literature on autism has, since the early descriptive work of Tony Attwood and the more recent autobiographical accounts collected by Pete Wharmby, repeatedly noted that autistic individuals tend to feel rule-violations as intrinsically aversive rather than as social inconveniences. The same is widely reported in ADHD self-advocacy: the inability to let a bad outcome go uncalled-out is, as Wharmby has written about extensively in the autistic-burnout register, a real feature of the configuration.`}</P>

          <P>{`In most social contexts this is costly. In specific corporate contexts — internal audit, ethics and compliance, anti-bribery and corruption, financial-crime, information security, safeguarding, regulatory reporting — it is the asset the role exists to find. The 2024 Buckland Review (DWP) flags exactly these regulated and assurance-oriented functions as ones where autistic employees tend to perform above headcount expectations. The corporate scenario is the AuDHD compliance officer who notices the pattern of vendor-onboarding shortcuts and follows the thread until the auditors arrive with a clean trail. The condition under which the strength functions is institutional protection — a manager and a chief compliance officer who are willing to back the report. The condition under which it does not is an organisation that uses the function as a fig leaf and treats genuine findings as career-limiting.`}</P>

          <Photograph
            src="https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=1600&q=80&auto=format&fit=crop&utm_source=dsl&utm_medium=referral"
            alt="A single person at a laptop in evening light, paperwork beside them"
            caption="The interest-aligned hour after the office has emptied is, for many AuDHD adults, when the actual work happens. Defending it is a matter of calendar architecture as much as character."
            credit="Christin Hume / Unsplash"
            href="https://unsplash.com/@christinhumephoto?utm_source=dsl&utm_medium=referral"
          />
        </Sec>

        {/* I.5 */}
        <Sec n="I.5" title="Energy density when interest aligns">
          <P>{`The fifth strength is a quantitative one and is responsible for a great deal of the variance in AuDHD career outcomes: the sheer density of energy available when interest aligns with task. The first article in this series traced the neurochemistry — interest-state recruitment of mesocortical dopamine, locus-coeruleus phasic firing, the salience-network arbitration that determines whether a task lands inside or outside the engagement window — and the operational consequence is straightforward. An AuDHD adult on a task they are properly interested in can, for stretches that read to outside observers as superhuman, sustain output a neurotypical colleague would consider impossible. The output is not faked; it is real.`}</P>

          <P>{`The condition is the energy is borrowed. Devon Price's 2022 book Unmasking Autism, drawing on a now-substantial autistic burnout literature, is explicit on this point: the energy density that interest-aligned work produces is paid for, sooner or later, in the depletion that follows. The corporate scenario in which this strength looks miraculous is the launch sprint that the AuDHD product engineer carries on their back. The scenario eight weeks later, after the launch, is the same engineer not answering Slack, not opening laptops, not picking up at all. Pricing the recovery into the project plan is the difference between a strength and a self-cannibalisation. The Energy Budget framework in Part IV is the practical instrument.`}</P>
        </Sec>

        {/* I.6 */}
        <Sec n="I.6" title="Original synthesis from unusual reading">
          <P>{`The sixth strength is the cognitive yield of a life spent reading more widely, more strangely, and more obsessively than the median colleague. AuDHD adults frequently arrive at corporate roles with a personal library of subjects that would not have been chosen by any rational career planner — a five-year deep dive into evolutionary biology, two years of medieval Iberian history, a self-taught command of probability theory acquired in service of a hobby, a working knowledge of the Dutch maritime trade. The conventional talent-management instinct treats this as charming irrelevance. The genuine value is original synthesis: the analyst who, asked to think about a supply-chain problem, brings to bear an analogy from the Hanseatic League, finds it productive, and produces a recommendation no one else in the room could have produced.`}</P>

          <P>{`This strength is invisible without shipped work. Talking about the analogy at lunch produces nothing but a reputation for being odd; building the recommendation, writing it up, and getting it implemented produces a track record. The condition under which it functions is therefore double: an interest engine wide enough to have done the unusual reading, and the discipline to convert the synthesis into deliverable output. The condition under which it does not is the AuDHD adult who is full of valuable ideas none of which have left the conversation stage.`}</P>
        </Sec>

        {/* I.7 */}
        <Sec n="I.7" title="Loyalty when the fit is found">
          <P>{`The seventh strength is statistical rather than experiential. Across the firms that have run the experiment honestly — SAP since 2013, Microsoft since 2015, JPMorgan Chase since 2015, EY since 2016, Dell since 2018 — the most consistent finding has not been that AuDHD employees deliver outsized initial productivity (although they often do), but that they stay. SAP has reported retention rates matching or exceeding neurotypical employees in comparable roles. JPMorgan's programme, now spanning nine countries and more than forty roles, rests on the same retention curve. Dell reports 98 per cent retention from internship-to-permanent conversion.`}</P>

          <P>{`These figures should be read with an analyst's eye — they are programme-specific, self-reported, and the candidates have been pre-screened for fit — but the behavioural finding is robust: when role, manager, and team are right, AuDHD adults do not job-hop. They stay seven years where the median colleague leaves at three. The corporate strategist who values onboarding cost amortisation should be paying attention. The AuDHD reader, for their own reasons, should also: the fit is rare and expensive, and once found, defending it is one of the highest-leverage decisions of a career.`}</P>

          <Callout type="info" title="A note on programme verifiability">
            <P>{`Specific autism-hiring programmes cited above were verified against publicly available company materials in April 2026: SAP Autism at Work (with Specialisterne, est. 2013); Microsoft Neurodiversity Hiring Program (est. 2015, tenth-anniversary expansion to data-centre roles in 2024–25); JPMorgan Chase Autism at Work (est. 2015); EY Neuro-Diverse Centers of Excellence (now twenty-five centres in fifteen countries); Dell Neurodiversity Hiring Program (est. 2018, in partnership with Neurodiversity in the Workplace). Programmes evolve and are renamed; readers should verify the current state of any specific programme before relying on it. Internal cohort sizes and retention figures are company-published and have not been independently audited in this article.`}</P>
          </Callout>
        </Sec>

        <SceneBreak />

        {/* ─────────────────────────────────────────────────────────────────────
            PART II — CHALLENGES
            ─────────────────────────────────────────────────────────────────── */}

        <Sec n="II" title="Challenges — the corporate-shaped frictions">
          <P>{`The challenges chapter of an AuDHD workplace book usually fails in the opposite direction from the strengths chapter. It either catastrophises into a litany of suffering or it underplays the friction by framing every problem as one of "advocacy" — implying that with sufficient self-disclosure and gentle conversation any of these costs could be eliminated. Most of them cannot. The corporate environment is what it is. The honest task of this chapter is to name the specific friction points so the reader can budget them, not to pretend that a sufficiently optimistic mindset will dissolve them.`}</P>

          <P>{`Each subsection below describes a specific pattern and its specific cost. Tools for partial mitigation appear in Part III; budgeting in Part IV. This chapter is the diagnostic.`}</P>
        </Sec>

        {/* II.1 */}
        <Sec n="II.1" title="The open-plan sensory environment">
          <P>{`The single most measurable corporate friction is the post-2010 open-plan office. Auditory load — keyboards, conversations, ad-hoc stand-ups, calls held at desks, the espresso machine, the phone calls from the next pod — is roughly what a neurotypical attentional system has been built to filter. The AuDHD attentional system, with its different baseline of sensory gating and its tendency to notice rather than suppress incoming signal, processes most of it consciously and pays the energetic cost. Add the visual load and the social-monitoring load — the implicit demand to look professional, to look busy, to look approachable but not too approachable — and the result is, for this nervous system, a continuously elevated background of low-grade demand.`}</P>

          <P>{`Pete Wharmby has framed this as a steady drain on the masking battery that an autistic worker's day-long cognitive performance is being financed from. Acas UK guidance on reasonable adjustments for neurodiversity (current April 2026) explicitly lists "use of a quiet, secluded part of the workplace" as a reasonable adjustment for autistic employees — a polite institutional acknowledgement that the default environment is, for this group, not workable. Many AuDHD adults do tolerate it for years. The friction is that the energy cost of the toleration is real, is daily, and shows up sooner or later as decreased late-week productivity, longer weekend recovery, and eventually burnout.`}</P>
        </Sec>

        {/* II.2 */}
        <Sec n="II.2" title="Meeting culture and its four genres">
          <P>{`The corporate calendar is, on inspection, four very different events collapsed into the same forty-minute box. The first genre is informational: the meeting whose actual purpose is to transmit information; most could be a memo. The second is decisional: a binding choice between options. Rarer than they seem. The third is theatrical: performing alignment, marking territory, or signalling status — being seen having had the meeting. The fourth is social: maintaining interpersonal trust and rapport across a distributed team.`}</P>

          <P>{`The AuDHD friction is that all four look identical from the calendar invite, and the right behaviour for one is the wrong behaviour for the others. Walking into an informational meeting and asking sharp clarifying questions is appropriate; walking into a theatrical meeting and doing the same surfaces a political problem; walking into a social meeting and pivoting to substantive content kills the rapport the meeting was for. The cognitive load of classifying meetings correctly in real time, while also doing the meeting, is the load a high-context neurotypical colleague has automated and an AuDHD colleague is doing manually all day long. The Field Guide diagram in Part III gives the working classification.`}</P>

          <MeetingFieldGuide />
        </Sec>

        {/* II.3 */}
        <Sec n="II.3" title="Performative extraversion as a tax">
          <P>{`Beyond the formal meeting calendar lies the informal one: lunch culture, the post-stand-up coffee, the after-work drinks, the team-bonding event, the conference dinner, the away-day. No individual instance is unreasonable. Cumulatively, for the AuDHD nervous system, it is a structural tax on the social-energy budget that the neurotypical colleague is not paying. Devon Price's framing of masking in Unmasking Autism — the running cost of suppressing the natural responses, performing the expected ones, modulating tone and eye contact and facial expression in continuous monitoring — is exactly what is happening across most of these contexts.`}</P>

          <P>{`Two scenarios make the cost legible. The first is the late-stage promotion conversation in which "executive presence" is invoked as a soft criterion — whether the candidate is performing the social rituals well enough that senior managers find their company comfortable. Even when the substantive work is excellent, the AuDHD candidate is paying the masking tax to clear that bar; the neurotypical candidate is not. The second is the after-work drinks at which the off-record decisions about the next quarter are taken — the decisions the AuDHD employee misses because they went home after the on-record day ended. The political-information asymmetry that follows is real and accumulates.`}</P>
        </Sec>

        {/* II.4 */}
        <Sec n="II.4" title="Unwritten rules and implicit hierarchy">
          <P>{`Every corporate environment runs on implicit knowledge that is never formally taught: who reports to whom in practice rather than on the org chart, which directors actually hold influence over the next reorg, when "send me a note on this" means "I will read it" and when it means "leave me alone," what dress code the senior leadership actually wears. The AuDHD adult reading the explicit rules and following them carefully has, in most cultures, learned the wrong textbook. The textbook that matters is the implicit one, taught by osmosis at the lunches, corridors, and post-meeting debriefs.`}</P>

          <P>{`The friction is not that AuDHD adults cannot learn implicit rules; many learn them in compensatory detail. It is that the learning is conscious where neurotypical learning is automatic, and the cognitive cost is borne. It is also that the explicit textbook cannot be relied on: the AuDHD adult who uses the formal escalation path, the formal feedback channel, or the formal grievance process frequently discovers that the formal mechanism is decorative and that they have just made a political error by treating it as load-bearing.`}</P>
        </Sec>

        {/* II.5 */}
        <Sec n="II.5" title="Manager-fit risk">
          <P>{`Of all the corporate frictions catalogued in this part, the highest-variance is manager fit. A high-context manager — one who communicates in implication and expects the report to fill in the structure — paired with an AuDHD report is one of the worst structural mismatches available in corporate work. The high-context manager believes they have communicated; the AuDHD report has not received the message. The high-context manager interprets the missing reception as inattention or lack of investment. The AuDHD report interprets the high-context manager's later frustration as arbitrary. Both are, by their own lights, correct. The relationship usually fails on something the AuDHD report did or did not do that they had no way of knowing was being asked of them.`}</P>

          <P>{`The Romualdez, Walker and Remington 2021 study, "Autistic adults' experiences of diagnostic disclosure in the workplace," published in Autism & Developmental Language Impairments (vol. 6, doi:10.1177/23969415211022955), interviewed 24 clinically-diagnosed autistic adults in the UK and found that the variance in disclosure outcomes was overwhelmingly explained by three factors: understanding of autism, available adaptations, and organisational culture. All three of these are mediated by the immediate manager. The AuDHD reader's manager is, for working purposes, a more important variable than the AuDHD reader's role.`}</P>
        </Sec>

        {/* II.6 */}
        <Sec n="II.6" title="Performance reviews on a bell-curve assumption">
          <P>{`Most corporate performance-management systems are built on a bell-curve assumption: an employee with a roughly normally-distributed competency profile, scored across a roughly evenly-weighted set of dimensions, will produce a roughly normally-distributed result. The AuDHD profile is, on inspection, not bell-shaped. It is spiky: extraordinary on a small number of dimensions, ordinary on most, and conspicuously below average on a few. The standard review process either averages the spikes into invisibility — the review-cycle phenomenon in which an employee whose monthly outputs are remarkable receives a "meets expectations" because their other dimensions pulled the score down — or it penalises the troughs disproportionately while taking the peaks for granted.`}</P>

          <P>{`The Buckland Review (DWP, February 2024) addresses this directly in its recommendations on performance management for autistic employees, calling for a shift from generic competency frameworks toward role-specific output measures. The friction the AuDHD reader is feeling at review time is not in their head and it is not solved by working harder on the troughs. It is a structural mismatch between their profile and the measurement instrument. Many AuDHD adults underperform on review day relative to their actual output across the year for this reason alone.`}</P>
        </Sec>

        {/* II.7 */}
        <Sec n="II.7" title="Promotion politics and the visibility game">
          <P>{`Promotion above the entry tier runs on a sponsorship model: the candidate is advanced because a senior person has decided to advance them. The decision is not primarily based on published output, although that is the public reason. It is based on the senior person's confidence that the candidate is the kind of person to bet political capital on. That confidence is built in the informal channels — the corridor conversation, the after-work drinks, the conference dinner — the same channels at which the AuDHD adult is paying the masking tax.`}</P>

          <P>{`The result is the visibility-asymmetry problem. AuDHD employees frequently produce work that is, by any output measure, promotion-grade, and remain at the same grade for years past their peers. The work is not the bottleneck. The sponsorship is. The 2024 Career Progression for Autistic People scoping review (Pesonen et al., Autism in Adulthood) makes the point empirically: autistic employees are systematically underrepresented at managerial levels controlled for tenure and role, and the gap widens, not narrows, as careers progress. Disclosure does not, on average, fix this. Sponsorship — the explicit cultivation of one or two senior advocates — does, partially.`}</P>
        </Sec>

        {/* II.8 */}
        <Sec n="II.8" title="Burnout patterns specific to corporate cycles">
          <P>{`This article cannot retread the burnout neurochemistry the first piece covered, so it confines itself to the corporate-shaped cycles. There are three. The first is the masking-budget collapse: the employee carries the social-energy tax through Q1 and Q2, manages a respectable Q3, and arrives at the Q4 close already too depleted to recover over the holiday break. They begin the next Q1 already in deficit, and the cycle compounds. By year three the body refuses.`}</P>

          <P>{`The second is the post-promotion crash. The AuDHD employee is promoted on the strength of interest-aligned work; the new role contains 60 per cent more meetings, 40 per cent less deep-work, and a wholly different stakeholder set. The interest engine that financed the first role is starved, the masking demand has tripled, and the new role becomes — within six to eighteen months — the role from which the employee burns out.`}</P>

          <P>{`The third is the "just get through this quarter" cycle. The employee identifies a specific upcoming load — a launch, an audit, a reorg — and decides to absorb the cost on the assumption of post-event recovery. Often the recovery does not come, because the post-event environment contains its own next "just get through" target. Pete Wharmby has documented this loop in detail; Devon Price's Unmasking Autism frames it as the structurally inevitable consequence of indefinite masking. The corporate signature is the AuDHD employee in their forties working at 70 per cent of their thirties' productivity because the engine has been running too long without recovery time priced in.`}</P>
        </Sec>

        {/* II.9 */}
        <Sec n="II.9" title="The 'professionalism' code">
          <P>{`A subtler but persistent friction is the diffuse cluster of expectations the corporate environment groups under "professionalism": eye contact during conversation, smalltalk before meetings, dress codes that are expressed in implications rather than rules, lunch-table behaviour, the warmth and timing of email opening lines, the appropriate length of out-of-office messages, the unwritten norm against eating at one's desk. None of these is, in itself, large. Each is a small ongoing data point against which the AuDHD employee is being scored.`}</P>

          <P>{`The cumulative effect is that the AuDHD employee whose work is excellent can still acquire a "fit" reputation that limits their advancement. The professionalism code is not malicious and it is rarely articulated; it is the residual sediment of the dominant culture, and the AuDHD employee is, on most of these dimensions, operating outside it. The honest budget here is small adjustments — slightly modified email openings, a deliberately practised opening line for a stand-up — paid for in time and energy, weighed against the political cost of failing the code. The Energy Budget framework in Part IV is the right instrument; the wrong instrument is to attempt to mask all of them all the time.`}</P>
        </Sec>

        {/* II.10 */}
        <Sec n="II.10" title="The vague-task problem">
          <P>{`The last and operationally largest of the corporate frictions is the vague task assignment. "Have a look at the X situation" or "can you give some thought to Y by next Tuesday" is the dominant mode by which work is assigned in most knowledge organisations. For a high-context neurotypical report this assignment is sufficient: they will infer the actual deliverable, the audience, the level of polish, the stakeholders, and the success criteria, from context. For an AuDHD report it is genuinely incomplete information.`}</P>

          <P>{`Two failure modes follow. The first is the over-delivery: the report does the maximum possible interpretation of the task, returns a 30-page document when a paragraph was wanted, and is gently told they have over-engineered it. The second is the under-delivery: the report does the minimal literal interpretation, returns a paragraph when a strategy paper was wanted, and is gently told they did not understand the assignment. The AuDHD report's pattern-recognition has registered the gentle "told"; the second offence is more costly than the first; the report begins to ask more questions; the manager begins to flag a "needs hand-holding" concern. The Explicit Contract framework in Part IV is the working answer.`}</P>

          <Photograph
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80&auto=format&fit=crop&utm_source=dsl&utm_medium=referral"
            alt="Two colleagues in conversation by a sunlit office window"
            caption="The corridor exchange that the high-context manager treats as the assignment is, for the AuDHD report, the announcement that an assignment exists. The deliverable is invented somewhere between them."
            credit="Brooke Cagle / Unsplash"
            href="https://unsplash.com/@brookecagle?utm_source=dsl&utm_medium=referral"
          />
        </Sec>

        <SceneBreak />

        {/* ─────────────────────────────────────────────────────────────────────
            PART III — NAVIGATION
            ─────────────────────────────────────────────────────────────────── */}

        <Sec n="III" title="Navigation — the toolkit">
          <P>{`This part is the longest of the four because the practical problem is harder than either the inventory or the diagnostic. The aim of each subsection is to leave the reader with a concrete next-action — something that can be done on Monday, not as a perfect protocol but as the first deliberate move in a direction the previous chapter named. None of these tools is a substitute for the underlying engine repair work; they are scaffolding that lets the engine continue to run while the working week happens around it.`}</P>
        </Sec>

        {/* III.1 */}
        <Sec n="III.1" title="Reading the meeting room">
          <P>{`The single most useful skill an AuDHD employee can develop in a meeting-heavy organisation is the ability to classify a meeting in its first five minutes into one of the four genres named in Part II — informational, decisional, theatrical, social — and to act according to its genre rather than its title. The classification is rarely written on the invite. It is read off three signals: who has called the meeting, who has been invited, and what they would each have to gain or lose from the alternative formats.`}</P>

          <P>{`A meeting called by an executive sponsor with an audience that includes their peers and their direct reports, framed around an "update," is almost always theatrical. A meeting called by a peer with a small attendee list and an explicit "decide" item is decisional. A recurring slot with the same attendees each week, framed as a "sync," is social regardless of whether it produces decisions. A meeting with a circulated deck and a Q&A is informational.`}</P>

          <P>{`The AuDHD move per genre. For informational, skim the deck and confine questions to genuine ambiguities; the meeting is not asking for content. For decisional, arrive with a written option-set and a recommendation; the meeting will reward this directly. For theatrical, speak once, briefly, on the named topic, early; do not attempt to be useful, do attempt to be visible. For social, attend, contribute one sincere line, leave on time. Misclassifying is the largest correctable cause of AuDHD political friction in a meeting-heavy organisation.`}</P>

          <Callout type="tip" title="The five-minute classification question">
            <P>{`If the genre is not obvious, ask early: "Just to make sure I'm clear — by the end of this meeting, what would success look like?" The answer routes you to the genre. "We'll have decided X" is decisional. "Everyone will be aligned on Y" is theatrical. "We'll have walked through the deck" is informational. Anything that names "checking in" or "catching up" is social.`}</P>
          </Callout>
        </Sec>

        {/* III.2 */}
        <Sec n="III.2" title="Managing your manager — the 1:1 contract">
          <P>{`The 1:1 is the highest-leverage thirty minutes in an AuDHD employee's calendar, and the most often wasted. The default 1:1 — manager and report drift through whatever happens to be top of mind for either — is a high-context format, and therefore precisely the format that disadvantages the AuDHD report. The working answer is to convert it into a structured exchange both parties have prepared for.`}</P>

          <P>{`A working weekly protocol: the report sends, twenty-four hours in advance, a short note in three sections. First, work shipped since the last 1:1 — concrete, named, with whatever metric is available; the surfacing-accomplishments mechanism the AuDHD employee will not get from theatrical meetings. Second, decisions or unblockings needed from the manager, with proposed answers attached so the manager can simply confirm. Third, ambiguities — places where the assignment was vague and the report has chosen an interpretation, surfaced for confirmation before sunk-cost accumulates.`}</P>

          <P>{`The protocol converts a high-context conversation into a low-context document, surfaces accomplishments without theatrical visibility-seeking, and eliminates the vague-task problem by making interpretive choices reviewable in real time. Some managers resist the structure; the resistance is itself information about manager fit. Many adopt it gladly, because it makes their own job easier. The concrete next-action: write the first such note before the next 1:1 and send it. If the response is "this is too formal," that is data for the manager-fit calculation that follows.`}</P>
        </Sec>

        {/* III.3 */}
        <Sec n="III.3" title="Choose your manager more carefully than your role">
          <P>{`The working principle that underwrites most successful AuDHD corporate careers is that the manager is, year-on-year, a more important variable than the role. A good manager in a mediocre role outperforms a mediocre manager in a great role on every metric an AuDHD employee cares about: career progression, energy economy, day-to-day functioning, sustainability. The Romualdez et al. (2021) finding that disclosure outcomes are mediated overwhelmingly by managerial knowledge and organisational culture is the empirical version of this proposition.`}</P>

          <P>{`Operationalising it requires a deliberate evaluation phase. The candidate considering an offer should, where possible, have at least one frank conversation with the prospective manager about how that manager works. Signals: a manager who describes their style as "high-context" or "we don't really do agendas" is a red flag, especially combined with unwillingness to commit to written deliverables. A manager who describes how they handle vague assignments — "I usually write a note explaining what I want and we iterate" — is a green flag. Does the manager have at least one anecdote about an employee whose work style was unusual and who they made successful? Presence or absence of that anecdote is high-information.`}</P>

          <P>{`The concrete next-action: before accepting any internal move, secure a thirty-minute conversation focused entirely on how the prospective manager manages, not on the role. The conversation is about the variable that will determine how the role goes.`}</P>
        </Sec>

        {/* III.4 */}
        <Sec n="III.4" title="The disclosure decision">
          <P>{`The disclosure question — whether to tell a manager, an HR partner, a team, that one is AuDHD — is the single most consequential decision in a working AuDHD career. The Romualdez, Walker and Remington 2021 study is the most carefully grounded recent evidence on outcomes. Their interviews with 24 autistic UK employees yielded a mixed picture: on the positive side, access to workplace adjustments (flexible hours, noise-cancelling headphones, work-from-home), legal protections, and increased understanding; on the negative side, stereotyping, discrimination, recruitment disadvantages, and bullying. The variance was largely explained by manager and organisational culture, not by the disclosure act itself.`}</P>

          <P>{`Three working questions before any disclosure. First, what specific adjustment requires the disclosure? "Permission to work in headphones" rarely does; "a documented core-hours arrangement that protects me from compulsory in-office Tuesdays" probably does. Second, who is the audience? Disclosing to a single trusted manager is an entirely different action from disclosing to an HR system that will route the information across systems you do not control. Third, what is the recovery cost if it goes badly — in practice, how easy is it to leave the organisation if the disclosure backfires. The lower the cost of leaving, the lower the risk of disclosing.`}</P>

          <P>{`Two contrasting patterns have emerged. The first is the targeted disclosure: tell only the manager, in private, framed around a specific accommodation, with a written record kept. Lower-risk, lower-yield. The second is the public disclosure: become known internally via a neurodiversity ERG (employee resource group) or as part of a programme like SAP's or Microsoft's. Higher-yield — stronger structural support, access to ally networks — and higher-risk in organisations whose culture does not match the rhetoric.`}</P>

          <P>{`The concrete next-action: before disclosing, write down the specific accommodation being asked for, the named person it is being asked of, and a one-paragraph version of the request that does not require the recipient to have read any literature. If any of these three is hard to draft, the timing is not yet right.`}</P>
        </Sec>

        {/* III.5 */}
        <Sec n="III.5" title="Reasonable accommodations under UK and US law">
          <P>{`The legal frame is worth knowing accurately, because the rights are real and underused. As of April 2026, the operative regimes are the UK Equality Act 2010 (sections 20–21 on the duty to make reasonable adjustments) and the US Americans with Disabilities Act 1990 as amended by the ADA Amendments Act 2008. This article is not legal advice; statutory interpretation evolves, and any specific accommodation should be confirmed with an employment lawyer in the relevant jurisdiction.`}</P>

          <P>{`Under the UK Equality Act 2010, autism and ADHD generally qualify as disabilities where effects on day-to-day activities are "substantial and long-term" — broadly, expected to last at least twelve months. A formal diagnosis is not legally required, though it strengthens the documentary case. Section 20 imposes on employers a duty to make reasonable adjustments where a disabled person would otherwise be put at a substantial disadvantage. Acas and the National Autistic Society's published April 2026 guidance list qualifying examples: use of a quiet workspace, flexible working hours, written meeting agendas in advance, exemption from team meetings or social gatherings, time- and project-management software, ergonomic equipment, and text-to-speech tools.`}</P>

          <P>{`Under the ADA, the 2008 Amendments broadened the statutory list of "major life activities" to include reading, concentrating, thinking, and communicating — categories that capture the functional impacts of both autism and ADHD. The reasonable-accommodation duty operates similarly to the UK regime, with the additional doctrinal elements of "essential functions" and the "undue hardship" defence. Job Accommodation Network (JAN) and EEOC guidance current to April 2026 list flexible scheduling, private working areas, noise-cancelling allowances, written feedback in advance of reviews, written task assignment, reduced meeting load, and remote arrangements where the role permits.`}</P>

          <P>{`The Accommodations Ladder diagram below maps specific accommodations from the entirely informal (personal headphones, lunch eaten alone) through team-level conventions (async-first defaults, written agendas) to documented HR-recorded accommodations and the formal legal protections. The right rung depends on the organisation, the manager, the cost of disclosure, and the cost of repair if denied. The legal floor is rarely the working level; most usable accommodation lives in the middle two rungs.`}</P>

          <AccommodationsLadder />
        </Sec>

        {/* III.6 */}
        <Sec n="III.6" title="Building translator allies">
          <P>{`A consistent finding across both the autism-employment research and the autistic-led writing of the past decade — Devon Price, Pete Wharmby, Eric Garcia each make versions of this point — is that AuDHD adults who flourish in corporate environments have, almost without exception, found at least one person inside the organisation who acts as a translator: someone high-context, politically literate, and well-disposed enough to convert the implicit into the explicit on the AuDHD employee's behalf. Not a mentor on paper, rarely a manager. A peer, occasionally a manager-of-a-manager or HR partner, who privately briefs the AuDHD employee on what is actually going on.`}</P>

          <P>{`The translator ally provides three functions. They explain what just happened in the meeting the AuDHD employee correctly perceived but misclassified. They flag, before the fact, political situations that will require a non-default response. They act as a back-channel reality check on the AuDHD employee's interpretation of an ambiguous email or an unexpected calendar invite. The relationship is not transactional and cannot be formalised; it is a real friendship with a working asymmetry, built over months by being trustworthy, useful, and undemanding in return.`}</P>

          <P>{`The concrete next-action: identify the one or two people in your organisation who are high-context, well-positioned, and willing to talk frankly. Invest in those relationships in low-key sustained ways. Do not ask anything of them in the first six months. After that, the relationship will start to function as a translator channel without ever being named as one.`}</P>

          <Photograph
            src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1600&q=80&auto=format&fit=crop&utm_source=dsl&utm_medium=referral"
            alt="A quiet office hallway with a single warm light at the end"
            caption="The translator ally is rarely the manager and never the mentor on paper. The relationship is built one corridor at a time, over months, and is the most underused promotion-related asset in an AuDHD career."
            credit="Maxwell Nelson / Unsplash"
            href="https://unsplash.com/@maxcodes?utm_source=dsl&utm_medium=referral"
          />
        </Sec>

        {/* III.7 */}
        <Sec n="III.7" title="The async escape">
          <P>{`Where the team and the role permit, the most powerful structural move available to an AuDHD employee is to push the team's working defaults toward asynchronous communication. Slack threads in place of ad-hoc stand-ups. Notion or Confluence docs in place of recurring informational meetings. Loom recordings in place of demo calls. Written change requests in place of corridor conversations reconstructed unreliably afterward. The benefit is double: it converts the AuDHD employee's strongest medium (writing) into the team's working medium, and it leaves a durable record that solves several of the problems Part II catalogued.`}</P>

          <P>{`The political risk is that abrupt advocacy reads as antisocial. The working approach is to model the behaviour rather than argue for it. Send the well-written Slack thread that closes a question instead of asking for the meeting. Write the brief that makes the next decision easier. Record the five-minute Loom that obviates the half-hour explainer call. Cumulatively, these substitutions shift the team default. The colleagues who benefit quietly — other neurodivergent staff, parents picking up children at five, colleagues in different time zones — are natural allies for the longer shift.`}</P>

          <P>{`The concrete next-action: identify one recurring informational meeting this quarter that could be a memo. Volunteer to circulate the memo in the meeting's place for one cycle. If it lands, propose making it the new default. The compounding of these small substitutions, over a year, is the largest accommodation an AuDHD employee can secure without ever using the word.`}</P>
        </Sec>

        {/* III.8 */}
        <Sec n="III.8" title="Remote work — the calculus">
          <P>{`Remote work is the highest-leverage structural accommodation available to most AuDHD employees, but it is not without trade-offs and it is not the answer for everyone. The genuine pros are large: full sensory control of the working environment, elimination of the commute load, full control of the meeting schedule's pacing, the option of camera-off in non-decisional calls, and the energy budget that is freed when the masking tax is paid only on calls instead of all day long. The genuine cons are also real: reduced informal access to the corridor information described in Part II, reduced sponsorship-building opportunities, increased risk of professional invisibility in promotion cycles, and — for many AuDHD adults whose social network was inadvertently built at work — a genuine risk of isolation.`}</P>

          <P>{`The working answer for most readers is hybrid, with the office days deliberately chosen to maximise sponsorship and translator-ally maintenance, and the remote days deliberately defended as deep-work blocks. The composition matters more than the ratio. Three random office days a week is worse than two well-chosen ones; a fully remote arrangement with one quarterly in-person week is, for some roles, the highest-output configuration available. The Energy Budget framework in Part IV is the right instrument for working out the personally optimal mix; the wrong instrument is the company default.`}</P>
        </Sec>

        {/* III.9 */}
        <Sec n="III.9" title="Promotion strategy when you cannot play politics">
          <P>{`The conventional promotion path requires a level of political fluency the AuDHD employee is, by configuration, paying a tax to perform. Three alternative paths have empirically worked at scale. The first is the deep-specialist path: become indispensable on a specific technical domain that is hard to source externally. The promotion comes because firing or routing-around the specialist is more expensive than promoting them. This path requires choosing the specialism carefully — narrow enough to dominate, broad enough to be valued.`}</P>

          <P>{`The second is the IC ladder path. Many large technology firms — Microsoft, Google, Meta, Amazon, Stripe, and others — maintain a parallel "individual contributor" track (Senior, Staff, Principal, Distinguished) alongside the management track, with no people-management requirement. It rewards demonstrated technical impact. It is the path of choice for AuDHD employees in software engineering, data science, and adjacent fields whose interest engine is not in managing other people. It requires written and shipped work; it does not require high-context political fluency.`}</P>

          <P>{`The third is the self-employed-with-client-base path: convert the deep-specialist position into an external consulting practice, with the previous employer as anchor client. The highest-autonomy path, and the most demanding in self-management. It works for AuDHD adults whose specialism is portable, whose network is strong enough to seed a client base, and whose cash-flow tolerance allows the transition. It is also the cleanest fit between AuDHD configuration and working environment, because every accommodation in Part II is now self-administered.`}</P>
        </Sec>

        {/* III.10 */}
        <Sec n="III.10" title="Compensation negotiation — the AuDHD failure modes">
          <P>{`AuDHD adults underperform in compensation negotiations more reliably than in most other career situations, for two specific reasons. The first is the directness asset working against the negotiator. Asked what they want, the AuDHD candidate gives the actual number — the number they would be happy with — rather than the strategic number twenty per cent above it. The negotiation closes around that opening. The second is the justice orientation: the AuDHD candidate, knowing what comparable colleagues are paid, finds it actively aversive to ask for more than the fair number, and so does not.`}</P>

          <P>{`The working answer is to outsource the negotiation function. This can be literal — a recruiter on contingency, who is paid as a percentage of the deal and therefore has skin in the game — or process-based: a written rule that one always asks for ten or fifteen per cent above the initial number, no matter what the initial number is, and that one names a specific other accommodation (additional leave, signing bonus, equity refresh, sabbatical-eligibility date) at the same time. The rule short-circuits the AuDHD employee's tendency to negotiate against themselves. The concrete next-action: before the next compensation conversation, write the script that will be used. Do not improvise the negotiation in real time.`}</P>
        </Sec>

        {/* III.11 */}
        <Sec n="III.11" title="When to leave — the red-flag inventory">
          <P>{`The hardest navigation skill in AuDHD corporate work is the timing of departure. The energy economy that financed the role at year one usually does not survive year four, and the organisation that was a good fit at one stage often is not at the next. The cost of leaving is real — onboarding into a new culture takes six to eighteen months to amortise — but the cost of staying past the point of fit is usually worse, because it is paid in compounding masking-budget rather than one-off transition cost.`}</P>

          <P>{`A working red-flag inventory: the manager who will not put expectations in writing. The "open-door" culture that punishes skip-level conversations. The performance-review process that, two cycles in a row, has produced a score that does not correspond to the year's output. The reorganisation that has dissolved the team in which the existing accommodations operated, and the new manager has not committed to honouring them. The promotion cycle that has produced three "next time" outcomes against shipped, named, comparable work. The realisation that the days off are spent recovering from work, not living a life.`}</P>

          <P>{`Any one of these is not, in itself, a leave signal; it is a probe. Run it as a deliberate test. Surface the issue in writing to the manager and watch the response. If the response is "let's have a conversation about this offline" — an attempt to move the conversation back to high-context — that is itself a finding. If the response is engagement and a written commitment, the relationship is salvageable. The concrete next-action: keep a private file in which the events that are accumulating are dated and recorded. The file is not a grievance. It is the dataset on which the leave-or-stay decision will eventually be made.`}</P>

          <Photograph
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=80&auto=format&fit=crop&utm_source=dsl&utm_medium=referral"
            alt="A pair of noise-cancelling headphones resting on a wooden desk beside a notebook"
            caption="Most working accommodation never reaches the formal record. The headphones, the calendar block, the camera-off Tuesday: the small architecture is mostly self-built."
            credit="Cytonn Photography / Unsplash"
            href="https://unsplash.com/@cytonn_photography?utm_source=dsl&utm_medium=referral"
          />
        </Sec>

        <SceneBreak />

        {/* ─────────────────────────────────────────────────────────────────────
            PART IV — PRACTICAL FRAMEWORKS
            ─────────────────────────────────────────────────────────────────── */}

        <Sec n="IV" title="Practical frameworks">
          <P>{`The four frameworks below are the connective tissue that holds the rest of the toolkit together. None is original; each has been arrived at independently by enough working AuDHD adults that the convergence is itself the evidence. They are presented compactly, as protocols rather than essays, because their value is in regular use rather than in admiration.`}</P>

          <SB title="The Explicit Contract">
            <p style={{ margin: "0 0 0.9em" }}>For any vague task assignment, before starting work, send a short note (Slack message or email) containing four lines: <strong>What I think you're asking for.</strong> <strong>What success looks like.</strong> <strong>What I'm planning not to do.</strong> <strong>When I'll come back with a draft.</strong> Wait for confirmation before starting. The note should fit on a phone screen.</p>
            <p style={{ margin: "0 0 0.9em" }}>The protocol does three things. It surfaces the AuDHD report's interpretation while the reinterpretation is still cheap. It externalises the implicit success criteria and makes them reviewable. And it produces a written record that protects against the reframing of expectations after the fact.</p>
            <p style={{ margin: "0" }}>Resistance from the manager — "you don't need to write all this out, just have a go" — is itself important data. A manager who will not put expectations in writing is a manager who will be free to relocate them later. The Explicit Contract is therefore as much a manager-fit instrument as a task-management instrument.</p>
          </SB>

          <SB title="The Energy Budget">
            <p style={{ margin: "0 0 0.9em" }}>Treat the working day as a fixed pool of social and cognitive energy &mdash; not as time, which is the unit a calendar measures. Different activities draw from different sub-pools at different rates. A two-hour stretch of interest-aligned deep work draws from one pool. A forty-minute theatrical meeting draws disproportionately from another. A twenty-minute lunch with a colleague who needs translating draws from a third.</p>
            <p style={{ margin: "0 0 0.9em" }}>Quantification, not optimisation, is the goal. Spend two weeks logging, at the end of each working day, three numbers between 0 and 10: deep-work tank, social-performance tank, sensory tank. Map them against the day's calendar. The patterns that emerge are usually sharp. Most AuDHD adults find that one specific recurring meeting, one specific colleague, or one specific class of task is responsible for thirty per cent of the energy cost of the working week. Naming it is the first move; structurally avoiding or reformatting it is the second.</p>
            <p style={{ margin: "0" }}>The Energy Budget is not about reducing total expenditure. It is about ensuring that, on the days the interest engine is firing, there is fuel left in the tank for it.</p>
          </SB>

          <SB title="The Recovery Protocol">
            <p style={{ margin: "0 0 0.9em" }}>Recovery is not self-care. Self-care is the language of moisturiser and bath bombs. Recovery is the operational restoration of capacity after expenditure, and for AuDHD adults it has specific characteristics that the generic wellness vocabulary does not capture.</p>
            <p style={{ margin: "0 0 0.9em" }}>Three components matter. First, sensory undeman: an environment with low light, low noise, and low social demand for a real block of time &mdash; usually two hours at minimum, sometimes a full evening. The lying-on-the-sofa-with-the-curtains-drawn protocol is not depression; for a depleted AuDHD nervous system it is operational maintenance. Second, monotropic re-fuelling: deliberate engagement with a special interest in a low-stakes mode, where the pleasure of the engagement does the restorative work the rest of the day did not. The reading, the building, the long walk in the same place &mdash; whichever the working interest is. Third, sleep priority: sleep is the single most-replicated finding in the autistic burnout literature, and chronic sleep debt is the most reliable predictor of compounding depletion. Devon Price's Unmasking Autism and the broader autistic burnout research are explicit on this.</p>
            <p style={{ margin: "0" }}>The Recovery Protocol is a calendar item, not a wish. It belongs in the diary the same way the meetings do. The week that does not contain a real recovery block is the week that quietly draws from next week's working capacity.</p>
          </SB>

          <SB title="The Portfolio Approach">
            <p style={{ margin: "0 0 0.9em" }}>One personal project, outside the corporate role, that the interest engine is allowed to feed on. It does not need to be commercial. It does not need to be public. It does not need to be related to the day job. What it needs to be is a place where the engine runs on its own terms, where the AuDHD adult's actual interests &mdash; whatever they are, however idiosyncratic &mdash; have an unmediated outlet.</p>
            <p style={{ margin: "0 0 0.9em" }}>The corporate role is, even at its best, a partial accommodation: most of the work is interest-aligned, some of it is not, and the residual masking and political tax is real. The Portfolio Project is the place that runs at full alignment. It is what makes the partial accommodation sustainable. The strongest AuDHD careers in the wider literature &mdash; the ones where the working configuration has held over decades &mdash; almost universally include a Portfolio Project that financed the engine across the years the day job did not.</p>
            <p style={{ margin: "0" }}>The portfolio is not a side hustle. It does not need to monetise. It needs to be defended, weekly, against the corporate expansion of working hours. The book, the photography practice, the long-running open-source project, the obsessive reading project, the vegetable patch &mdash; whatever the interest is, the protection of its time is non-negotiable, because that time is the source of the fuel that the rest of the week is running on.</p>
          </SB>
        </Sec>

        <SceneBreak />

        {/* ── CLOSING ─────────────────────────────────────────────────────────── */}
        <Sec n="V" title="Closing">
          <P>{`The third article in this series argued, after Aristotle, that an AuDHD life flourishes when its form is permitted to fulfil itself rather than to be redirected. The corporate environment is, on most days, a form of redirection. It is also, for most readers, the financial substrate that makes the rest of the life possible. The honest project is therefore not escape but accommodation: the calendar architecture, the manager-fit calculation, the explicit contracts, the budgeted recovery, the defended weekend project — all of it is the work of running the engine inside an environment that was not built for it, well enough that the engine survives the years.`}</P>

          <P italic large>{`Corporate work is bearable when it serves the engine, intolerable when it tries to redirect it. Most of the practice in this manual is in the difference between those two states.`}</P>
        </Sec>

        <SceneBreak />

        {/* ── SOURCE INTEGRITY NOTE ──────────────────────────────────────────── */}
        <Sec n="VI" title="Source Integrity Note">
          <P>{`This is the fourth piece in a four-part series on AuDHD. The first (audhd-entelechy-v2.jsx, 19 April 2026) carried the neuroscience in SciAm Hybrid mode. A second piece was deleted before publication and is not referenced. The third (audhd-entelechy-form-and-fulfilment.jsx, 26 April 2026) carried the philosophical treatment of entelechy. This piece is the practical/operational companion. Workspace files read in preparation: the v1 and v3 articles in full; library-articles/.claude/skills/shared-article-jsx-reference.md; library-articles/articles/looksmaxxing.jsx as an encyclopaedic-mode scaffold reference.`}</P>

          <P><strong>Researchers, books, and primary literature cited:</strong></P>
          <P>{`Dinah Murray, Mike Lesser, and Wenn Lawson, "Attention, Monotropism and the Diagnostic Criteria for Autism," Autism vol. 9, no. 2 (2005), pp. 139–156. doi:10.1177/1362361305051398. Verified via PubMed and the SAGE Journals listing.`}</P>
          <P>{`Anna Melissa Romualdez, Zachary Walker, and Anna Remington, "Autistic adults' experiences of diagnostic disclosure in the workplace: Decision-making and factors associated with outcomes," Autism & Developmental Language Impairments vol. 6 (2021). doi:10.1177/23969415211022955. PMC9620671. Verified via PubMed.`}</P>
          <P>{`Amal Annabi and Janet J. Locke, "A theoretical framework for investigating the context for creating employment success in information technology for individuals with autism," Journal of Management & Organization (2019). Adapts the OIMIB framework (Annabi & Lebovitz 2018). Verified via ResearchGate listing.`}</P>
          <P>{`Devon Price, Unmasking Autism: Discovering the New Faces of Neurodiversity (Harmony, 2022). ISBN 978-0593235232. Verified via Penguin Random House and author bibliography.`}</P>
          <P>{`Eric Garcia, We're Not Broken: Changing the Autism Conversation (Houghton Mifflin Harcourt, 2021). ISBN 978-1328587848. Verified via the author's website (ericmgarcia.net) and NPR coverage (16 September 2021).`}</P>
          <P>{`Pete Wharmby, public writing on autistic burnout and workplace experience (NeuroClastic; petewharmby.com; LinkedIn). His 2023 book Untypical: How the World Isn't Built for Autistic People and What We Should All Do About It (HarperCollins) extends these themes; cited via secondary references rather than direct quotation.`}</P>
          <P>{`Department for Work and Pensions (UK), The Buckland Review of Autism Employment: Report and Recommendations (February 2024). Available via gov.uk.`}</P>
          <P>{`Department for Work and Pensions (UK), The Employment of Disabled People 2025. Available via gov.uk; figures on autism employment rate (31.4% / 34.0% depending on measure) drawn from the 2024/25 financial-year statistics published in this report.`}</P>
          <P>{`National Autistic Society, "What are reasonable adjustments and when can they be requested" (autism.org.uk, current as of April 2026), and accompanying employment guidance.`}</P>
          <P>{`Acas (UK), "Adjustments for neurodiversity — Reasonable adjustments at work" (acas.org.uk, current as of April 2026). Cited as the operative practical UK guidance for the Equality Act 2010 reasonable-adjustments duty.`}</P>
          <P>{`UK Equality Act 2010, in particular sections 20–21 (duty to make reasonable adjustments) and section 26 (harassment). Cited as a statutory text; reader is reminded that statutory interpretation evolves and specific reliance should be confirmed with an employment lawyer.`}</P>
          <P>{`Americans with Disabilities Act 1990, as amended by the ADA Amendments Act 2008 (Pub. L. 110-325). Title I (employment) cited; Job Accommodation Network (askjan.org) and EEOC publication "The ADA: Your Employment Rights as an Individual With a Disability" cited as practical accommodations references.`}</P>

          <P><strong>Corporate programmes named — verification status as of April 2026:</strong></P>
          <P>{`SAP Autism at Work programme, in partnership with Specialisterne, established 2013. Verified via SAP corporate communications, the Harvard Business School case (HBS Case 50323), and Specialisterne's published partnership materials. SAP has reported the programme grew to over 200 employees across multiple countries by recent counts; specific figures are SAP-published and have not been independently audited here.`}</P>
          <P>{`Microsoft Neurodiversity Hiring Program, established 2015 (formerly Microsoft Autism Hiring Program). Verified via the Microsoft careers and accessibility blog. April 2025 marked the programme's tenth anniversary; in 2024 Microsoft expanded the programme to include data-centre roles, and in February 2025 launched the Neurodiversity Career Connector pilot.`}</P>
          <P>{`JPMorgan Chase Autism at Work programme, established 2015. Verified via JPMorgan Chase newsroom and careers materials. The programme has reportedly grown to approximately 200 participants in nine countries (Argentina, Brazil, Canada, England, India, Ireland, Philippines, Scotland, US) and over 40 roles. Figures are JPMorgan-published.`}</P>
          <P>{`EY Neuro-Diverse Centers of Excellence (NCoE). Verified via ey.com corporate materials. EY's Canadian and Polish NCoE pages list ongoing recruitment; published EY communications report 25 NCoEs in 15 countries as of recent counts. Verification did not extend to a full audit of all 25 sites, and readers should confirm the current status of any specific centre directly.`}</P>
          <P>{`Dell Technologies Neurodiversity Hiring Program, established 2018, in partnership with Neurodiversity in the Workplace (NITW). Verified via Dell careers materials. Dell publishes a 93% conversion rate from internship to permanent placement and a 98% retention rate; figures are Dell-published.`}</P>

          <P><strong>Tier-2 composites flagged:</strong></P>
          <P>{`No specific named individuals are used in this article. All employee scenarios — "the AuDHD risk analyst," "the AuDHD product engineer," "the AuDHD compliance officer" — are non-individuated archetypes used illustratively, not portraits of identifiable people. There are no first-person quotations attributed to named practitioners, researchers, or composites in this article. Where a researcher or author is named (Murray, Romualdez, Price, Garcia, Wharmby, Annabi, Locke), only their published positions are paraphrased; no invented dialogue is attributed to them.`}</P>

          <P><strong>Where the agent reasoned beyond cited evidence — explicit acknowledgement:</strong></P>
          <P>{`Several interpretive moves in this article go beyond what the cited sources directly assert and should be held at appropriate epistemic distance: (i) the four-genre meeting taxonomy (informational / decisional / theatrical / social) in §II.2 and §III.1 is the agent's working synthesis, not drawn from any single citable source; (ii) the Accommodations Ladder construct (personal habit → team convention → documented accommodation → legal protection) in §III.5 is the agent's framing, although the constituent items at each rung are drawn from cited sources (Acas, NAS, JAN, EEOC); (iii) the three corporate burnout cycles named in §II.8 (masking-budget collapse, post-promotion crash, "just get through Q2") are agent-named patterns derived from the broader autistic-burnout literature (Devon Price, Pete Wharmby) but not, in these specific labels, found in any single published source; (iv) the four practical frameworks in Part IV (Explicit Contract, Energy Budget, Recovery Protocol, Portfolio Approach) are widely circulated in AuDHD self-advocacy writing but in this specific compact form are the agent's own consolidation; (v) the claim in §I.3 that low political-game overhead is a form of cost discipline is editorial framing rather than a literature finding.`}</P>

          <P><strong>Legal claims — dating and qualification:</strong></P>
          <P>{`All legal-frame statements in this article (UK Equality Act 2010 sections 20–21 and 26, ADA Title I as amended by ADAAA 2008, examples of reasonable adjustments and reasonable accommodations) are summary statements as understood by Acas, the National Autistic Society, the Job Accommodation Network, and the EEOC's published guidance current to April 2026. Statutory interpretation and case law evolve. Specific reliance on any of these provisions should be confirmed with an employment lawyer in the relevant jurisdiction before action. This article is not legal advice and does not establish a solicitor-client or attorney-client relationship.`}</P>

          <P><strong>Corporate programme caveat:</strong></P>
          <P>{`Corporate neurodiversity programmes are subject to organisational change. Names, scope, and partnerships shift; some programmes are folded into broader DEI initiatives, some are renamed, some are paused or expanded between annual reporting cycles. Any reader considering applying to or relying on a specific programme should verify its current state via the organisation's official career or diversity pages before action. Internal cohort, retention, and conversion figures cited in this article are company-published and have not been independently audited.`}</P>

          <P><strong>Photographs:</strong></P>
          <P>{`Hero and inline images sourced from Unsplash with mandatory UTM tagging (?utm_source=dsl&utm_medium=referral) per the Unsplash developer guidelines. Where no satisfactory editorial photograph could be sourced, an IC placeholder block would be used; in this article all four photographs were sourced successfully.`}</P>

          <P><strong>Voice and method:</strong></P>
          <P>{`This is the encyclopaedic-mode fourth piece in the AuDHD series. Voice register: Harvard Business Review meets The Atlantic idea-piece. The piece deliberately does not retread the neuroscience (v1's territory) or the philosophical entelechy treatment (v3's territory). Where it refers to mechanisms or philosophical frames, it does so in compressed callback form rather than re-explanation.`}</P>
        </Sec>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: `40px solid ${C.natgeoYellow}`, padding: "24px 24px 32px", textAlign: "center" }}>
        <div style={{ fontFamily: F.sans, fontSize: 11, color: C.warmGray, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Encyclopaedic Reference &nbsp;|&nbsp; The Corporate Field Manual &nbsp;|&nbsp; Part Four of a Four-Part Series on AuDHD
        </div>
      </div>
    </div>
  );
}
