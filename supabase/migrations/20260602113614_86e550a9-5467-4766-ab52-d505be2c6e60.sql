
-- Fix search_path on trigger function
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Restrict EXECUTE on SECURITY DEFINER helpers — only triggers/policies use them
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_team_member(UUID) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;

-- Tighten public lead insert: enforce non-empty nome/whatsapp with size limits
DROP POLICY IF EXISTS "Public can insert leads via landing form" ON public.leads;
CREATE POLICY "Public can insert leads via landing form"
ON public.leads FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(nome)) BETWEEN 1 AND 200
  AND length(trim(whatsapp)) BETWEEN 5 AND 30
);
