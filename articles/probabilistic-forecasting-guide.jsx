import { useState } from "react";
const C={bg:"#FAFBFC",card:"#FFFFFF",border:"#E2E8F0",accent:"#D97706",accentLight:"#FEF3C7",accentDark:"#78350F",text:"#1E293B",muted:"#64748B",light:"#94A3B8",code:"#1E1E2E",codeBg:"#F1F5F9",warn:"#F59E0B",warnBg:"#FFFBEB",info:"#3B82F6",infoBg:"#EFF6FF",green:"#10B981",red:"#EF4444",purple:"#7C3AED",orange:"#F97316",tipBg:"#F0FDF4",indigo:"#6366F1",violet:"#8B5CF6",sky:"#0EA5E9",amber:"#D97706",teal:"#0F766E"};
const F={h:"'Newsreader',Georgia,serif",b:"'Inter',-apple-system,sans-serif",m:"'JetBrains Mono','Fira Code',monospace"};
const WhyPIDiag=()=>(<svg viewBox="0 0 760 175" style={{width:"100%",display:"block"}}><rect width="760" height="175" fill="#fff" rx="8" stroke={C.border} strokeWidth="1"/><text x="380" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontFamily={F.b} fontWeight="700">Point Forecast vs. Probabilistic Forecast</text><rect x="30" y="40" width="335" height="110" rx="6" fill={C.codeBg} stroke={C.red} strokeWidth="1.5"/><text x="197" y="60" textAnchor="middle" fill={C.red} fontSize="10" fontFamily={F.b} fontWeight="700">Point Forecast</text><text x="197" y="80" textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.b}>"Demand will be 215 units"</text><text x="197" y="98" textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.b}>Wrong half the time. No confidence level.</text><text x="197" y="116" textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.b}>How much safety stock? No way to know.</text><text x="197" y="136" textAnchor="middle" fill={C.red} fontSize="8" fontFamily={F.b}>Overstock or stockout — pick one.</text><rect x="395" y="40" width="335" height="110" rx="6" fill={C.accentLight} stroke={C.green} strokeWidth="1.5"/><text x="562" y="60" textAnchor="middle" fill={C.green} fontSize="10" fontFamily={F.b} fontWeight="700">Probabilistic Forecast</text><text x="562" y="80" textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.b}>"Demand: 215 [195, 238] at 90% coverage"</text><text x="562" y="98" textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.b}>Interval width quantifies uncertainty.</text><text x="562" y="116" textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.b}>Safety stock = upper bound − point forecast.</text><text x="562" y="136" textAnchor="middle" fill={C.green} fontSize="8" fontFamily={F.b}>Optimal ordering with known risk level.</text><text x="380" y="168" textAnchor="middle" fill={C.light} fontSize="8" fontFamily={F.b}>The decision-maker needs BOTH the forecast AND its uncertainty.</text></svg>);
const MethodsLandscape=()=>(<svg viewBox="0 0 760 200" style={{width:"100%",display:"block"}}><rect width="760" height="200" fill="#fff" rx="8" stroke={C.border} strokeWidth="1"/><text x="380" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontFamily={F.b} fontWeight="700">Probabilistic Forecasting Methods Landscape</text><line x1="60" y1="180" x2="720" y2="180" stroke={C.border} strokeWidth="1"/><line x1="60" y1="180" x2="60" y2="40" stroke={C.border} strokeWidth="1"/><text x="390" y="196" textAnchor="middle" fill={C.light} fontSize="8" fontFamily={F.b}>Coverage Guarantee Strength →</text><text x="28" y="112" textAnchor="middle" fill={C.light} fontSize="8" fontFamily={F.b} transform="rotate(-90,28,112)">Adaptiveness →</text>{[{n:"Bootstrap",x:150,y:140,r:14,c:C.light},{n:"Bayesian",x:200,y:90,r:15,c:C.violet},{n:"Quantile\nRegression",x:300,y:80,r:17,c:C.sky},{n:"NGBoost",x:350,y:100,r:13,c:C.teal},{n:"Split\nConformal",x:480,y:130,r:16,c:C.accent},{n:"CQR",x:560,y:65,r:20,c:C.green},{n:"CV+/JK+",x:520,y:105,r:14,c:C.indigo},{n:"MAPIE",x:620,y:85,r:16,c:C.amber},{n:"DeepAR",x:260,y:110,r:12,c:C.orange}].map((d,i)=>(<g key={i}><circle cx={d.x} cy={d.y} r={d.r} fill={d.c} opacity="0.4" stroke={d.c} strokeWidth="1.5"/>{d.n.split("\n").map((ln,li)=>(<text key={li} x={d.x} y={d.y+d.r+11+li*10} textAnchor="middle" fill={C.text} fontSize="7" fontFamily={F.b} fontWeight="600">{ln}</text>))}</g>))}</svg>);
const ConformalDiag=()=>(<svg viewBox="0 0 760 195" style={{width:"100%",display:"block"}}><rect width="760" height="195" fill="#fff" rx="8" stroke={C.border} strokeWidth="1"/><text x="380" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontFamily={F.b} fontWeight="700">Split Conformal Prediction: The Algorithm</text>{[{x:15,w:140,t:"1. Split Data",d:"Training set\n+\nCalibration set",c:C.accent},{x:168,w:140,t:"2. Train Model",d:"Fit on training\nset only",c:C.sky},{x:321,w:140,t:"3. Compute Scores",d:"|y − ŷ| on each\ncalibration point",c:C.violet},{x:474,w:140,t:"4. Get Quantile",d:"q = (1-α) quantile\nof cal scores",c:C.green},{x:627,w:118,t:"5. Predict",d:"ŷ ± q\n= interval",c:C.amber}].map((s,i)=>(<g key={i}>{i>0&&<text x={s.x-8} y="95" fill={C.border} fontSize="12">→</text>}<rect x={s.x} y="40" width={s.w} height="110" rx="6" fill={s.c} opacity="0.1" stroke={s.c} strokeWidth="1"/><text x={s.x+s.w/2} y="60" textAnchor="middle" fill={s.c} fontSize="10" fontFamily={F.b} fontWeight="700">{s.t}</text>{s.d.split("\n").map((ln,li)=>(<text key={li} x={s.x+s.w/2} y={80+li*15} textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.m}>{ln}</text>))}</g>))}<text x="380" y="170" textAnchor="middle" fill={C.accent} fontSize="9" fontFamily={F.b} fontWeight="700">P(Y ∈ [ŷ−q, ŷ+q]) ≥ 1−α for ANY distribution, ANY model, FINITE samples</text><text x="380" y="188" textAnchor="middle" fill={C.light} fontSize="8" fontFamily={F.b}>Only assumption: data is exchangeable (weaker than i.i.d.)</text></svg>);
const CQRDiag=()=>(<svg viewBox="0 0 760 180" style={{width:"100%",display:"block"}}><rect width="760" height="180" fill="#fff" rx="8" stroke={C.border} strokeWidth="1"/><text x="380" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontFamily={F.b} fontWeight="700">CQR = Quantile Regression + Conformal Calibration (Best of Both)</text><rect x="30" y="42" width="220" height="110" rx="6" fill={C.codeBg} stroke={C.sky} strokeWidth="1"/><text x="140" y="62" textAnchor="middle" fill={C.sky} fontSize="10" fontFamily={F.b} fontWeight="700">Quantile Regression</text><text x="140" y="82" textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.b}>Adaptive interval width</text><text x="140" y="98" textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.b}>Wider where uncertain</text><text x="140" y="118" textAnchor="middle" fill={C.red} fontSize="8" fontFamily={F.b}>✗ No coverage guarantee</text><text x="140" y="136" textAnchor="middle" fill={C.muted} fontSize="8" fontFamily={F.b}>May under- or over-cover</text><text x="275" y="98" fill={C.accent} fontSize="16" fontWeight="700">+</text><rect x="300" y="42" width="170" height="110" rx="6" fill={C.codeBg} stroke={C.accent} strokeWidth="1"/><text x="385" y="62" textAnchor="middle" fill={C.accent} fontSize="10" fontFamily={F.b} fontWeight="700">Conformal</text><text x="385" y="82" textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.b}>Coverage guarantee</text><text x="385" y="98" textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.b}>Distribution-free</text><text x="385" y="118" textAnchor="middle" fill={C.red} fontSize="8" fontFamily={F.b}>✗ Constant width</text><text x="385" y="136" textAnchor="middle" fill={C.muted} fontSize="8" fontFamily={F.b}>Not adaptive</text><text x="495" y="98" fill={C.green} fontSize="16" fontWeight="700">=</text><rect x="520" y="42" width="210" height="110" rx="6" fill={C.accentLight} stroke={C.green} strokeWidth="1.5"/><text x="625" y="62" textAnchor="middle" fill={C.green} fontSize="10" fontFamily={F.b} fontWeight="700">CQR (Romano et al. 2019)</text><text x="625" y="82" textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.b}>✓ Adaptive width</text><text x="625" y="98" textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.b}>✓ Coverage guarantee</text><text x="625" y="118" textAnchor="middle" fill={C.green} fontSize="9" fontFamily={F.b}>✓ Best of both worlds</text><text x="625" y="136" textAnchor="middle" fill={C.muted} fontSize="8" fontFamily={F.b}>Production standard</text></svg>);
const CalibDiag=()=>(<svg viewBox="0 0 760 170" style={{width:"100%",display:"block"}}><rect width="760" height="170" fill="#fff" rx="8" stroke={C.border} strokeWidth="1"/><text x="380" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontFamily={F.b} fontWeight="700">Calibration: Does 90% Coverage Really Mean 90%?</text>{[{x:25,w:225,t:"Well-Calibrated",d:"90% PI contains 90%\nof true values.\nReliability diagram\non the diagonal.",c:C.green},{x:265,w:225,t:"Under-Covering",d:"90% PI contains only 75%.\nIntervals too narrow.\nFalse confidence.",c:C.red},{x:505,w:225,t:"Over-Covering",d:"90% PI contains 98%.\nIntervals too wide.\nUninformative.",c:C.amber}].map((s,i)=>(<g key={i}><rect x={s.x} y="38" width={s.w} height="110" rx="6" fill={s.c} opacity="0.08" stroke={s.c} strokeWidth="1.5"/><text x={s.x+s.w/2} y="58" textAnchor="middle" fill={s.c} fontSize="10" fontFamily={F.b} fontWeight="700">{s.t}</text>{s.d.split("\n").map((ln,li)=>(<text key={li} x={s.x+s.w/2} y={78+li*14} textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.b}>{ln}</text>))}</g>))}<text x="380" y="162" textAnchor="middle" fill={C.light} fontSize="8" fontFamily={F.b}>Check with: empirical coverage, CRPS, Winkler score, PIT histogram.</text></svg>);
const MAPIEDiag=()=>(<svg viewBox="0 0 760 175" style={{width:"100%",display:"block"}}><rect width="760" height="175" fill="#fff" rx="8" stroke={C.border} strokeWidth="1"/><text x="380" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontFamily={F.b} fontWeight="700">MAPIE: The Production Conformal Prediction Library</text>{[{x:25,w:170,t:"MapieRegressor",d:"Split conformal\nJackknife+, CV+\nCQR support",c:C.accent},{x:210,w:170,t:"MapieClassifier",d:"LAC, APS, RAPS\nPrediction sets\nAdaptive sizing",c:C.sky},{x:395,w:170,t:"MapieTimeSeries",d:"EnbPI, ACI\nNon-exchangeable\nSliding window",c:C.violet},{x:580,w:155,t:"MapieMultiLabel",d:"Risk control\nRecall/precision\nguarantees",c:C.green}].map((m,i)=>(<g key={i}><rect x={m.x} y="38" width={m.w} height="115" rx="6" fill={m.c} opacity="0.08" stroke={m.c} strokeWidth="1"/><text x={m.x+m.w/2} y="58" textAnchor="middle" fill={m.c} fontSize="10" fontFamily={F.b} fontWeight="700">{m.t}</text>{m.d.split("\n").map((ln,li)=>(<text key={li} x={m.x+m.w/2} y={78+li*14} textAnchor="middle" fill={C.text} fontSize="8.5" fontFamily={F.b}>{ln}</text>))}</g>))}<text x="380" y="168" textAnchor="middle" fill={C.light} fontSize="8" fontFamily={F.b}>scikit-learn compatible · wraps any estimator · Cordier et al. COPA 2023</text></svg>);
const PinballDiag=()=>(<svg viewBox="0 0 760 160" style={{width:"100%",display:"block"}}><rect width="760" height="160" fill="#fff" rx="8" stroke={C.border} strokeWidth="1"/><text x="380" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontFamily={F.b} fontWeight="700">Quantile Regression: Predicting Percentiles, Not Means</text><rect x="30" y="42" width="330" height="95" rx="6" fill={C.codeBg}/><text x="195" y="60" textAnchor="middle" fill={C.accent} fontSize="10" fontFamily={F.b} fontWeight="700">Pinball (Quantile) Loss</text><text x="195" y="82" textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.m}>Lτ(y, q) = τ·max(y−q, 0) + (1−τ)·max(q−y, 0)</text><text x="195" y="102" textAnchor="middle" fill={C.muted} fontSize="8" fontFamily={F.b}>τ=0.5 → median, τ=0.1 → 10th percentile</text><text x="195" y="120" textAnchor="middle" fill={C.muted} fontSize="8" fontFamily={F.b}>Asymmetric: penalises over/under differently</text><rect x="400" y="42" width="330" height="95" rx="6" fill={C.accentLight}/><text x="565" y="60" textAnchor="middle" fill={C.accent} fontSize="10" fontFamily={F.b} fontWeight="700">90% Prediction Interval</text><text x="565" y="82" textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.b}>Train model with τ=0.05 → lower bound</text><text x="565" y="98" textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.b}>Train model with τ=0.50 → point forecast</text><text x="565" y="114" textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.b}>Train model with τ=0.95 → upper bound</text></svg>);
const VsDiag=()=>(<svg viewBox="0 0 760 185" style={{width:"100%",display:"block"}}><rect width="760" height="185" fill="#fff" rx="8" stroke={C.border} strokeWidth="1"/><text x="380" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontFamily={F.b} fontWeight="700">Conformal Prediction vs. Alternatives</text><line x1="40" y1="45" x2="740" y2="45" stroke={C.border} strokeWidth="1"/>{["Method","Coverage","Adaptive?","Assumptions","Cost"].map((h,i)=>(<text key={i} x={40+i*145} y="40" fill={C.accent} fontSize="9" fontFamily={F.b} fontWeight="700">{h}</text>))}{[["Conformal (split)","Guaranteed","No","Exchangeability","Low"],["CQR","Guaranteed","Yes","Exchangeability","Medium"],["Quantile Reg.","None","Yes","Model spec.","Low"],["Bootstrap","Asymptotic","No","i.i.d.","High (N×)"],["Bayesian","Conditional","Yes","Correct prior","High"],["MC Dropout","None","Partial","Dropout arch.","Medium"]].map((row,r)=>{const y=65+r*22;return(<g key={r}>{r%2===0&&<rect x="40" y={y-12} width="700" height="22" fill={C.codeBg} rx="2"/>}{row.map((cell,c)=>(<text key={c} x={40+c*145} y={y+3} fill={c===0?C.accent:cell==="Guaranteed"?C.green:cell==="None"?C.red:C.text} fontSize="9" fontFamily={c===0?F.b:F.m} fontWeight={c===0?"600":"400"}>{cell}</text>))}</g>);})}</svg>);
const Code=({children,title})=>(<div style={{margin:"24px 0",borderRadius:8,overflow:"hidden",border:`1px solid ${C.border}`}}>{title&&<div style={{background:C.code,padding:"8px 16px",fontFamily:F.m,fontSize:11,color:"#A78BFA",letterSpacing:"0.05em"}}>{title}</div>}<pre style={{background:C.code,padding:"16px 20px",margin:0,overflowX:"auto",fontSize:12.5,lineHeight:1.7,fontFamily:F.m,color:"#E2E8F0"}}><code>{children}</code></pre></div>);
const NB=({children,title,n})=>(<div style={{margin:"24px 0",borderRadius:8,overflow:"hidden",border:`1px solid ${C.border}`,borderLeft:`3px solid ${C.green}`}}><div style={{background:C.code,padding:"8px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontFamily:F.m,fontSize:11,color:"#A78BFA",letterSpacing:"0.05em"}}>{title}</span><span style={{fontFamily:F.m,fontSize:10,color:C.green,background:"rgba(16,185,129,0.15)",padding:"2px 8px",borderRadius:4}}>Cell {n}</span></div><pre style={{background:C.code,padding:"16px 20px",margin:0,overflowX:"auto",fontSize:12.5,lineHeight:1.7,fontFamily:F.m,color:"#E2E8F0"}}><code>{children}</code></pre></div>);
const Callout=({type="info",title,children})=>{const s={info:{bg:C.infoBg,border:C.info,icon:"💡"},warn:{bg:C.warnBg,border:C.warn,icon:"⚠️"},tip:{bg:C.tipBg,border:C.green,icon:"✅"}}[type];return(<div style={{margin:"28px 0",padding:"20px 24px",background:s.bg,borderLeft:`4px solid ${s.border}`,borderRadius:"0 8px 8px 0"}}><div style={{fontFamily:F.b,fontSize:13,fontWeight:700,color:s.border,marginBottom:6}}>{s.icon} {title}</div><div style={{fontFamily:F.b,fontSize:14,lineHeight:1.7,color:C.text}} dangerouslySetInnerHTML={{__html:children}}/></div>);};
const Sec=({n,title,children})=>(<div style={{margin:"56px 0 0"}}><div style={{display:"flex",alignItems:"baseline",gap:12,marginBottom:20}}><span style={{fontFamily:F.m,fontSize:13,color:C.accent,fontWeight:700}}>§{n}</span><h2 style={{fontFamily:F.h,fontSize:28,fontWeight:700,color:C.text,lineHeight:1.2}}>{title}</h2></div>{children}</div>);
const P=({children})=>(<p style={{fontFamily:F.b,fontSize:16,lineHeight:1.8,color:C.text,margin:"0 0 18px"}} dangerouslySetInnerHTML={{__html:children}}/>);
const H3=({children})=>(<h3 style={{fontFamily:F.h,fontSize:20,fontWeight:600,color:C.text,margin:"28px 0 12px"}}>{children}</h3>);
const Cap=({children})=>(<div style={{fontFamily:F.b,fontSize:12,color:C.light,marginTop:8,marginBottom:28}}>{children}</div>);

export default function Article(){return(<div style={{background:C.bg,minHeight:"100vh"}}><style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Newsreader:ital,wght@0,400;0,600;0,700;1,400&display=swap');*{box-sizing:border-box;margin:0;padding:0}body{background:${C.bg}}`}</style>
<div style={{background:C.accent,padding:"12px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}><span style={{fontFamily:F.m,fontSize:11,color:"#FEF3C7",letterSpacing:"0.1em",textTransform:"uppercase"}}>Technical Encyclopaedic Article</span><span style={{fontFamily:F.m,fontSize:11,color:"#FEF3C7"}}>Uncertainty · Conformal Prediction · Quantile Regression · Python</span></div>
<div style={{maxWidth:820,margin:"0 auto",padding:"60px 24px 0"}}><div style={{fontFamily:F.m,fontSize:12,color:C.accent,fontWeight:600,letterSpacing:"0.08em",marginBottom:12}}>PROBABILISTIC FORECASTING</div><h1 style={{fontFamily:F.h,fontSize:"clamp(28px,4.5vw,44px)",fontWeight:700,color:C.text,lineHeight:1.15,marginBottom:20}}>Beyond Point Forecasts: Prediction Intervals That Actually Work</h1><p style={{fontFamily:F.b,fontSize:18,color:C.muted,lineHeight:1.6,maxWidth:680,marginBottom:12}}>From "demand will be 215" to "demand will be 215 [195, 238] at 90% coverage." Quantile regression for adaptiveness. Conformal prediction for guarantees. CQR for both. MAPIE for production.</p><div style={{fontFamily:F.b,fontSize:13,color:C.light,marginBottom:40}}>MAPIE 1.3+ · scikit-learn · LightGBM · Conformal Prediction · 2026</div><div style={{height:1,background:C.border,marginBottom:20}}/></div>
<div style={{maxWidth:820,margin:"0 auto",padding:"0 24px 80px"}}>

<Sec n="1" title="Why Point Forecasts Are Not Enough"><P>{`Your demand forecasting model predicts 215 units for next Tuesday. The supply chain team orders 215 units. Actual demand is 238. You stockout, losing $23k in revenue. The next week, the model predicts 220. The team orders 235 "just in case." Actual demand is 198. You overstock, incurring $15k in holding costs. The problem isn't the model's accuracy — it's the absence of uncertainty. A probabilistic forecast — "215 units, 90% prediction interval [195, 238]" — lets the team set safety stock at the 95th percentile, balancing stockout risk against holding cost.`}</P><P>{`This article covers the complete landscape: why point forecasts mislead decision-makers; quantile regression for estimating specific percentiles; conformal prediction for distribution-free coverage guarantees; CQR (Romano et al., NeurIPS 2019) for combining both; MAPIE as the production library; calibration assessment; and four use cases where prediction intervals change the economics.`}</P></Sec>
<WhyPIDiag/><Cap>Point forecast (left) gives a single number with no confidence. Probabilistic forecast (right) gives an interval that quantifies uncertainty and enables optimal decision-making.</Cap>

<NB title="00_setup.py" n={0}>{`# pip install mapie scikit-learn lightgbm pandas numpy matplotlib
from mapie.regression import MapieRegressor
from mapie.metrics import regression_coverage_score
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import train_test_split
import pandas as pd, numpy as np

# Synthetic heteroscedastic regression — uncertainty varies with X
np.random.seed(42)
n = 2000
X = np.random.uniform(0, 10, (n, 1))
noise_scale = 0.5 + 0.5 * X[:, 0]  # noise increases with X
y = 3 * np.sin(X[:, 0]) + noise_scale * np.random.normal(0, 1, n)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
print(f"Train: {"{"}{len(X_train)}{"}"}, Test: {"{"}{len(X_test)}{"}"}")
print(f"Noise is heteroscedastic: low at X≈0, high at X≈10")`}</NB>

<Callout type="info" title="Notebook Map">{`<strong>Cells 0–9</strong>: <code>Cell 0</code> Setup (§1) · <code>Cell 1</code> Quantile Regression (§3) · <code>Cell 2</code> Split Conformal (§4) · <code>Cell 3</code> MAPIE CQR (§5) · <code>Cell 4</code> Calibration Check (§7) · <code>Cell 5</code> CV+ / Jackknife+ (§6) · <code>Cell 6</code> Classification Sets (§9) · <code>Cell 7</code> Time Series CP (§10) · <code>Cell 8</code> Visualise Intervals (§8) · <code>Cell 9</code> Safety Stock (§11)`}</Callout>

<Sec n="2" title="Prediction Intervals vs. Confidence Intervals"><P>{`Practitioners constantly confuse these. A <strong>confidence interval</strong> quantifies uncertainty about a <em>parameter</em> (e.g., the population mean). A <strong>prediction interval</strong> quantifies uncertainty about a <em>future observation</em>. Prediction intervals are always wider because they include both parameter uncertainty AND irreducible noise. When the supply chain team asks "what's the range of demand?" they want a prediction interval, not a confidence interval. Using the wrong one leads to systematically narrow intervals and more stockouts than expected.`}</P><P>{`For ML models, the standard prediction interval from linear regression (<code>ŷ ± t·se·√(1 + 1/n + ...)</code>) doesn't apply — it assumes normality, homoscedasticity, and a linear model. ML models violate all three. This is why conformal prediction matters: it provides valid prediction intervals for ANY model with NO distributional assumptions.`}</P></Sec>

<Sec n="3" title="Quantile Regression"><P>{`Quantile regression directly predicts specific percentiles of the conditional distribution. Instead of minimising mean squared error (which estimates the conditional mean), it minimises the pinball loss: <code>L_τ(y, q) = τ·max(y−q, 0) + (1−τ)·max(q−y, 0)</code>, where τ is the target quantile. For τ=0.5, this gives the median. For τ=0.05 and τ=0.95, it gives a 90% prediction interval.`}</P><PinballDiag/><Cap>The pinball loss is asymmetric: for τ=0.95, under-predictions (y much greater than q) are penalised 19x more than over-predictions. This pushes the model to predict the upper tail.</Cap><P>{`LightGBM, XGBoost, and CatBoost all support quantile regression natively (objective="quantile"). You train three models — one for each quantile — to produce a prediction interval. The interval adapts to local uncertainty: wider in regions where the data is noisy, narrower where it's clean. But there is no coverage guarantee — the intervals may systematically under-cover or over-cover. Quantile crossing (the 95th percentile prediction is lower than the 5th) can also occur when models are trained independently.`}</P>
<NB title="01_quantile_regression.py" n={1}>{`from lightgbm import LGBMRegressor

# Train three quantile models for 90% prediction interval
quantiles = [0.05, 0.50, 0.95]
models = {"{"}{}{"}"}
for q in quantiles:
    m = LGBMRegressor(objective="quantile", alpha=q, n_estimators=200, random_state=42)
    m.fit(X_train, y_train)
    models[q] = m

# Predict intervals
y_lower = models[0.05].predict(X_test)
y_median = models[0.50].predict(X_test)
y_upper = models[0.95].predict(X_test)

# Check empirical coverage (should be ~90%)
coverage = np.mean((y_test >= y_lower) & (y_test <= y_upper))
avg_width = np.mean(y_upper - y_lower)
print(f"Quantile Regression 90% PI:")
print(f"  Empirical coverage: {"{"}{coverage:.1%}{"}"}  (target: 90%)")
print(f"  Average width: {"{"}{avg_width:.2f}{"}"}")
print(f"  ⚠️ No coverage guarantee — may under-cover!")`}</NB></Sec>

<Sec n="4" title="Split Conformal Prediction"><P>{`Conformal prediction provides what quantile regression cannot: a <strong>finite-sample, distribution-free coverage guarantee</strong>. The guarantee is: <code>P(Y ∈ C(X)) ≥ 1−α</code> for any distribution, any model, with finite samples. The only assumption is <strong>exchangeability</strong> — data points are exchangeable (weaker than i.i.d.; order doesn't matter). No Gaussianity. No correct model specification. No asymptotic approximation.`}</P><ConformalDiag/><Cap>Split conformal in 5 steps. The coverage guarantee P(Y ∈ interval) ≥ 1−α holds for ANY distribution and ANY model. Only assumption: exchangeability.</Cap><P>{`Split conformal is the simplest variant: (1) split data into training and calibration sets, (2) train on training data, (3) compute nonconformity scores on calibration data (typically |y − ŷ|), (4) take the (1−α) quantile of scores as the interval half-width q, (5) for new predictions: ŷ ± q. The interval has constant width — it doesn't adapt to local uncertainty. This is the main limitation: regions of low uncertainty get intervals that are too wide, and regions of high uncertainty get intervals that may be too narrow.`}</P>
<NB title="02_split_conformal.py" n={2}>{`# Split conformal with MAPIE — simplest variant
base_model = GradientBoostingRegressor(n_estimators=200, random_state=42)

mapie_naive = MapieRegressor(
    estimator=base_model,
    method="naive",  # split conformal
    cv="split",
    random_state=42,
)
mapie_naive.fit(X_train, y_train)
y_pred, y_pis = mapie_naive.predict(X_test, alpha=0.1)  # 90% coverage

coverage_naive = regression_coverage_score(y_test, y_pis[:, 0, 0], y_pis[:, 1, 0])
width_naive = np.mean(y_pis[:, 1, 0] - y_pis[:, 0, 0])
print(f"Split Conformal 90% PI:")
print(f"  Coverage: {"{"}{coverage_naive:.1%}{"}"} (guaranteed ≥ 90%)")
print(f"  Avg width: {"{"}{width_naive:.2f}{"}"}")
print(f"  Width is CONSTANT — not adaptive to local uncertainty")`}</NB></Sec>

<Sec n="5" title="Conformalized Quantile Regression (CQR)"><P>{`CQR (Romano, Patterson, Candès, NeurIPS 2019) combines the best of both worlds: the adaptiveness of quantile regression with the coverage guarantee of conformal prediction. It trains quantile regression models for the lower and upper bounds, then calibrates them using conformal prediction to ensure the coverage guarantee holds. The nonconformity score is: <code>E(x,y) = max(q̂_α/2(x) − y, y − q̂_{1−α/2}(x))</code> — how much the true value exceeds the predicted bounds.`}</P><CQRDiag/><Cap>CQR = quantile regression (adaptive width) + conformal calibration (coverage guarantee). The result: intervals that are wider where the model is uncertain and narrower where it's confident, with guaranteed coverage.</Cap><P>{`CQR inherits the adaptiveness of quantile regression: intervals are wider in high-variance regions and narrower in low-variance regions. But unlike raw quantile regression, the conformal calibration step guarantees that the overall coverage is at least 1−α. This makes CQR the current production standard for prediction intervals in ML: it's the method MAPIE defaults to for regression, and it works with any base model (gradient boosting, random forest, neural network).`}</P><P>{`The key limitation: the coverage guarantee is <strong>marginal</strong> (averaged over the data distribution), not <strong>conditional</strong> (for every subgroup). CQR may under-cover in specific subpopulations while over-covering in others, as long as the average is correct. Mondrian conformal prediction and group-conditional methods address this for fairness-sensitive applications.`}</P>
<NB title="03_cqr_mapie.py" n={3}>{`# CQR with MAPIE — adaptive + guaranteed coverage
from mapie.regression import MapieQuantileRegressor

mapie_cqr = MapieQuantileRegressor(
    estimator=GradientBoostingRegressor(n_estimators=200, random_state=42),
    alpha=0.1,  # 90% coverage
)
mapie_cqr.fit(X_train, y_train, random_state=42)
y_pred_cqr, y_pis_cqr = mapie_cqr.predict(X_test)

coverage_cqr = regression_coverage_score(y_test, y_pis_cqr[:, 0, 0], y_pis_cqr[:, 1, 0])
width_cqr = np.mean(y_pis_cqr[:, 1, 0] - y_pis_cqr[:, 0, 0])
print(f"CQR 90% PI:")
print(f"  Coverage: {"{"}{coverage_cqr:.1%}{"}"} (guaranteed ≥ 90%)")
print(f"  Avg width: {"{"}{width_cqr:.2f}{"}"}")
print(f"  Width ADAPTS to local uncertainty")
print(f"\\nComparison:")
print(f"  Split conformal width: {"{"}{width_naive:.2f}{"}"} (constant)")
print(f"  CQR width:            {"{"}{width_cqr:.2f}{"}"} (adaptive)")`}</NB></Sec>

<Sec n="6" title="CV+ and Jackknife+: No Data Waste"><P>{`Split conformal wastes data — the calibration set can't be used for training. For small datasets, this matters. <strong>Jackknife+</strong> (Barber et al., Annals of Statistics 2021) uses leave-one-out residuals as nonconformity scores: each training point gets a model trained without it, and the residual becomes its calibration score. Coverage guarantee: P(Y ∈ C(X)) ≥ 1−2α/(n+1). <strong>CV+</strong> is the cross-validation analogue: K-fold CV residuals instead of LOO. Both use all data for both training and calibration, but require K+1 model fits instead of 1.`}</P><P>{`MAPIE implements both via the <code>cv</code> parameter: <code>cv="prefit"</code> for split conformal, <code>cv=10</code> for CV+ with 10 folds, <code>cv=-1</code> for jackknife+ (LOO). For most production use cases, CV+ with 5–10 folds provides the best tradeoff between data efficiency and computational cost.`}</P>
<NB title="05_cvplus.py" n={5}>{`# CV+ with MAPIE — uses all data, no waste
mapie_cvplus = MapieRegressor(
    estimator=GradientBoostingRegressor(n_estimators=200, random_state=42),
    method="plus",
    cv=5,  # 5-fold CV+
)
mapie_cvplus.fit(X_train, y_train)
y_pred_cv, y_pis_cv = mapie_cvplus.predict(X_test, alpha=0.1)

coverage_cv = regression_coverage_score(y_test, y_pis_cv[:, 0, 0], y_pis_cv[:, 1, 0])
width_cv = np.mean(y_pis_cv[:, 1, 0] - y_pis_cv[:, 0, 0])
print(f"CV+ (5-fold) 90% PI:")
print(f"  Coverage: {"{"}{coverage_cv:.1%}{"}"}  Width: {"{"}{width_cv:.2f}{"}"}")
print(f"  Uses ALL training data for both fitting and calibration")`}</NB></Sec>

<Sec n="7" title="Calibration: Does 90% Really Mean 90%?"><P>{`A prediction interval is only useful if its nominal coverage matches its empirical coverage. A "90% interval" that contains the true value only 75% of the time gives false confidence. A "90% interval" that covers 99% of the time is too conservative — the intervals are wider than necessary, leading to wasteful decisions.`}</P><CalibDiag/><Cap>Three calibration states. Well-calibrated: nominal = empirical. Under-covering: intervals too narrow. Over-covering: intervals too wide.</Cap><P>{`<strong>How to check:</strong> (1) Empirical coverage — simply count what fraction of test observations fall within their intervals. (2) CRPS (Continuous Ranked Probability Score, Gneiting & Raftery 2007) — a proper scoring rule that evaluates the full predictive distribution. (3) Winkler score — penalises both width and miscoverage. (4) PIT histogram (Probability Integral Transform) — should be uniform for well-calibrated probabilistic forecasts.`}</P><P>{`<strong>How to fix miscalibration:</strong> conformal prediction is itself a calibration procedure — applying conformal prediction on top of any base model (even a poorly calibrated one) produces guaranteed coverage. This is why CQR works: even if the quantile regression models are miscalibrated, the conformal calibration step corrects them.`}</P>
<NB title="04_calibration.py" n={4}>{`# Calibration check across multiple coverage levels
alphas = [0.05, 0.10, 0.20, 0.30, 0.50]
print("Nominal   Empirical (CQR)   Width")
print("-" * 42)
for alpha in alphas:
    _, pis = mapie_cqr.predict(X_test, alpha=alpha) if hasattr(mapie_cqr, 'predict') else (None, None)
    if pis is not None:
        cov = regression_coverage_score(y_test, pis[:, 0, 0], pis[:, 1, 0])
        w = np.mean(pis[:, 1, 0] - pis[:, 0, 0])
        nominal = 1 - alpha
        flag = " ✓" if abs(cov - nominal) < 0.03 else " ⚠️"
        print(f"  {"{"}{nominal:.0%}{"}"}       {"{"}{cov:.1%}{"}"}            {"{"}{w:.2f}{"}"}{"{"}flag{"}"}")`}</NB></Sec>

<Sec n="8" title="Visualisation"><P>{`Always plot prediction intervals as shaded bands, not just point forecasts. For regression: x-axis = feature or time, y-axis = target, with the shaded band showing the PI and the line showing the point forecast. For time series: the fan chart (increasingly wide bands for longer horizons). The visual immediately communicates where the model is confident (narrow band) and where it's uncertain (wide band).`}</P>
<NB title="08_visualise.py" n={8}>{`import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

# Sort by X for clean visualisation
sort_idx = X_test[:, 0].argsort()
X_sorted = X_test[sort_idx, 0]
y_sorted = y_test[sort_idx]
pred_sorted = y_pred_cqr[sort_idx]
lower_sorted = y_pis_cqr[sort_idx, 0, 0]
upper_sorted = y_pis_cqr[sort_idx, 1, 0]

fig, ax = plt.subplots(figsize=(10, 5))
ax.scatter(X_sorted, y_sorted, s=3, alpha=0.3, label="True", color="grey")
ax.plot(X_sorted, pred_sorted, color="#D97706", linewidth=1.5, label="Prediction")
ax.fill_between(X_sorted, lower_sorted, upper_sorted, alpha=0.2, color="#D97706", label="90% CQR PI")
ax.set_xlabel("X")
ax.set_ylabel("y")
ax.set_title("CQR Prediction Intervals — adaptive to heteroscedastic noise")
ax.legend()
plt.tight_layout()
plt.savefig("cqr_intervals.png", dpi=150)
print("Saved: cqr_intervals.png")`}</NB></Sec>

<Sec n="9" title="Prediction Sets for Classification"><P>{`For classification, conformal prediction produces <strong>prediction sets</strong> — sets of classes that contain the true class with guaranteed probability. Instead of "the model says Class A with 87% probability," conformal prediction says "the model says the true class is in the set {"{"}A, B{"}"} with 90% coverage." Smaller sets are more informative; a set containing all classes is uninformative.`}</P><P>{`MAPIE implements three strategies: <strong>LAC</strong> (Least Ambiguous Classifier) — fixed threshold on softmax scores. <strong>APS</strong> (Adaptive Prediction Sets, Romano et al. 2020) — adapts set size based on model uncertainty. <strong>RAPS</strong> (Regularized APS) — penalises large sets to keep them small. For most applications, APS or RAPS is preferred.`}</P>
<NB title="06_classification_sets.py" n={6}>{`from mapie.classification import MapieClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris

# Classification prediction sets
iris = load_iris()
X_cls, y_cls = iris.data, iris.target
X_tr_c, X_te_c, y_tr_c, y_te_c = train_test_split(X_cls, y_cls, test_size=0.3, random_state=42)

mapie_cls = MapieClassifier(
    estimator=RandomForestClassifier(n_estimators=100, random_state=42),
    cv="prefit", method="aps",
)
mapie_cls.fit(X_tr_c, y_tr_c)
y_pred_cls, y_sets = mapie_cls.predict(X_te_c, alpha=0.1)

# Analyse prediction set sizes
set_sizes = y_sets[:, :, 0].sum(axis=1)
print(f"Prediction sets (90% coverage):")
print(f"  Mean set size: {"{"}{set_sizes.mean():.2f}{"}"} classes (out of 3)")
print(f"  Singletons: {"{"}{(set_sizes == 1).mean():.1%}{"}"}  (confident)")
print(f"  Pairs:      {"{"}{(set_sizes == 2).mean():.1%}{"}"}  (ambiguous)")
print(f"  Full:       {"{"}{(set_sizes == 3).mean():.1%}{"}"}  (uncertain)")`}</NB></Sec>

<Sec n="10" title="Conformal Prediction for Time Series"><P>{`Time series data breaks the exchangeability assumption — observations are ordered and autocorrelated. Direct application of conformal prediction to time series produces invalid coverage. Two main solutions exist: <strong>EnbPI</strong> (Ensemble Batch Prediction Intervals, Xu & Xie 2021) uses ensemble diversity instead of exchangeability, producing approximately valid intervals. <strong>ACI</strong> (Adaptive Conformal Inference, Gibbs & Candès 2021) adjusts the coverage threshold online as distribution shift occurs. MAPIE's <code>MapieTimeSeriesRegressor</code> implements both.`}</P><P>{`<strong>EnCQR</strong> (Ensemble Conformalized Quantile Regression, Feldman et al., IEEE TNNLS 2023) combines CQR with bootstrap ensembles, removing the exchangeability requirement while preserving adaptiveness. This is currently the strongest method for time series prediction intervals — valid, adaptive, and practical.`}</P>
<NB title="07_time_series.py" n={7}>{`# Time series conformal prediction (conceptual — uses MAPIE TS)
# from mapie.time_series_regression import MapieTimeSeriesRegressor

# For production TS intervals, the recommended approach:
# 1. Engineer lag/rolling features (as in the TS FE article)
# 2. Train a gradient boosting model
# 3. Apply MAPIE with method="enbpi" for ensemble-based intervals

# Conceptual: simple sliding-window conformal for TS
def sliding_conformal(model, X, y, window=100, alpha=0.1):
    """Approximate TS conformal with sliding calibration window."""
    intervals = []
    for i in range(window, len(X)):
        cal_preds = model.predict(X[i-window:i])
        cal_residuals = np.abs(y[i-window:i] - cal_preds)
        q = np.quantile(cal_residuals, 1 - alpha)
        pred = model.predict(X[i:i+1])[0]
        intervals.append((pred - q, pred, pred + q))
    return intervals

print("Time series conformal: use MAPIE MapieTimeSeriesRegressor")
print("Methods: EnbPI (ensemble-based), ACI (adaptive online)")
print("Or EnCQR for adaptive + ensemble + coverage guarantee")`}</NB></Sec>

<Sec n="11" title="Use Case: Supply Chain Safety Stock"><P>{`The direct connection between probabilistic forecasts and inventory management: safety stock = upper quantile − point forecast. A 95% prediction interval upper bound of 238 units with a point forecast of 215 means safety stock = 23 units. This directly maps the model's uncertainty to a dollar cost. <strong>The service level</strong> — the probability of meeting demand without stockout — equals the prediction interval coverage level. A 95% PI → 95% service level.`}</P><P>{`Without prediction intervals, safety stock is set by heuristic (e.g., "order 120% of the point forecast") or by historical variance. With conformal prediction intervals, safety stock is set optimally: it adapts per product and per period based on the model's uncertainty. Products the model is confident about get small safety stocks; products with high uncertainty get large safety stocks. This reduces total inventory cost while maintaining the target service level.`}</P>
<NB title="09_safety_stock.py" n={9}>{`# Safety stock calculation from prediction intervals
point = y_pred_cqr
upper_90 = y_pis_cqr[:, 1, 0]
lower_90 = y_pis_cqr[:, 0, 0]

safety_stock = upper_90 - point  # units above point forecast
interval_width = upper_90 - lower_90

print(f"Safety Stock Statistics (90% service level):")
print(f"  Mean safety stock: {"{"}{safety_stock.mean():.2f}{"}"} units")
print(f"  Median:            {"{"}{np.median(safety_stock):.2f}{"}"} units")
print(f"  Max:               {"{"}{safety_stock.max():.2f}{"}"} units")
print(f"  Mean interval width: {"{"}{interval_width.mean():.2f}{"}"}")
print(f"\\nAdaptive: safety stock varies from {"{"}{safety_stock.min():.2f}{"}"} to {"{"}{safety_stock.max():.2f}{"}"}")
print(f"→ Confident predictions get less buffer, uncertain get more")`}</NB>
<Callout type="tip" title="End of notebook">{`Cells 0–9: setup → quantile regression → split conformal → CQR → calibration → CV+ → classification sets → time series CP → visualisation → safety stock. Copy green-bordered cells in order.`}</Callout></Sec>

<Sec n="12" title="Use Case: Energy Trading"><P>{`Energy trading requires probabilistic price and load forecasts for risk-adjusted bidding. A wind farm operator bidding into the day-ahead market needs to know not just the expected generation (45 MW) but the range of outcomes (90% PI: [28, 62] MW). Bidding the point forecast and under-delivering incurs imbalance penalties. Bidding the lower bound is safe but leaves revenue on the table. The optimal bid depends on the asymmetry of penalties — which requires the full predictive distribution, not just the mean.`}</P><P>{`CQR is particularly well-suited: the intervals adapt to weather uncertainty (wide on cloudy days, narrow on sunny days) while maintaining the coverage guarantee that risk management requires. The coverage level maps directly to the Value at Risk (VaR) framework used in energy finance.`}</P></Sec>

<Sec n="13" title="Use Case: Medical Prediction"><P>{`In clinical decision support, prediction sets for classification communicate diagnostic uncertainty directly. A model predicting disease type outputs the set {"{"}Condition A, Condition B{"}"} at 95% coverage — the clinician investigates both. A singleton set {"{"}Condition A{"}"} gives high confidence. A set containing five conditions signals that the model can't distinguish and more diagnostic tests are needed. This is more actionable than a softmax probability of 0.67 — which most clinicians can't calibrate against.`}</P><P>{`For patient deterioration risk (regression), conformal prediction intervals on clinical scores (NEWS2, SOFA) let clinicians set alert thresholds: "alert if the upper bound of the predicted SOFA score exceeds 8." The coverage guarantee means the alarm has a known false negative rate — critical for patient safety.`}</P></Sec>

<Sec n="14" title="The Competitive Landscape"><MethodsLandscape/><Cap>Methods positioned by coverage guarantee strength (x) and adaptiveness (y). CQR dominates the upper-right: strong guarantees AND adaptive intervals.</Cap><VsDiag/><Cap>Six methods compared across coverage guarantee, adaptiveness, assumptions, and cost.</Cap><P>{`<strong>CQR vs. raw quantile regression:</strong> CQR adds conformal calibration on top, converting "intervals that are probably about right" into "intervals with guaranteed coverage." The cost: a calibration set holdout. The benefit: you can state "90% coverage" with mathematical certainty. <strong>CQR vs. Bayesian methods:</strong> Bayesian gives richer distributional information (full posterior predictive) but requires correct priors and is computationally expensive. CQR is prior-free, model-agnostic, and computationally cheap. <strong>CQR vs. bootstrap:</strong> bootstrap intervals tend to undercover (are too narrow) and require N retraining runs. CQR has finite-sample guarantees and requires no retraining.`}</P></Sec>

<Sec n="15" title="Limitations and Workarounds"><P>{`<strong>1. Marginal vs. conditional coverage.</strong> Conformal guarantees are marginal (averaged over the data distribution). Specific subgroups may have worse coverage. <em>Workaround:</em> Mondrian conformal prediction, group-conditional conformal, or checking coverage per subgroup. <strong>2. Exchangeability for time series.</strong> Direct conformal breaks on temporal data. <em>Workaround:</em> EnbPI, ACI, or sliding-window conformal. <strong>3. Data waste in split conformal.</strong> The calibration set can't train. <em>Workaround:</em> CV+ or jackknife+. <strong>4. Interval width vs. coverage tradeoff.</strong> Narrower intervals have lower coverage. <em>Workaround:</em> use CQR for adaptive width, or accept wider intervals for critical applications. <strong>5. No causal interpretation.</strong> Prediction intervals quantify statistical uncertainty, not causal uncertainty. They don't answer "what if we change X?"'`}</P></Sec>

<Sec n="16" title="The People"><P>{`<strong>Vladimir Vovk, Alex Gammerman, Glenn Shafer</strong> — founders of conformal prediction ("Algorithmic Learning in a Random World," 2005). <strong>Yaniv Romano, Evan Patterson, Emmanuel Candès</strong> (Stanford) — CQR (NeurIPS 2019), the paper that made conformal prediction practical for ML. <strong>Rina Foygel Barber</strong> et al. — jackknife+ and CV+ (Annals of Statistics 2021). <strong>Anastasios Angelopoulos & Stephen Bates</strong> — the definitive tutorial on conformal prediction (2023), learn-then-test framework. <strong>Thibault Cordier et al.</strong> (Quantmetry) — MAPIE library (scikit-learn-contrib, COPA 2023). <strong>Tony Duan et al.</strong> (Stanford) — NGBoost (2020), natural gradient boosting for distributional regression. <strong>Tilmann Gneiting & Adrian Raftery</strong> — proper scoring rules and calibration (JASA 2007).`}</P></Sec>

<Sec n="17" title="Where Probabilistic Forecasting Is Heading"><P>{`Three directions: (1) <strong>Conformal prediction for LLMs</strong> — applying prediction sets to language model outputs (MAPIE 2026 roadmap includes LLM-as-Judge risk control). (2) <strong>Conditional coverage</strong> — methods that guarantee coverage for every subgroup, not just marginally. The arXiv 2501.17520 (Jan 2026) paper on double-robust conditional feature importance contributes to this direction. (3) <strong>Online conformal prediction</strong> — methods that maintain coverage guarantees under distribution shift without requiring data storage. ACI (Gibbs & Candès 2021) is the foundation; production implementations are maturing in MAPIE.`}</P></Sec>

<Sec n="18" title="Decision Framework"><div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,padding:28,margin:"20px 0"}}><div style={{fontFamily:F.b,fontSize:15,lineHeight:2.2,color:C.text}}><div style={{marginBottom:8}}><span style={{color:C.green,fontWeight:700,fontSize:16}}>✓ Use conformal prediction (CQR/MAPIE) when:</span></div><div style={{paddingLeft:24,fontSize:14,lineHeight:2}}>You need prediction intervals with formal coverage guarantees.<br/>Your model is any sklearn-compatible estimator (model-agnostic).<br/>The data is exchangeable (or time series with EnbPI/ACI adaptation).<br/>You need calibrated uncertainty for downstream decisions (safety stock, risk).<br/>You want adaptive intervals that reflect local uncertainty (use CQR).<br/>Regulatory requirements demand quantified uncertainty (EU AI Act, medical devices).</div><div style={{marginTop:20,marginBottom:8}}><span style={{color:C.red,fontWeight:700,fontSize:16}}>✗ Consider alternatives when:</span></div><div style={{paddingLeft:24,fontSize:14,lineHeight:2}}>You need the full predictive distribution, not just intervals → NGBoost, Bayesian, DeepAR.<br/>You need causal uncertainty ("what if") → causal inference methods.<br/>You need conditional coverage per subgroup → Mondrian or group-conditional methods.<br/>Your data has strong distribution shift → online methods or careful window selection.<br/>You need point predictions only → standard regression (but consider adding intervals anyway).</div></div></div><P>{`Every point forecast is a lie by omission — it omits how wrong it might be. Prediction intervals tell the decision-maker: "I predict 215, but I could be off by as much as 23 in either direction." Conformal prediction makes this statement mathematically rigorous. CQR makes it adaptive. MAPIE makes it practical. In 2026, shipping a prediction without a prediction interval is like shipping a measurement without an error bar — technically possible, but professionally irresponsible.`}</P></Sec>

<div style={{marginTop:60,paddingTop:24,borderTop:`1px solid ${C.border}`}}><div style={{fontFamily:F.b,fontSize:12,color:C.light,lineHeight:1.8}}><strong>Sources:</strong> MAPIE docs (mapie.readthedocs.io), scikit-learn-contrib. <strong>Academic:</strong> Vovk, Gammerman, Shafer 2005 (Conformal Prediction); Romano, Patterson, Candès NeurIPS 2019 (CQR); Barber, Candès, Ramdas, Tibshirani, Annals of Statistics 2021 (Jackknife+/CV+); Angelopoulos & Bates 2023 (Tutorial); Gneiting & Raftery JASA 2007 (Scoring Rules); Duan et al. 2020 (NGBoost); Xu & Xie 2021 (EnbPI); Gibbs & Candès 2021 (ACI); Cordier et al. COPA 2023 (MAPIE); Feldman et al. IEEE TNNLS 2023 (EnCQR). <strong>Software:</strong> MAPIE, scikit-learn, LightGBM quantile, NeuralProphet, GluonTS.</div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12,marginTop:16}}><div style={{fontFamily:F.m,fontSize:11,color:C.light}}>MAPIE 1.3+ · scikit-learn · CQR · Conformal Prediction</div><div style={{fontFamily:F.m,fontSize:11,color:C.light}}>Length determined by information, not word count</div></div></div>
</div></div>);}
