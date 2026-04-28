import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ChevronRight, Package } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { ProductCard } from '@/components/product-card';
import { CategoryIcon } from '@/components/category-icon';
import { getCategoryBySlug, getProductsByCategory, getAllSettings, getCategories, getCompanyFromSettings } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function CategoryDetail({ params }: { params: { slug: string } }) {
  const [category, settings, allCats] = await Promise.all([
    getCategoryBySlug(params.slug),
    getAllSettings(),
    getCategories(),
  ]);
  if (!category) notFound();
  const products = await getProductsByCategory(category.id);
  const company = getCompanyFromSettings(settings);

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader logoUrl={settings?.theme?.logoUrl} company={company} />

      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border-b-4 border-brand">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
            <Link href="/" className="hover:text-brand">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/categories" className="hover:text-brand">Our Products</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-brand">{category.name}</span>
          </nav>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
            <div className="w-16 h-16 rounded-xl bg-brand/20 border border-brand/30 flex items-center justify-center flex-shrink-0">
              <CategoryIcon name={category.icon} className="w-8 h-8 text-brand" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-brand uppercase tracking-widest mb-1">Product Category</p>
              <h1 className="text-2xl md:text-3xl font-bold">{category.name}</h1>
              <p className="text-gray-300 mt-1 max-w-2xl text-sm">{category.description || `Explore our complete range of ${category.name.toLowerCase()}.`}</p>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-brand hover:bg-orange-600 text-white px-5 py-2.5 rounded-md font-semibold shadow">
              Get Bulk Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-[240px_1fr] gap-6">
          <aside className="bg-white border border-gray-200 rounded-lg shadow-sm h-fit">
            <div className="p-4 border-b border-gray-100 bg-orange-50 rounded-t-lg">
              <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">All Categories</h3>
            </div>
            <ul className="p-2 max-h-[500px] overflow-y-auto">
              {allCats.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/categories/${c.slug}`}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                      c.id === category.id ? 'bg-brand text-white font-semibold' : 'hover:bg-orange-50 text-gray-700'
                    }`}
                  >
                    <CategoryIcon name={c.icon} className="w-4 h-4" />
                    <span className="line-clamp-1">{c.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          <div>
            <div className="flex items-center justify-between mb-4 bg-white border border-gray-200 rounded-lg px-4 py-3">
              <p className="text-sm text-gray-600">
                <span className="font-bold text-gray-900">{products.length}</span> products in {category.name}
              </p>
              <Link href="/contact" className="text-sm font-semibold text-brand hover:underline flex items-center gap-1">
                Bulk Order <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            {products.length === 0 ? (
              <div className="bg-white border border-dashed border-orange-300 rounded-lg p-16 text-center">
                <Package className="w-12 h-12 text-brand/60 mx-auto mb-3" />
                <p className="text-gray-600">No products available in this category yet.</p>
                <Link href="/contact" className="mt-4 inline-block text-sm text-brand font-semibold hover:underline">Contact us for inquiries</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <SiteFooter company={company} />
    </div>
  );
}
