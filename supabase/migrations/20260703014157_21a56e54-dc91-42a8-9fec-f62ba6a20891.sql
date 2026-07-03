
-- Añadir puntos históricos acumulados (nunca decrecen aunque el jugador gaste puntos en la tienda)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS lifetime_points integer NOT NULL DEFAULT 0;

-- Backfill: la primera vez que exista la columna, lifetime = max(actual, lifetime)
UPDATE public.profiles SET lifetime_points = GREATEST(lifetime_points, points);

-- Función RPC segura: actualiza puntos actuales y garantiza que lifetime nunca disminuye
CREATE OR REPLACE FUNCTION public.sync_progress(_points integer, _total_correct integer, _lifetime integer)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
     SET points = GREATEST(0, _points),
         total_correct = GREATEST(total_correct, _total_correct),
         lifetime_points = GREATEST(lifetime_points, _lifetime),
         updated_at = now()
   WHERE id = auth.uid();
END;
$$;

GRANT EXECUTE ON FUNCTION public.sync_progress(integer, integer, integer) TO authenticated;
