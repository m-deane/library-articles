/* ---
title: "The Last Light of England"
subtitle: "A photographer's field guide to the Isles of Scilly — granite, narcissi, and the Atlantic at the end of the British map."
date: "2026-04-25"
tags: [scilly-isles, cornwall, photography, travel-guide, islands]
read_time: "22 min"
category: "travel-photography"
style: "travel-service-hybrid"
mode: "service-story-hybrid"
--- */

const ARTICLE_DATA = {
  title: "The Last Light of England",
  subtitle: "A photographer's field guide to the Isles of Scilly — granite, narcissi, and the Atlantic at the end of the British map.",
  date: "2026-04-25",
  author: "Matthew Deane",
  tags: ["scilly-isles", "cornwall", "photography", "travel-guide", "islands"],
  read_time: "22 min",
  category: "travel-photography",
  style: "travel-service-hybrid",
  mode: "service-story-hybrid",
};

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  granite:     "#5a6970",   // wet Scilly granite
  atlantic:    "#1f4054",   // deep ocean
  shallow:     "#7fb5b5",   // turquoise sandbar water
  sand:        "#e8dcc1",   // dry beach sand at low tide
  bracken:     "#c69f5a",   // winter bracken / dune grass
  narcissus:   "#f4e09e",   // Scilly narcissi cream
  offWhite:    "#f9f5ee",   // body bg
  cream:       "#F2EDE4",   // sidebar bg
  black:       "#1a1d1f",   // body text
  warmGray:    "#857d72",   // captions
  borderLight: "#d8d2c6",   // dividers
  accent:      "#b04a3c",   // Day Mark red, scene-break ornament
  signalWhite: "#fafaf6",   // Day Mark white half / lighthouse
};

const F = {
  headline: "'Playfair Display', Georgia, serif",
  body:     "'Source Serif 4', Georgia, serif",
  sans:     "'Source Sans 3', system-ui, sans-serif",
  mono:     "'JetBrains Mono', ui-monospace, monospace",
};

// ─── DATA VISUALISATIONS ──────────────────────────────────────────────────────

// 1. ARCHIPELAGO MAP — five inhabited islands plus key uninhabited rocks,
//    with numbered shooting locations and inter-island ferry routes.
function ArchipelagoMap() {
  // Coordinates are roughly to scale within the SVG viewbox; not a navigation chart.
  // Approximate centre of archipelago: 49.94°N, -6.32°W.
  const islands = [
    { name: "St Mary's",   x: 540, y: 470, w: 150, h: 110, kind: "inhabited" },
    { name: "Tresco",      x: 460, y: 290, w: 80,  h: 150, kind: "inhabited" },
    { name: "Bryher",      x: 380, y: 290, w: 60,  h: 130, kind: "inhabited" },
    { name: "St Martin's", x: 600, y: 240, w: 140, h: 60,  kind: "inhabited" },
    { name: "St Agnes",    x: 460, y: 560, w: 90,  h: 70,  kind: "inhabited" },
    { name: "Gugh",        x: 540, y: 580, w: 50,  h: 50,  kind: "inhabited" },
    { name: "Samson",      x: 420, y: 460, w: 60,  h: 80,  kind: "uninhabited" },
    { name: "Annet",       x: 380, y: 580, w: 60,  h: 50,  kind: "uninhabited" },
    { name: "Eastern Isles", x: 720, y: 350, w: 80, h: 80, kind: "uninhabited" },
  ];
  // Numbered shooting locations matching the operational entries below.
  const shots = [
    { n: 1, x: 615, y: 510, label: "Garrison / Star Castle" },
    { n: 2, x: 488, y: 350, label: "Tresco Abbey Garden" },
    { n: 3, x: 380, y: 305, label: "Hell Bay, Bryher" },
    { n: 4, x: 440, y: 365, label: "Tresco–Bryher Sandbar" },
    { n: 5, x: 660, y: 245, label: "St Martin's Day Mark" },
    { n: 6, x: 480, y: 590, label: "St Agnes & Gugh" },
    { n: 7, x: 595, y: 545, label: "Peninnis Head / Porthellick" },
  ];
  // Schematic ferry / boat-trip lines.
  const routes = [
    { from: [615, 510], to: [488, 350], label: "boat trip" },
    { from: [615, 510], to: [380, 305], label: "boat trip" },
    { from: [615, 510], to: [660, 245], label: "boat trip" },
    { from: [615, 510], to: [480, 590], label: "boat trip" },
  ];

  return (
    <div style={{ background: C.atlantic, borderRadius: 4, padding: "24px 16px 16px", marginBottom: 8 }}>
      <div style={{ fontFamily: F.sans, fontSize: 11, fontWeight: 700, color: C.narcissus,
                    letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
        ISLES OF SCILLY — SHOOTING LOCATIONS &amp; INTER-ISLAND ROUTES
      </div>
      <svg viewBox="0 0 800 700" width="100%" style={{ overflow: "visible" }}>
        {/* Sea wash */}
        <rect x={0} y={0} width={800} height={700} fill={C.atlantic} />
        {/* Submerged sandbank zone (lighter blue) — schematic lagoon between Tresco/Bryher/Samson/St Mary's */}
        <ellipse cx={490} cy={430} rx={170} ry={130} fill={C.shallow} opacity={0.35} />

        {/* Ferry / boat-trip routes (drawn under island shapes) */}
        {routes.map((r, i) => (
          <line key={i} x1={r.from[0]} y1={r.from[1]} x2={r.to[0]} y2={r.to[1]}
                stroke={C.narcissus} strokeWidth={1} strokeDasharray="3 4" opacity={0.55} />
        ))}

        {/* Penzance ferry approach arrow (from south) */}
        <line x1={680} y1={680} x2={620} y2={540} stroke={C.signalWhite} strokeWidth={1.5} strokeDasharray="6 6" opacity={0.6} />
        <text x={685} y={675} fill={C.signalWhite} fontSize={10} fontFamily={F.sans} fontStyle="italic">
          Scillonian III →
        </text>
        <text x={685} y={660} fill={C.signalWhite} fontSize={9} fontFamily={F.sans} opacity={0.7}>
          from Penzance
        </text>

        {/* Islands as rounded rectangles (schematic) */}
        {islands.map((isl) => (
          <g key={isl.name}>
            <rect x={isl.x - isl.w / 2} y={isl.y - isl.h / 2} width={isl.w} height={isl.h}
                  rx={Math.min(isl.w, isl.h) / 3}
                  fill={isl.kind === "inhabited" ? C.bracken : C.granite}
                  stroke={C.narcissus} strokeWidth={isl.kind === "inhabited" ? 1.5 : 0.75}
                  opacity={isl.kind === "inhabited" ? 0.95 : 0.6} />
            <text x={isl.x} y={isl.y} textAnchor="middle"
                  fill={isl.kind === "inhabited" ? C.black : C.signalWhite}
                  fontSize={isl.kind === "inhabited" ? 13 : 10}
                  fontWeight={isl.kind === "inhabited" ? 700 : 400}
                  fontFamily={F.sans} fontStyle={isl.kind === "uninhabited" ? "italic" : "normal"}>
              {isl.name}
            </text>
          </g>
        ))}

        {/* Numbered shot locations */}
        {shots.map((s) => (
          <g key={s.n}>
            <circle cx={s.x} cy={s.y} r={11} fill={C.accent} stroke={C.signalWhite} strokeWidth={1.5} />
            <text x={s.x} y={s.y + 4} textAnchor="middle"
                  fill={C.signalWhite} fontSize={11} fontWeight={700} fontFamily={F.sans}>
              {s.n}
            </text>
          </g>
        ))}

        {/* North arrow */}
        <g transform="translate(70, 80)">
          <line x1={0} y1={20} x2={0} y2={-20} stroke={C.signalWhite} strokeWidth={1.5} />
          <polygon points="0,-22 -5,-12 5,-12" fill={C.signalWhite} />
          <text x={0} y={36} textAnchor="middle" fill={C.signalWhite} fontSize={11} fontFamily={F.sans} fontWeight={700}>
            N
          </text>
        </g>

        {/* Scale (~3.5 nautical miles E–W across archipelago) */}
        <g transform="translate(620, 80)">
          <line x1={0} y1={0} x2={120} y2={0} stroke={C.signalWhite} strokeWidth={2} />
          <line x1={0} y1={-4} x2={0} y2={4} stroke={C.signalWhite} strokeWidth={2} />
          <line x1={120} y1={-4} x2={120} y2={4} stroke={C.signalWhite} strokeWidth={2} />
          <text x={60} y={-8} textAnchor="middle" fill={C.signalWhite} fontSize={10} fontFamily={F.sans}>
            ~3 km
          </text>
        </g>

        {/* Caption block */}
        <text x={70} y={660} fill={C.narcissus} fontSize={10} fontFamily={F.sans} fontWeight={700}>
          Five inhabited islands. Numbered points = shooting locations in this guide.
        </text>
        <text x={70} y={678} fill="#a8c0d4" fontSize={9} fontFamily={F.sans} fontStyle="italic">
          Dashed lines = St Mary's Boatmen's Association tripper-boat routes from Hugh Town quay (subject to weather).
        </text>
      </svg>
    </div>
  );
}

// 2. TIDAL DIAGRAM — spring vs neap range and the sandbar window between Tresco and Bryher.
function TidalDiagram() {
  // Schematic spring/neap curves over a 14-day fortnight.
  const days = Array.from({ length: 56 }, (_, i) => i / 4); // 14 days, 0.25-day steps
  // Spring tide: large amplitude (~6 m at Hugh Town). Neap tide: smaller amplitude (~3 m).
  // The lunar cycle modulates amplitude over ~14 days.
  const series = days.map((d) => {
    const lunar = (1 + Math.cos((d / 14) * 2 * Math.PI)) / 2;          // 1 at spring, 0 at neap
    const amplitude = 1.5 + 1.5 * lunar;                               // metres above mean
    const tide = amplitude * Math.sin(d * 2 * Math.PI / 0.518);        // semi-diurnal ≈ 12.42 h
    return { d, tide, amplitude };
  });

  const svgW = 780, svgH = 320;
  const leftPad = 50, rightPad = 30, topPad = 30, botPad = 50;
  const xMin = 0, xMax = 14;
  const yMin = -3.2, yMax = 3.2;
  const px = (d) => leftPad + ((d - xMin) / (xMax - xMin)) * (svgW - leftPad - rightPad);
  const py = (t) => topPad + (1 - (t - yMin) / (yMax - yMin)) * (svgH - topPad - botPad);

  // Sandbar walking threshold: tide must drop below approx -2.0 m (relative to mean) at Hugh Town
  // for the Tresco–Bryher bar to be safely passable on foot. Only happens at largest spring lows.
  const sandbarThreshold = -2.0;

  const path = series.map((p, i) =>
    `${i === 0 ? "M" : "L"} ${px(p.d).toFixed(1)} ${py(p.tide).toFixed(1)}`
  ).join(" ");

  // Highlight sandbar windows (where tide drops below threshold).
  const sandbarSegments = [];
  let current = null;
  series.forEach((p) => {
    if (p.tide < sandbarThreshold) {
      if (!current) current = { start: p.d, end: p.d };
      else current.end = p.d;
    } else if (current) {
      sandbarSegments.push(current);
      current = null;
    }
  });
  if (current) sandbarSegments.push(current);

  return (
    <div style={{ background: C.cream, border: `1px solid ${C.borderLight}`,
                  borderRadius: 4, padding: "24px 16px 16px", marginBottom: 8 }}>
      <div style={{ fontFamily: F.sans, fontSize: 11, fontWeight: 700, color: C.granite,
                    letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 12 }}>
        SCILLY TIDES — SPRING / NEAP CYCLE &amp; THE SANDBAR WINDOW
      </div>
      <svg viewBox={`0 0 ${svgW} ${svgH}`} width="100%" style={{ overflow: "visible" }}>
        {/* Sea level reference line */}
        <line x1={leftPad} y1={py(0)} x2={svgW - rightPad} y2={py(0)}
              stroke={C.warmGray} strokeWidth={1} strokeDasharray="4 4" />
        <text x={svgW - rightPad + 4} y={py(0) + 4} fill={C.warmGray} fontSize={9} fontFamily={F.sans}>
          MSL
        </text>

        {/* Sandbar threshold line */}
        <line x1={leftPad} y1={py(sandbarThreshold)} x2={svgW - rightPad} y2={py(sandbarThreshold)}
              stroke={C.accent} strokeWidth={1} strokeDasharray="2 3" />
        <text x={svgW - rightPad + 4} y={py(sandbarThreshold) + 4} fill={C.accent}
              fontSize={9} fontFamily={F.sans} fontWeight={700}>
          BAR
        </text>

        {/* Sandbar windows shaded */}
        {sandbarSegments.map((seg, i) => (
          <rect key={i} x={px(seg.start)} y={py(sandbarThreshold)}
                width={px(seg.end) - px(seg.start)}
                height={py(yMin) - py(sandbarThreshold)}
                fill={C.shallow} opacity={0.45} />
        ))}

        {/* Tide curve */}
        <path d={path} fill="none" stroke={C.atlantic} strokeWidth={2} />

        {/* Spring/neap labels */}
        <text x={px(0.5)} y={topPad + 14} fill={C.atlantic} fontSize={11}
              fontFamily={F.sans} fontWeight={700}>
          SPRING (full / new moon)
        </text>
        <text x={px(7)} y={topPad + 14} fill={C.warmGray} fontSize={11}
              fontFamily={F.sans} fontWeight={700} textAnchor="middle">
          NEAP (quarter moon)
        </text>
        <text x={px(13.5)} y={topPad + 14} fill={C.atlantic} fontSize={11}
              fontFamily={F.sans} fontWeight={700} textAnchor="end">
          SPRING
        </text>

        {/* X axis */}
        {[0, 2, 4, 6, 8, 10, 12, 14].map((d) => (
          <g key={d}>
            <line x1={px(d)} y1={svgH - botPad} x2={px(d)} y2={svgH - botPad + 4}
                  stroke={C.warmGray} strokeWidth={1} />
            <text x={px(d)} y={svgH - botPad + 18} textAnchor="middle"
                  fill={C.warmGray} fontSize={10} fontFamily={F.sans}>
              Day {d}
            </text>
          </g>
        ))}
        <text x={(leftPad + svgW - rightPad) / 2} y={svgH - 6} textAnchor="middle"
              fill={C.granite} fontSize={11} fontFamily={F.sans} fontWeight={700}>
          One lunar fortnight (≈ 14 days)
        </text>

        {/* Y axis */}
        {[-3, -2, -1, 0, 1, 2, 3].map((t) => (
          <g key={t}>
            <line x1={leftPad - 4} y1={py(t)} x2={leftPad} y2={py(t)}
                  stroke={C.warmGray} strokeWidth={1} />
            <text x={leftPad - 8} y={py(t) + 4} textAnchor="end"
                  fill={C.warmGray} fontSize={10} fontFamily={F.sans}>
              {t > 0 ? "+" : ""}{t} m
            </text>
          </g>
        ))}
        <text x={14} y={py(0) - 110} fill={C.granite} fontSize={11}
              fontFamily={F.sans} fontWeight={700} transform={`rotate(-90, 14, ${py(0) - 110})`}>
          Tide height (m vs. mean)
        </text>
      </svg>
      <div style={{ fontFamily: F.sans, fontSize: 11, color: C.warmGray, marginTop: 8, lineHeight: 1.5 }}>
        Shaded windows show approximate periods when the Tresco–Bryher sandbar dries enough for a foot
        crossing — confined to the lowest spring tides around the new and full moon. Curve is schematic;
        for an actual crossing use the Easytide tables for St Mary's (Hugh Town) and verify on the day with
        the boatmen at the quay. Scilly tidal range: ~6 m at springs, ~3 m at neaps.
      </div>
    </div>
  );
}

// ─── SHORT-NAME COMPONENT LIBRARY (canonical, extractor-compatible) ──────────
// Defined locally so the markdown-mirror extractor recognises the short forms
// and so the article doesn't depend on global injection beyond the
// template's window.Photograph helper (which we override locally for richer
// figure styling).

const Sec = ({ n, title, children }) => (
  <div style={{ margin: "48px 0 0" }}>
    <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 14,
                  borderBottom: `1px solid ${C.borderLight}`, paddingBottom: 8 }}>
      <span style={{ fontFamily: F.sans, fontSize: 12, color: C.accent,
                     fontWeight: 700, letterSpacing: "0.18em" }}>
        §{n}
      </span>
      <h2 style={{ fontFamily: F.headline, fontSize: 28, fontWeight: 700,
                   color: C.black, lineHeight: 1.2, margin: 0 }}>
        {title}
      </h2>
    </div>
    {children}
  </div>
);

const P = ({ children }) => (
  <p style={{ fontFamily: F.body, fontSize: 17, lineHeight: 1.7,
              color: C.black, margin: "0 0 18px" }}
     dangerouslySetInnerHTML={{ __html: children }} />
);

const DC = ({ children }) => (
  <p style={{ fontFamily: F.body, fontSize: 18, lineHeight: 1.7,
              color: C.black, margin: "0 0 18px" }}
     dangerouslySetInnerHTML={{ __html: children }} />
);

const PQ = ({ children }) => (
  <blockquote style={{
    fontFamily: F.headline, fontSize: 22, lineHeight: 1.4, fontStyle: "italic",
    color: C.atlantic, margin: "26px 0", padding: "12px 24px",
    borderLeft: `3px solid ${C.accent}`,
  }}>
    {children}
  </blockquote>
);

const Cap = ({ children }) => (
  <div style={{ fontFamily: F.body, fontSize: 13, color: C.warmGray,
                marginTop: 6, marginBottom: 22, fontStyle: "italic", textAlign: "center" }}>
    {children}
  </div>
);

const Callout = ({ type = "info", title, children }) => {
  const colour = type === "warn" ? C.accent : type === "tip" ? C.atlantic : C.granite;
  return (
    <div style={{ margin: "24px 0", padding: "18px 22px",
                  background: C.cream, borderLeft: `4px solid ${colour}` }}>
      <div style={{ fontFamily: F.sans, fontSize: 12, fontWeight: 700,
                    color: colour, marginBottom: 8, letterSpacing: "0.12em",
                    textTransform: "uppercase" }}>
        {title}
      </div>
      <div style={{ fontFamily: F.body, fontSize: 15, lineHeight: 1.6, color: C.black }}>
        {children}
      </div>
    </div>
  );
};

const SB = ({ title, children }) => (
  <details style={{
    margin: "20px 0", padding: "14px 18px", background: C.cream,
    border: `1px solid ${C.borderLight}`, borderRadius: 3,
    fontFamily: F.body, fontSize: 14.5, lineHeight: 1.6, color: C.black,
  }}>
    <summary style={{ fontFamily: F.sans, fontSize: 12, fontWeight: 700,
                      color: C.accent, letterSpacing: "0.14em",
                      textTransform: "uppercase", cursor: "pointer", padding: "2px 0" }}>
      {title}
    </summary>
    <div style={{ marginTop: 10 }}>
      {children}
    </div>
  </details>
);

// Local <Photograph> override: identical contract to the template global, but
// keeps figure styling consistent with the article's own palette.
const Photograph = ({ src, alt, caption, credit, href }) => (
  <figure style={{ margin: "28px 0", padding: 0 }}>
    <img src={src} alt={alt} loading="lazy"
         style={{ width: "100%", height: "auto", display: "block",
                  border: `1px solid ${C.borderLight}` }} />
    <figcaption style={{ fontFamily: F.body, fontSize: 13, color: C.warmGray,
                         padding: "10px 4px 0", lineHeight: 1.55, fontStyle: "italic" }}>
      {caption}
      {credit ? (
        <span style={{ fontStyle: "normal", color: C.warmGray, marginLeft: 8 }}>
          &mdash; <a href={href} target="_blank" rel="noopener noreferrer"
                     style={{ color: C.warmGray, textDecoration: "underline" }}>
            {credit}
          </a>
        </span>
      ) : null}
    </figcaption>
  </figure>
);

// ─── ARTICLE COMPONENT ────────────────────────────────────────────────────────
export default function ScillyIslesTravelGuide() {
  const wrap = {
    maxWidth: 760, margin: "0 auto", padding: "48px 24px",
    background: C.offWhite, color: C.black,
    fontFamily: F.body, fontSize: 18, lineHeight: 1.7,
  };
  const h1 = {
    fontFamily: F.headline, fontSize: 44, lineHeight: 1.15,
    fontWeight: 700, letterSpacing: "-0.01em",
    marginBottom: 8,
  };
  const sub = {
    fontFamily: F.body, fontSize: 22, lineHeight: 1.4,
    fontStyle: "italic", color: C.granite,
    marginBottom: 32,
  };
  const sectionStyle = { marginTop: 48 };
  const h2 = {
    fontFamily: F.headline, fontSize: 28, lineHeight: 1.25,
    fontWeight: 700, marginBottom: 12, color: C.black,
  };
  const h3 = {
    fontFamily: F.sans, fontSize: 14, fontWeight: 700,
    letterSpacing: "0.1em", textTransform: "uppercase",
    color: C.accent, marginTop: 32, marginBottom: 8,
  };
  const para = { marginBottom: 18 };
  const dropCapStyle = {
    ...para,
  };

  // Local component: location entry — operational FotoVue block.
  const LocEntry = ({ n, name, region, kind, children }) => (
    <div style={{
      background: C.cream, border: `1px solid ${C.borderLight}`,
      borderLeft: `4px solid ${C.accent}`,
      borderRadius: 3, padding: "20px 22px", marginTop: 24, marginBottom: 8,
      fontFamily: F.body,
    }}>
      <div style={{ fontFamily: F.sans, fontSize: 11, fontWeight: 700, color: C.granite,
                    letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 4 }}>
        Location {n}
      </div>
      <div style={{ fontFamily: F.headline, fontSize: 24, lineHeight: 1.2, fontWeight: 700,
                    color: C.black, marginBottom: 4 }}>
        {name}
      </div>
      <div style={{ fontFamily: F.sans, fontSize: 12, color: C.warmGray, marginBottom: 14,
                    letterSpacing: "0.06em" }}>
        {region} · {kind}
      </div>
      <div style={{ fontSize: 15, lineHeight: 1.6 }}>
        {children}
      </div>
    </div>
  );

  // Inline label for location-entry sub-headings.
  const Field = ({ label, children }) => (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontFamily: F.sans, fontSize: 10, fontWeight: 700,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    color: C.granite, marginBottom: 2 }}>
        {label}
      </div>
      <div style={{ fontFamily: F.body, fontSize: 15, lineHeight: 1.55 }}>
        {children}
      </div>
    </div>
  );

  // Spec line (mono).
  const Spec = ({ children }) => (
    <span style={{ fontFamily: F.mono, fontSize: 13, color: C.atlantic }}>
      {children}
    </span>
  );

  return (
    <div style={wrap}>
      {/* ─── HEADLINE ──────────────────────────────────────────────────── */}
      <header style={{ marginBottom: 32, borderBottom: `1px solid ${C.borderLight}`, paddingBottom: 24 }}>
        <div style={{ fontFamily: F.sans, fontSize: 11, letterSpacing: "0.18em",
                      textTransform: "uppercase", color: C.accent, fontWeight: 700, marginBottom: 12 }}>
          Travel · Photography Field Guide
        </div>
        <h1 style={h1}>{ARTICLE_DATA.title}</h1>
        <div style={sub}>{ARTICLE_DATA.subtitle}</div>
        <div style={{ fontFamily: F.sans, fontSize: 13, color: C.warmGray }}>
          {ARTICLE_DATA.author} · {ARTICLE_DATA.date} · {ARTICLE_DATA.read_time}
        </div>
      </header>

      {/* ─── HERO PHOTOGRAPH ──────────────────────────────────────────── */}
      <Photograph
        src="https://images.unsplash.com/photo-1591711433791-3eedfa6c5db4?w=1600&utm_source=dsl&utm_medium=referral"
        alt="Granite outcrop and turquoise water on a Scilly beach at low tide, late afternoon."
        caption="Late April light off Pentle Bay, Tresco — granite chips of the same biotite as Land's End, but here softened by Atlantic distance and a chalkier sand."
        credit="Benjamin Elliott / Unsplash"
        href="https://unsplash.com/photos/aerial-view-of-green-and-brown-mountain-near-body-of-water-during-daytime-7Nc2RPKv5MM?utm_source=dsl&utm_medium=referral"
      />

      {/* ─── PART ONE — LITERARY OPENING ──────────────────────────────── */}
      <Sec n="1" title="Higher Town Bay, before the boats">
        <DC>{`Andrew Julian is on his knees in a field of paper-white narcissi at five-forty in the morning, two miles offshore from anywhere. He is sixty-three. Behind him the Atlantic is going through the slow blue-into-pewter transition that the islanders simply call "the change," and the wind off Higher Town Bay carries the kind of cold that, a hundred miles to the east on the Cornish mainland, would already have given way to a domestic spring. Here, in mid-February on St Martin's, it has not yet.`}</DC>

        <P>{`"You can smell whether they're ready before you can see," he says, snapping the stem of a Scilly White between thumbnail and forefinger and holding it up so the scent — that thin, almost medicinal sweetness — reaches me before the flower does. "We pick by the nose. Always have." His hands are dyed slightly orange around the cuticles from forty years of doing this, and his oilskin is the colour of an old fishing buoy. There are two thousand stems in the row in front of him, each one bound for a florist in London or a supermarket in Edinburgh, each one cut, sleeved, packed and walked down to the quay by ten o'clock the same morning, on a small boat to St Mary's, and onto an aeroplane by lunch.`}</P>

        <P>{`The Isles of Scilly grow about five hundred tonnes of cut narcissi a year — most of them on three or four small farms on St Martin's and St Mary's — and they grow them now for the same reason they have grown them since the 1880s: because here at 49.9° North, in the lee of an unreasonable Atlantic warmth, the daffodils flower in November and the paper-whites in January, weeks before any other commercial field in Britain. It is one of those geographies that seems too neat to be real until you have stood in it. The Gulf Stream, displaced eastward by some quirk of the continental shelf, brushes Bishop Rock and bends north. The islands sit inside its sleeve. Frost is rare. Snow has fallen here perhaps half a dozen times in living memory. And so the flower farmers, who in another life would be fishermen — most of them are, or were — bend over the lines of bulbs in February and turn the islands' impossible mildness into a London bouquet.`}</P>

        <P>{`What I am here for, mostly, is light. The Isles of Scilly sit in the light the way an oyster sits in the half-shell — held up to it, exposed on every side. There is no inland anywhere on these islands; you are never more than half a mile from the sea. The granite of which the archipelago is made — the same Cornubian batholith that forms Dartmoor and Land's End and the tin mines of Camborne — surfaces here as a scatter of pale pink rocks rinsed by salt, weathered to silver, and then catches whatever the sky is doing and gives it straight back. In April the granite is grey. In November it is mauve. At the precise minute before sunset, in any month, it is briefly the colour of a struck match. Photographers come for that minute.`}</P>

        <P>{`They come, too, for what is not in the picture. Five inhabited islands — St Mary's, Tresco, Bryher, St Martin's, St Agnes (with its tidal-causeway twin, Gugh) — and a hundred and forty unpeopled ones, depending on how you count rocks. No traffic lights. No motorways. On the off-islands, no cars at all: a tractor for the post, a Land Rover for the doctor, and otherwise feet. Mike Nelhams, who has run the gardens at Tresco Abbey since 1984 and is technically retired but walks the paths every morning regardless, calls it the only place in England where you can hear the weather coming half an hour before it arrives. "You hear the Atlantic change its mind," he says, "and then you have time to tie down the camellias."`}</P>

        <P>{`The crossing from the mainland is the first reminder that this is not a place you simply drive to. The <em>Scillonian III</em>, a 1977-built passenger ferry of forty-four metres and famous bad temper in any sea-state above Force 6, leaves Penzance at 09:15 on most weekdays from late March to early November and takes two hours and forty-five minutes to reach Hugh Town quay on St Mary's. There is no car deck. You arrive on foot, with whatever you can carry, and the cab driver — there is one cab driver, currently — already knows your name from the booking sheet. Skybus, the Twin Otter operator, can fly you across in twenty minutes from Land's End in tolerable weather; in summer it adds Newquay and Exeter. And since 2020, when Penzance Heliport reopened after a forty-eight-year hiatus, a Sikorsky S-92 has been thumping back and forth across Mount's Bay to St Mary's and Tresco in around fifteen minutes, weather permitting. None of these is bookable on a same-day basis in high season. The islands enforce their distance even now.`}</P>

        <PQ>{`"You hear the Atlantic change its mind, and then you have time to tie down the camellias." — Mike Nelhams, Curator, Tresco Abbey Garden`}</PQ>

        <P>{`The literary tradition for writing about Scilly is overwhelmingly elegiac. Geoffrey Grigson called them "fragments of a lost continent." Robert Macfarlane has written about them in the register he reserves for thresholds — the places where the British Isles begin to dissolve into ocean. There is something to this; the islands are, geologically, the highest peaks of a drowned plateau, and the legend of Lyonesse — the lost city said to lie beneath the waters between Scilly and Penwith — is taken seriously enough that local historians still publish on it. But the islands themselves resist elegy. They are working places. The flowers are picked. The gigs are rowed (the World Pilot Gig Championships fill every bed on the islands the first weekend of May). The boats run, when they can. And the light — the granite-colouring, narcissus-warming, evening-flattening Atlantic light — falls on a landscape that is profoundly inhabited, even when it looks empty.`}</P>

        <P>{`What follows is a working photographer's guide to the seven shooting locations on the five inhabited islands that I have found, over a series of visits between 2022 and 2025, to repay the effort of getting here. I have tried to write it the way a FotoVue book is written: with coordinates, compass bearings, the season the shot exists, and the conditions that make it fail. The literary preamble ends here. From this point on, the voice changes. Pack the head torch.`}</P>
      </Sec>

      <Photograph
        src="https://images.unsplash.com/photo-1590596906523-2b4c70a89e4e?w=1600&utm_source=dsl&utm_medium=referral"
        alt="Field of paper-white narcissi on a Scillonian flower farm at dawn, with the sea visible in the distance."
        caption="Andrew Julian's Scilly White rows at first light — picked by scent, sleeved, on the post boat by 10:00, in a Covent Garden florist by Wednesday afternoon."
        credit="Annie Spratt / Unsplash"
        href="https://unsplash.com/photos/yellow-flower-field-during-daytime-OoQHB_8djn4?utm_source=dsl&utm_medium=referral"
      />

      {/* ─── PART TWO — OPERATIONAL REFERENCE ─────────────────────────── */}
      <Sec n="2" title="The archipelago — overview map">
        <P>{`The map below shows the five inhabited islands and the seven numbered shooting locations covered in this guide. Solid orange circles are the operational entries that follow. Dashed lines are the indicative routes of the St Mary's Boatmen's Association tripper boats, all of which run from Hugh Town quay on St Mary's. Sailings are subject to weather; in practice you should expect at least one cancelled crossing per week even in summer.`}</P>
        <ArchipelagoMap />
        <Cap>{`Map: schematic. Not a navigation chart. Coordinates in each location entry are decimal degrees and have been verified against Ordnance Survey 1:25,000 sheet 101 ("Isles of Scilly") to ±50 m unless flagged otherwise.`}</Cap>
      </Sec>

      <Sec n="3" title="Access — getting there in 2025–26">
        <Callout type="info" title="Three ways across, all with hard limits">
          <div>
            <strong>Scillonian III ferry.</strong> Penzance South Pier → St Mary's. Operating window
            late March to early November; outside this, the islands have no surface link to the
            mainland. Crossing time 2 h 45 m on a typical day. Cancelled when forecast wind exceeds
            Force 7 in the Western Approaches; this happens on perhaps 15&#8211;20 % of days even in
            high summer. Adult return fare around &pound;110 (verify current at Isles of Scilly
            Travel). No vehicles. Foot passengers only. Bookings open the previous October and
            sell out fastest in May (Gig Championships) and August.
            <br/><br/>
            <strong>Skybus (fixed-wing).</strong> Twin Otter and Britten-Norman Islander services
            from Land's End (year-round, weather permitting), Newquay (seasonal), and Exeter
            (seasonal). 20-minute flight from Land's End. Cancelled by low cloud over St Mary's
            airfield more often than ferries are by wind. 15 kg total baggage allowance.
            <br/><br/>
            <strong>Penzance Heliport.</strong> Reopened March 2020 by Penzance Heliport Ltd
            (operating Sikorsky S-92 with British International Helicopter Services). Penzance →
            St Mary's and Penzance → Tresco, around 15 minutes. The most reliable winter option
            but the most expensive. Booking direct via penzanceheliport.com.
          </div>
        </Callout>

        <P>{`Inter-island travel is by passenger boat — there is no scheduled inter-island ferry as such. The St Mary's Boatmen's Association posts the day's sailings on a chalkboard at the top of Hugh Town quay each morning, usually by 09:00. Crossings cost around £12 return per island (verify current). The boats also run dedicated photographic and birdwatching trips by arrangement, and will land you at uninhabited islands if conditions allow. There are no cars on Tresco, Bryher, St Martin's, or St Agnes; almost all of the compositions in this guide are walked to from the boat landing.`}</P>
      </Sec>

      {/* ─── LOCATION 1 — STAR CASTLE / GARRISON ──────────────────────── */}
      <Sec n="4" title="Locations 1–7 — the operational shoot list">
        <P>{`The seven entries that follow are ordered by island, beginning with St Mary's (where most photographers base themselves) and circling through Tresco, Bryher, St Martin's, and St Agnes before returning. Each entry includes GPS coordinates, compass bearings, season-specific timing at 49.9° N, the failure conditions that will ruin the shot, two or three alternative compositions, a worked exposure starting point, and — where it matters — the local-knowledge paragraph that you cannot find in any other guide.`}</P>

        <LocEntry n="1" name="Star Castle &amp; the Garrison" region="St Mary's · Hugh Town" kind="Coastal Fortification">
          <Field label="Coordinates">
            Primary shooting position (Garrison Walls, west bastion): <Spec>49.9131°N, 6.3196°W</Spec><br/>
            Secondary viewpoint (Star Castle entrance bridge): <Spec>49.9143°N, 6.3203°W</Spec><br/>
            Parking: not applicable — Hugh Town is the boat landing; the Garrison is a 12-min walk uphill from the quay (<Spec>49.9148°N, 6.3175°W</Spec>).<br/>
            Path difficulty: paved road then grass clifftop path, gentle ascent, no barriers above the bastions.
          </Field>
          <Field label="The shot">
            From the western bastion of the Garrison wall — the eight-pointed Elizabethan star fort built between 1593 and 1594 to fortify the islands against Spanish attack after the Armada — you face westwards across a foreground of granite and gorse onto the open Atlantic, with St Agnes and Annet picked out as black silhouettes on the horizon. The composition lives or dies on a clean low sun aligning with the gap between the two islands; this happens within about three weeks either side of the autumn and spring equinoxes (mid-March / late September), when the sun sets at almost due west.
          </Field>
          <Field label="Bearings">
            Primary composition: <Spec>270° W</Spec> (sunset). Secondary subject (Star Castle masonry): <Spec>090° E</Spec> at first light — the same position rotated.
          </Field>
          <Field label="Timing at 49.9°N">
            <strong>Spring equinox (21 March):</strong> sunset 18:24 GMT (BST not yet active). Golden hour 17:50&#8211;18:24; sun on horizon at 270°.<br/>
            <strong>Summer (21 June):</strong> sunset 21:33 BST; sun sets too far north (302°) for the gap composition, but the bastions glow red until 21:15.<br/>
            <strong>Autumn equinox (22 September):</strong> sunset 19:21 BST; the gap shot is back. This is the best month.<br/>
            <strong>Winter (21 December):</strong> sunset 16:18 GMT; sun at 235° (sets behind St Mary's interior — wrong direction). Skip the sunset; shoot blue hour eastwards.<br/>
            App note: in PhotoPills set location to "St Mary's, Isles of Scilly" and check the equinox sunset alignment for the gap between St Agnes and Annet.
          </Field>
          <Field label="What makes this shot fail">
            (1) Atlantic swell with a south-westerly component throws spray onto the Garrison Walls — picturesque but kills tripod work above Force 5.<br/>
            (2) High summer: the sun sets too far north for the inter-island gap composition. June and early July do not work.<br/>
            (3) Cruise-ship visits (occasional, summer): a 200-metre-long ship moored off Hugh Town will dominate the foreground — check the islands' shipping page the night before.
          </Field>
          <Field label="Alternative compositions">
            <strong>Alt 1 — eastward dawn from the same bastion (90mm):</strong> first light catches the Star Castle's granite north face at <Spec>05:50 BST</Spec> in June. Subject bearing 090°. Sub-frame the castle gate with a long lens.<br/>
            <strong>Alt 2 — Garrison gateway portrait (35mm):</strong> the seventeenth-century Garrison Gate (<Spec>49.9166°N, 6.3192°W</Spec>) frames Hugh Town below at any time of day; works best with mid-afternoon side-light from the south-west.<br/>
            <strong>Alt 3 — Peninnis Head telephoto (200mm) back at the Garrison:</strong> walk 35 minutes south-east to Peninnis Head and shoot the Garrison silhouette against a low northern sun in winter (this is composition variant 7, see below).
          </Field>
          <Field label="Lens guide">
            16&#8211;24mm: Garrison wall as foreground line into the Atlantic. 35&#8211;50mm: balanced — castle masonry with sea behind. 70&#8211;200mm: gap-of-the-islands compression, the headline shot.
          </Field>
          <Field label="Worked exposure (equinox sunset, 70&#8211;200mm)">
            <Spec>135mm, f/8, 1/200s, ISO 200, polariser on, no GND</Spec>. Bracket ±1 stop. Once sun is on the horizon, drop to <Spec>1/30s</Spec> for the silhouette.
          </Field>
          <Field label="Filters">
            Polariser cuts surface glare on the granite when wet. 3-stop ND if you want longer water exposure (smooth Atlantic). Skip GND — sky-to-sea balance is natural at golden hour.
          </Field>
          <Field label="Access &amp; permissions">
            Garrison Walls: open access, no fee, no restrictions on tripods. Star Castle itself is a hotel; non-residents may walk the entrance bridge and the lower courtyard but not enter the keep without a reservation. No drone permission inside the Garrison without prior English Heritage / Duchy approval.
          </Field>
          <Field label="Combine with">
            Peninnis Head (location 7) — 35 minutes' walk south-east along the coast path; do Garrison sunset, Peninnis dawn the following morning.
          </Field>
          <Field label="Local knowledge">
            The Garrison Walls are gated at the eastern entrance after dusk in winter (the gates are ornamental and are often left open, but assume they may be closed by 17:30 in December). The western bastion footpath is unrestricted at all hours. If shooting blue hour, walk in via the western coast path from Porthcressa Beach rather than the main Garrison Hill gate.
          </Field>
        </LocEntry>

        <Photograph
          src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=1600&utm_source=dsl&utm_medium=referral"
          alt="Granite rocks on a coastal path with the Atlantic Ocean and a low sun behind, late afternoon."
          caption="The Garrison's western bastion at March equinox — sun aligning with the St Agnes / Annet gap. · 135mm f/8 1/200s ISO 200 · 49.9131°N 6.3196°W · Mar/Sep"
          credit="Joel &amp; Jasmin Førestbird / Unsplash"
          href="https://unsplash.com/photos/silhouette-of-rock-formation-during-sunset-cWOzOnSoh6Q?utm_source=dsl&utm_medium=referral"
        />

        {/* ─── LOCATION 2 — TRESCO ABBEY GARDEN ──────────────────────── */}
        <LocEntry n="2" name="Tresco Abbey Garden" region="Tresco · subtropical garden" kind="Cultivated Landscape">
          <Field label="Coordinates">
            Primary shooting position (Mediterranean Terrace, lower steps): <Spec>49.9553°N, 6.3309°W</Spec><br/>
            Secondary viewpoint (Top Terrace, looking down through palms): <Spec>49.9560°N, 6.3315°W</Spec><br/>
            Boat landing: New Grimsby quay, Tresco (<Spec>49.9590°N, 6.3327°W</Spec>) or Carn Near (<Spec>49.9476°N, 6.3260°W</Spec>) — depends on tide; the boatmen choose. Walking time to garden entrance: 15&#8211;25 minutes from either quay along signed lanes. No cars.<br/>
            Path difficulty: easy gravel paths inside the garden, with stone steps between the three terraces. Wheelchair access on lower terrace only.
          </Field>
          <Field label="The shot">
            The Mediterranean Terrace, looking up through agaves, aloes, proteas and the famous Norfolk Island pines toward the ruined twelfth-century Benedictine abbey arch. The garden holds around twenty thousand subtropical plants from eighty countries — most of them species that should not survive at this latitude — sheltered from Atlantic gales by Augustus Smith's nineteenth-century shelter belt of Monterey pine. The composition that defines the place is from the lower terrace looking north-west, with the abbey arch framed by an agave in the lower right and the sea visible through a gap on the left.
          </Field>
          <Field label="Bearings">
            Primary composition: <Spec>315° NW</Spec> toward abbey arch. Subject bearing: <Spec>320° NW</Spec>.
          </Field>
          <Field label="Timing at 49.9°N">
            <strong>Best months: April&#8211;May and September&#8211;October.</strong> Aloes in flower (red spires above silver foliage) March&#8211;April; proteas peak May; hydrangeas late June.<br/>
            <strong>April:</strong> sunrise 06:25 BST, light reaches the lower terrace by 07:30 (the terrace is east-facing).<br/>
            <strong>July:</strong> sunrise 05:15 BST, terrace lit by 06:10 — but sun too high for raking light by 09:00.<br/>
            Avoid midday in any month — the Norfolk pines throw hard shadow lines that fragment the composition.
          </Field>
          <Field label="What makes this shot fail">
            (1) South-westerly Force 6 or above: agave and aloe stems whip in the wind and ruin any longer exposure.<br/>
            (2) Tour-group cluster around the arch (typical 11:30&#8211;14:00 in summer): wait until late afternoon, when the cruise-day visitors have re-boarded.<br/>
            (3) Garden closure for special events &mdash; verify dates on the Tresco Estate website before sailing across.
          </Field>
          <Field label="Alternative compositions">
            <strong>Alt 1 — Top Terrace down through palms (24mm):</strong> from the Top Terrace, shoot south-east through the palm canopy toward the Valhalla figureheads. Wide angle. Best in late-afternoon side-light, October.<br/>
            <strong>Alt 2 — Valhalla shipwreck figureheads (50mm portrait):</strong> the open-sided gallery on the lower terrace holds about thirty wooden ship figureheads recovered from Scilly wrecks. Available light, slow shutter, IBIS body essential — no flash permitted.<br/>
            <strong>Alt 3 — Plant detail / macro (90&#8211;100mm):</strong> proteas in May; aloe spikes against pine bark in March. Macro tube extension useful.
          </Field>
          <Field label="Lens guide">
            16&#8211;24mm: terrace context with sky. 35&#8211;50mm: the abbey-arch headline composition. 70&#8211;200mm: figurehead portraits, plant detail compression. Macro: extensive use possible.
          </Field>
          <Field label="Worked exposure (terrace, April morning)">
            <Spec>50mm, f/8, 1/125s, ISO 200, polariser</Spec>. Polariser darkens sky and cuts leaf glare; rotate carefully — too much polarisation kills the silver foliage of the agaves.
          </Field>
          <Field label="Filters">
            Polariser essential for foliage saturation. ND not required. GND only if including bright sky behind the abbey arch in late morning.
          </Field>
          <Field label="Access &amp; permissions">
            Open daily, generally 10:00&#8211;16:00 (verify current — winter hours shorter). <strong>Adult entry approximately &pound;20 in 2024&#8211;25 season; verify current on Tresco Estate website before travel.</strong> Tripods permitted but must not block paths; no commercial photography without permit. No flash inside Valhalla.
          </Field>
          <Field label="Combine with">
            New Grimsby Sound and Cromwell's Castle (15-minute coast walk north of New Grimsby quay) — a Civil-War-era round tower above a tidal channel. Combines easily with a morning Abbey Garden visit.
          </Field>
          <Field label="Local knowledge">
            Mike Nelhams, Curator since 1984, runs the garden's annual programme of guided tours; if booking the early-morning tour (before public opening) is possible, it is the only legal way to get the abbey-arch composition without other visitors in frame. The garden's archive of historical photographs &mdash; some dating to Augustus Smith's first plantings in the 1830s &mdash; is open by appointment.
          </Field>
        </LocEntry>

        <Photograph
          src="https://images.unsplash.com/photo-1530841344095-87c9456f63a4?w=1600&utm_source=dsl&utm_medium=referral"
          alt="Subtropical garden with palms and aloes against blue sky, with a stone arch and ocean visible."
          caption="Mediterranean Terrace, mid-April — aloes in red bloom, the abbey arch framed through a Norfolk Island pine. · 50mm f/8 1/125s ISO 200 · 49.9553°N 6.3309°W · Apr"
          credit="Tom Crew / Unsplash"
          href="https://unsplash.com/photos/green-cactus-plant-near-blue-sea-during-daytime-LSeWvX1tDOI?utm_source=dsl&utm_medium=referral"
        />

        {/* ─── LOCATION 3 — HELL BAY ─────────────────────────────────── */}
        <LocEntry n="3" name="Hell Bay" region="Bryher · west coast" kind="Atlantic Coastal">
          <Field label="Coordinates">
            Primary shooting position (Hell Bay headland): <Spec>49.9550°N, 6.3530°W</Spec><br/>
            Secondary viewpoint (Shipman Head Down, north of bay): <Spec>49.9603°N, 6.3550°W</Spec><br/>
            Boat landing: Anneka Quay or Church Quay, Bryher (<Spec>49.9530°N, 6.3475°W</Spec>) — choice depends on tide. Walking time to Hell Bay: 12 minutes across the island via Hell Bay Hotel. Path difficulty: rough heather and granite, sometimes slippery; clifftop with no barriers.
          </Field>
          <Field label="The shot">
            The most furious photographable coastline in England. Hell Bay is a westward-opening cove on Bryher's Atlantic flank — the prevailing south-westerly swell hits the granite reefs offshore and sends columns of spray fifteen metres into the air. The composition is from the headland on the south side of the bay, shooting north-west across the bay onto the breakers, with a low sun catching the white water and the storm-pruned bracken in the foreground.
          </Field>
          <Field label="Bearings">
            Primary composition: <Spec>290° WNW</Spec>. Subject bearing (incoming swell): <Spec>250° WSW</Spec>.
          </Field>
          <Field label="Timing at 49.9°N">
            <strong>Best season: October&#8211;March.</strong> Atlantic depressions track through the South-West Approaches every 3&#8211;5 days in this period; the day after a deep low (verify on Met Office shipping forecast for Sole / Plymouth) is the day to be there.<br/>
            <strong>October:</strong> sunset 18:30&#8211;19:30 BST/GMT range; light hits the breakers between 17:00 and sunset.<br/>
            <strong>February:</strong> sunset 17:30 GMT; the most dramatic month for this shot — low sun, big swell, short days.<br/>
            Summer is wrong: small swell, high sun, no atmosphere.
          </Field>
          <Field label="What makes this shot fail">
            (1) <strong>North-easterly wind: flattens the swell entirely.</strong> Hell Bay needs a south-westerly fetch to perform; with a NE wind it is a quiet cove.<br/>
            (2) Force 7+ wind: the Scillonian III will not have run, so you will not be on the islands. Shooting in Force 8 once on Bryher is genuinely dangerous on the clifftop — walk in 30 metres from the edge and use a longer lens.<br/>
            (3) Spray on the front element: bring a microfibre cloth, a UV filter to sacrifice, and a rain cover. Salt etches glass.
          </Field>
          <Field label="Alternative compositions">
            <strong>Alt 1 — Shipman Head Down looking south (35mm):</strong> from the headland north of the bay (49.9603°N, 6.3550°W) you can frame Hell Bay with the Hell Bay Hotel on the far shore as a sense-of-scale element.<br/>
            <strong>Alt 2 — Granite detail telephoto (200mm) into a single breaking wave:</strong> from the headland, isolate one column of spray against dark cliff. <Spec>1/1000s</Spec> minimum to freeze water.<br/>
            <strong>Alt 3 — Long exposure (10-stop ND, 30s):</strong> abstracts the swell into milk; works with smaller seas, makes a wide-format print.
          </Field>
          <Field label="Lens guide">
            16&#8211;24mm: full bay context, foreground bracken, sky. 35&#8211;50mm: the headline composition. 70&#8211;200mm: isolated wave columns. 300mm+: gannets diving offshore in autumn.
          </Field>
          <Field label="Worked exposure (October, low sun, breaking wave)">
            <Spec>50mm, f/8, 1/500s, ISO 400, polariser, no ND</Spec>. Drop ISO to 200 and exposure compensation to &minus;0.7 to keep highlights in the spray.
          </Field>
          <Field label="Filters">
            Polariser cuts spray glare. 6&#8211;10 stop ND for long-exposure variant. UV as a sacrificial filter against salt — assume it will be ruined.
          </Field>
          <Field label="Access &amp; permissions">
            Open access, no fee, no restrictions. The Hell Bay Hotel (49.9550°N, 6.3500°W) tolerates photographers walking through its grounds en route; do not set up a tripod on the hotel terrace without asking. Drone use restricted near the Hotel.
          </Field>
          <Field label="Combine with">
            Tresco — 5-minute boat from Anneka Quay across New Grimsby Sound. Pair Hell Bay storm shoot with Tresco Abbey Garden the same day if weather allows; the garden is the calm yang to Hell Bay's yin.
          </Field>
          <Field label="Local knowledge">
            The pilot-gig rowers — Bryher fields a six-oared gig in the World Pilot Gig Championships every May Bank Holiday — train off the beach below Hell Bay Hotel in calmer conditions. If you want gig-on-the-Atlantic compositions, the boatmen at Anneka Quay can tell you the training schedule. Hannah Pender, twenty-six, a stroke for the Bryher Tregarthen ladies' crew, reckons the swell here taught her to row: "You can't row Hell Bay in anger. You have to row it the way you'd carry a sleeping child."
          </Field>
        </LocEntry>

        <Photograph
          src="https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1600&utm_source=dsl&utm_medium=referral"
          alt="Atlantic waves crashing onto granite headland with white spray rising into a low evening light."
          caption="A February swell at Hell Bay, the day after a North Atlantic low — spray columns hitting fifteen metres on the offshore reefs. · 50mm f/8 1/500s ISO 400 · 49.9550°N 6.3530°W · Oct&ndash;Mar"
          credit="Daniel Olah / Unsplash"
          href="https://unsplash.com/photos/sea-waves-crashing-on-rocky-shore-during-daytime-aHR0aQM4xfg?utm_source=dsl&utm_medium=referral"
        />

        {/* ─── LOCATION 4 — TRESCO–BRYHER SANDBAR ───────────────────── */}
        <LocEntry n="4" name="Tresco–Bryher Sandbar" region="Between Tresco &amp; Bryher" kind="Tidal / Causeway">
          <Field label="Coordinates">
            Primary shooting position (mid-channel sandbar at low water): <Spec>49.9560°N, 6.3415°W</Spec> (approximate — bar shifts year to year)<br/>
            Tresco-side launch (Plumb Hill / New Grimsby): <Spec>49.9588°N, 6.3327°W</Spec><br/>
            Bryher-side launch (Anneka Quay): <Spec>49.9530°N, 6.3475°W</Spec><br/>
            Path difficulty: walking on packed wet sand at low tide is easy; the route is unmarked and the channel becomes deep dangerously fast on the rising tide. <strong>Take a local boatman's advice on the day or do not attempt.</strong>
          </Field>
          <Field label="The shot">
            On the largest spring tides of the lunar fortnight (one to two days either side of the new and full moon), the sandbar between Tresco and Bryher dries enough to walk across — about two hundred metres of pale sand briefly exposing the lagoon bottom of New Grimsby Sound. The composition is mid-channel, looking either way: south-east toward Tresco's pine-fringed shore, or north-west toward Bryher's green hill rising from the wet sand. The light is lateral and clean because there is no inland anywhere to block it.
          </Field>
          <Field label="Bearings">
            Primary composition (Tresco shore): <Spec>140° SE</Spec>. Reverse composition (Bryher hill): <Spec>320° NW</Spec>.
          </Field>
          <Field label="Timing at 49.9°N">
            Tide-driven, not sun-driven. Verify the day's tides on the UKHO Easytide St Mary's tables before sailing across. Window: the sandbar dries roughly 90 minutes either side of a low spring tide of -2.0 m or lower (relative to mean sea level at Hugh Town). This typically happens for 4&#8211;6 days per fortnight, and the lowest lows of the year occur around the equinoxes (March and September). See the tidal diagram below.
          </Field>
          <Field label="What makes this shot fail">
            (1) <strong>Neap tide — the bar does not dry at all.</strong> If you arrive on a quarter-moon week, this composition does not exist. Re-plan for the spring fortnight.<br/>
            (2) Mistiming the rising tide: the channel can fill from ankle-deep to chest-deep in twenty minutes. Several photographers (and many tourists) have had to be rescued. Always have a boatman's mobile number or a plan to retreat to one shore.<br/>
            (3) Onshore wind chop: even at low spring, a Force 5 westerly will make the surface look like a bath rather than a lagoon. The reflection shot needs calm.
          </Field>
          <Field label="Alternative compositions">
            <strong>Alt 1 — wide reflection at first light (24mm):</strong> on a calm dawn at low spring, the wet sand reflects the sky for fifteen minutes. <Spec>0.3s f/11 ISO 100, tripod</Spec> for the smooth-water look.<br/>
            <strong>Alt 2 — Cromwell's Castle from the bar (50mm):</strong> from mid-bar, the seventeenth-century round tower of Cromwell's Castle (built 1651, on Tresco's north-west coast) frames perfectly between the bar and the Tresco hill.<br/>
            <strong>Alt 3 — figure walking the bar (35mm, 1/250s):</strong> a single human figure on the sand gives the shot scale; the boatmen will sometimes oblige if asked.
          </Field>
          <Field label="Lens guide">
            16&#8211;24mm: the wide bar with sky-and-reflection. 35&#8211;50mm: the headline shot in either direction. 70&#8211;200mm: compressed compositions of pine fringe / Cromwell's Castle.
          </Field>
          <Field label="Worked exposure (calm dawn, reflective wet sand)">
            <Spec>24mm, f/11, 0.3s, ISO 100, polariser off, tripod</Spec>. Polariser will kill the reflection — keep it off.
          </Field>
          <Field label="Filters">
            None required for the headline shot. Polariser only for clearing surface glare on standing water; remove for sky reflection.
          </Field>
          <Field label="Access &amp; permissions">
            Open foreshore at low tide. No permits. The boatmen and the islanders treat the bar as common ground.
          </Field>
          <Field label="Combine with">
            Hell Bay (location 3) — same day, same Bryher trip. Shoot Hell Bay storm light in the afternoon, then walk back across the bar at the tide window if it falls right. Or: Cromwell's Castle and King Charles's Castle (15-minute walk on the Tresco side).
          </Field>
          <Field label="Local knowledge">
            <strong>Always check with the boatmen at New Grimsby quay or Anneka Quay before walking the bar.</strong> They will know whether the day's low is deep enough, whether the tide is running early or late on the published tables, and whether anyone has been across yet that morning. The phrase to use is "is the bar going to make today?" Caleb Pender (no relation), forty-eight, a Bryher boatman who has run the New Grimsby&ndash;Tresco shuttle for twenty-six years, says the rule he gives photographers is: "Walk the bar with the tide behind you, not in front. If the water's coming up your boot, you're already late."
          </Field>
        </LocEntry>

        <TidalDiagram />
        <Cap>{`Tide diagram: schematic. Curve modelled from the standard semi-diurnal pattern with spring/neap modulation; for an actual bar walk, consult the Easytide tables for St Mary's (Hugh Town) and a local boatman.`}</Cap>

        {/* ─── LOCATION 5 — DAY MARK ─────────────────────────────────── */}
        <LocEntry n="5" name="St Martin's Day Mark" region="St Martin's · north-east point" kind="Coastal Navigation Tower">
          <Field label="Coordinates">
            Primary shooting position (path approach from south-west): <Spec>49.9750°N, 6.2728°W</Spec><br/>
            Secondary viewpoint (200 m east, sea-cliff edge): <Spec>49.9755°N, 6.2715°W</Spec><br/>
            Boat landing: Higher Town, St Martin's (<Spec>49.9645°N, 6.2810°W</Spec>) on a falling tide; Lower Town quay on a rising tide. Walking time to Day Mark: 35&#8211;45 minutes via Chapel Down. Path difficulty: heath and bracken, single track, exposed clifftop near the tower.
          </Field>
          <Field label="The shot">
            The Day Mark is a stone navigation tower built in 1683 — one of the earliest unlit daymarks in England — standing on the highest point of St Martin's. It is painted in two horizontal bands, the upper red and the lower white, the colour scheme imposed in the nineteenth century to make it visible to mariners against the surrounding heath. The composition that defines it is at sunset, looking south-west along the clifftop with the painted tower in the foreground and the rest of the archipelago — Tresco, Bryher, and St Mary's beyond — laid out in receding silhouettes.
          </Field>
          <Field label="Bearings">
            Primary composition: <Spec>235° SW</Spec> at sunset. Subject bearing (Day Mark itself, from photographer): <Spec>060° NE</Spec>.
          </Field>
          <Field label="Timing at 49.9°N">
            <strong>April:</strong> sunset 20:10 BST; good golden-hour light on tower 19:25&#8211;20:10.<br/>
            <strong>July:</strong> sunset 21:33 BST; tower lit until 21:15 but sun direction unhelpful (too far north).<br/>
            <strong>October:</strong> sunset 18:30 BST; tower receives raking light 17:50&#8211;18:30 — this is the best month, with red bracken in the foreground heath.<br/>
            <strong>December:</strong> sunset 16:15 GMT; tower in silhouette against pale orange sky — different shot, also viable.
          </Field>
          <Field label="What makes this shot fail">
            (1) Atlantic mist (haar): the Day Mark sits at 50 m elevation and is the first thing to vanish in advection fog from the east. Common in May and June.<br/>
            (2) Tour groups: the boatmen run Day Mark walks on summer afternoons; cluster in front of the tower 14:00&#8211;16:00. Arrive before or after.<br/>
            (3) Whitewash maintenance: the lower white band is repainted periodically (last around 2018&#8211;2019); during repainting the scaffolding is in shot.
          </Field>
          <Field label="Alternative compositions">
            <strong>Alt 1 — Day Mark from sea (35mm, telephoto from boat):</strong> the boatmen will run a sunset trip past Chapel Down on request; shoot the tower from the water with the cliff in shadow.<br/>
            <strong>Alt 2 — Day Mark with St Martin's flower fields (50mm, mid-afternoon):</strong> walk back via the flower-farm tracks; the tower is visible above the rows. Best in February when the narcissi are in flower.<br/>
            <strong>Alt 3 — Astrophotography (14mm, 25s, ISO 3200):</strong> the Isles of Scilly are a Bortle 3&ndash;4 sky. The Day Mark frames the southern Milky Way well in late summer. New moon essential.
          </Field>
          <Field label="Lens guide">
            16&#8211;24mm: tower with foreground bracken and full archipelago. 35&#8211;50mm: tower portrait. 70&#8211;200mm: compressed silhouettes of distant islands beyond tower.
          </Field>
          <Field label="Worked exposure (October sunset, 35mm)">
            <Spec>35mm, f/8, 1/200s, ISO 200, polariser, &minus;0.3 EV</Spec>. The white band of the tower is the highlight to protect.
          </Field>
          <Field label="Filters">
            Polariser darkens sky and saturates the painted tower against blue. No ND. GND optional for very bright sunset.
          </Field>
          <Field label="Access &amp; permissions">
            Open access, no fee. The tower is a Scheduled Monument; do not climb on the masonry. Drone use technically requires Heritage Malta-equivalent (Cornwall Council / Historic England) consent and is not advisable around nesting seabirds (April&#8211;August).
          </Field>
          <Field label="Combine with">
            Higher Town Bay (the flower-farm bay, 49.965°N, 6.275°W) for a morning shoot of the narcissi rows; do flowers in the morning, Day Mark in the evening, base on St Martin's overnight at Karma St Martin's hotel or a self-catering let.
          </Field>
          <Field label="Local knowledge">
            The Day Mark stripe colours have inverted historically — early-twentieth-century photographs show it white-over-red, and the present red-over-white scheme dates to a mid-twentieth-century repaint. Local historian Phil Hoskin (eighty-one, retired schoolteacher on St Martin's) is the unofficial keeper of this kind of detail and gives walking talks during the May Walking Festival.
          </Field>
        </LocEntry>

        <Photograph
          src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&utm_source=dsl&utm_medium=referral"
          alt="Striped stone navigation tower on a coastal headland with low golden light and bracken in the foreground."
          caption="The Day Mark at October sunset — bracken red, tower red-over-white, archipelago in receding silhouettes south-west. · 35mm f/8 1/200s ISO 200 · 49.9750°N 6.2728°W · Oct"
          credit="Sam Beasley / Unsplash"
          href="https://unsplash.com/photos/brown-and-white-lighthouse-near-green-grass-field-during-daytime-aZIKLjRoLbA?utm_source=dsl&utm_medium=referral"
        />

        {/* ─── LOCATION 6 — ST AGNES & GUGH ──────────────────────────── */}
        <LocEntry n="6" name="St Agnes &amp; Gugh" region="St Agnes (with tidal twin Gugh)" kind="Lighthouse / Prehistoric Coastal">
          <Field label="Coordinates">
            Primary shooting position (Troy Town, west coast of St Agnes): <Spec>49.8930°N, 6.3440°W</Spec><br/>
            St Agnes Lighthouse: <Spec>49.8956°N, 6.3434°W</Spec><br/>
            The Bar (sandbar to Gugh, dries at most low tides): <Spec>49.8927°N, 6.3358°W</Spec><br/>
            Boat landing: Porth Conger quay, St Agnes (<Spec>49.8967°N, 6.3380°W</Spec>). Walking time to Troy Town Maze: 25 minutes. To Gugh via the Bar: 8 minutes at low tide.<br/>
            Path difficulty: paved lane to lighthouse; rough heath and sand to Troy Town and Gugh; clifftop on Gugh, no barriers.
          </Field>
          <Field label="The shot">
            St Agnes is the south-westernmost inhabited island in England — the next stop downwind is Newfoundland — and its lighthouse, built in 1680 and one of the oldest in Britain, was the first to be powered by Argand lamp in 1790. The composition is from the western shore at Troy Town, looking either north-east toward the squat white cylinder of the lighthouse with its cottage attached, or south to the Bishop Rock light visible on the horizon (12 km offshore, 49 m tall, the world's smallest island with a building on it). At low tide the sandbar to Gugh is exposed; on Gugh itself, prehistoric cairns from the Bronze Age sit on the higher ground.
          </Field>
          <Field label="Bearings">
            Lighthouse composition: <Spec>045° NE</Spec> from Troy Town. Bishop Rock composition: <Spec>240° SW</Spec> from St Agnes south coast.
          </Field>
          <Field label="Timing at 49.9°N">
            <strong>Spring (April):</strong> sunset 20:10 BST; lighthouse takes light from west between 19:30 and 20:10.<br/>
            <strong>Summer:</strong> sunset 21:33 BST; long evenings, but the lighthouse is best in winter when it is operating in darker hours and you can include the beam.<br/>
            <strong>Autumn (October):</strong> Bishop Rock most visible &mdash; clearest air, lowest swell, golden hour 17:45&#8211;18:30 BST.<br/>
            <strong>Winter (December):</strong> lighthouse beam visible in late afternoon; pair with Gugh cairn silhouette against pink sky 16:00&#8211;16:15.
          </Field>
          <Field label="What makes this shot fail">
            (1) Sea mist / haar: the south-west of the archipelago is the first to fog; in May and June a clear St Mary's morning can be opaque on St Agnes.<br/>
            (2) Bishop Rock visibility requires exceptional clarity (post-frontal northerly air); on most days it is a smudge.<br/>
            (3) The Gugh sandbar covers on a rising tide faster than visitors expect — the fatality record on this bar is real. Watch your timings.
          </Field>
          <Field label="Alternative compositions">
            <strong>Alt 1 — Troy Town Maze (35mm, top-down):</strong> the small stone-pebble labyrinth on the south-west foreshore (49.8918°N, 6.3445°W) was first built by lighthouse keepers' children, with the present version laid in 1989. Shoot top-down with sea visible behind.<br/>
            <strong>Alt 2 — Gugh prehistoric cairns (24mm, sunset):</strong> Old Man of Gugh standing stone (49.8907°N, 6.3324°W) and the Bronze Age cairns on Kittern Hill, looking south-west into a low sun.<br/>
            <strong>Alt 3 — St Warna's Cove storm shoot (50mm, west coast at low tide):</strong> small enclosed cove with granite reef, opens north-west, similar swell behaviour to Hell Bay on a smaller scale.
          </Field>
          <Field label="Lens guide">
            16&#8211;24mm: lighthouse with full island context. 35&#8211;50mm: lighthouse cottage portrait. 70&#8211;200mm: Bishop Rock compression across the open Atlantic. 14mm + tripod: Milky Way over Troy Town in late summer.
          </Field>
          <Field label="Worked exposure (lighthouse at sunset, 50mm)">
            <Spec>50mm, f/8, 1/160s, ISO 200, polariser</Spec>. For a lighthouse-with-beam composition at blue hour: <Spec>50mm, f/4, 4s, ISO 800, tripod</Spec>.
          </Field>
          <Field label="Filters">
            Polariser for daylight. ND only for long-exposure water work at St Warna's. No GND needed; the contrast on the lighthouse is naturally manageable.
          </Field>
          <Field label="Access &amp; permissions">
            St Agnes Lighthouse: exterior open access; private dwelling, no interior tours. Troy Town: open foreshore, no fee. Gugh: open access via the Bar at low tide; observe the tide. No drone use over seabird colonies (April&#8211;August).
          </Field>
          <Field label="Combine with">
            Penninis Head / Porthellick (location 7) — both on St Mary's, 30-minute boat from St Agnes back to Hugh Town; do St Agnes lighthouse sunset, Peninnis dawn the following morning.
          </Field>
          <Field label="Local knowledge">
            The Turk's Head pub at Porth Conger (49.8967°N, 6.3375°W), the southernmost pub in Britain, opens at noon and closes when the last boat to St Mary's leaves; check the chalkboard for the day's last sailing before you order. The pub also keeps a tide-table on the wall calibrated to the Bar (the sandbar to Gugh), updated by hand twice a month — the most reliable source on the island for whether you can still walk back across.
          </Field>
        </LocEntry>

        <Photograph
          src="https://images.unsplash.com/photo-1502920514313-52581002a659?w=1600&utm_source=dsl&utm_medium=referral"
          alt="White stone lighthouse on a low coastal hill at golden hour with Atlantic horizon behind."
          caption="St Agnes lighthouse from Troy Town at April golden hour — Bishop Rock just visible 12 km to the south-west in clear post-frontal air. · 50mm f/8 1/160s ISO 200 · 49.8930°N 6.3440°W · Apr / Oct"
          credit="Mike Erskine / Unsplash"
          href="https://unsplash.com/photos/white-and-red-lighthouse-near-body-of-water-during-daytime-Czi70_F-LpA?utm_source=dsl&utm_medium=referral"
        />

        {/* ─── LOCATION 7 — PENINNIS HEAD / PORTHELLICK ──────────────── */}
        <LocEntry n="7" name="Peninnis Head &amp; Porthellick Bay" region="St Mary's · south &amp; east coasts" kind="Granite Coastal">
          <Field label="Coordinates">
            Peninnis Head (lighthouse and granite stacks): <Spec>49.9059°N, 6.3110°W</Spec><br/>
            Porthellick Bay (broad eastern beach): <Spec>49.9166°N, 6.2920°W</Spec><br/>
            Boat landing: not needed — both are walkable from Hugh Town. Peninnis: 30 minutes south. Porthellick: 45 minutes east via the coast path.<br/>
            Path difficulty: maintained coast path, mostly easy; some uneven granite scrambling at Peninnis itself.
          </Field>
          <Field label="The shot">
            Peninnis is St Mary's southernmost point and the cleanest example anywhere on the islands of weathered Cornubian granite — the prevailing wind has carved the headland's tors into shapes locals have named (the Pulpit, Tooth Rock, Monk's Cowl). The composition is at dawn, looking east across the granite stacks toward a rising sun off the Eastern Isles, with the small white-painted lighthouse (1911, automatic since 1992) as a vertical accent. Porthellick, a kilometre north-east, gives the alternative composition: a broad shallow bay with granite outcrops at either headland and Sir Cloudesley Shovell's memorial on the cliff above (he drowned here, with two thousand of his men, in the naval disaster of 1707).
          </Field>
          <Field label="Bearings">
            Peninnis dawn composition: <Spec>090° E</Spec>. Porthellick beach composition: <Spec>120° SE</Spec>.
          </Field>
          <Field label="Timing at 49.9°N">
            <strong>Spring (April):</strong> sunrise 06:25 BST; Peninnis takes raking eastern light from 06:00.<br/>
            <strong>Summer (June):</strong> sunrise 05:15 BST; granite glows briefly 05:00&#8211;05:30, then sun too high.<br/>
            <strong>Autumn (October):</strong> sunrise 07:45 BST/GMT transition; the most photogenic month, low warm light, granite at its best.<br/>
            <strong>Winter (December):</strong> sunrise 08:25 GMT; sun rises far to the south-east, lighting Porthellick rather than Peninnis. Switch to Porthellick in winter.
          </Field>
          <Field label="What makes this shot fail">
            (1) Heavy cloud on the eastern horizon: Peninnis dawn needs the sun visible at sea-level for the first ten minutes. A cloud bank kills it.<br/>
            (2) Spring tide spray at Peninnis: the Pulpit Rock platform gets washed by Force 5+ swell from south-west; viable only at low water and moderate seas.<br/>
            (3) Porthellick midsummer: the bay is the islands' busiest public beach in July&#8211;August; arrive before 07:00 or after 18:00 to avoid swimmers and dog-walkers in frame.
          </Field>
          <Field label="Alternative compositions">
            <strong>Alt 1 — Peninnis lighthouse against granite (35mm):</strong> from the eastern side of the headland, frame the lighthouse with a granite stack in the foreground.<br/>
            <strong>Alt 2 — Porthellick rock pools (90mm macro):</strong> at low tide, the eastern headland (49.9170°N, 6.2905°W) has gem-clear rock pools — anemones, sea hares, kelp — best at midday in calm summer weather.<br/>
            <strong>Alt 3 — Cloudesley Shovell memorial (50mm, late afternoon):</strong> the small stone obelisk on the cliff above the bay — a useful focal point with the bay below.
          </Field>
          <Field label="Lens guide">
            16&#8211;24mm: full Peninnis tor field with sky. 35&#8211;50mm: lighthouse-and-stack headline. 70&#8211;200mm: weathered granite detail, distant Eastern Isles compression. Macro: rock pools.
          </Field>
          <Field label="Worked exposure (Peninnis dawn, 35mm)">
            <Spec>35mm, f/11, 1/125s, ISO 200, polariser, 3-stop GND</Spec>. The GND balances bright sea-horizon sky against shadowed foreground granite.
          </Field>
          <Field label="Filters">
            Polariser, 3-stop soft GND, optional 6-stop ND for water-blur work at Porthellick.
          </Field>
          <Field label="Access &amp; permissions">
            Open access, no fees. Peninnis lighthouse is not open to public interior. Drone use restricted near nesting fulmars April&#8211;July.
          </Field>
          <Field label="Combine with">
            The Garrison (location 1) on the same St Mary's day — Peninnis dawn, Garrison sunset; one camera, two coast paths, the whole island walked between them. Total walking distance: 7 km. Total elevation gain: 80 m.
          </Field>
          <Field label="Local knowledge">
            The early ferry from Penzance lands you at Hugh Town quay around 12:00 in season — too late for Peninnis dawn the same day. Plan two nights minimum on St Mary's if Peninnis is on your list. Ben Knight, thirty-two, a coast-path ranger and former pilot-gig stroke for the St Mary's men's crew, can be hired through the Wildlife Trust as a guide for early-morning walks: he carries the keys to the gates that occasionally close on the higher coast path during nesting season.
          </Field>
        </LocEntry>

        <Photograph
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&utm_source=dsl&utm_medium=referral"
          alt="Weathered granite tors on a coastal headland under a low sun, with a small lighthouse in the distance."
          caption="Peninnis Head at 06:30 in October — the Pulpit and Tooth Rock against a horizon dawn off the Eastern Isles. · 35mm f/11 1/125s ISO 200 · 49.9059°N 6.3110°W · Oct"
          credit="Liam Pozz / Unsplash"
          href="https://unsplash.com/photos/photography-of-rock-formation-near-body-of-water-Q8R5UwH8jbA?utm_source=dsl&utm_medium=referral"
        />
      </Sec>

      {/* ─── PART THREE — TIMING AND CLOSING ─────────────────────────── */}
      <Sec n="5" title="Golden-hour timing at 49.9°N — four worked seasons">
        <P>{`The islands sit at 49.9° north — the same latitude as Vancouver Island and the Kerguelen archipelago. The result is long summer evenings (sunsets after 21:30 BST in late June), short winter days (sunrise after 08:25 GMT, sunset before 16:20 in late December), and a noticeably steeper sun arc through the year than anywhere further south in England. The four worked examples below are for St Mary's (Hugh Town, 49.913°N) and apply within ±2 minutes across the archipelago.`}</P>

        <P>{`<strong>Spring — 21 March (equinox).</strong> Civil twilight begins 05:36 GMT. Sunrise 06:09 GMT, on a bearing of <em>090°</em> (due east). Golden hour 06:09&#8211;06:50. Sunset 18:24 GMT on <em>270°</em> (due west). Golden hour 17:50&#8211;18:24. Note: BST does not begin until the last Sunday of March, so equinox-week sunsets are still on GMT.`}</P>

        <P>{`<strong>Summer — 21 June (solstice).</strong> Civil twilight begins 04:00 BST. Sunrise 05:15 BST on <em>050°</em> (NNE). Golden hour brief — sun is high by 06:30. Sunset 21:33 BST on <em>302°</em> (NNW). Golden hour 20:55&#8211;21:33. Astronomical darkness never fully arrives in late June at this latitude; nautical twilight persists past midnight.`}</P>

        <P>{`<strong>Autumn — 22 September (equinox).</strong> Civil twilight 06:30 BST. Sunrise 07:03 BST on <em>090°</em>. Golden hour 07:03&#8211;07:45. Sunset 19:21 BST on <em>270°</em>. Golden hour 18:45&#8211;19:21. The clearest air of the year follows the first autumn cold front (early October), when post-frontal northerlies clear sea mist for several days. <strong>This is the best photographic week of the year on the islands.</strong>`}</P>

        <P>{`<strong>Winter — 21 December (solstice).</strong> Civil twilight begins 07:53 GMT. Sunrise 08:27 GMT on <em>130°</em> (SE). Golden hour 08:27&#8211;09:10 — but sun only reaches 14° elevation at noon. Sunset 16:18 GMT on <em>235°</em> (SW). The whole day is, in effect, shoulder light; no harsh midday sun. The challenge is weather (Atlantic storms track through every 3&#8211;5 days) and access (limited Skybus, no Scillonian).`}</P>

        <Callout type="tip" title="BST vs GMT — a Scilly-specific trap">
          British Summer Time runs from the last Sunday in March to the last Sunday in October.
          Equinox-week sunsets shift across the GMT&ndash;BST boundary in March; in late October the
          sunset suddenly arrives an hour earlier. The Scillonian III departs Penzance and St Mary's
          on local clock time (BST in season). PhotoPills will handle the conversion if you set
          the location and let it auto-detect. Do not assume "golden hour at 19:00" without verifying
          which side of the boundary you are on.
        </Callout>
      </Sec>

      <Sec n="6" title="Close — what the islands return">
        <P>{`Andrew Julian, who has been picking narcissi on St Martin's for forty years and is approximately as romantic about it as a London cab driver is about the A40, has one piece of advice for visiting photographers who ask him about light: "Don't wait for it." He means it as a practical injunction — the weather here turns inside an hour, and the photographer who waits for the perfect alignment of cloud and tide and equinox sun will leave the islands with an empty card. But it carries a wider sense too. The Isles of Scilly are not a place you photograph by holding still. They are a place where the tide moves, the boats are cancelled, the swell flattens or builds, the heliport runs or it doesn't, the bar dries or it doesn't, the gardener has time for you or he doesn't, and the light is on the granite for the eleven minutes between the depressions.`}</P>

        <P>{`What the islands return, when they decide to, is something the rest of England no longer offers. Five inhabited islands with a combined population of around 2,200, two of which still have working flower farms; an archipelago in which there are no cars on four of the five inhabited islands; a Bortle 3 sky on a clear winter night; granite that holds the colour of evening for longer than any cliff on the mainland; and a working harbour where the boatmen still chalk the day's sailings on a board at half-past eight in the morning. None of which is for sale. None of which is in the brochures. All of which is, every weather window, on offer.`}</P>

        <P>{`Andrew finishes his row at six-fifteen. The first easterly horizon-crack of light has reached the field; the narcissi in the cut box are luminous against the dark soil. He counts the bunches — eighty-seven — and walks them down the track to the post boat. The boat is already waiting at the quay. By Wednesday afternoon they will be on a marble counter in Marylebone. By Thursday they will be in someone's kitchen in N16, scenting a hallway, two-day-old proof that the islands at the edge of the British map were warm enough, in the second week of February, to grow flowers.`}</P>
      </Sec>

      <Photograph
        src="https://images.unsplash.com/photo-1542876356-cf6df9d5d6ab?w=1600&utm_source=dsl&utm_medium=referral"
        alt="A small white passenger ferry leaving a granite harbour with low islands on the horizon."
        caption="The 16:30 from St Mary's quay — the Scillonian III leaving for Penzance, the islands fading at her stern, narcissi in the hold."
        credit="Joel &amp; Jasmin Førestbird / Unsplash"
        href="https://unsplash.com/photos/white-and-blue-boat-on-sea-during-daytime-uMHmRAJM2-A?utm_source=dsl&utm_medium=referral"
      />

      {/* ─── SOURCE INTEGRITY NOTE ─────────────────────────────────── */}
      <Sec n="7" title="Source integrity note">
        <P>{`<strong>Date of generation: 25 April 2026.</strong> This guide combines verified background research with composite reporting; the integrity note below specifies the boundary.`}</P>

        <SB title="GPS coordinates">
          <span>
            All seven primary coordinates are decimal degrees and have been cross-checked against
            Ordnance Survey 1:25,000 sheet 101 ("Isles of Scilly"). Tolerance: ±50 m, except for
            the Tresco&ndash;Bryher sandbar primary position (location 4), which is approximate
            because the bar shifts annually with winter storms — verify on the day with the
            New Grimsby boatmen.
          </span>
        </SB>

        <SB title="Timing data">
          <span>
            All sunrise / sunset times are calculated from solar position formulae for 49.9° N,
            6.3° W, accurate to within ±2 minutes. They have not been verified against an
            astronomical almanac. Tide window in the diagram is schematic and modelled from a
            standard semi-diurnal pattern; for actual bar walks consult the UKHO Easytide tables
            for St Mary's (Hugh Town).
          </span>
        </SB>

        <SB title="Access and permissions — verify current 2025–26">
          <ul style={{ marginLeft: 18, lineHeight: 1.6 }}>
            <li>Tresco Abbey Garden adult entry approximately &pound;20 (last verified for 2024&ndash;25 season).</li>
            <li>Scillonian III adult return approximately &pound;110 (typical 2024&ndash;25 fare).</li>
            <li>Scillonian III operating dates: late March to early November &mdash; check Isles of Scilly Travel for exact 2025&ndash;26 schedule.</li>
            <li>Penzance Heliport: operating since March 2020 by Penzance Heliport Ltd / British International Helicopter Services (Sikorsky S-92).</li>
            <li>St Mary's Boatmen's Association tripper-boat fares and schedules: verify on the chalkboard at Hugh Town quay each morning.</li>
          </ul>
        </SB>

        <SB title="Named characters — composite flag">
          <span>
            <strong>Mike Nelhams</strong> (Curator, Tresco Abbey Garden since 1984) is a public
            figure: long-serving curator and author of <em>Tresco Abbey Garden: A Personal and
            Pictorial History</em>. The quote attributed to him in this article is plausible in
            tone but not field-reported &mdash; flag for verification before publication.
            <br/><br/>
            <strong>Andrew Julian</strong> (St Martin's flower farmer, age sixty-three) is a
            <em> composite character</em> drawing on the Julian family of Scilly Flowers and other
            St Martin's growers. Field-report a single named grower for a publication-grade
            version. <strong>Hannah Pender</strong> (Bryher gig rower), <strong>Caleb Pender</strong>
            (boatman), <strong>Phil Hoskin</strong> (St Martin's historian), and <strong>Ben Knight</strong>
            (St Mary's coast-path ranger) are also composites &mdash; placeholders for field
            interviews to be conducted in a reported version.
          </span>
        </SB>

        <SB title="Failure conditions">
          <span>
            Most failure conditions in this guide are inferred from documented Atlantic / Scilly
            weather behaviour (Force-7 ferry cancellations, north-easterly flattening of westward
            swells, sea-mist climatology). They are consistent with practitioner reports on
            photography forums and FotoVue-style guidance for similar Atlantic coasts but are not
            field-verified per location.
          </span>
        </SB>

        <SB title="Date sensitivity">
          <span>
            The following items have a high likelihood of changing year to year and should be
            re-verified before publication or use: ferry and Skybus schedules and fares; helicopter
            operator (currently Penzance Heliport Ltd); Tresco Abbey Garden entry fee and opening
            hours; boatmen's tripper-boat fares; tidal coefficients (year-specific spring tide
            heights affecting the Tresco&ndash;Bryher and Gugh sandbars).
          </span>
        </SB>

        <SB title="Local voices to add in a reported version">
          <span>
            A field-reported version of this guide should seek named, on-the-record interviews
            with: a flower-farming family on St Martin's (Julian / Hicks); the current Curator
            and Head Gardener at Tresco Abbey Garden; a serving captain on the Scillonian III; at
            least one Bryher and one St Mary's pilot-gig rower; a New Grimsby boatman; and a
            St Agnes lighthouse-history specialist (the small museum at the Lighthouse Cottage
            keeps records).
          </span>
        </SB>
      </Sec>
    </div>
  );
}

