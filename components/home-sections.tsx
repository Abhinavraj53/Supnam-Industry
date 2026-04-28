'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { supabase, Category, Product } from '@/lib/supabase';
import { CategoryIcon } from '@/components/category-icon';
import { ProductCard } from '@/components/product-card';

export function HomeCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('categories').select('*').order('name').then(({ data }) => {
      setCategories(data || []);
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-10 lg:py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4 border-b-2 border-brand pb-4">
          <div>
            <p className="text-xs font-bold text-brand uppercase tracking-widest mb-1">Browse By Category</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Product Range</h2>
          </div>
          <Link href="/categories" className="inline-flex items-center gap-1 text-sm text-brand font-semibold hover:gap-2 transition-all">
            View All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-3 animate-pulse">
                <div className="aspect-square bg-orange-50 rounded-md mb-2" />
                <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto" />
              </div>
            ))}
          </div>
        ) : categories.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No categories available yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group bg-white rounded-lg border border-gray-200 hover:border-brand hover:shadow-md transition-all p-3 text-center"
              >
                <div className="relative w-full aspect-square mb-2 rounded-md overflow-hidden bg-orange-50">
                  {cat.image_url && (
                    <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  )}
                </div>
                <div className="flex items-center justify-center gap-1.5 mb-0.5">
                  <CategoryIcon name={cat.icon} className="w-3.5 h-3.5 text-brand" />
                  <h3 className="font-semibold text-gray-900 group-hover:text-brand transition-colors text-sm line-clamp-1">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function HomeFeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('products')
      .select('*, categories(*)')
      .eq('featured', true)
      .limit(8)
      .then(({ data }) => {
        setProducts((data as Product[]) || []);
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-10 lg:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4 border-b-2 border-brand pb-4">
          <div>
            <p className="text-xs font-bold text-brand uppercase tracking-widest mb-1">Featured Products</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Bestselling Items</h2>
          </div>
          <Link href="/categories" className="inline-flex items-center gap-1 text-sm text-brand font-semibold hover:gap-2 transition-all">
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
                <div className="aspect-square bg-orange-50" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-6 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">No featured products available yet.</p>
            <Link href="/categories" className="inline-flex items-center gap-2 text-brand font-semibold hover:underline">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
