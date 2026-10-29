/**
 * SVG kit for the Technical docs diagrams. Same visual language as the other
 * docs diagrams (token fills and strokes, muted arrows) so they read as one
 * family in light and dark.
 *
 * Conventions every diagram follows, so a reader learns them once:
 *   solid blue  = a core component of the system
 *   green       = an outcome, or the point where a person decides
 *   red         = a security control, a risk, or something not built yet
 *   dashed      = optional, indirect, or not built
 */

export type Tone = "default" | "primary" | "success" | "danger";

const TONES: Record<Tone, { fill: string; stroke: string; width: number }> = {
  default: { fill: "var(--card)", stroke: "var(--border)", width: 1.2 },
  primary: { fill: "color-mix(in oklch, var(--primary) 9%, var(--card))", stroke: "var(--primary)", width: 1.6 },
  success: { fill: "color-mix(in oklch, var(--success) 14%, var(--card))", stroke: "var(--success)", width: 1.5 },
  danger: { fill: "color-mix(in oklch, var(--destructive) 8%, var(--card))", stroke: "var(--destructive)", width: 1.5 },
};

/** The figure background, used as a halo so labels stay legible over lines. */
const HALO = "color-mix(in oklch, var(--canvas) 35%, var(--background))";

/** Approximate glyph width as a fraction of font size for UI sans-serif text. */
const GLYPH = 0.56;

/** Shrink a font size just enough for `text` to fit `width`, never below `min`. */
function fit(text: string, base: number, width: number, min: number): number {
  const needed = text.length * base * GLYPH;
  return needed <= width ? base : Math.max(min, (base * width) / needed);
}

/** Root <svg> with the shared arrow marker and an optional legend. */
export function Diagram({
  width,
  height,
  minWidth = 680,
  legend = false,
  children,
}: {
  width: number;
  height: number;
  minWidth?: number;
  /** Adds a one-line key for the colour and dash conventions. */
  legend?: boolean;
  children: React.ReactNode;
}) {
  const legendHeight = legend ? 34 : 0;
  const items: { label: string; tone: Tone; dashed?: boolean }[] = [
    { label: "Core component", tone: "primary" },
    { label: "Outcome or decision", tone: "success" },
    { label: "Security control or gap", tone: "danger" },
    { label: "Optional or not built", tone: "default", dashed: true },
  ];
  return (
    <svg
      viewBox={`0 0 ${width} ${height + legendHeight}`}
      className="block h-auto w-full"
      style={{ minWidth }}
      role="img"
    >
      <defs>
        <marker id="td-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted-foreground)" />
        </marker>
      </defs>
      {children}
      {legend ? (
        <g transform={`translate(10 ${height + 6})`}>
          {items.map((item, i) => {
            const t = TONES[item.tone];
            return (
              <g key={item.label} transform={`translate(${i * 215} 0)`}>
                <rect width={20} height={14} rx={4} fill={t.fill} stroke={t.stroke} strokeWidth={1.3} strokeDasharray={item.dashed ? "3 2" : undefined} />
                <text x={28} y={11} fontSize="11.5" fill="var(--muted-foreground)">
                  {item.label}
                </text>
              </g>
            );
          })}
        </g>
      ) : null}
    </svg>
  );
}

/** A labelled box. `sub` is one line or several. */
export function Node({
  x,
  y,
  w,
  h,
  title,
  sub,
  tone = "default",
  dashed = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string | string[];
  tone?: Tone;
  dashed?: boolean;
}) {
  const t = TONES[tone];
  const lines = sub ? (Array.isArray(sub) ? sub : [sub]) : [];
  const inner = w - 18;
  const titleSize = fit(title, 15, inner, 12);
  const block = titleSize + 4 + lines.length * 15;
  const top = y + (h - block) / 2 + titleSize * 0.82;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={9}
        fill={t.fill}
        stroke={t.stroke}
        strokeWidth={t.width}
        strokeDasharray={dashed ? "5 4" : undefined}
      />
      <text x={x + w / 2} y={top} textAnchor="middle" fontSize={titleSize} fontWeight="600" fill="var(--foreground)">
        {title}
      </text>
      {lines.map((line, i) => (
        <text
          key={line}
          x={x + w / 2}
          y={top + 4 + (i + 1) * 15}
          textAnchor="middle"
          fontSize={fit(line, 12.5, inner, 10)}
          fill="var(--muted-foreground)"
        >
          {line}
        </text>
      ))}
    </g>
  );
}

/** A tinted zone: a trust boundary, a plane, a host. */
export function Group({
  x,
  y,
  w,
  h,
  label,
  tone = "default",
  dashed = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  tone?: Tone;
  dashed?: boolean;
}) {
  const fill =
    tone === "primary"
      ? "color-mix(in oklch, var(--primary) 5%, transparent)"
      : tone === "danger"
        ? "color-mix(in oklch, var(--destructive) 5%, transparent)"
        : tone === "success"
          ? "color-mix(in oklch, var(--success) 6%, transparent)"
          : "color-mix(in oklch, var(--muted) 35%, transparent)";
  const stroke =
    tone === "primary"
      ? "color-mix(in oklch, var(--primary) 45%, var(--border))"
      : tone === "danger"
        ? "color-mix(in oklch, var(--destructive) 45%, var(--border))"
        : tone === "success"
          ? "color-mix(in oklch, var(--success) 45%, var(--border))"
          : "var(--border)";
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={14} fill={fill} stroke={stroke} strokeWidth={1.2} strokeDasharray={dashed ? "6 4" : undefined} />
      <text x={x + 16} y={y + 22} fontSize="11.5" fontWeight="600" letterSpacing="0.09em" fill="var(--muted-foreground)">
        {label}
      </text>
    </g>
  );
}

/** A compact tag, for module names and similar short items. */
export function Chip({
  x,
  y,
  w,
  h = 28,
  label,
  tone = "default",
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  label: string;
  tone?: Tone;
}) {
  const t = TONES[tone];
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={7} fill={t.fill} stroke={t.stroke} strokeWidth={1} />
      <text x={x + w / 2} y={y + h / 2 + 4.2} textAnchor="middle" fontSize={fit(label, 12.5, w - 12, 10)} fill="var(--foreground)">
        {label}
      </text>
    </g>
  );
}

/** Free text. A halo keeps it readable where it crosses a line. */
export function Label({
  x,
  y,
  children,
  anchor = "middle",
  size = 11,
  strong = false,
  tone,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: "start" | "middle" | "end";
  size?: number;
  strong?: boolean;
  tone?: "primary";
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size * 1.14}
      fontWeight={strong ? 600 : 400}
      fill={tone === "primary" ? "var(--primary)" : "var(--muted-foreground)"}
      stroke={HALO}
      strokeWidth={4}
      paintOrder="stroke"
      strokeLinejoin="round"
    >
      {children}
    </text>
  );
}

/** A numbered step marker, for flows that read in order. */
export function Step({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={11} fill="var(--primary)" />
      <text x={x} y={y + 4.5} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--primary-foreground)">
        {n}
      </text>
    </g>
  );
}

/** An arrow along an SVG path. */
export function Arrow({
  d,
  dashed = false,
  both = false,
  plain = false,
}: {
  d: string;
  dashed?: boolean;
  both?: boolean;
  /** No arrowhead — for buses and joins. */
  plain?: boolean;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke="var(--muted-foreground)"
      strokeWidth={1.5}
      strokeDasharray={dashed ? "5 4" : undefined}
      markerEnd={plain ? undefined : "url(#td-arrow)"}
      markerStart={both ? "url(#td-arrow)" : undefined}
    />
  );
}

/** Straight arrow between two points. */
export function Line({
  x1,
  y1,
  x2,
  y2,
  dashed,
  both,
  plain,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  dashed?: boolean;
  both?: boolean;
  plain?: boolean;
}) {
  return <Arrow d={`M ${x1} ${y1} L ${x2} ${y2}`} dashed={dashed} both={both} plain={plain} />;
}
