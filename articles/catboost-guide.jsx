import { useState } from "react";
const C={bg:"#FAFBFC",card:"#FFFFFF",border:"#E2E8F0",accent:"#EA580C",accentLight:"#FFF7ED",accentDark:"#7C2D12",text:"#1E293B",muted:"#64748B",light:"#94A3B8",code:"#1E1E2E",codeBg:"#F1F5F9",warn:"#F59E0B",warnBg:"#FFFBEB",info:"#3B82F6",infoBg:"#EFF6FF",green:"#10B981",red:"#EF4444",purple:"#7C3AED",orange:"#F97316",tipBg:"#F0FDF4",indigo:"#6366F1",violet:"#8B5CF6",sky:"#0EA5E9",amber:"#D97706",teal:"#0F766E"};
const F={h:"'Newsreader',Georgia,serif",b:"'Inter',-apple-system,sans-serif",m:"'JetBrains Mono','Fira Code',monospace"};
const PredShiftDiag=()=>(<svg viewBox="0 0 760 175" style={{width:"100%",display:"block"}}><rect width="760" height="175" fill="#fff" rx="8" stroke={C.border} strokeWidth="1"/><text x="380" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontFamily={F.b} fontWeight="700">The Prediction Shift Problem: Why Standard Boosting Is Biased</text><rect x="30" y="42" width="335" height="105" rx="6" fill={C.codeBg} stroke={C.red} strokeWidth="1.5"/><text x="197" y="62" textAnchor="middle" fill={C.red} fontSize="10" fontFamily={F.b} fontWeight="700">Standard Gradient Boosting</text><text x="197" y="82" textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.b}>Trees built on SAME data used for residuals</text><text x="197" y="98" textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.b}>→ Conditional label leakage</text><text x="197" y="114" textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.b}>→ Shifted gradients → overfitting bias</text><text x="197" y="132" textAnchor="middle" fill={C.red} fontSize="8" fontFamily={F.b}>Especially on small/medium datasets</text><rect x="395" y="42" width="335" height="105" rx="6" fill={C.accentLight} stroke={C.green} strokeWidth="1.5"/><text x="562" y="62" textAnchor="middle" fill={C.green} fontSize="10" fontFamily={F.b} fontWeight="700">CatBoost Ordered Boosting</text><text x="562" y="82" textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.b}>Each sample's residual uses only PRECEDING samples</text><text x="562" y="98" textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.b}>→ No look-ahead bias (like online learning)</text><text x="562" y="114" textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.b}>→ Theoretically unbiased gradients</text><text x="562" y="132" textAnchor="middle" fill={C.green} fontSize="8" fontFamily={F.b}>Random permutations for robustness</text><text x="380" y="166" textAnchor="middle" fill={C.light} fontSize="8" fontFamily={F.b}>Prokhorenkova et al. NeurIPS 2018 — the first to formally identify and solve prediction shift.</text></svg>);
const SymTreeDiag=()=>(<svg viewBox="0 0 760 185" style={{width:"100%",display:"block"}}><rect width="760" height="185" fill="#fff" rx="8" stroke={C.border} strokeWidth="1"/><text x="380" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontFamily={F.b} fontWeight="700">Symmetric (Oblivious) Trees vs. Standard Trees</text><rect x="30" y="42" width="335" height="115" rx="6" fill={C.accentLight} stroke={C.accent} strokeWidth="1.5"/><text x="197" y="62" textAnchor="middle" fill={C.accent} fontSize="10" fontFamily={F.b} fontWeight="700">Symmetric Tree (CatBoost)</text><text x="197" y="82" textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.b}>Same split feature + threshold at every node per level</text><text x="197" y="100" textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.b}>→ Balanced, regular structure</text><text x="197" y="118" textAnchor="middle" fill={C.green} fontSize="9" fontFamily={F.b}>✓ Faster inference (branchless, vectorised)</text><text x="197" y="134" textAnchor="middle" fill={C.green} fontSize="9" fontFamily={F.b}>✓ Better regularisation, less overfitting</text><text x="197" y="148" textAnchor="middle" fill={C.red} fontSize="8" fontFamily={F.b}>− Less expressive per tree (compensated by more trees)</text><rect x="395" y="42" width="335" height="115" rx="6" fill={C.codeBg} stroke={C.sky} strokeWidth="1.5"/><text x="562" y="62" textAnchor="middle" fill={C.sky} fontSize="10" fontFamily={F.b} fontWeight="700">Standard Tree (XGB/LGBM)</text><text x="562" y="82" textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.b}>Different splits at each node</text><text x="562" y="100" textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.b}>→ Asymmetric, irregular structure</text><text x="562" y="118" textAnchor="middle" fill={C.sky} fontSize="9" fontFamily={F.b}>✓ More expressive per tree</text><text x="562" y="134" textAnchor="middle" fill={C.red} fontSize="9" fontFamily={F.b}>− Slower inference (branch prediction misses)</text><text x="562" y="148" textAnchor="middle" fill={C.red} fontSize="8" fontFamily={F.b}>− More prone to overfitting without tuning</text><text x="380" y="178" textAnchor="middle" fill={C.light} fontSize="8" fontFamily={F.b}>CatBoost's default depth=6 → 64 leaves per symmetric tree. Branchless evaluation is GPU-friendly.</text></svg>);
const CatEncDiag=()=>(<svg viewBox="0 0 760 175" style={{width:"100%",display:"block"}}><rect width="760" height="175" fill="#fff" rx="8" stroke={C.border} strokeWidth="1"/><text x="380" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontFamily={F.b} fontWeight="700">Categorical Encoding: CatBoost's Ordered Target Statistics</text>{[{x:25,w:170,t:"One-Hot",d:"Binary columns per\ncategory. Sparse.\nFails for high-card.",c:C.light},{x:210,w:170,t:"Target Encoding",d:"Replace category with\nmean(target). Leaks\ntarget information!",c:C.red},{x:395,w:170,t:"LightGBM Native",d:"Finds best split on\nraw categories.\nSince v3.0.",c:C.sky},{x:580,w:155,t:"CatBoost Ordered\nTarget Stats",d:"Target stats using\nonly PRECEDING\nsamples → no leak",c:C.green}].map((e,i)=>(<g key={i}><rect x={e.x} y="42" width={e.w} height="110" rx="6" fill={e.c} opacity="0.08" stroke={e.c} strokeWidth="1"/>{e.t.split("\n").map((ln,li)=>(<text key={`t${li}`} x={e.x+e.w/2} y={60+li*13} textAnchor="middle" fill={e.c} fontSize="10" fontFamily={F.b} fontWeight="700">{ln}</text>))}{e.d.split("\n").map((ln,li)=>(<text key={`d${li}`} x={e.x+e.w/2} y={95+li*14} textAnchor="middle" fill={C.text} fontSize="8.5" fontFamily={F.b}>{ln}</text>))}</g>))}<text x="380" y="168" textAnchor="middle" fill={C.light} fontSize="8" fontFamily={F.b}>Ordered TS: for sample i, target stat = mean(targets of samples 1..i-1 with same category). No future leakage.</text></svg>);
const TriComp=()=>(<svg viewBox="0 0 760 200" style={{width:"100%",display:"block"}}><rect width="760" height="200" fill="#fff" rx="8" stroke={C.border} strokeWidth="1"/><text x="380" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontFamily={F.b} fontWeight="700">The Gradient Boosting Trinity: XGBoost vs LightGBM vs CatBoost</text><line x1="40" y1="48" x2="740" y2="48" stroke={C.border} strokeWidth="1"/>{["","XGBoost","LightGBM","CatBoost"].map((h,i)=>(<text key={i} x={40+i*180} y="42" fill={C.accent} fontSize="9" fontFamily={F.b} fontWeight="700">{h}</text>))}{[["Tree type","Standard","Standard (leaf-wise)","Symmetric (oblivious)"],["Categoricals","Manual encoding","Native (v3+)","Native (ordered TS)"],["CPU speed","Medium","Fastest","Medium"],["GPU support","Yes","Yes","Yes (native)"],["Defaults","Need tuning","Need tuning","Best out-of-box"],["Bias handling","Standard","Standard","Ordered boosting"],["Community","Largest","Large","Growing"]].map((row,r)=>{const y=68+r*18;return(<g key={r}>{r%2===0&&<rect x="40" y={y-10} width="700" height="18" fill={C.codeBg} rx="2"/>}{row.map((cell,c)=>(<text key={c} x={c===0?45:40+c*180} y={y+2} fill={c===0?C.accent:C.text} fontSize="8.5" fontFamily={c===0?F.b:F.m} fontWeight={c===0?"600":"400"}>{cell}</text>))}</g>);})}<text x="380" y="194" textAnchor="middle" fill={C.light} fontSize="8" fontFamily={F.b}>All three achieve similar accuracy on most benchmarks. Choice depends on data characteristics and constraints.</text></svg>);
const ParamsDiag=()=>(<svg viewBox="0 0 760 175" style={{width:"100%",display:"block"}}><rect width="760" height="175" fill="#fff" rx="8" stroke={C.border} strokeWidth="1"/><text x="380" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontFamily={F.b} fontWeight="700">Key CatBoost Parameters</text>{[{x:25,w:170,t:"Training",p:"iterations: 1000\nlearning_rate: 0.03\ntask_type: GPU\nboosting_type: Ordered",c:C.accent},{x:210,w:170,t:"Tree",p:"depth: 6\nl2_leaf_reg: 3\nborder_count: 254\ngrow_policy: Symmetric",c:C.sky},{x:395,w:170,t:"Categoricals",p:"cat_features: auto\none_hot_max_size: 25\ntext_features: []\n",c:C.violet},{x:580,w:155,t:"Regularisation",p:"subsample: 0.8\nrsm: 0.8\nrandom_strength: 1\nbagging_temp: 1",c:C.green}].map((p,i)=>(<g key={i}><rect x={p.x} y="38" width={p.w} height="118" rx="6" fill={p.c} opacity="0.08" stroke={p.c} strokeWidth="1"/><text x={p.x+p.w/2} y="56" textAnchor="middle" fill={p.c} fontSize="10" fontFamily={F.b} fontWeight="700">{p.t}</text>{p.p.split("\n").map((ln,li)=>(<text key={li} x={p.x+p.w/2} y={76+li*15} textAnchor="middle" fill={C.text} fontSize="8.5" fontFamily={F.m}>{ln}</text>))}</g>))}</svg>);
const UseCaseDiag=()=>(<svg viewBox="0 0 760 160" style={{width:"100%",display:"block"}}><rect width="760" height="160" fill="#fff" rx="8" stroke={C.border} strokeWidth="1"/><text x="380" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontFamily={F.b} fontWeight="700">CatBoost Sweet Spots: Where It Wins</text>{[{x:25,w:170,t:"Many Categoricals",d:"E-commerce, ad-tech\nhigh-cardinality IDs\nno preprocessing",c:C.accent},{x:210,w:170,t:"Default Performance",d:"Quick prototyping\nminimal tuning\nproduction-ready OOB",c:C.green},{x:395,w:170,t:"Small-Medium Data",d:"Ordered boosting\nprevents overfitting\nwhere XGB/LGBM leak",c:C.sky},{x:580,w:155,t:"Ranking Tasks",d:"YetiRank objective\nnative L2R support\nsearch, recommender",c:C.violet}].map((s,i)=>(<g key={i}><rect x={s.x} y="38" width={s.w} height="100" rx="6" fill={s.c} opacity="0.08" stroke={s.c} strokeWidth="1"/><text x={s.x+s.w/2} y="56" textAnchor="middle" fill={s.c} fontSize="10" fontFamily={F.b} fontWeight="700">{s.t}</text>{s.d.split("\n").map((ln,li)=>(<text key={li} x={s.x+s.w/2} y={76+li*14} textAnchor="middle" fill={C.text} fontSize="8.5" fontFamily={F.b}>{ln}</text>))}</g>))}</svg>);
const SHAPDiag=()=>(<svg viewBox="0 0 760 155" style={{width:"100%",display:"block"}}><rect width="760" height="155" fill="#fff" rx="8" stroke={C.border} strokeWidth="1"/><text x="380" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontFamily={F.b} fontWeight="700">CatBoost Built-in Interpretability</text>{[{x:25,w:170,t:"PredictionValuesChange",d:"Feature importance by\nprediction value shift\n(default method)",c:C.accent},{x:210,w:170,t:"LossFunctionChange",d:"Feature importance by\nloss function impact\n(like PFI but faster)",c:C.sky},{x:395,w:170,t:"ShapValues",d:"Native SHAP\nimplementation\nfaster than shap lib",c:C.green},{x:580,w:155,t:"Interaction",d:"Feature interaction\nstrength measurement\nfor feature selection",c:C.violet}].map((f,i)=>(<g key={i}><rect x={f.x} y="38" width={f.w} height="100" rx="6" fill={f.c} opacity="0.08" stroke={f.c} strokeWidth="1"/><text x={f.x+f.w/2} y="56" textAnchor="middle" fill={f.c} fontSize="9" fontFamily={F.b} fontWeight="700">{f.t}</text>{f.d.split("\n").map((ln,li)=>(<text key={li} x={f.x+f.w/2} y={76+li*14} textAnchor="middle" fill={C.text} fontSize="8.5" fontFamily={F.b}>{ln}</text>))}</g>))}</svg>);
const YandexDiag=()=>(<svg viewBox="0 0 760 150" style={{width:"100%",display:"block"}}><rect width="760" height="150" fill="#fff" rx="8" stroke={C.border} strokeWidth="1"/><text x="380" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontFamily={F.b} fontWeight="700">The Yandex Origin: Why a Search Engine Built a Boosting Library</text><rect x="30" y="42" width="700" height="85" rx="6" fill={C.accentLight}/><text x="380" y="62" textAnchor="middle" fill={C.accent} fontSize="10" fontFamily={F.b} fontWeight="700">Yandex Search Ranking (2000s–2017)</text><text x="380" y="82" textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.b}>Massive categorical features: query_category, url_domain, user_region, device_type</text><text x="380" y="98" textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.b}>Billions of queries/day. Target encoding leaks. One-hot explodes. Need native categoricals.</text><text x="380" y="114" textAnchor="middle" fill={C.text} fontSize="9" fontFamily={F.b}>Production constraint: fast inference for real-time ranking → symmetric trees enable vectorised eval.</text></svg>);
const Code=({children,title})=>(<div style={{margin:"24px 0",borderRadius:8,overflow:"hidden",border:`1px solid ${C.border}`}}>{title&&<div style={{background:C.code,padding:"8px 16px",fontFamily:F.m,fontSize:11,color:"#A78BFA",letterSpacing:"0.05em"}}>{title}</div>}<pre style={{background:C.code,padding:"16px 20px",margin:0,overflowX:"auto",fontSize:12.5,lineHeight:1.7,fontFamily:F.m,color:"#E2E8F0"}}><code>{children}</code></pre></div>);
const NB=({children,title,n})=>(<div style={{margin:"24px 0",borderRadius:8,overflow:"hidden",border:`1px solid ${C.border}`,borderLeft:`3px solid ${C.green}`}}><div style={{background:C.code,padding:"8px 16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontFamily:F.m,fontSize:11,color:"#A78BFA",letterSpacing:"0.05em"}}>{title}</span><span style={{fontFamily:F.m,fontSize:10,color:C.green,background:"rgba(16,185,129,0.15)",padding:"2px 8px",borderRadius:4}}>Cell {n}</span></div><pre style={{background:C.code,padding:"16px 20px",margin:0,overflowX:"auto",fontSize:12.5,lineHeight:1.7,fontFamily:F.m,color:"#E2E8F0"}}><code>{children}</code></pre></div>);
const Callout=({type="info",title,children})=>{const s={info:{bg:C.infoBg,border:C.info,icon:"💡"},warn:{bg:C.warnBg,border:C.warn,icon:"⚠️"},tip:{bg:C.tipBg,border:C.green,icon:"✅"}}[type];return(<div style={{margin:"28px 0",padding:"20px 24px",background:s.bg,borderLeft:`4px solid ${s.border}`,borderRadius:"0 8px 8px 0"}}><div style={{fontFamily:F.b,fontSize:13,fontWeight:700,color:s.border,marginBottom:6}}>{s.icon} {title}</div><div style={{fontFamily:F.b,fontSize:14,lineHeight:1.7,color:C.text}} dangerouslySetInnerHTML={{__html:children}}/></div>);};
const Sec=({n,title,children})=>(<div style={{margin:"56px 0 0"}}><div style={{display:"flex",alignItems:"baseline",gap:12,marginBottom:20}}><span style={{fontFamily:F.m,fontSize:13,color:C.accent,fontWeight:700}}>§{n}</span><h2 style={{fontFamily:F.h,fontSize:28,fontWeight:700,color:C.text,lineHeight:1.2}}>{title}</h2></div>{children}</div>);
const P=({children})=>(<p style={{fontFamily:F.b,fontSize:16,lineHeight:1.8,color:C.text,margin:"0 0 18px"}} dangerouslySetInnerHTML={{__html:children}}/>);
const H3=({children})=>(<h3 style={{fontFamily:F.h,fontSize:20,fontWeight:600,color:C.text,margin:"28px 0 12px"}}>{children}</h3>);
const Cap=({children})=>(<div style={{fontFamily:F.b,fontSize:12,color:C.light,marginTop:8,marginBottom:28}}>{children}</div>);

export default function Article(){return(<div style={{background:C.bg,minHeight:"100vh"}}><style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Newsreader:ital,wght@0,400;0,600;0,700;1,400&display=swap');*{box-sizing:border-box;margin:0;padding:0}body{background:${C.bg}}`}</style>
<div style={{background:C.accent,padding:"12px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}><span style={{fontFamily:F.m,fontSize:11,color:"#FFF7ED",letterSpacing:"0.1em",textTransform:"uppercase"}}>Technical Encyclopaedic Article</span><span style={{fontFamily:F.m,fontSize:11,color:"#FFF7ED"}}>Gradient Boosting · CatBoost · Yandex · Tabular ML</span></div>
<div style={{maxWidth:820,margin:"0 auto",padding:"60px 24px 0"}}><div style={{fontFamily:F.m,fontSize:12,color:C.accent,fontWeight:600,letterSpacing:"0.08em",marginBottom:12}}>CATBOOST</div><h1 style={{fontFamily:F.h,fontSize:"clamp(28px,4.5vw,44px)",fontWeight:700,color:C.text,lineHeight:1.15,marginBottom:20}}>The Theoretically Principled Member of the Gradient Boosting Trinity</h1><p style={{fontFamily:F.b,fontSize:18,color:C.muted,lineHeight:1.6,maxWidth:680,marginBottom:12}}>Ordered boosting eliminates prediction shift. Ordered target statistics handle categoricals without leakage. Symmetric trees regularise and accelerate. Born at Yandex for search ranking, now competing everywhere tabular data lives.</p><div style={{fontFamily:F.b,fontSize:13,color:C.light,marginBottom:40}}>CatBoost 1.2+ · Python / R / CLI · GPU Native · NeurIPS 2018</div><div style={{height:1,background:C.border,marginBottom:20}}/></div>
<div style={{maxWidth:820,margin:"0 auto",padding:"0 24px 80px"}}>

<Sec n="1" title="The Third Way"><P>{`XGBoost (Chen & Guestrin, KDD 2016) brought gradient boosting to the mainstream. LightGBM (Ke et al., NeurIPS 2017) made it fast with histogram-based splits and leaf-wise growth. CatBoost (Prokhorenkova et al., NeurIPS 2018) made it theoretically principled — identifying and solving a subtle bias (prediction shift) that neither predecessor addressed, while also solving the categorical encoding problem that both left to the user.`}</P><P>{`Gradient boosting algorithms appear in over 80% of winning Kaggle solutions for structured data. The choice between XGBoost, LightGBM, and CatBoost often determines competition rankings and production model quality. This article covers CatBoost's three key innovations — ordered boosting, ordered target statistics for categoricals, and symmetric trees — with honest benchmarks, full code, and a decision framework for when to use each member of the trinity.`}</P></Sec>

<NB title="00_setup.py" n={0}>{`# pip install catboost scikit-learn pandas numpy
from catboost import CatBoostClassifier, CatBoostRegressor, Pool
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score, accuracy_score
import pandas as pd, numpy as np

# Adult Income dataset — categoricals + numericals
url = "https://archive.ics.uci.edu/ml/machine-learning-databases/adult/adult.data"
cols = ["Age","WorkClass","fnlwgt","Education","EducationNum",
        "MaritalStatus","Occupation","Relationship","Race","Gender",
        "CapitalGain","CapitalLoss","HoursPerWeek","NativeCountry","Income"]
df = pd.read_csv(url, header=None, names=cols, na_values=" ?", skipinitialspace=True).dropna()
X = df.drop("Income", axis=1)
y = (df["Income"] == ">50K").astype(int)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Identify categorical columns — CatBoost handles them natively!
cat_features = [i for i, col in enumerate(X.columns) if X[col].dtype == "object"]
print(f"Features: {"{"}X.shape[1]{"}"} ({"{"}len(cat_features){"}"} categorical)")
print(f"Cat columns: {"{"}[X.columns[i] for i in cat_features]{"}"}")`}</NB>

<Callout type="info" title="Notebook Map">{`<strong>Cells 0–9</strong>: <code>Cell 0</code> Setup (§1) · <code>Cell 1</code> Train CatBoost (§4) · <code>Cell 2</code> Pool + Cat Features (§5) · <code>Cell 3</code> Feature Importance (§8) · <code>Cell 4</code> SHAP Values (§8) · <code>Cell 5</code> vs XGBoost/LGBM (§9) · <code>Cell 6</code> GPU Training (§7) · <code>Cell 7</code> Hyperparameter Tuning (§6) · <code>Cell 8</code> Ranking (§11) · <code>Cell 9</code> Deploy (§15)`}</Callout>

<Sec n="2" title="The Prediction Shift Problem"><P>{`Standard gradient boosting has a subtle bias that Prokhorenkova et al. (NeurIPS 2018) were the first to formally identify: <strong>prediction shift</strong>. At each boosting iteration, trees are built to fit the residuals. But the residuals were computed using the same training data that the trees will be trained on. This means the model has already "seen" the targets when computing residuals — creating a form of conditional label leakage that shifts the gradient estimates and can lead to overfitting, especially on small-to-medium datasets.`}</P><PredShiftDiag/><Cap>Standard boosting (left) computes residuals on the same data used for tree building — conditional label leakage. CatBoost's ordered boosting (right) computes each sample's residual using only preceding samples in a random permutation — theoretically unbiased.</Cap><P>{`The bias is small per iteration but accumulates across thousands of boosting rounds. On large datasets with many features, it's negligible — which is why XGBoost and LightGBM work well in practice. On small datasets (under 10K rows) or datasets with many features relative to samples, prediction shift causes real overfitting that tuning alone can't fully fix. CatBoost's ordered boosting eliminates this bias entirely.`}</P></Sec>

<Sec n="3" title="Ordered Boosting"><P>{`CatBoost's solution: impose a random ordering on the training data. For each sample i, compute its residual using a model trained only on samples 1 through i-1 — never using sample i's own target to compute its own residual. This is equivalent to online learning: each sample is predicted by a model that has never seen it. Multiple random permutations are used for different boosting iterations, providing diversity.`}</P><P>{`The cost: ordered boosting is approximately 1.7x slower than plain boosting (as measured in the NeurIPS 2018 experiments). The benefit: unbiased gradient estimates, reduced overfitting, and often better accuracy with default hyperparameters. CatBoost supports both modes: <code>boosting_type="Ordered"</code> (default for CPU, small datasets) and <code>boosting_type="Plain"</code> (default for GPU, large datasets). For datasets under 50K rows, ordered boosting typically outperforms plain.`}</P><P>{`This is also why CatBoost's defaults work so well: ordered boosting provides built-in regularisation that XGBoost and LightGBM achieve only through careful tuning of learning rate, max depth, subsample, and regularisation parameters.`}</P></Sec>

<Sec n="4" title="Training CatBoost"><P>{`CatBoost's API follows scikit-learn conventions with additional parameters for categorical features, GPU acceleration, and ordered boosting. The key differentiator at training time: <strong>you pass raw categorical columns directly</strong>. No one-hot encoding, no label encoding, no target encoding. CatBoost handles categoricals natively using ordered target statistics — computing target-based encodings that respect the ordering and avoid leakage.`}</P><P>{`The <code>Pool</code> object is CatBoost's data container, explicitly marking which columns are categorical, text, or embedding features. While optional (you can pass DataFrames directly), Pool is recommended for production — it's more memory-efficient and supports CatBoost-specific features like text feature handling and baseline predictions.`}</P>
<NB title="01_train.py" n={1}>{`# Train CatBoost — no encoding needed for categoricals!
model = CatBoostClassifier(
    iterations=1000,
    learning_rate=0.03,
    depth=6,
    l2_leaf_reg=3,
    cat_features=cat_features,  # tell CatBoost which are categorical
    random_seed=42,
    verbose=0,  # suppress training output
)
model.fit(X_train, y_train, eval_set=(X_test, y_test), early_stopping_rounds=50)

auc = roc_auc_score(y_test, model.predict_proba(X_test)[:, 1])
print(f"CatBoost AUC: {"{"}auc:.4f{"}"}")
print(f"Best iteration: {"{"}model.best_iteration_{"}"}")
print(f"Tree count: {"{"}model.tree_count_{"}"}")`}</NB></Sec>

<Sec n="5" title="Native Categorical Handling"><P>{`CatBoost's categorical encoding — <strong>ordered target statistics</strong> — computes the target mean for each category level using only preceding samples in the permutation order. For sample i with category value c, the target statistic is: <code>TS(i,c) = (Σ targets of samples 1..i-1 with category c + prior) / (count + 1)</code>. The prior (typically the dataset-wide target mean) smooths the estimate for rare categories. This encoding is computed fresh for each permutation, preventing the model from memorising the target through the encoding.`}</P><CatEncDiag/><Cap>Four categorical encoding approaches. One-hot: sparse, fails for high-cardinality. Target encoding: leaks target info. LightGBM native: histogram-based. CatBoost ordered TS: uses only preceding samples, leak-free.</Cap><P>{`For high-cardinality categoricals (e.g., merchant_id with 50K unique values), CatBoost's approach is categorically better than alternatives. One-hot encoding creates 50K sparse features. Target encoding leaks the target. Frequency encoding loses information. CatBoost's ordered TS provides an information-rich, leak-free encoding computed internally during training — no preprocessing pipeline required.`}</P><P>{`CatBoost also supports <strong>feature combinations</strong>: during training, it automatically creates and evaluates combinations of categorical features (e.g., WorkClass × Education) as new features. This captures interactions between categoricals that individual encoding would miss. The <code>one_hot_max_size</code> parameter controls the threshold below which CatBoost uses one-hot instead of ordered TS (default: 25 categories — features with 25 or fewer unique values are one-hot encoded).`}</P>
<NB title="02_pool.py" n={2}>{`# Pool object: CatBoost's native data container
train_pool = Pool(
    data=X_train,
    label=y_train,
    cat_features=cat_features,
)
test_pool = Pool(
    data=X_test,
    label=y_test,
    cat_features=cat_features,
)

# Inspect what CatBoost sees
print(f"Pool features: {"{"}train_pool.num_col(){"}"}")
print(f"Pool rows: {"{"}train_pool.num_row(){"}"}")
print(f"Cat features: {"{"}train_pool.get_cat_feature_indices(){"}"}")

# No encoding needed — CatBoost uses ordered target statistics internally
print("\\n✓ Raw string columns passed directly — no preprocessing!")`}</NB></Sec>

<Sec n="6" title="Symmetric (Oblivious) Decision Trees"><P>{`CatBoost uses <strong>symmetric (oblivious) decision trees</strong> by default: at each depth level, every node uses the <em>same</em> split feature and threshold. This produces a balanced, regular tree structure — in contrast to XGBoost's and LightGBM's asymmetric trees where each node can split on a different feature.`}</P><SymTreeDiag/><Cap>Symmetric trees (left) use the same split at every node per level — regular, fast, regularised. Standard trees (right) use different splits per node — more expressive but slower and more prone to overfitting.</Cap><P>{`The advantages are practical: (1) <strong>faster inference</strong> — symmetric trees enable branchless evaluation via lookup tables, eliminating branch prediction misses that slow down asymmetric trees on modern CPUs. (2) <strong>better regularisation</strong> — the symmetric constraint prevents the model from creating overly specific splits that overfit to noise. (3) <strong>GPU-friendly</strong> — the regular structure maps naturally to GPU memory access patterns. The tradeoff: symmetric trees are less expressive per tree, but this is compensated by using more trees. CatBoost also supports asymmetric growth policies via <code>grow_policy="Depthwise"</code> or <code>"Lossguide"</code> (equivalent to LightGBM's leaf-wise growth).`}</P>
<NB title="07_tuning.py" n={7}>{`# Hyperparameter tuning — CatBoost is often best with defaults
# but here are the key parameters to tune:
model_tuned = CatBoostClassifier(
    iterations=2000,
    learning_rate=0.03,       # lower = better accuracy, slower
    depth=8,                   # default 6, increase for complex data
    l2_leaf_reg=5,             # regularisation (increase to reduce overfitting)
    border_count=254,          # binning resolution for numericals
    cat_features=cat_features,
    subsample=0.8,             # row sampling (bagging)
    rsm=0.8,                   # column sampling
    random_strength=1,         # randomness in splits
    boosting_type="Ordered",   # ordered boosting for better defaults
    random_seed=42, verbose=0,
)
model_tuned.fit(X_train, y_train, eval_set=(X_test, y_test), early_stopping_rounds=100)
auc_t = roc_auc_score(y_test, model_tuned.predict_proba(X_test)[:, 1])
print(f"Tuned CatBoost AUC: {"{"}auc_t:.4f{"}"}")`}</NB></Sec>

<Sec n="7" title="GPU Training"><P>{`CatBoost has native GPU support — not a wrapper around a CPU algorithm but a ground-up GPU implementation. Set <code>task_type="GPU"</code> and training runs on CUDA. The symmetric tree structure is GPU-friendly: the regular memory access patterns and branchless evaluation map naturally to GPU architecture. Multi-GPU training is supported for large datasets.`}</P><P>{`Performance: on datasets with 100K+ rows, GPU training is typically 3-10x faster than CPU. For small datasets, the overhead of GPU data transfer can make CPU faster. The break-even point is roughly 50K rows with 100+ features.`}</P>
<NB title="06_gpu.py" n={6}>{`# GPU training (requires CUDA)
try:
    model_gpu = CatBoostClassifier(
        iterations=1000, learning_rate=0.03, depth=6,
        cat_features=cat_features,
        task_type="GPU",  # use GPU
        devices="0",      # GPU device ID
        random_seed=42, verbose=0,
    )
    model_gpu.fit(X_train, y_train)
    auc_gpu = roc_auc_score(y_test, model_gpu.predict_proba(X_test)[:, 1])
    print(f"GPU CatBoost AUC: {"{"}auc_gpu:.4f{"}"}")
except Exception as e:
    print(f"GPU not available: {"{"}e{"}"}")
    print("Falling back to CPU (task_type='CPU')")`}</NB></Sec>

<Sec n="8" title="Built-in Feature Importance and SHAP"><P>{`CatBoost provides four native feature importance methods, all computed without external libraries: <strong>PredictionValuesChange</strong> (default) — how much the prediction changes when the feature is used. <strong>LossFunctionChange</strong> — like permutation importance but computed from the tree structure, much faster. <strong>ShapValues</strong> — native SHAP implementation that is faster than the <code>shap</code> library for CatBoost models. <strong>Interaction</strong> — pairwise feature interaction strength.`}</P><SHAPDiag/><Cap>Four built-in importance methods. PredictionValuesChange (default), LossFunctionChange (PFI-like), ShapValues (native SHAP), and Interaction (pairwise).</Cap>
<NB title="03_importance.py" n={3}>{`# Feature importance — 4 methods, all built-in
imp = model.get_feature_importance(prettified=True)
print("Top 10 features (PredictionValuesChange):")
print(imp.head(10).to_string(index=False))

# LossFunctionChange (like PFI but faster)
imp_loss = model.get_feature_importance(type="LossFunctionChange",
                                         data=test_pool, prettified=True)
print("\\nTop 5 by LossFunctionChange:")
print(imp_loss.head(5).to_string(index=False))`}</NB>
<NB title="04_shap.py" n={4}>{`# Native SHAP values — faster than shap library
shap_values = model.get_feature_importance(type="ShapValues", data=test_pool)

# shap_values shape: (n_samples, n_features + 1)
# last column is the base value (intercept)
print(f"SHAP values shape: {"{"}shap_values.shape{"}"}")
print(f"Base value: {"{"}shap_values[0, -1]:.4f{"}"}")

# Top SHAP contributors for first instance
feature_shap = shap_values[0, :-1]
top_idx = np.argsort(np.abs(feature_shap))[-5:][::-1]
print("\\nTop SHAP features for instance 0:")
for i in top_idx:
    print(f"  {"{"}X.columns[i]:25s{"}"} {"{"}feature_shap[i]:+.4f}{"}"}")`}</NB></Sec>

<Sec n="9" title="CatBoost vs. XGBoost vs. LightGBM"><TriComp/><Cap>The gradient boosting trinity compared across 7 dimensions. All three achieve similar accuracy on most benchmarks. Choice depends on data characteristics.</Cap><P>{`<strong>Accuracy:</strong> On most tabular benchmarks (TabArena, OpenML), the three are within 1-2% of each other. CatBoost tends to win on datasets with many categorical features and smaller sample sizes. LightGBM tends to win on large datasets. XGBoost is the reliable middle ground. <strong>Defaults:</strong> CatBoost's defaults are widely considered the best — ordered boosting and symmetric trees provide built-in regularisation. LightGBM and XGBoost often need tuning (lower learning rate, regularisation) to match CatBoost's out-of-box performance.`}</P><P>{`<strong>Speed:</strong> LightGBM is the fastest on CPU (GOSS + EFB optimisations). CatBoost plain mode is comparable; ordered mode is ~1.7x slower. On GPU, CatBoost is competitive with LightGBM. XGBoost is typically the slowest on CPU but has solid GPU support. <strong>Categoricals:</strong> CatBoost's ordered TS is the most sophisticated native approach. LightGBM's native categorical support (since v3.0) is simpler but adequate. XGBoost requires manual encoding — the weakest on this dimension.`}</P>
<NB title="05_vs_comparison.py" n={5}>{`# Head-to-head comparison on the same data
results = {"{"}{}{"}"}

# CatBoost (already trained)
results["CatBoost"] = auc

# XGBoost
try:
    from xgboost import XGBClassifier
    X_tr_enc = X_train.copy()
    X_te_enc = X_test.copy()
    for col in X_tr_enc.select_dtypes(include="object").columns:
        X_tr_enc[col] = X_tr_enc[col].astype("category").cat.codes
        X_te_enc[col] = X_te_enc[col].astype("category").cat.codes
    xgb = XGBClassifier(n_estimators=1000, learning_rate=0.03, max_depth=6,
                         random_state=42, eval_metric="logloss", early_stopping_rounds=50)
    xgb.fit(X_tr_enc, y_train, eval_set=[(X_te_enc, y_test)], verbose=False)
    results["XGBoost"] = roc_auc_score(y_test, xgb.predict_proba(X_te_enc)[:, 1])
except ImportError:
    results["XGBoost"] = "not installed"

# LightGBM
try:
    from lightgbm import LGBMClassifier
    lgb = LGBMClassifier(n_estimators=1000, learning_rate=0.03, max_depth=6,
                          random_state=42, verbose=-1)
    lgb.fit(X_tr_enc, y_train, eval_set=[(X_te_enc, y_test)],
            callbacks=[__import__("lightgbm").early_stopping(50, verbose=False)])
    results["LightGBM"] = roc_auc_score(y_test, lgb.predict_proba(X_te_enc)[:, 1])
except ImportError:
    results["LightGBM"] = "not installed"

print("Head-to-head AUC comparison:")
for name, score in results.items():
    print(f"  {"{"}name:12s{"}"} {"{"}score{"}"}")`}</NB></Sec>

<Sec n="10" title="The Yandex Story"><YandexDiag/><Cap>CatBoost was born from Yandex's production search ranking needs: massive categorical features, real-time inference requirements, and the need for leak-free categorical encoding at scale.</Cap><P>{`CatBoost was developed at <strong>Yandex</strong>, Russia's largest search engine and technology company. The team — led by Andrey Gulin, Anna Veronika Dorogush, and Liudmila Prokhorenkova — built it to solve production search ranking problems where the datasets have massive categorical features (query_category, url_domain, user_region, ad_type), billions of samples, and real-time inference constraints (rankings must be computed in milliseconds per query).`}</P><P>{`The production constraints shaped every design decision. Native categorical handling: because Yandex has thousands of categorical features with millions of unique values, one-hot encoding was impractical. Symmetric trees: because search ranking requires evaluating millions of documents per second, the branchless evaluation of symmetric trees provides the throughput needed. Ordered boosting: because ranking models are trained on user click data that changes daily, prediction shift was causing real accuracy degradation. CatBoost was open-sourced in 2017, and the NeurIPS 2018 paper provided the theoretical foundation.`}</P></Sec>

<Sec n="11" title="Use Case: Search Ranking"><P>{`CatBoost's original domain. Learning-to-rank with the <code>CatBoostRanker</code> class and objectives like YetiRank and YetiRankPairwise. Features include query-document relevance scores, click history, document quality signals, user profile attributes (all categorical), and session context. The symmetric tree structure enables ranking hundreds of candidate documents per query in under a millisecond.`}</P><P>{`The ranking-specific objectives (YetiRank, PairLogit, QuerySoftMax) are unique to CatBoost — neither XGBoost nor LightGBM provides native learning-to-rank with symmetric trees. This matters for production recommender systems where inference latency is the binding constraint.`}</P>
<NB title="08_ranking.py" n={8}>{`# CatBoost for ranking (conceptual — requires ranking data)
# from catboost import CatBoostRanker
# ranker = CatBoostRanker(
#     iterations=500, learning_rate=0.03, depth=6,
#     loss_function="YetiRank",  # or PairLogit, QuerySoftMax
#     cat_features=cat_features,
# )
# ranker.fit(train_pool)  # Pool must include group_id for queries

print("CatBoostRanker supports:")
print("  YetiRank — listwise ranking loss")
print("  PairLogit — pairwise logistic loss")
print("  QuerySoftMax — query-level softmax")
print("  QueryCrossEntropy — query-level cross-entropy")
print("\\nUnique to CatBoost: symmetric tree ranking for sub-ms inference")`}</NB></Sec>

<Sec n="12" title="Use Case: Fraud Detection"><P>{`High-cardinality categoricals (merchant_id, device_type, IP country), imbalanced classes, production latency requirements. CatBoost handles all three natively: ordered TS for categoricals, <code>auto_class_weights="Balanced"</code> for imbalance, symmetric trees for fast inference. A fraud model deployed as an online scorer can evaluate transactions in microseconds per prediction — the lookup-table structure of symmetric trees enables this.`}</P><P>{`The feature combination capability is particularly valuable: CatBoost automatically discovers that merchant_id × transaction_type and device_type × IP_country are informative interaction features — combinations that a manual feature engineer might miss in a dataset with hundreds of categoricals.`}</P></Sec>

<Sec n="13" title="Use Case: CTR Prediction"><P>{`Click-through rate prediction for online advertising is CatBoost's strongest competitive domain. Features: user_id, ad_id, publisher_id, device_type, time_of_day, geo_region — nearly all categorical, many with millions of unique values. Traditional approaches require extensive feature engineering (hash encoding, frequency encoding, embedding tables). CatBoost's ordered TS handles them natively, and the ordered boosting prevents overfitting to rare categories.`}</P></Sec>

<Sec n="14" title="Limitations"><P>{`<strong>1. Training speed.</strong> Ordered boosting is ~1.7x slower than plain mode (and than LightGBM). For very large datasets (100M+ rows), this matters. <em>Workaround:</em> use <code>boosting_type="Plain"</code> for large data, or GPU training. <strong>2. Memory.</strong> CatBoost's internal data structures (particularly for categorical feature combinations) can use more memory than LightGBM. <em>Workaround:</em> limit <code>max_ctr_complexity</code> to reduce combination search space. <strong>3. Smaller community.</strong> XGBoost has the largest community, most Stack Overflow answers, and broadest integration ecosystem. CatBoost's community is growing but smaller. <em>Workaround:</em> excellent documentation and active GitHub. <strong>4. Symmetric tree expressiveness.</strong> For some datasets, asymmetric trees capture complex patterns better per tree. <em>Workaround:</em> try <code>grow_policy="Depthwise"</code> or increase iterations.`}</P></Sec>

<Sec n="15" title="Production Deployment"><P>{`CatBoost models can be exported as: (1) native CatBoost format (cbm, fastest loading), (2) ONNX for cross-platform inference, (3) CoreML for iOS, (4) C++ code for embedding in applications, (5) Python pickle for scikit-learn pipelines. The symmetric tree structure makes CatBoost one of the fastest models at inference time — predictions involve lookups in a flat array, not tree traversals. This matters for real-time applications (search ranking, fraud scoring, ad serving).`}</P>
<NB title="09_deploy.py" n={9}>{`# Save and load model
model.save_model("catboost_model.cbm")
print("Saved: catboost_model.cbm")

# Load and predict
loaded = CatBoostClassifier()
loaded.load_model("catboost_model.cbm")
preds = loaded.predict_proba(X_test.iloc[:3])[:, 1]
print(f"Predictions: {"{"}preds{"}"}")

# Export to ONNX (cross-platform)
# model.save_model("model.onnx", format="onnx")

# Model metadata
print(f"\\nModel info:")
print(f"  Tree count: {"{"}loaded.tree_count_{"}"}")
print(f"  Features: {"{"}loaded.feature_names_{"}"[:5]}...")
print(f"  Cat features: {"{"}len(cat_features){"}"}")`}</NB>
<Callout type="tip" title="End of notebook">{`Cells 0–9: setup → train → Pool → importance → SHAP → vs XGB/LGBM → GPU → tuning → ranking → deploy. Copy green-bordered cells in order.`}</Callout></Sec>

<Sec n="16" title="The People"><P>{`<strong>Liudmila Prokhorenkova</strong> (Yandex, MIPT): first author of the NeurIPS 2018 paper, formalised the prediction shift problem. <strong>Anna Veronika Dorogush</strong> (Yandex): lead developer, CatBoost architecture. <strong>Andrey Gulin</strong> (Yandex): head of the machine learning group, CatBoost project lead. <strong>Gleb Gusev</strong> and <strong>Aleksandr Vorobev</strong> (Yandex): co-authors, core contributors. For context: <strong>Tianqi Chen</strong> (University of Washington → OctoML): XGBoost (KDD 2016). <strong>Guolin Ke</strong> et al. (Microsoft Research): LightGBM (NeurIPS 2017). <strong>Jerome Friedman</strong> (Stanford): the original gradient boosting algorithm (2001) that all three build upon.`}</P></Sec>

<Sec n="17" title="Where CatBoost Is Heading"><P>{`Three directions: (1) <strong>Text feature support</strong> — CatBoost can natively consume raw text columns (tokenise, embed, and train jointly). As NLP features become more common in tabular datasets, this reduces the need for separate text preprocessing. (2) <strong>TabArena benchmarking</strong> — CatBoost is included in the TabArena living benchmark alongside XGBoost and LightGBM, with continuous evaluation on new datasets. (3) <strong>Uncertainty estimation</strong> — CatBoost's virtual ensembles provide uncertainty estimates similar to MC Dropout but without the dropout architecture, using the model's internal bagging structure. This connects to the broader conformal prediction trend.`}</P></Sec>

<Sec n="18" title="Decision Framework"><div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:8,padding:28,margin:"20px 0"}}><div style={{fontFamily:F.b,fontSize:15,lineHeight:2.2,color:C.text}}><div style={{marginBottom:8}}><span style={{color:C.green,fontWeight:700,fontSize:16}}>✓ Use CatBoost when:</span></div><div style={{paddingLeft:24,fontSize:14,lineHeight:2}}>Your dataset has many categorical features (especially high-cardinality).<br/>You want strong performance with minimal hyperparameter tuning (best defaults).<br/>Your dataset is small-to-medium (ordered boosting prevents overfitting).<br/>You need fast inference for real-time scoring (symmetric trees).<br/>You have a ranking task (YetiRank, native L2R support).<br/>You need built-in SHAP that's faster than the shap library.</div><div style={{marginTop:20,marginBottom:8}}><span style={{color:C.red,fontWeight:700,fontSize:16}}>✗ Consider alternatives when:</span></div><div style={{paddingLeft:24,fontSize:14,lineHeight:2}}>Maximum CPU training speed is critical → LightGBM (GOSS + EFB).<br/>You need the largest community and ecosystem → XGBoost.<br/>Your features are all numerical and pre-engineered → XGBoost or LightGBM (marginal CatBoost advantage).<br/>Very large datasets (100M+ rows) where ordered boosting is too slow → LightGBM or CatBoost Plain.<br/>You need interpretable glass-box models → EBMs (InterpretML).</div></div></div><P>{`CatBoost is the most theoretically principled member of the gradient boosting trinity. Its ordered boosting solves a real bias that competitors ignore. Its categorical handling is the best in the field. Its defaults produce competitive models with zero tuning. When your data has categoricals and your time for tuning is limited, CatBoost is the rational first choice. When your data is large, numerical, and you have time to tune — any member of the trinity will serve you well.`}</P></Sec>

<UseCaseDiag/><Cap>Four sweet spots where CatBoost's design advantages matter most.</Cap>

<div style={{marginTop:60,paddingTop:24,borderTop:`1px solid ${C.border}`}}><div style={{fontFamily:F.b,fontSize:12,color:C.light,lineHeight:1.8}}><strong>Sources:</strong> CatBoost docs (catboost.ai), GitHub (catboost/catboost). <strong>Academic:</strong> Prokhorenkova, Gusev, Vorobev, Dorogush, Gulin NeurIPS 2018; Chen & Guestrin KDD 2016 (XGBoost); Ke et al. NeurIPS 2017 (LightGBM); Friedman 2001 (Gradient Boosting); Bentéjac et al. 2021 (Comparative Study). <strong>Benchmarks:</strong> TabArena living benchmark; Kaggle competition meta-analyses.</div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12,marginTop:16}}><div style={{fontFamily:F.m,fontSize:11,color:C.light}}>CatBoost 1.2+ · Apache 2.0 · catboost.ai</div><div style={{fontFamily:F.m,fontSize:11,color:C.light}}>Length determined by information, not word count</div></div></div>
</div></div>);}
