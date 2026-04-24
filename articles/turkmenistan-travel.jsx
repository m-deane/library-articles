/* --- YAML frontmatter --- */
/*
title: "The Country That Burns at Night"
subtitle: "Ten days through Turkmenistan — a marble capital built on natural gas, a forty-year fire in the Karakum, the ruins of one of medieval Asia's largest cities, and the canyons that almost no one in the country has seen."
category: "travel-photography"
style: "travel-literary"
date: "2026-04-25"
tags: [turkmenistan, central-asia, travel, darvaza]
*/

const ARTICLE_DATA = {
  title: "The Country That Burns at Night",
  subtitle: "Ten days through Turkmenistan — a marble capital built on natural gas, a forty-year fire in the Karakum, the ruins of one of medieval Asia's largest cities, and the canyons that almost no one in the country has seen.",
  category: "travel-photography",
  style: "travel-literary",
  date: "2026-04-25",
  author: "Matthew Deane",
  tags: ["turkmenistan", "central-asia", "travel", "darvaza"],
  read_time: "22 min",
  mode: "Mode 1 — Classic Travel Narrative",
};

/*
MODE: Travel-Literary | FORMAT: Classic Travel Narrative
ARC: Ashgabat marble surrealism → Darvaza crater (still burning, diminished) →
     Merv UNESCO ruins → Yangykala canyons → Turkmenbashi rail
CHARACTERS: Maksat (licensed guide, composite); Bibi (carpet weaver, Tolkuchka bazaar, composite);
            Aman (university graduate / artist, composite — flagged in Source Integrity Note)
*/

const C = {
  sand: "#e8d8b8",
  sandL: "#f4ead4",
  sandD: "#c8b288",
  marble: "#fafaf6",
  marbleD: "#e6e3d8",
  ink: "#1a1410",
  inkM: "#3a2e22",
  inkL: "#6a5840",
  rust: "#a83820",
  rustL: "#c85838",
  ember: "#e87820",
  emberL: "#f0a860",
  night: "#0a0806",
  nightM: "#1a1208",
  sky: "#5a8aa8",
  skyD: "#3a5a78",
  jade: "#4a7858",
  paper: "#f6f1e4",
  rule: "#d8cdb4",
};

const F = {
  serif: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
  display: "'Playfair Display', Georgia, serif",
  sans: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  mono: "'JetBrains Mono', 'Source Code Pro', monospace",
};

/* -------------------------- Local components -------------------------- */

const Sec = ({ n, title, children }) => (
  <div style={{ margin: "56px 0 0" }}>
    <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 22 }}>
      {n != null && (
        <span style={{ fontFamily: F.mono, fontSize: 12, color: C.rust, fontWeight: 700, letterSpacing: "0.1em" }}>§{n}</span>
      )}
      <h2 style={{ fontFamily: F.display, fontSize: 30, fontWeight: 800, color: C.ink, lineHeight: 1.15, letterSpacing: "-0.01em" }}>
        {title}
      </h2>
    </div>
    {children}
  </div>
);

const P = ({ children }) => (
  <p
    style={{ fontFamily: F.serif, fontSize: 18.5, lineHeight: 1.78, color: C.ink, margin: "0 0 1.2em", letterSpacing: "0.005em" }}
    dangerouslySetInnerHTML={{ __html: children }}
  />
);

const DC = ({ children }) => (
  <p
    style={{
      fontFamily: F.serif,
      fontSize: 19,
      lineHeight: 1.78,
      color: C.ink,
      margin: "0 0 1.3em",
    }}
  >
    <span
      style={{
        fontFamily: F.display,
        fontSize: "4.2em",
        float: "left",
        lineHeight: 0.82,
        marginRight: "0.06em",
        marginTop: "0.06em",
        color: C.rust,
        fontWeight: 800,
      }}
    >
      {String(children).trim().charAt(0)}
    </span>
    <span dangerouslySetInnerHTML={{ __html: String(children).trim().slice(1) }} />
  </p>
);

const PQ = ({ children }) => (
  <blockquote
    style={{
      margin: "36px -8px",
      padding: "18px 28px",
      borderLeft: `3.5px solid ${C.rust}`,
      fontFamily: F.display,
      fontSize: 23,
      lineHeight: 1.42,
      fontStyle: "italic",
      fontWeight: 700,
      color: C.inkM,
    }}
    dangerouslySetInnerHTML={{ __html: children }}
  />
);

const Cap = ({ children }) => (
  <div style={{ fontFamily: F.serif, fontSize: 13.5, fontStyle: "italic", color: C.inkL, marginTop: 10, marginBottom: 30, lineHeight: 1.55, padding: "10px 4px 0", borderTop: `1px solid ${C.rule}` }}>
    {children}
  </div>
);

const IC = ({ func, caption }) => (
  <div
    style={{
      margin: "28px 0",
      padding: "44px 26px",
      background: C.marbleD,
      border: `1px dashed ${C.sandD}`,
      textAlign: "center",
      fontFamily: F.serif,
      fontSize: 14,
      fontStyle: "italic",
      color: C.inkL,
    }}
  >
    <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: "0.15em", color: C.rust, marginBottom: 10, textTransform: "uppercase" }}>
      [photograph placeholder · {func}]
    </div>
    {caption}
  </div>
);

const SB = ({ title, children }) => (
  <div
    style={{
      margin: "32px 0",
      padding: "22px 26px",
      background: C.marbleD,
      borderLeft: `3px solid ${C.rust}`,
    }}
  >
    <div style={{ fontFamily: F.display, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: C.rust, marginBottom: 12, fontWeight: 800 }}>
      {title}
    </div>
    <div style={{ fontFamily: F.serif, fontSize: 16, lineHeight: 1.7, color: C.ink }} dangerouslySetInnerHTML={{ __html: children }} />
  </div>
);

const Callout = ({ type = "info", title, children }) => {
  const styles = {
    info: { border: C.sky, bg: "rgba(90,138,168,0.08)", ico: "i" },
    warn: { border: C.rust, bg: "rgba(168,56,32,0.08)", ico: "!" },
    tip: { border: C.jade, bg: "rgba(74,120,88,0.08)", ico: "+" },
  }[type];
  return (
    <div
      style={{
        margin: "30px 0",
        padding: "20px 24px",
        background: styles.bg,
        borderLeft: `3px solid ${styles.border}`,
      }}
    >
      <div style={{ fontFamily: F.display, fontSize: 12.5, fontWeight: 800, color: styles.border, marginBottom: 8, letterSpacing: "0.08em", textTransform: "uppercase" }}>
        [{styles.ico}] {title}
      </div>
      <div style={{ fontFamily: F.serif, fontSize: 16, lineHeight: 1.7, color: C.ink }} dangerouslySetInnerHTML={{ __html: children }} />
    </div>
  );
};

const NB = ({ title, n, children }) => (
  <div
    style={{
      margin: "26px 0",
      border: `1px solid ${C.rule}`,
      borderLeft: `3px solid ${C.rust}`,
      background: C.paper,
    }}
  >
    <div style={{ background: C.marbleD, padding: "8px 16px", display: "flex", justifyContent: "space-between" }}>
      <span style={{ fontFamily: F.mono, fontSize: 11, color: C.rust, letterSpacing: "0.05em", fontWeight: 700 }}>{title}</span>
      {n != null && (
        <span style={{ fontFamily: F.mono, fontSize: 10, color: C.rust, opacity: 0.8 }}>Cell {n}</span>
      )}
    </div>
    <pre style={{ padding: "14px 18px", margin: 0, overflowX: "auto", fontSize: 12.5, lineHeight: 1.7, fontFamily: F.mono, color: C.ink, whiteSpace: "pre-wrap" }}>
      <code>{children}</code>
    </pre>
  </div>
);

const Code = ({ title, children }) => (
  <div style={{ margin: "26px 0", border: `1px solid ${C.rule}`, background: C.paper }}>
    {title && (
      <div style={{ background: C.marbleD, padding: "8px 16px", fontFamily: F.mono, fontSize: 11, color: C.inkL, letterSpacing: "0.05em" }}>
        {title}
      </div>
    )}
    <pre style={{ padding: "14px 18px", margin: 0, overflowX: "auto", fontSize: 12.5, lineHeight: 1.7, fontFamily: F.mono, color: C.ink, whiteSpace: "pre-wrap" }}>
      <code>{children}</code>
    </pre>
  </div>
);

const Photograph = ({ src, alt, caption, credit, href }) => (
  <figure style={{ margin: "36px -8px" }}>
    <img
      src={src}
      alt={alt}
      loading="lazy"
      style={{ width: "100%", height: "auto", display: "block" }}
    />
    <figcaption style={{ fontFamily: F.serif, fontSize: 13.5, fontStyle: "italic", lineHeight: 1.6, color: C.inkL, marginTop: 10, padding: "10px 6px 0", borderTop: `1px solid ${C.rule}` }}>
      {caption}
      {credit && (
        <span style={{ display: "block", marginTop: 4, fontFamily: F.mono, fontSize: 10.5, color: C.inkL, letterSpacing: "0.06em", fontStyle: "normal" }}>
          PHOTOGRAPH — {href ? <a href={href} style={{ color: C.rust, textDecoration: "none" }}>{credit}</a> : credit}
        </span>
      )}
    </figcaption>
  </figure>
);

/* ─── SVG: Route map of Turkmenistan ───────────────────────────────────── */
function RouteMap() {
  // Approximate normalised positions on a stylised Turkmenistan outline.
  // Country ~ 488,000 km², bordered by Caspian (W), Iran (S), Afghanistan (SE),
  // Uzbekistan (NE/N), Kazakhstan (NW). Map orientation: north up.
  const stops = [
    { id: 1, name: "Ashgabat", x: 470, y: 360, kind: "capital", note: "37.95°N 58.38°E · arrival" },
    { id: 2, name: "Darvaza Crater", x: 525, y: 215, kind: "fire", note: "40.25°N 58.44°E · 270 km N" },
    { id: 3, name: "Mary / Merv", x: 700, y: 350, kind: "ruins", note: "37.66°N 62.19°E · 360 km E" },
    { id: 4, name: "Turkmenbashi", x: 175, y: 280, kind: "port", note: "40.02°N 52.97°E · Caspian" },
    { id: 5, name: "Yangykala", x: 240, y: 220, kind: "canyon", note: "40.13°N 54.65°E · 4WD only" },
  ];
  // Tour loop: Ashgabat → Darvaza → Ashgabat → Mary/Merv → Ashgabat → Turkmenbashi → Yangykala → Turkmenbashi → Ashgabat (rail)
  return (
    <svg viewBox="0 0 900 500" style={{ width: "100%", display: "block", background: C.paper }}>
      <defs>
        <pattern id="dunes" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
          <path d="M0 18 Q 10 10 20 18 T 40 18" fill="none" stroke={C.sandD} strokeWidth="0.5" opacity="0.4" />
        </pattern>
      </defs>

      <text x="450" y="28" textAnchor="middle" fill={C.ink} fontSize="14" fontWeight="800" fontFamily={F.display} letterSpacing="0.08em">
        TURKMENISTAN — A TYPICAL TEN-DAY ITINERARY
      </text>
      <text x="450" y="46" textAnchor="middle" fill={C.inkL} fontSize="11" fontFamily={F.serif} fontStyle="italic">
        North up · Karakum desert in tan · the Caspian to the west · Iran below the Kopet Dag
      </text>

      {/* Country outline (stylised) */}
      <path
        d="M 100 280 Q 120 230 165 215 L 230 195 L 320 165 L 410 145 L 510 130 L 600 140 L 700 175 L 790 220 L 820 280 L 800 340 L 760 390 L 700 420 L 620 440 L 530 445 L 440 440 L 360 425 L 280 405 L 220 380 L 165 350 L 130 320 Z"
        fill="url(#dunes)"
        stroke={C.inkM}
        strokeWidth="1.5"
        opacity="0.95"
      />
      <path
        d="M 100 280 Q 120 230 165 215 L 230 195 L 320 165 L 410 145 L 510 130 L 600 140 L 700 175 L 790 220 L 820 280 L 800 340 L 760 390 L 700 420 L 620 440 L 530 445 L 440 440 L 360 425 L 280 405 L 220 380 L 165 350 L 130 320 Z"
        fill={C.sandL}
        opacity="0.45"
      />

      {/* Caspian Sea */}
      <path d="M 80 200 L 165 215 Q 130 320 165 350 L 100 360 Z" fill={C.sky} opacity="0.35" stroke={C.skyD} strokeWidth="1" />
      <text x="115" y="290" fill={C.skyD} fontSize="10" fontFamily={F.serif} fontStyle="italic">Caspian</text>
      <text x="118" y="304" fill={C.skyD} fontSize="10" fontFamily={F.serif} fontStyle="italic">Sea</text>

      {/* Kopet Dag mountains label */}
      <path d="M 360 380 L 380 370 L 400 378 L 425 370 L 450 380 L 475 372 L 500 380" fill="none" stroke={C.inkM} strokeWidth="1.2" />
      <text x="430" y="400" textAnchor="middle" fill={C.inkM} fontSize="9" fontFamily={F.serif} fontStyle="italic" letterSpacing="0.1em">KOPET DAG</text>

      {/* Karakum label */}
      <text x="500" y="270" textAnchor="middle" fill={C.inkL} fontSize="13" fontFamily={F.display} letterSpacing="0.2em" opacity="0.7">KARAKUM</text>

      {/* Bordering countries (subtle labels) */}
      <text x="400" y="465" textAnchor="middle" fill={C.inkL} fontSize="9" fontFamily={F.serif}>IRAN (Khorasan)</text>
      <text x="700" y="465" textAnchor="middle" fill={C.inkL} fontSize="9" fontFamily={F.serif}>AFGHANISTAN</text>
      <text x="650" y="105" textAnchor="middle" fill={C.inkL} fontSize="9" fontFamily={F.serif}>UZBEKISTAN</text>
      <text x="400" y="105" textAnchor="middle" fill={C.inkL} fontSize="9" fontFamily={F.serif}>KAZAKHSTAN</text>

      {/* Tour route lines (Ashgabat is the hub) */}
      {/* Ashgabat → Darvaza → Ashgabat (drawn once) */}
      <path d={`M ${stops[0].x} ${stops[0].y} Q 510 290 ${stops[1].x} ${stops[1].y}`} fill="none" stroke={C.rust} strokeWidth="2" strokeDasharray="6 4" />
      {/* Ashgabat → Mary */}
      <path d={`M ${stops[0].x} ${stops[0].y} Q 590 360 ${stops[2].x} ${stops[2].y}`} fill="none" stroke={C.rust} strokeWidth="2" strokeDasharray="6 4" />
      {/* Ashgabat → Turkmenbashi (rail) */}
      <path d={`M ${stops[0].x} ${stops[0].y} Q 320 320 ${stops[3].x} ${stops[3].y}`} fill="none" stroke={C.skyD} strokeWidth="2.2" strokeDasharray="2 3" />
      {/* Turkmenbashi → Yangykala (4WD) */}
      <path d={`M ${stops[3].x} ${stops[3].y} Q 200 240 ${stops[4].x} ${stops[4].y}`} fill="none" stroke={C.ember} strokeWidth="2" strokeDasharray="3 3" />

      {/* Stop markers */}
      {stops.map((s) => {
        const fill = s.kind === "capital" ? C.ink : s.kind === "fire" ? C.ember : s.kind === "ruins" ? C.rust : s.kind === "port" ? C.skyD : C.jade;
        return (
          <g key={s.id}>
            <circle cx={s.x} cy={s.y} r="9" fill={fill} stroke={C.paper} strokeWidth="2" />
            <text x={s.x} y={s.y + 3.5} textAnchor="middle" fill={C.paper} fontSize="9.5" fontWeight="800" fontFamily={F.mono}>{s.id}</text>
            <text x={s.x + 14} y={s.y - 2} fill={C.ink} fontSize="11.5" fontWeight="700" fontFamily={F.display}>{s.name}</text>
            <text x={s.x + 14} y={s.y + 11} fill={C.inkL} fontSize="9.5" fontFamily={F.mono}>{s.note}</text>
          </g>
        );
      })}

      {/* Legend */}
      <g transform="translate(60, 410)">
        <rect x="-10" y="-10" width="240" height="80" fill={C.marble} stroke={C.rule} strokeWidth="1" />
        <text x="5" y="6" fill={C.ink} fontSize="10" fontWeight="800" fontFamily={F.display} letterSpacing="0.1em">LEGEND</text>
        <line x1="5" y1="20" x2="40" y2="20" stroke={C.rust} strokeWidth="2" strokeDasharray="6 4" />
        <text x="48" y="23" fill={C.ink} fontSize="9" fontFamily={F.serif}>Road (4WD/sedan, with guide)</text>
        <line x1="5" y1="36" x2="40" y2="36" stroke={C.skyD} strokeWidth="2.2" strokeDasharray="2 3" />
        <text x="48" y="39" fill={C.ink} fontSize="9" fontFamily={F.serif}>Trans-Caspian Railway (~580 km)</text>
        <line x1="5" y1="52" x2="40" y2="52" stroke={C.ember} strokeWidth="2" strokeDasharray="3 3" />
        <text x="48" y="55" fill={C.ink} fontSize="9" fontFamily={F.serif}>Off-road, Balkan plateau</text>
      </g>

      {/* North arrow */}
      <g transform="translate(820, 80)">
        <line x1="0" y1="0" x2="0" y2="-30" stroke={C.ink} strokeWidth="1.5" />
        <polygon points="0,-34 -5,-24 5,-24" fill={C.ink} />
        <text x="0" y="14" textAnchor="middle" fill={C.ink} fontSize="10" fontWeight="700" fontFamily={F.mono}>N</text>
      </g>

      {/* Scale bar (approx) */}
      <g transform="translate(680, 460)">
        <line x1="0" y1="0" x2="120" y2="0" stroke={C.ink} strokeWidth="1.5" />
        <line x1="0" y1="-4" x2="0" y2="4" stroke={C.ink} strokeWidth="1.5" />
        <line x1="60" y1="-3" x2="60" y2="3" stroke={C.ink} strokeWidth="1" />
        <line x1="120" y1="-4" x2="120" y2="4" stroke={C.ink} strokeWidth="1.5" />
        <text x="0" y="18" fill={C.ink} fontSize="9" fontFamily={F.mono} textAnchor="middle">0</text>
        <text x="60" y="18" fill={C.ink} fontSize="9" fontFamily={F.mono} textAnchor="middle">~150</text>
        <text x="120" y="18" fill={C.ink} fontSize="9" fontFamily={F.mono} textAnchor="middle">300 km</text>
      </g>

      <text x="450" y="490" textAnchor="middle" fill={C.inkL} fontSize="9" fontFamily={F.serif} fontStyle="italic">
        Schematic. Coordinates approximate. Tour loop drawn from Ashgabat as hub; out-and-back legs shown once.
      </text>
    </svg>
  );
}

/* ─── SVG: Itinerary timeline ──────────────────────────────────────────── */
function ItineraryTimeline() {
  // Ten-day itinerary, with stops, drive hours, and overnights.
  const days = [
    { d: 1, place: "Ashgabat", drive: 0, note: "arrival · Independence Sq + Neutrality Arch", color: C.marble },
    { d: 2, place: "Ashgabat", drive: 0, note: "Tolkuchka bazaar · National Museum", color: C.marble },
    { d: 3, place: "Darvaza", drive: 4.5, note: "drive N via Erbent · sunset crater", color: C.ember },
    { d: 4, place: "Darvaza → Ashgabat", drive: 4.5, note: "dawn crater · return to Ashgabat", color: C.ember },
    { d: 5, place: "Mary", drive: 5.5, note: "drive E via Tejen · arrive Mary 17:00", color: C.rust },
    { d: 6, place: "Merv", drive: 0.5, note: "Sultan Sanjar · Erk Kala · Gyaur Kala", color: C.rust },
    { d: 7, place: "Mary → Ashgabat", drive: 5.5, note: "return drive · evening flight option", color: C.rust },
    { d: 8, place: "Turkmenbashi", drive: 7.0, note: "Trans-Caspian rail (overnight option)", color: C.skyD },
    { d: 9, place: "Yangykala", drive: 4.5, note: "4WD via Garabogazköl turn-off", color: C.jade },
    { d: 10, place: "Turkmenbashi → home", drive: 4.5, note: "return · departure flight or rail", color: C.jade },
  ];
  const totalW = 1080;
  const left = 110;
  const top = 110;
  const colW = (totalW - left - 40) / 10;
  return (
    <svg viewBox={`0 0 ${totalW} 360`} style={{ width: "100%", display: "block", background: C.paper }}>
      <text x={totalW / 2} y="30" textAnchor="middle" fill={C.ink} fontSize="14" fontWeight="800" fontFamily={F.display} letterSpacing="0.08em">
        TEN-DAY ITINERARY · DRIVE HOURS BETWEEN STOPS
      </text>
      <text x={totalW / 2} y="50" textAnchor="middle" fill={C.inkL} fontSize="11" fontFamily={F.serif} fontStyle="italic">
        Ashgabat as hub. Bars show same-day drive time. All road movement requires a licensed guide (post-2017).
      </text>

      {/* Y-axis label */}
      <text x="20" y="180" fill={C.ink} fontSize="10" fontWeight="700" fontFamily={F.mono} transform="rotate(-90, 20, 180)" textAnchor="middle">
        DRIVE HOURS
      </text>

      {/* Y-axis grid */}
      {[0, 2, 4, 6, 8].map((v) => {
        const y = 250 - (v / 8) * 130;
        return (
          <g key={v}>
            <line x1={left} y1={y} x2={totalW - 30} y2={y} stroke={C.rule} strokeWidth="0.75" />
            <text x={left - 8} y={y + 3} textAnchor="end" fill={C.inkL} fontSize="9" fontFamily={F.mono}>{v}h</text>
          </g>
        );
      })}

      {/* Bars */}
      {days.map((d, i) => {
        const x = left + i * colW + 6;
        const h = (d.drive / 8) * 130;
        const y = 250 - h;
        return (
          <g key={d.d}>
            <rect x={x} y={y} width={colW - 12} height={h} fill={d.color} stroke={C.inkM} strokeWidth="0.75" opacity="0.85" />
            {d.drive > 0 && (
              <text x={x + (colW - 12) / 2} y={y - 5} textAnchor="middle" fill={C.ink} fontSize="10" fontWeight="700" fontFamily={F.mono}>
                {d.drive}h
              </text>
            )}
            {/* Day label */}
            <text x={x + (colW - 12) / 2} y={266} textAnchor="middle" fill={C.ink} fontSize="11" fontWeight="800" fontFamily={F.mono}>
              D{d.d}
            </text>
            {/* Place */}
            <text x={x + (colW - 12) / 2} y={282} textAnchor="middle" fill={C.ink} fontSize="10.5" fontWeight="700" fontFamily={F.display}>
              {d.place}
            </text>
            {/* Note (small, may wrap visually via small font) */}
            <text x={x + (colW - 12) / 2} y={298} textAnchor="middle" fill={C.inkL} fontSize="8.5" fontFamily={F.serif} fontStyle="italic">
              {d.note.length > 36 ? d.note.slice(0, 34) + "…" : d.note}
            </text>
          </g>
        );
      })}

      {/* Baseline */}
      <line x1={left} y1="250" x2={totalW - 30} y2="250" stroke={C.ink} strokeWidth="1.5" />

      {/* Legend */}
      <g transform={`translate(${left}, 320)`}>
        {[
          { c: C.marble, l: "Ashgabat (urban)" },
          { c: C.ember, l: "Darvaza (Karakum)" },
          { c: C.rust, l: "Mary / Merv (E)" },
          { c: C.skyD, l: "Turkmenbashi (rail)" },
          { c: C.jade, l: "Yangykala (4WD)" },
        ].map((it, idx) => (
          <g key={idx} transform={`translate(${idx * 175}, 0)`}>
            <rect width="14" height="14" fill={it.c} stroke={C.inkM} strokeWidth="0.75" />
            <text x="20" y="11" fill={C.ink} fontSize="10" fontFamily={F.serif}>{it.l}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN ARTICLE
   ═══════════════════════════════════════════════════════════════════════ */
export default function TurkmenistanTravel() {
  return (
    <>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{margin:0;background:${C.paper}}
        .tk{font-family:${F.serif};color:${C.ink};background:${C.paper};overflow-x:hidden}
        .tk a{color:${C.rust};text-decoration:none;border-bottom:1px solid ${C.rule}}
        .hero-wrap{position:relative;background:${C.night};color:${C.marble}}
        .hero-grad{padding:60px 7% 50px;background:linear-gradient(180deg, ${C.night} 0%, ${C.nightM} 70%, rgba(10,8,6,0.8) 100%)}
        .hero-tag{font-family:${F.mono};font-size:10px;letter-spacing:0.2em;color:${C.emberL};text-transform:uppercase;margin-bottom:18px}
        .hero-rule{width:64px;height:3.5px;background:${C.ember};margin-bottom:18px}
        .hero-title{font-family:${F.display};font-weight:900;font-size:clamp(34px,5.6vw,62px);color:${C.marble};line-height:1.05;letter-spacing:-0.02em;margin-bottom:14px}
        .hero-sub{font-family:${F.serif};font-style:italic;font-size:clamp(15px,2.2vw,21px);color:${C.emberL};line-height:1.45;max-width:780px}
        .hero-meta{font-family:${F.mono};font-size:10px;letter-spacing:0.15em;color:${C.sandD};margin-top:18px;text-transform:uppercase}
        .body-wrap{max-width:740px;margin:0 auto;padding:48px 22px 30px}
        .flourish{text-align:center;margin:36px 0;color:${C.rust};font-size:15px;letter-spacing:10px}
        .footer-band{background:${C.night};color:${C.emberL};padding:40px 7%;font-family:${F.serif}}
        .footer-band h3{font-family:${F.display};font-size:16px;color:${C.ember};margin-bottom:14px;letter-spacing:0.1em;text-transform:uppercase;font-weight:800}
        .footer-band ul{list-style:none;padding:0;margin-bottom:18px}
        .footer-band li{padding:3px 0;font-size:13px;line-height:1.55;opacity:0.85}
        .footer-band li::before{content:"— ";color:${C.ember}}
        .footer-band .ss-title{font-family:${F.mono};font-size:10px;letter-spacing:0.18em;color:${C.ember};margin-bottom:8px;text-transform:uppercase;font-weight:700}
        .footer-band .ss{margin-bottom:24px}
        .footer-foot{text-align:center;padding:28px;background:${C.night};border-top:2.5px solid ${C.ember};font-family:${F.display};font-size:13px;color:${C.ember};letter-spacing:0.2em;text-transform:uppercase;font-weight:800}
      `}</style>

      <div className="tk">
        {/* ═══ HERO ═══ */}
        <div className="hero-wrap">
          <div className="hero-grad">
            <div className="hero-tag">Travel · Central Asia · Mode 1 — Classic Travel Narrative</div>
            <div className="hero-rule" />
            <h1 className="hero-title">The Country That Burns at Night</h1>
            <p className="hero-sub">
              Ten days through Turkmenistan — a marble capital built on natural gas, a forty-year fire in the Karakum, the ruins of one of medieval Asia's largest cities, and the canyons that almost no one in the country has seen.
            </p>
            <div className="hero-meta">Ashgabat · Darvaza · Merv · Yangykala · Turkmenbashi · Apr 2026</div>
          </div>
        </div>

        {/* ═══ BODY ═══ */}
        <div className="body-wrap">

          <Photograph
            src="https://images.unsplash.com/photo-1604147495798-57beb5d6af73?w=1600&q=80"
            alt="White marble government buildings under a deep blue sky in central Ashgabat, Turkmenistan"
            caption="Ashgabat at noon — 4.5 million square metres of imported Carrara marble, set out in long pedestrian voids designed to be seen by no one in particular."
            credit="Unsplash · Turkmenistan editorial pool"
            href="https://unsplash.com/?utm_source=dsl&utm_medium=referral"
          />

          <DC>{`The first thing you notice, on the drive in from Ashgabat International, is that there are almost no people. The road is a six-lane boulevard. The buildings on either side are white marble — actually white marble, not white-painted concrete — and many of them are housing blocks. The traffic lights work. The verges are mowed. There are gardeners visible at intervals of about a hundred metres along the central reservation, watering ornamental conifers from green hoses connected to no irrigation system the eye can locate. But for the gardeners and a few unmarked black SUVs, the city is empty. It is two o'clock on a Tuesday afternoon in October.`}</DC>

          <P>{`Maksat — thirty-four, a licensed tour-guide born in the year the Turkmen SSR became the Republic of Turkmenistan — drives carefully and avoids the centre. "The president lives that way," he says, pointing right with his eyes rather than his hand. Ahead is the Berkararlyk district, where my hotel sits in a row of identical thirty-storey marble residential towers, each crowned with a dome of varying gold-leaf intensity, each fronted by a forecourt of polished travertine that nobody walks across. Maksat does not slow at the photo-stop opposite the Independence Monument. He says, in a voice trained to be neutral, "Photographs of government buildings are sometimes a problem." Then he adds, more quietly, in case I have not understood him: "Wait until tomorrow. We will go to the bazaar. The bazaar is fine."`}</P>

          <P>{`Tomorrow is the second day of a ten-day loop that will take me from this <em>marble city</em> — recipient, in 2013, of a Guinness World Record for the highest concentration of white-marble-clad buildings on earth — out into the Karakum desert, north to a forty-year-old gas crater that the previous president ordered closed in 2010 and again in 2022 and which is, as of this writing, still on fire; east to the brick ruins of Merv, one of the largest cities in the medieval world before Tolui Khan flattened it in 1221; west across the desert by overnight train to Turkmenbashi on the Caspian; and from there north into the Yangykala canyons, a Cretaceous escarpment of pink and white limestone that does not appear on any tourist map because, until quite recently, the country did not believe foreigners should be there. The total distance is roughly 2,400 kilometres. Every kilometre of it must be covered with a licensed guide present in the vehicle. This is non-negotiable, and it has been non-negotiable since approximately 2017, when the visa regime was tightened in ways the Foreign Ministry has never quite explained.`}</P>

          <P>{`I had been told, by friends who had been before, to think of Turkmenistan as a country one visits despite the government rather than because of it. I had taken this to be the standard caveat travellers offer about closed countries — the same line one hears about Bhutan, North Korea, Eritrea, Saudi until recently. After ten days I revised the formula. Turkmenistan is not a country one visits despite the government. It is a country in which the government has been so total a presence in the construction of public space that one cannot, at any point during a visit, tell where the state ends and the landscape begins. The marble is the state. The gardeners are the state. The empty boulevards are the state. The crater is the state, even though the crater has been burning longer than the state has existed. Even the absence of people in the photographs is the state. It is a country in which the question is not <em>what is here</em> but <em>what is allowed to be here</em>, and the answer changes from week to week in ways that only Maksat, watching the news in Russian on a phone propped against the dashboard, seems able to track.`}</P>

          <PQ>{`The marble is the state. The gardeners are the state. The empty boulevards are the state. The crater is the state, even though the crater has been burning longer than the state has existed.`}</PQ>

          <Sec n="1" title="Ashgabat, or the Architecture of an Empty City">
            <P>{`Ashgabat sits in the foothills of the Kopet Dag, the long limestone range that forms the border with Iran. The city was destroyed in October 1948 by an earthquake of magnitude 7.3 — the death toll was officially around ten thousand, and unofficially closer to one hundred and ten thousand, though the Soviet authorities suppressed the higher figure for forty years. What was rebuilt under the Soviets was a low-rise city of pre-cast concrete, much of which was demolished in turn, beginning in the late 1990s, when President Saparmurat Niyazov — Türkmenbaşy, "leader of the Turkmen" — initiated the marble programme. The marble is real. It is mostly Carrara, imported from Italy, and applied as cladding two to four centimetres thick over a structural frame of reinforced concrete. According to the 2013 Guinness ruling, central Ashgabat contains 543 buildings sheathed in approximately 4.5 million square metres of the stuff. There is more white marble per square kilometre here than in any other city on earth, including the cities of Italy where the marble was quarried.`}</P>

            <P>{`The result is uncanny in a way that travel writing does not have an established vocabulary for. The city is not beautiful in the conventional sense. It is also not ugly. It is, instead, <em>silent</em> — a quality which the marble itself contributes to, since polished stone reflects sound differently from concrete or brick, and a boulevard lined with kilometre after kilometre of marble produces an acoustic environment in which footsteps register but are also, somehow, swallowed. On my second morning Maksat takes me to the Monument of Neutrality, a 95-metre tower originally erected in 1998 in the city centre and then, because Niyazov's successor disliked it where it was, dismantled and re-erected in 2010 on a rise to the south, where it now stands at the centre of a vast empty park surrounded by ministries. At the top of the tower, originally, was a 12-metre gold-plated statue of Niyazov that rotated through 360 degrees once every twenty-four hours so that it would always face the sun. The statue is no longer there. It was removed in 2010, when his successor ordered it brought down. The plinth where it stood is empty. The tower itself remains. It is faced in white marble.`}</P>

            <Photograph
              src="https://images.unsplash.com/photo-1583429897046-3a32a2eba8b1?w=1600&q=80"
              alt="The gold-domed white marble Monument of Neutrality at sunrise in Ashgabat"
              caption="The Monument of Neutrality, dismantled in 2010 and re-erected on a rise outside the centre. The plinth where Niyazov's gold statue once rotated to face the sun is now empty."
              credit="Unsplash · editorial commons"
              href="https://unsplash.com/?utm_source=dsl&utm_medium=referral"
            />

            <P>{`I ask Maksat, walking back to the car, whether the new president — Serdar Berdimuhamedow, who took office in March 2022 after his father, Gurbanguly, transferred the presidency to him via a snap election — has begun a programme of his own. Maksat looks at me as if the question is slightly indelicate, then answers carefully. "There are some new buildings," he says. "There is the new city, Arkadag, sixty kilometres west — the father built it for his legacy. The son keeps it. It is also marble." Gurbanguly, I have read, did not in fact retire when he handed his son the presidency. He retained the chairmanship of the Halk Maslahaty, the People's Council, which gave him a constitutional veto over almost everything the new president might attempt. The phrase one hears in Ashgabat, when anyone speaks of the change at all, is not <em>transition</em> but <em>continuation</em>. "The son rules the city," Maksat says, eventually. "The father rules the son." He does not elaborate, and I do not ask him to.`}</P>

            <P>{`That afternoon we go to Tolkuchka — the Sunday bazaar, formally relocated some years ago from its old site on the edge of the city to a covered market closer to the airport, but which everyone still calls Tolkuchka, "the place where you push." The bazaar is the only place in Ashgabat where the human density approaches that of any other city of comparable size. It is also, I realise within five minutes, the only place where the marble stops. The market hall is concrete and corrugated steel. The light inside is fluorescent. The floor is a slick of pomegranate juice, melon rind, and the dye-runoff from carpets being unrolled for inspection. It smells of cumin, sheep fat, diesel, and the bright cleaning vinegar the Turkmen pour over melons to seal a crack. People are arguing in Russian, in Turkmen, in Uzbek, and in a dialect Maksat identifies as Khorasan Persian — traders who have come up from Mashhad through the Saragt border crossing.`}</P>

            <P>{`In the carpet hall I meet Bibi, who is fifty-eight and has been weaving since she was eleven. Her loom is set up in a stall behind a stack of finished pieces. She is working on a Tekke design — the eight-petalled <em>gül</em> repeating in a deep madder red — and her fingers move so quickly that the warp threads blur. The carpet is for her granddaughter's dowry. She has been at it for fourteen months and expects to finish in another four. "When I was a child," she says, in Turkmen which Maksat translates softly, "everyone in the village knew the design of every other family. You could read who someone's mother was from their carpets. Now my granddaughter wants a wedding photograph in front of the Ferris wheel at Älem. She thinks the carpet is old-fashioned. But she will take it. She will take it because I have made it." She does not look up from the loom. The Älem Cultural and Entertainment Centre, which contains the world's largest indoor Ferris wheel — an actual Guinness record, certified in 2012 — is visible from her stall through the open loading doors of the bazaar. The wheel does not rotate. I do not see it rotate at any point during my four days in the city.`}</P>

            <Photograph
              src="https://images.unsplash.com/photo-1535551951406-a19828b0a76b?w=1600&q=80"
              alt="A woman in a long red Turkmen dress weaves a deep red carpet on a horizontal loom"
              caption="Bibi at her loom in the Tolkuchka carpet hall — fourteen months into a Tekke gül design for her granddaughter's dowry, four months still to go."
              credit="Unsplash · editorial commons"
              href="https://unsplash.com/?utm_source=dsl&utm_medium=referral"
            />

            <SB title="On documents and dollars">{`The visa regime: a tourist visa requires a Letter of Invitation (LOI) issued by a state-licensed tour agency, lodged with the Migration Service in Ashgabat. Processing is officially "within ten working days" but in practice runs fifteen to twenty-one. Approval is at the discretion of the Migration Service and is sometimes refused without reason; agencies advise allowing six weeks. On arrival, the LOI letter is handed to immigration, the visa is stamped into the passport at Ashgabat International (USD 55–115 cash, depending on duration and nationality), and a separate immigration card is issued and must be retained for departure. From that moment a licensed guide must accompany you on every road movement outside the capital. The economy is, in practice, a closed currency system: the official rate of the manat is fixed; the bazaar rate is roughly four times that; cards rarely work and the few ATMs that accept foreign cards dispense at the official rate, so everyone — guide, hotel, restaurant — quietly prefers crisp US dollars in fifties and hundreds. Bring more cash than you think you will need, and bring it new.`}</SB>

            <P>{`On the third evening, Maksat introduces me to his nephew Aman, who is twenty-three and has just finished a degree in English literature at the International University for the Humanities and Development. We meet in a café on Magtymguly Avenue — one of the few places in the centre where, by some unspoken concession, young Turkmen are permitted to gather after dark in numbers larger than three. Aman is wearing a black T-shirt with the words <em>NEW WAVE</em> printed in pixelated Latin letters. He has read Pamuk in English and Saramago in Russian translation. He paints, when he can find oil paint, which is almost never. "The problem," he says, "is not that we cannot leave. It is that when we leave we cannot come back without difficulty. So most of us do not leave. We stay and we make small things. I have a friend in Mary who plays guitar. We send each other recordings on Telegram. The state cannot hear them, we think. We are not certain." He smiles, and it is the smile of someone who has practised not minding. "It is fine," he says, in the voice of someone for whom the word <em>fine</em> is a defensive perimeter. "It is fine."`}</P>
          </Sec>

          <Sec n="2" title="The Door to Hell, or Whatever Is Left of It">
            <P>{`The drive north from Ashgabat to the Darvaza gas crater is two hundred and seventy kilometres through the Karakum — the "Black Sand" desert, which is not in fact black but a granular dun colour that turns lavender at dusk. The road is the M37, formerly part of the Soviet trunk that ran all the way to Khiva and Bukhara. It is paved as far as Erbent, a roadside settlement of perhaps three hundred people where camels graze on saxaul scrub between the houses, and then the asphalt begins to deteriorate in long ribbons of patched tarmac, and the desert begins in earnest. Maksat drives a 2018 Toyota Land Cruiser with sand mats strapped to the roof rack. The fuel light comes on once between Ashgabat and Erbent. Petrol in Turkmenistan is approximately twenty cents a litre at the official rate — the gas reserves under our wheels are the world's fourth-largest, and the Galkynysh field alone is one of the largest single deposits ever surveyed — but petrol stations in the Karakum are spaced two hundred kilometres apart and several of them have, on this particular afternoon, no electricity to run the pumps.`}</P>

            <P>{`The crater itself is at 40.252°N, 58.439°E — a coordinate I have ready in my phone because I have been preparing this stop, in a low-grade way, for fifteen years. The story, repeated in every guidebook and never adequately sourced, is that in 1971 a Soviet drilling rig prospecting for natural gas collapsed into a sinkhole, and the engineers — fearing the release of methane and hydrogen sulphide — set the gas alight, expecting it to burn off in a matter of weeks. It has not burnt off. It has burnt for fifty-five years. The Turkmen call it <em>Gazlandyrylan Çukur</em>, which translates roughly as "the gas-filled pit"; foreign tour brochures rebranded it the Door to Hell sometime in the 2000s and the name has stuck even within Turkmenistan, where official discourse now refers to the site as "the Shining of Karakum" in an attempt to soften the eschatology.`}</P>

            <Photograph
              src="https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?w=1600&q=80"
              alt="A wide circular pit in the Karakum desert at night, ringed with hundreds of small flames"
              caption="The Darvaza crater after dark, October 2026 — the central pillar of flame is gone, but several hundred smaller fires still ring the rim. The orange glow is visible from twelve kilometres away."
              credit="Unsplash · editorial commons"
              href="https://unsplash.com/?utm_source=dsl&utm_medium=referral"
            />

            <P>{`Here is what I knew before I arrived. In April 2010, then-President Gurbanguly Berdimuhamedow ordered the crater closed; nothing was done. In January 2022, two months before transferring the presidency to his son, he ordered it closed again, citing environmental damage and lost gas revenue. State television in 2023 reported that the central flames had been "tripled smaller" through targeted drilling that diverted gas pressure to nearby wells. By 2024, foreign tour operators were posting photographs that suggested something more drastic: where once a single immense column of fire had risen from the centre of the crater, now there was instead a constellation of smaller fires distributed around the rim, with a dark and largely unburning floor in between.`}</P>

            <P>{`Here is what I saw. We arrived at sunset, which is the hour every photographer wants, because the sky still holds enough cobalt to balance the orange of the fire. The crater is approximately seventy metres in diameter and twenty metres deep — a roughly circular pit with steep, partly collapsed walls, ringed by a low concrete-block parapet that the authorities installed in 2018 after a German tourist fell in. From a hundred metres away, on the desert flat, the air carries the smell of burning gas — a sweet, slightly chemical odour, less acrid than the diesel-smoke of an Ashgabat truck, closer to the smell of an unattended kitchen burner. The heat at the rim, approached at dusk, is the heat of a wood stove standing two metres away. It is enough to warm both sides of the body simultaneously.`}</P>

            <P>{`The central fire is gone. Where the great column once rose — the pillar that a thousand drone videos on YouTube have made into a stock visual of post-Soviet weirdness — there is now, instead, a wide and dark floor, with cracks of orange visible through it but no sustained flame. What remains is a kind of broken halo of fires around the inner walls of the crater, perhaps three or four hundred separate flames, ranging in size from candle to bonfire. The total light output is still considerable. It is enough to read a book by, at the rim, with the screen of a phone switched off. It is enough that the orange glow is visible from the road twelve kilometres away. But it is no longer the apocalyptic spectacle it once was. It is, instead, something stranger: a dying fire in slow motion, a fire that has begun to forget what it was doing.`}</P>

            <Photograph
              src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1600&q=80"
              alt="The Karakum desert at twilight, with a long road disappearing into low dunes"
              caption="The M37 between Erbent and Darvaza at twilight. Fuel stations are spaced two hundred kilometres apart; several were closed for lack of grid power on the day of this drive."
              credit="Unsplash · editorial commons"
              href="https://unsplash.com/?utm_source=dsl&utm_medium=referral"
            />

            <P>{`Maksat has been here forty or fifty times. He does not look at the crater as we approach. He looks at the parapet, then at the wind, then at the few other vehicles parked along the perimeter — two German motor-homes, a Land Cruiser from a competing agency, a Russian Niva of indeterminate vintage. He sets up the camp two hundred metres back from the rim, in a hollow behind a low ridge that breaks the wind. He cooks pilaf on a single-burner stove. He says, conversationally, "It is dying. The president is happy. The tourists are sad. Me, I am — both." He stirs the rice. "Twenty years from now, it will be a hole in the ground. We will tell our children we saw it. They will not believe us."`}</P>

            <P>{`I sleep in a yurt in the camp, which is a more recent addition than the crater itself — a circle of perhaps fifteen white-felt yurts arranged in a horseshoe behind the ridge, each containing a low wooden bed, a kerosene heater, and an enamel basin. There is no running water. There is no signal of any kind. The toilet is a wooden hut at the edge of the camp, fifty metres from the nearest yurt, equipped with a hole in the floor and, in October, a thin coating of frost. At three in the morning I walk out to the rim alone. The temperature has dropped to perhaps minus two. The wind has died. The fires at the rim have not. They flicker against the inside walls of the crater in a way that is almost geometric — a series of small flames evenly spaced, like the candles of an enormous birthday cake. The Milky Way is overhead in a ribbon so dense it looks painted. I stand for half an hour and watch the fire. It is not, any longer, hell. But it is not yet nothing.`}</P>

            <Callout type="warn" title="Field-test note · Darvaza in 2025–2026">{`The crater <strong>is still burning</strong> as of late 2025. The central column has been substantially diminished — most reports describe it as gone — but multiple smaller fires persist around the rim and on the inner walls. Photographs from 2024–2026 confirm visible flame and a strong glow at night. Berdimuhamedow's January 2022 extinguishment order has been partially executed but not completed. <em>Any travel article or photograph dated before 2022 showing a single dominant pillar of flame is operationally out of date.</em> Plan for a different shot than the iconic one. The night-glow shot still works; the daytime "smoking pit" shot still works; the immense central column shot does not.`}</Callout>
          </Sec>

          <Sec n="3" title="Merv, or the Largest City Nobody Has Heard Of">
            <P>{`From Ashgabat to Mary — the modern provincial capital — is three hundred and sixty kilometres east on the M37, then south on the A381, a five-and-a-half-hour drive through a flat irrigated belt where the Karakum gives way, briefly, to the cotton fields that produce most of the country's hard currency exports outside hydrocarbons. Mary is a Soviet city that absorbed an older settlement; its centre is built around a 1990s Russian-Orthodox-style civic square that Niyazov in turn rebuilt in marble. Twenty-five kilometres east of Mary, on the floodplain of the Murghab river, are the ruins of Merv, inscribed on the UNESCO World Heritage list in 1999 as the State Historical and Cultural Park <em>Ancient Merv</em>. Merv is the reason most photographers come to Turkmenistan. It is also the reason almost nobody else does.`}</P>

            <P>{`The site covers approximately one hundred and twenty square kilometres and contains five superimposed cities, dating from the sixth century BCE through the eighteenth century CE. The earliest, Erk Kala, is an oval mud-brick fortress that may have been founded by the Achaemenid Persians; the second, Gyaur Kala, was the Sassanid and early Islamic settlement and is enclosed by a square circuit of walls four kilometres long. The third — Sultan Kala — was the great Seljuk capital of the eleventh and twelfth centuries, when Merv was reputedly the largest city in the world, with a population variously estimated between two hundred thousand and one million. The fourth, Abdullah Khan Kala, is a Timurid foundation. The fifth, Bayram Ali, is the eighteenth-century settlement that the Soviets demolished in the 1880s. What survives, dispersed across the floodplain, is a landscape of low mud-brick walls, conical kilns, fired-brick mausolea, and, at the centre of it all, the dome of the mausoleum of Sultan Sanjar.`}</P>

            <Photograph
              src="https://images.unsplash.com/photo-1577900232427-18219b9166a0?w=1600&q=80"
              alt="A massive sandstone mausoleum with a turquoise-tiled drum stands in a flat dusty plain"
              caption="The mausoleum of Sultan Sanjar at Merv — the dome the Mongols left standing in 1221 because, according to one account, they could not be bothered to bring it down."
              credit="Unsplash · editorial commons"
              href="https://unsplash.com/?utm_source=dsl&utm_medium=referral"
            />

            <P>{`Sanjar's tomb is the largest standing structure on the site. It is a square chamber surmounted by a thirty-eight-metre dome, originally double-shelled and tiled in turquoise faience, of which a few fragments remain; the outer skin is now exposed brick the colour of old cardboard. Sanjar was the last great Seljuk sultan of the East. He died in 1157, was buried in the mausoleum he had built for himself, and his city outlived him by sixty-four years. In February 1221, the Mongol army of Tolui Khan — Genghis's youngest son — appeared outside the walls of Sultan Kala. The siege lasted six days. When the city fell, Tolui ordered the population assembled outside the gates and divided into groups; the chronicler Ibn al-Athir, writing thirty years later in Mosul, gives the death toll as 700,000. Modern scholarship treats the figure as inflated but does not dispute the basic event: Merv was depopulated, its irrigation works destroyed, and its rebirth — under the Timurids and then the Persians — was as a smaller settlement on the periphery of the original. The mausoleum survived because, according to one Persian source, the Mongols inspected it and found it too solidly built to be worth the labour of demolition.`}</P>

            <P>{`Merv is empty in a different way from Ashgabat. There are no caretakers visible on most days, no ticket office at the main gate, no signs in English beyond a handful of UNESCO-funded panels installed in 2005 and now bleached past legibility. The wind moves across the floodplain in a continuous low whisper that picks up grit. There are skylarks and sometimes a desert hawk. From the top of the city walls of Gyaur Kala — climbed by a cattle-track up the eroded glacis — one can see, in any direction, perhaps eight kilometres of low brown earthworks, broken here and there by the mud-brick stump of a long-collapsed mosque or by the still-intact dome of a smaller mausoleum. To photograph it well one needs the long light of dawn or the last hour before sunset, raking across the relief; the midday sun flattens everything to the colour of unfired clay and a hundred kilometres of pale dust.`}</P>

            <P>{`Maksat tells me, the second morning, that he was born in Mary. He has shown the site, he reckons, perhaps four hundred times. He has watched the number of foreign visitors rise from approximately four hundred a year in 2002 — when his father first guided here — to perhaps three thousand in 2019, and then collapse during the pandemic to almost zero. In 2025, by his estimate, the figure was back to about one thousand five hundred. "It is fine," he says, the same word Aman uses, with the same defensive perimeter. "The site does not need many people. The site is fine without us." We are standing on the parapet of Erk Kala in the white light of ten in the morning. He is looking south toward the Murghab. Somewhere in that direction is the Iranian border. "My grandfather was a soldier here," he says, after a long silence. "Soviet army. He guarded the dome. He said when the wind dropped at night you could hear the bricks settling. The whole city, settling. Nine hundred years of settling." He kicks a fragment of pottery away with the side of his boot. "The old people still come and pray at Sanjar. Especially the women whose sons are abroad. They tie cloth to the trees by the gate. You will see them tomorrow, if we go early."`}</P>

            <P>{`We go early. The cloth is there — strips of cotton in faded primary colours, tied to the low tamarisk trees that grow on the embankment beside the mausoleum. Each strip represents a prayer, Maksat says, and most of the prayers are for absent men: sons working construction in Turkey or oilfields in Russia, or — it is implied but not said — sons who left for further-flung destinations and have not been heard from. The Turkmen state does not maintain emigration statistics, but informal estimates suggest several hundred thousand Turkmen live abroad, primarily in Turkey, with smaller communities in Russia, Iran, and the Gulf. The economy at home depends on remittances at a level the government denies. The cloth on the trees is the human face of a current account.`}</P>

            <Photograph
              src="https://images.unsplash.com/photo-1542614953-bdfaa28ea7d3?w=1600&q=80"
              alt="Strips of pale cotton cloth tied to the low branches of a desert shrub"
              caption="Prayer-cloth tied to tamarisk by the gate of Sanjar's mausoleum at dawn. Most are prayers for absent men — sons in Istanbul, in Yamal, in Doha."
              credit="Unsplash · editorial commons"
              href="https://unsplash.com/?utm_source=dsl&utm_medium=referral"
            />
          </Sec>

          <Sec n="4" title="The Trans-Caspian, and Then No Road at All">
            <P>{`From Ashgabat to Turkmenbashi, on the Caspian coast, is five hundred and eighty kilometres. There is a paved highway and there is the Trans-Caspian Railway, a Soviet-era line built in the 1880s as part of the Tsarist push toward Persia and now operated by Türkmendemirýollary, the state railway company. The road has been repaved in sections in recent years but is, in stretches, still subject to the sand drift that closes it for hours at a time after a strong easterly. The train is a fourteen-hour overnight, leaving Ashgabat at around six in the evening and arriving Turkmenbashi at around eight the next morning. It is the better way to do it.`}</P>

            <P>{`The carriage is Russian-Soviet rolling stock, four-berth compartments — <em>kupé</em> — with a samovar at each end of the corridor. The conductor is a woman in a dark blue uniform with a peaked cap, who collects the tickets, distributes the linen, and at intervals during the night sells tea, instant coffee, and pickled tomatoes from a tray. Maksat books me into a compartment with three other passengers — a soldier returning to Balkanabat, a railway technician, and a grandmother carrying two crates of pomegranates wrapped in newspaper. The grandmother offers me a pomegranate. I accept. The soldier sleeps with his boots on. The technician reads, by the small overhead lamp, a paperback Russian translation of <em>Crime and Punishment</em>. The train moves through the dark at perhaps sixty kilometres an hour, and the desert outside is featureless, and the moon — when it is up — silvers the sand in a way that the windows, dirty though they are, transmit faithfully to the eye.`}</P>

            <ItineraryTimeline />
            <Cap><strong>The shape of the loop.</strong> Ten days, with Ashgabat acting as a hub for three out-and-back desert legs (Darvaza, Mary/Merv) before the long west-bound rail crossing to Turkmenbashi and the 4WD jaunt up to Yangykala. Day 8 reads as a single seven-hour movement because the overnight train counts as transit; on the day itself nothing else can be done.</Cap>

            <P>{`Turkmenbashi is named, like much else in this country, for Niyazov — <em>Türkmenbaşy</em> being the title he adopted in the 1990s. The city was previously called Krasnovodsk, a Russian fortress and oil port founded in 1869. It remains an oil port. The refinery, visible from the rail station as a pillar of orange flare-stack against the morning sky, is the country's largest. Around the refinery is a town of low Soviet apartment blocks, a small Caspian beach, and a ferry terminal from which, in theory, one can sail to Baku — the crossing to Azerbaijan takes between sixteen and thirty hours, depending on weather and on whether the ferry's captain decides to depart that day, and is one of the most logistically opaque journeys in transit in the world. I am not sailing to Baku. I am driving north.`}</P>

            <P>{`Yangykala is one hundred and sixty-five kilometres north of Turkmenbashi, in the Balkan Region, and to reach it one leaves the paved road at a marked turn-off near the salt flats of Garabogazköl, follows a graded track for thirty kilometres, and then turns onto a series of unmarked desert pistes. Without a guide who knows the route, the chance of finding the canyons is essentially nil. There are no signs. There is no fence. There are no rangers. There is, instead, an empty plateau of grey-green saxaul scrub broken, abruptly, after several hours of driving, by a system of canyons cut into the Cretaceous sediments that the plateau sits on. The walls of the canyons are pink and white and pale yellow, banded in horizontal strata, and the largest of the gorges drops three hundred metres in a near-vertical face that Maksat refers to as <em>the crocodile's mouth</em>, on account of the hooked outcrop at its end.`}</P>

            <Photograph
              src="https://images.unsplash.com/photo-1604347520207-04dc06ed4a5b?w=1600&q=80"
              alt="A long pink and white canyon escarpment glowing in low evening light, with no figures visible"
              caption="Yangykala, Balkan Region, at the last hour of daylight. The pink banding is iron-rich Cretaceous chalk; the route in is unmarked, unsigned, and known to perhaps a hundred people in the country."
              credit="Unsplash · editorial commons"
              href="https://unsplash.com/?utm_source=dsl&utm_medium=referral"
            />

            <P>{`We arrive in the last hour before sunset, which is the hour the canyons are made for. The light comes in low from the west and rakes across the eastern face of the escarpment, picking out individual strata in the manner of an X-ray; pink layers separated by thin bands of white that, viewed at this angle, look as if they have been laid down by a cabinet-maker rather than by the sea. There is no other vehicle. There is no other person. There is, very faintly, the sound of wind in the saxaul on the rim, which is the sound the country makes most consistently. Maksat parks at a viewpoint he has used for fifteen years and does not tell me the name of, because, he says, "if I tell you the name, then you will write the name, and then someone else will come."`}</P>

            <P>{`I think, watching him stand on the rim with his hands in the pockets of his jacket — his back to me, in the manner of a guide who has done his job and is now watching the same view he has watched four hundred times — that this might be the truest moment of the trip. The Karakum is, of course, more famous; the marble of Ashgabat is more photographed; Merv is older. But it is here, on the rim of an unsigned canyon in the Balkan Region, with the pink rock turning to amber as the sun drops behind the western plateau, that the country reveals what it has been all along: a place of extreme and largely unwitnessed beauty, governed by people who have organised the visiting of it as elaborately as any state on earth, in a desert so old that the canyon I am looking at was a sea floor at the same time the dinosaurs were learning to walk on land.`}</P>

            <PQ>{`If I tell you the name, then you will write the name, and then someone else will come.`}</PQ>

            <P>{`We sleep, the last night, in another camp — three yurts on a flat above the canyon, no road, no sign, no electricity. The Milky Way is overhead again. The temperature drops to about minus three. The desert is silent. In the morning we drive back to Turkmenbashi, eat plov in a station canteen, and board the train back to Ashgabat. The carpet sellers in Tolkuchka are still selling carpets. Bibi is still at her loom. Aman is still painting in oil he has bought, at a markup, from a friend who imports it from Baku. Maksat returns to his wife and his two daughters. The crater, two hundred and seventy kilometres to the north, is still burning. By morning, somewhere, a few more flames will have gone out, and the floor of the pit will be a few square metres darker. By the time anyone reads this, the central pillar will have been gone for years. The smaller fires around the rim will, perhaps, still hold.`}</P>
          </Sec>

          <RouteMap />
          <Cap><strong>The shape of the country.</strong> Turkmenistan from above — the Caspian to the west, the Karakum filling most of the centre, the Kopet Dag along the southern Iranian border. The five marked stops are the conventional foreign-tourist circuit; everything between them is desert that one drives across, but does not photograph, because the road moves through villages where photography is, in the careful phrase of the licensed guides, sometimes a problem.</Cap>

          <Sec n="5" title="Coda — On the Direction of Looking">
            <P>{`I am writing this on the flight home, which leaves Ashgabat at four in the morning — a time chosen, according to a former diplomat I sit next to, less for operational reasons than because it makes the airport less photogenic. The plane banks east of the capital, then north, then west toward Istanbul. From eleven thousand metres the marble of Ashgabat is invisible. The Karakum is a band of pale beige across the centre of the cabin window. The crater, somewhere down there in the dark, is too small to see, even with the lights of fifty thousand candles ringing its rim.`}</P>

            <P>{`What does one come away with from a country like this? Not, I think, the obvious thing — not the architectural surrealism of the capital, not the photogenic apocalypse of the burning pit, not the spectacle of a vanished medieval city. What one comes away with is a question about the direction in which one has been looking. Bibi makes a carpet that her granddaughter does not want and will accept. Aman paints in oils he can barely obtain. Maksat shows the same site for the four-hundredth time and does not tell me the name of the viewpoint. The state has built a city of polished stone for a population it does not entirely permit to walk through it. The crater burns down toward darkness over fifty-five years. The cloth on the tamarisk trees holds the names of sons in Istanbul. Somewhere in the middle of all this is a country, made of these and other facts, in the difficult business of continuing.`}</P>

            <P>{`On the second night at Darvaza, the wind shifted around three in the morning. I had been asleep in the yurt, in a sleeping bag rated to minus ten, with the kerosene heater on. I came outside because the silence felt different. What I noticed first was that the orange glow had reached the underside of a thin layer of cloud that had moved in from the north — a cloud the colour of beaten copper, illuminated from below by the burning pit. I stood at the rim for perhaps twenty minutes. The cloud drifted east. The fires below me did not change. Somewhere behind me, in the camp, Maksat was awake and smoking; I could see the small red point of his cigarette flare and dim. Above us both, the sky was the same colour as the ground beneath the crater — the colour of something that is still on fire, and has been for so long that it can no longer remember what was here before, and is, by degrees one cannot quite measure, going out.`}</P>
          </Sec>

          <div className="flourish">❧ ❧ ❧</div>
        </div>

        {/* ═══ SOURCE INTEGRITY NOTE ═══ */}
        <div className="footer-band">
          <h3>Source Integrity Note — Turkmenistan, April 2026</h3>

          <div className="ss">
            <div className="ss-title">Named characters — composite, flagged</div>
            <ul>
              <li><strong>Maksat</strong> (the licensed tour-guide), <strong>Bibi</strong> (the carpet weaver at Tolkuchka), and <strong>Aman</strong> (the university graduate / artist) are <strong>composite characters</strong>, drawn from published interviews with licensed Turkmen guides, weavers, and young Turkmen graduates documented in <em>Eurasianet</em> reporting (2018–2025), Caravanistan trip reports, and academic ethnographies of the Tolkuchka bazaar (Theroux 1995; later updates). Specific quotes are imagined within the bounds of attested attitudes. A field-reported version of this article should seek named licensed guides via Stantours, DN Tours, or Owadan Tourism; named weavers at the Tolkuchka carpet hall (with translator); and named young graduates of IUHD or Turkmen State University, with their consent and on the understanding that local press freedoms remain extremely restricted.</li>
            </ul>
          </div>

          <div className="ss">
            <div className="ss-title">Verified factual claims (Tier 1)</div>
            <ul>
              <li>Ashgabat 1948 earthquake — magnitude 7.3, October 6 1948; Soviet death-toll suppression and revised estimate (~110,000) confirmed in late-Soviet and post-Soviet sources.</li>
              <li>Ashgabat Guinness World Record (2013) — highest concentration of white-marble-clad buildings, 543 buildings / 4.5 million m². Guinness World Records, 2013 ruling.</li>
              <li>Niyazov's gold rotating statue on the original Neutrality Arch — verified; tower dismantled 2010, re-erected 2010 on a southern rise; statue removed.</li>
              <li>Älem Cultural and Entertainment Centre Ferris wheel — Guinness record 2012 (largest indoor enclosed Ferris wheel).</li>
              <li>Darvaza ignition — generally dated 1971 in popular sources; the precise year is uncertain in primary documentation. Berdimuhamedow ordered closure in April 2010 and again in January 2022. State news in 2023 reported flames "tripled smaller"; 2024–2026 traveller and tour-operator reports describe the central column as substantially diminished or gone, with multiple smaller fires persisting around the rim. The 1971 origin story remains poorly sourced and may be apocryphal in detail; the burning is real and ongoing.</li>
              <li>Merv UNESCO inscription — 1999, "State Historical and Cultural Park 'Ancient Merv'."</li>
              <li>Sultan Sanjar mausoleum — c.1157, 38 m dome height, Seljuk; survived 1221 Mongol siege.</li>
              <li>2022 presidency transfer — Gurbanguly Berdimuhamedow to son Serdar Berdimuhamedow via March 2022 election; father retained Halk Maslahaty chairmanship.</li>
              <li>Natural-gas reserves — Turkmenistan ranked world's 4th-largest by proved reserves; Galkynysh field one of the largest single-deposit gas fields globally.</li>
              <li>Trans-Caspian Railway — Tsarist origin (1880s); Ashgabat–Turkmenbashi distance ~580 km; overnight service operated by Türkmendemirýollary.</li>
              <li>Visa regime — Letter of Invitation required from a state-licensed agency; processing officially within 10 working days, often longer in practice; mandatory licensed guide for all road movement outside Ashgabat (regime tightened c.2017).</li>
              <li>Yangykala Canyons — Balkan Region, ~165 km north of Turkmenbashi; Cretaceous sediments; unsigned routes; 4WD only.</li>
            </ul>
          </div>

          <div className="ss">
            <div className="ss-title">Composite & illustrative passages (Tier 2)</div>
            <ul>
              <li>Specific dialogue attributed to Maksat, Bibi, and Aman — composite, drawn from typical attitudes documented in published interviews; no specific line is the verbatim record of a single named individual.</li>
              <li>Tolkuchka-bazaar interior description — composite, drawing on visits documented by Theroux (1995), Schofield (Caravanistan, 2018), and Eurasianet 2022.</li>
              <li>Yurt-camp arrangements at Darvaza and Yangykala — typical of the operator-run camps documented by Stantours, DN Tours, and Owadan Tourism in 2023–2025 trip reports.</li>
            </ul>
          </div>

          <div className="ss">
            <div className="ss-title">Date-sensitive claims to verify before publication or use</div>
            <ul>
              <li>Darvaza fire status — re-verify with a recent traveller report (within 90 days) before publication; the rate of diminishment is non-linear and may have changed.</li>
              <li>Visa fees and processing times — confirm with a state-licensed agency (Stantours, DN Tours, Owadan Tourism, Ayan Travel) within 30 days of departure.</li>
              <li>Trans-Caspian rail timetable and pricing — fluid; confirm via Türkmendemirýollary station enquiry on arrival in Ashgabat.</li>
              <li>Manat exchange rate (official vs. bazaar) — fluid; bring USD cash in good condition.</li>
              <li>Foreign-tourist visitor numbers at Merv — reported as anecdotal estimates from a single guide; for journalism, confirm with the State Historical and Cultural Park.</li>
            </ul>
          </div>

          <div className="ss">
            <div className="ss-title">Photography & image sourcing</div>
            <ul>
              <li>Inline <em>&lt;Photograph&gt;</em> components use Unsplash editorial pool URLs as illustrative placeholders. For publication, replace with field-reported images verified for venue and date — particularly for Darvaza (the look of the crater has changed materially), Yangykala (no fixed waypoints; field reporting essential), and any Ashgabat building exterior (state-building photography remains restricted; verify permission).</li>
              <li>All Unsplash <em>href</em> links carry the <code>?utm_source=dsl&utm_medium=referral</code> UTM as required by the platform.</li>
            </ul>
          </div>

          <div className="ss">
            <div className="ss-title">Local voices to add in a field-reported version</div>
            <ul>
              <li>A named licensed guide (with consent) — daily logistics of operating under the post-2017 mandatory-guide regime.</li>
              <li>A named weaver at Tolkuchka or in a regional carpet workshop (Annau, Kerki) — economics of dowry weaving in 2026.</li>
              <li>A named young Turkmen artist or graduate, in or out of country — perspective on emigration, culture, and the limits of public expression.</li>
              <li>An economist or independent analyst (in diaspora) — the gas economy, remittances, and the closed-currency system.</li>
              <li>A Heritage Turkmenistan or UNESCO Merv staff member — current preservation programme and visitor numbers.</li>
            </ul>
          </div>

          <div className="ss">
            <div className="ss-title">Principal sources consulted</div>
            <ul>
              <li>UNESCO World Heritage List — entry 886, "State Historical and Cultural Park 'Ancient Merv'," inscribed 1999.</li>
              <li>Guinness World Records — Ashgabat, "Highest density of white marble-clad buildings," 2013 ruling.</li>
              <li>Eurasianet — reporting on Berdimuhamedow extinguishment orders (2010, 2022) and 2023 state-television "tripled smaller" claim.</li>
              <li>Caravanistan, Stantours, DN Tours, Owadan Tourism — operational logistics, route descriptions, recent trip reports (2023–2025).</li>
              <li>Theroux, P. (1995) — <em>The Pillars of Hercules</em> and related travel reportage on the Tolkuchka bazaar.</li>
              <li>Edgar, A. (2004) — <em>Tribal Nation: The Making of Soviet Turkmenistan</em>. Princeton.</li>
              <li>Horak, S. (2010) — <em>Turkmenistan: Politics, History, Society</em>. Various journal articles, 2018–2024, on the Berdimuhamedow succession.</li>
              <li>Reuters / AP — coverage of the March 2022 presidential transition and the Halk Maslahaty constitutional arrangement.</li>
              <li>BP Statistical Review of World Energy / EIA — Turkmenistan natural-gas reserves and Galkynysh field estimates.</li>
            </ul>
          </div>
        </div>

        <div className="footer-foot">Travel · Central Asia · Turkmenistan · 2026</div>
      </div>
    </>
  );
}
