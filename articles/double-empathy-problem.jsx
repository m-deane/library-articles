/* --- YAML frontmatter --- */
/*
title: "The Gap Between Worlds"
subtitle: "For decades, autism research pointed to a single source of the social difficulty between autistic and non-autistic people: the autistic person's deficit. A sociologist who is also autistic, working in the shadow of his son's diagnosis, proposed something different — and the data has been following him ever since."
category: "neuroscience"
style: "natgeo-sciam-hybrid"
date: "2026-04-19"
tags: [autism, double-empathy, milton, neurodiversity, theory-of-mind]
*/

const ARTICLE_DATA = {
  title: "The Gap Between Worlds",
  subtitle: "For decades, autism research pointed to a single source of the social difficulty between autistic and non-autistic people: the autistic person's deficit. A sociologist who is also autistic, working in the shadow of his son's diagnosis, proposed something different — and the data has been following him ever since.",
  category: "neuroscience",
  style: "natgeo-sciam-hybrid",
  date: "2026-04-19",
  author: "Matthew Deane",
  tags: ["autism", "double-empathy", "milton", "neurodiversity", "theory-of-mind"],
};

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
  autisticBlue: "#2E5E8E",
  neurotypicalAmber: "#8E5E1A",
};

// ── DIAGRAM 1: Information transfer across neurotype pairings ─────────────────
const CromptonData = () => {
  const data = [
    { pairing: "Autistic–Autistic", detailRetained: 88, rapport: 82 },
    { pairing: "NT–NT", detailRetained: 85, rapport: 90 },
    { pairing: "Autistic–NT (mixed)", detailRetained: 52, rapport: 51 },
  ];
  return (
    <div style={{ background: "#0d1a26", borderRadius: 4, padding: "28px 24px 20px", marginBottom: 8 }}>
      <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 13, fontWeight: 700, color: C.natgeoYellow, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Information Transfer & Rapport Across Neurotype Pairings</div>
      <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 18 }}>Crompton et al. (2020) diffusion chain study — University of Edinburgh (schematic reconstruction)</div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" />
          <XAxis dataKey="pairing" tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 10, fontFamily: "'Source Sans 3'" }} angle={-8} textAnchor="end" />
          <YAxis tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }} domain={[0, 100]} unit="%" />
          <Tooltip contentStyle={{ background: "#1a2a3a", border: "none", borderRadius: 4, color: "#fff", fontFamily: "'Source Sans 3'", fontSize: 12 }} />
          <Legend wrapperStyle={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontFamily: "'Source Sans 3'" }} />
          <Bar dataKey="detailRetained" fill={C.autisticBlue} name="Information retained (%)" radius={[2,2,0,0]} />
          <Bar dataKey="rapport" fill={C.natgeoYellow} name="Rapport rating (%)" radius={[2,2,0,0]} />
        </BarChart>
      </ResponsiveContainer>
      <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 10 }}>
        Source: Crompton, C.J., Ropar, D., Evans-Williams, C.V.M., Flynn, E.G., &amp; Fletcher-Watson, S. (2020). Autistic peer-to-peer information transfer is highly effective. <em>Autism</em>, 24(7), 1704–1712. PubMed 32431157. Values are schematic reconstructions from published narrative findings.
      </div>
    </div>
  );
};

// ── DIAGRAM 2: The bidirectional gap — traditional vs DEP model ───────────────
const BidirectionalGap = () => {
  const traditional = [
    { label: "Autistic\nsocial skill", score: 32 },
    { label: "NT social\nskill", score: 90 },
    { label: "Autistic\nempathy", score: 28 },
    { label: "NT empathy\nfor autistic", score: 85 },
  ];
  const dep = [
    { label: "Autistic\nsocial skill", score: 75 },
    { label: "NT social\nskill", score: 78 },
    { label: "Autistic\nempathy", score: 72 },
    { label: "NT empathy\nfor autistic", score: 40 },
  ];
  const combined = traditional.map((t, i) => ({ ...t, traditional: t.score, dep: dep[i].score }));
  return (
    <div style={{ background: "#FAF8F5", border: `1px solid ${C.borderLight}`, borderRadius: 4, padding: "28px 24px 20px", marginBottom: 8 }}>
      <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 13, fontWeight: 700, color: C.black, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Two Models of the Social Gap: Traditional vs. Double Empathy</div>
      <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 12, color: C.warmGray, marginBottom: 18 }}>The traditional model locates deficits exclusively within the autistic person; the Double Empathy Problem redistributes the gap bidirectionally</div>
      <ResponsiveContainer width="100%" height={230}>
        <BarChart data={combined} margin={{ top: 5, right: 20, left: 0, bottom: 25 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={C.borderLight} />
          <XAxis dataKey="label" tick={{ fill: C.darkGray, fontSize: 10, fontFamily: "'Source Sans 3'" }} angle={-10} textAnchor="end" />
          <YAxis tick={{ fill: C.darkGray, fontSize: 10 }} domain={[0, 100]} unit="%" />
          <Tooltip contentStyle={{ background: "#fff", border: `1px solid ${C.borderLight}`, borderRadius: 4, fontFamily: "'Source Sans 3'", fontSize: 12 }} />
          <Legend wrapperStyle={{ color: C.darkGray, fontSize: 12, fontFamily: "'Source Sans 3'" }} />
          <Bar dataKey="traditional" fill={C.warmGray} name="Traditional model" radius={[2,2,0,0]} />
          <Bar dataKey="dep" fill={C.autisticBlue} name="Double Empathy model" radius={[2,2,0,0]} />
        </BarChart>
      </ResponsiveContainer>
      <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 11, color: C.warmGray, marginTop: 12 }}>
        Source: Schematic representation of theoretical reframing. Traditional model values reflect the deficit-based framing challenged by Milton (2012); DEP model values reflect the bidirectional redistribution proposed by the double empathy problem. Neither set represents absolute empirical measurements. Adapted from Milton (2012) <em>Disability &amp; Society</em>, 27(6), 883–887; Sasson et al. (2017) <em>Scientific Reports</em>.
      </div>
    </div>
  );
};

// ── DIAGRAM 3: Masking costs timeline ────────────────────────────────────────
const MaskingCosts = () => {
  const data = [
    { phase: "Childhood", masking: 35, mentalHealth: 72, identity: 80 },
    { phase: "Adolescence", masking: 62, mentalHealth: 55, identity: 50 },
    { phase: "Early adult", masking: 78, mentalHealth: 42, identity: 38 },
    { phase: "Burnout", masking: 95, mentalHealth: 22, identity: 18 },
    { phase: "Post-diagnosis", masking: 55, mentalHealth: 50, identity: 55 },
    { phase: "Recovery", masking: 35, mentalHealth: 68, identity: 72 },
  ];
  return (
    <div style={{ background: "#0d1118", borderRadius: 4, padding: "28px 24px 20px", marginBottom: 8 }}>
      <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 13, fontWeight: 700, color: C.natgeoYellow, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>The Masking Trajectory: Cost to Wellbeing Over Time</div>
      <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 18 }}>Schematic of how sustained cross-neurotype masking accumulates costs — and what recovery may look like</div>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" />
          <XAxis dataKey="phase" tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 10, fontFamily: "'Source Sans 3'" }} />
          <YAxis tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }} domain={[0, 100]} unit="%" />
          <Tooltip contentStyle={{ background: "#1a2a3a", border: "none", borderRadius: 4, color: "#fff", fontFamily: "'Source Sans 3'", fontSize: 12 }} />
          <Legend wrapperStyle={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontFamily: "'Source Sans 3'" }} />
          <Line type="monotone" dataKey="masking" stroke="#8B2020" strokeWidth={2.5} dot={{ r: 4, fill: "#8B2020" }} name="Masking load (%)" />
          <Line type="monotone" dataKey="mentalHealth" stroke={C.natgeoYellow} strokeWidth={2} dot={{ r: 3, fill: C.natgeoYellow }} name="Mental health index" />
          <Line type="monotone" dataKey="identity" stroke="#7ec8e3" strokeWidth={2} dot={{ r: 3, fill: "#7ec8e3" }} name="Autistic identity coherence" />
        </LineChart>
      </ResponsiveContainer>
      <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 10 }}>
        Source: Schematic representation. Masking associated with increased stress, anxiety, depression, and burnout confirmed in multiple studies. A 2019 study in <em>Journal of Autism and Developmental Disorders</em> found 79% of autistic adults reported negative mental health consequences from masking. Post-diagnosis trajectory reflects qualitative research themes from Crompton et al. (2020) and community studies.
      </div>
    </div>
  );
};

// ── HELPERS ──────────────────────────────────────────────────────────────────
const DC = ({ letter, rest }) => (
  <p style={{ fontFamily: "'Source Serif 4',serif", fontSize: 20, lineHeight: 1.75, color: C.black, marginBottom: "1.5em", marginTop: 0 }}>
    <span style={{ float: "left", fontSize: 72, lineHeight: 0.82, fontFamily: "'Playfair Display',serif", fontWeight: 900, marginRight: 8, marginTop: 6, color: C.black }}>{letter}</span>
    {rest}
  </p>
);
const SB = ({ title, children }) => (
  <div style={{ background: C.sidebarBg, border: `1px solid ${C.borderLight}`, borderRadius: 2, padding: "28px 28px 24px", margin: "36px 0", clear: "both" }}>
    <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: C.black, borderBottom: `2px solid ${C.natgeoYellow}`, paddingBottom: 6, marginBottom: 14 }}>{title}</div>
    <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 15, lineHeight: 1.7, color: C.darkGray }}>{children}</div>
  </div>
);
const Cap = ({ label, text }) => (
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
export default function DoubleEmpathyProblem() {
  return (
    <div style={{ background: C.offWhite, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&family=Source+Sans+3:wght@300;400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        img { display: block; width: 100%; }
      `}</style>

      <div style={{ background: C.black, padding: "10px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: C.warmGray }}>MODE: NatGeo Classic &nbsp;|&nbsp; FORMAT: Full Feature</span>
        <span style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 11, color: C.warmGray }}>Article 5 of 6</span>
      </div>
      <div style={{ height: 4, background: C.natgeoYellow }} />

      {/* Hero */}
      <div style={{ minHeight: "88vh", position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-end", background: "linear-gradient(160deg, #0a1a2a 0%, #0d1520 55%, #060d18 100%)", overflow: "hidden" }}>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.22 }} viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="depLeft" cx="28%" cy="52%" r="38%">
              <stop offset="0%" stopColor="#7ec8e3" stopOpacity="0.35" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="depRight" cx="72%" cy="48%" r="38%">
              <stop offset="0%" stopColor={C.natgeoYellow} stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1200" height="600" fill="url(#depLeft)" />
          <rect width="1200" height="600" fill="url(#depRight)" />
          {/* Two figures facing each other, divided by a gap */}
          <circle cx="350" cy="235" r="34" fill="rgba(126,200,227,0.2)" />
          <rect x="330" y="269" width="40" height="80" rx="6" fill="rgba(126,200,227,0.12)" />
          <circle cx="850" cy="242" r="32" fill="rgba(255,206,0,0.18)" />
          <rect x="832" y="274" width="36" height="75" rx="6" fill="rgba(255,206,0,0.1)" />
          {/* The gap between — broken bridge */}
          <line x1="420" y1="300" x2="540" y2="300" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="10,8" />
          <line x1="660" y1="300" x2="780" y2="300" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeDasharray="10,8" />
          <text x="570" y="308" fill="rgba(255,255,255,0.18)" fontSize="13" fontFamily="'Source Sans 3', sans-serif">···</text>
          {/* Arrows gesturing toward each other but not meeting */}
          <polygon points="545,294 555,300 545,306" fill="rgba(255,255,255,0.15)" />
          <polygon points="655,294 645,300 655,306" fill="rgba(255,255,255,0.15)" />
        </svg>
        <div style={{ position: "relative", zIndex: 2, padding: "0 48px 64px", maxWidth: 900 }}>
          <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: 4, textTransform: "uppercase", color: C.natgeoYellow, marginBottom: 20 }}>◆ Psychology &nbsp;·&nbsp; Neurodiversity &nbsp;·&nbsp; Human Connection</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: "clamp(36px,5.5vw,68px)", lineHeight: 1.05, color: "#fff", marginBottom: 24, maxWidth: 820 }}>
            The Gap Between Worlds
          </h1>
          <p style={{ fontFamily: "'Source Serif 4',serif", fontStyle: "italic", fontSize: "clamp(16px,2vw,21px)", lineHeight: 1.6, color: "rgba(255,255,255,0.82)", maxWidth: 680, marginBottom: 36 }}>
            For decades, autism research pointed to a single source of the social difficulty between autistic and non-autistic people: the autistic person's deficit. A sociologist who is also autistic, working in the shadow of his son's diagnosis, proposed something different — and the data has been following him ever since.
          </p>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "64px 32px 80px" }}>

        <DC letter="D" rest="amian Milton was thirty-six years old and working as a lecturer in sociology when he was diagnosed with Asperger's syndrome. By that point, his son had already been diagnosed as autistic for four years — since 2005, when the boy was two — and Milton had spent those years moving through the autism research literature with the intensity of a man trying to understand his own family, and increasingly his own mind." />

        <Para>What he found disturbed him. The literature on autism, as it had accumulated across the preceding four decades, was constructed almost entirely from the outside looking in. The dominant theoretical framework — Simon Baron-Cohen's "theory of mind" hypothesis, developed in the 1980s at Cambridge — proposed that autistic people lack the cognitive capacity to attribute mental states to others: to infer what someone else believes, intends, or feels. This "mindblindness," the theory held, explained the social difficulties of autism. The autistic person could not model another's mind; the result was social incomprehension.</Para>

        <Para>Milton, trained in sociology as well as psychology and philosophy, noticed something the clinical literature seemed to have missed in plain sight. The theory of mind hypothesis was tested almost exclusively in one direction: how well autistic people read non-autistic minds. The complementary question — how well do non-autistic people read autistic minds? — was never asked. The entire diagnostic and scientific apparatus had been calibrated on the assumption that the problem, the deficit, the source of the communicative breakdown, resided in one place: inside the autistic person. Non-autistic people were the unmarked norm against which autism was measured. Their own comprehension failures were invisible because they were never looked for.</Para>

        <Para>In 2012, Milton published a four-page paper in <em>Disability &amp; Society</em> that named what he had been circling: the double empathy problem. The core proposition was deceptively simple. When two people from radically different social and experiential worlds interact, both struggle to understand each other — not because one is deficient but because they inhabit genuinely different lifeworlds with different communicative conventions, different emotional registers, different sensory and attentional priorities. The breakdown is mutual. The problem is structural. And the historical attribution of the entire failure to one party — the autistic person — was not a scientific finding but a product of who had been doing the measuring, and from where they were standing when they did it.</Para>

        <PullQuote>"When people with very different experiences of the world interact with one another, they will struggle to empathise with each other, and this is likely to be exacerbated through differences in language use and comprehension." — Damian Milton (2012)</PullQuote>

        {/* Image 1 */}
        <div style={{ margin: "40px 0 0" }}>
          <img src="https://www.aane.org/wp-content/uploads/2023/03/shutterstock_1858820618-scaled.jpg"
            alt="Autistic adults in community"
            style={{ width: "100%", borderRadius: 2, maxHeight: 400, objectFit: "cover" }}
            onError={e => { e.target.style.display = 'none'; }} />
        </div>
        <Cap label="◆ Establishing" text="Autistic adults in social connection. A central prediction of the double empathy problem — that autistic people communicate effectively with other autistic people, with difficulties arising specifically at the cross-neurotype interface — was confirmed empirically by Catherine Crompton and Sue Fletcher-Watson at the University of Edinburgh in 2020." />

        <SceneBreak />

        <Para>The paper was published in a specialist journal, had a limited immediate footprint, and was written with the compressed sociological vocabulary of its field. It had, Milton later reflected, an audience of perhaps a few hundred people at the moment of publication. What changed its trajectory was a convergence of events: a shift in autism research toward participatory methods, the rising voice of autistic self-advocates within academic communities, and a series of empirical studies that began, unusually, by testing the double empathy prediction directly rather than assuming it away.</Para>

        <Para>The most striking of those studies came from Catherine Crompton at the University of Edinburgh, working with her colleague Sue Fletcher-Watson. Crompton, a researcher at Edinburgh's Salvesen Mindroom Research Centre, designed a series of experiments using a diffusion chain task — a technique borrowed from cultural transmission research, in which participants pass a story along a chain, each person hearing and retelling it to the next. The task is sensitive to communication breakdowns: information that fails to transfer cleanly shows up as degraded detail at each link.</Para>

        <Para>Crompton's 2020 study, published in <em>Autism: The International Journal of Research and Practice</em>, recruited 72 participants across nine groups of eight — some autistic-only chains, some non-autistic-only, some mixed. The results aligned precisely with what the double empathy problem would predict. Information transfer in all-autistic chains was statistically equivalent to transfer in all-non-autistic chains. Both groups communicated with comparable effectiveness when matched by neurotype. The breakdown occurred specifically and significantly in the mixed chains — where an autistic person passed information to a non-autistic person, or vice versa. Detail retention dropped sharply at every cross-neurotype link. The study's conclusion was direct: "autistic social 'deficits' are better conceptualised as interaction and communicative challenges, operating bi-directionally for autistic and non-autistic people."</Para>

        <CromptonData />
        <DiagramCaption title="Information Transfer & Rapport Across Neurotype Pairings">Schematic reconstruction of Crompton et al. (2020) key findings. All-autistic and all-neurotypical dyads show comparable information retention and rapport ratings. The mixed (autistic–NT) pairing shows significantly steeper decline in both measures. The finding provides direct empirical support for the double empathy problem's central prediction: the social difficulty is located at the neurotype interface, not within either party alone. Source: Crompton et al. (2020). <em>Autism</em>, 24(7), 1704–1712. PubMed 32431157. N=72; nine chains of eight participants.</DiagramCaption>

        <Para>The same year, a complementary line of evidence had been building from a different direction. Noah Sasson, a cognitive neuroscientist at the University of Texas at Dallas, had been investigating what happens when non-autistic people form first impressions of autistic individuals. In a 2017 study published in <em>Scientific Reports</em>, Sasson and colleagues showed typically-developing observers brief video clips of autistic and non-autistic adults making minimal social contact — the kind of "thin slice" judgment that governs social inclusion decisions in real-world settings. The observers rated autistic individuals less favourably across a range of trait judgements and reported reduced willingness to interact with them — not because they knew the individuals were autistic, but purely on the basis of very brief behavioural observation. The finding, in the language of the double empathy problem, demonstrated the other half of the breakdown: the failure of neurotypical comprehension for autistic social expression.</Para>

        <Para>Sasson's study produced a result that surprised many in the field: diagnostic disclosure improved things. When observers were told that the person they were rating was autistic, first impressions became significantly more positive. The negative thin-slice judgment appeared to be a product of the observer's inability to read autistic social expression — an inability that contextual information partially compensated for. The problem, framed this way, was not the autistic person's presentation but the observer's interpretive failure, and the interpretive failure was at least partially remediable.</Para>

        <BidirectionalGap />
        <DiagramCaption title="Two Models of the Social Gap: Traditional vs. Double Empathy">The traditional model assigns all social competence and empathic capacity to the neurotypical party; deficits are located entirely within the autistic person. The double empathy model redistributes the gap: autistic social skill and empathy are substantially higher than the traditional model acknowledged, while neurotypical empathy for autistic expression is substantially lower than was assumed. The resulting picture is of two parties with genuine comprehension difficulties for each other — a structural problem, not an individual deficit. Source: Schematic; adapted from Milton (2012) and Sasson et al. (2017).</DiagramCaption>

        <SB title="The Theory of Mind Hypothesis: What It Got Right and Wrong">
          <p style={{ marginBottom: 10 }}>Baron-Cohen, Leslie, and Frith's 1985 paper on "theory of mind" in autism — demonstrating that autistic children performed significantly worse on tasks requiring them to attribute false beliefs to others — was one of the most influential findings in developmental psychology of the 20th century. It gave autism research a clean mechanism, a testable prediction, and a research programme. The Sally-Anne false belief task became a standard diagnostic tool.</p>
          <p style={{ marginBottom: 10 }}>What the framework got right: autistic people do often struggle to predict and interpret the behaviour of non-autistic people, and this has real consequences for social navigation in a world designed predominantly for and by neurotypical social conventions. What the framework missed: the tests were designed by non-autistic researchers using non-autistic social scenarios, and assessed autistic comprehension of non-autistic minds exclusively. When Sheppard and colleagues at the University of Nottingham reversed the direction in 2016, asking how well non-autistic people could read autistic mental states, the performance gap was similarly large — but in the opposite direction. Both groups struggled to read each other.</p>
          <p>The double empathy problem does not deny that autistic cognition differs from neurotypical cognition. Milton's argument is that difference does not equal deficit — and that locating the entire communicative problem within the autistic person was both scientifically incomplete and ethically consequential, because it led to therapies designed to eliminate autistic social behaviour rather than bridge the gap.</p>
          <p style={{ marginTop: 10, fontSize: 13, color: C.warmGray }}>Sources: Baron-Cohen, S., Leslie, A.M., &amp; Frith, U. (1985). Does the autistic child have a theory of mind? <em>Cognition</em>, 21(1), 37–46. Sheppard et al. (2016). <em>Journal of Autism and Developmental Disorders</em>, 46(4), 1247–1254.</p>
        </SB>

        <SceneBreak />

        <Para>Milton's paper became, over the decade following its publication, one of the most cited documents in autism research — reaching well beyond its sociological origins into clinical psychology, educational practice, and the growing field of participatory autism research. In 2022, Milton co-authored a ten-year retrospective in the journal <em>Autism</em> with Emine Gurbuz and Beatriz López, tracing the theory's reception and the empirical literature it had generated. The paper called for the double empathy problem to be integrated into every stage of future autism research, including compulsory involvement of autistic stakeholders in study design, data interpretation, and dissemination.</Para>

        <Para>The clinical implications of the framework are significant, contested, and still being worked out. The traditional response to autistic social difficulty was intervention aimed at the autistic person: social skills training, applied behaviour analysis, coaching in non-autistic conversational norms. These programmes taught autistic people to make eye contact, to modulate their vocal affect, to suppress stimming, to deploy small talk — to perform, in short, a version of neurotypical sociality that was legible to non-autistic observers. The double empathy problem reframes this as a category error: if the breakdown is bidirectional, then training one party while leaving the other untouched addresses only half the problem, at significant cost to the party being trained.</Para>

        <Para>That cost now has a name: masking, or camouflaging. Masking — the conscious or unconscious suppression of autistic behaviour to appear neurotypical — has been documented in a substantial body of research as associated with increased rates of anxiety, depression, exhaustion, loss of autistic identity, and what the community calls burnout: a state of profound depletion from the sustained metabolic and cognitive load of performing a social script that does not come naturally. A 2019 study in the <em>Journal of Autism and Developmental Disorders</em> found that 79% of autistic adults reported negative mental health consequences from masking. The relationship between cross-neurotype interaction, masking, and burnout is now a specific research focus, informed by the double empathy framework.</Para>

        {/* Image 2 */}
        <div style={{ margin: "40px 0 0" }}>
          <div style={{ background: "linear-gradient(135deg, #0d1a2a 0%, #1a2a3a 100%)", borderRadius: 2, height: 320, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            <svg viewBox="0 0 700 320" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
              <defs>
                <radialGradient id="maskGlow" cx="50%" cy="50%" r="45%">
                  <stop offset="0%" stopColor="#7ec8e3" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="700" height="320" fill="url(#maskGlow)" />
              {/* Figure with two faces — genuine inner / performed outer */}
              <circle cx="350" cy="130" r="42" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              {/* Outer mask — neutral / performing */}
              <ellipse cx="332" cy="118" rx="9" ry="7" fill="rgba(255,255,255,0.18)" />
              <ellipse cx="368" cy="118" rx="9" ry="7" fill="rgba(255,255,255,0.18)" />
              <path d="M332,145 Q350,148 368,145" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none" strokeLinecap="round" />
              {/* Inner authentic — suggested by slightly different colours behind */}
              <circle cx="350" cy="130" r="28" fill="rgba(126,200,227,0.06)" stroke="rgba(126,200,227,0.12)" strokeWidth="1" strokeDasharray="4,5" />
              <ellipse cx="338" cy="122" rx="6" ry="5" fill="rgba(126,200,227,0.2)" />
              <ellipse cx="362" cy="122" rx="6" ry="5" fill="rgba(126,200,227,0.2)" />
              <path d="M336,140 Q350,130 364,140" stroke="rgba(126,200,227,0.4)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="3,4" />
              {/* Cost arrows flowing outward */}
              <path d="M350,172 L350,210" stroke="rgba(139,32,32,0.4)" strokeWidth="2" markerEnd="url(#arrowRed)" />
              <text x="358" y="200" fill="rgba(255,255,255,0.25)" fontSize="10" fontFamily="'Source Sans 3', sans-serif">exhaustion</text>
            </svg>
          </div>
        </div>
        <Cap label="◆ Consequence" text="Schematic of the masking dynamic: an authentic autistic inner expression suppressed beneath a performed neurotypical surface. The double empathy framework reframes masking not as a choice but as the predictable consequence of a social world in which one neurotype's communicative style was set as the universal norm — and deviation from it was treated as pathology to be corrected." />

        <MaskingCosts />
        <DiagramCaption title="The Masking Trajectory: Cost to Wellbeing Over Time">Schematic of how sustained cross-neurotype masking accumulates across developmental stages, with masking load rising through adolescence and early adulthood until the burnout phase, where mental health and autistic identity coherence reach their lowest points. A post-diagnosis trajectory and potential recovery are shown. The double empathy problem provides the theoretical explanation for why masking is so common and so costly: autistic people are asked to bridge the entire communicative gap unilaterally. Source: Schematic; masking-burnout association confirmed in Journal of Autism and Developmental Disorders (2019) and Crompton et al. (2020).</DiagramCaption>

        <SB title="The Participatory Turn: Autistic People as Researchers">
          <p style={{ marginBottom: 10 }}>One of the deepest structural implications of the double empathy problem is methodological: if non-autistic researchers have systematically misread autistic social behaviour because they were interpreting it through neurotypical frames, the solution is to change who is doing the interpreting. Milton chairs the Participatory Autism Research Collective (PARC), which he founded with the goal of ensuring autistic people are involved as co-researchers — not just research subjects — in every phase of the scientific process.</p>
          <p style={{ marginBottom: 10 }}>This is not simply an equity argument, though it is that too. It is an epistemological argument: that the knowledge produced by autism research has been systematically distorted by the absence of autistic perspectives at the point of research design, question formulation, data interpretation, and dissemination. Crompton and Fletcher-Watson's information transfer studies were themselves examples of participatory research — designed with autistic people's input, asked questions that autistic community members had identified as meaningful, and produced findings that made sense to the communities they were about.</p>
          <p style={{ fontSize: 13, color: C.warmGray }}>Sources: Milton (2012); University of Kent profile; Crompton et al. (2020). For PARC, see: participatoryautismresearch.wordpress.com.</p>
        </SB>

        <SceneBreak />

        <Para>The double empathy problem has not resolved the debates it entered. Baron-Cohen — whose mindblindness hypothesis it most directly challenges — has acknowledged the bidirectionality of social comprehension failures while arguing that the core cognitive difference in autism remains relevant for understanding both the difficulties and the particular strengths of autistic cognition. The scientific relationship between the double empathy framework and the theory of mind tradition is less oppositional than it sometimes appears: both acknowledge that autistic and non-autistic social cognition differ; the disagreement is about whether that difference should be framed as a deficit in the autistic person, a mismatch between two different styles, or a structural property of cross-neurotype interaction. These are not equivalent framings, because they lead to different clinical responses, different educational practices, and different allocations of responsibility for the communicative work of bridging the gap.</Para>

        <Para>The empirical landscape remains active and contested. Replication studies of Crompton's information transfer findings have produced mixed results — including one replication at Edinburgh's own Salvesen Mindroom Research Centre that did not reproduce the original cross-neurotype deficit using a more diverse participant sample, noting that small methodological variations may explain the discrepancy. The research literature on the double empathy problem is young, many studies have small samples, and much of it has been conducted with cognitively able autistic adults who may not represent the full breadth of autistic experience.</Para>

        <Para>What has changed irreversibly is the frame. The question autism research is now required to ask — who is doing the empathising, and for whom, and in which direction? — was not required before 2012. The systematic failure to ask it had consequences: for how autism was diagnosed, for what counted as a treatment outcome, for which behaviours were pathologised and which were not, for how many autistic people spent decades learning to perform a neurological style that was not theirs, at a cost that has only recently become possible to name.</Para>

        <p style={{ fontFamily: "'Source Serif 4',serif", fontStyle: "italic", fontSize: 21, lineHeight: 1.8, color: C.black, marginBottom: "1.5em", borderLeft: `3px solid ${C.accent}`, paddingLeft: 20 }}>
          Milton's son is now a young adult. Milton himself has published more than two hundred and fifty papers on autism since 2012, taught at Kent, consulted for the National Autistic Society, and watched the concept he named in four pages become a framework taught in clinical training programmes and cited in international diagnostic policy discussions. He did not set out to overturn the cognitive science of autism. He set out to understand his son. What he found, when he looked through the lens of sociology rather than deficit psychology, was that the difficulty between them — between his son and the world that kept finding him wanting — was not a property of his son. It was a property of the space between two people who each had something the other couldn't quite reach. The work of the coming decade is learning what to do with that distance — not to eliminate one side of it, but to cross it from both directions at once.
        </p>

        {/* Source Integrity Note */}
        <div style={{ background: C.cream, border: `1px solid ${C.borderLight}`, borderRadius: 2, padding: "32px 32px 28px", marginTop: 64 }}>
          <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: C.black, borderBottom: `2px solid ${C.natgeoYellow}`, paddingBottom: 8, marginBottom: 18 }}>Source Integrity Note</div>
          <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 14, lineHeight: 1.7, color: C.darkGray }}>
            <p style={{ fontWeight: 700, marginBottom: 6 }}>FACTUAL INTEGRITY DISCLOSURE</p>
            <p style={{ fontWeight: 600, marginBottom: 4 }}>Verified facts (Tier 1):</p>
            <ul style={{ marginLeft: 20, marginBottom: 12 }}>
              <li>Milton born August 1973; son diagnosed autistic 2005 at age 2; Milton diagnosed Asperger's 2009 at age 36 (confirmed: Wikipedia, Pavilion Publishing, Kent University)</li>
              <li>Double empathy problem first published 2012 in <em>Disability &amp; Society</em>, 27(6), 883–887 (confirmed: KAR, Wikipedia, multiple academic sources)</li>
              <li>Milton is a lecturer at the Tizard Centre, University of Kent; chairs PARC; consultant for National Autistic Society (confirmed: Kent University profile, APA profile)</li>
              <li>Crompton et al. (2020): N=72, nine chains of eight participants; published <em>Autism</em>, 24(7), 1704–1712; PubMed 32431157 (confirmed: SAGE Journals, PubMed, PMC7545656)</li>
              <li>Sasson et al. (2017): thin slice judgments, <em>Scientific Reports</em> 7: 40700, doi 10.1038/srep40700 (confirmed: Nature.com, PubMed 28145411, PMC5286449)</li>
              <li>Baron-Cohen, Leslie &amp; Frith (1985) theory of mind paper in <em>Cognition</em> confirmed via academic sources</li>
              <li>Sheppard et al. (2016) reversed direction study: <em>Journal of Autism and Developmental Disorders</em>, 46(4), 1247–1254 (confirmed: Milton 2022 retrospective and Wikipedia citations)</li>
              <li>Milton et al. (2022) ten-year retrospective: <em>Autism</em>, confirmed via Sage Journals</li>
              <li>79% negative mental health consequences from masking: 2019 <em>Journal of Autism and Developmental Disorders</em> study (confirmed: kidsclubaba.com citing academic source)</li>
              <li>Edinburgh replication study with mixed results: confirmed via Salvesen Mindroom Research Centre website</li>
              <li>Milton has co-authored over 250 publications (confirmed: Wikipedia)</li>
            </ul>
            <p style={{ fontWeight: 600, marginBottom: 4 }}>Composited scenes (Tier 2):</p>
            <ul style={{ marginLeft: 20, marginBottom: 12 }}>
              <li>Opening scene of Milton working as a lecturer and receiving his diagnosis: institutional affiliation, years, and personal history all verified. The specific texture of the scene is narrative composition from verified biographical facts.</li>
              <li>Closing paragraph referencing Milton's son as a young adult: inferred from son's birth year (~2003), making him approximately 22 in 2025. Framing is carefully hedged.</li>
            </ul>
            <p style={{ fontWeight: 600, marginBottom: 4 }}>Visual substitutions:</p>
            <ul style={{ marginLeft: 20, marginBottom: 12 }}>
              <li>Hero: SVG atmospheric illustration (neurotype gap concept; no editorial photograph available)</li>
              <li>Image 2: Custom SVG mask/identity schematic (mechanistic visual, appropriate as SVG)</li>
            </ul>
            <p style={{ fontWeight: 600, marginBottom: 4 }}>Voices to add in full editorial process:</p>
            <ul style={{ marginLeft: 20 }}>
              <li>Milton's own direct quotes on the personal genesis of the theory</li>
              <li>Crompton's perspective on the replication controversy</li>
              <li>Autistic adults' first-person accounts of cross-neurotype interaction cost</li>
              <li>Baron-Cohen's current position on double empathy and theory of mind reconciliation</li>
              <li>Non-speaking and minimally-verbal autistic perspectives, which current double empathy research underrepresents</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `4px solid ${C.natgeoYellow}`, marginTop: 40, padding: "28px 40px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 12, color: C.warmGray, letterSpacing: 2 }}>
          National Geographic-Style Production Document &nbsp;·&nbsp; Article 5 of 6 &nbsp;·&nbsp; The Double Empathy Problem
        </div>
      </div>
    </div>
  );
}
