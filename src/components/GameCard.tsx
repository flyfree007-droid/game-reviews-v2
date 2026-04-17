import Link from "next/link";
import type { Game } from "@/data/games";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Link
      href={`/games/${game.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-300 hover:border-[var(--color-border-accent)] hover:shadow-[0_0_30px_var(--color-accent-glow)]"
    >
      {/* Cover image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-bg-secondary)]">
        {game.coverImage ? (
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${game.coverImage})` }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-4xl font-black text-[var(--color-border)]">
            {game.title[0]}
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface)] via-transparent to-transparent" />

        {/* Score badge */}
        {game.scores && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
            <span className="text-[var(--color-accent)]">★</span>
            {(
              (game.scores.visual +
                game.scores.difficulty +
                game.scores.depth +
                game.scores.story +
                game.scores.grindLevel +
                game.scores.innovation) /
              6
            ).toFixed(1)}
          </div>
        )}

        {/* Platform badge */}
        {game.platform && (
          <div className="absolute left-3 top-3">
            <span className="rounded bg-black/60 px-2 py-0.5 text-xs text-white backdrop-blur-sm">
              {game.platform.split("/")[0].trim()}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-[var(--color-text-primary)] leading-tight group-hover:text-[var(--color-accent)] transition-colors">
            {game.title}
          </h3>
          {game.releaseYear && (
            <span className="shrink-0 rounded bg-[var(--color-bg-secondary)] px-2 py-0.5 text-xs text-[var(--color-text-secondary)]">
              {game.releaseYear}
            </span>
          )}
        </div>
        {game.titleRaw && game.titleRaw !== game.title && (
          <p className="text-sm text-[var(--color-text-secondary)]">{game.titleRaw}</p>
        )}
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {game.genre && (
            <span className="rounded bg-[var(--color-accent)]/10 px-2 py-0.5 text-xs text-[var(--color-accent)]">
              {game.genre}
            </span>
          )}
          {game.developer && (
            <span className="rounded bg-[var(--color-surface-hover)] px-2 py-0.5 text-xs text-[var(--color-text-secondary)]">
              {game.developer}
            </span>
          )}
        </div>

        {/* Mini score bars */}
        {game.scores && (
          <div className="mt-3 grid grid-cols-3 gap-1.5">
            {[
              { label: "画面", value: game.scores.visual },
              { label: "难度", value: game.scores.difficulty },
              { label: "深度", value: game.scores.depth },
              { label: "剧情", value: game.scores.story },
              { label: "肝度", value: game.scores.grindLevel },
              { label: "创新", value: game.scores.innovation },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center gap-1">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--color-border)]">
                  <div
                    className="h-full rounded-full bg-[var(--color-accent)]"
                    style={{ width: `${(value / 10) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-[var(--color-text-secondary)] w-5 text-right">
                  {value.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
