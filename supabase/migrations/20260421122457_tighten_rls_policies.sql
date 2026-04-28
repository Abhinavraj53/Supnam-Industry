/*
  # Tighten RLS Policies

  1. Changes
    - Remove overly permissive "authenticated users can ..." policies on categories, products, settings.
      These policies used USING(true)/WITH CHECK(true) and would allow any authenticated Supabase user
      to read/write/delete all rows. Admin writes are handled server-side via the service role, which
      bypasses RLS, so these policies are unnecessary and dangerous.
    - Replace the unrestricted "Anyone can submit quotes" INSERT policy with a validated version that
      requires non-empty name/phone/email and forces status to start as 'new'.

  2. Security
    - Tables remain RLS-enabled.
    - Public read access on categories, products, settings is preserved.
    - Quote submissions from anonymous users are still allowed but must pass basic validation.
    - All write access on categories, products, settings, and quote management is restricted to
      the service role (used only from trusted server-side admin routes).
*/

DROP POLICY IF EXISTS "Authenticated users can manage categories" ON categories;
DROP POLICY IF EXISTS "Authenticated users can update categories" ON categories;
DROP POLICY IF EXISTS "Authenticated users can delete categories" ON categories;

DROP POLICY IF EXISTS "Authenticated users can manage products" ON products;
DROP POLICY IF EXISTS "Authenticated users can update products" ON products;
DROP POLICY IF EXISTS "Authenticated users can delete products" ON products;

DROP POLICY IF EXISTS "Authenticated users can manage settings" ON settings;
DROP POLICY IF EXISTS "Authenticated users can update settings" ON settings;

DROP POLICY IF EXISTS "Anyone can submit quotes" ON quotes;

CREATE POLICY "Public can submit valid quotes"
  ON quotes FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(name)) > 0
    AND length(trim(phone)) > 0
    AND length(trim(email)) > 0
    AND email LIKE '%_@_%.__%'
    AND status = 'new'
  );
