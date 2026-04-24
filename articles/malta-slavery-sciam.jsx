import { useState, useEffect } from "react";

/*
MODE: Scientific American Hybrid | FORMAT: Standard Feature
TOPIC: Slavery under the Knights of St John — archaeological and archival evidence,
       galley biomechanics, material culture, corsairing demographics, and the 2026 exhibition
*/

const C={
  honey:"#c9a050",honeyL:"#f0dba0",stone:"#f0eadc",stoneD:"#ddd4c2",
  deep:"#12100a",mid:"#2a2018",warm:"#4a3828",
  text:"#1a1812",textL:"#4a4538",cap:"#7a7260",
  blood:"#8b2020",sea:"#15355a",seaL:"#2a5a8a"
};

function HeroSVG(){
  return(
    <svg viewBox="0 0 1400 580" style={{width:"100%",display:"block"}}>
      <defs>
        <linearGradient id="ms" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1a2545"/><stop offset="55%" stopColor="#3a4565"/><stop offset="80%" stopColor="#c08848"/><stop offset="100%" stopColor="#e0a050"/></linearGradient>
        <linearGradient id="mw" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#15355a"/><stop offset="100%" stopColor="#0a1a30"/></linearGradient>
      </defs>
      <rect width="1400" height="580" fill="url(#ms)"/>
      <circle cx="1050" cy="200" r="50" fill="#e0a050" opacity=".5"/>
      <rect x="0" y="360" width="1400" height="220" fill="url(#mw)"/>
      <path d="M0,330 L80,330 L80,295 L140,295 L140,275 L200,275 L200,300 L260,265 L265,245 Q270,225 275,245 L280,265 L300,290 L380,290 L380,265 L420,245 L425,225 Q428,210 432,225 L435,245 L460,265 L460,300 L560,300 L560,275 L620,275 L620,295 L720,310 L720,290 L780,290 L780,310 L900,310 L900,290 L960,290 L960,310 L1100,315 L1200,320 L1400,325 L1400,360 L0,360Z" fill="#2a1a0a"/>
      {[{x:120,s:.6},{x:350,s:.5},{x:820,s:.7},{x:1100,s:.5}].map((t,i)=>(<g key={i} transform={`translate(${t.x},325) scale(${t.s})`}><rect x="-3" y="0" width="6" height="35" fill="#2a1a0a"/></g>))}
      <g transform="translate(650,380)">
        <path d="M-55,0 Q-35,-8 0,-11 Q35,-8 55,0 Q35,4 0,5 Q-35,4 -55,0Z" fill="#0d1520" opacity=".5"/>
        {[-35,-20,-5,10,25].map((x,i)=>(<line key={i} x1={x} y1="0" x2={x-6} y2="8" stroke="#0d1520" strokeWidth=".7" opacity=".3"/>))}
      </g>
    </svg>
  );
}

function GalleySVG(){
  return(
    <svg viewBox="0 0 860 400" style={{width:"100%",display:"block",background:C.stone}}>
      <text x="430" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontWeight="600" fontFamily="'Cormorant Garamond',serif" letterSpacing="2">GALLEY BIOMECHANICS — FORCED LABOUR AT SEA</text>
      <text x="430" y="40" textAnchor="middle" fill={C.cap} fontSize="10" fontFamily="'Cormorant Garamond',serif">Each vessel required ~280 oarsmen. Mediterranean-wide: ~20,000 rowers in peacetime (Davis 2007; Palmer 2021)</text>
      <g transform="translate(100,70)">
        {/* Galley cross-section */}
        <path d="M0,180 Q150,140 330,130 Q510,140 660,180 Q510,210 330,220 Q150,210 0,180Z" fill={C.sea} opacity=".1" stroke={C.sea} strokeWidth="2"/>
        <text x="330" y="190" textAnchor="middle" fill={C.sea} fontSize="10" fontFamily="monospace">HULL — ~50m length</text>
        {/* Rowing benches — 3 per side */}
        {[{y:100,label:"Outboard"},{y:130,label:"Middle"},{y:160,label:"Inboard"}].map((r,i)=>(
          <g key={i}>
            <line x1="60" y1={r.y} x2="600" y2={r.y} stroke={C.warm} strokeWidth="1" opacity=".3"/>
            {Array.from({length:12}).map((_,j)=>(
              <g key={j}>
                <circle cx={80+j*45} cy={r.y} r="4" fill={C.blood} opacity=".3"/>
              </g>
            ))}
            <text x="640" y={r.y+4} fill={C.cap} fontSize="7" fontFamily="monospace">{r.label}</text>
          </g>
        ))}
        {/* Oar extending out */}
        <line x1="80" y1="100" x2="30" y2="60" stroke={C.warm} strokeWidth="2"/>
        <text x="10" y="55" fill={C.textL} fontSize="8" fontFamily="monospace">Oar ~10m</text>
        {/* Central gangway */}
        <rect x="310" y="85" width="40" height="100" fill={C.honey} opacity=".15" stroke={C.honey} strokeWidth="1"/>
        <text x="330" y="140" textAnchor="middle" fill={C.honey} fontSize="7" fontWeight="600" fontFamily="monospace" transform="rotate(-90,330,140)">CORSIA</text>
      </g>
      {/* Stats panel */}
      <g transform="translate(100,310)">
        <text x="0" y="0" fill={C.text} fontSize="11" fontWeight="600" fontFamily="'Cormorant Garamond',serif">Rowing demographics (Hospitaller galleys)</text>
        <text x="0" y="18" fill={C.textL} fontSize="9" fontFamily="'Cormorant Garamond',serif">Crew composition: enslaved Muslims (schiavi), convicted criminals (forzati), voluntary rowers (buonavoglie), debtors</text>
        <text x="0" y="32" fill={C.textL} fontSize="9" fontFamily="'Cormorant Garamond',serif">Attrition rate: calculable from Order's replacement records — primary method for estimating total throughput (Wettinger 2002)</text>
        <text x="0" y="46" fill={C.textL} fontSize="9" fontFamily="'Cormorant Garamond',serif">Musculoskeletal stress: repetitive rowing motion leaves identifiable traces on skeletal remains (Martin 2008; Tung 2012)</text>
        <text x="0" y="60" fill={C.textL} fontSize="9" fontFamily="'Cormorant Garamond',serif">Material evidence: Ottoman coffee cups, ship graffiti, gameboards carved in cell walls — Malta Ship Graffiti Project (maltashipgraffiti.org)</text>
      </g>
    </svg>
  );
}

function EvidenceSVG(){
  return(
    <svg viewBox="0 0 860 340" style={{width:"100%",display:"block",background:C.stone}}>
      <text x="430" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontWeight="600" fontFamily="'Cormorant Garamond',serif" letterSpacing="2">ARCHAEOLOGICAL EVIDENCE FOR CAPTIVITY — METHODS & SOURCES</text>
      {[
        {x:40,y:60,w:160,h:100,title:"ARCHIVAL",items:["Notarial contracts","Chancery records","Inquisition files","Attrition ledgers"],col:C.honey},
        {x:230,y:60,w:160,h:100,title:"MATERIAL CULTURE",items:["Ottoman coffee cups","Ceramics (Cutajar 2019)","Foodway analysis","Imported goods"],col:C.sea},
        {x:420,y:60,w:160,h:100,title:"GRAFFITI",items:["Ship carvings (1000s)","Gameboards (Nine Men's Morris)","CMPHP photogrammetry","Malta Ship Graffiti Project"],col:C.blood},
        {x:610,y:60,w:190,h:100,title:"BIOARCHAEOLOGY",items:["Musculoskeletal stress markers","Violence recidivism on bone","Dietary isotope analysis","Burial context & social place"],col:C.warm},
      ].map((b,i)=>(
        <g key={i}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="4" fill={b.col} opacity=".1" stroke={b.col} strokeWidth="1.5"/>
          <text x={b.x+b.w/2} y={b.y+18} textAnchor="middle" fill={b.col} fontSize="10" fontWeight="700" fontFamily="'Cormorant Garamond',serif">{b.title}</text>
          {b.items.map((it,j)=>(
            <text key={j} x={b.x+b.w/2} y={b.y+35+j*14} textAnchor="middle" fill={C.textL} fontSize="8" fontFamily="'Cormorant Garamond',serif">{it}</text>
          ))}
        </g>
      ))}
      {/* Convergence arrow */}
      <g transform="translate(430,190)">
        <line x1="-350" y1="0" x2="350" y2="0" stroke={C.honey} strokeWidth="1" opacity=".3"/>
        <polygon points="0,15 -8,0 8,0" fill={C.honey} opacity=".5"/>
        <rect x="-120" y="25" width="240" height="50" rx="4" fill={C.deep} opacity=".08" stroke={C.deep} strokeWidth="1.5"/>
        <text x="0" y="48" textAnchor="middle" fill={C.text} fontSize="11" fontWeight="600" fontFamily="'Cormorant Garamond',serif">CONVERGENT EVIDENCE MODEL</text>
        <text x="0" y="63" textAnchor="middle" fill={C.cap} fontSize="8" fontFamily="'Cormorant Garamond',serif">Palmer (2021): "captivity as process, not thing" — traces visible indirectly through effects on practices</text>
      </g>
      <text x="430" y="310" textAnchor="middle" fill={C.cap} fontSize="9" fontStyle="italic" fontFamily="'Cormorant Garamond',serif">After Palmer, Antiquity (2021); McDermott, PhD Cardiff (2022); Gambin & Kassulke, Historical Archaeology (2023); Anthony & Hassam, Antiquity (2025)</text>
    </svg>
  );
}

function PopSVG(){
  const pts=[{yr:"1530",n:200},{yr:"1565",n:800},{yr:"1600",n:2000},{yr:"1635",n:3000},{yr:"1700",n:5000},{yr:"1749",n:8000},{yr:"1798",n:2000}];
  return(
    <svg viewBox="0 0 780 280" style={{width:"100%",display:"block",background:C.stone}}>
      <text x="390" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontWeight="600" fontFamily="'Cormorant Garamond',serif" letterSpacing="2">SLAVE POPULATION — MALTA, 1530–1798</text>
      <g transform="translate(80,45)">
        <line x1="0" y1="180" x2="600" y2="180" stroke="#aaa" strokeWidth="1"/>
        <line x1="0" y1="0" x2="0" y2="180" stroke="#aaa" strokeWidth="1"/>
        {[0,2000,4000,6000,8000].map((v,i)=>{const y=180-(v/8500)*180;return (<g key={i}><text x="-8" y={y+3} textAnchor="end" fill={C.cap} fontSize="7" fontFamily="monospace">{v===0?"0":v/1000+"k"}</text><line x1="0" y1={y} x2="600" y2={y} stroke="#ddd" strokeWidth=".5"/></g>);})}
        <path d={`M${pts.map((p,i)=>`${i*(600/(pts.length-1))},${180-(p.n/8500)*180}`).join(" L")} L600,180 L0,180Z`} fill={C.blood} opacity=".1"/>
        <polyline points={pts.map((p,i)=>`${i*(600/(pts.length-1))},${180-(p.n/8500)*180}`).join(" ")} fill="none" stroke={C.blood} strokeWidth="2.5"/>
        {pts.map((p,i)=>{const x=i*(600/(pts.length-1)),y=180-(p.n/8500)*180;return (<g key={i}><circle cx={x} cy={y} r="4" fill={C.blood}/><text x={x} y={195} textAnchor="middle" fill={C.text} fontSize="8" fontFamily="monospace">{p.yr}</text><text x={x} y={y-8} textAnchor="middle" fill={C.blood} fontSize="7" fontWeight="600" fontFamily="monospace">{p.n.toLocaleString()}</text></g>);})}
      </g>
      <text x="390" y="268" textAnchor="middle" fill={C.cap} fontSize="8" fontStyle="italic" fontFamily="'Cormorant Garamond',serif">Wettinger (2002); Fontenay (2001); McDermott (2022). Archival gaps significant pre-1580. 280 rowers per galley × 3 Order vessels = 840 at-sea minimum.</text>
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
      .hl{font-family:'Playfair Display',serif;font-weight:900;font-size:clamp(26px,4.6vw,52px);color:#fff;line-height:1.06;letter-spacing:-.02em;margin-bottom:10px}
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
          <h1 className="hl">The Colour of the Walls</h1>
          <p className="dk">Archaeology, archival demography, and material culture analysis are rewriting the history of enslaved labour in Hospitaller Malta. The methodology reveals what the fortifications conceal: a corsairing economy that made Valletta the Mediterranean's largest Christian slave-trading port for over two centuries.</p>
        </div>
      </div>

      <div className="pw">

        <p className="lead">In 2021, Russell Palmer published a paper in Antiquity (Vol. 95, Issue 383, pp. 1280–1297) that reframed the study of slavery in Hospitaller Malta by proposing a methodological shift: instead of searching for the "obvious tools of domination such as shackles or chains," which are infrequent archaeological finds, Palmer argued for reconceptualising captivity as a process — one whose traces are visible not in discrete objects but in effects on a range of practices, from the musculoskeletal stress markers on skeletal remains of galley rowers to the ship graffiti carved into detention-space walls by confined individuals. The paper drew on bioarchaeological methods developed by Debra Martin (2008) and Tiffiny Tung (2012) for reading what Tung called the "bony diaries of people's lives" — repetitive physical labour and recidivist violence leaving identifiable traces on bone — and applied them to the specific context of the Knights of St John's galley fleet, which required approximately 280 oarsmen per vessel and employed, across the Mediterranean, an estimated 20,000 forced rowers in peacetime alone. Palmer's work, expanded in his 2021 monograph Captives, Colonists and Craftspeople (Berghahn Books), represents the first sustained archaeological approach to modern slavery within a European context — and its subject is the very city whose golden fortifications are a UNESCO World Heritage Site visited by over two million tourists per year.</p>

        <p>The Knights Hospitaller ruled Malta from 1530 to 1798. During that period, the corsairing economy — state-sponsored piracy against Ottoman and North African shipping, conducted under the theological framework of holy war — generated the labour force, the capital, and the captive population that built and sustained the island's military infrastructure. Godfrey Wettinger's comprehensive archival study, Slavery in the Islands of Malta and Gozo ca. 1000–1812 (2002, Publishers Enterprises Group, 600+ pages), reconstructed the demographic arc from notarial contracts, chancery records, and the Order's administrative archives. His methodology relied heavily on attrition-rate analysis: because the Order kept records of dying slaves and their replacements, the replacement rate could be used to back-calculate total throughput — a demographic technique analogous to mark-recapture methods in population ecology. Wettinger's estimates show the enslaved population growing from approximately 200 at the Knights' arrival in 1530 to a peak of roughly 8,000 by the mid-eighteenth century, making enslaved people a significant fraction of Malta's total population of approximately 100,000.</p>

        <Fig caption={<><strong>Four evidence streams.</strong> The convergent methodology Palmer (2021) proposes for studying captivity in the absence of direct physical evidence. Archival records (notarial contracts, Inquisition files), material culture (Ottoman coffee cups excavated at Birgu and Valletta — Cutajar & Spiteri 2019), graffiti (thousands of ship carvings documented by the Malta Ship Graffiti Project and CMPHP photogrammetry), and bioarchaeological analysis of skeletal remains converge on a single conclusion: captivity shaped every dimension of Hospitaller society.</>}><EvidenceSVG/></Fig>

        <Side title="Sidebar 1: Galley Biomechanics and Demographic Scale">
          <p style={sp}>Each Hospitaller galley was approximately 50 metres long, powered by roughly 280 oarsmen seated on three tiers of benches (outboard, middle, inboard) flanking a central gangway called the corsia. Robert Davis's 2007 analysis in the Journal of Medieval and Early Modern Studies estimated that Mediterranean nations collectively employed some 20,000 forced rowers in peacetime — a figure that rises dramatically during wartime mobilisations. The rowing population was heterogeneous: enslaved Muslims (schiavi), convicted criminals (forzati), debtors, and a small number of voluntary rowers (buonavoglie) who received pay. Wettinger notes that the Order kept separate administrative categories for each class, and that attrition among galley slaves was high — compressor hoses did not exist in the sixteenth century, but the equivalent was the relentless physical demand of oar-stroke cycles lasting hours, in conditions that Muscat and Agius (2013) describe with the phrase "as strong as a Turk," reflecting the common assessment that Turkish captives were the most valued rowers. The musculoskeletal consequences of this labour — repetitive strain on shoulders, lower back, and hands — are precisely the kind of traces that Palmer's bioarchaeological methodology can detect in skeletal remains, though no systematic osteological study of identified galley-rower burials in Malta has yet been published.</p>
        </Side>

        <Fig caption={<><strong>280 oarsmen per vessel.</strong> Schematic cross-section showing the three-tier rowing arrangement on a Hospitaller galley. The Order maintained three galleys — the Capitana, San Luigi, and San Nicola — requiring a minimum of 840 rowers at any given time. Musculoskeletal stress from repetitive oar-stroke cycles leaves identifiable traces on skeletal remains (Martin 2008).</>}><GalleySVG/></Fig>

        <p>The material culture of captivity is emerging from excavations that were not originally designed to find it. Nathaniel Cutajar and Mevrick Spiteri's 2019 analysis of Ottoman coffee cups recovered from eighteenth-century deposits in Birgu and Valletta — published in Tesserae, Issue 8 — provides a ceramic signature of the enslaved population's presence in the urban fabric. Ottoman coffee-drinking culture, brought by captives from the Levant and North Africa, infiltrated Maltese daily life through the Bagno's courtyard market and the coffeehouses of Valletta — including the coffeehouse on Strada Fontana where, on 6 June 1749, three enslaved conspirators tried to recruit a fourth man to assassinate Grand Master Manuel Pinto da Fonseca. The 2023 Central Mediterranean Penal Heritage Project (CMPHP), using digital photogrammetry to document graffiti in detention spaces across Malta and Sicily, has identified hundreds of ship carvings and gameboards carved by confined individuals — material that Timmy Gambin and Marcus Kassulke published in Historical Archaeology (2023) as evidence of what they term "maritimity in stone."</p>

        <div className="pq">"Direct evidence of captives is rare in archaeological contexts. By reconceptualising captivity as a process, rather than as a 'thing,' we can glimpse captivity indirectly through its effects on a range of practices."<br/><span style={{fontSize:"12px",fontWeight:400,fontStyle:"normal",color:C.cap}}>— Russell Palmer, Antiquity (2021), citing Ann Stahl (2008)</span></div>

        <p>The corsairing economy that generated this captive population was circular and self-reinforcing. Corsair galleys — powered by enslaved oarsmen — raided Ottoman and North African shipping. Captured cargo funded the Order's treasury and its fortification programme. Captured people were quarantined at the Lazzaretto on Manoel Island for up to forty days, triaged by sex, age, and physical condition, and distributed: the strongest males went to the galleys, others to construction or domestic service. Those captured by the Order's ships became state property; those taken by licensed privateers were auctioned at the slave market in Piazza San Giorgio, directly in front of the Grandmaster's Palace. By 1635, Wettinger documented up to 600 enslaved individuals working as artisans or labourers in Valletta and Senglea alone. The Slaves' Prison — the Bagno — on St Ursula Street housed approximately 900 inmates and contained, within its walls, a mosque, two Christian chapels, a tavern, a barber, a tailor, and a courtyard market specialising in Levantine goods. It was a walled city within a walled city.</p>

        <Fig caption={<><strong>The demographic arc.</strong> Estimated slave population from the Knights' arrival to Napoleon's liberation. The 280-rower-per-galley requirement for the Order's three-vessel fleet alone demanded a minimum baseline of 840 at-sea rowers, before accounting for land-based labour. Attrition-rate analysis (Wettinger 2002) provides the primary demographic methodology; archival gaps before 1580 are significant.</>}><PopSVG/></Fig>

        <Side title="Sidebar 2: The 1749 Revolt — Forensic Reconstruction">
          <p style={sp}>The 1749 conspiracy represents the most extensively documented slave revolt attempt in Hospitaller Malta, and its forensic record survives in the trial transcripts of the Gran Corte della Castellania. Mustafa, Pasha of Rhodes — an Ottoman official captured when Christian slaves seized the Ottoman flagship Lupa in February 1748 — coordinated a network of approximately 150 conspirators across multiple sites: the Slaves' Prison, the Grandmaster's Palace guard (where the Persian neophyte Antonio de Viguier served), and the three galleys of the Order's fleet, where galley slaves had been supplied with arsenic to poison the knights at sea. The target date — 29 June 1749, the feast of Saints Peter and Paul — was chosen because Grand Master Pinto would be hosting a banquet, concentrating the leadership in one location. The plan included simultaneous poisonings at the Palace and the auberges, assassination of the Grand Master, seizure of Fort St Elmo's armouries, and a signal to an Ottoman corsair ship offshore. The plot was exposed on 6 June when conspirators assaulted Giacomo Cassar, a guard of Armenian origin, in a coffeehouse on Strada Fontana. Giuseppe Cohen, the shop owner — a Jewish neophyte — reported to Pinto. The subsequent repression: 150 arrested, interrogation under torture, 35 executed (hanged, quartered, beheaded), 3 died in custody, 72 condemned to the galleys, 8 branded with R (ribelli) on their foreheads. Mustafa, protected by French diplomacy, was exiled to Rhodes in 1751.</p>
        </Side>

        <Side title="Sidebar 3: The 2026 Paris Exhibition">
          <p style={sp}>In March 2026, the Institut du monde arabe in Paris opened "Mediterranean Slavery: 17th–18th Centuries," co-curated by Meredith Martin (NYU) and Gillian Weiss — the first major museum exhibition dedicated to the history and representation of enslaved Muslims in Mediterranean Europe. The exhibition focuses on France, Italy, and Malta, featuring objects including a life drawing of an enslaved Muslim by Charles Le Brun (Louis XIV's chief painter), paintings depicting the 1749 Malta revolt, an album of drawings by Fabroni showing galley slaves at work and at rest, naval weapons, talismans, and letters written by Muslim and Christian captives. A new contemporary artwork by Kevork Mourad, Suspended in Time, addresses the erasure of this history following France's capture of Algiers in 1830. The exhibition's significance lies in its demonstration that Mediterranean galley slavery was not a footnote to the Atlantic slave trade but a parallel, contemporaneous, and in the sixteenth and seventeenth centuries actually larger system — one whose material and cultural traces are only now being systematically documented through the kind of convergent archaeological methodology Palmer advocates.</p>
        </Side>

        <SB/>

        <p>The scientific uncertainty in this field centres on scale. Wettinger acknowledged significant archival gaps before 1580, and the Ottoman archives — which would contain the other side of the ledger, records of the captives' origins, families, and communities — are in poor condition for this period. Michel Fontenay's 2001 analysis in Quaderni Storici estimated the Maltese slave market's throughput but noted that Mediterranean slave-trade figures for the sixteenth century remain imprecise, in contrast to the relatively well-documented Atlantic trade. The archaeological evidence is also partial: the Slaves' Prison was demolished in the nineteenth century, and no systematic excavation of its site has been conducted. Palmer's graffiti analysis, the CMPHP's photogrammetric documentation, and the ongoing Malta Ship Graffiti Project are generating new data, but the bioarchaeological programme — the osteological analysis of identified galley-rower remains that could confirm the musculoskeletal stress hypothesis — remains a future research agenda, not a completed study.</p>

        <p>What is not uncertain is the structure. The archival, material, and archaeological evidence converges on a single model: a corsairing economy in which the capture, sale, and forced labour of predominantly Muslim and Jewish individuals — with a notable minority of Christians — financed the construction and maintenance of the fortifications, powered the galleys that conducted further raids, and sustained a domestic service sector that extended from the Grandmaster's Palace to the countryside. The system operated for 268 years. It left its signature in globigerina limestone, in Ottoman coffee cups buried beneath Valletta's streets, in ship graffiti carved into detention walls by people who had been rowed to their captivity on the same kind of vessel they drew, and in the archival silence of a UNESCO World Heritage Site where no plaque, no memorial, and no interpretive programme acknowledges the labour that built it. The stones of Valletta are soft when quarried and harden with exposure to air. The history they contain is following the opposite trajectory — soft for centuries, hardening now under the pressure of archaeological inquiry, archival reconstruction, and a Paris exhibition that asks the Mediterranean to look at what its fortified cities were built from, and by whom.</p>

      </div>

      <div className="sn">
        <h3>Source Integrity Note</h3>
        <div className="ss"><div className="st">Claims Requiring Verification</div><ul>
          <li>20,000 Mediterranean rowers in peacetime (Davis 2007) — widely cited; original methodology needs independent demographic review</li>
          <li>8,000 enslaved in Malta by mid-18th century — Wettinger's estimate from attrition analysis; no independent census confirmation</li>
          <li>Bagno capacity (~900) — from Wettinger (2002) and 1633 plan; no archaeological confirmation (building demolished)</li>
          <li>Musculoskeletal stress in galley-rower skeletal remains — methodologically sound (Martin 2008) but no systematic Maltese study published</li>
        </ul></div>
        <div className="ss"><div className="st">Principal Sources</div><ul>
          <li>Palmer, R. (2021). Antiquity 95(383):1280–1297 — captivity as archaeological process</li>
          <li>Palmer, R. (2021). Captives, Colonists and Craftspeople. Berghahn Books.</li>
          <li>Wettinger, G. (2002). Slavery in the Islands of Malta and Gozo ca. 1000–1812. Malta: PEG.</li>
          <li>Gambin, T. & Kassulke, M. (2023). Historical Archaeology 57:1162–1176 — ship graffiti</li>
          <li>Anthony, A.W. & Hassam, S. (2025). Antiquity 99(404) — Noto Antica prison graffiti</li>
          <li>Cutajar, N. & Spiteri, M. (2019). Tesserae 8:38–45 — Ottoman coffee cups</li>
          <li>Fontenay, M. (2001). Quaderni Storici 2 — Maltese slave market</li>
          <li>Davis, R. (2007). J. Medieval & Early Modern Studies 37:57–74 — geography of Mediterranean slaving</li>
          <li>Martin, M. & Weiss, G. (2026). Institut du monde arabe exhibition — Mediterranean Slavery: 17th–18th Centuries</li>
        </ul></div>
        <div className="ss"><div className="st">Voices to Add</div><ul>
          <li>Russell Palmer (current affiliation) — ongoing CMPHP research programme</li>
          <li>Meredith Martin (NYU) — 2026 exhibition curatorial perspective</li>
          <li>Heritage Malta — current interpretive approach to slavery at fortification sites</li>
          <li>North African historians — Algiers, Tunis, Tripoli perspectives on the corsairing economy</li>
          <li>Maltese osteologists — feasibility of galley-rower bioarchaeological programme</li>
        </ul></div>
      </div>

      <div className="ft">
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:"13px",fontWeight:700,color:C.honey,letterSpacing:"3px",textTransform:"uppercase"}}>National Geographic</div>
        <div style={{fontSize:"10px",color:C.honeyL,opacity:.5,marginTop:"5px"}}>Scientific American Hybrid · Archaeology · Mediterranean History</div>
      </div>
    </div>
  </>);
}
