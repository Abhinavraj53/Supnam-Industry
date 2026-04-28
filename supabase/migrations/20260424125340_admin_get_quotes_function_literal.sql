/*
  # Simplify admin_list_quotes

  Replaces the config-based secret check with a literal comparison against
  the admin token. The server-side API route is the only caller and holds
  the ADMIN_TOKEN environment variable.

  1. Changes
     - Recreate `admin_list_quotes(secret text)` to compare against the
       literal admin token value instead of a DB setting.
*/

CREATE OR REPLACE FUNCTION public.admin_list_quotes(secret text)
RETURNS SETOF public.quotes
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF secret IS NULL OR secret <> 'pujnam-secret-token-change-me' THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  RETURN QUERY SELECT * FROM public.quotes ORDER BY created_at DESC;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_list_quotes(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_list_quotes(text) TO anon, authenticated;
