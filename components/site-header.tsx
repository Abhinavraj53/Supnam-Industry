'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Flame, Menu, X, Phone, Mail, Search, ChevronDown,
  BadgeCheck, ShieldCheck, Clock, MessageSquare,
} from 'lucide-react';
import { supabase, Category } from '@/lib/supabase';
import { CategoryIcon } from '@/components/category-icon';
import { Company, DEFAULT_COMPANY } from '@/lib/data';

export function SiteHeader({ logoUrl, company }: { logoUrl?: string; company?: Company }) {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [dynamicCompany, setDynamicCompany] = useState<Company>(company || DEFAULT_COMPANY);

  useEffect(() => {
    supabase.from('categories').select('*').order('name').then(({ data }) => {
      setCategories(data || []);
    });
    if (!company) {
      supabase.from('settings').select('*').eq('key', 'company').maybeSingle().then(({ data }) => {
        if (data?.value) setDynamicCompany({ ...DEFAULT_COMPANY, ...data.value });
      });
    }
  }, [company]);

  const c = company || dynamicCompany;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="bg-gray-900 text-gray-200 text-xs">
        <div className="page-shell py-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <span className="flex items-center gap-1.5 break-all sm:break-normal">
                <Phone className="w-3.5 h-3.5 text-brand shrink-0" /> {c.phone}
              </span>
              <span className="flex items-center gap-1.5 break-all lg:hidden">
                <Mail className="w-3.5 h-3.5 text-brand shrink-0" /> {c.email}
              </span>
              <span className="hidden items-center gap-1.5 lg:flex">
                <Mail className="w-3.5 h-3.5 text-brand shrink-0" /> {c.email}
              </span>
            </div>
            <div className="hidden flex-wrap items-center gap-3 text-[11px] lg:flex">
              <span className="flex items-center gap-1.5"><BadgeCheck className="w-3.5 h-3.5 text-brand" /> GST Registered</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-brand" /> TrustSEAL Verified</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-brand" /> {c.responseRate.split(' ')[0]} Response Rate</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-orange-100">
        <div className="page-shell py-3 sm:py-4">
          <div className="flex items-center gap-3 sm:gap-4 xl:gap-6">
            <Link href="/" className="flex min-w-0 items-center gap-3 group shrink">
              {logoUrl ? (
                <img src={logoUrl} alt={c.name} className="h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12" />
              ) : (
                <div className="w-10 h-10 shrink-0 rounded-xl gradient-brand flex items-center justify-center shadow-md group-hover:scale-105 transition-transform sm:w-12 sm:h-12">
                  <Flame className="w-6 h-6 text-white sm:w-7 sm:h-7" />
                </div>
              )}
              <div className="min-w-0">
                <div className="truncate text-base font-bold leading-tight text-gray-900 sm:text-lg lg:text-xl">{c.name}</div>
                <div className="truncate text-[9px] font-semibold tracking-[0.25em] text-brand sm:text-[10px]">{c.tagline}</div>
              </div>
            </Link>

            <form action="/categories" className="hidden min-w-0 flex-1 xl:flex xl:max-w-xl xl:ml-2">
              <div className="flex w-full overflow-hidden rounded-lg border-2 border-orange-200 bg-white focus-within:border-brand">
                <input
                  name="q"
                  type="text"
                  placeholder="Search Products (e.g. Agarbatti, Dhoop, Kapoor)..."
                  className="flex-1 px-4 py-2.5 text-sm outline-none bg-transparent text-gray-800 min-w-0"
                />
                <button type="submit" className="bg-brand hover:bg-orange-600 text-white px-4 lg:px-5 font-semibold text-sm flex items-center gap-2 transition-colors shrink-0">
                  <Search className="w-4 h-4" /> <span className="hidden 2xl:inline">Search</span>
                </button>
              </div>
            </form>

            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center gap-2 bg-brand hover:bg-orange-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow-md"
              >
                <MessageSquare className="w-4 h-4" /> <span className="hidden md:inline">Get Quote</span>
              </Link>
              <button
                onClick={() => setOpen(!open)}
                className="xl:hidden p-2 rounded-lg hover:bg-orange-50 shrink-0"
                aria-label="Menu"
              >
                {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          <form action="/categories" className="mt-3 xl:hidden">
            <div className="flex overflow-hidden rounded-lg border-2 border-orange-200 bg-white focus-within:border-brand">
              <input
                name="q"
                type="text"
                placeholder="Search products..."
                className="min-w-0 flex-1 px-4 py-2.5 text-sm outline-none bg-transparent text-gray-800"
              />
              <button type="submit" className="bg-brand hover:bg-orange-600 text-white px-4 font-semibold text-sm flex items-center gap-2 transition-colors shrink-0">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden xl:block bg-white border-b border-orange-100">
        <div className="page-shell flex items-center gap-1">
          <Link href="/" className="px-4 py-3 text-sm font-semibold text-gray-700 hover:text-brand border-b-2 border-transparent hover:border-brand transition-colors">
            Home
          </Link>
          <Link href="/about" className="px-4 py-3 text-sm font-semibold text-gray-700 hover:text-brand border-b-2 border-transparent hover:border-brand transition-colors">
            About Us
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <Link
              href="/categories"
              className={`flex items-center gap-1 px-4 py-3 text-sm font-semibold text-gray-700 hover:text-brand border-b-2 transition-colors ${
                productsOpen ? 'border-brand text-brand' : 'border-transparent'
              }`}
            >
              Our Products <ChevronDown className="w-3.5 h-3.5" />
            </Link>
            {productsOpen && categories.length > 0 && (
              <div className="absolute top-full left-0 w-[720px] bg-white shadow-2xl border border-orange-100 rounded-b-xl p-5 grid grid-cols-3 gap-1 z-50">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-orange-50 text-sm text-gray-700 hover:text-brand transition-colors group"
                  >
                    <span className="w-8 h-8 rounded-lg bg-brand-light flex items-center justify-center group-hover:bg-brand transition-colors">
                      <CategoryIcon name={cat.icon} className="w-4 h-4 text-brand group-hover:text-white" />
                    </span>
                    <span className="font-medium">{cat.name}</span>
                  </Link>
                ))}
                <Link href="/categories" className="col-span-3 mt-2 pt-3 border-t border-orange-100 text-center text-xs font-semibold text-brand uppercase tracking-wider hover:underline">
                  View All Categories
                </Link>
              </div>
            )}
          </div>
          <Link href="/categories" className="px-4 py-3 text-sm font-semibold text-gray-700 hover:text-brand border-b-2 border-transparent hover:border-brand transition-colors">
            All Categories
          </Link>
          <Link href="/contact" className="px-4 py-3 text-sm font-semibold text-gray-700 hover:text-brand border-b-2 border-transparent hover:border-brand transition-colors">
            Contact Us
          </Link>
          <div className="ml-auto text-xs text-gray-500 py-3 flex items-center gap-2">
            <span className="font-semibold text-gray-700">Annual Turnover:</span> {c.turnover}
          </div>
        </div>
      </div>

      {open && (
        <div className="xl:hidden border-t border-orange-100 bg-white max-h-[80vh] overflow-y-auto">
          <nav className="page-shell py-4 flex flex-col gap-1">
            <Link href="/" onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-brand font-medium">Home</Link>
            <Link href="/about" onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-brand font-medium">About Us</Link>
            <button
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
              className="px-3 py-2.5 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-brand font-medium flex items-center justify-between"
            >
              Our Products <ChevronDown className={`w-4 h-4 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileProductsOpen && (
              <div className="pl-4 flex flex-col gap-0.5 border-l-2 border-orange-100 ml-3">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    onClick={() => setOpen(false)}
                    className="px-3 py-2 text-sm text-gray-600 hover:text-brand hover:bg-orange-50 rounded-lg flex items-center gap-2"
                  >
                    <CategoryIcon name={cat.icon} className="w-3.5 h-3.5 text-brand" /> {cat.name}
                  </Link>
                ))}
              </div>
            )}
            <Link href="/categories" onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-brand font-medium">All Categories</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="px-3 py-2.5 rounded-lg text-gray-700 hover:bg-orange-50 hover:text-brand font-medium">Contact Us</Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 text-center bg-brand text-white px-4 py-2.5 rounded-lg font-semibold"
            >
              Get Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
