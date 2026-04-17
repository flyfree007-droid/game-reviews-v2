import type { Score } from "@/data/games";

interface ScoreRadarProps {
  scores: Score;
  size?: number;
}

const LABELS = [
  { key: "visual", label: "画面音效", emoji: "🎨" },
  { key: "difficulty", label: "上手难度", emoji: "🎮" },
  { key: "depth", label: "玩法深度", emoji: "⚙️" },
  { key: "story", label: "剧情", emoji: "📖" },
  { key: "grindLevel", label: "肝度", emoji: "🕐" },
  { key: "innovation", label: "创新性", emoji: "💡" },
] as const;

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

export default function ScoreRadar({ scores, size = 320 }: ScoreRadarProps) {
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.38;
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];
  const numAxes = 6;
  const angleStep = 360 / numAxes;

  const values = LABELS.map((l) => scores[l.key as keyof Score] / 10);
  const points = values.map((v, i) => {
    const angle = i * angleStep;
    const r = v * maxR;
    return polarToCartesian(cx, cy, r, angle);
  });
  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  const axisLines = LABELS.map((_, i) => {
    const angle = i * angleStep;
    const outer = polarToCartesian(cx, cy, maxR, angle);
    return `M ${cx} ${cy} L ${outer.x} ${outer.y}`;
  });

  const gridLevels = levels.map((l) => {
    const r = l * maxR;
    const pts = Array.from({ length: numAxes }, (_, i) => {
      const angle = i * angleStep;
      const p = polarToCartesian(cx, cy, r, angle);
      return `${p.x},${p.y}`;
    }).join(" ");
    return pts;
  });

  const labelPositions: Array<{ x: number; y: number; textAnchor: "start" | "middle" | "end"; label: string; emoji: string; value: number }> = LABELS.map((l, i) => {
    const angle = i * angleStep;
    const labelR = maxR + 28;
    const pos = polarToCartesian(cx, cy, labelR, angle);
    let textAnchor: "start" | "middle" | "end" = "middle";
    if (angle > 10 && angle < 170) textAnchor = "start";
    else if (angle > 190 && angle < 350) textAnchor = "end";
    return { ...pos, textAnchor, label: l.label, emoji: l.emoji, value: scores[l.key as keyof Score] };
  });

  return (
    <div className="flex flex-col items-center gap-6">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="overflow-visible"
        aria-label="六维评分雷达图"
      >
        {/* Grid levels */}
        {gridLevels.map((pts, i) => (
          <polygon
            key={i}
            points={pts}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {axisLines.map((d, i) => (
          <path key={i} d={d} stroke="var(--color-border)" strokeWidth="1" />
        ))}

        {/* Score polygon fill */}
        <polygon
          points={polygonPoints}
          fill="rgba(0, 112, 209, 0.15)"
          stroke="var(--color-accent)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Score dots */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="5"
            fill="var(--color-accent)"
            stroke="var(--color-bg-primary)"
            strokeWidth="2"
          />
        ))}

        {/* Labels */}
        {labelPositions.map((lp, i) => (
          <g key={i}>
            <text
              x={lp.x}
              y={lp.y - 8}
              textAnchor={lp.textAnchor}
              fill="var(--color-text-secondary)"
              fontSize="11"
              fontWeight="500"
            >
              {lp.emoji} {lp.label}
            </text>
            <text
              x={lp.x}
              y={lp.y + 8}
              textAnchor={lp.textAnchor}
              fill="var(--color-text-primary)"
              fontSize="13"
              fontWeight="bold"
            >
              {lp.value.toFixed(1)}
            </text>
          </g>
        ))}
      </svg>

      {/* Score breakdown list */}
      <div className="w-full space-y-2">
        {LABELS.map(({ key, label, emoji }) => {
          const value = scores[key as keyof Score];
          return (
            <div key={key} className="flex items-center gap-3">
              <span className="w-20 text-sm text-[var(--color-text-secondary)]">
                {emoji} {label}
              </span>
              <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-[var(--color-border)]">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-[var(--color-accent)]"
                  style={{ width: `${(value / 10) * 100}%` }}
                />
              </div>
              <span className="w-8 text-right text-sm font-bold text-[var(--color-text-primary)]">
                {value.toFixed(1)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
