// Cliente-side auth y perfil (Lovable Cloud / Supabase)
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { checkEmailAvailable } from "@/lib/account.functions";
import { activateAccountProgress, activateGuestProgress, flushAccountProgress } from "@/lib/game-state";
import type { User } from "@supabase/supabase-js";

export type Profile = {
  id: string;
  username: string;
  points: number;
  lifetime_points: number;
  total_correct: number;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const { data: sub } = supabase.auth.onAuthStateChange((evt, session) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
      if (session?.user) {
        const shouldImportGuest = evt === "SIGNED_IN" && consumePendingGuestImport(session.user.email);
        setTimeout(() => {
          void activateAccountProgress(session.user.id, shouldImportGuest);
          void loadProfile(session.user.id);
        }, 0);
      } else {
        setProfile(null);
        activateGuestProgress();
      }
    });
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setUser(data.session?.user ?? null);
      if (data.session?.user) {
        void activateAccountProgress(data.session.user.id, consumePendingGuestImport(data.session.user.email));
        void loadProfile(data.session.user.id);
      } else activateGuestProgress();
      setLoading(false);
    });
    return () => { mounted = false; sub.subscription.unsubscribe(); };
  }, []);

  async function loadProfile(id: string) {
    const { data } = await supabase.from("profiles").select("*").eq("id", id).maybeSingle();
    setProfile((data as Profile) ?? null);
  }

  return { user, profile, loading, reloadProfile: () => user && loadProfile(user.id) };
}

export async function signUp(email: string, password: string, username: string) {
  const clean = username.trim();
  if (!/^[A-Za-z0-9_.\-]{3,24}$/.test(clean)) {
    return { error: "El nombre de usuario debe tener 3-24 caracteres (letras, dígitos, _ . -).", pendingVerification: false };
  }
  const { data: taken } = await supabase.from("profiles").select("id").eq("username", clean).maybeSingle();
  if (taken) return { error: "Ese nombre de usuario ya está en uso.", pendingVerification: false };

  // Comprobar que el correo no esté ya vinculado a otra cuenta (verificada o no).
  try {
    const res = await checkEmailAvailable({ data: { email: email.trim() } });
    if (res?.exists) {
      return { error: "Ya existe una cuenta con ese correo electrónico. Inicia sesión o usa otro correo.", pendingVerification: false };
    }
  } catch { /* si el chequeo falla, continuamos y confiamos en Supabase */ }

  const emailRedirectTo = typeof window !== "undefined" ? window.location.origin : undefined;
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: { emailRedirectTo, data: { username: clean } },
  });
  if (error) return { error: error.message, pendingVerification: false };
  if (typeof window !== "undefined") {
    localStorage.setItem("analytica.pending-guest-import", email.trim().toLowerCase());
  }

  // Si Supabase requiere confirmación por email, no habrá sesión activa
  const pendingVerification = !data.session;
  return { error: null, pendingVerification, username: clean };
}

// Verificación con código de 6 dígitos enviado por correo (OTP tipo signup)
export async function verifySignupCode(email: string, code: string, username?: string) {
  const { data, error } = await supabase.auth.verifyOtp({
    email: email.trim(),
    token: code.trim(),
    type: "signup",
  });
  if (error) return { error: error.message };
  // Asegura que exista el perfil (por si el trigger no está activo)
  const uid = data.user?.id;
  if (uid) {
    const chosen = (username ?? (data.user?.user_metadata as { username?: string } | null)?.username ?? `user_${uid.slice(0, 8)}`).trim();
    await supabase.from("profiles").insert({ id: uid, username: chosen }).select().maybeSingle();
    await activateAccountProgress(uid, true);
  }
  return { error: null };
}

export async function resendSignupCode(email: string) {
  const { error } = await supabase.auth.resend({
    type: "signup",
    email: email.trim(),
    options: {
      emailRedirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
    },
  });
  if (error) return { error: error.message };
  return { error: null };
}

export async function signIn(email: string, password: string) {
  if (typeof window !== "undefined") localStorage.removeItem("analytica.pending-guest-import");
  const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
  if (error) return { error: error.message };
  // Si el perfil no existe (p. ej. porque el trigger no se disparó), créalo ahora.
  const uid = data.user?.id;
  if (uid) {
    const { data: prof } = await supabase.from("profiles").select("id").eq("id", uid).maybeSingle();
    if (!prof) {
      const meta = (data.user?.user_metadata ?? {}) as { username?: string };
      const username = (meta.username ?? `user_${uid.slice(0, 8)}`).trim();
      await supabase.from("profiles").insert({ id: uid, username }).select().maybeSingle();
    }
    await activateAccountProgress(uid, false);
  }
  return { error: null };
}

export async function signOut() {
  await flushAccountProgress();
  await supabase.auth.signOut();
  activateGuestProgress();
}

// Sincroniza puntos actuales + históricos con el perfil del usuario autenticado.
// Usa una RPC SECURITY DEFINER que garantiza que lifetime_points nunca decrece.
export async function syncProgressToProfile(points: number, totalCorrect: number, lifetimePoints: number) {
  const { data } = await supabase.auth.getSession();
  if (!data.session?.user?.id) return;
  await supabase.rpc("sync_progress", {
    _points: points,
    _total_correct: totalCorrect,
    _lifetime: lifetimePoints,
  });
}

function consumePendingGuestImport(email?: string) {
  if (typeof window === "undefined" || !email) return false;
  const key = "analytica.pending-guest-import";
  const pending = localStorage.getItem(key);
  if (pending !== email.toLowerCase()) return false;
  localStorage.removeItem(key);
  return true;
}
