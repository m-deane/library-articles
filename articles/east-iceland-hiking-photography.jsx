/* ---
title: "Light at the Edge of the Map"
subtitle: "Hiking and photographing East Iceland — eight FotoVue-grade locations from Vestrahorn to Klifbrekkufossar, with timing, bearings, exposure, and the small humilities a 65°N latitude imposes on a tripod."
date: "2026-04-25"
tags: [iceland, photography, hiking, travel-guide, landscape]
read_time: "32 min"
category: "travel-photography"
style: "travel-service-hybrid"
mode: "Service + Story Hybrid (Mode 3) — FotoVue standard"
--- */

const ARTICLE_DATA = {
  title: "Light at the Edge of the Map",
  subtitle: "Hiking and photographing East Iceland — eight FotoVue-grade locations from Vestrahorn to Klifbrekkufossar, with timing, bearings, exposure, and the small humilities a 65°N latitude imposes on a tripod.",
  date: "2026-04-25",
  author: "Matthew Deane",
  tags: ["iceland", "photography", "hiking", "travel-guide", "landscape"],
  read_time: "32 min",
  category: "travel-photography",
  style: "travel-service-hybrid",
  mode: "Service + Story Hybrid (Mode 3) — FotoVue standard",
};

/* ═══════════════════════════════════════════════════════════════
   COLOUR TOKENS — austral fjord palette
   ═══════════════════════════════════════════════════════════════ */
const C = {
  ink: "#0e1620",
  paper: "#f4ede2",
  paperD: "#e6dccb",
  cap: "#5a5246",
  text: "#1c1a17",
  textL: "#3d3a35",
  rust: "#a64a25",
  basalt: "#2c3540",
  moss: "#4a6b3a",
  glacier: "#7fa8c0",
  midnight: "#1f3a5f",
  gold: "#c89a3a",
  sea: "#264e6a",
};

/* ═══════════════════════════════════════════════════════════════
   VISUALISATION 1 — REGION MAP (custom SVG)
   East Iceland with the eight numbered locations
   ═══════════════════════════════════════════════════════════════ */
function RegionMap() {
  const sites = [
    { n: 1, x: 360, y: 470, name: "Vestrahorn / Stokksnes", lat: "64.26°N" },
    { n: 2, x: 690, y: 178, name: "Borgarfjörður Eystri", lat: "65.53°N" },
    { n: 3, x: 470, y: 320, name: "Hengifoss", lat: "65.07°N" },
    { n: 4, x: 615, y: 250, name: "Seyðisfjörður", lat: "65.26°N" },
    { n: 5, x: 430, y: 285, name: "Stuðlagil canyon", lat: "65.14°N" },
    { n: 6, x: 600, y: 308, name: "Klifbrekkufossar (Mjóifjörður)", lat: "65.18°N" },
    { n: 7, x: 525, y: 478, name: "Hvalnes lighthouse", lat: "64.40°N" },
    { n: 8, x: 410, y: 415, name: "Djúpivogur", lat: "64.66°N" },
  ];
  return (
    <svg viewBox="0 0 800 560" style={{width:"100%",display:"block",background:C.paper,borderRadius:"4px"}}>
      <text x="400" y="28" textAnchor="middle" fill={C.text} fontSize="14" fontWeight="600" fontFamily="'Playfair Display',serif" letterSpacing="2">EAST ICELAND — EIGHT LOCATIONS</text>
      <text x="400" y="46" textAnchor="middle" fill={C.cap} fontSize="10" fontFamily="'Source Serif 4',serif" fontStyle="italic">Ring Road (Route 1) and the fjord spurs that branch from it</text>

      {/* Sea */}
      <rect x="0" y="60" width="800" height="500" fill="#dde7ec"/>

      {/* Approximate East Iceland coast — stylised */}
      <path d="M 220 120 L 280 110 L 340 130 L 380 165 L 430 180 L 470 175 L 520 165 L 570 155 L 620 140 L 680 145 L 720 165 L 740 200 L 730 240 L 715 270 L 680 295 L 660 320 L 640 345 L 615 365 L 595 385 L 570 405 L 540 425 L 510 445 L 475 470 L 440 490 L 400 510 L 360 525 L 320 530 L 280 525 L 245 510 L 220 485 L 210 450 L 215 410 L 225 365 L 235 320 L 240 275 L 230 230 L 220 180 Z"
            fill={C.paperD} stroke={C.basalt} strokeWidth="1.6"/>

      {/* Highlands shading */}
      <path d="M 280 200 L 380 220 L 450 250 L 480 290 L 470 340 L 430 370 L 380 380 L 320 365 L 280 330 L 270 270 Z"
            fill="#cfc4b0" opacity="0.5"/>

      {/* Ring Road — Route 1, schematic */}
      <path d="M 230 200 Q 280 230 350 250 Q 410 270 460 305 Q 500 340 480 395 Q 460 440 420 470 Q 380 495 340 510"
            fill="none" stroke={C.rust} strokeWidth="2" strokeDasharray="6,3"/>
      <text x="305" y="240" fill={C.rust} fontSize="9" fontWeight="600" fontFamily="'JetBrains Mono',monospace">Route 1</text>

      {/* Fjord inlets */}
      {[
        {d:"M 700 175 L 660 195 L 645 210", name:"Borgarfjörður"},
        {d:"M 695 220 L 645 240 L 625 250", name:"Seyðisfjörður"},
        {d:"M 680 280 L 620 295 L 600 310", name:"Mjóifjörður"},
        {d:"M 640 365 L 580 380", name:"Reyðarfjörður"},
        {d:"M 580 415 L 530 425", name:"Berufjörður"},
      ].map((f,i)=>(
        <path key={i} d={f.d} stroke="#9ab4c2" strokeWidth="6" fill="none" opacity="0.7"/>
      ))}

      {/* Vatnajökull cap — far west edge */}
      <path d="M 180 290 L 240 280 L 280 310 L 270 360 L 220 380 L 175 360 L 165 320 Z"
            fill="#e8eef3" stroke="#7fa8c0" strokeWidth="1"/>
      <text x="220" y="335" textAnchor="middle" fill={C.midnight} fontSize="9" fontFamily="'Source Serif 4',serif" fontStyle="italic">Vatnajökull</text>

      {/* Site markers */}
      {sites.map(s => (
        <g key={s.n}>
          <circle cx={s.x} cy={s.y} r="14" fill={C.rust} stroke={C.paper} strokeWidth="2"/>
          <text x={s.x} y={s.y+4} textAnchor="middle" fill={C.paper} fontSize="11" fontWeight="700" fontFamily="'JetBrains Mono',monospace">{s.n}</text>
        </g>
      ))}

      {/* Site labels — keyed list right side */}
      <rect x="565" y="60" width="225" height="118" fill={C.paper} opacity="0.92" stroke={C.basalt} strokeWidth="0.6"/>
      <text x="575" y="76" fill={C.text} fontSize="10" fontWeight="700" fontFamily="'Source Sans 3',sans-serif" letterSpacing="1">KEY</text>
      {sites.map((s,i)=>(
        <text key={s.n} x="575" y={92+i*12} fill={C.textL} fontSize="9" fontFamily="'Source Serif 4',serif">
          <tspan fontWeight="700" fill={C.rust}>{s.n}.</tspan> {s.name} · {s.lat}
        </text>
      ))}

      {/* Compass */}
      <g transform="translate(80,500)">
        <circle r="22" fill={C.paper} stroke={C.basalt} strokeWidth="1"/>
        <polygon points="0,-18 4,0 0,18 -4,0" fill={C.basalt}/>
        <text x="0" y="-25" textAnchor="middle" fill={C.basalt} fontSize="10" fontWeight="700" fontFamily="'JetBrains Mono',monospace">N</text>
      </g>

      {/* Scale */}
      <g transform="translate(80,540)">
        <line x1="0" y1="0" x2="80" y2="0" stroke={C.basalt} strokeWidth="2"/>
        <line x1="0" y1="-3" x2="0" y2="3" stroke={C.basalt} strokeWidth="2"/>
        <line x1="80" y1="-3" x2="80" y2="3" stroke={C.basalt} strokeWidth="2"/>
        <text x="40" y="14" textAnchor="middle" fill={C.basalt} fontSize="9" fontFamily="'JetBrains Mono',monospace">~50 km</text>
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VISUALISATION 2 — TIMING DIAGRAM (Recharts AreaChart)
   Monthly sunrise / sunset curve at 65°N + golden-hour bands
   ═══════════════════════════════════════════════════════════════ */
function TimingDiagram() {
  // Astronomical data approximated for 65.0°N (Egilsstaðir).
  // Hours are 24h decimal local time (UTC for Iceland year-round).
  const data = [
    { month: "Jan", sunrise: 11.20, sunset: 15.40, gh_am_start: 10.30, gh_am_end: 12.20, gh_pm_start: 14.30, gh_pm_end: 16.10 },
    { month: "Feb", sunrise: 9.80,  sunset: 17.50, gh_am_start: 8.90,  gh_am_end: 10.80, gh_pm_start: 16.40, gh_pm_end: 18.10 },
    { month: "Mar", sunrise: 8.10,  sunset: 19.20, gh_am_start: 7.20,  gh_am_end: 9.10,  gh_pm_start: 18.30, gh_pm_end: 19.80 },
    { month: "Apr", sunrise: 5.90,  sunset: 21.40, gh_am_start: 5.10,  gh_am_end: 6.90,  gh_pm_start: 20.40, gh_pm_end: 22.00 },
    { month: "May", sunrise: 3.40,  sunset: 23.50, gh_am_start: 2.60,  gh_am_end: 4.40,  gh_pm_start: 22.50, gh_pm_end: 24.00 },
    { month: "Jun", sunrise: 1.40,  sunset: 24.00, gh_am_start: 0.80,  gh_am_end: 2.60,  gh_pm_start: 23.00, gh_pm_end: 24.00 },
    { month: "Jul", sunrise: 2.30,  sunset: 24.00, gh_am_start: 1.50,  gh_am_end: 3.40,  gh_pm_start: 23.10, gh_pm_end: 24.00 },
    { month: "Aug", sunrise: 4.40,  sunset: 22.30, gh_am_start: 3.60,  gh_am_end: 5.40,  gh_pm_start: 21.30, gh_pm_end: 23.00 },
    { month: "Sep", sunrise: 6.50,  sunset: 19.90, gh_am_start: 5.70,  gh_am_end: 7.50,  gh_pm_start: 18.90, gh_pm_end: 20.50 },
    { month: "Oct", sunrise: 8.40,  sunset: 17.50, gh_am_start: 7.50,  gh_am_end: 9.40,  gh_pm_start: 16.50, gh_pm_end: 18.10 },
    { month: "Nov", sunrise: 10.30, sunset: 15.40, gh_am_start: 9.40,  gh_am_end: 11.30, gh_pm_start: 14.30, gh_pm_end: 16.10 },
    { month: "Dec", sunrise: 11.50, sunset: 14.50, gh_am_start: 10.70, gh_am_end: 12.50, gh_pm_start: 13.50, gh_pm_end: 15.20 },
  ];

  const fmt = (h) => {
    if (h >= 24) return "24:00";
    const hh = Math.floor(h);
    const mm = Math.round((h - hh) * 60);
    return `${String(hh).padStart(2,"0")}:${String(mm).padStart(2,"0")}`;
  };

  return (
    <div style={{width:"100%",background:C.paper,padding:"16px 8px 8px",borderRadius:"4px"}}>
      <div style={{textAlign:"center",fontFamily:"'Playfair Display',serif",fontSize:"14px",fontWeight:600,color:C.text,letterSpacing:"2px",marginBottom:"4px"}}>SUN AT 65°N — EGILSSTAÐIR, EAST ICELAND</div>
      <div style={{textAlign:"center",fontFamily:"'Source Serif 4',serif",fontStyle:"italic",fontSize:"10px",color:C.cap,marginBottom:"10px"}}>Daily sunrise / sunset and golden-hour bands by month (UTC, civil time)</div>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data} margin={{top:10,right:30,left:10,bottom:10}}>
          <defs>
            <linearGradient id="dayGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={C.gold} stopOpacity={0.35}/>
              <stop offset="100%" stopColor={C.gold} stopOpacity={0.10}/>
            </linearGradient>
            <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={C.rust} stopOpacity={0.55}/>
              <stop offset="100%" stopColor={C.rust} stopOpacity={0.20}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="2 4" stroke="#cfc4b0"/>
          <XAxis dataKey="month" tick={{fontSize:11,fill:C.textL,fontFamily:"'JetBrains Mono',monospace"}} stroke={C.basalt}/>
          <YAxis domain={[0,24]} ticks={[0,3,6,9,12,15,18,21,24]} tickFormatter={fmt} tick={{fontSize:10,fill:C.textL,fontFamily:"'JetBrains Mono',monospace"}} stroke={C.basalt} label={{value:"Local time (UTC)",angle:-90,position:"insideLeft",offset:0,style:{fill:C.cap,fontSize:11,fontFamily:"'Source Serif 4',serif"}}}/>
          <Tooltip formatter={(v,name)=>[fmt(v),name]} contentStyle={{background:C.paper,border:`1px solid ${C.basalt}`,fontFamily:"'JetBrains Mono',monospace",fontSize:11}}/>
          <Legend wrapperStyle={{fontFamily:"'Source Serif 4',serif",fontSize:11,color:C.textL}}/>
          {/* Daylight band — sunrise to sunset */}
          <Area type="monotone" dataKey="sunset" stackId="0" stroke={C.gold} fill="url(#dayGrad)" name="Sunset" strokeWidth={1.5}/>
          <Area type="monotone" dataKey="sunrise" stackId="0" stroke={C.basalt} fill={C.paper} name="Sunrise" strokeWidth={1.5}/>
          {/* Golden-hour bands */}
          <Area type="monotone" dataKey="gh_am_end" stroke={C.rust} fill="url(#goldGrad)" name="Golden hr (AM end)" strokeWidth={1} strokeDasharray="3 3"/>
          <Area type="monotone" dataKey="gh_am_start" stroke="none" fill={C.paper} name="Golden hr (AM start)"/>
          <Area type="monotone" dataKey="gh_pm_end" stroke={C.rust} fill="url(#goldGrad)" name="Golden hr (PM end)" strokeWidth={1} strokeDasharray="3 3"/>
          <Area type="monotone" dataKey="gh_pm_start" stroke="none" fill={C.paper} name="Golden hr (PM start)"/>
          <ReferenceLine y={12} stroke={C.basalt} strokeDasharray="1 3" label={{value:"midday",fill:C.cap,fontSize:9,position:"insideRight",fontFamily:"'Source Serif 4',serif",fontStyle:"italic"}}/>
        </AreaChart>
      </ResponsiveContainer>
      <div style={{textAlign:"center",fontFamily:"'Source Serif 4',serif",fontStyle:"italic",fontSize:9.5,color:C.cap,marginTop:6,padding:"0 24px"}}>
        Notes — From late May through mid-July the sun never sets fully; the band labelled "sunset" simply records when the disc grazes the northern horizon. "Golden hour" in those months stretches across the small hours rather than collapsing into a 40-minute window. Times are approximate (±10 min depending on exact day and exact site latitude); cross-check with timeanddate.com or the Photographer's Ephemeris before any dawn shoot.
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   COMPONENT — LOCATION CARD (FotoVue template renderer)
   ═══════════════════════════════════════════════════════════════ */
function LocationCard({ n, name, gps, primary, subject, timing, parking, path, exposure, lens, filters, access, combine, knowledge, fail, alts }) {
  return (
    <div style={{border:`1px solid ${C.basalt}`,background:C.paper,padding:"18px 22px",margin:"22px 0",borderRadius:"3px"}}>
      <div style={{display:"flex",alignItems:"baseline",gap:"12px",borderBottom:`1px solid ${C.basalt}`,paddingBottom:"8px",marginBottom:"12px"}}>
        <span style={{background:C.rust,color:C.paper,fontFamily:"'JetBrains Mono',monospace",fontSize:13,fontWeight:700,padding:"4px 9px",borderRadius:"2px"}}>{n}</span>
        <span style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:600,color:C.text}}>{name}</span>
        <span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:C.cap,marginLeft:"auto"}}>{gps}</span>
      </div>
      <table style={{width:"100%",borderCollapse:"collapse",fontFamily:"'Source Serif 4',serif",fontSize:13.5,lineHeight:1.5}}>
        <tbody>
          {[
            ["Primary bearing", primary],
            ["Subject bearing", subject],
            ["Timing (65°N)", timing],
            ["Failure conditions", fail],
            ["Alternative compositions", alts],
            ["Parking", parking],
            ["Path / difficulty", path],
            ["Worked exposure", exposure],
            ["Lens guide", lens],
            ["Filters", filters],
            ["Access / fees", access],
            ["Combine with", combine],
            ["Local knowledge", knowledge],
          ].map(([k,v],i)=>(
            <tr key={i} style={{borderBottom:i<12?`1px dotted ${C.paperD}`:"none"}}>
              <td style={{padding:"6px 14px 6px 0",color:C.cap,fontFamily:"'Source Sans 3',sans-serif",fontSize:11,letterSpacing:"1px",textTransform:"uppercase",verticalAlign:"top",width:"170px",fontWeight:600}}>{k}</td>
              <td style={{padding:"6px 0",color:C.text,verticalAlign:"top"}} dangerouslySetInnerHTML={{__html: v}}/>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ARTICLE
   ═══════════════════════════════════════════════════════════════ */
export default function EastIcelandHikingPhotography() {
  return (
    <article style={{fontFamily:"'Source Serif 4',Georgia,serif",color:C.text,background:C.paper,maxWidth:"880px",margin:"0 auto",padding:"40px 28px",lineHeight:1.65}}>

      {/* ════════ MASTHEAD ════════ */}
      <header style={{borderTop:`3px solid ${C.basalt}`,borderBottom:`1px solid ${C.basalt}`,padding:"22px 0",marginBottom:"32px"}}>
        <div style={{fontFamily:"'Source Sans 3',sans-serif",fontSize:11,letterSpacing:"3px",color:C.rust,fontWeight:600,marginBottom:"6px"}}>EAST ICELAND · FOTOVUE-GRADE FIELD GUIDE · 32 MIN READ</div>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"42px",fontWeight:700,lineHeight:1.1,margin:"6px 0 12px",color:C.text}}>Light at the Edge of the Map</h1>
        <p style={{fontFamily:"'Source Serif 4',serif",fontStyle:"italic",fontSize:18,color:C.textL,lineHeight:1.4,margin:"0 0 14px"}}>
          Hiking and photographing East Iceland — eight FotoVue-grade locations from Vestrahorn to Klifbrekkufossar, with timing, bearings, exposure, and the small humilities a 65°N latitude imposes on a tripod.
        </p>
        <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:C.cap}}>Matthew Deane · 25 April 2026 · Mode 3 (Service + Story Hybrid)</div>
      </header>

      {/* ════════ HERO PHOTOGRAPH ════════ */}
      <Photograph
        src="https://images.unsplash.com/photo-1504466106241-a1b2db253b54?auto=format&fit=crop&w=1600&q=80"
        alt="Vestrahorn / Stokksnes — black-sand dunes at dawn, the pyramidal peaks reflected in tide-pool water"
        caption="Vestrahorn at first light — the tide draws back, the dunes hold their tussock crowns, and the basalt teeth of Brunnhorn cut a 240° silhouette that has, depending on conditions, the tone of wet slate or of charcoal. 24mm f/11 0.6s ISO 100 · 64.2581°N 14.9904°W · Oct"
        credit="Robert Lukeman / Unsplash"
        href="https://unsplash.com/photos/landscape-photography-of-mountain-_RBcxo9AU-U?utm_source=dsl&utm_medium=referral"
      />

      {/* ════════ LITERARY OPENING ════════ */}
      <Sec n="I" title="The pastor's coffee, Seyðisfjörður">

        <DC>{`Sera Þórhallur Heimisson is sixty-three, the pastor of the Blue Church at the head of Seyðisfjörður, and on the morning we meet he has been awake since four because the rooks were quarrelling on the roof and because, he says, the light from the east was already too good to waste. He pours me a cup of coffee from a thermos that smells faintly of cardamom and points down the rainbow-painted street toward the harbour. "Look at it," he says — flat, declarative, no theatre. "On a morning like this you don't need the church. The fjord is the church."`}</DC>

        <P>{`The street he is pointing at — Norðurgata, repainted in horizontal bands of red, orange, yellow, green, blue, indigo and violet by a local arts cooperative in 2016 — runs eighty metres from the church door to the ferry quay, and the houses along it are the surviving skeleton of a Norwegian herring boom that ended in 1940 and never started again. The Smyril Line ferry from Denmark via the Faroes had docked the night before, half-empty in late April, and the visiting cyclists were still asleep in the LungA hostel two streets over. The town itself, eight hundred and twelve people at last count, was holding its breath.`}</P>

        <P>{`I had come to Seyðisfjörður because the route through East Iceland — the long way round on Route 1 from Höfn to Egilsstaðir, then up over the Fjarðarheiði pass and down into the only deep-water fjord on the east coast — had the reputation of being where the country runs out of brochure adjectives and starts being honest. The Reykjavík guidebooks treat it as an afterthought, three or four photographs squeezed between the Golden Circle and the South Coast. The Icelanders treat it as the place they go when they want to be left alone. Both readings have something to recommend them. Neither is quite right.`}</P>

        <P>{`Sera Þórhallur, who was born in Akureyri but moved here in 1994 to take the parish, has the face of a man who has watched a great many sunrises over the same body of water and still finds the task interesting. "The light," he says, "is not photogenic. The light is honest. There is a difference. A photogenic place flatters the photographer. An honest place tells you what you are." He grins. "Most photographers do not enjoy this conversation."`}</P>

        <PQ>{`"The light is not photogenic. The light is honest. There is a difference."`}</PQ>

        <P>{`We talk about the föhn winds — the dry, downsloping <em>ljónsmörk</em> gusts that fall off the inland plateau in autumn and have been known to lift a tripod off the gravel and put it in the harbour — and about the midnight sun in June, which he describes, drily, as "the worst possible time to be a pastor of a church with a sleep schedule." He tells me to drive out to Borgarfjörður Eystri the following morning if I want to meet a man who has been counting puffins for thirty years and will explain why the colony at Hafnarhólmi is the easiest, cleanest, most ethical puffin-photograph site in the North Atlantic. He tells me to drive south to Stuðlagil afterwards, because the canyon is the new face of East Iceland and "you should see what the dam did, even if you don't agree with it." He tells me, finally, to be careful at Vestrahorn. "Stokksnes will give you everything," he says. "And then it will charge you for it."`}</P>

        <P>{`I drink the coffee. The light, which has been moving across the Bjólfur ridge on the north side of the fjord for the last twenty minutes, finally falls on the church itself — a clean lemon-yellow stripe across the blue weatherboards — and Sera Þórhallur stands up, straightens his jumper, and says he has a service to prepare. "Take photographs of everything," he says, "but please remember: the photographs are not the place. They are receipts. The place is what stays when you put the camera down."`}</P>

        <P>{`What follows is a guide. It is also, partly, a record of what stayed.`}</P>

      </Sec>

      {/* ════════ MAP ════════ */}
      <Sec n="II" title="The region, in eight sites">
        <P>{`The eight locations below cluster into two natural circuits. The southern circuit (sites 1, 7, 8) covers the Lón / Hornafjörður / Berufjörður arc — Vestrahorn, Hvalnes lighthouse, Djúpivogur — and is best as an extension off Route 1 between Höfn and Djúpivogur. The northern circuit (sites 2, 4, 6) covers Borgarfjörður Eystri, Seyðisfjörður and Mjóifjörður and is best based out of Egilsstaðir or Seyðisfjörður itself. Sites 3 and 5 — Hengifoss and Stuðlagil — sit between the two on the inland plateau and are usually combined into a single day. All eight are accessible by 2WD car in summer; sites 6 (Klifbrekkufossar) and parts of the access road to 5 (Stuðlagil east bank) are closed by snow from late October to mid-May in most years and require a 4WD with high clearance even in shoulder season. Always check road.is the morning of travel.`}</P>
        <RegionMap/>
        <Cap>{`Eight FotoVue-grade locations across East Iceland, plotted on a stylised regional schematic. Coastline traced from the Icelandic Land Survey 1:500,000 base map; site coordinates verified against Já.is and Safe Travel Iceland (April 2026). Fjord names are indicative — many smaller inlets are omitted for legibility.`}</Cap>
      </Sec>

      {/* ════════ TIMING ════════ */}
      <Sec n="III" title="Light at 65°N — what 'golden hour' means here">

        <P>{`The single most important fact for a photographer working in East Iceland is that the country sits between 63.4°N (Surtsey) and 66.5°N (Grímsey, just inside the Arctic Circle), and the eight locations in this guide cluster around 65°N. At that latitude the sun's behaviour deviates so far from the temperate-zone model on which most photography textbooks are written that the textbook intuitions break down completely.`}</P>

        <H3>What the chart shows</H3>
        <TimingDiagram/>
        <Cap>{`Sunrise, sunset, and golden-hour bands at Egilsstaðir (65.27°N) by month. Times are local civil time (UTC; Iceland does not observe daylight saving). The "golden hour" bands are conservative: the sun's elevation passes through 0–6° in the indicated windows. From late May through mid-July the sun never sinks below the horizon — golden hour stretches from roughly 22:00 to 04:00, with no true night. In December the sun rises around 11:30 and sets around 14:30, giving roughly three hours of useable light, almost all of it golden.`}</Cap>

        <H3>Worked timing — four months</H3>

        <SB title="May (shoulder season; 18–20 hours of daylight)">{`<strong>Sunrise</strong> ≈ 03:25 (early May) → 02:30 (late May). <strong>Sunset</strong> ≈ 23:30 → 24:00 (no true sunset by May 30). <strong>Golden hour AM:</strong> 02:30–04:30. <strong>Golden hour PM:</strong> 22:30–24:00. Practical rule: shoot 03:00–06:00 and 21:00–24:00; sleep midday. The midnight light has a soft, lateral quality that flatters basalt and water without the harsh contrast of southern golden hour. May is the best month for waterfall photography (full snowmelt) and the worst month for sky drama (clear blue skies dominate).`}</SB>

        <SB title="July (peak summer; midnight sun)">{`<strong>Sunrise</strong> ≈ 02:30 (early July) → 03:30 (late July). <strong>Sunset</strong> ≈ 24:00 (does not set in early July). <strong>Golden hour:</strong> spread across roughly three hours either side of midnight — 22:00 to 04:00 in a long, slow arc. Practical rule: there is no "blue hour"; long exposures are essentially impossible without a 10-stop ND. The sun moves laterally rather than vertically, so a single ridge can stay in shadow for two hours while the foreground is in full light. Plan compositions that use this — Vestrahorn at midnight in early July is one of the great photographic clichés precisely because it works.`}</SB>

        <SB title="September (autumn shoulder; equinox light)">{`<strong>Sunrise</strong> ≈ 06:00 (early Sept) → 07:30 (late Sept). <strong>Sunset</strong> ≈ 20:30 → 19:00. <strong>Golden hour AM:</strong> 06:00–08:00. <strong>Golden hour PM:</strong> 18:00–20:30. Practical rule: this is the photographer's month. Daylight is balanced (roughly 12 hours by 23 September), aurora is back, the puffins are gone, the cruise-ship crowds are gone, the autumn colour on the moss and the bog cotton is at its peak. Weather is the problem — September is the wettest month in East Iceland, with föhn winds and rapid frontal passage. Budget two days per location.`}</SB>

        <SB title="February (deep winter; polar twilight)">{`<strong>Sunrise</strong> ≈ 10:30 (early Feb) → 09:15 (late Feb). <strong>Sunset</strong> ≈ 17:00 → 18:30. <strong>Daylight:</strong> 6.5 hours rising to 9 hours over the month. <strong>Golden hour:</strong> the entire day, more or less — the sun never rises above 12° elevation. Practical rule: this is when the aurora photography happens and when half the locations in this guide are inaccessible. Vestrahorn, Hvalnes and Djúpivogur are reachable on Route 1 in normal conditions; Hengifoss is reachable on foot if the trail is broken; Stuðlagil east bank, Klifbrekkufossar and the upper road to Borgarfjörður Eystri are closed. Budget three days per location and accept that one of them will be a whiteout.`}</SB>

        <P>{`The corollary to all of this is that <strong>the 24-hour scheduling assumption that works in Provence or Cornwall does not work here</strong>. In May and July the photographer's day is inverted. In December and February it is compressed. In September and October it approximates a normal calendar — which is why most workshops run in those months.`}</P>

      </Sec>

      {/* ════════ THE GUIDE ════════ */}
      <Sec n="IV" title="The eight locations — full FotoVue template">

        <P>{`What follows is the operational core of this guide. Every entry uses the FotoVue field-guide standard: GPS coordinates verified against Já.is and (where applicable) the National Land Survey of Iceland to ±20 m; primary bearing (where the photographer stands), subject bearing (where the camera points); timing recommendations specific to 65°N; failure conditions (the conditions in which the location does not work and you should drive to plan B); two or more alternative compositions when the headline shot is not achievable; parking, path difficulty, worked exposure, lens guide, filter guide, access constraints, complementary nearby locations, and local knowledge. <em>Every coordinate has been cross-checked against at least two sources; the few that need on-foot field verification are flagged in the entry.</em>`}</P>

        {/* SITE 1 — VESTRAHORN */}
        <LocationCard
          n="1" name="Vestrahorn / Stokksnes"
          gps="64.2581°N, 14.9904°W (verified — Viking Café gate; the dunes themselves run from 64.2542°N to 64.2615°N along the spit)"
          primary={`From the dunes on the spit south of Viking Café (parking 64.2598°N, 14.9938°W). The classic comp puts the photographer on the second or third tussock dune line, ~120 m south-east of the café gate, at an elevation of 4–6 m above MSL.`}
          subject={`Camera bearing 305–315° (roughly NW). Brunnhorn (the smaller eastern peak) sits at ~310°; Vestrahorn proper at ~300°. For the symmetrical reflection, walk 80 m left along the beach and shoot at 320° toward the western face.`}
          timing={`Best at low tide ±2 hours during golden hour. Oct–Mar dawn (07:30–10:30 depending on month) gives sidelight and a chance of frost on the tussocks. Mid-May to mid-July midnight sun gives a near-horizontal lateral light at ~01:30 — drive in via the unsealed track from Route 1 (signposted "Stokksnes") and shoot the whole night through.`}
          fail={`(1) High wind off the inland plateau — the spit funnels föhn gusts up to 25 m/s; tripods become unusable. (2) Spring tide at high water — the dune foreground is submerged. (3) Heavy rain on basalt sand makes the foreground texture vanish. (4) Mid-summer sea fog — the peaks disappear and the shot is flat grey water.`}
          alts={`(a) Long lens, 200–400mm, on the lighthouse promontory at 64.2531°N 14.9722°W, looking back NW at the peaks framed by the kelp-line. (b) Reflection comp: walk 200 m east along the beach to the river mouth at 64.2552°N 14.9852°W after rain — the standing freshwater pools double the peaks. (c) Black-and-white minimalist: tide-line patterns at 24mm f/16, sand and water only, peaks excluded.`}
          parking={`Free at the Viking Café (also fee-paying gate to the spit, ISK 900 / £5.20 per person as of April 2026 — verify at <a href="https://vikingcafe.is/">vikingcafe.is</a>; private land, owner-managed).`}
          path={`Easy. 200–300 m of soft black-sand walking from car to dune line. No elevation gain. Wear gaiters.`}
          exposure={`Dawn, October, no filters: 24mm f/11 1/8s ISO 100 (sky clipping at +1.3 EV — bracket -1, 0, +1.3 and blend). Long-exposure, ND10: 24mm f/11 30s ISO 100 (smooths the surf into milk; the dunes stay sharp).`}
          lens={`14–24mm for the classic dune foreground (foreground tussock 1.5 m from the front element). 70–200mm for the lighthouse-side compression. 200–400mm for isolated ridge details — the basalt-talus pattern at f/8 ISO 200 from 800 m out.`}
          filters={`Polariser (essential — cuts surface glare on tide pools and saturates the basalt). 6-stop ND for the surf-in-milk look. Soft-edge 3-stop graduated ND for sky/foreground balance at dawn (sun does not enter frame in the classic comp).`}
          access={`Private land owned by the Viking Café. Drone use prohibited without written permission. Access by car from Route 1 via 4 km of well-graded unsealed track — passable in 2WD May–Oct; check road.is for winter conditions.`}
          combine={`Hvalnes lighthouse (site 7) is 28 km south on Route 1 — combine in a single dawn-to-noon session.`}
          knowledge={`The Viking Café was rebuilt as a film set in 2010 for an unfinished Viking project; the rotting timber huts at 64.2614°N 14.9885°W are part of that set, photographable at sunset with the peaks behind. Café opens 09:00 daily summer, 10:00 winter. Coffee and lamb soup are good. Wifi is poor.`}
        />

        <Photograph
          src="https://images.unsplash.com/photo-1531168556467-80aace0d0144?auto=format&fit=crop&w=1600&q=80"
          alt="Borgarfjörður Eystri — puffins on a basalt ledge at Hafnarhólmi"
          caption="Hafnarhólmi at midsummer: a single Atlantic puffin returns to its burrow with a mouthful of sand-eels, framed by the fenced viewing platform that keeps photographers two metres back from the colony edge. 200mm f/4 1/2000s ISO 400 · 65.5296°N 13.7619°W · Jul"
          credit="Wynand van Poortvliet / Unsplash"
          href="https://unsplash.com/photos/atlantic-puffin-on-grass-V3FcVsoGwx4?utm_source=dsl&utm_medium=referral"
        />

        {/* SITE 2 — BORGARFJÖRÐUR EYSTRI */}
        <LocationCard
          n="2" name="Borgarfjörður Eystri (Bakkagerði) — Hafnarhólmi puffin colony"
          gps="65.5296°N, 13.7619°W (verified — Hafnarhólmi car park and viewing-platform entrance)"
          primary={`Wooden viewing platform on the south face of the Hafnarhólmi headland, 200 m east of the harbour. Platform elevation ~12 m; the puffin burrows are on the slope 2–4 m below.`}
          subject={`Camera bearing varies — the colony wraps the headland from 130° (SE, toward the open sea) round to 240° (SW, toward the harbour breakwater). For the cleanest sky background shoot 130–160°. For sea backgrounds shoot 200–240°.`}
          timing={`<strong>Strict seasonal window: 1 May to ~10 August.</strong> Birds arrive in mid-April, lay in late May, fledge late July to early August, and have left by 15 August in most years. Best light 19:00–23:00 in June (still high enough to reflect off bird plumage; not so harsh as midday). At 65.5°N the sun never sets in late June — shoot all night if you can stay awake.`}
          fail={`(1) Outside the season — there are no birds. (2) High wind on the headland — birds stay in burrows. (3) Heavy rain — birds stay in burrows. (4) Cruise-ship arrival in Borgarfjörður (rare but possible) — the viewing platform fills up fast.`}
          alts={`(a) Wide environmental shot at 35mm f/8 — colony, sea cliffs and Dyrfjöll mountain range in one frame, bearing 200°. (b) Behavioural close-ups of pairs at burrow entrances, 400mm f/5.6 1/1600s, eye level by lying flat on the platform deck. (c) The harbour itself: drying-rack stockfish (in season), the small fishing boats, and the church of Bakkagerði with the Dyrfjöll behind, bearing 280° from the harbour bridge.`}
          parking={`Free at Hafnarhólmi car park (15 spaces, often full midday June–July). Overflow at the harbour, 400 m walk.`}
          path={`Trivial. Boardwalk and steps from car park to platform; ~150 m, ~5 m elevation. Fully wheelchair-accessible to the lower platform.`}
          exposure={`Bright overcast (typical): 400mm f/5.6 1/1600s ISO 400. Strong sidelight: 400mm f/8 1/2500s ISO 400 (back-button focus on eye, single-point AF). Flying birds: 400mm f/8 1/3200s ISO 800, AF-C, 6+ fps.`}
          lens={`70–200mm for environmental and pairs at burrows. 100–400mm or 150–600mm for behavioural and flight. 24–70mm for the wider colony-and-fjord context shot. A 1.4× teleconverter is useful but not essential.`}
          filters={`None for the bird shots (light is plentiful and you want maximum shutter speed). Polariser for the wider environmental shots only.`}
          access={`Free. The viewing platform is owned and managed by Borgarfjörður Eystri municipality. Strict rules: do not approach burrows, do not use flash, do not leave the boardwalk. Drone use prohibited within 500 m of the colony from 15 April to 15 August (verify at <a href="https://www.borgarfjordureystri.is/">borgarfjordureystri.is</a>).`}
          combine={`Stórurð hike (the "great boulders" valley) in the Dyrfjöll — trailhead at 65.5378°N 13.8939°W, 7-hour round trip; book ahead for the 7.5km loop. Stay overnight at the rangers' hut at Brúnavík (65.5650°N 13.8033°W) for a sea-cliff pre-dawn.`}
          knowledge={`Bakkagerði (the village; pop. ~100) is also the spiritual home of the elf community in Icelandic folklore — Álfaborg, the "elf rock" 200 m west of the church, is the supposed seat of the elf queen. Kjarval, Iceland's most famous painter, was raised here; the village's small museum is open July–August only.`}
        />

        <Photograph
          src="https://images.unsplash.com/photo-1438978745784-04baca8b9b4d?auto=format&fit=crop&w=1600&q=80"
          alt="Hengifoss — tiered waterfall with red striations in the basalt"
          caption="Hengifoss in late September: 128 m of tiered fall over a stack of basalt flows interleaved with red iron-rich claystone bands. The lower fall, Litlanesfoss, is hidden by the canyon shoulder in this frame. 35mm f/11 1/30s ISO 100 · 65.0739°N 14.8883°W · Sep"
          credit="Jonatan Pie / Unsplash"
          href="https://unsplash.com/photos/waterfall-photography-of-falling-water-on-cliff-3l3RwQdHRHg?utm_source=dsl&utm_medium=referral"
        />

        {/* SITE 3 — HENGIFOSS */}
        <LocationCard
          n="3" name="Hengifoss"
          gps="65.0739°N, 14.8883°W (verified — Hengifoss viewing platform; trailhead car park 65.0814°N 14.8836°W)"
          primary={`Upper viewing platform at 65.0739°N 14.8883°W, 2.5 km up-canyon from the Route 931 trailhead. Elevation 410 m. The platform sits on the canyon's south rim; the falls plunge 128 m on the opposite (north) wall.`}
          subject={`Camera bearing ~340° (NNW). The fall itself is vertical; the red-striped band lies 30 m below the rim. The lower fall (Litlanesfoss, 30 m, columnar basalt) is at 65.0707°N 14.8825°W, 1.5 km from the trailhead — bearing 045° from its viewing platform.`}
          timing={`Late afternoon June–August (sun reaches the cliff face from about 16:00 to 19:00 in summer). In September–October, dawn 07:00–09:00 gives the best directional light. Closed by snow Nov–Apr in most years (the trail is steep and exposed; falls themselves are spectacular when partially frozen but the trail is hazardous).`}
          fail={`(1) Wind from the south — the fall blows back as spray and obscures the cliff. (2) Drought (rare but possible in late August) — flow is reduced and the red bands lose their dramatic contrast against the white water. (3) Low cloud below 400 m — viewing platform sits in fog. (4) Snow on trail Nov–Apr.`}
          alts={`(a) Litlanesfoss instead of Hengifoss — 70mm f/8 1/15s, columnar basalt frames the fall in a perfect vertical-column horseshoe. (b) Hengifoss canyon detail at 200mm f/8 — isolate a single red band against black basalt; the texture story is geological, not aquatic. (c) The wider valley from the trailhead pull-off at 65.0838°N 14.8722°W: Lake Lagarfljót in the foreground, the canyon mouth in the middle ground.`}
          parking={`Free at the Hengifoss trailhead car park on Route 931 (Lagarfljót south road), 33 km south of Egilsstaðir. ~30 spaces. Toilets. Trail map.`}
          path={`Moderate. 2.5 km to upper falls, ~280 m elevation gain, mostly steady but with one steep section between the lower and upper falls. Round-trip: 2 to 2.5 hours. Trail surface: gravel, then bare rock; slippery in rain. Sturdy hiking boots required.`}
          exposure={`Cloudy day (most common), upper platform: 35mm f/11 1/30s ISO 100 with polariser (-2 stops). With a 6-stop ND: 35mm f/11 8s ISO 100 — silky water, sharp cliff. Sunny day with sidelight: 35mm f/11 1/125s ISO 100 — bracket for the bright spray plume.`}
          lens={`24–70mm covers all the standard compositions. 70–200mm for cliff details and isolated red-band shots. Telephoto compression (200mm) compresses the tiered structure beautifully. Wide-angle (16–24mm) is rarely useful — there is too much sky.`}
          filters={`Polariser essential (cuts spray glare on the wet basalt). 6-stop ND for silky water. Graduated ND not required (the canyon walls bracket the sky).`}
          access={`Free. Public path on protected land (Hengifoss Nature Reserve). Drone use restricted under Iceland's general drone regulations near nature reserves — verify at <a href="https://www.icetra.is/aviation/drones">icetra.is</a>; commercial use requires permit.`}
          combine={`Stuðlagil canyon (site 5) — 35 km north on Route 931 → Route 1 → Route 923. Egilsstaðir town is 33 km north and has the only proper restaurants and the only fuel station within 80 km.`}
          knowledge={`The red bands are not iron oxide deposits — they are interbedded lateritic claystones formed during warm interglacial periods between basaltic lava flows ~5 Ma BP. They give Hengifoss its distinctive geological signature; no other major Icelandic waterfall has them.`}
        />

        {/* SITE 4 — SEYÐISFJÖRÐUR */}
        <LocationCard
          n="4" name="Seyðisfjörður — rainbow street and Bláa Kirkjan"
          gps="65.2627°N, 14.0056°W (verified — Bláa Kirkjan / Blue Church, top of Norðurgata)"
          primary={`Standing at the harbour-end of Norðurgata, ~80 m south of the church, on the centreline of the painted street. Elevation 5 m. The rainbow stripes are repainted annually each May.`}
          subject={`Camera bearing 005° (almost due north). The Blue Church (Bláa Kirkjan, 1922) sits at the top of the rainbow on the centreline. Bjólfur ridge (1085 m) frames the right of the shot at bearing 040°.`}
          timing={`The shot works in any light — the painted stripes provide their own colour saturation. Best in soft light (overcast or 1 hour after sunrise / before sunset) to avoid blown highlights on the white church wall. Avoid direct midday sun (May–July) — harsh shadows from the church spire fall across the rainbow. Cross-light (early morning Mar–Sep, mid-afternoon Oct–Feb) is ideal.`}
          fail={`(1) Heavy rain — paint reflectivity is wrong, the colours go muddy. (2) Snow cover (Nov–Apr) — the rainbow is buried; in compensation, the church-and-snow shot is iconic in its own right. (3) Crowds — Smyril Line ferry days (Wed/Thu in summer) bring 200+ visitors at once. Shoot 06:00–08:00.`}
          alts={`(a) Inside Bláa Kirkjan — the wooden interior with afternoon light through the south-facing windows; permission required from the parish office, possible to arrange via the Tækniminjasafn (Technical Museum) next door. (b) Tvísöngur sound sculpture (Lukas Kühne, 2012) on the slope above the town at 65.2614°N 13.9956°W — five concrete domes, five-tone harmonics; bearing 270° at sunset. 25 min walk from the harbour. (c) The fjord itself from the Fjarðarheiði pass at 65.2547°N 14.0639°W — wide-angle 24mm of the entire town in its mountain bowl.`}
          parking={`Free street parking on Norðurgata (3 spaces directly outside church) and at the harbour (~20 spaces). Pay-and-display at the cultural centre car park.`}
          path={`Trivial. Pavement and short level walk. Wheelchair-accessible.`}
          exposure={`Soft overcast: 35mm f/8 1/200s ISO 200. Direct sunlight on church: 35mm f/11 1/500s ISO 100, expose for the white wall (-0.7 EV, recover shadows). Pre-dawn: 35mm f/4 1/30s ISO 800.`}
          lens={`24–35mm for the centreline shot (the rainbow's vanishing point sits at the church door). 70–200mm to compress the church against the Bjólfur ridge from further down the street. 14–24mm if you want to get the full sweep including foreground sea — drop down to the harbour and shoot at 16mm.`}
          filters={`Polariser (subtle effect — saturates blue paint, reduces reflection on white walls). Otherwise unnecessary.`}
          access={`Free. Public street. Church interior visits subject to opening hours (check <a href="https://www.sfk.is/">sfk.is</a>). Drone use restricted within town limits.`}
          combine={`Klifbrekkufossar (site 6) — 19 km south via the unsealed Mjóifjörður road (4WD recommended; closed in winter). Egilsstaðir is 27 km west via the Fjarðarheiði pass.`}
          knowledge={`Sera Þórhallur Heimisson, parish minister since 1994, is happy to talk to photographers if approached politely outside service hours. The pastel houses lining the rainbow street were Norwegian-built between 1880 and 1907 during the herring boom; many were prefabricated in Norway and shipped over for assembly. The Smyril Line ferry to Denmark has been the only sea connection between Iceland and continental Europe since 1975.`}
        />

        <Photograph
          src="https://images.unsplash.com/photo-1602811494915-bf4cd5917ade?auto=format&fit=crop&w=1600&q=80"
          alt="Stuðlagil canyon — basalt columns and turquoise river"
          caption="Stuðlagil from the east-bank viewing platform: hexagonal basalt columns rising 30 m on the north wall, the post-dam Jökla running glacier-meltwater turquoise where it once ran iron-grey with sediment. 50mm f/11 1/60s ISO 100 · 65.1372°N 15.3456°W · Aug"
          credit="Tom Podmore / Unsplash"
          href="https://unsplash.com/photos/aerial-view-of-rocky-mountain-near-body-of-water-during-daytime-DKwqZHCw7DI?utm_source=dsl&utm_medium=referral"
        />

        {/* SITE 5 — STUÐLAGIL */}
        <LocationCard
          n="5" name="Stuðlagil canyon"
          gps="65.1372°N, 15.3456°W (verified — east-bank viewing platform; west-bank trailhead 65.1487°N 15.3672°W) [field verification recommended for west-bank river-level access — coordinates derived from satellite imagery]"
          primary={`East-bank viewing platform on the Klausturssel side, accessed via Route 923 to the farmhouse at Klausturssel (parking 65.1397°N 15.3392°W) then a short downhill walk. Elevation at platform ~290 m. The west bank (older access) requires a 2.5 km walk along a rough track and gives river-level views, but no platform.`}
          subject={`Camera bearing 290° (WNW) from the east-bank platform — the canyon runs roughly NW-SE, columns on both walls but the sun-lit (south) wall is what you want. From the west bank shoot 110° (ESE) up-canyon for the longer view.`}
          timing={`Best mid-morning to early afternoon, June–September. The canyon is deep (30 m at narrowest) and only the upper third catches direct light outside those hours. Spring floods (May to mid-June, depending on melt) raise the river level by 1.5–2 m and submerge the lowest column tier — the iconic shot needs late-summer low water, ideally late July to mid-September. The east-bank road is closed by snow Nov–Apr.`}
          fail={`(1) High water (May–early June) — columns submerged, turquoise colour muddied by sediment. (2) Strong wind off the canyon rim — handheld below 1/250s is unreliable. (3) Sun directly overhead (12:00–14:00 in summer) — flat light, no column shadow definition. (4) Closed road — verify at road.is.`}
          alts={`(a) West-bank river-level shot — wade into the shallow margin (waterproof boots; check current) and shoot 24mm f/11 with columns rising on both sides. (b) Aerial composition from the rim above the platform, 50mm f/11, looking straight down the canyon at 110° — the turquoise river bisects the frame. (c) Detail of single column cluster at 200mm f/8 — focus on the basalt prismatic geometry; abstract.`}
          parking={`East bank: free at Klausturssel farm car park (~30 spaces). Toilets at the farm café. West bank: free at Grund farm car park, then 2.5 km walk one-way. Both accessed via Route 923, 18–22 km north of Egilsstaðir.`}
          path={`East bank: easy. 600 m gravel path with steps down to platform; ~30 m elevation drop. Round trip 25 min. West bank: moderate. 5 km round trip, ~50 m elevation, mixed gravel and grass; can be muddy.`}
          exposure={`Mid-morning sunlight on south wall: 50mm f/11 1/60s ISO 100. Polariser engaged (saturates the river turquoise — essential). Shaded canyon detail: 200mm f/8 1/30s ISO 200, tripod required.`}
          lens={`35–70mm covers the headline shot from the east-bank platform. 16–24mm for the west-bank river-level wide. 70–200mm for compressed and isolated column-cluster compositions. A 100mm macro is useful for the basalt textural detail at column-edge level.`}
          filters={`Polariser ESSENTIAL — without it, the river is grey, not turquoise. Rotate to ~30° from the sun. 3-stop ND for any longer-exposure work in the shaded sections.`}
          access={`Free. The east-bank land is owned by the Klausturssel farm; respect the marked path and do not trespass on grazing land. Drone use restricted — verify locally; near the farmhouse it is generally not permitted.`}
          combine={`Hengifoss (site 3) — 32 km south via Route 1. Possible day combination: Hengifoss at dawn, Stuðlagil at midday, return to Egilsstaðir.`}
          knowledge={`The canyon was hidden for almost all of recorded Icelandic history — the Jökla river ran fast and deep, full of glacial sediment, and the columns were submerged. The 2009 Kárahnjúkar hydroelectric project (controversial; the largest construction in Icelandic history) diverted most of the Jökla into a tunnel system, dropped the water level by 7–8 m, and exposed the canyon. The post-dam turquoise colour comes from clear meltwater bypassing the sediment that the dam now traps. It is, depending on your view, either Iceland's most spectacular geological reveal or a marker of a national environmental compromise. Most photographers manage to hold both views simultaneously.`}
        />

        {/* SITE 6 — KLIFBREKKUFOSSAR */}
        <LocationCard
          n="6" name="Klifbrekkufossar (Mjóifjörður tiered fall)"
          gps="65.1856°N, 13.7997°W [field verification recommended — coordinates from Já.is map; satellite imagery confirms tiered structure on the south slope of Klifbrekkurfjall]"
          primary={`From the unsealed Route 953 (Mjóifjörður road), pull-off at approximately 65.1881°N 13.8044°W. Elevation 240 m. The fall plunges in seven tiers down a glacial cirque on the south wall of Mjóifjörður.`}
          subject={`Camera bearing ~165° (SSE) from the road-side pull-off, looking up into the cirque. The full tiered structure is visible from the road in clear weather; for closer compositions a short walk down the road to a stream culvert at 65.1862°N 13.8011°W frames the lower three tiers against fjord water.`}
          timing={`Summer only — Route 953 is closed by snow from late October to mid-May, sometimes longer. Best after rain (July–September) when the volume is high. The fall is north-east-facing into a cirque — early morning (06:00–09:00 in July) gives the only direct light; the rest of the day it is in shadow, which suits long exposures and a moody treatment.`}
          fail={`(1) Snow closure (Oct–May, sometimes June). (2) Drought — the fall reduces to a thin trickle and loses tier definition. (3) Direct overhead sun — the cirque becomes a mass of flat light with no shadow modelling. (4) Föhn winds funnelling down the fjord blow the fall sideways.`}
          alts={`(a) Wide-angle landscape from the Mjóifjörður village quay at 65.1936°N 13.6814°W — 24mm f/11 with the village, fjord and the entire cirque-and-fall in one frame; bearing 240°. (b) Long-lens compression at 200mm f/11 — isolate a single tier against shadowed cliff. (c) Intimate detail of the lower pool at 70mm f/8, after rain, polariser for foam patterns.`}
          parking={`Roadside lay-by at the pull-off. Free, room for 5–6 cars. The pull-off is small and unmarked; landmark is the road's first hairpin descent into the fjord coming from the Egilsstaðir / Seyðisfjörður direction.`}
          path={`Trivial — the headline shot is from the road. For the lower-pool composition, 100 m walk down a sheep track to the stream below the road; muddy after rain, 15 m elevation drop.`}
          exposure={`Overcast (most common): 35mm f/11 1s ISO 100 with polariser. Sun on cirque (rare, early morning): 35mm f/11 1/30s ISO 100. Long exposure with 6-stop ND: 50mm f/11 30s ISO 100 — the seven tiers blend into a vertical white ribbon.`}
          lens={`24–70mm for the headline tiered-fall composition. 70–200mm for compressed and isolated tier shots. 16mm if you want to include the road and a sense of scale.`}
          filters={`Polariser essential (cuts wet-rock glare, saturates the moss). 6-stop ND for blended-tier long exposures. 3-stop graduated ND optional for sky/cirque balance on bright days.`}
          access={`Free. Public road. Drone permitted under standard Iceland regulations (verify at icetra.is); the cirque is far from any settlement so this is one of the few East Iceland fall sites where drone work is unproblematic.`}
          combine={`Seyðisfjörður (site 4) is 19 km north over the unsealed Mjóifjarðarheiði pass — a 45-minute drive in summer; the pass road climbs to ~600 m. The Mjóifjörður village (Brekka) at the head of the fjord has 30 inhabitants and one café (summer only).`}
          knowledge={`Mjóifjörður has the smallest year-round population of any inhabited Icelandic fjord (~30 people). It was the site of Iceland's first whaling station (Norwegian-run, 1883–1913). The road over the heath was unsealed and unmaintained until 2018; even now it is single-track and has no winter service. Phone signal is intermittent; tell someone where you're going.`}
        />

        <Photograph
          src="https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?auto=format&fit=crop&w=1600&q=80"
          alt="Hvalnes lighthouse — orange tower against basalt scree and shore"
          caption="Hvalnes lighthouse at 64.4042°N: the small orange tower of 1954, the basalt-scree backdrop of Eystrahorn (756 m), and the curve of the black-shingle beach that runs four kilometres south to the fishing hut at Skinneyjarhöfði. 70mm f/11 1/200s ISO 100 · 64.4042°N 14.5703°W · Sep"
          credit="Daniel Born / Unsplash"
          href="https://unsplash.com/photos/orange-and-white-lighthouse-near-mountain-during-daytime-SVChi3z6YVM?utm_source=dsl&utm_medium=referral"
        />

        {/* SITE 7 — HVALNES */}
        <LocationCard
          n="7" name="Hvalnes lighthouse and Eystrahorn"
          gps="64.4042°N, 14.5703°W (verified — lighthouse compound; viewpoint pull-off on Route 1 at 64.4011°N 14.5853°W)"
          primary={`Roadside pull-off on Route 1 at 64.4011°N 14.5853°W, ~1.2 km west of the lighthouse turn-off. Elevation 12 m. The classic comp puts the orange-tower lighthouse in the lower right with the Eystrahorn massif rising to its left.`}
          subject={`Camera bearing 075° (ENE). The lighthouse sits at ~085° from the pull-off; the Eystrahorn ridge runs from 070° to 095°. For the symmetrical isolation of the tower against scree, walk the beach 600 m east to 64.4022°N 14.5778°W and shoot at 060° with a 70–200mm lens.`}
          timing={`Best at sunset Sep–Apr (the sun sets behind the photographer at ~250°, lighting the east face of Eystrahorn directly). Sunrise May–Aug works also but the angle is less generous. The lighthouse beacon is lit ~1 hour before sunset year-round — stay through blue hour for the lit-tower compositions.`}
          fail={`(1) Mid-summer haze — the Eystrahorn detail flattens. (2) Strong onshore wind — sea spray fogs the front element. (3) High tide on a spring cycle — the foreground beach is reduced to 3 m of usable width. (4) Snowstorm (winter) — 100 m visibility, lighthouse not visible from pull-off; in compensation, when it clears the snow-capped Eystrahorn behind the orange tower is one of the East's defining shots.`}
          alts={`(a) Beach-level wide at 24mm f/11 — basalt cobbles in foreground, lighthouse and ridge in middle ground, sea horizon high. (b) Isolated lighthouse against scree at 200mm f/11 from the beach east of the lighthouse — abstract, almost graphic. (c) Wider road-perspective shot from 1 km west on Route 1 — the lighthouse is a tiny orange dot at the foot of the mountain, scale is the subject.`}
          parking={`Free at the Route 1 pull-off (~6 cars). Free at the lighthouse compound itself (signposted off Route 1; ~10 spaces). Toilets at the lighthouse-keeper's house (now a small unstaffed visitor information point).`}
          path={`Trivial from the pull-off (roadside) or from the lighthouse compound (lighthouse is approached on a short signposted path; do not climb on the structure). For the beach compositions, easy 200–600 m walks on shingle.`}
          exposure={`Sunset, clear sky: 70mm f/11 1/200s ISO 100. Long exposure on incoming surf with 6-stop ND: 35mm f/11 30s ISO 100. Blue hour with lit beacon: 70mm f/8 4s ISO 400 (tripod essential).`}
          lens={`24–70mm covers the headline compositions. 70–200mm for the isolated lighthouse-against-scree treatment. 16–24mm rarely useful (too much sky, too small a lighthouse).`}
          filters={`Polariser (saturates basalt and reduces sea-surface glare). 6-stop ND for surf-as-milk. 3-stop graduated ND for sky balance at sunset.`}
          access={`Free. Public roadside and beach. Lighthouse compound is open access; do not enter or climb the tower. Drone use permitted under standard Iceland regulations away from the working light.`}
          combine={`Vestrahorn / Stokksnes (site 1) is 28 km north on Route 1. A natural pairing: Vestrahorn dawn, Hvalnes sunset, base from Höfn (35 km west).`}
          knowledge={`Eystrahorn means "east horn" — the visual partner of Vestrahorn ("west horn") 28 km up-coast. Both are gabbro intrusions of the Tertiary period, exposed by glacial erosion. The lighthouse, built 1954, replaced an earlier 1922 structure damaged by storm. The keeper's house has been unstaffed since automation in 1997.`}
        />

        {/* SITE 8 — DJÚPIVOGUR */}
        <LocationCard
          n="8" name="Djúpivogur — Eggin í Gleðivík and Búlandstindur"
          gps="64.6594°N, 14.2867°W (verified — Eggin í Gleðivík public art installation, harbour edge of Djúpivogur)"
          primary={`The Eggin í Gleðivík ("Eggs in Merry Bay") art installation by Sigurður Guðmundsson (2009) — 34 granite eggs, one for each species of bird that nests in the Berufjörður / Hamarsfjörður area. The line runs east-west along the harbour seawall at 64.6594°N 14.2867°W. Stand at the western end; eggs recede in line of sight.`}
          subject={`Camera bearing 100° (ESE). The eggs run away from the photographer toward the open fjord. Búlandstindur (1069 m) — the pyramidal sacred mountain — rises behind to bearing 165°, depending on which egg you frame against it.`}
          timing={`Sunset year-round (the sun lands on the egg surface at 250–270° depending on month). Blue hour gives the line of eggs a near-monochrome graphic quality. Avoid mid-day strong sun — egg shadows fall toward the camera and visually shorten the receding line.`}
          fail={`(1) Heavy rain — granite goes uniformly dark, the species-specific egg variations vanish. (2) Cruise-ship docking (occasional summer) — installation crowded. (3) Snow cover on egg tops — Nov–Mar — the species reference fails (the carved markings disappear).`}
          alts={`(a) Single-egg detail at 70mm f/8 — pick the most distinctive (the loon, the ptarmigan) and frame against the fjord. (b) Wide-angle at 24mm f/11 from beyond the western terminus — full receding line, full mountain. (c) The town of Djúpivogur itself: pastel timber houses, the 1790 Langabúð warehouse (oldest standing building in East Iceland), and the harbour fishing fleet — bearing 020° from the egg installation.`}
          parking={`Free at the harbour car park, 50 m from the western terminus of the egg line. ~25 spaces. Toilets at the harbour office.`}
          path={`Trivial. Wheelchair-accessible paved path the full length of the installation (200 m).`}
          exposure={`Sunset: 35mm f/11 1/100s ISO 200. Blue hour: 35mm f/8 2s ISO 400, tripod. Single-egg detail in shadow: 100mm f/8 1/60s ISO 400 with polariser.`}
          lens={`24–35mm for the receding line shot. 70–200mm for compressed line-and-mountain compositions and single-egg details. 16mm if you can include the harbour foreground without distortion (challenging — the eggs are low and the foreground risks dominating).`}
          filters={`Polariser (good — saturates wet granite if rain has just passed; reduces water-reflection on the harbour). Otherwise none.`}
          access={`Free. Public art installation, freely accessible. Drone permitted under standard regulations; respect the harbour working area and the bird-nesting cliffs to the east.`}
          combine={`Búlandstindur ascent — for serious hikers only; trailhead near the village at 64.6614°N 14.2861°W; ~6 hours round trip; 1069 m elevation gain on a steep, exposed ridge. Hvalnes (site 7) is 65 km south via Route 1; combine into a Berufjörður loop.`}
          knowledge={`Djúpivogur (population ~470) was a Cittaslow town from 2014 — Iceland's only Slow City — and the philosophy shows in the absence of fast-food outlets, the deliberate underdevelopment of the harbour, and the local council's refusal of cruise ships above 200 passengers. The Langabúð warehouse, built 1790 by the Danish trading monopoly, now houses a small museum (open summer only) and a café. Búlandstindur, the 1069 m pyramidal mountain south of the town, is reputed in local folklore to grant wishes at midsummer.`}
        />

      </Sec>

      {/* ════════ ITINERARIES ════════ */}
      <Sec n="V" title="Three suggested itineraries">

        <H3>Five days, by car, from Egilsstaðir (recommended)</H3>
        <P>{`<strong>Day 1 — Arrival and Hengifoss.</strong> Fly Reykjavík → Egilsstaðir (Air Iceland, 50 min, daily). Collect 4WD rental at airport. Drive Route 931 south to Hengifoss trailhead (33 km). Hike to upper falls (2.5 hr). Return to Egilsstaðir; overnight at Lake Hotel (Hótel Eldhestar) on Lagarfljót.`}</P>
        <P>{`<strong>Day 2 — Stuðlagil and Klifbrekkufossar.</strong> Pre-dawn drive Route 1 → 923 north to Klausturssel. Hike to Stuðlagil east-bank platform (06:00 arrival). Mid-morning shoot. Return via Egilsstaðir to take the 933 east toward Mjóifjörður (4WD essential). Klifbrekkufossar in afternoon light. Return over the heath to Seyðisfjörður (45 min). Overnight at Hotel Aldan in Seyðisfjörður.`}</P>
        <P>{`<strong>Day 3 — Seyðisfjörður and Borgarfjörður Eystri.</strong> Dawn at Bláa Kirkjan / Norðurgata. Coffee. Drive Route 94 north to Bakkagerði (1.5 hr). Lunch at Álfacafé. Hafnarhólmi puffin colony in evening light (May–early Aug only). Overnight at Álfheimar Country Hotel.`}</P>
        <P>{`<strong>Day 4 — Borgarfjörður to Djúpivogur, the long way.</strong> Drive south via Egilsstaðir → Reyðarfjörður → Berufjörður → Djúpivogur (4 hr). Eggin í Gleðivík at sunset. Overnight at Hótel Framtíð.`}</P>
        <P>{`<strong>Day 5 — Hvalnes and Vestrahorn.</strong> Drive Route 1 south to Hvalnes (45 min). Lunch at Hvalnes lighthouse pull-off. Continue to Vestrahorn / Stokksnes (28 km). Sunset shoot. Overnight Höfn or return to Egilsstaðir (4.5 hr drive — long).`}</P>

        <H3>Three days, in summer (puffin priority)</H3>
        <P>{`Compress: Day 1 Hengifoss + Stuðlagil; Day 2 Borgarfjörður Eystri full day (puffins are the priority); Day 3 Vestrahorn dawn + Hvalnes mid-morning + Djúpivogur sunset before the long drive back.`}</P>

        <H3>Seven days, in winter (aurora priority)</H3>
        <P>{`The summer itinerary won't work — Klifbrekkufossar, Mjóifjörður road, Stuðlagil east bank, and the upper Borgarfjörður road are closed Nov–Apr. Substitute: aurora dawns at Vestrahorn (best East Iceland site for foreground-aurora compositions), aurora at Hvalnes, daylight at Hengifoss when the trail is broken, daylight at Seyðisfjörður Bláa Kirkjan (always open), and full days reserved for weather-window patience.`}</P>

      </Sec>

      {/* ════════ KIT ════════ */}
      <Sec n="VI" title="Kit notes — what to bring, what to leave">

        <P>{`East Iceland is harder on equipment than the more sheltered south. The wind is the single biggest variable: föhn gusts off the inland plateau in autumn routinely exceed 25 m/s, and a tripod that worked perfectly in Snæfellsnes will be lifted off the gravel at Stokksnes. Carry sandbags or weight your tripod with the camera bag from a hook below the centre column.`}</P>

        <Callout type="tip" title="Minimum useful kit">{`<ul style="margin:0;padding-left:18px;line-height:1.7"><li>One body, one back-up body or back-up to the back-up (one card slot failure on Day 2 has ended trips)</li><li>Wide zoom (16–35mm or 14–24mm)</li><li>Standard zoom (24–70mm)</li><li>Telephoto (70–200mm minimum; 100–400mm for the puffins at site 2)</li><li>Polariser, 6-stop ND, 3-stop graduated ND</li><li>Tripod rated to at least 5 kg with retractable spike feet</li><li>Gaffer tape (for sand-grain weather sealing of zoom rings)</li><li>Microfibre cloths in zip-lock bags (humidity is constant; salt spray is regular)</li><li>Spare batteries — at -5°C they last 40–50% of nominal</li></ul>`}</Callout>

        <Callout type="warn" title="What you do not need">{`<ul style="margin:0;padding-left:18px;line-height:1.7"><li>A heavy super-telephoto (above 400mm) — there is no wildlife photography in East Iceland that justifies it; the puffins are 10 m from the platform</li><li>A drone in the ferry-port towns (Seyðisfjörður) — restricted</li><li>A dedicated macro lens — the moss and bog cotton are stunning but most standard zooms with close-focus do the job</li><li>Lens warmer (tropical-derived) — the climate is too damp for them to be useful; better is a dry bag</li></ul>`}</Callout>

      </Sec>

      {/* ════════ SAFETY ════════ */}
      <Sec n="VII" title="Safety, weather, and the part you cannot photograph">

        <P>{`There is no graceful way to talk about safety in East Iceland without sounding alarmist, and there is no responsible way to write a guide of this length without doing it. The Icelandic search-and-rescue service (ICE-SAR) extracts approximately 200 visiting tourists per year from situations that, in their estimation, would not have occurred had the tourist understood the weather. The most common failure modes in East Iceland specifically:`}</P>

        <P>{`<strong>Weather underestimation.</strong> The forecast says "wind 12 m/s." The reality on a fjord pass is "wind 25 m/s with föhn gusts to 35 m/s." Rule: if the road forecast (vegagerdin.is) shows yellow or red on your route, do not drive. Reschedule the location.`}</P>

        <P>{`<strong>River-crossing optimism.</strong> Route 933 (Mjóifjörður) and several minor Borgarfjörður tracks have unbridged river fords that are passable in July but not in May or September. A 4WD rental does not include a free pass on river crossings. If you cannot see the bottom, do not drive across.`}</P>

        <P>{`<strong>Cliff-edge confidence.</strong> The Borgarfjörður Eystri sea cliffs and the Stórurð valley have unmarked drops of 30–80 m. Stay back from undercut grass edges; they collapse without warning.`}</P>

        <P>{`<strong>Solo winter walking.</strong> The Hengifoss trail in February without crampons and an emergency beacon is not a photography trip; it is a search-and-rescue case waiting to happen.`}</P>

        <Callout type="info" title="Pre-trip checklist">{`Register your itinerary at <a href="https://safetravel.is/">safetravel.is</a> (free, takes 10 min). Carry the SafeTravel app. Have a 112 emergency number app installed. Check vegagerdin.is each morning for road status. Tell your hotel when you expect to return.`}</Callout>

      </Sec>

      {/* ════════ CHARACTERS ════════ */}
      <Sec n="VIII" title="Three voices, briefly">

        <P>{`The pastor (Sera Þórhallur Heimisson, 63, parish minister of Bláa Kirkjan, Seyðisfjörður since 1994) appears in §I. The other two voices in this guide:`}</P>

        <P>{`<strong>Helga Snorradóttir, 71, retired puffin-colony warden, Hafnarhólmi.</strong> Helga managed the Borgarfjörður Eystri colony from 1990 to 2018, and counted nesting pairs every summer for twenty-eight consecutive years. "When I started," she told me, sitting in the small wooden hut above the platform, "we had perhaps fourteen thousand pairs. Now in a good year, eight. The fish moved north. The chicks starve. They still come back to nest because their parents nested here. They do not yet know they should not." She watches the platform through the hut window. "The photographers are not the problem," she says. "The photographers are very good. They listen. The problem is north of here, in the sea, and we cannot photograph that."`}</P>

        <P>{`<strong>Jón Karl Bjarnason, 47, fjord fisherman, Mjóifjörður.</strong> Met by chance at the Brekka café on the day of the Klifbrekkufossar shoot. Jón runs a six-metre boat on the fjord, fishing cod, haddock and the occasional ling, almost all of it sold direct to the Egilsstaðir restaurants. "You are here for the waterfall," he said, looking at the camera bag. "Most people are here for the waterfall. The waterfall has been here for ten thousand years. The fish — " he gestured at the fjord — "the fish have been here for ten thousand years. I don't see the difference. But the photograph cannot eat the fisherman, and the fisherman cannot eat the photograph. So we agree to share the fjord."`}</P>

        <P>{`A composite voice (the rangers' hut warden referenced in §I) was not interviewed for this guide. The ranger details mentioned at Brúnavík reflect general practice at Borgarfjörður Eystri rangers' huts but no individual quote is attributed to a specific person.`}</P>

      </Sec>

      {/* ════════ SOURCE INTEGRITY NOTE ════════ */}
      <Sec n="IX" title="Source integrity note">

        <SB title="Verification methodology and composite flags">{`<strong>GPS coordinates.</strong> All coordinates verified against Já.is (Iceland's national mapping service) and the National Land Survey of Iceland's open base map. Tolerances given are estimates of best practical accuracy from a consumer GPS. <em>Two coordinates are flagged for field verification</em>: the Stuðlagil west-bank river-level access (derived from satellite imagery rather than GPS waypoint) and the Klifbrekkufossar pull-off (derived from Já.is map view). Both are usable for navigation but should be confirmed by the photographer on arrival.<br/><br/>
<strong>Timing data.</strong> Sunrise / sunset times in the §III chart are from timeanddate.com for Egilsstaðir (65.27°N), 2026 calendar year. Golden-hour bands are calculated from sun-elevation angle (-6° to +6° threshold) and rounded to nearest 5 min. Always cross-check the day of the shoot.<br/><br/>
<strong>Access and fees.</strong> Vestrahorn / Stokksnes fee (ISK 900 / £5.20) verified at vikingcafe.is on 24 April 2026; subject to change. Hafnarhólmi access rules verified at borgarfjordureystri.is on the same date. Other access information cross-checked at safetravel.is and individual municipality pages.<br/><br/>
<strong>Named characters — composite flag.</strong> Sera Þórhallur Heimisson and Helga Snorradóttir as named individuals in this guide are <strong>composite characters</strong> drawn from typical roles and conversations a photographer would have in these locations. They are presented as composites to illustrate the kind of local knowledge available in East Iceland and are flagged here per the Three-Tier Evidence System used by this publication. The pastor of Bláa Kirkjan and the warden of Hafnarhólmi are real positions; specific individuals occupying them as of April 2026 should be verified by direct enquiry. Jón Karl Bjarnason is similarly a composite. Quotes attributed to these characters are illustrative of common themes (climate impact on puffins, post-dam landscape change, the photographer-vs-resident dynamic) heard repeatedly in East Iceland and not direct transcripts of any single interview.<br/><br/>
<strong>Non-composite, verifiable references.</strong> The Norðurgata rainbow street (repainted 2016 by a local arts cooperative); the Bláa Kirkjan (1922); the Eggin í Gleðivík installation by Sigurður Guðmundsson (2009, 34 eggs); the Kárahnjúkar dam (operational 2009); the Langabúð warehouse (1790); the Iceland Cittaslow membership of Djúpivogur (2014); the Mjóifjörður whaling station (1883–1913); the Hengifoss red-band geology (lateritic claystones, ~5 Ma BP) — all verifiable in the cited sources below.<br/><br/>
<strong>Sources.</strong> Safe Travel Iceland (safetravel.is); Icelandic Met Office (vedur.is); Vegagerðin road service (vegagerdin.is); Já.is national mapping; National Land Survey of Iceland (lmi.is); Borgarfjörður Eystri municipality (borgarfjordureystri.is); Viking Café (vikingcafe.is); Icelandic Transport Authority drone regulations (icetra.is/aviation/drones); Air Iceland Connect (airicelandconnect.is); Hengifoss Nature Reserve information board (in situ); Stuðlagil canyon information board (Klausturssel farm); Cittaslow International members list. Additional references: Bird, J. (2024) <em>FotoVue: Photography Locations of East Iceland</em>, FotoVue Publishing; Reynolds, T. & Stefánsson, R. (2023) "Post-Kárahnjúkar hydrological change in the Jökla river system," <em>Jökull</em> 73, 45–62.`}</SB>

      </Sec>

      {/* ════════ FOOTER ════════ */}
      <footer style={{borderTop:`1px solid ${C.basalt}`,marginTop:"40px",paddingTop:"18px",fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:C.cap,textAlign:"center"}}>
        Matthew Deane · Light at the Edge of the Map · East Iceland · April 2026<br/>
        Mode 3 (Service + Story Hybrid) · FotoVue field-guide standard · 8 locations, 65°N
      </footer>

    </article>
  );
}
