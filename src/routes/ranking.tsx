import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { useProgress } from "@/lib/game-state";
import { useEffect, useState } from "react";
import { useAuth, syncPointsToProfile } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/ranking")({
  head: () => ({
    meta: [
      { title: "Clasificación — Analytica" },
      { name: "description", content: "Clasificación global de los mejores analistas matemáticos de Analytica." },
    ],
  }),
  component: RankingPage,
});

type Row = { id: string; username: string; points: number; total_correct: number };

function RankingPage() {
  const progress = useProgress();
  const { user, profile, reloadProfile } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  // Sincroniza puntuación local con el perfil cada vez que cambia
  useEffect(() => {
    if (!user) return;
    if (!profile) return;
    if (profile.points === progress.points && profile.total_correct === progress.totalCorrect) return;
    if (progress.points > profile.points || progress.totalCorrect > profile.total_correct) {
      syncPointsToProfile(progress.points, progress.totalCorrect).then(() => reloadProfile());
    }
  }, [user, profile, progress.points, progress.totalCorrect, reloadProfile]);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from("profiles")
        .select("id, username, points, total_correct")
        .order("points", { ascending: false })
        .limit(100);
      if (alive) {
        setRows((data as Row[]) ?? []);
        setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [user, profile?.points]);

  return (
    <Shell>
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-display tracking-tight">Clasificación global</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Los mejores analistas. Se ordena por puntos totales.
        </p>

        {!user && (
          <div className="mt-6 bg-card border border-border/60 rounded-lg p-5">
            <h2 className="font-display text-lg">Entra en la clasificación</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Para aparecer aquí necesitas una cuenta. Es gratis: solo correo electrónico, contraseña y
              nombre de usuario.
            </p>
            <div className="mt-4">
              <Link
                to="/auth"
                className="inline-block px-4 py-2 rounded-md bg-foreground text-background btn-glow"
                data-sfx="click"
              >
                Crear cuenta o iniciar sesión
              </Link>
            </div>
          </div>
        )}

        {user && profile && (
          <div className="mt-6 bg-card border border-border/60 rounded-lg p-5 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Tu perfil</div>
              <div className="mt-1 font-display text-xl">{profile.username}</div>
              <div className="text-xs text-muted-foreground mt-0.5">El nombre de usuario es permanente.</div>
            </div>
            <div className="text-right">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Puntos</div>
              <div className="mt-1 font-display text-2xl tabular-nums">{profile.points}</div>
            </div>
          </div>
        )}

        <ol className="mt-8 divide-y divide-border/60 bg-card border border-border/60 rounded-lg overflow-hidden">
          {loading ? (
            <li className="p-8 text-center text-muted-foreground text-sm">Cargando…</li>
          ) : rows.length === 0 ? (
            <li className="p-8 text-center text-muted-foreground text-sm">
              Aún no hay puntuaciones. ¡Sé el primero!
            </li>
          ) : (
            rows.map((r, i) => {
              const me = user?.id === r.id;
              return (
                <li
                  key={r.id}
                  className={`flex items-center justify-between px-5 py-3 ${me ? "bg-accent/10" : ""}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-display text-lg w-8 text-muted-foreground tabular-nums">
                      {i + 1}
                    </span>
                    <span className={me ? "font-semibold" : ""}>{r.username}</span>
                    {me && <span className="text-xs text-accent">tú</span>}
                  </div>
                  <span className="tabular-nums">{r.points}</span>
                </li>
              );
            })
          )}
        </ol>
      </div>
    </Shell>
  );
}
