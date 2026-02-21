
-- Create role enum and user_roles table
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checks
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS for user_roles: only admins can read
CREATE POLICY "Users can read own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create imprints table
CREATE TABLE public.imprints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  title TEXT NOT NULL,
  description TEXT,
  shadow_image_url TEXT NOT NULL,
  result_image_url TEXT NOT NULL
);

ALTER TABLE public.imprints ENABLE ROW LEVEL SECURITY;

-- Public read access for imprints
CREATE POLICY "Anyone can view imprints"
  ON public.imprints FOR SELECT
  USING (true);

-- Only admins can insert/update/delete
CREATE POLICY "Admins can insert imprints"
  ON public.imprints FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update imprints"
  ON public.imprints FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete imprints"
  ON public.imprints FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for imprints
INSERT INTO storage.buckets (id, name, public) VALUES ('imprints', 'imprints', true);

-- Storage policies
CREATE POLICY "Anyone can view imprint images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'imprints');

CREATE POLICY "Admins can upload imprint images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'imprints' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update imprint images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'imprints' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete imprint images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'imprints' AND public.has_role(auth.uid(), 'admin'));
