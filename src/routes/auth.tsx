import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Shell } from "@/components/Shell";
import { useState } from "react";
import { signIn, signUp, useAuth, signOut, verifySignupCode, resendSignupCode } from "@/lib/auth";
import { sfx } from "@/lib/sfx";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Cuenta — Analytica" },
      { name: "description", content: "Inicia sesión o crea una cuenta verificada por correo para entrar en la clasificación global de Analytica." },
      { property: "og:title", content: "Cuenta — Analytica" },
      { property: "og:description", content: "Inicia sesión o regístrate para entrar en la clasificación global de Analytica." },
      { property: "og:url", content: "https://analytica-math.lovable.app/auth" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://analytica-math.lovable.app/auth" }],
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

  // Fase de verificación por código tras el registro
  const [awaitingCode, setAwaitingCode] = useState(false);
  const [code, setCode] = useState("");

  const navigate = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setBusy(true);
    if (mode === "in") {
      const res = await signIn(email, password);
      setBusy(false);
      if (res.error) { sfx.wrong(); setMsg(res.error); }
      else { sfx.correct(); setTimeout(() => navigate({ to: "/ranking" }), 400); }
      return;
    }
    // Registro
    const res = await signUp(email, password, username);
    setBusy(false);
    if (res.error) { sfx.wrong(); setMsg(res.error); return; }
    sfx.reveal();
    if (res.pendingVerification) {
      setAwaitingCode(true);
      setMsg("Te hemos enviado un correo con un código de 6 dígitos. Introdúcelo para terminar de crear tu cuenta.");
    } else {
      // Auto-confirmado (poco común): entra directo
      setTimeout(() => navigate({ to: "/ranking" }), 400);
    }
  }

  async function submitCode(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const res = await verifySignupCode(email, code);
    setBusy(false);
    if (res.error) { sfx.wrong(); setMsg(res.error); return; }
    sfx.levelUp();
    setTimeout(() => navigate({ to: "/ranking" }), 500);
  }

  async function resend() {
    setBusy(true);
    const res = await resendSignupCode(email);
    setBusy(false);
    if (res.error) { sfx.wrong(); setMsg(res.error); }
    else { sfx.click(); setMsg("Nuevo código enviado. Revisa tu correo."); }
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
            >Ver clasificación</button>
            <button
              onClick={async () => { await signOut(); }}
              className="px-4 py-2 rounded-md border border-border/60"
            >Cerrar sesión</button>
          </div>
        </div>
      </Shell>
    );
  }

  if (awaitingCode) {
    return (
      <Shell>
        <div className="max-w-md mx-auto px-6 py-14">
          <h1 className="text-3xl font-display tracking-tight">Verifica tu correo</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Enviado a <strong className="text-foreground">{email}</strong>. Introduce el código de 6 dígitos
            que aparece en el correo.
          </p>
          <form onSubmit={submitCode} className="mt-6 space-y-4">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              required
              inputMode="numeric"
              pattern="[0-9]{6}"
              placeholder="123456"
              className="w-full px-3 py-3 rounded-md border border-input bg-background font-mono tabular-nums tracking-[0.5em] text-center text-2xl"
              autoFocus
            />
            {msg && <div className="text-sm p-3 rounded-md border border-border/60 bg-secondary">{msg}</div>}
            <button
              type="submit"
              disabled={busy || code.length !== 6}
              className="w-full px-4 py-2.5 rounded-md bg-foreground text-background font-medium btn-glow disabled:opacity-60"
            >{busy ? "Verificando…" : "Verificar y crear cuenta"}</button>
          </form>
          <div className="mt-4 flex items-center justify-between text-sm">
            <button type="button" onClick={resend} disabled={busy}
              className="text-accent hover:underline underline-offset-2">
              Reenviar código
            </button>
            <button type="button" onClick={() => { setAwaitingCode(false); setCode(""); setMsg(null); }}
              className="text-muted-foreground hover:text-foreground">
              ← Volver
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
            onClick={() => { setMode("in"); setMsg(null); }}
            type="button"
          >Entrar</button>
          <button
            className={`px-4 py-1.5 ${mode === "up" ? "bg-foreground text-background" : ""}`}
            onClick={() => { setMode("up"); setMsg(null); }}
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
                required minLength={3} maxLength={24}
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
            {mode === "up" && (
              <p className="mt-1 text-xs text-muted-foreground">
                Enviaremos un código de 6 dígitos para verificar que el correo es tuyo.
              </p>
            )}
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
            type="submit" disabled={busy}
            className="w-full px-4 py-2.5 rounded-md bg-foreground text-background font-medium btn-glow disabled:opacity-60"
          >
            {busy ? "…" : mode === "in" ? "Entrar" : "Enviar código y crear cuenta"}
          </button>
        </form>
      </div>
    </Shell>
  );
}
