/* --- YAML frontmatter --- */
/*
title: "Born from Fire"
subtitle: "The crystallography, tectonic genesis, and contested economics of the world's only tanzanite deposit — a 585-million-year-old mineralogical accident occupying 14 km² of northern Tanzania."
category: "science-nature"
style: "natgeo-sciam-hybrid"
date: "2026-04-19"
tags: [tanzanite, zoisite, crystallography, tanzania, merelani]
*/

const ARTICLE_DATA = {
  title: "Born from Fire",
  subtitle: "The crystallography, tectonic genesis, and contested economics of the world's only tanzanite deposit — a 585-million-year-old mineralogical accident occupying 14 km² of northern Tanzania.",
  category: "science-nature",
  style: "natgeo-sciam-hybrid",
  date: "2026-04-19",
  author: "Matthew Deane",
  tags: ["tanzanite", "zoisite", "crystallography", "tanzania", "merelani"],
};

/*
MODE: Scientific American Hybrid | FORMAT: Full Feature
TOPIC: Tanzanite — crystallography, tectonic genesis, extraction, and economic geology
THREADS: (1) The crystal — mineralogy, spectroscopy, formation mechanism
          (2) The mine — human cost, artisanal extraction, safety
          (3) The nation — resource nationalism, sovereignty, depletion
*/

const C = {
  deep:"#08041a", mid:"#1a0a3e", light:"#6a50c0", glow:"#8b6ee0",
  gold:"#c9a84c", goldL:"#e8d5a0", cream:"#f4efe6", creamD:"#e5ddd0",
  text:"#1a1410", textL:"#4a4035", cap:"#6b6055", rust:"#a0522d",
  warn:"#8b3030", blue:"#1a55aa", violet:"#5a30aa"
};

/* ═══════════════════════════════════════════════════════════════
   SVG ILLUSTRATIONS — 5 DATA VISUALISATIONS
   ═══════════════════════════════════════════════════════════════ */

// 1. CRYSTAL STRUCTURE — Orthorhombic unit cell with V³⁺ substitution
function CrystalSVG(){
  return(
    <svg viewBox="0 0 880 540" style={{width:"100%",display:"block",background:C.cream}}>
      <text x="440" y="24" textAnchor="middle" fill={C.text} fontSize="14" fontWeight="600" fontFamily="'Cormorant Garamond',serif" letterSpacing="2">ZOISITE UNIT CELL (Pnma) — V³⁺ SUBSTITUTION SITES</text>
      <text x="440" y="44" textAnchor="middle" fill={C.cap} fontSize="10" fontFamily="'Cormorant Garamond',serif">Ca₂Al₃(SiO₄)(Si₂O₇)O(OH) · a = 16.19 Å, b = 5.55 Å, c = 10.06 Å · Z = 4</text>
      <g transform="translate(200,300)">
        {/* Unit cell — isometric wireframe */}
        <polygon points="0,-130 170,-195 340,-130 170,-65" fill="none" stroke="#aaa" strokeWidth="1" strokeDasharray="4,3"/>
        <polygon points="0,0 170,-65 340,0 170,65" fill="none" stroke="#666" strokeWidth="1.5"/>
        <line x1="0" y1="-130" x2="0" y2="0" stroke="#888" strokeWidth="1"/>
        <line x1="170" y1="-195" x2="170" y2="-65" stroke="#aaa" strokeWidth="1" strokeDasharray="4,3"/>
        <line x1="340" y1="-130" x2="340" y2="0" stroke="#888" strokeWidth="1"/>
        <line x1="170" y1="-65" x2="170" y2="65" stroke="#666" strokeWidth="1.5"/>
        {/* Axes */}
        <text x="-18" y="-60" fill={C.textL} fontSize="13" fontWeight="700" fontFamily="monospace">b</text>
        <text x="355" y="-60" fill={C.textL} fontSize="13" fontWeight="700" fontFamily="monospace">a</text>
        <text x="180" y="82" fill={C.textL} fontSize="13" fontWeight="700" fontFamily="monospace">c</text>
        {/* SiO₄ tetrahedra */}
        {[{x:55,y:-95},{x:110,y:-35},{x:210,y:-145},{x:270,y:-75},{x:150,y:-120}].map((p,i)=>(
          <polygon key={`si${i}`} points={`${p.x},${p.y-13} ${p.x+11},${p.y+7} ${p.x-11},${p.y+7}`} fill="#4488cc" opacity=".55" stroke="#2266aa" strokeWidth=".8"/>
        ))}
        {/* Si₂O₇ pairs — sorosilicate linkage */}
        {[{x:85,y:-45},{x:230,y:-108}].map((p,i)=>(
          <g key={`sr${i}`}>
            <polygon points={`${p.x},${p.y} ${p.x+10},${p.y-13} ${p.x+20},${p.y}`} fill="#4488cc" opacity=".65" stroke="#2266aa" strokeWidth=".8"/>
            <polygon points={`${p.x+20},${p.y} ${p.x+30},${p.y-13} ${p.x+40},${p.y}`} fill="#4488cc" opacity=".65" stroke="#2266aa" strokeWidth=".8"/>
            <circle cx={p.x+20} cy={p.y} r="2.8" fill="#cc4444" opacity=".8"/>
          </g>
        ))}
        {/* M1,2 octahedra — Al/V sites */}
        {[{x:45,y:-65},{x:190,y:-108},{x:290,y:-55}].map((p,i)=>(
          <g key={`m12${i}`}>
            <polygon points={`${p.x},${p.y-17} ${p.x+15},${p.y} ${p.x},${p.y+17} ${p.x-15},${p.y}`} fill="#6a30aa" opacity=".3" stroke="#5020aa" strokeWidth="1.2"/>
            <text x={p.x} y={p.y+4} textAnchor="middle" fill="#5020aa" fontSize="7" fontWeight="700" fontFamily="monospace">M1,2</text>
          </g>
        ))}
        {/* M3 octahedra — more distorted */}
        {[{x:135,y:-75},{x:250,y:-35}].map((p,i)=>(
          <g key={`m3${i}`}>
            <polygon points={`${p.x},${p.y-19} ${p.x+17},${p.y} ${p.x},${p.y+19} ${p.x-17},${p.y}`} fill="#aa5030" opacity=".25" stroke="#884020" strokeWidth="1.2"/>
            <text x={p.x} y={p.y+4} textAnchor="middle" fill="#884020" fontSize="7" fontWeight="700" fontFamily="monospace">M3</text>
          </g>
        ))}
        {/* Ca sites */}
        {[{x:25,y:-150},{x:170,y:-160},{x:300,y:-108}].map((p,i)=>(
          <g key={`ca${i}`}><circle cx={p.x} cy={p.y} r="6.5" fill={C.gold} opacity=".45" stroke={C.gold} strokeWidth="1"/><text x={p.x} y={p.y+3.5} textAnchor="middle" fill="#5a3a08" fontSize="6.5" fontWeight="700" fontFamily="monospace">Ca</text></g>
        ))}
        {/* V³⁺ annotation */}
        <line x1="45" y1="-65" x2="-10" y2="-25" stroke="#dd3030" strokeWidth="1" strokeDasharray="3,2"/>
        <text x="-75" y="-22" fill="#cc2020" fontSize="9" fontWeight="700" fontFamily="monospace">V³⁺ → Al³⁺</text>
        <text x="-75" y="-9" fill="#cc2020" fontSize="8" fontFamily="monospace">BVS = 3.03 vu (overbonded)</text>
        <line x1="135" y1="-75" x2="90" y2="-30" stroke="#884020" strokeWidth="1" strokeDasharray="3,2"/>
        <text x="28" y="-10" fill="#884020" fontSize="8" fontFamily="monospace">M3 BVS = 2.78 vu</text>
      </g>
      {/* Legend */}
      <g transform="translate(620,80)">
        <text x="0" y="0" fill={C.text} fontSize="12" fontWeight="600" fontFamily="'Cormorant Garamond',serif">Key</text>
        {[
          {y:18,fill:"#4488cc",label:"SiO₄ / Si₂O₇ tetrahedra"},
          {y:36,fill:"#6a30aa",label:"M1,2 octahedra (Al³⁺/V³⁺) · 〈bond〉 < 1.90 Å"},
          {y:54,fill:"#aa5030",label:"M3 octahedra · 〈bond〉 ≈ 1.96 Å"},
        ].map((l,i)=>(<g key={i}><rect x="0" y={l.y-8} width="11" height="11" rx="1" fill={l.fill} opacity=".4" stroke={l.fill} strokeWidth="1"/><text x="16" y={l.y+1} fill={C.textL} fontSize="9" fontFamily="'Cormorant Garamond',serif">{l.label}</text></g>))}
        <g><circle cx="5.5" cy="72" r="5.5" fill={C.gold} opacity=".45"/><text x="16" y="76" fill={C.textL} fontSize="9" fontFamily="'Cormorant Garamond',serif">Ca²⁺ sites</text></g>
        <g><circle cx="5.5" cy="90" r="3" fill="#cc4444" opacity=".8"/><text x="16" y="94" fill={C.textL} fontSize="9" fontFamily="'Cormorant Garamond',serif">Bridging O (sorosilicate link)</text></g>
        <text x="0" y="120" fill={C.text} fontSize="11" fontWeight="600" fontFamily="'Cormorant Garamond',serif">Physical constants</text>
        {["Hardness: 6–6.5 Mohs","SG: 3.35","RI: nα=1.691, nβ=1.693, nγ=1.700","Birefringence: 0.009","Cleavage: {010} perfect","Optic sign: biaxial +"].map((t,i)=>(
          <text key={i} x="0" y={138+i*14} fill={C.textL} fontSize="9" fontFamily="'JetBrains Mono',monospace">{t}</text>
        ))}
        <text x="0" y="230" fill="#cc2020" fontSize="10" fontWeight="600" fontFamily="'Cormorant Garamond',serif">Chromophore</text>
        {["V³⁺ (d²) at M1,2: absorbs near 350 nm","V⁴⁺ band at ~380 nm: increases with heat","Heat → V³⁺ oxidises to V⁴⁺","Ti⁴⁺ charge-transfer suppressed","Brown removed → blue-violet stable"].map((t,i)=>(
          <text key={i} x="0" y={248+i*13} fill={C.textL} fontSize="8.5" fontFamily="'Cormorant Garamond',serif">{t}</text>
        ))}
      </g>
      <text x="440" y="530" textAnchor="middle" fill={C.cap} fontSize="9" fontFamily="'Cormorant Garamond',serif" fontStyle="italic">After Bačík et al. (2023), Mineralogical Magazine; Schmetzer (1982); Bocchio et al. (2012)</text>
    </svg>
  );
}

// 2. GEOLOGICAL CROSS-SECTION
function GeoSVG(){
  return(
    <svg viewBox="0 0 920 520" style={{width:"100%",display:"block",background:C.cream}}>
      <text x="460" y="22" textAnchor="middle" fill={C.text} fontSize="14" fontWeight="600" fontFamily="'Cormorant Garamond',serif" letterSpacing="2">MERELANI DEPOSIT — SCHEMATIC CROSS-SECTION (NW–SE)</text>
      <text x="460" y="40" textAnchor="middle" fill={C.cap} fontSize="10" fontFamily="'Cormorant Garamond',serif">Lelatema Mountains, Mozambique Belt · showing isoclinal fold hinge mineralisation</text>
      <g transform="translate(60,60)">
        <path d="M0,50 Q120,35 250,48 Q400,58 540,42 Q680,32 780,52" fill="none" stroke="#5a4a2a" strokeWidth="2"/>
        <path d="M0,50 Q120,35 250,48 Q400,58 540,42 Q680,32 780,52 L780,82 Q680,68 540,78 Q400,88 250,80 Q120,72 0,82Z" fill="#8b7355" opacity=".25"/>
        <text x="390" y="73" textAnchor="middle" fill="#6b5535" fontSize="8" fontFamily="monospace">Laterite / overburden</text>
        <path d="M0,82 Q120,72 250,80 Q400,88 540,78 Q680,68 780,82 L780,200 Q600,192 400,218 Q200,238 0,210Z" fill="#222018" opacity=".35"/>
        <text x="130" y="145" fill="#999" fontSize="9" fontFamily="monospace">Graphitic gneiss</text>
        <path d="M0,210 Q200,238 400,218 Q600,192 780,200 L780,242 Q600,232 400,260 Q200,278 0,250Z" fill="#c0b8a0" opacity=".35" stroke="#a09878" strokeWidth="1"/>
        <text x="650" y="225" fill="#706848" fontSize="9" fontWeight="600" fontFamily="monospace">Dolomitic marble (host)</text>
        <path d="M0,250 Q200,278 400,260 Q600,232 780,242 L780,272 Q600,262 400,290 Q200,310 0,280Z" fill="#7a8a6a" opacity=".25" stroke="#5a6a4a" strokeWidth="1"/>
        <text x="150" y="298" fill="#4a5a3a" fontSize="9" fontFamily="monospace">Calc-silicate horizon</text>
        <path d="M0,280 Q200,310 400,290 Q600,262 780,272 L780,400 Q600,392 400,412 Q200,422 0,405Z" fill="#222018" opacity=".3"/>
        <text x="650" y="350" fill="#999" fontSize="9" fontFamily="monospace">Graphitic gneiss (lower)</text>
        {/* Isoclinal fold */}
        <path d="M310,182 Q350,162 390,182 Q430,202 390,222 Q350,242 310,222 Q270,202 310,182" fill="none" stroke="#cc6030" strokeWidth="2.8" strokeDasharray="6,3"/>
        <text x="280" y="168" fill="#cc6030" fontSize="11" fontWeight="700" fontFamily="monospace">ISOCLINAL</text>
        <text x="280" y="182" fill="#cc6030" fontSize="11" fontWeight="700" fontFamily="monospace">FOLD HINGE</text>
        <ellipse cx="370" cy="202" rx="32" ry="16" fill="#6a50c0" opacity=".4" stroke="#4a30aa" strokeWidth="2"/>
        <text x="370" y="206" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="700" fontFamily="monospace">TZ ORE</text>
        {/* Fault */}
        <line x1="530" y1="50" x2="480" y2="400" stroke="#ff4040" strokeWidth="2" strokeDasharray="8,4"/>
        <text x="545" y="128" fill="#cc2020" fontSize="10" fontWeight="700" fontFamily="monospace">LELATEMA</text>
        <text x="545" y="142" fill="#cc2020" fontSize="10" fontWeight="700" fontFamily="monospace">FAULT</text>
        {/* Hydrothermal arrows */}
        {[{x:465,y:340},{x:472,y:290},{x:476,y:242}].map((p,i)=>(
          <g key={i}><line x1={p.x} y1={p.y} x2={p.x-22} y2={p.y-42} stroke="#3388cc" strokeWidth="1.5" opacity=".5"/><polygon points={`${p.x-22},${p.y-42} ${p.x-17},${p.y-33} ${p.x-27},${p.y-33}`} fill="#3388cc" opacity=".5"/></g>
        ))}
        <text x="498" y="278" fill="#2266aa" fontSize="9" fontFamily="monospace">Hydrothermal</text>
        <text x="498" y="290" fill="#2266aa" fontSize="9" fontFamily="monospace">fluids ↑</text>
        {/* Mine shaft */}
        <rect x="160" y="52" width="6" height="210" fill="#1a1410" opacity=".7"/>
        <text x="138" y="105" fill={C.text} fontSize="8" fontFamily="monospace" textAnchor="end">Shaft</text>
        <text x="138" y="117" fill={C.text} fontSize="8" fontFamily="monospace" textAnchor="end">~400 m</text>
        {/* Depth scale */}
        <line x1="800" y1="52" x2="800" y2="400" stroke="#888" strokeWidth="1"/>
        {[{d:0,y:52},{d:100,y:139},{d:200,y:226},{d:300,y:313},{d:400,y:400}].map((m,i)=>(
          <g key={i}><line x1="795" y1={m.y} x2="805" y2={m.y} stroke="#888" strokeWidth="1"/><text x="815" y={m.y+3} fill={C.cap} fontSize="8" fontFamily="monospace">{m.d}m</text></g>
        ))}
      </g>
      <text x="460" y="505" textAnchor="middle" fill={C.cap} fontSize="9" fontFamily="'Cormorant Garamond',serif" fontStyle="italic">After Malisa (1987); Olivier (2006); Davies & Chase (1994); SearchMin geological documentation</text>
    </svg>
  );
}

// 3. ABSORPTION SPECTROSCOPY
function SpecSVG(){
  return(
    <svg viewBox="0 0 860 380" style={{width:"100%",display:"block",background:C.cream}}>
      <text x="430" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontWeight="600" fontFamily="'Cormorant Garamond',serif" letterSpacing="2">OPTICAL ABSORPTION — HEAT TREATMENT EFFECT</text>
      <g transform="translate(100,55)">
        <line x1="0" y1="250" x2="660" y2="250" stroke="#888" strokeWidth="1.5"/>
        <line x1="0" y1="0" x2="0" y2="250" stroke="#888" strokeWidth="1.5"/>
        <text x="330" y="278" textAnchor="middle" fill={C.text} fontSize="10" fontFamily="monospace">Wavelength (nm)</text>
        <text x="-35" y="125" textAnchor="middle" fill={C.text} fontSize="10" fontFamily="monospace" transform="rotate(-90,-35,125)">Absorbance</text>
        {[{nm:350,x:0},{nm:400,x:82},{nm:450,x:165},{nm:500,x:248},{nm:550,x:330},{nm:600,x:412},{nm:650,x:495},{nm:700,x:578},{nm:750,x:660}].map((w,i)=>(
          <g key={i}><line x1={w.x} y1="250" x2={w.x} y2="255" stroke="#888" strokeWidth="1"/><text x={w.x} y="267" textAnchor="middle" fill={C.cap} fontSize="8" fontFamily="monospace">{w.nm}</text></g>
        ))}
        <defs><linearGradient id="vis" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#7700ff"/><stop offset="15%" stopColor="#0000ff"/><stop offset="30%" stopColor="#00ccff"/><stop offset="45%" stopColor="#00ff00"/><stop offset="60%" stopColor="#ffff00"/><stop offset="75%" stopColor="#ff8800"/><stop offset="100%" stopColor="#ff0000"/></linearGradient></defs>
        <rect x="82" y="252" width="496" height="5" fill="url(#vis)" opacity=".5" rx="2"/>
        {/* Unheated */}
        <path d="M0,175 Q20,165 40,135 Q60,100 82,60 Q100,42 120,72 Q140,100 165,118 Q200,148 248,158 Q300,152 330,128 Q360,108 412,148 Q450,175 495,202 Q550,222 578,228 Q620,232 660,235" fill="none" stroke={C.rust} strokeWidth="2.5" opacity=".65"/>
        {/* Heated */}
        <path d="M0,195 Q20,185 40,158 Q60,118 82,42 Q100,18 120,38 Q140,72 165,108 Q200,158 248,188 Q300,205 330,215 Q360,220 412,225 Q450,228 495,230 Q550,234 578,236 Q620,238 660,240" fill="none" stroke="#2040cc" strokeWidth="2.5"/>
        {/* Annotations */}
        <text x="8" y="52" fill="#cc4040" fontSize="8" fontWeight="600" fontFamily="monospace">V³⁺ ~350 nm</text>
        <text x="8" y="38" fill="#cc4040" fontSize="7" fontFamily="monospace">(decreases with heat)</text>
        <text x="92" y="14" fill="#2040cc" fontSize="8" fontWeight="600" fontFamily="monospace">V⁴⁺ ~380 nm</text>
        <text x="92" y="3" fill="#2040cc" fontSize="7" fontFamily="monospace">(increases with heat)</text>
        {/* Legend */}
        <line x1="430" y1="15" x2="460" y2="15" stroke={C.rust} strokeWidth="2.5" opacity=".65"/>
        <text x="465" y="19" fill={C.rust} fontSize="9" fontFamily="'Cormorant Garamond',serif">Unheated (trichroic)</text>
        <line x1="430" y1="32" x2="460" y2="32" stroke="#2040cc" strokeWidth="2.5"/>
        <text x="465" y="36" fill="#2040cc" fontSize="9" fontFamily="'Cormorant Garamond',serif">Heated 500–600°C (dichroic)</text>
      </g>
      <text x="430" y="365" textAnchor="middle" fill={C.cap} fontSize="9" fontFamily="'Cormorant Garamond',serif" fontStyle="italic">Heating oxidises V³⁺→V⁴⁺, renders Ti⁴⁺ colourless, eliminates brown absorption. Stable, permanent. After Schmetzer (1982); Bačík et al. (2023).</text>
    </svg>
  );
}

// 4. TECTONIC TIMELINE + MAP
function TectonicSVG(){
  return(
    <svg viewBox="0 0 920 480" style={{width:"100%",display:"block",background:C.cream}}>
      <text x="460" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontWeight="600" fontFamily="'Cormorant Garamond',serif" letterSpacing="2">TECTONIC SETTING & FORMATION SEQUENCE</text>
      {/* East Africa map */}
      <g transform="translate(50,50)">
        <path d="M110,0 Q130,18 145,55 Q158,95 168,135 Q175,175 165,215 Q155,255 160,295 Q170,335 190,365 L170,375 Q150,345 135,305 Q120,265 110,225 Q100,185 90,145 Q80,105 75,65 Q72,25 110,0" fill="#e0d8c8" stroke="#888" strokeWidth="1.5"/>
        <path d="M130,175 Q145,170 160,185 Q170,205 165,225 Q155,245 140,250 Q125,240 120,220 Q115,200 130,175" fill={C.gold} opacity=".25" stroke="#8b6914" strokeWidth="1.5"/>
        <text x="140" y="216" textAnchor="middle" fill="#5a3a08" fontSize="10" fontWeight="600">TANZANIA</text>
        <circle cx="152" cy="190" r="4.5" fill="#cc2020"/>
        <text x="162" y="188" fill="#cc2020" fontSize="8" fontWeight="700" fontFamily="monospace">MERELANI</text>
        <text x="162" y="178" fill={C.textL} fontSize="7" fontFamily="monospace">▲ Kilimanjaro</text>
        <path d="M145,55 Q158,95 168,135 Q175,175 165,215 Q155,255 160,295 Q170,335 190,365" fill="none" stroke="#6a50c0" strokeWidth="14" opacity=".12"/>
        <text x="192" y="142" fill="#6a50c0" fontSize="9" fontWeight="700" fontFamily="monospace" transform="rotate(10,192,142)">MOZAMBIQUE</text>
        <text x="192" y="156" fill="#6a50c0" fontSize="9" fontWeight="700" fontFamily="monospace" transform="rotate(10,192,156)">BELT</text>
        <text x="88" y="198" fill="#888" fontSize="8" fontFamily="monospace">Tanzania</text>
        <text x="88" y="210" fill="#888" fontSize="8" fontFamily="monospace">Craton</text>
        <text x="120" y="55" fill={C.cap} fontSize="8" fontFamily="monospace">Kenya</text>
        <text x="145" y="305" fill={C.cap} fontSize="8" fontFamily="monospace">Mozambique</text>
      </g>
      {/* Timeline */}
      <g transform="translate(350,60)">
        <text x="0" y="0" fill={C.text} fontSize="12" fontWeight="600" fontFamily="'Cormorant Garamond',serif">Pan-African Orogeny → Tanzanite Crystallisation</text>
        <line x1="30" y1="25" x2="30" y2="385" stroke={C.gold} strokeWidth="2"/>
        {[
          {y:30,age:"~800 Ma",ev:"Mozambique Ocean opens",d:"Rodinia breakup. Rifting creates basin between E & W Gondwana",c:"#3388cc"},
          {y:90,age:"~650 Ma",ev:"Subduction & arc accretion",d:"Island arcs form in Mozambique Ocean basin. EGCD nappes begin assembly",c:"#5a8a3a"},
          {y:150,age:"~620 Ma",ev:"East African Orogeny",d:"Ocean closes. Continental collision. Granulite-facies peak: T ≈ 600–800°C, P ≈ 8–12 kbar",c:"#cc6030"},
          {y:220,age:"~585 Ma",ev:"TANZANITE CRYSTALLISATION",d:"V-bearing hydrothermal fluids → Lelatema fault → isoclinal fold hinges in dolomitic marble. V³⁺ substitutes for Al³⁺ at M1,2 in zoisite lattice",c:"#6a50c0"},
          {y:310,age:"~550 Ma",ev:"Post-orogenic extension",d:"Lithospheric delamination. Erosion begins exposing metamorphic basement",c:"#8b6914"},
          {y:375,age:"1967",ev:"Discovery",d:"Jumanne Ngoma finds crystals. 585 Myr of burial ends",c:"#cc2020"},
        ].map((e,i)=>(
          <g key={i}>
            <circle cx="30" cy={e.y} r="5.5" fill={e.c}/>
            <text x="48" y={e.y-5} fill={e.c} fontSize="9" fontWeight="700" fontFamily="monospace">{e.age}</text>
            <text x="48" y={e.y+9} fill={C.text} fontSize="10.5" fontWeight="600" fontFamily="'Cormorant Garamond',serif">{e.ev}</text>
            <text x="48" y={e.y+23} fill={C.textL} fontSize="8.5" fontFamily="'Cormorant Garamond',serif">{e.d.substring(0,90)}</text>
            {e.d.length>90&&<text x="48" y={e.y+34} fill={C.textL} fontSize="8.5" fontFamily="'Cormorant Garamond',serif">{e.d.substring(90)}</text>}
          </g>
        ))}
      </g>
      <text x="460" y="468" textAnchor="middle" fill={C.cap} fontSize="9" fontFamily="'Cormorant Garamond',serif" fontStyle="italic">After Fritz et al. (2013); Muhongo & Lenoir (1994); Malisa (1987); Viola et al. (2008)</text>
    </svg>
  );
}

// 5. RESERVES & PRODUCTION
function ReservesSVG(){
  const data=[{yr:"2011",kg:480},{yr:"2015",kg:250},{yr:"2018",kg:148},{yr:"2019",kg:781},{yr:"2020",kg:600},{yr:"2023",kg:500}];
  return(
    <svg viewBox="0 0 900 420" style={{width:"100%",display:"block",background:C.cream}}>
      <text x="450" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontWeight="600" fontFamily="'Cormorant Garamond',serif" letterSpacing="2">PRODUCTION & RESERVES</text>
      {/* LEFT: Bar chart */}
      <g transform="translate(60,55)">
        <text x="0" y="0" fill={C.text} fontSize="11" fontWeight="600" fontFamily="'Cormorant Garamond',serif">Annual rough production (kg)</text>
        <line x1="40" y1="20" x2="40" y2="240" stroke="#888" strokeWidth="1"/>
        <line x1="40" y1="240" x2="400" y2="240" stroke="#888" strokeWidth="1"/>
        {[0,200,400,600,800].map((v,i)=>{const y=240-(v/800)*220;return (<g key={i}><text x="34" y={y+3} textAnchor="end" fill={C.cap} fontSize="8" fontFamily="monospace">{v}</text><line x1="40" y1={y} x2="400" y2={y} stroke="#ddd" strokeWidth=".5"/></g>);})}
        {data.map((d,i)=>{const x=60+i*55,h=(d.kg/800)*220,by=240-h;return (<g key={i}><rect x={x} y={by} width="40" height={h} fill={d.yr==="2019"?C.light:C.gold} opacity={d.yr==="2019"?.7:.45} rx="2"/><text x={x+20} y={by-5} textAnchor="middle" fill={C.text} fontSize="9" fontWeight="600" fontFamily="monospace">{d.kg}</text><text x={x+20} y="255" textAnchor="middle" fill={C.text} fontSize="9" fontFamily="monospace">{d.yr}</text></g>);})}
        <line x1={60+2*55+45} y1="20" x2={60+2*55+45} y2="240" stroke="#cc2020" strokeWidth="1" strokeDasharray="4,3"/>
        <text x={60+2*55+50} y="35" fill="#cc2020" fontSize="8" fontWeight="600" fontFamily="monospace">24 km wall</text>
      </g>
      {/* RIGHT: Reserve breakdown */}
      <g transform="translate(500,55)">
        <text x="0" y="0" fill={C.text} fontSize="11" fontWeight="600" fontFamily="'Cormorant Garamond',serif">Reserve estimates (2018 NBS Tanzania report)</text>
        <text x="0" y="22" fill={C.textL} fontSize="10" fontFamily="'Cormorant Garamond',serif">Total: 109,000,000 carats (21,800 kg / 48,100 lb)</text>
        {/* Proportional blocks */}
        <rect x="0" y="40" width="320" height="40" rx="4" fill={C.light} opacity=".3" stroke={C.light} strokeWidth="1.5"/>
        <text x="160" y="64" textAnchor="middle" fill={C.light} fontSize="11" fontWeight="700" fontFamily="monospace">Block C: 87.1M ct (80%)</text>
        <rect x="0" y="88" width="72" height="30" rx="3" fill={C.rust} opacity=".3" stroke={C.rust} strokeWidth="1"/>
        <text x="36" y="107" textAnchor="middle" fill={C.rust} fontSize="8" fontWeight="600" fontFamily="monospace">A,B,D</text>
        <text x="82" y="107" fill={C.textL} fontSize="9" fontFamily="'Cormorant Garamond',serif">~21.9M ct (artisanal blocks)</text>
        <text x="0" y="140" fill={C.text} fontSize="10" fontWeight="600" fontFamily="'Cormorant Garamond',serif">Life of Mine (Block C): until ~2040s</text>
        <text x="0" y="158" fill={C.textL} fontSize="9" fontFamily="'Cormorant Garamond',serif">Operator: TanzaniteOne / Richland + STAMICO (50/50)</text>
        <text x="0" y="174" fill={C.textL} fontSize="9" fontFamily="'Cormorant Garamond',serif">Licence cost: US$40M (2005). Three shafts to 300 m depth.</text>
        <text x="0" y="195" fill={C.text} fontSize="10" fontWeight="600" fontFamily="'Cormorant Garamond',serif">Market value (March 2026)</text>
        <text x="0" y="213" fill={C.textL} fontSize="9" fontFamily="'Cormorant Garamond',serif">$100–$800/ct (grade-dependent). Premium: $900+/ct avg 2025.</text>
        <text x="0" y="229" fill={C.textL} fontSize="9" fontFamily="'Cormorant Garamond',serif">Exceptional stones (&gt;10 ct): $8,000+/ct</text>
        <text x="0" y="250" fill={C.warn} fontSize="9" fontWeight="600" fontFamily="'Cormorant Garamond',serif">Ore-grade decline</text>
        <text x="0" y="266" fill={C.textL} fontSize="8.5" fontFamily="'Cormorant Garamond',serif">As high-grade zones exhaust → miners move to lower-grade pockets</text>
        <text x="0" y="279" fill={C.textL} fontSize="8.5" fontFamily="'Cormorant Garamond',serif">→ more rock per carat → rising extraction costs → economic threshold</text>
      </g>
      <text x="450" y="408" textAnchor="middle" fill={C.cap} fontSize="9" fontFamily="'Cormorant Garamond',serif" fontStyle="italic">Data: Wikipedia (production); 2018 National Bureau of Statistics Tanzania (reserves); USGS Minerals Yearbook 2019 (Block C LOM to 2042)</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN ARTICLE
   ═══════════════════════════════════════════════════════════════ */
export default function App(){
  const [ok,setOk]=useState(false);
  useEffect(()=>{setTimeout(()=>setOk(true),80)},[]);

  // Scene break ornament
  const Flr=()=><div style={{textAlign:"center",margin:"36px 0",color:C.gold,fontSize:"18px",letterSpacing:"12px"}}>◆ ◆ ◆</div>;
  // Figure wrapper
  const Fig=({children,caption})=>(
    <div style={{margin:"48px -22px"}}>
      {children}
      <div style={{fontSize:"12.5px",color:C.cap,lineHeight:1.55,padding:"10px 22px 0",fontStyle:"italic",borderTop:`1px solid ${C.creamD}`}}>{caption}</div>
    </div>
  );
  // SB
  const SB=({title,children})=><div style={{background:C.creamD,borderLeft:`3px solid ${C.gold}`,padding:"24px 28px",margin:"40px 0"}}><h4 style={{fontFamily:"'Playfair Display',serif",fontSize:"14px",fontWeight:700,color:C.mid,marginBottom:"10px",letterSpacing:"1px",textTransform:"uppercase"}}>{title}</h4>{children}</div>;

  return(<>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=JetBrains+Mono:wght@400;500&display=swap');
      *{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
      .ng{font-family:'Cormorant Garamond','Georgia',serif;color:${C.text};background:${C.cream};overflow-x:hidden}
      .ng p{font-size:18px;line-height:1.78;margin-bottom:1.35em;font-weight:400;letter-spacing:.01em}
      .lead::first-letter{font-family:'Playfair Display',serif;font-size:4.2em;float:left;line-height:.8;margin-right:.06em;margin-top:.05em;color:${C.mid}}
      .hw{position:relative}
      .ho{position:absolute;bottom:0;left:0;right:0;padding:44px 7% 32px;background:linear-gradient(transparent,rgba(5,2,12,.9))}
      .hl{font-family:'Playfair Display',serif;font-weight:900;font-size:clamp(28px,5vw,58px);color:#fff;line-height:1.04;letter-spacing:-.02em;margin-bottom:12px}
      .dk{font-family:'Cormorant Garamond',serif;font-size:clamp(14px,2vw,20px);color:${C.goldL};font-style:italic;line-height:1.4;max-width:740px}
      .yb{width:58px;height:3.5px;background:${C.gold};margin-bottom:16px}
      .pw{max-width:710px;margin:0 auto;padding:48px 22px 20px}
      .pq{font-family:'Playfair Display',serif;font-size:clamp(19px,2.6vw,28px);font-weight:700;font-style:italic;color:${C.mid};border-left:3.5px solid ${C.gold};padding:18px 28px;margin:38px -16px;line-height:1.35}
      .sn{background:${C.deep};color:${C.creamD};padding:40px 7%}
      .sn h3{font-family:'Playfair Display',serif;font-size:17px;color:${C.gold};margin-bottom:14px;letter-spacing:1px}
      .sn ul{list-style:none;padding:0}.sn li{padding:2.5px 0;font-size:12px;line-height:1.5;opacity:.8}.sn li::before{content:"— ";color:${C.gold}}
      .ss{margin-bottom:20px}.st{font-size:10.5px;text-transform:uppercase;letter-spacing:2px;color:${C.goldL};margin-bottom:7px;font-weight:600}
      .ft{text-align:center;padding:28px;background:${C.deep};border-top:3px solid ${C.gold}}
    `}</style>
    <div className="ng" style={{opacity:ok?1:0,transition:"opacity .7s"}}>

      {/* ═══ HERO ═══ */}
      <div className="hw">
        <svg viewBox="0 0 1400 680" style={{width:"100%",display:"block"}}>
          <defs>
            <linearGradient id="hS" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#030112"/><stop offset="40%" stopColor="#0d0820"/><stop offset="70%" stopColor="#1a0a3e"/><stop offset="100%" stopColor="#3a1a10"/></linearGradient>
            <radialGradient id="hG" cx="72%" cy="82%" r="28%"><stop offset="0%" stopColor="#ff5020" stopOpacity=".5"/><stop offset="100%" stopColor="transparent"/></radialGradient>
          </defs>
          <rect width="1400" height="680" fill="url(#hS)"/><rect width="1400" height="680" fill="url(#hG)"/>
          {Array.from({length:40}).map((_,i)=><circle key={i} cx={35+i*35+(i%3)*18} cy={12+(i*43)%310} r={0.4+(i%4)*0.3} fill="#fff" opacity={0.15+(i%5)*0.1}/>)}
          <path d="M0,550 Q260,530 420,510 Q520,480 600,440 Q660,400 695,355 Q715,325 728,300 Q733,292 738,288 Q742,292 746,300 Q758,325 775,355 Q815,405 880,450 Q960,490 1070,520 Q1220,540 1400,550 L1400,680 L0,680Z" fill="#100804"/>
          <path d="M695,355 Q712,328 725,305 Q732,295 736,290 Q740,295 747,308 Q760,330 777,358" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="1.8"/>
          <rect x="0" y="545" width="1400" height="135" fill="#090503"/>
          {[{x:110,s:.65},{x:370,s:.5},{x:1100,s:.8},{x:1290,s:.45}].map((t,i)=><g key={i} transform={`translate(${t.x},540) scale(${t.s})`}><line x1="0" y1="0" x2="0" y2="26" stroke="#100804" strokeWidth="2"/><ellipse cx="0" cy="-4" rx="22" ry="6.5" fill="#100804"/></g>)}
          <g transform="translate(700,560)">
            <path d="M-50,7 Q-30,-4 -15,3 Q0,-7 15,0 Q30,-5 50,7 L42,32 Q0,36 -42,32Z" fill="#2a1a0c"/>
            <polygon points="-10,-70 5,-75 13,-16 -3,-11" fill="#2840aa" opacity=".85"/>
            <polygon points="5,-75 20,-65 24,-11 13,-16" fill="#5030cc" opacity=".8"/>
            <polygon points="20,-44 32,-48 35,-7 24,-5" fill="#4025aa" opacity=".75"/>
            <polygon points="-25,-35 -16,-38 -13,-7 -22,-5" fill="#2248bb" opacity=".8"/>
            <circle cx="0" cy="-52" r="1.8" fill="#fff" opacity=".65"/>
          </g>
        </svg>
        <div className="ho">
          <div className="yb"/>
          <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"10px",color:C.goldL,letterSpacing:"2px",marginBottom:"10px",textTransform:"uppercase"}}>Mode: Scientific American Hybrid &nbsp;|&nbsp; Format: Full Feature</div>
          <h1 className="hl">Born from Fire</h1>
          <p className="dk">The crystallography, tectonic genesis, and contested economics of the world's only tanzanite deposit — a 585-million-year-old mineralogical accident occupying 14 km² of northern Tanzania, with estimated reserves of 109 million carats and a Life of Mine that may not outlast the generation extracting it.</p>
        </div>
      </div>

      {/* ═══ PROSE BODY ═══ */}
      <div className="pw">

        {/* ——— ACT I: OPENING SCENE — The Crystal ——— */}

        <p className="lead">Four hundred metres below the surface of the Merelani Hills, in a shaft no wider than a man's shoulders, Emmanuel Mollel wedges his bare foot against a wooden rung and descends into rock that last saw light during the Ediacaran Period. His headlamp — a construction-site model, because there are no mining helmets in Block D — throws amber into graphite-streaked gneiss, the metamorphic signature of the Lelatema Mountains, a segment of the Mozambique Belt where, approximately 585 million years ago, the closure of the Mozambique Ocean drove two continental plates into a collision that would produce temperatures exceeding 600°C and pressures of eight to twelve kilobars at depths of twenty to thirty kilometres. In the dilatant zones of isoclinal fold hinges, where deformation created cavities in dolomitic marble, vanadium-bearing hydrothermal fluids precipitated a calcium aluminium hydroxyl sorosilicate — Ca₂Al₃(SiO₄)(Si₂O₇)O(OH) — in which trace quantities of V³⁺ ions substituted for aluminium at the M1,2 octahedral sites of the orthorhombic crystal lattice. That substitution, a crystallographic accident requiring vanishingly specific geochemical conditions, produced the only gemstone on Earth that exhibits strong trichroism across three optical axes: blue, violet, and burgundy. The mineral is zoisite. The gem trade calls it tanzanite. Emmanuel Mollel, who is nineteen, calls it the reason he does not sleep.</p>

        <p>The Mozambique Belt extends from East Antarctica through Mozambique, Tanzania, and Kenya to the Arabian-Nubian Shield — the world's largest Neoproterozoic orogenic complex, assembled during the Pan-African orogeny between roughly 850 and 550 million years ago. The belt formed as a suture zone when the Mozambique Ocean closed, and its structural legacy in the Lelatema Mountains includes superimposed folding, cross-folding, isoclinal folds, boudinage, and shear zones that geologist Elly Malisa of the University of Dar es Salaam documented in his 1987 doctoral thesis and subsequent publications. Malisa's 2004 paper in the Tanzania Journal of Science traced the vanadium enrichment to metasedimentary host rocks in which V, Ni, and Sr concentrations were redistributed by hydrothermal fluids during metamorphism — a finding that, combined with the structural work of Reyno Scheepers and Barry Olivier at TanzaniteOne's Block C, established the formation model that remains standard: tanzanite crystallised from V-bearing fluids that migrated along the Lelatema fault into dilational cavities at isoclinal fold hinges within a specific stratigraphic horizon of dolomitic marble interlayered with graphitic gneiss and calc-silicate rocks.</p>

        <p>What makes this formation so improbable is not any single factor but the convergence of all of them. The host rock provided calcium, aluminium, and silicon. The vanadium came from enriched metasediments. The tectonic deformation created the structural traps. The metamorphic peak provided the energy budget. Remove any one element and you get ordinary zoisite — a semi-precious mineral found on every continent, worth a few dollars per carat. Add them all, in the right proportions, in the right geometry, at the right moment in a 300-million-year orogenic cycle, and you get tanzanite. It happened once. It happened in one place. Geologists have searched for analogous deposits in Kenya, Madagascar, and Pakistan. None has yielded gem-quality blue zoisite. The Tanzanite Foundation states the probability of finding another deposit at less than one in a million — a figure that, while not peer-reviewed, reflects the consensus among economic geologists who have studied the Merelani system.</p>

        <Fig caption={<><strong>Inside the lattice.</strong> The orthorhombic unit cell of zoisite (space group Pnma), showing M1,2 and M3 octahedral sites where V³⁺ substitutes for Al³⁺. Structural refinement by Bačík et al. (2023) found M1,2 slightly overbonded (BVS = 3.03 vu). The sorosilicate Si₂O₇ groups — paired tetrahedra linked by a bridging oxygen — distinguish zoisite from nesosilicates. Small V content (typically &lt;0.5 wt% V₂O₃) limits precise V-site determination even with SHELXL refinement and LA-ICP-MS.</>}><CrystalSVG/></Fig>

        <SB title="SB 1: The Chromophore Mechanism">
          <p style={{fontSize:"14.5px",lineHeight:1.62,marginBottom:".7em"}}>Tanzanite's colour arises from ligand-field splitting in which V³⁺ ions (d² electron configuration) occupy the distorted octahedral coordination environment of the M1,2 sites in the zoisite structure. Peter Bačík and colleagues at Comenius University, Bratislava, published a structural refinement in Mineralogical Magazine (2023) combining electron microprobe analysis, laser ablation inductively coupled plasma mass spectrometry (LA-ICP-MS), and SHELXL crystal structure refinement to locate the vanadium. Their results showed the M1,2 octahedron has an average bond length below 1.90 Å and is slightly overbonded (bond-valence sum 3.03 valence units), while the more distorted M3 site has longer bonds (~1.96 Å) and is slightly underbonded (BVS = 2.78 vu).</p>
          <p style={{fontSize:"14.5px",lineHeight:1.62,marginBottom:".7em"}}>The crystal field produces absorption bands centred near 350 nm (V³⁺) and 380 nm (V⁴⁺), as documented by Karl Schmetzer in his 1982 systematic study of V³⁺-bearing natural oxides and silicates. In the unheated state, the trichroic colours — blue along the a-axis, violet along the b-axis, and burgundy along the c-axis — result from anisotropic absorption along each crystallographic direction. Heat treatment at 500–600°C drives a valence exchange: V³⁺ oxidises to V⁴⁺, suppressing the 350 nm band and rendering Ti⁴⁺-related absorption colourless. The brown/burgundy component vanishes; what remains is a stable dichroic stone showing only blue and violet. The process mimics the natural heating that some surface crystals experienced when Maasai grassfires swept the Merelani hillsides — the geological basis for the Maasai folktale that tanzanite was born from lightning.</p>
          <p style={{fontSize:"14.5px",lineHeight:1.62,marginBottom:0}}>A point of scientific uncertainty: the relative contributions of V³⁺→V⁴⁺ oxidation versus Ti⁴⁺ charge-transfer suppression to the colour change remain incompletely resolved. The Gemology Project notes that the colour "largely depends on the ratio of Vanadium and Titanium within its crystal structure," suggesting the mechanism may be more complex than a simple single-chromophore model.</p>
        </SB>

        <Flr/>

        {/* ——— ACT II: STAKES — The Discovery ——— */}

        <p>The story of who discovered tanzanite is itself a study in contested knowledge — three claims, three communities, three relationships to the same seven-kilometre strip of earth. The account officially recognised by the Tanzanian government credits Jumanne Mhero Ngoma, a Meru herdsman from Same District in the Kilimanjaro Region, who found blue crystals in the Merelani foothills in January 1967. President Julius Nyerere awarded Ngoma a certificate of recognition and 50,000 Tanzanian shillings. In 1984, the Tanzania Commission for Science and Technology issued him a certificate for scientific discovery. A second account, long promoted by TanzaniteOne, credits Ali Juu Ya Watu, a Maasai tribesman — though, as the Anadolu Agency reported in 2017, no evidence at the National Museum of Tanzania links his family to the find. A third claimant, Manuel de Souza, a Goan tailor and part-time gold prospector living in Arusha, registered the first mining claims in July 1967 after finding fragments he successively misidentified as olivine, then dumortierite, before sending samples to John Saul, a Nairobi-based consulting geologist, who forwarded them to his father Hyman Saul at Saks Fifth Avenue in New York, who carried them across the street to the Gemological Institute of America. The GIA correctly identified blue zoisite. So did Harvard, the British Museum, and Heidelberg University — but the first correct identification came from Ian McCloud, a Tanzanian government geologist based in Dodoma, whose name rarely appears in Western accounts of the discovery.</p>

        <div className="pq">"Mr. Ngoma is a veritable Tanzanian hero. But what did he get after discovering tanzanite about fifty years ago? Nothing. Nothing at all. In fact, it is people from other countries who have benefited more from this unique gemstone."<br/><span style={{fontSize:"13px",fontWeight:400,fontStyle:"normal",color:C.cap}}>— President John Magufuli, awarding Ngoma 100 million shillings ($44,000), April 2018</span></div>

        <p>Henry B. Platt, vice president of Tiffany & Co. and great-grandson of Louis Comfort Tiffany, saw the mineral and recognised not its crystallography but its marketing problem: the scientific name, blue zoisite, sounded uncomfortably like "blue suicide." Platt renamed it tanzanite and launched a campaign declaring the stone available "in Tanzania and at Tiffany's" — an act of commodity branding that collapsed an entire country into a luxury retail experience. The rebranding worked. In 2002, the American Gem Trade Association named tanzanite a December birthstone, the first addition to the list since 1912 — a designation lobbied for by the industry to guarantee a permanent demand floor. Meanwhile Jumanne Ngoma, partially paralysed and in declining health, lived in a mud-walled house with a corrugated iron roof near Mererani. His daughter Asha sent a text message to President Magufuli in 2018. Magufuli responded publicly with 100 million shillings — approximately $44,000, roughly twice the average Tanzanian annual salary. Ngoma died in January 2019. Obituaries in Dar es Salaam called him a national hero.</p>

        <Fig caption={<><strong>The colour chemistry.</strong> Schematic absorption spectra before and after heat treatment. Heating drives V³⁺→V⁴⁺ oxidation, suppressing the ~350 nm band and rendering Ti⁴⁺ colourless. The brown component vanishes; blue and violet dominate. Nearly all commercial tanzanite is heat-treated — a process so universal it requires no disclosure. After Schmetzer (1982); Bačík et al. (2023).</>}><SpecSVG/></Fig>

        <SB title="SB 2: The Geology of Scarcity">
          <p style={{fontSize:"14.5px",lineHeight:1.62,marginBottom:".7em"}}>Tanzanite deposits are confined to isoclinal fold hinges within a specific stratigraphic horizon in the Lelatema Mountains. The host sequence — graphitic and gypsum-bearing gneiss interlayered with dolomitic marble and calc-silicate rocks — was folded and sheared during Pan-African metamorphism between approximately 800 and 450 Ma, with the tanzanite-forming event dated to roughly 585 Ma during the mid-Ediacaran Period. The mineralised zone sits within a strip approximately 7 km long and 2 km wide, trending NE–SW along the Lelatema fault system.</p>
          <p style={{fontSize:"14.5px",lineHeight:1.62,marginBottom:".7em"}}>The fold geometry limits the deposit laterally; the increasing depth of unexploited pockets limits it vertically. The 2018 National Bureau of Statistics of Tanzania report estimated total reserves at 109 million carats (21,800 kg). Block C alone accounts for approximately 87.1 million carats, with a Life of Mine expected to extend into the 2040s based on current extraction rates. Blocks B and D, worked by artisanal miners with hand tools, have no independently verified reserve estimates — a significant gap in the geological record.</p>
          <p style={{fontSize:"14.5px",lineHeight:1.62,marginBottom:0}}>The USGS Minerals Yearbook (2019) confirmed that mining at Block C was expected to continue until 2042 under the TanzaniteOne/STAMICO joint venture. No other occurrence of gem-quality vanadium-bearing blue zoisite has been confirmed anywhere on Earth despite exploration in analogous metamorphic terranes. The deposit is, in the strictest geological sense, unique — and non-renewable.</p>
        </SB>

        <Flr/>

        {/* ——— ACT III: COMPLICATION — The Mine ——— */}

        <p>The practical consequence of tanzanite's crystallography is a stone that changes colour depending on how you hold it — rotate an unheated crystal 90° around its c-axis and watch blue shift to violet, then to burgundy. The practical consequence of its geology is that extracting it requires young men to descend four hundred metres on wooden ladders into graphite-dusted shafts with no elevators, no safety harnesses, and no escape routes. In 1990, the Tanzanian government divided the Merelani deposit into four blocks. Blocks A and C went to large operators — TanzaniteOne (Richland Resources) operates Block C, the only mechanised mine, under a licence that cost US$40 million in 2005 and now requires fifty per cent STAMICO ownership following a 2010 law. Its three shafts reach 300 metres. When flash floods struck in 2008, Block C lost no lives. Blocks B and D went to artisanal miners: more than 350 pits, wooden ladders, small compressors feeding air through long hoses. In Block B, the shafts are interlinked by lateral tunnels. Water entering one open pit floods everyone through the connections.</p>

        <p>On 28 March 2008, Zane Swanepoel, then managing director of TanzaniteOne, measured 155 millimetres of rain in ninety minutes. His Block C operation, with covered shafts and pumping equipment, sustained minor flooding and no casualties. In Block B, the water turned the interlinked artisanal tunnels into a drowning machine. Fifty-seven miners died. Seventeen were never found. It was not the first time. In 2002, forty-two miners had died when a fresh air pump failed at 125 metres in a single shaft — thirty-two registered workers plus ten who perished in the rescue attempt. In 2021, two nineteen-year-olds — Geoffrey William and Emmanuel Solomon, both from Arusha — suffocated at 1 a.m. in a Block D pit after a compressor failed. Research published by Malisa and Kinabo in the Tanzania Journal of Science documents chronic exposure to graphite, quartz, and mica dust in unventilated shafts at depths exceeding 100 metres — conditions associated with chronic silicosis and lung cancer. The compressor hose is the lifeline. When it stops, the miners have minutes.</p>

        <Fig caption={<><strong>Where the blue lives.</strong> NW–SE cross-section through the Merelani deposit. Tanzanite crystallised in isoclinal fold hinges within dolomitic marble from hydrothermal fluids migrating along the Lelatema fault. Artisanal shafts in Blocks B and D descend 400+ m through this stratigraphy with no elevators. After Olivier (2006); Malisa (1987); Davies &amp; Chase (1994).</>}><GeoSVG/></Fig>

        <SB title="SB 3: The Human Cost — A Mortality Record">
          <p style={{fontSize:"14.5px",lineHeight:1.62,marginBottom:".7em"}}>No comprehensive mortality database exists for the Merelani tanzanite mines. The following is compiled from journalistic sources, the Tanzania Journal of Science, and JCK (Jewelers' Circular Keystone) industry reporting:</p>
          <p style={{fontSize:"14.5px",lineHeight:1.62,marginBottom:".7em"}}>In 1998, over 100 miners were killed in flash flooding (JCK, 2008). In July 2002, 42 miners died after an air pump failed at 125 m depth in Block D (JCK, 2002; BBC). In March 2008, 57 miners drowned and 17 went missing when 155 mm of rain in 90 minutes flooded Block B's interlinked shafts (JCK, 2008; TanzaniteOne confirmation). Between April and September 2021, at least a dozen miners died in separate incidents in Block D, including five in a single pit collapse in July and two suffocations in November (The Citizen, Tanzania, 2021).</p>
          <p style={{fontSize:"14.5px",lineHeight:1.62,marginBottom:0}}>Occupational health research (Malisa & Kinabo, Tanzania Journal of Science, Vol. 31, 2005) documents that artisanal miners at depths exceeding 100 m work in narrow shafts within soft, fractured, graphitic gneiss, breathing through compressor hoses that "sometimes fail or are deliberately switched off." Exposure to dust mixed with graphite, quartz, and micas is hazardous, and the study recommends proper ventilation and adherence to the Ministry of Energy and Minerals code of practice — recommendations that remain largely unimplemented in Blocks B and D.</p>
        </SB>

        <Flr/>

        {/* ——— ACT IV: DEEPENING — The Nation ——— */}

        <p>In June 2020, the scarcity economics of tanzanite materialised in the calloused hands of Saniniu Laizer, a fifty-two-year-old Maasai rancher from Naisinyai village in the Kilimanjaro foothills — a man with four wives, thirty-two children, and a mining company employing more than two hundred diggers in Block D. His team struck a pocket. The first stone weighed 9.27 kilograms — roughly 46,350 carats. One of his workers, a miner named Lasimi, was there when it emerged. Lasimi later told the Mail & Guardian: "Hurry, come and take a look." The second stone weighed 5.1 kg. Together they were the largest tanzanite specimens ever found, by a factor of nearly three, breaking the 2005 record of a 16,839-carat stone called "The Mawenzi." Three weeks later, Laizer's company found a third stone: 6.3 kg. Laizer sold all three to the government for a combined $5.35 million — a price that Eddie LeVian, CEO of Le Vian jewellers, publicly estimated at one-twentieth of the potential retail value. Magufuli ordered the stones placed in the national museum. They remain there: geological specimens that took 585 million years to form, valued by the market at perhaps $60 million retail, held by a government as symbols of sovereignty.</p>

        <p>Magufuli's resource nationalism had teeth. In 2018, the government constructed a 24-kilometre perimeter wall around the entire mining area, manned by the army at a single checkpoint. The purpose was to stop smuggling — Tanzania had lost an estimated $81 billion worth of gemstones between 1998 and 2017, according to the Ministry of Minerals. The effect was immediate and quantifiable: documented production rose from 147.7 kg of rough in 2018 to a record 781.2 kg in 2019 — a fivefold increase that suggested the pre-wall economy was overwhelmingly informal. The government also restructured taxation from a labyrinth of levies totalling over thirty per cent to a flat seven per cent royalty, creating an incentive for miners to sell through official channels. Matthew Salomon, senior economist at the Institute of Taxation and Economic Policy, told Mining Technology the new structure was "well designed to curb smuggling." Laizer, who sold his record-breaking stones through the government hub, was the policy's poster child — proof that the reforms worked.</p>

        <Fig caption={<><strong>The collision that made colour possible.</strong> Left: Merelani's position within the Mozambique Belt, the suture zone formed as East and West Gondwana collided. Right: formation sequence from Mozambique Ocean opening (~800 Ma) through continental collision, tanzanite crystallisation at ~585 Ma, and discovery in 1967.</>}><TectonicSVG/></Fig>

        <SB title="SB 4: Resource Nationalism — The Wall and the Hub">
          <p style={{fontSize:"14.5px",lineHeight:1.62,marginBottom:".7em"}}>Tanzania's approach to tanzanite under Presidents Magufuli (2015–2021) and Samia Suluhu Hassan (2021–present) combines infrastructure investment, export restrictions, and mandatory state equity. Key policy instruments include: the 2018 construction of a 24 km perimeter wall with army checkpoint, reducing smuggling and increasing documented production from 148 kg to 781 kg in one year; the 2010 ban on raw stone exports over one gram, forcing domestic value addition; the 2010 law requiring 50% STAMICO ownership in large-scale operations; the 2017 mining legislation mandating at least 16% government ownership in all mining projects; and the reduction of taxation to a flat 7% royalty.</p>
          <p style={{fontSize:"14.5px",lineHeight:1.62,marginBottom:0}}>The vision is to transform Tanzania from raw-material exporter to gemstone processing hub — cutting and polishing domestically rather than shipping to Jaipur. The policy has succeeded in formalising production and capturing state revenue, but the artisanal sector in Blocks B and D remains largely outside the formal safety and environmental regulatory framework. The $81 billion smuggling-loss figure cited by the Ministry of Minerals has not been independently audited.</p>
        </SB>

        <Fig caption={<><strong>Reserves and the clock.</strong> Left: annual rough production in kg, showing the dramatic impact of the 2018 perimeter wall. Right: reserve breakdown from the 2018 NBS Tanzania report — 109 million carats total, with Block C (87.1M ct) expected to sustain mining until the 2040s. As high-grade zones exhaust, ore-grade decline pushes extraction costs upward.</>}><ReservesSVG/></Fig>

        <SB title="SB 5: What Remains — The Depletion Arithmetic">
          <p style={{fontSize:"14.5px",lineHeight:1.62,marginBottom:".7em"}}>The 2018 National Bureau of Statistics report estimated total tanzanite reserves at 109 million carats (21,800 kg). Block C, the only mechanised operation, holds approximately 87.1 million carats with a Life of Mine projected to the 2040s. Blocks B and D have no independent reserve estimate — a critical data gap. At the 2019 record extraction rate of 781 kg per year (across all blocks), the total reserve of 21,800 kg implies a theoretical lifespan of roughly 28 years, consistent with the widely cited "20–30 year" estimate. However, this calculation does not account for ore-grade decline — the progressive exhaustion of high-grade zones forcing miners into lower-grade pockets that require more rock processing per carat.</p>
          <p style={{fontSize:"14.5px",lineHeight:1.62,marginBottom:0}}>The fundamental constraint is geometric: tanzanite occurs in fold hinges within a specific stratigraphic horizon. The fold geometry limits the deposit laterally; depth limits it vertically. No other gem-quality vanadium-bearing blue zoisite occurrence has been confirmed anywhere on Earth. The deposit is, in the strictest geological and economic sense, both unique and terminal. The question is not whether Merelani will be exhausted but what happens to the estimated 70,000 people whose livelihoods depend on it when it is.</p>
        </SB>

        <Flr/>

        {/* ——— ACT V: RESOLUTION / COSMIC KICKER ——— */}

        <p>The metaphor that crystallographers and miners share, without knowing it, is one of pressure. In the lattice, it is crystal-field splitting — the electrostatic environment of the M1,2 octahedra forcing d-electrons into configurations that absorb specific wavelengths, creating colour from structure. In the shafts, it is economic pressure — the lottery logic of artisanal mining that sends nineteen-year-olds down wooden ladders into graphite dust, breathing through a hose attached to a compressor that may or may not keep running. Both systems operate at the edge of stability. Both produce something extraordinary from conditions that are, by any normal standard, extreme. And both are finite in ways that matter differently: the crystal lattice will outlast the wearer; the deposit will not outlast the generation mining it.</p>

        <p>On the surface, the Merelani Hills look unremarkable — dry scrubland stippled with wooden shacks, dusty tracks, whirlwinds spiralling lazily across a plain. A sign along the unpaved road reads, "This road has been proudly built, sponsored and maintained by the Tanzanite Foundation." Mount Kilimanjaro hangs above the haze to the northeast, its glaciated dome catching light at an altitude of 5,895 metres — visible from every shaft mouth, from every sorting table, from every corrugated shack where miners sleep three to a room before descending at 5 a.m. The mines themselves are invisible from above: vertical shafts, many no wider than a manhole cover, dropping into darkness. What emerges — when anything emerges — is a reddish-brown crystal that looks, to an untrained eye, like dirty quartz. Only after heating to 500°C does the brown veil lift, the way a Polaroid develops: colour rising from nothing, an entire spectrum assembling itself from an instruction set written 585 million years ago in a language of vanadium, pressure, and tectonic convergence.</p>

        <p>Somewhere in the space between those two timescales — the 585 million years it took to create the chromophore and the twenty to thirty years it may take to exhaust the source — lies the full human story of tanzanite. A stone born from metamorphic fire, named by a marketing executive who found the scientific name unsaleable, dug by hand from the earth by people whose names do not appear on the certificates of authenticity, sold for a twentieth of its retail value by a Maasai rancher who used the proceeds to build a school, carried across oceans in FedEx packages and diplomatic pouches, cut in Jaipur or increasingly in Arusha, and finally set into a ring that catches the light at an angle that makes it blue, then violet, then blue again — the crystal remembering, in the anisotropic splitting of its three optical axes, the three directions of the force that made it.</p>

      </div>

      {/* ═══ SOURCE INTEGRITY NOTE ═══ */}
      <div className="sn">
        <h3>Source Integrity Note</h3>
        <div className="ss"><div className="st">Claims Requiring Expert Verification</div>
          <ul>
            <li>"1,000× rarer than diamond by known reserves" — trade-source figure, not peer-reviewed; requires independent geological audit</li>
            <li>$81B smuggling loss (1998–2017) per Ministry of Minerals — methodology unaudited</li>
            <li>109M carat reserve estimate (2018 NBS) — the only published figure; no independent validation for Blocks B/D</li>
            <li>V³⁺→V⁴⁺ as sole colour-change driver — Ti⁴⁺ charge-transfer contribution debated (Gemology Project; Bačík et al.)</li>
            <li>Tanzanite Foundation's "less than one in a million" probability of a second deposit — not peer-reviewed</li>
          </ul>
        </div>
        <div className="ss"><div className="st">Principal Data Sources</div>
          <ul>
            <li>Bačík, P. et al. (2023). Mineralogical Magazine — V position in zoisite crystal structure</li>
            <li>Harris, C. et al. (2014). Origin of tanzanite mineralization at Merelani</li>
            <li>Malisa, E.P. (1987). PhD thesis, Univ. Helsinki — Geology of Lelatema tanzanite deposits</li>
            <li>Malisa, E.P. (2004). Tanzania J. Sci. 29:45–60 — Trace element characterisation</li>
            <li>Malisa, E.P. & Kinabo, C. (2005). Tanzania J. Sci. 31:1–12 — Environmental risks at Merelani</li>
            <li>Schmetzer, K. (1982). Neues Jahrb. Mineral. Abh. 144:73–106 — V³⁺ absorption spectroscopy</li>
            <li>Wilson, Saul, Pardieu, Hughes (2009). Min. Record 40(5):346–408 — Merelani locality</li>
            <li>Fritz et al. (2013). J. African Earth Sci. — East African Orogen styles</li>
            <li>Olivier, B. (2006). Geological context of Merelani (industry literature)</li>
            <li>USGS Minerals Yearbook 2019 — Tanzania chapter, Block C LOM to 2042</li>
            <li>National Bureau of Statistics Tanzania (2018) — Reserve estimate 109M ct</li>
            <li>Wikipedia: Tanzanite (accessed April 2026) — production, legislation, discovery</li>
            <li>JCK (2002, 2008) — Mine disaster reporting</li>
            <li>CNN, Fortune, Mail & Guardian, AFP (2020) — Saniniu Laizer coverage</li>
            <li>Anadolu Agency (2017) — Jumanne Ngoma poverty profile</li>
          </ul>
        </div>
        <div className="ss"><div className="st">Fieldwork & Photography Requiring Access</div>
          <ul>
            <li>Block D artisanal shafts — local claim-holder and Manyara regional authority coordination</li>
            <li>TanzaniteOne/STAMICO Block C — managing director approval; historically restricted</li>
            <li>Naisinyai village (Laizer compound) — Maasai cultural protocols and community consent</li>
            <li>University of Dar es Salaam geology department — Malisa's successor researchers</li>
            <li>Arusha mineral trading hub — public access; photography may be restricted</li>
          </ul>
        </div>
        <div className="ss"><div className="st">Scientifically Contested Claims</div>
          <ul>
            <li>Discovery: Government credits Ngoma (1967); TanzaniteOne credited Juu Ya Watu; de Souza registered first claims. All three presented.</li>
            <li>V-site in zoisite: Bačík et al. (2023) note small V content limits precise determination</li>
            <li>Heat-treatment mechanism: V³⁺→V⁴⁺ model (Schmetzer 1982) dominant but Ti⁴⁺ role debated</li>
            <li>Reserve depletion: "20–30 years" is a range, not a single estimate; Block B/D data absent</li>
          </ul>
        </div>
        <div className="ss"><div className="st">Voices to Add in Full Editorial Process</div>
          <ul>
            <li>Artisanal miners in Blocks B/D — first-person working conditions at 400 m</li>
            <li>Tanzanian geologists (Univ. of Dar es Salaam) — independent reserve and formation assessments</li>
            <li>Maasai community leaders — pastoral livelihood impacts, oral histories</li>
            <li>Women in the tanzanite economy — sorting, trading, community support roles</li>
            <li>Cutters in Arusha's nascent processing facilities — value-addition policy progress</li>
            <li>Peter Bačík (Comenius University) — ongoing structural refinement</li>
            <li>Saniniu Laizer and family — perspective on sale price vs. retail value gap</li>
          </ul>
        </div>
      </div>

      {/* ═══ FOOTER ═══ */}
      <div className="ft">
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:"13px",fontWeight:700,color:C.gold,letterSpacing:"3px",textTransform:"uppercase"}}>National Geographic</div>
        <div style={{fontSize:"10px",color:C.creamD,opacity:.5,marginTop:"6px"}}>Scientific American Hybrid · Full Feature · Mineralogy · Economic Geology · East Africa</div>
      </div>
    </div>
  </>);
}
