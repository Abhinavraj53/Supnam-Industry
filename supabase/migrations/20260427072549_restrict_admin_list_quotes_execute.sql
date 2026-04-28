/*
  # Restrict EXECUTE on admin_list_quotes

  1. Security
    - Revokes EXECUTE on `public.admin_list_quotes(text)` from `PUBLIC`,
      `anon`, and `authenticated` roles so the SECURITY DEFINER function
      cannot be invoked through PostgREST `/rest/v1/rpc/admin_list_quotes`
      by unauthenticated or authenticated client users.
    - Retains EXECUTE for `service_role` only, so server-side admin code
      (using the Supabase service role key) can still call it.

  2. Notes
    - The function continues to exist with the same definition; only the
      ACL is tightened. No data is altered or removed.
    - This addresses the linter warnings:
      "Public Can Execute SECURITY DEFINER Function" and
      "Signed-In Users Can Execute SECURITY DEFINER Function".
*/

REVOKE EXECUTE ON FUNCTION public.admin_list_quotes(text) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.admin_list_quotes(text) FROM anon;
REVOKE EXECUTE ON FUNCTION public.admin_list_quotes(text) FROM authenticated;
GRANT EXECUTE ON FUNCTION public.admin_list_quotes(text) TO service_role;
