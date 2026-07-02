import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { useState } from "react";
import { signIn, signUp, useAuth, signOut } from "@/lib/auth";
import { sfx } from "@/lib/sfx";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Cuenta — Analytica" },
      { name: "description", content: "Inicia sesión o crea una cuenta para entrar en la clasificación global de Analytica." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { user, profile, loading } = useAuth();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setBusy(true);
    const res = mode === "in" ? await signIn(email, password) : await signUp(email, password, username);
    setBusy(false);
    if (res.error) {
      sfx.wrong();
      setMsg(res.error);
    } else {
      sfx.correct();
      if (mode === "up") setMsg("Cuenta creada. Ya puedes entrar en la clasificación.");
      setTimeout(() => navigate({ to: "/ranking" }), 400);
    }
  }

  if (loading) {
    return <Shell><div className="max-w-md mx-auto px-6 py-16 text-muted-foreground text-sm">Cargando…</div></Shell>;
  }

  if (user) {
    return (
      <Shell>
        <div className="max-w-md mx-auto px-6 py-16">
          <h1 className="text-3xl font-display tracking-tight">Sesión iniciada</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Hola <strong className="text-foreground">{profile?.username ?? "…"}</strong>. Ya apareces en la
            clasificación global.
          </p>
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => navigate({ to: "/ranking" })}
              className="px-4 py-2 rounded-md bg-foreground text-background btn-glow"
              data-sfx="click"
            >
              Ver clasificación
            </button>
            <button
              onClick={async () => { await signOut(); sfx.click(); }}
              className="px-4 py-2 rounded-md border border-border/60"
              data-sfx="click"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="max-w-md mx-auto px-6 py-14">
        <h1 className="text-3xl font-display tracking-tight">
          {mode === "in" ? "Iniciar sesión" : "Crear cuenta"}
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Necesaria para entrar en la clasificación global.
        </p>

        <div className="mt-6 inline-flex rounded-md border border-border/60 overflow-hidden text-sm">
          <button
            className={`px-4 py-1.5 ${mode === "in" ? "bg-foreground text-background" : ""}`}
            onClick={() => { setMode("in"); sfx.click(); }}
            type="button"
          >Entrar</button>
          <button
            className={`px-4 py-1.5 ${mode === "up" ? "bg-foreground text-background" : ""}`}
            onClick={() => { setMode("up"); sfx.click(); }}
            type="button"
          >Registrarse</button>
        </div>

        <form onSubmit={submit} className="mt-6 space-y-4">
          {mode === "up" && (
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground">
                Nombre de usuario
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="euler_99"
                required
                minLength={3}
                maxLength={24}
                pattern="[A-Za-z0-9_.\-]{3,24}"
                className="mt-1 w-full px-3 py-2 rounded-md border border-input bg-background"
              />
              <p className="mt-1.5 text-xs text-amber-600 dark:text-amber-400">
                ⚠️ El nombre de usuario <strong>no se podrá cambiar nunca</strong>. Elígelo con cuidado.
              </p>
            </div>
          )}
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Correo electrónico
            </label>
            <input
              type="email" required autoComplete="email"
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-md border border-input bg-background"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Contraseña
            </label>
            <input
              type="password" required minLength={6}
              autoComplete={mode === "in" ? "current-password" : "new-password"}
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 rounded-md border border-input bg-background"
            />
          </div>
          {msg && <div className="text-sm p-3 rounded-md border border-border/60 bg-secondary">{msg}</div>}
          <button
            type="submit"
            disabled={busy}
            className="w-full px-4 py-2.5 rounded-md bg-foreground text-background font-medium btn-glow disabled:opacity-60"
            data-sfx="click"
          >
            {busy ? "…" : mode === "in" ? "Entrar" : "Crear cuenta"}
          </button>
        </form>
      </div>
    </Shell>
  );
}
