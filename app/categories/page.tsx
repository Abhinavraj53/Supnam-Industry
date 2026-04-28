'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Package, ArrowRight, SlidersHorizontal, ChevronRight } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ProductCard } from '@/components/product-card';
import { CategoryIcon } from '@/components/category-icon';
import { supabase, Product, Category } from '@/lib/supabase';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    (async () => {
      const [cats, prods, sett] = await Promise.all([
        supabase.from('categories').select('*').order('name'),
        supabase.from('products').select('*, categories(*)').order('created_at', { ascending: false }),
        supabase.from('settings').select('*'),
      ]);
      setCategories(cats.data || []);
      setProducts((prods.data as Product[]) || []);
      const sMap: any = {};
      (sett.data || []).forEach((s: any) => (sMap[s.key] = s.value));
      setSettings(sMap);
    })();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) setQuery(q);
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCat === 'all' || p.category_id === selectedCat;
      const matchQ = !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQ;
    });
  }, [products, selectedCat, query]);

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader logoUrl={settings?.theme?.logoUrl} />

      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border-b-4 border-brand">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
            <Link href="/" className="hover:text-brand">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-brand">Our Products</span>
          </nav>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-brand uppercase tracking-widest mb-2">Complete Catalog</p>
              <h1 className="text-3xl md:text-4xl font-bold">All Categories & Products</h1>
              <p className="text-gray-300 mt-2 max-w-2xl">Browse our complete range of authentic pujan products sourced with devotion and verified for quality.</p>
            </div>
            <div className="text-sm bg-white/10 border border-white/20 rounded-md px-4 py-2">
              <span className="text-gray-300">Total Products:</span> <span className="font-bold text-white">{products.length}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-[260px_1fr] gap-6">
          <aside className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
                <Search className="w-4 h-4 text-brand" />
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Search</h3>
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Product name..."
                className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand"
              />
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 p-4 border-b border-gray-100 bg-orange-50 rounded-t-lg">
                <SlidersHorizontal className="w-4 h-4 text-brand" />
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Categories</h3>
              </div>
              <ul className="p-2 max-h-[500px] overflow-y-auto">
                <li>
                  <button
                    onClick={() => setSelectedCat('all')}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center gap-2 transition-colors ${
                      selectedCat === 'all' ? 'bg-brand text-white' : 'hover:bg-orange-50 text-gray-700'
                    }`}
                  >
                    <Package className="w-4 h-4" /> All Products
                    <span className="ml-auto text-xs opacity-75">{products.length}</span>
                  </button>
                </li>
                {categories.map((c) => {
                  const count = products.filter((p) => p.category_id === c.id).length;
                  return (
                    <li key={c.id}>
                      <button
                        onClick={() => setSelectedCat(c.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center gap-2 transition-colors ${
                          selectedCat === c.id ? 'bg-brand text-white' : 'hover:bg-orange-50 text-gray-700'
                        }`}
                      >
                        <CategoryIcon name={c.icon} className="w-4 h-4" />
                        <span className="line-clamp-1">{c.name}</span>
                        <span className="ml-auto text-xs opacity-75">{count}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-brand to-orange-600 rounded-lg p-5 text-white">
              <h3 className="font-bold mb-2">Need Bulk Pricing?</h3>
              <p className="text-xs text-orange-50 mb-4 leading-relaxed">Contact us for wholesale rates on large quantity orders.</p>
              <Link href="/contact" className="inline-flex items-center gap-1.5 bg-white text-brand px-4 py-2 rounded-md text-xs font-bold hover:bg-orange-50 transition-colors">
                Get Quote <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>

          <div>
            <div className="flex items-center justify-between mb-4 bg-white border border-gray-200 rounded-lg px-4 py-3">
              <p className="text-sm text-gray-600">
                Showing <span className="font-bold text-gray-900">{filtered.length}</span> of <span className="font-bold text-gray-900">{products.length}</span> products
              </p>
              <Link href="/contact" className="text-sm font-semibold text-brand hover:underline flex items-center gap-1">
                Bulk Order <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            {filtered.length === 0 ? (
              <div className="bg-white border border-dashed border-orange-300 rounded-lg p-16 text-center">
                <Package className="w-12 h-12 text-brand/60 mx-auto mb-3" />
                <p className="text-gray-600">No products match your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
