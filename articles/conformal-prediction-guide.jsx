/* --- YAML frontmatter --- */
/*
title: "Guaranteed Prediction Intervals for Any Model: The Definitive Guide"
subtitle: "Distribution-free, finite-sample coverage guarantees. No Gaussianity. No Bayesian priors. Works with any model."
category: "statistics"
style: "technical-ds"
date: "2026-04-19"
tags: [conformal-prediction, uncertainty, calibration]
*/

const ARTICLE_DATA = {
  title: "Guaranteed Prediction Intervals for Any Model: The Definitive Guide",
  subtitle: "Distribution-free, finite-sample coverage guarantees. No Gaussianity. No Bayesian priors. Works with any model.",
  category: "statistics",
  style: "technical-ds",
  date: "2026-04-19",
  author: "Matthew Deane",
  tags: ["conformal-prediction", "uncertainty", "calibration"],
};

const C={bg:"#FAFBFC",card:"#FFFFFF",border:"#E2E8F0",accent:"#0F766E",accentLight:"#CCFBF1",accentDark:"#064E3B",text:"#1E293B",muted:"#64748B",light:"#94A3B8",code:"#1E1E2E",codeBg:"#F1F5F9",warn:"#F59E0B",warnBg:"#FFFBEB",info:"#3B82F6",infoBg:"#EFF6FF",green:"#10B981",red:"#EF4444",purple:"#7C3AED",orange:"#F97316",tipBg:"#F0FDF4",indigo:"#6366F1",violet:"#8B5CF6",sky:"#0EA5E9",amber:"#D97706"};
const F={h:"'Newsreader',Georgia,serif",b:"'Inter',-apple-system,sans-serif",m:"'JetBrains Mono','Fira Code',monospace"};
const GuaranteeDiag=()=>(<svg viewBox="0 0 760 175" style={{width:"100%",display:"block"}}><rect width="760" height="175" fill="#fff" rx="8" stroke={C.border} strokeWidth="1"/><text x="380" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontFamily={F.b} fontWeight="700">The Conformal Prediction Guarantee</text><rect x="80" y="48" width="600" height="70" rx="8" fill={C.accentLight} stroke={C.accent} strokeWidth="2"/><text x="380" y="75" textAnchor="middle" fill={C.accent} fontSize="16" fontFamily={F.m} fontWeight="700">P(Y_new ∈ C(X_new)) ≥ 1 − α</text><text x="380" y="100" textAnchor="middle" fill={C.accentDark} fontSize="11" fontFamily={F.b}>For ANY distribution · ANY model · FINITE samples · Only requires exchangeability</text><text x="380" y="140" textAnchor="middle" fill={C.text} fontSize="10" fontFamily={F.b}>No Gaussianity. No correct model specification. No asymptotics. No Bayesian priors.</text><text x="380" y="165" textAnchor="middle" fill={C.light} fontSize="8" fontFamily={F.b}>Vovk, Gammerman, Shafer (2005) · Romano, Patterson, Candès NeurIPS 2019 · Barber et al. Annals of Statistics 2021</text></svg>);
const SplitCPDiag=()=>(<svg viewBox="0 0 760 185" style={{width:"100%",display:"block"}}><rect width="760" height="185" fill="#fff" rx="8" stroke={C.border} strokeWidth="1"/><text x="380" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontFamily={F.b} fontWeight="700">Split Conformal Prediction: 5 Steps to Guaranteed Intervals</text>{[{x:15,w:135,t:"1. Split",d:"Train set +\nCalibration set",c:C.accent},{x:163,w:135,t:"2. Train",d:"Fit model on\ntrain only",c:C.sky},{x:311,w:135,t:"3. Score",d:"Compute |y − ŷ|\non calibration",c:C.violet},{x:459,w:135,t:"4. Quantile",d:"q = ⌈(1-α)(n+1)⌉/n\nof scores",c:C.green},{x:607,w:135,t:"5. Predict",d:"ŷ ± q\n= valid PI",c:C.amber}].map((s,i)=>(<g key={i}>{i>0&&<text x={s.x-8} y="100" fill={C.border} fontSize="12">→</text>}<rect x={s.x} y="42" width={s.w} height="105" rx="6" fill={s.c} opacity="0.1" stroke={s.c} strokeWidth="1"/><text x={s.x+s.w/2} y="62" textAnchor="middle" fill={s.c} fontSize="10" fontFamily={F.b} fontWeight="700">{s.t}</text>{s.d.split("\n").map((ln,li)=>(<text key={li} x={s.x+s.w/2} y={85+li*15} textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.m}>{ln}</text>))}</g>))}<text x="380" y="170" textAnchor="middle" fill={C.accent} fontSize="9" fontFamily={F.b} fontWeight="700">Coverage guarantee: P(Y ∈ [ŷ−q, ŷ+q]) ≥ 1−α</text></svg>);
const ScoreDiag=()=>(<svg viewBox="0 0 760 170" style={{width:"100%",display:"block"}}><rect width="760" height="170" fill="#fff" rx="8" stroke={C.border} strokeWidth="1"/><text x="380" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontFamily={F.b} fontWeight="700">Nonconformity Scores: The Core Abstraction</text>{[{x:25,w:225,t:"Regression",d:"|y − ŷ| (absolute residual)\n→ Constant-width intervals\nSimple but not adaptive",c:C.accent},{x:265,w:225,t:"CQR Score",d:"max(q̂_lo − y, y − q̂_hi)\n→ Adaptive-width intervals\nWider where uncertain",c:C.green},{x:505,w:225,t:"Classification",d:"1 − f(x)_y (softmax gap)\n→ Prediction SETS\nSmaller set = more confident",c:C.violet}].map((s,i)=>(<g key={i}><rect x={s.x} y="38" width={s.w} height="110" rx="6" fill={s.c} opacity="0.08" stroke={s.c} strokeWidth="1"/><text x={s.x+s.w/2} y="58" textAnchor="middle" fill={s.c} fontSize="10" fontFamily={F.b} fontWeight="700">{s.t}</text>{s.d.split("\n").map((ln,li)=>(<text key={li} x={s.x+s.w/2} y={80+li*14} textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.b}>{ln}</text>))}</g>))}<text x="380" y="162" textAnchor="middle" fill={C.light} fontSize="8" fontFamily={F.b}>The score measures "how wrong" the model is. Higher score = less conforming. The α-quantile of scores sets the interval.</text></svg>);
const CQRDiag=()=>(<svg viewBox="0 0 760 170" style={{width:"100%",display:"block"}}><rect width="760" height="170" fill="#fff" rx="8" stroke={C.border} strokeWidth="1"/><text x="380" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontFamily={F.b} fontWeight="700">CQR: Quantile Regression + Conformal = Best of Both</text><rect x="30" y="42" width="210" height="100" rx="6" fill={C.codeBg} stroke={C.sky} strokeWidth="1"/><text x="135" y="62" textAnchor="middle" fill={C.sky} fontSize="10" fontFamily={F.b} fontWeight="700">Quantile Regression</text><text x="135" y="82" textAnchor="middle" fill={C.green} fontSize="9" fontFamily={F.b}>✓ Adaptive width</text><text x="135" y="98" textAnchor="middle" fill={C.red} fontSize="9" fontFamily={F.b}>✗ No guarantee</text><text x="265" y="92" fill={C.accent} fontSize="16" fontWeight="700">+</text><rect x="290" y="42" width="170" height="100" rx="6" fill={C.codeBg} stroke={C.accent} strokeWidth="1"/><text x="375" y="62" textAnchor="middle" fill={C.accent} fontSize="10" fontFamily={F.b} fontWeight="700">Conformal</text><text x="375" y="82" textAnchor="middle" fill={C.green} fontSize="9" fontFamily={F.b}>✓ Guarantee</text><text x="375" y="98" textAnchor="middle" fill={C.red} fontSize="9" fontFamily={F.b}>✗ Constant width</text><text x="485" y="92" fill={C.green} fontSize="16" fontWeight="700">=</text><rect x="510" y="42" width="220" height="100" rx="6" fill={C.accentLight} stroke={C.green} strokeWidth="1.5"/><text x="620" y="62" textAnchor="middle" fill={C.green} fontSize="10" fontFamily={F.b} fontWeight="700">CQR (NeurIPS 2019)</text><text x="620" y="82" textAnchor="middle" fill={C.green} fontSize="9" fontFamily={F.b}>✓ Adaptive width</text><text x="620" y="98" textAnchor="middle" fill={C.green} fontSize="9" fontFamily={F.b}>✓ Coverage guarantee</text><text x="620" y="118" textAnchor="middle" fill={C.green} fontSize="8" fontFamily={F.b}>Production standard 2026</text></svg>);
const CVPlusDiag=()=>(<svg viewBox="0 0 760 170" style={{width:"100%",display:"block"}}><rect width="760" height="170" fill="#fff" rx="8" stroke={C.border} strokeWidth="1"/><text x="380" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontFamily={F.b} fontWeight="700">Split Conformal vs. CV+ vs. Jackknife+: Data Efficiency Tradeoffs</text>{[{x:25,w:225,t:"Split Conformal",d:"Hold out calibration set\nOne model fit\nWastes data",c:C.light},{x:265,w:225,t:"CV+ (K-fold)",d:"K-fold cross-validation\nK+1 model fits\nUses all data",c:C.accent},{x:505,w:225,t:"Jackknife+ (LOO)",d:"Leave-one-out residuals\nn model fits (expensive)\nMaximal data efficiency",c:C.green}].map((s,i)=>(<g key={i}><rect x={s.x} y="42" width={s.w} height="100" rx="6" fill={s.c} opacity="0.08" stroke={s.c} strokeWidth="1.5"/><text x={s.x+s.w/2} y="62" textAnchor="middle" fill={s.c} fontSize="10" fontFamily={F.b} fontWeight="700">{s.t}</text>{s.d.split("\n").map((ln,li)=>(<text key={li} x={s.x+s.w/2} y={82+li*14} textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.b}>{ln}</text>))}</g>))}<text x="380" y="160" textAnchor="middle" fill={C.light} fontSize="8" fontFamily={F.b}>All provide coverage guarantees. CV+ with 5-10 folds is the practical default. Barber et al. 2021.</text></svg>);
const PredSetDiag=()=>(<svg viewBox="0 0 760 170" style={{width:"100%",display:"block"}}><rect width="760" height="170" fill="#fff" rx="8" stroke={C.border} strokeWidth="1"/><text x="380" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontFamily={F.b} fontWeight="700">Classification: Prediction Sets Instead of Single Labels</text>{[{x:25,w:225,t:"Confident: Singleton",d:"Prediction set = { A }\nModel is certain\nClinician acts on A",c:C.green},{x:265,w:225,t:"Ambiguous: Pair",d:"Prediction set = { A, B }\nModel can't distinguish\nOrder more tests",c:C.amber},{x:505,w:225,t:"Uncertain: Large",d:"Prediction set = { A,B,C,D }\nModel knows little\nRefer to specialist",c:C.red}].map((s,i)=>(<g key={i}><rect x={s.x} y="42" width={s.w} height="105" rx="6" fill={s.c} opacity="0.08" stroke={s.c} strokeWidth="1.5"/><text x={s.x+s.w/2} y="62" textAnchor="middle" fill={s.c} fontSize="10" fontFamily={F.b} fontWeight="700">{s.t}</text>{s.d.split("\n").map((ln,li)=>(<text key={li} x={s.x+s.w/2} y={82+li*14} textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.b}>{ln}</text>))}</g>))}<text x="380" y="162" textAnchor="middle" fill={C.light} fontSize="8" fontFamily={F.b}>Guaranteed: the true class is in the set with probability ≥ 1−α. Smaller sets = more informative.</text></svg>);
const VsDiag=()=>(<svg viewBox="0 0 760 180" style={{width:"100%",display:"block"}}><rect width="760" height="180" fill="#fff" rx="8" stroke={C.border} strokeWidth="1"/><text x="380" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontFamily={F.b} fontWeight="700">Conformal Prediction vs. Alternative UQ Methods</text><line x1="40" y1="45" x2="740" y2="45" stroke={C.border} strokeWidth="1"/>{["Method","Coverage","Adaptive?","Assumptions","Cost"].map((h,i)=>(<text key={i} x={40+i*145} y="40" fill={C.accent} fontSize="9" fontFamily={F.b} fontWeight="700">{h}</text>))}{[["Split Conformal","Guaranteed","No","Exchangeable","1 model"],["CQR","Guaranteed","Yes","Exchangeable","3 models"],["CV+ / JK+","Guaranteed","No","Exchangeable","K models"],["Quantile Reg","None","Yes","Model spec","3 models"],["Bootstrap","Asymptotic","No","i.i.d.","N models"],["Bayesian","Conditional*","Yes","Correct prior","1 model"]].map((row,r)=>{const y=65+r*18;return(<g key={r}>{r%2===0&&<rect x="40" y={y-10} width="700" height="18" fill={C.codeBg} rx="2"/>}{row.map((cell,c)=>(<text key={c} x={40+c*145} y={y+2} fill={c===0?C.accent:cell==="Guaranteed"?C.green:cell==="None"?C.red:C.text} fontSize="8.5" fontFamily={c===0?F.b:F.m} fontWeight={c===0?"600":"400"}>{cell}</text>))}</g>);})}<text x="380" y="175" textAnchor="middle" fill={C.light} fontSize="8" fontFamily={F.b}>*Bayesian coverage is conditional but requires correct prior specification.</text></svg>);
const MAPIEDiag=()=>(<svg viewBox="0 0 760 165" style={{width:"100%",display:"block"}}><rect width="760" height="165" fill="#fff" rx="8" stroke={C.border} strokeWidth="1"/><text x="380" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontFamily={F.b} fontWeight="700">MAPIE: The Production Conformal Prediction Library</text>{[{x:25,w:170,t:"MapieRegressor",d:"Split, CV+, JK+\nCQR support\nAny sklearn model",c:C.accent},{x:210,w:170,t:"MapieClassifier",d:"LAC, APS, RAPS\nPrediction sets\nTop-k calibrated",c:C.sky},{x:395,w:170,t:"MapieTimeSeries",d:"EnbPI, ACI\nNon-exchangeable\nSliding calibration",c:C.violet},{x:580,w:155,t:"MapieMultiLabel",d:"Risk control\nRecall guarantees\nImage segmentation",c:C.green}].map((m,i)=>(<g key={i}><rect x={m.x} y="38" width={m.w} height="105" rx="6" fill={m.c} opacity="0.08" stroke={m.c} strokeWidth="1"/><text x={m.x+m.w/2} y="58" textAnchor="middle" fill={m.c} fontSize="10" fontFamily={F.b} fontWeight="700">{m.t}</text>{m.d.split("\n").map((ln,li)=>(<text key={li} x={m.x+m.w/2} y={78+li*14} textAnchor="middle" fill={C.text} fontSize="8.5" fontFamily={F.b}>{ln}</text>))}</g>))}<text x="380" y="158" textAnchor="middle" fill={C.light} fontSize="8" fontFamily={F.b}>scikit-learn-contrib · Cordier et al. COPA 2023 · 2026 roadmap: LLM risk control</text></svg>);
const Code=({children,title})=>(<div style={{margin:"24px 0",borderRadius:8,overflow:"hidden",border:`1px solid ${C.border}`}}>{title&&<div style={{background:C.code,padding:"8px 16px",fontFamily:F.m,fontSize:11,color:"#A78BFA",letterSpacing:"0.05em"}}>{title}</div>}<pre style={{background:C.code,padding:"16px 20px",margin:0,overflowX:"auto",fontSize:12.5,lineHeight:1.7,fontFamily:F.m,color:"#E2E8F0"}}><code>{children}</code></pre></div>);
const NB=({children,title,n})=>(<div style={{margin:"24px 0",borderRadius:8,overflow:"hidden",border:`1px solid ${C.border}`,borderLeft:`3px solid ${C.green}`}}><div style={{background:C.code,padding:"8px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontFamily:F.m,fontSize:11,color:"#A78BFA",letterSpacing:"0.05em"}}>{title}</span><span style={{fontFamily:F.m,fontSize:10,color:C.green,background:"rgba(16,185,129,0.15)",padding:"2px 8px",borderRadius:4}}>Cell {n}</span></div><pre style={{background:C.code,padding:"16px 20px",margin:0,overflowX:"auto",fontSize:12.5,lineHeight:1.7,fontFamily:F.m,color:"#E2E8F0"}}><code>{children}</code></pre></div>);
const Callout=({type="info",title,children})=>{const s={info:{bg:C.infoBg,border:C.info,icon:"💡"},warn:{bg:C.warnBg,border:C.warn,icon:"⚠️"},tip:{bg:C.tipBg,border:C.green,icon:"✅"}}[type];return(<div style={{margin:"28px 0",padding:"20px 24px",background:s.bg,borderLeft:`4px solid ${s.border}`,borderRadius:"0 8px 8px 0"}}><div style={{fontFamily:F.b,fontSize:13,fontWeight:700,color:s.border,marginBottom:6}}>{s.icon} {title}</div><div style={{fontFamily:F.b,fontSize:14,lineHeight:1.7,color:C.text}} dangerouslySetInnerHTML={{__html:children}}/></div>);};
const Sec=({n,title,children})=>(<div style={{margin:"56px 0 0"}}><div style={{display:"flex",alignItems:"baseline",gap:12,marginBottom:20}}><span style={{fontFamily:F.m,fontSize:13,color:C.accent,fontWeight:700}}>§{n}</span><h2 style={{fontFamily:F.h,fontSize:28,fontWeight:700,color:C.text,lineHeight:1.2}}>{title}</h2></div>{children}</div>);
const P=({children})=>(<p style={{fontFamily:F.b,fontSize:16,lineHeight:1.8,color:C.text,margin:"0 0 18px"}} dangerouslySetInnerHTML={{__html:children}}/>);
const Cap=({children})=>(<div style={{fontFamily:F.b,fontSize:12,color:C.light,marginTop:8,marginBottom:28}}>{children}</div>);

export default function Article(){return(<div style={{background:C.bg,minHeight:"100vh"}}><style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Newsreader:ital,wght@0,400;0,600;0,700;1,400&display=swap');*{box-sizing:border-box;margin:0;padding:0}body{background:${C.bg}}`}</style>
<div style={{background:C.accent,padding:"12px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}><span style={{fontFamily:F.m,fontSize:11,color:"#CCFBF1",letterSpacing:"0.1em",textTransform:"uppercase"}}>Technical Encyclopaedic Article</span><span style={{fontFamily:F.m,fontSize:11,color:"#CCFBF1"}}>Uncertainty Quantification · Conformal Prediction · MAPIE · CQR</span></div>
<div style={{maxWidth:820,margin:"0 auto",padding:"60px 24px 0"}}><div style={{fontFamily:F.m,fontSize:12,color:C.accent,fontWeight:600,letterSpacing:"0.08em",marginBottom:12}}>CONFORMAL PREDICTION</div><h1 style={{fontFamily:F.h,fontSize:"clamp(28px,4.5vw,44px)",fontWeight:700,color:C.text,lineHeight:1.15,marginBottom:20}}>Guaranteed Prediction Intervals for Any Model: The Definitive Guide</h1><p style={{fontFamily:F.b,fontSize:18,color:C.muted,lineHeight:1.6,maxWidth:680,marginBottom:12}}>Distribution-free, finite-sample coverage guarantees. No Gaussianity. No Bayesian priors. Works with any model. This is the uncertainty quantification framework that is replacing bootstrap intervals and Bayesian credible intervals in production ML.</p><div style={{fontFamily:F.b,fontSize:13,color:C.light,marginBottom:40}}>MAPIE 1.3+ · scikit-learn compatible · CQR · Prediction Sets · 2026</div><div style={{height:1,background:C.border,marginBottom:20}}/></div>
<div style={{maxWidth:820,margin:"0 auto",padding:"0 24px 80px"}}>

<Sec n="1" title="The Uncertainty Problem in ML"><P>{`Your ML model predicts a number. The decision-maker asks: "How confident are you?" The model has no answer. Softmax probabilities are poorly calibrated — a classifier that says "87% confidence" is often wrong 30% of the time. Regression models give point predictions with no error bars. Bootstrap intervals are approximate and tend to undercover. Bayesian methods require specifying priors that are often wrong. The fundamental question — "what is the range of plausible values for this prediction?" — remains unanswered by standard ML.`}</P><P>{`Conformal prediction solves this. It wraps around any model and produces prediction intervals (for regression) or prediction sets (for classification) with a mathematical guarantee: <strong>the true value is contained with probability at least 1−α</strong>. This guarantee holds for any distribution, any model, with finite samples. The only assumption is exchangeability — a condition weaker than i.i.d. that simply says the ordering of data points doesn't carry information. This article covers everything: the theory, the algorithms, the MAPIE library, and four production use cases.`}</P></Sec>

<GuaranteeDiag/><Cap>The conformal prediction guarantee. P(Y ∈ C(X)) ≥ 1−α for any distribution, any model, finite samples. Only requires exchangeability.</Cap>

<NB title="00_setup.py" n={0}>{`# pip install mapie scikit-learn pandas numpy matplotlib
from mapie.regression import MapieRegressor, MapieQuantileRegressor
from mapie.classification import MapieClassifier
from mapie.metrics import regression_coverage_score
from sklearn.ensemble import GradientBoostingRegressor, RandomForestClassifier
from sklearn.model_selection import train_test_split
import numpy as np, pandas as pd

# Heteroscedastic regression data
np.random.seed(42)
n = 3000
X = np.sort(np.random.uniform(0, 10, n)).reshape(-1, 1)
noise = (0.3 + 0.5 * X[:, 0]) * np.random.normal(0, 1, n)
y = 3 * np.sin(X[:, 0]) + noise  # noise grows with X

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
print(f"Train: {"{"}len(X_train){"}"}, Test: {"{"}len(X_test){"}"}")
print(f"Noise is heteroscedastic: σ grows from {"{"}0.3:.1f{"}"} to {"{"}0.3+0.5*10:.1f{"}"}")`}</NB>

<Callout type="info" title="Notebook Map">{`<strong>Cells 0–9</strong>: <code>Cell 0</code> Setup (§1) · <code>Cell 1</code> Split Conformal (§3) · <code>Cell 2</code> CQR (§4) · <code>Cell 3</code> CV+ (§5) · <code>Cell 4</code> Calibration Check (§7) · <code>Cell 5</code> Classification Sets (§8) · <code>Cell 6</code> Visualise (§9) · <code>Cell 7</code> Compare Methods (§10) · <code>Cell 8</code> Time Series (§11) · <code>Cell 9</code> Production (§12)`}</Callout>

<Sec n="2" title="Exchangeability: The Only Assumption"><P>{`Conformal prediction requires one assumption: <strong>exchangeability</strong>. A sequence of random variables Z₁, Z₂, ..., Zₙ is exchangeable if their joint distribution is invariant under any permutation. This is weaker than i.i.d.: i.i.d. data is always exchangeable, but exchangeable data need not be independent (e.g., sampling without replacement from a finite population is exchangeable but not independent).`}</P><P>{`When does exchangeability fail? <strong>Time series</strong> — observations are ordered, autocorrelated, and potentially non-stationary. Direct application of conformal prediction to time series gives invalid coverage. <strong>Distribution shift</strong> — if the test distribution differs from the calibration distribution, the guarantee weakens. <strong>Feedback loops</strong> — if the model's predictions influence the data-generating process (e.g., a recommendation system), exchangeability breaks.`}</P><P>{`For time series, adaptations exist: EnbPI (Xu & Xie 2021) uses ensemble diversity, ACI (Gibbs & Candès 2021) adjusts online. For distribution shift, robust conformal prediction (Cauchois et al. 2021) and Mondrian conformal provide partial solutions. The key insight: conformal prediction's coverage guarantee degrades gracefully — even when exchangeability is approximately violated, coverage is approximately correct.`}</P></Sec>

<Sec n="3" title="Split Conformal Prediction"><P>{`The simplest and most practical variant. (1) Split data into training and calibration sets. (2) Train the model on the training set. (3) Compute nonconformity scores on the calibration set — typically the absolute residual <code>sᵢ = |yᵢ − ŷᵢ|</code>. (4) Compute the (1−α)(1+1/n)-quantile of the calibration scores as the interval half-width q. (5) For a new prediction: the interval is <code>[ŷ − q, ŷ + q]</code>. The guarantee: P(Y ∈ [ŷ−q, ŷ+q]) ≥ 1−α.`}</P><SplitCPDiag/><Cap>Split conformal in 5 steps. The resulting interval has constant width — it doesn't adapt to local uncertainty. This is the main limitation, addressed by CQR.</Cap><P>{`The constant-width limitation is significant for heteroscedastic data. If noise is low in one region and high in another, split conformal produces intervals that are too wide in the low-noise region (over-covering, wasteful) and potentially too narrow in the high-noise region (under-covering locally, though marginally correct). CQR solves this.`}</P>
<NB title="01_split_conformal.py" n={1}>{`# Split conformal with MAPIE
base_model = GradientBoostingRegressor(n_estimators=200, random_state=42)

mapie_split = MapieRegressor(
    estimator=base_model,
    method="naive",  # split conformal
    cv="split",
    random_state=42,
)
mapie_split.fit(X_train, y_train)
y_pred, y_pis = mapie_split.predict(X_test, alpha=0.1)  # 90% PI

coverage = regression_coverage_score(y_test, y_pis[:, 0, 0], y_pis[:, 1, 0])
width = np.mean(y_pis[:, 1, 0] - y_pis[:, 0, 0])
print(f"Split Conformal 90% PI:")
print(f"  Coverage: {"{"}coverage:.1%{"}"} (guaranteed ≥ 90%)")
print(f"  Avg width: {"{"}width:.2f{"}"} (CONSTANT — same everywhere)")`}</NB></Sec>

<Sec n="4" title="Conformalized Quantile Regression (CQR)"><P>{`CQR (Romano, Patterson, Candès, NeurIPS 2019) is the production standard. It trains quantile regression models for lower and upper bounds, then applies conformal calibration to guarantee coverage. The nonconformity score is: <code>E(x,y) = max(q̂_α/2(x) − y, y − q̂_{1−α/2}(x))</code>. This score measures how much the true value exceeds the predicted bounds — it's zero when y is inside the predicted interval and positive when it's outside.`}</P><CQRDiag/><Cap>CQR = quantile regression (adaptive) + conformal calibration (guaranteed). The result: intervals that are narrower where the model is confident and wider where it's uncertain, with guaranteed coverage.</Cap><P>{`The conformalization step adjusts the quantile predictions by a constant q (the quantile of calibration scores): <code>[q̂_α/2(x) − q, q̂_{1−α/2}(x) + q]</code>. This additive correction ensures the overall coverage is at least 1−α. If the quantile regression model is already well-calibrated, q will be small and the intervals change minimally. If the model miscalibrates, q corrects it. Either way, the guarantee holds.`}</P><P>{`CQR inherits quantile regression's adaptiveness: intervals are wider in noisy regions and narrower in clean regions. And it inherits conformal prediction's guarantee: coverage is at least 1−α marginally. This combination is why CQR is the default method in MAPIE and the recommended approach for production prediction intervals.`}</P>
<NB title="02_cqr.py" n={2}>{`# CQR with MAPIE — adaptive + guaranteed
mapie_cqr = MapieQuantileRegressor(
    estimator=GradientBoostingRegressor(n_estimators=200, random_state=42),
    alpha=0.1,
)
mapie_cqr.fit(X_train, y_train, random_state=42)
y_pred_cqr, y_pis_cqr = mapie_cqr.predict(X_test)

cov_cqr = regression_coverage_score(y_test, y_pis_cqr[:, 0, 0], y_pis_cqr[:, 1, 0])
w_cqr = np.mean(y_pis_cqr[:, 1, 0] - y_pis_cqr[:, 0, 0])
print(f"CQR 90% PI:")
print(f"  Coverage: {"{"}cov_cqr:.1%{"}"} (guaranteed ≥ 90%)")
print(f"  Avg width: {"{"}w_cqr:.2f{"}"} (ADAPTIVE)")
print(f"\\nComparison: split conformal width = {"{"}width:.2f{"}"} (constant)")
print(f"            CQR width = {"{"}w_cqr:.2f{"}"} (adapts to local noise)")`}</NB></Sec>

<Sec n="5" title="CV+ and Jackknife+: No Data Waste"><P>{`Split conformal wastes the calibration set — data that can't be used for training. For small datasets, this matters. <strong>Jackknife+</strong> (Barber et al., Annals of Statistics 2021) uses leave-one-out residuals: each training point gets a model trained without it. Coverage guarantee: P(Y ∈ C(X)) ≥ 1−2α/(n+1). <strong>CV+</strong> is the K-fold version: K models trained on K-1 folds each, residuals computed on held-out folds. CV+ with 5-10 folds is the practical default.`}</P><CVPlusDiag/><Cap>Three conformal variants trading off data efficiency against computation. CV+ (middle) is the production sweet spot.</Cap>
<NB title="03_cvplus.py" n={3}>{`# CV+ with MAPIE — uses all data
mapie_cv = MapieRegressor(
    estimator=GradientBoostingRegressor(n_estimators=200, random_state=42),
    method="plus",
    cv=5,
)
mapie_cv.fit(X_train, y_train)
y_pred_cv, y_pis_cv = mapie_cv.predict(X_test, alpha=0.1)

cov_cv = regression_coverage_score(y_test, y_pis_cv[:, 0, 0], y_pis_cv[:, 1, 0])
w_cv = np.mean(y_pis_cv[:, 1, 0] - y_pis_cv[:, 0, 0])
print(f"CV+ (5-fold) 90% PI:")
print(f"  Coverage: {"{"}cov_cv:.1%{"}"}")
print(f"  Width: {"{"}w_cv:.2f{"}"}")
print(f"  Uses ALL training data — no waste")`}</NB></Sec>

<Sec n="6" title="Nonconformity Scores"><ScoreDiag/><Cap>The score function determines interval shape. Absolute residual → constant width. CQR score → adaptive width. Classification score → prediction set size.</Cap><P>{`The nonconformity score is the core abstraction. For regression, the absolute residual <code>|y − ŷ|</code> is the simplest score — it produces constant-width intervals. The CQR score <code>max(q̂_lo − y, y − q̂_hi)</code> produces adaptive intervals. Normalised residuals <code>|y − ŷ| / σ̂(x)</code> (where σ̂ is an estimated uncertainty) also produce adaptive intervals. For classification, <code>1 − f(x)_y</code> (one minus the softmax probability of the true class) produces prediction sets — smaller sets for confident predictions, larger sets for uncertain ones.`}</P><P>{`The choice of score determines the quality of the intervals. Better scores produce tighter intervals with the same coverage guarantee. This is the main lever for improving conformal prediction performance: invest in better base models and better score functions, not in changing the conformal wrapper.`}</P></Sec>

<Sec n="7" title="Calibration Verification"><P>{`Even though conformal prediction guarantees marginal coverage, you should verify empirically. The check is simple: compute the empirical coverage at multiple α levels and compare to the nominal coverage. A well-calibrated system shows empirical coverage ≥ nominal at every level. Additionally, check coverage per subgroup (gender, region, age bracket) to detect potential conditional coverage failures.`}</P>
<NB title="04_calibration.py" n={4}>{`# Calibration check across coverage levels
alphas = [0.05, 0.10, 0.20, 0.30, 0.50]
print("Nominal   Emp.Coverage   Width    Status")
print("-" * 50)
for alpha in alphas:
    _, pis = mapie_cqr.predict(X_test, alpha=alpha) if hasattr(mapie_cqr, 'predict') else (None, None)
    if pis is not None:
        cov = regression_coverage_score(y_test, pis[:, 0, 0], pis[:, 1, 0])
        w = np.mean(pis[:, 1, 0] - pis[:, 0, 0])
        nominal = 1 - alpha
        ok = "✓" if cov >= nominal - 0.02 else "⚠️ under-cover"
        print(f"  {"{"}nominal:.0%{"}"}       {"{"}cov:.1%{"}"}          {"{"}w:.2f{"}"}     {"{"}ok{"}"}")`}</NB></Sec>

<Sec n="8" title="Prediction Sets for Classification"><P>{`For classification, conformal prediction produces <strong>prediction sets</strong> — sets of classes that contain the true class with guaranteed probability. The set size communicates confidence: a singleton set means the model is sure, a large set means it's uncertain. This is more actionable than a softmax probability — "the disease is either A or B" is a clear clinical instruction; "the probability of A is 0.55" is ambiguous.`}</P><PredSetDiag/><Cap>Prediction set sizes communicate model confidence. Singletons = confident. Pairs = ambiguous. Large sets = uncertain. The true class is in the set with probability ≥ 1−α.</Cap><P>{`MAPIE implements three strategies: <strong>LAC</strong> (Least Ambiguous Classifier) — fixed threshold on softmax. <strong>APS</strong> (Adaptive Prediction Sets, Romano et al. 2020) — cumulative softmax threshold. <strong>RAPS</strong> (Regularized APS, Angelopoulos et al. 2021) — penalises large sets. RAPS is recommended for most applications because it produces the smallest sets while maintaining coverage.`}</P>
<NB title="05_classification.py" n={5}>{`from sklearn.datasets import load_iris

iris = load_iris()
X_cls, y_cls = iris.data, iris.target
X_tr_c, X_te_c, y_tr_c, y_te_c = train_test_split(X_cls, y_cls, test_size=0.3, random_state=42)

rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_tr_c, y_tr_c)

mapie_cls = MapieClassifier(estimator=rf, cv="prefit", method="aps")
mapie_cls.fit(X_tr_c, y_tr_c)
y_pred_c, y_sets = mapie_cls.predict(X_te_c, alpha=0.1)

set_sizes = y_sets[:, :, 0].sum(axis=1)
print(f"Prediction sets (90% coverage):")
print(f"  Singletons: {"{"}(set_sizes==1).mean():.1%{"}"}")
print(f"  Pairs: {"{"}(set_sizes==2).mean():.1%{"}"}")
print(f"  Full (3): {"{"}(set_sizes==3).mean():.1%{"}"}")
print(f"  Mean size: {"{"}set_sizes.mean():.2f{"}"} / 3 classes")`}</NB></Sec>

<Sec n="9" title="Visualisation"><NB title="06_visualise.py" n={6}>{`import matplotlib; matplotlib.use("Agg")
import matplotlib.pyplot as plt

sort_idx = X_test[:, 0].argsort()
xs = X_test[sort_idx, 0]
ys = y_test[sort_idx]
pred_s = y_pred_cqr[sort_idx]
lo_s = y_pis_cqr[sort_idx, 0, 0]
hi_s = y_pis_cqr[sort_idx, 1, 0]

fig, ax = plt.subplots(figsize=(10, 5))
ax.scatter(xs, ys, s=2, alpha=0.3, color="grey", label="True")
ax.plot(xs, pred_s, color="#0F766E", linewidth=1.5, label="Prediction")
ax.fill_between(xs, lo_s, hi_s, alpha=0.2, color="#0F766E", label="90% CQR PI")
ax.set_xlabel("X"); ax.set_ylabel("y")
ax.set_title("CQR: Intervals widen with increasing noise (heteroscedastic)")
ax.legend(); plt.tight_layout()
plt.savefig("conformal_intervals.png", dpi=150)
print("Saved: conformal_intervals.png")`}</NB></Sec>

<Sec n="10" title="Method Comparison"><VsDiag/><Cap>Six UQ methods compared. Conformal prediction (top 3 rows) provides guaranteed coverage. Others provide approximate or conditional coverage.</Cap>
<NB title="07_compare.py" n={7}>{`# Compare all methods on the same data
methods = {"{"}{}{"}"}

# Split conformal
methods["Split"] = {"{"}"cov": coverage, "width": width{"}"}

# CQR
methods["CQR"] = {"{"}"cov": cov_cqr, "width": w_cqr{"}"}

# CV+
methods["CV+"] = {"{"}"cov": cov_cv, "width": w_cv{"}"}

print("Method     Coverage   Width    Adaptive?")
print("-" * 48)
for name, vals in methods.items():
    adaptive = "Yes" if name == "CQR" else "No"
    print(f"  {"{"}name:10s{"}"} {"{"}vals['cov']:.1%{"}"}      {"{"}vals['width']:.2f{"}"}     {"{"}adaptive{"}"}")
print("\\nAll methods guarantee ≥ 90% coverage.")
print("CQR has the tightest intervals because it adapts to noise.")`}</NB></Sec>

<Sec n="11" title="Conformal Prediction for Time Series"><P>{`Time series violates exchangeability — observations are ordered and autocorrelated. Two solutions: <strong>EnbPI</strong> (Xu & Xie 2021) uses ensemble diversity to produce approximately valid intervals without exchangeability. <strong>ACI</strong> (Adaptive Conformal Inference, Gibbs & Candès 2021) adjusts the α threshold online, increasing it when the model under-covers and decreasing when it over-covers. <strong>EnCQR</strong> (Ensemble CQR, Feldman et al. 2023) combines CQR adaptiveness with ensemble exchangeability removal.`}</P><P>{`MAPIE's <code>MapieTimeSeriesRegressor</code> implements EnbPI and ACI. For production time series, the recommended approach: engineer lag/rolling features (as tabular), train a gradient boosting model, and wrap with MAPIE using <code>method="enbpi"</code> for ensemble-based intervals.`}</P>
<NB title="08_timeseries.py" n={8}>{`# Time series conformal (conceptual)
# from mapie.time_series_regression import MapieTimeSeriesRegressor
# mapie_ts = MapieTimeSeriesRegressor(
#     estimator=model, method="enbpi",
#     agg_function="median",
# )
# mapie_ts.fit(X_train_ts, y_train_ts)
# y_pred_ts, y_pis_ts = mapie_ts.predict(X_test_ts, alpha=0.1)

print("Time series conformal methods:")
print("  EnbPI: ensemble-based, no exchangeability needed")
print("  ACI: adaptive online, handles distribution shift")
print("  EnCQR: ensemble CQR, adaptive + ensemble")
print("\\nUse MapieTimeSeriesRegressor for production TS intervals")`}</NB></Sec>

<Sec n="12" title="Production Deployment"><P>{`MAPIE wraps any sklearn-compatible estimator. The production workflow: (1) train your model normally, (2) wrap with MapieRegressor or MapieQuantileRegressor, (3) call .fit(), (4) call .predict(X, alpha=0.1) to get predictions and intervals. The intervals are returned as a 3D array: (n_samples, 2, n_alpha_levels) — lower and upper bounds for each coverage level.`}</P><P>{`For serving: the fitted MAPIE object can be pickled and loaded in a Flask/FastAPI endpoint. Each prediction returns both the point forecast and the interval bounds. The overhead compared to the base model is minimal — conformal prediction adds a constant (for split conformal) or a lookup (for CQR) to each prediction.`}</P>
<NB title="09_production.py" n={9}>{`import pickle

# Save fitted MAPIE model
with open("mapie_cqr_model.pkl", "wb") as f:
    pickle.dump(mapie_cqr, f)

# Load and predict with intervals
with open("mapie_cqr_model.pkl", "rb") as f:
    loaded = pickle.load(f)

# Single prediction with 90% interval
new_X = np.array([[5.0]])
pred, pis = loaded.predict(new_X, alpha=0.1)
print(f"Prediction: {"{"}pred[0]:.3f{"}"}")
print(f"90% PI: [{"{"}pis[0,0,0]:.3f{"}"}, {"{"}pis[0,1,0]:.3f{"}"}]")
print(f"Width: {"{"}pis[0,1,0]-pis[0,0,0]:.3f{"}"}")
print(f"\\nServing: pickle load → predict(X, alpha) → return pred + bounds")`}</NB>
<Callout type="tip" title="End of notebook">{`Cells 0–9: setup → split conformal → CQR → CV+ → calibration → classification sets → visualise → method comparison → time series → production. Copy green-bordered cells in order.`}</Callout></Sec>

<Sec n="13" title="Use Case: Medical Diagnosis"><P>{`Prediction sets for disease classification: "the model says the condition is in the set {"{"}Condition A, Condition B{"}"} with 95% coverage." The clinician investigates both. A singleton set provides high confidence. A set of five conditions signals diagnostic uncertainty — order more tests. This is more actionable than "P(Condition A) = 0.55."'`}</P><P>{`For patient risk scoring (regression), CQR intervals on clinical scores (NEWS2, SOFA) set alert thresholds: "alert if the upper bound of predicted SOFA exceeds 8." The coverage guarantee means the alarm has a known, calibrated false negative rate.`}</P></Sec>

<Sec n="14" title="Use Case: Supply Chain Safety Stock"><P>{`Safety stock = upper prediction bound − point forecast. A 95% CQR interval with upper bound 238 and point forecast 215 means safety stock = 23 units. The coverage guarantee maps directly to service level: 95% coverage → 95% probability of meeting demand without stockout. CQR's adaptiveness means high-uncertainty products get more safety stock and low-uncertainty products get less — reducing total inventory cost while maintaining the service level target.`}</P></Sec>

<Sec n="15" title="Use Case: Manufacturing Quality Control"><P>{`CQR intervals on dimensional measurements set inspection triggers. If the upper bound of a predicted dimension exceeds the specification tolerance, the part is flagged for inspection — even though the point prediction is within spec. The coverage guarantee means the false clear rate (parts that pass QC but are actually out of spec) is bounded at α. This connects conformal prediction to Six Sigma: the coverage level corresponds to the sigma level's confidence.`}</P></Sec>

<Sec n="16" title="Limitations"><P>{`<strong>1. Marginal, not conditional coverage.</strong> The guarantee is averaged over the distribution. Subgroups may have worse coverage. <em>Workaround:</em> Mondrian conformal, group-conditional. <strong>2. Exchangeability for time series.</strong> <em>Workaround:</em> EnbPI, ACI. <strong>3. Data waste (split).</strong> <em>Workaround:</em> CV+, jackknife+. <strong>4. Constant width (basic conformal).</strong> <em>Workaround:</em> CQR for adaptive intervals. <strong>5. No causal interpretation.</strong> Intervals quantify statistical uncertainty, not causal. <strong>6. Sensitivity to base model.</strong> Better base models produce tighter intervals. Conformal prediction can't save a bad model — it just puts honest error bars on bad predictions.`}</P></Sec>

<Sec n="17" title="The People"><P>{`<strong>Vladimir Vovk, Alex Gammerman, Glenn Shafer</strong>: the founders. "Algorithmic Learning in a Random World" (2005) laid the theoretical foundation. <strong>Yaniv Romano, Evan Patterson, Emmanuel Candès</strong> (Stanford): CQR (NeurIPS 2019), the paper that made conformal prediction practical. <strong>Rina Foygel Barber</strong> et al.: jackknife+ and CV+ (Annals of Statistics 2021). <strong>Anastasios Angelopoulos & Stephen Bates</strong>: the definitive tutorial (2023), RAPS, Learn-Then-Test framework. <strong>Isaac Gibbs & Emmanuel Candès</strong>: ACI (2021) for non-exchangeable data. <strong>Chen Xu & Yao Xie</strong>: EnbPI (2021) for time series. <strong>Thibault Cordier et al.</strong> (Quantmetry): MAPIE library (COPA 2023, scikit-learn-contrib).`}</P></Sec>

<Sec n="18" title="Decision Framework"><div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,padding:28,margin:"20px 0"}}><div style={{fontFamily:F.b,fontSize:15,lineHeight:2.2,color:C.text}}><div style={{marginBottom:8}}><span style={{color:C.green,fontWeight:700,fontSize:16}}>✓ Use conformal prediction when:</span></div><div style={{paddingLeft:24,fontSize:14,lineHeight:2}}>You need prediction intervals or sets with formal coverage guarantees.<br/>Your model is any sklearn-compatible estimator (model-agnostic).<br/>You want calibrated uncertainty without Bayesian priors or distributional assumptions.<br/>Downstream decisions depend on uncertainty (safety stock, clinical alerts, risk).<br/>Regulatory requirements demand quantified uncertainty (medical devices, EU AI Act).<br/>You want adaptive intervals that reflect local uncertainty → use CQR.</div><div style={{marginTop:20,marginBottom:8}}><span style={{color:C.red,fontWeight:700,fontSize:16}}>✗ Consider alternatives when:</span></div><div style={{paddingLeft:24,fontSize:14,lineHeight:2}}>You need the full predictive distribution → NGBoost, Bayesian, DeepAR.<br/>You need conditional coverage per subgroup → Mondrian or group-conditional.<br/>Your data has strong distribution shift → online conformal (ACI) or careful windowing.<br/>You need causal uncertainty → causal inference methods, not prediction intervals.<br/>Point predictions are sufficient and uncertainty isn't decision-relevant.</div></div></div><P>{`Every prediction is incomplete without an uncertainty estimate. Conformal prediction makes this estimate rigorous: guaranteed coverage, distribution-free, model-agnostic, finite-sample. CQR makes it adaptive. MAPIE makes it practical. In 2026, shipping a prediction without a prediction interval is like publishing a scientific measurement without an error bar. Conformal prediction is how ML grows up.`}</P></Sec>

<MAPIEDiag/><Cap>MAPIE: four modules for regression, classification, time series, and multi-label prediction with conformal guarantees.</Cap>

<div style={{marginTop:60,paddingTop:24,borderTop:`1px solid ${C.border}`}}><div style={{fontFamily:F.b,fontSize:12,color:C.light,lineHeight:1.8}}><strong>Sources:</strong> MAPIE docs (mapie.readthedocs.io), scikit-learn-contrib. <strong>Academic:</strong> Vovk, Gammerman, Shafer 2005; Romano, Patterson, Candès NeurIPS 2019 (CQR); Barber, Candès, Ramdas, Tibshirani 2021 (JK+/CV+); Angelopoulos & Bates 2023 (Tutorial, RAPS); Gibbs & Candès 2021 (ACI); Xu & Xie 2021 (EnbPI); Feldman et al. IEEE TNNLS 2023 (EnCQR); Cordier et al. COPA 2023 (MAPIE). <strong>Software:</strong> MAPIE, scikit-learn, crepes, nonconformist.</div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12,marginTop:16}}><div style={{fontFamily:F.m,fontSize:11,color:C.light}}>MAPIE 1.3+ · CQR · Conformal Prediction</div><div style={{fontFamily:F.m,fontSize:11,color:C.light}}>Length determined by information, not word count</div></div></div>
</div></div>);}
