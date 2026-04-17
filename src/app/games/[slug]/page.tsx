import Link from "next/link";
import { notFound } from "next/navigation";
import { DEMO_GAMES } from "@/data/games";
import ScoreRadar from "@/components/ScoreRadar";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return DEMO_GAMES.map((g) => ({ slug: g.slug }));
}

export default async function GameDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const game = DEMO_GAMES.find((g) => g.slug === slug);
  if (!game) notFound();

  const avgScore =
    game.scores
      ? (
          (game.scores.visual +
            game.scores.difficulty +
            game.scores.depth +
            game.scores.story +
            game.scores.grindLevel +
            game.scores.innovation) /
          6
        ).toFixed(1)
      : null;

  return (
    <div className="min-h-dvh">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        {game.coverImage && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${game.coverImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-transparent to-transparent" />
          </>
        )}

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto max-w-7xl px-6 pb-12 w-full">
            <div className="flex items-end justify-between gap-8">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <Link
                    href="/games"
                    className="text-sm text-[var(--color-text-secondary)] hover:text-white transition-colors"
                  >
                    ← 游戏列表
                  </Link>
                </div>
                <h1 className="text-5xl/12 font-black text-white">{game.title}</h1>
                {game.titleRaw && (
                  <p className="mt-1 text-xl text-[var(--color-text-secondary)]">{game.titleRaw}</p>
                )}
              </div>
              {avgScore && (
                <div className="shrink-0 text-center">
                  <div className="text-6xl font-black text-[var(--color-accent)]">{avgScore}</div>
                  <div className="text-xs text-[var(--color-text-secondary)] uppercase tracking-widest">综合评分</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Meta bar */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex flex-wrap gap-4 text-sm text-[var(--color-text-secondary)]">
            {game.platform && (
              <span className="flex items-center gap-1.5">
                <span className="text-[var(--color-accent)]">▸</span> {game.platform}
              </span>
            )}
            {game.genre && (
              <span className="flex items-center gap-1.5">
                <span className="text-[var(--color-accent)]">▸</span> {game.genre}
              </span>
            )}
            {game.developer && (
              <span className="flex items-center gap-1.5">
                <span className="text-[var(--color-accent)]">▸</span> {game.developer}
              </span>
            )}
            {game.releaseYear && (
              <span className="flex items-center gap-1.5">
                <span className="text-[var(--color-accent)]">▸</span> {game.releaseYear}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-5">
          {/* Article */}
          <article className="lg:col-span-3">
            <h2 className="mb-6 text-2xl font-bold text-[var(--color-text-primary)]">评测正文</h2>
            {game.body ? (
              <p className="whitespace-pre-line text-base/8 text-[var(--color-text-secondary)] leading-relaxed">
                {game.body}
              </p>
            ) : (
              <p className="text-[var(--color-text-secondary)]">暂无评测内容</p>
            )}
          </article>

          {/* Radar */}
          <aside className="lg:col-span-2">
            <h2 className="mb-6 text-2xl font-bold text-[var(--color-text-primary)]">六维评分</h2>
            {game.scores ? (
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                <ScoreRadar scores={game.scores} size={300} />
              </div>
            ) : (
              <p className="text-[var(--color-text-secondary)]">暂无评分数据</p>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
