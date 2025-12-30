-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create PROFILES table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'faculty')),
  department TEXT NOT NULL,
  username TEXT UNIQUE,
  pin TEXT,
  mobile_number TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 2. Create ISSUES table
CREATE TABLE public.issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  type TEXT NOT NULL CHECK (type IN ('issue', 'feedback', 'suggestion')),
  category TEXT NOT NULL,
  specify_category TEXT,
  description TEXT NOT NULL,
  sent_to TEXT,
  faculty_name TEXT,
  anonymous BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'submitted', 'in_progress', 'resolved', 'rejected')),
  issue_id TEXT,
  proof_files TEXT[],
  escalated BOOLEAN DEFAULT false,
  escalated_to TEXT,
  escalation_reason TEXT,
  escalated_at TIMESTAMPTZ,
  assigned_to UUID REFERENCES public.profiles(id),
  eta_date TIMESTAMPTZ,
  resolution_message TEXT,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.issues ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own issues"
  ON public.issues FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Students can insert their own issues"
  ON public.issues FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Faculty can view all issues"
  ON public.issues FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'faculty'
    )
  );

CREATE POLICY "Faculty can update issues"
  ON public.issues FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'faculty'
    )
  );

-- 3. Create RESPONSES table
CREATE TABLE public.responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  issue_id UUID NOT NULL REFERENCES public.issues(id) ON DELETE CASCADE,
  faculty_id UUID NOT NULL REFERENCES public.profiles(id),
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Faculty can insert responses"
  ON public.responses FOR INSERT
  WITH CHECK (
    auth.uid() = faculty_id AND
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'faculty'
    )
  );

CREATE POLICY "Faculty can view all responses"
  ON public.responses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'faculty'
    )
  );

CREATE POLICY "Students can view responses to their issues"
  ON public.responses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM issues 
      WHERE issues.id = responses.issue_id 
      AND issues.user_id = auth.uid()
    )
  );

-- 4. Functions and Triggers

-- Generate Username Function
CREATE OR REPLACE FUNCTION public.generate_username()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  new_username TEXT;
  username_exists BOOLEAN;
BEGIN
  LOOP
    new_username := 'FXlpa' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
    SELECT EXISTS(SELECT 1 FROM public.profiles WHERE username = new_username) INTO username_exists;
    EXIT WHEN NOT username_exists;
  END LOOP;
  RETURN new_username;
END;
$$;

-- Handle New User Trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (
    id, 
    name, 
    email, 
    role, 
    department, 
    mobile_number, 
    username, 
    pin
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'student'),
    COALESCE(NEW.raw_user_meta_data->>'department', 'N/A'),
    COALESCE(NEW.raw_user_meta_data->>'mobile_number', NULL),
    public.generate_username(),
    COALESCE(NEW.raw_user_meta_data->>'pin', NULL)
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Generate Issue ID Trigger
CREATE OR REPLACE FUNCTION public.generate_issue_id()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
BEGIN
  IF NEW.type = 'issue' THEN
    NEW.issue_id = 'FX-ISS-' || UPPER(SUBSTRING(NEW.id::TEXT FROM 1 FOR 8));
  ELSE
    NEW.issue_id = NULL;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_issue_id
  BEFORE INSERT ON public.issues
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_issue_id();

-- Update Timestamp Trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_issues_updated_at
  BEFORE UPDATE ON public.issues
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 5. Storage Setup
INSERT INTO storage.buckets (id, name, public)
VALUES ('issue-proofs', 'issue-proofs', false);

CREATE POLICY "Students can upload issue proofs"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'issue-proofs' AND
  auth.uid()::TEXT = (storage.foldername(name))[1]
);

CREATE POLICY "Students can view their own proofs"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'issue-proofs' AND
  auth.uid()::TEXT = (storage.foldername(name))[1]
);

CREATE POLICY "Faculty can view all proofs"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'issue-proofs' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'faculty'
  )
);
