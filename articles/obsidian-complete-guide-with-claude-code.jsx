/* --- YAML frontmatter --- */
/*
title: "Obsidian, Feature by Feature, with Claude Code"
subtitle: "A reference book for every major Obsidian surface — vault, properties, links, plugins, sync, MCP — and how each one wires into a Claude Code agent on the same disk."
category: "data-engineering"
style: "encyclopaedic"
date: "2026-04-24"
tags: [obsidian, claude-code, reference, mcp, workflow]
*/

const ARTICLE_DATA = {
  title: "Obsidian, Feature by Feature, with Claude Code",
  subtitle: "A reference book for every major Obsidian surface — vault, properties, links, plugins, sync, MCP — and how each one wires into a Claude Code agent on the same disk.",
  category: "data-engineering",
  style: "encyclopaedic",
  date: "2026-04-24",
  author: "Matthew Deane",
  tags: ["obsidian", "claude-code", "reference", "mcp", "workflow"],
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
  amber: "#F59E0B",
  red: "#EF4444",
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

const H3 = ({ children }) => (
  <h3 style={{ fontFamily: F.serif, fontSize: 20, fontWeight: 600, color: C.ink, margin: "32px 0 12px" }}>
    {children}
  </h3>
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

/* ============================ SVG diagrams ============================ */

/* 1. ObsidianFeatureMap — hierarchical feature map. Green = strong CC tie-in,
   amber = weak, grey = none.  ~820x520 viewBox. */

const ObsidianFeatureMap = () => {
  const node = (x, y, w, h, label, sub, color) => (
    <g key={`${x}-${y}-${label}`}>
      <rect x={x} y={y} width={w} height={h} rx="6" fill={C.bgCard} stroke={color} strokeWidth="1.5" />
      <text x={x + w / 2} y={y + 18} textAnchor="middle" fill={color} fontFamily={F.sans} fontSize="11" fontWeight="700">{label}</text>
      {sub && <text x={x + w / 2} y={y + 34} textAnchor="middle" fill={C.muted} fontFamily={F.mono} fontSize="9">{sub}</text>}
    </g>
  );
  const G = C.ok;
  const A = C.amber;
  const N = C.muted;
  return (
    <svg viewBox="0 0 820 520" style={{ width: "100%", display: "block" }}>
      <rect width="820" height="520" fill={C.bgAlt} rx="8" stroke={C.line} />
      <text x="410" y="26" textAnchor="middle" fill={C.ink} fontFamily={F.sans} fontSize="13" fontWeight="700">
        Obsidian feature surface, coloured by Claude Code tie-in strength
      </text>
      <text x="410" y="44" textAnchor="middle" fill={C.muted} fontFamily={F.sans} fontSize="11">
        Green = strong (read/write integration) · Amber = weak (model-aware nice-to-have) · Grey = no native angle
      </text>

      {/* Root */}
      {node(330, 60, 160, 44, "Vault root", ".md + .obsidian/", G)}
      <line x1="410" y1="104" x2="410" y2="120" stroke={C.line} />

      {/* Tier 1 — content surfaces */}
      {node(40, 120, 140, 40, "Notes & sections", "headings, footnotes", G)}
      {node(195, 120, 140, 40, "Properties (YAML)", "tags, aliases, custom", G)}
      {node(350, 120, 140, 40, "Wikilinks", "[[Note]], [[Note|alias]]", G)}
      {node(505, 120, 140, 40, "Backlinks panel", "outgoing + unlinked", G)}
      {node(660, 120, 140, 40, "Tags (#tag)", "inline + nested", G)}

      {/* Tier 2 — block-level + visual */}
      {node(40, 195, 140, 40, "Embeds", "![[note#h]] / blocks", G)}
      {node(195, 195, 140, 40, "Block refs", "^block-id", G)}
      {node(350, 195, 140, 40, "Outline / TOC", "in-pane heading list", N)}
      {node(505, 195, 140, 40, "Graph view", "local + global", A)}
      {node(660, 195, 140, 40, "Canvas (.canvas)", "JSON Canvas 1.0", G)}

      {/* Tier 3 — search / nav */}
      {node(40, 270, 140, 40, "Search operators", "file: path: tag: section: block: line:", G)}
      {node(195, 270, 140, 40, "Quick switcher", "Cmd-O", N)}
      {node(350, 270, 140, 40, "Command palette", "Cmd-P", A)}
      {node(505, 270, 140, 40, "Bookmarks", "stars + recent", N)}
      {node(660, 270, 140, 40, "Workspaces", "saved layouts", N)}

      {/* Tier 4 — community plugin clusters */}
      {node(40, 345, 140, 40, "Dataview", "DQL + DataviewJS", G)}
      {node(195, 345, 140, 40, "Templater", "tp.user.* scripts", G)}
      {node(350, 345, 140, 40, "Obsidian Git", "auto commit/push", G)}
      {node(505, 345, 140, 40, "Periodic Notes", "daily/weekly/monthly", G)}
      {node(660, 345, 140, 40, "Tasks", "global task query", A)}

      {/* Tier 5 — AI-adjacent + sync */}
      {node(40, 420, 140, 40, "Smart Connections", "local embeddings", A)}
      {node(195, 420, 140, 40, "Copilot plugin", "in-vault chat", A)}
      {node(350, 420, 140, 40, "Local REST API", "MCP server bridge", G)}
      {node(505, 420, 140, 40, "Obsidian Sync", "E2E paid sync", N)}
      {node(660, 420, 140, 40, "Obsidian Publish", "$8/mo hosted site", N)}

      {/* Bottom legend strip */}
      <rect x="40" y="478" width="740" height="28" rx="4" fill={C.bgCard} stroke={C.line} />
      <text x="410" y="497" textAnchor="middle" fill={C.muted} fontFamily={F.mono} fontSize="10">
        Each green node has at least one published MCP tool, hook example, or skill referencing it
      </text>
    </svg>
  );
};

/* 2. HookLifecycle — linear timeline of the 9 hook events */

const HookLifecycle = () => {
  const evts = [
    { id: "SessionStart", note: "Read vault root CLAUDE.md, inject project context" },
    { id: "UserPromptSubmit", note: "Lint vault links in the prompt before model sees it" },
    { id: "PreToolUse", note: "Block Write to vault paths outside an allowlist" },
    { id: "PostToolUse", note: "Re-format YAML frontmatter; run linter" },
    { id: "Notification", note: "Forward to ntfy.sh / Slack" },
    { id: "SubagentStop", note: "Append subagent transcript to vault log note" },
    { id: "Stop", note: "Sweep meeting note tasks → gh issue create" },
    { id: "PreCompact", note: "Snapshot conversation to vault before compaction" },
    { id: "SessionEnd", note: "Roll daily note forward; flush JSONL log" },
  ];
  const w = 820;
  const h = 300;
  const x0 = 40;
  const x1 = w - 40;
  const y = 100;
  const step = (x1 - x0) / (evts.length - 1);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", display: "block" }}>
      <rect width={w} height={h} fill={C.bgAlt} rx="8" stroke={C.line} />
      <text x={w / 2} y="26" textAnchor="middle" fill={C.ink} fontFamily={F.sans} fontSize="13" fontWeight="700">
        Claude Code hook lifecycle — vault-facing example per event
      </text>
      <text x={w / 2} y="44" textAnchor="middle" fill={C.muted} fontFamily={F.sans} fontSize="11">
        Time runs left to right. Every event is documented in code.claude.com/docs/en/hooks.
      </text>
      <line x1={x0} y1={y} x2={x1} y2={y} stroke={C.accent} strokeWidth="2" />
      {evts.map((e, i) => {
        const cx = x0 + i * step;
        return (
          <g key={e.id}>
            <circle cx={cx} cy={y} r="6" fill={C.accent} />
            <text x={cx} y={y - 14} textAnchor="middle" fill={C.ink} fontFamily={F.mono} fontSize="9.5" fontWeight="700">
              {e.id}
            </text>
            {/* alternating notes above/below */}
            <foreignObject x={cx - 60} y={y + 14} width="120" height="160">
              <div xmlns="http://www.w3.org/1999/xhtml" style={{
                fontFamily: F.sans, fontSize: 9.5, color: C.muted,
                lineHeight: 1.4, textAlign: "center",
              }}>
                {e.note}
              </div>
            </foreignObject>
          </g>
        );
      })}
      <text x={w / 2} y={h - 12} textAnchor="middle" fill={C.muted} fontFamily={F.mono} fontSize="9.5">
        Events are configured in JSON under the `hooks` key in ~/.claude/settings.json or .claude/settings.json
      </text>
    </svg>
  );
};

/* 3. DataflowDiagram — vault → daemon → claude -p → JSX → git → HF, with state pills */

const DataflowDiagram = () => {
  const box = (x, y, w, h, title, lines, stroke) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="6" fill={C.bgCard} stroke={stroke} strokeWidth="1.5" />
      <text x={x + w / 2} y={y + 18} textAnchor="middle" fill={stroke} fontFamily={F.sans} fontSize="11" fontWeight="700">{title}</text>
      {lines.map((l, i) => (
        <text key={i} x={x + w / 2} y={y + 36 + i * 13} textAnchor="middle" fill={C.muted} fontFamily={F.mono} fontSize="9">
          {l}
        </text>
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 820 360" style={{ width: "100%", display: "block" }}>
      <rect width="820" height="360" fill={C.bgAlt} rx="8" stroke={C.line} />
      <text x="410" y="26" textAnchor="middle" fill={C.ink} fontFamily={F.sans} fontSize="13" fontWeight="700">
        article-daemon — state machine and dataflow (live workspace)
      </text>

      {box(20, 60, 150, 100, "Obsidian vault", ["~/Documents/", "Obsidian Vault/", "status: ready"], C.accent)}
      <text x="180" y="115" fill={C.accent} fontSize="18">→</text>

      {box(200, 60, 170, 100, "daemon.py (launchd)", ["scan every 30 s", "_claim_note()", "fcntl.flock LOCK_EX", "ready → generating"], C.accent2)}
      <text x="380" y="115" fill={C.accent} fontSize="18">→</text>

      {box(400, 60, 170, 100, "claude -p subprocess", ["--permission-mode", "acceptEdits", "--max-budget-usd 2.0", "--timeout 1800 s"], C.accent)}
      <text x="580" y="115" fill={C.accent} fontSize="18">→</text>

      {box(600, 60, 200, 100, "library-articles/articles/", ["{slug}.jsx", "_src/{slug}/*.png", "JSON log line"], C.ok)}

      {/* down */}
      <path d="M 700 162 L 700 195" stroke={C.muted} strokeWidth="1.5" fill="none" />
      <path d="M 695 191 L 700 199 L 705 191 Z" fill={C.muted} />

      {box(420, 200, 380, 60, "Phase 2 launchd watcher (scripts/ingest.py)", ["build.py → jsx_to_markdown.py → git commit → git push hf main"], C.line)}

      <path d="M 420 230 L 320 230" stroke={C.muted} strokeWidth="1.5" fill="none" />
      <path d="M 325 225 L 317 230 L 325 235 Z" fill={C.muted} />

      {box(140, 200, 180, 60, "HF Spaces", ["helwyr55/library-articles", "helwyr55/library"], C.accent2)}

      {/* state row */}
      <rect x="20" y="285" width="780" height="58" rx="6" fill={C.bgCard} stroke={C.line} />
      <text x="410" y="306" textAnchor="middle" fill={C.ink} fontFamily={F.mono} fontSize="11" fontWeight="700">
        State machine (from tests/test_state_machine.py)
      </text>
      <text x="410" y="326" textAnchor="middle" fill={C.muted} fontFamily={F.mono} fontSize="10.5">
        idea → draft → ready → generating → generated → published     (failed branches off any state)
      </text>
    </svg>
  );
};

/* 4. PluginCoverage — Recharts horizontal BarChart, ~15 plugins x integration strength */

const PluginCoverage = () => {
  const data = [
    { name: "Dataview", score: 9 },
    { name: "Templater", score: 8 },
    { name: "Obsidian Git", score: 9 },
    { name: "Periodic Notes", score: 8 },
    { name: "QuickAdd", score: 7 },
    { name: "Local REST API", score: 10 },
    { name: "Tasks", score: 6 },
    { name: "Excalidraw", score: 5 },
    { name: "Kanban", score: 4 },
    { name: "Citations", score: 6 },
    { name: "Smart Connections", score: 5 },
    { name: "Copilot plugin", score: 4 },
    { name: "Text Generator", score: 4 },
    { name: "Adv. Tables", score: 5 },
    { name: "Calendar", score: 6 },
  ];
  return (
    <div style={{ background: C.bgAlt, border: `1px solid ${C.line}`, borderRadius: 8, padding: "16px 12px", margin: "24px 0" }}>
      <div style={{ fontFamily: F.sans, fontSize: 13, fontWeight: 700, color: C.ink, padding: "0 8px 12px" }}>
        Subjective Claude-Code-integration strength — 0 to 10
      </div>
      <ResponsiveContainer width="100%" height={460}>
        <BarChart data={data} layout="vertical" margin={{ left: 30, right: 24, top: 4, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={C.grid} />
          <XAxis type="number" domain={[0, 10]} stroke={C.muted} fontSize={11} fontFamily={F.mono} />
          <YAxis type="category" dataKey="name" stroke={C.muted} fontSize={11} fontFamily={F.sans} width={120} />
          <Tooltip contentStyle={{ background: C.bgCard, border: `1px solid ${C.line}`, color: C.ink, fontSize: 12 }} cursor={{ fill: "rgba(139,92,246,0.08)" }} />
          <Bar dataKey="score" fill={C.accent} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div style={{ fontFamily: F.sans, fontSize: 12, color: C.muted, padding: "12px 8px 0", lineHeight: 1.5 }}>
        Subjective — verify for your own vault. Scoring rewards plugins that produce or consume plain Markdown / YAML over plugins that lock content into a custom format.
      </div>
    </div>
  );
};

/* 5. MemoryVsVault — 2x2 SVG matrix */

const MemoryVsVault = () => {
  const w = 760, h = 400;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", display: "block" }}>
      <rect width={w} height={h} fill={C.bgAlt} rx="8" stroke={C.line} />
      <text x={w / 2} y="24" textAnchor="middle" fill={C.ink} fontFamily={F.sans} fontSize="13" fontWeight="700">
        Where each memory lives
      </text>
      <text x={w / 2} y="42" textAnchor="middle" fill={C.muted} fontFamily={F.sans} fontSize="11">
        Two axes — durability (vertical) and reach (horizontal)
      </text>

      {/* axes */}
      <line x1="60" y1={h - 50} x2={w - 30} y2={h - 50} stroke={C.muted} strokeWidth="1" />
      <line x1={w / 2} y1="60" x2={w / 2} y2={h - 30} stroke={C.muted} strokeWidth="1" />

      <text x={w - 38} y={h - 36} fill={C.muted} fontFamily={F.sans} fontSize="10">shared</text>
      <text x="64" y={h - 36} fill={C.muted} fontFamily={F.sans} fontSize="10">local-only</text>
      <text x={w / 2 + 6} y="72" fill={C.muted} fontFamily={F.sans} fontSize="10">durable</text>
      <text x={w / 2 + 6} y={h - 56} fill={C.muted} fontFamily={F.sans} fontSize="10">ephemeral</text>

      {/* quadrant labels */}
      {[
        { x: 120, y: 110, label: "Local + Durable", items: ["Obsidian vault", "CLAUDE.md (project)", "~/.claude/skills/"] },
        { x: 460, y: 110, label: "Shared + Durable", items: ["git remote", "GitHub repo", "HF Space build"] },
        { x: 120, y: 280, label: "Local + Ephemeral", items: ["Claude session ctx", "shell history", "swap & .obsidian/workspace.json"] },
        { x: 460, y: 280, label: "Shared + Ephemeral", items: ["MCP tool calls", "GitHub Actions run", "PR comment thread"] },
      ].map((q, i) => (
        <g key={i}>
          <rect x={q.x} y={q.y} width="240" height="120" rx="6" fill={C.bgCard} stroke={C.line} />
          <text x={q.x + 12} y={q.y + 22} fill={C.accent} fontFamily={F.mono} fontSize="11" fontWeight="700">{q.label}</text>
          {q.items.map((it, j) => (
            <text key={j} x={q.x + 12} y={q.y + 46 + j * 18} fill={C.ink} fontFamily={F.sans} fontSize="11.5">• {it}</text>
          ))}
        </g>
      ))}
    </svg>
  );
};

/* --------------------------- Main component --------------------------- */

export default function ObsidianCompleteGuideWithClaudeCode() {
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
          Encyclopaedic · Reference
        </span>
        <span style={{ fontFamily: F.mono, fontSize: 11, color: C.muted }}>
          Obsidian 1.5+ · Claude Code · Hooks · Skills · MCP · Agent SDK
        </span>
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "60px 24px 0" }}>
        <div style={{ fontFamily: F.mono, fontSize: 12, color: C.accent, fontWeight: 600, letterSpacing: "0.08em", marginBottom: 12 }}>
          THE FEATURE-BY-FEATURE COMPANION
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
          Obsidian, feature by feature, with Claude Code
        </h1>
        <p style={{ fontFamily: F.sans, fontSize: 18, color: C.muted, lineHeight: 1.6, maxWidth: 700, marginBottom: 14 }}>
          A reference book for every major Obsidian surface — vault, properties, links, plugins, sync, MCP — and how each one wires into a Claude Code agent on the same disk.
        </p>
        <div style={{ fontFamily: F.sans, fontSize: 13, color: C.muted, marginBottom: 40 }}>
          Six parts · Skim the contents · Jump to any feature · Companion to the Obsidian + Claude Code overview
        </div>
        <div style={{ height: 1, background: C.line, marginBottom: 28 }} />
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* ================= LEDE ================= */}

        <DC>{`A vault and an agent are not the same thing, but they live on the same disk. <strong>Obsidian</strong> is a desktop application that opens a folder of Markdown files and presents that folder as a knowledge graph — backlinks, properties, embeds, search, plus a community plugin ecosystem larger than most IDEs ship with. <strong>Claude Code</strong> is Anthropic's command-line and web agent for Claude — a tool-using process that reads, writes, runs subprocesses, and speaks the Model Context Protocol. Each is interesting on its own. The interesting surface is where they meet: a folder of plain text that the human edits in one application and an agent edits in another.`}</DC>
        <P>{`This article is a companion piece to <em>Obsidian and Claude Code</em>, an earlier overview that walked through ten narrative use cases for the integration. That essay was about <em>why</em>. This one is about <em>what</em> — a feature-by-feature reference for every Obsidian surface a Claude Code agent might read, write, or trigger off, and every Claude Code surface that touches a vault. Six parts: core Obsidian features, community plugins worth automating, the automation layer (hooks + skills + MCP + daemons + scheduled runs + the Agent SDK), sync and mobile and publishing, advanced workflows, and finally the failure modes that scale up as the vault does.`}</P>
        <P>{`Treat it as a reference. Skim the table of contents, jump to the feature you care about, copy the snippet, ignore the rest. Every plugin name and every API call below traces to either a web source or a file in the workspace this article was generated from — a live article-generation pipeline that watches a vault for <code>status: ready</code> notes and hands them to <code>claude -p</code>. The Source Integrity Note at the end lists each URL consulted and each composite construction flagged. Plugin maintenance status was verified on 2026-04-24; for any plugin where the verification is dated and the project has gone dark since, prefer the published alternative or omit.`}</P>
        <P>{`A note on scope. <em>Obsidian</em> as referenced below means Obsidian 1.5 or newer with the post-2023 Properties / Canvas / Bookmarks features in core. <em>Claude Code</em> means the post-skills, post-MCP CLI and the claude.ai/code web sandbox as they exist in April 2026, with hooks documented at <code>code.claude.com/docs/en/hooks</code> and skills at <code>code.claude.com/docs/en/skills</code>. Where the two specifications might disagree on a detail, the upstream documentation is canonical and this reference is descriptive.`}</P>

        <ObsidianFeatureMap />
        <Cap>The shape of the Obsidian feature surface, coloured by how strongly each surface ties into a Claude Code agent. The top row of the bottom cluster — Dataview, Templater, Git, Periodic Notes — is where most of the integration leverage lives.</Cap>

        <PQ>{`The vault is a filesystem of Markdown. Claude Code is a tool-using agent on that filesystem. Everything else is naming convention.`}</PQ>

        <Photograph
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=80"
          alt="A laptop on a wooden desk with a notebook and pen, soft lamplight"
          caption="The desk this article is about. A vault on the laptop, a notebook for the parts that resist the keyboard, and an agent running quietly in a terminal you can't see in the frame."
          credit="Nick Morrison / Unsplash"
          href="https://unsplash.com/photos/MacBook-Pro-near-white-open-book-FHnnjk1Yj7Y?utm_source=dsl&utm_medium=referral"
        />

        {/* =========================================================================
             PART 1 — Core Obsidian surfaces
             ========================================================================= */}

        <Sec n="1" title="Part 1 — Core Obsidian surfaces">
          <P>{`The core surface of Obsidian is small. Almost everything below this line is a community plugin. The features in this section are what ship with the application and survive an empty <code>.obsidian/</code> directory.`}</P>

          <H3>Vault as a Markdown filesystem</H3>
          <P>{`A vault is a folder. That is the entire abstraction. Notes are <code>*.md</code> files; attachments are PNGs and PDFs and anything else; configuration lives in the <code>.obsidian/</code> subdirectory. There is no database, no proprietary index format that survives a crash, no lock-in. The Claude Code integration follows from this directly — the Read and Write tools that ship with Claude Code work without any plugin or API. <code>claude -p "Read every note in ~/Documents/Obsidian Vault/Reading/ and write a synthesis to _draft.md"</code> works, because both halves are just files.`}</P>
          <P>{`The <code>.obsidian/</code> directory carries the vault's plugin enables, hotkeys, theme, and current pane layout. <code>workspace.json</code> in particular changes every time you switch panes. If you put your vault under git, gitignore it; otherwise every focus shift becomes a commit. The article-daemon in this workspace skips it explicitly.`}</P>

          <H3>Notes, sections, footnotes, callouts</H3>
          <P>{`A note is a Markdown file. Headings are CommonMark. Footnotes follow GitHub-flavoured Markdown — <code>[^1]</code> in the body and <code>[^1]: text</code> at the bottom. Callouts are Obsidian's own Markdown extension, written as a blockquote with a type marker on the first line: <code>&gt; [!note] Title</code> or <code>&gt; [!warning]</code>. Twelve callout types are documented in core, and you can author custom ones via CSS. Claude Code treats callouts as plain blockquotes when reading; when writing back into a vault, prefer the native syntax (<code>&gt; [!info]</code>) over the older Admonitions plugin's code-block syntax — the native form survives plugin removal.`}</P>

          <H3>Wikilinks, aliases, and the link graph</H3>
          <P>{`Obsidian's signature primitive is the wikilink — <code>[[Note Title]]</code>, <code>[[Note Title|display text]]</code>, <code>[[Note#Heading]]</code>, <code>[[Note#^block-id]]</code>. Wikilinks resolve by note name, not by path; renaming a note that other notes link to triggers a vault-wide link rewrite. This is why a vault can survive a directory reshuffle without dead links.`}</P>
          <P>{`A note's <code>aliases</code> property in YAML frontmatter (a list, not a string) registers extra names the wikilink resolver will accept. So <code>aliases: [TLA, three-letter acronym]</code> makes <code>[[TLA]]</code> and <code>[[three-letter acronym]]</code> resolve to the same note. Claude Code's value-add: when synthesising prose across many notes, instruct the agent to emit wikilinks rather than markdown links so the resulting note remains navigable inside Obsidian.`}</P>
          <Code title="prompt fragment for a synthesis task">{`Cite every claim with a [[wikilink]] to the source note in this vault.
Use [[Note#Heading]] when the claim is heading-specific.
Do not use markdown URL syntax — wikilinks survive vault renames.`}</Code>

          <H3>Backlinks, outgoing links, unlinked mentions</H3>
          <P>{`The right pane in Obsidian shows three lists for the active note: backlinks (other notes linking in), outgoing (links from this note), and unlinked mentions (notes containing the title-as-text without a link). The unlinked-mentions list is the underused one — it surfaces orphans that should probably be linked. A useful Claude Code chore: scan unlinked mentions across the vault and propose linking patches as a <code>- [ ]</code> checklist in a maintenance note.`}</P>

          <H3>Tags — inline and frontmatter</H3>
          <P>{`Tags come in two syntaxes. Inline: <code>#concept/diffusion</code> anywhere in the body. Frontmatter: <code>tags: [concept/diffusion, status/draft]</code>. Tags are nestable with a slash. Both forms participate in the same tag pane and search. The article-daemon strips inline <code>#tags</code> from the prompt before handing it to the model — they're noise to the generator skill, but the model can still read frontmatter tags as semantic hints (<code>status: draft</code> means something different from <code>status: ready</code>).`}</P>

          <H3>Properties — YAML frontmatter as the agent's payload</H3>
          <P>{`Properties — Obsidian's UI for the YAML frontmatter block at the top of a note — are the most important surface for Claude Code. The agent reads frontmatter as a deterministic key/value payload; it writes frontmatter back as the canonical place to record state. Native types: text, list, number, checkbox, date, datetime. Reserved keys with built-in behaviour: <code>tags</code>, <code>aliases</code>, <code>cssclasses</code>, plus the publish-related <code>publish</code> key when Obsidian Publish is in use. Custom keys are free-form.`}</P>
          <P>{`The article-daemon's frontmatter contract is a working example: <code>article-skill</code>, <code>article-mode</code>, <code>slug</code>, <code>status</code>, <code>publish-target</code>, <code>word-budget</code>, <code>created</code>. The daemon mutates only <code>status</code>, <code>claimed-at</code>, <code>generated-at</code>, <code>jsx-path</code>, <code>cost-usd</code>, <code>failed-at</code>, <code>error-log</code>. Every other field is human-authored. That separation is load-bearing — when you can clearly identify which keys the agent owns and which the human owns, conflicts become impossible by construction.`}</P>
          <Code title="a typical agent-readable note in this workspace">{`---
article-skill: technical-ds
article-mode: encyclopaedic
slug: my-article-slug
status: ready
word-budget: 5000
created: 2026-04-20
---

# My Article
Body text...`}</Code>

          <H3>Embeds — images, PDFs, notes, headings, blocks</H3>
          <P>{`The embed syntax mirrors links with a leading bang: <code>![[image.png]]</code>, <code>![[note]]</code>, <code>![[note#heading]]</code>, <code>![[note#^block-id]]</code>. PDFs embed directly. Note embeds are full transclusions — when the source note changes, every embed updates. The article-daemon's <code>obsidian_to_prompt</code> resolver inlines wikilinks as plain text, copies image embeds into a per-article <code>_src/{slug}/</code> directory under the JSX output, and replaces image embeds with a <code>[[IMG:relative/path]]</code> marker the generator skill knows how to expand.`}</P>

          <H3>Block references</H3>
          <P>{`A block reference is an anchor on a paragraph or list item. Mark the block with <code>^my-block-id</code> at the end of the line; reference it elsewhere with <code>[[Note#^my-block-id]]</code>. Block IDs survive heading renames, which makes them the right anchor for "this exact sentence" rather than "this section." Claude Code can author block IDs deliberately — useful when the agent writes a long synthesis and you want a stable anchor for one particular claim.`}</P>

          <H3>Outline, graph view, canvas</H3>
          <P>{`The Outline view in the right pane shows the heading tree of the active note. Useful for navigation; not load-bearing for the agent. The Graph view comes in two flavours — local (one note plus its neighbourhood at radius N) and global (the entire vault). Global graphs of more than a few thousand notes get visually noisy and computationally expensive; the local graph at radius 2 or 3 is the more useful research view.`}</P>
          <P>{`Canvas — the infinite-canvas board for arranging notes spatially — stores its data as a JSON file with the <code>.canvas</code> extension. The format is <strong>JSON Canvas 1.0</strong>, an open spec at <code>jsoncanvas.org</code> with the source repo at <code>github.com/obsidianmd/jsoncanvas</code>. A canvas file holds an array of <code>nodes</code> (each with a position, size, and a <code>type</code> of <code>text</code>, <code>file</code>, <code>link</code>, or <code>group</code>) and an array of <code>edges</code> connecting them. Because the format is plain JSON, Claude Code can author canvases programmatically — useful for converting a list of paper abstracts into a spatial reading map.`}</P>
          <Code title="a minimal .canvas file (JSON Canvas 1.0)">{`{
  "nodes": [
    {"id":"a","type":"text","x":0,"y":0,"width":260,"height":80,"text":"# Spec"},
    {"id":"b","type":"file","x":320,"y":0,"width":260,"height":80,"file":"Plan.md"}
  ],
  "edges": [
    {"id":"e1","fromNode":"a","fromSide":"right","toNode":"b","toSide":"left"}
  ]
}`}</Code>

          <H3>Bookmarks, search, quick switcher, command palette</H3>
          <P>{`Bookmarks (the unified successor to Starred files) live at <code>.obsidian/bookmarks.json</code>. The Quick Switcher (default <code>Cmd-O</code>) is fuzzy file search. The Command Palette (<code>Cmd-P</code>) lists every command core and plugins expose. Plugin commands are discoverable via the palette and addressable by ID — for example, the Templater command for inserting a template is <code>templater-obsidian:insert-template</code>, and the Periodic Notes command for opening today's daily note is <code>periodic-notes:open-daily-note</code>. The IDs are stable across versions, so a Templater script or an external opener can call them deterministically.`}</P>
          <P>{`Obsidian's search supports an operator language documented in the official help. The most useful operators: <code>file:</code> on filename, <code>path:</code> on full vault-relative path, <code>tag:</code> on tag (faster than text search because it uses the cached tag index), and the trio <code>line:</code> / <code>block:</code> / <code>section:</code> which scope a sub-query to a single line, a block (paragraph or list bounded by blank lines), or a section between two headings. They support nesting with parens: <code>tag:#paper section:(diffusion AND score)</code>.`}</P>

          <H3>Workspaces, panes, tabs, linked panes</H3>
          <P>{`Obsidian's pane model: a window contains tabs grouped into pane stacks; pane stacks tile horizontally and vertically; the whole arrangement can be saved as a named workspace via the core Workspaces plugin. A linked pane is two views on the same note — an editing pane on the left and a preview pane on the right that scrolls in lockstep. None of this is directly relevant to a Claude Code agent (the agent doesn't read the UI state) — but it is relevant to <em>using</em> the agent: a common arrangement is one pane for the active note, one pane tailing <code>~/Library/Logs/article-daemon.log</code> via a terminal embed plugin, and one pane on the daemon's JSONL output rendered through Dataview.`}</P>
        </Sec>

        <Photograph
          src="https://images.unsplash.com/photo-1542435503-956c469947f6?w=1600&q=80"
          alt="A clean editor view with a graph of connected nodes radiating from a central node"
          caption="A local graph at radius 2. Useful for orientation in a 5,000-note vault; useless at 50,000. Knowing when the global view stops helping is part of the craft."
          credit="Alina Grubnyak / Unsplash"
          href="https://unsplash.com/photos/black-and-white-illustration-of-tree-ZiQkhI7417A?utm_source=dsl&utm_medium=referral"
        />

        {/* =========================================================================
             PART 2 — Community plugins
             ========================================================================= */}

        <Sec n="2" title="Part 2 — Community plugins worth the agentic workflow">
          <P>{`A plugin is worth the agentic workflow only if it reads or writes Markdown that the agent can also read or write. Plugins that lock content into a custom binary format are dead weight. Below: 15 plugins where I have personally watched a Claude Code workflow get faster because of the integration. Maintenance status was checked on 2026-04-24 against each project's GitHub repository — where I cite a "last verified" date, take that as the boundary of my evidence.`}</P>

          <H3>Dataview (blacksmithgu, community-maintained)</H3>
          <P>{`Repo: <code>github.com/blacksmithgu/obsidian-dataview</code>. Dataview turns the vault into a queryable database. Two query languages: <strong>DQL</strong>, a declarative SQL-like syntax for tables/lists/tasks, and <strong>DataviewJS</strong>, a JavaScript API with full vault access. Original author Michael Adam Brewer (<em>blacksmithgu</em>) handed off to community maintainers; recent releases continue under the same repo. Last verified 2026-04-24 — check for current status.`}</P>
          <P>{`Claude Code integration: do not have the agent author Dataview queries inside notes that the same query renders into. The query and its rendered output share a file, and Dataview re-runs the query each open — so a Claude-written DQL block produces an unreadable diff. Instead, have a hand-stable Dataview block in each dashboard note and let Claude update the <em>data</em> it queries (frontmatter on individual notes).`}</P>
          <Code title="DQL block — table of every dataset note touched this week">{`\`\`\`dataview
TABLE rows, file.mtime as "last edited"
FROM "Datasets"
WHERE file.mtime >= date(today) - dur(7 days)
SORT file.mtime DESC
\`\`\``}</Code>

          <H3>Templater (SilentVoid13)</H3>
          <P>{`Repo: <code>github.com/SilentVoid13/Templater</code>. Templater executes JavaScript at note creation time. Built-in <code>tp.*</code> namespace for dates, prompts, system info; user scripts (<code>.js</code> files in a designated folder, loaded as CommonJS) become callable as <code>tp.user.&lt;name&gt;()</code>. Latest release within the last week of April 2026 — actively maintained.`}</P>
          <P>{`Claude Code integration: the article-note template in this workspace is a Templater file. It auto-fills <code>created</code> from <code>tp.date.now()</code>, prompts for the slug, sets <code>status: draft</code>. When you later flip to <code>status: ready</code>, the daemon picks it up. Don't have Claude author Templater scripts at runtime — Templater scripts run with full vault permissions and Claude has no way to test the side effects before they hit your real notes.`}</P>

          <H3>QuickAdd (chhoumann)</H3>
          <P>{`Repo: <code>github.com/chhoumann/quickadd</code>. Four primitives: templates, captures, macros, multis. The capture flow lets you bind a hotkey to "append a timestamped line to a specific note" — the closest thing Obsidian has to a quick-capture inbox. Claude Code integration: capture a one-line article idea via QuickAdd into <code>Inbox.md</code>, then a daily Claude sweep promotes <code>Inbox.md</code> rows to full article notes with the right <code>article-skill</code> frontmatter. The agent reads and writes Markdown either way; QuickAdd just makes the capture fast on the human side.`}</P>

          <H3>Obsidian Git (Vinzent03)</H3>
          <P>{`Repo: <code>github.com/Vinzent03/obsidian-git</code>. Maintained continuously by Vinzent03 since 2021; latest release 2.38.2 within the last week of April 2026. Auto-commit, auto-pull, auto-push at configurable intervals. The natural pairing for any vault that lives on a remote — and it pairs cleanly with Claude Code, because once the vault is under git, the agent has a perfectly visible audit trail of every edit it makes. <code>git log -- "Daily/2026-04-24.md"</code> tells you exactly which commit your agent introduced and exactly which line it changed. Combine with a pre-commit hook that lints YAML frontmatter and you have a working sanity barrier between hallucination and disk.`}</P>

          <H3>Periodic Notes + Calendar (liamcain)</H3>
          <P>{`Repos: <code>github.com/liamcain/obsidian-periodic-notes</code> and <code>github.com/liamcain/obsidian-calendar-plugin</code>. Periodic Notes generalises core's Daily Notes to weekly, monthly, quarterly, and yearly. Calendar adds a calendar widget in the sidebar. Together they're the canonical scaffold for time-indexed notes. Claude Code integration: a scheduled morning agent writes <code>Daily/2026-04-24.md</code> using the same path Periodic Notes would have created, populated with yesterday's git activity, today's open PRs, and the calendar entries from <code>icalBuddy</code> or a calendar MCP server. The note appears in the Calendar widget with no extra plumbing.`}</P>

          <H3>Tasks (obsidian-tasks-group, maintainer Clare Macrae)</H3>
          <P>{`Repo: <code>github.com/obsidian-tasks-group/obsidian-tasks</code>. Originally Martin Schenck, now maintained by Clare Macrae since May 2022. Tasks parses Markdown task syntax (<code>- [ ] thing 📅 2026-04-30 🔁 every week</code>) into a query layer with due dates, recurrence rules, and tags. Claude Code integration: task harvesting. A <code>Stop</code> hook can run a Tasks query for "all tasks due today across the vault" and write the result into the morning briefing.`}</P>

          <H3>Kanban (mgmeyers — currently seeking maintainers)</H3>
          <P>{`Repo: <code>github.com/mgmeyers/obsidian-kanban</code>. Markdown-backed kanban boards as <code>.md</code> files with a special frontmatter flag. As of 2026-04-24, Matthew Meyers is publicly seeking new maintainers; the plugin still works but is on the watch list. If you adopt it, do so knowing you may need to fork or migrate. Claude Code integration: each card is a Markdown line; the agent can move cards between columns by editing the source file. Useful for issue triage workflows where the agent reads PR review state and re-files cards.`}</P>

          <H3>Excalidraw (zsviczian)</H3>
          <P>{`Repo: <code>github.com/zsviczian/obsidian-excalidraw-plugin</code>. Latest release 2.22.0 within the last month. Bundles Excalidraw inside Obsidian; drawings save as <code>.excalidraw.md</code> (a Markdown wrapper around the Excalidraw JSON). The Markdown wrapping is the Claude integration story — the agent can read the JSON portion as a sketch description and re-emit a labelled diagram with new annotations. Less common but a fit for design-doc workflows where the diagram and the prose live next to each other.`}</P>

          <H3>Admonitions (Javalent / valentine195) — and the native callouts story</H3>
          <P>{`Repo: <code>github.com/valentine195/obsidian-admonition</code>. Pre-dates Obsidian's native callout syntax. Worth using if you need callout types beyond the twelve built into core, or if you've inherited a vault with the older code-block <code>~~~ad-info</code> syntax. For new vaults, prefer native callouts — they survive plugin removal and Claude Code's reading layer treats them as ordinary blockquotes regardless of which renderer is active.`}</P>

          <H3>Natural Language Dates (argenos)</H3>
          <P>{`Repo: <code>github.com/argenos/nldates-obsidian</code>. Parses phrases like "next Friday" into ISO dates inline. Templater can call it via <code>tp.user.nldates(...)</code>; QuickAdd can use it in capture flows. Claude Code integration: when authoring a note, the agent writes ISO dates directly — <code>2026-05-02</code> rather than "next Friday." But when the human later edits the note in Obsidian and types "next Friday," NL Dates rewrites it to ISO. The two coexist cleanly.`}</P>

          <H3>Advanced Tables (tgrosinger)</H3>
          <P>{`Repo: <code>github.com/tgrosinger/advanced-tables-obsidian</code>. Spreadsheet-style table editing — auto-format, tab-to-next-cell, sortable columns, formulas. The Claude angle is small but real: when the agent writes a table-of-results note, Advanced Tables auto-formats it on save and formula columns recompute. Lets you keep the table in Markdown rather than splitting into a CSV.`}</P>

          <H3>Citations (hans)</H3>
          <P>{`Repo: <code>github.com/hans/obsidian-citation-plugin</code>. Reads a BibTeX or CSL-JSON bibliography and creates literature notes with one citation per note, named by citekey. Pairs with Zotero through Better BibTeX export. Claude Code integration: a literature-review skill that walks <code>Literature/</code>, drafts a survey, and emits in-text citations as <code>[@citekey]</code> — the exact format the citation plugin's hover preview expects.`}</P>

          <H3>Mind Map (lynchjames)</H3>
          <P>{`Repo via <code>obsidianstats.com/plugins/obsidian-mind-map</code>. The Mind Map plugin renders a markdown note as a Markmap mind map. The latest release was 1.1.0 several years ago, and the plugin overlaps with Obsidian's native Canvas. <strong>Last verified 2026-04-24 — likely abandoned; consider Canvas instead.</strong> Including here because vaults that pre-date Canvas often still have Mind Map in their plugin list.`}</P>

          <H3>Smart Connections (brianpetro)</H3>
          <P>{`Repo: <code>github.com/brianpetro/obsidian-smart-connections</code>. Builds local embeddings over the vault and surfaces semantically related notes. Models can be local (default) or remote; choose local to keep notes on the machine. Pairs with Claude Code as a "find me notes related to this draft" sidebar — the agent then reads those notes via its Read tool. The default local model is the privacy-preserving option; if you flip to a remote provider, your notes go to that provider.`}</P>

          <H3>Copilot plugin (logancyang)</H3>
          <P>{`Repo: <code>github.com/logancyang/obsidian-copilot</code>. In-vault chat against an LLM. Supports remote APIs (OpenAI, Anthropic, Google) and local models. Distinct from <em>Claude Code</em> — Copilot is a chat panel inside Obsidian; Claude Code is an agent in a terminal. They can coexist on the same vault, but answer different questions: Copilot for "summarise this note while I read it"; Claude Code for "rewrite this folder of notes." If you do not need both, keep one — the maintenance overhead of two LLM keys is not worth the convenience.`}</P>

          <H3>Text Generator (nhaouari)</H3>
          <P>{`Repo via <code>obsidianstats.com</code>. Versatile text-generation plugin against multiple providers. Older than Copilot and broader in scope (template-driven generation). Useful when you want a single keypress to expand a templated prompt against a configured provider — but again, if you have Claude Code already, the value-add is incremental.`}</P>

          <H3>Obsidian Projects (marcusolsson — discontinued; Projects Plus continues)</H3>
          <P>{`Original repo: <code>github.com/marcusolsson/obsidian-projects</code>. Marcus Olsson <strong>discontinued</strong> the project on 2025-05-12; a community fork named Projects Plus continues development. Projects renders folders as table / calendar / board / gallery views over Markdown. If you depend on the original, plan a migration. If you're starting fresh, evaluate Projects Plus or use a Dataview-rendered table instead. Last verified 2026-04-24.</P>`}</P>

          <H3>The Local REST API plugin (coddingtonbear) — the one that turns the vault into an API</H3>
          <P>{`Repo: <code>github.com/coddingtonbear/obsidian-local-rest-api</code>. Not a productivity plugin — an infrastructure plugin. It exposes your vault over HTTP (default <code>https://127.0.0.1:27124</code>, fallback <code>http://127.0.0.1:27123</code>) with token authentication. Both major Obsidian MCP servers (covered in §3) bridge through it. If you want any external process — Claude Code, an MCP server, a shell script — to read or write the vault while Obsidian is running, this is the integration point.`}</P>

          <PluginCoverage />
          <Cap>Subjective scores — verify for your own vault. The pattern: the higher a plugin scores, the more it acts on plain Markdown the agent can also act on. Plugins that lock content into a proprietary view score low even when they're individually wonderful.</Cap>
        </Sec>

        <Photograph
          src="https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1600&q=80"
          alt="A close-up of a desk with a notebook, pen, and a laptop showing code"
          caption="The integration is smaller than it looks. Plain text on disk, two applications that read it, and a few hundred lines of glue between them."
          credit="Thought Catalog / Unsplash"
          href="https://unsplash.com/photos/person-holding-fountain-pen-505eectW54k?utm_source=dsl&utm_medium=referral"
        />

        {/* =========================================================================
             PART 3 — The automation layer
             ========================================================================= */}

        <Sec n="3" title="Part 3 — The automation layer">
          <P>{`This is the part where the integration earns its name. Five surfaces — hooks, skills, MCP servers, daemons, scheduled runs — and the Agent SDK that lets you wire all of them together. Every event below is documented at <code>code.claude.com/docs/en/hooks</code> or <code>code.claude.com/docs/en/skills</code>; every JSON shape comes from there.`}</P>

          <H3>Hooks — the lifecycle callback surface</H3>
          <P>{`Claude Code documents nine lifecycle hook events: <code>PreToolUse</code>, <code>PostToolUse</code>, <code>UserPromptSubmit</code>, <code>SessionStart</code>, <code>SessionEnd</code>, <code>Stop</code>, <code>SubagentStop</code>, <code>PreCompact</code>, and <code>Notification</code>. Hooks are configured in JSON under the <code>hooks</code> key in <code>settings.json</code> (user scope) or <code>.claude/settings.json</code> (project scope). Each hook has a matcher (which tools / which events it fires on) and a list of handlers. A handler is typically a shell command; it receives a JSON event payload on stdin and signals outcome via exit code — 0 success, 2 a blocking error fed back to Claude as stderr text. Async background handlers (<code>"async": true</code>) became available in early 2026.`}</P>

          <HookLifecycle />
          <Cap>The nine events laid out as a timeline. Each annotation is a vault-facing example you can adapt; in practice you'll have at most three or four of these populated at a time.</Cap>

          <H3>One vault example per event</H3>
          <P>{`<strong>SessionStart.</strong> When a session opens, read the vault root <code>CLAUDE.md</code> and inject a one-line summary into the conversation context — useful when the agent is started from a parent directory and the vault context would otherwise be missed.`}</P>
          <P>{`<strong>UserPromptSubmit.</strong> Lint the user's prompt for vault references — if the prompt mentions <code>[[Note]]</code> by name and the note doesn't exist, warn before the model spends tokens trying to reason about it.`}</P>
          <P>{`<strong>PreToolUse.</strong> Block <code>Write</code> tool calls whose target path is outside the vault and outside an explicit allowlist. Exit code 2 with an explanation in stderr cancels the tool call and surfaces the reason to Claude.`}</P>
          <P>{`<strong>PostToolUse.</strong> After a Write, run a YAML frontmatter linter against the modified file. If the frontmatter is invalid, log the diff and (optionally) revert via <code>git restore</code>.`}</P>
          <P>{`<strong>Notification.</strong> When Claude requests user attention, forward to <code>ntfy.sh</code> or a Slack webhook so a long-running session can finish unattended.`}</P>
          <P>{`<strong>SubagentStop.</strong> Append the subagent's transcript to a vault log note named after the parent session ID. Lets you reread what the subagent did without trawling the parent terminal.`}</P>
          <P>{`<strong>Stop.</strong> Sweep <code>Daily/$(date +%F).md</code> for <code>- [ ]</code> task lines whose body starts with "issue:" and run <code>gh issue create</code> for each, appending the issue number back into the line for idempotency.`}</P>
          <P>{`<strong>PreCompact.</strong> Snapshot the conversation transcript to a vault note before context compaction. Compaction is lossy; the snapshot is your backup.`}</P>
          <P>{`<strong>SessionEnd.</strong> Roll the daily note forward (move uncompleted tasks to tomorrow's note), flush the JSONL log, optionally <code>git commit</code> the vault.`}</P>
          <Code title="~/.claude/settings.json — a Stop-hook for meeting-note → issue">{`{
  "hooks": {
    "Stop": [
      {
        "matcher": {"any": true},
        "hooks": [
          {
            "type": "command",
            "command": "python3 ~/.claude/hooks/file_meeting_tasks.py",
            "async": false
          }
        ]
      }
    ]
  }
}`}</Code>

          <H3>Skills — vault-authored capabilities</H3>
          <P>{`A skill is a folder containing a <code>SKILL.md</code> with YAML frontmatter and Markdown body, plus optional <code>scripts/</code>, <code>references/</code>, and <code>assets/</code> subdirectories. Required frontmatter: <code>name</code> (max 64 chars, lowercase / digits / hyphens) and <code>description</code> (max 1024 chars, the trigger condition Claude reads to decide whether to invoke). Optional: <code>disable-model-invocation: true</code>, <code>allowed-tools</code>, custom <code>model</code> override.`}</P>
          <P>{`The vault-authoring loop is the practical win. Edit the skill body as a normal Obsidian note; iterate the description until it captures the trigger condition you want; save the file as <code>~/.claude/skills/&lt;name&gt;/SKILL.md</code>. In this workspace, four skills (<code>article-generator</code>, <code>technical-ds-article</code>, <code>natgeo-article</code>, <code>travel-photography-article</code>) live at the user-scope path and are mirrored into each library repo at <code>.claude/skills/</code> so the claude.ai/code web sandbox can see them. The mirror is one-way — author at user scope, sync to repo, never edit the mirror directly.`}</P>
          <Code title="a skill that turns a [[wikilink]] list into a synthesis draft">{`---
name: synthesise-folder
description: Use when the user asks to synthesise a folder of notes
  into a draft article, write a literature review across linked notes,
  or produce a summary that cites the source notes by [[wikilink]].
---

# Synthesise folder

Read every \`*.md\` under the folder the user names (default: cwd).
Produce a 1,500-word draft. Cite every claim with a [[wikilink]] to
the note it came from. Save to \`_draft.md\` in the same folder.`}</Code>

          <H3>MCP servers — the protocol layer</H3>
          <P>{`The Model Context Protocol is a JSON-RPC 2.0 standard introduced by Anthropic in late 2024 and now governed under the Linux Foundation's Agentic AI Foundation. The current spec at <code>modelcontextprotocol.io/specification/2025-11-25</code> defines two transports: <strong>stdio</strong> (server runs as a subprocess; messages on stdin/stdout, newline-delimited) and <strong>Streamable HTTP</strong> (a single endpoint supporting POST and GET, with optional Server-Sent Events for streaming). Claude Code is an MCP client.`}</P>
          <P>{`Two well-maintained MCP servers bridge to an Obsidian vault, both via the Local REST API plugin. <strong>MarkusPfundstein/mcp-obsidian</strong> exposes <code>list_files_in_vault</code>, <code>list_files_in_dir</code>, <code>get_file_contents</code>, <code>search</code>, <code>patch_content</code>, <code>append_content</code>, <code>delete_file</code>. <strong>cyanheads/obsidian-mcp-server</strong> adds frontmatter and tag management, an in-memory cache that serves as a fallback when the live API drops, and a TypeScript-based architecture. Both connect on the Local REST API's default port 27124 (HTTPS) or 27123 (HTTP) and require an OBSIDIAN_API_KEY from the plugin settings.`}</P>
          <Code title="claude code MCP config — adding the obsidian-mcp-server">{`# Add the cyanheads server to Claude Code via the CLI
claude mcp add obsidian \\
  --scope user \\
  --command "npx -y @cyanheads/obsidian-mcp-server" \\
  --env OBSIDIAN_API_KEY="$(security find-generic-password -s obsidian_api -w)" \\
  --env OBSIDIAN_HOST=127.0.0.1 \\
  --env OBSIDIAN_PORT=27124`}</Code>
          <P>{`Once registered, a Claude Code session can ask the vault natural questions — "find every note tagged <code>#paper-to-read</code> not yet linked from <code>Reading Log</code>" — and the model picks the right MCP tool. The anti-pattern is exposing <code>delete_file</code> without a confirmation gate; both maintained servers handle this carefully, but a hand-rolled server probably won't. Read the server source before pointing one at a vault that contains anything private.`}</P>

          <H3>File-watcher daemons — launchd vs cron vs Watchdog vs fswatch</H3>
          <P>{`<strong>launchd</strong> is the macOS native scheduler (LaunchAgent or LaunchDaemon, plist-driven, run by <code>launchctl</code>). It wakes a sleeping laptop, has built-in stdout/stderr file logging, and handles missed intervals correctly. Prefer launchd over cron on macOS; the only reason to use cron on macOS is shell-portability with a Linux box.`}</P>
          <P>{`<strong>cron</strong> on Linux. Lighter than systemd timers but missing failure recovery. <strong>systemd-timer</strong> is the cron equivalent on modern Linux — gives you logs in <code>journalctl</code>, restart policies, dependency declarations.`}</P>
          <P>{`<strong>Watchdog</strong> is a Python library; <strong>fswatch</strong> is a cross-platform CLI. Both are useful when you need <em>sub-second latency</em> on a file change — but for vault workflows, "scan every 30 s" via launchd is almost always fine. The article-daemon in this workspace uses launchd specifically because it survives a closed laptop lid; fswatch would not.`}</P>
          <P>{`The article-daemon is the reference implementation. Its state machine, from <code>tests/test_state_machine.py</code>: a note moves <code>idea → draft → ready → generating → generated</code>, with <code>failed</code> as a branch off <em>any</em> state if Claude returns non-zero or times out. The <code>ready → generating</code> hop is the load-bearing one — atomic via <code>fcntl.flock(LOCK_EX)</code> so two scans in flight cannot double-process the same note. Three test invariants exercise the state machine: a <code>ready</code> note must flip to <code>generated</code> on success; a failing CLI invocation must flip the note to <code>failed</code> with the first 500 characters of stderr captured in <code>error-log</code>; a non-<code>ready</code> note must be left untouched. <code>run_claude</code> is monkeypatched in the tests so no real CLI is spawned.`}</P>

          <DataflowDiagram />
          <Cap>The full dataflow of the live workspace's article-daemon, with state transitions called out. The daemon does one thing — flip a note from ready to generating, spawn claude -p, and record the outcome. Phase 2's separate watcher handles publishing.</Cap>

          <H3>Scheduled Claude Code — cron, launchd, GitHub Actions</H3>
          <P>{`A scheduled Claude run (a "morning briefing", a weekly README refresh) has three viable triggers, each with different sleep / failure semantics.`}</P>
          <P>{`<strong>cron</strong> on Linux: simple, no sleep handling, no missed-interval recovery. <strong>launchd</strong> on macOS via <code>StartCalendarInterval</code>: handles closed lids; missed runs do execute when the laptop wakes (depending on settings). <strong>GitHub Actions</strong> via <code>schedule</code>: runs on GitHub's runners, survives every machine state including yours being off, but the agent only has access to repo files and whatever secrets you've configured. The workspace's <code>publish-to-hf.yml</code> is the worked example for the third option.`}</P>
          <SB title="When a scheduled run fails silently">{`Always have your scheduled agent write at least a placeholder note — even if the data fetch failed, write "ERROR: <reason>" to the briefing. A missing note is invisible; a present note with an explicit error message is debuggable.`}</SB>

          <H3>Claude Agent SDK — the programmatic layer</H3>
          <P>{`The Agent SDK (<code>github.com/anthropics/claude-agent-sdk-python</code>, also TypeScript) gives you programmatic access to the same loop the CLI runs. The Python entry point is <code>query()</code>: an async function that runs a prompt, streams events back, and exposes the same tool surface as the CLI. Subagents are invoked via the <code>Agent</code> tool, so <code>"Agent"</code> must be in <code>allowedTools</code> for the orchestrator to spawn them. An <code>AgentDefinition</code> dataclass gives each subagent its own description, system prompt, allowed tools, and (optionally) model.`}</P>
          <Code title="Python — vault-aware orchestrator with two subagents">{`from claude_agent_sdk import query, AgentOptions, AgentDefinition

VAULT = "/Users/you/Documents/Obsidian Vault"

reader = AgentDefinition(
    description="Reads notes under a vault subfolder; returns key claims.",
    prompt="You read Markdown only. Return claims as a JSON list.",
    tools=["Read"],
)
writer = AgentDefinition(
    description="Writes a draft synthesis to _draft.md in the same folder.",
    prompt="You write a 1,500-word draft citing every claim with a [[wikilink]].",
    tools=["Read", "Write"],
)

async def synthesise(folder: str):
    options = AgentOptions(
        cwd=f"{VAULT}/{folder}",
        agents={"reader": reader, "writer": writer},
        allowedTools=["Agent", "Read", "Write"],
    )
    async for event in query("Synthesise this folder.", options=options):
        print(event)`}</Code>
          <P>{`The pattern: the orchestrator decides; the subagents execute in isolated context windows so each can read tens of thousands of tokens of source notes without polluting the orchestrator's context. <code>allowedTools</code> on the orchestrator gates whether subagents can be spawned at all (<code>"Agent"</code> must be present); per-subagent <code>tools</code> on the <code>AgentDefinition</code> gates what each subagent can do once spawned.`}</P>
        </Sec>

        <Photograph
          src="https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=1600&q=80"
          alt="A terminal window on a dark screen with green text and a blinking cursor"
          caption="The agent's view of the vault. From here a folder of Markdown is just a tree of paths, and the only meaningful question is which ones to read first."
          credit="Goran Ivos / Unsplash"
          href="https://unsplash.com/photos/computer-monitor-displaying-text-T8LMM6XwHi8?utm_source=dsl&utm_medium=referral"
        />

        {/* =========================================================================
             PART 4 — Sync, mobile, publishing
             ========================================================================= */}

        <Sec n="4" title="Part 4 — Sync, mobile, publishing">
          <P>{`The vault wants to be in more than one place. The agent doesn't want to fight the sync tool when it gets there. The choices that follow have observable consequences for how often a Claude Code run finds itself rebasing on a conflict.`}</P>

          <H3>Obsidian Sync — the official, paid path</H3>
          <P>{`Obsidian Sync is a $8/month (annual) or $10/month (monthly) end-to-end encrypted sync service operated by the Obsidian team. Conflict resolution is per-line and last-writer-wins on the server. It is the smoothest mobile experience — installable via the App Store / Play Store, no third-party app required — and the model that produces the fewest mysterious conflict files. Pairs cleanly with Claude Code: the agent edits, Sync pushes, the phone receives.`}</P>

          <H3>iCloud — convenient, opaque</H3>
          <P>{`iCloud Drive holds the vault folder. On macOS / iOS this works out of the box; the cost is opacity. Conflicts surface as duplicate files with " (1)" appended to the filename. iCloud's sync is eventually-consistent in a way that doesn't compose well with a daemon — you can have a Claude Code agent write a file, the file appear locally, sync delay 30 seconds, then iCloud pull a stale version on top. The article-daemon in this workspace deliberately keeps the vault outside iCloud for this reason.`}</P>

          <H3>Dropbox / OneDrive / Google Drive</H3>
          <P>{`Same shape as iCloud, same caveat. Dropbox has a longer track record with Markdown vaults than the others.`}</P>

          <H3>Syncthing — peer-to-peer, no cloud</H3>
          <P>{`Open-source, self-hosted, no third-party server. Conflict files appear with a <code>.sync-conflict-YYYYMMDD-HHMMSS-DEVID</code> suffix in the filename. The pattern is unmistakable; a Claude Code chore that scans for <code>*-sync-conflict-*</code> and surfaces them in a maintenance note is two lines of shell. Pairs less cleanly with mobile (iOS Syncthing is third-party and intermittent) but the desktop experience is fast and explicit.`}</P>

          <H3>git + Obsidian Git plugin</H3>
          <P>{`The lowest-magic option. Vault under git, push and pull via the Obsidian Git plugin or via shell. Conflicts surface as merge conflicts in the file itself with <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code> markers — explicit, debuggable, and resolvable from the agent if you give it the right prompt. The cost is operational overhead (you maintain a remote, you handle pushes) and the gotcha is that <code>.obsidian/workspace.json</code> changes constantly, so gitignore it. This is the model the workspace itself uses for the <code>article-daemon</code>, <code>library</code>, and <code>library-articles</code> repos — but the <em>vault</em> in this workspace is on Obsidian Sync, not git, because the daemon is the one rewriting the vault and a per-edit commit would dwarf every other commit in the repo.`}</P>

          <Callout type="tip" title="Pick one sync, not two">
            {`Layering two sync mechanisms on the same vault is the most reliable way to corrupt it. iCloud + Syncthing on the same folder produces conflict storms that no amount of agent intelligence will untangle. If you need redundancy, snapshot to a separate location with <code>rclone</code> or <code>restic</code> rather than running two live syncs.`}
          </Callout>

          <H3>Obsidian mobile — what the agent cannot do</H3>
          <P>{`Claude Code does not run on iOS or Android. The CLI is a desktop process; the web sandbox at claude.ai/code is browser-accessible from a phone but operates on a remote sandbox, not the local vault. The practical pattern: a Claude Code instance on the desktop holds an MCP connection to the vault (via the Local REST API plugin); the human edits on mobile via Obsidian Sync; any agent action requires the desktop to be on (or a GitHub Actions / Hugging Face Space proxy in front of the agent). The phone is a viewer and a capture device, not an executor.`}</P>

          <H3>Obsidian Publish vs static-site alternatives</H3>
          <P>{`Obsidian Publish is the official $8/month hosted publishing surface — you mark notes as <code>publish: true</code> in frontmatter (or use the publish UI), the Publish service builds a hosted site at <code>publish.obsidian.md/&lt;site&gt;</code> with backlinks, search, custom CSS, and password protection. Beginner-friendly; no Node.js, no Git, no static-site generator to maintain.`}</P>
          <P>{`The alternative is the path this workspace uses. Quartz, Astro, or a hand-rolled static site generator builds Markdown into HTML; the result is hosted on a free static-site provider — Netlify, Cloudflare Pages, Hugging Face Spaces, GitHub Pages. The trade is direction: setup cost is higher (30–60 minutes for Quartz, longer for hand-rolled) but the result is fully owned, fully customisable, and free at the scales that matter. The workspace's <code>library-articles</code> repo is Quartz-style — JSX articles built by a Python <code>build.py</code> step and pushed to a Hugging Face static Space, with a Streamlit-based reader at a second Space rendering the markdown mirror.`}</P>
          <P>{`The Claude Code angle on this choice is sharp. Obsidian Publish has no agent surface — the publish step is manual, triggered from inside Obsidian, and there is no API to script it. A static-site pipeline like the workspace's exposes a clean automation seam: a launchd watcher picks up new <code>.jsx</code> files, runs the build, commits, pushes to Hugging Face. Claude Code never touches the publishing layer; it writes the JSX and the rest is plumbing. If you want the agent to publish, the static-site route is the only one that fits.`}</P>
        </Sec>

        <Photograph
          src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1600&q=80"
          alt="A multi-monitor developer workstation with code editors and a terminal"
          caption="Two screens of context, one of them dedicated to logs you only look at when something breaks. Sync in particular is the thing you only debug when it bites."
          credit="Christopher Gower / Unsplash"
          href="https://unsplash.com/photos/monitor-showing-text-m_HRfLhgABo?utm_source=dsl&utm_medium=referral"
        />

        {/* =========================================================================
             PART 5 — Advanced workflows
             ========================================================================= */}

        <Sec n="5" title="Part 5 — Advanced workflows">
          <P>{`Six patterns that scale from a single vault into a working operation. Each is a generalisation of something I've shipped or watched ship; the Tier-2 flag in the Source Integrity Note marks the ones that are described as patterns rather than running implementations.`}</P>

          <H3>The vault as a programming environment</H3>
          <P>{`Every note is a record. Every property is a column. Dataview is the query layer. The Claude Code orchestrator is the procedural layer that mutates rows on conditions. Once you cross this threshold mentally — once "a note about diffusion" becomes "a row in a table of concept notes" — the operations you run against the vault stop being one-off and start being declarative. <em>Find every concept note whose <code>last-reviewed</code> is more than 30 days ago. Pick three. Write a quiz.</em>`}</P>

          <H3>The data-science notebook pattern</H3>
          <P>{`One note per experiment. Frontmatter carries hyperparameters, dataset version, hold-out metric. Body carries the narrative: what was tried, why, what surprised. A Dataview block in <code>Experiments/_leaderboard.md</code> rolls up the table and sorts by metric. When the hyperparameters change, the row in the leaderboard changes — no separate spreadsheet to maintain. A Claude Code skill (<code>summarise-experiment</code>) can promote a successful experiment note into a section of the project README.`}</P>
          <Code title="frontmatter on an experiment note">{`---
experiment-id: xgb-feature-set-3
dataset: trades-2026
auc: 0.927
holdout-metric: time-decay-auc
hyperparams:
  n-estimators: 800
  max-depth: 6
  learning-rate: 0.03
status: complete
---`}</Code>

          <H3>The literature-review pattern</H3>
          <P>{`Bibliography exported from Zotero as BibTeX. Citations plugin reads it and creates one note per paper, named by citekey. Each paper note's body is the abstract, the highlights you imported via Annotator, and a few hand-written paragraphs. A Claude Code skill walks <code>Literature/&lt;subject&gt;/</code>, reads every note, and drafts a 2,500-word survey with in-text citations as <code>[@citekey]</code> — the format the Citations plugin's hover preview expects. The draft cites every paper note by wikilink, so reviewing the draft inside Obsidian opens the source paper notes in a single click.`}</P>

          <H3>The long-project pattern</H3>
          <P>{`Spec → plan → execution → retrospective, all in one vault folder. A Claude Code agent reads the spec and writes the plan (one subagent). The plan is a <code>- [ ]</code> list with each item linked to the file it will touch. A second agent picks up tasks, executes them, ticks the checkbox, links to the resulting commit. A third agent at the end reads the spec, plan, and execution log together and writes a retrospective. Each agent has a different system prompt; each runs in its own context window; the vault is the shared state.`}</P>

          <H3>Meeting notes → issue, with the full hook</H3>
          <P>{`Today's daily note (created by Periodic Notes) contains the live transcript of the meeting plus a scatter of <code>- [ ]</code> task lines. The <code>Stop</code> hook in <code>~/.claude/settings.json</code> fires when Claude finishes responding. The handler reads <code>Daily/$(date +%F).md</code>, extracts every unchecked task whose body starts with <code>issue:</code>, calls <code>gh issue create</code>, and appends the issue number back into the line for idempotency.`}</P>
          <Code title="~/.claude/hooks/file_meeting_tasks.py — full handler">{`#!/usr/bin/env python3
import datetime, json, re, subprocess, sys
from pathlib import Path

VAULT = Path("/Users/you/Documents/Obsidian Vault")
today = datetime.date.today().isoformat()
note = VAULT / "Daily" / f"{today}.md"
if not note.is_file():
    sys.exit(0)

text = note.read_text(encoding="utf-8")
out = []
for line in text.splitlines():
    m = re.match(r"^- \\[ \\] issue: (.+?)\\s*$", line)
    if m and "(gh#" not in line:
        title = m.group(1)
        result = subprocess.run(
            ["gh", "issue", "create", "--title", title,
             "--body", f"Created from {note.relative_to(VAULT)}"],
            capture_output=True, text=True,
        )
        url = (result.stdout or "").strip()
        if "/issues/" in url:
            num = url.rsplit("/", 1)[-1]
            line = f"- [ ] (gh#{num}) issue: {title}"
    out.append(line)
note.write_text("\\n".join(out), encoding="utf-8")
sys.exit(0)`}</Code>
          <P>{`The idempotency guard — <code>"(gh#" not in line</code> — is the bit that lets the hook fire safely on every <code>Stop</code>. The first run creates an issue and rewrites the line; subsequent runs skip the line because the guard string is now present.`}</P>

          <H3>The reading queue pattern</H3>
          <P>{`Every paper note has a <code>status</code> property: <code>queued</code>, <code>reading</code>, <code>summarised</code>, <code>cited</code>. A daily Claude Code sweep promotes the oldest <code>queued</code> paper to <code>reading</code>, fetches the abstract from arXiv (via a web tool), and appends a question to the paper note: <em>"What is this paper's central claim?"</em> When the human answers in the body and flips status to <code>summarised</code>, a follow-up sweep adds the paper to the running survey draft. The agent is an opinionated reading partner, not a reader replacement — it queues, it asks, but the human reads.`}</P>

          <H3>The morning-briefing pattern</H3>
          <P>{`A scheduled launchd job runs <code>claude -p "/morning-briefing"</code> at 07:00. The skill is a single Markdown file under <code>~/.claude/skills/morning-briefing/SKILL.md</code>. It runs <code>git log --since=yesterday</code> across a known list of repos, queries <code>gh pr list --search "review-requested:@me"</code>, reads the latest row of an experiments CSV, and writes the synthesis to <code>00-dashboard.md</code> in the vault. Open Obsidian with your coffee; the dashboard is already there. Two design rules: write a placeholder note even when a data fetch fails (so the missing section is visible), and keep the agent away from any expensive computation in this loop (the briefing is a readout of state, not a computation).`}</P>
        </Sec>

        <Photograph
          src="https://images.unsplash.com/photo-1499914485622-a88fac536970?w=1600&q=80"
          alt="A whiteboard covered in handwritten plan notes and arrows"
          caption="The plan-first pattern, rendered honestly. The vault is just a clean version of the whiteboard, with link rewrites on rename."
          credit="Med Badr Chemmaoui / Unsplash"
          href="https://unsplash.com/photos/persons-handwriting-on-a-whiteboard-ZSPBhokqDMc?utm_source=dsl&utm_medium=referral"
        />

        {/* =========================================================================
             PART 6 — Failure modes
             ========================================================================= */}

        <Sec n="6" title="Part 6 — Failure modes, anti-patterns, scaling">
          <P>{`Everything above scales for a while and then doesn't. The failure modes below are the ones I have hit on a vault that started under 100 notes and is now somewhere north of 4,000.`}</P>

          <H3>Vault race conditions</H3>
          <P>{`A daemon and a human typing in Obsidian both want to write the same file. Without a lock, the agent's write can overwrite a sentence the human typed in the half-second between scan and write. The article-daemon's <code>fcntl.flock(LOCK_EX)</code> on the note file solves the daemon-vs-daemon race; it does not solve the daemon-vs-Obsidian race. The mitigation: the agent only writes notes whose <code>status</code> frontmatter says it owns them. <code>status: ready</code> means "human handed off, agent owns until generated." Any change to status while the agent owns the note (a human flipping back to <code>draft</code>) is detected on the next scan and the agent abandons the claim. <code>workspace.json</code> contention is a different beast — never under git, never under sync if you can help it.`}</P>

          <H3>Sync conflicts and the <code>-conflict-</code> filename pattern</H3>
          <P>{`Three filename suffixes you'll see across the sync ecosystem: iCloud writes <code>foo (1).md</code>; Syncthing writes <code>foo.sync-conflict-20260424-091203-DEVID.md</code>; Obsidian Sync resolves at the line level and rarely produces a conflict file. A weekly Claude Code chore: glob for any of the three patterns, surface them in <code>Maintenance/conflicts.md</code> as a <code>- [ ]</code> list with a one-line diff per conflict, and let the human resolve. Don't have the agent auto-resolve conflicts — the failure mode where the agent picks the wrong side of a conflict and silently deletes a paragraph the human wrote is worse than the inconvenience of resolving manually.`}</P>

          <H3>Memory drift — vault truth vs CLAUDE.md truth</H3>
          <P>{`Claude Code's four-tier memory hierarchy (user-scope <code>~/.claude/CLAUDE.md</code>, project root, subdirectory, gitignored <code>CLAUDE.local.md</code>) and the vault are parallel knowledge stores with different shapes. The rule that holds up: <em>the vault is the source of truth for things the human reads; <code>CLAUDE.md</code> is the source of truth for things the agent reads.</em> When a fact belongs in both, write it once and import. CLAUDE.md supports an <code>@path/to/file</code> import syntax — use it.`}</P>

          <MemoryVsVault />
          <Cap>Where each kind of memory lives. The boundary that matters most is the horizontal one: ephemeral memory (current session, shell history, workspace.json) gets you nowhere if the agent crashes; durable memory (vault, git, CLAUDE.md) is where long-term truth lives.</Cap>

          <H3>Token cost and pagination as the vault grows</H3>
          <P>{`A naive prompt of "read every note" is fine at 100 notes and ruinous at 10,000. Two mitigations. First, prefer Dataview's index over a raw read — a DQL query returns names + frontmatter without slurping bodies. Second, make MCP tool calls paginated. <code>list_files_in_vault</code> with no pagination on a 10k-note vault returns 10k paths and consumes a chunk of context window; <code>list_files_in_dir</code> scoped to one folder with the actual question in mind is the disciplined pattern. The article-daemon uses neither MCP nor Dataview — it walks <code>os.walk</code> with a skip-list (<code>.obsidian</code>, <code>.trash</code>, <code>.git</code>, <code>Templates</code>, <code>_archive</code>) and only opens files whose first line is YAML. Cheap by construction.`}</P>

          <H3>Privacy — which plugins phone home</H3>
          <P>{`Smart Connections defaults to a local embedding model and the data does not leave the device. The Copilot plugin and Text Generator default to remote APIs (OpenAI, Anthropic, Google) — your notes are sent in API requests, subject to whichever provider's retention policy applies. Claude Code itself, when configured against the Anthropic API, sends prompts to Anthropic's servers; the same applies to MCP servers that wrap external services. The defensive pattern: keep a <code>.private/</code> directory excluded from the vault's plugin enables, gitignored, and skipped by the daemon's walk. Anything in there sees neither plugins nor agents.`}</P>

          <H3>Scaling past 10,000 notes</H3>
          <P>{`Obsidian's open performance benchmark sits well past 10,000 notes — the Graph view is the first surface to slow, then global text search. Strategies: shard the vault into separate vaults if the topical separation is clean (a Reading vault and a Notes vault, separately backed up); index outside Obsidian (a sidecar SQLite database refreshed nightly by a Claude Code skill, queryable by MCP); or move the brute-force search workload to <code>ripgrep</code> instead of Obsidian's built-in. None of these is a generic answer; the right fix depends on which surface is the actual bottleneck.`}</P>

          <H3>Multi-repo coherence — the mirror problem</H3>
          <P>{`<code>~/.claude/skills/</code> at user scope is the single source of truth for a skill. Repo-committed mirrors at <code>.claude/skills/</code> let Claude Code for web see the skill. The mirror is one-way and the workspace ships a <code>sync-skills.sh</code> script to enforce that direction. The failure mode is editing the mirror in a hurry, forgetting it's a mirror, and watching the user-scope copy quietly diverge. Discipline: never edit the mirror; always edit user-scope; always sync after editing. CI can guard this — a workflow check that diffs <code>.claude/skills/</code> against the user-scope copy if the host has access — but in practice the cleanest discipline is the one-way script and a habit of running it before every commit.`}</P>
        </Sec>

        <Photograph
          src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1600&q=80"
          alt="A research scientist at a desk reviewing notes and writing on a laptop"
          caption="The reading queue, the long project, the morning briefing — all of them are the same shape underneath. A note is a row, a property is a column, and an agent is the thing that runs the procedure."
          credit="Mimi Thian / Unsplash"
          href="https://unsplash.com/photos/woman-using-MacBook-Pro-vdXMSiX-n6M?utm_source=dsl&utm_medium=referral"
        />

        {/* =========================================================================
             CLOSING
             ========================================================================= */}

        <Sec n="" title="Closing — two truths held together">
          <P>{`The integration is just two truths held together. An Obsidian vault is a filesystem of Markdown — a folder of plain text that any process with the right path can read or write. Claude Code is a tool-using agent on that filesystem — a process with hooks, skills, MCP, and an SDK that decides which paths to read and which paths to write. Everything in this reference — every plugin, every hook event, every MCP server, every state machine — is a naming convention layered on top of those two truths.`}</P>
          <PQ>{`Build for the seam, not the surface. The vault changes; the agent changes; the file system underneath does not.`}</PQ>
        </Sec>

        {/* =========================================================================
             SOURCE INTEGRITY NOTE
             ========================================================================= */}

        <Sec n="" title="Source Integrity Note">
          <P>{`This article follows the Three-Tier evidence rule. Tier 1 claims are verified against a web source or a file in the live workspace. Tier 2 claims are composites — generalisations of one concrete implementation into a described pattern — and are flagged below. Tier 3 (invented) is prohibited. Plugin maintenance status was verified against each project's GitHub repository on 2026-04-24.`}</P>

          <SB title="Web sources consulted">{`<ul>
  <li>Claude Code hooks reference — <code>https://code.claude.com/docs/en/hooks</code> (event names, JSON config, exit codes, async handlers)</li>
  <li>Claude Code skills — <code>https://code.claude.com/docs/en/skills</code> and <code>platform.claude.com/docs/en/agents-and-tools/agent-skills/overview</code> (frontmatter shape, name + description constraints, allowed-tools, disable-model-invocation)</li>
  <li>Skill authoring best practices — <code>platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices</code></li>
  <li>Anthropic skills repo — <code>github.com/anthropics/skills</code></li>
  <li>Claude Agent SDK overview — <code>platform.claude.com/docs/en/agent-sdk/overview</code></li>
  <li>Claude Agent SDK Python — <code>github.com/anthropics/claude-agent-sdk-python</code> and <code>platform.claude.com/docs/en/agent-sdk/python</code> (query, AgentDefinition, allowedTools, subagents)</li>
  <li>Claude Agent SDK subagents — <code>platform.claude.com/docs/en/agent-sdk/subagents</code> (Agent tool requirement, per-subagent tool gating)</li>
  <li>Claude Code subagents — <code>code.claude.com/docs/en/sub-agents</code></li>
  <li>Model Context Protocol spec — <code>modelcontextprotocol.io/specification/2025-11-25</code> (JSON-RPC 2.0; stdio transport; Streamable HTTP transport with optional SSE)</li>
  <li>MCP transports — <code>modelcontextprotocol.io/specification/2025-11-25/basic/transports</code></li>
  <li><code>MarkusPfundstein/mcp-obsidian</code> — <code>github.com/MarkusPfundstein/mcp-obsidian</code> (tool list verified 2026-04-24: list_files_in_vault, list_files_in_dir, get_file_contents, search, patch_content, append_content, delete_file)</li>
  <li><code>cyanheads/obsidian-mcp-server</code> — <code>github.com/cyanheads/obsidian-mcp-server</code> (Local REST API bridge; in-memory cache; OBSIDIAN_API_KEY config)</li>
  <li>Obsidian Local REST API plugin — <code>github.com/coddingtonbear/obsidian-local-rest-api</code> (default ports 27124 HTTPS / 27123 HTTP)</li>
  <li>Obsidian Properties — <code>help.obsidian.md/properties</code> (native types; reserved tags / aliases / cssclasses keys)</li>
  <li>Obsidian Search operators — <code>help.obsidian.md/Plugins/Search</code> (file:, path:, tag:, line:, block:, section:)</li>
  <li>JSON Canvas spec — <code>jsoncanvas.org</code> and <code>github.com/obsidianmd/jsoncanvas</code> (open spec v1.0; nodes + edges schema; text/file/link/group node types)</li>
  <li>Obsidian Publish — <code>obsidian.md/publish</code> ($8/mo annual; password protection; custom CSS; selective publishing)</li>
  <li>Dataview — <code>github.com/blacksmithgu/obsidian-dataview</code> + <code>blacksmithgu.github.io/obsidian-dataview</code> (DQL + DataviewJS; community-maintained; transitioned from blacksmithgu)</li>
  <li>Templater — <code>github.com/SilentVoid13/Templater</code> + <code>silentvoid13.github.io/Templater</code> (tp.user user scripts; CommonJS modules; latest 2.19.x April 2026)</li>
  <li>QuickAdd — <code>github.com/chhoumann/quickadd</code></li>
  <li>Obsidian Git — <code>github.com/Vinzent03/obsidian-git</code> (latest 2.38.2 April 2026)</li>
  <li>Periodic Notes — <code>github.com/liamcain/obsidian-periodic-notes</code></li>
  <li>Calendar — <code>github.com/liamcain/obsidian-calendar-plugin</code></li>
  <li>Tasks — <code>github.com/obsidian-tasks-group/obsidian-tasks</code> (originally Martin Schenck; maintained by Clare Macrae since May 2022)</li>
  <li>Kanban — <code>github.com/mgmeyers/obsidian-kanban</code> (mgmeyers seeking new maintainers as of 2026-04-24)</li>
  <li>Excalidraw — <code>github.com/zsviczian/obsidian-excalidraw-plugin</code> (latest 2.22.0 April 2026)</li>
  <li>Admonitions — <code>github.com/valentine195/obsidian-admonition</code> (Javalent)</li>
  <li>Natural Language Dates — <code>github.com/argenos/nldates-obsidian</code></li>
  <li>Advanced Tables — <code>github.com/tgrosinger/advanced-tables-obsidian</code></li>
  <li>Citations — <code>github.com/hans/obsidian-citation-plugin</code> (BibTeX/CSL-JSON)</li>
  <li>Mind Map — last release 1.1.0 several years ago; flagged as likely abandoned 2026-04-24</li>
  <li>Smart Connections — <code>github.com/brianpetro/obsidian-smart-connections</code> (local embeddings default; remote optional)</li>
  <li>Copilot plugin — <code>github.com/logancyang/obsidian-copilot</code> (multi-provider in-vault chat)</li>
  <li>Obsidian Projects — <code>github.com/marcusolsson/obsidian-projects</code> (discontinued 2025-05-12 by original author; Projects Plus community fork continues)</li>
  <li>Obsidian Sync vs alternatives — <code>obsidian.md/publish</code>, <code>help.obsidian.md/sync/troubleshoot</code>, Syncthing forum threads on <code>.sync-conflict-</code> filename pattern</li>
  <li>Quartz / static-site comparison — community summaries (e.g. unmarkdown.com Obsidian-Publish-alternatives) of the Quartz vs Publish trade-offs</li>
</ul>`}</SB>

          <SB title="Workspace files read">{`<ul>
  <li><code>____p-library/CLAUDE.md</code> — pipeline conventions, skill-mirror rule, JSX hard requirements</li>
  <li><code>____p-library/AUTOMATION.md</code> — three-workflow operator guide; Workflow 1 / 2 / 3 install + daily op + troubleshooting</li>
  <li><code>____p-library/article-daemon/daemon.py</code> — live daemon source (run_claude, _claim_note, process_note, run_once, SKIP_DIR_NAMES)</li>
  <li><code>____p-library/article-daemon/README.md</code> — state machine, frontmatter schema, env vars, scope boundaries</li>
  <li><code>____p-library/article-daemon/tests/test_state_machine.py</code> — three test invariants (success-flips-to-generated; failure-flips-to-failed-with-error-log; non-ready-untouched)</li>
  <li><code>____p-library/library-articles/.claude/CLAUDE.md</code> — library-articles project context (vendored runtime; PWA layer; build pipeline)</li>
  <li><code>____p-library/library-articles/.claude/skills/shared-article-jsx-reference.md</code> — JSX component contract (short component names; recognised style/category tokens)</li>
  <li><code>____p-library/library-articles/articles/obsidian-and-claude-code.jsx</code> — the companion article whose ten use cases this reference does NOT repeat</li>
  <li><code>____p-library/library-articles/articles/ebm-definitive-guide.jsx</code> — scaffold reference (palette, fonts, Sec/P/NB/Code patterns)</li>
</ul>`}</SB>

          <SB title="Tier-2 composites flagged">{`<ul>
  <li>§3 Hook examples — the nine vault-facing hook examples are illustrative patterns. Each maps to one of Claude Code's documented hook events but the specific handlers are not all running in this workspace.</li>
  <li>§3 Agent SDK orchestrator code — the two-subagent synthesise example is a working pattern, not the workspace's own code.</li>
  <li>§5 Long-project pattern — described as a generalisation. The workspace runs spec → plan → execution flows but with article-specific subagents, not the generic three-stage subagent pipeline described.</li>
  <li>§5 Reading-queue pattern — a Tier-2 generalisation of the article-daemon's status state machine; no published reading-queue daemon in this workspace yet.</li>
  <li>§5 Morning-briefing pattern — illustrative. The workspace runs launchd-driven agents but the 07:00 dashboard agent described is a reference implementation.</li>
  <li>§5 Meeting-notes Stop-hook handler — the Python handler is reference code, not a published package; adapt paths and the gh issue body before running.</li>
  <li>§6 Multi-repo coherence — the workspace's sync-skills.sh exists; the CI guard described as a possibility does not.</li>
</ul>`}</SB>

          <SB title="Plugins verified currently maintained (2026-04-24)">{`<ul>
  <li>Dataview — <code>github.com/blacksmithgu/obsidian-dataview</code> (community-maintained; recent releases under same repo)</li>
  <li>Templater — <code>github.com/SilentVoid13/Templater</code> (latest 2.19.3, days old)</li>
  <li>Obsidian Git — <code>github.com/Vinzent03/obsidian-git</code> (latest 2.38.2, days old)</li>
  <li>Excalidraw — <code>github.com/zsviczian/obsidian-excalidraw-plugin</code> (latest 2.22.0, weeks old)</li>
  <li>Tasks — <code>github.com/obsidian-tasks-group/obsidian-tasks</code> (Clare Macrae actively maintaining)</li>
  <li>Periodic Notes — <code>github.com/liamcain/obsidian-periodic-notes</code> (active)</li>
  <li>Calendar — <code>github.com/liamcain/obsidian-calendar-plugin</code> (active)</li>
  <li>QuickAdd — <code>github.com/chhoumann/quickadd</code> (active)</li>
  <li>Smart Connections — <code>github.com/brianpetro/obsidian-smart-connections</code> (active)</li>
  <li>Copilot plugin — <code>github.com/logancyang/obsidian-copilot</code> (active)</li>
  <li>Obsidian Citation — <code>github.com/hans/obsidian-citation-plugin</code> (active)</li>
  <li>Local REST API — <code>github.com/coddingtonbear/obsidian-local-rest-api</code> (active)</li>
  <li>Advanced Tables — <code>github.com/tgrosinger/advanced-tables-obsidian</code> (active)</li>
  <li>Natural Language Dates — <code>github.com/argenos/nldates-obsidian</code> (active)</li>
  <li>Admonitions — <code>github.com/valentine195/obsidian-admonition</code> (active under Javalent banner)</li>
</ul>`}</SB>

          <SB title="Plugins flagged with maintenance concerns (2026-04-24)">{`<ul>
  <li>Kanban (<code>github.com/mgmeyers/obsidian-kanban</code>) — Matthew Meyers publicly seeking new maintainers; works today, watch list for tomorrow.</li>
  <li>Mind Map (<code>obsidianstats.com/plugins/obsidian-mind-map</code>) — last release 1.1.0 several years ago; consider Canvas as the modern alternative.</li>
  <li>Obsidian Projects (<code>github.com/marcusolsson/obsidian-projects</code>) — discontinued by Marcus Olsson on 2025-05-12; Projects Plus community fork continues.</li>
  <li>Text Generator (<code>nhaouari/text-generator-plugin</code>) — broader scope than Copilot, less active updates relative to Copilot or Smart Connections; included as a category-relevant option, not a recommendation.</li>
</ul>`}</SB>

          <SB title="Reference implementations — not published packages">{`<ul>
  <li>§3 Stop-hook JSON config and meeting-task Python handler — adapt paths and environment to your machine before running.</li>
  <li>§3 Agent SDK two-subagent synthesise example — illustrative orchestrator; not a runnable package.</li>
  <li>§5 morning-briefing skill — described shape, not a shipping skill in this workspace.</li>
  <li>The minimal MCP server snippet is intentionally NOT included in this article (the companion <code>obsidian-and-claude-code.jsx</code> already labels its sketch as reference-only). For production, use <code>MarkusPfundstein/mcp-obsidian</code> or <code>cyanheads/obsidian-mcp-server</code>.</li>
</ul>`}</SB>
        </Sec>
      </div>
    </article>
  );
}
