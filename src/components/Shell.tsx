import { Link, useRouterState } from "@tanstack/react-router";
import { useProgress } from "@/lib/game-state";
import { type ReactNode } from "react";
import { Backdrop } from "./Backdrop";
import { ThemeApplier } from "./ThemeApplier";

export function Shell({ children }: { children: ReactNode }) {
  const progress = useProgress();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const nav = [
    { to: "/", label: "Inicio" },
    { to: "/mundos", label: "Mundos" },
    { to: "/ranking", label: "Ranking" },
    { to: "/tienda", label: "Tienda" },
  ];
  return (
    <div className="min-h-screen flex flex-col relative">
      <ThemeApplier />
      <Backdrop />
      <header className="border-b border-border/60 backdrop-blur sticky top-0 bg-background/85 z-30">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <Sigil />
            <span className="text-xl tracking-tight font-display">
              Analytica
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {nav.map((n) => {
              const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`hover:text-foreground transition ${
                    active ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
            <span className="hidden sm:inline-flex items-center gap-1.5 text-sm px-2.5 py-1 rounded-md bg-secondary border border-border/60">
              <span className="text-accent">✦</span>
              <span className="tabular-nums">{progress.points}</span>
            </span>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        Analytica · Un juego para aprender análisis matemático paso a paso.
      </footer>
    </div>
  );
}

function Sigil() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" className="text-accent">
      <circle cx="14" cy="14" r="12" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <path
        d="M5 19 C 10 4, 18 4, 23 19"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <line x1="5" y1="19" x2="23" y2="19" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="14" cy="9.2" r="1.4" fill="currentColor" />
    </svg>
  );
}
