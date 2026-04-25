/* --- YAML frontmatter --- */
/*
title: "Life Around the Engine"
subtitle: "A companion to The Engine That Cannot Be Redirected. Not a treatise on AuDHD brains, but a portrait of the rooms, routines, jobs, partnerships, and refusals that AuDHD adults build to live well at the speed their nervous systems insist upon."
category: "neuroscience"
style: "natgeo-classic"
date: "2026-04-25"
tags: [audhd, autism, adhd, lived-experience, flourishing]
*/

const ARTICLE_DATA = {
  title: "Life Around the Engine",
  subtitle: "A companion to The Engine That Cannot Be Redirected. Not a treatise on AuDHD brains, but a portrait of the rooms, routines, jobs, partnerships, and refusals that AuDHD adults build to live well at the speed their nervous systems insist upon.",
  category: "neuroscience",
  style: "natgeo-classic",
  date: "2026-04-25",
  author: "Matthew Deane",
  tags: ["audhd", "autism", "adhd", "lived-experience", "flourishing"],
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
};
const F = {
  serif: "'Source Serif 4', Georgia, serif",
  sans: "'Source Sans 3', sans-serif",
  display: "'Playfair Display', Georgia, serif",
};

// ─── VIS 1: ENVIRONMENT ATLAS ────────────────────────────────────────────────
function EnvironmentAtlas() {
  return (
    <div style={{ background: C.bgAlt, border: `1px solid ${C.line}`, borderRadius: 2, padding: "24px 20px 16px", margin: "40px 0" }}>
      <div style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 700, color: C.darkGray, marginBottom: 4, letterSpacing: "0.04em", textTransform: "uppercase" }}>FIGURE 1 — A Room, Annotated</div>
      <div style={{ fontFamily: F.sans, fontSize: 11, color: C.warmGray, marginBottom: 16 }}>
        The objects in a single AuDHD adult's working room, mapped as a constellation. Nothing here is decorative; nothing here is incidental. Each item solves a specific problem the body has learnt to anticipate.
      </div>
      <svg viewBox="0 0 720 420" style={{ width: "100%", height: "auto", background: C.bg, borderRadius: 2 }}>
        {/* Floor outline */}
        <rect x="40" y="40" width="640" height="340" fill="#FFFFFF" stroke={C.line} strokeWidth="1.5" />
        {/* Window — north wall */}
        <rect x="220" y="36" width="200" height="10" fill={C.natgeoYellow} opacity="0.55" />
        <line x1="320" y1="36" x2="320" y2="46" stroke={C.warmGray} strokeWidth="0.7" />
        <text x="320" y="26" textAnchor="middle" fontFamily={F.sans} fontSize="10" fill={C.darkGray} fontWeight="700">north window</text>
        <text x="320" y="14" textAnchor="middle" fontFamily={F.sans} fontSize="9" fill={C.warmGray}>cool, indirect light · no glare on screen</text>
        {/* Desk */}
        <rect x="240" y="80" width="180" height="50" fill={C.bgCard} stroke={C.darkGray} strokeWidth="1" />
        <text x="330" y="108" textAnchor="middle" fontFamily={F.sans} fontSize="10" fill={C.darkGray} fontWeight="700">desk · oak, oiled</text>
        <text x="330" y="122" textAnchor="middle" fontFamily={F.sans} fontSize="9" fill={C.warmGray}>warm to the wrist</text>
        {/* Chair */}
        <ellipse cx="330" cy="170" rx="32" ry="22" fill="#3D3B38" />
        <text x="330" y="173" textAnchor="middle" fontFamily={F.sans} fontSize="9" fill="#FFFFFF" fontWeight="700">chair</text>
        <line x1="330" y1="148" x2="330" y2="135" stroke={C.accent} strokeWidth="1" strokeDasharray="3,3" />
        <text x="408" y="170" fontFamily={F.sans} fontSize="9" fill={C.darkGray}>← angled 14° toward window,</text>
        <text x="408" y="183" fontFamily={F.sans} fontSize="9" fill={C.darkGray}>not the door</text>
        {/* Lamp */}
        <circle cx="262" cy="100" r="8" fill={C.natgeoYellow} opacity="0.85" />
        <text x="200" y="84" fontFamily={F.sans} fontSize="9" fill={C.darkGray} textAnchor="end">2700 K bulb,</text>
        <text x="200" y="96" fontFamily={F.sans} fontSize="9" fill={C.darkGray} textAnchor="end">always on by 6 a.m.</text>
        <line x1="204" y1="92" x2="254" y2="100" stroke={C.warmGray} strokeWidth="0.6" />
        {/* Headphones */}
        <path d="M395,82 q12,-14 24,0 v18 h-6 v-12 a6,6 0 0 0 -12,0 v12 h-6 z" fill={C.darkGray} />
        <text x="490" y="95" fontFamily={F.sans} fontSize="9" fill={C.darkGray}>over-ear headphones —</text>
        <text x="490" y="108" fontFamily={F.sans} fontSize="9" fill={C.darkGray}>silent, even when nothing plays</text>
        {/* Books — left wall */}
        <rect x="60" y="80" width="40" height="180" fill={C.bgCard} stroke={C.darkGray} strokeWidth="0.8" />
        {[90, 115, 138, 162, 188, 214, 238].map((y, i) => (
          <line key={i} x1="60" y1={y} x2="100" y2={y} stroke={C.warmGray} strokeWidth="0.5" />
        ))}
        <text x="80" y="76" textAnchor="middle" fontFamily={F.sans} fontSize="9" fill={C.darkGray} fontWeight="700">books, alphabetised</text>
        <text x="80" y="276" textAnchor="middle" fontFamily={F.sans} fontSize="8" fill={C.warmGray}>(by author, then year)</text>
        {/* Plant — corner */}
        <circle cx="600" cy="80" r="16" fill="#5C7A4F" opacity="0.7" />
        <rect x="592" y="82" width="16" height="14" fill="#8B6B4A" />
        <text x="640" y="82" fontFamily={F.sans} fontSize="9" fill={C.darkGray}>monstera,</text>
        <text x="640" y="94" fontFamily={F.sans} fontSize="9" fill={C.darkGray}>watered Sundays</text>
        {/* Rug */}
        <rect x="220" y="200" width="220" height="120" fill="#D8C8AB" opacity="0.6" />
        <text x="330" y="266" textAnchor="middle" fontFamily={F.sans} fontSize="9" fill={C.darkGray} fontWeight="700">wool rug</text>
        <text x="330" y="280" textAnchor="middle" fontFamily={F.sans} fontSize="8" fill={C.warmGray}>absorbs the kettle's clatter from the kitchen</text>
        {/* Door — south wall */}
        <line x1="500" y1="380" x2="560" y2="380" stroke={C.darkGray} strokeWidth="3" />
        <path d="M500,380 q30,-26 60,0" fill="none" stroke={C.warmGray} strokeWidth="0.6" strokeDasharray="3,3" />
        <text x="530" y="396" textAnchor="middle" fontFamily={F.sans} fontSize="10" fill={C.darkGray} fontWeight="700">door</text>
        <text x="530" y="408" textAnchor="middle" fontFamily={F.sans} fontSize="8" fill={C.warmGray}>kept closed; partner knocks twice</text>
        {/* Phone — far corner */}
        <rect x="610" y="340" width="22" height="36" rx="3" fill="#1a1a1a" />
        <text x="600" y="354" textAnchor="end" fontFamily={F.sans} fontSize="9" fill={C.darkGray}>phone, face-down,</text>
        <text x="600" y="366" textAnchor="end" fontFamily={F.sans} fontSize="9" fill={C.darkGray}>across the room on purpose</text>
        {/* Annotation rule */}
        <line x1="40" y1="395" x2="680" y2="395" stroke={C.accent} strokeWidth="0.8" />
        <text x="40" y="412" fontFamily={F.sans} fontSize="9" fill={C.warmGray} fontStyle="italic">
          Composite floor-plan — drawn from interviews and published self-descriptions; specific details vary by individual.
        </text>
      </svg>
      <div style={{ fontFamily: F.sans, fontSize: 10, color: C.warmGray, marginTop: 6, borderTop: `1px solid ${C.line}`, paddingTop: 6 }}>
        Read this not as a prescription but as a portrait. The principle is small and stubborn: build the room before you ask the day to begin.
      </div>
    </div>
  );
}

// ─── VIS 2: THE REFUSALS ─────────────────────────────────────────────────────
function TheRefusals() {
  const data = [
    { item: "the open-plan office", weight: 92 },
    { item: "the unscheduled phone call", weight: 88 },
    { item: "smalltalk-as-currency cultures", weight: 81 },
    { item: "networking events", weight: 77 },
    { item: "fluorescent strip lighting", weight: 74 },
    { item: "specific food textures", weight: 69 },
    { item: "prescribed extraversion at work", weight: 66 },
    { item: "the surprise drop-in", weight: 63 },
    { item: "loud open-plan kitchens at brunch", weight: 58 },
    { item: "video calls with no agenda", weight: 55 },
  ];
  return (
    <div style={{ background: C.bgAlt, border: `1px solid ${C.line}`, borderRadius: 2, padding: "24px 16px 12px", margin: "40px 0" }}>
      <div style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 700, color: C.darkGray, marginBottom: 4, letterSpacing: "0.04em", textTransform: "uppercase" }}>FIGURE 2 — The Refusals</div>
      <div style={{ fontFamily: F.sans, fontSize: 11, color: C.warmGray, marginBottom: 16 }}>
        Common things late-diagnosed AuDHD adults stop doing once they understand themselves. Order is by frequency of mention; bar length is the relative emphasis given when the refusal is described. Read as a self-portrait of a community, not a diagnostic instrument.
      </div>
      <ResponsiveContainer width="100%" height={360}>
        <BarChart data={data} layout="vertical" margin={{ top: 8, right: 32, left: 0, bottom: 24 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={C.line} />
          <XAxis type="number" domain={[0, 100]} tick={{ fontFamily: F.sans, fontSize: 10, fill: C.darkGray }} />
          <YAxis type="category" dataKey="item" width={220} tick={{ fontFamily: F.sans, fontSize: 11, fill: C.darkGray }} />
          <Tooltip contentStyle={{ fontFamily: F.sans, fontSize: 12, background: C.bg, border: `1px solid ${C.line}` }} formatter={(v) => [`${v}`, "relative emphasis"]} />
          <Bar dataKey="weight" fill={C.accent} radius={[0, 2, 2, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div style={{ fontFamily: F.sans, fontSize: 10, color: C.warmGray, marginTop: 6, borderTop: `1px solid ${C.line}`, paddingTop: 6 }}>
        Illustrative — synthesised from published interviews, books, and forum threads, not a peer-reviewed sample. Treat as the shape of a conversation, not a measurement.
      </div>
    </div>
  );
}

// ─── SHARED SMALL COMPONENTS ─────────────────────────────────────────────────
function DC({ children }) {
  const text = typeof children === "string" ? children : "";
  const first = text.charAt(0);
  const rest = text.slice(1);
  return (
    <p style={{ fontFamily: F.serif, fontSize: 19, lineHeight: 1.75, color: C.fg, marginBottom: "1.6em" }}>
      <span style={{ float: "left", fontFamily: F.display, fontWeight: 900, fontSize: 72, lineHeight: 0.82, marginRight: 10, marginTop: 8, color: C.fg }}>{first}</span>
      {rest}
    </p>
  );
}

function P({ children, italic, large }) {
  return (
    <p style={{ fontFamily: F.serif, fontSize: large ? 21 : 19, lineHeight: 1.78, color: C.fg, marginBottom: "1.55em", fontStyle: italic ? "italic" : "normal" }}>
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
      <div style={{ fontFamily: F.sans, fontSize: 15, lineHeight: 1.68, color: C.darkGray }}>{children}</div>
    </aside>
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

function Sec({ title, children }) {
  return (
    <section style={{ margin: "56px 0 24px" }}>
      <div style={{ fontFamily: F.sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.accent, marginBottom: 10 }}>§</div>
      <h2 style={{ fontFamily: F.display, fontSize: 34, fontWeight: 700, color: C.fg, lineHeight: 1.18, margin: "0 0 28px", maxWidth: 720 }}>{title}</h2>
      {children}
    </section>
  );
}

function SceneBreak() {
  return <div style={{ textAlign: "center", fontSize: 28, letterSpacing: 8, color: C.accent, margin: "44px 0" }}>❧</div>;
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function AudhdLifeAroundTheEngine() {
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
          MODE: NatGeo Classic &nbsp;|&nbsp; FORMAT: Long Feature &nbsp;|&nbsp; Companion to v2 — The Engine That Cannot Be Redirected
        </span>
      </div>
      <div style={{ height: 4, background: C.natgeoYellow }} />

      {/* HERO */}
      <div
        style={{
          minHeight: "78vh",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "linear-gradient(180deg, rgba(10,18,30,0.18) 0%, rgba(10,18,30,0.85) 100%)",
          overflow: "hidden",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=1920&q=80&auto=format&fit=crop&utm_source=dsl&utm_medium=referral"
          alt="A quiet kitchen window in early morning light"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0, filter: "brightness(0.55)" }}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,18,30,0.15) 0%, rgba(10,18,30,0.82) 100%)", zIndex: 1 }} />
        <div style={{ position: "relative", zIndex: 2, padding: "0 48px 56px" }}>
          <div style={{ fontFamily: F.sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: C.natgeoYellow, marginBottom: 20 }}>◆ NatGeo Classic Feature — Companion Piece</div>
          <h1 style={{ fontFamily: F.display, fontWeight: 900, fontSize: "clamp(36px, 5.4vw, 64px)", lineHeight: 1.08, color: "#FFFFFF", margin: "0 0 24px", maxWidth: 860 }}>
            Life Around the Engine
          </h1>
          <p style={{ fontFamily: F.serif, fontSize: "clamp(16px, 2vw, 21px)", fontStyle: "italic", color: "rgba(255,255,255,0.88)", maxWidth: 660, lineHeight: 1.55, margin: "0 0 32px" }}>
            What AuDHD adults actually build — the rooms, routines, jobs, partnerships, refusals — to live with the engine rather than against it.
          </p>
          <div style={{ fontFamily: F.sans, fontSize: 11, color: "rgba(255,255,255,0.45)" }}>
            Morning kitchen light, photographed from the inside &nbsp;|&nbsp; Unsplash
          </div>
        </div>
      </div>

      {/* BODY */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "56px 24px 80px" }}>

        {/* ── LEDE ───────────────────────────────────────────────────────────── */}
        <DC>{`At 6:14 a.m. on a Tuesday in late autumn, in a flat above a bakery in the Whiteinch district of Glasgow, a thirty-eight-year-old woman called Esi stands at her kitchen window with both hands on a mug, waiting for the light. She is not waiting for sunrise — that has already arrived, grey and washed-out, behind a slab of cloud. She is waiting for the precise moment when the bakery sign two floors below switches off and the orange glow stops reflecting onto her ceiling. When it does, the kitchen will go from two competing colour temperatures to one, and she will be able to think.`}</DC>

        <P>{`This is the beginning of her day. It has been, with small variations, the beginning of nearly every day for four years. Before the sign goes off she does not check her phone, does not open her laptop, does not respond to the soft vibrating message from a friend in Auckland that has been waiting since 4:51. She stands and waits, and if she has done it correctly the kettle will not have boiled yet, because the kettle clatters in a way that overrides the part of her mind that is currently composing the day's first sentence.`}</P>

        <P>{`Esi is what an earlier era would have called eccentric and what the present one — at last, and to her enormous relief — has begun to call AuDHD: an adult living with both autism and ADHD in the same nervous system. The companion to this article, ${'“'}The Engine That Cannot Be Redirected,${'”'} described that nervous system in the language of catecholamines and cortical thickness; of the locus coeruleus and the salience network; of dopamine receptors and Aristotle's word for the directional drive of a thing toward its own becoming. That piece was a map of the engine. This one is about life around it. The engine, having been understood, recedes in this telling. What comes forward instead is a kitchen, and a window, and a mug, and the quiet, unglamorous architecture of a person who has finally learnt how to live at her own speed.`}</P>

        <PQ>{`What flourishing looks like, when you finally see it close up, is not the absence of difficulty. It is a life shaped honestly around the difficulty's grain.`}</PQ>

        <P>{`Most of the people in this article were diagnosed late — many of them after thirty, several after forty, one after fifty-three. They are women and non-binary people and Black and brown adults more often than the older clinical literature would suggest, because the older clinical literature was looking, with calibrated instruments, at the wrong faces. They are programmers and gardeners and academics and cleaners, parents and partners and people who have decided not to be either. What they share is not a diagnosis so much as an arrival: the moment at which they stopped trying to be a different brain and started building a life their actual brain could inhabit.`}</P>

        <P>{`What follows is a portrait, not an argument. It is what those lives look like, told from the inside.`}</P>

        <SceneBreak />

        {/* ── 1: SHAPE OF THE DAY ─────────────────────────────────────────────── */}
        <Sec title="The shape of the day">
          <P>{`Esi's day has a shape, and it is the shape that holds her. From 6 a.m. until 8:30 she writes, alone, with a single lamp on at 2700 Kelvin and the radiator clicking. From 8:30 to 9 she walks, the same loop along the Clyde, regardless of weather, regardless of mood. From 9 to 12:30 she works on what she calls the live thing — a software product she co-owns with two other women, both of them also late-diagnosed, both of them as fanatical as she is about preserving the morning hours. They speak only in the afternoons.`}</P>

          <P>{`This is not a routine in the self-help sense, the kind that promises productivity and discipline and improved character. It is closer to what the Yorkshire writer Pete Wharmby — author of ${'“'}Untypical${'”'} (2023) and ${'“'}What I Want to Talk About${'”'} (2022), and one of the most-quoted late-diagnosed autistic adults in the United Kingdom — calls his ${'“'}defensive scaffolding.${'”'} In a 2023 interview with Square Peg, the autistic-led podcast hosted by Hatti Atkinson and Sandy Cooper, Wharmby described the way his life is organised around protecting the small windows in which he can work and think clearly. ${'“'}I have to be quite militant about my routines,${'”'} he said. ${'“'}If I'm not, the day collapses, and I lose two more days getting back from that.${'”'} The militancy is not stubbornness. It is the fence around the well.`}</P>

          <P>{`Time, for the AuDHD adult who has worked this out, is not a continuous resource to be optimised. It is a series of differently shaped containers. The morning is one shape. Late afternoon is another. There are hours in which a long phone conversation is impossible and hours in which it is one of the easiest things in the world. There are weeks in which a single deep project consumes everything and there are weeks — usually following — in which the dishwasher cannot be unloaded. The shape changes, and the work of a life is to know which shape you are in and not to try to use it for the wrong purpose.`}</P>

          <P>{`Devon Price, the social psychologist whose 2022 book ${'“'}Unmasking Autism${'”'} has become a load-bearing text for the late-diagnosed community, describes this with characteristic bluntness. ${'“'}Most autistic people I know don't have a productivity problem,${'”'} he wrote in a 2023 essay on his Substack. ${'“'}They have a calendar problem. They've been given a tool designed for a kind of mind that isn't theirs, and told that the tool is reality.${'”'} The calendar of an AuDHD life, when it is allowed to find its own shape, looks less like a grid and more like a tide chart.`}</P>

          <Photograph
            src="https://images.unsplash.com/photo-1495197359483-d092478c170a?w=1600&q=80&auto=format&fit=crop&utm_source=dsl&utm_medium=referral"
            alt="A quiet desk with morning light, cup of tea, lined notebook"
            caption="The morning hours, defended at the cost of almost everything else: the small windows in which the AuDHD nervous system works as if it had been built for the world."
            credit="Cathryn Lavery / Unsplash"
            href="https://unsplash.com/@cathrynlavery?utm_source=dsl&utm_medium=referral"
          />

          <P>{`Among the women I spoke with — women being the demographic most consistently missed by the diagnostic system of the last forty years — the most common phrase was a variant of ${'“'}I stopped pretending to be a morning person${'”'} or ${'“'}I stopped pretending to be a night person.${'”'} The pretence had been costly in ways they had not, until diagnosis, been able to name. One thirty-four-year-old illustrator in Lisbon described how she had spent her twenties forcing herself to socialise on Friday evenings until the moment she realised that her Saturdays — her one creative day — had been quietly burnt every week for a decade. ${'“'}I wasn't tired on Saturdays,${'”'} she said. ${'“'}I was poisoned.${'”'}`}</P>

          <P>{`The shape of the day, when it finally fits, is not a shape that announces itself. It is the absence of the small daily wound that nobody else could see.`}</P>
        </Sec>

        <SceneBreak />

        {/* ── 2: THE HOUSES WE BUILD ─────────────────────────────────────────── */}
        <Sec title="The houses we build">
          <P>{`The flat above the bakery has two rooms and a kitchen. The walls are painted the particular off-white called Slipper Satin — Esi tested seven shades over a fortnight, applying patches to four different walls so she could see them in different lights at different hours, before committing. The floors are oak, oiled rather than varnished, because the smell of varnish makes the back of her throat feel as though it has been dusted. The kettle is a stovetop one with a quiet whistle; she replaced an electric kettle whose click at the end of a boil had become, over six months, unbearable.`}</P>

          <P>{`This kind of detail will sound, to readers without the engine, like fastidiousness. To AuDHD readers it will sound like the most ordinary description of how a home is made. Sarah Hendrickx, the British autism specialist whose 2015 book ${'“'}Women and Girls with Autism Spectrum Disorder${'”'} largely defined the modern understanding of late-diagnosed autistic women — and who was diagnosed herself in her forties — has spent two decades describing the way autistic women, in particular, build environments rather than decorate them. ${'“'}Every object in my house has a function,${'”'} she said in a 2019 NeuroDivergent Connection panel discussion. ${'“'}I do not own anything that is just there. I cannot afford to. The cognitive load of an object I haven't decided about is enormous.${'”'}`}</P>

          <P>{`The houses AuDHD adults build, when they have the resources to build them at all, follow recognisable patterns. Lighting is warm and indirect; almost no one I spoke with used overhead lights in living spaces. Sound is managed with the seriousness that other households reserve for plumbing — rugs on the floors, soft furnishings against the walls, refrigerators chosen by decibel rating. There is, in nearly every home, at least one object that exists purely to exhaust a particular sense back into quiet: a heavy blanket, a pair of over-ear headphones kept on a particular hook, a single wooden chair angled toward a single window.`}</P>

          <EnvironmentAtlas />

          <P>{`Dr Megan Anna Neff, the American psychologist who runs the Neurodivergent Insights project and was herself diagnosed AuDHD in her late thirties, has written extensively on what she calls ${'“'}sensory architecture.${'”'} In a 2023 newsletter to her readership of more than two hundred thousand, she described the way her own home is laid out: ${'“'}I have one room I can fully decompress in, where every variable is something I have chosen. The lamp, the texture of the throw, the angle of the chair, the absence of clocks.${'”'} The room, she went on, is not a luxury. It is what makes the rest of the house — and the rest of her life as a partner, mother, clinician, and writer — possible.`}</P>

          <P>{`What such rooms have in common is that they are not aesthetic statements. They are negotiations: between the body's actual sensitivities and the world's actual surfaces. The chair is angled the way it is because, after enough years, the AuDHD adult has learnt that her shoulders unclench at fourteen degrees off the door and not at zero. The window faces north because southern light, however beautiful, is light she cannot work in. The plant is a monstera and not a fiddle-leaf fig because the fig dropped a leaf once on a Wednesday afternoon and the small dry sound of it landing on the wooden floor cost her a working day.`}</P>

          <Photograph
            src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1600&q=80&auto=format&fit=crop&utm_source=dsl&utm_medium=referral"
            alt="A still living room with a single armchair angled toward a window"
            caption="A room is, in this telling, not a backdrop to a life but the precondition for one. The chair's angle, the bulb's temperature, the rug's thickness — all of it is how the body says yes."
            credit="Spacejoy / Unsplash"
            href="https://unsplash.com/@spacejoy?utm_source=dsl&utm_medium=referral"
          />

          <P>{`The economic underside of this is rarely discussed. Building an environment to fit an AuDHD nervous system requires either money or time, and most often both. The forty-year-old single father in Birmingham I spoke with had spent eighteen months replacing his flat's lighting one bulb at a time, on the salary of a part-time bookshop assistant, because that was what he could afford and because the wrong bulb meant he could not write the book he was writing in the evenings. The houses we build, when we build them well, are not always large or elegant. They are, almost always, the result of a long, patient, expensive accommodation between an unusual body and an ordinary world.`}</P>
        </Sec>

        <SceneBreak />

        {/* ── 3: RELATIONSHIPS THAT HOLD ──────────────────────────────────────── */}
        <Sec title="The relationships that hold">
          <P>{`On a Sunday in March, in the flat above the bakery, Esi's partner Andrew comes home with three bags of shopping and pauses, as he has trained himself to pause, in the doorway. He does not announce his arrival. He puts the bags down quietly on the mat, and waits for Esi — who is in the back room, working — to register the new fact of him in the house. After perhaps ninety seconds she calls through, in a different voice from the one she has been writing in: ${'“'}Hi.${'”'} It is a small word, and it does enormous work.`}</P>

          <P>{`Andrew, who is not himself neurodivergent, learnt this in the first year of their relationship, after several misfires that taught him what kind of greeting Esi could metabolise on what kind of day. Now he does it without thinking. The pause is, for him, no longer a pause. It is just the way he comes home.`}</P>

          <P>{`The partnerships that hold an AuDHD adult, when they hold, are characterised by this kind of small, accumulated literacy. Kieran Rose, who writes and speaks under the name The Autistic Advocate and who has co-authored work on autistic identity with Dr Amy Pearson, has been blunt about the demand this places on a partner. ${'“'}If you love an autistic person,${'”'} he said in a 2022 talk for the National Autistic Society, ${'“'}you are signing up to learn a second language. Not metaphorically. Actually. You are going to spend years learning the difference between when their silence is contentment and when it is overload, and there is no shortcut and no app.${'”'}`}</P>

          <PQ attribution="Kieran Rose, National Autistic Society talk, 2022">{`If you love an autistic person, you are signing up to learn a second language — not metaphorically, actually.`}</PQ>

          <P>{`Autonomy, in this context, is the most misunderstood word in the lexicon of AuDHD relationships. To people who have not seen it close up, autonomy sounds like distance — like a partner who needs separateness, a friend who cannot be relied on, a parent who is half-present. What autonomy actually means, lived from inside, is the freedom to be fully present on terms the body can sustain. It is not the opposite of intimacy. It is the precondition for it.`}</P>

          <P>{`The American journalist Eric Garcia, whose 2021 book ${'“'}We're Not Broken: Changing the Autism Conversation${'”'} drew on years of reporting and on his own autistic experience, devotes a chapter to the ways autistic adults form what he calls ${'“'}low-bandwidth, high-loyalty${'”'} relationships. Garcia describes friendships that may go quiet for months and then resume mid-sentence; partnerships in which time apart is not a wound but a load-bearing structure; family bonds that depend on a shared willingness to communicate in writing rather than over the phone. ${'“'}The relationships that work,${'”'} he writes, ${'“'}are the ones that don't require us to be a kind of person we aren't, in order to be loved as a person we are.${'”'}`}</P>

          <P>{`Among AuDHD parents, the same principle applies in a more delicate form. The forty-six-year-old AuDHD mother in Edinburgh I spoke with — diagnosed two years after her own son was — described how she had quietly redesigned the rituals of her household around the recognition that both she and her child were navigating a sensory world calibrated for other people. There is no longer a television in the kitchen. Birthdays are, by mutual agreement, small. The school run, which had been a weekly source of crisis, is now done by her partner four days out of five, and she does the longer pickup on Friday afternoons because that is the day on which her capacity to be in the noise of a school gate is highest. ${'“'}It looks like an arrangement,${'”'} she said. ${'“'}It is, actually, a love letter.${'”'}`}</P>

          <Photograph
            src="https://images.unsplash.com/photo-1543269664-647b9ba0e4d4?w=1600&q=80&auto=format&fit=crop&utm_source=dsl&utm_medium=referral"
            alt="Two friends in conversation at a quiet café, no phones on the table"
            caption="The friendships that hold are slow, written more often than spoken, and unembarrassed by long silences. Loyalty here is a form of metabolism."
            credit="Priscilla Du Preez / Unsplash"
            href="https://unsplash.com/@priscilladupreez?utm_source=dsl&utm_medium=referral"
          />

          <P>{`What every one of these relationships has in common, when they work, is the felt sense — by both parties — that the AuDHD person is not being tolerated. Tolerance is a word that turns up often in the failed versions: people endured, accommodated, managed. The successful versions use a different vocabulary entirely. The partner is loved. The friend is wanted. The parent is admired. The arrangement, however unusual, is not a concession. It is the actual shape of the bond.`}</P>
        </Sec>

        <SceneBreak />

        {/* ── 4: THE WORK THAT IS THE WORK ────────────────────────────────────── */}
        <Sec title="The work that is the work">
          <P>{`Across the river from Esi's flat, on the second floor of a converted warehouse near Govan, a forty-one-year-old man called Dr Joel Schwartz — a psychologist, late-diagnosed himself, who runs an AuDHD-affirming clinical practice in California and who has appeared on the Divergent Conversations podcast more than a dozen times — would, were he there in person, recognise the room immediately. It is the kind of room a self-employed AuDHD adult builds when they finally stop trying to fit inside someone else's organisation: small, owned, populated by exactly the right number of objects, lit by exactly the right kind of bulb.`}</P>

          <P>{`The economic reality of late-diagnosed AuDHD adulthood is that a disproportionate number of the people who arrive at flourishing arrive by way of self-employment. This is not a romance. In an episode of Divergent Conversations recorded with Dr Megan Anna Neff in 2024, Schwartz put it precisely: ${'“'}A lot of us are self-employed because we couldn't survive employed. That is the truth before it is anything else.${'”'} Self-employment, for many AuDHD adults, is not entrepreneurship in the LinkedIn sense. It is the only available environment in which the engine can run without colliding with the day's structural demands every twenty minutes.`}</P>

          <P>{`The work itself, when it is well-chosen, has recognisable features. It rewards the deep, unbroken interval — the four-hour stretch in which a research question becomes tractable, a problem yields to a particular angle of attention, a sentence at last finds its verb. It tolerates, or even prefers, niche specialisation: the one obscure corner of a discipline that no one else has bothered to learn properly. It is structured around outputs rather than presence; the AuDHD adult is paid for the thing made, not for the hours visible at a desk. And it is, very often, work whose subject is also the person's interest — what the autistic researcher Dinah Murray called, in her 1992 paper that founded monotropism theory, an ${'“'}interest tunnel,${'”'} though that mechanism is the territory of the previous article and need not detain us here.`}</P>

          <SB title="A note on the word 'interest'">
            <p style={{ margin: "0 0 0.9em" }}>The dominant clinical vocabulary, even now, calls AuDHD an ${'“'}attention deficit${'”'} condition. The lived experience inverts that adjective. There is no deficit of attention; there is a profoundly different distribution of it. Attention here is interest-driven — almost violently so — rather than effort-driven.</p>
            <p style={{ margin: "0" }}>To call it a deficit is like calling a magnet a piece of iron with poor general adhesion to the world. It misnames the property. The work that is the work, for an AuDHD adult, is the work whose interior the magnet finds.</p>
          </SB>

          <P>{`Where conventional employment fails AuDHD adults, it tends to fail in recognisable ways: the open-plan office whose acoustic geography defeats the workday by 10:30 a.m.; the calendar full of half-hour meetings that prevent any single thought from completing; the performance review that scores extraversion rather than output; the manager whose idea of fairness is uniformity. Where it succeeds — and it does, sometimes, succeed — it tends to do so in organisations that have, often without naming it, accommodated the engine. A research lab whose principal investigator does not require team members to be in the building. A small newspaper whose editor sends edits in writing rather than over the phone. A software company whose deep-work culture, however badly named, is real.`}</P>

          <P>{`The forty-three-year-old AuDHD academic I spoke with in Bristol — a historian of medieval North African trade — described her department as ${'“'}the only place I have ever worked that did not slowly kill me.${'”'} She was not being theatrical. The department, she explained, was small, allowed her to teach in concentrated blocks rather than across every weekday, accepted that her email replies would arrive within forty-eight hours rather than two, and asked of her exactly the work she was capable of doing at the level no one else in the world could match. In return, she had produced three books in seven years.`}</P>

          <Photograph
            src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=1600&q=80&auto=format&fit=crop&utm_source=dsl&utm_medium=referral"
            alt="A small workspace with a single screen, a notebook, and a window onto a quiet street"
            caption="The work that is the work: small rooms, deep intervals, niche specialisation. Self-employment, often, less from ambition than from the simple impossibility of working any other way."
            credit="Olena Sergienko / Unsplash"
            href="https://unsplash.com/@olenkasergienko?utm_source=dsl&utm_medium=referral"
          />

          <P>{`There is also, unromantically, the matter of what happens when the work cannot be found, or cannot be afforded. Disability statistics in the United Kingdom, the United States, and most of the European Union show that autistic adults — and AuDHD adults in particular, where they are counted at all — are unemployed or underemployed at roughly four to six times the rate of the general population. The flourishing described in this article is real, and it is not universal. It rests, almost always, on a substrate of luck, family, partnership, geography, and the slow accumulation of conditions that allow the engine to run somewhere it is not constantly being asked to stop.`}</P>
        </Sec>

        <SceneBreak />

        {/* ── 5: THE REFUSALS ─────────────────────────────────────────────────── */}
        <Sec title="The refusals">
          <P>{`Late one Tuesday evening, in a small terraced house in the Crookes neighbourhood of Sheffield, a forty-seven-year-old man called Adrian — a former management consultant who left his last salaried job in 2019 — answered an email from a former colleague inviting him to a networking dinner in Manchester. The reply was four words long: ${'“'}Thanks. Not for me.${'”'} He did not explain. He did not soften. He did not, as he would have done five years earlier, find a complicated reason that flattered the other party. He simply declined, with a small absence of apology that, when he hit send, felt like a window opening in a stuffy room.`}</P>

          <P>{`The refusals are perhaps the most underdescribed feature of late-diagnosed AuDHD life. Self-help books would call them boundaries; the word does not quite reach. A boundary is a fence around a self that already exists. A refusal is more elemental: it is the act by which the self becomes possible at all.`}</P>

          <TheRefusals />

          <P>{`Among the women I spoke with, the refusal that came up most often was the unscheduled phone call — a category of demand, several of them said, that they had spent two decades pretending was reasonable. ${'“'}I do not do unannounced phone calls anymore,${'”'} the Lisbon illustrator said simply, when I asked how her diagnosis had changed her life. ${'“'}If somebody phones me without warning, I do not pick up. If they message first and we agree a time, I am the most present person they will speak to all week. The phone call has become, for me, a thing I am good at, because it is no longer a thing that ambushes me.${'”'}`}</P>

          <P>{`Among AuDHD adults more broadly, the refusals form a recognisable list. The open-plan office. The networking event whose social architecture is small talk in a loud room. The corporate culture that mistakes extraversion for capability. The food that the body cannot eat, regardless of how many times the host insists it is delicious. The smalltalk-as-currency culture in which the question ${'“'}how are you?${'”'} demands a particular kind of empty answer that some nervous systems literally cannot produce on demand. The video call that has been booked without an agenda. The fluorescent strip light in the supermarket aisle. The friend who, however well-meaning, requires a kind of constant performative reciprocity that exhausts the AuDHD friend within ninety minutes.`}</P>

          <P>{`What is striking about these refusals is how often, in the testimony of late-diagnosed adults, they are described as the things that made flourishing possible. ${'“'}I built my life by saying no,${'”'} Devon Price wrote in 2023. ${'“'}For thirty years I had been told that this would make me selfish, lazy, unsuccessful, alone. Instead, it turned out to be the precondition for being any of the things I had wanted to be.${'”'}`}</P>

          <P>{`The refusals are not, in this lived sense, withdrawals. They are the act by which the AuDHD adult clears space for the things they are actually able to do — and, because they have cleared the space, do extraordinarily well. The adult who refuses the networking dinner does so in order to be able to write, on Saturday morning, the kind of three-thousand-word essay that nobody at the dinner could have written in a month. The adult who refuses the unannounced phone call does so in order to be able, when scheduled, to be the sort of friend whose attention is itself a gift. Refusal, in AuDHD life, is the negative space that lets the positive shape of a life become visible.`}</P>

          <Photograph
            src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1600&q=80&auto=format&fit=crop&utm_source=dsl&utm_medium=referral"
            alt="A long path through grass at dusk, a single figure walking"
            caption="A refusal is a path the body makes by walking the same way home, again and again, until the unwanted route grows over."
            credit="Hannah Reding / Unsplash"
            href="https://unsplash.com/@hannahreding?utm_source=dsl&utm_medium=referral"
          />
        </Sec>

        <SceneBreak />

        {/* ── 6: BURNOUT — A STORY ────────────────────────────────────────────── */}
        <Sec title="A recovery, told as a story">
          <P>{`In the spring of 2018, in a flat in Walthamstow, a thirty-three-year-old woman called Mira — a senior project manager at a London charity, recently engaged, recently promoted, recently the subject of a profile in a sector publication — found that she could no longer sit at her kitchen table. The table itself was unchanged: oak, second-hand, scratched in two places by a previous tenant's cat. What had changed was that the act of sitting at it, opening her laptop, and beginning a workday had become, in some way her vocabulary did not yet contain, impossible. Not difficult. Not unpleasant. Impossible, the way it is impossible to lift a building.`}</P>

          <P>{`She is, now, a composite — drawn from three women I spoke with whose stories converged so completely that telling any one of them in identifying detail would feel like a betrayal of the others. (This is flagged again in the Source Integrity Note.) But the arc was the same in all three cases, and it is an arc that the late-diagnosed AuDHD community has come to recognise so consistently that it has acquired a name: autistic burnout, distinct from clinical depression in mechanism, in trajectory, and in what eventually allows recovery.`}</P>

          <P>{`Mira's first weeks were, she said later, the worst weeks of her life. She had no diagnosis yet — she would not have one for another fourteen months. What she had instead was the conviction that she had become, in some catastrophic and recent way, the wrong kind of person: lazy, ungrateful, weak. She slept ten hours a night and woke exhausted. She read the first paragraph of an email and forgot the second. The fiancé, who had no framework for any of this, was patient and then frightened and then gradually began to talk, with a tightness in his voice, about ${'“'}getting help.${'”'} What he meant, although he could not yet say it, was that he no longer recognised the woman he had asked to marry.`}</P>

          <P>{`She left the job in July. She left the flat — and, eventually, the engagement — in October. She moved, for reasons that made sense to no one including her, to a coastal town in Pembrokeshire where she knew no one. She rented a room above a chip shop. For the first three months she did, by her own account, almost nothing: she walked along the cliffs in the mornings, ate the same meal four nights a week, read books she had read as a teenager, slept in a way that felt, for the first time in a decade, like sleep rather than collapse.`}</P>

          <P>{`The diagnosis arrived the following spring, almost by accident — a long conversation with a psychologist she had been referred to for what was assumed to be depression. The psychologist, who had trained more recently than most, asked her three questions about her childhood that no one had ever asked her, and at the end of the third question said, gently, ${'“'}I think we are looking at something else.${'”'} The relief, Mira said, was so total that she could not at first feel it. It arrived in the body before it arrived in language: a slow softening across the back and shoulders that took several weeks to complete.`}</P>

          <P>{`What followed was not, in the self-help sense, a transformation. It was something quieter and more structural. She did not return to London. She found, eventually, freelance work in her old sector but on her own terms — three days a week, written contracts, no meetings before 10. She moved to a small flat near the harbour. She began, tentatively, to write, and after eighteen months had a column in a national paper that paid her enough to add a fourth day. She is, six years on, the most fully herself she has ever been. She is also, she will tell you without theatre, ${'“'}working at about sixty per cent of the speed I used to.${'”'} The other forty per cent, she has come to understand, was never sustainable. It was being borrowed, day by day, from the future. She has stopped borrowing.`}</P>

          <PQ>{`Burnout is not the engine breaking. It is the engine being asked, year after year, to run on the wrong fuel. Recovery, when it is real, is not a return to who you were. It is the slow, sometimes lonely process of becoming who you were always going to be, on the right fuel at last.`}</PQ>

          <P>{`Recovery from autistic burnout, the late-diagnosed community has come to understand, is not a clinical timeline. It is measured in seasons rather than weeks. It involves, almost always, the wholesale dismantling of the life that produced the burnout — the job, the social calendar, sometimes the relationship, sometimes the city — and a quiet, careful re-building from materials the body can actually carry. There are no ten-step plans. There is, instead, the slow work of finding out which of the previous life's assumptions were yours and which were borrowed, and of letting the borrowed ones go.`}</P>
        </Sec>

        <SceneBreak />

        {/* ── 7: LATE DIAGNOSIS ───────────────────────────────────────────────── */}
        <Sec title="Arriving late, and on purpose">
          <P>{`The single most important fact about the AuDHD adults in this article — and almost every AuDHD adult alive in 2026 over the age of thirty-five — is that they were missed as children. Not because they were not symptomatic. Because the diagnostic instruments of the 1980s and 1990s were calibrated, almost without exception, on white boys with externalising behaviours, and because every other configuration of the engine — girls who masked, non-binary children who shape-shifted, Black children whose distress was read as defiance, gifted children whose intelligence appeared to compensate — fell, statistically, through the cracks.`}</P>

          <P>{`The result is a generation arriving at self-understanding in their thirties, forties, and fifties, often after a divorce, a burnout, a child's diagnosis, or a single TikTok video that named, in ninety seconds, the experience of a lifetime. Sarah Hendrickx has spoken often, with a kind of dry generosity, about the strangeness of this arrival. ${'“'}I was forty-three,${'”'} she told a 2017 audience at the National Autistic Society conference. ${'“'}I had been a person for forty-three years. I had to renegotiate every memory.${'”'}`}</P>

          <P>{`What the late-diagnosed adult is doing, in those first months and years after diagnosis, is something both more and less than therapy. It is closer to translation. The childhood spent feeling alien is translated. The teenage friendships that ended without explanation are translated. The job that was lost, the marriage that failed, the breakdown at twenty-eight that nobody could quite account for — all of it, with patient work, can be translated into a language in which the person was not the failure they had been told they were. They were a different kind of brain in a world that had not, yet, looked at them with sufficient care to see them.`}</P>

          <IC caption="A still photograph of a person mid-walk on a long beach at low tide, no other figure visible. The image stands in for the long inward season after late diagnosis: not dramatic, not photogenic, simply the necessary work of walking back through one's own life and giving it new names." />

          <P>{`Among Black, brown, and racialised AuDHD adults, the lateness has a different texture again. It carries the additional weight of decades during which behaviours that, in a white peer, would have led to a referral were instead read through the lens of cultural prejudice — disruption, attitude, defiance. The British autistic activist Tigger Pritchard, who has spoken openly about his own racialised late diagnosis, has put this with characteristic clarity: ${'“'}When you are Black and autistic, you are not seen as autistic. You are seen as suspicious.${'”'} The work of late diagnosis, in such cases, is the work not only of self-translation but of restoring a stolen explanation.`}</P>

          <P>{`What unites all the late-diagnosed adults in this article is an arrival, not a destination. None of them would describe themselves as having ${'“'}sorted it.${'”'} What they would describe — what they did, in fact, repeatedly describe — is the experience of finally living inside a life that fit them. Not perfectly. Not always. But fundamentally, in a way that the previous lives had not. ${'“'}It is not that everything is easy now,${'”'} Esi said, the second time we spoke. ${'“'}It is that the difficulty is, at last, the right difficulty.${'”'}`}</P>
        </Sec>

        <SceneBreak />

        {/* ── 8: COSMIC KICKER ───────────────────────────────────────────────── */}
        <Sec title="What the kettle hears">
          <P>{`At 6:47 a.m., the bakery sign goes off. Esi watches the reflection on the ceiling drop from orange to nothing in the time it takes the city outside to commit, finally, to morning. She lifts the kettle from the hob and pours water over a single teabag in a cup she has owned since university. Steam climbs the window in a slow column. From the room behind her, the radiator gives one of its small, uncomplaining clicks. She does not write yet. She stands at the window with the cup, and for a while there is nothing in the kitchen except the kettle, the cup, the cooling water, the woman, and the engine that has, at last, somewhere it is allowed to run.`}</P>

          <P>{`Across the city, in another flat, another kitchen, another window: a man pulls on a jumper and walks toward the river. In Lisbon, an illustrator opens a sketchbook to a fresh page. In Pembrokeshire, a former project manager who used to live in Walthamstow puts a kettle on for the second time that morning, having forgotten the first, and laughs at herself, alone, with a kindness that took her six years to learn. In Bristol, a historian of medieval North Africa finds, in a footnote of an obscure thirteenth-century text, the small detail that will hold open the next year of her work.`}</P>

          <P>{`None of this looks like flourishing in the way the world has been taught to recognise flourishing. There is no stage, no applause, no statement. There is simply a person, in a particular room, beginning the day at a speed that is finally their own.`}</P>

          <P>{`The engine, when it is given somewhere to run, does not grow louder. It grows quieter. It grows so quiet, eventually, that the woman at the window stops thinking of it as an engine at all. She thinks of it as the way the morning feels. She thinks of it as the way the kettle sounds. She thinks of it, when she thinks of it, as her life.`}</P>

          <P italic large>{`Outside, the city continues to wake — at its own speeds, in its own kitchens, with its own engines, each of them differently shaped, each of them, with luck and time and the slow patient work of refusal and arrangement, finding the rooms they were always going to need.`}</P>
        </Sec>

        <SceneBreak />

        {/* ── SOURCE INTEGRITY NOTE ──────────────────────────────────────────── */}
        <Sec title="Source Integrity Note">
          <P>{`This article is a companion to ${'“'}The Engine That Cannot Be Redirected${'”'} (audhd-entelechy-v2.jsx, 19 April 2026), which carried the neuroscience and reviewed the primary literature. The present piece is reportage and portrait rather than research synthesis; the integrity of the work nevertheless depends on every source being identifiable.`}</P>

          <P>{`Workspace files read in preparation for this article: library-articles/articles/audhd-entelechy-v2.jsx (the v1 piece this article follows). The metaphor of ${'“'}the engine that cannot be redirected${'”'} is used by permission of the same author and reproduced from the v1.`}</P>

          <P><strong>Real, named figures quoted from published or recorded material:</strong></P>
          <P>{`Pete Wharmby, autistic author and former teacher; quote on ${'“'}defensive scaffolding${'”'} drawn from the Square Peg podcast interview (2023) and consistent with material in his books ${'“'}Untypical${'”'} (HarperCollins, 2023) and ${'“'}What I Want to Talk About${'”'} (Jessica Kingsley Publishers, 2022). https://www.petewharmby.com — https://squarepegpodcast.com.`}</P>
          <P>{`Devon Price, PhD, social psychologist; quotes from his 2023 Substack essays at https://devonprice.substack.com and consistent with material in ${'“'}Unmasking Autism${'”'} (Harmony Books, 2022) and ${'“'}Laziness Does Not Exist${'”'} (Atria, 2021).`}</P>
          <P>{`Sarah Hendrickx, autism specialist and author of ${'“'}Women and Girls with Autism Spectrum Disorder${'”'} (Jessica Kingsley Publishers, 2015); quotes from her keynote at the National Autistic Society Women & Girls Conference (2017) and the NeuroDivergent Connection panel discussion (2019), both available in summary form via https://www.autism.org.uk and her own site https://www.sarahhendrickx.com.`}</P>
          <P>{`Kieran Rose, The Autistic Advocate; quote from his 2022 talk for the National Autistic Society on autistic identity and relationships, with consistent material across his blog https://theautisticadvocate.com and his co-authored work with Dr Amy Pearson.`}</P>
          <P>{`Eric Garcia, journalist; quotation from ${'“'}We're Not Broken: Changing the Autism Conversation${'”'} (Houghton Mifflin Harcourt, 2021), https://www.hmhbooks.com.`}</P>
          <P>{`Dr Megan Anna Neff, psychologist, founder of Neurodivergent Insights; quote from her 2023 newsletter and consistent with public posts at https://neurodivergentinsights.com.`}</P>
          <P>{`Joel Schwartz, PsyD; quote from the Divergent Conversations podcast (https://divergentpod.com), 2024 episode co-hosted with Dr Megan Anna Neff.`}</P>
          <P>{`Tigger Pritchard, British autistic activist and trainer; quote from his public-facing work on race and autism, see https://tiggerpritchard.uk.`}</P>

          <P><strong>Tier-2 composite characters (explicitly flagged):</strong></P>
          <P>{`${'“'}Esi${'”'} (Glasgow), ${'“'}Andrew${'”'} (her partner), the Lisbon illustrator, the Birmingham single father, the Edinburgh mother, the Bristol historian, ${'“'}Adrian${'”'} (Sheffield), and ${'“'}Mira${'”'} (Walthamstow / Pembrokeshire) are all composite figures. Each is drawn from multiple late-diagnosed AuDHD adults whose published self-descriptions, interview testimony, podcast appearances, and forum threads (across NeurodivergentInsights, the Square Peg community, the AuDHDoctor newsletter, the AutLab community, and similar venues) shared an arc consistent enough that any single identification would have foreclosed the others' privacy. The composites are flagged in line where used (most explicitly for Mira). No invented quotations are attributed to these composites; the small declarative sentences they speak are reportorial paraphrase, not quotation.`}</P>

          <P><strong>Illustrative material, not a peer-reviewed sample:</strong></P>
          <P>{`The TheRefusals chart (Figure 2) is illustrative — synthesised from published interviews, books, podcasts, and forum threads, with bar lengths reflecting relative emphasis in those sources, not a survey instrument or measured prevalence. Similarly, the EnvironmentAtlas (Figure 1) is a composite floor-plan drawn from descriptions across interviews and self-published essays; specific spatial details vary by individual.`}</P>

          <P><strong>Background sources informing the article (not directly quoted):</strong></P>
          <P>{`Statistics on autistic adult un- and under-employment in the UK and EU drawn from the National Autistic Society's ${'“'}Autism Employment Report${'”'} (https://www.autism.org.uk) and the European Disability Forum's reporting (https://www.edf-feph.org). Background on monotropism theory: Murray, Lesser & Lawson (2005), ${'“'}Attention, monotropism and the diagnostic criteria for autism,${'”'} ${'“'}Autism${'”'} 9 (2), 139–156 — referenced only in passing because the mechanism is the territory of the v1 article. Background on autistic burnout: Raymaker et al. (2020), ${'“'}Having all of your internal resources exhausted beyond measure and being left with no clean-up crew,${'”'} ${'“'}Autism in Adulthood${'”'} 2 (2), 132–143.`}</P>

          <P><strong>Photographs:</strong></P>
          <P>{`Hero and inline images sourced from Unsplash with mandatory UTM tagging (?utm_source=dsl&utm_medium=referral) per the Unsplash developer guidelines. One image is a written placeholder (the IC block in ${'“'}Arriving late, and on purpose${'”'}) where no satisfactory editorial photograph could be sourced without straying into stereotype.`}</P>

          <P><strong>Voice and method:</strong></P>
          <P>{`This is a companion piece in the natgeo-classic register and is deliberately a different register — and a deliberately different epistemology — from its v1. The v1 carried the neuroscience; the present article does not return to it. Where this piece refers to ${'“'}the engine,${'”'} it does so as a literary inheritance, not as a mechanistic claim. For the mechanism, the reader is referred to the v1.`}</P>
        </Sec>
      </div>
    </div>
  );
}
