"use client";

import { useState } from "react";
import { DEMO_GAMES } from "@/data/games";

const SCORE_KEYS = ["visual", "difficulty", "depth", "story", "grindLevel", "innovation"] as const;
const SCORE_LABELS: Record<(typeof SCORE_KEYS)[number], string> = {
  visual: "🎨 画面音效",
  difficulty: "🎮 上手难度",
  depth: "⚙️ 玩法深度",
  story: "📖 剧情",
  grindLevel: "🕐 肝度",
  innovation: "💡 创新性",
};

export default function AdminPage() {
  const [selectedGame, setSelectedGame] = useState(DEMO_GAMES[0].id);
  const game = DEMO_GAMES.find((g) => g.id === selectedGame)!;

  const [scores, setScores] = useState(game.scores ?? {
    visual: 8.0,
    difficulty: 7.0,
    depth: 8.0,
    story: 8.0,
    grindLevel: 6.0,
    innovation: 7.0,
  });

  const handleGameChange = (id: string) => {
    setSelectedGame(id);
    const g = DEMO_GAMES.find((g) => g.id === id)!;
    setScores(
      g.scores ?? {
        visual: 8.0,
        difficulty: 7.0,
        depth: 8.0,
        story: 8.0,
        grindLevel: 6.0,
        innovation: 7.0,
      }
    );
  };

  return (
    <div className="min-h-dvh">
      {/* Header */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-[var(--color-text-primary)]">管理后台</h1>
              <p className="mt-2 text-[var(--color-text-secondary)]">游戏评测管理与六维评分编辑</p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-xs text-[var(--color-text-secondary)]">
              <span className="size-2 rounded-full bg-yellow-500" />
              演示模式 · 数据仅保存在本地
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Left: Game selector */}
          <div className="lg:col-span-1">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
              选择游戏
            </h2>
            <div className="space-y-2">
              {DEMO_GAMES.map((g) => (
                <button
                  key={g.id}
                  onClick={() => handleGameChange(g.id)}
                  className={`w-full flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                    selectedGame === g.id
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10"
                      : "border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-border-accent)]"
                  }`}
                >
                  <div
                    className="size-12 rounded-lg bg-cover bg-center shrink-0"
                    style={{ backgroundImage: g.coverImage ? `url(${g.coverImage})` : undefined }}
                  />
                  <div className="min-w-0">
                    <div className={`truncate font-semibold ${selectedGame === g.id ? "text-[var(--color-accent)]" : "text-[var(--color-text-primary)]"}`}>
                      {g.title}
                    </div>
                    <div className="truncate text-xs text-[var(--color-text-secondary)]">
                      {g.genre} · {g.releaseYear}
                    </div>
                  </div>
                  {g.published && (
                    <span className="ml-auto shrink-0 rounded-full bg-green-500/20 px-2 py-0.5 text-xs text-green-400">
                      已发布
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Score editor */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
                编辑评分 · {game.title}
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-sm text-[var(--color-text-secondary)]">
                  综合均分:{" "}
                  <span className="font-bold text-[var(--color-accent)]">
                    {(
                      Object.values(scores).reduce((a, b) => a + b, 0) / 6
                    ).toFixed(2)}
                  </span>
                </span>
              </div>
            </div>

            {/* Score sliders */}
            <div className="space-y-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
              {SCORE_KEYS.map((key) => (
                <div key={key} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-[var(--color-text-primary)]">
                      {SCORE_LABELS[key]}
                    </label>
                    <span className="text-sm font-bold text-[var(--color-accent)]">
                      {scores[key].toFixed(1)}
                    </span>
                  </div>
                  <div className="relative flex items-center gap-4">
                    <span className="text-xs text-[var(--color-text-secondary)] w-4">0</span>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.1"
                      value={scores[key]}
                      onChange={(e) =>
                        setScores((prev) => ({ ...prev, [key]: parseFloat(e.target.value) }))
                      }
                      className="relative h-2 flex-1 appearance-none rounded-full bg-[var(--color-border)] outline-none accent-[var(--color-accent)]"
                    />
                    <span className="text-xs text-[var(--color-text-secondary)] w-4 text-right">10</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[var(--color-border)]">
                    <div
                      className="h-full rounded-full bg-[var(--color-accent)] transition-all"
                      style={{ width: `${(scores[key] / 10) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-3">
                <button className="rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#0088f0]">
                  保存评分
                </button>
                <button className="rounded-lg border border-[var(--color-border)] px-5 py-2.5 text-sm font-semibold text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-accent)] hover:text-white">
                  重置
                </button>
              </div>
              <button className="rounded-lg border border-green-500/30 bg-green-500/10 px-5 py-2.5 text-sm font-semibold text-green-400 transition-all hover:bg-green-500/20">
                ✓ 发布评测
              </button>
            </div>

            {/* Game info editor */}
            <div className="mt-10">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
                基本信息
              </h2>
              <div className="grid grid-cols-2 gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                {[
                  { label: "游戏名称", value: game.title, placeholder: "游戏名称" },
                  { label: "原名/中文名", value: game.titleRaw ?? "", placeholder: "原名或中文名" },
                  { label: "开发商", value: game.developer ?? "", placeholder: "开发商" },
                  { label: "发行年份", value: game.releaseYear?.toString() ?? "", placeholder: "年份" },
                  { label: "平台", value: game.platform ?? "", placeholder: "PS5 / PC / Xbox" },
                  { label: "类型", value: game.genre ?? "", placeholder: "动作RPG" },
                ].map(({ label, value, placeholder }) => (
                  <div key={label} className="flex flex-col gap-1.5">
                    <label className="text-xs text-[var(--color-text-secondary)]">{label}</label>
                    <input
                      type="text"
                      defaultValue={value}
                      placeholder={placeholder}
                      className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-accent)] focus:outline-none transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
