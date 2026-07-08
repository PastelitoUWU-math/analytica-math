import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Comprueba si un correo ya está registrado (verificado o no) en Auth.
// Devuelve { exists: boolean }. Se usa antes del signUp para evitar registros duplicados.
export const checkEmailAvailable = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ email: z.string().email() }).parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const email = data.email.trim().toLowerCase();
    // Recorremos hasta encontrar (proyecto en beta, pocas cuentas).
    let page = 1;
    const perPage = 200;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { data: res, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage });
      if (error) return { exists: false, error: error.message };
      const hit = res.users.find((u) => (u.email ?? "").toLowerCase() === email);
      if (hit) return { exists: true };
      if (res.users.length < perPage) return { exists: false };
      page += 1;
      if (page > 20) return { exists: false };
    }
  });
