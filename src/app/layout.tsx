import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "GameReview — 游戏评测站",
  description: "PS5风格的六维游戏评测平台",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className="antialiased">
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]/90 backdrop-blur-md">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="size-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center font-black text-sm tracking-widest text-white">
                G
              </div>
              <span className="font-bold text-lg tracking-wide text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                GameReview
              </span>
            </Link>
            <div className="flex items-center gap-8">
              <Link href="/games" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
                游戏列表
              </Link>
              <Link href="/admin" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
                管理后台
              </Link>
              <div className="size-2 rounded-full bg-green-500 animate-pulse" title="系统在线" />
            </div>
          </nav>
        </header>
        <main className="pt-16 min-h-dvh">{children}</main>
        <footer className="border-t border-[var(--color-border)] py-8 text-center text-xs text-[var(--color-text-secondary)]">
          <p>© 2024 GameReview · 游戏评测站 · 六维评分系统</p>
        </footer>
      </body>
    </html>
  );
}
