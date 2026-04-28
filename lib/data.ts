import { supabase, Category, Product, Settings } from './supabase';

export type Company = {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  registrationNo: string;
  panNo: string;
  turnover: string;
  establishedYear: string;
  natureOfBusiness: string;
  legalStatus: string;
  supplyStates: string;
  supplyMode: string;
  responseRate: string;
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  yearsExperience: string;
  productVarieties: string;
  devoteesServed: string;
  statesCovered: string;
};

export const DEFAULT_COMPANY: Company = {
  name: 'SAPNAM INDUSTRY',
  tagline: 'AASTHA KA SAARTHI',
  phone: '+91 98765 43210',
  email: 'info@sapnamindustry.com',
  address: 'Sapnam Industry, Gujarat, India',
  registrationNo: 'GJ-24-0218524',
  panNo: 'AFUFS9556G',
  turnover: '₹ 5 - 25 Cr',
  establishedYear: '2015',
  natureOfBusiness: 'Trader & Manufacturer',
  legalStatus: 'Individual - Proprietor',
  supplyStates: 'Bihar, Gujarat, Jharkhand, UP',
  supplyMode: 'Transport, Train',
  responseRate: '79% Within 24 Hrs',
  facebook: '',
  instagram: '',
  twitter: '',
  linkedin: '',
  yearsExperience: '9+',
  productVarieties: '50+',
  devoteesServed: '10K+',
  statesCovered: '4+',
};

export function getCompanyFromSettings(settings: Record<string, any>): Company {
  return { ...DEFAULT_COMPANY, ...(settings?.company || {}) };
}

export async function getCategories(): Promise<Category[]> {
  const { data } = await supabase.from('categories').select('*').order('name');
  return data || [];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  return data;
}

export async function getProducts(): Promise<Product[]> {
  const { data } = await supabase
    .from('products')
    .select('*, categories(*)')
    .order('created_at', { ascending: false });
  return (data as Product[]) || [];
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('featured', true)
    .limit(8);
  return (data as Product[]) || [];
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const { data } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('category_id', categoryId);
  return (data as Product[]) || [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('slug', slug)
    .maybeSingle();
  return data as Product | null;
}

export async function getSetting(key: string): Promise<any> {
  const { data } = await supabase
    .from('settings')
    .select('*')
    .eq('key', key)
    .maybeSingle();
  return data?.value || null;
}

export async function getAllSettings(): Promise<Record<string, any>> {
  const { data } = await supabase.from('settings').select('*');
  const result: Record<string, any> = {};
  (data || []).forEach((s: Settings) => {
    result[s.key] = s.value;
  });
  return result;
}
