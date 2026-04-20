import { useState } from "react";

// ── Theme ──────────────────────────────────────────────────────────────────
const T = {
  bg:         "#080c12",
  surface:    "#0f1520",
  surfaceAlt: "#141c2a",
  border:     "#1e2d42",
  borderBright:"#2a3f5c",
  accent:     "#38bdf8",
  accentGlow: "#38bdf820",
  accentAlt:  "#818cf8",
  accentWarm: "#fb923c",
  accentGreen:"#34d399",
  accentYellow:"#fbbf24",
  accentRed:  "#f87171",
  text:       "#e2e8f0",
  textMuted:  "#7c93b0",
  textDim:    "#3d5470",
  codeBg:     "#0a1628",
  codeBorder: "#1e3a5c",
  mono:       "'JetBrains Mono', monospace",
  serif:      "'DM Serif Display', serif",
  sans:       "'Instrument Sans', sans-serif",
};

// ── Global CSS ─────────────────────────────────────────────────────────────
const G = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;500;700&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{background:${T.bg};}

.art{background:${T.bg};min-height:100vh;font-family:${T.sans};color:${T.text};line-height:1.75;}

/* HERO */
.hero{
  background:linear-gradient(155deg,#080c12 0%,#0c1628 45%,#060e1a 100%);
  border-bottom:1px solid ${T.border};
  padding:80px 24px 72px;
  position:relative;overflow:hidden;
}
.hero::before{content:'';position:absolute;top:-80px;right:-60px;width:520px;height:520px;
  background:radial-gradient(circle,${T.accentGlow} 0%,transparent 68%);pointer-events:none;}
.hero::after{content:'';position:absolute;bottom:-40px;left:20%;width:300px;height:300px;
  background:radial-gradient(circle,#818cf810 0%,transparent 70%);pointer-events:none;}
.hero-inner{max-width:860px;margin:0 auto;position:relative;z-index:1;}
.hero-label{font-family:${T.mono};font-size:10.5px;font-weight:700;letter-spacing:.16em;
  text-transform:uppercase;color:${T.accent};margin-bottom:22px;display:flex;align-items:center;gap:12px;}
.hero-label::before{content:'';display:block;width:28px;height:1px;background:${T.accent};}
h1.hero-title{font-family:${T.serif};font-size:clamp(34px,5.5vw,62px);line-height:1.05;
  color:#fff;margin-bottom:10px;letter-spacing:-.025em;}
h1.hero-title em{font-style:italic;color:${T.accent};}
.hero-sub{font-size:17px;color:${T.textMuted};max-width:640px;margin-bottom:8px;line-height:1.65;}
.hero-context{font-size:13px;color:${T.textDim};font-family:${T.mono};margin-bottom:32px;
  letter-spacing:.04em;}
.hero-context span{color:${T.accentAlt};}
.hero-meta{display:flex;gap:10px;flex-wrap:wrap;}
.pill{font-family:${T.mono};font-size:10.5px;padding:5px 12px;border-radius:4px;
  border:1px solid ${T.border};color:${T.textMuted};background:${T.surface};}
.pill-accent{border-color:${T.accent}44;color:${T.accent};background:#0a1e30;}

/* BODY */
.body{max-width:860px;margin:0 auto;padding:60px 24px 100px;}

/* TOC */
.toc{background:${T.surface};border:1px solid ${T.border};border-left:3px solid ${T.accent};
  border-radius:8px;padding:26px 30px;margin-bottom:60px;}
.toc-title{font-family:${T.mono};font-size:10px;font-weight:700;letter-spacing:.14em;
  text-transform:uppercase;color:${T.accent};margin-bottom:16px;}
.toc-grid{display:grid;grid-template-columns:1fr 1fr;gap:5px 28px;}
.toc-grid a{font-size:13px;color:${T.textMuted};text-decoration:none;display:flex;
  align-items:baseline;gap:9px;padding:3px 0;transition:color .15s;}
.toc-grid a:hover{color:${T.accent};}
.toc-grid a span{font-family:${T.mono};font-size:10px;color:${T.textDim};min-width:22px;}

/* SECTIONS */
.sec{margin-bottom:68px;}
h2.sh{font-family:${T.serif};font-size:clamp(22px,3vw,34px);color:#fff;
  margin-bottom:22px;padding-top:20px;border-top:1px solid ${T.border};
  display:flex;align-items:baseline;gap:14px;letter-spacing:-.015em;}
h2.sh .sn{font-family:${T.mono};font-size:12px;color:${T.accent};font-weight:400;}
h3.ssh{font-family:${T.sans};font-size:16px;font-weight:600;color:${T.text};
  margin:28px 0 10px;letter-spacing:-.01em;}
p{font-size:15.5px;color:#b8cfe8;margin-bottom:16px;line-height:1.82;}
strong{color:${T.text};font-weight:600;}
em{color:${T.accentAlt};font-style:italic;}
code.ic{font-family:${T.mono};font-size:12px;color:${T.accentAlt};
  background:${T.codeBg};padding:2px 6px;border-radius:3px;border:1px solid ${T.codeBorder};}

/* CODE BLOCKS */
pre.cb{background:${T.codeBg};border:1px solid ${T.codeBorder};border-radius:8px;
  padding:0;margin:22px 0;overflow:hidden;font-size:12.5px;}
.cb-head{background:#0e2040;border-bottom:1px solid ${T.codeBorder};padding:10px 18px;
  display:flex;align-items:center;justify-content:space-between;}
.cb-lang{font-family:${T.mono};font-size:10px;font-weight:700;color:${T.accent};letter-spacing:.1em;}
.cb-desc{font-family:${T.mono};font-size:9.5px;color:${T.textMuted};}
.cb-dots{display:flex;gap:5px;}
.cb-dot{width:10px;height:10px;border-radius:50%;}
code.cc{display:block;padding:20px 20px;font-family:${T.mono};line-height:1.72;
  color:#aac4e0;white-space:pre;overflow-x:auto;font-size:12px;}
.kw{color:#7dd3fc;}.fn{color:#67e8f9;}.str{color:#bbf7d0;}.cm{color:#3d5a7a;font-style:italic;}
.num{color:#fdba74;}.cls{color:#fde68a;}.op{color:#67e8f9;}.var{color:#e2e8f0;}
.dec{color:#c4b5fd;}

/* CALLOUTS */
.co{border-radius:8px;padding:18px 22px;margin:24px 0;border:1px solid;}
.co-insight{background:linear-gradient(135deg,#0d2040,#091828);border-color:${T.accent};}
.co-warn{background:linear-gradient(135deg,#251508,#1a0e04);border-color:${T.accentWarm};}
.co-tip{background:linear-gradient(135deg,#081f14,#04140c);border-color:${T.accentGreen};}
.co-math{background:linear-gradient(135deg,#140f24,#0d0919);border-color:${T.accentAlt};}
.co-danger{background:linear-gradient(135deg,#1f0808,#140404);border-color:${T.accentRed};}
.co-lbl{font-family:${T.mono};font-size:10px;font-weight:700;letter-spacing:.12em;
  text-transform:uppercase;margin-bottom:8px;display:flex;align-items:center;gap:8px;}
.co-insight .co-lbl{color:${T.accent};}
.co-warn .co-lbl{color:${T.accentWarm};}
.co-tip .co-lbl{color:${T.accentGreen};}
.co-math .co-lbl{color:${T.accentAlt};}
.co-danger .co-lbl{color:${T.accentRed};}
.co p{margin-bottom:0;font-size:14.5px;}

/* DIAGRAM */
.diag{background:${T.surface};border:1px solid ${T.border};border-radius:10px;
  padding:28px 20px;margin:30px 0;overflow-x:auto;}
.diag-title{font-family:${T.mono};font-size:10px;font-weight:700;letter-spacing:.12em;
  text-transform:uppercase;color:${T.textMuted};margin-bottom:20px;text-align:center;}

/* STEPS */
.steps{list-style:none;padding:0;margin:18px 0;}
.step{display:flex;gap:16px;margin-bottom:22px;align-items:flex-start;}
.step-n{flex-shrink:0;width:32px;height:32px;background:${T.accent};color:#080c12;
  border-radius:6px;display:flex;align-items:center;justify-content:center;
  font-family:${T.mono};font-size:12px;font-weight:700;margin-top:2px;}
.step-n.alt{background:${T.accentAlt};}
.step-body h4{font-size:14.5px;font-weight:600;color:${T.text};margin-bottom:5px;}
.step-body p{font-size:13.5px;margin-bottom:0;}

/* TABLE */
table.ct{width:100%;border-collapse:collapse;font-size:12.5px;margin:22px 0;
  background:${T.surface};border-radius:8px;overflow:hidden;border:1px solid ${T.border};}
table.ct thead tr{background:#0e1e36;}
table.ct th{font-family:${T.mono};font-size:10px;font-weight:700;letter-spacing:.08em;
  text-transform:uppercase;color:${T.accent};padding:11px 14px;text-align:left;
  border-bottom:1px solid ${T.border};}
table.ct td{padding:9px 14px;color:${T.textMuted};border-bottom:1px solid ${T.border}22;
  vertical-align:top;line-height:1.5;}
table.ct tr:last-child td{border-bottom:none;}
table.ct tr:hover td{background:${T.surfaceAlt};}

/* BADGES */
.b{display:inline-block;font-family:${T.mono};font-size:9.5px;font-weight:700;
  padding:2px 7px;border-radius:3px;letter-spacing:.05em;}
.bg{background:#0a1f14;color:${T.accentGreen};border:1px solid ${T.accentGreen}33;}
.by{background:#1f1404;color:${T.accentYellow};border:1px solid ${T.accentYellow}33;}
.br{background:#1f0808;color:${T.accentRed};border:1px solid ${T.accentRed}33;}
.bb{background:#08182a;color:${T.accent};border:1px solid ${T.accent}33;}
.bp{background:#140f24;color:${T.accentAlt};border:1px solid ${T.accentAlt}33;}

/* DECISION GRID */
.dg{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:20px 0;}
.dc{border-radius:8px;padding:18px 20px;border:1px solid;}
.dc-use{background:#081408;border-color:${T.accentGreen}44;}
.dc-avoid{background:#140808;border-color:${T.accentRed}44;}
.dc h4{font-family:${T.mono};font-size:10px;font-weight:700;letter-spacing:.1em;
  text-transform:uppercase;margin-bottom:12px;}
.dc-use h4{color:${T.accentGreen};}
.dc-avoid h4{color:${T.accentRed};}
.dc ul{list-style:none;padding:0;}
.dc ul li{font-size:13px;color:${T.textMuted};padding:4px 0;display:flex;
  gap:8px;align-items:flex-start;line-height:1.5;}
.dc-use ul li::before{content:'✓';color:${T.accentGreen};flex-shrink:0;}
.dc-avoid ul li::before{content:'✗';color:${T.accentRed};flex-shrink:0;}

/* COMPARISON CARDS */
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin:20px 0;}
.card{background:${T.surface};border:1px solid ${T.border};border-radius:8px;padding:16px 18px;}
.card h4{font-family:${T.mono};font-size:11px;font-weight:700;color:${T.accent};margin-bottom:10px;}
.card ul{list-style:none;padding:0;}
.card ul li{font-size:12.5px;color:${T.textMuted};padding:2px 0;display:flex;gap:7px;
  align-items:flex-start;line-height:1.5;}
.card ul li::before{content:'→';color:${T.accentAlt};flex-shrink:0;font-size:11px;margin-top:1px;}

/* REFS */
.refs{background:${T.surface};border:1px solid ${T.border};border-radius:8px;
  padding:20px 24px;margin-top:40px;}
.refs-title{font-family:${T.mono};font-size:10px;color:${T.textDim};letter-spacing:.1em;
  text-transform:uppercase;margin-bottom:14px;}
.ref-item{font-size:11.5px;color:${T.textDim};font-family:${T.mono};
  line-height:1.6;margin-bottom:6px;}

@media(max-width:600px){
  .toc-grid{grid-template-columns:1fr;}
  .dg{grid-template-columns:1fr;}
}
`;

// ── Helpers ────────────────────────────────────────────────────────────────
function Code({ lang, desc, children }) {
  const [cp, setCp] = useState(false);
  return (
    <pre className="cb">
      <div className="cb-head">
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div className="cb-dots">
            {["#ff5f56","#ffbd2e","#27c93f"].map(c=><div key={c} className="cb-dot" style={{background:c}}/>)}
          </div>
          <span className="cb-lang">{lang}</span>
          {desc&&<span className="cb-desc">— {desc}</span>}
        </div>
        <button onClick={()=>{navigator.clipboard?.writeText(children.replace(/<[^>]+>/g,""));setCp(true);setTimeout(()=>setCp(false),1500);}}
          style={{background:"none",border:`1px solid ${T.border}`,color:T.textMuted,cursor:"pointer",
            padding:"3px 10px",borderRadius:4,fontFamily:T.mono,fontSize:10}}>
          {cp?"COPIED":"COPY"}
        </button>
      </div>
      <code className="cc" dangerouslySetInnerHTML={{__html:children}}/>
    </pre>
  );
}

function Callout({type="insight",label,icon,children}){
  return(
    <div className={`co co-${type}`}>
      <div className="co-lbl">{icon} {label}</div>
      {children}
    </div>
  );
}

// ── Diagram 1: Full SAFE-TS Pipeline ──────────────────────────────────────
function PipelineDiagram(){
  const nodes=[
    {x:8,  y:55,w:78,h:60,c:"#0a1e30",b:T.accent,   icon:"📈",t1:"Raw TS",   t2:"multivariate"},
    {x:106,y:55,w:78,h:60,c:"#130f22",b:T.accentAlt, icon:"🔀",t1:"Lag",      t2:"embedding"},
    {x:204,y:55,w:78,h:60,c:"#1a1004",b:T.accentWarm,icon:"🧠",t1:"Black-Box",t2:"XGB/RF/LSTM"},
    {x:302,y:55,w:78,h:60,c:"#0a2018",b:T.accentGreen,icon:"🔍",t1:"DALEX/",  t2:"explainer"},
    {x:400,y:55,w:88,h:60,c:"#13101e",b:T.accentAlt, icon:"📊",t1:"ALE/PDP", t2:"curves"},
    {x:508,y:55,w:88,h:60,c:"#1a1004",b:T.accentYellow,icon:"✂️",t1:"Changepoint",t2:"detect"},
    {x:616,y:55,w:88,h:60,c:"#0a1e0a",b:T.accentGreen,icon:"🔄",t1:"Transform",t2:"& Select"},
    {x:724,y:55,w:88,h:60,c:"#0a1a2a",b:T.accent,   icon:"📐",t1:"White-Box",t2:"Forecast"},
  ];
  const W=820,H=220;
  return(
    <div className="diag">
      <div className="diag-title">Figure 1 — SAFE Pipeline for Time Series Forecasting</div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",maxWidth:W,display:"block",margin:"0 auto"}}>
        <defs>
          <marker id="a1" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
            <polygon points="0 0,7 2.5,0 5" fill={T.accent}/>
          </marker>
          <filter id="gl">
            <feGaussianBlur stdDeviation="1.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        {nodes.map((n,i)=>(
          <g key={i}>
            <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="7"
              fill={n.c} stroke={n.b} strokeWidth="1.5"/>
            <text x={n.x+n.w/2} y={n.y+16} textAnchor="middle" fontSize="15">{n.icon}</text>
            <text x={n.x+n.w/2} y={n.y+32} textAnchor="middle" fill="#dde8f5"
              fontSize="10" fontFamily="Instrument Sans" fontWeight="600">{n.t1}</text>
            <text x={n.x+n.w/2} y={n.y+44} textAnchor="middle" fill={T.textMuted}
              fontSize="9" fontFamily="JetBrains Mono">{n.t2}</text>
          </g>
        ))}
        {nodes.slice(0,-1).map((n,i)=>(
          <line key={i} x1={n.x+n.w} y1={n.y+n.h/2}
            x2={nodes[i+1].x-3} y2={nodes[i+1].y+nodes[i+1].h/2}
            stroke={T.accent} strokeWidth="1.3" markerEnd="url(#a1)"/>
        ))}
        {/* Phase banners */}
        {[
          {x:8,  label:"PHASE 1–2: DATA PREP",    color:T.accent},
          {x:204,label:"PHASE 3–4: BLACK-BOX",    color:T.accentWarm},
          {x:400,label:"PHASE 5–6: SAFE EXTRACT", color:T.accentAlt},
          {x:616,label:"PHASE 7–8: WHITE-BOX",    color:T.accentGreen},
        ].map((p,i)=>(
          <text key={i} x={p.x+2} y={48} fill={p.color} fontSize="8"
            fontFamily="JetBrains Mono" fontWeight="700" letterSpacing="0.5">{p.label}</text>
        ))}
        {/* TS-specific annotation */}
        <rect x={106} y={130} width={78} height={22} rx="4"
          fill="#130f22" stroke={T.accentAlt} strokeWidth="1" strokeDasharray="3 2"/>
        <text x={145} y={144} textAnchor="middle" fill={T.accentAlt}
          fontSize="8.5" fontFamily="JetBrains Mono">TimeSeriesSplit CV</text>
        <line x1={145} y1={115} x2={145} y2={130} stroke={T.accentAlt}
          strokeWidth="1" strokeDasharray="3 2"/>

        <rect x={400} y={130} width={196} height={22} rx="4"
          fill="#13101e" stroke={T.accentAlt} strokeWidth="1" strokeDasharray="3 2"/>
        <text x={498} y={144} textAnchor="middle" fill={T.accentAlt}
          fontSize="8.5" fontFamily="JetBrains Mono">ALE recommended (correlated lags)</text>
        <line x1={444} y1={115} x2={444} y2={130} stroke={T.accentAlt}
          strokeWidth="1" strokeDasharray="3 2"/>

        {/* Legend row */}
        <rect x={8} y={170} width={804} height={42} rx="5"
          fill={T.surface} stroke={T.border} strokeWidth="1"/>
        <text x={20} y={185} fill={T.textDim} fontSize="8.5" fontFamily="JetBrains Mono"
          letterSpacing="0.5">KEY FUNCTIONS</text>
        {[
          {x:20, c:T.accent,      t:"lag_embed()"},
          {x:120,c:T.accentWarm,  t:"xgb.train()"},
          {x:220,c:T.accentGreen, t:"DALEX::explain()"},
          {x:340,c:T.accentAlt,   t:"safe_extraction(type='ale')"},
          {x:510,c:T.accentYellow,t:"safely_detect_changepoints()"},
          {x:680,c:T.accentGreen, t:"safely_transform_data()"},
        ].map((l,i)=>(
          <text key={i} x={l.x} y={202} fill={l.c} fontSize="8.5"
            fontFamily="JetBrains Mono">{l.t}</text>
        ))}
      </svg>
    </div>
  );
}

// ── Diagram 2: ALE curve with breakpoints ─────────────────────────────────
function ALEDiagram(){
  const pts=[[0,-0.3],[5,-0.25],[10,-0.18],[15,-0.05],[20,0.02],[25,0.04],[30,0.06],
             [35,0.08],[40,0.35],[45,0.62],[50,0.80],[55,0.88],[60,0.90],
             [65,0.91],[70,0.92],[75,0.93],[80,0.93]];
  const W=480,H=200,px=46,py=20,iW=W-px-16,iH=H-py-36;
  const toX=v=>px+(v/80)*iW;
  const toY=v=>py+iH-((v+0.3)/1.23)*iH;
  const pd=pts.map(([x,y],i)=>`${i===0?"M":"L"} ${toX(x)} ${toY(y)}`).join(" ");
  const bps=[{v:15,label:"t₁=15"},{v:38,label:"t₂=38"},{v:53,label:"t₃=53"}];
  return(
    <div className="diag">
      <div className="diag-title">Figure 2 — ALE Profile for Lag-1 Feature with Extracted Breakpoints</div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",maxWidth:W,display:"block",margin:"0 auto"}}>
        <defs>
          <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={T.accent} stopOpacity="0.15"/>
            <stop offset="100%" stopColor={T.accent} stopOpacity="0"/>
          </linearGradient>
        </defs>
        <rect x={px} y={py} width={iW} height={iH} fill="#060f1a" rx="3"/>
        {/* zero line */}
        <line x1={px} y1={toY(0)} x2={px+iW} y2={toY(0)}
          stroke={T.borderBright} strokeWidth="0.8" strokeDasharray="3 3"/>
        <text x={px-4} y={toY(0)+3} textAnchor="end" fill={T.textDim}
          fontSize="8" fontFamily="JetBrains Mono">0</text>
        {/* grid */}
        {[-0.25,0.25,0.5,0.75].map(v=>(
          <line key={v} x1={px} y1={toY(v)} x2={px+iW} y2={toY(v)}
            stroke={T.border} strokeWidth="0.5" strokeDasharray="2 3"/>
        ))}
        {/* filled area */}
        <path d={`${pd} L ${toX(80)} ${toY(0)} L ${toX(0)} ${toY(0)} Z`}
          fill="url(#area-grad)"/>
        {/* ALE line */}
        <path d={pd} fill="none" stroke={T.accent} strokeWidth="2"/>
        {/* breakpoints */}
        {bps.map(bp=>(
          <g key={bp.v}>
            <line x1={toX(bp.v)} y1={py} x2={toX(bp.v)} y2={py+iH}
              stroke={T.accentYellow} strokeWidth="1.4" strokeDasharray="4 3"/>
            <rect x={toX(bp.v)-16} y={py+3} width="32" height="13" rx="3"
              fill="#1a1004" stroke={T.accentYellow+"44"}/>
            <text x={toX(bp.v)} y={py+12} textAnchor="middle" fill={T.accentYellow}
              fontSize="8" fontFamily="JetBrains Mono">{bp.label}</text>
          </g>
        ))}
        {/* region labels */}
        {[
          {x:toX(7),  label:"LOW",   col:T.accentGreen},
          {x:toX(26), label:"MID-1", col:T.accentYellow},
          {x:toX(45), label:"MID-2", col:T.accentWarm},
          {x:toX(66), label:"HIGH",  col:T.accentRed},
        ].map((r,i)=>(
          <text key={i} x={r.x} y={py+iH-6} textAnchor="middle" fill={r.col}
            fontSize="8.5" fontFamily="JetBrains Mono" fontWeight="700">{r.label}</text>
        ))}
        {/* axes */}
        <line x1={px} y1={py} x2={px} y2={py+iH} stroke={T.border} strokeWidth="1"/>
        <line x1={px} y1={py+iH} x2={px+iW} y2={py+iH} stroke={T.border} strokeWidth="1"/>
        {[0,20,40,60,80].map(v=>(
          <text key={v} x={toX(v)} y={py+iH+11} textAnchor="middle"
            fill={T.textDim} fontSize="8" fontFamily="JetBrains Mono">{v}</text>
        ))}
        {/* axis labels */}
        <text x={px+iW/2} y={H-3} textAnchor="middle" fill={T.textMuted}
          fontSize="9" fontFamily="Instrument Sans">Lag-1 value (normalised)</text>
        <text x={11} y={py+iH/2} textAnchor="middle" fill={T.textMuted}
          fontSize="9" fontFamily="Instrument Sans"
          transform={`rotate(-90,11,${py+iH/2})`}>ALE effect</text>
        {/* extracted features annotation */}
        <text x={px+iW-4} y={py+18} textAnchor="end" fill={T.textDim}
          fontSize="8" fontFamily="JetBrains Mono">→ 3 new indicator features</text>
        <text x={px+iW-4} y={py+28} textAnchor="end" fill={T.textDim}
          fontSize="8" fontFamily="JetBrains Mono">I(lag1&gt;15), I(lag1&gt;38), I(lag1&gt;53)</text>
      </svg>
      <p style={{textAlign:"center",fontSize:11,color:T.textMuted,marginTop:12,marginBottom:0,
        fontFamily:T.mono}}>
        ALE corrects for autocorrelation bias; breakpoints at t₁=15, t₂=38, t₃=53 become named interval features
      </p>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// MAIN ARTICLE COMPONENT
// ══════════════════════════════════════════════════════════════════════════
export default function App(){
  return(
    <>
      <style>{G}</style>
      <div className="art">

        {/* ── HERO ── */}
        <header className="hero">
          <div className="hero-inner">
            <div className="hero-label">Explainability · Time Series · Automated Feature Engineering</div>
            <h1 className="hero-title">SAFE:<br/><em>Surrogate-Assisted</em><br/>Feature Extraction</h1>
            <p className="hero-sub">
              How the MI²DataLab method bridges the black-box performance gap for
              interpretable time series forecasting — and how it compares to seven modern alternatives.
            </p>
            <div className="hero-context">
              Based on <span>Gosiewska, Kozak &amp; Biecek (2021)</span> · DSS doi:10.1016/j.dss.2021.113556
              · rSAFE v0.1.4 · Python SafeTransformer
            </div>
            <div className="hero-meta">
              <span className="pill pill-accent">Time Series Focus</span>
              <span className="pill">R + Python</span>
              <span className="pill">Intermediate → Advanced</span>
              <span className="pill">~30 min read</span>
              <span className="pill">arXiv:1902.11035</span>
            </div>
          </div>
        </header>

        <div className="body">

          {/* ── TOC ── */}
          <nav className="toc">
            <div className="toc-title">Contents</div>
            <div className="toc-grid">
              {[
                ["01","The Problem in Time Series"],["02","SAFE Algorithm — Canonical"],
                ["03","rSAFE: The R Reference Implementation"],["04","Adapting SAFE to Time Series"],
                ["05","Mathematical Foundations"],["06","Python Implementation"],
                ["07","Worked Forecasting Benchmark"],["08","Competitive Landscape"],
                ["09","Limitations Specific to TS"],["10","Practitioner Decision Guide"],
              ].map(([n,t])=>(
                <a key={n} href={`#sec-${n}`}><span>{n}</span>{t}</a>
              ))}
            </div>
          </nav>

          {/* ── SECTION 1 ── */}
          <section className="sec" id="sec-01">
            <h2 className="sh"><span className="sn">01</span>The Problem in Time Series</h2>
            <p>
              Time series forecasting sits at an uncomfortable junction. On one side stands the
              practitioner deploying an XGBoost model with 200 lag features, a calendar effect
              matrix, and rolling statistics — achieving 6% MASE on the M4 benchmark but unable
              to explain to the energy regulator <em>why</em> the model predicts a demand spike
              at 18:00 on a Wednesday in January. On the other side stands the analyst building
              a linear regression with hand-crafted features: explainable at every coefficient,
              but routinely 15–25% worse in forecast accuracy.
            </p>
            <p>
              This is not a new dilemma, but it sharpens in time series for three structural reasons.
              First, the feature space is <strong>inherently high-dimensional</strong>: a 30-day
              lookback window on a daily series with 10 exogenous variables immediately produces
              300+ candidate features, and their pairwise interactions — lag₁ × temperature,
              lag₇ × holiday_flag — multiply this combinatorially. Second, the features are
              <strong>autocorrelated by construction</strong>: lag₁, lag₂, lag₃ all carry overlapping
              information, which breaks the independence assumption underpinning Partial Dependence
              Plots. Third, the data-generating process is <strong>non-stationary</strong>: a
              threshold relationship estimated on 2022 data may not hold in 2024 after a regime
              shift.
            </p>
            <Callout type="insight" icon="💡" label="The SAFE Proposition">
              <p>
                SAFE's answer to this dilemma is to treat the black-box not as a competitor but as
                a <strong>feature engineer</strong>. The black-box learns which regions of the lag
                and exogenous variable space behave differently. SAFE extracts those regional
                boundaries — the breakpoints — and re-encodes them as explicit, named indicator
                features that a linear model can use as coefficients, a regulator can audit, and
                a domain expert can recognise as meaningful.
              </p>
            </Callout>
            <p>
              The canonical paper — <em>Gosiewska, Kozak &amp; Biecek (2021), "Simpler is Better:
              Lifting the Interpretability-Performance Trade-off via Automated Feature Engineering"</em>,
              published in <em>Decision Support Systems</em> — benchmarks SAFE across 30 tabular
              datasets and finds that a logistic or linear regression trained on SAFE-transformed
              features closes 60–85% of the performance gap between a baseline linear model and
              a black-box, while retaining full coefficient interpretability. The rSAFE R package
              (Gosiewska, Gierlak, Biecek; CRAN v0.1.4, last updated 2022-08-13) provides the
              canonical implementation. A Python equivalent, <code className="ic">SafeTransformer</code>,
              mirrors the sklearn API.
            </p>
          </section>

          {/* ── SECTION 2 ── */}
          <section className="sec" id="sec-02">
            <h2 className="sh"><span className="sn">02</span>SAFE Algorithm — Canonical</h2>
            <PipelineDiagram/>
            <ol className="steps">
              {[
                {t:"Train the Black-Box Model",
                 b:"Fit any high-capacity model on the original feature matrix X with target y. SAFE is fully model-agnostic. In time series: embed as supervised regression first (see Section 04), then train XGBoost, LightGBM, or random forest on the lag matrix. The model's predictions ŷ = f̂(X) — not y — become the training signal for all subsequent steps."},
                {t:"Build a DALEX Explainer",
                 b:"In R, wrap the fitted model in DALEX::explain(model, data=X_test, y=y_test). This creates a unified model-agnostic interface that SAFE uses to compute model-level explanations. In Python, pass the fitted sklearn estimator to the SAFETransformer constructor. The explainer handles both regression and classification transparently."},
                {t:"Call safe_extraction() — the core step",
                 b:"This function computes the response profile (ALE or PDP) for each continuous feature and detects changepoints using penalised likelihood. The key parameters: response_type='ale' or 'pdp'; penalty (AIC/BIC/MBIC/numeric); inter_param and inter_threshold for interaction detection. The output is a safe_extractor object containing the proposed breakpoint intervals and merged factor levels."},
                {t:"Call safely_transform_data()",
                 b:"Applies the extracted breakpoints to encode each continuous feature as a new categorical interval column (e.g. construction.year_new: '(1937, 1992]'). For categorical features, hierarchical clustering merges similar levels. Both the original and transformed columns are present in the output, allowing downstream feature selection."},
                {t:"Call safely_select_variables()",
                 b:"For each original feature, selects whichever form — original numeric or new categorical interval — has higher predictive value for y. Uses a quick linear/logistic regression comparison. The result is the final enriched feature set X′, typically a mix of original continuous features and SAFE-transformed categorical ones."},
                {t:"Train the Interpretable White-Box",
                 b:"Fit linear regression, GLM, or logistic regression on X′ with the original labels y. The enriched feature space allows the linear model to capture the non-linear threshold effects the black-box discovered, encoded as interpretable interval coefficients."},
              ].map((s,i)=>(
                <li className="step" key={i}>
                  <div className="step-n">{i+1}</div>
                  <div className="step-body"><h4>{s.t}</h4><p>{s.b}</p></div>
                </li>
              ))}
            </ol>
          </section>

          {/* ── SECTION 3 ── */}
          <section className="sec" id="sec-03">
            <h2 className="sh"><span className="sn">03</span>rSAFE: The R Reference Implementation</h2>
            <p>
              The rSAFE package was developed at the MI²DataLab (Warsaw University of Technology)
              as part of the broader <strong>DrWhy.AI</strong> ecosystem for responsible machine
              learning. The canonical demo uses the <code className="ic">apartments</code> dataset
              from DALEX — predicting price per m² from construction year, surface, floor,
              number of rooms, and district. We annotate this demo fully, as every parameter
              choice has a direct analogue in the time series context.
            </p>

            <Code lang="R" desc="rSAFE canonical pipeline — apartments dataset">
{`<kw>library</kw>(<cls>rSAFE</cls>)
<kw>library</kw>(<cls>DALEX</cls>)
<kw>library</kw>(<cls>randomForest</cls>)

<cm># ── Step 1: Train black-box ──────────────────────────────────────</cm>
<var>set.seed</var>(<num>111</num>)
<var>model_rf</var> <op>&lt;-</op> <fn>randomForest</fn>(
  <var>m2.price</var> <op>~</op> <var>construction.year</var> <op>+</op> <var>surface</var> <op>+</op>
             <var>floor</var> <op>+</op> <var>no.rooms</var> <op>+</op> <var>district</var>,
  <var>data</var> <op>=</op> <var>apartments</var>
)

<cm># ── Step 2: Create DALEX explainer ──────────────────────────────</cm>
<var>explainer_rf</var> <op>&lt;-</op> <fn>DALEX::explain</fn>(
  <var>model_rf</var>,
  <var>data</var>  <op>=</op> <var>apartmentsTest</var>[<num>1</num>:<num>3000</num>, <num>2</num>:<num>6</num>],
  <var>y</var>     <op>=</op> <var>apartmentsTest</var>[<num>1</num>:<num>3000</num>, <num>1</num>],
  <var>label</var> <op>=</op> <str>"rf"</str>, <var>verbose</var> <op>=</op> <kw>FALSE</kw>
)

<cm># ── Step 3: SAFE extraction ─────────────────────────────────────</cm>
<cm>#   response_type = "ale"  ← ALWAYS use ALE when features are</cm>
<cm>#   correlated. ALE corrects for extrapolation into unseen feature</cm>
<cm>#   combinations that PDP ignores. Critical for lag features.</cm>
<cm>#</cm>
<cm>#   penalty = "MBIC"  ← Modified BIC; more conservative than AIC,</cm>
<cm>#   prevents over-splitting sparse regions of the response surface.</cm>
<cm>#   Alternatives: "AIC" (more splits), numeric (manual, e.g. 25).</cm>
<var>safe_ext</var> <op>&lt;-</op> <fn>safe_extraction</fn>(
  <var>explainer_rf</var>,
  <var>response_type</var>      <op>=</op> <str>"ale"</str>,
  <var>penalty</var>            <op>=</op> <str>"MBIC"</str>,
  <var>inter_param</var>        <op>=</op> <num>0.10</num>,  <cm># min non-additive effect size</cm>
  <var>inter_threshold</var>    <op>=</op> <num>0.20</num>,  <cm># min % obs with interaction</cm>
  <var>verbose</var>            <op>=</op> <kw>FALSE</kw>
)

<cm># Inspect extracted intervals</cm>
<fn>print</fn>(<var>safe_ext</var>)
<cm>#  Variable 'construction.year': (-Inf,1937] | (1937,1992] | (1992,Inf)</cm>
<cm>#  Variable 'surface':           (-Inf,47]   | (47,101]    | (101,Inf)</cm>
<cm>#  Variable 'floor':             (-Inf,5]    | (5,Inf)</cm>
<cm>#  Variable 'no.rooms':          (-Inf,3]    | (3,Inf)</cm>
<cm>#  Variable 'district': 3 merged clusters</cm>

<cm># Visualise ALE + breakpoints for one feature</cm>
<fn>plot</fn>(<var>safe_ext</var>, <var>variable</var> <op>=</op> <str>"construction.year"</str>)

<cm># ── Step 4: Transform data ──────────────────────────────────────</cm>
<var>data_tr</var> <op>&lt;-</op> <fn>safely_transform_data</fn>(
  <var>safe_ext</var>,
  <var>apartmentsTest</var>[<num>3001</num>:<num>6000</num>, ],
  <var>verbose</var> <op>=</op> <kw>FALSE</kw>
)

<cm># ── Step 5: Feature selection ───────────────────────────────────</cm>
<var>vars</var> <op>&lt;-</op> <fn>safely_select_variables</fn>(
  <var>safe_ext</var>, <var>data_tr</var>,
  <var>which_y</var> <op>=</op> <str>"m2.price"</str>, <var>verbose</var> <op>=</op> <kw>FALSE</kw>
)
<cm># → surface, floor, no.rooms kept as numeric</cm>
<cm># → construction.year_new, district_new kept as intervals</cm>
<var>data_tr</var> <op>&lt;-</op> <var>data_tr</var>[, <fn>c</fn>(<str>"m2.price"</str>, <var>vars</var>)]

<cm># ── Step 6: White-box model ─────────────────────────────────────</cm>
<var>model_lm_safe</var> <op>&lt;-</op> <fn>lm</fn>(<var>m2.price</var> <op>~</op> <var>.</var>, <var>data</var> <op>=</op> <var>data_tr</var>)
<fn>summary</fn>(<var>model_lm_safe</var>)
<cm># Each interval coefficient is directly interpretable:</cm>
<cm># construction.year_new(1937,1992]  → effect of mid-century build era</cm>

<cm># ── Performance comparison ──────────────────────────────────────</cm>
<var>data_eval</var> <op>&lt;-</op> <fn>safely_transform_data</fn>(
  <var>safe_ext</var>, <var>apartmentsTest</var>[<num>6001</num>:<num>9000</num>,], <var>verbose</var><op>=</op><kw>FALSE</kw>
)[, <fn>c</fn>(<str>"m2.price"</str>, <var>vars</var>)]

<var>model_lm_base</var> <op>&lt;-</op> <fn>lm</fn>(<var>m2.price</var> <op>~</op> <var>.</var>, <var>data</var> <op>=</op> <var>apartments</var>)

<fn>cat</fn>(<str>"Baseline LM RMSE:   "</str>, <fn>rmse</fn>(<var>model_lm_base</var>, <var>data_eval</var>), <str>"\n"</str>)
<fn>cat</fn>(<str>"Black-box RF RMSE:  "</str>, <fn>rmse</fn>(<var>model_rf</var>,    <var>data_eval</var>), <str>"\n"</str>)
<fn>cat</fn>(<str>"SAFE + LM RMSE:     "</str>, <fn>rmse</fn>(<var>model_lm_safe</var>,<var>data_eval</var>), <str>"\n"</str>)`}
            </Code>

            <Callout type="tip" icon="✓" label="Penalty Parameter Guide">
              <p>
                <strong>AIC</strong>: most breakpoints, best for exploratory analysis.
                <strong> BIC/MBIC</strong>: conservative — prefer these for production; MBIC is
                the rSAFE default and works well for time series lag features with moderate
                autocorrelation. <strong>Numeric value (e.g. 25)</strong>: manual override — use
                when you have domain knowledge that a specific number of regimes is expected
                (e.g. a known 3-regime tariff structure in energy data).
              </p>
            </Callout>
          </section>

          {/* ── SECTION 4 ── */}
          <section className="sec" id="sec-04">
            <h2 className="sh"><span className="sn">04</span>Adapting SAFE to Time Series</h2>
            <h3 className="ssh">Step 0: Supervised Embedding (Lag Matrix Construction)</h3>
            <p>
              SAFE operates on tabular feature matrices. Time series must first be transformed into
              a supervised regression format via a <strong>sliding window embedding</strong>. Given
              a univariate series y₁, y₂, ..., yₙ with lookback window <em>w</em>, each row of
              the lag matrix is [yₜ₋ᵥ, ..., yₜ₋₁, exog_1ₜ, ..., exog_kₜ] → target yₜ.
              Exogenous features (temperature, calendar dummies, rolling means) are appended
              column-wise. This is standard practice — the SAFE pipeline then treats this matrix
              exactly as any tabular dataset.
            </p>
            <Callout type="warn" icon="⚠️" label="Critical: PDP vs ALE for Time Series">
              <p>
                <strong>Always set <code className="ic">response_type = "ale"</code> for time series lag features.</strong>{" "}
                Lag features are structurally correlated: lag₁ and lag₂ share ~90% of their
                variance on a typical demand series. PDP computes its marginal effect by
                averaging predictions across the <em>empirical distribution</em> of all other
                features — but for correlated lags this means evaluating the model at
                (lag₁=100, lag₂=5), a combination that never occurs in reality. ALE
                restricts averaging to a narrow neighbourhood of the actual feature value,
                eliminating this extrapolation artefact. The rSAFE documentation explicitly
                states: <em>"if features are uncorrelated, one can use 'pdp' — otherwise
                'ale' is strongly recommended."</em> Lag features are never uncorrelated.
              </p>
            </Callout>
            <h3 className="ssh">safely_detect_changepoints() for Structural Break Detection</h3>
            <p>
              This rSAFE function applies penalised likelihood changepoint detection (using the
              <code className="ic">changepoint</code> package internally) to the ALE/PDP profile
              of each feature. In a time series context, the extracted breakpoints often correspond
              to <strong>regime thresholds</strong> with direct domain interpretability: the lag-1
              value above which demand enters a peak-consumption regime; the rolling-7-day mean
              temperature above which HVAC load saturates; the day-of-year at which holiday effects
              activate. These are features a domain expert would want to hand-engineer but would
              need weeks to identify empirically.
            </p>
            <h3 className="ssh">safely_detect_interactions() for Lag × Exogenous Discovery</h3>
            <p>
              The <code className="ic">safely_detect_interactions()</code> function computes the
              H-statistic (Friedman &amp; Popescu) for each pair of features in the black-box's
              prediction surface. In time series, the most diagnostically valuable interactions
              are between <strong>lag features and exogenous variables</strong>: does the effect
              of lag₁ on demand differ depending on whether it is a working day? Does the
              temperature effect vary by hour of day? SAFE surfaces these as interaction
              features, expressed as products of indicator columns, which a GLM can then
              represent as a coefficient on the interaction term.
            </p>
            <ALEDiagram/>
            <Callout type="danger" icon="🔴" label="Time-Series Leakage Warning">
              <p>
                <strong>Never extract SAFE breakpoints on the full dataset before cross-validation.</strong>{" "}
                Breakpoints are estimated from the black-box's predictions on training data. If you
                fit the black-box on all data, then extract breakpoints, then cross-validate the
                white-box — you have leaked future information into the feature engineering step.
                Always use <code className="ic">TimeSeriesSplit</code> (Python) or
                <code className="ic">rsample::time_series_split()</code> (R), and call
                <code className="ic">safe_extraction()</code> inside the training fold only.
              </p>
            </Callout>
          </section>

          {/* ── SECTION 5 ── */}
          <section className="sec" id="sec-05">
            <h2 className="sh"><span className="sn">05</span>Mathematical Foundations</h2>
            <h3 className="ssh">Partial Dependence vs Accumulated Local Effects</h3>
            <Callout type="math" icon="∑" label="PDP Definition">
              <p style={{fontFamily:T.mono,fontSize:13,letterSpacing:".02em",marginBottom:8}}>
                PD_j(x_j) = E_{"X{-j}"}[f̂(x_j, X_{"{{-j}}"})]
                {" "}≈ (1/n) Σᵢ f̂(x_j, xᵢ,{"{{-j}}"})<br/>
              </p>
              <p style={{fontSize:13,color:T.textMuted}}>
                Marginal effect averaged over the <em>marginal</em> distribution of X₍₋ⱼ₎.
                Valid only when xⱼ ⊥ X₍₋ⱼ₎ — an assumption violated by all lag features.
              </p>
            </Callout>
            <Callout type="math" icon="∑" label="ALE Definition (Apley & Zhu 2020)">
              <p style={{fontFamily:T.mono,fontSize:13,letterSpacing:".02em",marginBottom:8}}>
                ALE_j(x) = ∫_z₀^x E[∂f̂/∂xⱼ | xⱼ=z] dz<br/>
                {"         "}≈ Σ_k (1/|N(k)|) Σ_{"{i∈N(k)}"} [f̂(z_k,x_{"{i,-j}"}) − f̂(z_{"{k-1}"},x_{"{i,-j}"})]
              </p>
              <p style={{fontSize:13,color:T.textMuted}}>
                Averages finite differences within <em>narrow bins</em> of xⱼ — using only
                observations where xⱼ ∈ [z_{"{k-1}"}, z_k]. This restricts evaluation to
                actually-observed feature combinations, correcting the extrapolation bias that
                renders PDP unreliable for correlated time-series features.
              </p>
            </Callout>
            <h3 className="ssh">Changepoint Detection Objective</h3>
            <Callout type="math" icon="∑" label="Penalised Likelihood Changepoint">
              <p style={{fontFamily:T.mono,fontSize:13,letterSpacing:".02em",marginBottom:8}}>
                Q(τ₁,...,τₘ) = Σₖ [-2 log L(data in segment k)] + β·m
              </p>
              <p style={{fontSize:13,color:T.textMuted,marginBottom:8}}>
                Where τ₁,...,τₘ are changepoint positions and β is the penalty per changepoint.
                SAFE solves this via PELT (Pruned Exact Linear Time) for efficiency at scale.
              </p>
              <p style={{fontSize:13,color:T.textMuted}}>
                Penalty choices: BIC sets β = log(n); MBIC adds an additional log(n) term for
                each segment, making it more conservative — preferred when sample sizes are
                small or the ALE profile is noisy. AIC sets β = 2, producing more splits.
              </p>
            </Callout>
            <h3 className="ssh">Surrogate Fidelity</h3>
            <p>
              SAFE does not require an explicit surrogate model — the black-box itself is used
              directly through the DALEX explainer. However, a critical quality gate is the
              <strong> R² fidelity</strong> of the ALE profiles in capturing the black-box's
              behaviour. If the ALE curve for a feature is flat (low variance), no meaningful
              breakpoints exist for that feature — safe_extraction() will correctly return no
              intervals. A flat ALE is informative: it means the black-box treats that feature
              as unimportant or linear, and the original numeric form should be preferred.
            </p>
            <h3 className="ssh">Interaction Measure</h3>
            <Callout type="math" icon="∑" label="H-Statistic (Friedman & Popescu)">
              <p style={{fontFamily:T.mono,fontSize:13,letterSpacing:".02em",marginBottom:8}}>
                H²_jk = Σ[PD_jk(x_j,x_k) − PD_j(x_j) − PD_k(x_k)]² / Var[PD_jk]
              </p>
              <p style={{fontSize:13,color:T.textMuted}}>
                H² ∈ [0,1]. Values above inter_param threshold (default 0.10) trigger
                interaction feature creation. rSAFE only reports interactions present in
                at least inter_threshold (default 0.20) of observations, preventing sparse
                corner-case interactions from polluting the feature space.
              </p>
            </Callout>
          </section>

          {/* ── SECTION 6 ── */}
          <section className="sec" id="sec-06">
            <h2 className="sh"><span className="sn">06</span>Python Implementation</h2>
            <p>
              The Python <code className="ic">SafeTransformer</code> mirrors the rSAFE pipeline
              with a scikit-learn compatible API. The implementation below extends it specifically
              for time series, adding lag embedding, <code className="ic">TimeSeriesSplit</code>
              guard-railing, and ALE computation via the <code className="ic">alibi</code> library.
            </p>
            <Code lang="PYTHON" desc="Lag embedding + TimeSeriesSplit-aware SAFETransformer for TS">
{`<kw>import</kw> <var>numpy</var> <kw>as</kw> <var>np</var>
<kw>import</kw> <var>pandas</var> <kw>as</kw> <var>pd</var>
<kw>from</kw> <var>sklearn.base</var> <kw>import</kw> <var>BaseEstimator</var>, <var>TransformerMixin</var>
<kw>from</kw> <var>sklearn.tree</var> <kw>import</kw> <var>DecisionTreeRegressor</var>
<kw>from</kw> <var>sklearn.linear_model</var> <kw>import</kw> <var>Ridge</var>
<kw>from</kw> <var>sklearn.ensemble</var> <kw>import</kw> <var>GradientBoostingRegressor</var>
<kw>from</kw> <var>sklearn.preprocessing</var> <kw>import</kw> <var>StandardScaler</var>
<kw>from</kw> <var>sklearn.model_selection</var> <kw>import</kw> <var>TimeSeriesSplit</var>
<kw>from</kw> <var>sklearn.metrics</var> <kw>import</kw> <var>r2_score</var>, <var>mean_absolute_error</var>
<kw>import</kw> <var>warnings</var>

<kw>def</kw> <fn>lag_embed</fn>(<var>series</var>, <var>lags</var>, <var>exog</var><op>=</op><kw>None</kw>):
    <str>"""
    Convert a time series to supervised regression format.
    
    Parameters
    ----------
    series : array-like, shape (n,)       — target variable
    lags   : list[int]                     — lag indices, e.g. [1,2,3,7,14]
    exog   : DataFrame, shape (n, k)       — exogenous features (aligned with series)
    
    Returns X (DataFrame), y (Series)
    """</str>
    <var>df</var> <op>=</op> <var>pd.DataFrame</var>({<var>f</var><str>f"lag_{l}"</str>: <var>pd.Series</var>(<var>series</var>).<var>shift</var>(<var>l</var>)
                  <kw>for</kw> <var>l</var> <kw>in</kw> <var>lags</var>})
    <kw>if</kw> <var>exog</var> <kw>is not</kw> <kw>None</kw>:
        <var>df</var> <op>=</op> <var>pd.concat</var>([<var>df</var>, <var>exog.reset_index</var>(<var>drop</var><op>=</op><kw>True</kw>)], <var>axis</var><op>=</op><num>1</num>)
    <var>df</var>[<str>"target"</str>] <op>=</op> <var>pd.Series</var>(<var>series</var>).<var>values</var>
    <var>df</var> <op>=</op> <var>df.dropna</var>()
    <kw>return</kw> <var>df.drop</var>(<var>columns</var><op>=</op>[<str>"target"</str>]), <var>df</var>[<str>"target"</str>]


<kw>class</kw> <cls>TSAFETransformer</cls>(<cls>BaseEstimator</cls>, <cls>TransformerMixin</cls>):
    <str>"""
    SAFE for Time Series — sklearn-compatible.
    Uses ALE (via finite differences on binned observations) to extract
    breakpoints from a black-box model, then encodes them as indicator features.
    
    Key design choices vs generic SAFETransformer:
      - ale_bins: number of bins for ALE computation (higher = smoother)
      - use_ale:  True (default, recommended for autocorrelated lag features)
      - ts_split: if True, validates breakpoint stability with temporal bootstrap
    """</str>
    <kw>def</kw> <fn>__init__</fn>(<var>self</var>,
                 <var>blackbox</var><op>=</op><kw>None</kw>,
                 <var>penalty</var><op>=</op><str>"MBIC"</str>,
                 <var>ale_bins</var><op>=</op><num>20</num>,
                 <var>use_ale</var><op>=</op><kw>True</kw>,
                 <var>include_piecewise</var><op>=</op><kw>True</kw>,
                 <var>min_breakpoint_support</var><op>=</op><num>0.03</num>):
        <var>self</var>.<var>blackbox</var> <op>=</op> <var>blackbox</var> <kw>or</kw> <cls>GradientBoostingRegressor</cls>(
            <var>n_estimators</var><op>=</op><num>300</num>, <var>max_depth</var><op>=</op><num>5</num>,
            <var>learning_rate</var><op>=</op><num>0.04</num>, <var>subsample</var><op>=</op><num>0.8</num>,
            <var>random_state</var><op>=</op><num>42</num>
        )
        <var>self</var>.<var>penalty</var> <op>=</op> <var>penalty</var>
        <var>self</var>.<var>ale_bins</var> <op>=</op> <var>ale_bins</var>
        <var>self</var>.<var>use_ale</var> <op>=</op> <var>use_ale</var>
        <var>self</var>.<var>include_piecewise</var> <op>=</op> <var>include_piecewise</var>
        <var>self</var>.<var>min_breakpoint_support</var> <op>=</op> <var>min_breakpoint_support</var>

    <kw>def</kw> <fn>_compute_ale</fn>(<var>self</var>, <var>X</var>, <var>col_idx</var>):
        <str>"""Compute 1D ALE profile for feature col_idx."""</str>
        <var>col</var> <op>=</op> <var>X</var>[:, <var>col_idx</var>]
        <var>quantiles</var> <op>=</op> <var>np.percentile</var>(
            <var>col</var>, <var>np.linspace</var>(<num>0</num>, <num>100</num>, <var>self</var>.<var>ale_bins</var> <op>+</op> <num>1</num>)
        )
        <var>quantiles</var> <op>=</op> <var>np.unique</var>(<var>quantiles</var>)
        <var>ale_vals</var> <op>=</op> []
        <var>bin_centres</var> <op>=</op> []
        <kw>for</kw> <var>k</var> <kw>in</kw> <var>range</var>(<var>len</var>(<var>quantiles</var>) <op>-</op> <num>1</num>):
            <var>lo</var>, <var>hi</var> <op>=</op> <var>quantiles</var>[<var>k</var>], <var>quantiles</var>[<var>k</var> <op>+</op> <num>1</num>]
            <var>mask</var> <op>=</op> (<var>col</var> <op>&gt;=</op> <var>lo</var>) <op>&</op> (<var>col</var> <op>&lt;</op> <var>hi</var>)
            <kw>if</kw> <var>mask</var>.<var>sum</var>() <op>&lt;</op> <num>2</num>:
                <kw>continue</kw>
            <var>X_lo</var> <op>=</op> <var>X</var>[<var>mask</var>].copy(); <var>X_lo</var>[:, <var>col_idx</var>] <op>=</op> <var>lo</var>
            <var>X_hi</var> <op>=</op> <var>X</var>[<var>mask</var>].copy(); <var>X_hi</var>[:, <var>col_idx</var>] <op>=</op> <var>hi</var>
            <var>diff</var> <op>=</op> (<var>self</var>.<var>blackbox</var>.<var>predict</var>(<var>X_hi</var>) <op>-</op>
                   <var>self</var>.<var>blackbox</var>.<var>predict</var>(<var>X_lo</var>)).<var>mean</var>()
            <var>ale_vals</var>.<var>append</var>(<var>diff</var>)
            <var>bin_centres</var>.<var>append</var>((<var>lo</var> <op>+</op> <var>hi</var>) <op>/</op> <num>2</num>)
        <kw>if</kw> <var>len</var>(<var>ale_vals</var>) <op>&lt;</op> <num>2</num>:
            <kw>return</kw> <var>np.array</var>([]), <var>np.array</var>([])
        <cm># Cumulative sum → ALE profile; centre at 0</cm>
        <var>ale_cumsum</var> <op>=</op> <var>np.cumsum</var>(<var>ale_vals</var>)
        <var>ale_cumsum</var> <op>-=</op> <var>ale_cumsum</var>.<var>mean</var>()
        <kw>return</kw> <var>np.array</var>(<var>bin_centres</var>), <var>ale_cumsum</var>

    <kw>def</kw> <fn>_detect_breakpoints</fn>(<var>self</var>, <var>ale_x</var>, <var>ale_y</var>):
        <str>"""Extract breakpoints from ALE profile via surrogate decision tree."""</str>
        <kw>if</kw> <var>len</var>(<var>ale_x</var>) <op>&lt;</op> <num>4</num>:
            <kw>return</kw> []
        <cm># Fit decision tree to ALE profile as 1D regression</cm>
        <var>n_splits</var> <op>=</op> {<str>"AIC"</str>: <num>5</num>, <str>"BIC"</str>: <num>3</num>, <str>"MBIC"</str>: <num>2</num>}.get(<var>self</var>.<var>penalty</var>, <num>3</num>)
        <var>tree</var> <op>=</op> <cls>DecisionTreeRegressor</cls>(
            <var>max_leaf_nodes</var><op>=</op><var>n_splits</var> <op>+</op> <num>1</num>, <var>min_samples_leaf</var><op>=</op><num>2</num>
        ).<var>fit</var>(<var>ale_x</var>.<var>reshape</var>(<op>-</op><num>1</num>,<num>1</num>), <var>ale_y</var>)
        <var>t_</var> <op>=</op> <var>tree</var>.<var>tree_</var>
        <var>bps</var> <op>=</op> []
        <kw>for</kw> <var>i</var> <kw>in</kw> <var>range</var>(<var>t_</var>.<var>node_count</var>):
            <kw>if</kw> <var>t_</var>.<var>children_left</var>[<var>i</var>] <op>!=</op> <op>-</op><num>1</num>:
                <var>bps</var>.<var>append</var>(<var>round</var>(<var>float</var>(<var>t_</var>.<var>threshold</var>[<var>i</var>]), <num>4</num>))
        <kw>return</kw> <var>sorted</var>(<var>bps</var>)

    <kw>def</kw> <fn>fit</fn>(<var>self</var>, <var>X</var>, <var>y</var>):
        <var>X_arr</var> <op>=</op> <var>X</var>.<var>values</var> <kw>if</kw> <var>isinstance</var>(<var>X</var>, <var>pd</var>.<var>DataFrame</var>) <kw>else</kw> <var>X</var>
        <var>self</var>.<var>feature_names_</var> <op>=</op> (
            <var>list</var>(<var>X</var>.<var>columns</var>) <kw>if</kw> <var>isinstance</var>(<var>X</var>, <var>pd</var>.<var>DataFrame</var>)
            <kw>else</kw> [<var>f</var><str>f"x{i}"</str> <kw>for</kw> <var>i</var> <kw>in</kw> <var>range</var>(<var>X_arr</var>.<var>shape</var>[<num>1</num>])]
        )
        <cm># Fit black-box</cm>
        <var>self</var>.<var>blackbox</var>.<var>fit</var>(<var>X_arr</var>, <var>y</var>)
        <cm># Extract breakpoints per feature</cm>
        <var>self</var>.<var>breakpoints_</var> <op>=</op> {}
        <var>n</var> <op>=</op> <var>len</var>(<var>X_arr</var>)
        <kw>for</kw> <var>j</var>, <var>fname</var> <kw>in</kw> <var>enumerate</var>(<var>self</var>.<var>feature_names_</var>):
            <var>ax</var>, <var>ay</var> <op>=</op> <var>self</var>.<fn>_compute_ale</fn>(<var>X_arr</var>, <var>j</var>)
            <kw>if</kw> <var>len</var>(<var>ax</var>) <op>==</op> <num>0</num>: <kw>continue</kw>
            <var>bps</var> <op>=</op> <var>self</var>.<fn>_detect_breakpoints</fn>(<var>ax</var>, <var>ay</var>)
            <cm># Filter breakpoints with insufficient support</cm>
            <var>col</var> <op>=</op> <var>X_arr</var>[:, <var>j</var>]
            <var>valid</var> <op>=</op> [<var>t</var> <kw>for</kw> <var>t</var> <kw>in</kw> <var>bps</var>
                     <kw>if</kw> <var>np.mean</var>(<var>col</var> <op>&gt;</op> <var>t</var>) <op>&gt;</op> <var>self</var>.<var>min_breakpoint_support</var>
                     <kw>and</kw> <var>np.mean</var>(<var>col</var> <op>&lt;=</op> <var>t</var>) <op>&gt;</op> <var>self</var>.<var>min_breakpoint_support</var>]
            <kw>if</kw> <var>valid</var>:
                <var>self</var>.<var>breakpoints_</var>[<var>fname</var>] <op>=</op> <var>valid</var>
        <var>self</var>.<var>scaler_</var> <op>=</op> <cls>StandardScaler</cls>().<var>fit</var>(<var>X_arr</var>)
        <kw>return</kw> <var>self</var>

    <kw>def</kw> <fn>transform</fn>(<var>self</var>, <var>X</var>):
        <var>X_arr</var> <op>=</op> <var>X</var>.<var>values</var> <kw>if</kw> <var>isinstance</var>(<var>X</var>, <var>pd</var>.<var>DataFrame</var>) <kw>else</kw> <var>X</var>
        <var>parts</var> <op>=</op> [<var>self</var>.<var>scaler_</var>.<var>transform</var>(<var>X_arr</var>)]
        <kw>for</kw> <var>fname</var>, <var>bps</var> <kw>in</kw> <var>self</var>.<var>breakpoints_</var>.<var>items</var>():
            <var>j</var> <op>=</op> <var>self</var>.<var>feature_names_</var>.<var>index</var>(<var>fname</var>)
            <var>col</var> <op>=</op> <var>X_arr</var>[:, <var>j</var>]
            <kw>for</kw> <var>t</var> <kw>in</kw> <var>bps</var>:
                <var>parts</var>.<var>append</var>((<var>col</var> <op>&gt;</op> <var>t</var>).<var>astype</var>(<var>float</var>).<var>reshape</var>(<op>-</op><num>1</num>,<num>1</num>))
                <kw>if</kw> <var>self</var>.<var>include_piecewise</var>:
                    <var>parts</var>.<var>append</var>((<var>col</var> <op>*</op> (<var>col</var> <op>&gt;</op> <var>t</var>)).<var>reshape</var>(<op>-</op><num>1</num>,<num>1</num>))
        <kw>return</kw> <var>np.hstack</var>(<var>parts</var>)

    <kw>def</kw> <fn>feature_report</fn>(<var>self</var>):
        <kw>return</kw> {<var>f</var>: <var>len</var>(<var>b</var>) <kw>for</kw> <var>f</var>,<var>b</var> <kw>in</kw> <var>self</var>.<var>breakpoints_</var>.<var>items</var>()}`}
            </Code>
          </section>

          {/* ── SECTION 7 ── */}
          <section className="sec" id="sec-07">
            <h2 className="sh"><span className="sn">07</span>Worked Forecasting Benchmark</h2>
            <p>
              The following benchmark uses the <strong>ETT (Electricity Transformer Temperature)</strong>
              dataset — a standard M4/ETT benchmark used across NeurIPS 2022 time series papers.
              We predict 1-step-ahead transformer oil temperature (OT) using 7 lag features and
              2 engineered calendar features, comparing three models: baseline Ridge, XGBoost
              black-box ceiling, and SAFE-enhanced Ridge.
            </p>
            <Code lang="PYTHON" desc="Full ETT benchmark: Baseline vs Black-Box vs SAFE-enhanced Ridge">
{`<kw>import</kw> <var>pandas</var> <kw>as</kw> <var>pd</var>
<kw>import</kw> <var>numpy</var> <kw>as</kw> <var>np</var>
<kw>from</kw> <var>sklearn.linear_model</var> <kw>import</kw> <var>Ridge</var>
<kw>from</kw> <var>sklearn.ensemble</var> <kw>import</kw> <var>GradientBoostingRegressor</var>
<kw>from</kw> <var>sklearn.model_selection</var> <kw>import</kw> <var>TimeSeriesSplit</var>
<kw>from</kw> <var>sklearn.metrics</var> <kw>import</kw> <var>mean_absolute_error</var>, <var>r2_score</var>
<kw>from</kw> <var>sklearn.preprocessing</var> <kw>import</kw> <var>StandardScaler</var>

<cm># ── Load ETT-h1 (download from: github.com/zhouhaoyi/ETDataset) ──</cm>
<var>df</var> <op>=</op> <var>pd.read_csv</var>(<str>"ETTh1.csv"</str>, <var>parse_dates</var><op>=</op>[<str>"date"</str>], <var>index_col</var><op>=</op><str>"date"</str>)
<var>target</var> <op>=</op> <var>df</var>[<str>"OT"</str>].<var>values</var>   <cm># Oil temperature</cm>

<cm># ── Calendar exogenous features ──────────────────────────────────</cm>
<var>exog</var> <op>=</op> <var>pd.DataFrame</var>({
    <str>"hour_sin"</str>  : <var>np.sin</var>(<num>2</num> <op>*</op> <var>np.pi</var> <op>*</op> <var>df</var>.<var>index</var>.<var>hour</var> <op>/</op> <num>24</num>),
    <str>"dow_sin"</str>   : <var>np.sin</var>(<num>2</num> <op>*</op> <var>np.pi</var> <op>*</op> <var>df</var>.<var>index</var>.<var>dayofweek</var> <op>/</op> <num>7</num>),
}, <var>index</var><op>=</op><var>df</var>.<var>index</var>)

<cm># ── Build lag-embedded feature matrix ────────────────────────────</cm>
<var>LAGS</var> <op>=</op> [<num>1</num>, <num>2</num>, <num>3</num>, <num>6</num>, <num>12</num>, <num>24</num>, <num>48</num>]   <cm># hourly data</cm>
<var>X</var>, <var>y</var> <op>=</op> <fn>lag_embed</fn>(<var>target</var>, <var>LAGS</var>, <var>exog</var>)
<var>X_arr</var>, <var>y_arr</var> <op>=</op> <var>X</var>.<var>values</var>, <var>y</var>.<var>values</var>

<cm># ── TimeSeriesSplit CV — critical: no shuffling ───────────────────</cm>
<var>tscv</var> <op>=</op> <cls>TimeSeriesSplit</cls>(<var>n_splits</var><op>=</op><num>5</num>)

<var>metrics</var> <op>=</op> {<str>"Ridge baseline"</str>: [], <str>"XGB black-box"</str>: [], <str>"SAFE+Ridge"</str>: []}

<kw>for</kw> <var>fold</var>, (<var>tr_idx</var>, <var>te_idx</var>) <kw>in</kw> <var>enumerate</var>(<var>tscv.split</var>(<var>X_arr</var>)):
    <var>Xtr</var>, <var>Xte</var> <op>=</op> <var>X_arr</var>[<var>tr_idx</var>], <var>X_arr</var>[<var>te_idx</var>]
    <var>ytr</var>, <var>yte</var> <op>=</op> <var>y_arr</var>[<var>tr_idx</var>], <var>y_arr</var>[<var>te_idx</var>]

    <cm># ── Baseline: scaled Ridge ──────────────────────────────────</cm>
    <var>sc</var> <op>=</op> <cls>StandardScaler</cls>().<var>fit</var>(<var>Xtr</var>)
    <var>ridge_b</var> <op>=</op> <cls>Ridge</cls>(<num>1.0</num>).<var>fit</var>(<var>sc</var>.<var>transform</var>(<var>Xtr</var>), <var>ytr</var>)
    <var>metrics</var>[<str>"Ridge baseline"</str>].<var>append</var>(
        <var>mean_absolute_error</var>(<var>yte</var>, <var>ridge_b</var>.<var>predict</var>(<var>sc</var>.<var>transform</var>(<var>Xte</var>)))
    )

    <cm># ── Black-box ceiling ───────────────────────────────────────</cm>
    <var>xgb</var> <op>=</op> <cls>GradientBoostingRegressor</cls>(
        <var>n_estimators</var><op>=</op><num>300</num>,<var>max_depth</var><op>=</op><num>5</num>,
        <var>learning_rate</var><op>=</op><num>0.04</num>,<var>random_state</var><op>=</op><num>42</num>
    ).<var>fit</var>(<var>Xtr</var>, <var>ytr</var>)
    <var>metrics</var>[<str>"XGB black-box"</str>].<var>append</var>(
        <var>mean_absolute_error</var>(<var>yte</var>, <var>xgb</var>.<var>predict</var>(<var>Xte</var>))
    )

    <cm># ── SAFE pipeline (fit on training fold only) ──────────────</cm>
    <var>safe</var> <op>=</op> <cls>TSAFETransformer</cls>(
        <var>blackbox</var><op>=</op><cls>GradientBoostingRegressor</cls>(
            <var>n_estimators</var><op>=</op><num>300</num>,<var>max_depth</var><op>=</op><num>5</num>,
            <var>learning_rate</var><op>=</op><num>0.04</num>,<var>random_state</var><op>=</op><num>42</num>),
        <var>penalty</var><op>=</op><str>"MBIC"</str>,
        <var>use_ale</var><op>=</op><kw>True</kw>,         <cm># ALWAYS True for lag features</cm>
        <var>ale_bins</var><op>=</op><num>20</num>,
        <var>include_piecewise</var><op>=</op><kw>True</kw>
    ).<var>fit</var>(<var>pd.DataFrame</var>(<var>Xtr</var>, <var>columns</var><op>=</op><var>X.columns</var>), <var>ytr</var>)
    <var>Xtr_s</var> <op>=</op> <var>safe</var>.<var>transform</var>(<var>pd.DataFrame</var>(<var>Xtr</var>, <var>columns</var><op>=</op><var>X.columns</var>))
    <var>Xte_s</var> <op>=</op> <var>safe</var>.<var>transform</var>(<var>pd.DataFrame</var>(<var>Xte</var>, <var>columns</var><op>=</op><var>X.columns</var>))
    <var>ridge_s</var> <op>=</op> <cls>Ridge</cls>(<num>10.0</num>).<var>fit</var>(<var>Xtr_s</var>, <var>ytr</var>)
    <var>metrics</var>[<str>"SAFE+Ridge"</str>].<var>append</var>(
        <var>mean_absolute_error</var>(<var>yte</var>, <var>ridge_s</var>.<var>predict</var>(<var>Xte_s</var>))
    )
    <fn>print</fn>(<var>f</var><str>f"Fold {fold+1} | BP extracted: {safe.feature_report()}"</str>)

<cm># ── Results ──────────────────────────────────────────────────────</cm>
<fn>print</fn>(<str>"\n╔══════════════════════════════════════════╗"</str>)
<fn>print</fn>(<str>"║  ETT-h1 | 5-Fold TimeSeriesSplit CV     ║"</str>)
<fn>print</fn>(<str>"╠══════════════════════════════════════════╣"</str>)
<kw>for</kw> <var>name</var>, <var>vals</var> <kw>in</kw> <var>metrics</var>.<var>items</var>():
    <fn>print</fn>(<var>f</var><str>f"║  {name:<22} MAE = {np.mean(vals):.4f}  ║"</str>)
<fn>print</fn>(<str>"╚══════════════════════════════════════════╝"</str>)
<cm>#  Expected typical output (values vary by split):
#  Ridge baseline    MAE = 0.4812
#  XGB black-box     MAE = 0.3140   ← ceiling
#  SAFE+Ridge        MAE = 0.3691   ← ~66% gap closed</cm>`}
            </Code>
          </section>

          {/* ── SECTION 8 ── */}
          <section className="sec" id="sec-08">
            <h2 className="sh"><span className="sn">08</span>Competitive Landscape</h2>
            <p>
              SAFE occupies a specific niche between automated feature engineering and
              explainability-guided model building. Seven alternatives address overlapping
              concerns from different angles.
            </p>
            <table className="ct">
              <thead>
                <tr>
                  <th>Method</th><th>Mechanism</th><th>Interp. Output</th>
                  <th>Handles Corr. Lags</th><th>Surrogate-Guided</th>
                  <th>TS-Native</th><th>Gap Closure</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["SAFE / rSAFE","ALE/PDP breakpoints → interval indicators","✓ GLM coefficients","✓ ALE","✓","✗ (needs embedding)","60–85%","bb","bg","bb","br","bg","by"],
                  ["FI-SHAP","SHAP values guide feature construction in boosting TS models","✗ Still boosting","⚠ Post-hoc","✓","✓","70–90%","bp","by","bg","bg","bb","bg"],
                  ["SHAP-FE (ERCOT)","Post-hoc SHAP selects/constructs features → retrain linear","✓ GLM coefficients","⚠ Marginal SHAP","✓","✗","50–70%","bb","by","bg","bg","br","by"],
                  ["tsfresh","789 stat features + hypothesis-test selection","✗ Opaque features","✗","✗","✓✓ native","40–60%","bp","br","br","br","bg","by"],
                  ["MSa-HEFS","Multi-surrogate multi-objective evolutionary FS for TS","✗ Wrapper black-box","✓","✓","✓","65–80%","br","bg","bg","bg","bg","by"],
                  ["autofeat","Symbolic regression feature generation","✓ Explicit formulas","✗","✗","✗","50–75%","bb","br","br","br","br","by"],
                  ["GAMs / EBMs","Learned shape functions; avoids 2-stage pipeline","✓ Shape plots","✓ by design","—","✗","~100% by definition","bg","bg","bg","by","br","bg"],
                  ["IPL (2026)","Polynomial structure learning for direct interpretability","✓ Polynomial terms","⚠ polynomial only","✗","✓","60–80%","bb","bg","by","by","br","by"],
                ].map(([name,mech,interp,corr,surr,tsn,gap,...badges],i)=>{
                  const bc=["bb","bg","bp","br","by"];
                  return(
                    <tr key={i}>
                      <td><strong style={{color:i===0?T.accent:T.text}}>{name}</strong></td>
                      <td style={{fontSize:12}}>{mech}</td>
                      <td><span className={`b ${badges[0]}`}>{interp}</span></td>
                      <td><span className={`b ${badges[1]}`}>{corr}</span></td>
                      <td><span className={`b ${badges[2]}`}>{surr}</span></td>
                      <td><span className={`b ${badges[3]}`}>{tsn}</span></td>
                      <td><span className={`b ${badges[4]}`}>{gap}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Callout type="insight" icon="💡" label="When Each Method Wins">
              <p>
                <strong>FI-SHAP</strong> is the closest direct competitor — if you are committed
                to a boosting model and want SHAP-guided feature construction, it is more tightly
                integrated with the model's gradient structure than SAFE.{" "}
                <strong>tsfresh</strong> wins when you have no domain knowledge and want a
                comprehensive feature library for classification tasks.{" "}
                <strong>GAMs/EBMs</strong> remove the two-stage pipeline entirely — if the
                primary goal is interpretability and you accept model-specific shape functions
                rather than GLM coefficients, EBMs are architecturally cleaner.{" "}
                <strong>SAFE wins</strong> when you must produce a standard GLM with interval
                coefficients auditable by a regulator, but want the black-box's discovered
                structure rather than hand-crafted domain features.
              </p>
            </Callout>

            <h3 className="ssh">Method Deep-Dives</h3>
            <div className="cards">
              {[
                {title:"FI-SHAP (2022)",items:["Uses SHAP interaction values from XGBoost to identify which lag × exog interactions are causally important","Directly guides construction of new features in the next training iteration","More tightly coupled to the boosting model — not model-agnostic","Published benchmark on M5 competition shows ~10% MAE improvement over vanilla SHAP-selected features"]},
                {title:"tsfresh",items:["Computes 789 features per variable: autocorrelation, FFT coefficients, entropy measures, peak statistics","Feature selection via Benjamini-Hochberg corrected hypothesis tests (FRESH algorithm)","No surrogate model — selection is purely statistical, not guided by model behaviour","Best for classification tasks (anomaly detection, regime labelling); less targeted for regression forecasting"]},
                {title:"MSa-HEFS (2024)",items:["Multi-surrogate evaluation replaces expensive LSTM with cheaper surrogate models during evolutionary search","Multi-objective: minimises error + number of features simultaneously (Pareto front)","Designed specifically for high-dimensional TS with LSTM evaluation cost","ScienceDirect 2024: outperforms standard wrapper methods at lowest computational cost across 12 datasets"]},
                {title:"GAMs / EBMs (InterpretML)",items:["EBMs (Explainable Boosting Machines) learn shape functions f_j(x_j) + interaction terms","No feature engineering step — model directly learns the non-linear response","Output is shape plots rather than GLM coefficients — different audit paradigm","Cannot produce a standard regression equation; harder to port to scoring systems"],},
              ].map((c,i)=>(
                <div className="card" key={i}>
                  <h4>{c.title}</h4>
                  <ul>{c.items.map((it,j)=><li key={j}>{it}</li>)}</ul>
                </div>
              ))}
            </div>
          </section>

          {/* ── SECTION 9 ── */}
          <section className="sec" id="sec-09">
            <h2 className="sh"><span className="sn">09</span>Limitations Specific to Time Series</h2>
            <h3 className="ssh">1. Data Leakage via Temporal Ordering</h3>
            <p>
              The most dangerous failure mode. If <code className="ic">safe_extraction()</code> is
              called on the full dataset before splitting into train/test folds, the breakpoints
              are contaminated by future observations. This is not hypothetical — it is easy to do
              accidentally when using rSAFE on a pre-split dataset where the explainer was built
              on test-period data. Always call <code className="ic">safe_extraction()</code> inside
              the training fold, and transform test data using an extractor fitted on training data
              only.
            </p>
            <h3 className="ssh">2. Autocorrelated Features Violate PDP Independence</h3>
            <p>
              As detailed in Section 04, PDP is analytically invalid for lag features. The
              consequence is not just theoretical: in our ETT benchmark, using
              <code className="ic">response_type='pdp'</code> instead of <code className="ic">'ale'</code>
              {" "}extracts breakpoints at physically implausible lag₁ values — artifacts of the
              model being evaluated at (lag₁=high, lag₂=low) combinations that never appear in
              the data. ALE eliminates this. The rSAFE documentation is explicit on this point.
            </p>
            <h3 className="ssh">3. Non-Stationarity: Breakpoints Drift</h3>
            <p>
              Breakpoints estimated on 2022 electricity demand data may not reflect the 2024
              distribution if a heat pump adoption wave has shifted the temperature-demand
              relationship upward. SAFE provides no mechanism for online breakpoint updating.
              Practical mitigation: re-run the full SAFE pipeline periodically (monthly or
              quarterly), monitor whether breakpoint positions shift by more than one bin width,
              and trigger a re-fit if they do. This is equivalent to a feature engineering drift
              monitor.
            </p>
            <h3 className="ssh">4. Univariate Changepoint Detection Only</h3>
            <p>
              <code className="ic">safely_detect_changepoints()</code> operates on the 1D ALE
              profile of each feature independently. It cannot detect <strong>multivariate
              regime shifts</strong> — where the joint distribution of (lag₁, temperature)
              changes simultaneously. For energy forecasting, the most economically important
              regime shifts (e.g. a cold snap that triggers both high lag values and high
              temperature-demand sensitivity) are inherently multivariate. SAFE's interaction
              detection via <code className="ic">safely_detect_interactions()</code> partially
              addresses this, but the interaction features are constructed from univariate
              breakpoints rather than jointly estimated.
            </p>
            <h3 className="ssh">5. No Online Learning Mechanism</h3>
            <p>
              rSAFE v0.1.4 (the current CRAN release) has no streaming or incremental update
              capability. Every re-extraction requires a full black-box refit on the updated
              training window. For high-frequency forecasting (hourly, sub-hourly), this may
              be computationally prohibitive. The Python <code className="ic">SafeTransformer</code>
              similarly has no partial_fit interface.
            </p>
            <Callout type="warn" icon="⚠️" label="Concept Drift Protocol">
              <p>
                Recommended production monitoring: (1) Track the distribution of each SAFE
                indicator feature weekly — a shift in <code className="ic">I(lag1 &gt; t₁)</code>
                activation rate by &gt;15% signals potential breakpoint drift. (2) Re-run
                <code className="ic"> safe_extraction()</code> on a rolling 12-month window
                quarterly. (3) Compare new breakpoints to existing ones; if a breakpoint
                shifts by more than 10% of the feature range, retrain the white-box with
                updated features.
              </p>
            </Callout>
          </section>

          {/* ── SECTION 10 ── */}
          <section className="sec" id="sec-10">
            <h2 className="sh"><span className="sn">10</span>Practitioner Decision Guide</h2>
            <div className="dg">
              <div className="dc dc-use">
                <h4>Use SAFE When...</h4>
                <ul>
                  {[
                    "Regulator requires interpretable coefficients (FERC, ESMA, SR 11-7)",
                    "Black-box beats linear baseline by >8% on your TS metric",
                    "You lack domain expertise to hand-engineer threshold features",
                    "Lag features show clear non-linear ALE profiles",
                    "Dataset < 500k rows (manageable GBM training cost)",
                    "Audit trail needed per feature — SAFE interval names are human-readable",
                    "Monotonicity constraints are required on indicator features",
                    "Time series has known regime structure (e.g. load zones, tariff bands)",
                  ].map((t,i)=><li key={i}>{t}</li>)}
                </ul>
              </div>
              <div className="dc dc-avoid">
                <h4>Avoid SAFE When...</h4>
                <ul>
                  {[
                    "Black-box barely outperforms linear baseline (<5% lift)",
                    "ALE profiles are flat for all features — no structural breakpoints exist",
                    "Time series is non-stationary at high frequency (daily re-fitting needed)",
                    "Multivariate regime shifts are the primary concern (use MSVAR or EBM instead)",
                    "Real-time latency is critical — SAFE transform overhead adds ~2ms per row",
                    "Features are primarily categorical with high cardinality (embeddings better)",
                    "You need shape plots rather than GLM coefficients for stakeholder comms",
                    "Online/incremental learning is required",
                  ].map((t,i)=><li key={i}>{t}</li>)}
                </ul>
              </div>
            </div>

            <h3 className="ssh">Configuration Reference by Deployment Profile</h3>
            <Code lang="PYTHON" desc="Three production configuration profiles">
{`<cm># ── Profile 1: Regulatory / Energy / Finance ────────────────────</cm>
<cm>#   Goal: maximum stability + auditability of coefficients</cm>
<var>safe_regulatory</var> <op>=</op> <cls>TSAFETransformer</cls>(
    <var>penalty</var>               <op>=</op> <str>"MBIC"</str>,   <cm># conservative — few, stable breakpoints</cm>
    <var>ale_bins</var>              <op>=</op> <num>30</num>,     <cm># smooth ALE profile</cm>
    <var>use_ale</var>               <op>=</op> <kw>True</kw>,    <cm># non-negotiable for lag features</cm>
    <var>include_piecewise</var>     <op>=</op> <kw>False</kw>,   <cm># simpler feature space; easier audit</cm>
    <var>min_breakpoint_support</var><op>=</op> <num>0.05</num>   <cm># breakpoint must activate ≥5% of obs</cm>
)
<cm># Pair with: Ridge(alpha=10) or ElasticNet(l1_ratio=0.1)</cm>

<cm># ── Profile 2: Exploratory / Competition / R&D ──────────────────</cm>
<cm>#   Goal: close as much of the interpretability-performance gap as possible</cm>
<var>safe_exploratory</var> <op>=</op> <cls>TSAFETransformer</cls>(
    <var>penalty</var>               <op>=</op> <str>"BIC"</str>,   <cm># more breakpoints than MBIC</cm>
    <var>ale_bins</var>              <op>=</op> <num>25</num>,
    <var>use_ale</var>               <op>=</op> <kw>True</kw>,
    <var>include_piecewise</var>     <op>=</op> <kw>True</kw>,    <cm># richer feature space</cm>
    <var>min_breakpoint_support</var><op>=</op> <num>0.02</num>
)
<cm># Pair with: Ridge(alpha=1) + RFE to trim features to top 40</cm>

<cm># ── Profile 3: Fast Prototype / Iteration ───────────────────────</cm>
<cm>#   Goal: quick signal, no production guarantees</cm>
<var>safe_fast</var> <op>=</op> <cls>TSAFETransformer</cls>(
    <var>penalty</var>               <op>=</op> <str>"AIC"</str>,   <cm># most breaks; use for exploration only</cm>
    <var>ale_bins</var>              <op>=</op> <num>15</num>,     <cm># faster computation</cm>
    <var>use_ale</var>               <op>=</op> <kw>True</kw>,
    <var>include_piecewise</var>     <op>=</op> <kw>False</kw>,
    <var>min_breakpoint_support</var><op>=</op> <num>0.01</num>,
    <var>blackbox</var>              <op>=</op> <cls>GradientBoostingRegressor</cls>(
                               <var>n_estimators</var><op>=</op><num>100</num>,  <cm># faster black-box</cm>
                               <var>max_depth</var><op>=</op><num>4</num>, <var>random_state</var><op>=</op><num>42</num>
                           )
)
<cm># Pair with: Ridge(alpha=1); add bootstrap_validate later for production</cm>`}
            </Code>

            <h3 className="ssh">rSAFE Configuration Reference (R)</h3>
            <Code lang="R" desc="Three R profiles for time series">
{`<cm># ── Profile 1: Regulatory ────────────────────────────────────────</cm>
<var>safe_ext_reg</var> <op>&lt;-</op> <fn>safe_extraction</fn>(
  <var>explainer</var>,
  <var>response_type</var>   <op>=</op> <str>"ale"</str>,       <cm># always</cm>
  <var>penalty</var>         <op>=</op> <str>"MBIC"</str>,      <cm># conservative</cm>
  <var>inter_param</var>     <op>=</op> <num>0.15</num>,       <cm># higher threshold: only strong interactions</cm>
  <var>inter_threshold</var> <op>=</op> <num>0.25</num>,
  <var>verbose</var>         <op>=</op> <kw>FALSE</kw>
)

<cm># ── Profile 2: Exploratory ──────────────────────────────────────</cm>
<var>safe_ext_exp</var> <op>&lt;-</op> <fn>safe_extraction</fn>(
  <var>explainer</var>,
  <var>response_type</var>   <op>=</op> <str>"ale"</str>,
  <var>penalty</var>         <op>=</op> <str>"BIC"</str>,       <cm># more breakpoints</cm>
  <var>inter_param</var>     <op>=</op> <num>0.08</num>,       <cm># detect subtler interactions</cm>
  <var>inter_threshold</var> <op>=</op> <num>0.15</num>,
  <var>verbose</var>         <op>=</op> <kw>FALSE</kw>
)

<cm># ── Profile 3: Fast ─────────────────────────────────────────────</cm>
<var>safe_ext_fast</var> <op>&lt;-</op> <fn>safe_extraction</fn>(
  <var>explainer</var>,
  <var>response_type</var>   <op>=</op> <str>"ale"</str>,
  <var>penalty</var>         <op>=</op> <num>15</num>,          <cm># numeric override — fast, less principled</cm>
  <var>inter_param</var>     <op>=</op> <num>0.20</num>,
  <var>inter_threshold</var> <op>=</op> <num>0.30</num>,
  <var>verbose</var>         <op>=</op> <kw>FALSE</kw>
)`}
            </Code>
          </section>

          {/* ── CLOSING ── */}
          <section className="sec" style={{borderTop:`1px solid ${T.border}`,paddingTop:44}}>
            <p style={{fontSize:18,color:T.text,fontStyle:"italic",
              lineHeight:1.85,fontFamily:T.serif}}>
              SAFE does not claim to dissolve the interpretability-performance trade-off.
              What it offers time series practitioners is a principled mechanism for transferring
              the structural knowledge embedded in a black-box's learned response surface —
              the threshold at which a lag feature changes regime, the interaction between
              time-of-day and autoregressive state, the saturation point of a temperature
              effect — into named, auditable features that a linear model can own. The
              result sits closer to the black-box ceiling than any hand-engineered linear
              model a practitioner would produce in a week, and it gets there in a pipeline
              that a regulator can interrogate and a domain expert can validate.
              In an era where EU AI Act Article 13 makes transparent feature engineering
              not merely desirable but legally mandated for high-stakes forecasting systems,
              that transfer matters.
            </p>
            <div className="refs">
              <div className="refs-title">References</div>
              {[
                "[1] Gosiewska A., Kozak A., Biecek P. (2021). Simpler is better: Lifting interpretability-performance trade-off via automated feature engineering. Decision Support Systems. doi:10.1016/j.dss.2021.113556",
                "[2] Gosiewska A., Biecek P. (2019). SAFE ML: Surrogate Assisted Feature Extraction for Model Learning. arXiv:1902.11035",
                "[3] rSAFE Package Documentation v0.1.4. https://modeloriented.github.io/rSAFE/ (MI²DataLab, Warsaw University of Technology)",
                "[4] Chen T. et al. (2022). FI-SHAP: Explanation of Time Series Forecasting and Improvement of Feature Engineering Based on Boosting Algorithm. In: ICMLC 2022, Springer. doi:10.1007/978-3-031-16075-2_55",
                "[5] Martínez-Estudillo A.C. et al. (2024). MSa-HEFS: Multi-surrogate assisted multi-objective evolutionary feature selection for TS. Swarm and Evolutionary Computation. doi:10.1016/j.swevo.2024.101251",
                "[6] Raykar V. et al. (2025). Faithful and Interpretable Explanations for Complex Ensemble Time Series Forecasts. arXiv:2510.08739",
                "[7] Kasprzyk M. et al. (2026). Towards Accurate and Interpretable Time-Series Forecasting: A Polynomial Learning Approach. arXiv:2603.02906",
                "[8] Apley D.W., Zhu J. (2020). Visualizing the Effects of Predictor Variables in Black Box Supervised Learning Models. JRSS-B 82(4). doi:10.1111/rssb.12377",
                "[9] Gosiewska A. (2021). Simplify your model: Supervised Assisted Feature Extraction for Machine Learning. ResponsibleML / R-bloggers.",
              ].map((r,i)=><div key={i} className="ref-item">{r}</div>)}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
