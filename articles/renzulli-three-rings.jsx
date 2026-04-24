
import { useState } from "react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ScatterChart, Scatter, ZAxis, Cell
} from "recharts";

const C = {
  natgeoYellow: "#FFCE00",
  black: "#1a1a1a",
  offWhite: "#FAF8F5",
  cream: "#F2EDE4",
  warmGray: "#8A8278",
  darkGray: "#3D3B38",
  sidebarBg: "#F0EBE1",
  accent: "#C4A35A",
  borderLight: "#E0DAD0",
  iqBlue: "#1E3A5F",
  threeRingGold: "#8E6A1A",
  creativityGreen: "#2E6B45",
};

// ── DIAGRAM 1: Three-Ring SVG Venn ───────────────────────────────────────────
const ThreeRingVenn = () => (
  <div style={{ background: "#0d1a26", borderRadius: 4, padding: "28px 24px 24px", marginBottom: 8 }}>
    <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 13, fontWeight: 700, color: C.natgeoYellow, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>The Three-Ring Conception of Giftedness</div>
    <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>Renzulli (1978): Gifted behaviour emerges from the interaction of all three clusters — not from any single component</div>
    <svg viewBox="0 0 500 380" style={{ width: "100%", maxHeight: 320 }}>
      <defs>
        <radialGradient id="abilityGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7ec8e3" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#7ec8e3" stopOpacity="0.18" />
        </radialGradient>
        <radialGradient id="creativityGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={C.natgeoYellow} stopOpacity="0.5" />
          <stop offset="100%" stopColor={C.natgeoYellow} stopOpacity="0.15" />
        </radialGradient>
        <radialGradient id="taskGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a8d8a8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#a8d8a8" stopOpacity="0.15" />
        </radialGradient>
      </defs>
      {/* Three overlapping circles */}
      <circle cx="215" cy="155" r="110" fill="url(#abilityGrad)" stroke="rgba(126,200,227,0.5)" strokeWidth="1.5" />
      <circle cx="285" cy="155" r="110" fill="url(#creativityGrad)" stroke="rgba(255,206,0,0.5)" strokeWidth="1.5" />
      <circle cx="250" cy="235" r="110" fill="url(#taskGrad)" stroke="rgba(168,216,168,0.5)" strokeWidth="1.5" />
      {/* Central intersection highlight */}
      <ellipse cx="250" cy="190" rx="32" ry="28" fill="rgba(255,255,255,0.22)" />
      <text x="250" y="184" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="8" fontFamily="'Source Sans 3', sans-serif" fontWeight="700">GIFTED</text>
      <text x="250" y="196" textAnchor="middle" fill="rgba(255,255,255,0.9)" fontSize="8" fontFamily="'Source Sans 3', sans-serif" fontWeight="700">BEHAVIOUR</text>
      {/* Labels */}
      <text x="162" y="100" textAnchor="middle" fill="rgba(126,200,227,0.95)" fontSize="12" fontFamily="'Source Sans 3', sans-serif" fontWeight="700">Above-Average</text>
      <text x="162" y="115" textAnchor="middle" fill="rgba(126,200,227,0.95)" fontSize="12" fontFamily="'Source Sans 3', sans-serif" fontWeight="700">Ability</text>
      <text x="338" y="100" textAnchor="middle" fill="rgba(255,206,0,0.95)" fontSize="12" fontFamily="'Source Sans 3', sans-serif" fontWeight="700">Creativity</text>
      <text x="250" y="348" textAnchor="middle" fill="rgba(168,216,168,0.95)" fontSize="12" fontFamily="'Source Sans 3', sans-serif" fontWeight="700">Task Commitment</text>
    </svg>
    <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 8 }}>
      Source: Renzulli, J.S. (1978). What makes giftedness? Reexamining a definition. <em>Phi Delta Kappan</em>, 60(3), 180–184. ERIC EJ190430. The model has been elaborated across multiple publications through 2021.
    </div>
  </div>
);

// ── DIAGRAM 2: IQ threshold vs Renzulli identification comparison ─────────────
const IdentificationComparison = () => {
  const data = [
    { group: "Low SES students", iqIdentified: 38, renzulliIdentified: 62 },
    { group: "Minority students", iqIdentified: 34, renzulliIdentified: 58 },
    { group: "Twice-exceptional", iqIdentified: 22, renzulliIdentified: 55 },
    { group: "High SES students", iqIdentified: 78, renzulliIdentified: 80 },
    { group: "All students", iqIdentified: 42, renzulliIdentified: 65 },
  ];
  return (
    <div style={{ background: "#FAF8F5", border: `1px solid ${C.borderLight}`, borderRadius: 4, padding: "28px 24px 20px", marginBottom: 8 }}>
      <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 13, fontWeight: 700, color: C.black, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>IQ Threshold vs. Renzulli Identification: Equity Implications</div>
      <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 12, color: C.warmGray, marginBottom: 18 }}>Schematic comparison of student groups identified under traditional IQ-threshold versus Three-Ring/SEM approaches (illustrative)</div>
      <ResponsiveContainer width="100%" height={230}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} />
          <XAxis dataKey="group" tick={{ fill: C.darkGray, fontSize: 10, fontFamily: "'Source Sans 3'" }} angle={-12} textAnchor="end" />
          <YAxis tick={{ fill: C.darkGray, fontSize: 10 }} domain={[0, 100]} unit="%" label={{ value: "% identified", angle: -90, position: "insideLeft", fill: C.warmGray, fontSize: 10 }} />
          <Tooltip contentStyle={{ background: "#fff", border: `1px solid ${C.borderLight}`, borderRadius: 4, fontFamily: "'Source Sans 3'", fontSize: 12 }} />
          <Legend wrapperStyle={{ color: C.darkGray, fontSize: 12, fontFamily: "'Source Sans 3'" }} />
          <Bar dataKey="iqIdentified" fill={C.warmGray} name="IQ threshold (≥130)" radius={[2,2,0,0]} />
          <Bar dataKey="renzulliIdentified" fill={C.natgeoYellow} name="Three-Ring / SEM approach" radius={[2,2,0,0]} />
        </BarChart>
      </ResponsiveContainer>
      <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 11, color: C.warmGray, marginTop: 12 }}>
        Source: Schematic illustration of equity impact, adapted from Renzulli (2005); Borland (2009) in ResearchGate; Reis &amp; Peters (2021) <em>Gifted Education International</em>. Values are illustrative of documented directional trends, not absolute empirical data. The SEM talent pool typically targets 15–20% of students with above-average ability or high potential, compared to a strict IQ cut-off of approximately 2–5%.
      </div>
    </div>
  );
};

// ── DIAGRAM 3: Schoolhouse vs Creative-Productive Giftedness ─────────────────
const GiftednessTypes = () => {
  const schoolhouse = [
    { trait: "Test performance", value: 95 },
    { trait: "Memory", value: 88 },
    { trait: "Lesson mastery", value: 92 },
    { trait: "Task compliance", value: 85 },
    { trait: "Creativity", value: 45 },
    { trait: "Self-direction", value: 40 },
  ];
  const creative = [
    { trait: "Test performance", value: 60 },
    { trait: "Memory", value: 65 },
    { trait: "Lesson mastery", value: 58 },
    { trait: "Task compliance", value: 42 },
    { trait: "Creativity", value: 95 },
    { trait: "Self-direction", value: 90 },
  ];
  const combined = schoolhouse.map((s, i) => ({ trait: s.trait, schoolhouse: s.value, creative: creative[i].value }));
  return (
    <div style={{ background: "#0d1118", borderRadius: 4, padding: "28px 24px 20px", marginBottom: 8 }}>
      <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 13, fontWeight: 700, color: C.natgeoYellow, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Two Kinds of Giftedness: Schoolhouse vs. Creative-Productive</div>
      <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 18 }}>Renzulli's crucial distinction between lesson-learning giftedness (high IQ, test performance) and creative-productive giftedness (the target of the Three-Ring model)</div>
      <ResponsiveContainer width="100%" height={240}>
        <RadarChart data={combined}>
          <PolarGrid stroke="rgba(255,255,255,0.1)" />
          <PolarAngleAxis dataKey="trait" tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 10, fontFamily: "'Source Sans 3'" }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 9 }} />
          <Radar name="Schoolhouse giftedness" dataKey="schoolhouse" stroke={C.natgeoYellow} fill={C.natgeoYellow} fillOpacity={0.2} />
          <Radar name="Creative-productive giftedness" dataKey="creative" stroke="#7ec8e3" fill="#7ec8e3" fillOpacity={0.2} />
          <Legend wrapperStyle={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontFamily: "'Source Sans 3'" }} />
          <Tooltip contentStyle={{ background: "#1a2a3a", border: "none", borderRadius: 4, color: "#fff", fontFamily: "'Source Sans 3'" }} />
        </RadarChart>
      </ResponsiveContainer>
      <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 10 }}>
        Source: Schematic; adapted from Renzulli's distinction between Type I (schoolhouse) and Type II (creative-productive) giftedness across multiple publications (1978–2021). Values illustrate the contrasting trait profiles, not absolute measurements.
      </div>
    </div>
  );
};

// ── HELPERS ──────────────────────────────────────────────────────────────────
const DropCap = ({ letter, rest }) => (
  <p style={{ fontFamily: "'Source Serif 4',serif", fontSize: 20, lineHeight: 1.75, color: C.black, marginBottom: "1.5em", marginTop: 0 }}>
    <span style={{ float: "left", fontSize: 72, lineHeight: 0.82, fontFamily: "'Playfair Display',serif", fontWeight: 900, marginRight: 8, marginTop: 6, color: C.black }}>{letter}</span>
    {rest}
  </p>
);
const Sidebar = ({ title, children }) => (
  <div style={{ background: C.sidebarBg, border: `1px solid ${C.borderLight}`, borderRadius: 2, padding: "28px 28px 24px", margin: "36px 0", clear: "both" }}>
    <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: C.black, borderBottom: `2px solid ${C.natgeoYellow}`, paddingBottom: 6, marginBottom: 14 }}>{title}</div>
    <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 15, lineHeight: 1.7, color: C.darkGray }}>{children}</div>
  </div>
);
const ImgCaption = ({ label, text }) => (
  <div style={{ marginTop: 10, marginBottom: 32 }}>
    <span style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: C.accent, marginRight: 8 }}>{label}</span>
    <span style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 13, color: "#6B6560", lineHeight: 1.5 }}>{text}</span>
  </div>
);
const Para = ({ children }) => (
  <p style={{ fontFamily: "'Source Serif 4',serif", fontSize: 20, lineHeight: 1.75, color: C.black, marginBottom: "1.5em", marginTop: 0 }} dangerouslySetInnerHTML={{ __html: children }} />
);
const PullQuote = ({ children }) => (
  <blockquote style={{ borderLeft: `3px solid ${C.natgeoYellow}`, paddingLeft: 24, margin: "40px 0", fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: 26, lineHeight: 1.45, color: C.black }}>{children}</blockquote>
);
const SceneBreak = () => (
  <div style={{ textAlign: "center", margin: "48px 0", letterSpacing: 8, fontSize: 22, color: C.accent }}>❧</div>
);
const DiagramCaption = ({ title, children }) => (
  <div style={{ marginTop: 10, marginBottom: 36 }}>
    <span style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: C.accent, marginRight: 8 }}>◆ Diagram</span>
    <span style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 13, color: "#6B6560" }}><em>{title}</em> — {children}</span>
  </div>
);

// ── MAIN ─────────────────────────────────────────────────────────────────────
export default function RenzulliThreeRings() {
  return (
    <div style={{ background: C.offWhite, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&family=Source+Sans+3:wght@300;400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        img { display: block; width: 100%; }
      `}</style>

      <div style={{ background: C.black, padding: "10px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: C.warmGray }}>MODE: Scientific American Hybrid &nbsp;|&nbsp; FORMAT: Standard Feature</span>
        <span style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 11, color: C.warmGray }}>Article 6 of 6</span>
      </div>
      <div style={{ height: 4, background: C.natgeoYellow }} />

      {/* Hero */}
      <div style={{ minHeight: "86vh", position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-end", background: "linear-gradient(155deg, #1a1200 0%, #120d00 50%, #08060a 100%)", overflow: "hidden" }}>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.2 }} viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="ringGlow1" cx="38%" cy="42%" r="35%">
              <stop offset="0%" stopColor="#7ec8e3" stopOpacity="0.4" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="ringGlow2" cx="62%" cy="42%" r="35%">
              <stop offset="0%" stopColor={C.natgeoYellow} stopOpacity="0.38" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="ringGlow3" cx="50%" cy="62%" r="35%">
              <stop offset="0%" stopColor="#a8d8a8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1200" height="600" fill="url(#ringGlow1)" />
          <rect width="1200" height="600" fill="url(#ringGlow2)" />
          <rect width="1200" height="600" fill="url(#ringGlow3)" />
          {/* Three faint overlapping circles */}
          <circle cx="456" cy="255" r="160" fill="none" stroke="rgba(126,200,227,0.12)" strokeWidth="1.5" />
          <circle cx="744" cy="255" r="160" fill="none" stroke="rgba(255,206,0,0.12)" strokeWidth="1.5" />
          <circle cx="600" cy="440" r="160" fill="none" stroke="rgba(168,216,168,0.1)" strokeWidth="1.5" />
          {/* Central glow */}
          <ellipse cx="600" cy="320" rx="60" ry="50" fill="rgba(255,255,255,0.07)" />
        </svg>
        <div style={{ position: "relative", zIndex: 2, padding: "0 48px 64px", maxWidth: 900 }}>
          <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: C.natgeoYellow, marginBottom: 20 }}>◆ Educational Psychology &nbsp;·&nbsp; Talent Development</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: "clamp(36px,5.5vw,68px)", lineHeight: 1.05, color: "#fff", marginBottom: 24, maxWidth: 820 }}>
            Beyond the Number
          </h1>
          <p style={{ fontFamily: "'Source Serif 4',serif", fontStyle: "italic", fontSize: "clamp(16px,2vw,21px)", lineHeight: 1.6, color: "rgba(255,255,255,0.82)", maxWidth: 680, marginBottom: 36 }}>
            For most of the twentieth century, a single number determined which children the educational system recognised as gifted. A Connecticut psychologist spent his career arguing that this was not only wrong, but that what it missed was precisely the thing that mattered most.
          </p>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "64px 32px 80px" }}>

        <DropCap letter="I" rest="n 1904, the French psychologist Alfred Binet was asked by the Paris school system to develop a test that could identify children who were unlikely to succeed in ordinary classrooms. What Binet produced — a battery of tasks measuring attention, memory, and reasoning — became, in the hands of the American psychologists who adapted it over the following decades, something he had explicitly warned against: a fixed, heritable measure of intelligence, expressed as a quotient, used to rank human beings on a single scale." />

        <Para>Lewis Terman at Stanford revised Binet's instrument into the Stanford-Binet Intelligence Scale and used it to study the development of highly intelligent children in his landmark Genetic Studies of Genius project. Terman tracked 1,528 children with IQs of 140 or above across their lifetimes, and his findings shaped the dominant assumption of twentieth-century gifted education: that exceptional ability was a stable, identifiable trait measurable by standardised test, and that the task of schools was to locate the children who possessed it and provide them with advanced instruction.</Para>

        <Para>The threshold thinking that flowed from this legacy — the idea that a child who scored 130 belonged in the gifted programme while a child who scored 129 did not — was, by the 1970s, producing increasingly uncomfortable results. It systematically underidentified children from low-income families, minority communities, and linguistically diverse backgrounds, for whom the culturally loaded vocabulary of IQ tests was a barrier rather than a window. It overidentified children who were skilled test-takers but whose actual creative output would prove unremarkable. And it missed entirely a population that Joseph Renzulli, a professor of educational psychology at the University of Connecticut, had been observing for years in the biographical records of history's most transformative contributors: people who were above average but not necessarily exceptional by IQ, possessed of enormous creative energy, and driven by a quality that no standardised test had ever successfully captured — the capacity to commit to a problem with a ferocity that looked, from the outside, indistinguishable from obsession.</Para>

        <PullQuote>"No single cluster 'makes giftedness.' Rather, it is the interaction among the three clusters that research has shown to be the necessary ingredient for creative-productive accomplishment." — Joseph S. Renzulli</PullQuote>

        {/* Image 1 */}
        <div style={{ margin: "40px 0 0" }}>
          <img src="https://www.k12tutoring.com/wp-content/uploads/2020/09/gifted-kids-cover-image.jpg"
            alt="Gifted students in deep learning"
            style={{ width: "100%", borderRadius: 2, maxHeight: 400, objectFit: "cover" }}
            onError={e => { e.target.style.display = 'none'; }} />
        </div>
        <ImgCaption label="◆ Establishing" text="Students in deep engagement with a complex problem. Renzulli's Three-Ring model specifically targets what he calls 'creative-productive giftedness' — the behavioural profile of students who bring above-average ability, creative thinking, and sustained task commitment to real problems. His Schoolwide Enrichment Model, implemented in over 4,000 US schools, operationalises this by identifying a talent pool of 15–20% of students rather than the 2–5% captured by IQ threshold approaches." />

        <SceneBreak />

        <Para>In 1978, Renzulli published a paper in <em>Phi Delta Kappan</em> — the practitioner-facing journal of education — titled "What Makes Giftedness? Reexamining a Definition." It was not a data paper in the conventional sense: Renzulli drew on the biographical and historical literature on creative-productive people, examining what distinguished individuals who had made genuine contributions to their fields from those who had merely demonstrated high performance on academic measures. The pattern he found was consistent enough to crystallise into a model: three partially overlapping clusters of traits whose interaction, not any single cluster alone, produced the kind of giftedness that actually changed things.</Para>

        <Para>The first cluster was above-average ability — not necessarily superior intelligence in the Terman sense, but performance in the upper ranges of ability in a particular domain or combination of domains. Renzulli was deliberate about the "above average" framing rather than "exceptional": the biographical evidence suggested that the correlation between IQ score and creative-productive achievement flattened significantly above roughly the 120 threshold. Beyond that point, additional IQ points bought diminishing returns in terms of what a person actually produced. The children who scored 145 were not dramatically more likely to make transformative contributions than children who scored 125.</Para>

        <Para>The second cluster was creativity: fluency, flexibility, and originality of thought; openness to experience; sensitivity to stimulation; willingness to take risks with ideas. Not creativity in the vague, unmeasurable sense, but the specific cognitive and dispositional profile that distinguished people who generated genuinely novel solutions from those who applied existing frameworks with great efficiency. Renzulli drew on the creativity research tradition — particularly E. Paul Torrance's work on divergent thinking — but framed creativity as a cluster of traits rather than a single quotient, and argued for its essential irreducibility to any standardised metric.</Para>

        <Para>The third cluster was task commitment — what Renzulli described as motivation refined and focused on a particular problem or domain. Perseverance. Endurance. The capacity to work for extended periods in the face of frustration. Self-confidence, but specifically the self-confidence of someone who has devoted themselves to something difficult enough that they have genuine grounds for it. A special fascination with a specific subject, or a class of subjects, that focuses the general capacity to work hard into a particular channel. Renzulli argued, with considerable force, that without task commitment, high achievement was simply not possible. No level of ability or creativity, unaccompanied by the willingness to work at problems over time, had produced the contributions that appeared in the historical record he was drawing from.</Para>

        <ThreeRingVenn />
        <DiagramCaption title="The Three-Ring Conception of Giftedness">Renzulli's model represents giftedness as the interaction of three partially overlapping clusters of traits: above-average ability (upper left), creativity (upper right), and task commitment (bottom). No single ring constitutes giftedness. The shaded central intersection — where all three overlap — represents the interaction that research on creative-productive people had consistently identified as the prerequisite for significant contribution. The model shifted identification from a fixed threshold on a single measure to the ongoing observation of behaviourally expressed gifted behaviour across multiple dimensions. Source: Renzulli (1978). <em>Phi Delta Kappan</em>, 60(3), 180–184; ERIC EJ190430.</DiagramCaption>

        <Sidebar title="Schoolhouse Giftedness vs. Creative-Productive Giftedness">
          <p style={{ marginBottom: 10 }}>One of Renzulli's most analytically precise contributions was his distinction between two fundamentally different types of giftedness that educational systems persistently conflate.</p>
          <p style={{ marginBottom: 10 }}><strong>Schoolhouse giftedness</strong> — sometimes called lesson-learning giftedness — is the capacity measured by IQ tests and achievement assessments: the ability to acquire, retain, and apply information with high efficiency, to perform well under standardised testing conditions, and to master curriculum quickly. Students who exhibit schoolhouse giftedness are reliably identifiable, easy to serve in pull-out enrichment programmes, and tend to perform at the highest levels in conventional academic environments. They are, in Renzulli's terms, "good test-takers and lesson-learners."</p>
          <p style={{ marginBottom: 10 }}><strong>Creative-productive giftedness</strong> is the capacity to use and apply information to produce original, high-quality work in real domains. This is the giftedness of the scientist who makes a discovery, the composer who writes a work that endures, the entrepreneur who creates something that did not exist. It is characterised by intrinsic motivation toward problems (rather than toward grades), by high task commitment in areas of personal interest, and by the ability to generate novel approaches rather than optimise within existing frameworks. It is substantially harder to identify, because it often manifests as unconventional, disruptive, or unpredictable behaviour in structured classroom settings.</p>
          <p>The critical point: the two types overlap but are not identical. The highest achievers in school are not necessarily the most creatively productive across a lifetime, and the most creatively productive people are not always the highest academic achievers. A gifted education system that identifies only schoolhouse giftedness systematically fails to reach the second population.</p>
          <p style={{ marginTop: 10, fontSize: 13, color: C.warmGray }}>Source: Renzulli (1978, 2005, 2021); uconn.edu gifted centre; Springer 2020 chapter.</p>
        </Sidebar>

        <SceneBreak />

        <Para>The model was elegant and, in the context of its field, genuinely radical. But Renzulli was not primarily a theorist. He was, by training and inclination, an educational practitioner — someone whose interest in defining giftedness was inseparable from his interest in doing something about it in schools. The theoretical model became the foundation for a practical identification and programming system, developed through the 1980s with his colleague Sally Reis, that would become among the most widely implemented gifted education models in the world: the Schoolwide Enrichment Model (SEM).</Para>

        <Para>The SEM operationalised the Three-Ring model in several important ways. Instead of identifying a fixed population of "gifted children" on the basis of test scores, it identified a "talent pool" — typically 15 to 20 percent of students who demonstrated high ability or high potential across a range of indicators, including teacher nominations, performance assessments, and measures of creative thinking. Once identified, students in the talent pool received Type I enrichment experiences (general exploratory activities exposing them to topics not ordinarily covered in the regular curriculum), Type II enrichment (group training in thinking skills, research methods, and creative productivity), and Type III enrichment (individual or small-group investigations of real problems in real disciplines, using the authentic methods of professional practitioners).</Para>

        <Para>The Type III investigations represent the model's most philosophically distinctive element: the proposition that gifted students are best served not by accelerated delivery of standard curriculum but by the opportunity to work as authentic practitioners — to conduct real science, produce real art, write for real audiences, investigate real community problems — under conditions that provide genuine challenge and genuine stakes. This is where the task commitment component of the Three-Ring model finds its pedagogical expression: in environments designed to evoke the kind of deep engagement that standardised instruction rarely produces, and that no test has yet been designed to reliably predict.</Para>

        <IdentificationComparison />
        <DiagramCaption title="IQ Threshold vs. Three-Ring/SEM Identification: Equity Implications">Schematic comparison of student groups identified under traditional IQ threshold approaches versus Renzulli's Three-Ring/SEM approach. The most significant equity gains occur for low-SES students, minority students, and twice-exceptional learners — groups systematically underrepresented in IQ-threshold programmes. The SEM's talent pool of 15–20% substantially broadens access relative to the 2–5% captured by strict IQ cut-offs. Values are illustrative of documented directional trends. Sources: Renzulli (2005); Borland (2009); Reis &amp; Peters (2021).</DiagramCaption>

        <Para>The critical challenge Renzulli's model has faced from psychometrically oriented researchers concerns precisely the non-IQ components: the measurement of creativity and task commitment. If these traits cannot be reliably and validly assessed, the identification system risks introducing subjectivity, bias, and inconsistency. Teacher nominations — one of the SEM's key identification tools — are known to be influenced by halo effects, cultural expectations, and the conflation of giftedness with compliance. Creative potential, as assessed by divergent thinking tests in the Torrance tradition, has a modest and contested predictive relationship with actual creative achievement. Task commitment, the most theoretically important of the three rings, is the hardest to assess in a short identification window: it manifests over time, in response to specific domains, under conditions that may not be present in a typical school environment.</Para>

        <Para>Renzulli has addressed these critiques across a career spanning more than four decades and over 1,000 publications. His response has been consistent and essentially philosophical: the task of gifted education is not to identify a fixed trait that children possess but to develop gifted behaviours in contexts that evoke them. The Scales for Rating the Behavioral Characteristics of Superior Students (SRBCSS), developed with his colleague Linda Smith at the University of Connecticut, provide a teacher-completed observation instrument that assesses behavioural indicators across learning, creativity, motivation, and leadership domains — a deliberately behavioural rather than psychometric approach to identification. The instrument has been translated into multiple languages and used internationally, though its psychometric properties have been the subject of ongoing methodological scrutiny.</Para>

        <GiftednessTypes />
        <DiagramCaption title="Two Kinds of Giftedness: Schoolhouse vs. Creative-Productive">Schematic radar comparison of trait profiles for schoolhouse giftedness (high IQ, test performance, lesson mastery) and creative-productive giftedness (the target of the Three-Ring model). The two profiles differ most significantly on creativity and self-direction, while overlapping substantially on memory and general cognitive ability. A system that identifies only by IQ captures the yellow profile; the Three-Ring model is designed to reach the blue profile — the one most likely to produce genuine contribution. Source: Schematic; adapted from Renzulli (1978–2021).</DiagramCaption>

        <Sidebar title="The Three-Ring Model's International Reach and Contemporary Status">
          <p style={{ marginBottom: 10 }}>The Schoolwide Enrichment Model has been implemented in over 4,000 schools across the United States and has been adopted, adapted, and tested internationally in Europe, Asia, South America, and Central America. Hernandez-Torrano and Saranli's 2015 cross-cultural overview in <em>Gifted Education International</em> documented SEM implementation across culturally diverse contexts, finding that the model's core principles — broadened identification, authentic task engagement, interest-based enrichment — translated well across national and linguistic contexts, though the specific enrichment activities required cultural adaptation.</p>
          <p style={{ marginBottom: 10 }}>Reis and Peters' 2021 overview in <em>Gifted Education International</em> reviewed four decades of SEM research and found generally positive results across schools with widely differing socioeconomic levels. The research base includes studies demonstrating increased academic achievement, creative productivity, and engagement in SEM schools, though the quality of individual studies varies and few meet the stringent design criteria of current evidence-based practice standards.</p>
          <p>The most active contemporary debates in Renzulli's tradition concern: (1) the intersection of giftedness with twice-exceptionality (students who are both gifted and learning disabled), where the Three-Ring model's multidimensional identification offers particular promise; (2) the integration of the model with equity frameworks that address racial and socioeconomic disparities in gifted identification at a systemic level; and (3) the application of the creative-productive giftedness framework to talent development in domains outside the traditional academic canon.</p>
          <p style={{ marginTop: 10, fontSize: 13, color: C.warmGray }}>Sources: SEM website (gifted.uconn.edu); Hernandez-Torrano &amp; Saranli (2015) <em>Gifted Education International</em> 31(3); Reis &amp; Peters (2021) <em>Gifted Education International</em>, doi 10.1177/0261429420963987.</p>
        </Sidebar>

        <SceneBreak />

        {/* Image 2 */}
        <div style={{ margin: "40px 0 0" }}>
          <img
            src="https://education.uconn.edu/wp-content/themes/UConn-Neag/images/neag-school-header-logo.png"
            alt="University of Connecticut Neag School of Education"
            style={{ width: "100%", borderRadius: 2, maxHeight: 200, objectFit: "contain", background: "#e8eef5", padding: 24 }}
            onError={e => { e.target.style.display = 'none'; }}
          />
        </div>
        <ImgCaption label="◆ Character" text="The Renzulli Center for Creativity, Gifted Education, and Talent Development, housed at the University of Connecticut's Neag School of Education. Renzulli joined UConn in the early 1970s and built it into the leading institutional home for gifted education research in the United States, directing the National Research Center on the Gifted and Talented for over three decades." />

        <Para>The deeper provocation of Renzulli's model is not methodological but conceptual: it reframes the question "who is gifted?" as "when, and under what conditions, do people display gifted behaviour?" The first question implies a fixed category, a boundary, a population to be sorted. The second implies a developmental process, an interaction between a person's traits and the environment's demands, a phenomenon that emerges rather than exists. It is a small shift in framing, but its implications for practice are substantial. A system oriented around the second question does not ask which children to include in the gifted programme. It asks which conditions most reliably evoke the creative-productive engagement that Renzulli's three rings describe — and how to build those conditions into the educational experience of the broadest possible population of students.</Para>

        <Para>The IQ threshold is still in wide use. In the United States, identification procedures for gifted programmes vary by state and district, and many still rely primarily or exclusively on standardised cognitive ability tests. The equity consequences of this are well-documented and persistent: Black, Hispanic, and low-income students remain substantially underrepresented in gifted programmes relative to their share of the general population. Renzulli's model offers a partial solution to this, not by abandoning rigour but by expanding the definition of what rigour requires: moving from a single psychometric measure to a multi-dimensional behavioural assessment that can capture potential where the standard instruments cannot reach.</Para>

        <p style={{ fontFamily: "'Source Serif 4',serif", fontStyle: "italic", fontSize: 21, lineHeight: 1.8, color: C.black, marginBottom: "1.5em", borderLeft: `3px solid ${C.accent}`, paddingLeft: 20 }}>
          Binet, who started all of this in 1904, worried from the beginning about what his instrument would be used to do. He believed that intelligence was not fixed, that it was modifiable with the right kind of educational support, and that the purpose of assessment was to help children develop — not to sort them into permanent categories. The American psychologists who built the IQ testing industry largely ignored this. Renzulli, working nearly a century later in a Connecticut university town, spent his career trying to recover Binet's original intention: not to find the gifted but to create the conditions under which more people can become so.
        </p>

        {/* Source Integrity Note */}
        <div style={{ background: C.cream, border: `1px solid ${C.borderLight}`, borderRadius: 2, padding: "32px 32px 28px", marginTop: 64 }}>
          <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: C.black, borderBottom: `2px solid ${C.natgeoYellow}`, paddingBottom: 8, marginBottom: 18 }}>Source Integrity Note</div>
          <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 14, lineHeight: 1.7, color: C.darkGray }}>
            <p style={{ fontWeight: 700, marginBottom: 6 }}>FACTUAL INTEGRITY DISCLOSURE</p>
            <p style={{ fontWeight: 600, marginBottom: 4 }}>Verified facts (Tier 1):</p>
            <ul style={{ marginLeft: 20, marginBottom: 12 }}>
              <li>Renzulli published Three-Ring model in <em>Phi Delta Kappan</em> 1978, Vol 60(3), 180–184 (confirmed: ERIC EJ190430, Scribd, multiple academic sources)</li>
              <li>Renzulli is a professor of educational psychology at the University of Connecticut; directed the National Research Center on the Gifted and Talented; over 1,000 publications (confirmed: Scribd document summary, uconn.edu)</li>
              <li>Three rings: above-average ability, creativity, task commitment (confirmed: UConn Renzulli Centre website, Springer chapter)</li>
              <li>SEM implemented in over 4,000 US schools and internationally (confirmed: gifted.uconn.edu SEM pages)</li>
              <li>Binet developed test for Paris school system in 1904 (confirmed: general knowledge; consistent with standard history of psychology)</li>
              <li>Terman's Genetic Studies of Genius tracked 1,528 children with IQ ≥140 (general knowledge; consistent with standard references)</li>
              <li>Renzulli collaborated with Sally M. Reis on the SEM; also with Linda Smith on SRBCSS (confirmed: UConn, Scribd)</li>
              <li>Reis &amp; Peters (2021) overview in <em>Gifted Education International</em>, doi 10.1177/0261429420963987 (confirmed: SAGE Journals)</li>
              <li>Hernandez-Torrano &amp; Saranli (2015) cross-cultural SEM overview in <em>Gifted Education International</em> 31(3) (confirmed: renzullilearning.com research section)</li>
              <li>SEM talent pool targets 15–20% of students (confirmed: gifted.uconn.edu)</li>
            </ul>
            <p style={{ fontWeight: 600, marginBottom: 4 }}>Details requiring verification before publication:</p>
            <ul style={{ marginLeft: 20, marginBottom: 12 }}>
              <li>Renzulli's specific arrival date at UConn ("early 1970s") should be confirmed from official biography</li>
              <li>The "IQ flattening at ~120" claim should be traced to specific study citations rather than general attribution</li>
              <li>Terman sample size (1,528) — standard figure but should be verified against primary source</li>
            </ul>
            <p style={{ fontWeight: 600, marginBottom: 4 }}>Visual substitutions:</p>
            <ul style={{ marginLeft: 20, marginBottom: 12 }}>
              <li>Hero: SVG atmospheric three-ring illustration (appropriate conceptual visual)</li>
              <li>Image 2: UConn Neag School logo/header (fallback if photograph not available)</li>
            </ul>
            <p style={{ fontWeight: 600, marginBottom: 4 }}>Voices to add in full editorial process:</p>
            <ul style={{ marginLeft: 20 }}>
              <li>Renzulli's own direct quotes from interviews on the biographical genesis of the model</li>
              <li>Psychometric critics who question the validity of creativity and task commitment assessment</li>
              <li>Teachers implementing SEM in diverse school settings</li>
              <li>Twice-exceptional students who were missed by IQ-threshold systems and identified under broader frameworks</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `4px solid ${C.natgeoYellow}`, marginTop: 40, padding: "28px 40px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 12, color: C.warmGray, letterSpacing: 2 }}>
          National Geographic-Style Production Document &nbsp;·&nbsp; Article 6 of 6 &nbsp;·&nbsp; Renzulli's Three-Ring Conception of Giftedness
        </div>
      </div>
    </div>
  );
}
