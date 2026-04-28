import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const adminClientErrorMessage =
  'SUPABASE_SERVICE_ROLE_KEY is not configured. Add it to .env to enable admin write features and quote management.';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function createAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error(adminClientErrorMessage);
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export function getAdminClientErrorMessage() {
  return adminClientErrorMessage;
}

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  icon: string;
  created_at: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category_id: string | null;
  images: string[];
  price_range: string;
  min_order: string;
  featured: boolean;
  created_at: string;
  categories?: Category | null;
};

export type Quote = {
  id: string;
  name: string;
  phone: string;
  email: string;
  product_name: string;
  quantity: string;
  message: string;
  status: string;
  created_at: string;
};

export type Settings = {
  id: string;
  key: string;
  value: any;
  updated_at: string;
};
