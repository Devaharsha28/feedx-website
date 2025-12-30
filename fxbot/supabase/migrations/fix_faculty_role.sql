-- Fix handle_new_user trigger to properly handle faculty role
-- This replaces the existing trigger with correct role handling

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
    -- Read role from metadata, default to 'student' only if NULL
    COALESCE(NEW.raw_user_meta_data->>'role', 'student'),
    COALESCE(NEW.raw_user_meta_data->>'department', 'N/A'),
    COALESCE(NEW.raw_user_meta_data->>'mobile_number', NULL),
    -- Only generate username for students
    CASE 
      WHEN COALESCE(NEW.raw_user_meta_data->>'role', 'student') = 'student' 
      THEN public.generate_username()
      ELSE NULL
    END,
    COALESCE(NEW.raw_user_meta_data->>'pin', NULL)
  );
  RETURN NEW;
END;
$$;
