import { Link, useRouterState } from "@tanstack/react-router";
import { useProgress, useProgressStatus } from "@/lib/game-state";
import { useEffect, type ReactNode } from "react";
import { Backdrop } from "./Backdrop";
import { ThemeApplier } from "./ThemeApplier";
import { useAuth } from "@/lib/auth";
import { installGlobalClickSfx } from "@/lib/sfx";
import { AchievementPopup } from "./AchievementPopup";
import { syncAchievements } from "@/lib/game-state";

export function Shell({ children }: { children: ReactNode }) {
  const progress = useProgress();
  const { user, profile } = useAuth();
  const { isLoading, isError, retry } = useProgressStatus();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => { installGlobalClickSfx(); syncAchievements(); }, []);
  const gated = (isLoading || isError) && pathname !== "/auth";
  const nav = [
    { to: "/", label: "Inicio" },
    { to: "/mundos", label: "Mundos" },
    { to: "/ranking", label: "Ranking" },
    { to: "/tienda", label: "Tienda" },
  ];
  return (
    <div className="min-h-screen flex flex-col relative overflow-x-clip pb-16 sm:pb-0">
      <ThemeApplier />
      <Backdrop />
      <header className="border-b border-border/60 backdrop-blur sticky top-0 bg-background/85 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <Link to="/" className="flex min-w-0 items-center gap-3 group">
            <Sigil />
            <span className="text-xl tracking-tight font-display">
              Analynx
            </span>
          </Link>
          <nav className="hidden sm:flex items-center gap-5 text-sm">
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
            <span className="inline-flex items-center gap-1.5 text-sm px-2.5 py-1 rounded-md bg-secondary border border-border/60 shimmer-chip">
              <span className="text-accent">✦</span>
              <span className="tabular-nums">{isLoading ? "…" : isError ? "—" : progress.points}</span>
            </span>
            <Link
              to="/auth"
              className={`text-sm px-3 py-1.5 rounded-md border transition ${
                user
                  ? "border-accent/50 text-accent hover:bg-accent/10"
                  : "border-border/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              {user ? profile?.username ?? "Cuenta" : "Entrar"}
            </Link>
          </nav>
          <Link
            to="/auth"
            className="sm:hidden max-w-28 truncate text-sm px-3 py-1.5 rounded-md border border-border/60 text-muted-foreground"
          >
            {user ? profile?.username ?? "Cuenta" : "Entrar"}
          </Link>
        </div>
      </header>
      <AchievementPopup />
      <main className="flex-1 relative z-10">
        {gated ? (
          <div className="max-w-md mx-auto px-6 py-24 text-center">
            {isError ? (
              <>
                <h2 className="text-2xl font-display tracking-tight">No hemos podido cargar tu progreso.</h2>
                <p className="text-muted-foreground mt-2 text-sm">
                  Tu progreso sigue guardado a salvo. No se ha modificado nada.
                </p>
                <button
                  onClick={retry}
                  className="mt-6 px-5 py-2.5 rounded-md bg-foreground text-background font-medium btn-glow"
                >Reintentar</button>
              </>
            ) : (
              <p className="text-muted-foreground text-sm animate-pulse">Cargando tu progreso…</p>
            )}
          </div>
        ) : (
          children
        )}
      </main>
      <footer className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground relative z-10 bg-background/70">
        Analynx · Un juego para aprender análisis matemático paso a paso.
      </footer>
      <nav className="sm:hidden fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-border/60 bg-background/95 backdrop-blur" aria-label="Navegación principal">
        {nav.map((n) => {
          const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
          return (
            <Link key={n.to} to={n.to} className={`min-w-0 px-1 py-3 text-center text-xs ${active ? "text-foreground bg-secondary" : "text-muted-foreground"}`}>
              {n.label}
            </Link>
          );
        })}
      </nav>
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
