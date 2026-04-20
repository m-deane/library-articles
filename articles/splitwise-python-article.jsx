import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;500;700&family=Libre+Franklin:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0f0e0d;
    --paper: #faf8f4;
    --rule: #e2ddd6;
    --accent: #c0392b;
    --accent-dim: #e8d5d3;
    --code-bg: #1a1917;
    --code-fg: #e8e3dc;
    --highlight: #f0c040;
    --muted: #6b6460;
    --teal: #1a7a6e;
    --teal-dim: #d2eae7;
  }

  .article-root {
    background: var(--paper);
    color: var(--ink);
    font-family: 'Libre Franklin', Georgia, serif;
    font-size: 17px;
    line-height: 1.7;
    min-height: 100vh;
  }

  /* ── MASTHEAD ── */
  .masthead {
    border-bottom: 3px solid var(--ink);
    padding: 18px 0 14px;
    text-align: center;
    letter-spacing: 0.22em;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--muted);
    font-family: 'Libre Franklin', sans-serif;
  }

  /* ── HERO ── */
  .hero {
    max-width: 900px;
    margin: 0 auto;
    padding: 56px 32px 0;
  }

  .kicker {
    display: inline-block;
    background: var(--accent);
    color: #fff;
    font-family: 'Libre Franklin', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 4px 10px;
    margin-bottom: 20px;
  }

  .headline {
    font-family: 'DM Serif Display', Georgia, serif;
    font-size: clamp(2.6rem, 5vw, 4.2rem);
    line-height: 1.08;
    letter-spacing: -0.02em;
    color: var(--ink);
    margin-bottom: 20px;
  }

  .headline em {
    font-style: italic;
    color: var(--accent);
  }

  .deck {
    font-family: 'Libre Franklin', sans-serif;
    font-size: 1.22rem;
    font-weight: 300;
    line-height: 1.55;
    color: #3a3632;
    max-width: 700px;
    margin-bottom: 32px;
    border-left: 3px solid var(--accent);
    padding-left: 18px;
  }

  .byline-row {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 18px 0;
    border-top: 1px solid var(--rule);
    border-bottom: 1px solid var(--rule);
    margin-bottom: 48px;
    flex-wrap: wrap;
  }

  .byline-badge {
    background: var(--ink);
    color: #fff;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    padding: 3px 8px;
    letter-spacing: 0.05em;
  }

  .byline-meta {
    font-size: 12px;
    color: var(--muted);
    font-family: 'Libre Franklin', sans-serif;
  }

  .tag-row {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-left: auto;
  }

  .tag {
    border: 1px solid var(--rule);
    font-size: 10px;
    padding: 3px 8px;
    font-family: 'Libre Franklin', sans-serif;
    color: var(--muted);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  /* ── LAYOUT ── */
  .content-grid {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 32px 80px;
  }

  /* ── TOC ── */
  .toc {
    background: var(--ink);
    color: var(--code-fg);
    padding: 28px 32px;
    margin-bottom: 48px;
    font-family: 'Libre Franklin', sans-serif;
  }

  .toc-title {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--highlight);
    margin-bottom: 16px;
  }

  .toc-list {
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px 32px;
  }

  .toc-item {
    font-size: 13px;
    color: #c8c2ba;
    cursor: pointer;
    transition: color 0.15s;
    display: flex;
    gap: 10px;
    align-items: baseline;
  }

  .toc-item:hover { color: var(--highlight); }

  .toc-num {
    color: var(--accent);
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    flex-shrink: 0;
  }

  /* ── SECTION HEADERS ── */
  .section-rule {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 56px 0 28px;
  }

  .section-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: var(--accent);
    flex-shrink: 0;
  }

  .section-rule::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--rule);
  }

  .section-title {
    font-family: 'DM Serif Display', Georgia, serif;
    font-size: 1.9rem;
    line-height: 1.2;
    color: var(--ink);
    margin-bottom: 20px;
  }

  .subsection-title {
    font-family: 'Libre Franklin', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
    margin: 32px 0 12px;
  }

  /* ── PROSE ── */
  .prose p {
    margin-bottom: 1.4em;
    font-size: 1.02rem;
    color: #1f1d1b;
  }

  .prose p:first-child::first-letter {
    font-family: 'DM Serif Display', Georgia, serif;
    font-size: 4.2em;
    line-height: 0.85;
    float: left;
    margin-right: 8px;
    margin-top: 6px;
    color: var(--accent);
  }

  .prose strong { font-weight: 600; }

  /* ── PULL QUOTE ── */
  .pull-quote {
    border-top: 3px solid var(--ink);
    border-bottom: 3px solid var(--ink);
    padding: 28px 0;
    margin: 40px 0;
  }

  .pull-quote blockquote {
    font-family: 'DM Serif Display', Georgia, serif;
    font-size: 1.55rem;
    line-height: 1.3;
    font-style: italic;
    color: var(--ink);
    margin-bottom: 8px;
  }

  .pull-quote cite {
    font-size: 12px;
    color: var(--muted);
    font-family: 'Libre Franklin', sans-serif;
    font-style: normal;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  /* ── CALLOUT ── */
  .callout {
    background: var(--accent-dim);
    border-left: 4px solid var(--accent);
    padding: 20px 24px;
    margin: 32px 0;
    font-size: 0.93rem;
  }

  .callout-label {
    font-family: 'Libre Franklin', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 8px;
  }

  .callout-teal {
    background: var(--teal-dim);
    border-left-color: var(--teal);
  }

  .callout-teal .callout-label { color: var(--teal); }

  .callout-dark {
    background: var(--ink);
    color: var(--code-fg);
    border-left-color: var(--highlight);
  }

  .callout-dark .callout-label { color: var(--highlight); }

  /* ── CODE ── */
  .code-block {
    background: var(--code-bg);
    border-radius: 0;
    margin: 28px 0;
    overflow: hidden;
  }

  .code-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 16px;
    background: #111010;
    border-bottom: 1px solid #2a2826;
  }

  .code-lang {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: var(--highlight);
    letter-spacing: 0.05em;
  }

  .code-label {
    font-family: 'Libre Franklin', sans-serif;
    font-size: 11px;
    color: #5a5652;
    letter-spacing: 0.05em;
  }

  .code-body {
    padding: 20px 20px;
    overflow-x: auto;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    line-height: 1.65;
    color: var(--code-fg);
    white-space: pre;
  }

  .code-comment { color: #6a6660; }
  .code-kw { color: #d08090; }
  .code-str { color: #98c379; }
  .code-fn { color: #61afef; }
  .code-num { color: #d19a66; }
  .code-cls { color: #e5c07b; }
  .code-op { color: #c8c2ba; }

  /* ── DIAGRAM / SVG WRAPPER ── */
  .diagram-block {
    background: #fff;
    border: 1px solid var(--rule);
    margin: 36px 0;
    padding: 0;
    overflow: hidden;
  }

  .diagram-header {
    background: var(--ink);
    color: var(--highlight);
    font-family: 'Libre Franklin', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 10px 16px;
  }

  .diagram-inner {
    padding: 24px;
    overflow-x: auto;
  }

  /* ── COMPARISON TABLE ── */
  .compare-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    font-family: 'Libre Franklin', sans-serif;
    margin: 28px 0;
  }

  .compare-table th {
    background: var(--ink);
    color: var(--highlight);
    padding: 10px 14px;
    text-align: left;
    font-weight: 600;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .compare-table td {
    padding: 10px 14px;
    border-bottom: 1px solid var(--rule);
    vertical-align: top;
  }

  .compare-table tr:nth-child(even) td { background: #f4f2ee; }

  .compare-table .check { color: var(--teal); font-size: 15px; }
  .compare-table .cross { color: var(--accent); font-size: 15px; }

  /* ── API REFERENCE ── */
  .api-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: var(--rule);
    border: 1px solid var(--rule);
    margin: 28px 0;
  }

  .api-card {
    background: var(--paper);
    padding: 16px 18px;
  }

  .api-method {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: var(--teal);
    margin-bottom: 6px;
    font-weight: 700;
  }

  .api-desc {
    font-size: 12px;
    color: var(--muted);
    line-height: 1.4;
    font-family: 'Libre Franklin', sans-serif;
  }

  /* ── INLINE CODE ── */
  code {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.83em;
    background: #ece9e3;
    padding: 1px 5px;
    color: var(--accent);
  }

  /* ── SIDEBAR ── */
  .sidebar-note {
    float: right;
    width: 240px;
    margin: 0 0 20px 28px;
    padding: 16px 18px;
    background: var(--ink);
    color: var(--code-fg);
    font-size: 12px;
    font-family: 'Libre Franklin', sans-serif;
    line-height: 1.5;
  }

  .sidebar-note-title {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--highlight);
    margin-bottom: 10px;
  }

  /* ── FOOTER ── */
  .article-footer {
    background: var(--ink);
    color: #7a7470;
    padding: 32px;
    font-size: 12px;
    font-family: 'Libre Franklin', sans-serif;
    line-height: 1.6;
    margin-top: 64px;
  }

  .footer-inner {
    max-width: 900px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }

  .footer-title {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #ccc8c0;
    margin-bottom: 8px;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 640px) {
    .toc-list { grid-template-columns: 1fr; }
    .api-grid { grid-template-columns: 1fr; }
    .footer-inner { grid-template-columns: 1fr; }
    .sidebar-note { float: none; width: 100%; margin: 20px 0; }
    .headline { font-size: 2.2rem; }
  }
`;

// ── SYNTAX-HIGHLIGHTED CODE BLOCKS ──────────────────────────────────────────

const CodeBlock = ({ lang, label, code }) => (
  <div className="code-block">
    <div className="code-header">
      <span className="code-lang">{lang}</span>
      {label && <span className="code-label">{label}</span>}
    </div>
    <div className="code-body" dangerouslySetInnerHTML={{ __html: code }} />
  </div>
);

// ── AUTHENTICATION DIAGRAM ───────────────────────────────────────────────────

const AuthDiagram = () => (
  <div className="diagram-block">
    <div className="diagram-header">FIGURE 1 — OAuth2 Authentication Flow</div>
    <div className="diagram-inner">
      <svg viewBox="0 0 780 220" style={{ width: "100%", fontFamily: "JetBrains Mono, monospace" }}>
        {/* Actors */}
        {[["Your App", 90], ["Splitwise OAuth", 390], ["Access Token", 690]].map(([label, x]) => (
          <g key={label}>
            <rect x={x - 80} y={10} width={160} height={36} fill="#1a1917" stroke="#c0392b" strokeWidth={1.5} />
            <text x={x} y={34} textAnchor="middle" fill="#e8d5d3" fontSize={12} fontWeight="bold">{label}</text>
          </g>
        ))}
        {/* Lifelines */}
        {[90, 390, 690].map(x => (
          <line key={x} x1={x} y1={46} x2={x} y2={210} stroke="#2a2826" strokeWidth={1} strokeDasharray="4,3" />
        ))}
        {/* Arrow helper */}
        {[[90, 390, 80, "#c0392b", "① consumer_key + secret"], [390, 90, 130, "#61afef", "② authorize_url + state"], [90, 390, 180, "#c0392b", "③ code + state (callback)"], [390, 690, 130, "#98c379", "④ access_token (stored)"]].map(([x1, x2, y, color, label]) => {
          const dir = x2 > x1 ? 1 : -1;
          return (
            <g key={label}>
              <line x1={x1 + dir * 82} y1={y} x2={x2 - dir * 82} y2={y} stroke={color} strokeWidth={1.5} markerEnd={`url(#arr-${color.replace('#','')})`} />
              <text x={(x1 + x2) / 2} y={y - 6} textAnchor="middle" fill={color} fontSize={10}>{label}</text>
            </g>
          );
        })}
        <defs>
          {["c0392b", "61afef", "98c379"].map(c => (
            <marker key={c} id={`arr-${c}`} markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <polygon points="0 0, 7 3.5, 0 7" fill={`#${c}`} />
            </marker>
          ))}
        </defs>
        {/* API Key shortcut */}
        <rect x={250} y={192} width={280} height={20} fill="#1a1917" stroke="#f0c040" strokeWidth={1} />
        <text x={390} y={206} textAnchor="middle" fill="#f0c040" fontSize={10}>⚡ API Key shortcut: skip ①-③ for testing</text>
      </svg>
    </div>
  </div>
);

// ── OBJECT MODEL DIAGRAM ─────────────────────────────────────────────────────

const ObjectModelDiagram = () => (
  <div className="diagram-block">
    <div className="diagram-header">FIGURE 2 — Core Object Model</div>
    <div className="diagram-inner">
      <svg viewBox="0 0 760 300" style={{ width: "100%", fontFamily: "JetBrains Mono, monospace" }}>
        {/* Central Splitwise */}
        <rect x={300} y={110} width={160} height={44} fill="#c0392b" rx={2} />
        <text x={380} y={138} textAnchor="middle" fill="#fff" fontSize={13} fontWeight="bold">Splitwise</text>
        {/* Satellite objects */}
        {[
          [50, 40, "CurrentUser", "#1a7a6e"],
          [50, 155, "Friend[]", "#1a7a6e"],
          [50, 250, "Group[]", "#1a7a6e"],
          [560, 40, "Expense[]", "#1a7a6e"],
          [560, 155, "Category[]", "#1a7a6e"],
          [560, 250, "Currency[]", "#1a7a6e"],
        ].map(([x, y, label, fill]) => (
          <g key={label}>
            <rect x={x} y={y} width={130} height={36} fill={fill} rx={2} />
            <text x={x + 65} y={y + 23} textAnchor="middle" fill="#d2eae7" fontSize={12}>{label}</text>
            <line
              x1={x > 300 ? x : x + 130} y1={y + 18}
              x2={x > 300 ? 460 : 300} y2={132}
              stroke="#2a2826" strokeWidth={1.5} strokeDasharray="3,3"
            />
          </g>
        ))}
        {/* Expense child objects */}
        {[["ExpenseUser", 480, 270], ["Debt[]", 560, 270], ["Comment[]", 640, 270]].map(([label, x, y]) => (
          <g key={label}>
            <rect x={x - 48} y={y} width={100} height={26} fill="#2a2826" stroke="#61afef" strokeWidth={1} rx={1} />
            <text x={x + 2} y={y + 17} textAnchor="middle" fill="#61afef" fontSize={10}>{label}</text>
            <line x1={x + 2} y1={y} x2={625} y2={76} stroke="#61afef" strokeWidth={1} opacity={0.5} />
          </g>
        ))}
        <text x={380} y={292} textAnchor="middle" fill="#6a6660" fontSize={10}>SDK object hierarchy — every node exposes typed getter/setter methods</text>
      </svg>
    </div>
  </div>
);

// ── DEBT MINIMISATION DIAGRAM ─────────────────────────────────────────────────

const DebtDiagram = () => (
  <div className="diagram-block">
    <div className="diagram-header">FIGURE 3 — Debt Minimisation Algorithm</div>
    <div className="diagram-inner">
      <svg viewBox="0 0 760 240" style={{ width: "100%", fontFamily: "Libre Franklin, sans-serif" }}>
        {/* Before */}
        <text x={190} y={22} textAnchor="middle" fill="#c0392b" fontSize={11} fontWeight="bold" letterSpacing="0.1em">BEFORE SIMPLIFICATION</text>
        {[["Alice", 60, 80], ["Bob", 190, 40], ["Carol", 320, 80], ["Dave", 190, 140]].map(([n, x, y]) => (
          <g key={n}>
            <circle cx={x} cy={y} r={26} fill="#1a1917" stroke="#6b6460" strokeWidth={1.5} />
            <text x={x} y={y + 5} textAnchor="middle" fill="#e8e3dc" fontSize={12}>{n}</text>
          </g>
        ))}
        {[[[86,80],[164,52],"$12"],[[ 86,80],[164,108],"$8"],[[216,52],[294,68],"$15"],[[216,108],[294,92],"$6"],[[190,66],[190,114],"$9"]].map(([[x1,y1],[x2,y2],label],i) => (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#6b6460" strokeWidth={1.5} markerEnd="url(#arr-thin)" />
            <text x={(x1+x2)/2+4} y={(y1+y2)/2-4} fill="#f0c040" fontSize={10}>{label}</text>
          </g>
        ))}
        {/* After */}
        <text x={570} y={22} textAnchor="middle" fill="#1a7a6e" fontSize={11} fontWeight="bold" letterSpacing="0.1em">AFTER SIMPLIFICATION</text>
        {[["Alice", 440, 80], ["Bob", 570, 40], ["Carol", 700, 80], ["Dave", 570, 140]].map(([n, x, y]) => (
          <g key={n}>
            <circle cx={x} cy={y} r={26} fill="#1a1917" stroke="#1a7a6e" strokeWidth={1.5} />
            <text x={x} y={y + 5} textAnchor="middle" fill="#d2eae7" fontSize={12}>{n}</text>
          </g>
        ))}
        {[[[466,80],[544,52],"$20"],[[596,52],[674,68],"$21"],[[570,66],[570,114],"$9"]].map(([[x1,y1],[x2,y2],label],i) => (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1a7a6e" strokeWidth={2} markerEnd="url(#arr-teal)" />
            <text x={(x1+x2)/2+4} y={(y1+y2)/2-4} fill="#f0c040" fontSize={10}>{label}</text>
          </g>
        ))}
        {/* Divider */}
        <line x1={390} y1={20} x2={390} y2={200} stroke="#2a2826" strokeWidth={1.5} strokeDasharray="6,4" />
        <text x={390} y={215} textAnchor="middle" fill="#6a6660" fontSize={10}>5 transactions → 3 transactions (40% reduction)</text>
        <defs>
          <marker id="arr-thin" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0 0,6 3,0 6" fill="#6b6460" />
          </marker>
          <marker id="arr-teal" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0 0,6 3,0 6" fill="#1a7a6e" />
          </marker>
        </defs>
      </svg>
    </div>
  </div>
);

// ── CODE SNIPPETS ──────────────────────────────────────────────────────────────

const code_install = `<span class="code-comment"># Install the official Python SDK</span>
<span class="code-fn">pip</span> <span class="code-str">install splitwise</span>

<span class="code-comment"># Optional: pandas for analytics, rich for pretty CLI output</span>
<span class="code-fn">pip</span> <span class="code-str">install pandas rich python-dotenv</span>`;

const code_auth_apikey = `<span class="code-kw">from</span> splitwise <span class="code-kw">import</span> <span class="code-cls">Splitwise</span>
<span class="code-kw">import</span> os
<span class="code-kw">from</span> dotenv <span class="code-kw">import</span> load_dotenv

load_dotenv()

<span class="code-comment"># --- Option A: API key (testing / personal scripts) ---</span>
sw = <span class="code-cls">Splitwise</span>(
    consumer_key=os.getenv(<span class="code-str">"SPLITWISE_CONSUMER_KEY"</span>),
    consumer_secret=os.getenv(<span class="code-str">"SPLITWISE_CONSUMER_SECRET"</span>),
    api_key=os.getenv(<span class="code-str">"SPLITWISE_API_KEY"</span>),
)

me = sw.getCurrentUser()
<span class="code-fn">print</span>(<span class="code-str">f"Authenticated as: </span>{me.getFirstName()} {me.getLastName()}<span class="code-str">"</span>)`;

const code_auth_oauth2 = `<span class="code-kw">from</span> flask <span class="code-kw">import</span> Flask, redirect, request, session
<span class="code-kw">from</span> splitwise <span class="code-kw">import</span> <span class="code-cls">Splitwise</span>

app = Flask(__name__)
app.secret_key = os.getenv(<span class="code-str">"FLASK_SECRET"</span>)

<span class="code-comment"># --- Option B: OAuth2 (multi-user web apps) ---</span>
<span class="code-kw">@app.route</span>(<span class="code-str">"/login"</span>)
<span class="code-kw">def</span> <span class="code-fn">login</span>():
    sw = <span class="code-cls">Splitwise</span>(CONSUMER_KEY, CONSUMER_SECRET)
    redirect_uri = <span class="code-str">"http://localhost:5000/callback"</span>
    url, state = sw.getOAuth2AuthorizeURL(redirect_uri)
    session[<span class="code-str">"oauth_state"</span>] = state
    <span class="code-kw">return</span> redirect(url)

<span class="code-kw">@app.route</span>(<span class="code-str">"/callback"</span>)
<span class="code-kw">def</span> <span class="code-fn">callback</span>():
    code = request.args.get(<span class="code-str">"code"</span>)
    state = request.args.get(<span class="code-str">"state"</span>)
    <span class="code-kw">assert</span> state == session[<span class="code-str">"oauth_state"</span>]  <span class="code-comment"># CSRF guard</span>
    sw = <span class="code-cls">Splitwise</span>(CONSUMER_KEY, CONSUMER_SECRET)
    token = sw.getOAuth2AccessToken(code, <span class="code-str">"http://localhost:5000/callback"</span>)
    session[<span class="code-str">"access_token"</span>] = token
    <span class="code-kw">return</span> redirect(<span class="code-str">"/"</span>)`;

const code_read_expenses = `<span class="code-kw">from</span> datetime <span class="code-kw">import</span> datetime, timedelta
<span class="code-kw">import</span> pandas <span class="code-kw">as</span> pd

<span class="code-comment"># Paginate ALL expenses from the past 30 days</span>
<span class="code-kw">def</span> <span class="code-fn">fetch_expenses</span>(sw, days=<span class="code-num">30</span>):
    since = (datetime.now() - timedelta(days=days)).strftime(<span class="code-str">"%Y-%m-%dT00:00:00Z"</span>)
    expenses, offset, page_size = [], <span class="code-num">0</span>, <span class="code-num">100</span>
    <span class="code-kw">while True</span>:
        page = sw.getExpenses(
            dated_after=since,
            limit=page_size,
            offset=offset,
        )
        <span class="code-kw">if not</span> page:
            <span class="code-kw">break</span>
        expenses.extend(page)
        offset += page_size
    <span class="code-kw">return</span> expenses

<span class="code-comment"># Convert to a tidy DataFrame</span>
<span class="code-kw">def</span> <span class="code-fn">expenses_to_df</span>(expenses, my_id):
    rows = []
    <span class="code-kw">for</span> e <span class="code-kw">in</span> expenses:
        <span class="code-kw">if</span> e.getDeletedAt():
            <span class="code-kw">continue</span>
        my_share = next(
            (u.getOwedShare() <span class="code-kw">for</span> u <span class="code-kw">in</span> e.getUsers() <span class="code-kw">if</span> u.getId() == my_id),
            <span class="code-str">"0.00"</span>,
        )
        rows.append({
            <span class="code-str">"date"</span>: e.getDate(),
            <span class="code-str">"description"</span>: e.getDescription(),
            <span class="code-str">"total"</span>: <span class="code-fn">float</span>(e.getCost()),
            <span class="code-str">"my_share"</span>: <span class="code-fn">float</span>(my_share),
            <span class="code-str">"currency"</span>: e.getCurrencyCode(),
            <span class="code-str">"group_id"</span>: e.getGroupId(),
            <span class="code-str">"category"</span>: e.getCategory().getName() <span class="code-kw">if</span> e.getCategory() <span class="code-kw">else</span> <span class="code-str">"Uncategorised"</span>,
        })
    <span class="code-kw">return</span> pd.DataFrame(rows)

expenses = fetch_expenses(sw)
df = expenses_to_df(expenses, sw.getCurrentUser().getId())
<span class="code-fn">print</span>(df.groupby(<span class="code-str">"category"</span>)[<span class="code-str">"my_share"</span>].sum().sort_values(ascending=<span class="code-kw">False</span>))`;

const code_create_expense = `<span class="code-kw">from</span> splitwise.expense <span class="code-kw">import</span> <span class="code-cls">Expense</span>
<span class="code-kw">from</span> splitwise.user <span class="code-kw">import</span> <span class="code-cls">ExpenseUser</span>

<span class="code-kw">def</span> <span class="code-fn">split_equally</span>(sw, description, total_cost, participant_ids, paid_by_id):
    <span class="code-str">"""Create an equal-split expense among N participants."""</span>
    per_person = <span class="code-fn">round</span>(total_cost / <span class="code-fn">len</span>(participant_ids), <span class="code-num">2</span>)
    
    expense = <span class="code-cls">Expense</span>()
    expense.setCost(<span class="code-fn">str</span>(total_cost))
    expense.setDescription(description)
    expense.setSplitEqually(<span class="code-kw">False</span>)  <span class="code-comment"># manual control</span>

    users = []
    <span class="code-kw">for</span> uid <span class="code-kw">in</span> participant_ids:
        u = <span class="code-cls">ExpenseUser</span>()
        u.setId(uid)
        u.setPaidShare(<span class="code-str">"0.00"</span>)
        u.setOwedShare(<span class="code-fn">str</span>(per_person))
        users.append(u)

    <span class="code-comment"># The payer gets credited the full amount</span>
    payer = next(u <span class="code-kw">for</span> u <span class="code-kw">in</span> users <span class="code-kw">if</span> u.getId() == paid_by_id)
    payer.setPaidShare(<span class="code-fn">str</span>(total_cost))

    expense.setUsers(users)
    created, errors = sw.createExpense(expense)
    
    <span class="code-kw">if</span> errors:
        <span class="code-kw">raise</span> <span class="code-cls">ValueError</span>(<span class="code-str">f"API errors: </span>{errors.getErrors()}<span class="code-str">"</span>)
    <span class="code-kw">return</span> created

<span class="code-comment"># Example: €90 dinner, split 3 ways, Alice paid</span>
exp = split_equally(sw, <span class="code-str">"Dinner at La Maison"</span>, <span class="code-num">90.00</span>,
                    participant_ids=[<span class="code-num">10001</span>, <span class="code-num">10002</span>, <span class="code-num">10003</span>],
                    paid_by_id=<span class="code-num">10001</span>)
<span class="code-fn">print</span>(<span class="code-str">f"Created expense #{exp.getId()}"</span>)`;

const code_analytics = `<span class="code-kw">import</span> pandas <span class="code-kw">as</span> pd

<span class="code-kw">def</span> <span class="code-fn">balance_report</span>(sw):
    <span class="code-str">"""Print a rich balance report across all groups and friends."""</span>
    friends = sw.getFriends()
    rows = []
    <span class="code-kw">for</span> f <span class="code-kw">in</span> friends:
        <span class="code-kw">for</span> bal <span class="code-kw">in</span> f.getBalances():
            rows.append({
                <span class="code-str">"name"</span>: <span class="code-str">f"</span>{f.getFirstName()} {f.getLastName()}<span class="code-str">"</span>,
                <span class="code-str">"currency"</span>: bal.getCurrencyCode(),
                <span class="code-str">"amount"</span>: <span class="code-fn">float</span>(bal.getAmount()),
            })
    df = pd.DataFrame(rows)
    owes_you   = df[df.amount > <span class="code-num">0</span>].groupby(<span class="code-str">"name"</span>)[<span class="code-str">"amount"</span>].sum()
    you_owe    = df[df.amount < <span class="code-num">0</span>].groupby(<span class="code-str">"name"</span>)[<span class="code-str">"amount"</span>].sum()

    <span class="code-fn">print</span>(<span class="code-str">"╔═══════════════════════════╗"</span>)
    <span class="code-fn">print</span>(<span class="code-str">"║  MONEY OWED TO YOU        ║"</span>)
    <span class="code-fn">print</span>(<span class="code-str">"╠═══════════════════════════╣"</span>)
    <span class="code-kw">for</span> name, amount <span class="code-kw">in</span> owes_you.items():
        <span class="code-fn">print</span>(<span class="code-str">f"  ✔ </span>{name:<span class="code-num">20</span>s} +{amount:<span class="code-num">.2f</span>}<span class="code-str">"</span>)
    <span class="code-fn">print</span>()
    <span class="code-fn">print</span>(<span class="code-str">"  YOU OWE"</span>)
    <span class="code-kw">for</span> name, amount <span class="code-kw">in</span> you_owe.items():
        <span class="code-fn">print</span>(<span class="code-str">f"  ✘ </span>{name:<span class="code-num">20</span>s} {amount:<span class="code-num">.2f</span>}<span class="code-str">"</span>)

balance_report(sw)`;

const code_monthly_report = `<span class="code-kw">import</span> pandas <span class="code-kw">as</span> pd

<span class="code-kw">def</span> <span class="code-fn">monthly_spending_report</span>(sw, my_id, months=<span class="code-num">3</span>):
    <span class="code-str">"""Breakdown of personal spending by category, per month."""</span>
    all_expenses = sw.getExpenses(
        dated_after=(datetime.now() - timedelta(days=<span class="code-num">90</span>)).isoformat(),
        limit=<span class="code-num">500</span>,
    )
    rows = []
    <span class="code-kw">for</span> e <span class="code-kw">in</span> all_expenses:
        <span class="code-kw">if</span> e.getDeletedAt() <span class="code-kw">or</span> e.getPayment():
            <span class="code-kw">continue</span>
        my_share = next(
            (<span class="code-fn">float</span>(u.getOwedShare()) <span class="code-kw">for</span> u <span class="code-kw">in</span> e.getUsers() <span class="code-kw">if</span> u.getId() == my_id),
            <span class="code-num">0.0</span>,
        )
        rows.append({
            <span class="code-str">"month"</span>: e.getDate()[:7],   <span class="code-comment"># YYYY-MM</span>
            <span class="code-str">"category"</span>: e.getCategory().getName() <span class="code-kw">if</span> e.getCategory() <span class="code-kw">else</span> <span class="code-str">"Other"</span>,
            <span class="code-str">"my_share"</span>: my_share,
        })

    df = pd.DataFrame(rows)
    pivot = df.pivot_table(
        index=<span class="code-str">"category"</span>,
        columns=<span class="code-str">"month"</span>,
        values=<span class="code-str">"my_share"</span>,
        aggfunc=<span class="code-str">"sum"</span>,
        fill_value=<span class="code-num">0</span>,
    )
    <span class="code-kw">return</span> pivot.sort_values(pivot.columns[-<span class="code-num">1</span>], ascending=<span class="code-kw">False</span>)

<span class="code-fn">print</span>(monthly_spending_report(sw, my_id=sw.getCurrentUser().getId()))`;

const code_rate_limit = `<span class="code-kw">import</span> time, functools

<span class="code-kw">def</span> <span class="code-fn">rate_limited</span>(max_per_second):
    <span class="code-str">"""Decorator to cap API call frequency."""</span>
    min_interval = <span class="code-num">1.0</span> / max_per_second
    last_called = [<span class="code-num">0.0</span>]
    <span class="code-kw">def</span> <span class="code-fn">decorator</span>(func):
        @functools.wraps(func)
        <span class="code-kw">def</span> <span class="code-fn">wrapper</span>(*args, **kwargs):
            elapsed = time.time() - last_called[<span class="code-num">0</span>]
            wait = min_interval - elapsed
            <span class="code-kw">if</span> wait > <span class="code-num">0</span>:
                time.sleep(wait)
            last_called[<span class="code-num">0</span>] = time.time()
            <span class="code-kw">return</span> func(*args, **kwargs)
        <span class="code-kw">return</span> wrapper
    <span class="code-kw">return</span> decorator

<span class="code-comment"># Splitwise allows ~60 req/min; be conservative</span>
@rate_limited(<span class="code-num">0.8</span>)
<span class="code-kw">def</span> <span class="code-fn">safe_get_expense</span>(sw, expense_id):
    <span class="code-kw">return</span> sw.getExpense(expense_id)`;

// ── MAIN ARTICLE ──────────────────────────────────────────────────────────────

export default function Article() {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    ["01", "What is Splitwise?", "s1"],
    ["02", "The Python SDK Landscape", "s2"],
    ["03", "Authentication Deep Dive", "s3"],
    ["04", "Core Object Model", "s4"],
    ["05", "Reading Data", "s5"],
    ["06", "Writing Data", "s6"],
    ["07", "Analytics & Reporting", "s7"],
    ["08", "Rate Limits & Best Practices", "s8"],
    ["09", "Real-World Use Cases", "s9"],
    ["10", "API Reference Cheatsheet", "s10"],
  ];

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{styles}</style>
      <div className="article-root">
        {/* Masthead */}
        <div className="masthead">
          The Practitioner's Encyclopaedia · Python Data Engineering · Vol. XII
        </div>

        {/* Hero */}
        <div className="hero">
          <div className="kicker">Expense Automation</div>
          <h1 className="headline">
            Splitwise in Python:<br />
            <em>The Complete Practitioner's Guide</em>
          </h1>
          <p className="deck">
            From OAuth handshakes to debt-minimisation graphs — everything a data engineer, 
            automation developer, or financial-analysis practitioner needs to wire Python 
            directly into Splitwise's REST API using the <code>splitwise</code> SDK.
          </p>
          <div className="byline-row">
            <div className="byline-badge">PYTHON SDK</div>
            <div className="byline-meta">
              Splitwise v3.0.0 · Python 3.7–3.11 · PyPI: <code>splitwise</code><br />
              Author: namaggarwal · MIT Licence · 208 ★ on GitHub
            </div>
            <div className="tag-row">
              {["OAuth2", "REST API", "Pandas", "Flask", "Automation"].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="content-grid">
          {/* TOC */}
          <div className="toc">
            <div className="toc-title">Table of Contents</div>
            <ul className="toc-list">
              {sections.map(([num, title, id]) => (
                <li key={id} className="toc-item" onClick={() => scrollTo(id)}>
                  <span className="toc-num">{num}</span>
                  <span>{title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── SECTION 1 ── */}
          <div id="s1">
            <div className="section-rule">
              <span className="section-num">01</span>
            </div>
            <h2 className="section-title">What Is Splitwise?</h2>
            <div className="prose">
              <p>
                Splitwise is a debt-tracking and expense-splitting platform launched in 2011,
                now serving tens of millions of users globally. Unlike a payment processor, 
                it is a <strong>ledger of obligations</strong> — it records who paid what, 
                computes who owes whom, and optimises the resulting debt graph to minimise 
                the number of settlement transactions required.
              </p>
              <p>
                At its core, Splitwise solves a surprisingly hard combinatorial problem: given 
                N people with M expenses between them, find the minimum set of payments 
                that resolves every debt. Naively, this is O(N²) bilateral settlements; 
                Splitwise's "Simplify Debts" feature reduces this to at most N-1 transfers 
                by treating the problem as a flow network.
              </p>
            </div>

            <DebtDiagram />

            <div className="prose">
              <p>
                The platform exposes a full <strong>REST API</strong> at <code>https://secure.splitwise.com/api/v3.0/</code>,
                supporting OAuth 1.0a, OAuth 2.0, and personal API keys. Every resource — 
                users, groups, expenses, comments, currencies, categories — is accessible 
                programmatically. This makes Splitwise an attractive target for financial 
                automation, household budget analysis, and shared-economy tooling.
              </p>
            </div>

            <div className="callout callout-teal">
              <div className="callout-label">Key Concept</div>
              Expenses not assigned to a group are placed in a virtual group with <code>id=0</code>.
              Always filter <code>getExpenses()</code> results by <code>getPayment() == False</code>
              to exclude settlement transactions from spending analyses.
            </div>
          </div>

          {/* ── SECTION 2 ── */}
          <div id="s2">
            <div className="section-rule">
              <span className="section-num">02</span>
            </div>
            <h2 className="section-title">The Python SDK Landscape</h2>
            <div className="prose">
              <p>
                Several community SDKs exist across languages for the Splitwise API. 
                For Python, the canonical choice is <code>namaggarwal/splitwise</code>, 
                a 208-star MIT-licensed package on PyPI that provides complete typed 
                object wrappers around every API endpoint. It is the only Python SDK 
                listed on the official Splitwise developer documentation.
              </p>
            </div>

            <table className="compare-table">
              <thead>
                <tr>
                  <th>Library</th>
                  <th>Language</th>
                  <th>Auth</th>
                  <th>Full CRUD</th>
                  <th>Typed Objects</th>
                  <th>Active</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["namaggarwal/splitwise", "Python", "OAuth1/2 + Key", "✔", "✔", "✔"],
                  ["keriwarr/splitwise", "JavaScript", "OAuth1", "✔", "✘", "✔"],
                  ["matiasdelgado/ex_splitwise", "Elixir", "OAuth1", "partial", "✘", "?"],
                  ["sritejakv/splitwise-java", "Java", "OAuth1", "partial", "✔", "✔"],
                  ["pbar1/splitwise-rs", "Rust", "OAuth2", "read-only", "✔", "?"],
                  ["splitwisepy (deprecated)", "Python", "OAuth1 only", "✘", "✘", "✘"],
                ].map(([lib, lang, auth, crud, typed, active]) => (
                  <tr key={lib}>
                    <td><code>{lib}</code></td>
                    <td>{lang}</td>
                    <td>{auth}</td>
                    <td><span className={crud === "✔" ? "check" : "cross"}>{crud}</span></td>
                    <td><span className={typed === "✔" ? "check" : "cross"}>{typed}</span></td>
                    <td><span className={active === "✔" ? "check" : "cross"}>{active}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="prose">
              <p>
                The SDK supports Python 3.7 through 3.11 and runs on PyPy. It wraps 
                every API resource as a Python class with explicit getter and setter 
                methods — a deliberate design choice that provides IDE autocomplete 
                at the cost of more verbose code than a simple dict-based client.
              </p>
            </div>

            <CodeBlock lang="BASH" label="Installation" code={code_install} />
          </div>

          {/* ── SECTION 3 ── */}
          <div id="s3">
            <div className="section-rule">
              <span className="section-num">03</span>
            </div>
            <h2 className="section-title">Authentication Deep Dive</h2>
            <div className="prose">
              <p>
                Splitwise supports three authentication mechanisms. Choosing the wrong 
                one for your use case is the most common source of integration friction. 
                Understanding the tradeoffs upfront saves hours of debugging.
              </p>
            </div>

            <AuthDiagram />

            <div className="subsection-title">Option A — API Key (Personal Scripts)</div>
            <div className="prose">
              <p>
                For personal automation — monthly spending reports, household budget 
                dashboards, CLI tools — the API key is the fastest path. Register an 
                application at <code>https://secure.splitwise.com/oauth_clients</code>, 
                then use the API key you receive directly. This method acts on your 
                account only and is not suitable for multi-user applications.
              </p>
            </div>

            <CodeBlock lang="PYTHON" label="api_key_auth.py" code={code_auth_apikey} />

            <div className="callout">
              <div className="callout-label">Security Note</div>
              Never commit API keys to version control. Store them in a <code>.env</code> file 
              loaded via <code>python-dotenv</code>, or use environment variables in your CI/CD 
              pipeline. The <code>.env</code> file should be in <code>.gitignore</code>.
            </div>

            <div className="subsection-title">Option B — OAuth 2.0 (Web Applications)</div>
            <div className="prose">
              <p>
                For multi-user applications, OAuth 2.0 is mandatory. The SDK handles 
                the full authorization code flow. The critical security step is 
                validating the <code>state</code> parameter on callback to prevent CSRF 
                attacks — the SDK returns it from <code>getOAuth2AuthorizeURL()</code> 
                and you must compare it to what comes back from Splitwise.
              </p>
            </div>

            <CodeBlock lang="PYTHON" label="flask_oauth.py" code={code_auth_oauth2} />

            <div className="pull-quote">
              <blockquote>
                "Store the access token after the first OAuth exchange — 
                Splitwise tokens do not expire, making them safe to persist 
                in your database for long-running automations."
              </blockquote>
              <cite>splitwise SDK documentation</cite>
            </div>
          </div>

          {/* ── SECTION 4 ── */}
          <div id="s4">
            <div className="section-rule">
              <span className="section-num">04</span>
            </div>
            <h2 className="section-title">Core Object Model</h2>
            <div className="prose">
              <p>
                Every API response is deserialised into a typed Python object. 
                Understanding the object hierarchy is essential for writing 
                efficient, non-redundant code. The central entry point is the 
                <code>Splitwise</code> class; all objects it returns are instances 
                of the following classes from the <code>splitwise</code> package.
              </p>
            </div>

            <ObjectModelDiagram />

            <div className="subsection-title">The Expense Object — Full Method Reference</div>
            <div className="api-grid">
              {[
                ["getId()", "Unique expense ID (int)"],
                ["getCost()", "Total cost as string — cast to float"],
                ["getDescription()", "Human-readable name"],
                ["getDate()", "ISO 8601 date string"],
                ["getCurrencyCode()", "3-letter ISO code (e.g. EUR)"],
                ["getGroupId()", "0 = personal, N = group expense"],
                ["getCategory()", "Returns Category object or None"],
                ["getUsers()", "List[ExpenseUser] with shares"],
                ["getRepayments()", "List[Debt] — direct settlement plan"],
                ["getPayment()", "True if this is a repayment, not expense"],
                ["getDeletedAt()", "None if active; datetime if deleted"],
                ["getCreatedBy()", "User who logged the expense"],
              ].map(([method, desc]) => (
                <div key={method} className="api-card">
                  <div className="api-method">{method}</div>
                  <div className="api-desc">{desc}</div>
                </div>
              ))}
            </div>

            <div className="callout callout-dark">
              <div className="callout-label">Gotcha</div>
              <code style={{background:"transparent",color:"#f0c040",fontSize:"0.9em"}}>getCost()</code> returns a string, not a float.
              Always cast: <code style={{background:"transparent",color:"#98c379",fontSize:"0.9em"}}>float(expense.getCost())</code>.
              Similarly, <code style={{background:"transparent",color:"#f0c040",fontSize:"0.9em"}}>getOwedShare()</code> and <code style={{background:"transparent",color:"#f0c040",fontSize:"0.9em"}}>getPaidShare()</code>
              on ExpenseUser objects are also strings.
            </div>
          </div>

          {/* ── SECTION 5 ── */}
          <div id="s5">
            <div className="section-rule">
              <span className="section-num">05</span>
            </div>
            <h2 className="section-title">Reading Data</h2>
            <div className="prose">
              <p>
                The <code>getExpenses()</code> method is the workhorse of any Splitwise 
                integration. It supports rich server-side filtering, but has a hard 
                limit of 100 results per call, requiring pagination for any account 
                with significant history.
              </p>
            </div>

            <div className="sidebar-note">
              <div className="sidebar-note-title">Filter Parameters</div>
              <code>dated_after</code> / <code>dated_before</code> — ISO 8601 strings<br /><br />
              <code>updated_after</code> — for incremental sync<br /><br />
              <code>group_id</code> — filter by group<br /><br />
              <code>friend_id</code> — bilateral expenses<br /><br />
              <code>limit</code> — max 100 per page<br /><br />
              <code>offset</code> — pagination cursor
            </div>

            <CodeBlock lang="PYTHON" label="read_expenses.py — pagination + DataFrame conversion" code={code_read_expenses} />

            <div className="prose">
              <p>
                The pattern above — paginating until an empty page is returned, then 
                converting to a pandas DataFrame — is the recommended foundation for 
                any analytical pipeline. Filter <code>getDeletedAt()</code> immediately; 
                deleted expenses are returned by default and will corrupt aggregations 
                if not excluded.
              </p>
              <p>
                For incremental pipelines, use <code>updated_after</code> instead of 
                <code>dated_after</code>. This captures edits and deletions to 
                previously synced expenses, which <code>dated_after</code> misses entirely.
              </p>
            </div>
          </div>

          {/* ── SECTION 6 ── */}
          <div id="s6">
            <div className="section-rule">
              <span className="section-num">06</span>
            </div>
            <h2 className="section-title">Writing Data</h2>
            <div className="prose">
              <p>
                Creating expenses programmatically requires careful attention to the 
                <code>paid_share</code> and <code>owed_share</code> fields on each 
                <code>ExpenseUser</code>. These are the most common source of API errors 
                for new integrators: the sum of all <code>paid_share</code> values must 
                equal the total expense cost, and the sum of all <code>owed_share</code> 
                values must also equal the total cost.
              </p>
            </div>

            <CodeBlock lang="PYTHON" label="create_expense.py — equal split, N participants" code={code_create_expense} />

            <div className="callout">
              <div className="callout-label">Invariant</div>
              <strong>Always verify:</strong> <code>sum(paid_shares) == total_cost</code> and 
              <code>sum(owed_shares) == total_cost</code>. Violating either will return 
              a validation error from the API. Float precision errors are a common cause 
              — use <code>round(value, 2)</code> and adjust the last share to absorb rounding.
            </div>

            <div className="subsection-title">Updating & Deleting Expenses</div>
            <div className="prose">
              <p>
                <code>updateExpense()</code> accepts a partial <code>Expense</code> object 
                with only the fields to change — you do not need to re-specify the full 
                expense. The most ergonomic pattern is to first <code>getExpense(id)</code>, 
                mutate the fetched object, then pass it to <code>updateExpense()</code>. 
                Deletion via <code>deleteExpense(id)</code> is a soft delete — the expense 
                is retained in API responses with a non-null <code>getDeletedAt()</code>.
              </p>
            </div>
          </div>

          {/* ── SECTION 7 ── */}
          <div id="s7">
            <div className="section-rule">
              <span className="section-num">07</span>
            </div>
            <h2 className="section-title">Analytics & Reporting</h2>
            <div className="prose">
              <p>
                This is where the Python SDK truly differentiates itself from Splitwise's 
                native app. By combining the SDK with pandas, you can build financial 
                dashboards, categorised spending reports, and group fairness analyses 
                that the app simply does not offer.
              </p>
            </div>

            <CodeBlock lang="PYTHON" label="balance_report.py — net positions across all friends" code={code_analytics} />
            <CodeBlock lang="PYTHON" label="monthly_report.py — pivot table by category × month" code={code_monthly_report} />

            <div className="prose">
              <p>
                The monthly pivot table pattern is particularly useful for household 
                financial reviews. The key insight is filtering <code>getPayment() == True</code> 
                to exclude settlement transfers, which are not actual expenditures. 
                Without this filter, a £200 Venmo repayment from a flatmate inflates 
                your apparent spending by that amount.
              </p>
            </div>
          </div>

          {/* ── SECTION 8 ── */}
          <div id="s8">
            <div className="section-rule">
              <span className="section-num">08</span>
            </div>
            <h2 className="section-title">Rate Limits & Best Practices</h2>
            <div className="prose">
              <p>
                Splitwise's API does not publish formal rate limit documentation, but 
                community experience places the practical ceiling at approximately 
                60 requests per minute. Scripts that iterate over large expense 
                histories using per-expense <code>getExpense(id)</code> calls will 
                hit this limit quickly — always prefer bulk operations like 
                <code>getExpenses()</code> with filters over individual fetches.
              </p>
            </div>

            <CodeBlock lang="PYTHON" label="rate_limiter.py — decorator-based throttling" code={code_rate_limit} />

            <table className="compare-table">
              <thead>
                <tr>
                  <th>Anti-Pattern</th>
                  <th>Better Approach</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Loop getExpense(id) for each ID", "Use getExpenses() with offset pagination"],
                  ["Fetch all expenses then filter client-side", "Use dated_after / group_id server-side filters"],
                  ["Re-authenticate every API call", "Reuse Splitwise instance; tokens don't expire"],
                  ["Ignore deleted expenses", "Filter getDeletedAt() is None immediately"],
                  ["Use setSplitEqually(True) and also set shares", "Use one mechanism — setSplitEqually OR manual shares"],
                  ["Cast cost to int", "Always float(expense.getCost()) — cents matter"],
                ].map(([bad, good]) => (
                  <tr key={bad}>
                    <td><span className="cross">✘</span> {bad}</td>
                    <td><span className="check">✔</span> {good}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── SECTION 9 ── */}
          <div id="s9">
            <div className="section-rule">
              <span className="section-num">09</span>
            </div>
            <h2 className="section-title">Real-World Use Cases</h2>
            <div className="prose">
              <p>
                The following use cases represent the most common and highest-value 
                applications practitioners build on the Splitwise Python SDK. Each 
                maps a concrete problem to the specific SDK methods required.
              </p>
            </div>

            {[
              {
                title: "Monthly Personal Finance Dashboard",
                desc: "Aggregate your owed_share across all expenses in the past 30 days, pivot by category, and render a Matplotlib or Plotly chart. Combine with bank CSV exports to reconcile Splitwise obligations against actual spending.",
                methods: ["getExpenses(dated_after=…)", "ExpenseUser.getOwedShare()", "Expense.getCategory().getName()"],
              },
              {
                title: "Automated Group Settlement Reminder",
                desc: "Use getGroups() to list active groups, inspect originalDebts vs simplifiedDebts, and dispatch WhatsApp or Telegram messages summarising outstanding balances. Schedule with APScheduler or a cron job.",
                methods: ["getGroups()", "Group.getSimplifiedDebts()", "Debt.getFromUser()", "Debt.getAmount()"],
              },
              {
                title: "Receipt-to-Expense Pipeline",
                desc: "OCR a receipt with Pytesseract or GPT-4 Vision, extract items and amounts, map participants to user IDs, and call createExpense() with per-user owed shares. Used in projects like SplitwiseGPT Vision.",
                methods: ["createExpense()", "ExpenseUser.setOwedShare()", "Expense.setReceipt(path)"],
              },
              {
                title: "Group Fairness Auditor",
                desc: "Detect systematic imbalances — one flatmate always paying for groceries, another never logging utilities. Compare paid_share vs owed_share ratios over time across group members.",
                methods: ["getExpenses(group_id=…)", "ExpenseUser.getPaidShare()", "ExpenseUser.getNetBalance()"],
              },
              {
                title: "Incremental Data Sync to Database",
                desc: "Use updated_after for efficient incremental syncing to PostgreSQL or BigQuery. Capture edits and deletions. Build a personal financial data warehouse for long-term trend analysis.",
                methods: ["getExpenses(updated_after=last_sync)", "getDeletedAt()", "getUpdatedAt()"],
              },
            ].map(({ title, desc, methods }) => (
              <div key={title} style={{ marginBottom: 24 }}>
                <div className="subsection-title">{title}</div>
                <div className="prose"><p>{desc}</p></div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
                  {methods.map(m => <code key={m}>{m}</code>)}
                </div>
              </div>
            ))}
          </div>

          {/* ── SECTION 10 ── */}
          <div id="s10">
            <div className="section-rule">
              <span className="section-num">10</span>
            </div>
            <h2 className="section-title">API Reference Cheatsheet</h2>
            <div className="prose">
              <p>
                A quick-reference index of every primary SDK method. All methods are 
                called on a <code>Splitwise</code> instance (<code>sw</code>) after authentication.
              </p>
            </div>

            <table className="compare-table">
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Returns</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["sw.getCurrentUser()", "CurrentUser", "The authenticated user"],
                  ["sw.getUser(id)", "User", "Any user by ID"],
                  ["sw.updateUser(user)", "(CurrentUser, errors)", "Partial update"],
                  ["sw.getFriends()", "List[Friend]", "Includes balances per currency"],
                  ["sw.getGroups()", "List[Group]", "Members + debt summary"],
                  ["sw.getGroup(id)", "Group", "id=0 for non-group expenses"],
                  ["sw.createGroup(group)", "(Group, errors)", "Requires name + members"],
                  ["sw.deleteGroup(id)", "(bool, errors)", "Soft delete"],
                  ["sw.addUserToGroup(user, gid)", "(bool, User, errors)", "Add by id or email"],
                  ["sw.getExpenses(**kwargs)", "List[Expense]", "Max 100 per call; paginate"],
                  ["sw.getExpense(id)", "Expense", "Single expense by ID"],
                  ["sw.createExpense(expense)", "(Expense, errors)", "Requires cost + users"],
                  ["sw.updateExpense(expense)", "(Expense, errors)", "Partial — only changed fields"],
                  ["sw.deleteExpense(id)", "(bool, errors)", "Soft delete"],
                  ["sw.getCategories()", "List[Category]", "Parent + subcategories"],
                  ["sw.getCurrencies()", "List[Currency]", "All supported currencies"],
                  ["sw.getComments(id)", "List[Comment]", "Comments on an expense"],
                  ["sw.createComment(eid, txt)", "(Comment, errors)", "Add comment to expense"],
                  ["sw.getNotifications()", "List[Notification]", "Recent activity feed"],
                ].map(([method, ret, notes]) => (
                  <tr key={method}>
                    <td><code>{method}</code></td>
                    <td><code>{ret}</code></td>
                    <td style={{ fontSize: 12 }}>{notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="callout callout-teal">
              <div className="callout-label">Further Reading</div>
              Official Splitwise REST API docs: <code>https://dev.splitwise.com/</code><br />
              SDK source + examples: <code>https://github.com/namaggarwal/splitwise</code><br />
              Flask example app: <code>https://github.com/namaggarwal/flask-splitwise-example</code><br />
              SDK readthedocs: <code>https://splitwise.readthedocs.io/</code>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="article-footer">
          <div className="footer-inner">
            <div>
              <div className="footer-title">Source Integrity</div>
              All SDK method signatures verified against the <code>namaggarwal/splitwise</code> v3.0.0 
              README and source code. API behaviour descriptions derived from official 
              Splitwise REST API documentation at <code>dev.splitwise.com</code>.
              Rate limits are community-observed estimates, not official figures.
            </div>
            <div>
              <div className="footer-title">Versions</div>
              splitwise SDK: <strong style={{ color: "#ccc8c0" }}>3.0.0</strong> (June 2023)<br />
              Python: <strong style={{ color: "#ccc8c0" }}>3.7–3.11</strong>, PyPy compatible<br />
              Splitwise API: <strong style={{ color: "#ccc8c0" }}>v3.0</strong><br />
              Article generated: <strong style={{ color: "#ccc8c0" }}>April 2026</strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
