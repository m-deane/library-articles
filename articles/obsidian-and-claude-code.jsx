/* --- YAML frontmatter --- */
/*
title: "Obsidian and Claude Code"
subtitle: "Where thinking happens and where executing happens — and what lives on the seam between a note vault and an agent runtime."
category: "data-engineering"
style: "encyclopaedic"
date: "2026-04-24"
tags: [obsidian, claude-code, workflow, mcp, data-engineering]
*/

const ARTICLE_DATA = {
  title: "Obsidian and Claude Code",
  subtitle: "Where thinking happens and where executing happens — and what lives on the seam between a note vault and an agent runtime.",
  category: "data-engineering",
  style: "encyclopaedic",
  date: "2026-04-24",
  author: "Matthew Deane",
  tags: ["obsidian", "claude-code", "workflow", "mcp", "data-engineering"],
};

const C = {
  bg: "#0E1116",
  bgAlt: "#161B22",
  bgCard: "#1B2027",
  fg: "#E6EDF3",
  ink: "#E6EDF3",
  muted: "#8B949E",
  textMute: "#8B949E",
  textMuted: "#8B949E",
  accent: "#8B5CF6",
  accent2: "#38BDF8",
  grid: "#21262D",
  line: "#30363D",
  rule: "#30363D",
  panel: "#161B22",
  ok: "#34D399",
  warn: "#F59E0B",
  code: "#0B0E13",
  codeInk: "#D1D9E0",
};

const F = {
  serif: "'Newsreader', Georgia, serif",
  sans: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', monospace",
};

/* -------------------------- Local components -------------------------- */

const Sec = ({ n, title, children }) => (
  <div style={{ margin: "56px 0 0" }}>
    <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 20 }}>
      {n != null && (
        <span style={{ fontFamily: F.mono, fontSize: 13, color: C.accent, fontWeight: 700 }}>§{n}</span>
      )}
      <h2 style={{ fontFamily: F.serif, fontSize: 28, fontWeight: 700, color: C.ink, lineHeight: 1.2 }}>
        {title}
      </h2>
    </div>
    {children}
  </div>
);

const P = ({ children }) => (
  <p
    style={{ fontFamily: F.sans, fontSize: 16, lineHeight: 1.8, color: C.ink, margin: "0 0 18px" }}
    dangerouslySetInnerHTML={{ __html: children }}
  />
);

const DC = ({ children }) => (
  <p
    style={{
      fontFamily: F.sans,
      fontSize: 16.5,
      lineHeight: 1.8,
      color: C.ink,
      margin: "0 0 22px",
    }}
    dangerouslySetInnerHTML={{ __html: children }}
  />
);

const PQ = ({ children }) => (
  <blockquote
    style={{
      margin: "32px 0",
      padding: "16px 24px",
      borderLeft: `3px solid ${C.accent}`,
      background: C.bgAlt,
      fontFamily: F.serif,
      fontSize: 20,
      lineHeight: 1.5,
      fontStyle: "italic",
      color: C.ink,
    }}
    dangerouslySetInnerHTML={{ __html: children }}
  />
);

const Cap = ({ children }) => (
  <div style={{ fontFamily: F.sans, fontSize: 12, color: C.muted, marginTop: 8, marginBottom: 28 }}>
    {children}
  </div>
);

const IC = ({ caption }) => (
  <div
    style={{
      margin: "24px 0",
      padding: "40px 24px",
      background: C.bgAlt,
      border: `1px dashed ${C.line}`,
      borderRadius: 8,
      textAlign: "center",
      fontFamily: F.sans,
      fontSize: 13,
      color: C.muted,
    }}
  >
    {caption}
  </div>
);

const SB = ({ title, children }) => (
  <div
    style={{
      margin: "28px 0",
      padding: "20px 24px",
      background: C.bgAlt,
      border: `1px solid ${C.line}`,
      borderRadius: 8,
    }}
  >
    <div style={{ fontFamily: F.sans, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: C.accent, marginBottom: 10, fontWeight: 700 }}>
      {title}
    </div>
    <div style={{ fontFamily: F.sans, fontSize: 15, lineHeight: 1.7, color: C.ink }} dangerouslySetInnerHTML={{ __html: children }} />
  </div>
);

const Callout = ({ type = "info", title, children }) => {
  const styles = {
    info: { border: C.accent2, bg: "rgba(56,189,248,0.08)", ico: "i" },
    warn: { border: C.warn, bg: "rgba(245,158,11,0.08)", ico: "!" },
    tip: { border: C.ok, bg: "rgba(52,211,153,0.08)", ico: "+" },
  }[type];
  return (
    <div
      style={{
        margin: "28px 0",
        padding: "18px 22px",
        background: styles.bg,
        borderLeft: `3px solid ${styles.border}`,
        borderRadius: "0 8px 8px 0",
      }}
    >
      <div style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 700, color: styles.border, marginBottom: 6, letterSpacing: "0.04em" }}>
        [{styles.ico}] {title}
      </div>
      <div style={{ fontFamily: F.sans, fontSize: 14.5, lineHeight: 1.7, color: C.ink }} dangerouslySetInnerHTML={{ __html: children }} />
    </div>
  );
};

const NB = ({ title, n, children }) => (
  <div
    style={{
      margin: "24px 0",
      borderRadius: 8,
      overflow: "hidden",
      border: `1px solid ${C.line}`,
      borderLeft: `3px solid ${C.accent}`,
    }}
  >
    <div
      style={{
        background: C.bgAlt,
        padding: "8px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span style={{ fontFamily: F.mono, fontSize: 11, color: C.accent, letterSpacing: "0.05em" }}>{title}</span>
      {n != null && (
        <span
          style={{
            fontFamily: F.mono,
            fontSize: 10,
            color: C.accent,
            background: "rgba(139,92,246,0.15)",
            padding: "2px 8px",
            borderRadius: 4,
          }}
        >
          Cell {n}
        </span>
      )}
    </div>
    <pre
      style={{
        background: C.code,
        padding: "16px 20px",
        margin: 0,
        overflowX: "auto",
        fontSize: 12.5,
        lineHeight: 1.7,
        fontFamily: F.mono,
        color: C.codeInk,
      }}
    >
      <code>{children}</code>
    </pre>
  </div>
);

const Code = ({ title, children }) => (
  <div style={{ margin: "24px 0", borderRadius: 8, overflow: "hidden", border: `1px solid ${C.line}` }}>
    {title && (
      <div style={{ background: C.bgAlt, padding: "8px 16px", fontFamily: F.mono, fontSize: 11, color: C.muted, letterSpacing: "0.05em" }}>
        {title}
      </div>
    )}
    <pre
      style={{
        background: C.code,
        padding: "16px 20px",
        margin: 0,
        overflowX: "auto",
        fontSize: 12.5,
        lineHeight: 1.7,
        fontFamily: F.mono,
        color: C.codeInk,
      }}
    >
      <code>{children}</code>
    </pre>
  </div>
);

const Photograph = ({ src, alt, caption, credit, href }) => (
  <figure style={{ margin: "32px 0" }}>
    <img
      src={src}
      alt={alt}
      loading="lazy"
      style={{ width: "100%", height: "auto", borderRadius: 8, display: "block", border: `1px solid ${C.line}` }}
    />
    <figcaption style={{ fontFamily: F.sans, fontSize: 13, lineHeight: 1.6, color: C.muted, marginTop: 10 }}>
      {caption}
      {credit && (
        <span style={{ display: "block", marginTop: 4, fontSize: 11, color: C.muted, letterSpacing: "0.04em" }}>
          Photograph: {href ? <a href={href} style={{ color: C.accent2, textDecoration: "none" }}>{credit}</a> : credit}
        </span>
      )}
    </figcaption>
  </figure>
);

/* ------------- SVG: SystemDiagram (article-daemon flow) --------------- */

const SystemDiagram = () => (
  <svg viewBox="0 0 760 320" style={{ width: "100%", display: "block" }}>
    <rect width="760" height="320" fill={C.bgAlt} rx="8" stroke={C.line} strokeWidth="1" />
    <text x="380" y="26" textAnchor="middle" fill={C.ink} fontFamily={F.sans} fontSize="13" fontWeight="700">
      The article-daemon: vault note to HuggingFace Space
    </text>

    {/* Obsidian vault */}
    <g>
      <rect x="20" y="60" width="150" height="110" rx="6" fill={C.bg} stroke={C.accent} strokeWidth="1.5" />
      <text x="95" y="82" textAnchor="middle" fill={C.accent} fontFamily={F.sans} fontSize="11" fontWeight="700">Obsidian vault</text>
      <text x="95" y="101" textAnchor="middle" fill={C.muted} fontFamily={F.mono} fontSize="9">~/Documents/</text>
      <text x="95" y="114" textAnchor="middle" fill={C.muted} fontFamily={F.mono} fontSize="9">Obsidian Vault/</text>
      <rect x="35" y="124" width="120" height="36" rx="3" fill={C.bgCard} stroke={C.line} />
      <text x="95" y="139" textAnchor="middle" fill={C.ink} fontFamily={F.mono} fontSize="9">frontmatter:</text>
      <text x="95" y="152" textAnchor="middle" fill={C.ok} fontFamily={F.mono} fontSize="9">status: ready</text>
    </g>
    <text x="180" y="118" fill={C.accent} fontSize="18">→</text>

    {/* Launchd watcher */}
    <g>
      <rect x="210" y="60" width="150" height="110" rx="6" fill={C.bg} stroke={C.accent2} strokeWidth="1.5" />
      <text x="285" y="82" textAnchor="middle" fill={C.accent2} fontFamily={F.sans} fontSize="11" fontWeight="700">launchd daemon</text>
      <text x="285" y="100" textAnchor="middle" fill={C.muted} fontFamily={F.mono} fontSize="9">every 30 s</text>
      <text x="285" y="116" textAnchor="middle" fill={C.ink} fontFamily={F.mono} fontSize="9">daemon.py</text>
      <text x="285" y="132" textAnchor="middle" fill={C.muted} fontFamily={F.sans} fontSize="9.5">fcntl.flock →</text>
      <text x="285" y="146" textAnchor="middle" fill={C.muted} fontFamily={F.sans} fontSize="9.5">flip to generating</text>
      <text x="285" y="160" textAnchor="middle" fill={C.muted} fontFamily={F.sans} fontSize="9.5">(atomic claim)</text>
    </g>
    <text x="370" y="118" fill={C.accent} fontSize="18">→</text>

    {/* claude -p */}
    <g>
      <rect x="400" y="60" width="150" height="110" rx="6" fill={C.bg} stroke={C.accent} strokeWidth="1.5" />
      <text x="475" y="82" textAnchor="middle" fill={C.accent} fontFamily={F.sans} fontSize="11" fontWeight="700">claude -p subprocess</text>
      <text x="475" y="100" textAnchor="middle" fill={C.muted} fontFamily={F.mono} fontSize="9">--permission-mode</text>
      <text x="475" y="113" textAnchor="middle" fill={C.muted} fontFamily={F.mono} fontSize="9">acceptEdits</text>
      <text x="475" y="132" textAnchor="middle" fill={C.ink} fontFamily={F.mono} fontSize="9">/technical-ds-article</text>
      <text x="475" y="146" textAnchor="middle" fill={C.muted} fontFamily={F.sans} fontSize="9.5">timeout 1800 s</text>
      <text x="475" y="160" textAnchor="middle" fill={C.muted} fontFamily={F.sans} fontSize="9.5">max-budget $2</text>
    </g>
    <text x="560" y="118" fill={C.accent} fontSize="18">→</text>

    {/* JSX file */}
    <g>
      <rect x="590" y="60" width="150" height="110" rx="6" fill={C.bg} stroke={C.ok} strokeWidth="1.5" />
      <text x="665" y="82" textAnchor="middle" fill={C.ok} fontFamily={F.sans} fontSize="11" fontWeight="700">Write tool</text>
      <text x="665" y="100" textAnchor="middle" fill={C.muted} fontFamily={F.mono} fontSize="9">library-articles/</text>
      <text x="665" y="113" textAnchor="middle" fill={C.muted} fontFamily={F.mono} fontSize="9">articles/</text>
      <text x="665" y="128" textAnchor="middle" fill={C.ink} fontFamily={F.mono} fontSize="10">{"{slug}.jsx"}</text>
      <text x="665" y="150" textAnchor="middle" fill={C.muted} fontFamily={F.sans} fontSize="9.5">note flipped to</text>
      <text x="665" y="162" textAnchor="middle" fill={C.ok} fontFamily={F.sans} fontSize="9.5">generated</text>
    </g>

    {/* down arrow */}
    <path d="M 665 175 L 665 200" stroke={C.muted} strokeWidth="1.5" fill="none" />
    <path d="M 660 196 L 665 204 L 670 196 Z" fill={C.muted} />

    {/* ingest watcher */}
    <g>
      <rect x="400" y="205" width="340" height="48" rx="6" fill={C.bgCard} stroke={C.line} strokeWidth="1" />
      <text x="570" y="223" textAnchor="middle" fill={C.ink} fontFamily={F.sans} fontSize="11" fontWeight="700">Phase 2 launchd watcher (scripts/ingest.py)</text>
      <text x="570" y="240" textAnchor="middle" fill={C.muted} fontFamily={F.mono} fontSize="9">build.py → jsx_to_markdown.py → git commit → git push hf main</text>
    </g>

    {/* left-pointing arrow to HF */}
    <path d="M 400 229 L 300 229" stroke={C.muted} strokeWidth="1.5" fill="none" />
    <path d="M 305 224 L 297 229 L 305 234 Z" fill={C.muted} />

    {/* HF space */}
    <g>
      <rect x="130" y="205" width="160" height="48" rx="6" fill={C.bg} stroke={C.accent2} strokeWidth="1.5" />
      <text x="210" y="223" textAnchor="middle" fill={C.accent2} fontFamily={F.sans} fontSize="11" fontWeight="700">HuggingFace Space</text>
      <text x="210" y="240" textAnchor="middle" fill={C.muted} fontFamily={F.mono} fontSize="9">helwyr55/library-articles</text>
    </g>

    {/* state pill */}
    <rect x="20" y="275" width="720" height="30" rx="4" fill={C.bgCard} stroke={C.line} />
    <text x="380" y="294" textAnchor="middle" fill={C.muted} fontFamily={F.mono} fontSize="10">
      state: idea → draft → ready → generating → generated → published · the ready→generating hop is atomic (flock)
    </text>
  </svg>
);

/* -------------- SVG: UseCaseMatrix (10 cases x 3 columns) ------------- */

const UseCaseMatrix = () => {
  const rows = [
    { n: 1, name: "Article-generation daemon", weight: [1, 3, 2] },
    { n: 2, name: "Research reading → prose", weight: [3, 2, 1] },
    { n: 3, name: "Dataset documentation", weight: [2, 3, 2] },
    { n: 4, name: "Plan-first implementation", weight: [2, 2, 3] },
    { n: 5, name: "Daily briefing agent", weight: [1, 2, 3] },
    { n: 6, name: "Skill authoring loop", weight: [2, 3, 2] },
    { n: 7, name: "Meeting notes → issues", weight: [2, 3, 2] },
    { n: 8, name: "Spaced repetition log", weight: [3, 2, 1] },
    { n: 9, name: "Memory synchronisation", weight: [2, 3, 2] },
    { n: 10, name: "MCP servers over vault", weight: [1, 3, 3] },
  ];
  const rowH = 28;
  const top = 64;
  return (
    <svg viewBox={`0 0 760 ${top + rows.length * rowH + 24}`} style={{ width: "100%", display: "block" }}>
      <rect width="760" height={top + rows.length * rowH + 24} fill={C.bgAlt} rx="8" stroke={C.line} />
      <text x="16" y="24" fill={C.ink} fontFamily={F.sans} fontSize="13" fontWeight="700">
        Where each use case places its weight
      </text>
      <text x="16" y="42" fill={C.muted} fontFamily={F.sans} fontSize="11">
        Dot size = relative emphasis (1 = light touch, 3 = centre of gravity)
      </text>
      {/* column headers */}
      {[
        { x: 380, label: "Obsidian-weighted" },
        { x: 520, label: "Seam" },
        { x: 660, label: "Claude-Code-weighted" },
      ].map((c, i) => (
        <text key={i} x={c.x} y={60} textAnchor="middle" fill={C.accent} fontFamily={F.mono} fontSize="10" fontWeight="700">
          {c.label}
        </text>
      ))}
      {rows.map((r, i) => {
        const y = top + i * rowH;
        return (
          <g key={r.n}>
            <text x={16} y={y + 14} fill={C.muted} fontFamily={F.mono} fontSize="10">{`${r.n}.`}</text>
            <text x={40} y={y + 14} fill={C.ink} fontFamily={F.sans} fontSize="12">{r.name}</text>
            <line x1="280" y1={y + 18} x2="740" y2={y + 18} stroke={C.grid} strokeWidth="0.5" />
            {r.weight.map((w, j) => {
              const cx = [380, 520, 660][j];
              const rr = 3 + w * 2.5;
              const color = w === 3 ? C.accent : w === 2 ? C.accent2 : C.muted;
              return <circle key={j} cx={cx} cy={y + 14} r={rr} fill={color} opacity={0.85} />;
            })}
          </g>
        );
      })}
    </svg>
  );
};

/* --------------------------- Main component --------------------------- */

export default function ObsidianAndClaudeCode() {
  return (
    <article style={{ background: C.bg, minHeight: "100vh", color: C.ink }}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0}body{background:${C.bg}}a{color:${C.accent2}}`}</style>

      {/* header strip */}
      <div
        style={{
          background: "linear-gradient(90deg, rgba(139,92,246,0.18), rgba(56,189,248,0.10))",
          borderBottom: `1px solid ${C.line}`,
          padding: "14px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span style={{ fontFamily: F.mono, fontSize: 11, color: C.accent, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Encyclopaedic · Data Engineering
        </span>
        <span style={{ fontFamily: F.mono, fontSize: 11, color: C.muted }}>
          Obsidian · Claude Code · Hooks · Skills · MCP
        </span>
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "60px 24px 0" }}>
        <div style={{ fontFamily: F.mono, fontSize: 12, color: C.accent, fontWeight: 600, letterSpacing: "0.08em", marginBottom: 12 }}>
          RESEARCH-AND-SHIP LOOP
        </div>
        <h1
          style={{
            fontFamily: F.serif,
            fontSize: "clamp(28px, 4.5vw, 44px)",
            fontWeight: 700,
            color: C.ink,
            lineHeight: 1.15,
            marginBottom: 20,
          }}
        >
          Obsidian and Claude Code
        </h1>
        <p style={{ fontFamily: F.sans, fontSize: 18, color: C.muted, lineHeight: 1.6, maxWidth: 700, marginBottom: 14 }}>
          Where thinking happens and where executing happens — and what lives on the seam between a note vault and an agent runtime.
        </p>
        <div style={{ fontFamily: F.sans, fontSize: 13, color: C.muted, marginBottom: 40 }}>
          Claude Code hooks + Skills + MCP · Obsidian 1.5+ · A ten-part walk-through of a single practitioner's loop
        </div>
        <div style={{ height: 1, background: C.line, marginBottom: 28 }} />
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px 80px" }}>
        <DC>{`A data scientist's working day has two rhythms. One is <em>slow</em>: reading a paper, sketching a design, copying a Postgres schema into a note and scribbling why three of the columns are a mistake. The other is <em>fast</em>: running a script, patching a failing test, shipping a fix before coffee gets cold. The slow rhythm wants a place that rewards linking and revisiting — a vault. The fast rhythm wants a place that executes instructions and writes to disk — an agent.`}</DC>
        <P>{`<strong>Obsidian</strong> is the vault half. A local folder of Markdown files, plus a graph of wikilinks, plus a large plugin ecosystem for querying and transforming those files. <strong>Claude Code</strong> is the agent half — Anthropic's CLI and web sandbox for Claude with first-class Read, Write, Bash, and MCP tool surfaces. Each is interesting on its own. The surface <em>between</em> them is more interesting still.`}</P>
        <P>{`This article is an encyclopaedic tour of that seam. Ten concrete use cases, each a pattern you can copy. Every plugin name, hook event, and library call is traceable to either a web source or a file in the live workspace I work in — which happens to be a working example of the pattern: an article-generation daemon that watches an Obsidian vault for <code>status: ready</code> notes and hands them to <code>claude -p</code>. You are reading its output. The Source Integrity Note at the end lists every URL consulted and every composite reconstruction flagged.`}</P>

        <SystemDiagram />
        <Cap>The workspace this article was generated by. The article-daemon hops notes through a state machine, spawns <code>claude -p</code>, and lets a separate Phase 2 watcher handle publishing. The ready→generating hop is atomic (<code>fcntl.flock</code>), so two scans in flight cannot double-process the same note.</Cap>

        <PQ>{`Obsidian is where thinking happens. Claude Code is where executing happens. The interesting surface is the seam.`}</PQ>

        <Photograph
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80"
          alt="Developer workspace with multiple monitors showing code editor and notes"
          caption="The two-rhythm desk: a pane of Markdown on the left for thinking, a terminal on the right for shipping. Most of the interesting plumbing lives in the empty space between them."
          credit="Carlos Muza / Unsplash"
          href="https://unsplash.com/photos/laptop-computer-on-glass-top-table-hpjSkU2UYSU?utm_source=dsl&utm_medium=referral"
        />

        <Sec n="1" title="The article-generation daemon">
          <P>{`The pattern begins with the narrowest possible seam: a file watcher. In the live workspace, a launchd-driven Python process scans an Obsidian vault every 30 seconds looking for notes whose YAML frontmatter contains <code>status: ready</code>. When it finds one, it atomically flips <code>ready</code> to <code>generating</code> using an advisory file lock, extracts <code>article-skill</code> and <code>article-mode</code> from the frontmatter, resolves <code>[[wikilinks]]</code> and <code>![[embeds]]</code>, composes a prompt, and spawns <code>claude -p</code> with the appropriate slash-command. The generator skill writes a JSX file and the daemon records the outcome.`}</P>
          <P>{`The atomicity matters. A naive implementation races: two scans, both see <code>ready</code>, both spawn Claude. The live daemon uses <code>fcntl.flock(LOCK_EX)</code> on the note file itself and re-reads the status after acquiring the lock; if the re-read doesn't say <code>ready</code>, the scan abandons the claim. A unit test in the workspace (<code>tests/test_state_machine.py</code>) exercises three invariants: that a <code>ready</code> note flips to <code>generated</code> on success, that a failing CLI invocation flips it to <code>failed</code> with the first 500 characters of stderr captured in an <code>error-log</code> frontmatter key, and that a non-<code>ready</code> note is left untouched. No real CLI is spawned in the test — <code>run_claude</code> is monkeypatched.`}</P>
          <NB title="daemon.py (extract)" n={1}>{`# Injection point for tests: monkeypatch run_claude to avoid the real CLI.
def run_claude(prompt: str) -> subprocess.CompletedProcess:
    cmd = [
        CLAUDE_BIN, "-p",
        "--permission-mode", "acceptEdits",
        "--add-dir", str(LIBRARY_ROOT),
        "--add-dir", str(LIBRARY_ARTICLES_ROOT),
        "--output-format", "json",
        "--max-budget-usd", str(MAX_BUDGET_USD),
        prompt,
    ]
    return subprocess.run(cmd, timeout=CLAUDE_TIMEOUT,
                          capture_output=True, text=True, check=False)`}</NB>
          <P>{`The anti-pattern to avoid: using the daemon as a place to also commit and push. Keep it dumb. Generation writes a file; a separate watcher on the output directory picks the file up and publishes. Two processes with one responsibility each is easier to reason about than one daemon with two. In the live workspace, the article-daemon and the Phase 2 ingest watcher are genuinely independent — the daemon can crash mid-run and the publishing pipeline still moves forward on whatever JSX already exists.`}</P>
        </Sec>

        <Sec n="2" title="Research reading → structured prose">
          <P>{`A vault is a natural place to collect reading. A PDF opens, the Annotator plugin extracts highlights, and the highlights land as a child note. Over weeks you accumulate eight or ten of these, plus a hand-written overview note. When you want a literature-review draft, the seam is simple: point Claude Code at the folder, describe the frame, ask for a synthesis.`}</P>
          <P>{`The content here is prose, not runnable code. Claude Code's Read tool walks the folder, and its long-context window lets it hold the source material and the draft in memory simultaneously. You discipline the output with a CLAUDE.md at the root of the folder — a few hundred words describing voice, citation style, and the Three-Tier evidence rule that everything cited must trace to a verifiable source. CLAUDE.md files combine hierarchically from user scope (<code>~/.claude/CLAUDE.md</code>) down through project root and subdirectory, with more specific levels overriding on conflicts.`}</P>
          <Code title="shell">{`$ cd ~/Documents/Obsidian\\ Vault/Reading/Diffusion\\ Models/
$ claude -p "Read every note in this folder. Write a 1,500-word \\
literature-review draft that frames diffusion as score matching. \\
Cite with [[wikilinks]] to the notes you used. Save to _draft.md."`}</Code>
          <P>{`The failure mode is credulity. Claude will happily synthesise a confident-sounding paragraph that is factually slightly wrong, because the source notes themselves contained a misreading you never corrected. The mitigation is the same as for any technical writing: every claim must cite a note; every note you rely on you must reread. The Obsidian graph view helps — when Claude cites notes you haven't opened in three months, that is a prompt to reread them before trusting the synthesis.`}</P>
        </Sec>

        <Sec n="3" title="Dataset documentation">
          <P>{`Datasets rot in documentation faster than in storage. A README says "120 million rows, 42 features" on the day it is written; six months later the truth is 180 million and 49. The Dataview plugin and a scheduled Claude Code hook together can keep documentation fresh without anyone writing prose.`}</P>
          <P>{`Dataview transforms an Obsidian vault into a queryable database. You write a code block with a DQL query or a DataviewJS block that runs JavaScript against the index; the plugin renders the output inline. Dataview's DataviewJS blocks have the same level of access as any other Obsidian plugin — they can read files, make network calls, and mutate the vault — so you use them sparingly, but for read-only summaries over the vault itself they are excellent. A dataset note can carry a Dataview block that lists every child notebook tagged <code>#uses-this-dataset</code>, so the README always answers "who depends on this?" without manual maintenance.`}</P>
          <Code title="dataview block in a dataset README">{`\`\`\`dataview
TABLE file.mtime as "Last edited", status
FROM "Notebooks"
WHERE contains(datasets, [[trades-2026]])
SORT file.mtime DESC
\`\`\``}</Code>
          <P>{`The Claude Code side of the seam is a scheduled subagent: every Monday morning, a cron job invokes <code>claude -p "/refresh-dataset-stats trades-2026"</code>. The skill reads the Parquet file, updates the row-count and schema block in the dataset's Markdown README, and records the delta in a changelog section. The anti-pattern is letting Claude generate the Dataview query itself at every run — the query should be hand-written and stable, because Dataview queries that mutate their own surrounding note produce confusing diffs. Let Claude update numbers, not code.`}</P>
        </Sec>

        <Photograph
          src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1600&q=80"
          alt="Developer terminal window showing a file watcher log streaming green timestamps"
          caption="A file-watcher log is the quietest piece of infrastructure you can own. Lines only appear when something changes, and the daemon cost is a few milliseconds of directory stat per tick."
          credit="Markus Spiske / Unsplash"
          href="https://unsplash.com/photos/monitor-showing-java-programming-iar-afB0QQw?utm_source=dsl&utm_medium=referral"
        />

        <Sec n="4" title="Plan-first implementation">
          <P>{`For anything larger than a one-file change, write the plan before the code. Obsidian is an unusually good place to draft a plan — wikilinks let you reference the existing files you will touch, Dataview can pull in the list of tests that currently exist for the module, and the graph view gives you a cheap check that you have thought about the dependencies.`}</P>
          <P>{`Claude Code exposes two mechanisms that consume such a plan: the user-authored <code>CLAUDE.md</code> memory hierarchy and the Claude Agent SDK's subagent pattern. The SDK lets an orchestrator spawn subagents in isolated context windows, each with their own allowed-tools list, and collect their results — the pattern Anthropic documents for parallelising independent tasks. For a plan with three independent steps (add an endpoint, extend the schema, write the tests) you can hand each step to a subagent.`}</P>
          <Code title="plan.md in the vault, referenced by a CLAUDE.md import">{`# Plan: add /health endpoint

- [ ] Read [[server/app.py]] and identify the route decorator style
- [ ] Add GET /health returning {"ok": true, "commit": <sha>}
- [ ] Extend [[tests/test_server.py]] with a /health test
- [ ] Update [[README]] "Endpoints" section

Acceptance: tests pass; README shows /health; curl localhost/health returns 200.`}</Code>
          <P>{`The seam is an import. <code>CLAUDE.md</code> supports an <code>@path/to/file</code> import syntax that pulls another file into the memory context, so the vault plan note can be referenced from the repo's <code>CLAUDE.md</code> during the session. The anti-pattern is writing the plan and the code in the same pass — the plan becomes self-justifying, and the first time a subagent's proposal surprises you, you cannot tell whether the plan or the code drifted. Separate the two.`}</P>
        </Sec>

        <Sec n="5" title="Daily briefing agent">
          <P>{`At 07:00 a small scheduled agent writes a note into the vault at <code>Daily/2026-04-24.md</code>. Three sections: what git landed yesterday across the repos you care about, what GitHub PRs are waiting on your review, what the most recent experiment's metric moved to. You open Obsidian with your coffee and the note is already there.`}</P>
          <P>{`The implementation has no clever parts. <code>launchctl</code> on macOS or cron on Linux runs <code>claude -p "/morning-briefing"</code> at the schedule. The skill is a single markdown file in <code>~/.claude/skills/morning-briefing/</code> whose body instructs Claude to run <code>git log --since=yesterday</code> across a known list of repos, query <code>gh pr list --search "review-requested:@me"</code>, and read the latest row of a metrics CSV. It writes the result to the vault using the Write tool.`}</P>
          <Code title="launchd plist fragment">{`<key>StartCalendarInterval</key>
<dict>
  <key>Hour</key><integer>7</integer>
  <key>Minute</key><integer>0</integer>
</dict>
<key>ProgramArguments</key>
<array>
  <string>/Users/you/.local/bin/claude</string>
  <string>-p</string>
  <string>/morning-briefing</string>
</array>`}</Code>
          <P>{`Two anti-patterns. First, letting the agent phone the internet at 07:00 sharp against rate-limited APIs will sometimes fail silently — always write a minimal placeholder note even when a data fetch fails, so the missing section in the morning note is visible rather than invisible. Second, do not let the agent compute anything expensive in this loop. The morning briefing is a <em>readout</em> of state you already have, not a computation. Expensive jobs belong in their own scheduled skills with their own budgets.`}</P>
        </Sec>

        <Sec n="6" title="Skill authoring loop">
          <P>{`A Claude Code skill is a small file: YAML frontmatter with a <code>name</code> and a <code>description</code>, followed by Markdown body instructions. The description is load-bearing — Claude uses it to decide whether to invoke the skill in response to a user prompt. "Only <code>description</code> is recommended so Claude knows when to use the skill," per the official docs. A skill that writes a dataset changelog might have a description like <em>"Use when the user asks to summarise dataset changes, regenerate a CHANGELOG, or refresh dataset README stats."</em>`}</P>
          <P>{`The authoring loop is short. Open Obsidian, draft the skill body as a normal note, iterate on the description until it captures the trigger conditions you want. Save the file to <code>~/.claude/skills/&lt;name&gt;/SKILL.md</code>. The official Anthropic skills repo and the plugin-dev skill both recommend targeting 1,500–2,000 words in the body, moving detail into a <code>references/</code> folder, and testing whether Claude picks the skill up under the triggers you expect.`}</P>
          <P>{`In this workspace, skills live at <code>~/.claude/skills/</code> and are mirrored into each library repo at <code>.claude/skills/</code>. The mirror matters because Claude Code for web — the claude.ai/code sandbox — only reads repository-committed configuration; a user-scope skill is invisible to the web sandbox. The workspace ships a <code>.claude/sync-skills.sh</code> script that copies user-scope skills into the repo mirror. The anti-pattern is editing the mirror instead of the source and letting them drift. Always edit <code>~/.claude/skills/</code>, then sync; the workspace <code>CLAUDE.md</code> documents this contract explicitly.`}</P>
          <Code title="SKILL.md frontmatter shape">{`---
name: dataset-changelog
description: Use when the user asks to summarise dataset changes,
  regenerate a CHANGELOG, or refresh dataset README stats.
---

# Dataset Changelog

Read the dataset's Parquet file at \`datasets/<slug>.parquet\`
and write a CHANGELOG row...`}</Code>
        </Sec>

        <Sec n="7" title="Meeting notes → action items">
          <P>{`Meeting notes are a natural Obsidian habit — today's note contains both the narrative of the call and a scatter of <code>- [ ]</code> task checkboxes. The seam pushes those checkboxes into your issue tracker as soon as the call ends. Claude Code's hook system is the right primitive: the <code>Stop</code> hook fires when Claude finishes responding, and its stdout is available for a follow-up shell action.`}</P>
          <P>{`Claude Code documents twelve lifecycle hook events: <code>PreToolUse</code>, <code>PostToolUse</code>, <code>Stop</code>, <code>SubagentStop</code>, <code>SessionStart</code>, <code>SessionEnd</code>, <code>UserPromptSubmit</code>, <code>PreCompact</code>, <code>Notification</code>, and a few more. Hooks are configured in JSON settings files with three levels of nesting — an event, a matcher group, and one or more handlers. A handler is typically a shell command; it receives the event payload on stdin and signals outcome via exit code (0 = success, 2 = blocking error fed back to Claude as stderr text).`}</P>
          <Code title="~/.claude/settings.json fragment">{`{
  "hooks": {
    "Stop": [
      {
        "matcher": {"any": true},
        "hooks": [
          {
            "type": "command",
            "command": "python3 ~/.claude/hooks/file_tasks_as_issues.py"
          }
        ]
      }
    ]
  }
}`}</Code>
          <P>{`The handler parses today's meeting note out of the vault, finds every unchecked <code>- [ ]</code> line, and calls <code>gh issue create --title ...</code> per task. A small idempotency guard — append the issue number back into the note as <code>- [ ] (gh#123) task</code> — prevents duplicate issues on reruns. The anti-pattern is using <code>PreToolUse</code> for this; <code>PreToolUse</code> runs before every tool call and is the wrong place for heavy work. Use <code>Stop</code> or <code>SubagentStop</code> for once-per-turn side effects, and keep per-tool hooks cheap.`}</P>
        </Sec>

        <Sec n="8" title="Learning log with spaced repetition">
          <P>{`Each technical concept you learn becomes a note: a title, one screen of explanation, a worked example, and a <code>next-review: 2026-05-01</code> frontmatter field. A daily Claude Code agent queries the vault for notes whose review date is today or overdue, picks three, and writes a short quiz into <code>Daily/2026-04-24.md</code>. You answer on paper or in-note, and a <code>PostToolUse</code> hook on the Write tool rolls the review dates forward using a simple SM-2-lite schedule (right → next interval × 2, wrong → back to 1 day).`}</P>
          <P>{`Dataview does the querying. A DataviewJS block can return an array of note paths sorted by <code>next-review</code>; the agent reads the block's rendered output or, equivalently, calls Dataview's JavaScript API directly through the Obsidian Local REST API plugin exposed to an MCP server (see §10). The anti-pattern is trying to do spaced repetition entirely inside the vault with no Claude loop at all — Anki already exists, and better. The value of the Claude loop is that it <em>writes</em> — it constructs a new quiz note each morning that contains the questions plus the source links, so answering the quiz is also rereading. The note is the artefact, not the schedule.`}</P>
          <Code title="frontmatter on a concept note">{`---
concept: backprop-through-time
created: 2026-04-10
next-review: 2026-04-25
interval-days: 3
streak: 2
---`}</Code>
        </Sec>

        <Photograph
          src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1600&q=80"
          alt="A person reading a technical book with a notebook and pen on the desk"
          caption="The slow rhythm. A spaced-repetition loop rewards exactly the kind of reading the vault is already for — one concept, one page, one review cycle at a time."
          credit="Patrick Tomasso / Unsplash"
          href="https://unsplash.com/photos/person-reading-book-fMntI8HAAB8?utm_source=dsl&utm_medium=referral"
        />

        <Sec n="9" title="Memory synchronisation">
          <P>{`Claude Code has a four-tier memory hierarchy: <code>~/.claude/CLAUDE.md</code> at user scope, <code>&lt;repo&gt;/CLAUDE.md</code> at project root, <code>&lt;repo&gt;/&lt;subdir&gt;/CLAUDE.md</code> at subdirectory scope, and <code>&lt;repo&gt;/CLAUDE.local.md</code> for personal gitignored overrides. All four combine on session start; more specific levels override on conflicts. The official guidance is to target under 200 lines per file and to use the <code>@path/to/file</code> import syntax to keep the main memory lean while loading detail on demand.`}</P>
          <P>{`Obsidian's vault is a parallel memory system — different shape, different retrieval mechanism (graph + search), different retention (forever). The seam question is: when a fact exists in both places, which one wins? The rule that has held up here: <em>the vault is the source of truth for things the human reads; <code>CLAUDE.md</code> is the source of truth for things the agent reads.</em> A description of the article pipeline belongs in the workspace <code>CLAUDE.md</code> because Claude needs it to operate correctly; the same description paraphrased for a reader belongs in an <code>AUTOMATION.md</code> next to it. They restate the same truth in different registers.`}</P>
          <P>{`The anti-pattern is duplicating facts. A fact written twice drifts; a fact written once and imported is stable. When a file exists in both the vault and the repo, use an import: in this workspace, project-specific CLAUDE.md files at each of the four subfolders (<code>library/</code>, <code>library-articles/</code>, <code>article-daemon/</code>) are the real source, and the parent workspace <code>CLAUDE.md</code> summarises the pipeline without restating it. If a subfolder's contract changes, one file moves.`}</P>
          <SB title="Rule of thumb">{`The vault is write-mostly for humans. <code>CLAUDE.md</code> is read-mostly for agents. When a sentence belongs in both, write it once and link.`}</SB>
        </Sec>

        <Sec n="10" title="MCP servers over the vault">
          <P>{`The Model Context Protocol is an open standard for client-server communication between AI applications and external tools, introduced by Anthropic in late 2024 and now governed under the Linux Foundation's Agentic AI Foundation. It uses JSON-RPC 2.0 as its wire format and supports two transports: stdio for same-machine connections and Streamable HTTP (plus SSE) for remote clients. Claude Code is an MCP client; the clean way to expose an Obsidian vault to Claude is to run an MCP server that speaks the protocol on behalf of the vault.`}</P>
          <P>{`Several published implementations exist in the <em>awesome-mcp-servers</em> ecosystem. The two most widely referenced are <code>MarkusPfundstein/mcp-obsidian</code> and <code>cyanheads/obsidian-mcp-server</code>, both of which bridge to the Obsidian Local REST API community plugin. They expose tools like <code>list_files_in_vault</code>, <code>get_file_contents</code>, <code>search</code>, <code>patch_content</code>, <code>append_content</code>, and <code>delete_file</code>. Prerequisites: install the Obsidian Local REST API plugin, enable it in the vault settings, copy the API key into the MCP server's config. Claude Code connects and can now read and write the vault.`}</P>
          <P>{`Once the server is running, a Claude Code session can ask the vault natural questions: "find every note tagged #paper-to-read and not yet linked from the reading log." The protocol is the point — the same server pattern also works from Cursor, Claude Desktop, or any MCP-capable client. The published servers use permissive scoping, so read the source before pointing one at a vault that contains anything private.`}</P>
          <Callout type="warn" title="Reference implementation — not a published package">
            {`The minimal sketch below is for exposition only. It is not a published package; treat it as pseudocode for what the published <code>mcp-obsidian</code> and <code>obsidian-mcp-server</code> repositories do for real. In production, use one of those maintained servers rather than rolling your own.`}
          </Callout>
          <Code title="sketch — not production code">{`# A minimum-viable MCP server stub: list and read notes.
# For real use, install MarkusPfundstein/mcp-obsidian or
# cyanheads/obsidian-mcp-server, which wrap the Local REST API plugin.
from pathlib import Path
from mcp.server import Server

VAULT = Path.home() / "Documents/Obsidian Vault"
app = Server("obsidian-vault-reference")

@app.tool()
def list_notes() -> list[str]:
    return [str(p.relative_to(VAULT)) for p in VAULT.rglob("*.md")]

@app.tool()
def read_note(path: str) -> str:
    return (VAULT / path).read_text(encoding="utf-8")`}</Code>
          <P>{`The anti-pattern is exposing <code>delete_file</code> without a consent UI. Write tools that mutate the vault should require an explicit confirmation step, either in the server or in the client; a model that halluciates a path is a model that can delete a day of reading notes. The maintained servers handle this carefully — follow their lead.`}</P>
        </Sec>

        <Sec n="">
          <UseCaseMatrix />
          <Cap>The ten cases plotted by where their weight falls. The seam column fills up fastest: most of the valuable work is neither pure note-taking nor pure code execution, but the plumbing between them.</Cap>
        </Sec>

        <Sec title="Coda — and the tools that did not make the cut">
          <P>{`Three Obsidian plugins are worth naming even though they did not earn their own use case above. <strong>Smart Connections</strong> (Brian Petro) builds local embeddings over the vault and surfaces semantically related notes — its zero-configuration local model means vault content never leaves the machine. <strong>Templater</strong> (SilentVoid13) executes JavaScript at note-creation time and loads user scripts from a designated <code>Scripts/</code> folder; the daemon's <code>article-note</code> template uses it. <strong>Obsidian Git</strong> (Vinzent03) handles automatic commits and pushes, which is how the vault ends up on a remote without anyone thinking about it. All three are safe to combine.`}</P>
          <P>{`The pattern, summarised: Obsidian rewards the slow rhythm; Claude Code rewards the fast rhythm; the seam is the interesting surface. Every use case above is a small piece of glue — a file watcher, a hook, a skill, an MCP server. None of them are clever on their own. Their value compounds because they all read and write the same two systems, and because the state machine that connects them is small enough to fit in a 30-second daemon tick.`}</P>
          <PQ>{`A vault rewards revisiting; an agent rewards executing. Everything useful sits between them.`}</PQ>
        </Sec>

        <Sec title="Source Integrity Note">
          <P>{`This article follows the Three-Tier evidence rule. Tier 1 claims are verified against a web source or a file in the live workspace. Tier 2 claims are composites — generalisations of one concrete implementation into a described pattern — and are flagged below. Tier 3 (invented) is prohibited.`}</P>
          <SB title="Web sources consulted">{`<ul>
  <li>Claude Code hooks reference — <code>https://code.claude.com/docs/en/hooks</code> (events, exit codes, JSON config)</li>
  <li>Claude Code skills — <code>https://code.claude.com/docs/en/skills</code> and <code>platform.claude.com/docs/en/agents-and-tools/agent-skills/overview</code> (frontmatter, description-as-trigger)</li>
  <li>Anthropic skills repo — <code>github.com/anthropics/skills</code></li>
  <li>Claude Code memory — <code>https://code.claude.com/docs/en/memory</code> (CLAUDE.md hierarchy, @imports, ~200-line guidance)</li>
  <li>Claude Agent SDK — <code>github.com/anthropics/claude-agent-sdk-python</code>, <code>code.claude.com/docs/en/agent-sdk/overview</code> (subagents, allowedTools)</li>
  <li>Model Context Protocol spec — <code>https://modelcontextprotocol.io/specification/2025-11-25</code> (JSON-RPC 2.0, stdio + Streamable HTTP transports)</li>
  <li><code>MarkusPfundstein/mcp-obsidian</code>, <code>cyanheads/obsidian-mcp-server</code> (Obsidian Local REST API bridge MCP servers)</li>
  <li>Obsidian Local REST API plugin — <code>github.com/coddingtonbear/obsidian-local-rest-api</code></li>
  <li>Dataview — <code>blacksmithgu.github.io/obsidian-dataview</code> (DQL, DataviewJS, plugin-level access warning)</li>
  <li>Templater — <code>silentvoid13.github.io/Templater</code> (user scripts, <code>tp</code> object)</li>
  <li>Smart Connections — <code>github.com/brianpetro/obsidian-smart-connections</code> (local-first embeddings)</li>
  <li>Obsidian Git — <code>github.com/Vinzent03/obsidian-git</code> (automatic commit-and-sync)</li>
</ul>`}</SB>
          <SB title="Workspace files read">{`<ul>
  <li><code>____p-library/CLAUDE.md</code> — pipeline conventions, skill-mirror rule</li>
  <li><code>____p-library/AUTOMATION.md</code> — three-workflow operator guide</li>
  <li><code>____p-library/article-daemon/daemon.py</code> — live daemon source (<code>run_claude</code>, <code>_claim_note</code>, <code>process_note</code>, <code>run_once</code>)</li>
  <li><code>____p-library/article-daemon/README.md</code> — state machine, frontmatter schema, logs</li>
  <li><code>____p-library/article-daemon/tests/test_state_machine.py</code> — three invariants the daemon guarantees</li>
  <li><code>____p-library/library-articles/.claude/CLAUDE.md</code> — library-articles project context (vendored runtime, PWA layer)</li>
  <li><code>____p-library/library-articles/.claude/skills/shared-article-jsx-reference.md</code> — JSX component contract</li>
  <li><code>~/.claude/skills/</code> — structure of live skill files</li>
</ul>`}</SB>
          <SB title="Tier-2 composites flagged">{`<ul>
  <li>§3 "Dataset documentation" — the scheduled Claude hook that refreshes row counts is described as a pattern; the live workspace has a related ingest watcher but not this exact cron job.</li>
  <li>§5 "Daily briefing agent" — a reference implementation pattern. The live workspace runs launchd-driven agents (see <code>AUTOMATION.md</code>) but the 07:00 morning-briefing agent described here is illustrative.</li>
  <li>§7 "Meeting notes → action items" — the <code>Stop</code>-hook-to-<code>gh issue create</code> flow is constructed from Claude Code's documented hook system; the specific handler is a reference implementation, not a published package.</li>
  <li>§8 "Spaced repetition" — the SM-2-lite loop is described as a pattern; no shipping implementation in this workspace yet.</li>
</ul>`}</SB>
          <SB title="Reference implementations (not published packages)">{`<ul>
  <li>§10's MCP server code block labelled "sketch — not production code". For production, use <code>MarkusPfundstein/mcp-obsidian</code> or <code>cyanheads/obsidian-mcp-server</code>.</li>
  <li>§5 launchd plist fragment and §7 hook handler JSON — illustrative; adapt paths and environment to match your own machine before running.</li>
</ul>`}</SB>
        </Sec>
      </div>
    </article>
  );
}
