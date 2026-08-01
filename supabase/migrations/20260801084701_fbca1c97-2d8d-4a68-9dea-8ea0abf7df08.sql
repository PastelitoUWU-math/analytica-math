REVOKE ALL ON FUNCTION public.create_user_progress() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.create_user_progress() TO service_role;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;
REVOKE ALL ON FUNCTION public.sync_progress(integer, integer, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.sync_progress(integer, integer, integer) TO authenticated, service_role;
REVOKE ALL ON FUNCTION public.prevent_username_change() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.prevent_username_change() TO service_role;