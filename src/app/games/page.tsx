"use client";

import { useState } from "react";
import { DEMO_GAMES } from "@/data/games";
import GameCard from "@/components/GameCard";

const ALL_GENRES = Array.from(new Set(DEMO_GAMES.map((g) => g.genre).filter(Boolean))) as string[];
const ALL_PLATFORMS = Array.from(
  new Set(DEMO_GAMES.flatMap((g) => (g.platform ? g.platform.split("/") : [])).map((p) => p.trim()))
);

export default function GamesPage() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");

  const filtered = DEMO_GAMES.filter((game) => {
    const matchesSearch =
      !search ||
      game.title.toLowerCase().includes(search.toLowerCase()) ||
      (game.titleRaw?.includes(search) ?? false) ||
      (game.developer?.toLowerCase().includes(search.toLowerCase()) ?? false);
    const matchesGenre = !genre || game.genre === genre;
    const matchesPlatform =
      !platform ||
      (game.platform?.split("/").map((p) => p.trim()).includes(platform) ?? false);
    return matchesSearch && matchesGenre && matchesPlatform;
  });

  return (
    <div className="min-h-dvh">
      {/* Header */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <h1 className="text-4xl font-black text-[var(--color-text-primary)]">游戏列表</h1>
          <p className="mt-2 text-[var(--color-text-secondary)]">
            共 {DEMO_GAMES.length} 款游戏 · 六维评分系统
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Filters */}
        <div className="mb-10 flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]"
              width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="搜索游戏..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] py-2.5 pl-10 pr-4 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
            />
          </div>

          {/* Genre filter */}
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none transition-colors cursor-pointer"
          >
            <option value="">全部类型</option>
            {ALL_GENRES.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>

          {/* Platform filter */}
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5 text-sm text-[var(--color-text-primary)] focus:border-[var(--color-accent)] focus:outline-none transition-colors cursor-pointer"
          >
            <option value="">全部平台</option>
            {ALL_PLATFORMS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          {/* Result count */}
          <span className="text-sm text-[var(--color-text-secondary)]">
            {filtered.length} 结果
          </span>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-5xl mb-4">🎮</div>
            <p className="text-[var(--color-text-secondary)]">没有找到符合条件的游戏</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
