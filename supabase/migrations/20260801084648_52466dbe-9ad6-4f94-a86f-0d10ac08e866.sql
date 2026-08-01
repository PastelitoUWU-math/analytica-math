CREATE TABLE public.user_progress (
  user_id uuid PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  completed jsonb NOT NULL DEFAULT '{}'::jsonb,
  boss_defeated jsonb NOT NULL DEFAULT '{}'::jsonb,
  points integer NOT NULL DEFAULT 0 CHECK (points >= 0),
  lifetime_points integer NOT NULL DEFAULT 0 CHECK (lifetime_points >= 0),
  total_correct integer NOT NULL DEFAULT 0 CHECK (total_correct >= 0),
  owned_cosmetics jsonb NOT NULL DEFAULT '["theme-pergamino"]'::jsonb,
  active_theme text NOT NULL DEFAULT 'theme-pergamino',
  boosts jsonb NOT NULL DEFAULT '{"hint":0,"skip":0}'::jsonb,
  streak jsonb NOT NULL DEFAULT '{}'::jsonb,
  achievements jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_progress TO authenticated;
GRANT ALL ON public.user_progress TO service_role;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own progress" ON public.user_progress FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can create own progress" ON public.user_progress FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON public.user_progress FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.touch_user_progress_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  NEW.lifetime_points = GREATEST(OLD.lifetime_points, NEW.lifetime_points);
  NEW.total_correct = GREATEST(OLD.total_correct, NEW.total_correct);
  RETURN NEW;
END;
$$;
CREATE TRIGGER touch_user_progress_updated_at
BEFORE UPDATE ON public.user_progress
FOR EACH ROW EXECUTE FUNCTION public.touch_user_progress_updated_at();

CREATE OR REPLACE FUNCTION public.create_user_progress()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_progress (user_id, points, lifetime_points, total_correct)
  VALUES (NEW.id, NEW.points, NEW.lifetime_points, NEW.total_correct)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;
CREATE TRIGGER create_user_progress_after_profile
AFTER INSERT ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.create_user_progress();

INSERT INTO public.user_progress (user_id, points, lifetime_points, total_correct)
SELECT id, points, lifetime_points, total_correct
FROM public.profiles
ON CONFLICT (user_id) DO NOTHING;