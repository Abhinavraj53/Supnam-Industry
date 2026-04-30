import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ShieldCheck, Truck, Award, Package2, Phone, MessageSquare, BadgeCheck, Clock } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { QuoteForm } from '@/components/quote-form';
import { getProductBySlug, getAllSettings, getCompanyFromSettings } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function ProductDetail({ params }: { params: { slug: string } }) {
  const [product, settings] = await Promise.all([
    getProductBySlug(params.slug),
    getAllSettings(),
  ]);
  if (!product) notFound();
  const company = getCompanyFromSettings(settings);

  const images = product.images.length ? product.images : ['https://images.pexels.com/photos/37116937/pexels-photo-37116937.jpeg?auto=compress&cs=tinysrgb&w=800'];

  const highlights = [
    { icon: ShieldCheck, text: '100% Authentic' },
    { icon: Award, text: 'Premium Quality' },
    { icon: Truck, text: 'Pan-India Delivery' },
    { icon: Package2, text: 'Bulk Orders' },
  ];

  const productInfo = [
    { label: 'Brand', value: company.name },
    { label: 'Minimum Order Quantity', value: product.min_order },
    { label: 'Price Range', value: product.price_range || 'On Request' },
    { label: 'Category', value: product.categories?.name || 'Pujan Products' },
    { label: 'Country of Origin', value: 'Made in India' },
    { label: 'Packaging Type', value: 'Customizable' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader logoUrl={settings?.theme?.logoUrl} company={company} />

      <section className="bg-white border-b border-gray-200">
        <div className="page-shell py-4">
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500">
            <Link href="/" className="hover:text-brand">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/categories" className="hover:text-brand">Our Products</Link>
            {product.categories?.slug && (
              <>
                <ChevronRight className="w-3 h-3" />
                <Link href={`/categories/${product.categories.slug}`} className="hover:text-brand">{product.categories.name}</Link>
              </>
            )}
            <ChevronRight className="w-3 h-3" />
            <span className="text-brand line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="page-shell">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-4 sm:p-6 lg:border-r border-gray-100">
                <div className="aspect-square rounded-lg overflow-hidden bg-orange-50 mb-3 group">
                  <img src={images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                {images.length > 1 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {images.slice(0, 4).map((img, i) => (
                      <div key={i} className="aspect-square rounded-md overflow-hidden bg-orange-50 border border-gray-200 hover:border-brand transition-colors cursor-pointer">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-6 lg:p-8">
                {product.categories?.name && (
                  <Link href={`/categories/${product.categories.slug}`} className="inline-block text-[11px] font-bold text-brand uppercase tracking-widest mb-2 hover:underline">
                    {product.categories.name}
                  </Link>
                )}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">{product.name}</h1>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 pb-5 border-b border-gray-100">
                  <span className="flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded-sm font-semibold"><BadgeCheck className="w-3.5 h-3.5" /> Verified Supplier</span>
                  <span className="flex items-center gap-1 text-xs bg-orange-50 text-brand px-2 py-1 rounded-sm font-semibold"><Clock className="w-3.5 h-3.5" /> 24 Hr Response</span>
                </div>

                <div className="bg-orange-50 border-l-4 border-brand rounded-r-lg p-4 mb-5">
                  <div className="text-xs text-gray-600 mb-1 uppercase tracking-wider font-semibold">Price Range</div>
                  <div className="text-3xl font-bold text-gray-900">{product.price_range || 'Ask Price'}</div>
                  <div className="mt-2 pt-2 border-t border-orange-200 flex items-center gap-2 text-sm text-gray-700">
                    <Package2 className="w-4 h-4 text-brand" /> MOQ: <span className="font-bold">{product.min_order}</span>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-5">{product.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                  {highlights.map((h) => (
                    <div key={h.text} className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
                      <h.icon className="w-4 h-4 text-brand" />
                      <span className="text-xs font-semibold text-gray-700">{h.text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                  <a href="#quote" className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 bg-brand hover:bg-orange-600 text-white px-5 py-3 rounded-md font-semibold shadow-md transition">
                    <MessageSquare className="w-4 h-4" /> Get Quote Now
                  </a>
                  <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-3 rounded-md font-semibold transition">
                    <Phone className="w-4 h-4" /> Call Now
                  </a>
                </div>
                <p className="mt-3 text-xs text-center text-gray-500 italic">Yes! I am interested in this product</p>
              </div>
            </div>

            <div className="border-t border-gray-100 bg-gray-50 p-4 sm:p-6 lg:p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider text-sm border-b-2 border-brand pb-2 inline-block">Product Details</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {productInfo.map((info) => (
                  <div key={info.label} className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 mb-1">{info.label}</div>
                    <div className="text-sm font-semibold text-gray-900 break-words">{info.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div id="quote" className="mt-8 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="grid lg:grid-cols-[1fr_1.2fr] gap-0">
              <div className="bg-gradient-to-br from-brand to-orange-600 text-white p-6 sm:p-8 lg:p-10">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur border border-white/30 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider mb-3">
                  Request Quote
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Get Best Wholesale Price</h2>
                <p className="text-orange-50 leading-relaxed mb-6">
                  Share your requirements and our team will respond within 24 hours with competitive B2B pricing for <span className="font-semibold text-white">{product.name}</span>.
                </p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2"><BadgeCheck className="w-4 h-4" /> Verified Supplier</div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {company.responseRate}</div>
                  <div className="flex items-center gap-2"><Truck className="w-4 h-4" /> Pan-India Delivery</div>
                </div>
              </div>
              <div className="p-4 sm:p-6 lg:p-8">
                <QuoteForm productName={product.name} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter company={company} />
    </div>
  );
}
