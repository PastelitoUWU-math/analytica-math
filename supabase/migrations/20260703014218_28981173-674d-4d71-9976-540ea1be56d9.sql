
REVOKE EXECUTE ON FUNCTION public.sync_progress(integer, integer, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.sync_progress(integer, integer, integer) TO authenticated;
