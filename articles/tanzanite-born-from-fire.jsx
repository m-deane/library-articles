/* --- YAML frontmatter --- */
/*
title: "Born from Fire"
subtitle: "Deep beneath Tanzania's Merelani Hills, young men descend 400 metres on wooden ladders to extract the only gemstone on Earth found in a single place. The deposit could be exhausted within a generation. This is the story of the people who mine it — and the country fighting to keep its wealth."
category: "science-nature"
style: "natgeo-classic"
date: "2026-04-19"
tags: [tanzanite, gemstones, tanzania, mining, merelani]
*/

const ARTICLE_DATA = {
  title: "Born from Fire",
  subtitle: "Deep beneath Tanzania's Merelani Hills, young men descend 400 metres on wooden ladders to extract the only gemstone on Earth found in a single place. The deposit could be exhausted within a generation. This is the story of the people who mine it — and the country fighting to keep its wealth.",
  category: "science-nature",
  style: "natgeo-classic",
  date: "2026-04-19",
  author: "Matthew Deane",
  tags: ["tanzanite", "gemstones", "tanzania", "mining", "merelani"],
};

// ─── NATGEO TANZANITE FEATURE ───────────────────────────────────────────────
// "Born from Fire" — A National Geographic-style feature article
// Prose, photojournalism SVGs, data visualisations, and production package

const COLORS = {
  tanzaniteDeep: "#1a0a3e",
  tanzaniteMid: "#3d2b7a",
  tanzaniteLight: "#6a50c0",
  tanzaniteGlow: "#8b6ee0",
  violet: "#7c3aed",
  gold: "#c9a84c",
  goldLight: "#e8d5a0",
  warmBlack: "#0d0a0e",
  cream: "#f5f0e8",
  creamDark: "#e8dfd0",
  earth: "#8b6914",
  rust: "#a0522d",
  sky: "#1a2a4a",
  text: "#1a1410",
  textLight: "#4a4035",
  caption: "#6b6055",
  kiliBrown: "#2d1b0e",
};

// ─── SVG ILLUSTRATIONS ──────────────────────────────────────────────────────

function HeroSVG() {
  return (
    <svg viewBox="0 0 1400 700" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block" }}>
      <defs>
        <linearGradient id="heroSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0520" />
          <stop offset="35%" stopColor="#1a0a3e" />
          <stop offset="65%" stopColor="#2d1545" />
          <stop offset="100%" stopColor="#4a2010" />
        </linearGradient>
        <linearGradient id="kiliGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0e8e0" />
          <stop offset="40%" stopColor="#8b7355" />
          <stop offset="100%" stopColor="#2d1b0e" />
        </linearGradient>
        <radialGradient id="sunGlow" cx="70%" cy="85%" r="30%">
          <stop offset="0%" stopColor="#ff6030" stopOpacity="0.6" />
          <stop offset="60%" stopColor="#ff3010" stopOpacity="0.15" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id="crystalFace1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4a30aa" />
          <stop offset="100%" stopColor="#2060cc" />
        </linearGradient>
        <linearGradient id="crystalFace2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7040dd" />
          <stop offset="100%" stopColor="#3050bb" />
        </linearGradient>
      </defs>
      {/* Sky */}
      <rect width="1400" height="700" fill="url(#heroSky)" />
      <rect width="1400" height="700" fill="url(#sunGlow)" />
      {/* Stars */}
      {[120,280,450,620,800,950,1100,1250,180,380,560,720,880,1050,1200,1350,90,340,510,690,850,1000,1150,1300].map((x, i) => (
        <circle key={i} cx={x} cy={40 + (i * 37) % 280} r={0.5 + (i % 3) * 0.4} fill="white" opacity={0.3 + (i % 4) * 0.15} />
      ))}
      {/* Kilimanjaro silhouette */}
      <path d="M0,580 Q200,560 350,540 Q450,520 520,480 Q580,450 620,400 Q650,370 670,350 Q690,330 700,310 Q710,300 715,295 Q720,290 725,295 Q730,300 735,310 Q745,330 760,350 Q780,375 810,400 Q850,440 900,470 Q960,500 1050,530 Q1150,550 1250,560 Q1350,570 1400,575 L1400,700 L0,700 Z" fill="#1a0e05" />
      {/* Snow cap */}
      <path d="M670,350 Q680,340 690,332 Q700,320 710,305 Q715,298 720,293 Q725,298 730,305 Q740,320 755,340 Q765,352 775,362" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
      {/* Ground plane */}
      <rect x="0" y="575" width="1400" height="125" fill="#0d0805" />
      {/* Acacia trees */}
      {[{x:150,s:0.8},{x:400,s:0.6},{x:1050,s:0.9},{x:1250,s:0.5}].map((t, i) => (
        <g key={i} transform={`translate(${t.x},555) scale(${t.s})`}>
          <line x1="0" y1="0" x2="0" y2="30" stroke="#1a0e05" strokeWidth="2" />
          <ellipse cx="0" cy="-5" rx="25" ry="8" fill="#1a0e05" />
        </g>
      ))}
      {/* Foreground: tanzanite crystal cluster emerging from earth */}
      <g transform="translate(700,590)">
        {/* Raw brown matrix */}
        <path d="M-60,10 Q-40,-5 -20,5 Q0,-10 20,0 Q40,-8 60,10 L50,40 Q0,45 -50,40 Z" fill="#3a2a18" />
        {/* Crystal 1 — main tall blue */}
        <polygon points="-15,-80 5,-85 15,-20 -5,-15" fill="url(#crystalFace1)" opacity="0.9" />
        <polygon points="5,-85 20,-75 25,-15 15,-20" fill="url(#crystalFace2)" opacity="0.85" />
        {/* Crystal 2 — shorter violet */}
        <polygon points="20,-50 35,-55 40,-10 25,-8" fill="#5030aa" opacity="0.8" />
        <polygon points="35,-55 45,-45 48,-8 40,-10" fill="#6840cc" opacity="0.75" />
        {/* Crystal 3 — small */}
        <polygon points="-30,-40 -20,-45 -15,-10 -25,-8" fill="#3555bb" opacity="0.85" />
        {/* Glints */}
        <circle cx="0" cy="-60" r="2" fill="white" opacity="0.7" />
        <circle cx="30" cy="-35" r="1.5" fill="white" opacity="0.5" />
        <circle cx="-22" cy="-30" r="1" fill="white" opacity="0.4" />
      </g>
      {/* Title overlay area — dark vignette at bottom */}
      <rect x="0" y="550" width="1400" height="150" fill="url(#heroSky)" opacity="0.4" />
    </svg>
  );
}

function MinerSVG() {
  return (
    <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block" }}>
      <defs>
        <linearGradient id="shaftDark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0805" />
          <stop offset="100%" stopColor="#1a1210" />
        </linearGradient>
        <radialGradient id="lampBeam" cx="50%" cy="20%" r="60%">
          <stop offset="0%" stopColor="#ffdd80" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#ffaa40" stopOpacity="0.1" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill="url(#shaftDark)" />
      {/* Rock walls */}
      <path d="M0,0 L80,0 Q90,50 85,100 Q75,200 80,300 Q85,400 78,500 L0,500 Z" fill="#1a1510" />
      <path d="M800,0 L720,0 Q710,60 715,120 Q725,220 718,320 Q712,420 720,500 L800,500 Z" fill="#1a1510" />
      {/* Graphite veins in wall */}
      <path d="M80,80 Q100,85 85,120 Q75,140 82,170" fill="none" stroke="#2a2520" strokeWidth="3" />
      <path d="M720,150 Q700,160 715,200 Q725,230 718,260" fill="none" stroke="#2a2520" strokeWidth="2.5" />
      {/* Wooden ladder */}
      <line x1="350" y1="0" x2="350" y2="500" stroke="#5a3a1a" strokeWidth="4" />
      <line x1="420" y1="0" x2="420" y2="500" stroke="#5a3a1a" strokeWidth="4" />
      {[50,100,150,200,250,300,350,400,450].map((y, i) => (
        <line key={i} x1="350" y1={y} x2="420" y2={y} stroke="#4a2a10" strokeWidth="3" />
      ))}
      {/* Miner figure on ladder */}
      <g transform="translate(385,220)">
        {/* Headlamp beam */}
        <path d="M0,-15 L-80,80 L80,80 Z" fill="url(#lampBeam)" />
        {/* Body */}
        <ellipse cx="0" cy="0" rx="12" ry="15" fill="#3a2a1a" />
        {/* Head */}
        <circle cx="0" cy="-20" r="8" fill="#5a3a20" />
        {/* Helmet */}
        <path d="M-9,-25 Q0,-32 9,-25" fill="#cc8800" strokeWidth="1" />
        {/* Headlamp */}
        <rect x="-3" y="-27" width="6" height="4" rx="1" fill="#ffdd80" />
        {/* Arms gripping ladder */}
        <line x1="-12" y1="-5" x2="-35" y2="-10" stroke="#5a3a20" strokeWidth="3" />
        <line x1="12" y1="-5" x2="35" y2="-10" stroke="#5a3a20" strokeWidth="3" />
        {/* Legs */}
        <line x1="-5" y1="15" x2="-10" y2="35" stroke="#3a2a1a" strokeWidth="3" />
        <line x1="5" y1="15" x2="10" y2="35" stroke="#3a2a1a" strokeWidth="3" />
      </g>
      {/* Air hose running down the shaft */}
      <path d="M600,0 Q580,80 590,160 Q600,250 585,350 Q575,430 590,500" fill="none" stroke="#446688" strokeWidth="3" strokeDasharray="8,4" opacity="0.6" />
      {/* Depth markers */}
      <text x="750" y="100" fill="#4a4030" fontSize="11" fontFamily="monospace">-100m</text>
      <text x="750" y="250" fill="#4a4030" fontSize="11" fontFamily="monospace">-250m</text>
      <text x="750" y="400" fill="#4a4030" fontSize="11" fontFamily="monospace">-400m</text>
      {/* Tanzanite vein glinting in the wall */}
      <g transform="translate(110,320)">
        <polygon points="0,0 8,-5 12,8 4,12" fill="#4a40aa" opacity="0.7" />
        <polygon points="12,8 18,5 20,15 14,16" fill="#6060cc" opacity="0.6" />
        <circle cx="8" cy="5" r="1.5" fill="white" opacity="0.5" />
      </g>
    </svg>
  );
}

function TrichroismSVG() {
  return (
    <svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block", background: "#f5f0e8" }}>
      <defs>
        <linearGradient id="axisA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a3daa" />
          <stop offset="100%" stopColor="#2255dd" />
        </linearGradient>
        <linearGradient id="axisB" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6a20aa" />
          <stop offset="100%" stopColor="#9040dd" />
        </linearGradient>
        <linearGradient id="axisC" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8b3030" />
          <stop offset="100%" stopColor="#bb5040" />
        </linearGradient>
      </defs>
      <text x="400" y="30" textAnchor="middle" fill="#1a1410" fontSize="15" fontWeight="600" fontFamily="'Cormorant Garamond', serif" letterSpacing="2">TANZANITE TRICHROISM — THREE COLOURS, ONE CRYSTAL</text>
      {/* Crystal axis A — Blue */}
      <g transform="translate(160,190)">
        <polygon points="0,-80 30,-90 40,-20 10,-10" fill="url(#axisA)" />
        <polygon points="30,-90 50,-75 55,-15 40,-20" fill="#1a4abb" opacity="0.8" />
        <text x="25" y="40" textAnchor="middle" fill="#1a3daa" fontSize="13" fontWeight="600" fontFamily="'Cormorant Garamond', serif">a-axis</text>
        <text x="25" y="58" textAnchor="middle" fill="#4a4035" fontSize="11" fontFamily="'Cormorant Garamond', serif">BLUE</text>
        <text x="25" y="75" textAnchor="middle" fill="#6b6055" fontSize="9" fontFamily="'Cormorant Garamond', serif">Fluorescent light</text>
      </g>
      {/* Crystal axis B — Violet */}
      <g transform="translate(380,190)">
        <polygon points="0,-80 30,-90 40,-20 10,-10" fill="url(#axisB)" />
        <polygon points="30,-90 50,-75 55,-15 40,-20" fill="#7a30cc" opacity="0.8" />
        <text x="25" y="40" textAnchor="middle" fill="#6a20aa" fontSize="13" fontWeight="600" fontFamily="'Cormorant Garamond', serif">b-axis</text>
        <text x="25" y="58" textAnchor="middle" fill="#4a4035" fontSize="11" fontFamily="'Cormorant Garamond', serif">VIOLET</text>
        <text x="25" y="75" textAnchor="middle" fill="#6b6055" fontSize="9" fontFamily="'Cormorant Garamond', serif">Incandescent light</text>
      </g>
      {/* Crystal axis C — Burgundy/Bronze */}
      <g transform="translate(600,190)">
        <polygon points="0,-80 30,-90 40,-20 10,-10" fill="url(#axisC)" />
        <polygon points="30,-90 50,-75 55,-15 40,-20" fill="#9b4535" opacity="0.8" />
        <text x="25" y="40" textAnchor="middle" fill="#8b3030" fontSize="13" fontWeight="600" fontFamily="'Cormorant Garamond', serif">c-axis</text>
        <text x="25" y="58" textAnchor="middle" fill="#4a4035" fontSize="11" fontFamily="'Cormorant Garamond', serif">BURGUNDY</text>
        <text x="25" y="75" textAnchor="middle" fill="#6b6055" fontSize="9" fontFamily="'Cormorant Garamond', serif">Natural / unheated</text>
      </g>
      {/* Arrows showing rotation */}
      <path d="M240,170 Q310,140 340,170" fill="none" stroke="#4a4035" strokeWidth="1.5" markerEnd="url(#arr)" />
      <path d="M460,170 Q530,140 560,170" fill="none" stroke="#4a4035" strokeWidth="1.5" />
      <text x="290" y="145" fill="#6b6055" fontSize="9" fontFamily="'Cormorant Garamond', serif">rotate 90°</text>
      <text x="510" y="145" fill="#6b6055" fontSize="9" fontFamily="'Cormorant Garamond', serif">rotate 90°</text>
      {/* Heat treatment annotation */}
      <g transform="translate(400,320)">
        <text x="0" y="0" textAnchor="middle" fill="#a0522d" fontSize="10" fontFamily="'Cormorant Garamond', serif">Heat treatment at 500–600°C removes burgundy axis → stone becomes dichroic (blue + violet only)</text>
      </g>
    </svg>
  );
}

function TimelineSVG() {
  const events = [
    { year: "1967", label: "Jumanne Ngoma finds\nblue crystals", color: "#3d2b7a" },
    { year: "1968", label: "Tiffany names it\n'Tanzanite'", color: "#6a50c0" },
    { year: "1971", label: "Mines\nnationalized", color: "#a0522d" },
    { year: "1990", label: "Blocks A–D\ndemarcated", color: "#8b6914" },
    { year: "2002", label: "December\nbirthstone", color: "#3d2b7a" },
    { year: "2010", label: "Raw export\nban (>1g)", color: "#a0522d" },
    { year: "2018", label: "24km wall built;\nNgoma honoured", color: "#8b6914" },
    { year: "2020", label: "Laizer: largest\nstones ever", color: "#6a50c0" },
  ];
  const w = 900, h = 200, pad = 60;
  const spacing = (w - pad * 2) / (events.length - 1);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block", background: "#f5f0e8" }}>
      <text x={w / 2} y="20" textAnchor="middle" fill="#1a1410" fontSize="13" fontWeight="600" fontFamily="'Cormorant Garamond', serif" letterSpacing="2">TIMELINE — FROM DISCOVERY TO SCARCITY</text>
      {/* Main line */}
      <line x1={pad} y1={100} x2={w - pad} y2={100} stroke="#c9a84c" strokeWidth="2" />
      {events.map((e, i) => {
        const x = pad + i * spacing;
        const above = i % 2 === 0;
        return (
          <g key={i}>
            <circle cx={x} cy={100} r="5" fill={e.color} />
            <line x1={x} y1={100} x2={x} y2={above ? 55 : 145} stroke={e.color} strokeWidth="1" opacity="0.5" />
            <text x={x} y={above ? 45 : 160} textAnchor="middle" fill="#1a1410" fontSize="11" fontWeight="700" fontFamily="'Cormorant Garamond', serif">{e.year}</text>
            {e.label.split("\n").map((line, j) => (
              <text key={j} x={x} y={(above ? 45 : 160) + 13 + j * 12} textAnchor="middle" fill="#4a4035" fontSize="9" fontFamily="'Cormorant Garamond', serif">{line}</text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

function MiningBlocksSVG() {
  return (
    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block", background: "#f5f0e8" }}>
      <text x="400" y="25" textAnchor="middle" fill="#1a1410" fontSize="14" fontWeight="600" fontFamily="'Cormorant Garamond', serif" letterSpacing="2">MERELANI MINING BLOCKS — 7 km × 2 km</text>
      <text x="400" y="42" textAnchor="middle" fill="#6b6055" fontSize="10" fontFamily="'Cormorant Garamond', serif">The only commercial tanzanite deposit on Earth. Simanjiro District, Manyara Region, Tanzania</text>
      {/* Simplified map of the mining strip */}
      <g transform="translate(100,70)">
        {/* Terrain background */}
        <rect x="0" y="0" width="600" height="280" rx="8" fill="#e0d8c8" />
        {/* Block A */}
        <rect x="20" y="30" width="120" height="220" rx="4" fill="#c9a84c" opacity="0.4" stroke="#c9a84c" strokeWidth="2" />
        <text x="80" y="140" textAnchor="middle" fill="#8b6914" fontSize="18" fontWeight="700" fontFamily="'Cormorant Garamond', serif">A</text>
        <text x="80" y="160" textAnchor="middle" fill="#4a4035" fontSize="9" fontFamily="'Cormorant Garamond', serif">Kilimanjaro</text>
        <text x="80" y="172" textAnchor="middle" fill="#4a4035" fontSize="9" fontFamily="'Cormorant Garamond', serif">Mines Ltd</text>
        {/* Block B */}
        <rect x="160" y="30" width="120" height="220" rx="4" fill="#a0522d" opacity="0.3" stroke="#a0522d" strokeWidth="2" />
        <text x="220" y="140" textAnchor="middle" fill="#a0522d" fontSize="18" fontWeight="700" fontFamily="'Cormorant Garamond', serif">B</text>
        <text x="220" y="160" textAnchor="middle" fill="#4a4035" fontSize="9" fontFamily="'Cormorant Garamond', serif">Small-scale</text>
        <text x="220" y="172" textAnchor="middle" fill="#4a4035" fontSize="9" fontFamily="'Cormorant Garamond', serif">miners</text>
        <text x="220" y="200" textAnchor="middle" fill="#8b3030" fontSize="8" fontFamily="'Cormorant Garamond', serif">2008: 57 killed</text>
        <text x="220" y="212" textAnchor="middle" fill="#8b3030" fontSize="8" fontFamily="'Cormorant Garamond', serif">in flash floods</text>
        {/* Block C */}
        <rect x="300" y="30" width="120" height="220" rx="4" fill="#3d2b7a" opacity="0.25" stroke="#3d2b7a" strokeWidth="2" />
        <text x="360" y="140" textAnchor="middle" fill="#3d2b7a" fontSize="18" fontWeight="700" fontFamily="'Cormorant Garamond', serif">C</text>
        <text x="360" y="160" textAnchor="middle" fill="#4a4035" fontSize="9" fontFamily="'Cormorant Garamond', serif">TanzaniteOne /</text>
        <text x="360" y="172" textAnchor="middle" fill="#4a4035" fontSize="9" fontFamily="'Cormorant Garamond', serif">Richland + STAMICO</text>
        <text x="360" y="192" textAnchor="middle" fill="#3d2b7a" fontSize="8" fontFamily="'Cormorant Garamond', serif">Only mechanised</text>
        <text x="360" y="204" textAnchor="middle" fill="#3d2b7a" fontSize="8" fontFamily="'Cormorant Garamond', serif">operation</text>
        {/* Block D */}
        <rect x="440" y="30" width="140" height="220" rx="4" fill="#a0522d" opacity="0.3" stroke="#a0522d" strokeWidth="2" />
        <text x="510" y="140" textAnchor="middle" fill="#a0522d" fontSize="18" fontWeight="700" fontFamily="'Cormorant Garamond', serif">D</text>
        <text x="510" y="160" textAnchor="middle" fill="#4a4035" fontSize="9" fontFamily="'Cormorant Garamond', serif">350+ artisanal pits</text>
        <text x="510" y="172" textAnchor="middle" fill="#4a4035" fontSize="9" fontFamily="'Cormorant Garamond', serif">Small-scale miners</text>
        <text x="510" y="200" textAnchor="middle" fill="#6a50c0" fontSize="8" fontWeight="600" fontFamily="'Cormorant Garamond', serif">2020: Laizer's record</text>
        <text x="510" y="212" textAnchor="middle" fill="#6a50c0" fontSize="8" fontFamily="'Cormorant Garamond', serif">find (9.27 kg stone)</text>
      </g>
      {/* Annotations */}
      <g transform="translate(100,370)">
        <text x="0" y="0" fill="#1a1410" fontSize="10" fontFamily="'Cormorant Garamond', serif">
          <tspan fontWeight="600">↑ N</tspan> — Kilimanjaro visible 50 km to the northeast
        </text>
        <text x="0" y="18" fill="#6b6055" fontSize="9" fontFamily="'Cormorant Garamond', serif">Mining area enclosed by 24 km perimeter wall (built 2018). Production rose from 148 kg (2018) to record 781 kg (2019) after wall construction.</text>
        <text x="0" y="34" fill="#6b6055" fontSize="9" fontFamily="'Cormorant Garamond', serif">Blocks B and D: artisanal miners use hand tools, wooden ladders, small compressors. Shafts reach 400+ metres with no elevators.</text>
        <text x="0" y="50" fill="#c9a84c" fontSize="9" fontWeight="600" fontFamily="'Cormorant Garamond', serif">■ Large operator {"  "}<tspan fill="#a0522d">■ Artisanal / small-scale {"  "}</tspan><tspan fill="#3d2b7a">■ Mixed (corporate + state)</tspan></text>
      </g>
    </svg>
  );
}

function MarketSVG() {
  return (
    <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block", background: "#f5f0e8" }}>
      <text x="400" y="25" textAnchor="middle" fill="#1a1410" fontSize="14" fontWeight="600" fontFamily="'Cormorant Garamond', serif" letterSpacing="2">THE TANZANITE VALUE CHAIN</text>
      {/* Flow diagram */}
      {[
        { x: 80, y: 120, w: 120, label: "MERELANI\nMINES", sub: "7 km² deposit\n30,000+ miners", color: "#a0522d" },
        { x: 250, y: 120, w: 120, label: "ARUSHA\nMARKET", sub: "Sorting, grading\nGovernment hub", color: "#8b6914" },
        { x: 420, y: 80, w: 120, label: "JAIPUR\nINDIA", sub: "Cutting centre\n(pre-2010 raw)", color: "#3d2b7a" },
        { x: 420, y: 200, w: 120, label: "LOCAL\nCUTTING", sub: "Post-2010 policy\nvalue-added push", color: "#6a50c0" },
        { x: 620, y: 120, w: 140, label: "GLOBAL\nMARKETS", sub: "USA 70%  India  Japan\n$100–$800/carat", color: "#c9a84c" },
      ].map((box, i) => (
        <g key={i}>
          <rect x={box.x} y={box.y} width={box.w} height={80} rx="4" fill={box.color} opacity="0.15" stroke={box.color} strokeWidth="1.5" />
          {box.label.split("\n").map((line, j) => (
            <text key={j} x={box.x + box.w / 2} y={box.y + 25 + j * 16} textAnchor="middle" fill={box.color} fontSize="11" fontWeight="700" fontFamily="'Cormorant Garamond', serif">{line}</text>
          ))}
          {box.sub.split("\n").map((line, j) => (
            <text key={`s${j}`} x={box.x + box.w / 2} y={box.y + 58 + j * 11} textAnchor="middle" fill="#4a4035" fontSize="8" fontFamily="'Cormorant Garamond', serif">{line}</text>
          ))}
        </g>
      ))}
      {/* Arrows */}
      <line x1="200" y1="160" x2="245" y2="160" stroke="#4a4035" strokeWidth="1.5" markerEnd="url(#arrowHead)" />
      <line x1="370" y1="140" x2="415" y2="115" stroke="#4a4035" strokeWidth="1.5" />
      <line x1="370" y1="175" x2="415" y2="220" stroke="#4a4035" strokeWidth="1.5" />
      <line x1="540" y1="115" x2="615" y2="140" stroke="#4a4035" strokeWidth="1.5" />
      <line x1="540" y1="240" x2="615" y2="175" stroke="#4a4035" strokeWidth="1.5" />
      {/* Key stats */}
      <g transform="translate(80,310)">
        <text x="0" y="0" fill="#1a1410" fontSize="11" fontWeight="600" fontFamily="'Cormorant Garamond', serif">Key figures:</text>
        <text x="0" y="18" fill="#4a4035" fontSize="9" fontFamily="'Cormorant Garamond', serif">$300M+ annual export earnings · 1,000× rarer than diamonds · Reserves estimated to last 20–30 years</text>
        <text x="0" y="34" fill="#4a4035" fontSize="9" fontFamily="'Cormorant Garamond', serif">2011 production: 2.4M carats (480 kg) · 2019 record: 781 kg · Price range: $100–$800/ct depending on grade</text>
        <text x="0" y="50" fill="#8b3030" fontSize="9" fontFamily="'Cormorant Garamond', serif">Le Vian estimate: Laizer's $3.3M sale was "only a twentieth of the potential retail value"</text>
      </g>
    </svg>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function TanzaniteArticle() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=Source+Serif+4:ital,wght@0,400;0,500;1,400&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        .ng-article {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          color: ${COLORS.text};
          background: ${COLORS.cream};
          max-width: 100%;
          overflow-x: hidden;
        }
        .ng-article p {
          font-size: 19px;
          line-height: 1.75;
          margin-bottom: 1.5em;
          font-weight: 400;
          letter-spacing: 0.01em;
        }
        .ng-article p:first-of-type::first-letter {
          font-family: 'Playfair Display', serif;
          font-size: 4.2em;
          float: left;
          line-height: 0.8;
          margin-right: 0.08em;
          margin-top: 0.05em;
          color: ${COLORS.tanzaniteMid};
        }
        .hero-wrap { position: relative; }
        .hero-title-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 40px 8% 30px;
          background: linear-gradient(transparent, rgba(10,5,15,0.85));
        }
        .headline {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: clamp(32px, 5vw, 60px);
          color: white;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }
        .deck {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(16px, 2.2vw, 22px);
          color: ${COLORS.goldLight};
          font-weight: 400;
          font-style: italic;
          line-height: 1.4;
          max-width: 700px;
        }
        .ng-yellow-bar {
          width: 60px;
          height: 4px;
          background: ${COLORS.gold};
          margin-bottom: 16px;
        }
        .prose-wrap {
          max-width: 720px;
          margin: 0 auto;
          padding: 50px 24px 30px;
        }
        .pull-quote {
          font-family: 'Playfair Display', serif;
          font-size: clamp(22px, 3vw, 32px);
          font-weight: 700;
          font-style: italic;
          color: ${COLORS.tanzaniteMid};
          border-left: 4px solid ${COLORS.gold};
          padding: 20px 30px;
          margin: 40px -20px;
          line-height: 1.35;
        }
        .figure-wrap {
          margin: 50px 0;
        }
        .figure-wrap.full-bleed {
          margin-left: -24px;
          margin-right: -24px;
          max-width: calc(100% + 48px);
        }
        .fig-caption {
          font-size: 13px;
          color: ${COLORS.caption};
          line-height: 1.5;
          padding: 10px 0 0;
          font-style: italic;
          border-top: 1px solid ${COLORS.creamDark};
          margin-top: 6px;
        }
        .fig-caption strong {
          color: ${COLORS.text};
          font-style: normal;
          font-weight: 600;
        }
        .sidebar-box {
          background: ${COLORS.creamDark};
          border-left: 3px solid ${COLORS.gold};
          padding: 24px 28px;
          margin: 40px 0;
        }
        .sidebar-box h4 {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          font-weight: 700;
          color: ${COLORS.tanzaniteMid};
          margin-bottom: 10px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .sidebar-box p {
          font-size: 15px;
          line-height: 1.6;
          margin-bottom: 0.8em;
        }
        .sidebar-box p:last-child { margin-bottom: 0; }
        .source-note {
          background: ${COLORS.warmBlack};
          color: ${COLORS.creamDark};
          padding: 40px 8%;
        }
        .source-note h3 {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          font-weight: 700;
          color: ${COLORS.gold};
          margin-bottom: 16px;
          letter-spacing: 1px;
        }
        .source-note p, .source-note li {
          font-size: 13px;
          line-height: 1.6;
          color: ${COLORS.creamDark};
          opacity: 0.8;
        }
        .source-note ul { list-style: none; padding: 0; }
        .source-note li { padding: 3px 0; }
        .source-note li::before { content: "— "; color: ${COLORS.gold}; }
        .source-section { margin-bottom: 20px; }
        .source-section-title {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: ${COLORS.goldLight};
          margin-bottom: 8px;
          font-weight: 600;
        }
        .ng-footer {
          text-align: center;
          padding: 30px;
          background: ${COLORS.warmBlack};
          border-top: 3px solid ${COLORS.gold};
        }
        .ng-footer-brand {
          font-family: 'Playfair Display', serif;
          font-size: 14px;
          font-weight: 700;
          color: ${COLORS.gold};
          letter-spacing: 3px;
          text-transform: uppercase;
        }
        .ng-footer-sub {
          font-size: 11px;
          color: ${COLORS.creamDark};
          opacity: 0.5;
          margin-top: 8px;
        }
        .img-brief {
          background: #1a1410;
          color: ${COLORS.creamDark};
          padding: 16px 20px;
          margin-top: -4px;
          font-size: 11px;
          line-height: 1.5;
        }
        .img-brief .brief-label {
          color: ${COLORS.gold};
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 10px;
        }
      `}</style>

      <div className="ng-article" style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.8s" }}>

        {/* ═══ HERO ═══ */}
        <div className="hero-wrap">
          <HeroSVG />
          <div className="hero-title-overlay">
            <div className="ng-yellow-bar" />
            <h1 className="headline">Born from Fire</h1>
            <p className="deck">
              Deep beneath Tanzania's Merelani Hills, young men descend 400 metres on wooden ladders to extract the only gemstone on Earth found in a single place. The deposit could be exhausted within a generation. This is the story of the people who mine it — and the country fighting to keep its wealth.
            </p>
          </div>
        </div>

        {/* Image Brief */}
        <div className="img-brief">
          <span className="brief-label">Hero Image Brief — </span>
          Subject: Tanzanite crystal cluster emerging from brown graphitic gneiss matrix, backlit by dusk sky with Kilimanjaro silhouette.
          Location: Merelani Hills, Simanjiro District, Manyara Region, Tanzania.
          Time: Blue hour, 15 minutes after sunset. Reason: the gemstone's blue-violet mirrors the transitional sky.
          Camera: Macro 100mm, f/2.8, focus-stacked. Low angle, crystal at eye level against sky.
          Action: A miner's calloused hand holds the raw specimen at arm's length, just pulled from the earth.
          Emotional truth: The gap between what emerges from the ground and what appears in a Tiffany's window.
          Visual function: Establishing.
        </div>

        {/* ═══ PROSE ═══ */}
        <div className="prose-wrap">

          <p>
            Four hundred metres below the surface of the Merelani Hills, in a tunnel barely wider than a man's shoulders, Emmanuel Mollel wedges his bare foot against a wooden rung and shifts his weight downward. He is nineteen years old. The air compressor feeding his hose coughs and recovers sixty seconds of silence above him, and for those sixty seconds the only sound is the scrape of his own breathing against rock that has not seen light in 585 million years. The headlamp strapped to his construction helmet — not a mining helmet, because there are no mining helmets in Block D — throws a cone of amber into the graphite-streaked gneiss. Somewhere below, in a fault zone where tectonic forces once folded the Mozambique Belt into the Lelatema Mountains, a seam of blue zoisite waits in the dark, its vanadium-laced lattice holding a colour that exists nowhere else on Earth.
          </p>

          <p>
            Tanzanite is a geological accident of exquisite improbability. It required a precise combination of vanadium, chromium, and calcium aluminium silicate, heated under specific pressures inside a tectonic collision zone, to produce a mineral that refracts light along three optical axes into three entirely different colours — blue, violet, and burgundy — depending on the angle of view. Geologists call this trichroism, a property shared by very few minerals and mastered by none as dramatically as this one. The deposit occupies a strip of land seven kilometres long and two kilometres wide, running along the Lelatema fault in northern Tanzania, seventy kilometres southeast of Arusha and within sight of Kilimanjaro's glaciated summit. That is the entirety of the world's supply. Tanzanite is roughly a thousand times rarer than diamond by known reserves, and experts estimate the commercially viable deposit may be exhausted within twenty to thirty years.
          </p>

          <p>
            The stone's cultural history is, like the mineral itself, a story refracted through competing perspectives. The account officially recognised by the Tanzanian government credits Jumanne Mhero Ngoma, a Meru herdsman from Same District in the Kilimanjaro Region, with stumbling upon blue crystals in the Merelani foothills in January 1967. President Julius Nyerere awarded Ngoma a certificate and 50,000 Tanzanian shillings. A parallel account holds that Maasai herders noticed the crystals after a lightning-set grassfire exposed them at the surface — a story that carries the weight of Maasai oral tradition, in which tanzanite is called the stone born from fire. A third claimant, Manuel de Souza, a Goan tailor and part-time gold prospector living in Arusha, registered the first mining claims in July of the same year after finding fragments he initially mistook for sapphire, then dumortierite, before sending samples to the Gemological Institute of America for correct identification.
          </p>

          <div className="pull-quote">
            "The river has no name on any map. The people who fish it have seven."
            <br /><span style={{ fontSize: "14px", fontWeight: 400, fontStyle: "normal", color: COLORS.caption }}>— on the gap between Western taxonomy and local knowledge at Merelani</span>
          </div>

          <p>
            What happened next belongs to the history of global commodity branding. Henry B. Platt, a vice president of Tiffany & Co. and great-grandson of Louis Comfort Tiffany, saw the mineral and recognised not its geology but its marketing problem: the scientific name, blue zoisite, sounded uncomfortably like "blue suicide." Platt renamed it tanzanite — honouring the country, anchoring the stone's identity to a place — and Tiffany's launched an advertising campaign declaring that the gem could now be found "in Tanzania and at Tiffany's." It was an act of commercial genius that made a fortune for everyone except the man who found the stone. Ngoma spent the next five decades in a mud-walled house with a corrugated iron roof near Mererani, partially paralysed and in declining health. In 2018, his daughter Asha sent a text message to President John Magufuli. Magufuli responded publicly, calling Ngoma "a veritable Tanzanian hero" and awarding him 100 million shillings — approximately $44,000. Ngoma died in January 2019.
          </p>

          {/* ═══ FIGURE: Miner in shaft ═══ */}
          <div className="figure-wrap full-bleed">
            <MinerSVG />
            <div className="fig-caption">
              <strong>Down the ladder.</strong> An artisanal miner descends a wooden-rung shaft in Block D of the Merelani mines. At depths exceeding 400 metres, small compressors feed air through long hoses — when they work. Graphite dust coats the walls. There are no elevators, no safety harnesses, no escape routes. Between 2002 and 2021, hundreds of miners have died in tunnel collapses, suffocations, and flash floods in these shafts.
            </div>
          </div>

          <p>
            The story of tanzanite's extraction is the story of two worlds sharing a single hillside. In Block C, TanzaniteOne — now majority-owned by STAMICO, the Tanzanian State Mining Company, following a 2010 law requiring fifty per cent government equity — operates the only mechanised tanzanite mine on Earth. Covered shafts, pumping equipment, geological surveys. When flash floods struck in 2008, Block C lost no lives. Across the boundary in Blocks B and D, the landscape is different. More than 350 pits, operated by small-scale miners with hand tools, wooden ladders, and compressors that sometimes fail or are deliberately switched off by rival claimants. The shafts are interlinked by lateral tunnels, so water entering one open pit floods everyone. In March 2008, 155 millimetres of rain fell in ninety minutes. Fifty-seven miners in Block B drowned. Seventeen were never found.
          </p>

          <div className="sidebar-box">
            <h4>The Geology of Rarity</h4>
            <p>
              Tanzanite forms within sheared zones along deep-seated faults in the Lelatema Mountains, where the host rock is graphitic and gypsum-bearing gneiss surrounded by limestone. The mineral is a calcium aluminium hydroxyl sorosilicate — specifically, the vanadium-bearing variety of zoisite, coloured by trace amounts of V³⁺ ions substituting for aluminium in the crystal lattice. Formation required temperatures of approximately 600°C and pressures found at depths of 20–30 kilometres during the Pan-African orogeny, roughly 585 million years ago. The deposit was then uplifted and exposed by erosion. In its natural state, rough tanzanite is reddish-brown; heat treatment at 500–600°C removes the burgundy trichroic axis, producing the stable blue-violet colour seen in jewellery.
            </p>
          </div>

          <p>
            Emmanuel Mollel's morning begins at 5 a.m. in a corrugated shack at the edge of Block D, where he shares a room with three other miners from Arusha. He earns a percentage of whatever his team finds — which, most weeks, is nothing. The tanzanite economy operates on a logic that resembles venture capital more than wage labour: long periods of zero return punctuated by occasional windfalls. In June 2020, a small-scale mining boss named Saniniu Laizer — a fifty-two-year-old Maasai rancher with four wives and thirty-two children, who employs more than two hundred diggers in Block D — struck what gemologists call a pocket. His workers pulled two rough tanzanite stones from the earth: one weighing 9.27 kilograms, the other 5.1 kilograms. They were the largest tanzanite specimens ever found, by a factor of nearly three. Three weeks later, Laizer's company found a third stone weighing 6.3 kilograms. Laizer sold all three to the Tanzanian government for a combined $5.35 million. Eddie LeVian, CEO of Le Vian jewellers — a firm that during the 1980s and 1990s acquired half the world's entire tanzanite production — estimated the retail value at twenty times the sale price.
          </p>

          <p>
            Magufuli's government responded to the tanzanite economy with a strategy that mixed resource nationalism with infrastructure. In 2018, the government constructed a 24-kilometre perimeter wall around the entire mining area, manned by the army at a single checkpoint. The wall's purpose was to stop smuggling — Tanzania had lost an estimated $81 billion worth of gemstones between 1998 and 2017, according to the Ministry of Minerals. The effect was immediate: documented production rose from 148 kilograms in 2018 to a record 781 kilograms in 2019. The government also reduced the tax structure from a labyrinth of levies totalling over thirty per cent to a flat seven per cent royalty, creating an incentive for miners like Laizer to sell through official channels. The reforms worked — but they also concentrated power.
          </p>

          {/* ═══ FIGURE: Trichroism diagram ═══ */}
          <div className="figure-wrap full-bleed">
            <TrichroismSVG />
            <div className="fig-caption">
              <strong>Three colours, one crystal.</strong> Tanzanite's trichroism means a single stone displays blue, violet, and burgundy depending on the crystal axis through which light passes. Heat treatment at 500–600°C eliminates the burgundy axis, producing the dichroic blue-violet prized in jewellery. Nearly all commercially available tanzanite has been heat-treated — a process so universal it is not considered an enhancement requiring disclosure.
            </div>
          </div>

          <div className="sidebar-box">
            <h4>The Naming Game</h4>
            <p>
              Henry Platt's renaming of blue zoisite to "tanzanite" in 1968 was one of the most successful acts of commodity branding in gemstone history. The scientific name's phonetic resemblance to "blue suicide" was the stated reason, but the deeper strategy was anchoring the gem's identity to a single place — making geographic exclusivity the selling point. Tiffany's campaign declared the stone available "in Tanzania and at Tiffany's," collapsing an entire country into a luxury retail experience. In 2002, the American Gem Trade Association named tanzanite a December birthstone, the first addition to the birthstone list since 1912. The designation, lobbied for by the industry, guaranteed a permanent demand floor.
            </p>
          </div>

          <p>
            The metaphor that keeps returning at Merelani is vertical. Everything is measured in depth — the depth of the shafts, the depth of the colour, the depth of the inequality between those who dig and those who wear. The same stone that requires a nineteen-year-old to descend four hundred metres on a wooden ladder ends up in a Tiffany's display case under halogen spotlights, rotated to catch the blue axis. The supply chain between those two points passes through Arusha's sorting houses, through the government mineral hub where stones are weighed and taxed, through cutting workshops in Jaipur (before the 2010 ban on raw exports over one gram) or increasingly in local Tanzanian facilities, through wholesale dealers in New York and Hong Kong, and finally into the hands of consumers who, according to the Tanzanite Foundation's own surveys, largely cannot locate Tanzania on a map. The gemstone is named after a country most of its buyers have never visited, mined by people most of its buyers will never meet, and valued at prices that reflect Manhattan retail margins rather than Merelani labour costs.
          </p>

          {/* ═══ FIGURE: Timeline ═══ */}
          <div className="figure-wrap full-bleed">
            <TimelineSVG />
            <div className="fig-caption">
              <strong>From lightning strike to scarcity clock.</strong> Key moments in tanzanite's sixty-year journey from an accidental discovery by a Meru herdsman to a resource-nationalist case study and a gemstone whose commercial deposits may be exhausted within a generation.
            </div>
          </div>

          <p>
            The future of tanzanite is, like the mineral's formation, a question of pressure and time. The deposit is non-renewable. No other commercially viable source of gem-quality blue zoisite has been found anywhere on Earth, despite exploration in Kenya, Madagascar, and Pakistan. As the accessible high-grade zones in Blocks B and D are depleted, miners move to lower-grade areas, requiring more rock to be processed for fewer carats. The arithmetic is unforgiving: production costs rise, but price elasticity in the luxury gem market is limited. Experts disagree on timelines — some estimate twenty years of viable mining remain, others thirty — but no one disputes the direction. The question is not whether Merelani will run out, but what happens to the thirty thousand people who depend on it when it does.
          </p>

          {/* ═══ FIGURE: Mining blocks map ═══ */}
          <div className="figure-wrap full-bleed">
            <MiningBlocksSVG />
            <div className="fig-caption">
              <strong>The world's only tanzanite deposit, partitioned.</strong> In 1990, the Tanzanian government divided the Merelani mining area into four blocks. Blocks A and C were awarded to large operators; B and D to artisanal miners. The disparity in safety standards between mechanised Block C and artisanal Blocks B and D has cost hundreds of lives over three decades.
            </div>
          </div>

          <p>
            Tanzania's government under President Samia Suluhu Hassan, who succeeded Magufuli after his death in 2021, has continued the resource-nationalist approach while emphasising local value addition. The vision is to transform Tanzania from a raw-material exporter to a gemstone processing hub — cutting and polishing tanzanite domestically rather than shipping rough stones to Jaipur. It is a vision that requires infrastructure, training, and capital investment that the artisanal mining sector cannot provide on its own. In the meantime, Emmanuel Mollel descends the ladder each morning because the alternative — farming on marginal land in a district where annual rainfall is unpredictable — offers even less certainty.
          </p>

          {/* ═══ FIGURE: Value chain ═══ */}
          <div className="figure-wrap full-bleed">
            <MarketSVG />
            <div className="fig-caption">
              <strong>Following the stone.</strong> The tanzanite value chain from Merelani's artisanal pits to global retail markets. The United States accounts for roughly seventy per cent of end-consumer demand. Since 2010, Tanzania has banned the export of rough stones over one gram, seeking to capture more value domestically — but the cutting and polishing infrastructure remains nascent.
            </div>
          </div>

          <div className="sidebar-box">
            <h4>The Human Cost</h4>
            <p>
              Occupational health research published in the Tanzania Journal of Science documents chronic exposure to graphite, quartz, and mica dust in Merelani's unventilated shafts — conditions associated with silicosis and lung cancer. Compressor failure is the most feared event: at four hundred metres, oxygen deprivation kills in minutes. In 2002, forty-two miners died when an air pump failed in a single shaft. In 2008, flash floods killed fifty-seven in Block B. In 2021 alone, more than a dozen miners perished in separate incidents in Block D, including two nineteen-year-olds who suffocated at 1 a.m. in a pit with no emergency ventilation. The deceased were identified as Geoffrey William and Emmanuel Solomon, both residents of Arusha who had come to Merelani seeking the same thing everyone seeks there: the right fracture in the right fault zone, on the right day.
            </p>
          </div>

          <p>
            On the surface, the Merelani Hills look unremarkable — dry scrubland stippled with wooden shacks, dusty tracks, the distant white dome of Kilimanjaro hanging above the haze like a hallucination. Whirlwinds spiral lazily across the plain. A sign along the dirt road reads, "This road has been proudly built, sponsored and maintained by the Tanzanite Foundation." The road is unpaved. The mines are invisible from above; their shafts are vertical wounds in the earth, many no wider than a manhole cover, dropping into darkness. What emerges from those shafts — when anything emerges at all — is a reddish-brown crystal that looks, to an untrained eye, like a piece of dirty quartz. Only after heating to 500 degrees Celsius does the brown veil lift and the blue bloom, the way a Polaroid develops: colour rising from nothing, an entire spectrum assembling itself from an instruction set written 585 million years ago in a language of vanadium and pressure.
          </p>

          <p>
            The Maasai folktale holds that lightning struck the foothills of Kilimanjaro, scorching the earth, and in the ashes a blue crystal shimmered where none had been before. The geological truth is not so different. Metamorphism is the Earth's version of fire — heat and pressure transforming one thing into another, a mineral into a gemstone, a brown stone into a blue one, a herdsman's chance discovery into a multi-billion-dollar industry. What the folktale understands, and what the commodity markets do not, is that the fire is a one-time event. There will not be another Merelani. The tectonic accident that created tanzanite happened once, in one place, and when the last crystal is pulled from the ground, the colour will exist only in the stones already cut and set — each one a fragment of a fire that burned half a billion years ago, carried in a ring on a hand that has never touched the earth it came from.
          </p>

        </div>

        {/* ═══ SOURCE INTEGRITY NOTE ═══ */}
        <div className="source-note">
          <h3>Source Integrity Note</h3>

          <div className="source-section">
            <div className="source-section-title">Claims Requiring Expert Verification</div>
            <ul>
              <li>Estimate that tanzanite is "1,000 times rarer than diamond by known reserves" — frequently cited in trade sources but not peer-reviewed; requires independent geological verification</li>
              <li>$81 billion smuggling loss figure (1998–2017) cited by Tanzania Ministry of Minerals — methodology and independent audit status unclear</li>
              <li>20–30 year remaining commercial viability estimate — ranges vary significantly by source; requires updated geological survey data</li>
            </ul>
          </div>

          <div className="source-section">
            <div className="source-section-title">Data Sources</div>
            <ul>
              <li>Wikipedia: Tanzanite — production figures, discovery accounts, export legislation</li>
              <li>Lotus Gemology (lotusgemology.com): "Working the Blueseam" field report</li>
              <li>Tanzania Journal of Science, Vol. 31 (2005): Malisa & Kinabo, environmental and health risks at Merelani</li>
              <li>CNN, Fortune, Mail & Guardian (2020): Saniniu Laizer discovery coverage</li>
              <li>Anadolu Agency (2017): Jumanne Ngoma poverty profile</li>
              <li>JCK (2002, 2008): Mine disaster reporting</li>
              <li>The Citizen (Tanzania), 2018: Magufuli honours Ngoma</li>
              <li>Wilson, Saul, Pardieu, Hughes (2009): "Famous Mineral Localities: Merelani Tanzanite Mines," The Mineralogical Record, 40(5), 346–408</li>
            </ul>
          </div>

          <div className="source-section">
            <div className="source-section-title">Fieldwork & Photography Requiring Access</div>
            <ul>
              <li>Block D artisanal mine shafts — requires coordination with local claim holders and Manyara regional authorities</li>
              <li>TanzaniteOne/STAMICO Block C operations — historically restricted; managing director approval required</li>
              <li>Arusha mineral trading hub — public access but photography may be restricted</li>
              <li>Naisinyai village (Laizer's compound) — requires community consent and Maasai cultural protocols</li>
            </ul>
          </div>

          <div className="source-section">
            <div className="source-section-title">Scientifically Contested Claims</div>
            <ul>
              <li>Discovery attribution: Tanzanian government credits Jumanne Ngoma (1967); TanzaniteOne historically credited Ali Juu Ya Watu; Manuel de Souza registered first claims. Article presents all three accounts.</li>
              <li>Reserve depletion timeline: estimates range from "fewer than 20 years" to "30+ years" depending on extraction rates and depth accessibility</li>
            </ul>
          </div>

          <div className="source-section">
            <div className="source-section-title">Voices to Add in Full Editorial Process</div>
            <ul>
              <li>Artisanal miners in Blocks B and D — first-person accounts of working conditions</li>
              <li>Maasai community leaders in Naisinyai and surrounding villages — impact of mining on pastoral livelihoods</li>
              <li>Tanzanian geologists at the University of Dar es Salaam — independent reserve estimates</li>
              <li>Women in the tanzanite economy — roles in sorting, trading, and community support</li>
              <li>Saniniu Laizer's family — perspective on the gap between sale price and retail value</li>
              <li>Cutters and polishers in nascent Tanzanian processing facilities — progress on domestic value addition</li>
            </ul>
          </div>
        </div>

        {/* ═══ FOOTER ═══ */}
        <div className="ng-footer">
          <div className="ng-footer-brand">National Geographic</div>
          <div className="ng-footer-sub">Science · Geology · East Africa</div>
        </div>
      </div>
    </>
  );
}
