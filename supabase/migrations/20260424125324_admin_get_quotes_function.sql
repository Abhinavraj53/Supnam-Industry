/*
  # Admin quotes reader function

  Creates a SECURITY DEFINER function that returns all quotes when called with
  the correct admin secret. This lets the admin panel read quotes without
  needing the service role key, since the admin panel already authenticates
  users via a server-side secret token.

  1. New function
     - `admin_list_quotes(secret text)` returns setof quotes
     - Validates the secret against a stored config; raises if invalid.

  2. Security
     - Function is SECURITY DEFINER and runs as table owner, bypassing RLS.
     - Secret is validated inside the function, so only callers with the
       correct admin token can retrieve data.
     - EXECUTE granted to anon + authenticated, since the secret itself is
       the authorization factor.
*/

CREATE OR REPLACE FUNCTION public.admin_list_quotes(secret text)
RETURNS SETOF public.quotes
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF secret IS NULL OR length(secret) < 8 THEN
    RAISE EXCEPTION 'Invalid admin secret';
  END IF;

  IF secret <> current_setting('app.admin_secret', true) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  RETURN QUERY SELECT * FROM public.quotes ORDER BY created_at DESC;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_list_quotes(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_list_quotes(text) TO anon, authenticated;
