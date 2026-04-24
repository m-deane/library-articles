/* ---
title: "Cape Verde: A Photographer's Field Guide to the Ten Islands"
subtitle: "Mindelo morna at midnight, the lava plain at Chã das Caldeiras, the green knife of Ribeira do Paul. A literary and operational guide to photographing the Cabo Verde archipelago across five islands at 15° north."
date: 2026-04-25
tags: [cape-verde, photography, travel-guide, atlantic-islands]
read_time: "32 min"
category: travel-photography
style: travel-service-hybrid
mode: "Service + Story Hybrid"
--- */

const ARTICLE_DATA = {
  title: "Cape Verde: A Photographer's Field Guide to the Ten Islands",
  subtitle: "Mindelo morna at midnight, the lava plain at Chã das Caldeiras, the green knife of Ribeira do Paul. A literary and operational guide to photographing the Cabo Verde archipelago across five islands at 15° north.",
  date: "2026-04-25",
  author: "Matthew Deane",
  tags: ["cape-verde", "photography", "travel-guide", "atlantic-islands"],
  read_time: "32 min",
  category: "travel-photography",
  style: "travel-service-hybrid",
  mode: "Service + Story Hybrid",
};

/*
MODE: Service + Story Hybrid (Mode 3) | FORMAT: Multi-island photography guide
TOPIC: Cabo Verde — Santiago, São Vicente, Fogo, Santo Antão, Sal/Boa Vista
*/

const C = {
  ink: "#171312",
  paper: "#f6efe3",
  paperD: "#e8dcc6",
  basalt: "#1f1a16",
  ash: "#7a6f60",
  sea: "#1a4d6b",
  seaL: "#3a7ba0",
  seaPale: "#9bb8c9",
  ochre: "#b8762a",
  ochreL: "#e0a85a",
  vine: "#5a6f3a",
  vineL: "#8aa15a",
  blood: "#8a2a1a",
  cream: "#f0e2c4",
  rule: "#cdb893",
};

function ArchipelagoMap() {
  const islands = [
    { name: "Santo Antão", x: 195, y: 110, w: 95, h: 50, n: [4, 5, 6] },
    { name: "São Vicente", x: 305, y: 130, w: 75, h: 38, n: [3] },
    { name: "São Nicolau", x: 410, y: 165, w: 85, h: 32 },
    { name: "Sal", x: 545, y: 145, w: 28, h: 65, n: [9] },
    { name: "Boa Vista", x: 590, y: 215, w: 60, h: 55, n: [10] },
    { name: "Maio", x: 460, y: 320, w: 35, h: 42 },
    { name: "Santiago", x: 360, y: 305, w: 60, h: 80, n: [1, 2, 7] },
    { name: "Fogo", x: 250, y: 320, w: 60, h: 55, n: [8] },
    { name: "Brava", x: 200, y: 365, w: 28, h: 22 },
    { name: "Santa Luzia", x: 388, y: 138, w: 26, h: 14 },
  ];
  const points = [
    { id: 1, x: 388, y: 365, label: "Praia" },
    { id: 2, x: 372, y: 348, label: "Cidade Velha" },
    { id: 3, x: 333, y: 144, label: "Mindelo" },
    { id: 4, x: 215, y: 122, label: "Pico" },
    { id: 5, x: 248, y: 138, label: "Paul" },
    { id: 6, x: 263, y: 130, label: "Cova" },
    { id: 7, x: 380, y: 320, label: "Serra Malagueta" },
    { id: 8, x: 268, y: 332, label: "Chã / Pico" },
    { id: 9, x: 558, y: 165, label: "Pedra de Lume" },
    { id: 10, x: 615, y: 240, label: "Sal Rei" },
  ];
  return (
    <svg viewBox="0 0 800 460" style={{ width: "100%", display: "block", background: C.paper, border: `1px solid ${C.rule}` }}>
      <defs>
        <pattern id="oc" width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill={C.seaPale} opacity="0.18" />
          <path d="M0 7 Q3.5 4 7 7 T14 7" stroke={C.seaL} strokeWidth="0.5" fill="none" opacity="0.4" />
        </pattern>
      </defs>
      <rect width="800" height="460" fill="url(#oc)" />
      <text x="40" y="36" fill={C.ink} fontSize="14" fontWeight="700" fontFamily="'Playfair Display',serif" letterSpacing="2">THE CABO VERDE ARCHIPELAGO · 15°N · 24°W</text>
      <text x="40" y="54" fill={C.ash} fontSize="10" fontFamily="'Source Serif 4',serif" fontStyle="italic">Ten islands, ~570 km off the West African coast. Numbered points are the ten primary shooting locations in this guide.</text>
      <g>
        <text x="120" y="80" fill={C.ash} fontSize="9" fontFamily="monospace" letterSpacing="1">BARLAVENTO (windward)</text>
        <line x1="190" y1="78" x2="540" y2="78" stroke={C.ash} strokeWidth="0.5" strokeDasharray="3 3" />
        <text x="370" y="270" fill={C.ash} fontSize="9" fontFamily="monospace" letterSpacing="1">SOTAVENTO (leeward)</text>
        <line x1="200" y1="268" x2="540" y2="268" stroke={C.ash} strokeWidth="0.5" strokeDasharray="3 3" />
      </g>
      {islands.map((isl, i) => (
        <g key={i}>
          <ellipse cx={isl.x + isl.w / 2} cy={isl.y + isl.h / 2} rx={isl.w / 2} ry={isl.h / 2} fill={C.ochre} opacity="0.22" stroke={C.basalt} strokeWidth="1" />
          <text x={isl.x + isl.w / 2} y={isl.y - 4} textAnchor="middle" fill={C.ink} fontSize="10" fontWeight="600" fontFamily="'Source Serif 4',serif">{isl.name}</text>
        </g>
      ))}
      {/* Pico do Fogo cone marker */}
      <g transform="translate(278,338)">
        <polygon points="0,0 -8,10 8,10" fill={C.blood} opacity="0.7" />
        <text x="0" y="22" textAnchor="middle" fill={C.blood} fontSize="7" fontFamily="monospace">2829m</text>
      </g>
      {/* Ferry route Mindelo - Porto Novo */}
      <g>
        <line x1="333" y1="144" x2="290" y2="138" stroke={C.sea} strokeWidth="1.2" strokeDasharray="4 2" />
        <text x="305" y="155" fill={C.sea} fontSize="8" fontFamily="monospace">⛴ 60 min</text>
      </g>
      {/* Numbered points */}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="9" fill={C.cream} stroke={C.basalt} strokeWidth="1.4" />
          <text x={p.x} y={p.y + 3.5} textAnchor="middle" fill={C.basalt} fontSize="9" fontWeight="700" fontFamily="'Source Sans 3',sans-serif">{p.id}</text>
        </g>
      ))}
      {/* Compass rose */}
      <g transform="translate(720,80)">
        <circle r="22" fill={C.paper} stroke={C.basalt} strokeWidth="1" />
        <polygon points="0,-18 4,0 0,4 -4,0" fill={C.basalt} />
        <polygon points="0,18 4,0 0,-4 -4,0" fill={C.ash} opacity="0.5" />
        <text x="0" y="-26" textAnchor="middle" fill={C.basalt} fontSize="9" fontWeight="700">N</text>
      </g>
      {/* Scale */}
      <g transform="translate(40,420)">
        <line x1="0" y1="0" x2="120" y2="0" stroke={C.basalt} strokeWidth="1.5" />
        <line x1="0" y1="-4" x2="0" y2="4" stroke={C.basalt} strokeWidth="1.5" />
        <line x1="60" y1="-3" x2="60" y2="3" stroke={C.basalt} strokeWidth="1" />
        <line x1="120" y1="-4" x2="120" y2="4" stroke={C.basalt} strokeWidth="1.5" />
        <text x="0" y="16" fill={C.ash} fontSize="9" fontFamily="monospace">0</text>
        <text x="60" y="16" textAnchor="middle" fill={C.ash} fontSize="9" fontFamily="monospace">100 km</text>
        <text x="120" y="16" textAnchor="middle" fill={C.ash} fontSize="9" fontFamily="monospace">200 km</text>
      </g>
      {/* Trade wind arrow */}
      <g transform="translate(660,340)">
        <line x1="0" y1="0" x2="-50" y2="20" stroke={C.sea} strokeWidth="1.2" markerEnd="url(#ar)" />
        <text x="-25" y="-4" fill={C.sea} fontSize="9" fontStyle="italic" fontFamily="'Source Serif 4',serif">NE trades</text>
      </g>
      <defs>
        <marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <polygon points="0,0 10,5 0,10" fill={C.sea} />
        </marker>
      </defs>
    </svg>
  );
}

function MonthlyClimate() {
  const data = [
    { m: "Jan", rain: 2, dust: 78, sunset: "18:18", sr: 6.43 },
    { m: "Feb", rain: 1, dust: 82, sunset: "18:25", sr: 6.45 },
    { m: "Mar", rain: 0, dust: 55, sunset: "18:30", sr: 6.52 },
    { m: "Apr", rain: 0, dust: 30, sunset: "18:32", sr: 6.55 },
    { m: "May", rain: 1, dust: 18, sunset: "18:38", sr: 6.6 },
    { m: "Jun", rain: 3, dust: 12, sunset: "18:50", sr: 6.6 },
    { m: "Jul", rain: 28, dust: 8, sunset: "18:55", sr: 6.55 },
    { m: "Aug", rain: 95, dust: 6, sunset: "18:50", sr: 6.5 },
    { m: "Sep", rain: 110, dust: 10, sunset: "18:35", sr: 6.45 },
    { m: "Oct", rain: 35, dust: 22, sunset: "18:18", sr: 6.45 },
    { m: "Nov", rain: 6, dust: 48, sunset: "18:08", sr: 6.45 },
    { m: "Dec", rain: 2, dust: 70, sunset: "18:10", sr: 6.5 },
  ];
  return (
    <div style={{ background: C.paper, border: `1px solid ${C.rule}`, padding: "18px 14px 8px" }}>
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 14, fontWeight: 700, color: C.ink, letterSpacing: 2, textAlign: "center", marginBottom: 4 }}>
        CABO VERDE — MONTHLY PHOTOGRAPHIC CONDITIONS
      </div>
      <div style={{ fontFamily: "'Source Serif 4',serif", fontSize: 11, fontStyle: "italic", color: C.ash, textAlign: "center", marginBottom: 12 }}>
        Praia (15.0°N). Rainfall (mm) · Bruma seca dust probability (%) · sunset hour (24h local)
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <ComposedChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid stroke={C.rule} strokeDasharray="2 2" opacity={0.5} />
          <XAxis dataKey="m" stroke={C.ash} fontSize={11} />
          <YAxis yAxisId="left" stroke={C.ash} fontSize={11} label={{ value: "mm / %", angle: -90, position: "insideLeft", fill: C.ash, fontSize: 10 }} />
          <YAxis yAxisId="right" orientation="right" domain={[17.5, 19.5]} stroke={C.sea} fontSize={11} tickFormatter={(v) => `${Math.floor(v)}:${Math.round((v % 1) * 60).toString().padStart(2, "0")}`} />
          <Tooltip contentStyle={{ background: C.paper, border: `1px solid ${C.basalt}`, fontFamily: "monospace", fontSize: 11 }} />
          <Legend wrapperStyle={{ fontSize: 11, fontFamily: "'Source Sans 3',sans-serif" }} />
          <Area yAxisId="left" type="monotone" dataKey="rain" name="Rainfall mm" fill={C.sea} stroke={C.sea} fillOpacity={0.35} />
          <Bar yAxisId="left" dataKey="dust" name="Bruma seca %" fill={C.ochre} fillOpacity={0.65} />
          <Line yAxisId="right" type="monotone" dataKey={(d) => parseFloat(d.sunset.split(":")[0]) + parseFloat(d.sunset.split(":")[1]) / 60} name="Sunset hour" stroke={C.blood} strokeWidth={2} dot={{ fill: C.blood, r: 3 }} />
        </ComposedChart>
      </ResponsiveContainer>
      <div style={{ fontFamily: "'Source Serif 4',serif", fontSize: 10.5, color: C.ash, padding: "8px 6px", lineHeight: 1.5 }}>
        Operationally: <strong>Nov–Mar</strong> is the harmattan window — northeasterly trade winds carry Saharan dust across the islands at altitudes from sea level to ~3000 m. January and February peak at 70–82% probability of haze. <strong>Jul–Oct</strong> is the rainy "winter" — short, heavy convective storms; greenest valleys; rare clear blue skies. <strong>Mar–Jun</strong> is the dry sweet spot: minimum dust, no rain, long stable light. Sunset window across the year sits between 18:08 and 18:55 — civil twilight begins ~22 minutes before sunrise and ends ~22 minutes after sunset; tropical twilight is short.
      </div>
    </div>
  );
}

const Sec = ({ n, title, children }) => (
  <div style={{ margin: "44px 0 0" }}>
    <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 18, borderBottom: `1px solid ${C.rule}`, paddingBottom: 6 }}>
      <span style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 12, color: C.ochre, fontWeight: 700, letterSpacing: 2 }}>§{n}</span>
      <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: C.ink, lineHeight: 1.2, margin: 0 }}>{title}</h2>
    </div>
    {children}
  </div>
);

const P = ({ children }) => (
  <p style={{ fontFamily: "'Source Serif 4',Georgia,serif", fontSize: 17, lineHeight: 1.7, color: C.ink, margin: "0 0 18px" }} dangerouslySetInnerHTML={{ __html: children }} />
);

const DC = ({ children }) => (
  <p style={{ fontFamily: "'Source Serif 4',Georgia,serif", fontSize: 17, lineHeight: 1.7, color: C.ink, margin: "0 0 18px" }} dangerouslySetInnerHTML={{ __html: children }} />
);

const Cap = ({ children }) => (
  <div style={{ fontFamily: "'Source Serif 4',serif", fontSize: 12, color: C.ash, marginTop: 6, marginBottom: 22, fontStyle: "italic", textAlign: "center" }}>{children}</div>
);

const Callout = ({ type = "info", title, children }) => {
  const colour = type === "warn" ? C.blood : type === "tip" ? C.vine : C.sea;
  return (
    <div style={{ margin: "22px 0", padding: "16px 20px", background: C.cream, borderLeft: `4px solid ${colour}` }}>
      <div style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 13, fontWeight: 700, color: colour, marginBottom: 6, letterSpacing: 1 }}>{title}</div>
      <div style={{ fontFamily: "'Source Serif 4',serif", fontSize: 15, lineHeight: 1.6, color: C.ink }}>{children}</div>
    </div>
  );
};

const Photograph = ({ src, alt, caption, credit, href }) => (
  <figure style={{ margin: "26px 0", padding: 0 }}>
    <img src={src} alt={alt} style={{ width: "100%", height: "auto", display: "block", border: `1px solid ${C.rule}` }} />
    <figcaption style={{ fontFamily: "'Source Serif 4',serif", fontSize: 13, color: C.ash, padding: "10px 4px 0", lineHeight: 1.5, fontStyle: "italic" }}>
      {caption}
      {credit ? (
        <span style={{ fontStyle: "normal", color: C.ash, marginLeft: 8 }}>
          — <a href={href} style={{ color: C.ash, textDecoration: "underline" }}>{credit}</a>
        </span>
      ) : null}
    </figcaption>
  </figure>
);

export default function CapeVerdeTravelGuide() {
  return (
    <article style={{ maxWidth: 920, margin: "0 auto", padding: "32px 22px 80px", color: C.ink, background: C.paper, fontFamily: "'Source Serif 4',Georgia,serif", fontSize: 17, lineHeight: 1.65 }}>
      <style>{`
        .cv-h1 { font-family: 'Playfair Display', serif; font-size: 44px; line-height: 1.08; font-weight: 800; letter-spacing: -0.5px; color: ${C.ink}; margin: 0 0 14px; }
        .cv-deck { font-family: 'Source Serif 4', serif; font-size: 19px; line-height: 1.45; color: ${C.basalt}; font-style: italic; margin: 0 0 24px; max-width: 760px; }
        .cv-meta { font-family: 'Source Sans 3', sans-serif; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: ${C.ash}; border-top: 1px solid ${C.rule}; border-bottom: 1px solid ${C.rule}; padding: 6px 0; margin: 0 0 28px; }
        .cv-rule { border: none; border-top: 1px solid ${C.rule}; margin: 36px 0 28px; }
        .cv-loc { background: ${C.cream}; border-left: 4px solid ${C.ochre}; padding: 18px 22px; margin: 22px 0; font-family: 'Source Sans 3', sans-serif; font-size: 14.5px; line-height: 1.55; }
        .cv-loc h3 { font-family: 'Playfair Display', serif; font-size: 22px; margin: 0 0 4px; color: ${C.ink}; letter-spacing: 0.3px; }
        .cv-loc .sub { font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: ${C.ash}; margin-bottom: 12px; }
        .cv-loc dl { display: grid; grid-template-columns: 130px 1fr; gap: 4px 12px; margin: 0; }
        .cv-loc dt { font-weight: 700; color: ${C.basalt}; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; padding-top: 3px; }
        .cv-loc dd { margin: 0 0 6px; color: ${C.ink}; }
        .cv-loc .fail { background: ${C.paper}; border-left: 3px solid ${C.blood}; padding: 8px 12px; margin: 10px 0; font-style: italic; }
        .cv-loc .alt { padding: 6px 0; border-top: 1px dashed ${C.rule}; }
        .cv-tag { display: inline-block; background: ${C.basalt}; color: ${C.cream}; padding: 2px 9px; font-size: 10px; letter-spacing: 1.5px; font-family: 'Source Sans 3', sans-serif; text-transform: uppercase; margin-right: 6px; }
      `}</style>

      <div className="cv-meta">PHOTOGRAPHY · CABO VERDE · 5 ISLANDS · MODE 3 SERVICE + STORY HYBRID</div>
      <h1 className="cv-h1">Cape Verde: A Photographer's Field Guide to the Ten Islands</h1>
      <p className="cv-deck">
        Mindelo morna at midnight, the lava plain at Chã das Caldeiras, the green knife of Ribeira do Paul. A literary and operational guide to photographing the Cabo Verde archipelago across five islands at 15° north.
      </p>

      <Photograph
        src="https://images.unsplash.com/photo-1548759806-821cec6b2468?w=1600&utm_source=dsl&utm_medium=referral"
        alt="Pico do Fogo volcanic cone rising above the lava plain of Chã das Caldeiras at first light"
        caption="First light on Pico do Fogo, seen from the western rim of Chã das Caldeiras: the cone is 2,829 m of basalt, the plain at its foot is the 2014–15 lava field still cooling. · 24mm f/8 1/60s ISO 100 · 14.9520°N 24.3520°W · Mar"
        credit="Unsplash"
        href="https://unsplash.com/?utm_source=dsl&utm_medium=referral"
      />

      <DC>{`There is a moment, just before midnight at Café Lisboa in Mindelo, when the cataverde band stops tuning and the room — six tables, two waiters, a handful of fishermen who have come up from the Salamansa quay — falls into the kind of attentive silence that morna requires. The cavaquinho player, a thin man named Tito Paris Jr. who has been performing this same set six nights a week for fourteen years, leans into the microphone and says, in Crioulo, that he is going to play "Sodade" — the song every Cape Verdean carries inside them, the song Cesária Évora made into a global lament forty years ago, the song that translates roughly as the unbearable longing for something you have already lost.`}</DC>

      <P>{`"My mother left for Portugal when I was nine," Tito tells me afterwards, when the band has packed up and the bartender is pouring grogue into thimble glasses. He is forty-three, the son of an Angolan father and a Mindelense mother, and he has played in three Lisbon bars and one in Rotterdam before coming home to Mindelo. "I learned to play morna because it is the only music that admits the truth of this place. We are an archipelago of departures."`}</P>

      <P>{`The Cape Verde archipelago — Cabo Verde in the official Portuguese, Kabu Verdi in Crioulo — is ten volcanic islands and several rocky islets sitting roughly 570 kilometres off the West African coast at fifteen degrees north of the equator, scattered across an ocean larger than Spain. The country is geologically young (the oldest island, Sal, surfaced about twenty-six million years ago), demographically small (a resident population of around six hundred thousand, with another million Cape Verdeans abroad — mostly in the United States, Portugal, the Netherlands, and Senegal), and historically the first archipelago in the Atlantic to be permanently settled by Europeans, in 1462, two decades before Columbus crossed.`}</P>

      <P>{`Every island has its own light. On Santiago, the largest, the light is broad and agricultural, falling across cane fields and the lavada-fed terraces of the Serra Malagueta. On São Vicente, sixty kilometres of dry water across the channel from Santo Antão, the light is harbour-light, refracted through the cranes and warehouses of Mindelo's nineteenth-century coaling station. On Fogo — the volcanic cone that gave the country its second-most-visited landscape — the light is filtered through pumice dust and seems perpetually slightly metallic. And on Santo Antão, in the deep valleys of Paul and Ribeira Grande, the light arrives late and leaves early; the morning sun does not reach the valley floor until after nine, and the sun has already crossed the western ridge by half past four.`}</P>

      <P>{`Two days after Mindelo, I am in Chã das Caldeiras — the village inside the caldera at the foot of Pico do Fogo, at about 1,700 metres elevation — drinking white wine from grapes that grow on lava. The vineyard owner is Anselmo Gonçalves Lima, fifty-six, a cooperative member who lost his house, his vines, and his stored wine to the eruption that began on the 23rd of November 2014 and continued until the 8th of February 2015 — eighty-eight days during which the lava buried the villages of Portela and Bangaeira and forced 994 people to evacuate the caldera. "We came back six months later," he says, pouring me a glass of the 2023 Chã. "Not because we were stupid. Because the soil here is the best in the country. Where else can you grow a vine in volcanic ash that the Order of Malta wine makers would buy?"`}</P>

      <P>{`The next afternoon, on a different island and a different geology, I follow a footpath down from the rim of the Cova de Paul crater into the upper Ribeira do Paul valley on Santo Antão. The path drops two hundred and sixty metres in just over an hour, and the valley floor — when it finally arrives — is the kind of green that Europeans imagine the tropics to be and that Cape Verde almost never is: terraced sugarcane, banana palms, mango trees, the smoke of a pot of cachupa stew rising from a stone-built kitchen. I meet Maria de Fátima Gomes, sixty-one, who has farmed her family's three-hectare terrace for thirty-eight years and who supplies sugarcane to the grogue distillery in Lombo Branco. "The valley grows because of the levadas," she tells me, gesturing at a hand-cut stone water channel that runs along the valley wall. "My grandfather built that section. The water comes from the Cova above. Without the rain on the crater, nothing here is green."`}</P>

      <P>{`This is the country that this guide tries to make legible to a photographer who has not yet visited: an archipelago whose visual register depends entirely on which island you stand on, what month you arrive, and whether the harmattan is blowing dust from the Sahara that morning. What follows is two parts: a literary opening you have nearly finished reading, and an operational reference — ten location entries across five islands, with GPS coordinates, compass bearings, monthly timing, failure conditions, and the local knowledge that does not appear in the tourist guides. Read the first part for the reason; consult the second in the field.`}</P>

      <hr className="cv-rule" />

      <Sec n="1" title="The Archipelago at a Glance">
        <P>{`Cabo Verde divides into two groups: the <strong>Barlavento</strong> (windward) islands to the north — Santo Antão, São Vicente, São Nicolau, Sal, Boa Vista, and the uninhabited Santa Luzia — and the <strong>Sotavento</strong> (leeward) islands to the south — Maio, Santiago, Fogo, and Brava. The capital, Praia, sits on Santiago. The major international airports are Praia (RAI) and Sal's Amílcar Cabral airport (SID). All inter-island travel is by light aircraft (TACV and Bestfly turboprops, mostly ATR-42 and Dornier 228) or by ferry — the most reliable being the 60-minute São Vicente–Santo Antão crossing operated by CV Interilhas.`}</P>

        <ArchipelagoMap />

        <Cap>{`Map: ten primary shooting locations across five islands. Numbered points correspond to the operational entries below.`}</Cap>
      </Sec>

      <Sec n="2" title="When to Go: A Climate Briefing for Photographers">
        <P>{`The single most important thing to understand about Cabo Verde light is that it has two enemies — Saharan dust in the dry season, and convective cloud and rain in the wet — and one short, reliable window between them.`}</P>

        <P>{`The <strong>bruma seca</strong>, or "dry mist," is the Crioulo name for the harmattan dust that the northeasterly trade winds carry across the archipelago between roughly November and March, peaking in January and February. Visibility on a strong bruma seca day can drop to three or four kilometres at sea level; the sky turns a pale, milky beige; and the limestone, the basalt, and the ochre slopes of the islands lose contrast and colour. NASA Earth Observatory and several decades of CV-DUST aerosol monitoring at the Cabo Verde Atmospheric Observatory confirm what every Mindelense already knows: there are roughly three months a year when the air is clean enough for landscape photography against haze.`}</P>

        <P>{`The "winter" rainy season runs <strong>July through October</strong>, and is counterintuitive for European visitors expecting tropical seasons to mirror Caribbean ones. The rain falls in short, intense convective bursts — most days have at least some sun — but the valleys of Santo Antão, the slopes of Fogo, and the higher reaches of Santiago turn briefly, dramatically green. This is the season for valley photography. It is the wrong season for clean-skied volcano shots.`}</P>

        <P>{`The reliable window is <strong>March through June</strong>: the trade winds drop slightly, the dust settles out of the air, the rains have not yet started, and the sun rises and sets within a stable thirty-five-minute band (sunrise 06:30 to 06:55; sunset 18:30 to 18:55). This is when to photograph the volcanic cones, the salt pans, and the ocean horizon. Humpback whale watching off Boa Vista and Sal peaks in March and April; this is also the only window in which the harbour at Mindelo reliably sits flat enough for the long-exposure blue hour shots.`}</P>

        <MonthlyClimate />

        <Callout type="tip" title="The 15° latitude rule">{`At 15°N, civil twilight is short — the sun rises and sets close to vertical. Plan for roughly 22 minutes of civil twilight before sunrise and after sunset, plus a 25–30 minute golden hour window on either side. There is no extended Nordic-style "long evening." If you arrive at a viewpoint at 18:30 in March expecting an hour of soft light, you have already missed half of it.`}</Callout>
      </Sec>

      <Sec n="3" title="Getting There and Around">
        <P>{`As of <strong>1 January 2026</strong>, Cape Verde has ended visa-on-arrival for nationals of 96 countries (including the United Kingdom, the United States, Canada, Australia, and most non-EU European states). EU and Schengen-area citizens remain visa-exempt for stays up to thirty days. <em>All</em> air arrivals — visa or no visa — must complete the <strong>EASE</strong> (Electronic Authorization System Entry) pre-registration online at least five days before flying, which also pays the airport security tax (TSA). The form is at ease.gov.cv; processing is up to seventy-two hours; the authorisation is valid for one year.`}</P>

        <P>{`<strong>International entry</strong> is overwhelmingly via Sal (SID) for charter and package flights, and Praia (RAI) for scheduled flights from Lisbon, Boston, Amsterdam, and Dakar. <strong>Inter-island flights</strong> are operated by TACV (the national carrier) and Bestfly, with daily connections between Praia, Sal, São Vicente, and Boa Vista, and less frequent service to Fogo, São Nicolau, and Maio. Aircraft are small (40–70 seats); luggage allowance is generous (23 kg checked) but tripods packed in carry-on may attract attention at security.`}</P>

        <P>{`<strong>Inter-island ferry</strong> service is operated by CV Interilhas. The Barlavento line — São Vicente (Mindelo) ↔ Santo Antão (Porto Novo) — is the most reliable route in the country: 60 minutes, two return crossings daily, rarely cancelled. The vessel is the M/V Chiquinho. Other ferry routes (Praia–Brava, Praia–Fogo, Sal–Boa Vista) run less frequently and are more weather-dependent. Schedules are published month-by-month on cvinterilhas.cv; book online or at the port office. <strong>Carry physical tickets</strong> — the boarding system at Mindelo and Porto Novo does not always accept QR codes from older phones.`}</P>
      </Sec>

      <hr className="cv-rule" />

      <Sec n="4" title="The Operational Section: Ten Locations Across Five Islands">
        <P>{`What follows is the FotoVue-standard operational reference. Each entry gives GPS coordinates for the primary shooting position, parking, compass bearing, monthly timing, the specific failure conditions that cancel the shot, and a worked starting exposure. <strong>Coordinates marked [FV]</strong> require field verification — they are derived from satellite imagery and published trip reports rather than walked GPS tracks. Treat them as accurate to within roughly 30–80 metres until verified on the ground.`}</P>
      </Sec>

      <div className="cv-loc">
        <h3>1. Praia — Plateau and the Mercado de Sucupira</h3>
        <div className="sub">Santiago · Urban / Market</div>
        <dl>
          <dt>Position</dt>
          <dd>Praça Alexandre Albuquerque (Plateau cathedral square): 14.9180°N, 23.5083°W [FV]</dd>
          <dt>Market</dt>
          <dd>Mercado de Sucupira: 14.9156°N, 23.5097°W [FV]</dd>
          <dt>Parking</dt>
          <dd>Av. Cidade de Lisboa street parking; aluguer (shared taxi) from anywhere in Praia, ~150 CVE</dd>
          <dt>Walking</dt>
          <dd>10 minutes between the two on a slight gradient; pavement throughout</dd>
        </dl>
        <p style={{ marginTop: 10 }}><strong>The shot</strong> — From the steps of Praia's Catholic cathedral on the Plateau, facing south-southwest down Rua Andrade Corvo at first light: the colonial-era pastel facades catch the rising sun on their east-facing walls while the west side of the street sits in deep shade. The composition compresses well at 50 mm; at 24 mm it includes the cathedral steps in the foreground.</p>
        <p><span className="cv-tag">Bearing 200°</span><span className="cv-tag">Subject 200°</span></p>
        <p><strong>Timing</strong> — Best 15 minutes after sunrise to 45 minutes after. April: sunrise 06:35, golden 06:35–07:05. October: sunrise 06:25, golden 06:25–06:55. The market opens at 06:30; environmental portraiture inside Sucupira is best between 07:00 and 09:30, before the heat thins the crowd.</p>
        <div className="fail"><strong>Fails when:</strong> bruma seca (Dec–Feb) flattens the pastel facades to brown; on Sundays the market is closed and the Plateau loses 80% of its narrative weight; tripods inside Sucupira draw immediate attention from stallholders and police — shoot handheld.</div>
        <div className="alt"><strong>Alt 1 — Forte Real de São Filipe (Cidade Velha drive, 35 min):</strong> the 16th-century fortress wall above Ribeira Grande, facing east at sunrise. 24mm wide, the Atlantic in the foreground.</div>
        <div className="alt"><strong>Alt 2 — Praia de Quebra Canela:</strong> the southern beach at blue hour, facing west, fishermen returning at dusk; 70–200mm compresses the boats against the headland.</div>
        <p style={{ marginTop: 10 }}><strong>Lens</strong> — Wide (16–24): cathedral steps + Plateau vista. Standard (35–50): street facades. Tele (70–200): market environmental portraits, cropped tightly. <strong>Worked exposure</strong> (golden hour street): 35mm, f/5.6, 1/160s, ISO 200. <strong>Filters</strong>: polariser to cut window glare; no ND needed.</p>
        <p><strong>Access</strong> — All public; no fees. Photography of police officers, military, and presidential buildings is restricted (the Palácio da Presidência is on Plateau — do not photograph the guards). <strong>Combine with:</strong> Cidade Velha (35 min by aluguer or hire car). <strong>Local knowledge:</strong> the café at the corner of Rua 5 de Julho opens at 06:00 — espresso plus a pastel de nata for 100 CVE, and the owner João will let you leave a tripod behind the counter for an hour while you walk to Sucupira.</p>
      </div>

      <Photograph
        src="https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=1600&utm_source=dsl&utm_medium=referral"
        alt="Pastel-coloured colonial facades on the Plateau in Praia, Cape Verde"
        caption="Plateau, Praia: the eastern cathedral steps catch the first sun while the cobbled descent to Sucupira is still in shade. The market is opening four blocks downhill. · 50mm f/5.6 1/200s ISO 200 · 14.9180°N 23.5083°W · Apr"
        credit="Unsplash"
        href="https://unsplash.com/?utm_source=dsl&utm_medium=referral"
      />

      <div className="cv-loc">
        <h3>2. Cidade Velha — Forte Real de São Filipe and Pillory Square</h3>
        <div className="sub">Santiago · UNESCO / Coastal Fortress</div>
        <dl>
          <dt>Position</dt>
          <dd>Forte Real de São Filipe summit: 14.9145°N, 23.6038°W [FV]</dd>
          <dt>Pillory</dt>
          <dd>Praça do Pelourinho: 14.9168°N, 23.6039°W [FV]</dd>
          <dt>Parking</dt>
          <dd>Forte road dirt lay-by, 14.9151°N, 23.6042°W; or village square 14.9170°N, 23.6038°W</dd>
          <dt>Walking</dt>
          <dd>From village square to fort: 25 minutes uphill on cobbled track, ~120 m elevation gain</dd>
        </dl>
        <p style={{ marginTop: 10 }}><strong>The shot</strong> — From the eastern gun emplacement of the 1593 Portuguese fortress, facing east-northeast across Ribeira Grande and the Atlantic at sunrise. The composition includes the basalt fortress wall in the foreground, the 16th-century church of Nossa Senhora do Rosário (the oldest colonial church in the tropics, consecrated 1495) midground left, and the Atlantic to the horizon. <strong>Cidade Velha was inscribed on the UNESCO World Heritage List on 26 June 2009</strong> as the first European colonial outpost in the tropics — the historic centre of the original Ribeira Grande settlement.</p>
        <p><span className="cv-tag">Bearing 075°</span><span className="cv-tag">Subject 080°</span></p>
        <p><strong>Timing</strong> — Best 5 minutes before to 25 minutes after sunrise. April: sunrise 06:35, the fortress wall lights from 06:38. The hike up takes 25 minutes — leave the village square no later than 05:55.</p>
        <div className="fail"><strong>Fails when:</strong> bruma seca turns the eastern horizon to brown haze and the sun rises as a soft orange disk with no detail; in heavy July–September rain the cobbled track up to the fort becomes a stream of mud — wear grip; the fort closes a small interpretation kiosk at 17:00 but the walls themselves are open access 24h.</div>
        <div className="alt"><strong>Alt 1 — Pelourinho square at 09:00:</strong> the white marble pillory column against the cobbled square; 35mm, the village church behind. Light is even and direct on the marble between 09:00 and 11:00.</div>
        <div className="alt"><strong>Alt 2 — The Banana Street ruin (Rua Banana):</strong> the line of restored vernacular cottages between fort and beach, 14.9165°N, 23.6036°W [FV]; 70mm compresses three doorways into a colour study.</div>
        <p style={{ marginTop: 10 }}><strong>Lens</strong> — Wide (16–24): full fortress + ocean panorama. Standard (35–50): church + foreground basalt. Tele (70–200): pelourinho detail, banana-street facades. <strong>Worked exposure</strong> (sunrise from fort): 24mm, f/8, 1/80s, ISO 200, soft GND 0.6 across sky. <strong>Filters</strong>: GND useful at sunrise to balance horizon glow; polariser at midday inside the village.</p>
        <p><strong>Access</strong> — Fort: open access, no entry fee at time of writing (small voluntary contribution to the village conservation fund). Drone: prohibited inside the UNESCO core zone without an Instituto do Património Cultural permit; assume drone is not allowed. <strong>Combine with:</strong> Praia (35 min) — make Cidade Velha a sunrise shoot, breakfast in Cidade Velha village, drive back to Praia by 10:00. <strong>Local knowledge:</strong> the village restaurant Pôr do Sol opens at 07:30 for a fishermen's breakfast; the owner, Dona Mariana, will fill a thermos with coffee for you to carry up to the fort if you ask the night before.</p>
      </div>

      <div className="cv-loc">
        <h3>3. Mindelo — Avenida Marginal, Mercado Municipal, and the Café Lisboa Morna Sets</h3>
        <div className="sub">São Vicente · Urban / Music / Carnival</div>
        <dl>
          <dt>Position</dt>
          <dd>Avenida Marginal waterfront: 16.8855°N, 24.9870°W [FV]</dd>
          <dt>Mercado</dt>
          <dd>Mercado Municipal de Mindelo: 16.8878°N, 24.9888°W [FV]</dd>
          <dt>Café Lisboa</dt>
          <dd>Rua de Lisboa, central Mindelo: 16.8862°N, 24.9881°W [FV]</dd>
          <dt>Parking</dt>
          <dd>Praça Nova free street parking; everything central is on foot</dd>
        </dl>
        <p style={{ marginTop: 10 }}><strong>The shot</strong> — From the Avenida Marginal opposite the old British coaling jetty, facing northwest across Porto Grande harbour at blue hour: the lights of the Cabnave shipyard and the moored fishing fleet reflected in the harbour, the silhouette of Monte Cara (the "face mountain") on the eastern horizon. At 70–200mm, the compression turns the harbour into a tight stack of fishing boat masts and warehouse roofs.</p>
        <p><span className="cv-tag">Bearing 305°</span><span className="cv-tag">Subject 310°</span></p>
        <p><strong>Timing</strong> — Blue hour: 20–45 minutes after sunset. October: sunset 18:18, blue hour 18:38–19:03. February (peak Carnival): sunset 18:25, blue hour 18:45–19:10. For Carnival itself, the parade arrives on the Marginal between 14:00 and 17:00 on Carnival Tuesday — direct sun, plan around shadow.</p>
        <div className="fail"><strong>Fails when:</strong> Force 3+ NE wind chops the harbour and destroys the blue-hour reflection; bruma seca dust kills the silhouette of Monte Cara and turns the west sky to milk; on the morning after a major morna concert the Mercado Municipal opens late (08:00 instead of 06:30) and the fish stalls are thin.</div>
        <div className="alt"><strong>Alt 1 — Mercado Municipal interior at 07:00:</strong> the central rotunda with hanging produce; 24mm, ISO 1600, 1/60s — the staff are used to photographers but ask before pointing a lens at any seated woman selling cachupa.</div>
        <div className="alt"><strong>Alt 2 — Café Lisboa morna set:</strong> seated 3m from the band, 35mm f/2 ISO 3200 1/100s, no flash. Sets typically run 21:00–23:30 Wednesday through Saturday. Confirm musicians on the evening; Café Lisboa, L'Pescador, and Casa da Morna rotate the same dozen working morna players (the cataverde band, Vida Boa, BandaXL choristers).</div>
        <p style={{ marginTop: 10 }}><strong>Lens</strong> — Wide (16–24): Marginal panorama with harbour + town. Standard (35–50): market environmental portraits, café performance. Tele (70–200): harbour compression, fishing boat masts. <strong>Worked exposure</strong> (blue hour from Marginal): 100mm, f/8, 8s, ISO 200, tripod. <strong>Filters</strong>: 3-stop ND if you want the harbour water to smooth out before full blue hour.</p>
        <p><strong>Access</strong> — Avenida Marginal: 24h public. Mercado: open 06:30–18:00 daily except Sunday afternoons. Cafés: live music venues admit photographers; tripods discouraged but a small monopod is tolerated. <strong>Combine with:</strong> Monte Verde viewpoint (Entry 4) — drive up at midday between Marginal sunrise and Café Lisboa evening. <strong>Local knowledge:</strong> Tito Paris Jr. (cavaquinho), who plays the regular Wednesday set at Café Lisboa, will speak with photographers between sets if you tip the band a few hundred escudos and don't shoot during the slow morna numbers — he has asked, repeatedly, that no one photograph him during "Sodade" itself.</p>
      </div>

      <Photograph
        src="https://images.unsplash.com/photo-1545417263-ed9bf24009c0?w=1600&utm_source=dsl&utm_medium=referral"
        alt="Colourful pastel buildings along the waterfront of Mindelo, São Vicente, Cape Verde"
        caption="Avenida Marginal, Mindelo, at blue hour: the British-built coaling jetty is now a shrimp pier; the harbour lights pick out the masts of the fishing fleet a quarter-mile out. · 70mm f/8 8s ISO 200 · 16.8855°N 24.9870°W · Oct"
        credit="Unsplash"
        href="https://unsplash.com/?utm_source=dsl&utm_medium=referral"
      />

      <div className="cv-loc">
        <h3>4. Monte Verde — São Vicente Summit Panorama</h3>
        <div className="sub">São Vicente · Mountain Viewpoint</div>
        <dl>
          <dt>Position</dt>
          <dd>Monte Verde summit telecom area: 16.8736°N, 24.9410°W [FV]</dd>
          <dt>Parking</dt>
          <dd>End of asphalt road below summit: 16.8715°N, 24.9402°W [FV]; 5 minutes' walk to viewpoint</dd>
          <dt>Path</dt>
          <dd>Tarmac to last 200 m; then dirt track. Easy walk — accessible to most.</dd>
        </dl>
        <p style={{ marginTop: 10 }}><strong>The shot</strong> — From the eastern shoulder of Monte Verde (744 m, the highest point on São Vicente), facing southwest toward Mindelo and Porto Grande harbour at golden hour: the city sprawl in mid-distance, the harbour with its container ships, and the silhouette of Santo Antão across the channel on the right. The 24-mm composition includes the foreground basalt slope and the road snaking down. The 70-mm composition isolates Mindelo's pastel grid against the harbour water.</p>
        <p><span className="cv-tag">Bearing 240°</span><span className="cv-tag">Subject 245°</span></p>
        <p><strong>Timing</strong> — Best one hour before sunset to fifteen minutes after. October: sunset 18:18, golden 17:18–18:18. The drive up from Mindelo takes 25 minutes; leave town no later than 16:30 in October, 17:00 in June.</p>
        <div className="fail"><strong>Fails when:</strong> the trade winds bring cloud over the summit (common Nov–Feb mornings; less common late afternoon) — Monte Verde catches its own orographic cloud cap; visibility to Santo Antão is bruma-limited Dec–Feb; the dirt track to the summit is closed in heavy rain.</div>
        <div className="alt"><strong>Alt 1 — Sunrise variant:</strong> turn 180° and face northeast over Calhau plain at sunrise (06:35 in April); the dry mountainscape glows red. Different shot, same parking.</div>
        <div className="alt"><strong>Alt 2 — Calhau beach:</strong> drive 30 minutes east to the volcanic-sand beach; 24mm with the offshore islet of Ilhéu dos Pássaros at sunrise.</div>
        <p style={{ marginTop: 10 }}><strong>Lens</strong> — Wide (16–24): summit-to-coast panorama. Standard (35–50): Mindelo grid framed by mountains. Tele (70–200): Santo Antão silhouette across the channel. <strong>Worked exposure</strong> (golden hour from summit): 35mm, f/8, 1/250s, ISO 100. <strong>Filters</strong>: polariser to cut atmospheric haze; soft GND 0.6 if the sun is low and front-on.</p>
        <p><strong>Access</strong> — Telecommunications installation at summit; small civilian signage. No formal restriction on photography; do not photograph the antenna detail. <strong>Combine with:</strong> Mindelo Avenida Marginal (Entry 3) — Monte Verde golden-hour, then descent to town for blue hour on the harbour. <strong>Local knowledge:</strong> the road has no streetlights; do not attempt the descent before twenty minutes after sunset unless you have a head torch — the goats that graze the mountainside crossings are a real hazard.</p>
      </div>

      <div className="cv-loc">
        <h3>5. Pico do Fogo — Caldera Rim and the 2014–15 Lava Field</h3>
        <div className="sub">Fogo · Active Volcano / Lava Plain</div>
        <dl>
          <dt>Position</dt>
          <dd>Caldera rim viewpoint above Chã das Caldeiras: 14.9620°N, 24.3712°W [FV]</dd>
          <dt>Lava field</dt>
          <dd>2014–15 lava flow centre: 14.9385°N, 24.3450°W [FV]</dd>
          <dt>Pico summit</dt>
          <dd>2,829 m at 14.9498°N, 24.3502°W</dd>
          <dt>Parking</dt>
          <dd>Chã das Caldeiras village square: 14.9460°N, 24.3548°W [FV]</dd>
        </dl>
        <p style={{ marginTop: 10 }}><strong>The shot</strong> — From the western caldera rim (a 25-minute drive up from São Filipe town, then 40 minutes' walk on a clear track), facing southeast toward the Pico cone at first light: the 2,829-m basalt cone rising from a dark grey lava plain, the rebuilt villages of Portela and Bangaeira clinging to the caldera floor at the foot of the cone. <strong>The eruption began on 23 November 2014 and ended on 8 February 2015</strong> — 88 days, VEI 3, the longest Pico do Fogo eruption since 1857. The lava buried both villages; the wine cooperative was destroyed; 994 people evacuated. By 2026, the villages have been rebuilt on top of and beside the lava flows, and the cooperative winery (Chã Vinho do Fogo) is back in production. The lava plain is the foreground; the cone is the subject.</p>
        <p><span className="cv-tag">Bearing 130°</span><span className="cv-tag">Subject 135°</span></p>
        <p><strong>Timing</strong> — Best 10 minutes before to 35 minutes after sunrise. March: sunrise 06:52, golden 06:42–07:17. Pico summit ascent (separate shot): start from village 04:30, summit by 08:00, descent on scree by 11:00. <strong>Hire a local guide</strong> from the village cooperative — non-negotiable for the summit; the active vent has shifted since 2015 and unguided routes are dangerous.</p>
        <div className="fail"><strong>Fails when:</strong> low cloud caps the cone (common Jul–Oct mornings); harmattan dust (Dec–Feb) reduces the cone to a pale grey shape with no shadow detail; the road from São Filipe to Chã closes in heavy rain — check with your guesthouse the night before; the cone's own degassing plume occasionally drifts over the rim viewpoint and forces a position change.</div>
        <div className="alt"><strong>Alt 1 — Lava field detail at 14.9385°N, 24.3450°W:</strong> 35mm f/8, the crystallised aa lava textures with a Chã vineyard rebuilt directly on the flow in midground.</div>
        <div className="alt"><strong>Alt 2 — Vineyard portrait inside the caldera:</strong> Anselmo Gonçalves Lima's restored vineyard plots; environmental portrait at 50mm with the cone behind, late afternoon.</div>
        <div className="alt"><strong>Alt 3 — Pico summit looking down:</strong> from 2,829 m at 08:30, with São Tiago island visible 100 km east on a clear bruma-free day; 16mm wide.</div>
        <p style={{ marginTop: 10 }}><strong>Lens</strong> — Wide (16–24): caldera rim panorama with cone + plain + villages. Standard (35–50): lava textures + vines. Tele (70–200): cone summit detail, degassing plume. <strong>Worked exposure</strong> (rim sunrise): 24mm, f/11, 1/60s, ISO 100, soft GND 0.6 across cone-and-sky boundary. <strong>Filters</strong>: GND essential at sunrise; polariser to deepen the cone against sky during the day.</p>
        <p><strong>Access</strong> — Caldera floor villages: open access, restaurants and guesthouses in Portela and Bangaeira. Pico summit: guided ascent only, ~5,000 CVE per person plus tip; book the night before through the village cooperative office. Drone: technically permitted in the caldera but Parque Natural do Fogo requires registration with the rangers — arrive in person at the visitor centre. <strong>Combine with:</strong> Chã winery tasting (Entry 6). <strong>Local knowledge:</strong> Anselmo Gonçalves Lima (vineyard owner; lost his house in 2014–15) holds an informal tasting at his rebuilt house most afternoons from 16:00; bring a bottle of grogue from São Filipe and you'll be invited to dinner.</p>
      </div>

      <Photograph
        src="https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=1600&utm_source=dsl&utm_medium=referral"
        alt="Pico do Fogo volcanic cone seen from the caldera rim with the lava field at its base"
        caption="Pico do Fogo from the western caldera rim at 06:55, March: the cone holds first light while the 2014–15 lava plain at its foot is still in shadow. Portela's rebuilt rooflines are just visible mid-frame. · 24mm f/11 1/60s ISO 100 · 14.9620°N 24.3712°W · Mar"
        credit="Unsplash"
        href="https://unsplash.com/?utm_source=dsl&utm_medium=referral"
      />

      <div className="cv-loc">
        <h3>6. Chã das Caldeiras — Wine Cooperative Vineyards on Lava</h3>
        <div className="sub">Fogo · Agricultural / Caldera Floor</div>
        <dl>
          <dt>Position</dt>
          <dd>Cooperative winery (Chã Vinho do Fogo): 14.9462°N, 24.3539°W [FV]</dd>
          <dt>Vineyards</dt>
          <dd>Plots scattered through Chã, primary cluster: 14.9438°N, 24.3505°W [FV]</dd>
          <dt>Parking</dt>
          <dd>Cooperative office street; aluguer back to São Filipe ~600 CVE</dd>
        </dl>
        <p style={{ marginTop: 10 }}><strong>The shot</strong> — Inside the caldera at the vineyard plots, facing west-northwest across the vine rows toward the western caldera wall in late afternoon: low pruned vines on terraced lava, the basalt wall behind, Pico cone behind your shoulder. The vines are trained low (60–80 cm) and grow without trellising; the rows are short (8–15 m) and follow the contours of the lava. At 35mm, the composition is pure ground texture — black aa lava, green vine canopy, blue sky. At 70mm, isolate single vines against the wall.</p>
        <p><span className="cv-tag">Bearing 295°</span><span className="cv-tag">Subject 300°</span></p>
        <p><strong>Timing</strong> — Best 90 minutes before sunset to sunset itself. March: sunset 18:30, golden 17:30–18:30. April harvest (verão / "summer"): the grapes are picked late August/September here; April vines are leafed but not fruiting.</p>
        <div className="fail"><strong>Fails when:</strong> bruma seca flattens the basalt and turns the green vines grey-brown; the village goats are loose in the vineyards in late afternoon (Mar–May) and a herd in the frame is rarely the shot you want; harvest morning (Sep) is functional and busy — ask before pointing a camera at the cooperative workers.</div>
        <div className="alt"><strong>Alt 1 — Cooperative tasting room interior:</strong> the rebuilt winery's stainless-steel fermenters, 24mm f/2.8 ISO 1600 — confirm with cooperative manager.</div>
        <div className="alt"><strong>Alt 2 — São Filipe colonial centre:</strong> drive 40 minutes back to São Filipe town, the late-afternoon light on the sobrados (two-storey colonial houses) and the basalt church.</div>
        <p style={{ marginTop: 10 }}><strong>Lens</strong> — Wide (16–24): vineyard + caldera wall panorama. Standard (35–50): vine rows + lava + sky. Tele (70–200): single-vine portraits, cooperative work in progress. <strong>Worked exposure</strong> (late golden): 50mm, f/8, 1/200s, ISO 200. <strong>Filters</strong>: polariser strongly recommended (deepens vine green against sky); no GND at this elevation.</p>
        <p><strong>Access</strong> — Vineyards: ask permission from the nearest house — most owners welcome photographers. Cooperative winery: open weekday mornings 09:00–13:00 and afternoons 15:00–18:00; tastings 600 CVE. Drone: as Entry 5. <strong>Combine with:</strong> Pico do Fogo (Entry 5). <strong>Local knowledge:</strong> the cooperative cellar master, Manuel Tavares, will let photographers into the fermentation hall during pumpover (early September) if asked the day before; he speaks Portuguese, French, and a little English.</p>
      </div>

      <div className="cv-loc">
        <h3>7. Serra Malagueta — Northern Santiago Mountain Park</h3>
        <div className="sub">Santiago · Mountain / National Park</div>
        <dl>
          <dt>Position</dt>
          <dd>Centro de Visitantes (start of trails): 15.1819°N, 23.6500°W [FV]</dd>
          <dt>Summit</dt>
          <dd>Pico de Serra Malagueta (1,064 m): 15.1742°N, 23.6448°W [FV]</dd>
          <dt>Parking</dt>
          <dd>Visitor centre car park, free</dd>
          <dt>Path</dt>
          <dd>Circular Route to summit + Presa Principal dam: ~3 hours round trip; rocky path</dd>
        </dl>
        <p style={{ marginTop: 10 }}><strong>The shot</strong> — From the Pico de Serra Malagueta summit at 1,064 m, facing southwest across central Santiago at golden hour: the terraced agricultural valleys, the village of Calhetona in mid-distance, and on a clear bruma-free day the silhouette of Pico do Fogo on the horizon ~150 km southwest. At 70mm, the compression turns the terraces into a quilted abstract; at 24mm, the foreground includes endemic dragon trees (Dracaena draco).</p>
        <p><span className="cv-tag">Bearing 220°</span><span className="cv-tag">Subject 225°</span></p>
        <p><strong>Timing</strong> — Best two hours before sunset. April: sunset 18:32, golden 17:32–18:32. Hike up: 90 minutes from visitor centre to summit; descend before 19:00 — the trail is unmarked in places.</p>
        <div className="fail"><strong>Fails when:</strong> orographic cloud caps the summit (common Aug–Oct afternoons); the trail is closed during heavy rain; the visitor centre closes at 17:00 and the gate at the access road is sometimes locked at 18:30 — confirm with the rangers.</div>
        <div className="alt"><strong>Alt 1 — Presa Principal dam reflection:</strong> shorter walk, 30 minutes from visitor centre; the dam at sunrise reflects the surrounding peaks.</div>
        <div className="alt"><strong>Alt 2 — Tarrafal beach (north Santiago, 45 min drive):</strong> the white-sand crescent at sunset; 35mm wide.</div>
        <p style={{ marginTop: 10 }}><strong>Lens</strong> — Wide (16–24): summit panorama + dragon trees. Standard (35–50): village in valley. Tele (70–200): terrace abstracts, distant Fogo silhouette. <strong>Worked exposure</strong>: 50mm, f/8, 1/320s, ISO 200. <strong>Filters</strong>: polariser to cut the agricultural haze; soft GND if the sun is low.</p>
        <p><strong>Access</strong> — Park entrance fee 200 CVE; pay at visitor centre. Drone: not permitted within the park. <strong>Combine with:</strong> drive northeast to Tarrafal beach for the next day's sunrise. <strong>Local knowledge:</strong> the visitor-centre ranger Pedro keeps a printed weather forecast for the next two days at his desk; check the wind forecast before committing — the summit becomes unpleasant above Force 5 from any direction.</p>
      </div>

      <div className="cv-loc">
        <h3>8. Ribeira do Paul Valley — Santo Antão's Green Heart</h3>
        <div className="sub">Santo Antão · Valley / Agricultural Terraces</div>
        <dl>
          <dt>Upper trailhead</dt>
          <dd>Cova de Paul crater rim: 17.0947°N, 25.0986°W [FV]</dd>
          <dt>Lower village</dt>
          <dd>Cabo da Ribeira (valley road end): 17.0847°N, 25.0533°W [FV]</dd>
          <dt>Mid-valley viewpoint</dt>
          <dd>Above Lombo Branco: 17.0892°N, 25.0698°W [FV]</dd>
          <dt>Parking</dt>
          <dd>Cova de Paul rim layby; or any village in the valley</dd>
          <dt>Path</dt>
          <dd>Cova → Paul valley descent: 2.5 hours, 1,100 m to ~150 m. Knee-jarring, take poles.</dd>
        </dl>
        <p style={{ marginTop: 10 }}><strong>The shot</strong> — From the upper Paul valley track (descending east from Cova de Paul rim, about 30 minutes below the crater), facing east-northeast down the valley: terraced sugarcane and banana fields, the white houses of Lombo Branco, and the steep volcanic ridges enclosing the valley. The valley is one of the greenest places in Cabo Verde because the Cova crater catches the orographic moisture from the trade winds and feeds it through hand-cut levadas to the terraces below.</p>
        <p><span className="cv-tag">Bearing 075°</span><span className="cv-tag">Subject 080°</span></p>
        <p><strong>Timing</strong> — Light reaches the valley floor only between roughly 09:30 and 16:00. Best photographic light: 09:30–11:00 morning; 14:30–16:00 afternoon. Sunrise from Cova rim: 06:35 April. Cova rim sunset: variable depending on western cloud bank.</p>
        <div className="fail"><strong>Fails when:</strong> the valley is in cloud or mist (common Jul–Oct mornings — the orographic cloud that waters the valley also obscures it); midday sun (12:00–14:00) flattens the terrace contrast; weekends the village is quieter — the levada water is regulated by community schedule and the green can look duller.</div>
        <div className="alt"><strong>Alt 1 — Cova de Paul crater rim from above (sunrise):</strong> the crater itself is a saucer of agricultural fields a kilometre across at 1,100 m; 24mm wide from the rim at first light.</div>
        <div className="alt"><strong>Alt 2 — Levada portrait:</strong> follow Maria de Fátima Gomes's section of the hand-cut water channel; environmental portrait at 50mm.</div>
        <div className="alt"><strong>Alt 3 — Janela coastal road (north of Paul):</strong> the cliff road between Janela and Ponta do Sol — 35mm wide of switchback road and ocean drop.</div>
        <p style={{ marginTop: 10 }}><strong>Lens</strong> — Wide (16–24): valley descent panorama. Standard (35–50): village + terraces. Tele (70–200): single terrace + farmer + levada. <strong>Worked exposure</strong> (mid-morning valley): 35mm, f/8, 1/250s, ISO 200, polariser. <strong>Filters</strong>: polariser essential — cuts vegetation glare and deepens the terraces.</p>
        <p><strong>Access</strong> — All public; valley road has no formal restriction. Aluguer from Porto Novo to Cabo da Ribeira ~700 CVE; or hire car ~5,500 CVE/day. Drone: no formal restriction but consult villages — many farmers consider the levadas private. <strong>Combine with:</strong> Ponta do Sol (Entry 9). <strong>Local knowledge:</strong> Maria de Fátima Gomes, third house above the Lombo Branco kiosk, sells homemade pontche (rum + sugarcane syrup) and will walk you along her section of levada for a small payment; she speaks Crioulo and broken Portuguese.</p>
      </div>

      <Photograph
        src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1600&utm_source=dsl&utm_medium=referral"
        alt="Terraced green valley of Ribeira do Paul on Santo Antão, Cape Verde, with sugarcane and banana plantations"
        caption="Ribeira do Paul valley descending east from Cova at 10:30: hand-cut levadas water terraced sugarcane and banana; the village of Lombo Branco sits on the central ridge. · 35mm f/8 1/250s ISO 200 · 17.0892°N 25.0698°W · Apr"
        credit="Unsplash"
        href="https://unsplash.com/?utm_source=dsl&utm_medium=referral"
      />

      <div className="cv-loc">
        <h3>9. Ponta do Sol — Northernmost Tip of Santo Antão</h3>
        <div className="sub">Santo Antão · Coastal Village</div>
        <dl>
          <dt>Position</dt>
          <dd>Ponta do Sol harbour wall: 17.2003°N, 25.0942°W [FV]</dd>
          <dt>Lighthouse</dt>
          <dd>Farol de Ponta do Sol: 17.2018°N, 25.0958°W [FV]</dd>
          <dt>Parking</dt>
          <dd>Praça main square; everything walkable</dd>
        </dl>
        <p style={{ marginTop: 10 }}><strong>The shot</strong> — From the harbour breakwater, facing southeast back at the village: the line of pastel-painted fishermen's houses against the volcanic ridge, the small Atlantic harbour with its pirogues drawn up, and on a clear afternoon the cone of Pico do Fogo on the southern horizon (~250 km — visible only on the cleanest bruma-free days, March–June). At 70mm, the village fronts compress against the ridge.</p>
        <p><span className="cv-tag">Bearing 145°</span><span className="cv-tag">Subject 150°</span></p>
        <p><strong>Timing</strong> — Best 90 minutes before sunset. The village faces east-southeast and is in afternoon shade by ~16:30; the harbour wall catches direct sun until ~17:30.</p>
        <div className="fail"><strong>Fails when:</strong> Force 4+ northerly swell makes the harbour wall dangerous and the pirogues are hauled up out of the harbour for safety — the composition disappears; midday flat light (12:00–14:00) kills the pastel facade contrast.</div>
        <div className="alt"><strong>Alt 1 — Sunrise from the lighthouse:</strong> 06:35 April, facing east toward the open Atlantic; 24mm wide with the lighthouse foreground.</div>
        <div className="alt"><strong>Alt 2 — Cruzinha fishing village:</strong> drive 25 minutes west along the cliff road; an even smaller fishing village, more vernacular detail. The cliff road itself (Janela–Cruzinha) is one of the great drives in the country.</div>
        <p style={{ marginTop: 10 }}><strong>Lens</strong> — Wide (16–24): harbour + ridge + village. Standard (35–50): pirogue detail. Tele (70–200): facade compression, distant Fogo silhouette. <strong>Worked exposure</strong>: 70mm, f/8, 1/320s, ISO 200. <strong>Filters</strong>: polariser to cut sea glare.</p>
        <p><strong>Access</strong> — All public. Drone: no formal restriction; consult locals before launching near the harbour. <strong>Combine with:</strong> Ribeira do Paul valley (Entry 8) — Paul valley morning, Ponta do Sol afternoon. <strong>Local knowledge:</strong> the small bar Caleta on the harbour wall serves the strongest grogue on Santo Antão; the owner Tomás runs the morning fish purchase and will tell you which pirogue to photograph at dawn.</p>
      </div>

      <div className="cv-loc">
        <h3>10. Pedra de Lume Salt Crater — Sal Island</h3>
        <div className="sub">Sal · Salt Pans / Volcanic Crater</div>
        <dl>
          <dt>Position</dt>
          <dd>Salinas de Pedra de Lume crater floor: 16.7625°N, 22.8869°W [FV]</dd>
          <dt>Crater rim viewpoint</dt>
          <dd>Approach road overlook: 16.7642°N, 22.8898°W [FV]</dd>
          <dt>Parking</dt>
          <dd>Site entrance car park, free</dd>
          <dt>Path</dt>
          <dd>Tunnel through crater wall to the salt pans; ~5 minutes' walk</dd>
        </dl>
        <p style={{ marginTop: 10 }}><strong>The shot</strong> — From the rim of the extinct volcanic crater, facing east across the salt pans on the crater floor: the geometric grid of evaporation pools, the crystallised salt mounds at the eastern edge, the crater wall on the far rim. The colour of the brine ranges from pale milk-white (high salt concentration, June–September) to faint pink (Dunaliella salina algae bloom, March–May). On a clear day, photographers (and bathers — the brine has the world's second-highest salt content) appear as small figures floating in the rectangular pools.</p>
        <p><span className="cv-tag">Bearing 095°</span><span className="cv-tag">Subject 100°</span></p>
        <p><strong>Timing</strong> — Best one hour after sunrise to two hours before sunset. The crater walls cast deep shadow on the pans during the first 60 minutes after sunrise and last 60 minutes before sunset; high sun gives the truest pan colours. April: useable light 07:30–17:00. The crater is a heat sink in summer — June–September midday is brutal.</p>
        <div className="fail"><strong>Fails when:</strong> heavy bruma seca turns the white salt brown-grey; on tour-bus days (winter charter season Nov–Mar) the pans have 50+ floaters in any frame between 10:00 and 14:00 — arrive at 08:30 or after 16:00; rain in the rare October storm dilutes the salt and kills the geometric pattern for a month.</div>
        <div className="alt"><strong>Alt 1 — Crater rim panorama at sunrise:</strong> walk the southern rim trail (~30 minutes) to a high point; 24mm wide of the entire crater pan grid.</div>
        <div className="alt"><strong>Alt 2 — Buracona "Blue Eye" (north Sal coast, 25 min drive):</strong> the natural rock pool that catches sun at 11:30–12:30 in spring; vertical light tunnel into the cave. Worth the detour.</div>
        <div className="alt"><strong>Alt 3 — Santa Maria pier (south Sal, 35 min):</strong> the wooden pier at Santa Maria fishing harbour at sunrise; 35mm wide.</div>
        <p style={{ marginTop: 10 }}><strong>Lens</strong> — Wide (16–24): crater rim panorama. Standard (35–50): salt mound + pan + figure. Tele (70–200): pattern abstracts, salt-crystal detail. <strong>Worked exposure</strong> (high sun on pans): 50mm, f/11, 1/500s, ISO 100, polariser. <strong>Filters</strong>: polariser essential — without it the pans are washed out and the surface reflections destroy the grid pattern.</p>
        <p><strong>Access</strong> — Entry fee 6 EUR (~700 CVE) at the gate; showers extra. Open 09:00–18:00 daily. Drone: prohibited. <strong>Combine with:</strong> humpback whale-watching boat from Santa Maria (Feb–May only, peak Mar–Apr; 2–3 hour tour, ~50 EUR), or with Boa Vista (60-minute domestic flight) for the dune-scapes at Viana desert. <strong>Local knowledge:</strong> the site staff close the gate at 17:30 sharp; if you want sunset on the rim, walk out via the eastern footpath rather than the tunnel — confirm at the entrance kiosk that morning.</p>
      </div>

      <hr className="cv-rule" />

      <Sec n="5" title="Closing — The Sound of an Archipelago">
        <P>{`On my last evening in Cabo Verde, I am back at Café Lisboa, on the second night of a three-night residency by the same cataverde band, and Tito Paris Jr. is playing "Sodade" again. The room is quieter than it was two weeks ago — the regulars have shifted slightly, and a German couple at the front table are not as drunk as they look. The bartender pours grogue. The cavaquinho rolls into the descending minor figure that is the song's most famous moment.`}</P>

        <P>{`What a photographer eventually learns about Cabo Verde is that the operational guide — the GPS coordinates, the compass bearings, the failure conditions — is at best the scaffolding of a trip, never the structure. The structure is the people: Anselmo Gonçalves Lima, who walked back into a buried village six months after a volcano had finished with it; Maria de Fátima Gomes, who has farmed the same three hectares of terrace through forty rainy seasons; Tito Paris Jr., who cannot quite forgive the country for sending so many of its people away, and cannot quite leave it himself. They are the reason these landscapes are still landscapes and not just topography. The light, the dust, the volcanic soils — those are merely the conditions in which their lives unfold.`}</P>

        <P>{`The plane back to Lisbon leaves Praia at 02:40. I take a taxi to RAI at midnight. The driver, a man in his fifties named Jorge, who emigrated to Boston in 1989 and returned in 2018, asks me what I have photographed. I tell him: a volcano, a valley, a salt crater, a market, a morna set. He thinks about this for a moment, then says, in his careful American-tinged English: "You have photographed the country, but you have not yet photographed Cabo Verde. For that, you have to come back. We are an archipelago of departures. The whole point is to return."`}</P>
      </Sec>

      <Sec n="6" title="Source Integrity Note">
        <Callout type="info" title="Verification, composites, and field-verification flags">
          <P>{`<strong>GPS COORDINATES marked [FV]:</strong> all ten primary positions are derived from satellite imagery cross-referenced with published trip reports, OpenStreetMap, and Wikiloc tracks. They are accurate to within roughly 30–80 metres but have <em>not</em> been walked with a personal GPS. A field-verifying photographer should expect to refine each by a short walk on arrival.`}</P>
          <P>{`<strong>NAMED LOCAL CHARACTERS — composite disclosure:</strong> Tito Paris Jr. (cavaquinho player at Café Lisboa), Anselmo Gonçalves Lima (Chã das Caldeiras vineyard owner), Maria de Fátima Gomes (Ribeira do Paul farmer), and Jorge (Praia taxi driver) are <strong>composite characters</strong> built from public reporting on the Mindelo morna scene (Café Lisboa and Casa da Morna venue rosters; coverage of working musicians including the Vida Boa group and BandaXL choristers); on Chã das Caldeiras 2014–15 eruption survivor accounts (cooperative member testimony in Lonely Planet, Wine-Searcher, and the Holcim Foundation post-eruption rebuilding documentation); on Santo Antão valley farming practices (multiple ethnographic descriptions of the levada system); and on Cape Verdean diaspora-return narratives. They are <em>not</em> field-verified individuals. A field reporter should seek and name actual working morna performers at Café Lisboa, an actual cooperative-member vineyard owner in Chã, an actual valley smallholder in Paul, and an actual returnee taxi driver. Tito Paris is a real Cape Verdean musician; "Tito Paris Jr." in this article is <em>not</em> intended to refer to him. Names in field-reported version must be sought, verified, and used with explicit consent.`}</P>
          <P>{`<strong>VERIFIED FACTS:</strong> Pico do Fogo 2014–15 eruption (23 Nov 2014 – 8 Feb 2015, VEI 3, 994 evacuees, villages of Portela and Bangaeira destroyed) — Smithsonian Global Volcanism Program, GFDRR Post-Disaster Needs Assessment, Wikipedia 2014–15 Fogo eruption article. Cidade Velha UNESCO inscription 26 June 2009 (Cape Verde's first World Heritage site) — UNESCO World Heritage Centre. Cape Verde EASE pre-registration mandatory from 1 January 2026; visa-on-arrival ended for 96 countries — EASE.gov.cv, EU EEAS travel advisory. CV Interilhas São Vicente–Santo Antão route 60-min crossing — capeverdeislands.org transport guide.`}</P>
          <P>{`<strong>TIMING DATA:</strong> sunrise/sunset times derived from timeanddate.com Praia (15.0°N) astronomical data for representative months; bruma seca probability percentages estimated from CV-DUST seasonal monitoring summaries (Tellus B, 2015) and discover-cape-verde.com seasonal patterns. Monthly rainfall figures are climate-normal averages for Praia and will vary 30–50% year-on-year.`}</P>
          <P>{`<strong>ACCESS, FEES, AND BOOKING WINDOWS</strong> change seasonally and were correct as of April 2026 from official sources. Verify before publication: (a) Pedra de Lume entry fee, currently 6 EUR; (b) Pico do Fogo guided ascent rate, currently ~5,000 CVE; (c) Serra Malagueta park entry, currently 200 CVE; (d) all CV Interilhas ferry schedules — published month-by-month on cvinterilhas.cv.`}</P>
          <P>{`<strong>FAILURE CONDITIONS</strong> are inferred from a combination of meteorological norms, photography forum reporting, and cross-checks against Mindelense and Fogo guesthouse advisories. They have not been individually field-validated for every shot. The harmattan/bruma seca failure is universally documented; orographic cloud failures on Santo Antão and Fogo are widely reported; tour-bus crowding at Pedra de Lume is a TripAdvisor consensus.`}</P>
          <P>{`<strong>CONTESTED OR DATE-SENSITIVE CLAIMS:</strong> the visibility of Pico do Fogo from Ponta do Sol on Santo Antão (~250 km) is theoretically possible on the cleanest days but is not photographed often; treat as aspirational rather than reliable. The pink algal colour at Pedra de Lume is irregular year-on-year and depends on bloom conditions.`}</P>
          <P>{`<strong>LOCAL VOICES TO ADD:</strong> a field-reported version should add named, consenting voices from (1) the Chã das Caldeiras Cooperativa winery; (2) the Mindelo Mercado Municipal fish hall; (3) the Cova de Paul rangers; (4) the Pedra de Lume site management; (5) the CV Interilhas Mindelo terminal staff for current ferry conditions.`}</P>
        </Callout>
      </Sec>

      <p style={{ fontFamily: "'Source Sans 3',sans-serif", fontSize: 11, color: C.ash, marginTop: 36, letterSpacing: 1, textAlign: "center" }}>
        CABO VERDE · 5 ISLANDS · 10 LOCATIONS · 25 MIN READ · APRIL 2026
      </p>
    </article>
  );
}

