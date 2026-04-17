import Link from "next/link";
import { DEMO_GAMES } from "@/data/games";
import GameCard from "@/components/GameCard";

export default function HomePage() {
  const featured = DEMO_GAMES[0];
  const others = DEMO_GAMES.slice(1, 5);

  return (
    <div className="min-h-dvh">
      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
            style={{ backgroundImage: `url(${featured.coverImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-transparent to-transparent" />
        </div>

        {/* Glow accent */}
        <div className="absolute right-0 top-1/2 size-[600px] -translate-y-1/2 rounded-full bg-[var(--color-accent)] opacity-10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--color-border-accent)] bg-[var(--color-accent)]/10 px-3 py-1 text-xs text-[var(--color-accent)]">
              <span className="size-1.5 rounded-full bg-[var(--color-accent)]" />
              精选推荐
            </div>
            <h1 className="mb-3 text-6xl/14 font-black tracking-tight text-[var(--color-text-primary)]">
              {featured.title}
            </h1>
            {featured.titleRaw && (
              <p className="mb-6 text-2xl text-[var(--color-text-secondary)]">
                {featured.titleRaw}
              </p>
            )}
            <div className="mb-8 flex flex-wrap gap-3 text-xs text-[var(--color-text-secondary)]">
              <span className="rounded bg-[var(--color-surface)] px-2.5 py-1">
                {featured.platform}
              </span>
              <span className="rounded bg-[var(--color-surface)] px-2.5 py-1">
                {featured.genre}
              </span>
              <span className="rounded bg-[var(--color-surface)] px-2.5 py-1">
                {featured.developer}
              </span>
              <span className="rounded bg-[var(--color-surface)] px-2.5 py-1">
                {featured.releaseYear}
              </span>
            </div>
            <p className="mb-10 line-clamp-3 text-base/7 text-[var(--color-text-secondary)]">
              {featured.body}
            </p>
            <div className="flex items-center gap-4">
              <Link
                href={`/games/${featured.slug}`}
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#0088f0] hover:shadow-[0_0_20px_var(--color-accent-glow)]"
              >
                查看详情
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/games"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-6 py-3 text-sm font-semibold text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-text-primary)]"
              >
                浏览全部
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Six-dimension score highlight */}
      {featured.scores && (
        <section className="border-y border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <h2 className="mb-8 text-center text-sm font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
              六维评分
            </h2>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
              {[
                { label: "🎨 画面音效", value: featured.scores.visual, key: "visual" },
                { label: "🎮 上手难度", value: featured.scores.difficulty, key: "difficulty" },
                { label: "⚙️ 玩法深度", value: featured.scores.depth, key: "depth" },
                { label: "📖 剧情", value: featured.scores.story, key: "story" },
                { label: "🕐 肝度", value: featured.scores.grindLevel, key: "grindLevel" },
                { label: "💡 创新性", value: featured.scores.innovation, key: "innovation" },
              ].map(({ label, value, key }) => (
                <div key={key} className="flex flex-col items-center gap-2 text-center">
                  <div className="relative size-16">
                    <svg viewBox="0 0 36 36" className="size-full -rotate-90">
                      <circle cx="18" cy="18" r="15.5" fill="none" stroke="var(--color-border)" strokeWidth="3" />
                      <circle
                        cx="18" cy="18" r="15.5" fill="none"
                        stroke="var(--color-accent)" strokeWidth="3"
                        strokeDasharray={`${(value / 10) * 97.4} 97.4`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
                      {value}
                    </span>
                  </div>
                  <span className="text-xs text-[var(--color-text-secondary)]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Game grid */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">热门游戏</h2>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">编辑精选 · 最新评测</p>
          </div>
          <Link
            href="/games"
            className="text-sm text-[var(--color-accent)] hover:underline"
          >
            查看全部 →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* Platform badge section */}
      <section className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="mb-8 text-center text-xs uppercase tracking-widest text-[var(--color-text-secondary)]">
            覆盖平台
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--color-text-secondary)]">
            {["PS5", "PC", "Xbox Series X", "Nintendo Switch", "Steam Deck"].map((p) => (
              <span key={p} className="rounded border border-[var(--color-border)] px-4 py-2 hover:border-[var(--color-accent)] hover:text-[var(--color-text-primary)] transition-colors cursor-default">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
