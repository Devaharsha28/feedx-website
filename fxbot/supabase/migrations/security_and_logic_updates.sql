-- Function for students to escalate issues
-- Validates ownership and 48h rule server-side
CREATE OR REPLACE FUNCTION public.escalate_issue(
  p_issue_id UUID,
  p_reason TEXT,
  p_escalated_to TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  v_issue_created_at TIMESTAMPTZ;
  v_user_id UUID;
BEGIN
  -- Get issue details
  SELECT created_at, user_id INTO v_issue_created_at, v_user_id
  FROM public.issues
  WHERE id = p_issue_id;

  -- Check if issue exists
  IF v_issue_created_at IS NULL THEN
    RAISE EXCEPTION 'Issue not found';
  END IF;

  -- Check ownership
  IF v_user_id != auth.uid() THEN
    RAISE EXCEPTION 'You can only escalate your own issues';
  END IF;

  -- Check 48h rule
  IF NOW() < v_issue_created_at + INTERVAL '48 hours' THEN
    RAISE EXCEPTION 'Issue cannot be escalated before 48 hours';
  END IF;

  -- Perform update
  UPDATE public.issues
  SET 
    escalated = true,
    escalation_reason = p_reason,
    escalated_to = p_escalated_to,
    escalated_at = NOW(),
    updated_at = NOW()
  WHERE id = p_issue_id;
END;
$$;

-- Function for faculty to respond and update status atomically
CREATE OR REPLACE FUNCTION public.respond_to_issue(
  p_issue_id UUID,
  p_message TEXT,
  p_new_status TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  v_faculty_role TEXT;
BEGIN
  -- Check if user is faculty
  SELECT role INTO v_faculty_role
  FROM public.profiles
  WHERE id = auth.uid();

  IF v_faculty_role != 'faculty' THEN
    RAISE EXCEPTION 'Only faculty can respond to issues';
  END IF;

  -- Insert response
  INSERT INTO public.responses (issue_id, faculty_id, message)
  VALUES (p_issue_id, auth.uid(), p_message);

  -- Update issue status
  UPDATE public.issues
  SET 
    status = p_new_status,
    resolution_message = CASE WHEN p_new_status = 'resolved' THEN p_message ELSE resolution_message END,
    resolved_at = CASE WHEN p_new_status = 'resolved' THEN NOW() ELSE resolved_at END,
    updated_at = NOW()
  WHERE id = p_issue_id;
END;
$$;
