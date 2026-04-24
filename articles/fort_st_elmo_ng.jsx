/* --- YAML frontmatter --- */
/*
title: "The Cavalier That Broke an Empire"
subtitle: "For thirty-one days in 1565, the raised gun platform at the heart of Fort St Elmo held back the most powerful armada Islam had ever sent westward — and changed the course of Mediterranean history forever."
category: "history"
style: "natgeo-classic"
date: "2026-04-19"
tags: [malta, fort-st-elmo, knights-of-st-john, ottoman, siege]
*/

const ARTICLE_DATA = {
  title: "The Cavalier That Broke an Empire",
  subtitle: "For thirty-one days in 1565, the raised gun platform at the heart of Fort St Elmo held back the most powerful armada Islam had ever sent westward — and changed the course of Mediterranean history forever.",
  category: "history",
  style: "natgeo-classic",
  date: "2026-04-19",
  author: "Matthew Deane",
  tags: ["malta", "fort-st-elmo", "knights-of-st-john", "ottoman", "siege"],
};

const YELLOW = "#FFCC00";
const RUST = "#c0472a";
const DARK = "#111";
const CREAM = "#f5f0e8";
const SLATE = "#2a2e35";
const STONE = "#8a7858";

// ── Inline styles ──────────────────────────────────────────────────────────
const S = {
  page: {
    background: CREAM,
    color: "#1a1714",
    fontFamily: "Georgia, 'Times New Roman', serif",
    lineHeight: 1.72,
    minHeight: "100vh",
  },
  // Masthead
  masthead: {
    background: DARK,
    borderBottom: `3px solid ${YELLOW}`,
    padding: "12px 24px",
    display: "flex",
    alignItems: "center",
    gap: 12,
    position: "sticky",
    top: 0,
    zIndex: 99,
  },
  ngRect: {
    width: 30, height: 30,
    background: YELLOW,
    flexShrink: 0,
  },
  ngWordmark: {
    fontFamily: "'Arial Narrow', Arial, sans-serif",
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: "0.18em",
    color: "#fff",
    textTransform: "uppercase",
    lineHeight: 1.3,
  },
  ngSub: {
    display: "block",
    color: YELLOW,
    fontSize: 9,
    letterSpacing: "0.3em",
    fontWeight: 400,
  },
  // Hero
  hero: {
    background: `linear-gradient(160deg, #1a0e08 0%, #2a1a10 40%, #0a1820 100%)`,
    padding: "80px 32px 64px",
    position: "relative",
    overflow: "hidden",
  },
  heroBg: {
    position: "absolute", inset: 0,
    opacity: 0.18,
    backgroundImage: `repeating-linear-gradient(45deg, #8a6030 0px, #8a6030 1px, transparent 1px, transparent 12px)`,
  },
  heroRubric: {
    fontFamily: "Arial, sans-serif",
    fontSize: 10,
    letterSpacing: "0.32em",
    color: YELLOW,
    textTransform: "uppercase",
    marginBottom: 16,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  heroLine: { width: 28, height: 2, background: YELLOW },
  heroTitle: {
    fontFamily: "Georgia, serif",
    fontSize: "clamp(2.2rem, 5vw, 4rem)",
    fontWeight: 900,
    color: "#fff",
    lineHeight: 1.06,
    marginBottom: 20,
  },
  heroDeck: {
    fontStyle: "italic",
    fontSize: "1.05rem",
    color: "rgba(255,255,255,0.82)",
    maxWidth: 600,
    lineHeight: 1.6,
    marginBottom: 24,
  },
  heroMeta: {
    display: "flex", gap: 14, alignItems: "center",
    fontFamily: "Arial, sans-serif",
    fontSize: 10,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.5)",
  },
  heroMetaStrong: { color: "rgba(255,255,255,0.85)" },
  heroDot: { width: 4, height: 4, borderRadius: "50%", background: YELLOW },
  // Article body
  article: { maxWidth: 820, margin: "0 auto", padding: "0 24px 80px" },
  // Stats bar
  statsBar: {
    background: DARK,
    margin: "56px -60px",
    padding: "36px 48px",
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: 20,
    borderTop: `3px solid ${YELLOW}`,
  },
  statItem: { textAlign: "center" },
  statNumber: {
    fontFamily: "Arial, sans-serif",
    fontSize: "2.2rem",
    fontWeight: 700,
    color: YELLOW,
    display: "block",
    lineHeight: 1,
    marginBottom: 6,
  },
  statLabel: {
    fontFamily: "Arial, sans-serif",
    fontSize: 9,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.5)",
    fontWeight: 300,
    lineHeight: 1.5,
  },
  // Sec head
  sectionHead: {
    margin: "60px 0 24px",
    paddingTop: 18,
    borderTop: `1px solid ${STONE}`,
  },
  eyebrow: {
    fontFamily: "Arial, sans-serif",
    fontSize: 9,
    letterSpacing: "0.3em",
    textTransform: "uppercase",
    color: RUST,
    marginBottom: 8,
    fontWeight: 700,
  },
  sectionTitle: {
    fontFamily: "Georgia, serif",
    fontSize: "1.9rem",
    fontWeight: 700,
    fontStyle: "italic",
    color: SLATE,
    lineHeight: 1.2,
  },
  // Body text
  p: { marginBottom: "1.3em", fontSize: "1.02rem" },
  dropcap: {
    fontFamily: "Georgia, serif",
    fontSize: "5em",
    fontWeight: 900,
    float: "left",
    lineHeight: 0.82,
    margin: "0.06em 0.1em -0.1em 0",
    color: RUST,
  },
  // Pull quote
  pullQuote: {
    margin: "52px -60px",
    padding: "32px 44px",
    borderLeft: `5px solid ${YELLOW}`,
    background: DARK,
  },
  pullQuoteBQ: {
    fontFamily: "Georgia, serif",
    fontSize: "1.5rem",
    fontStyle: "italic",
    color: "#fff",
    lineHeight: 1.42,
    marginBottom: 12,
  },
  pullQuoteCite: {
    fontFamily: "Arial, sans-serif",
    fontSize: 9,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: YELLOW,
    fontStyle: "normal",
    fontWeight: 700,
  },
  // Diagram
  diagramWrap: {
    margin: "44px 0",
    border: `1px solid #d0c8b8`,
    boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
  },
  diagramHeader: {
    background: DARK,
    padding: "12px 20px",
    display: "flex", alignItems: "center", gap: 12,
  },
  diagramBadge: {
    background: YELLOW,
    color: DARK,
    fontFamily: "Arial, sans-serif",
    fontSize: 9,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    padding: "3px 9px",
    fontWeight: 700,
  },
  diagramTitle: {
    fontFamily: "Arial, sans-serif",
    fontSize: 10,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.75)",
    fontWeight: 300,
  },
  diagramBody: { padding: "24px", background: "#fff" },
  // SB
  sidebar: {
    float: "right",
    width: 270,
    margin: "0 -60px 28px 36px",
    background: DARK,
    color: "#fff",
    padding: "22px 22px 18px",
    borderTop: `4px solid ${YELLOW}`,
  },
  sidebarH: {
    fontFamily: "Arial, sans-serif",
    fontSize: 9,
    letterSpacing: "0.3em",
    textTransform: "uppercase",
    color: YELLOW,
    marginBottom: 14,
    fontWeight: 700,
  },
  dt: {
    fontFamily: "Arial, sans-serif",
    fontSize: 9,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#8a8078",
    fontWeight: 400,
    marginTop: 10,
  },
  dd: { color: "rgba(255,255,255,0.85)", margin: "2px 0 0", fontSize: "0.82rem" },
  // Timeline
  timeline: { margin: "44px 0", position: "relative" },
  tlLine: {
    position: "absolute",
    left: 22, top: 0, bottom: 0,
    width: 2, background: "#d0c4a8",
  },
  tlItem: {
    display: "grid",
    gridTemplateColumns: "52px 1fr",
    gap: 18,
    marginBottom: 26,
    position: "relative",
  },
  tlDot: (major) => ({
    width: 44, height: 44,
    borderRadius: "50%",
    background: major ? YELLOW : RUST,
    display: "flex", alignItems: "center", justifyContent: "center",
    position: "relative", zIndex: 1, flexShrink: 0,
    border: `3px solid ${CREAM}`,
  }),
  tlDate: {
    fontFamily: "Arial, sans-serif",
    fontSize: 9, letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: RUST, fontWeight: 700, marginBottom: 2,
  },
  tlEvent: {
    fontFamily: "Georgia, serif",
    fontSize: "0.97rem",
    fontWeight: 700, color: SLATE,
    marginBottom: 4, lineHeight: 1.3,
  },
  tlDesc: { fontSize: "0.83rem", color: "#5a5248", margin: 0, lineHeight: 1.55 },
  // Visitor box
  visitorBox: {
    background: "#ede6d6",
    borderLeft: `5px solid ${YELLOW}`,
    padding: "28px 32px",
    margin: "56px 0 36px",
  },
  visitorH: {
    fontFamily: "Arial, sans-serif",
    fontSize: 9, letterSpacing: "0.28em",
    textTransform: "uppercase",
    color: RUST, marginBottom: 18, fontWeight: 700,
  },
  visitorGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px 28px",
    fontSize: "0.87rem",
  },
  visitorLabel: {
    display: "block",
    fontFamily: "Arial, sans-serif",
    fontSize: 9, letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#7a7060",
    fontWeight: 400, marginBottom: 3,
  },
  // Footer
  footer: {
    background: DARK,
    color: "rgba(255,255,255,0.4)",
    textAlign: "center",
    padding: "36px 24px",
    fontFamily: "Arial, sans-serif",
    fontSize: 9,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    borderTop: `3px solid ${YELLOW}`,
  },
};

// ── Sub-components ─────────────────────────────────────────────────────────

function SectionHead({ eyebrow, title }) {
  return (
    <div style={S.sectionHead}>
      <div style={S.eyebrow}>{eyebrow}</div>
      <h2 style={S.sectionTitle}>{title}</h2>
    </div>
  );
}

function PullQuote({ quote, cite }) {
  return (
    <div style={S.pullQuote}>
      <blockquote style={S.pullQuoteBQ}>"{quote}"</blockquote>
      <cite style={S.pullQuoteCite}>— {cite}</cite>
    </div>
  );
}

function DiagramWrap({ badge, title, children }) {
  return (
    <div style={S.diagramWrap}>
      <div style={S.diagramHeader}>
        <span style={S.diagramBadge}>{badge}</span>
        <span style={S.diagramTitle}>{title}</span>
      </div>
      <div style={S.diagramBody}>{children}</div>
    </div>
  );
}

// ── Map SVG ────────────────────────────────────────────────────────────────
function MaltaMap() {
  return (
    <svg viewBox="0 0 720 420" style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif" }}>
      {/* Sea */}
      <rect width="720" height="420" fill="#b0cce0" />
      {/* Grand Harbour south */}
      <path d="M0 420 L0 270 Q80 250 160 290 Q250 330 360 300 Q440 275 480 310 L480 420Z" fill="#7ab0cc" />
      {/* Marsamxett north */}
      <path d="M0 0 L0 170 Q70 188 140 170 Q210 152 270 188 L270 0Z" fill="#7ab0cc" />
      {/* Sciberras peninsula */}
      <path d="M130 0 L130 170 Q150 195 185 215 Q225 235 270 238 L270 188 Q210 152 140 170 L130 0Z" fill="#d8c8a8" stroke="#a89870" strokeWidth="1.5" />
      {/* Valletta city block */}
      <rect x="134" y="28" width="128" height="155" fill="#c8a878" stroke="#a88858" strokeWidth="1" rx="2" />
      {/* Street grid */}
      {[158,184,210,236].map(x => <line key={x} x1={x} y1="28" x2={x} y2="183" stroke="#b09060" strokeWidth="0.5" opacity="0.5" />)}
      {[68,108,148].map(y => <line key={y} x1="134" y1={y} x2="262" y2={y} stroke="#b09060" strokeWidth="0.5" opacity="0.5" />)}
      <text x="198" y="112" fontSize="11" fill="#3a2808" textAnchor="middle" fontWeight="700" letterSpacing="0.5">VALLETTA</text>

      {/* Fort St Elmo star */}
      <polygon points="268,188 286,172 304,188 299,218 272,218" fill="#8B3A2A" stroke="#5C1F10" strokeWidth="2" />
      {/* Cavalier gold */}
      <rect x="278" y="188" width="15" height="13" fill={YELLOW} stroke="#5C1F10" strokeWidth="1.5" rx="1" />
      <text x="286" y="198" fontSize="7" fill="#0a0a0a" textAnchor="middle" fontWeight="700">C</text>

      {/* Fort label */}
      <line x1="305" y1="198" x2="370" y2="162" stroke="#5C1F10" strokeWidth="1.2" strokeDasharray="4,3" />
      <rect x="368" y="140" width="160" height="44" fill="rgba(10,10,10,0.88)" rx="3" />
      <text x="376" y="157" fontSize="11" fill={YELLOW} fontWeight="700" letterSpacing="1">FORT ST ELMO</text>
      <text x="376" y="174" fontSize="9" fill="rgba(255,255,255,0.7)">■ Cavalier (gold)</text>

      {/* Mt Sciberras */}
      <text x="168" y="155" fontSize="8" fill="#5a4a2a" letterSpacing="0.5">Mt. Sciberras</text>
      <text x="168" y="166" fontSize="7" fill="#7a6a4a">(Ottoman guns 1565)</text>

      {/* Water labels */}
      <text x="340" y="390" fontSize="13" fill="#2a5a7a" textAnchor="middle" letterSpacing="2" opacity="0.9">GRAND HARBOUR</text>
      <text x="58" y="75" fontSize="10" fill="#2a5a7a" textAnchor="middle" letterSpacing="1.2" opacity="0.85">MARSAMXETT</text>
      <text x="58" y="90" fontSize="10" fill="#2a5a7a" textAnchor="middle" letterSpacing="1.2" opacity="0.85">HARBOUR</text>

      {/* Fort St Angelo */}
      <polygon points="530,305 554,288 568,305 562,328 536,328" fill="#5a3a1a" stroke="#3a2a0a" strokeWidth="1.5" />
      <text x="548" y="352" fontSize="10" fill="#3a2a0a" textAnchor="middle">FORT ST ANGELO</text>
      <text x="548" y="364" fontSize="8" fill="#7a6a4a" textAnchor="middle">(Knights' HQ)</text>

      {/* Three Cities */}
      <path d="M560 315 Q608 285 665 296 Q700 305 725 285 L720 420 L560 420Z" fill="#c8b898" stroke="#a89878" strokeWidth="1" />
      <text x="640" y="368" fontSize="10" fill="#5a4a2a" textAnchor="middle">THREE CITIES</text>
      <text x="640" y="382" fontSize="8" fill="#7a6a4a" textAnchor="middle">Birgu · Senglea · Bormla</text>

      {/* Compass */}
      <g transform="translate(660,52)">
        <circle r="28" fill="rgba(255,255,255,0.88)" stroke="#8B3A2A" strokeWidth="1.5" />
        <polygon points="0,-20 3.5,-6 -3.5,-6" fill="#8B3A2A" />
        <polygon points="0,20 3.5,6 -3.5,6" fill="#b0a080" />
        <polygon points="-20,0 -5,-3.5 -5,3.5" fill="#b0a080" />
        <polygon points="20,0 5,-3.5 5,3.5" fill="#b0a080" />
        <text y="-24" textAnchor="middle" fontSize="10" fill="#5C1F10" fontWeight="700">N</text>
      </g>

      {/* Legend */}
      <rect x="530" y="18" width="110" height="104" fill="rgba(255,255,255,0.92)" rx="3" stroke="#c8b89a" strokeWidth="1" />
      <text x="540" y="36" fontSize="9" fill={RUST} fontWeight="700" letterSpacing="1">LEGEND</text>
      <rect x="540" y="42" width="12" height="9" fill="#8B3A2A" />
      <text x="558" y="51" fontSize="9" fill="#333">Fort</text>
      <rect x="540" y="57" width="12" height="9" fill={YELLOW} stroke="#5C1F10" strokeWidth="1" />
      <text x="558" y="66" fontSize="9" fill="#333">Cavalier</text>
      <rect x="540" y="72" width="12" height="9" fill="#c8a878" />
      <text x="558" y="81" fontSize="9" fill="#333">City</text>
      <rect x="540" y="87" width="12" height="9" fill="#7ab0cc" />
      <text x="558" y="96" fontSize="9" fill="#333">Harbour</text>
      <text x="540" y="114" fontSize="7" fill="#888" fontStyle="italic">Schematic · Not to scale</text>
    </svg>
  );
}

// ── Fort Plan SVG ──────────────────────────────────────────────────────────
function FortPlan() {
  return (
    <svg viewBox="0 0 720 480" style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif" }}>
      <defs>
        <marker id="a1" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
          <polygon points="0 0, 7 2.5, 0 5" fill="#8B3A2A" />
        </marker>
        <pattern id="hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#c0a060" strokeWidth="1.2" />
        </pattern>
      </defs>
      {/* Sea */}
      <rect width="720" height="480" fill="#b0cce0" />
      {/* Grand Harbour south */}
      <path d="M0 380 L0 480 L720 480 L720 370 Q580 350 480 365 Q380 380 280 358 Q180 336 80 352Z" fill="#7ab0cc" opacity="0.85" />
      <text x="360" y="445" fontSize="13" fill="#2a5a7a" textAnchor="middle" letterSpacing="2">GRAND HARBOUR</text>
      {/* Marsamxett north */}
      <path d="M0 0 L0 115 Q100 105 200 122 Q280 142 345 115 L345 0Z" fill="#7ab0cc" opacity="0.85" />
      <text x="158" y="60" fontSize="10" fill="#2a5a7a" textAnchor="middle" letterSpacing="1.5">MARSAMXETT</text>
      {/* Outer Carafa enceinte */}
      <path d="M228 122 L345 112 L428 172 L448 308 L408 360 L275 358 L215 310 L195 195Z" fill="#c8b8a0" stroke="#8a7858" strokeWidth="2" />
      <text x="195" y="245" fontSize="8" fill="#5a4a2a" textAnchor="middle" transform="rotate(-70,195,245)" letterSpacing="0.8">CARAFA ENCEINTE (1687)</text>
      {/* Main fort body */}
      <path d="M272 154 L348 142 L412 192 L422 302 L384 342 L285 340 L250 302 L255 188Z" fill="#d4c4a0" stroke="#8a7040" strokeWidth="2" />
      {/* Courtyard */}
      <ellipse cx="336" cy="258" rx="52" ry="62" fill="#e4dcc0" stroke="#b09868" strokeWidth="1" strokeDasharray="5,3" />
      <text x="336" y="255" fontSize="9" fill="#6a5a3a" textAnchor="middle">PARADE</text>
      <text x="336" y="268" fontSize="9" fill="#6a5a3a" textAnchor="middle">GROUND</text>
      {/* THE CAVALIER */}
      <rect x="298" y="147" width="72" height="54" rx="3" fill="#8B3A2A" stroke="#5C1F10" strokeWidth="2.5" />
      <rect x="305" y="155" width="58" height="38" rx="2" fill="url(#hatch)" opacity="0.7" />
      {/* Embrasures */}
      {[[298,158],[298,173],[362,158],[362,173]].map(([x,y],i) => (
        <rect key={i} x={x} y={y} width="10" height="8" fill={YELLOW} rx="1" />
      ))}
      {[[316,147],[338,147]].map(([x,y],i) => (
        <rect key={i} x={x} y={y} width="10" height="10" fill={YELLOW} rx="1" />
      ))}
      {/* Cavalier annotation arrow */}
      <line x1="334" y1="144" x2="334" y2="84" stroke="#5C1F10" strokeWidth="1.4" markerEnd="url(#a1)" />
      <rect x="250" y="46" width="170" height="42" fill="#0a0a0a" rx="3" />
      <text x="258" y="64" fontSize="11" fill={YELLOW} fontWeight="700" letterSpacing="1">THE CAVALIER</text>
      <text x="258" y="80" fontSize="9" fill="rgba(255,255,255,0.7)">Elevated gun platform</text>
      {/* Ravelin */}
      <polygon points="334,122 354,102 372,122 354,142" fill="#a08060" stroke="#7a6040" strokeWidth="1.5" opacity="0.9" />
      <text x="410" y="110" fontSize="9" fill="#5a4a2a">RAVELIN</text>
      <line x1="404" y1="108" x2="378" y2="118" stroke="#7a6040" strokeWidth="1" markerEnd="url(#a1)" />
      {/* Demi bastions */}
      <polygon points="255,196 234,180 246,212 270,214" fill="#b09878" stroke="#8a7858" strokeWidth="1.5" />
      <text x="220" y="190" fontSize="8" fill="#5a4a2a" textAnchor="end">W. BASTION</text>
      <polygon points="422,196 444,180 432,212 408,214" fill="#b09878" stroke="#8a7858" strokeWidth="1.5" />
      <text x="450" y="190" fontSize="8" fill="#5a4a2a">E. BASTION</text>
      {/* Chapel */}
      <rect x="314" y="308" width="40" height="26" fill="#d0c0a0" stroke="#9a8858" strokeWidth="1.5" />
      <polygon points="314,308 334,295 354,308" fill="#c0b090" stroke="#9a8858" strokeWidth="1" />
      <text x="334" y="326" fontSize="8" fill="#3a2a0a" textAnchor="middle">CHAPEL</text>
      {/* Seaward battery */}
      <path d="M255 302 Q280 340 334 354 Q388 340 422 302" stroke="#8a7040" strokeWidth="2" fill="#b09858" opacity="0.6" />
      <text x="334" y="378" fontSize="9" fill="#5a4a2a" textAnchor="middle">SEAWARD BATTERY</text>
      {/* Ottoman gun position */}
      <text x="105" y="288" fontSize="9" fill="#5a4a2a" textAnchor="middle">Mt. Sciberras</text>
      <text x="105" y="300" fontSize="8" fill="#7a6a4a" textAnchor="middle">(Ottoman guns)</text>
      <path d="M168 292 Q200 272 228 262" stroke="#8B3A2A" strokeWidth="1.2" strokeDasharray="5,4" fill="none" markerEnd="url(#a1)" />
      {/* WWII guns */}
      {[[294,176],[368,176]].map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r="5" fill="#2a4a2a" stroke="#1a3a1a" strokeWidth="1" />
      ))}
      {/* Pinto stores */}
      <rect x="257" y="214" width="18" height="66" fill="#baa888" stroke="#8a7858" strokeWidth="1" rx="1" />
      <rect x="398" y="214" width="18" height="66" fill="#baa888" stroke="#8a7858" strokeWidth="1" rx="1" />
      {/* Compass */}
      <g transform="translate(660,52)">
        <circle r="26" fill="rgba(255,255,255,0.88)" stroke="#8B3A2A" strokeWidth="1.5" />
        <polygon points="0,-18 3,-5 -3,-5" fill="#8B3A2A" />
        <polygon points="0,18 3,5 -3,5" fill="#b0a080" />
        <text y="-22" textAnchor="middle" fontSize="10" fill="#5C1F10" fontWeight="700">N</text>
      </g>
      {/* Legend */}
      <rect x="504" y="190" width="200" height="164" fill="rgba(255,255,255,0.93)" rx="3" stroke="#c8b89a" strokeWidth="1" />
      <text x="516" y="210" fontSize="9" fill={RUST} fontWeight="700" letterSpacing="1">LEGEND</text>
      {[
        ["#8B3A2A", "The Cavalier"],
        [YELLOW, "Gun embrasures", "#5C1F10"],
        ["#d4c4a0", "Main fort walls", "#8a7040"],
        ["#c8b8a0", "Carafa Enceinte", "#8a7858"],
        ["#a08060", "Ravelin"],
      ].map(([fill, label, stroke], i) => (
        <g key={i} transform={`translate(516, ${222 + i * 18})`}>
          <rect width="12" height="9" fill={fill} stroke={stroke || fill} strokeWidth="0.5" />
          <text x="18" y="9" fontSize="9" fill="#333">{label}</text>
        </g>
      ))}
      <circle cx="522" cy="316" r="5" fill="#2a4a2a" />
      <text x="534" y="320" fontSize="9" fill="#333">WWII gun positions</text>
      <text x="516" y="346" fontSize="7" fill="#888" fontStyle="italic">Schematic · Not to exact scale</text>
    </svg>
  );
}

// ── Cross-Sec SVG ──────────────────────────────────────────────────────
function CrossSection() {
  return (
    <svg viewBox="0 0 720 360" style={{ width: "100%", height: "auto", fontFamily: "Arial, sans-serif" }}>
      <defs>
        <marker id="a2" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
          <polygon points="0 0, 7 2.5, 0 5" fill="#5C1F10" />
        </marker>
        <pattern id="stone2" patternUnits="userSpaceOnUse" width="18" height="11">
          <rect width="18" height="11" fill="#c8b088" />
          <rect x="0" y="0" width="9" height="5.5" fill="#d4bc94" stroke="#a89860" strokeWidth="0.4" />
          <rect x="9" y="5.5" width="9" height="5.5" fill="#c0a878" stroke="#9a8850" strokeWidth="0.4" />
        </pattern>
        <pattern id="earth2" patternUnits="userSpaceOnUse" width="8" height="8">
          <rect width="8" height="8" fill="#8a7050" />
          <circle cx="2" cy="3" r="0.7" fill="#6a5030" opacity="0.5" />
          <circle cx="5" cy="6" r="0.7" fill="#6a5030" opacity="0.5" />
        </pattern>
      </defs>
      {/* Sky */}
      <rect width="720" height="360" fill="#d8ecf8" />
      {/* Ground level dash */}
      <line x1="0" y1="272" x2="720" y2="272" stroke="#aaa" strokeWidth="1" strokeDasharray="8,5" opacity="0.4" />
      <text x="18" y="269" fontSize="9" fill="#666" letterSpacing="1">GROUND LEVEL</text>
      {/* Earth fill */}
      <rect x="86" y="192" width="548" height="80" fill="url(#earth2)" />
      {/* Main fort walls */}
      <rect x="86" y="150" width="54" height="122" fill="url(#stone2)" stroke="#8a7040" strokeWidth="1.5" />
      <rect x="580" y="150" width="54" height="122" fill="url(#stone2)" stroke="#8a7040" strokeWidth="1.5" />
      {/* Crenellations – left */}
      {[86,104,122].map(x => <rect key={x} x={x} y={138} width="11" height="16" fill="url(#stone2)" stroke="#8a7040" strokeWidth="1" />)}
      {/* Crenellations – right */}
      {[580,598,616].map(x => <rect key={x} x={x} y={138} width="11" height="16" fill="url(#stone2)" stroke="#8a7040" strokeWidth="1" />)}
      {/* Fort floor */}
      <rect x="140" y="186" width="440" height="10" fill="#b09860" stroke="#8a7040" strokeWidth="1" />
      {/* CAVALIER */}
      <rect x="222" y="98" width="276" height="92" fill="url(#stone2)" stroke="#5C1F10" strokeWidth="2.5" />
      {/* Cavalier top platform */}
      <rect x="222" y="88" width="276" height="14" fill="#a07848" stroke="#5C1F10" strokeWidth="2" />
      {/* Cavalier crenellations top */}
      {[222,242,262].map(x => <rect key={x} x={x} y={64} width="13" height="26" fill="url(#stone2)" stroke="#5C1F10" strokeWidth="1.5" />)}
      {[443,463,483].map(x => <rect key={x} x={x} y={64} width="13" height="26" fill="url(#stone2)" stroke="#5C1F10" strokeWidth="1.5" />)}
      {/* Embrasures */}
      {[[222,120],[222,142],[505,120],[505,142]].map(([x,y],i) => (
        <rect key={i} x={x} y={y} width="16" height="11" fill="#2a1a0a" rx="1" />
      ))}
      {/* Gun barrels */}
      {[[206,124],[206,146],[521,124],[521,146]].map(([x,y],i) => (
        <rect key={i} x={x} y={y} width="19" height="5" fill="#111" rx="2" />
      ))}
      {/* Cannon on top */}
      <g transform="translate(285,70)">
        <rect x="-5" y="-5" width="46" height="11" rx="5.5" fill="#2a2a2a" stroke="#111" strokeWidth="1" />
        <rect x="41" y="-3" width="20" height="7" rx="3" fill="#222" />
        <circle cx="-13" cy="5" r="5" fill="#1a1a1a" />
        <circle cx="-23" cy="5" r="5" fill="#222" />
        <circle cx="-18" cy="-1" r="5" fill="#1a1a1a" />
      </g>
      <g transform="translate(406,70)">
        <rect x="-5" y="-5" width="46" height="11" rx="5.5" fill="#2a2a2a" stroke="#111" strokeWidth="1" />
        <rect x="41" y="-3" width="20" height="7" rx="3" fill="#222" />
      </g>
      {/* Ramp */}
      <path d="M350 186 L322 192 L322 98" fill="none" stroke="#8a7040" strokeWidth="1.8" strokeDasharray="6,4" />
      <rect x="322" y="175" width="14" height="12" fill="#b09860" stroke="#8a7040" strokeWidth="1" opacity="0.7" />
      {/* Labels */}
      <line x1="360" y1="84" x2="360" y2="34" stroke="#5C1F10" strokeWidth="1.4" markerEnd="url(#a2)" />
      <rect x="270" y="8" width="182" height="30" fill="#0a0a0a" rx="3" />
      <text x="361" y="24" fontSize="11" fill={YELLOW} fontWeight="700" letterSpacing="1" textAnchor="middle">CAVALIER GUN PLATFORM</text>

      <line x1="220" y1="130" x2="160" y2="114" stroke="#5C1F10" strokeWidth="1" markerEnd="url(#a2)" />
      <text x="148" y="112" fontSize="9" fill={RUST} textAnchor="end">Embrasure</text>
      <text x="148" y="124" fontSize="8" fill="#888" textAnchor="end">(gun port)</text>

      <line x1="113" y1="186" x2="62" y2="216" stroke="#7a6040" strokeWidth="1" markerEnd="url(#a2)" />
      <text x="30" y="232" fontSize="9" fill="#5a4a2a" textAnchor="middle">Main wall</text>

      <text x="366" y="150" fontSize="9" fill="#5a4a2a">Ramp access</text>

      {/* Height dimension */}
      <line x1="534" y1="100" x2="534" y2="190" stroke="#8B3A2A" strokeWidth="1.2" />
      <line x1="526" y1="100" x2="542" y2="100" stroke="#8B3A2A" strokeWidth="1.2" />
      <line x1="526" y1="190" x2="542" y2="190" stroke="#8B3A2A" strokeWidth="1.2" />
      <text x="568" y="148" fontSize="9" fill="#8B3A2A">~5–6m</text>
      <text x="568" y="162" fontSize="8" fill="#888">above main</text>
      <text x="568" y="174" fontSize="8" fill="#888">fort floor</text>

      <text x="360" y="255" fontSize="9" fill="#6a5a3a" textAnchor="middle" letterSpacing="1">EARTH FILL · FORT INTERIOR</text>
      <text x="18" y="350" fontSize="8" fill="#888" fontStyle="italic">Schematic cross-section · Globigerina limestone construction · Not to exact scale</text>
    </svg>
  );
}

// ── Timeline data ──────────────────────────────────────────────────────────
const tlData = [
  { date: "18 May 1565", event: "Ottoman Armada Arrives", desc: "~193 ships and up to 40,000 troops anchor off Malta. The fleet demands Fort St Elmo first to shelter in Marsamxett Harbour.", major: true },
  { date: "27 May 1565", event: "Full Bombardment Begins", desc: "36 Ottoman cannon on Mount Sciberras deliver 600–1,400 rounds daily. The cavalier is a priority target.", major: false },
  { date: "31 May 1565", event: "Dragut Arrives", desc: "The feared corsair arrives with 1,600 men, immediately repositioning batteries to cut off nightly reinforcements.", major: false },
  { date: "3 June 1565", event: "Ravelin Falls", desc: "Janissaries seize the outer ravelin at enormous cost — ~500 Ottoman dead in one day. Defenders use fire hoops and Greek fire.", major: false },
  { date: "8 June 1565", event: "Garrison Asks to Evacuate", desc: "53 knights beg La Valette to let them die in the open. He sends inspectors who shame the garrison into staying.", major: false },
  { date: "18 June 1565", event: "Dragut Mortally Wounded", desc: "A stone fragment strikes Dragut above the right ear near the cavalier. He lingers five days and dies on June 23 — the day the fort falls.", major: true },
  { date: "22 June 1565 (night)", event: "The Final Vigil", desc: "The garrison gathers in the chapel. Every man confesses. A single bell tolls through the night, audible across the harbour.", major: false },
  { date: "23 June 1565", event: "Fort St Elmo Falls", desc: "At dawn the full Ottoman force storms the fort. Every defending knight is killed. Ottoman dead at St Elmo alone: ~6,000–8,000.", major: true },
  { date: "8 September 1565", event: "The Great Siege Ends", desc: "A relief force of 8,000 from Sicily breaks the Ottoman army. Total Ottoman casualties for the entire siege: 25,000–35,000.", major: true },
];

// ── Main Component ─────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={S.page}>
      {/* MASTHEAD */}
      <header style={S.masthead}>
        <div style={S.ngRect} />
        <div style={S.ngWordmark}>
          National Geographic
          <span style={S.ngSub}>History &amp; Exploration</span>
        </div>
      </header>

      {/* HERO */}
      <section style={S.hero}>
        <div style={S.heroBg} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 900, margin: "0 auto", padding: "0 32px", width: "100%" }}>
          <div style={S.heroRubric}>
            <span style={S.heroLine} />
            Military History · Malta
          </div>
          <h1 style={S.heroTitle}>The Cavalier<br />That Broke<br />an Empire</h1>
          <p style={S.heroDeck}>
            For thirty-one days in 1565, the raised gun platform at the heart of Fort St Elmo held back
            the most powerful armada Islam had ever sent westward — and changed the course of Mediterranean history forever.
          </p>
          <div style={S.heroMeta}>
            <span>Photography <strong style={S.heroMetaStrong}>Heritage Malta · Wikimedia</strong></span>
            <span style={S.heroDot} />
            <span>Dispatch from <strong style={S.heroMetaStrong}>Valletta, Malta</strong></span>
          </div>
        </div>
      </section>

      {/* ARTICLE */}
      <main style={S.article}>

        {/* INTRO */}
        <section style={{ paddingTop: 60 }}>
          <p>
            <span style={S.dropcap}>A</span>
            t the seaward tip of Malta's Sciberras Peninsula, where honey-coloured limestone meets
            the Mediterranean, a raised gun platform tells one of history's most extraordinary stories
            of defiance. Fort St Elmo's Cavalier — an elevated artillery position designed to fire over
            its own fort's walls — stood at the epicentre of a 31-day siege in 1565 that cost the
            Ottoman Empire an estimated 8,000 dead and altered the trajectory of European civilisation.
          </p>
          <p style={S.p}>
            Built as part of a modest star fort in 1552, the cavalier became the fulcrum on which the
            Great Siege of Malta pivoted. While Ottoman engineers predicted the fort would fall in three
            to five days, its garrison held for a month — buying time that ultimately saved Christendom's
            southern flank. Today, restored through a €15.3 million conservation project, the cavalier
            stands within a UNESCO World Heritage Site, its scarred limestone carrying centuries of
            testimony in every weathered block.
          </p>
        </section>

        {/* STATS */}
        <div style={S.statsBar}>
          {[
            ["31", "Days the garrison held"],
            ["8,000", "Estimated Ottoman dead at St Elmo"],
            ["1,500", "Christian defenders who perished"],
            ["€15.3M", "21st-century restoration cost"],
          ].map(([n, l]) => (
            <div key={n} style={S.statItem}>
              <span style={S.statNumber}>{n}</span>
              <span style={S.statLabel}>{l}</span>
            </div>
          ))}
        </div>

        {/* LOCATOR MAP */}
        <DiagramWrap badge="Map" title="Fort St Elmo — Position on the Sciberras Peninsula, Valletta, Malta">
          <MaltaMap />
        </DiagramWrap>

        {/* SECTION: ORIGINS */}
        <SectionHead eyebrow="Origins" title="A Watchtower Becomes a Fortress" />

        <div style={{ overflow: "hidden" }}>
          <aside style={S.sidebar}>
            <div style={S.sidebarH}>Fort St Elmo — Key Facts</div>
            <dl>
              {[
                ["Built", "1552 (replacing 1488 tower)"],
                ["Architects", "Fra Leone Strozzi & Pietro Pardo"],
                ["Material", "Maltese globigerina limestone"],
                ["Fort area", "~50,400 m² (post-expansion)"],
                ["1565 garrison", "~150 knights + ~600 soldiers"],
                ["Siege duration", "31 days (May 27 – June 23, 1565)"],
                ["UNESCO status", "World Heritage Site (1980)"],
                ["Restoration", "€15.3M completed 2015"],
              ].map(([dt, dd]) => (
                <div key={dt}>
                  <dt style={S.dt}>{dt}</dt>
                  <dd style={S.dd}>{dd}</dd>
                </div>
              ))}
            </dl>
          </aside>

          <p style={S.p}>
            The story of Fort St Elmo begins not with grand military ambition but practical vigilance.
            In 1417, local militia established a watch post on the rocky headland where two of the
            Mediterranean's finest natural harbours converge. The Aragonese formalized this in 1488,
            erecting a watchtower dedicated to Erasmus of Formia — Saint Elmo, patron of seafarers.
          </p>
          <p style={S.p}>
            When the Knights Hospitaller arrived in Malta in 1530, granted the archipelago by Emperor
            Charles V, they recognised the headland's strategic genius: whoever held this point
            controlled the entrances to both Grand Harbour and Marsamxett Harbour. The vulnerability
            was exposed brutally in 1551, when an Ottoman force under Dragut sailed into Marsamxett
            unopposed. Grand Master Juan de Homedes responded by ordering a proper fortification.
          </p>
          <p style={S.p}>
            The old tower was demolished and replaced with a four-pointed <em>trace italienne</em> star
            fort — the state-of-the-art in gunpowder-era military design. At its heart stood the
            cavalier: a raised platform positioned to fire over the main parapets without obstructing
            guns on the lower ramparts. The fort was built from <strong>globigerina limestone</strong>,
            a fine-grained stone that hardens on air exposure, shifting from rosy gold to deep amber
            over centuries — now designated a UNESCO Global Heritage Stone Resource.
          </p>
        </div>

        {/* FORT PLAN */}
        <DiagramWrap badge="Plan" title="Annotated Plan — Fort St Elmo & the Cavalier's Position">
          <FortPlan />
        </DiagramWrap>

        {/* SECTION: THE SIEGE */}
        <SectionHead eyebrow="18 May – 23 June 1565" title="Thirty-One Days of Fire and Stone" />

        <p style={S.p}>
          On the morning of May 18, 1565, the Ottoman armada materialized on the horizon: approximately
          193 vessels carrying an invasion force of up to 40,000 troops, including 6,000 Janissaries
          and thousands of corsairs. Commanding the land forces was Fourth Vizier Mustafa Pasha. En route
          from North Africa sailed the most feared corsair in the Mediterranean: <strong>Dragut</strong>,
          the "Drawn Sword of Islam," then approximately 80 years old.
        </p>
        <p style={S.p}>
          Opposing this juggernaut stood Grand Master <strong>Jean Parisot de la Valette</strong>, a
          71-year-old veteran who had himself once served a year as a Barbary galley slave. His total
          force numbered roughly 6,100 men. The fort's initial garrison comprised approximately 150
          knights and 600 soldiers — crammed into a fortification designed for fewer than 60.
        </p>

        <PullQuote
          quote="If so small a son has cost us so dear, what price shall we have to pay for so large a father?"
          cite="Mustafa Pasha, surveying Fort St Elmo's ruins, June 1565 — gazing across at Fort St Angelo"
        />

        <p style={S.p}>
          On May 27, the full bombardment began. Thirty-six Ottoman cannon on Mount Sciberras delivered
          between 600 and 1,400 cannonballs daily. The cavalier, rising above the main walls, was both
          the fort's primary elevated gun platform and its most conspicuous target. Each night, La
          Valette sent volunteers by boat across Grand Harbour — men who knew they were rowing to
          certain death. On June 18, a stone splinter struck Dragut above the right ear; he lingered
          five days before dying on June 23, the same day the fort finally fell.
        </p>

        {/* TIMELINE */}
        <SectionHead eyebrow="Chronology" title="The Siege of Fort St Elmo — Key Dates" />
        <div style={S.timeline}>
          <div style={S.tlLine} />
          {tlData.map(({ date, event, desc, major }, i) => (
            <div key={i} style={S.tlItem}>
              <div style={S.tlDot(major)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke={major ? "#0a0a0a" : "#fff"} strokeWidth="2.5">
                  {major
                    ? <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    : <circle cx="12" cy="12" r="4" />}
                </svg>
              </div>
              <div>
                <div style={S.tlDate}>{date}</div>
                <div style={S.tlEvent}>{event}</div>
                <p style={S.tlDesc}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* SECTION: ARCHITECTURE */}
        <SectionHead eyebrow="Architecture" title="The Anatomy of the Cavalier" />

        <DiagramWrap badge="Cross-Sec" title="The Cavalier — Sec Through the Gun Platform">
          <CrossSection />
        </DiagramWrap>

        <p style={S.p}>
          A <strong>cavalier</strong> (from Italian <em>cavaliere</em>) is a raised defensive work
          constructed within a bastion or fort, providing its guns with a higher field of fire than the
          main ramparts. Guns on the cavalier could fire over the heads of guns below — two independent
          tiers of fire without mutual interference, a significant tactical advantage for harbour defence.
        </p>
        <p style={S.p}>
          At Fort St Elmo, the cavalier's position at the fort's northern apex gave its guns commanding
          arcs across both Marsamxett Harbour to the west and the Grand Harbour approach to the east —
          the entire strategic rationale for the fort's existence. The Ottomans understood this perfectly:
          their primary batteries on Mount Sciberras were specifically positioned to fire <em>down</em> onto
          the cavalier's platform and silence its guns.
        </p>

        {/* SECTION: LEGACY */}
        <SectionHead eyebrow="Legacy" title="From Ruin to Renaissance in Golden Limestone" />

        <p style={S.p}>
          La Valette understood the lesson of St Elmo's fall with crystalline clarity. The unfortified
          high ground of Mount Sciberras — from which Ottoman guns had fired down into the fort — must
          never again be left open. On March 28, 1566, he laid the foundation stone of a new fortified
          city on the entire Sciberras Peninsula: Valletta. Francesco Laparelli designed both the city
          walls and a comprehensive reconstruction of the ruined fort, rebuilding the cavalier with
          reinforced walls and deeper ditches.
        </p>

        <PullQuote
          quote="To bear witness to a heroism and devotion that will long be famous in history."
          cite="King George VI, awarding the George Cross to the Island of Malta, April 1942 — the first time a civilian population received the honour"
        />

        <p style={S.p}>
          On June 11, 1940 — the day after Italy declared war — Italian bombers struck the fort at
          6:55 AM, killing six Royal Malta Artillery gunners. It was the <strong>first aerial bombardment
          of Malta</strong> in World War II. The island endured 3,340 air raids and 15,000 tons of bombs,
          earning the unprecedented George Cross for its entire population in 1942. The original medal
          is now displayed in the National War Museum within the fort.
        </p>

        {/* SECTION: VISITING */}
        <SectionHead eyebrow="Visitor Guide" title="Walking the Cavalier Today" />

        <p style={S.p}>
          The Royal Malta Artillery departed Fort St Elmo on March 26, 1972, ending more than four
          centuries of continuous military use. After the World Monuments Fund placed the fort on its
          2008 Watch List of 100 Most Endangered Sites, a major restoration was completed in 2015 at
          a cost of €15.3 million. The National War Museum spans seven chronological sections covering
          7,000 years of Maltese military history, including the fuselage of Gloster Sea Gladiator
          "Faith" and the George Cross itself.
        </p>

        <div style={S.visitorBox}>
          <div style={S.visitorH}>📍 Visitor Information — Fort St Elmo &amp; National War Museum</div>
          <div style={S.visitorGrid}>
            {[
              ["Location", "St Elmo Place, Valletta VLT 1741, Malta"],
              ["Opening Hours", "Daily 09:00–17:00 (last entry 16:30)"],
              ["Adult Admission", "€10 (includes National War Museum)"],
              ["In Guardia", "Selected Sundays — cannon salutes, 16th-c. military drill"],
              ["UNESCO Status", "Part of City of Valletta World Heritage Site (1980)"],
              ["Photography", "Permitted throughout — dawn gives the best light on the limestone"],
            ].map(([label, value]) => (
              <div key={label}>
                <strong style={S.visitorLabel}>{label}</strong>
                {value}
              </div>
            ))}
          </div>
        </div>

        {/* CLOSING */}
        <SectionHead eyebrow="Reflection" title="Stone That Remembers" />

        <p style={S.p}>
          Fort St Elmo's Cavalier distils a paradox that runs through all military architecture:
          structures built to destroy become, through the passage of centuries, monuments to endurance.
          The cavalier was designed as a killing platform — a raised gun position from which to rake
          harbour entrances and sweep assaulting infantry. Yet what it preserved was <em>time</em>.
          The 31 days that its defenders bought in 1565 cost them everything and saved everything else.
        </p>
        <p style={S.p}>
          Mustafa Pasha's lament over the "small son" that bled his army remains the fort's truest
          epitaph. In globigerina limestone that has weathered from gold to brown over nearly five
          centuries, the cavalier still commands its two harbours. No longer with cannon. But with a
          story that echoes in every stone.
        </p>

      </main>

      {/* FOOTER */}
      <footer style={S.footer}>
        <div style={{ ...S.ngRect, display: "inline-block", verticalAlign: "middle", marginRight: 10, width: 22, height: 22 }} />
        National Geographic Society · History &amp; Exploration · Fort St Elmo, Valletta, Malta
        <div style={{ marginTop: 8, opacity: 0.6 }}>
          Historical research compiled from Heritage Malta, Wikipedia, and multiple scholarly sources
        </div>
      </footer>
    </div>
  );
}
