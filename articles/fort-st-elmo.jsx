import { useState, useEffect } from "react";

/*
MODE: NatGeo Classic | FORMAT: Standard Feature
TOPIC: The Cavalier of Fort St Elmo — architecture, the 1565 Great Siege, and conservation
*/

const C={
  lime:"#d4c890",honey:"#c9a050",honeyL:"#f0dba0",
  stone:"#f0eadc",stoneD:"#ddd4c2",
  deep:"#12100a",mid:"#2a2018",warm:"#4a3828",
  text:"#1a1812",textL:"#4a4538",cap:"#7a7260",
  blood:"#9b2020",sea:"#15355a",seaL:"#2a5a8a",
  fort:"#8b7a50",cannon:"#3a3020"
};

// ─── Hero: Fort St Elmo at dawn from the harbour ────────────────────────
function HeroSVG(){
  return(
    <svg viewBox="0 0 1400 600" style={{width:"100%",display:"block"}}>
      <defs>
        <linearGradient id="eSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2545"/><stop offset="50%" stopColor="#3a4565"/>
          <stop offset="80%" stopColor="#c08848"/><stop offset="100%" stopColor="#e0a050"/>
        </linearGradient>
        <linearGradient id="eSea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#15355a"/><stop offset="100%" stopColor="#0a1a30"/>
        </linearGradient>
      </defs>
      <rect width="1400" height="600" fill="url(#eSky)"/>
      <circle cx="1100" cy="280" r="45" fill="#e0a050" opacity=".5"/>
      <rect x="0" y="380" width="1400" height="220" fill="url(#eSea)"/>
      <ellipse cx="1100" cy="400" rx="80" ry="10" fill="#c08848" opacity=".15"/>
      {/* Fort St Elmo — star fort profile from sea level */}
      <g transform="translate(500,320)">
        {/* Main bastion walls */}
        <path d="M-200,60 L-200,20 L-150,0 L-80,-10 L0,-20 L80,-10 L150,0 L200,20 L200,60" fill="#5a4a30" stroke="#3a2a18" strokeWidth="1.5"/>
        {/* Cavalier — raised platform in center */}
        <rect x="-40" y="-55" width="80" height="35" fill="#6a5a38" stroke="#4a3a20" strokeWidth="1.5"/>
        <rect x="-35" y="-50" width="70" height="5" fill="#7a6a48" opacity=".5"/>
        {/* Parapet on cavalier */}
        <path d="M-40,-55 L-35,-62 L-25,-62 L-25,-55 L-15,-55 L-15,-62 L-5,-62 L-5,-55 L5,-55 L5,-62 L15,-62 L15,-55 L25,-55 L25,-62 L35,-62 L40,-55" fill="#6a5a38" stroke="#4a3a20" strokeWidth="1"/>
        {/* Embrasures */}
        {[-30,-10,10,30].map((x,i)=>(
          <rect key={i} x={x-3} y={-50} width="6" height="8" fill="#1a1008" rx="1"/>
        ))}
        {/* Demi-bastions left and right */}
        <polygon points="-200,20 -220,0 -180,-20 -150,0" fill="#4a3a22" stroke="#3a2a18" strokeWidth="1"/>
        <polygon points="200,20 220,0 180,-20 150,0" fill="#4a3a22" stroke="#3a2a18" strokeWidth="1"/>
        {/* Ravelin in front */}
        <polygon points="-60,70 0,50 60,70" fill="#3a2a18" opacity=".6" stroke="#2a1a10" strokeWidth="1"/>
        {/* Flag */}
        <line x1="0" y1="-62" x2="0" y2="-85" stroke="#4a3a20" strokeWidth="1.5"/>
        <path d="M0,-85 L18,-80 L0,-75" fill="#cc2020"/>
      </g>
      {/* Valletta walls extending behind */}
      <path d="M0,340 L100,335 L200,330 L280,335 L280,380 L0,380Z" fill="#3a2a18" opacity=".5"/>
      <path d="M720,335 L900,330 L1000,325 L1100,328 L1200,332 L1400,340 L1400,380 L720,380Z" fill="#3a2a18" opacity=".5"/>
      {/* Water */}
      {[390,410,430,450,470].map((y,i)=>(
        <line key={i} x1={100+i*60} y1={y} x2={350+i*50} y2={y} stroke="rgba(255,255,255,.03)" strokeWidth="1"/>
      ))}
    </svg>
  );
}

// ─── Fort plan diagram ──────────────────────────────────────────────────
function PlanSVG(){
  return(
    <svg viewBox="0 0 820 520" style={{width:"100%",display:"block",background:C.stone}}>
      <text x="410" y="24" textAnchor="middle" fill={C.text} fontSize="14" fontWeight="600" fontFamily="'Cormorant Garamond',serif" letterSpacing="2">FORT ST ELMO — ANNOTATED PLAN (1565 CONFIGURATION)</text>
      <text x="410" y="42" textAnchor="middle" fill={C.cap} fontSize="10" fontFamily="'Cormorant Garamond',serif">Star fort at tip of Sciberras Peninsula · designed by Pietro Pardo, 1552</text>
      <g transform="translate(160,80)">
        {/* Star fort outline */}
        <polygon points="250,10 350,80 380,180 350,280 250,350 150,280 120,180 150,80" fill={C.fort} opacity=".15" stroke={C.fort} strokeWidth="2.5"/>
        {/* Demi-bastion left */}
        <polygon points="150,80 100,50 120,130 150,80" fill={C.fort} opacity=".2" stroke={C.fort} strokeWidth="1.5"/>
        <text x="90" y="85" fill={C.fort} fontSize="8" fontWeight="600" fontFamily="monospace" textAnchor="end">Demi-</text>
        <text x="90" y="95" fill={C.fort} fontSize="8" fontWeight="600" fontFamily="monospace" textAnchor="end">bastion</text>
        {/* Demi-bastion right */}
        <polygon points="350,80 400,50 380,130 350,80" fill={C.fort} opacity=".2" stroke={C.fort} strokeWidth="1.5"/>
        <text x="415" y="85" fill={C.fort} fontSize="8" fontWeight="600" fontFamily="monospace">Demi-</text>
        <text x="415" y="95" fill={C.fort} fontSize="8" fontWeight="600" fontFamily="monospace">bastion</text>
        {/* CAVALIER — central raised platform */}
        <rect x="200" y="120" width="100" height="80" rx="3" fill={C.blood} opacity=".2" stroke={C.blood} strokeWidth="2.5"/>
        <text x="250" y="155" textAnchor="middle" fill={C.blood} fontSize="12" fontWeight="700" fontFamily="'Cormorant Garamond',serif">CAVALIER</text>
        <text x="250" y="170" textAnchor="middle" fill={C.blood} fontSize="8" fontFamily="'Cormorant Garamond',serif">Raised gun platform</text>
        <text x="250" y="182" textAnchor="middle" fill={C.blood} fontSize="8" fontFamily="'Cormorant Garamond',serif">Above main fort level</text>
        {/* Parade ground */}
        <rect x="170" y="210" width="160" height="80" rx="2" fill={C.honey} opacity=".1" stroke={C.honey} strokeWidth="1"/>
        <text x="250" y="255" textAnchor="middle" fill={C.honey} fontSize="9" fontFamily="'Cormorant Garamond',serif">Parade Ground</text>
        {/* Ravelin */}
        <polygon points="200,360 250,330 300,360 250,380" fill={C.sea} opacity=".15" stroke={C.sea} strokeWidth="1.5"/>
        <text x="250" y="365" textAnchor="middle" fill={C.sea} fontSize="8" fontWeight="600" fontFamily="monospace">RAVELIN</text>
        <text x="250" y="377" textAnchor="middle" fill={C.cap} fontSize="7" fontFamily="'Cormorant Garamond',serif">Hastily built pre-siege</text>
        {/* Ditch */}
        <path d="M130,320 Q250,350 370,320" fill="none" stroke={C.seaL} strokeWidth="2" strokeDasharray="5,3"/>
        <text x="250" y="315" textAnchor="middle" fill={C.seaL} fontSize="8" fontFamily="monospace">DITCH</text>
        {/* Covertway */}
        <path d="M110,310 Q250,345 390,310" fill="none" stroke={C.textL} strokeWidth="1" strokeDasharray="3,2"/>
        <text x="400" y="310" fill={C.textL} fontSize="7" fontFamily="monospace">Covertway</text>
        {/* Compass */}
        <g transform="translate(440,30)">
          <line x1="0" y1="-20" x2="0" y2="20" stroke={C.textL} strokeWidth="1"/>
          <line x1="-20" y1="0" x2="20" y2="0" stroke={C.textL} strokeWidth="1"/>
          <text x="0" y="-25" textAnchor="middle" fill={C.text} fontSize="9" fontWeight="700" fontFamily="monospace">N</text>
          <polygon points="0,-18 3,-10 -3,-10" fill={C.text}/>
        </g>
        {/* Harbour labels */}
        <text x="-30" y="180" fill={C.sea} fontSize="9" fontWeight="600" fontFamily="'Cormorant Garamond',serif" textAnchor="end">GRAND</text>
        <text x="-30" y="193" fill={C.sea} fontSize="9" fontWeight="600" fontFamily="'Cormorant Garamond',serif" textAnchor="end">HARBOUR</text>
        <text x="530" y="180" fill={C.sea} fontSize="9" fontWeight="600" fontFamily="'Cormorant Garamond',serif">MARSAMXETT</text>
        <text x="530" y="193" fill={C.sea} fontSize="9" fontWeight="600" fontFamily="'Cormorant Garamond',serif">HARBOUR</text>
        {/* Ottoman battery positions */}
        <text x="250" y="420" textAnchor="middle" fill={C.warm} fontSize="9" fontWeight="600" fontFamily="monospace">↑ MOUNT SCIBERRAS</text>
        <text x="250" y="434" textAnchor="middle" fill={C.cap} fontSize="8" fontFamily="'Cormorant Garamond',serif">Ottoman batteries: 36+ guns overlooking the fort</text>
        {/* Dragut annotation */}
        <text x="530" y="110" fill={C.blood} fontSize="8" fontWeight="600" fontFamily="monospace">× DRAGUT KILLED</text>
        <text x="530" y="122" fill={C.cap} fontSize="7" fontFamily="'Cormorant Garamond',serif">Parapet fragment, 18 June 1565</text>
        <line x1="380" y1="100" x2="525" y2="112" stroke={C.blood} strokeWidth="1" strokeDasharray="3,2"/>
      </g>
    </svg>
  );
}

// ─── Cross-section of cavalier ──────────────────────────────────────────
function SectionSVG(){
  return(
    <svg viewBox="0 0 820 380" style={{width:"100%",display:"block",background:C.stone}}>
      <text x="410" y="22" textAnchor="middle" fill={C.text} fontSize="13" fontWeight="600" fontFamily="'Cormorant Garamond',serif" letterSpacing="2">CAVALIER CROSS-SECTION — ELEVATED GUN PLATFORM</text>
      <g transform="translate(100,60)">
        {/* Main fort wall */}
        <rect x="0" y="120" width="600" height="140" fill={C.fort} opacity=".2" stroke={C.fort} strokeWidth="2"/>
        <text x="300" y="200" textAnchor="middle" fill={C.fort} fontSize="11" fontFamily="'Cormorant Garamond',serif">MAIN FORT LEVEL — parade ground, barracks, magazine</text>
        {/* Cavalier raised above */}
        <rect x="200" y="30" width="200" height="90" fill={C.blood} opacity=".15" stroke={C.blood} strokeWidth="2.5"/>
        <text x="300" y="70" textAnchor="middle" fill={C.blood} fontSize="12" fontWeight="700" fontFamily="'Cormorant Garamond',serif">CAVALIER</text>
        <text x="300" y="85" textAnchor="middle" fill={C.blood} fontSize="9" fontFamily="'Cormorant Garamond',serif">Raised gun platform · vaulted interior</text>
        <text x="300" y="98" textAnchor="middle" fill={C.blood} fontSize="9" fontFamily="'Cormorant Garamond',serif">Fields of fire over main walls</text>
        {/* Parapet with embrasures */}
        <path d="M200,30 L210,18 L230,18 L230,30 L250,30 L250,18 L270,18 L270,30 L290,30 L290,18 L310,18 L310,30 L330,30 L330,18 L350,18 L350,30 L370,30 L370,18 L390,18 L400,30" fill={C.blood} opacity=".2" stroke={C.blood} strokeWidth="1.5"/>
        {/* Embrasure openings */}
        {[220,250,280,310,340,370].map((x,i)=>(
          <rect key={i} x={x+2} y={20} width="6" height="10" fill={C.deep} rx="1"/>
        ))}
        {/* Cannon on top */}
        <g transform="translate(300,25)">
          <rect x="-15" y="-5" width="30" height="8" rx="3" fill={C.cannon}/>
          <circle cx="-15" cy="6" r="4" fill={C.cannon} opacity=".7"/>
          <circle cx="15" cy="6" r="4" fill={C.cannon} opacity=".7"/>
        </g>
        {/* Ramp access */}
        <path d="M420,120 L400,30" fill="none" stroke={C.warm} strokeWidth="3"/>
        <text x="430" y="80" fill={C.warm} fontSize="9" fontWeight="600" fontFamily="monospace">RAMP</text>
        <text x="430" y="92" fill={C.cap} fontSize="8" fontFamily="'Cormorant Garamond',serif">Interior access</text>
        {/* Ground level */}
        <line x1="0" y1="260" x2="600" y2="260" stroke={C.textL} strokeWidth="1.5"/>
        <text x="610" y="264" fill={C.textL} fontSize="8" fontFamily="monospace">Ground</text>
        {/* Ditch */}
        <path d="M0,260 L0,290 Q100,310 200,290 L200,260" fill={C.sea} opacity=".1" stroke={C.sea} strokeWidth="1.5"/>
        <text x="100" y="285" textAnchor="middle" fill={C.sea} fontSize="8" fontFamily="monospace">DITCH</text>
        {/* Height annotations */}
        <line x1="180" y1="30" x2="180" y2="260" stroke={C.textL} strokeWidth=".8" strokeDasharray="3,2"/>
        <text x="172" y="150" fill={C.textL} fontSize="8" fontFamily="monospace" textAnchor="end" transform="rotate(-90,172,150)">Full height</text>
        {/* Fire line showing elevation advantage */}
        <line x1="300" y1="25" x2="650" y2="80" stroke={C.blood} strokeWidth="1.5" strokeDasharray="6,3" opacity=".5"/>
        <text x="580" y="75" fill={C.blood} fontSize="8" fontFamily="monospace">Fire line →</text>
        <text x="580" y="87" fill={C.cap} fontSize="7" fontFamily="'Cormorant Garamond',serif">Plunging fire over</text>
        <text x="580" y="97" fill={C.cap} fontSize="7" fontFamily="'Cormorant Garamond',serif">main parapet</text>
      </g>
      <text x="410" y="365" textAnchor="middle" fill={C.cap} fontSize="9" fontStyle="italic" fontFamily="'Cormorant Garamond',serif">The cavalier's elevation allowed defenders to fire over the main fort walls, commanding both harbours and the approaches from Mount Sciberras. Now houses the immersive heritage show (€15.5M restoration, Heritage Malta).</text>
    </svg>
  );
}

// ─── Siege timeline ─────────────────────────────────────────────────────
function SiegeSVG(){
  const evts=[
    {d:"18 May",ev:"Ottoman fleet arrives\nMarsaxlokk Bay",col:C.sea},
    {d:"24 May",ev:"Bombardment of\nSt Elmo begins",col:C.blood},
    {d:"3 Jun",ev:"First assault\nrepulsed",col:C.blood},
    {d:"10 Jun",ev:"Ravelin falls to\nOttomans",col:C.warm},
    {d:"18 Jun",ev:"DRAGUT KILLED\nby parapet fragment",col:C.blood},
    {d:"23 Jun",ev:"Fort St Elmo falls\n1,500+ knights/soldiers dead",col:C.deep},
    {d:"Jul-Aug",ev:"Siege of Birgu &\nSenglea continues",col:C.sea},
    {d:"8 Sep",ev:"Gran Soccorso arrives\nOttomans retreat",col:C.honey},
  ];
  const w=820,pad=60,sp=(w-pad*2)/(evts.length-1);
  return(
    <svg viewBox={`0 0 ${w} 220`} style={{width:"100%",display:"block",background:C.stone}}>
      <text x={w/2} y="20" textAnchor="middle" fill={C.text} fontSize="13" fontWeight="600" fontFamily="'Cormorant Garamond',serif" letterSpacing="2">THE GREAT SIEGE — FORT ST ELMO PHASE, 1565</text>
      <line x1={pad} y1={110} x2={w-pad} y2={110} stroke={C.honey} strokeWidth="2"/>
      {evts.map((e,i)=>{
        const x=pad+i*sp,above=i%2===0;
        return (<g key={i}>
          <circle cx={x} cy={110} r="5" fill={e.col}/>
          <line x1={x} y1={110} x2={x} y2={above?60:155} stroke={e.col} strokeWidth="1" opacity=".5"/>
          <text x={x} y={above?50:170} textAnchor="middle" fill={C.text} fontSize="9" fontWeight="700" fontFamily="monospace">{e.d}</text>
          {e.ev.split("\n").map((l,j)=>(
            <text key={j} x={x} y={(above?50:170)+13+j*11} textAnchor="middle" fill={C.textL} fontSize="8" fontFamily="'Cormorant Garamond',serif">{l}</text>
          ))}
        </g>);
      })}
      <text x={w/2} y="210" textAnchor="middle" fill={C.cap} fontSize="9" fontStyle="italic" fontFamily="'Cormorant Garamond',serif">28 days: the fort was expected to fall in 3. Ottoman losses at St Elmo: ~8,000. "If the child cost us so dear, what will the parent cost?" — Mustafa Pasha</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN ARTICLE
   ═══════════════════════════════════════════════════════════════ */
export default function App(){
  const [ok,setOk]=useState(false);
  useEffect(()=>{setTimeout(()=>setOk(true),80)},[]);

  const SB=()=><div style={{textAlign:"center",margin:"36px 0",color:C.honey,fontSize:"16px",letterSpacing:"10px"}}>❧</div>;
  const Fig=({children,caption})=>(<div style={{margin:"45px -22px"}}>{children}<div style={{fontSize:"12px",color:C.cap,lineHeight:1.55,padding:"10px 22px 0",fontStyle:"italic",borderTop:`1px solid ${C.stoneD}`}}>{caption}</div></div>);
  const Side=({title,children})=>(<div style={{background:C.stoneD,borderLeft:`3px solid ${C.honey}`,padding:"22px 26px",margin:"38px 0"}}><h4 style={{fontFamily:"'Playfair Display',serif",fontSize:"14px",fontWeight:700,color:C.warm,marginBottom:"10px",letterSpacing:"1px",textTransform:"uppercase"}}>{title}</h4>{children}</div>);
  const sp={fontSize:"15px",lineHeight:1.62,marginBottom:".7em"};

  return(<>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&display=swap');
      *{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}
      .ng{font-family:'Cormorant Garamond','Georgia',serif;color:${C.text};background:${C.stone};overflow-x:hidden}
      .ng p{font-size:18.5px;line-height:1.78;margin-bottom:1.35em;font-weight:400;letter-spacing:.01em}
      .lead::first-letter{font-family:'Playfair Display',serif;font-size:4.2em;float:left;line-height:.8;margin-right:.06em;margin-top:.05em;color:${C.blood}}
      .hw{position:relative}
      .ho{position:absolute;bottom:0;left:0;right:0;padding:44px 7% 30px;background:linear-gradient(transparent,rgba(10,8,5,.92))}
      .hl{font-family:'Playfair Display',serif;font-weight:900;font-size:clamp(26px,4.8vw,54px);color:#fff;line-height:1.06;letter-spacing:-.02em;margin-bottom:10px}
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

      <div className="hw">
        <HeroSVG/>
        <div className="ho">
          <div className="yb"/>
          <div style={{fontFamily:"monospace",fontSize:"9px",color:C.honeyL,letterSpacing:"2px",marginBottom:"8px",textTransform:"uppercase"}}>Mode: NatGeo Classic | Format: Standard Feature</div>
          <h1 className="hl">The Gun Platform Above the Sea</h1>
          <p className="dk">At the tip of the Sciberras Peninsula, the cavalier of Fort St Elmo rises above the star fort that held off 40,000 Ottoman troops for twenty-eight days in 1565. Its elevated gun platform changed the geometry of the siege — and killed the greatest corsair of the sixteenth century.</p>
        </div>
      </div>

      <div className="pw">

        <p className="lead">The cannonball that killed Turgut Reis — known to Christian Europe as Dragut, the Sword of Islam, the finest corsair-admiral of the Ottoman Empire — did not come from a cannon aimed at him. On 18 June 1565, during the bombardment of Fort St Elmo at the tip of Malta's Sciberras Peninsula, a shot from the Christian batteries at Fort St Angelo, across the Grand Harbour, struck the top of a stone parapet near where the seventy-year-old admiral was observing the siege. The impact sent a spray of limestone fragments into Dragut's face and skull. He fell behind the battery, was carried to his tent on the heights of Mount Sciberras, and lingered for five days, dying on 23 June — the same day the fort he had been trying to reduce finally fell. The parapet that killed him was globigerina limestone, the same honey-coloured building stone that constitutes every wall, every bastion, every cavalier on the island. It is soft when quarried and hardens with exposure to air. A fragment of it, propelled by a cannonball's energy, ended a career that had terrorised the Mediterranean for four decades.</p>

        <p>The fort Dragut died trying to take was, by the standards of sixteenth-century military engineering, modest. Pietro Pardo — a Spanish engineer sometimes recorded as Prato — designed it in 1552 as a star fort with two demi-bastions, two flanks, and two faces, replacing a watchtower that had stood on Saint Elmo Point since 1488 and an Aragonese fortification before that. The catalyst was the Ottoman raid of 1551, when Dragut's fleet had sailed into Marsamxett Harbour entirely unopposed — an intelligence failure that made the need for harbour defence unarguable. Pardo's fort was built in the remarkably short period of six months under the supervision of Knight Fra Leone Strozzi. By the time the Ottomans returned in May 1565, the fort had acquired three additional elements that would prove decisive: a covertway, a tenaille, and a cavalier — a raised gun platform built above the main fort level, designed to allow defenders to fire over the main walls with fields of fire commanding both harbours and the landward approach from Mount Sciberras.</p>

        <Fig caption={<><strong>The star at the tip.</strong> Annotated plan of Fort St Elmo in its 1565 configuration, showing the cavalier at the centre, the two demi-bastions, the hastily built ravelin, and the ditch. The fort sits at the tip of the Sciberras Peninsula, commanding the entrances to both Grand Harbour and Marsamxett Harbour. Ottoman batteries on Mount Sciberras — thirty-six or more guns — fired downward into the fort. The × marks the approximate location where a parapet fragment killed Dragut on 18 June.</>}><PlanSVG/></Fig>

        <p>The cavalier was, in engineering terms, the fort's backbone. A raised rectangular platform set within the star-shaped perimeter, it elevated the fort's heaviest guns above the main parapet line, creating what military engineers call plunging fire — the ability to shoot down at attackers who had reached the walls, and outward over the main battlements toward approaching ships or siege batteries. The platform was accessed by an interior ramp from the parade ground below. Its parapet was crenellated with embrasures — rectangular openings through which cannon barrels projected. The vaulted interior beneath the gun platform served as a bombproof magazine and shelter. In a fort that Ottoman military engineers had estimated would fall in three days, the cavalier extended the defence to twenty-eight — a miscalculation that cost the besiegers approximately eight thousand dead and the life of their most capable commander.</p>

        <Fig caption={<><strong>The elevation advantage.</strong> Cross-section showing the cavalier's raised gun platform above the main fort level. The parapet's embrasures allowed plunging fire over the main walls, commanding both harbours. The ramp provided interior access for resupply under cover. The vaulted interior beneath the platform now houses Heritage Malta's immersive heritage experience, following a €15.5M restoration.</>}><SectionSVG/></Fig>

        <div className="pq">"If the child cost us so dear, what will the parent cost?"<br/><span style={{fontSize:"13px",fontWeight:400,fontStyle:"normal",color:C.cap}}>— Mustafa Pasha, surveying the Ottoman dead after the fall of Fort St Elmo, 23 June 1565. The "parent" was Fort St Angelo, across the harbour.</span></div>

        <Side title="Sidebar: The 28 Days">
          <p style={sp}>The initial garrison of Fort St Elmo numbered approximately 150 knights and 600 soldiers, the majority Spanish, along with sixty armed galley slaves. Reinforcements crossed the Grand Harbour by boat from Birgu at night — a crossing of roughly 800 metres under sporadic Ottoman fire. The bombardment from Mount Sciberras, which overlooked the fort, was devastating: thirty-six or more guns firing downward into a position that could not be defiladed. Francisco Balbi di Correggio, a Spanish soldier who survived the Great Siege and published his account in 1568, recorded that the Ottoman engineers had expected the fort to fall in three to five days. It held for twenty-eight. The ravelin — hastily built in the months before the siege and described by some historians as little more than earth and fascines — fell first, on approximately 10 June. The main fort followed on 23 June. No defending knights survived. Nine Maltese soldiers escaped by swimming across to Fort St Angelo. The Ottoman losses at St Elmo alone were staggering: estimates range from 6,000 to 8,000 dead, including Dragut and several other senior commanders.</p>
        </Side>

        <Fig caption={<><strong>Twenty-eight days.</strong> The siege timeline from the Ottoman fleet's arrival on 18 May to the relief force's landing on 8 September. The Fort St Elmo phase — 18 May to 23 June — was expected to last three days. It consumed a month, roughly 8,000 Ottoman lives, and the career of Dragut. The delay allowed Birgu and Senglea to prepare for the next phase and bought time for the Gran Soccorso from Sicily.</>}><SiegeSVG/></Fig>

        <SB/>

        <p>After the siege, Grand Master Jean de la Valette — who at seventy years old had commanded the defence from Fort St Angelo and personally led counterattacks — decided to build a new city on the Sciberras Peninsula itself, denying any future attacker the high ground that had made Fort St Elmo so vulnerable to Ottoman batteries. Construction began in 1566. Pope Pius IV sent his military architect, Francesco Laparelli, to design the fortifications. Laparelli's critical report on the ruined Fort St Elmo, prepared immediately after the siege, is one of the few documentary sources for the original 1552 configuration — because he then proceeded to rebuild it, incorporating the remains into the new city walls. The cavalier was reconstructed. Over the following centuries, the fort was modified repeatedly: the Vendôme Bastion was added in 1614, the Carafa Enceinte encircled the entire foreshore in 1687, and British engineers in the nineteenth century added musketry parapets and converted the polverista to an armoury. Very few elements of the present structure can be securely dated to 1565.</p>

        <p>The fort's twentieth-century life was no less violent than its sixteenth. On 11 June 1940, Fort St Elmo suffered the first aerial bombardment of Malta in the Second World War — the opening salvo of a campaign that would deliver 3,340 air raids and approximately 15,000 tons of bombs on the island between 1940 and 1943, earning Malta's population the George Cross. The cavalier, with its vaulted bombproof interior, served once again as a shelter — a function its sixteenth-century builders would have recognised instantly. In 2015, a €15.5 million restoration project, implemented by the Grand Harbour Regeneration Corporation in collaboration with Heritage Malta and funded eighty-five per cent by the European Regional Development Fund, transformed the fort into a museum. Archaeological excavations during the restoration uncovered elements of the original pre-1565 fort — an important find, given that most of the original structure had been buried by centuries of modification. The cavalier's vaulted interior now houses an immersive heritage show: projectors throw computer-generated seas and explosions onto the curved walls while holographic actors deliver the historical narrative.</p>

        <Side title="Sidebar: Globigerina Limestone">
          <p style={sp}>The building material of Fort St Elmo — and virtually every historic structure on Malta — is globigerina limestone, a Miocene-age marine sedimentary rock composed largely of the fossilised shells of foraminifera (genus Globigerina). It occurs in three geological formations across the Maltese islands: Lower, Middle, and Upper Globigerina Limestone. The Lower formation, the most widely quarried, is soft enough when freshly cut to be shaped with hand tools — a property that allowed the rapid construction of the 1552 fort in six months. Upon exposure to air, the calcium carbonate matrix hardens through a process of desiccation and recrystallisation, producing the characteristic honey-gold surface that gives Valletta its visual identity. During the Great Siege, this property had an unintended defensive benefit: the stone's relative softness absorbed some of the kinetic energy of cannonballs, reducing fragmentation compared to harder masonry. The fragment that killed Dragut was an exception — struck at an angle that produced shrapnel rather than absorption.</p>
        </Side>

        <SB/>

        <p>The cavalier of Fort St Elmo has, across nearly five centuries, served as a gun platform, a bombproof shelter, a barracks, a storage facility, an armoury, a film set — parts of the 1978 film Midnight Express were shot in Lower St Elmo — and now a museum with holographic projections. Each incarnation has altered the physical fabric, layering modification upon modification until the 1552 original exists only as a footprint beneath subsequent construction and a few laconic entries in the Order's records. Matteo Perez d'Aleccio's painted frescoes of the siege, executed in the Grandmaster's Palace in Valletta in the 1570s, offer the most vivid visual record of the fort as it appeared during the battle — but they are artistic representations, not engineering drawings, and their accuracy is debated.</p>

        <p>What the cavalier demonstrates, across all its incarnations, is a principle that military architects understood and that the Ottomans learned at a cost of eight thousand lives: in fortification, height is time. A gun platform raised above the main walls extends the defensive envelope outward, forces attackers to deal with two vertical planes rather than one, and converts every approach into a killing ground. Dragut understood this — which is why he insisted on reducing St Elmo before attempting the main harbours. Mustafa Pasha understood it in retrospect, standing among the dead on 23 June and asking what the parent would cost if the child had cost so much. La Valette understood it when he built Valletta on the high ground of the peninsula itself, ensuring that no future besieging army would have the advantage of elevation. The cavalier is, in the end, a stone argument about the geometry of violence — a structure that exists because someone calculated that ten additional metres of elevation would translate into ten additional days of survival, and was right.</p>

        <p>The limestone has weathered from gold to brown over nearly five centuries, the iron-stained surface darkening where rainwater runs. The embrasures are empty now; the cannon are in museums. Tourists enter through the restored gateway, descend into the vaulted cavalier, and watch projected explosions on walls that absorbed real ones. The Grand Harbour spreads below, exactly as it spread below the defenders who died here in June 1565, exactly as it spread below the anti-aircraft gunners who died here in 1941. The cavalier still commands its two harbours. No longer with cannon. But with a line of sight that has not changed in five hundred years, and a question — asked by Mustafa Pasha in the rubble, and still unanswered by anyone who climbs to the parapet and looks out — about what any fortress is truly worth, and what it costs to hold it.</p>

      </div>

      {/* ═══ SOURCE INTEGRITY NOTE ═══ */}
      <div className="sn">
        <h3>Source Integrity Note</h3>
        <div className="ss"><div className="st">Claims Requiring Verification</div>
          <ul>
            <li>Ottoman losses at St Elmo (6,000–8,000) — range varies by source; Balbi di Correggio's contemporary account is the primary but partisan source</li>
            <li>Dragut's death circumstances — the parapet-fragment account is consistent across sources but precise location debated</li>
            <li>Three-day Ottoman estimate for St Elmo's fall — widely cited but attribution to specific Ottoman engineer unclear</li>
            <li>Fort built in six months (1552) — Heritage Malta and Wikipedia consistent; original Order records needed for confirmation</li>
          </ul>
        </div>
        <div className="ss"><div className="st">Principal Sources</div>
          <ul>
            <li>Wikipedia: "Fort Saint Elmo"; "Great Siege of Malta" (accessed April 2026)</li>
            <li>Heritage Malta: "Fort St Elmo and the National War Museum" — official site description and restoration details</li>
            <li>Vassallo History (vassallohistory.wordpress.com): Fortifications analysis — original fort elements, Laparelli's rebuilding</li>
            <li>Balbi di Correggio, Francisco (1568). Contemporary account of the Great Siege — primary source for garrison numbers and battle sequence</li>
            <li>Sarner (heritage design): Fort St Elmo restoration — €15.5M project details, cavalier immersive show</li>
            <li>Spiteri, S.C.: Various works on Maltese fortifications</li>
          </ul>
        </div>
        <div className="ss"><div className="st">Fieldwork Requiring Access</div>
          <ul>
            <li>Fort St Elmo cavalier interior — Heritage Malta; museum hours apply</li>
            <li>Lower St Elmo — largely abandoned; access difficult; restoration plans stalled</li>
            <li>Grandmaster's Palace — d'Aleccio frescoes depicting the 1565 siege</li>
            <li>Simancas Archives (Spain) — original 1552 fort plans attributed to Pietro Pardo</li>
          </ul>
        </div>
        <div className="ss"><div className="st">Voices to Add</div>
          <ul>
            <li>Heritage Malta conservators — archaeological discoveries during 2015 restoration</li>
            <li>Maltese military historians (Stephen Spiteri et al.) — 1552 vs. present fort identification</li>
            <li>Ottoman/Turkish historians — perspective on the siege from the attacking side</li>
            <li>Geological Survey of Malta — globigerina limestone properties and conservation challenges</li>
          </ul>
        </div>
      </div>

      <div className="ft">
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:"13px",fontWeight:700,color:C.honey,letterSpacing:"3px",textTransform:"uppercase"}}>National Geographic</div>
        <div style={{fontSize:"10px",color:C.honeyL,opacity:.5,marginTop:"5px"}}>History · Architecture · Malta</div>
      </div>
    </div>
  </>);
}
