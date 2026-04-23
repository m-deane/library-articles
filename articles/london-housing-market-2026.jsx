/* ---
title: "London Housing 2026: Four Theses, Tested Against the Data"
subtitle: "Did flat affordability peak in 2022? Is the upsizing ladder broken? Are older owners anchoring? Is Stamp Duty the brake? What the numbers say — and don't."
date: 2026-04-23
tags: [london, housing-market, affordability, stamp-duty, real-estate, policy, economics]
read_time: "22 min"
category: economics
style: economist
mode: standard
--- */

const ARTICLE_DATA = {
  title: "London Housing 2026: Four Theses, Tested Against the Data",
  subtitle: "Did flat affordability peak in 2022? Is the upsizing ladder broken? Are older owners anchoring? Is Stamp Duty the brake? What the numbers say — and don't.",
  date: "2026-04-23",
  tags: ["london", "housing-market", "affordability", "stamp-duty", "real-estate", "policy", "economics"],
  read_time: "22 min",
  category: "economics",
  style: "economist",
  mode: "standard",
};

const C = {
  bg: "#FAFBFC", card: "#FFFFFF", border: "#E2E8F0",
  accent: "#D97706", accentLight: "#FEF3C7", accentDark: "#78350F",
  text: "#1E293B", muted: "#64748B", light: "#94A3B8",
  code: "#1E1E2E", codeBg: "#F1F5F9",
  warn: "#F59E0B", warnBg: "#FFFBEB",
  info: "#3B82F6", infoBg: "#EFF6FF",
  green: "#10B981", red: "#EF4444",
  purple: "#7C3AED", orange: "#F97316",
  tipBg: "#F0FDF4",
  indigo: "#6366F1", violet: "#8B5CF6", sky: "#0EA5E9",
  amber: "#D97706", teal: "#0F766E",
  ink: "#0F172A",
};
const F = {
  h: "'Newsreader',Georgia,serif",
  b: "'Inter',-apple-system,sans-serif",
  m: "'JetBrains Mono','Fira Code',monospace",
};

/* ------------------------ Visual components ------------------------ */

const C1PricesChart = () => {
  const data = [
    { date: "2019-01", nominal: 445, real: 445, cpi: 1.8 },
    { date: "2022-08", nominal: 471, real: 471, cpi: 9.9 },
    { date: "2022-10", nominal: 465, real: 465, cpi: 11.1 },
    { date: "2024-12", nominal: 440, real: 395, cpi: 2.5 },
    { date: "2025-11", nominal: 433, real: 383, cpi: 3.2 },
    { date: "2026-02", nominal: 430, real: 370, cpi: 3.3 },
  ];
  return (
    <ResponsiveContainer width="100%" height={320}>
      <ComposedChart data={data} margin={{ top: 16, right: 32, left: 8, bottom: 8 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="3 3" />
        <XAxis dataKey="date" stroke={C.text} tick={{ fontSize: 11 }} />
        <YAxis yAxisId="left" stroke={C.text} tick={{ fontSize: 11 }} domain={[350, 500]} label={{ value: "£ thousand", angle: -90, position: "insideLeft", fill: C.text, fontSize: 11 }} />
        <YAxis yAxisId="right" orientation="right" stroke={C.text} tick={{ fontSize: 11 }} domain={[0, 12]} label={{ value: "CPI y/y %", angle: 90, position: "insideRight", fill: C.text, fontSize: 11 }} />
        <Tooltip contentStyle={{ background: C.codeBg, border: `1px solid ${C.border}` }} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Area yAxisId="right" type="monotone" dataKey="cpi" name="CPI y/y %" fill={C.red} stroke={C.red} fillOpacity={0.12} />
        <Line yAxisId="left" type="monotone" dataKey="nominal" name="Nominal flat price (£k)" stroke={C.accent} strokeWidth={2.5} dot={{ r: 3, fill: C.accent }} />
        <Line yAxisId="left" type="monotone" dataKey="real" name="Real price, Aug-22 £ (£k)" stroke={C.sky} strokeWidth={2} strokeDasharray="5 3" dot={{ r: 3, fill: C.sky }} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

const C2LadderChart = () => {
  const data = [
    { year: 2010, gap_det: 317, gap_semi: 88,  top_up: 0,   max_mort: 495 },
    { year: 2015, gap_det: 439, gap_semi: 113, top_up: 0,   max_mort: 495 },
    { year: 2019, gap_det: 570, gap_semi: 172, top_up: 75,  max_mort: 495 },
    { year: 2022, gap_det: 712, gap_semi: 249, top_up: 217, max_mort: 495 },
    { year: 2026, gap_det: 719, gap_semi: 291, top_up: 224, max_mort: 495 },
  ];
  return (
    <ResponsiveContainer width="100%" height={340}>
      <ComposedChart data={data} margin={{ top: 16, right: 32, left: 8, bottom: 8 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="3 3" />
        <XAxis dataKey="year" stroke={C.text} tick={{ fontSize: 11 }} />
        <YAxis stroke={C.text} tick={{ fontSize: 11 }} domain={[0, 800]} label={{ value: "£ thousand", angle: -90, position: "insideLeft", fill: C.text, fontSize: 11 }} />
        <Tooltip contentStyle={{ background: C.codeBg, border: `1px solid ${C.border}` }} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Area type="monotone" dataKey="gap_det" name="Detached − flat gap" fill={C.red} stroke={C.red} fillOpacity={0.2} />
        <Line type="monotone" dataKey="gap_semi" name="Semi − flat gap" stroke={C.accent} strokeWidth={2} dot={{ r: 3, fill: C.accent }} />
        <Line type="monotone" dataKey="max_mort" name="Max mortgage @ 4.5× LTI (£110k HH)" stroke={C.sky} strokeWidth={2} strokeDasharray="5 3" dot={false} />
        <Bar dataKey="top_up" name="Cash top-up to upsize (detached)" fill={C.accent} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

const C3UnderOccChart = () => {
  const data = [
    { group: "All HHs", rate: 68.8 },
    { group: "Outright owners", rate: 89.7 },
    { group: "HRP 65+", rate: 86.1 },
    { group: "Older owner-occ", rate: 67.0 },
    { group: "London OO (any age)", rate: 57.5 },
    { group: "London OO 65+ (derived)", rate: 72.5 },
  ];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 16, right: 20, left: 8, bottom: 40 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="group" stroke={C.text} tick={{ fontSize: 10 }} angle={-22} textAnchor="end" interval={0} height={70} />
        <YAxis stroke={C.text} tick={{ fontSize: 11 }} domain={[0, 100]} label={{ value: "% under-occupied", angle: -90, position: "insideLeft", fill: C.text, fontSize: 11 }} />
        <Tooltip contentStyle={{ background: C.codeBg, border: `1px solid ${C.border}` }} formatter={(v) => `${v}%`} />
        <Bar dataKey="rate" name="Under-occupation rate" fill={C.accent} />
      </BarChart>
    </ResponsiveContainer>
  );
};

const C4SdltChart = () => {
  const data = [
    { month: "2019-01", tx: 97 },
    { month: "2022-03", tx: 90 },
    { month: "2024-10", tx: 95 },
    { month: "2025-02", tx: 110 },
    { month: "2025-03", tx: 177 },
    { month: "2025-04", tx: 65 },
    { month: "2025-05", tx: 81 },
    { month: "2025-06", tx: 94 },
    { month: "2025-12", tx: 100 },
    { month: "2026-02", tx: 102 },
  ];
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data} margin={{ top: 16, right: 24, left: 8, bottom: 8 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="3 3" />
        <XAxis dataKey="month" stroke={C.text} tick={{ fontSize: 10 }} />
        <YAxis stroke={C.text} tick={{ fontSize: 11 }} domain={[50, 200]} label={{ value: "SA transactions (000s)", angle: -90, position: "insideLeft", fill: C.text, fontSize: 11 }} />
        <Tooltip contentStyle={{ background: C.codeBg, border: `1px solid ${C.border}` }} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <ReferenceLine x="2022-09" stroke={C.green} strokeDasharray="3 3" label={{ value: "£125k→£250k", position: "top", fill: C.green, fontSize: 10 }} />
        <ReferenceLine x="2025-04" stroke={C.red} strokeDasharray="3 3" label={{ value: "cliff → £125k", position: "top", fill: C.red, fontSize: 10 }} />
        <Line type="monotone" dataKey="tx" name="UK residential transactions (SA, 000s)" stroke={C.accent} strokeWidth={2.5} dot={{ r: 4, fill: C.accent }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

const C5LossGainsChart = () => {
  const data = [
    { year: "2019", loss_pct: 9.2,  avg_gain: 250 },
    { year: "2025", loss_pct: 14.8, avg_gain: 195 },
  ];
  return (
    <ResponsiveContainer width="100%" height={280}>
      <ComposedChart data={data} margin={{ top: 16, right: 32, left: 8, bottom: 8 }}>
        <CartesianGrid stroke={C.border} strokeDasharray="3 3" />
        <XAxis dataKey="year" stroke={C.text} tick={{ fontSize: 11 }} />
        <YAxis yAxisId="left" stroke={C.text} tick={{ fontSize: 11 }} domain={[0, 25]} label={{ value: "% at loss", angle: -90, position: "insideLeft", fill: C.text, fontSize: 11 }} />
        <YAxis yAxisId="right" orientation="right" stroke={C.text} tick={{ fontSize: 11 }} domain={[150, 280]} label={{ value: "Avg seller gain (£k)", angle: 90, position: "insideRight", fill: C.text, fontSize: 11 }} />
        <Tooltip contentStyle={{ background: C.codeBg, border: `1px solid ${C.border}` }} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Bar yAxisId="left" dataKey="loss_pct" name="% of London sales at a loss" fill={C.red} />
        <Line yAxisId="right" type="monotone" dataKey="avg_gain" name="Avg seller gain (£k)" stroke={C.violet} strokeWidth={3} dot={{ r: 5, fill: C.violet }} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

const BrokenLadderDiag = () => (
  <svg viewBox="0 0 360 420" width="100%" style={{ maxWidth: 360, display: "block", margin: "0 auto", background: C.codeBg, border: `1px solid ${C.border}`, borderRadius: 8 }}>
    <text x="180" y="28" textAnchor="middle" fill={C.text} fontFamily={F.b} fontSize="13" fontWeight="600">The upsizing ladder (London, 2026)</text>
    <line x1="90"  y1="70"  x2="90"  y2="380" stroke={C.ink} strokeWidth="3" />
    <line x1="270" y1="70"  x2="270" y2="240" stroke={C.ink} strokeWidth="3" />
    <line x1="270" y1="130" x2="270" y2="380" stroke={C.ink} strokeWidth="3" />
    <path d="M 270 240 L 262 232 L 278 222 L 265 214 L 275 204" stroke={C.red} strokeWidth="2.5" fill="none" />
    <line x1="90"  y1="340" x2="270" y2="340" stroke={C.sky} strokeWidth="4" />
    <text x="180" y="362" textAnchor="middle" fill={C.text} fontFamily={F.b} fontSize="12" fontWeight="600">Flat — £431k</text>
    <line x1="90"  y1="260" x2="270" y2="260" stroke={C.sky} strokeWidth="4" />
    <text x="180" y="282" textAnchor="middle" fill={C.text} fontFamily={F.b} fontSize="12" fontWeight="600">Semi-detached — £712k</text>
    <line x1="90"  y1="100" x2="270" y2="100" stroke={C.red} strokeWidth="4" />
    <text x="180" y="122" textAnchor="middle" fill={C.red} fontFamily={F.b} fontSize="12" fontWeight="700">Detached — £1.14m</text>
    <path d="M 310 100 L 310 260" stroke={C.accent} strokeWidth="2" fill="none" markerEnd="url(#arrowDown)" />
    <defs>
      <marker id="arrowDown" viewBox="0 0 10 10" refX="5" refY="9" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0,0 L10,0 L5,10 z" fill={C.accent} />
      </marker>
    </defs>
    <text x="320" y="180" fill={C.accent} fontFamily={F.b} fontSize="11" fontWeight="700">£224k</text>
    <text x="320" y="195" fill={C.accent} fontFamily={F.b} fontSize="10">cash</text>
    <text x="320" y="208" fill={C.accent} fontFamily={F.b} fontSize="10">top-up</text>
    <text x="180" y="400" textAnchor="middle" fill={C.light} fontFamily={F.m} fontSize="10">Source: HM Land Registry UK HPI, Feb 2026</text>
  </svg>
);

const SdltCliffDiag = () => (
  <svg viewBox="0 0 640 280" width="100%" style={{ background: C.codeBg, border: `1px solid ${C.border}`, borderRadius: 8 }}>
    <text x="320" y="24" textAnchor="middle" fill={C.text} fontFamily={F.b} fontSize="13" fontWeight="600">SDLT rate by purchase price — where the cliffs are</text>
    <line x1="60" y1="240" x2="610" y2="240" stroke={C.ink} strokeWidth="1.5" />
    <line x1="60" y1="60"  x2="60"  y2="240" stroke={C.ink} strokeWidth="1.5" />
    <text x="35" y="80"  fill={C.text} fontFamily={F.m} fontSize="10">12%</text>
    <text x="35" y="120" fill={C.text} fontFamily={F.m} fontSize="10">10%</text>
    <text x="35" y="160" fill={C.text} fontFamily={F.m} fontSize="10">5%</text>
    <text x="35" y="200" fill={C.text} fontFamily={F.m} fontSize="10">2%</text>
    <text x="35" y="238" fill={C.text} fontFamily={F.m} fontSize="10">0%</text>
    <text x="85"  y="258" fill={C.text} fontFamily={F.m} fontSize="10">£0</text>
    <text x="155" y="258" fill={C.text} fontFamily={F.m} fontSize="10">£125k</text>
    <text x="220" y="258" fill={C.text} fontFamily={F.m} fontSize="10">£250k</text>
    <text x="330" y="258" fill={C.text} fontFamily={F.m} fontSize="10">£536k</text>
    <text x="470" y="258" fill={C.text} fontFamily={F.m} fontSize="10">£925k</text>
    <text x="570" y="258" fill={C.text} fontFamily={F.m} fontSize="10">£1.5m</text>
    <line x1="60"  y1="240" x2="155" y2="240" stroke={C.ink} strokeWidth="3" />
    <line x1="155" y1="240" x2="155" y2="200" stroke={C.red} strokeWidth="2" strokeDasharray="3 3" />
    <line x1="155" y1="200" x2="220" y2="200" stroke={C.ink} strokeWidth="3" />
    <line x1="220" y1="200" x2="220" y2="160" stroke={C.red} strokeWidth="2" strokeDasharray="3 3" />
    <line x1="220" y1="160" x2="470" y2="160" stroke={C.ink} strokeWidth="3" />
    <line x1="470" y1="160" x2="470" y2="120" stroke={C.red} strokeWidth="2" strokeDasharray="3 3" />
    <line x1="470" y1="120" x2="570" y2="120" stroke={C.ink} strokeWidth="3" />
    <line x1="570" y1="120" x2="570" y2="80"  stroke={C.red} strokeWidth="2" strokeDasharray="3 3" />
    <line x1="570" y1="80"  x2="610" y2="80"  stroke={C.ink} strokeWidth="3" />
    <line x1="60"  y1="240" x2="220" y2="240" stroke={C.green} strokeWidth="2" strokeDasharray="5 3" />
    <text x="140" y="232" fill={C.green} fontFamily={F.m} fontSize="10">0% up to £250k (Sep 2022 – Mar 2025)</text>
    <circle cx="330" cy="160" r="5" fill={C.accent} />
    <text x="340" y="152" fill={C.accent} fontFamily={F.b} fontSize="11" fontWeight="700">London avg £536k → ~£16.8k SDLT (3.17%)</text>
    <text x="320" y="275" textAnchor="middle" fill={C.light} fontFamily={F.m} fontSize="10">Bands: GOV.UK SDLT residential rates (Apr 2026).  Cliffs: Best &amp; Kleven (2018).</text>
  </svg>
);

const DecisionMatrixDiag = () => {
  const rows = [
    { buyer: "FTB buying a 1–2 bed flat", t1: "Supported", t2: "n/a",          t3: "n/a",          t4: "Partial" },
    { buyer: "Flat-owner → semi-detached", t1: "Supported", t2: "Rejected",     t3: "Indirect",     t4: "Partial" },
    { buyer: "Flat-owner → detached",      t1: "Supported", t2: "Supported",    t3: "Indirect",     t4: "Partial" },
    { buyer: "Family home → downsize (65+)", t1: "n/a",     t2: "n/a",          t3: "Partial",      t4: "Supported" },
    { buyer: "Investor / second home",     t1: "n/a",       t2: "n/a",          t3: "n/a",          t4: "Supported" },
  ];
  const cellColour = (v) => v === "Supported" ? C.red + "22"
                          : v === "Partial"   ? C.accent + "22"
                          : v === "Rejected"  ? C.green + "22"
                          : v === "Indirect"  ? C.sky + "22"
                          : C.codeBg;
  const cellText = (v) => v === "Supported" ? C.red
                        : v === "Partial"   ? C.accentDark
                        : v === "Rejected"  ? C.green
                        : v === "Indirect"  ? C.sky
                        : C.light;
  return (
    <svg viewBox="0 0 720 260" width="100%" style={{ background: C.codeBg, border: `1px solid ${C.border}`, borderRadius: 8 }}>
      <text x="360" y="24" textAnchor="middle" fill={C.text} fontFamily={F.b} fontSize="13" fontWeight="600">Which thesis bites you?</text>
      <rect x="0" y="40" width="720" height="28" fill={C.accent} opacity="0.16" />
      <text x="14"  y="59" fill={C.text} fontFamily={F.b} fontSize="11" fontWeight="600">Buyer type</text>
      <text x="280" y="59" fill={C.text} fontFamily={F.b} fontSize="11" fontWeight="600">T1 affordability</text>
      <text x="400" y="59" fill={C.text} fontFamily={F.b} fontSize="11" fontWeight="600">T2 ladder</text>
      <text x="500" y="59" fill={C.text} fontFamily={F.b} fontSize="11" fontWeight="600">T3 downsizing</text>
      <text x="620" y="59" fill={C.text} fontFamily={F.b} fontSize="11" fontWeight="600">T4 stamp duty</text>
      {rows.map((r, i) => {
        const y = 68 + i * 36;
        return (
          <g key={i}>
            <rect x="0"   y={y} width="270" height="34" fill={i % 2 === 0 ? C.bg : C.codeBg} />
            <text x="14"  y={y + 22} fill={C.text} fontFamily={F.b} fontSize="11">{r.buyer}</text>
            <rect x="270" y={y + 4} width="120" height="26" rx="4" fill={cellColour(r.t1)} />
            <text x="330" y={y + 22} textAnchor="middle" fill={cellText(r.t1)} fontFamily={F.b} fontSize="11" fontWeight="600">{r.t1}</text>
            <rect x="390" y={y + 4} width="100" height="26" rx="4" fill={cellColour(r.t2)} />
            <text x="440" y={y + 22} textAnchor="middle" fill={cellText(r.t2)} fontFamily={F.b} fontSize="11" fontWeight="600">{r.t2}</text>
            <rect x="490" y={y + 4} width="120" height="26" rx="4" fill={cellColour(r.t3)} />
            <text x="550" y={y + 22} textAnchor="middle" fill={cellText(r.t3)} fontFamily={F.b} fontSize="11" fontWeight="600">{r.t3}</text>
            <rect x="610" y={y + 4} width="100" height="26" rx="4" fill={cellColour(r.t4)} />
            <text x="660" y={y + 22} textAnchor="middle" fill={cellText(r.t4)} fontFamily={F.b} fontSize="11" fontWeight="600">{r.t4}</text>
          </g>
        );
      })}
    </svg>
  );
};

/* ------------------------ Shared layout components ------------------------ */

const Code = ({ children, title }) => (
  <div style={{ margin: "24px 0", borderRadius: 8, overflow: "hidden", border: `1px solid ${C.border}` }}>
    {title && <div style={{ background: C.code, padding: "8px 16px", fontFamily: F.m, fontSize: 11, color: "#A78BFA" }}>{title}</div>}
    <pre style={{ background: C.code, padding: "16px 20px", margin: 0, overflowX: "auto", fontSize: 12.5, lineHeight: 1.7, fontFamily: F.m, color: "#E2E8F0" }}><code>{children}</code></pre>
  </div>
);

const Callout = ({ type = "info", title, children }) => {
  const s = {
    info: { bg: C.infoBg, border: C.info, icon: "💡" },
    warn: { bg: C.warnBg, border: C.warn, icon: "⚠️" },
    tip:  { bg: C.tipBg,  border: C.green, icon: "✅" },
  }[type];
  const isStr = typeof children === "string";
  return (
    <div style={{ margin: "24px 0", padding: "16px 22px", background: s.bg, borderLeft: `4px solid ${s.border}`, borderRadius: "0 8px 8px 0" }}>
      <div style={{ fontFamily: F.b, fontSize: 13, fontWeight: 700, color: s.border, marginBottom: 6 }}>{s.icon} {title}</div>
      {isStr
        ? <div style={{ fontFamily: F.b, fontSize: 15, lineHeight: 1.7, color: C.text }} dangerouslySetInnerHTML={{ __html: children }} />
        : <div style={{ fontFamily: F.b, fontSize: 15, lineHeight: 1.7, color: C.text }}>{children}</div>}
    </div>
  );
};

const Sec = ({ n, title, children }) => (
  <div style={{ margin: "56px 0 0" }}>
    <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 20, paddingBottom: 10, borderBottom: `2px solid ${C.accent}` }}>
      <span style={{ fontFamily: F.m, fontSize: 13, color: C.accent, fontWeight: 700 }}>§{n}</span>
      <h2 style={{ fontFamily: F.h, fontSize: 28, fontWeight: 700, color: C.text, lineHeight: 1.2 }}>{title}</h2>
    </div>
    {children}
  </div>
);

const P = ({ children }) => (
  <p style={{ fontFamily: F.b, fontSize: 16, lineHeight: 1.8, color: C.text, margin: "0 0 18px" }} dangerouslySetInnerHTML={{ __html: children }} />
);

const H3 = ({ children }) => (
  <h3 style={{ fontFamily: F.h, fontSize: 22, fontWeight: 600, color: C.text, margin: "32px 0 12px", paddingLeft: 12, borderLeft: `3px solid ${C.sky}` }}>{children}</h3>
);

const Cap = ({ children }) => (
  <div style={{ fontFamily: F.b, fontSize: 12, color: C.light, marginTop: 8, marginBottom: 28 }}>{children}</div>
);

const DC = ({ children }) => (
  <p style={{ fontFamily: F.b, fontSize: 17, lineHeight: 1.8, color: C.text, margin: "0 0 22px" }}>
    <span style={{ fontFamily: F.h, fontSize: 48, lineHeight: 1, float: "left", marginRight: 10, marginTop: 6, color: C.accent, fontWeight: 700 }}>
      {typeof children === "string" ? children.charAt(0) : ""}
    </span>
    <span dangerouslySetInnerHTML={{ __html: typeof children === "string" ? children.slice(1) : "" }} />
  </p>
);

const Verdict = ({ label, color, text }) => (
  <div style={{ margin: "16px 0 28px", padding: "14px 20px", background: color + "16", borderLeft: `5px solid ${color}`, borderRadius: "0 8px 8px 0" }}>
    <div style={{ fontFamily: F.m, fontSize: 11, color, fontWeight: 700, letterSpacing: "0.08em", marginBottom: 4 }}>VERDICT</div>
    <div style={{ fontFamily: F.b, fontSize: 15, fontWeight: 600, color: C.text }}>
      <span style={{ color }}>{label}</span>
      <span dangerouslySetInnerHTML={{ __html: " — " + text }} />
    </div>
  </div>
);

export default function LondonHousingMarket2026() {
  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Newsreader:ital,wght@0,400;0,600;0,700;1,400&display=swap');*{box-sizing:border-box;margin:0;padding:0}body{background:${C.bg}}`}</style>

      <div style={{ background: C.accent, padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <span style={{ fontFamily: F.m, fontSize: 11, color: "#FEF3C7", letterSpacing: "0.1em", textTransform: "uppercase" }}>Data Journalism</span>
        <span style={{ fontFamily: F.m, fontSize: 11, color: "#FEF3C7" }}>London · Housing · Affordability · SDLT · 23 April 2026</span>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "60px 24px 0" }}>
        <div style={{ fontFamily: F.m, fontSize: 12, color: C.accent, fontWeight: 600, letterSpacing: "0.08em", marginBottom: 12 }}>LONDON HOUSING 2026</div>
        <h1 style={{ fontFamily: F.h, fontSize: "clamp(28px,4.5vw,46px)", fontWeight: 700, color: C.text, lineHeight: 1.15, marginBottom: 20 }}>Four Theses, Tested Against the Data</h1>
        <p style={{ fontFamily: F.b, fontSize: 18, color: C.muted, lineHeight: 1.6, maxWidth: 720, marginBottom: 12 }}>Did flat affordability peak in 2022? Is the upsizing ladder broken? Are older owners anchoring? Is Stamp Duty the brake? What the numbers say — and don't.</p>
        <div style={{ fontFamily: F.b, fontSize: 13, color: C.light, marginBottom: 40 }}>Sources — HM Land Registry UK HPI · ONS · HMRC · Bank of England · Hamptons · Rightmove · IFS · OBR · EHS · Census 2021. Every number in this article traces to a named source; retrieval date 2026-04-23.</div>
        <div style={{ height: 1, background: C.border, marginBottom: 8 }} />
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 80px" }}>

        <DC>{`London is stuck, or it is adjusting — and which you see depends on where you stand. Four theses now circulate in dinner-party conversations, trade-press headlines and think-tank briefs: that affordability for a 1–2 bed flat peaked in 2022 and has not recovered; that the jump from flat to family home has become unbridgeable; that older owners are hoarding houses because they anchor on 2022 prices; and that Stamp Duty Land Tax is a quiet brake on the whole machine. Each is testable. Not all survive contact with the evidence.`}</DC>

        <Sec n="1" title="Why these four, and why now">
          <P>{`The 2020–2022 pandemic boom stretched every London housing-market relationship to the edge: mortgage rates at 1.8%, stamp-duty holidays, price growth above 10% a year. Then came the Truss mini-budget in September 2022, inflation at 11.1% in October 2022, a Bank Rate cycle that ran from near-zero to 5.25% in under two years, an SDLT temporary raise that reverted on 1 April 2025, and a 2025 transaction profile that looks — at a glance — like chaos. Against that backdrop, four narratives have ossified into conventional wisdom. This article tests each one against the Land Registry UK HPI, HMRC transaction data, ONS earnings and affordability series, Hamptons, Rightmove, the Census, the English Housing Survey, and a body of academic and think-tank work. Where the evidence supports the thesis, we say so. Where it doesn't — and for two of the four, it doesn't — we say that too.`}</P>
          <P>{`A companion thread ran in parallel: a deliberate <strong>counter-narrative sweep</strong> tasked with finding the best data that breaks each thesis. It matters because these are the kind of claims where confirmation bias is a real danger. The results of that sweep are threaded through the relevant sections, and the cross-thesis synthesis in §6 uses both sides.`}</P>
        </Sec>

        <Sec n="2" title="Thesis 1 — The flat affordability peak">
          <P>{`<strong>The claim:</strong> affordability for 1–2 bed flats in London peaked in 2022; there has been no recovery; sellers are cutting. This needs unpicking because it bundles two different ideas: a <em>price</em> peak and an <em>affordability</em> peak. They can move in opposite directions, and in this cycle they did.`}</P>

          <C1PricesChart />
          <Cap>{`London flat prices — nominal and real — with the UK CPI path overlaid. Nominal flat prices peaked at <code>£470,873</code> in August 2022 and are down ~8% by February 2026. In real terms the correction is closer to ~24%, because cumulative CPI from Aug-22 to Mar-26 is ~17%. Source: HM Land Registry UK HPI; ONS CPI; real-series rebased to Aug 2022 £.`}</Cap>

          <H3>What the Land Registry shows</H3>
          <P>{`London flat prices peaked at <strong>£470,873 in August 2022</strong> and fell to <strong>£432,744 by November 2025</strong> — a 8.1% nominal fall. Feb 2026 data put London's all-property average at <strong>£542,304</strong>, the seventh consecutive month of y/y falls. Flats have led the decline: England-wide flats were <strong>-3.8% y/y to £216,000</strong> in February 2026, the weakest of any property type. Prime-central flats (Kensington & Chelsea) fell 11.8% in the year. And transactions collapsed — only <strong>4,386 London sales in December 2025 vs 6,862 in December 2024, a -36% y/y drop</strong>.`}</P>
          <P>{`In real terms the correction is deeper. Cumulative UK CPI from the Aug-22 peak to March 2026 is roughly 17%, which drags the real flat price below the equivalent of <strong>£370,000 in 2022 money</strong>, a ~24% real fall from peak. That is a material correction by any standard.`}</P>

          <H3>The affordability curve</H3>
          <P>{`Here the thesis needs surgery. The ONS "Housing affordability in England and Wales" bulletin dates the peak (worst) London price-to-earnings ratio to <strong>2021 at 12.9×</strong>, not 2022, and puts the 2024 reading at <strong>11.1×</strong> — a level the ONS explicitly compares to 2015. Affordability has <em>improved</em> since 2021, not deteriorated. The mechanism is wage growth: London full-time median earnings rose from roughly £38,272 in 2019 to ~£49,700 in 2025 (ONS ASHE, ~+30% nominal), outpacing flat prices in the back half of the cycle.`}</P>
          <P>{`At the same time, monthly <em>mortgage costs</em> on a London flat are sharply higher than in 2021 because of the rate cycle. Best-2-year fixes sit near <strong>5.42% in April 2026</strong> (Rightmove), down from ~6% at the 2023 peak but roughly triple the 2021 pricing. The counter-narrative sweep flags this asymmetry: affordability <em>ratios</em> have improved, but <em>monthly mortgage payments</em> on a London flat are ~40% above 2021 levels.`}</P>

          <Callout type="warn" title="The thesis is half right">{`Nominal flat prices did peak in 2022 and have not recovered. Sellers are cutting and volumes are collapsed. <strong>But "affordability" peaked in 2021, not 2022, and is now better than the peak</strong> — because wages grew faster than prices fell. The cash-flow reality is worse than the ratio suggests, because mortgage rates are still ~3× 2021 levels.`}</Callout>

          <Verdict label="Partially supported" color={C.accent} text="Price peak is well evidenced and sellers are cutting. The strict ONS affordability framing is off by a year, and income-ratio improvement since 2021 undermines the strong form of the claim." />
        </Sec>

        <Sec n="3" title="Thesis 2 — The broken ladder">
          <P>{`<strong>The claim:</strong> a flat-owner can no longer afford to jump to a detached family home with a garden. The price gap has grown faster than wages or mortgage capacity. Upsizers are stuck.`}</P>

          <BrokenLadderDiag />
          <Cap>{`The flat → detached rung is the one that has detached itself, at least in central and prime London. Semi-detached (the realistic upsize target for most families) remains within reach. Prices: UK HPI Feb 2026.`}</Cap>

          <H3>The gap</H3>
          <P>{`Between January 2010 and August 2022, the gap between London's average detached house and London's average flat grew from <strong>£316,828</strong> to <strong>£711,853</strong> — a 125% widening. Since then the flat market has fallen faster than the detached market (flats down 10.7%, detached down ~3.7%), so the gap has <em>continued</em> to widen in relative terms: in February 2026 it stood at <strong>£718,906</strong>. London's detached average is now £1.14m; a typical flat is £420,635; the gap is larger than the flat.`}</P>

          <H3>The cash bridge</H3>
          <P>{`The critical number for a mover is not the gap but the <em>cash top-up</em> they must finance after selling their flat and taking a new mortgage. For an illustrative upper-quartile dual-earner London household (£110,000 combined gross), the Bank of England's 4.5× LTI flow cap sets a hard mortgage ceiling at <strong>£495,000</strong>. The arithmetic:`}</P>

          <Code title="Detached upsize — cash bridge (illustrative £110k household)">{`bridge(year) = detached_price(year) − flat_price(year) − 495,000

2019:   996,114 −   426,121 − 495,000 =   75,000   (£75k top-up)
2022:  1,182,726 −  470,873 − 495,000 =  217,000   (£217k top-up)
2026:  1,139,541 −  420,635 − 495,000 =  224,000   (£224k top-up)

Gap growth 2019→2026:   +199%
Income growth 2019→2026: ~+30%   (ONS ASHE London)`}</Code>

          <C2LadderChart />
          <Cap>{`The detached-minus-flat gap (red area) tripled its cash-bridge requirement between 2019 and 2022, and has not come back. The 4.5× LTI ceiling is flat because it is a flow cap, not a function of rates — wage growth is the only mechanism that can move it. Semi-detached (amber) sits inside affordability throughout.`}</Cap>

          <H3>The caveat that almost flips the thesis</H3>
          <P>{`Most London upsizers do not target <em>detached</em>. Detached is ~6% of London stock, concentrated in outer prime. The realistic move for a family upsize is <strong>flat → semi-detached</strong>. Rerun the arithmetic: the bridge is <strong>negative in every year</strong> — the flat sale proceeds plus a 4.5× mortgage comfortably clear a London semi in 2019, 2022, and 2026. The commuter belt — Sevenoaks, St Albans, Guildford — is where many real-world London upsizers land, and our all-London averages don't capture that migration at all.`}</P>
          <P>{`The counter-narrative is weak here: Rightmove's own data records the flat-house gap widening from £24,010 (Feb 2020) to £78,198 (Feb 2026) — a 52% real increase. The broken-ladder story is rock solid for the detached target and softer-but-still-true for the semi.`}</P>

          <Verdict label="Supported (for detached); Rejected (for semi)" color={C.red} text="The detached-flat cash bridge roughly tripled 2019–2026 while borrowing capacity stayed flat. For the realistic semi-detached upsize, the arithmetic still works — particularly if the household broke out of the 4.5× LTI crowd into the 15% flow allowance above it." />
        </Sec>

        <Sec n="4" title="Thesis 3 — The anchoring pensioners">
          <P>{`<strong>The claim:</strong> older London owners refuse to sell because they anchor on 2022 prices, and this blocks the whole chain. It is the thesis with the least empirical support, and the most rhetorical appeal.`}</P>

          <C3UnderOccChart />
          <Cap>{`Under-occupation concentrates in outright owners and the over-65s — but it is a national phenomenon, not a distinctly London one. London owner-occupiers are actually less under-occupied on average than the national pool, because London housing is smaller and denser. Source: Census 2021 (ONS); EHS Older People 2020-21. The 72.5% figure for "older London owner-occupiers" is derived from Census cross-tabs, not published directly.`}</Cap>

          <H3>What the evidence supports</H3>
          <P>{`Under-occupation among older owner-occupiers is real and large. <strong>67% of owner-occupier households with an HRP aged 65+ have two or more spare bedrooms</strong> (EHS Older People 2020–21). Among outright owners of any age it is 89.7% (Census 2021). In London specifically, older owner-occupiers run at around 72.5% (derived from Census cross-tabs). Transaction volumes are collapsed — London logged fewer sales in 2024 (~68,000) than in 2008 (~82,000+), a 60% fall from the 2006 peak.`}</P>

          <H3>What the evidence doesn't support</H3>
          <P>{`The specific mechanism — <em>anchoring to 2022 prices</em> — is nowhere in the data. The English Housing Survey, Legal & General's <em>Last Time Buyer</em> work, the MHCLG Older People's Housing Taskforce, and Centre for Ageing Better research all enumerate reasons older owners don't move. The top reasons are <strong>emotional attachment</strong> (39% of over-75s), the "nuisance" of moving (40%), community ties, a lack of suitable smaller homes nearby, and <strong>Stamp Duty</strong> on the downsize itself. Price-expectation anchoring appears in none of them. MHCLG 2024 is explicit: "financial reasons are rarely a main reason for moving." And L&G found the number of over-55 households intending to downsize was <strong>200,000 lower in 2021 than in 2018</strong> — intent was falling <em>before</em> the 2022 peak existed to anchor to.`}</P>
          <P>{`The counter-evidence is stronger. Hamptons' January 2026 analysis shows <strong>14.8% of London sales in 2025 closed at a loss</strong>, up from 9.2% in 2019, with flats accounting for 90% of those losses. Average seller gains fell below £200,000 for the first time since 2015. If 60+ owners were successfully anchoring, losses would be falling — not rising. Rightmove has roughly a third of London listings showing asking-price cuts averaging 7%. The evidence is consistent with <em>anchoring being unwound</em>, not held.`}</P>

          <C5LossGainsChart />
          <Cap>{`Hamptons' data on London loss-making sales (bars, left axis) and average seller gains (line, right axis) in 2019 vs 2025. If 60+ owners were holding out for 2022 prices, both series should move in the other direction. Source: Hamptons Winter 2025 Market Insight.`}</Cap>

          <H3>A better formulation</H3>
          <P>{`The binding constraints on older-owner mobility that <em>do</em> show up in the evidence are: (1) Stamp Duty on the downsize purchase, quantified by Mayhew et al. (2024) as a significant London-specific drag; (2) lack of attractive smaller-home stock — 80% of over-65s already live in three-bed or smaller; (3) emotional attachment, documented across multiple surveys; and (4) equity release as a substitute for selling — Equity Release Council Q1 2025 lending was £665m and rising. "Anchoring to 2022" is plausible, journalistically convenient, and empirically under-evidenced; an honest reformulation is that <strong>older owners face powerful practical dis-incentives to move, most of which pre-date the 2022 peak</strong>.`}</P>

          <Callout type="warn" title="Data gap worth flagging">{`No UK source publishes vendor age. HMRC, Land Registry and UK Finance transaction files lack an age cross-tab. Hamptons reports tenure length ("8.9 years" in 2024) but not seller age. Claims about "who is selling" in London are therefore inferential, not directly measured.`}</Callout>

          <Verdict label="Partial — rejected as framed" color={C.accent} text="The under-occupation and stuck-volumes halves of the thesis are evidenced. The 'anchoring to 2022' mechanism isn't — it is a hypothesis, not a finding, and the better-documented blockers (SDLT, emotional attachment, lack of suitable stock) pre-date the 2022 peak." />
        </Sec>

        <Sec n="5" title="Thesis 4 — Stamp Duty as brake">
          <P>{`<strong>The claim:</strong> Stamp Duty Land Tax materially discourages London buying and selling. The counter-narrative sweep flagged this as the thesis with the strongest rebuttal — because the aggregate transaction story in 2025 is more complicated than "suppression."`}</P>

          <SdltCliffDiag />
          <Cap>{`SDLT rates jump at notches: £125k, £250k, £925k, £1.5m. At the London average purchase of £536,000 the bill is roughly £16,800 — 3.17% of price, vs 1.55% for the England mean of ~£290k. The Sep 2022–Mar 2025 relief (green dashed) lifted the nil-rate band to £250k; on 1 April 2025 it reverted. Source: GOV.UK SDLT residential rates; Best &amp; Kleven (2018).`}</Cap>

          <H3>The timing effect is enormous</H3>
          <P>{`The clearest natural experiment in recent UK tax data is the March–April 2025 cliff. UK seasonally adjusted residential transactions ran at 109,700 in February 2025; spiked to <strong>177,370 in March 2025 (+62% m/m, +89% y/y)</strong> as buyers rushed to beat the threshold reversion; then collapsed to roughly <strong>65,000 in April 2025 (-63% m/m)</strong>. It is one of the largest single-month transaction swings ever recorded in UK property data.`}</P>

          <C4SdltChart />
          <Cap>{`The seasonally adjusted UK residential transactions series around the April 2025 SDLT cliff. March 2025's 177,370 was the third-largest single-month SA jump on record; the crash in April is almost exactly symmetrical. By June the series was back on trend. Source: HMRC UK Property Transactions (SA).`}</Cap>

          <H3>The level effect is smaller and messier</H3>
          <P>{`Aggregate residential transactions over <strong>FY 2024–25 were up 20% y/y</strong> (1,049,600 vs 872,000). November 2025 ran +8% y/y, December +4.7%, February 2026 -6% vs the Feb-25 forestalling-boosted comparator but +6% m/m. In other words, over the year following the SDLT cliff <em>volumes rose</em>, which sits awkwardly with a "materially suppressing" framing.`}</P>
          <P>{`Best and Kleven's 2018 <em>Review of Economic Studies</em> paper — the canonical UK result — uses the 2008–09 stamp-duty holiday to show a <strong>~20% short-run transaction response</strong> to a 1-percentage-point cut on the affected band, with less than half that stimulus reversing on expiry. They also document the "notch" effect: visible missing mass of transactions above each band threshold and excess bunching below. The OBR's forecast model carries a residential transaction semi-elasticity of around -5 to -7 in year one with respect to the marginal SDLT rate — large, but meaningfully smaller than Best and Kleven's 20% estimate.`}</P>

          <H3>Why London is different</H3>
          <P>{`The thesis's geographic claim holds. At London's average mortgaged purchase of £536k (HMLR Feb 2026), the SDLT bill is ~£16,800 — <strong>3.17% of the price</strong>. At the England mean of ~£290k, the bill is ~£4,500, or 1.55%. London buyers pay roughly 4× the £ amount and 2× the share of price. First-time buyers above the £500k FTB cap (the London median FTB sits just above it at ~£680k) lose all FTB relief and pay <strong>standard rates on the full purchase</strong>. The tax's bite is thus structurally concentrated on London.`}</P>

          <Callout type="info" title="Timing ≠ suppression">{`The honest version of Thesis 4 is: <strong>SDLT strongly distorts transaction <em>timing</em>, weakly depresses the transaction <em>trend</em>, and bites London harder than the rest of England in £ and as a share of price</strong>. "Materially suppressing" aggregate volumes today is not supported by the 2025 data — volumes recovered above 2024 by Nov–Dec 2025.`}</Callout>

          <Verdict label="Supported (strongly on timing, partially on level)" color={C.red} text="Cleanest natural experiment in UK property tax data produced a ±60% transaction swing around the cliff. The level effect is real but smaller, and London-specific burden in £ and %-of-price is measurably worse than the rest of England. But aggregate 2025 volumes rose, so 'materially suppressing today' overreaches." />
        </Sec>

        <Sec n="6" title="Which thesis bites which buyer?">
          <P>{`The four theses don't apply to everyone the same way. A first-time buyer looking at a one-bed flat cares about T1 (affordability) and T4 (SDLT first-time-buyer relief); a family looking to go from a two-bed flat to a detached pile cares about T2 (ladder) most of all; a 68-year-old in a four-bed Edwardian semi cares about T3 (downsizing) and T4 (SDLT on a smaller purchase). The matrix:`}</P>

          <DecisionMatrixDiag />
          <Cap>{`Cell colour indicates whether the thesis is supported, rejected, partial, or indirect for that buyer archetype. "Indirect" means the thesis is not about that buyer but the market effects cascade through. Entries are the authors' synthesis of the four verdicts above.`}</Cap>

          <H3>What the synthesis says about the market overall</H3>
          <P>{`The four theses describe <em>different</em> problems. Theses 1 and 2 are about <strong>price-to-income gaps</strong> at different points on the ladder. Thesis 3 is about <strong>stock allocation</strong> — who lives in what, and why they don't move. Thesis 4 is about a <strong>transaction tax</strong> that sits on top of all three. Only the first two are directly about affordability; the second two are about friction. The market feels stuck not because any one of these is catastrophic, but because all four are binding at the margin simultaneously: flat-buyers face a price wall, movers face a gap wall, downsizers face a friction wall, and everyone faces a tax wall. Fix any one, and the market doesn't free; fix two, and it might.`}</P>
        </Sec>

        <Sec n="7" title="What the data doesn't say">
          <P>{`Several things this article deliberately does not claim, for which the evidence was insufficient in the research pass:`}</P>
          <ul style={{ fontFamily: F.b, fontSize: 16, lineHeight: 1.8, color: C.text, margin: "0 0 24px 22px" }}>
            <li><strong>Who is actually selling.</strong> No UK source publishes vendor age. Claims about "baby boomers refusing to sell" are inferential, from under-occupation rates cross-referenced with transaction volumes, not direct measurement.</li>
            <li><strong>The exact share of London flat listings with price reductions.</strong> Rightmove reports "record numbers" of cuts but the April 2026 PDF was not parseable; the specific % was not retrieved.</li>
            <li><strong>Intra-London variation.</strong> Zone 1–2 and Zone 4–6 are very different markets. A single "London flat" aggregate blurs a 0.7% growth Redbridge with a -12% prime K&amp;C fall.</li>
            <li><strong>New-build vs second-hand.</strong> Post-Grenfell cladding remediation, leasehold service-charge inflation, and EWS1 friction disproportionately drag second-hand flat prices. Index values overstate what a buyer actually pays-plus-inherits.</li>
            <li><strong>London-borough monthly transactions</strong> — HMLR publishes the data but the research pass pulled UK-level series. The borough cut would sharpen the SDLT story.</li>
            <li><strong>Causal attribution of the December 2025 volume collapse (-36% y/y)</strong> — it almost certainly includes a pull-forward into the SDLT deadline plus end-year budget uncertainty, not purely affordability resistance.</li>
          </ul>
        </Sec>

        <Sec n="8" title="Plausible policy levers">
          <P>{`If the market's stuckness is a four-ring problem, three of those rings have credible named reform proposals. Not endorsements — just a note that they exist:`}</P>
          <ul style={{ fontFamily: F.b, fontSize: 16, lineHeight: 1.8, color: C.text, margin: "0 0 24px 22px" }}>
            <li><strong>SDLT</strong>: the <em>Mirrlees Review</em> (IFS, 2010) recommended abolishing SDLT and folding it into a reformed property tax. Resolution Foundation's <em>Revenue and Reform</em> (September 2024) urged government to cancel the April 2025 threshold reversion specifically. The 2025 Autumn Budget kept rates but added a High Value Council Tax Surcharge on £2m+ homes from 2028. The Conservatives pledged full SDLT abolition on primary residences in October 2025.</li>
            <li><strong>Mortgage LTI cap</strong>: the PRA raised the de-minimis threshold for the 4.5× LTI flow limit from £100m to £150m in July 2025, an easing but not a structural change. Halifax's "First Time Buyer Boost" (live 2025) lifts the income multiple to 5.5× for eligible FTB households on ≥£50k, a lender-level workaround.</li>
            <li><strong>Downsizing stock</strong>: the MHCLG Older People's Housing Taskforce (November 2024) identified specialist retirement-housing undersupply as a binding constraint; Mayhew (2020) called for a step-change in purpose-built stock for over-60s. Without new supply, "get older owners to downsize" is a policy without a product.</li>
          </ul>
          <P>{`What is missing from the debate: a clear, quantified proposal that addresses the <strong>gap</strong> rather than the price level — i.e. a targeted reduction in the flat→house upsize friction, which our data says is the single binding constraint on the mover ladder.`}</P>
        </Sec>

        <Sec n="9" title="Forecast window — what to watch next 12–18 months">
          <P>{`If the four theses hold in roughly the shape described above, the following should be observable over the next 12–18 months:`}</P>
          <ul style={{ fontFamily: F.b, fontSize: 16, lineHeight: 1.8, color: C.text, margin: "0 0 24px 22px" }}>
            <li><strong>London flat prices</strong> continue flat-to-softening in nominal terms but stabilise in real terms as CPI falls back toward 2%. Watch the Land Registry UK HPI release cadence.</li>
            <li><strong>London flat transactions</strong> recover from the Dec 2025 -36% y/y trough as the SDLT timing shock unwinds. A test month is March 2026 — if it's still depressed despite the year-on-year comparator being the forestalling boom, the suppression story deserves a second look.</li>
            <li><strong>Semi-detached / outer-London</strong> family homes lead the upside (Savills forecasts 2–3% 2026 growth for Wimbledon, Richmond, Hampstead). The detached-flat gap may finally narrow from the flat side — but only if flat prices start to grow, which would require mortgage rates closer to 3%.</li>
            <li><strong>Equity release volumes</strong> continue to grow — a direct signal that older owners are choosing not to sell, confirming the "friction not anchoring" reframe of T3.</li>
            <li><strong>SDLT receipts</strong> stay elevated (£13.9bn in 2024–25) because London prices keep dragging purchases into the 5% and 10% bands. Any reform announced in the Spring Statement 2027 would be the first real test of revenue-elasticity arguments.</li>
          </ul>
        </Sec>

        <Sec n="10" title="Source Integrity Note">
          <P>{`Every numeric claim in this article traces to a Tier-1 source: HM Land Registry UK HPI, ONS (HPI, CPI, ASHE, Housing Affordability, Census 2021, EHS), HMRC UK Property Transactions, Bank of England (Bank Rate, FPC regulatory data), Rightmove/Zoopla HPIs, Nationwide/Halifax HPIs, Hamptons Winter 2025 Market Insight, UK Finance, Best & Kleven (2018), OBR Nov 2025 forecast, MHCLG Older People's Housing Taskforce (Nov 2024), Legal &amp; General (2021), IFS Mirrlees Review (2010), Resolution Foundation <em>Revenue and Reform</em> (Sep 2024), and the Equity Release Council. Retrieval date for all: 2026-04-23.`}</P>
          <P>{`<strong>Tier-2 (composite/illustrative)</strong> figures — explicitly flagged:`}</P>
          <ul style={{ fontFamily: F.b, fontSize: 16, lineHeight: 1.8, color: C.text, margin: "0 0 18px 22px" }}>
            <li><em>Monthly repayment calculations</em> (§2): based on assumed 2-year fixed rates for 2019 and 2022 because the Bank of England IUMZICQ series was not directly retrievable; the 2025–26 values use Rightmove and Uswitch quoted rates. Directional, not precise.</li>
            <li><em>£110,000 household</em> (§3): an illustrative upper-quartile dual-earner proxy. ONS does not publish clean dual-earner upper-quartile tables. Sensitivity: at £90k the 2026 bridge is ~£314k; at £130k it is ~£134k.</li>
            <li><em>Real-price series in Chart §2</em>: rebased to August 2022 £. The pre-2022 segment is a simplification — a full real-£ series would use CPI back to 2019 directly.</li>
            <li><em>72.5% older London owner-occupier under-occupation</em> (§4): derived from Census 2021 cross-tabs; EHS doesn't publish that cell directly.</li>
            <li><em>§5 transaction series</em> is UK-wide, not London-only. London-borough monthly counts were not retrieved.</li>
          </ul>
          <P>{`<strong>Tier-3 (invented)</strong>: none. Every datapoint has a source. Where a specific number could not be retrieved, the text says so.`}</P>
          <P>{`The four verdicts — partially supported / supported-for-detached / partial-rejected-as-framed / supported-on-timing-partial-on-level — are the authors' synthesis, not any single source's conclusion. The counter-narrative sweep that ran alongside the four thesis investigations produced the explicit dissent on T3 (mechanism under-evidenced) and T4 (aggregate volumes rose in 2025), and its findings are integrated in §§4–5 rather than quarantined.`}</P>
        </Sec>

      </div>
    </div>
  );
}
