/* --- YAML frontmatter --- */
/*
title: "The Colour of the Walls"
subtitle: "Valletta's golden fortifications were built by the hands of enslaved Muslims, Jews, and Christians. For 268 years, the Knights of St John ran one of the Mediterranean's largest slave economies. The stones remember what the plaques do not."
category: "history"
style: "natgeo-classic"
date: "2026-04-19"
tags: [malta, slavery, knights-of-st-john, valletta, mediterranean]
*/

const ARTICLE_DATA = {
  title: "The Colour of the Walls",
  subtitle: "Valletta's golden fortifications were built by the hands of enslaved Muslims, Jews, and Christians. For 268 years, the Knights of St John ran one of the Mediterranean's largest slave economies. The stones remember what the plaques do not.",
  category: "history",
  style: "natgeo-classic",
  date: "2026-04-19",
  author: "Matthew Deane",
  tags: ["malta", "slavery", "knights-of-st-john", "valletta", "mediterranean"],
};

/*
MODE: NatGeo Classic | FORMAT: Standard Feature
TOPIC: Slavery under the Knights of St John in Malta — the construction of Valletta,
       the bagnio, corsairing economy, the 1749 revolt, and the silence of the stones
CHARACTERS: Giuseppe Cohen, Mustafa Pasha of Rhodes, Jouvin de Rochefort,
            Jean de la Valette, Grand Master Pinto, Godfrey Wettinger
*/

const C={
  honey:"#d4a843",honeyL:"#f0dba0",lime:"#d4c690",
  stone:"#f2ece0",stoneD:"#ddd4c0",
  deep:"#1a1008",mid:"#2a1a0a",warm:"#3a2a18",
  text:"#1e1a14",textL:"#4a4238",cap:"#7a7060",
  blood:"#8b2020",sea:"#1a3a5a",seaL:"#2a5a8a",
  shadow:"#0d0a06"
};

// ─── SVG: Valletta harbour panorama ─────────────────────────────────────
function HeroSVG(){
  return(
    <svg viewBox="0 0 1400 620" style={{width:"100%",display:"block"}}>
      <defs>
        <linearGradient id="mSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d4a050" /><stop offset="40%" stopColor="#c08030" />
          <stop offset="70%" stopColor="#804020" /><stop offset="100%" stopColor="#1a1008" />
        </linearGradient>
        <linearGradient id="mSea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a3a5a" /><stop offset="100%" stopColor="#0d1a2a" />
        </linearGradient>
      </defs>
      <rect width="1400" height="620" fill="url(#mSky)"/>
      {/* Sun disk */}
      <circle cx="1050" cy="200" r="60" fill="#e8a030" opacity=".6"/>
      <circle cx="1050" cy="200" r="40" fill="#f0c060" opacity=".4"/>
      {/* Sea */}
      <rect x="0" y="380" width="1400" height="240" fill="url(#mSea)"/>
      {/* Sun reflection on water */}
      <ellipse cx="1050" cy="420" rx="120" ry="15" fill="#c08030" opacity=".2"/>
      {/* Valletta skyline — bastions, domes, bell towers */}
      <path d="M0,350 L80,350 L80,310 L120,310 L120,290 L180,290 L180,320 L220,320 L220,280 L250,250 L260,280 L280,280 L280,310 L340,310 L340,270 L360,250 L365,230 Q370,210 375,230 L380,250 L400,270 L400,310 L480,310 L480,290 L520,290 L520,260 L540,240 L545,220 Q548,200 552,220 L555,240 L575,260 L575,310 L660,310 L660,330 L740,330 L740,300 L780,300 L780,330 L840,330 L840,310 L900,310 L900,280 L920,260 L925,240 Q928,220 932,240 L935,260 L955,280 L955,350 L1050,350 L1050,320 L1100,320 L1100,350 L1200,350 L1200,330 L1260,330 L1260,350 L1400,350 L1400,380 L0,380Z" fill="#2a1a0a"/>
      {/* Bastion wall face — lighter honey stone */}
      <path d="M0,350 L80,350 L80,380 L0,380Z" fill="#8b7040" opacity=".3"/>
      <path d="M120,310 L280,310 L280,380 L120,380Z" fill="#8b7040" opacity=".25"/>
      <path d="M340,310 L575,310 L575,380 L340,380Z" fill="#8b7040" opacity=".3"/>
      <path d="M660,330 L840,330 L840,380 L660,380Z" fill="#8b7040" opacity=".25"/>
      <path d="M900,310 L1050,350 L1050,380 L900,380Z" fill="#8b7040" opacity=".2"/>
      {/* Fort St Elmo at the tip */}
      <path d="M680,330 L700,315 L720,310 L740,315 L760,330" fill="#3a2a18" stroke="#2a1a0a" strokeWidth="1"/>
      {/* Water ripples */}
      {[400,430,460,490,520,550].map((y,i)=>(
        <line key={i} x1={200+i*30} y1={y} x2={400+i*40} y2={y} stroke="rgba(255,255,255,.04)" strokeWidth="1"/>
      ))}
      {/* Galley silhouette */}
      <g transform="translate(500,410)">
        <path d="M-60,0 Q-40,-8 0,-12 Q40,-8 60,0 Q40,5 0,6 Q-40,5 -60,0Z" fill="#0d1520" opacity=".6"/>
        <line x1="0" y1="-12" x2="0" y2="-40" stroke="#0d1520" strokeWidth="1.5" opacity=".5"/>
        <path d="M0,-40 Q15,-35 20,-25" fill="none" stroke="#0d1520" strokeWidth="1" opacity=".4"/>
        {/* Oars */}
        {[-40,-25,-10,10,25,40].map((x,i)=>(
          <line key={i} x1={x} y1="0" x2={x-8} y2="10" stroke="#0d1520" strokeWidth=".8" opacity=".3"/>
        ))}
      </g>
    </svg>
  );
}

// ─── SVG: Slave population timeline ─────────────────────────────────────
function PopSVG(){
  const pts=[
    {yr:"1530",n:200,note:"Knights arrive"},
    {yr:"1565",n:800,note:"Great Siege captives"},
    {yr:"1600",n:2000,note:"Corsairing peak"},
    {yr:"1635",n:3000,note:"600 in Valletta alone"},
    {yr:"1700",n:5000,note:"Height of corso"},
    {yr:"1749",n:8000,note:"Revolt plot"},
    {yr:"1798",n:2000,note:"Napoleon frees slaves"},
  ];
  return(
    <svg viewBox="0 0 820 340" style={{width:"100%",display:"block",background:C.stone}}>
      <text x="410" y="24" textAnchor="middle" fill={C.text} fontSize="13" fontWeight="600" fontFamily="'Cormorant Garamond',serif" letterSpacing="2">ESTIMATED SLAVE POPULATION IN MALTA, 1530–1798</text>
      <g transform="translate(80,50)">
        <line x1="0" y1="220" x2="660" y2="220" stroke="#aaa" strokeWidth="1"/>
        <line x1="0" y1="0" x2="0" y2="220" stroke="#aaa" strokeWidth="1"/>
        {[0,2000,4000,6000,8000].map((v,i)=>{
          const y=220-(v/8500)*220;
          return (<g key={i}><text x="-8" y={y+3} textAnchor="end" fill={C.cap} fontSize="8" fontFamily="monospace">{v===0?"0":v/1000+"k"}</text><line x1="0" y1={y} x2="660" y2={y} stroke="#ddd" strokeWidth=".5"/></g>);
        })}
        {/* Area fill */}
        <path d={`M${pts.map((p,i)=>`${i*(660/(pts.length-1))},${220-(p.n/8500)*220}`).join(" L")} L660,220 L0,220Z`} fill={C.blood} opacity=".12"/>
        {/* Line */}
        <polyline points={pts.map((p,i)=>`${i*(660/(pts.length-1))},${220-(p.n/8500)*220}`).join(" ")} fill="none" stroke={C.blood} strokeWidth="2.5"/>
        {pts.map((p,i)=>{
          const x=i*(660/(pts.length-1)),y=220-(p.n/8500)*220;
          return (<g key={i}>
            <circle cx={x} cy={y} r="4" fill={C.blood}/>
            <text x={x} y={238} textAnchor="middle" fill={C.text} fontSize="9" fontFamily="monospace">{p.yr}</text>
            <text x={x} y={y-10} textAnchor="middle" fill={C.blood} fontSize="8" fontWeight="600" fontFamily="monospace">{p.n.toLocaleString()}</text>
            <text x={x} y={252} textAnchor="middle" fill={C.cap} fontSize="7" fontFamily="'Cormorant Garamond',serif">{p.note}</text>
          </g>);
        })}
      </g>
      <text x="410" y="330" textAnchor="middle" fill={C.cap} fontSize="9" fontStyle="italic" fontFamily="'Cormorant Garamond',serif">Estimates from Wettinger (2002); Fontenay (2001); McDermott (2022). Figures are approximate; archival gaps significant before 1580.</text>
    </svg>
  );
}

// ─── SVG: Bagnio floor plan schematic ───────────────────────────────────
function BagnioSVG(){
  return(
    <svg viewBox="0 0 780 440" style={{width:"100%",display:"block",background:C.stone}}>
      <text x="390" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontWeight="600" fontFamily="'Cormorant Garamond',serif" letterSpacing="2">THE SLAVES' PRISON (BAGNO) — VALLETTA</text>
      <text x="390" y="40" textAnchor="middle" fill={C.cap} fontSize="10" fontFamily="'Cormorant Garamond',serif">Schematic layout after Wettinger (2002) and 1633 Valletta plan. Capacity: ~900 inmates.</text>
      <g transform="translate(100,60)">
        {/* Outer walls */}
        <rect x="0" y="0" width="500" height="300" rx="4" fill="none" stroke={C.warm} strokeWidth="3"/>
        {/* Central courtyard */}
        <rect x="120" y="80" width="260" height="140" rx="2" fill={C.honeyL} opacity=".3" stroke={C.honey} strokeWidth="1.5"/>
        <text x="250" y="155" textAnchor="middle" fill={C.honey} fontSize="11" fontWeight="600" fontFamily="'Cormorant Garamond',serif">COURTYARD</text>
        <text x="250" y="170" textAnchor="middle" fill={C.cap} fontSize="8" fontFamily="'Cormorant Garamond',serif">Market for Levantine goods</text>
        <text x="250" y="182" textAnchor="middle" fill={C.cap} fontSize="8" fontFamily="'Cormorant Garamond',serif">Public access permitted</text>
        {/* Rooms around courtyard */}
        {/* Top: cells */}
        <rect x="20" y="10" width="460" height="60" rx="2" fill={C.warm} opacity=".15"/>
        <text x="250" y="42" textAnchor="middle" fill={C.textL} fontSize="9" fontFamily="'Cormorant Garamond',serif">DORMITORY CELLS — Order's slaves + privately owned (1 scudo/month)</text>
        {/* Left: chapel + mosque */}
        <rect x="20" y="80" width="90" height="65" rx="2" fill={C.seaL} opacity=".15" stroke={C.seaL} strokeWidth="1"/>
        <text x="65" y="110" textAnchor="middle" fill={C.seaL} fontSize="8" fontWeight="600" fontFamily="'Cormorant Garamond',serif">Chapel of</text>
        <text x="65" y="122" textAnchor="middle" fill={C.seaL} fontSize="8" fontWeight="600" fontFamily="'Cormorant Garamond',serif">St John Baptist</text>
        <rect x="20" y="155" width="90" height="65" rx="2" fill="#2a6a2a" opacity=".15" stroke="#2a6a2a" strokeWidth="1"/>
        <text x="65" y="188" textAnchor="middle" fill="#2a6a2a" fontSize="8" fontWeight="600" fontFamily="'Cormorant Garamond',serif">MOSQUE</text>
        <text x="65" y="200" textAnchor="middle" fill="#2a6a2a" fontSize="7" fontFamily="'Cormorant Garamond',serif">Muslim prayer</text>
        {/* Right: tavern + shops */}
        <rect x="390" y="80" width="90" height="65" rx="2" fill={C.honey} opacity=".2" stroke={C.honey} strokeWidth="1"/>
        <text x="435" y="112" textAnchor="middle" fill={C.honey} fontSize="8" fontWeight="600" fontFamily="'Cormorant Garamond',serif">TAVERN</text>
        <rect x="390" y="155" width="90" height="65" rx="2" fill={C.honey} opacity=".15" stroke={C.honey} strokeWidth="1"/>
        <text x="435" y="182" textAnchor="middle" fill={C.honey} fontSize="8" fontWeight="600" fontFamily="'Cormorant Garamond',serif">Barber &amp;</text>
        <text x="435" y="194" textAnchor="middle" fill={C.honey} fontSize="8" fontWeight="600" fontFamily="'Cormorant Garamond',serif">Tailor shops</text>
        {/* Bottom: more cells */}
        <rect x="20" y="230" width="460" height="60" rx="2" fill={C.warm} opacity=".15"/>
        <text x="250" y="262" textAnchor="middle" fill={C.textL} fontSize="9" fontFamily="'Cormorant Garamond',serif">ADDITIONAL CELLS — free subjects + convicts also held here</text>
        {/* Entrances */}
        <rect x="200" y="-8" width="40" height="16" rx="2" fill={C.warm}/>
        <text x="220" y="4" textAnchor="middle" fill="#fff" fontSize="6" fontWeight="700" fontFamily="monospace">GATE</text>
        <text x="220" y="-15" fill={C.textL} fontSize="7" fontFamily="'Cormorant Garamond',serif" textAnchor="middle">St Ursula Street</text>
        <rect x="200" y="293" width="40" height="16" rx="2" fill={C.warm}/>
        <text x="220" y="305" textAnchor="middle" fill="#fff" fontSize="6" fontWeight="700" fontFamily="monospace">GATE</text>
        <text x="220" y="320" fill={C.textL} fontSize="7" fontFamily="'Cormorant Garamond',serif" textAnchor="middle">East Street</text>
      </g>
      <text x="390" y="425" textAnchor="middle" fill={C.cap} fontSize="9" fontStyle="italic" fontFamily="'Cormorant Garamond',serif">After Wettinger (2002, pp. 85–98); 1633 plan of Valletta; Zammit (2009). Running water installed 1615 under Wignacourt Aqueduct.</text>
    </svg>
  );
}

// ─── SVG: Corsairing economy flow ───────────────────────────────────────
function CorsoSVG(){
  return(
    <svg viewBox="0 0 820 300" style={{width:"100%",display:"block",background:C.stone}}>
      <text x="410" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontWeight="600" fontFamily="'Cormorant Garamond',serif" letterSpacing="2">THE CORSO — CORSAIRING ECONOMY OF HOSPITALLER MALTA</text>
      {[
        {x:40,y:90,w:130,h:70,label:"CORSAIR\nRAIDS",sub:"Ottoman & Barbary\nshipping targeted",col:C.sea},
        {x:220,y:60,w:110,h:50,label:"PLUNDER",sub:"Cargo seized",col:C.honey},
        {x:220,y:130,w:110,h:50,label:"CAPTIVES",sub:"Crew enslaved",col:C.blood},
        {x:390,y:60,w:120,h:50,label:"TREASURY",sub:"% to Order + taxes",col:C.honey},
        {x:390,y:130,w:120,h:50,label:"SLAVE MARKET",sub:"Piazza San Giorgio",col:C.blood},
        {x:560,y:50,w:110,h:40,label:"FORTIFICATIONS",sub:"",col:C.warm},
        {x:560,y:100,w:110,h:40,label:"GALLEYS",sub:"Oar labour",col:C.sea},
        {x:560,y:150,w:110,h:40,label:"DOMESTIC",sub:"Palace service",col:C.cap},
        {x:560,y:200,w:110,h:40,label:"RANSOM",sub:"Income stream",col:C.honey},
      ].map((b,i)=>(
        <g key={i}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="3" fill={b.col} opacity=".15" stroke={b.col} strokeWidth="1.2"/>
          {b.label.split("\n").map((l,j)=>(
            <text key={j} x={b.x+b.w/2} y={b.y+20+j*14} textAnchor="middle" fill={b.col} fontSize="9" fontWeight="600" fontFamily="'Cormorant Garamond',serif">{l}</text>
          ))}
          {b.sub && b.sub.split("\n").map((s,j)=>(
            <text key={`s${j}`} x={b.x+b.w/2} y={b.y+b.h-6+j*10} textAnchor="middle" fill={C.cap} fontSize="7" fontFamily="'Cormorant Garamond',serif">{s}</text>
          ))}
        </g>
      ))}
      {/* Arrows */}
      {[[170,125,218,85],[170,125,218,155],[330,85,388,85],[330,155,388,155],[510,85,558,70],[510,155,558,120],[510,155,558,170],[510,155,558,220]].map(([x1,y1,x2,y2],i)=>(
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.textL} strokeWidth="1" opacity=".4"/>
      ))}
      <text x="410" y="280" textAnchor="middle" fill={C.cap} fontSize="9" fontStyle="italic" fontFamily="'Cormorant Garamond',serif">Valletta described as "Christianity's biggest slave trading city in the Mediterranean" — comparable to Livorno; Muslim counterpart: Algiers</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN ARTICLE
   ═══════════════════════════════════════════════════════════════ */
export default function App(){
  const [ok,setOk]=useState(false);
  useEffect(()=>{setTimeout(()=>setOk(true),80)},[]);

  const Flr=()=><div style={{textAlign:"center",margin:"36px 0",color:C.honey,fontSize:"16px",letterSpacing:"10px"}}>❧</div>;
  const Fig=({children,caption})=>(<div style={{margin:"45px -22px"}}>{children}<div style={{fontSize:"12px",color:C.cap,lineHeight:1.55,padding:"10px 22px 0",fontStyle:"italic",borderTop:`1px solid ${C.stoneD}`}}>{caption}</div></div>);
  const SB=({title,children})=>(<div style={{background:C.stoneD,borderLeft:`3px solid ${C.honey}`,padding:"22px 26px",margin:"38px 0"}}><h4 style={{fontFamily:"'Playfair Display',serif",fontSize:"14px",fontWeight:700,color:C.mid,marginBottom:"10px",letterSpacing:"1px",textTransform:"uppercase"}}>{title}</h4>{children}</div>);
  const sp={fontSize:"15px",lineHeight:1.62,marginBottom:".7em"};

  return(<>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=Crimson+Pro:ital,wght@0,400;0,500;1,400&display=swap');
      *{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
      .ng{font-family:'Cormorant Garamond','Georgia',serif;color:${C.text};background:${C.stone};overflow-x:hidden}
      .ng p{font-size:18.5px;line-height:1.78;margin-bottom:1.35em;font-weight:400;letter-spacing:.01em}
      .lead::first-letter{font-family:'Playfair Display',serif;font-size:4.2em;float:left;line-height:.8;margin-right:.06em;margin-top:.05em;color:${C.blood}}
      .hw{position:relative}
      .ho{position:absolute;bottom:0;left:0;right:0;padding:44px 7% 30px;background:linear-gradient(transparent,rgba(13,10,6,.92))}
      .hl{font-family:'Playfair Display',serif;font-weight:900;font-size:clamp(28px,5vw,56px);color:#fff;line-height:1.05;letter-spacing:-.02em;margin-bottom:10px}
      .dk{font-family:'Cormorant Garamond',serif;font-size:clamp(14px,2vw,20px);color:${C.honeyL};font-style:italic;line-height:1.42;max-width:720px}
      .yb{width:56px;height:3.5px;background:${C.honey};margin-bottom:14px}
      .pw{max-width:710px;margin:0 auto;padding:48px 22px 20px}
      .pq{font-family:'Playfair Display',serif;font-size:clamp(19px,2.6vw,27px);font-weight:700;font-style:italic;color:${C.warm};border-left:3.5px solid ${C.honey};padding:16px 26px;margin:36px -16px;line-height:1.35}
      .sn{background:${C.deep};color:${C.honeyL};padding:38px 7%}
      .sn h3{font-family:'Playfair Display',serif;font-size:16px;color:${C.honey};margin-bottom:14px;letter-spacing:1px}
      .sn ul{list-style:none;padding:0}.sn li{padding:2.5px 0;font-size:12px;line-height:1.5;opacity:.8}.sn li::before{content:"— ";color:${C.honey}}
      .ss{margin-bottom:18px}.st{font-size:10px;text-transform:uppercase;letter-spacing:2px;color:${C.honey};margin-bottom:7px;font-weight:600}
      .ft{text-align:center;padding:26px;background:${C.deep};border-top:3px solid ${C.honey}}
    `}</style>
    <div className="ng" style={{opacity:ok?1:0,transition:"opacity .7s"}}>

      {/* ═══ HERO ═══ */}
      <div className="hw">
        <HeroSVG/>
        <div className="ho">
          <div className="yb"/>
          <div style={{fontFamily:"monospace",fontSize:"9px",color:C.honeyL,letterSpacing:"2px",marginBottom:"8px",textTransform:"uppercase"}}>Mode: NatGeo Classic | Format: Standard Feature</div>
          <h1 className="hl">The Colour of the Walls</h1>
          <p className="dk">Valletta's golden fortifications were built by the hands of enslaved Muslims, Jews, and Christians. For 268 years, the Knights of St John ran one of the Mediterranean's largest slave economies. The stones remember what the plaques do not.</p>
        </div>
      </div>

      {/* ═══ PROSE ═══ */}
      <div className="pw">

        <p className="lead">On the evening of 6 June 1749, inside a coffeehouse on Strada Fontana in Valletta, three enslaved men tried to recruit a fourth to kill the Grand Master of the Knights of St John. The coffeehouse sat in the shadow of fortifications that enslaved people had helped to build, on a street paved with globigerina limestone quarried by labourers who were somebody's property. The three conspirators — a Muslim cleric known as the papasso Ibrahim, a man called Giovanni Battista, and a Persian neophyte named Antonio de Viguier who served in the Grand Master's own guard — were part of a network of roughly 150 people, enslaved and free, who had spent months planning the most ambitious slave revolt in Malta's history. Their target date was 29 June, the feast of Saints Peter and Paul, when Grand Master Manuel Pinto da Fonseca would host a lavish banquet at the Grandmaster's Palace. The plan was to poison the food, assassinate the knights in their auberges, free the prisoners from the Slaves' Prison on St Ursula Street, seize the armouries at Fort St Elmo, and signal an Ottoman fleet waiting offshore. The man they were trying to recruit — Giacomo Cassar, a soldier of Armenian origin — refused, was assaulted, and by ten o'clock that night had informed his commanding officer. The revolt never happened. But the coffeehouse conversation, and the world it took place in, tell a story that Malta's honey-coloured walls have been slow to speak.</p>

        <p>The Knights Hospitaller arrived in Malta in 1530, a gift of real estate from Emperor Charles V after they had been expelled from Rhodes by Suleiman the Magnificent. They found a sparsely fortified archipelago with a population of roughly 20,000 and no natural resources except limestone and a strategic harbour. Over the next 268 years, they transformed both. The fortification programme that produced Valletta — founded in 1566 after the Great Siege and named for Grand Master Jean de la Valette — and the concentric rings of bastions, curtain walls, and ravelins that still define the island's skyline, required a labour force that the local Maltese population alone could not provide. That workforce came, in significant part, from the institution that financed the entire enterprise: the corso, or corsairing — state-sponsored piracy against Ottoman and North African shipping that was simultaneously a holy war, a business model, and a slave supply chain.</p>

        <div className="pq">"Valletta would later become Christianity's biggest slave trading city in the Mediterranean — comparable to Livorno on the Christian side, and Algiers on the Muslim."</div>

        <p>The economics were circular and self-reinforcing. Corsair galleys — powered by enslaved oarsmen — raided Muslim merchant vessels and coastal settlements. The captured cargo enriched the Order's treasury. The captured people were brought to Malta, quarantined at the Lazzaretto on Manoel Island, triaged by sex, age, and physical condition to determine market value, and then distributed: the strongest males went to the galleys as rowers, others were assigned to construction, domestic service, or the Order's institutions. Those captured by the Order's own ships became state property. Those taken by licensed privateers were auctioned at the public slave market in Piazza San Giorgio — the city's main square, directly in front of the Grandmaster's Palace. Godfrey Wettinger, the Maltese historian who spent his career reconstructing this world from notarial records and chancery documents, published his comprehensive study in 2002: a 600-page work tracing slavery on the islands from approximately 1000 to 1812 that remains the foundational text.</p>

        <Fig caption={<><strong>The engine of empire.</strong> The corsairing economy that financed Hospitaller Malta. Raids on Ottoman and North African shipping produced plunder (which funded fortifications and the treasury) and captives (who were enslaved, ransomed, or sold). Valletta's slave market at Piazza San Giorgio operated in front of the Grandmaster's Palace. The system was self-reinforcing: galleys powered by enslaved oarsmen conducted the raids that captured more enslaved people.</>}><CorsoSVG/></Fig>

        <p>The scale grew across three centuries. When the Knights arrived in 1530, Malta had a small existing slave population. After the Great Siege of 1565 — in which Jean de la Valette's outnumbered garrison held off an Ottoman force of perhaps 40,000 — several hundred Muslim captives were pressed into the construction of the new capital. They excavated the fortress ditch that separates Valletta from Floriana, a task that required cutting through solid limestone to a depth of eighteen metres. Slave labour also contributed to the Wignacourt Aqueduct in the early seventeenth century. By 1635, Wettinger's research shows, up to 600 slaves worked as artisans or labourers in Valletta and Senglea alone. By the mid-eighteenth century, sources report approximately 8,000 Muslim slaves living in the Maltese islands — a number that made them a significant fraction of the total population.</p>

        <Fig caption={<><strong>The arc of captivity.</strong> Estimated slave population on Malta from the Knights' arrival (1530) through the height of the corsairing economy to Napoleon's liberation in 1798. The 1749 spike coincides with the failed revolt plot. Figures are approximate — Wettinger (2002) notes significant archival gaps before 1580.</>}><PopSVG/></Fig>

        <SB title="SB 1: The Bagnio">
          <p style={sp}>The Slaves' Prison — the Prigione degli Schiavi, commonly called the Bagno — was Valletta's principal detention compound. Built under Grand Master Hugues Loubenx de Verdalle (1581–1595) behind the Bastion of St Christopher, it housed approximately 900 inmates: the Order's slaves, privately owned slaves (held for a fee of one scudo per month), and even free male subjects convicted of crimes. The French traveller Jouvin de Rochefort, who visited Malta in the late seventeenth century, described it as "a huge old edifice." A 1633 plan of Valletta shows two entrances — one on St Ursula Street, another on East Street. Inside were dormitory cells, two Christian chapels (St John the Baptist and the Holy Cross), a mosque for Muslim slaves, a tavern, and shops for barbers and tailors. The courtyard functioned as a public market specialising in Levantine goods, open to the wider population. Running water arrived in 1615 when Grand Master Wignacourt's aqueduct was extended to the prison. The Bagno was, in effect, a walled city within a walled city — a microcosm of the Mediterranean's cross-cultural economy, powered by unfreedom.</p>
        </SB>

        <Fig caption={<><strong>A prison with a market.</strong> Schematic layout of the Slaves' Prison (Bagno) in Valletta, after Wettinger (2002) and the 1633 city plan. The compound held approximately 900 inmates — enslaved people of the Order, privately owned slaves, and convicted free subjects. It contained a mosque, two chapels, a tavern, shops, and a public courtyard market. The building was demolished in the 19th century; no physical trace remains.</>}><BagnioSVG/></Fig>

        <Flr/>

        <p>The man behind the 1749 revolt was Mustafa, Pasha of Rhodes — an Ottoman official who had arrived in Malta not as a captured corsair victim but as a prisoner of war. In February 1748, Christian slaves aboard the Ottoman flagship Lupa had revolted, seized the vessel, and sailed it to Malta with 150 Ottoman crew as captives. Among them was Mustafa. France, which maintained an alliance with the Ottoman Empire, demanded his release. The Knights compromised: house arrest rather than the Bagno. It was from this position of relative privilege that Mustafa made contact with Constantinople, with the beys of Tunis, Tripoli, and Algiers, and with the enslaved population inside the Slaves' Prison. He distributed arsenic to galley slaves aboard the Order's three warships — the Capitana, San Luigi, and San Nicola — to poison the knights at sea. On land, the plan called for simultaneous assassinations at the Palace banquet, the seizure of Fort St Elmo's armouries, and a signal to an Ottoman corsair ship lurking offshore.</p>

        <p>The plot unravelled because of a coffeehouse brawl. When the three conspirators assaulted Giacomo Cassar for refusing to join them, the commotion attracted the attention of the shop owner: Giuseppe Cohen, a Jewish neophyte — a convert to Christianity — who reported the conversation to Grand Master Pinto. The trials that followed were held at the Gran Corte della Castellania. One hundred and fifty people were arrested. Interrogation was conducted under torture on the rack. Thirty-five were executed between July and October 1749 — hanged, quartered, and beheaded in Floriana, paraded through the streets on mule-drawn carts. Three died in custody. Seventy-two were condemned to the galleys, eight of them branded with the letter R — for ribelli — on their foreheads. Mustafa, protected by French diplomacy, was eventually exiled to Rhodes on a French vessel. Cohen received a pension of approximately 750 scudi per year and a property on Merchants Street.</p>

        <SB title="SB 2: The Historiography of Silence">
          <p style={sp}>Malta's relationship with its slave-owning past remains largely unresolved. There are no memorials, plaques, or interpretive programmes at Valletta's heritage sites acknowledging the role of enslaved labour in their construction. The Slaves' Prison itself was demolished in the nineteenth century; its site on St Ursula Street bears no marker. The tomb of Grand Master Raphael Cotoner in St John's Co-Cathedral includes, at its base, a sculpted figure of an African slave gazing upward at the knight — a monument that embeds the hierarchy of enslavement in the sacred architecture of the Order without comment or context. Godfrey Wettinger, who died in 2015 at the age of 85, spent decades in the archives reconstructing a history that few Maltese institutions had chosen to tell. The 2021 publication in Antiquity by Nathaniel McDermott — "Slavery, captivity and galley rowing in early modern Malta" — represents the first archaeological approach to this material, reframing captivity as a process visible in material culture: graffiti in detention spaces, artefacts aboard galley wrecks, the spatial organisation of the Bagno itself. The scholarship is closing the gap between what happened and what is remembered.</p>
        </SB>

        <Flr/>

        <p>The distinction between the stones and the hands that laid them is, in Valletta, a distinction the city itself refuses to make visible. Every bastion, every curtain wall, every globigerina block in every church façade was cut, transported, and fitted by a workforce that included enslaved Muslims captured in corsair raids, enslaved Jews seized from Mediterranean shipping lanes, enslaved Christians taken as prisoners of war, Maltese freemen working for contractors, and galley slaves temporarily reassigned from the oars to the quarry. Wettinger's research clarifies the division of labour: slaves were generally assigned menial tasks — removal and carting of rubble, excavation of ditches — while skilled construction was done by employed workers. But the line between menial and skilled blurred constantly, and the physical infrastructure of extraction — the quarrying, the hauling, the earthmoving that made fortification possible — rested on unfree labour.</p>

        <p>In June 1798, Napoleon's fleet appeared in the Grand Harbour. The Order surrendered after token resistance — a capitulation so swift it suggests the institution's internal decay had advanced further than its walls implied. Napoleon applied French law: liberty, equality, and the abolition of slavery. The Jews and Muslims still held in the Slaves' Prison were freed. The Bagno was eventually demolished. The corsair galleys were retired. The economy that had built Valletta — an economy of capture, coercion, and the conversion of human beings into architectural infrastructure — ended not with a revolt but with a bureaucratic decree from a general who had other islands to conquer.</p>

        <p>Today the fortifications remain, golden in the morning light, photographed by thousands of tourists who cross the drawbridge into Valletta each day without knowing that the ditch beneath their feet was cut by enslaved hands. The honey-coloured globigerina limestone — the same stone that absorbed Ottoman cannonballs during the Great Siege — has a quality that builders and historians both understand: it is soft when freshly quarried and hardens with exposure to air. Time makes it stronger. Time also makes it silent. Somewhere beneath the surface of every wall in Valletta, in the mortar joints and the quarry marks and the levelling courses, there is a record that no plaque preserves — the labour of people whose names appear in notarial contracts as merchandise, who slept in a prison with a market, who worshipped in a mosque inside their jail, who planned a revolt in a coffeehouse on a street they had helped to pave, and who, when the revolt failed, were branded on the forehead with a letter that meant rebel. The walls do not speak. But they know.</p>

      </div>

      {/* ═══ SOURCE INTEGRITY NOTE ═══ */}
      <div className="sn">
        <h3>Source Integrity Note</h3>
        <div className="ss"><div className="st">Claims Requiring Verification</div>
          <ul>
            <li>Slave population estimates (200→8,000) — compiled from multiple sources with acknowledged gaps; no single census exists</li>
            <li>"Christianity's biggest slave trading city" — cited in secondary sources; comparative data with Livorno incomplete</li>
            <li>Fortress ditch depth (18 m) — cited in heritage literature; engineering survey needed</li>
            <li>Role of slave labour vs. free labour in fortification construction — Wettinger distinguishes menial/skilled but boundary unclear</li>
          </ul>
        </div>
        <div className="ss"><div className="st">Principal Sources</div>
          <ul>
            <li>Wettinger, G. (2002). Slavery in the Islands of Malta and Gozo ca. 1000–1812. Malta: Publishers Enterprises Group.</li>
            <li>McDermott, N. (2022). Hospitaller Interactions with Servile and Enslaved Peoples. PhD thesis, Cardiff University.</li>
            <li>Antiquity (2021), Vol. 95, Issue 383: "Slavery, captivity and galley rowing in early modern Malta."</li>
            <li>Fontenay, M. (2001). "Il mercato maltese degli schiavi." Quaderni Storici 2, Rome.</li>
            <li>Bono, S. (1999). Schiavi musulmani nell'Italia moderna. University of Perugia Press.</li>
            <li>Wikipedia: "Slavery in Malta"; "1749 Muslim slave revolt plot in Malta" (accessed April 2026).</li>
            <li>i-access.eu: "Site of Slaves' Prison" — architectural and cartographic evidence.</li>
          </ul>
        </div>
        <div className="ss"><div className="st">Fieldwork Requiring Access</div>
          <ul>
            <li>Site of Slaves' Prison, St Ursula Street, Valletta — now commercial/residential; no visible remains</li>
            <li>National Library of Malta — Wettinger's archival sources, notarial contracts, chancery records</li>
            <li>St John's Co-Cathedral — Cotoner tomb with enslaved figure at base</li>
            <li>Gran Corte della Castellania — trial records of 1749 conspiracy</li>
            <li>Fort St Elmo / National War Museum — the armouries the conspirators planned to seize</li>
          </ul>
        </div>
        <div className="ss"><div className="st">Contested Claims</div>
          <ul>
            <li>Scale of enslaved contribution to Valletta's construction — Wettinger notes slaves did "menial tasks" while construction was by "skilled workers employed by contractors," but the boundary was fluid</li>
            <li>Mustafa's precise role — some sources suggest personal ambition alongside liberation motives</li>
            <li>Cohen's credit vs. Cassar's — Cassar informed first but Cohen received the reward; Wettinger notes this discrepancy</li>
          </ul>
        </div>
        <div className="ss"><div className="st">Voices to Add</div>
          <ul>
            <li>Maltese historians continuing Wettinger's archival work</li>
            <li>Heritage Malta staff — current interpretive approach to slavery at fortification sites</li>
            <li>Muslim and Jewish community representatives — perspectives on ancestral captivity</li>
            <li>Archaeological researchers (McDermott et al.) — material evidence of captivity</li>
            <li>North African historians — the "other side" of the corsairing economy (Algiers, Tunis, Tripoli)</li>
          </ul>
        </div>
      </div>

      <div className="ft">
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:"13px",fontWeight:700,color:C.honey,letterSpacing:"3px",textTransform:"uppercase"}}>National Geographic</div>
        <div style={{fontSize:"10px",color:C.honeyL,opacity:.5,marginTop:"5px"}}>History · Mediterranean · Malta</div>
      </div>
    </div>
  </>);
}
