import { useState, useEffect } from "react";

/*
MODE: Scientific American Hybrid | FORMAT: Standard Feature
TOPIC: Fort St Elmo's Cavalier — materials science of globigerina limestone,
       military engineering geometry, siege ballistics, and conservation science
*/

const C={
  honey:"#c9a050",honeyL:"#f0dba0",stone:"#f0eadc",stoneD:"#ddd4c2",
  deep:"#12100a",mid:"#2a2018",warm:"#4a3828",
  text:"#1a1812",textL:"#4a4538",cap:"#7a7260",
  blood:"#9b2020",sea:"#15355a",fort:"#8b7a50"
};

function HeroSVG(){
  return(
    <svg viewBox="0 0 1400 560" style={{width:"100%",display:"block"}}>
      <defs>
        <linearGradient id="es" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1a2545"/><stop offset="55%" stopColor="#3a4565"/><stop offset="80%" stopColor="#c08848"/><stop offset="100%" stopColor="#e0a050"/></linearGradient>
        <linearGradient id="ew" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#15355a"/><stop offset="100%" stopColor="#0a1a30"/></linearGradient>
      </defs>
      <rect width="1400" height="560" fill="url(#es)"/>
      <circle cx="1080" cy="200" r="42" fill="#e0a050" opacity=".45"/>
      <rect x="0" y="360" width="1400" height="200" fill="url(#ew)"/>
      <g transform="translate(500,305)">
        <path d="M-200,55 L-200,15 L-150,-5 L-80,-15 L0,-25 L80,-15 L150,-5 L200,15 L200,55" fill="#5a4a30" stroke="#3a2a18" strokeWidth="1.5"/>
        <rect x="-40" y="-58" width="80" height="33" fill="#6a5a38" stroke="#4a3a20" strokeWidth="1.5"/>
        <path d="M-40,-58 L-35,-66 L-25,-66 L-25,-58 L-15,-58 L-15,-66 L-5,-66 L-5,-58 L5,-58 L5,-66 L15,-66 L15,-58 L25,-58 L25,-66 L35,-66 L40,-58" fill="#6a5a38" stroke="#4a3a20" strokeWidth="1"/>
        {[-30,-10,10,30].map((x,i)=>(<rect key={i} x={x-3} y={-53} width="6" height="8" fill="#1a1008" rx="1"/>))}
        <polygon points="-200,15 -218,-5 -178,-25 -150,-5" fill="#4a3a22" stroke="#3a2a18" strokeWidth="1"/>
        <polygon points="200,15 218,-5 178,-25 150,-5" fill="#4a3a22" stroke="#3a2a18" strokeWidth="1"/>
        <polygon points="-60,65 0,45 60,65" fill="#3a2a18" opacity=".6" stroke="#2a1a10" strokeWidth="1"/>
        <line x1="0" y1="-66" x2="0" y2="-88" stroke="#4a3a20" strokeWidth="1.5"/>
        <path d="M0,-88 L18,-83 L0,-78" fill="#cc2020"/>
      </g>
      <path d="M0,325 L200,318 L280,320 L280,360 L0,360Z" fill="#3a2a18" opacity=".4"/>
      <path d="M720,320 L1000,312 L1400,325 L1400,360 L720,360Z" fill="#3a2a18" opacity=".4"/>
    </svg>
  );
}

function LimestoneSVG(){
  return(
    <svg viewBox="0 0 860 440" style={{width:"100%",display:"block",background:C.stone}}>
      <text x="430" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontWeight="600" fontFamily="'Cormorant Garamond',serif" letterSpacing="2">GLOBIGERINA LIMESTONE — MATERIALS SCIENCE</text>
      <text x="430" y="40" textAnchor="middle" fill={C.cap} fontSize="10" fontFamily="'Cormorant Garamond',serif">IUGS Global Heritage Stone Resource (2019) · Aquitanian–Langhian, 23–14 Ma · Bioclastic packstone</text>
      {/* Left: petrographic section schematic */}
      <g transform="translate(60,70)">
        <text x="130" y="0" textAnchor="middle" fill={C.text} fontSize="11" fontWeight="600" fontFamily="'Cormorant Garamond',serif">Thin-section schematic</text>
        <rect x="0" y="15" width="260" height="200" rx="4" fill="#e8dcc8" stroke={C.fort} strokeWidth="1.5"/>
        {/* Foraminiferal tests */}
        {Array.from({length:18}).map((_,i)=>{
          const x=20+Math.random()*220, y=30+Math.random()*170, r=5+Math.random()*8;
          return (<circle key={i} cx={x} cy={y} r={r} fill="none" stroke={C.honey} strokeWidth="1" opacity=".5"/>);
        })}
        {/* Micrite matrix */}
        {Array.from({length:40}).map((_,i)=>{
          const x=15+Math.random()*230, y=25+Math.random()*180;
          return (<circle key={`m${i}`} cx={x} cy={y} r={0.8} fill={C.warm} opacity=".3"/>);
        })}
        {/* Porosity */}
        {Array.from({length:8}).map((_,i)=>{
          const x=25+Math.random()*210, y=35+Math.random()*160;
          return (<circle key={`p${i}`} cx={x} cy={y} r={3+Math.random()*4} fill={C.sea} opacity=".1"/>);
        })}
        <text x="130" y="235" textAnchor="middle" fill={C.cap} fontSize="8" fontFamily="'Cormorant Garamond',serif">Globigerinid tests (circles) in micrite matrix</text>
        <text x="130" y="248" textAnchor="middle" fill={C.cap} fontSize="8" fontFamily="'Cormorant Garamond',serif">Blue = intergranular porosity (24–41%)</text>
      </g>
      {/* Right: properties table */}
      <g transform="translate(400,70)">
        <text x="0" y="0" fill={C.text} fontSize="11" fontWeight="600" fontFamily="'Cormorant Garamond',serif">Geotechnical properties</text>
        {[
          "Composition: >92% calcite + minor clay",
          "Age: Aquitanian–Langhian (23–14 Ma)",
          "Thickness: 20–207 m across archipelago",
          "Porosity: 24–41% (Cassar et al. 2017)",
          "Classification: bioclastic packstone/wackestone",
          "Maltese name: Franka (building grade)",
          "",
          "Weathering rates (Roussel et al. 2021):",
          "  Franka: 1.4 mm/century (median recession)",
          "  Soll: 50 mm/century (36× faster)",
          "",
          "Mechanical behaviour:",
          "  Soft when freshly quarried (hand-tool shapeable)",
          "  Hardens via desiccation + CaCO₃ recrystallisation",
          "  Protective patina forms on air exposure",
          "",
          "Ballistic note:",
          "  High porosity absorbs kinetic energy",
          "  Reduces fragmentation vs. harder stone",
          "  Exception: oblique impacts produce shrapnel",
          "  (cf. Dragut, 18 June 1565)"
        ].map((t,i)=>(<text key={i} x="0" y={18+i*14.5} fill={t.startsWith(" ")?C.textL:t===""?"transparent":t.includes(":")?C.text:C.textL} fontSize={t.startsWith("Weathering")||t.startsWith("Mechanical")||t.startsWith("Ballistic")?"9.5":"9"} fontWeight={t.includes(":")||t.startsWith("  ")?"400":"400"} fontFamily="'JetBrains Mono',monospace">{t}</text>))}
      </g>
      <text x="430" y="428" textAnchor="middle" fill={C.cap} fontSize="9" fontStyle="italic" fontFamily="'Cormorant Garamond',serif">After Cassar et al. (2017) Episodes 40(3):221–231; Roussel et al. (2021) Geomorphology; Gatt (2006); IUGS designation 2019</text>
    </svg>
  );
}

function GeometrySVG(){
  return(
    <svg viewBox="0 0 860 380" style={{width:"100%",display:"block",background:C.stone}}>
      <text x="430" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontWeight="600" fontFamily="'Cormorant Garamond',serif" letterSpacing="2">CAVALIER FIRE GEOMETRY — ELEVATION AS FORCE MULTIPLIER</text>
      <g transform="translate(80,55)">
        {/* Ground plane */}
        <line x1="0" y1="250" x2="700" y2="250" stroke={C.textL} strokeWidth="1.5"/>
        <text x="710" y="254" fill={C.textL} fontSize="8" fontFamily="monospace">Sea level</text>
        {/* Main fort wall */}
        <rect x="100" y="140" width="200" height="110" fill={C.fort} opacity=".15" stroke={C.fort} strokeWidth="2"/>
        <text x="200" y="200" textAnchor="middle" fill={C.fort} fontSize="9" fontFamily="'Cormorant Garamond',serif">Main fort wall</text>
        <text x="200" y="215" textAnchor="middle" fill={C.cap} fontSize="8" fontFamily="monospace">h₁ ≈ 10m</text>
        {/* Cavalier on top */}
        <rect x="150" y="70" width="100" height="70" fill={C.blood} opacity=".15" stroke={C.blood} strokeWidth="2.5"/>
        <text x="200" y="105" textAnchor="middle" fill={C.blood} fontSize="10" fontWeight="600" fontFamily="'Cormorant Garamond',serif">CAVALIER</text>
        <text x="200" y="120" textAnchor="middle" fill={C.blood} fontSize="8" fontFamily="monospace">h₂ ≈ +8–10m</text>
        {/* Total height annotation */}
        <line x1="80" y1="70" x2="80" y2="250" stroke={C.textL} strokeWidth=".8" strokeDasharray="3,2"/>
        <text x="70" y="160" fill={C.textL} fontSize="8" fontFamily="monospace" textAnchor="end" transform="rotate(-90,70,160)">Total: ~20m</text>
        {/* Fire lines */}
        <line x1="200" y1="75" x2="550" y2="150" stroke={C.blood} strokeWidth="1.5" strokeDasharray="6,3" opacity=".5"/>
        <line x1="200" y1="75" x2="650" y2="200" stroke={C.blood} strokeWidth="1" strokeDasharray="4,2" opacity=".3"/>
        <text x="500" y="140" fill={C.blood} fontSize="9" fontWeight="600" fontFamily="monospace">Plunging fire arc</text>
        <text x="500" y="154" fill={C.cap} fontSize="8" fontFamily="'Cormorant Garamond',serif">Clears main parapet → dead ground eliminated</text>
        {/* Main wall fire line for comparison */}
        <line x1="300" y1="145" x2="550" y2="200" stroke={C.fort} strokeWidth="1" strokeDasharray="4,2" opacity=".3"/>
        <text x="460" y="210" fill={C.fort} fontSize="8" fontFamily="monospace">Main wall fire line</text>
        {/* Attacker at base */}
        <g transform="translate(580,235)">
          <ellipse cx="0" cy="0" rx="6" ry="12" fill={C.warm} opacity=".4"/>
          <circle cx="0" cy="-16" r="5" fill={C.warm} opacity=".4"/>
          <text x="15" y="0" fill={C.warm} fontSize="8" fontFamily="monospace">Attacker</text>
        </g>
        {/* Ottoman battery on high ground */}
        <g transform="translate(600,60)">
          <rect x="0" y="0" width="80" height="30" fill={C.sea} opacity=".15" stroke={C.sea} strokeWidth="1.5"/>
          <text x="40" y="18" textAnchor="middle" fill={C.sea} fontSize="8" fontWeight="600" fontFamily="monospace">MT SCIBERRAS</text>
          <text x="40" y="38" textAnchor="middle" fill={C.sea} fontSize="7" fontFamily="monospace">Ottoman battery</text>
          <text x="40" y="50" textAnchor="middle" fill={C.sea} fontSize="7" fontFamily="monospace">36+ guns · elevated</text>
          <line x1="40" y1="30" x2="200" y2="75" stroke={C.sea} strokeWidth="1.5" strokeDasharray="5,3" opacity=".4"/>
        </g>
      </g>
      <text x="430" y="365" textAnchor="middle" fill={C.cap} fontSize="9" fontStyle="italic" fontFamily="'Cormorant Garamond',serif">The cavalier's elevation advantage was partially offset by the Ottoman battery on Mount Sciberras, which fired downward into the fort — a geometric disadvantage that Laparelli's 1566 Valletta plan solved by building the city on the high ground itself.</text>
    </svg>
  );
}

function SiegeSVG(){
  const evts=[
    {d:"18 May",ev:"Ottoman fleet arrives",col:C.sea},
    {d:"24 May",ev:"Bombardment begins",col:C.blood},
    {d:"3 Jun",ev:"First assault repulsed",col:C.blood},
    {d:"10 Jun",ev:"Ravelin falls",col:C.warm},
    {d:"18 Jun",ev:"DRAGUT KILLED",col:C.blood},
    {d:"23 Jun",ev:"Fort falls · 1,500+ dead",col:C.deep},
    {d:"Jul–Aug",ev:"Birgu & Senglea siege",col:C.sea},
    {d:"8 Sep",ev:"Gran Soccorso relief",col:C.honey},
  ];
  const w=820,pad=55,sp=(w-pad*2)/(evts.length-1);
  return(
    <svg viewBox={`0 0 ${w} 190`} style={{width:"100%",display:"block",background:C.stone}}>
      <text x={w/2} y="18" textAnchor="middle" fill={C.text} fontSize="12" fontWeight="600" fontFamily="'Cormorant Garamond',serif" letterSpacing="2">GREAT SIEGE 1565 — FORT ST ELMO PHASE</text>
      <line x1={pad} y1={95} x2={w-pad} y2={95} stroke={C.honey} strokeWidth="2"/>
      {evts.map((e,i)=>{
        const x=pad+i*sp,above=i%2===0;
        return (<g key={i}>
          <circle cx={x} cy={95} r="4.5" fill={e.col}/>
          <line x1={x} y1={95} x2={x} y2={above?52:135} stroke={e.col} strokeWidth="1" opacity=".4"/>
          <text x={x} y={above?44:148} textAnchor="middle" fill={C.text} fontSize="8" fontWeight="700" fontFamily="monospace">{e.d}</text>
          <text x={x} y={(above?44:148)+12} textAnchor="middle" fill={C.textL} fontSize="7" fontFamily="'Cormorant Garamond',serif">{e.ev}</text>
        </g>);
      })}
      <text x={w/2} y="180" textAnchor="middle" fill={C.cap} fontSize="8" fontStyle="italic" fontFamily="'Cormorant Garamond',serif">Expected fall: 3 days. Actual: 28 days. Ottoman losses at St Elmo: ~8,000. "If the child cost us so dear, what will the parent cost?" — Mustafa Pasha</text>
    </svg>
  );
}

export default function App(){
  const [ok,setOk]=useState(false);
  useEffect(()=>{setTimeout(()=>setOk(true),80)},[]);

  const SB=()=><div style={{textAlign:"center",margin:"34px 0",color:C.honey,fontSize:"15px",letterSpacing:"10px"}}>❧</div>;
  const Fig=({children,caption})=>(<div style={{margin:"42px -22px"}}>{children}<div style={{fontSize:"12px",color:C.cap,lineHeight:1.55,padding:"10px 22px 0",fontStyle:"italic",borderTop:`1px solid ${C.stoneD}`}}>{caption}</div></div>);
  const Side=({title,children})=>(<div style={{background:C.stoneD,borderLeft:`3px solid ${C.honey}`,padding:"22px 26px",margin:"36px 0"}}><h4 style={{fontFamily:"'Playfair Display',serif",fontSize:"14px",fontWeight:700,color:C.mid,marginBottom:"10px",letterSpacing:"1px",textTransform:"uppercase"}}>{title}</h4>{children}</div>);
  const sp={fontSize:"14.5px",lineHeight:1.62,marginBottom:".7em"};

  return(<>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=JetBrains+Mono:wght@400;500&display=swap');
      *{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
      .ng{font-family:'Cormorant Garamond','Georgia',serif;color:${C.text};background:${C.stone};overflow-x:hidden}
      .ng p{font-size:18px;line-height:1.78;margin-bottom:1.35em}
      .lead::first-letter{font-family:'Playfair Display',serif;font-size:4.2em;float:left;line-height:.8;margin-right:.06em;margin-top:.05em;color:${C.blood}}
      .hw{position:relative}
      .ho{position:absolute;bottom:0;left:0;right:0;padding:40px 7% 28px;background:linear-gradient(transparent,rgba(10,8,5,.92))}
      .hl{font-family:'Playfair Display',serif;font-weight:900;font-size:clamp(24px,4.4vw,50px);color:#fff;line-height:1.06;letter-spacing:-.02em;margin-bottom:10px}
      .dk{font-family:'Cormorant Garamond',serif;font-size:clamp(13px,1.8vw,19px);color:${C.honeyL};font-style:italic;line-height:1.42;max-width:720px}
      .yb{width:56px;height:3.5px;background:${C.honey};margin-bottom:14px}
      .pw{max-width:710px;margin:0 auto;padding:46px 22px 20px}
      .pq{font-family:'Playfair Display',serif;font-size:clamp(18px,2.4vw,26px);font-weight:700;font-style:italic;color:${C.warm};border-left:3.5px solid ${C.honey};padding:16px 24px;margin:34px -16px;line-height:1.35}
      .sn{background:${C.deep};color:${C.honeyL};padding:36px 7%}
      .sn h3{font-family:'Playfair Display',serif;font-size:16px;color:${C.honey};margin-bottom:12px}
      .sn ul{list-style:none;padding:0}.sn li{padding:2px 0;font-size:11.5px;line-height:1.5;opacity:.8}.sn li::before{content:"— ";color:${C.honey}}
      .ss{margin-bottom:16px}.st{font-size:10px;text-transform:uppercase;letter-spacing:2px;color:${C.honey};margin-bottom:6px;font-weight:600}
      .ft{text-align:center;padding:24px;background:${C.deep};border-top:3px solid ${C.honey}}
    `}</style>
    <div className="ng" style={{opacity:ok?1:0,transition:"opacity .7s"}}>

      <div className="hw">
        <HeroSVG/>
        <div className="ho">
          <div className="yb"/>
          <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:"9px",color:C.honeyL,letterSpacing:"2px",marginBottom:"8px",textTransform:"uppercase"}}>Mode: Scientific American Hybrid | Format: Standard Feature</div>
          <h1 className="hl">The Gun Platform Above the Sea</h1>
          <p className="dk">The materials science of Miocene limestone, the fire-control geometry of a raised gun platform, and the ballistic accident that killed the Mediterranean's greatest corsair — examined through petrography, military engineering, and 450 years of weathering data.</p>
        </div>
      </div>

      <div className="pw">

        <p className="lead">The fragment of stone that killed Turgut Reis on 18 June 1565 was Lower Globigerina Limestone — a Miocene-age bioclastic packstone composed almost entirely of the fossilised tests of planktonic foraminifera of the genus Globigerina, deposited on the Pelagian Shelf during the Aquitanian to Langhian stages between approximately 23 and 14 million years ago. The stone's porosity ranges from 24 to 41 per cent (Cassar et al. 2017, Episodes 40(3):221–231), a property that ordinarily confers a defensive advantage: incoming cannonballs dissipate kinetic energy across the pore-space matrix rather than producing the brittle fragmentation characteristic of harder masonry. Dragut's death was the exception — a parapet struck at an oblique angle that generated shrapnel rather than absorption, sending limestone fragments into the face and skull of the seventy-year-old Ottoman admiral as he observed the bombardment of Fort St Elmo from an adjacent battery on Mount Sciberras. He lingered five days. The fort fell on the day he died. The stone that killed him was the same stone from which every wall, every bastion, every cavalier in Malta is built — a material that has been continuously quarried for construction for six thousand years, from the Neolithic megalithic temples to the Knights of St John's sixty-plus kilometres of fortifications, and that was designated a Global Heritage Stone Resource by the International Union of Geological Sciences in 2019.</p>

        <p>Fort St Elmo sits at the seaward tip of the Sciberras Peninsula, commanding the entrances to both Grand Harbour and Marsamxett Harbour — a position that makes it simultaneously the most strategic and the most exposed fortification on the island. Pietro Pardo, a Spanish military engineer, designed it in 1552 as a star fort with two demi-bastions, two flanks, and two faces, replacing a watchtower that had stood since 1488. The fort was built in six months under the supervision of Knight Fra Leone Strozzi, a speed enabled by the Globigerina Limestone's defining material property: it is soft enough when freshly quarried to be shaped with hand tools, then hardens progressively through desiccation and calcium carbonate recrystallisation upon exposure to air. A protective patina forms on the surface, giving the stone its characteristic transition from fresh gold to weathered brown. Roussel et al.'s 2021 study in Geomorphology quantified this durability across six Maltese fortification sites using Structure from Motion photogrammetry, on-site hardness testing, and porosimetric analysis: the Franka subtype — the standard building grade — showed a median stone recession of just 1.4 mm per century, while the inferior Soll subtype receded at 50 mm per century, thirty-six times faster. The fortifications of Valletta, built primarily of Franka, are losing surface at a rate that would take seventy centuries to remove one metre of wall.</p>

        <Fig caption={<><strong>The building block of siege warfare.</strong> Materials science of Lower Globigerina Limestone — a Miocene bioclastic packstone of globigerinid foraminiferal tests in a micrite matrix. Porosity of 24–41% absorbs ballistic energy but oblique impacts can produce lethal shrapnel. The Franka subtype's recession rate of 1.4 mm/century means the fortifications are effectively permanent on human timescales. Designated IUGS Global Heritage Stone Resource in 2019.</>}><LimestoneSVG/></Fig>

        <Side title="Sidebar 1: Petrography of a Cannonball's Target">
          <p style={sp}>Globigerina Limestone is petrographically classified as a bioclastic packstone to wackestone (Dunham classification), composed of more than 92% calcite with small amounts of clay minerals. The bioclasts are predominantly the tests (shells) of planktonic globigerinid foraminifera — single-celled organisms whose calcium carbonate shells settled on the Miocene seafloor of the Pelagian Shelf. The matrix is micrite (microcrystalline calcite, grain size &lt;4 μm), with neomorphic spar (5–15 μm) developing through diagenetic recrystallisation — a process observed by Gatt (2006) in SEM micrographs of 17th-century building stone from Floriana. Porosity is both intergranular (between fossil tests) and intragranular (within the hollow chambers of foraminifera). This dual-porosity system is what gives the stone its distinctive mechanical behaviour: soft enough to cut with a saw when freshly quarried (the calcium carbonate has not yet fully recrystallised around the pore spaces), it hardens significantly over months to years of atmospheric exposure as desiccation drives further cementation. In ballistic terms, the high porosity functions as a shock absorber — deformation energy is distributed across the pore network rather than concentrated at the point of impact, reducing the radius of fragmentation. This property made Globigerina Limestone a surprisingly effective defensive material against sixteenth-century iron cannonballs, which typically weighed 12–24 kg and impacted at velocities of 200–400 m/s.</p>
        </Side>

        <p>By the time the Ottomans arrived on 18 May 1565, Pardo's fort had acquired three additional elements: a covertway (a covered path along the outer edge of the ditch), a tenaille (a low outwork covering the main wall's base), and the cavalier — a raised rectangular gun platform set within the star-shaped perimeter, elevating the fort's heaviest guns approximately eight to ten metres above the main parapet line. The cavalier's military function was geometric: by raising the fire point above the main walls, it eliminated the dead ground that exists at the base of any fortification — the zone where attackers, having crossed the ditch and reached the wall, are below the defenders' angle of depression. From the cavalier, cannon could deliver plunging fire into this zone, and could also fire over the main parapet toward approaching siege works or ships. The total elevation from sea level to the cavalier's gun platform was approximately twenty metres. The Ottomans' response was to position their batteries on Mount Sciberras, the ridge that runs along the peninsula behind the fort, giving them the elevation advantage that the cavalier was designed to provide the defenders — a geometric reversal that Francesco Laparelli, the Pope's architect, would solve after the siege by building the entire city of Valletta on the ridge itself.</p>

        <Fig caption={<><strong>Elevation as force multiplier.</strong> The cavalier's fire geometry. By raising the gun platform approximately 8–10 m above the main fort level, the cavalier eliminated dead ground at the wall base and provided plunging fire arcs that cleared the main parapet. However, Ottoman batteries on Mount Sciberras — at higher elevation — could fire downward into the fort, partially negating this advantage. Laparelli's 1566 Valletta plan solved this by building the city on the high ground.</>}><GeometrySVG/></Fig>

        <div className="pq">"If the child cost us so dear, what will the parent cost?"<br/><span style={{fontSize:"12px",fontWeight:400,fontStyle:"normal",color:C.cap}}>— Mustafa Pasha, surveying the Ottoman dead after the fall of Fort St Elmo. Ottoman losses at St Elmo alone: ~8,000. The fort was expected to fall in 3 days; it held for 28.</span></div>

        <Side title="Sidebar 2: The Siege as Engineering Problem">
          <p style={sp}>The initial garrison numbered approximately 150 knights and 600 soldiers (majority Spanish), plus sixty armed galley slaves. Francisco Balbi di Correggio, a Spanish soldier who survived the Great Siege and published his account in 1568, recorded that Ottoman engineers estimated the fort would fall in three to five days — a calculation based on the weight of their siege train (thirty-six or more guns on Mount Sciberras) and the fort's relatively small footprint. The cavalier extended this estimate to twenty-eight days by providing a secondary defensive position that remained tenable even after the main walls were breached. The hastily built ravelin — described as little more than earth and fascines — fell around 10 June. The main fort followed on 23 June, by which time the entire garrison had been killed except nine Maltese soldiers who swam to Fort St Angelo. The delay was decisive: it allowed the fortification of Birgu and Senglea and bought time for the Gran Soccorso — approximately 8,000 Spanish and Italian relief troops — which landed at St Paul's Bay on 7 September and drove the Ottomans off the island. The cavalier's engineering contribution can be quantified in a rough metric: twenty-five additional days of resistance per eight metres of elevation — a ratio that would inform European fortification design for the next century.</p>
        </Side>

        <Fig caption={<><strong>Twenty-eight days.</strong> The Fort St Elmo phase of the Great Siege, from the Ottoman fleet's arrival to the relief force's landing. The cavalier's elevation advantage extended resistance from an expected 3 days to 28, at a cost of approximately 8,000 Ottoman dead — including Dragut, killed by a limestone fragment on 18 June.</>}><SiegeSVG/></Fig>

        <SB/>

        <p>After the siege, Laparelli rebuilt Fort St Elmo and incorporated it into Valletta's fortification system. The seventeenth and eighteenth centuries added the Vendôme Bastion (1614), the Carafa Enceinte (1687), and various barracks and churches. The British added musketry parapets in the nineteenth century. Very few elements of the present structure can be securely dated to 1552 — a point that military historian Stephen Spiteri has emphasised, noting that "few of the present-day features actually witnessed the events of 1565." The original fort's footprint is largely preserved, but its surfaces have been overwritten by successive engineering interventions. During the €15.5 million restoration completed in 2015 — funded eighty-five per cent by the European Regional Development Fund and implemented by the Grand Harbour Regeneration Corporation in collaboration with Heritage Malta — archaeological excavations uncovered elements of the pre-1565 fort, including sections of Pardo's original revetments. The cavalier's vaulted interior, which had served as magazine, barracks, shelter, and armoury across five centuries, was converted into an immersive heritage experience: three projectors casting computer-generated seas and explosions onto the curved walls while holographic actors deliver the historical narrative inside the same space where defenders sheltered from the Ottoman bombardment.</p>

        <Side title="Sidebar 3: Conservation Science — 450 Years of Weathering">
          <p style={sp}>Roussel et al.'s 2021 Geomorphology study represents the first systematic quantification of limestone recession on Maltese fortifications. Using Structure from Motion (SfM) photogrammetry at six sites, combined with on-site Leeb hardness testing and laboratory petrographic and porosimetric analysis, the team measured surface recession relative to protected reference surfaces (such as stone behind later additions or beneath protective cappings). The Franka subtype showed remarkable durability: a median recession of 1.4 mm/century, meaning that fortification surfaces built in the 1560s have lost approximately 6.4 mm of material over 450 years. The Soll subtype, by contrast, receded at 50 mm/century — explaining the dramatic alveolar (honeycomb) weathering visible on some sections of the Carafa Enceinte. The primary weathering mechanism is salt crystallisation: in Malta's salt-laden marine environment, sodium chloride and sodium sulphate crystals grow within the pore network, exerting expansive pressures that fracture the stone from within. The conservation challenge is that treatments designed to reduce porosity (such as TEOS-based silicate consolidants) also reduce the stone's natural ability to absorb and release moisture, potentially accelerating rather than retarding decay — a finding that JoAnn Cassar's research group at the University of Malta has explored extensively.</p>
        </Side>

        <p>The question that the cavalier poses — and that materials scientists, military engineers, and conservation specialists have been answering from different angles for five centuries — is fundamentally one of geometry and time. Pardo understood that ten metres of elevation would translate into additional days of resistance, and designed the cavalier accordingly. Dragut understood that the fort had to fall before the harbours could be secured, and died proving it. Laparelli understood that the high ground of Sciberras Peninsula was the real strategic asset, and built a city to claim it. Roussel's team understood that the same stone which resisted Ottoman cannonballs at 200 m/s is slowly losing its surface to salt crystals at 1.4 mm per century — a rate that makes the fortifications effectively permanent on any human planning horizon, but not permanent in geological time. The Globigerina Limestone was deposited between 23 and 14 million years ago. It has been quarried for 6,000 years. It has been fortification stone for 500. The cavalier it built was expected to survive three days; it survived twenty-eight. The weathering data suggest it will survive at least another 70,000 years at current recession rates, barring catastrophic salt loading or climate-driven acceleration. The stone has outlasted every army that has attacked it. Whether it will outlast the sea that made it is a question the foraminifera, whose tests compose its matrix, are no longer alive to answer.</p>

      </div>

      <div className="sn">
        <h3>Source Integrity Note</h3>
        <div className="ss"><div className="st">Claims Requiring Verification</div><ul>
          <li>Ottoman losses at St Elmo (6,000–8,000) — Balbi di Correggio is primary but partisan source; Ottoman records incomplete</li>
          <li>Cannonball velocity estimate (200–400 m/s) — based on general 16th-century ordnance data; site-specific ballistic testing not conducted</li>
          <li>Cavalier elevation (~8–10 m above main fort) — estimated from cross-section analysis; no surviving engineering drawings from 1552</li>
          <li>Recession rate applicability to cavalier specifically — Roussel et al. studied six sites; Fort St Elmo was not individually specified</li>
        </ul></div>
        <div className="ss"><div className="st">Principal Sources</div><ul>
          <li>Cassar, J. et al. (2017). Episodes 40(3):221–231 — IUGS Global Heritage Stone Resource nomination</li>
          <li>Roussel, E. et al. (2021). Geomorphology — SfM photogrammetry quantification of 450 years of limestone weathering</li>
          <li>Gatt, P. (2006). Model of limestone weathering — petrographic controls in Globigerina Limestone</li>
          <li>Heritage Malta — Fort St Elmo restoration details, €15.5M project</li>
          <li>Vassallo History — original fort elements, Laparelli's rebuilding, Spiteri's analysis</li>
          <li>Wikipedia: "Fort Saint Elmo"; "Great Siege of Malta"; "Geology of Malta" (accessed April 2026)</li>
          <li>Balbi di Correggio, F. (1568) — primary source for siege narrative</li>
        </ul></div>
        <div className="ss"><div className="st">Voices to Add</div><ul>
          <li>JoAnn Cassar (Univ. of Malta) — ongoing limestone conservation research</li>
          <li>Heritage Malta conservators — 2015 archaeological discoveries in cavalier</li>
          <li>Ottoman/Turkish military historians — siege from attacker perspective</li>
          <li>Erwan Roussel (Univ. Clermont Auvergne) — weathering rate methodology and applicability</li>
        </ul></div>
      </div>

      <div className="ft">
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:"13px",fontWeight:700,color:C.honey,letterSpacing:"3px",textTransform:"uppercase"}}>National Geographic</div>
        <div style={{fontSize:"10px",color:C.honeyL,opacity:.5,marginTop:"5px"}}>Scientific American Hybrid · Materials Science · Military Engineering · Malta</div>
      </div>
    </div>
  </>);
}
