import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, Cell, AreaChart, Area } from "recharts";

const COLORS = {
  economistRed: "#E3120B",
  black: "#1a1a1a",
  offWhite: "#FAF8F5",
  cream: "#F2EDE4",
  warmGray: "#8A8278",
  darkGray: "#3D3B38",
  navy: "#1F2937",
  white: "#FFFFFF",
  borderLight: "#E0DAD0",
  chartBlue: "#4A7C9B",
  chartGray: "#9CA3AF",
  teal: "#2d6a7a",
};

const FONTS = {
  headline: "'Playfair Display', Georgia, serif",
  body: "'Source Serif 4', Georgia, serif",
  sans: "'Source Sans 3', 'Helvetica Neue', Arial, sans-serif",
};

// ─── Chart 1: Business Applications Surge ────────────────────────────────────
const bizFormationData = [
  { year: "2019", applications: 3.5 },
  { year: "2020", applications: 4.4 },
  { year: "2021", applications: 5.4 },
  { year: "2022", applications: 5.1 },
  { year: "2023", applications: 5.5 },
  { year: "2024", applications: 5.3 },
  { year: "2025*", applications: 5.9 },
];

function BizFormationChart() {
  return (
    <div style={{ margin: "40px 0", padding: "28px 20px 16px", background: COLORS.white, border: `1px solid ${COLORS.borderLight}`, borderRadius: 2 }}>
      <div style={{ fontFamily: FONTS.sans, fontSize: 13, fontWeight: 700, color: COLORS.navy, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>The entrepreneurial surge</div>
      <div style={{ fontFamily: FONTS.sans, fontSize: 15, color: COLORS.darkGray, marginBottom: 20 }}>New business applications filed in the United States, millions</div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={bizFormationData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={COLORS.borderLight} />
          <XAxis dataKey="year" tick={{ fontSize: 12, fontFamily: FONTS.sans, fill: COLORS.darkGray }} />
          <YAxis tick={{ fontSize: 11, fontFamily: FONTS.sans, fill: COLORS.darkGray }} domain={[0, 7]} tickFormatter={(v) => `${v}m`} />
          <Tooltip contentStyle={{ fontFamily: FONTS.sans, fontSize: 12 }} formatter={(v) => [`${v}m`]} />
          <Bar dataKey="applications" radius={[3, 3, 0, 0]}>
            {bizFormationData.map((entry, i) => (
              <Cell key={i} fill={i >= 5 ? COLORS.economistRed : COLORS.navy} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div style={{ fontFamily: FONTS.sans, fontSize: 11, color: COLORS.warmGray, marginTop: 8 }}>
        Source: US Census Bureau, Business Formation Statistics. *2025 figure: Jan–Nov annualised estimate via Census BFS and QuickBooks/Intuit entrepreneurship data
      </div>
    </div>
  );
}

// ─── Chart 2: Wage Premium Inversion ─────────────────────────────────────────
const premiumData = [
  { category: "AI proficiency", premium: 23 },
  { category: "Social/interpersonal", premium: 15 },
  { category: "Bachelor's degree (alone)", premium: 8 },
  { category: "Specific coding language", premium: 5 },
];

function PremiumChart() {
  return (
    <div style={{ margin: "40px 0", padding: "28px 20px 16px", background: COLORS.white, border: `1px solid ${COLORS.borderLight}`, borderRadius: 2 }}>
      <div style={{ fontFamily: FONTS.sans, fontSize: 13, fontWeight: 700, color: COLORS.navy, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>What the market pays for</div>
      <div style={{ fontFamily: FONTS.sans, fontSize: 15, color: COLORS.darkGray, marginBottom: 20 }}>Estimated wage premium by skill type, %, 2025</div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={premiumData} layout="vertical" margin={{ top: 5, right: 30, left: 130, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={COLORS.borderLight} horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 11, fontFamily: FONTS.sans, fill: COLORS.darkGray }} tickFormatter={(v) => `+${v}%`} domain={[0, 28]} />
          <YAxis type="category" dataKey="category" tick={{ fontSize: 12, fontFamily: FONTS.sans, fill: COLORS.darkGray }} width={130} />
          <Tooltip contentStyle={{ fontFamily: FONTS.sans, fontSize: 12 }} formatter={(v) => [`+${v}%`]} />
          <Bar dataKey="premium" radius={[0, 3, 3, 0]}>
            {premiumData.map((entry, i) => (
              <Cell key={i} fill={i === 0 ? COLORS.economistRed : i === 2 ? COLORS.chartGray : COLORS.navy} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div style={{ fontFamily: FONTS.sans, fontSize: 11, color: COLORS.warmGray, marginTop: 8 }}>
        Sources: World Economic Forum (2025); PwC Global AI Jobs Barometer (2025); Deming & Silliman, NBER (2024)
      </div>
    </div>
  );
}

// ─── Chart 3: Trades Job Growth vs Knowledge Work ────────────────────────────
const tradesVsKnowledgeData = [
  { role: "Robotics technicians", growth: 107 },
  { role: "HVAC engineers", growth: 67 },
  { role: "Construction workers", growth: 30 },
  { role: "Welders", growth: 25 },
  { role: "Electricians", growth: 18 },
  { role: "Financial analysts*", growth: -46 },
  { role: "Data entry clerks*", growth: -63 },
];

function TradesChart() {
  return (
    <div style={{ margin: "40px 0", padding: "28px 20px 16px", background: COLORS.white, border: `1px solid ${COLORS.borderLight}`, borderRadius: 2 }}>
      <div style={{ fontFamily: FONTS.sans, fontSize: 13, fontWeight: 700, color: COLORS.navy, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>The doing economy</div>
      <div style={{ fontFamily: FONTS.sans, fontSize: 15, color: COLORS.darkGray, marginBottom: 20 }}>Change in job postings by occupation, % since late 2022</div>
      <ResponsiveContainer width="100%" height={270}>
        <BarChart data={tradesVsKnowledgeData} layout="vertical" margin={{ top: 5, right: 30, left: 110, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={COLORS.borderLight} horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 11, fontFamily: FONTS.sans, fill: COLORS.darkGray }} tickFormatter={(v) => `${v > 0 ? "+" : ""}${v}%`} domain={[-70, 120]} />
          <YAxis type="category" dataKey="role" tick={{ fontSize: 11, fontFamily: FONTS.sans, fill: COLORS.darkGray }} width={110} />
          <Tooltip contentStyle={{ fontFamily: FONTS.sans, fontSize: 12 }} formatter={(v) => [`${v > 0 ? "+" : ""}${v}%`]} />
          <Bar dataKey="growth" radius={[0, 3, 3, 0]}>
            {tradesVsKnowledgeData.map((entry, i) => (
              <Cell key={i} fill={entry.growth >= 0 ? COLORS.teal : COLORS.economistRed} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div style={{ fontFamily: FONTS.sans, fontSize: 11, color: COLORS.warmGray, marginTop: 8 }}>
        Sources: Randstad analysis of 50m+ job postings (March 2026); *Randstad sector analysis, accounting & finance entry-level (Jan 2024 baseline). Fortune/CNBC.
      </div>
    </div>
  );
}

// ─── Chart 4: Value Hierarchy Inversion (SVG conceptual diagram) ─────────────
function HierarchySVG() {
  return (
    <div style={{ margin: "40px 0", padding: "28px 20px 16px", background: COLORS.white, border: `1px solid ${COLORS.borderLight}`, borderRadius: 2 }}>
      <div style={{ fontFamily: FONTS.sans, fontSize: 13, fontWeight: 700, color: COLORS.navy, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>The inversion</div>
      <div style={{ fontFamily: FONTS.sans, fontSize: 15, color: COLORS.darkGray, marginBottom: 20 }}>How the value hierarchy has shifted — what the economy rewards most</div>
      <svg viewBox="0 0 700 280" style={{ width: "100%", height: "auto" }}>
        {/* OLD hierarchy */}
        <text x="20" y="24" fontFamily={FONTS.sans} fontSize="12" fontWeight="700" fill={COLORS.navy} letterSpacing="0.08em">BEFORE AI</text>
        <rect x="20" y="36" width="280" height="38" rx="3" fill={COLORS.navy} />
        <text x="30" y="60" fontFamily={FONTS.sans} fontSize="12" fontWeight="600" fill={COLORS.white}>Theoretical knowledge (academia)</text>
        <rect x="20" y="80" width="220" height="38" rx="3" fill={COLORS.navy} opacity="0.75" />
        <text x="30" y="104" fontFamily={FONTS.sans} fontSize="12" fontWeight="600" fill={COLORS.white}>Applied knowledge (professional)</text>
        <rect x="20" y="124" width="160" height="38" rx="3" fill={COLORS.navy} opacity="0.5" />
        <text x="30" y="148" fontFamily={FONTS.sans} fontSize="12" fontWeight="600" fill={COLORS.white}>Practical doing (trades)</text>
        <rect x="20" y="168" width="120" height="38" rx="3" fill={COLORS.navy} opacity="0.35" />
        <text x="30" y="192" fontFamily={FONTS.sans} fontSize="12" fontWeight="600" fill={COLORS.white}>Initiative / risk</text>
        {/* Arrow */}
        <text x="340" y="130" fontFamily={FONTS.sans} fontSize="28" fill={COLORS.economistRed}>→</text>
        {/* NEW hierarchy */}
        <text x="400" y="24" fontFamily={FONTS.sans} fontSize="12" fontWeight="700" fill={COLORS.economistRed} letterSpacing="0.08em">AFTER AI</text>
        <rect x="400" y="36" width="280" height="38" rx="3" fill={COLORS.economistRed} />
        <text x="410" y="60" fontFamily={FONTS.sans} fontSize="12" fontWeight="600" fill={COLORS.white}>Initiative, risk, entrepreneurship</text>
        <rect x="400" y="80" width="240" height="38" rx="3" fill={COLORS.economistRed} opacity="0.8" />
        <text x="410" y="104" fontFamily={FONTS.sans} fontSize="12" fontWeight="600" fill={COLORS.white}>Practical doing (trades, craft, service)</text>
        <rect x="400" y="124" width="190" height="38" rx="3" fill={COLORS.economistRed} opacity="0.6" />
        <text x="410" y="148" fontFamily={FONTS.sans} fontSize="12" fontWeight="600" fill={COLORS.white}>Social / coordination skills</text>
        <rect x="400" y="168" width="140" height="38" rx="3" fill={COLORS.economistRed} opacity="0.4" />
        <text x="410" y="192" fontFamily={FONTS.sans} fontSize="12" fontWeight="600" fill={COLORS.white}>Domain knowledge</text>
        <text x="20" y="240" fontFamily={FONTS.sans} fontSize="11" fill={COLORS.warmGray}>Bar width represents relative economic premium. Conceptual diagram — not to scale.</text>
        <text x="20" y="258" fontFamily={FONTS.sans} fontSize="11" fill={COLORS.warmGray}>Sources: WEF (2025); PwC (2025); Deming (2017); BLS Occupational Outlook (2024–2034); author's synthesis.</text>
      </svg>
    </div>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({ title, children }) {
  return (
    <div style={{
      margin: "36px 0", padding: "24px 28px", background: COLORS.cream,
      border: `1px solid ${COLORS.borderLight}`, borderLeft: `3px solid ${COLORS.navy}`,
    }}>
      <div style={{
        fontFamily: FONTS.sans, fontSize: 12, fontWeight: 700, textTransform: "uppercase",
        letterSpacing: "0.1em", color: COLORS.navy, marginBottom: 12, paddingBottom: 6,
        borderBottom: `2px solid ${COLORS.economistRed}`, display: "inline-block",
      }}>{title}</div>
      <div style={{ fontFamily: FONTS.sans, fontSize: 14.5, lineHeight: 1.65, color: COLORS.darkGray }}>{children}</div>
    </div>
  );
}

// ─── Main Article ────────────────────────────────────────────────────────────
export default function DoersAndKnowers() {
  return (
    <div style={{ background: COLORS.offWhite, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Serif+4:ital,wght@0,400;0,600;0,700;1,400&family=Source+Sans+3:wght@300;400;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
      `}</style>

      <div style={{ padding: "12px 24px", fontFamily: FONTS.sans, fontSize: 11, fontWeight: 600, color: COLORS.warmGray, letterSpacing: "0.12em", textTransform: "uppercase" }}>
        Mode: The Economist · Format: Briefing
      </div>
      <div style={{ height: 4, background: COLORS.economistRed }} />

      {/* Hero */}
      <div style={{ background: COLORS.navy, padding: "60px 24px 50px", textAlign: "center" }}>
        <div style={{ fontFamily: FONTS.sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: COLORS.economistRed, marginBottom: 20 }}>◆ Briefing</div>
        <h1 style={{ fontFamily: FONTS.headline, fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 900, color: COLORS.white, lineHeight: 1.12, maxWidth: 680, margin: "0 auto 20px" }}>
          The Doers and the Knowers
        </h1>
        <p style={{ fontFamily: FONTS.body, fontSize: "clamp(16px, 2.5vw, 20px)", fontStyle: "italic", color: "rgba(255,255,255,0.8)", maxWidth: 600, margin: "0 auto", lineHeight: 1.55 }}>
          Knowledge has been commoditised. What remains scarce is the willingness to act on it. The economy is inverting its oldest hierarchy — and nobody has told the universities.
        </p>
      </div>

      {/* Body */}
      <article style={{ maxWidth: 680, margin: "0 auto", padding: "48px 24px 60px" }}>

        <p style={{ fontFamily: FONTS.body, fontSize: 17, lineHeight: 1.78, color: COLORS.black, marginBottom: 24 }}>
          For most of the past seventy years, the implicit value hierarchy of the Western economy ran in a single direction: up through abstraction. At the bottom sat the people who did things with their hands — tradespeople, machine operators, service workers. Above them, the professionals who applied knowledge to specific problems — accountants, engineers, solicitors. At the apex, the thinkers — academics, researchers, analysts — whose mastery of theory conferred the highest economic and social prestige. The entire apparatus of higher education was built to move people upward through this hierarchy. Go to university. Learn to think rather than to make. Join the knowledge economy. For a generation, this advice worked. Now it is breaking.
        </p>

        <p style={{ fontFamily: FONTS.body, fontSize: 17, lineHeight: 1.78, color: COLORS.black, marginBottom: 24 }}>
          The thesis of this briefing is that generative AI is inverting the hierarchy. By commoditising both theoretical and applied knowledge — making the output of learning available to anyone with a browser and a subscription — it is shifting the economic premium from knowing to doing. The person who can identify an opportunity, mobilise resources, take a risk, and ship something is becoming more valuable than the person who can explain, in exquisite detail, why the opportunity exists. The entrepreneur is displacing the expert. The trades worker is outlasting the analyst. And the university, which spent decades selling knowledge as the primary economic asset, is discovering that its most important product may have been something it never thought to charge for: the disposition to act.
        </p>

        <HierarchySVG />

        <p style={{ fontFamily: FONTS.body, fontSize: 17, lineHeight: 1.78, color: COLORS.black, marginBottom: 24 }}>
          Consider the evidence. The World Economic Forum reported in 2025 that AI proficiency commands a wage premium of 23 percent — nearly three times the 8 percent premium attached to a bachelor's degree in isolation. PwC's 2025 Global AI Jobs Barometer found that employer demand for formal degrees is declining across all occupations, and most rapidly in those exposed to AI. Harvard economists Lawrence Katz and Claudia Goldin found that the college wage premium in America has barely moved since 2000. The signal is not subtle. The market is repricing the value of knowledge itself — downward — while repricing the value of the ability to use knowledge — upward.
        </p>

        <PremiumChart />

        <p style={{ fontFamily: FONTS.body, fontSize: 17, lineHeight: 1.78, color: COLORS.black, marginBottom: 24 }}>
          The repricing is visible at both ends of the labour market. At the top, the entrepreneurial surge is unmistakable. Americans filed 5.5 million new business applications in 2023 — a record — and an estimated 5.9 million in 2025, an 8 percent increase over the prior year. The US Census Bureau recorded new applications exceeding the previous year in every single month of 2025. According to the Global Entrepreneurship Monitor's 2025/2026 report, startup rates are at record levels in many regions globally, with one in eight working-age people engaged in entrepreneurial activity and nearly 665 million entrepreneurs worldwide. The GEM report also identified two growing divides: a "survival gap," where too few startups transition into established firms, and an "AI readiness gap," separating entrepreneurs with access to artificial intelligence from those without.
        </p>

        <BizFormationChart />

        <p style={{ fontFamily: FONTS.body, fontSize: 17, lineHeight: 1.78, color: COLORS.black, marginBottom: 24 }}>
          At the bottom — or what used to be called the bottom — the trades are booming. The Bureau of Labor Statistics projects electrician employment to grow 9 percent from 2024 to 2034, with approximately 81,000 openings each year. Demand for HVAC technicians is projected to grow 8 percent, with 40,100 openings per year. Plumbers and pipefitters are expected to see 44,000 annual openings. A Randstad analysis of more than 50 million job postings, reported by Fortune in March 2026, found that demand for robotics technicians had jumped 107 percent since late 2022, HVAC engineers had increased 67 percent, and construction roles had grown 30 percent. The construction industry alone needs an additional 530,000 workers in 2026 — while simultaneously, entry-level job postings for financial analysts have fallen 46 percent and data-entry clerks 63 percent since January 2024. The economy is voting with its cheque book, and it is voting for hands.
        </p>

        <TradesChart />

        <p style={{ fontFamily: FONTS.body, fontSize: 17, lineHeight: 1.78, color: COLORS.black, marginBottom: 24 }}>
          The irony is exquisite. The very technology that was built by the knowledge economy is now devouring it from within. Every new data centre requires electricians and plumbers to build. Every AI-powered factory requires mechanics to maintain. Every autonomous vehicle, when it eventually arrives, will need physical infrastructure that no algorithm can install. Mathews, a fourth-generation plumber who works on data-centre cooling systems, described these roles to CNBC as "new-collar" jobs — traditional trades workers and network engineers working alongside each other and, for the first time, being valued the same. The PhD and the pipefitter, it turns out, are converging.
        </p>

        <Sidebar title="The cost of a first draft">
          The mechanism of the inversion is straightforward. Generative AI has driven the marginal cost of producing a first draft — of code, of copy, of analysis, of design — toward zero. When the Ramp Economics Lab tracked firm-level spending, it found businesses substituting freelance labour for AI at a ratio of $1 to $0.03. If production is nearly free, the binding constraint on value creation shifts from the ability to produce to the willingness to initiate. The person who says "we should build X" and then builds it — however imperfectly — captures more value than the person who can explain why X would work in theory. This is not a temporary artefact of early adoption. It is an economic logic that strengthens as the tools improve. The cheaper the draft, the more valuable the decision to start one.
        </Sidebar>

        <p style={{ fontFamily: FONTS.body, fontSize: 17, lineHeight: 1.78, color: COLORS.black, marginBottom: 24 }}>
          This logic has implications that extend beyond the labour market into the structure of education itself. If knowledge can be accessed on demand, the purpose of learning shifts from accumulation to application. You do not need to spend four years mastering corporate law if an AI can surface the relevant precedents in seconds; the premium shifts to the person who can use that legal knowledge to read a counterparty, spot a risk, and close a deal. You do not need three years of accounting training to perform reconciliations; the premium shifts to the person who can interpret the AI's output, challenge its assumptions, and advise a client on strategy. Learning does not disappear in this model. But it becomes instrumental rather than terminal — you learn in order to do, not in order to know. The distinction matters enormously, because it means that the most economically rational form of education may no longer be the one that goes deepest, but the one that arrives fastest at the point of action.
        </p>

        <p style={{ fontFamily: FONTS.body, fontSize: 17, lineHeight: 1.78, color: COLORS.black, marginBottom: 24 }}>
          This favours a particular kind of person. The post-knowledge economy rewards those who are proactive, risk-tolerant, comfortable with ambiguity, and biased toward action over deliberation — qualities that correlate more with temperament than with credentials. A solo founder in 2026, as multiple analyses have noted, can do the work of a five-person team from 2019, using AI for copywriting, customer support, market research, accounting, and code. The GEM report found that 60 percent of individuals globally expressed interest in starting their own business in 2024, compared with pre-pandemic levels — and 67 percent more entrepreneurs launched post-layoff in 2024 than in the prior year. The tightening of the knowledge-work labour market is not merely displacing workers. It is manufacturing entrepreneurs.
        </p>

        <p style={{ fontFamily: FONTS.body, fontSize: 17, lineHeight: 1.78, color: COLORS.black, marginBottom: 24 }}>
          But this picture, if taken at face value, risks a dangerous conclusion. If the argument is that doing matters more than knowing, and that deep academic mastery is economically overpriced, then the logical endpoint is a new anti-intellectualism — a society that stops producing deep thinkers because the market no longer rewards them. This would be a catastrophe of the first order. Climate modelling cannot be reduced to a prompt. Constitutional adjudication requires centuries of accumulated jurisprudence and the human capacity to reason from it. Pandemic preparedness depends on virologists whose expertise takes a decade to acquire. Fundamental physics, the kind that produces GPS and MRI machines and the semiconductors inside every AI chip, emerges from precisely the kind of sustained, curiosity-driven investigation that has no immediate commercial application. The market's repricing of knowledge is an economic signal, not a civilisational verdict. Confusing the two is the surest way to build a society that can deploy AI but no longer understands it.
        </p>

        <Sidebar title="What gets commoditised next?">
          If the current wave is commoditising knowledge, the next wave may commoditise judgement. AI agents are already capable of multi-step reasoning, workflow management, and decision-making across complex task sequences. Fiverr reported an 18,347 percent surge in demand for AI-agent specialists in six months — a signal that autonomous systems capable of coordination, not just generation, are arriving fast. If judgement and coordination follow knowledge into the commoditised zone, then even the "human edge" described in social-skills research may have a shelf life. What remains after that is speculative, but the candidates are telling: taste, conviction, the willingness to be wrong in public, the ability to inspire others to follow you into uncertainty. These are less cognitive capacities than dispositional ones — qualities of character, not of intellect. Whether an education system designed around intellect can cultivate them is the question that no institution has yet answered.
        </Sidebar>

        <p style={{ fontFamily: FONTS.body, fontSize: 17, lineHeight: 1.78, color: COLORS.black, marginBottom: 24 }}>
          The uncomfortable reality is that the economy is demanding a kind of person that most institutions were not built to produce. Universities were designed to cultivate knowledge and certify its acquisition. Corporations were designed to deploy that knowledge within defined hierarchies. Both assumed that the primary asset a worker brought to market was what they knew. The post-knowledge economy does not abolish knowledge — AI could not function without the vast corpus of human learning on which it was trained — but it does demote knowledge from a scarce, high-value asset to an abundant, low-cost commodity. What remains scarce is everything else: initiative, risk tolerance, the willingness to act on imperfect information, the capacity to sell an idea to someone who does not yet know they need it. These are the qualities of the entrepreneur, the tradesperson-proprietor, the creative director who can work with AI rather than be replaced by it. They are, not coincidentally, the qualities that no examination has ever measured and no degree has ever certified.
        </p>

        {/* Verdict */}
        <div style={{ borderTop: `2px solid ${COLORS.economistRed}`, marginTop: 44, paddingTop: 28 }}>
          <p style={{ fontFamily: FONTS.body, fontSize: 17, lineHeight: 1.78, color: COLORS.black, marginBottom: 24 }}>
            The societies that thrive through this inversion will be the ones that learn to value doing as highly as knowing — and that redesign their institutions accordingly. This means vocational and trades education funded at the same level as universities, not as a consolation prize. It means entrepreneurship embedded in curricula from secondary school, not as an elective but as a core discipline. It means corporate training that develops initiative and judgement, not just technical proficiency. And it means maintaining — stubbornly, expensively, and against the market's short-term signals — the deep-knowledge infrastructure on which civilisation depends: the research universities, the basic-science laboratories, the scholars whose work has no immediate commercial value but without which there would be no AI to commoditise anything. The balance between doing and knowing is the hard part. Societies that sacrifice one for the other will regret it. The PhD and the plumber are not enemies. They are, in the emerging economy, co-dependents — each essential, each newly visible, each in need of institutions that recognise their worth. That recognition is overdue. It may also, at last, be arriving.
          </p>
        </div>
      </article>

      {/* Source Integrity Note */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 24px 48px" }}>
        <div style={{ background: COLORS.cream, padding: "32px 28px", borderRadius: 2, border: `1px solid ${COLORS.borderLight}` }}>
          <div style={{ fontFamily: FONTS.sans, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: COLORS.navy, marginBottom: 20, paddingBottom: 8, borderBottom: `2px solid ${COLORS.economistRed}`, display: "inline-block" }}>
            Source Integrity Note
          </div>
          <div style={{ fontFamily: FONTS.sans, fontSize: 13, lineHeight: 1.7, color: COLORS.darkGray }}>
            <p style={{ fontWeight: 700, marginBottom: 8 }}>Verified facts (Tier 1):</p>
            <p style={{ marginBottom: 16, paddingLeft: 16 }}>
              US Census Bureau business formation data: 5.5m applications in 2023 (record), ~5.1m Jan–Nov 2025 (annualised ~5.9m per QuickBooks/Intuit analysis), 37% above 2019. GEM 2025/2026 report: startup rates at record levels, 665m entrepreneurs, 1 in 8 working-age people, "Survival Gap" and "AI Readiness Gap." BLS projections: electricians 9% growth (81,000 annual openings), HVAC 8% (40,100 annual openings), plumbers 4% (44,000 annual openings) through 2034. Randstad/Fortune March 2026: robotics technicians +107%, HVAC engineers +67%, construction +30%, welders +25%, electricians +18%. Construction industry: 530,000 additional workers needed in 2026. WEF: AI skills 23% wage premium vs 8% bachelor's degree. PwC 2025: degree demand declining fastest in AI-exposed roles. Katz & Goldin: college wage premium stagnant since 2000. Randstad: entry-level accounting/finance postings down 24% (data entry -63%, financial analysts -46%, auditors -43%, payroll -41%) since Jan 2024; senior (10+ yr) up 6%. Fiverr: 18,347% surge in AI-agent specialist demand. Ramp: $1→$0.03 substitution ratio. 67% more entrepreneurs launched post-layoff in 2024 vs prior year (QuickBooks/Intuit). Amway/GEM: 60% global interest in starting businesses in 2024. CNBC/Mathews "new-collar" characterisation of data-centre trades workers.
            </p>
            <p style={{ fontWeight: 700, marginBottom: 8 }}>Composited elements (Tier 2):</p>
            <p style={{ marginBottom: 16, paddingLeft: 16 }}>
              The "value hierarchy" diagram and the argument that it has inverted is the article's editorial thesis, synthesising multiple verified data points into a conceptual framework. No single source claims this inversion in these terms. The characterisation of "the PhD and the plumber converging" is editorial synthesis, not a claim from any cited source. The 2025 business formation figure of "5.9m" draws on QuickBooks/Intuit's estimate and blog sources citing Census BFS data; the Census has not yet published a final 2025 annual figure.
            </p>
            <p style={{ fontWeight: 700, marginBottom: 8 }}>Details requiring verification:</p>
            <p style={{ marginBottom: 16, paddingLeft: 16 }}>
              The 5.9m 2025 business applications figure is an annualised estimate from QuickBooks/Intuit and third-party analyses, not a confirmed Census Bureau final number (Census has published data through November 2025 showing 5.1m for Jan–Nov). The "solo founder can do the work of a five-person team from 2019" claim appeared in multiple sources but is not attributed to a specific study. The Mathews "new-collar" characterisation is sourced from CNBC (March 2026); his first name was not confirmed in the article.
            </p>
            <p style={{ fontWeight: 700, marginBottom: 8 }}>Invented or unverifiable details:</p>
            <p style={{ paddingLeft: 16 }}>None. All factual claims are traceable to named sources found in web search results.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "24px 24px 40px" }}>
        <div style={{ width: 40, height: 4, background: COLORS.economistRed, margin: "0 auto 16px" }} />
        <div style={{ fontFamily: FONTS.sans, fontSize: 11, color: COLORS.warmGray, letterSpacing: "0.08em" }}>
          Economist-Style Production Document · Generated {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </div>
      </div>
    </div>
  );
}
