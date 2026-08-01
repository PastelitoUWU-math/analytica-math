CREATE OR REPLACE FUNCTION public.sync_progress(_points integer, _total_correct integer, _lifetime integer)
RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER
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
REVOKE ALL ON FUNCTION public.sync_progress(integer, integer, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.sync_progress(integer, integer, integer) TO authenticated, service_role;