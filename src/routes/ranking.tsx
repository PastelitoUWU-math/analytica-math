import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/ranking")({
  head: () => ({
    meta: [
      { title: "Clasificación — Analynx" },
      { name: "description", content: "Clasificación global de los mejores analistas matemáticos de Analynx, ordenada por puntos acumulados históricos." },
      { property: "og:title", content: "Clasificación — Analynx" },
      { property: "og:description", content: "Clasificación global de Analynx, ordenada por puntos acumulados históricos." },
      { property: "og:url", content: "https://analytica-math.lovable.app/ranking" },
    ],
    links: [{ rel: "canonical", href: "https://analytica-math.lovable.app/ranking" }],
  }),
  component: RankingPage,
});

type Row = { id: string; username: string; points: number; lifetime_points: number; total_correct: number };

function RankingPage() {
  const { user, profile } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from("profiles")
        .select("id, username, points, lifetime_points, total_correct")
        .order("lifetime_points", { ascending: false })
        .limit(100);
      if (alive) {
        setRows((data as Row[]) ?? []);
        setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [user, profile?.lifetime_points]);

  return (
    <Shell>
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-display tracking-tight">Clasificación global</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Los mejores analistas. Se ordena por <strong className="text-foreground">puntos acumulados históricos</strong> —
          gastar puntos en la tienda no afecta a tu posición.
        </p>

        {!user && (
          <div className="mt-6 bg-card border border-border/60 rounded-lg p-5">
            <h2 className="font-display text-lg">Entra en la clasificación</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Necesitas una cuenta verificada por correo: correo electrónico, contraseña, y un nombre de usuario
              permanente.
            </p>
            <div className="mt-4">
              <Link
                to="/auth"
                className="inline-block px-4 py-2 rounded-md bg-foreground text-background btn-glow"
              >Crear cuenta o iniciar sesión</Link>
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
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Histórico</div>
              <div className="mt-1 font-display text-2xl tabular-nums">{profile.lifetime_points}</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                saldo actual: <span className="tabular-nums">{profile.points}</span>
              </div>
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
                  <span className="tabular-nums" title="Puntos acumulados históricos">{r.lifetime_points}</span>
                </li>
              );
            })
          )}
        </ol>
      </div>
    </Shell>
  );
}

