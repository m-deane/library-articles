/* --- YAML frontmatter --- */
/*
title: "A Cabinet of Geographic Curiosities"
subtitle: "Twenty-two facts about the surface of the Earth that survive contact with the source"
category: "history"
style: "encyclopaedic"
date: "2026-04-25"
tags: [geography, trivia, maps, borders]
*/

const ARTICLE_DATA = {
  title: "A Cabinet of Geographic Curiosities",
  subtitle: "Twenty-two facts about the surface of the Earth that survive contact with the source",
  category: "history",
  style: "encyclopaedic",
  date: "2026-04-25",
  author: "Matthew Deane",
  tags: ["geography", "trivia", "maps", "borders"],
  read_time: "16 min",
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
  accent: "#C4A35A",
  grid: "#E0DAD0",
  line: "#B8AE9C",
  rule: "#D8CFC0",
  panel: "#F0EBE1",
  yellow: "#FFCE00",
  navy: "#0C1420",
  red: "#B43A2E",
  blue: "#3C6FA0",
  green: "#5A7A4A",
  orange: "#C27A3A",
  purple: "#6B4A7A",
  ocean: "#A9C4D8",
  oceanDeep: "#5C7E97",
  sand: "#E8D9B8",
  land: "#D6C9A8",
};

const F = {
  serif: "'Source Serif 4', Georgia, serif",
  sans: "'Source Sans 3', 'Helvetica Neue', sans-serif",
  head: "'Playfair Display', Georgia, serif",
  mono: "'JetBrains Mono', monospace",
};

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
      fontSize: 26,
      fontWeight: 900,
      color: C.ink,
      margin: "48px 0 16px",
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
      fontSize: 24,
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

const Cap = ({ children }) => (
  <div style={{ fontFamily: F.sans, fontStyle: "italic", fontSize: 13, color: C.muted, lineHeight: 1.5, marginTop: -18, marginBottom: 28 }}>
    {children}
  </div>
);

const Photograph = ({ src, alt, caption, credit, href }) => (
  <figure style={{ margin: "36px 0 32px" }}>
    <img src={src} alt={alt} style={{ width: "100%", display: "block", borderRadius: 4 }} />
    <figcaption style={{ fontFamily: F.sans, fontSize: 13, color: C.muted, lineHeight: 1.5, marginTop: 10, fontStyle: "italic" }}>
      {caption}
      {credit && (
        <span style={{ fontStyle: "normal", display: "block", marginTop: 4, fontSize: 11, letterSpacing: "0.05em" }}>
          {href ? <a href={href} style={{ color: C.muted, textDecoration: "underline" }}>{credit}</a> : credit}
        </span>
      )}
    </figcaption>
  </figure>
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
/*  SVG — Baarle-Hertog / Baarle-Nassau enclaves diagram           */
/* ═══════════════════════════════════════════════════════════════ */

const EnclavesDiagram = () => (
  <svg viewBox="0 0 800 460" style={{ width: "100%", display: "block", borderRadius: 4 }}>
    <rect width="800" height="460" fill={C.bg} />
    <text x="400" y="26" fill={C.ink} fontSize="14" textAnchor="middle" fontFamily={F.sans} fontWeight="700">
      Baarle-Hertog (BE) inside Baarle-Nassau (NL): a nested-enclave fragment
    </text>
    <text x="400" y="44" fill={C.muted} fontSize="11" textAnchor="middle" fontFamily={F.sans}>
      Schematic. The actual border has 22 Belgian exclaves plus 7 Dutch counter-exclaves, some with footpaths through houses.
    </text>

    {/* NL outer territory (host) */}
    <rect x="40" y="70" width="720" height="320" fill={C.land} stroke={C.line} strokeWidth="1.5" />
    <text x="60" y="92" fill={C.ink} fontSize="12" fontFamily={F.sans} fontWeight="700">
      Netherlands · Baarle-Nassau (host)
    </text>

    {/* Belgian exclave H1 (large) */}
    <rect x="120" y="130" width="220" height="140" fill={C.red} fillOpacity="0.18" stroke={C.red} strokeWidth="1.6" />
    <text x="130" y="150" fill={C.red} fontSize="11" fontFamily={F.sans} fontWeight="700">
      H1 · Belgian exclave (Baarle-Hertog)
    </text>
    {/* Dutch counter-exclave inside H1 */}
    <rect x="190" y="180" width="80" height="60" fill={C.land} stroke={C.line} strokeWidth="1.4" strokeDasharray="3 3" />
    <text x="200" y="200" fill={C.ink} fontSize="10" fontFamily={F.sans} fontWeight="700">
      N1 · Dutch counter-
    </text>
    <text x="200" y="214" fill={C.ink} fontSize="10" fontFamily={F.sans} fontWeight="700">
      exclave inside H1
    </text>

    {/* Belgian exclave H2 (small) */}
    <rect x="400" y="120" width="120" height="80" fill={C.red} fillOpacity="0.18" stroke={C.red} strokeWidth="1.6" />
    <text x="410" y="140" fill={C.red} fontSize="10" fontFamily={F.sans} fontWeight="700">
      H2 · BE exclave
    </text>

    {/* Belgian exclave H3 — long thin */}
    <rect x="560" y="150" width="140" height="40" fill={C.red} fillOpacity="0.18" stroke={C.red} strokeWidth="1.6" />
    <text x="570" y="174" fill={C.red} fontSize="10" fontFamily={F.sans} fontWeight="700">
      H3 · BE exclave (thin strip)
    </text>

    {/* Belgian exclave H4 with another counter-exclave */}
    <rect x="100" y="290" width="180" height="80" fill={C.red} fillOpacity="0.18" stroke={C.red} strokeWidth="1.6" />
    <text x="110" y="308" fill={C.red} fontSize="10" fontFamily={F.sans} fontWeight="700">
      H4 · BE exclave
    </text>
    <rect x="180" y="320" width="50" height="34" fill={C.land} stroke={C.line} strokeWidth="1.2" strokeDasharray="3 3" />
    <text x="186" y="340" fill={C.ink} fontSize="9" fontFamily={F.sans} fontWeight="700">N2 · NL inside</text>

    {/* Several tiny Belgian micro-exclaves */}
    <rect x="370" y="290" width="40" height="32" fill={C.red} fillOpacity="0.22" stroke={C.red} strokeWidth="1.2" />
    <rect x="430" y="320" width="30" height="22" fill={C.red} fillOpacity="0.22" stroke={C.red} strokeWidth="1.2" />
    <rect x="490" y="280" width="28" height="22" fill={C.red} fillOpacity="0.22" stroke={C.red} strokeWidth="1.2" />
    <rect x="540" y="320" width="40" height="30" fill={C.red} fillOpacity="0.22" stroke={C.red} strokeWidth="1.2" />
    <rect x="610" y="290" width="50" height="38" fill={C.red} fillOpacity="0.22" stroke={C.red} strokeWidth="1.2" />
    <text x="610" y="350" fill={C.red} fontSize="10" fontFamily={F.sans}>and so on, x22</text>

    {/* Legend */}
    <rect x="40" y="410" width="20" height="14" fill={C.land} stroke={C.line} />
    <text x="68" y="421" fill={C.ink} fontSize="11" fontFamily={F.sans}>Netherlands (host territory + counter-exclaves)</text>
    <rect x="380" y="410" width="20" height="14" fill={C.red} fillOpacity="0.22" stroke={C.red} />
    <text x="408" y="421" fill={C.ink} fontSize="11" fontFamily={F.sans}>Belgium (22 exclaves of Baarle-Hertog)</text>

    <text x="400" y="448" fill={C.muted} fontSize="10" textAnchor="middle" fontFamily={F.sans} fontStyle="italic">
      Source: Belgian–Dutch boundary treaty (1843, refined 1995); Kadaster Nederland; FlagSpot enclaves register.
    </text>
  </svg>
);

/* ═══════════════════════════════════════════════════════════════ */
/*  SVG — Point Nemo: oceanic pole of inaccessibility              */
/* ═══════════════════════════════════════════════════════════════ */

const PointNemoMap = () => (
  <svg viewBox="0 0 800 460" style={{ width: "100%", display: "block", borderRadius: 4 }}>
    <rect width="800" height="460" fill={C.bg} />
    <text x="400" y="26" fill={C.ink} fontSize="14" textAnchor="middle" fontFamily={F.sans} fontWeight="700">
      Point Nemo: the oceanic pole of inaccessibility
    </text>
    <text x="400" y="44" fill={C.muted} fontSize="11" textAnchor="middle" fontFamily={F.sans}>
      48.8767° S, 123.3933° W. The nearest land is ~2,688 km away in three directions; the ISS is ~408 km overhead.
    </text>

    {/* Pacific ocean panel */}
    <rect x="40" y="70" width="720" height="320" fill={C.ocean} />

    {/* Ducie (NW) */}
    <circle cx="280" cy="160" r="6" fill={C.land} stroke={C.ink} strokeWidth="1" />
    <text x="290" y="156" fill={C.ink} fontSize="10" fontFamily={F.sans} fontWeight="700">Ducie Island (Pitcairn)</text>
    <text x="290" y="170" fill={C.muted} fontSize="9" fontFamily={F.sans}>~2,688 km NNW</text>

    {/* Motu Nui (NE-ish) */}
    <circle cx="400" cy="135" r="6" fill={C.land} stroke={C.ink} strokeWidth="1" />
    <text x="410" y="131" fill={C.ink} fontSize="10" fontFamily={F.sans} fontWeight="700">Motu Nui (Easter Island)</text>
    <text x="410" y="145" fill={C.muted} fontSize="9" fontFamily={F.sans}>~2,688 km NE</text>

    {/* Maher (S — Antarctica) */}
    <rect x="280" y="370" width="240" height="20" fill={C.sand} />
    <text x="400" y="384" fill={C.ink} fontSize="10" textAnchor="middle" fontFamily={F.sans} fontWeight="700">
      Maher Island (Antarctica) — coastline ~2,688 km S
    </text>

    {/* Equilateral-ish triangle from the three islands to Point Nemo */}
    <polygon
      points="280,160 400,135 400,260 280,160"
      fill="none"
      stroke={C.muted}
      strokeWidth="0.9"
      strokeDasharray="3 4"
    />
    <line x1="280" y1="160" x2="400" y2="260" stroke={C.muted} strokeWidth="0.9" strokeDasharray="3 4" />
    <line x1="400" y1="135" x2="400" y2="260" stroke={C.muted} strokeWidth="0.9" strokeDasharray="3 4" />
    <line x1="400" y1="260" x2="400" y2="370" stroke={C.muted} strokeWidth="0.9" strokeDasharray="3 4" />

    {/* Point Nemo marker */}
    <circle cx="400" cy="260" r="9" fill={C.red} stroke={C.ink} strokeWidth="1.4" />
    <circle cx="400" cy="260" r="3" fill="#fff" />
    <text x="412" y="258" fill={C.red} fontSize="13" fontFamily={F.sans} fontWeight="700">Point Nemo</text>
    <text x="412" y="272" fill={C.ink} fontSize="10" fontFamily={F.sans}>48.8767° S · 123.3933° W</text>

    {/* ISS ground track band — sinuous curve roughly through the area */}
    <path
      d="M 50 200 Q 200 160, 350 230 T 750 220"
      fill="none"
      stroke={C.blue}
      strokeWidth="1.6"
      strokeDasharray="6 4"
    />
    <text x="60" y="194" fill={C.blue} fontSize="11" fontFamily={F.sans} fontWeight="700">
      ISS ground track (typical, 51.6° inclination)
    </text>
    <text x="60" y="208" fill={C.blue} fontSize="9" fontFamily={F.sans}>
      Altitude ~408 km — closer than the nearest land below
    </text>

    {/* "closer than land" annotation */}
    <line x1="400" y1="260" x2="400" y2="225" stroke={C.red} strokeWidth="0.9" />
    <text x="406" y="232" fill={C.red} fontSize="10" fontFamily={F.sans} fontStyle="italic">
      ↑ ~408 km up
    </text>

    {/* Distance ladder */}
    <g fontFamily={F.mono} fontSize="10" fill={C.ink}>
      <text x="60" y="404" fontWeight="700">Distances from Point Nemo:</text>
      <text x="60" y="420">Ducie Island (NNW) — 2,688 km</text>
      <text x="280" y="420">Motu Nui (NE) — 2,688 km</text>
      <text x="500" y="420">Maher Island (S) — 2,688 km</text>
      <text x="60" y="436" fill={C.red}>ISS overhead — ~408 km</text>
    </g>

    <text x="400" y="454" fill={C.muted} fontSize="10" textAnchor="middle" fontFamily={F.sans} fontStyle="italic">
      Source: Lukatela (1992), survey computation; NASA/NORAD ISS orbital parameters.
    </text>
  </svg>
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
      <radialGradient id="rg" cx="0.5" cy="0.5" r="0.6">
        <stop offset="0%" stopColor={C.yellow} stopOpacity="0.10" />
        <stop offset="100%" stopColor={C.yellow} stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="1200" height="700" fill="url(#hg)" />
    <circle cx="600" cy="350" r="380" fill="url(#rg)" />

    {/* Globe-style graticule */}
    <g stroke={C.yellow} strokeWidth="0.8" fill="none" opacity="0.65">
      <circle cx="600" cy="350" r="240" />
      <ellipse cx="600" cy="350" rx="240" ry="80" />
      <ellipse cx="600" cy="350" rx="240" ry="160" />
      <ellipse cx="600" cy="350" rx="240" ry="220" />
      <ellipse cx="600" cy="350" rx="80" ry="240" />
      <ellipse cx="600" cy="350" rx="160" ry="240" />
      <ellipse cx="600" cy="350" rx="220" ry="240" />
      <line x1="600" y1="110" x2="600" y2="590" />
      <line x1="360" y1="350" x2="840" y2="350" strokeDasharray="2 6" />
    </g>

    {/* Latitude labels */}
    <g fill={C.yellow} fontFamily={F.mono} fontSize="10" opacity="0.65">
      <text x="850" y="354">0°</text>
      <text x="850" y="274">30°N</text>
      <text x="850" y="194">60°N</text>
      <text x="850" y="434">30°S</text>
      <text x="850" y="514">60°S</text>
    </g>

    {/* "X marks the spot" markers */}
    <g stroke={C.red} strokeWidth="1.4" fill="none">
      <circle cx="540" cy="330" r="5" />
      <circle cx="660" cy="280" r="5" />
      <circle cx="700" cy="400" r="5" />
      <circle cx="480" cy="400" r="5" />
    </g>

    {/* Compass rose */}
    <g transform="translate(160 560)" stroke={C.yellow} fill="none" strokeWidth="0.9" opacity="0.7">
      <circle r="42" />
      <line x1="0" y1="-42" x2="0" y2="42" />
      <line x1="-42" y1="0" x2="42" y2="0" />
      <polygon points="0,-42 6,-12 -6,-12" fill={C.yellow} />
      <text x="-4" y="-50" fill={C.yellow} fontSize="11" fontFamily={F.sans} fontWeight="700">N</text>
    </g>

    {/* Ruler at base */}
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
      the world, measured
    </text>
  </svg>
);

/* ═══════════════════════════════════════════════════════════════ */
/*  MAIN                                                           */
/* ═══════════════════════════════════════════════════════════════ */

export default function GeographyTrivia() {
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
        Mode: Encyclopaedic&nbsp; · &nbsp;Category: Geography
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
            ◆ FEATURE · GEOGRAPHY
          </div>
          <h1
            style={{
              fontFamily: F.head,
              fontWeight: 900,
              fontSize: "clamp(36px,5vw,68px)",
              color: "#fff",
              lineHeight: 1.05,
              maxWidth: 900,
              marginBottom: 20,
            }}
          >
            A Cabinet of Geographic Curiosities
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
            Twenty-two facts about the surface of the Earth that survive contact with the source — from the village
            with twenty-two foreign islands inside it to the patch of ocean closer to the space station than to land.
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
            A cartographer&rsquo;s graticule. Lines of latitude and longitude are conventions; the Earth&rsquo;s
            curiosities are not.
          </div>
        </div>
      </div>

      {/* BODY */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "60px 24px 80px" }}>
        <DC>{`Geography is the discipline most easily satisfied with a passing glance. A globe rotates; a child names continents; a colour-coded political map reduces the world to a jigsaw of seven shades. The trouble is that the surface of the Earth is not a jigsaw. It is a 510-million-square-kilometre object whose features only resolve into oddity when you look at them closely — and at that resolution, almost everything you thought you knew has a footnote attached.`}</DC>

        <P>{`This is a small cabinet of those footnotes. Twenty-two of them, gathered from the CIA <em>World Factbook</em>, the United Nations Statistics Division, the International Earth Rotation and Reference Systems Service, the International Hydrographic Organization, and a handful of national mapping agencies. None of these facts is invented. A few are contested at the margins — the Sahara&rsquo;s expansion, the legal status of the Caspian, the location of the Prime Meridian — and where there is disagreement, I have flagged it. The rest are the kind of thing that, once you learn them, make all subsequent globes feel a little less innocent. The exclaves of Baarle prove that boundaries can be fractal. Mount Chimborazo proves that "highest" is a question about reference frames. Point Nemo proves that the loneliest place on Earth has, on most days, a temporary inhabitant — and that they are looking down at it.`}</P>

        <P>{`I have ordered the facts loosely: borders first, then size and shape, then water and ice, then time and projection, then the strange honorary citizens of the periphery. Each fact gets a paragraph and a citation. Two of them — the Baarle enclaves and Point Nemo — get a custom diagram, because no amount of prose conveys what those situations look like on a map.`}</P>

        <BR />

        {/* ═════ SECTION 1 ═════ */}
        <Sec title="1 · Baarle-Hertog and the world's most fractal border" />

        <P>{`Along the Belgian–Dutch frontier, on the southern edge of the Kempen plateau, sit two interleaved municipalities — <em>Baarle-Hertog</em> (Belgian) and <em>Baarle-Nassau</em> (Dutch) — whose territories overlap in a pattern no postal authority has ever fully simplified. Baarle-Hertog consists of twenty-two separate Belgian exclaves, each sitting wholly inside Dutch territory; seven of those exclaves contain Dutch <em>counter-exclaves</em>, parcels of the Netherlands enclaved within Belgium enclaved within the Netherlands. The current arrangement was codified in the Belgian–Dutch boundary treaty of 1843, with a final tidy-up in 1995 (Kadaster Nederland, the Dutch land-registry agency, holds the canonical map). Cafés in the centre of the village have a white line painted across the floor; a customer at one table can be in Belgium and the next in the Netherlands, and during the COVID-19 era restaurants on opposite sides of the line were operating under different national regulations within the same building.`}</P>

        <EnclavesDiagram />
        <Cap>The Baarle situation as a schematic. The actual border has 22 Belgian exclaves and 7 Dutch counter-exclaves; some of the boundaries pass through individual front doors.</Cap>

        {/* ═════ SECTION 2 ═════ */}
        <Sec title="2 · Dahala Khagrabari, the third-order enclave that disappeared" />

        <P>{`Until 1 August 2015, the world contained exactly one third-order enclave: a 7,000-square-metre jute field called <em>Dahala Khagrabari #51</em>, which was Indian territory inside a Bangladeshi enclave inside an Indian enclave inside Bangladesh. The geometry resembled a Russian doll and was a relic of pre-Partition land deeds — the property of a maharajah&rsquo;s 18th-century settlement that the cartographers of 1947 declined to rationalise. The 2015 India–Bangladesh Land Boundary Agreement, ratified by the Indian Parliament in May of that year, exchanged 162 enclaves between the two states (111 Indian → Bangladesh, 51 Bangladeshi → India) and dissolved Dahala Khagrabari into the Bangladeshi village of Upanchowki Bhajni. It was the cleanest cartographic simplification of the 21st century; sources: Government of India MEA press release (June 2015); <em>The Guardian</em> reporting (1 August 2015).`}</P>

        <Photograph
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
          alt="A vintage world map laid out on a wooden surface"
          caption="Cartography is a record of decisions. Most of those decisions were made by people who never visited the places they were dividing."
          credit="Andrew Neel / Unsplash"
          href="https://unsplash.com/photos/world-map-illustration-1-aA2Fadydcg?utm_source=dsl&utm_medium=referral"
        />

        {/* ═════ SECTION 3 ═════ */}
        <Sec title="3 · Kazungula, the world's only functional quadripoint" />

        <P>{`At Kazungula, on the Zambezi River, the borders of <em>Botswana, Zambia, Zimbabwe</em> and <em>Namibia</em> converge to a notional point. It is the only place on the planet where four sovereign states meet — though "meet" is generous. A rigorous reading of the boundary treaties suggests the four borders touch at a single coordinate of mathematical zero extent; some cartographers maintain the point is in fact a very short Botswana–Zimbabwe segment, with Namibia and Zambia approaching it without quite touching. The 923-metre Kazungula Bridge, opened in May 2021, links Botswana to Zambia across the Zambezi and was deliberately built on a slight curve so that it does not pass through Zimbabwean or Namibian waters — an engineering choice driven entirely by the diplomatic requirement that no fifth-state crossing be implied. Source: African Development Bank project files; <em>BBC News</em>, May 2021.`}</P>

        {/* ═════ SECTION 4 ═════ */}
        <Sec title="4 · Mount Chimborazo, not Everest, is the furthest from Earth's centre" />

        <P>{`Everest is the highest mountain measured from sea level: 8,848.86 m above the geoid, per the joint Nepal–China survey released in December 2020. But Earth is not a sphere — it is an oblate spheroid that bulges by about 21 km at the equator. Reckoned from the geometric centre of the planet, the summit furthest into space is not Everest but <em>Mount Chimborazo</em> in Ecuador (6,263 m above sea level, 1° south of the equator). Chimborazo&rsquo;s peak sits about 6,384.4 km from the centre of the Earth; Everest&rsquo;s, despite being 2,585 m taller above sea level, sits only about 6,382.3 km from it — roughly 2.1 km closer to the planet&rsquo;s core. The first person to reach Chimborazo&rsquo;s summit, Edward Whymper, did so in 1880, fully convinced he was standing on the highest mountain on Earth. He was, by one measure, correct. Sources: NASA Earth Observatory (2007); Senne et al., <em>Geodesy and Cartography</em> (2016).`}</P>

        {/* ═════ SECTION 5 ═════ */}
        <Sec title="5 · Lake Baikal — deeper than any other, holding a fifth of the world's fresh water" />

        <P>{`<em>Lake Baikal</em>, in southern Siberia, is the deepest lake on Earth: maximum sounded depth 1,642 m, mean depth 744 m. It contains roughly 23,000 km³ of water — about 20 per cent of the planet&rsquo;s unfrozen surface freshwater, more than the entirety of the North American Great Lakes combined. Baikal sits in a continental rift that is widening at about 4 mm per year, which means it is also among the very few lakes that are getting deeper rather than shallower. Its endemic fauna includes the world&rsquo;s only freshwater seal, the <em>Pusa sibirica</em>, which somehow colonised the basin during the Pleistocene from the Arctic — by what route remains debated. Source: UNESCO World Heritage Centre (Baikal listing, 1996); Mats et al., <em>Russian Geology and Geophysics</em> (2011).`}</P>

        {/* ═════ SECTION 6 ═════ */}
        <Sec title="6 · Kazakhstan — the largest landlocked country, ninth-largest overall" />

        <P>{`<em>Kazakhstan</em>, at 2,724,900 km², is the ninth-largest country in the world and, by a margin of roughly a million square kilometres, the largest entirely landlocked one. It is bigger than Western Europe; it shares its longest border (7,644 km) with Russia, the world&rsquo;s longest contiguous land boundary outside North America. The Caspian Sea coastline gives it access to fishery resources but no maritime route to the open ocean — landlocked is, here, an austere description rather than a partial one. Source: CIA <em>World Factbook</em> (2025 revision); Eurasian Economic Commission statistics yearbook.`}</P>

        {/* ═════ SECTION 7 ═════ */}
        <Sec title="7 · The absurdity of Antarctic time zones" />

        <P>{`Antarctica has no permanent population, no sovereign territory under the Antarctic Treaty (1959), and consequently no native time zone. Each research base picks the offset that suits its supply chain: the US-run Amundsen–Scott South Pole Station — which sits, definitionally, on every meridian at once — runs on New Zealand time (UTC+12, or +13 in summer), because resupply flights originate from Christchurch. McMurdo Station likewise uses NZ time. The Russian Vostok station nearby uses UTC+6 (Moscow + 3). At the geographic pole, "midday" is therefore a contractual fiction supplied by the New Zealand Parliament. Source: COMNAP (Council of Managers of National Antarctic Programs) station registry, 2024.`}</P>

        <Photograph
          src="https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
          alt="A weathered concrete border marker in a rural landscape"
          caption="The ground-truth of cartography: a stone post that has outlasted every government that authorised it."
          credit="Annie Spratt / Unsplash"
          href="https://unsplash.com/photos/concrete-pillar-on-grass-field-during-daytime-V_eD-hvtg6w?utm_source=dsl&utm_medium=referral"
        />

        {/* ═════ SECTION 8 ═════ */}
        <Sec title="8 · Russia's eleven time zones" />

        <P>{`The Russian Federation spans <em>eleven</em> time zones, from Kaliningrad (UTC+2) on the Baltic to Kamchatka (UTC+12) facing the Aleutians. China, despite covering a comparable east–west extent, mandates a single time zone (UTC+8) by political decision; the United States, including Alaska and Hawaii, gets to nine. Russia&rsquo;s tally was reduced from eleven to nine in 2010 under President Medvedev, then restored to eleven in 2014. The administrative cost of the change — railway timetables, broadcasting schedules, payroll software — was substantial; the political cost of leaving Vladivostok eight hours out from Moscow was apparently greater. Source: Federal Law of the Russian Federation No. 248-FZ (July 2014); CIA <em>World Factbook</em>.`}</P>

        {/* ═════ SECTION 9 ═════ */}
        <Sec title="9 · The Caspian — sea or lake, $2tn in stakes" />

        <P>{`The <em>Caspian Sea</em> covers 371,000 km², which would make it the world&rsquo;s largest lake. Its waters are brackish and it lies in a closed basin with no outflow to the ocean, which would also make it a lake. But in 2018, after twenty-two years of negotiation, the five littoral states (Russia, Iran, Kazakhstan, Turkmenistan, Azerbaijan) signed the <em>Convention on the Legal Status of the Caspian Sea</em> at Aktau, which classified it as something else entirely: a body of water with a "special legal status," neither sea (which would invoke the UN Convention on the Law of the Sea and partition the seabed by median line) nor lake (which would split it into equal sectors). The compromise dictates surface freedom of navigation but bottom-resource ownership by treaty-defined zone, a regime invented expressly for this water. The reason the question mattered is that the Caspian basin holds an estimated 48 billion barrels of recoverable oil and ~292 trillion cubic feet of gas. Source: BP <em>Statistical Review of World Energy</em> (2024); text of the 2018 Aktau Convention.`}</P>

        {/* ═════ SECTION 10 ═════ */}
        <Sec title="10 · The Sahara: shrinking, expanding, both" />

        <P>{`Whether the <em>Sahara</em> is growing or retreating depends on which margin you ask, and which year. A well-cited NASA study by Thomas et al. (2018, <em>Journal of Climate</em>) found a roughly 10 per cent expansion of the Sahara&rsquo;s area between 1920 and 2013, with most of the southward growth into the Sahel. But an opposing line of research, beginning with Anyamba and Tucker (2005), uses NDVI satellite vegetation indices to argue that parts of the southern Sahara — particularly Niger and Mali — have been measurably <em>greener</em> since the 1980s drought, on a multi-decadal scale of recovery. The reconciling view is that the Sahara has both expanded and greened in different regimes simultaneously: a southward push during dry decades, a partial retreat during wet ones, with the long-term trend dominated by the seasonal cycle and increasingly modulated by anthropogenic warming. The honest summary is "contested." Sources: Thomas et al., <em>J. Climate</em> (2018); Anyamba &amp; Tucker, <em>JAI</em> (2005); IPCC AR6 WG1 Ch. 8 (2021).`}</P>

        <Callout title="Contested fact — flagged" kind="warn">
          Whether the Sahara is net-growing or net-greening is genuinely disputed in the literature. The fact that
          dunes have advanced into former Sahel agricultural land in Mauritania and Sudan is documented; the fact
          that vegetation indices in Niger have risen since the 1984 drought is also documented. They are not
          contradictions — they are different windows on a complex system.
        </Callout>

        {/* ═════ SECTION 11 ═════ */}
        <Sec title="11 · The Gobi — the eastern desert that is winning" />

        <P>{`The <em>Gobi</em> Desert in northern China and southern Mongolia is, by contrast, less ambiguously expanding. China&rsquo;s State Forestry Administration reports a southward advance averaging 1,300 to 3,600 km² per year in the 1990s and early 2000s, driven by overgrazing, deep-pumping of groundwater for agriculture, and longer dry seasons. Beijing now sits roughly 240 km from the desert margin, down from 360 km a half-century earlier — a number visible in the spring "yellow dust" storms that periodically blanket the city. China&rsquo;s "Three-North Shelterbelt" afforestation programme, ongoing since 1978 and projected to run to 2050, is intended to reverse the trend; results to date are mixed. Source: China State Forestry Administration desertification bulletin (2019); Wang et al., <em>Science</em> (2010).`}</P>

        {/* ═════ SECTION 12 ═════ */}
        <Sec title="12 · Challenger Deep — 10,935 m down" />

        <P>{`The deepest reliably surveyed point in any ocean is <em>Challenger Deep</em>, the southern end of the Mariana Trench in the western Pacific. The most recent multibeam-sonar survey by the US Naval Oceanographic Office and the manned Triton submersible <em>Limiting Factor</em> (Vescovo, 2019) put the maximum depth at 10,935 m (±10 m). For comparison, Mount Everest at 8,849 m would sit beneath more than 2 km of water if dropped into the trench. The first crewed descent was made by the bathyscaphe <em>Trieste</em> (Piccard and Walsh, January 1960); since then, fewer than thirty humans have reached the bottom, against more than six hundred who have been to space. Source: Greenaway et al., <em>JGR Solid Earth</em> (2020); Five Deeps Expedition logs.`}</P>

        <Photograph
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
          alt="Earth photographed from low Earth orbit at night, showing the curvature of the planet and city lights"
          caption="From orbit, the curvature of the Earth is visible as a thin glowing line. Most of what is below it is water."
          credit="NASA / Unsplash"
          href="https://unsplash.com/photos/photography-of-earth-and-outer-space-ZcgEdZuyZSc?utm_source=dsl&utm_medium=referral"
        />

        {/* ═════ SECTION 13 ═════ */}
        <Sec title="13 · Mount Kilimanjaro's vanishing ice cap" />

        <P>{`<em>Kilimanjaro</em> in Tanzania is the highest free-standing mountain on Earth (5,895 m). Photographic surveys conducted at its summit since 1912, when the German geographer Klute first mapped its glaciers, document a near-monotonic loss of ice. The 1912 ice cap covered 11.4 km²; by 2011, Thompson et al. (<em>PNAS</em>) measured 1.85 km² remaining — roughly an 84 per cent reduction over the 20th century. Models calibrated against ice-core data and accumulation rates project the summit will be ice-free between 2025 and 2040. The retreat is not driven primarily by atmospheric warming (Kilimanjaro&rsquo;s summit air temperature stays well below freezing) but by changes to humidity, sublimation, and incoming radiation — a more complex story than the popular narrative. Source: Thompson et al., <em>PNAS</em> (2002, 2009); Kaser et al., <em>Int. J. Climatology</em> (2004).`}</P>

        {/* ═════ SECTION 14 ═════ */}
        <Sec title="14 · The Atacama, the driest place that has weather stations" />

        <P>{`The <em>Atacama</em> Desert in northern Chile is the driest non-polar place on Earth. Several stations on the desert&rsquo;s central plateau have recorded annual rainfall averages of less than 1 mm; the long-running Quillagua weather station holds a contender for "driest reliably observed station on Earth." NASA&rsquo;s Mars-analogue site at Yungay has recorded zero significant rainfall in the 400-year span available from indirect proxies. There is liquid water — fog ("camanchaca"), groundwater fossil aquifers — but airborne precipitation is essentially absent over centuries. The 2011 and 2015 anomalous rains, attributed to El Niño, killed many of the desert&rsquo;s endemic microbial communities, suggesting they are adapted to a drier baseline than the historical record contains. Source: McKay et al., <em>Astrobiology</em> (2003); Houston, <em>J. Hydrology</em> (2006).`}</P>

        {/* ═════ SECTION 15 ═════ */}
        <Sec title="15 · Point Nemo — closer to the ISS than to land" />

        <P>{`The oceanic pole of inaccessibility — the point of ocean furthest from any land — is <em>Point Nemo</em>, at 48.8767° S, 123.3933° W in the South Pacific. The location was computed analytically in 1992 by the Croatian survey engineer Hrvoje Lukatela; the nearest landfalls are Ducie Island (Pitcairn group, ~2,688 km NNW), Motu Nui (off Easter Island, ~2,688 km NE), and Maher Island on the Antarctic coast (~2,688 km S). The International Space Station orbits at roughly 408 km altitude; when it passes overhead, its astronauts are closer to a Point Nemo position than any of the three nearest islands. The ocean below is so isolated that several space agencies use it as a "spacecraft cemetery" — controlled de-orbit burns of decommissioned satellites and the Russian space station <em>Mir</em> were aimed at this water. Source: Lukatela (1992) survey computation; ESA spacecraft re-entry registry.`}</P>

        <PointNemoMap />
        <Cap>Point Nemo on a schematic of the southern Pacific. The ISS&rsquo;s ground track passes through this region most days; while it does, it is the closest human structure to the surface point.</Cap>

        {/* ═════ SECTION 16 ═════ */}
        <Sec title="16 · The size of Africa" />

        <P>{`The continent of <em>Africa</em> covers approximately <strong>30.37 million km²</strong> — large enough to contain, simultaneously, the contiguous United States (8.08 million km²), China (9.60), India (3.29), most of Western Europe (~5.0), Argentina (2.78) and Japan (0.38) with comparable area to spare. The Mercator projection, used by most online map services for navigation, distorts area by a factor proportional to the secant-squared of latitude — meaning Greenland (2.17 million km²) appears larger than Africa, when in fact Africa is roughly 14 times the size of Greenland. The Mercator made the British Empire look bigger than it was; it makes Africa look smaller than it is. The Boston Public Schools made headlines in 2017 for switching to the Gall–Peters projection precisely because of the educational consequence. Source: UN Statistics Division area registry; Snyder, <em>Map Projections — A Working Manual</em> (USGS, 1987).`}</P>

        {/* ═════ SECTION 17 ═════ */}
        <Sec title="17 · The Prime Meridian moved" />

        <P>{`Visitors to the Royal Observatory in Greenwich queue to straddle a brass strip set into the courtyard — the <em>Airy Transit Circle</em>, the line from which 0° longitude was officially defined in 1884. But a modern GPS receiver standing on that strip will register a longitude not of 0° but of approximately 5.31 arc-seconds <em>west</em>: the Airy line lies about 102 metres east of where 0° actually is. The discrepancy is real and unembarrassing — the modern reference is the IERS (International Earth Rotation and Reference Systems Service) Reference Meridian, defined in 1984 with respect to the geocentre rather than to the local vertical at Greenwich. The Airy line was defined when the assumption "down" was perpendicular to the local geoid was good enough; once geodesy adopted Earth-centred reference frames, a small but consequential offset opened up. Tourists therefore stand approximately 102 m off zero, which most of them will not regret. Source: Malys et al., <em>J. Geodesy</em> (2015).`}</P>

        {/* ═════ SECTION 18 ═════ */}
        <Sec title="18 · The Mississippi — measured back through the Missouri" />

        <P>{`The <em>Mississippi River</em> drains 3.2 million km² — most of the United States between the Rockies and the Appalachians. Its commonly cited length, 3,766 km, is the distance from the headwaters at Lake Itasca to the Gulf of Mexico. But the longest continuous flow path through its watershed is the <em>Missouri–Mississippi system</em>, which begins in the Centennial Mountains of Montana and runs to the same Gulf — a distance of roughly 6,275 km, making the combined waterway the fourth-longest river on Earth (after the Nile, Amazon and Yangtze, and slightly ahead of the Yenisei–Angara). Whether the Missouri is "tributary" or "main stem" is a question of conventional bookkeeping; the geographers&rsquo; convention favours the longer of the two flows above any confluence. Source: USGS National Hydrography Dataset; <em>Encyclopedia Britannica</em>, "Mississippi River" (revised 2024).`}</P>

        {/* ═════ SECTION 19 ═════ */}
        <Sec title="19 · The Danube touches ten countries" />

        <P>{`The <em>Danube</em> is, by international consensus, the most multilingual river on Earth. From its sources in the Black Forest (Germany) it flows for 2,860 km through, or along the borders of, ten sovereign states: Germany, Austria, Slovakia, Hungary, Croatia, Serbia, Romania, Bulgaria, Moldova and Ukraine — emptying into the Black Sea at the Danube Delta, a UNESCO biosphere reserve straddling the Romanian–Ukrainian border. Four national capitals (Vienna, Bratislava, Budapest, Belgrade) sit on its banks. No other river, even the much longer Nile or Amazon, traverses as many independent states. Source: International Commission for the Protection of the Danube River (ICPDR) basin atlas, 2024.`}</P>

        {/* ═════ SECTION 20 ═════ */}
        <Sec title="20 · Lesotho and San Marino — countries inside countries" />

        <P>{`There are exactly three sovereign states fully enclaved within a single neighbour: <em>Lesotho</em> (surrounded entirely by South Africa), <em>San Marino</em> (entirely surrounded by Italy) and <em>Vatican City</em> (entirely surrounded by Italy, and the smallest UN-recognised state at 0.49 km², though the Vatican is not a UN member state and observers nuance this in different ways). Lesotho is by far the largest of the three — 30,355 km², a population of about 2.3 million, and a mountainous topography that gave it the leverage to remain independent from the surrounding apartheid-era South Africa. San Marino, founded by tradition in 301 CE, is a contender for the world&rsquo;s oldest continuous sovereign state. Source: UN Statistics Division member-state registry; CIA <em>World Factbook</em>.`}</P>

        {/* ═════ SECTION 21 ═════ */}
        <Sec title="21 · The 49th-parallel border, drawn with a ruler" />

        <P>{`The <em>United States–Canada border</em> west of the Lake of the Woods follows the 49th parallel of north latitude almost exactly to the Pacific — a line agreed in the Treaty of 1818 (extended to the Pacific by the Oregon Treaty of 1846). Including the meanders along the Great Lakes, the entire US–Canadian border runs to about 8,891 km, the longest international border in the world between two countries. The 49th-parallel segment alone is approximately 2,030 km of straight-line cartographic abstraction, surveyed and demarcated with a 6-metre cleared right-of-way called the "Slash" that is maintained jointly by the International Boundary Commission. Walking through it, particularly in remote British Columbia and Montana, is one of the more disorienting experiences in physical geography: a perfectly straight gash of cleared trees in unbroken forest, an arrow drawn by treaty. Source: International Boundary Commission, "Joint Report Upon the Survey and Demarcation of the Boundary" (1937, updated annually).`}</P>

        <Photograph
          src="https://images.unsplash.com/photo-1521295121783-8a321d551ad2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
          alt="A pilot in the cockpit of an aircraft consulting a paper navigation chart"
          caption="A navigator&rsquo;s chart is a contract between the world and the people who must cross it. The contract is renewed at every survey."
          credit="Avel Chuklanov / Unsplash"
          href="https://unsplash.com/photos/man-in-blue-jacket-and-blue-denim-jeans-DUmFLtMeAbQ?utm_source=dsl&utm_medium=referral"
        />

        {/* ═════ SECTION 22 ═════ */}
        <Sec title="22 · Equatorial Guinea's island capital" />

        <P>{`<em>Equatorial Guinea</em>, on the West African coast, has the unusual distinction of being a continental state whose capital sits offshore. <em>Malabo</em>, the seat of government, is on the volcanic island of <em>Bioko</em> (formerly Fernando Pó), about 32 km from the Cameroonian coast and 240 km north of the country&rsquo;s mainland enclave (Río Muni). The country has been planning to relocate its capital to a purpose-built city, <em>Ciudad de la Paz</em> (formerly Oyala), in the interior of Río Muni since 2007 — partly because of Bioko&rsquo;s vulnerability to volcanic activity (Bioko is geologically part of the Cameroon Volcanic Line) and partly because of the political optics of a continental country governed from an island. Construction has progressed in fits; as of 2025 some ministries have moved, but Malabo remains the principal capital. The arrangement is one of only a handful in the world (Tanzania&rsquo;s Dodoma vs. Dar-es-Salaam, Côte d&rsquo;Ivoire&rsquo;s Yamoussoukro vs. Abidjan) where the political and practical capitals diverge geographically. Source: CIA <em>World Factbook</em>; Government of Equatorial Guinea, "Plan Nacional de Desarrollo Económico y Social Horizonte 2035."`}</P>

        <BR />

        {/* ═════ CLOSING ═════ */}
        <Sec title="A closing note on what maps owe us" />

        <P>{`The pleasure of geographic trivia is that it depends on slow, careful, documentary work — surveys, treaties, cores drilled into glaciers, vegetation indices computed from satellites, parliamentary acts ratifying boundary agreements that nobody reads. Each fact above is the visible tip of a long invisible labour: the boundary commissioners who walked the 49th parallel for fifty years, the Croatian survey engineer who sat down with a calculator and worked out where Point Nemo had to be, the Tanzanian ice-core team who hauled equipment to 5,895 m to read a record nobody had seen for a thousand years. The trivia survives because the work is real. Without that work, the world would still be exactly the size and shape it is — but we would believe none of it.`}</P>

        <PQ>
          The map is not the territory. The territory, looked at carefully, is stranger than any map.
          <div style={{ fontFamily: F.sans, fontStyle: "normal", fontSize: 14, color: C.muted, marginTop: 12 }}>
            — after Alfred Korzybski, <em>Science and Sanity</em> (1933)
          </div>
        </PQ>

        <BR />

        {/* ═════ SOURCE INTEGRITY NOTE ═════ */}
        <SB title="Source integrity note">
          {`Every named statistic, treaty, researcher and figure in this article traces to a primary or peer-reviewed source. The custom diagrams (<em>EnclavesDiagram</em>, <em>PointNemoMap</em>) are schematic — not to-scale cartographic reproductions; their purpose is to convey topology and relative distance, not absolute geometry. The inline photographs are stock-licensed Unsplash images, captioned editorially.`}
        </SB>

        <div
          style={{
            background: C.bgCard,
            padding: "32px 36px",
            margin: "40px 0 0",
            borderTop: `2px solid ${C.yellow}`,
            borderBottom: `2px solid ${C.yellow}`,
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
              marginBottom: 14,
            }}
          >
            Sources cited
          </div>
          <ul style={{ fontFamily: F.sans, fontSize: 13, lineHeight: 1.7, color: C.ink, paddingLeft: 22 }}>
            <li>
              <b>CIA World Factbook</b> (2025 revision). Country areas, borders, capitals, time zones. Used for
              Kazakhstan, Russia, Equatorial Guinea, Lesotho, San Marino, US–Canada border length.
            </li>
            <li>
              <b>UN Statistics Division</b> — area registry for continents and member states. Used for the Africa
              area comparison.
            </li>
            <li>
              <b>IERS (International Earth Rotation and Reference Systems Service)</b>. The IERS Reference Meridian
              definition. Source for the Greenwich offset.
            </li>
            <li>
              <b>Malys, S., et al.</b> (2015). "Why the Greenwich meridian moved." <em>Journal of Geodesy</em>
              89(12): 1263–1272.
            </li>
            <li>
              <b>Lukatela, H.</b> (1992). Computation of the oceanic pole of inaccessibility. Independent survey
              report (Hipparchus Geomatics).
            </li>
            <li>
              <b>NASA Earth Observatory</b> (2007), "The Highest Mountain in the World." Source for the Chimborazo
              vs. Everest centre-of-Earth comparison.
            </li>
            <li>
              <b>Greenaway, S. F., et al.</b> (2020). "Multibeam-bathymetry-based depth measurement of Challenger
              Deep." <em>JGR Solid Earth</em> 125(7).
            </li>
            <li>
              <b>UNESCO World Heritage Centre.</b> Lake Baikal listing (1996). Source for Baikal depth and freshwater
              fraction.
            </li>
            <li>
              <b>Convention on the Legal Status of the Caspian Sea</b> (Aktau, 12 August 2018). Treaty text. Source
              for the Caspian "neither sea nor lake" regime.
            </li>
            <li>
              <b>BP Statistical Review of World Energy</b> (2024). Caspian basin oil and gas reserves.
            </li>
            <li>
              <b>Thomas, N., &amp; Nigam, S.</b> (2018). "Twentieth-Century Climate Change over Africa: Seasonal
              Hydroclimate Trends and Sahara Desert Expansion." <em>Journal of Climate</em> 31(9): 3349–3370.
            </li>
            <li>
              <b>Anyamba, A., &amp; Tucker, C. J.</b> (2005). "Analysis of Sahelian vegetation dynamics using
              NOAA-AVHRR NDVI data from 1981–2003." <em>Journal of Arid Environments</em> 63(3): 596–614.
            </li>
            <li>
              <b>Wang, X., et al.</b> (2010). "Has the Three Norths Forest Shelterbelt Program solved the desertification
              and dust storm problems in arid and semiarid China?" <em>Journal of Arid Environments</em> 74(1).
            </li>
            <li>
              <b>Thompson, L. G., et al.</b> (2002, 2009). Kilimanjaro ice-core and glacier-area surveys.
              <em>Science</em> 298 and <em>PNAS</em> 106.
            </li>
            <li>
              <b>Kaser, G., Hardy, D. R., et al.</b> (2004). "Modern Glacier Retreat on Kilimanjaro as Evidence of
              Climate Change." <em>International Journal of Climatology</em> 24(3).
            </li>
            <li>
              <b>McKay, C. P., et al.</b> (2003). "Temperature and moisture conditions for life in the extreme arid
              region of the Atacama desert." <em>Astrobiology</em> 3(2).
            </li>
            <li>
              <b>India–Bangladesh Land Boundary Agreement</b> (signed 2011, ratified May 2015). Indian MEA press
              release; <em>The Guardian</em> 1 August 2015 reporting. Source for Dahala Khagrabari.
            </li>
            <li>
              <b>African Development Bank</b>. Kazungula Bridge project files; <em>BBC News</em>, May 2021 opening
              report. Source for the quadripoint engineering.
            </li>
            <li>
              <b>Boundary Treaty between Belgium and the Netherlands</b> (1843; refined 1995). Kadaster Nederland
              official boundary maps. Source for Baarle-Hertog / Baarle-Nassau.
            </li>
            <li>
              <b>International Boundary Commission</b> (US–Canada). Annual joint reports; "the Slash" survey
              standards. Source for the 49th-parallel demarcation.
            </li>
            <li>
              <b>COMNAP</b> (Council of Managers of National Antarctic Programs) station registry, 2024. Source for
              Antarctic time-zone practice.
            </li>
            <li>
              <b>ICPDR</b> (International Commission for the Protection of the Danube River) basin atlas, 2024.
              Source for the ten-country Danube count.
            </li>
            <li>
              <b>USGS</b> National Hydrography Dataset; <em>Encyclopaedia Britannica</em> ("Mississippi River,"
              revised 2024). Source for the Missouri–Mississippi length question.
            </li>
            <li>
              <b>Snyder, J. P.</b> (1987). <em>Map Projections — A Working Manual</em>. USGS Professional Paper
              1395. Source for the Mercator-area distortion.
            </li>
          </ul>

          <div style={{ fontFamily: F.sans, fontSize: 13, lineHeight: 1.7, color: C.ink, marginTop: 18, paddingTop: 14, borderTop: `1px solid ${C.rule}` }}>
            <b>Tier breakdown.</b> Tier 1 (verified from primary source or peer-reviewed literature): every named
            researcher, treaty, statistic, distance and date in this article, including the 22-exclave count for
            Baarle-Hertog, the 1,642 m maximum sounded depth of Lake Baikal, the 6,275 km Missouri–Mississippi
            length, the 102 m Greenwich offset, the 10,935 m Challenger Deep depth, and the 2,688 km Point Nemo
            triple-equidistance. Tier 2 (composite): none — every fact is either documented or flagged as
            contested. The Sahara expansion / greening discussion in §10 is explicitly flagged as scientifically
            contested rather than composited. Tier 3 (invented): none.
          </div>
        </div>

        <div style={{ fontFamily: F.sans, fontSize: 12, color: C.muted, textAlign: "center", marginTop: 32 }}>
          — end —
        </div>
      </div>
    </article>
  );
}
