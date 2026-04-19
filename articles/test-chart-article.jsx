const ARTICLE_DATA = {
  title: "A Visual Guide to Exponential Decay",
  subtitle: "Why everything fades, and how fast — a short tour of the simplest half-life you'll ever meet.",
  date: "2026-04-20",
  tags: ["statistics", "visualisation", "test"],
  read_time: "3 min",
  category: "statistics",
  style: "technical-ds",
};

export default function TestChartArticle() {
  const data = React.useMemo(() => {
    const pts = [];
    for (let x = 0; x <= 20; x += 0.25) {
      pts.push({ x: Number(x.toFixed(2)), y: Math.exp(-0.2 * x) });
    }
    return pts;
  }, []);

  const serif = "'Source Serif 4', Georgia, serif";
  const display = "'Playfair Display', Georgia, serif";

  return (
    <article style={{ color: "#1a1a1a", fontFamily: serif }}>
      {/* Hero */}
      <header style={{ marginBottom: "2rem" }}>
        <div
          style={{
            fontFamily: "'Source Sans 3', system-ui, sans-serif",
            fontSize: "0.8rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#7c4dff",
            fontWeight: 600,
            marginBottom: "0.75rem",
          }}
        >
          Statistics &middot; Technical DS
        </div>
        <h1
          style={{
            fontFamily: display,
            fontSize: "2.8rem",
            lineHeight: 1.1,
            fontWeight: 700,
            margin: "0 0 0.6rem",
            letterSpacing: "-0.015em",
          }}
        >
          A Visual Guide to Exponential Decay
        </h1>
        <p
          style={{
            fontFamily: serif,
            fontSize: "1.2rem",
            lineHeight: 1.5,
            color: "#555",
            margin: 0,
            fontStyle: "italic",
          }}
        >
          Why everything fades, and how fast — a short tour of the simplest
          half-life you'll ever meet.
        </p>
      </header>

      {/* Opening paragraph */}
      <p style={{ fontSize: "1.05rem", lineHeight: 1.75 }}>
        Exponential decay is the quiet workhorse of applied statistics. From
        radioactive atoms to forgotten vocabulary, from cooling coffee to
        decaying customer retention, the same small differential equation
        shows up again and again: the rate of change is proportional to what
        remains. Solve it and you get{" "}
        <code style={{ background: "#f4f1ea", padding: "1px 6px", borderRadius: 4 }}>
          y = e<sup>&ndash;&lambda;x</sup>
        </code>
        . The plot below uses &lambda; = 0.2 — a gentle, half-life of roughly
        3.5 units.
      </p>

      {/* Chart */}
      <figure style={{ margin: "2rem 0", padding: "1.25rem", background: "#fff", border: "1px solid #e5e2d9", borderRadius: 12 }}>
        <figcaption
          style={{
            fontFamily: "'Source Sans 3', system-ui, sans-serif",
            fontSize: "0.85rem",
            color: "#666",
            marginBottom: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          y = exp(&minus;0.2 &middot; x), &nbsp; x &isin; [0, 20]
        </figcaption>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
            <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
            <XAxis
              dataKey="x"
              type="number"
              domain={[0, 20]}
              tick={{ fill: "#666", fontSize: 12 }}
              label={{ value: "x", position: "insideBottomRight", offset: -5, fill: "#666" }}
            />
            <YAxis
              tick={{ fill: "#666", fontSize: 12 }}
              domain={[0, 1]}
              label={{ value: "y", angle: -90, position: "insideLeft", fill: "#666" }}
            />
            <Tooltip
              formatter={(v) => Number(v).toFixed(4)}
              contentStyle={{ fontFamily: serif, fontSize: "0.85rem" }}
            />
            <Line
              type="monotone"
              dataKey="y"
              stroke="#7c4dff"
              strokeWidth={2.5}
              dot={false}
            />
            <ReferenceLine
              y={0.5}
              stroke="#aaa"
              strokeDasharray="4 4"
              label={{ value: "half-life", fill: "#888", position: "insideTopRight", fontSize: 11 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </figure>

      {/* Pull quote */}
      <blockquote
        style={{
          fontFamily: display,
          fontStyle: "italic",
          fontSize: "1.4rem",
          lineHeight: 1.4,
          color: "#333",
          borderLeft: "3px solid #7c4dff",
          margin: "2rem 0",
          padding: "0.2rem 0 0.2rem 1.4rem",
        }}
      >
        "Everything decays — what matters is the constant."
      </blockquote>

      {/* Closing */}
      <p style={{ fontSize: "1.05rem", lineHeight: 1.75 }}>
        The curve above never quite reaches zero, which is both
        mathematically inconvenient and practically useful. It means a
        tiny residual trace survives indefinitely — the same property that
        lets carbon dating reach back tens of thousands of years. Shift
        &lambda;, and you shift the timescale: double it and the half-life
        halves. It is the single parameter that separates a breath of
        perfume from a Roman villa's wall paint.
      </p>

      <p
        style={{
          fontFamily: "'Source Sans 3', system-ui, sans-serif",
          fontSize: "0.85rem",
          color: "#999",
          marginTop: "3rem",
          paddingTop: "1rem",
          borderTop: "1px solid #e5e2d9",
        }}
      >
        Test article &middot; rendered via Babel Standalone + Recharts UMD.
      </p>
    </article>
  );
}
