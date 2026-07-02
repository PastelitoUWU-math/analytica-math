// Cliente-side auth y perfil (Lovable Cloud / Supabase)
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export type Profile = {
  id: string;
  username: string;
  points: number;
  total_correct: number;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    // Suscripción PRIMERO — evita perder cambios durante el bootstrap
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
      if (session?.user) {
        setTimeout(() => loadProfile(session.user.id), 0);
      } else {
        setProfile(null);
      }
    });
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setUser(data.session?.user ?? null);
      if (data.session?.user) loadProfile(data.session.user.id);
      setLoading(false);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
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
    return { error: "El nombre de usuario debe tener 3-24 caracteres (letras, dígitos, _ . -)." };
  }
  // Chequeo previo de disponibilidad
  const { data: taken } = await supabase.from("profiles").select("id").eq("username", clean).maybeSingle();
  if (taken) return { error: "Ese nombre de usuario ya está en uso." };

  const emailRedirectTo = typeof window !== "undefined" ? window.location.origin : undefined;
  const { error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: { emailRedirectTo, data: { username: clean } },
  });
  if (error) return { error: error.message };
  return { error: null };
}

export async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
  if (error) return { error: error.message };
  return { error: null };
}

export async function signOut() {
  await supabase.auth.signOut();
}

// Sincroniza puntos actuales del jugador con su fila en profiles.
// Se llama best-effort desde el flujo de progreso.
export async function syncPointsToProfile(points: number, totalCorrect: number) {
  const { data } = await supabase.auth.getSession();
  const uid = data.session?.user?.id;
  if (!uid) return;
  await supabase.from("profiles").update({ points, total_correct: totalCorrect }).eq("id", uid);
}
