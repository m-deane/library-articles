/* --- YAML frontmatter --- */
/*
title: "Too Much of a Good Thing"
subtitle: "For decades, psychiatry understood emotional suffering as a problem of too little control. A new therapy built on twenty-five years of clinical research is rewriting that assumption — and targeting a hidden epidemic of people who suffer not because they can't hold themselves together, but because they hold themselves together far too well."
category: "neuroscience"
style: "natgeo-sciam-hybrid"
date: "2026-04-19"
tags: [ro-dbt, overcontrol, clinical-psychology, dbt, lynch]
*/

const ARTICLE_DATA = {
  title: "Too Much of a Good Thing",
  subtitle: "For decades, psychiatry understood emotional suffering as a problem of too little control. A new therapy built on twenty-five years of clinical research is rewriting that assumption — and targeting a hidden epidemic of people who suffer not because they can't hold themselves together, but because they hold themselves together far too well.",
  category: "neuroscience",
  style: "natgeo-sciam-hybrid",
  date: "2026-04-19",
  author: "Matthew Deane",
  tags: ["ro-dbt", "overcontrol", "clinical-psychology", "dbt", "lynch"],
};

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
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
  ocBlue: "#2E5E8E",
  ucRed: "#8E2E2E",
  signalGreen: "#2E7D4F",
};

// ─── DATA VISUALISATIONS ─────────────────────────────────────────────────────

// Chart 1: OC vs UC profile comparison (Radar)
const OCvsUCRadar = () => {
  const data = [
    { trait: "Self-control", OC: 95, UC: 15 },
    { trait: "Detail focus", OC: 88, UC: 28 },
    { trait: "Risk aversion", OC: 85, UC: 18 },
    { trait: "Emotional expression", OC: 12, UC: 78 },
    { trait: "Cognitive flexibility", OC: 18, UC: 72 },
    { trait: "Social openness", OC: 15, UC: 65 },
    { trait: "Impulsivity", OC: 8, UC: 90 },
  ];
  return (
    <div style={{ background: "#0d1a26", borderRadius: 4, padding: "28px 24px 20px", marginBottom: 8 }}>
      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 700, color: C.natgeoYellow, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Overcontrol vs. Undercontrol: Phenotypic Profile</div>
      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 18 }}>Schematic trait profiles — the two ends of the inhibitory control spectrum targeted by DBT (UC) and RO-DBT (OC) respectively</div>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
          <PolarGrid stroke="rgba(255,255,255,0.12)" />
          <PolarAngleAxis dataKey="trait" tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 11, fontFamily: "'Source Sans 3'" }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9 }} />
          <Radar name="Overcontrol (OC)" dataKey="OC" stroke="#7ec8e3" fill="#7ec8e3" fillOpacity={0.25} />
          <Radar name="Undercontrol (UC)" dataKey="UC" stroke={C.natgeoYellow} fill={C.natgeoYellow} fillOpacity={0.2} />
          <Legend wrapperStyle={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontFamily: "'Source Sans 3'" }} />
          <Tooltip contentStyle={{ background: "#1a2a3a", border: "none", borderRadius: 4, color: "#fff", fontFamily: "'Source Sans 3'" }} />
        </RadarChart>
      </ResponsiveContainer>
      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 10 }}>
        Source: Schematic representation adapted from Lynch (2018). <em>Radically Open Dialectical Behavior Therapy</em>, New Harbinger; Lynch et al. (2015), <em>American Journal of Psychotherapy</em>. Values are illustrative of relative magnitude, not absolute clinical measurements.
      </div>
    </div>
  );
};

// Chart 2: RefraMED trial HRSD scores over time
const ReframedTrial = () => {
  const data = [
    { time: "Baseline", RODBT: 24.1, TAU: 23.8 },
    { time: "3 months", RODBT: 18.4, TAU: 21.6 },
    { time: "7 months\n(post-tx)", RODBT: 14.2, TAU: 19.6 },
    { time: "12 months", RODBT: 16.1, TAU: 18.9 },
    { time: "18 months", RODBT: 16.8, TAU: 18.2 },
  ];
  return (
    <div style={{ background: "#FAF8F5", border: `1px solid ${C.borderLight}`, borderRadius: 4, padding: "28px 24px 20px", marginBottom: 8 }}>
      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 700, color: C.black, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>RefraMED Trial — HRSD Scores Over 18 Months</div>
      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: C.warmGray, marginBottom: 18 }}>RO-DBT + TAU vs. TAU alone; N=250 participants across 3 UK secondary care centres (Lynch et al., 2020)</div>
      <ResponsiveContainer width="100%" height={230}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} />
          <XAxis dataKey="time" tick={{ fill: C.darkGray, fontSize: 11, fontFamily: "'Source Sans 3'" }} />
          <YAxis tick={{ fill: C.darkGray, fontSize: 11, fontFamily: "'Source Sans 3'" }} label={{ value: "HRSD score", angle: -90, position: "insideLeft", fill: C.warmGray, fontSize: 11, fontFamily: "'Source Sans 3'" }} domain={[10, 28]} />
          <Tooltip contentStyle={{ background: "#fff", border: `1px solid ${C.borderLight}`, borderRadius: 4, fontFamily: "'Source Sans 3'" }} />
          <Legend wrapperStyle={{ color: C.darkGray, fontSize: 12, fontFamily: "'Source Sans 3'" }} />
          <ReferenceLine y={17} stroke={C.warmGray} strokeDasharray="4 4" label={{ value: "Remission threshold ≈17", fill: C.warmGray, fontSize: 10, position: "right" }} />
          <Line type="monotone" dataKey="RODBT" stroke={C.ocBlue} strokeWidth={2.5} dot={{ fill: C.ocBlue, r: 5 }} name="RO-DBT + TAU" />
          <Line type="monotone" dataKey="TAU" stroke={C.warmGray} strokeWidth={2} dot={{ fill: C.warmGray, r: 4 }} name="TAU alone" strokeDasharray="5 3" />
        </LineChart>
      </ResponsiveContainer>
      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: C.warmGray, marginTop: 10 }}>
        Note: HRSD values are approximate reconstructions from published findings (Lynch et al., 2020, <em>BJPsych</em>). Post-treatment difference of 5.40 HRSD points (95% CI 0.94–9.85, p=0.02); effect not statistically significant at 12 or 18 months on primary planned analyses; Bayesian post-hoc suggests superiority throughout. Higher HRSD = more severe depression.
      </div>
    </div>
  );
};

// Chart 3: RO-DBT vs standard DBT structural comparison
const DBTComparison = () => {
  const data = [
    { dimension: "Primary target", dbt: "Emotion dysregulation", rodbt: "Emotional overcontrol" },
    { dimension: "Core problem", dbt: "Out-of-control behaviour", rodbt: "Social isolation / loneliness" },
    { dimension: "Mechanism", dbt: "Emotion regulation skills", rodbt: "Social signalling" },
    { dimension: "Skills stance", dbt: "Distress tolerance", rodbt: "Radical openness" },
    { dimension: "Prototype diagnosis", dbt: "Borderline PD", rodbt: "OCPD / TRD / AN" },
    { dimension: "Emotional direction", dbt: "Too much, too visible", rodbt: "Too little, too hidden" },
  ];
  return (
    <div style={{ background: "#0d1118", borderRadius: 4, padding: "28px 28px 24px", marginBottom: 8, overflowX: "auto" }}>
      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 700, color: C.natgeoYellow, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Standard DBT vs. RO-DBT: Structural Divergences</div>
      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 20 }}>Six dimensions on which the two treatments differ at a foundational level</div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Source Sans 3', sans-serif", fontSize: 13 }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "8px 12px", color: "rgba(255,255,255,0.5)", fontWeight: 600, fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>Dimension</th>
            <th style={{ textAlign: "left", padding: "8px 12px", color: C.natgeoYellow, fontWeight: 700, fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>Standard DBT (Linehan)</th>
            <th style={{ textAlign: "left", padding: "8px 12px", color: "#7ec8e3", fontWeight: 700, fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>RO-DBT (Lynch)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? "rgba(255,255,255,0.03)" : "transparent" }}>
              <td style={{ padding: "10px 12px", color: "rgba(255,255,255,0.5)", fontSize: 12, fontStyle: "italic" }}>{row.dimension}</td>
              <td style={{ padding: "10px 12px", color: "rgba(255,255,255,0.82)", fontSize: 13 }}>{row.dbt}</td>
              <td style={{ padding: "10px 12px", color: "rgba(255,255,255,0.82)", fontSize: 13 }}>{row.rodbt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 16 }}>
        Sources: Lynch (2018). <em>Radically Open DBT</em>, New Harbinger; Linehan (1993). <em>Cognitive-Behavioral Treatment of Borderline Personality Disorder</em>, Guilford; Lynch et al. (2015). <em>American Journal of Psychotherapy</em>; Hatoum et al. (2024). <em>Journal of Clinical Psychology</em>.
      </div>
    </div>
  );
};

// ─── HELPER COMPONENTS ────────────────────────────────────────────────────────
const DC = ({ letter, rest }) => (
  <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: 20, lineHeight: 1.75, color: C.black, marginBottom: "1.5em", marginTop: 0 }}>
    <span style={{ float: "left", fontSize: 72, lineHeight: 0.82, fontFamily: "'Playfair Display', serif", fontWeight: 900, marginRight: 8, marginTop: 6, color: C.black }}>{letter}</span>
    {rest}
  </p>
);

const SB = ({ title, children }) => (
  <div style={{ background: C.sidebarBg, border: `1px solid ${C.borderLight}`, borderRadius: 2, padding: "28px 28px 24px", margin: "36px 0", clear: "both" }}>
    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: C.black, borderBottom: `2px solid ${C.natgeoYellow}`, paddingBottom: 6, marginBottom: 14 }}>{title}</div>
    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 15, lineHeight: 1.7, color: C.darkGray }}>{children}</div>
  </div>
);

const Cap = ({ label, text }) => (
  <div style={{ marginTop: 10, marginBottom: 32 }}>
    <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: C.accent, marginRight: 8 }}>{label}</span>
    <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#6B6560", lineHeight: 1.5 }}>{text}</span>
  </div>
);

const Para = ({ children }) => (
  <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: 20, lineHeight: 1.75, color: C.black, marginBottom: "1.5em", marginTop: 0 }}
    dangerouslySetInnerHTML={{ __html: children }} />
);

const PullQuote = ({ children }) => (
  <blockquote style={{ borderLeft: `3px solid ${C.natgeoYellow}`, paddingLeft: 24, margin: "40px 0", fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 26, lineHeight: 1.45, color: C.black }}>
    {children}
  </blockquote>
);

const SceneBreak = () => (
  <div style={{ textAlign: "center", margin: "48px 0", letterSpacing: 8, fontSize: 22, color: C.accent }}>❧</div>
);

const DiagramCaption = ({ title, children }) => (
  <div style={{ marginTop: 10, marginBottom: 36 }}>
    <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: C.accent, marginRight: 8 }}>◆ Diagram</span>
    <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "#6B6560" }}><em>{title}</em> — {children}</span>
  </div>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function RadicallyOpenDBT() {
  return (
    <div style={{ background: C.offWhite, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&family=Source+Sans+3:wght@300;400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        img { display: block; width: 100%; object-fit: cover; }
      `}</style>

      {/* Mode Badge */}
      <div style={{ background: C.black, padding: "10px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: C.warmGray }}>
          MODE: Scientific American Hybrid &nbsp;|&nbsp; FORMAT: Standard Feature
        </span>
        <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 11, color: C.warmGray, letterSpacing: 1 }}>Article 3 of 6</span>
      </div>

      {/* Yellow Border Strip */}
      <div style={{ height: 4, background: C.natgeoYellow, width: "100%" }} />

      {/* Hero Sec */}
      <div style={{
        minHeight: "88vh", position: "relative", display: "flex", flexDirection: "column",
        justifyContent: "flex-end",
        background: "linear-gradient(160deg, #0d1a1a 0%, #0a1520 50%, #060d12 100%)",
        overflow: "hidden"
      }}>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.22 }} viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="heroOC" cx="55%" cy="45%" r="50%">
              <stop offset="0%" stopColor="#7ec8e3" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0a1520" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1200" height="600" fill="url(#heroOC)" />
          {/* Silhouette of solitary figure, rigidly upright */}
          <ellipse cx="550" cy="240" rx="30" ry="32" fill="rgba(255,255,255,0.12)" />
          <rect x="530" y="272" width="40" height="90" rx="4" fill="rgba(255,255,255,0.10)" />
          <line x1="530" y1="310" x2="505" y2="340" stroke="rgba(255,255,255,0.08)" strokeWidth="8" strokeLinecap="round" />
          <line x1="570" y1="310" x2="595" y2="340" stroke="rgba(255,255,255,0.08)" strokeWidth="8" strokeLinecap="round" />
          <line x1="540" y1="362" x2="530" y2="420" stroke="rgba(255,255,255,0.08)" strokeWidth="7" strokeLinecap="round" />
          <line x1="560" y1="362" x2="570" y2="420" stroke="rgba(255,255,255,0.08)" strokeWidth="7" strokeLinecap="round" />
          {/* Geometric grid suggesting rigidity / structure */}
          {[...Array(12)].map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 55} x2="1200" y2={i * 55} stroke="rgba(126,200,227,0.04)" strokeWidth="1" />
          ))}
          {[...Array(20)].map((_, i) => (
            <line key={`v${i}`} x1={i * 65} y1="0" x2={i * 65} y2="600" stroke="rgba(126,200,227,0.04)" strokeWidth="1" />
          ))}
          {/* Isolation rings */}
          <circle cx="550" cy="300" r="120" fill="none" stroke="rgba(126,200,227,0.08)" strokeWidth="1" strokeDasharray="6,8" />
          <circle cx="550" cy="300" r="200" fill="none" stroke="rgba(126,200,227,0.05)" strokeWidth="1" strokeDasharray="4,10" />
          <circle cx="550" cy="300" r="300" fill="none" stroke="rgba(126,200,227,0.03)" strokeWidth="1" strokeDasharray="3,12" />
        </svg>

        <div style={{ position: "relative", zIndex: 2, padding: "0 48px 64px", maxWidth: 900 }}>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: C.natgeoYellow, marginBottom: 20 }}>◆ Clinical Neuroscience &amp; Psychotherapy</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(36px, 5.5vw, 68px)", lineHeight: 1.05, color: "#ffffff", marginBottom: 24, maxWidth: 820 }}>
            Too Much of a Good Thing
          </h1>
          <p style={{ fontFamily: "'Source Serif 4', serif", fontStyle: "italic", fontSize: "clamp(16px, 2vw, 21px)", lineHeight: 1.6, color: "rgba(255,255,255,0.82)", maxWidth: 680, marginBottom: 36 }}>
            For decades, psychiatry understood emotional suffering as a problem of too little control. A new therapy built on twenty-five years of clinical research is rewriting that assumption — and targeting a hidden epidemic of people who suffer not because they can't hold themselves together, but because they hold themselves together far too well.
          </p>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)", letterSpacing: 1 }}>
            Illustration: SVG atmospheric composition. Hero brief: a solitary, perfectly upright figure on a bare white plain, surrounded by expanding rings of emptiness; clinical-cold light, overhead angle.
          </div>
        </div>
      </div>

      {/* Article Body */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "64px 32px 80px" }}>

        <DC
          letter="T"
          rest="he patient, by every visible measure, was doing everything right. She kept her appointments. She completed her homework. She never missed a session, never raised her voice, never cried in the room. Her self-monitoring diaries were meticulous — sometimes filling three pages where one was asked for. She had held the same demanding job for nine years. She exercised every morning at six. She was, in the vocabulary of clinical psychology, highly compliant."
        />

        <Para>She had also been severely depressed for eleven years.</Para>

        <Para>Her story — reconstructed here as representative of a clinical pattern, not a specific individual — illustrates the diagnostic blind spot that Thomas Lynch, a clinical psychologist born in 1956, spent the better part of three decades attempting to map and treat. Lynch had trained in the tradition of standard Dialectical Behaviour Therapy, the treatment developed by Marsha Linehan at the University of Washington in the late 1980s for borderline personality disorder. Linehan's DBT was built on a biosocial theory of emotion dysregulation: the idea that borderline personality disorder emerges from a constitutional vulnerability to intense emotional reactivity interacting with an invalidating environment. The treatment is structured, intensive, and skills-based, targeting what Lynch came to think of as <em>undercontrol</em> — too little inhibition, emotion spilling out unregulated, behaviour driven by feeling rather than choice.</Para>

        <Para>DBT worked for that population. It remains the gold-standard treatment for borderline personality disorder, supported by multiple randomised controlled trials across independent research sites. But as Lynch worked within the DBT tradition through the 1990s — first at Vanderbilt University and then, from 1997, as Director of the Duke Cognitive Behavioral Research and Treatment Program at Duke University — he kept encountering a different kind of patient entirely. Patients who were not dysregulated but <em>hyperregulated</em>. Not impulsive but rigid. Not too open but so closed they had calcified. Not suffering from too little self-control. Suffering, in a very real sense, from too much.</Para>

        <PullQuote>"RO-DBT is the first treatment in the world to prioritise social signalling as the primary mechanism of change." — Thomas R. Lynch</PullQuote>

        <Para>The treatment that emerged from this recognition — Radically Open Dialectical Behaviour Therapy, or RO-DBT — represents a fundamental restructuring of DBT's theoretical architecture, not merely an adaptation of its techniques. Lynch published the treatment manual in 2018 through New Harbinger/Context Press, after more than twenty-five years of translational research. By that point, he had moved to the University of Southampton in the UK, where he held a professorship in clinical psychology until his recent emeritus status, and where the flagship trial of his treatment was running. RO-DBT is now practised across the UK, Europe, and North America, applied to a range of conditions the treatment's proponents believe share an underlying architecture of maladaptive overcontrol.</Para>

        {/* IMAGE 1 — Group therapy */}
        <div style={{ margin: "40px 0 0" }}>
          <img
            src="https://www.therapytx.com/wp-content/uploads/2021/05/GroupTherapyCircle.jpg"
            alt="Group therapy skills class"
            style={{ width: "100%", borderRadius: 2, maxHeight: 400, objectFit: "cover" }}
            onError={e => { e.target.style.display = 'none'; }}
          />
        </div>
        <Cap label="◆ Establishing" text="A group skills training class — a core component of RO-DBT's dual-format structure. The RefraMED trial delivered 27 group skills classes alongside 29 individual sessions over six months. For overcontrolled patients, the group setting is not incidental but mechanistically central: it provides repeated practice in the social signalling behaviours the treatment targets." />

        <SceneBreak />

        <Para>The theoretical engine of RO-DBT is what Lynch calls the neurobiosocial theory of overcontrol. The model proposes that individuals with maladaptive overcontrol carry a biotemperamental profile characterised by heightened threat sensitivity (a nervous system that scans for danger and finds it readily), diminished reward sensitivity (a muted response to positive social cues), and an elevated capacity for detailed, systematic processing. These predispositions, the theory holds, are likely heritable — anorexia nervosa, one of the conditions RO-DBT targets, has an estimated heritability of 50–80% — and are subsequently amplified by social environments that reward performance, punish emotional expression, and treat self-control as a virtue unconditional on context.</Para>

        <Para>The consequence is a person who has learned, often with extraordinary effectiveness, to mask inner states. The flush of anxiety before a meeting — masked. The anger at a perceived slight — suppressed, sometimes for weeks, until it leaks out sideways as passive withdrawal. The longing for closeness — held at arm's length by the very competence that makes such people professionally successful and personally isolated. Overcontrolled individuals, Lynch's theory proposes, are not deficient in emotional experience. They are deficient in <em>emotional expression</em> — specifically, in the social signals by which human beings communicate care, vulnerability, and openness to connection.</Para>

        <Para>This is where RO-DBT diverges most sharply from standard DBT and from most of psychotherapy's existing toolkit. Standard DBT, and to a significant degree CBT, ACT, and mindfulness-based approaches, target the internal management of distress — tolerance, reappraisal, defusion, acceptance. The implicit model of recovery is one in which the patient becomes better at regulating their inner state. RO-DBT's model of recovery targets something different: the communicative behaviour that signals inner state to others. The mechanism of change Lynch proposes is not internal regulation but social signalling — the micro-expressions, vocal prosody, and behavioural openness through which we signal to other humans that we are safe to approach. The hypothesis, bluntly stated: you cannot think your way out of loneliness. You have to learn to be legible again.</Para>

        <OCvsUCRadar />
        <DiagramCaption title="Overcontrol vs. Undercontrol: Phenotypic Profile">Schematic radar comparison of the trait profiles associated with undercontrol (the primary target of standard DBT) and overcontrol (the primary target of RO-DBT). The two profiles are approximate mirror images across several dimensions. Overcontrolled individuals score high on self-control, detail focus, and risk aversion while scoring low on emotional expression, cognitive flexibility, and social openness. Standard psychiatric assessment tools are designed primarily to detect undercontrol — a gap that Lynch argues contributes to systematic misdiagnosis and failed treatment of overcontrolled presentations. Source: Adapted from Lynch (2018); Lynch et al. (2015).</DiagramCaption>

        <SB title="The Neurobiosocial Theory: Three Pathways to Overcontrol">
          <p style={{ marginBottom: 10 }}>Lynch's neurobiosocial model identifies three interlocking factors that produce maladaptive overcontrol:</p>
          <p style={{ marginBottom: 10 }}><strong>1. Biotemperamental predisposition.</strong> Heightened threat sensitivity — mediated by the body's threat-detection systems, including elevated activity in threat-processing neural circuits — produces a constitutional tendency to perceive ambiguous social cues as dangerous, to scan environments for potential failure, and to inhibit spontaneous behaviour in the presence of uncertainty. Diminished reward sensitivity means positive social feedback registers less intensely, making the reinforcement value of social connection feel weaker than the risk.</p>
          <p style={{ marginBottom: 10 }}><strong>2. Socially learned inhibition.</strong> Environments that reward performance and punish emotional display — high-achieving family systems, certain cultural contexts, competitive professional environments — teach overcontrolled individuals that emotional expression is a liability. The child who cries and is told not to, or whose vulnerability is met with discomfort rather than care, learns to seal the signal. Over years, this becomes automatic — the facial expression flattens at a pre-attentive level, before conscious awareness can intervene.</p>
          <p><strong>3. Self-control coping.</strong> The more overcontrolled individuals apply self-control to social situations — rehearsing interactions, scripting emotional responses, monitoring facial expressions during conversations — the more they withdraw from the spontaneity that makes connection feel real to other people. The very competence that keeps their internal world orderly becomes the barrier to the intimacy their nervous system simultaneously craves and fears.</p>
          <p style={{ marginTop: 10, fontSize: 13, color: C.warmGray }}>Source: Lynch, T.R. (2018). <em>Radically Open Dialectical Behavior Therapy</em>, pp. 41–89. New Harbinger. NCBI Bookshelf: NBK535119.</p>
        </SB>

        <SceneBreak />

        <Para>The first substantial clinical test of the treatment with anorexia nervosa came in 2013, when Lynch and colleagues at University of Southampton published results from a non-controlled inpatient trial in <em>BMC Psychiatry</em>. Forty-seven individuals diagnosed with anorexia nervosa restrictive type — mean admission body mass index of 14.43 kg/m², a figure marking severe medical risk — received an adapted RO-DBT inpatient programme over a mean treatment length of 21.7 weeks. The study was not a randomised controlled trial and offered no formal control comparison. What it did demonstrate was that RO-DBT was feasible in this population: drop-out rates of 27.7%, while significant, compared favourably with the 13–66% drop-out rates typical in adult chronic anorexia trials. Improvements in eating disorder psychopathology were observed across the group. The reconceptualisation of anorexia — not as a disorder of body image or food relationship primarily, but as a disorder of overcontrol in which rigid self-governance of nutrition is one expression of a broader profile — gave clinicians a different handle on a condition that had resisted treatment for decades.</Para>

        <Para>The flagship test came through the RefraMED trial — REFRActory depression: Mechanisms and Effectiveness of RO-DBT — a multi-centre randomised controlled trial funded by the Efficacy and Mechanism Evaluation programme, a partnership of the Medical Research Council and the National Institute for Health Research. The trial enrolled 250 adults with treatment-resistant depression across three UK secondary care centres, randomising 162 to RO-DBT plus treatment as usual (TAU) and 88 to TAU alone. RO-DBT was delivered as 29 individual therapy sessions and 27 group-based skills classes, running in parallel over approximately six months.</Para>

        <Para>The primary outcome was the Hamilton Rating Scale for Depression (HRSD), assessed by masked raters at 7, 12, and 18 months post-randomisation. After seven months — immediately post-treatment — RO-DBT had significantly reduced depressive symptoms by 5.40 HRSD points relative to TAU (95% CI 0.94–9.85, p=0.02), with a standardised mean difference of 1.03. This is a large effect by conventional standards. At twelve and eighteen months, however, the primary planned analyses were no longer statistically significant. Post-hoc Bayesian analyses suggested RO-DBT maintained superiority throughout, but the planned analyses did not confirm this.</Para>

        <ReframedTrial />
        <DiagramCaption title="RefraMED Trial: Depression Scores Over 18 Months">Hamilton Rating Scale for Depression (HRSD) scores for RO-DBT plus TAU versus TAU alone across five assessment points. The largest and most significant divergence occurs at 7 months (post-treatment), where RO-DBT produced a 5.40-point reduction relative to TAU (95% CI 0.94–9.85, p=0.02, standardised mean difference 1.03). The effect narrows subsequently — an interpretive challenge the authors attribute to the long-term nature of personality change relative to the trial's 18-month window. Higher HRSD = more severe depression. HRSD values are approximate reconstructions from published findings. Source: Lynch et al. (2020). <em>British Journal of Psychiatry</em>; NCBI Bookshelf NBK535123.</DiagramCaption>

        <Para>The trial authors interpret the attenuating effect with care. "RO-DBT does not label depression as the primary problem," the <em>British Journal of Psychiatry</em> paper notes. "Instead it targets emotional overcontrol — a maladaptive personality style known to predict the development of chronic internalising disorders such as refractory depression." Personality change, the argument runs, operates on a longer timescale than the 18-month window of most clinical trials. A treatment that targets characterological rigidity should not be expected to show its full effect within a year of completion. The authors call for longer follow-up periods in future research — a methodologically sound request that is also, inevitably, an expensive one.</Para>

        <SB title="The Five Behavioural Themes of Overcontrol">
          <p style={{ marginBottom: 10 }}>RO-DBT organises its clinical assessment around five behavioural themes that characterise maladaptive overcontrol. These are not diagnostic criteria but clinical anchors — patterns the therapist and client collaboratively identify as the mechanisms maintaining the patient's isolation:</p>
          <p style={{ marginBottom: 8 }}><strong>1. Hyper detail-focused and overly cautious behaviour</strong> — intense attention to potential errors, prolonged preparation before action, difficulty tolerating uncertainty.</p>
          <p style={{ marginBottom: 8 }}><strong>2. Rigid and rule-governed behaviour</strong> — strong adherence to internal standards, discomfort with unexpected changes, difficulty abandoning ineffective strategies when circumstances change.</p>
          <p style={{ marginBottom: 8 }}><strong>3. Inhibited and disingenuous emotional expression</strong> — a systematic gap between inner experience and outward display; the flat affect that reads as coldness to others but is experienced internally as appropriate self-management.</p>
          <p style={{ marginBottom: 8 }}><strong>4. Distant and aloof social connectedness</strong> — avoidance of vulnerability in relationships; the experience of closeness as threatening rather than rewarding.</p>
          <p><strong>5. Bitterness and envy</strong> — chronic social comparison, a sense that others navigate the world with an ease that feels inaccessible; feelings that are rarely expressed but significantly influence relational behaviour.</p>
          <p style={{ marginTop: 10, fontSize: 13, color: C.warmGray }}>Source: Lynch et al. (2015). <em>American Journal of Psychotherapy</em>, 69(2), 141–162; PMC6955577.</p>
        </SB>

        <SceneBreak />

        <Para>The deepest divergence between RO-DBT and its DBT parent is not methodological but conceptual. Standard DBT's therapeutic target — emotion dysregulation — positions the problem as an internal one: the patient's relationship with their own affective states. RO-DBT shifts the target outward. The problem, Lynch argues, is not fundamentally that overcontrolled people feel too much and cannot tolerate it — the problem is that they cannot <em>show</em> enough, and the absence of legible social signals severs them from the human connections that evolution designed to buffer precisely the distress they are experiencing.</Para>

        <Para>The treatment accordingly dedicates substantial attention to what would look eccentric in any other therapeutic tradition: the deliberate, structured practice of social signalling. Patients learn to use what RO-DBT calls "Big Three + 1" facial expressions — eyebrow wags, genuine smiles engaging the orbicularis oculi muscle around the eyes, genuine open postures — as deliberate practices of communicating openness rather than managed neutrality. They practise what Lynch calls "self-enquiry" — a stance of genuine curiosity toward one's own reactions, distinct from the self-monitoring that overcontrolled individuals have already mastered but which maintains the gap between experience and expression. The skills classes, delivered in group format over 2.5 hours weekly, are themselves a mechanism: learning to be spontaneous and vulnerable in a room of other people who find exactly that difficult.</Para>

        <DBTComparison />
        <DiagramCaption title="Standard DBT vs. RO-DBT: Structural Divergences">Six dimensions on which RO-DBT departs from its parent treatment at a foundational level. The two therapies share a dialectical philosophical framework and a commitment to skills training, but differ in their target population, primary problem conceptualisation, mechanism of change, and therapeutic posture. Crucially, the emotional direction of the problem is opposite: standard DBT addresses emotion that is too intense and too visible; RO-DBT addresses emotion that is too hidden and too tightly governed. Sources: Lynch (2018); Linehan (1993); Lynch et al. (2015); Hatoum et al. (2024).</DiagramCaption>

        <Para>A 2024 systematic review by Hatoum and colleagues in the <em>Journal of Clinical Psychology</em> summarised the existing evidence base and concluded that while RO-DBT "shows promise as a treatment for disorders of overcontrol, further research is needed." The evidence from the RefraMED trial is the most robust to date; trials for anorexia nervosa, obsessive-compulsive personality disorder, and autism spectrum disorder remain at earlier phases of development. The treatment's proponents acknowledge openly that its evidence base is thinner than standard DBT's after three decades of research — but argue that this is a function of RO-DBT's youth, not its efficacy, and point to the MRC and NIHR funding of RefraMED (totalling £2,156,220, with Lynch as Chief Investigator) as evidence of the scientific establishment's assessment of its potential.</Para>

        <Para>The harder challenge may be diagnostic. Overcontrolled individuals are, by definition, harder to spot. They present as high-functioning. They do not make crisis calls, do not arrive in emergency departments, do not disrupt clinical settings with the visible suffering that commands attention. Their pain is precisely their capacity to look fine. Identifying them requires clinicians to look past compliance — past the perfect diaries and the kept appointments and the quiet, accomplished suffering — and ask a different question: not whether this person can regulate, but whether their regulation has cost them the one thing it was supposed to protect.</Para>

        {/* IMAGE 2 */}
        <div style={{ margin: "40px 0 0" }}>
          <div style={{
            background: "linear-gradient(135deg, #0d1a1a 0%, #1a2a2a 100%)",
            borderRadius: 2, height: 320, display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", overflow: "hidden"
          }}>
            <svg viewBox="0 0 700 320" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
              {/* Face with suppressed expression — clinical representation */}
              <circle cx="350" cy="145" r="88" fill="rgba(255,255,255,0.06)" stroke="rgba(126,200,227,0.2)" strokeWidth="1" />
              {/* Neutral brow */}
              <line x1="300" y1="115" x2="330" y2="112" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="370" y1="112" x2="400" y2="115" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5" strokeLinecap="round" />
              {/* Flat eyes */}
              <ellipse cx="318" cy="135" rx="12" ry="7" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
              <ellipse cx="382" cy="135" rx="12" ry="7" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
              <circle cx="318" cy="135" r="4" fill="rgba(255,255,255,0.2)" />
              <circle cx="382" cy="135" r="4" fill="rgba(255,255,255,0.2)" />
              {/* Straight / neutral mouth */}
              <path d="M322,170 Q350,170 378,170" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" strokeLinecap="round" />
              {/* Suppressed emotional signals — dashed lines showing masked signals */}
              <path d="M295,110 Q270,90 255,70" stroke="rgba(126,200,227,0.2)" strokeWidth="1.5" fill="none" strokeDasharray="4,5" />
              <path d="M405,110 Q430,90 445,70" stroke="rgba(126,200,227,0.2)" strokeWidth="1.5" fill="none" strokeDasharray="4,5" />
              <path d="M350,233 Q350,260 350,285" stroke="rgba(126,200,227,0.2)" strokeWidth="1.5" fill="none" strokeDasharray="4,5" />
              {/* Labels */}
              <text x="100" y="72" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="'Source Sans 3', sans-serif">masked signal</text>
              <text x="450" y="72" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="'Source Sans 3', sans-serif">suppressed cue</text>
              <text x="305" y="305" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="'Source Sans 3', sans-serif">inhibited signal</text>
            </svg>
          </div>
        </div>
        <Cap label="◆ Data" text="Schematic of suppressed social signalling — the neurobiological target of RO-DBT. Overcontrolled individuals do not lack emotional experience; they lack the micro-expressive signals — eyebrow movements, vocal prosody, postural openness — that communicate that experience to others. The treatment targets this gap directly through structured social signalling practice." />

        <SceneBreak />

        {/* COSMIC KICKER */}
        <p style={{ fontFamily: "'Source Serif 4', serif", fontStyle: "italic", fontSize: 21, lineHeight: 1.8, color: C.black, marginBottom: "1.5em", borderLeft: `3px solid ${C.accent}`, paddingLeft: 20 }}>
          Marsha Linehan built DBT from the insight that some people are too flooded to function — that emotion overwhelms the capacity to act thoughtfully, and that the therapeutic task is to help the water find a channel. Thomas Lynch built RO-DBT from the mirror image: that some people have built channels so efficient, so perfectly managed, that the water never moves at all. It pools behind the wall, perfectly still, and they mistake stillness for peace. The RefraMED trial's effect at seven months — a five-point reduction in depression scores in a population that had failed both medication and psychotherapy — is not a small finding in a field accustomed to incremental gains. Whether that effect endures at eighteen months, at three years, remains an open question. What is no longer open is the question that preceded it: that there is a population of patients for whom the problem has never been too little control. And that for them, the path forward requires not learning to hold on more tightly, but the far harder thing — learning, for the first time, to let go.
        </p>

        {/* Source Integrity Note */}
        <div style={{ background: C.cream, border: `1px solid ${C.borderLight}`, borderRadius: 2, padding: "32px 32px 28px", marginTop: 64 }}>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: C.black, borderBottom: `2px solid ${C.natgeoYellow}`, paddingBottom: 8, marginBottom: 18 }}>Source Integrity Note</div>
          <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 14, lineHeight: 1.7, color: C.darkGray }}>

            <p style={{ fontWeight: 700, marginBottom: 6 }}>FACTUAL INTEGRITY DISCLOSURE</p>

            <p style={{ fontWeight: 600, marginBottom: 4 }}>Verified facts (Tier 1 — confirmed by web search):</p>
            <ul style={{ marginLeft: 20, marginBottom: 12 }}>
              <li>Thomas R. Lynch born 1956; Professor Emeritus of Clinical Psychology at University of Southampton; former Director of Duke Cognitive Behavioral Research and Treatment Program 1997–2007 (confirmed: Wikipedia, radicallyopen.net, Southampton faculty page)</li>
              <li>Lynch developed RO-DBT over 25+ years of research; treatment manual published 2018, New Harbinger/Context Press (confirmed: New Harbinger, Barnes &amp; Noble, radicallyopen.net)</li>
              <li>RefraMED trial: N=250, 162 randomised to RO-DBT, 3 UK secondary care centres, MRC/NIHR funded, £2,156,220 (confirmed: Southampton faculty page, PubMed, BJPsych, NCBI Bookshelf)</li>
              <li>Primary result: 5.40 HRSD point reduction at 7 months, 95% CI 0.94–9.85, p=0.02, SMD=1.03 (confirmed: PubMed 31317843, PMC7282863, NCBI NBK535123)</li>
              <li>Statistical significance not maintained at 12 and 18 months on primary planned analyses; Bayesian post-hoc suggests superiority (confirmed: BJPsych Cambridge Core)</li>
              <li>Lynch 2013 anorexia nervosa inpatient trial: N=47, mean BMI 14.43, mean treatment 21.7 weeks, published BMC Psychiatry (confirmed: PubMed 24199611, PMC3875355)</li>
              <li>Marsha Linehan developed DBT at University of Washington; PhD Loyola 1971; gold standard for BPD (confirmed: UW BRTC, Wikipedia, Psychiatric Times)</li>
              <li>RO-DBT described as first treatment to prioritise social signalling as primary mechanism of change (confirmed: radicallyopen.net, Psychology Tools, PMC6955577)</li>
              <li>Five behavioural themes of overcontrol (confirmed: PMC6955577, Lynch 2015 AJP)</li>
              <li>Hatoum et al. 2024 systematic review in Journal of Clinical Psychology (confirmed: Wiley Online Library)</li>
            </ul>

            <p style={{ fontWeight: 600, marginBottom: 4 }}>Composited scenes (Tier 2):</p>
            <ul style={{ marginLeft: 20, marginBottom: 12 }}>
              <li>Opening patient vignette: explicitly identified as "representative of a clinical pattern, not a specific individual." All traits described (compliance, meticulous diaries, nine-year job, chronic depression) are drawn from verified clinical descriptions of overcontrol phenotype in Lynch (2018) and RefraMED trial background material.</li>
            </ul>

            <p style={{ fontWeight: 600, marginBottom: 4 }}>Details requiring verification before publication:</p>
            <ul style={{ marginLeft: 20, marginBottom: 12 }}>
              <li>RefraMED HRSD values in Chart 2 are approximate reconstructions from published narrative — exact values require access to original data tables</li>
              <li>Anorexia nervosa heritability estimate (50–80%) is cited from general literature knowledge; specific citation should be confirmed</li>
            </ul>

            <p style={{ fontWeight: 600, marginBottom: 4 }}>Visual substitutions:</p>
            <ul style={{ marginLeft: 20, marginBottom: 12 }}>
              <li>Hero: SVG atmospheric illustration (image search returned no suitable editorial photograph for overcontrol/isolation concept)</li>
              <li>Image 2: Custom SVG schematic of suppressed social signalling (appropriate for a data/mechanism visual)</li>
            </ul>

            <p style={{ fontWeight: 600, marginBottom: 4 }}>Voices and perspectives to add in full editorial process:</p>
            <ul style={{ marginLeft: 20 }}>
              <li>Patient accounts from RefraMED participants (subject to NHS ethics approval)</li>
              <li>Independent clinical voices evaluating RefraMED's mixed long-term results</li>
              <li>RO-DBT practitioners outside Lynch's direct network</li>
              <li>Researchers working on RO-DBT for autism spectrum disorder and OCPD</li>
            </ul>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div style={{ borderTop: `4px solid ${C.natgeoYellow}`, marginTop: 40, padding: "28px 40px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: C.warmGray, letterSpacing: 2 }}>
          National Geographic-Style Production Document &nbsp;·&nbsp; Article 3 of 6 &nbsp;·&nbsp; Radically Open DBT
        </div>
      </div>
    </div>
  );
}
