import Link from 'next/link';
import {
  ShieldCheck, Award, ArrowRight, Phone, MessageSquare,
  BadgeCheck, Clock, Building2, TrendingUp, Truck, MapPin,
  FileCheck, Users,
} from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { HomeCategories, HomeFeaturedProducts } from '@/components/home-sections';
import { getAllSettings, getCompanyFromSettings } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const settings = await getAllSettings();

  const home = settings?.homepage || {};
  const company = getCompanyFromSettings(settings);
  const heroImage = home.heroImage || 'https://images.pexels.com/photos/37116937/pexels-photo-37116937.jpeg?auto=compress&cs=tinysrgb&w=1600';

  const trustStats = [
    { icon: Building2, label: 'Nature of Business', value: company.natureOfBusiness },
    { icon: TrendingUp, label: 'Annual Turnover', value: company.turnover },
    { icon: Users, label: 'GST Registration', value: company.registrationNo },
    { icon: Clock, label: 'Response Rate', value: company.responseRate },
  ];

  const companyFacts = [
    { label: 'Nature of Business', value: company.natureOfBusiness },
    { label: 'Registered Address', value: company.address },
    { label: 'Supply State', value: company.supplyStates },
    { label: 'Supply Mode', value: company.supplyMode },
    { label: 'PAN No.', value: company.panNo },
    { label: 'Annual Turnover', value: company.turnover },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader logoUrl={settings?.theme?.logoUrl} company={company} />

      <section className="relative bg-gradient-to-br from-orange-50 via-white to-orange-50 border-b border-orange-100">
        <div className="pattern-bg">
          <div className="page-shell py-10 md:py-12 lg:py-14 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-10 items-center">
            <div className="fade-in">
              <div className="inline-flex max-w-full items-center gap-2 bg-white border border-orange-200 text-brand px-3 py-1 rounded-sm text-[11px] font-bold uppercase tracking-wider mb-4 sm:mb-5 shadow-sm">
                <BadgeCheck className="w-3.5 h-3.5" /> TrustSEAL Verified Supplier
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                {home.heroTitle || company.name}
              </h1>
              <p className="text-brand text-base sm:text-lg md:text-xl font-semibold mb-4 tracking-wide">
                {home.heroSubtitle || `AAPKI ${company.tagline}`}
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 max-w-xl">
                {home.heroDescription ||
                  'Manufacturer & Trader of authentic pujan products — Agarbatti, Dhoop, Kapoor, Hawan Samagri, Gangajal, Kumkum, Ashtgandha, Yantra and Pujan Books. Trusted B2B supplier across India.'}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/categories" className="inline-flex w-full items-center justify-center gap-2 bg-brand hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all sm:w-auto">
                  View Our Products <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="inline-flex w-full items-center justify-center gap-2 bg-white border-2 border-gray-800 hover:bg-gray-900 hover:text-white text-gray-900 px-6 py-3 rounded-md font-semibold transition-all sm:w-auto">
                  <MessageSquare className="w-4 h-4" /> Send Inquiry
                </Link>
              </div>
              <div className="mt-8 grid grid-cols-1 min-[420px]:grid-cols-2 xl:grid-cols-4 gap-3">
                {trustStats.map((s) => (
                  <div key={s.label} className="bg-white rounded-lg border border-orange-100 p-3 shadow-sm">
                    <s.icon className="w-5 h-5 text-brand mb-1.5" />
                    <div className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">{s.label}</div>
                    <div className="text-xs font-bold text-gray-900 mt-0.5 leading-tight">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative fade-in">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img src={heroImage} alt="Pujan Products" className="w-full h-[260px] sm:h-[340px] lg:h-[420px] object-cover" />
                <div className="absolute top-0 left-0 bg-brand text-white px-3 sm:px-4 py-2 rounded-br-xl font-bold text-xs sm:text-sm">
                  TRUSTED SINCE {company.establishedYear}
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 md:absolute md:-bottom-5 md:left-5 md:right-5">
                <div className="bg-white rounded-xl shadow-xl p-3 flex items-center gap-3 border border-orange-100">
                  <div className="w-11 h-11 rounded-lg bg-brand-light flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-xs">100% Authentic</div>
                    <div className="text-[10px] text-gray-500">GST Registered</div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-xl p-3 flex items-center gap-3 border border-orange-100 md:justify-self-end">
                  <div className="w-11 h-11 rounded-lg bg-brand-light flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-xs">Premium Quality</div>
                    <div className="text-[10px] text-gray-500">Certified</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-gray-200">
        <div className="page-shell py-4 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-xs md:text-sm">
          <div className="flex items-center gap-2 text-gray-700">
            <BadgeCheck className="w-5 h-5 text-green-600" />
            <span><span className="font-bold">GST</span> Registered</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-gray-200" />
          <div className="flex items-center gap-2 text-gray-700">
            <ShieldCheck className="w-5 h-5 text-brand" />
            <span><span className="font-bold">TrustSEAL</span> Verified</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-gray-200" />
          <div className="flex items-center gap-2 text-gray-700">
            <FileCheck className="w-5 h-5 text-blue-600" />
            <span><span className="font-bold">MSME</span> Registered</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-gray-200" />
          <div className="flex items-center gap-2 text-gray-700">
            <Truck className="w-5 h-5 text-gray-700" />
            <span><span className="font-bold">Pan-India</span> Delivery</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-gray-200" />
          <div className="flex items-center gap-2 text-gray-700">
            <Clock className="w-5 h-5 text-brand" />
            <span><span className="font-bold">{company.responseRate.split(' ')[0]}</span> Response Rate</span>
          </div>
        </div>
      </section>

      <HomeCategories />

      <HomeFeaturedProducts />

      <section className="section-space bg-gray-900 text-white">
        <div className="page-shell grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-10 items-center">
          <div>
            <p className="text-xs font-bold text-brand uppercase tracking-widest mb-2">About The Company</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{company.name} — {company.natureOfBusiness} of Authentic Pujan Products</h2>
            <p className="text-gray-300 leading-relaxed mb-5">
              {company.name} is engaged in manufacturing and trading of pujan products with good quality ranges of agarbatti, dhoop, kapoor, hawan cup, gangajal, kumkum, ashtgandha, yantra and pujan books.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              Our products are most prominently supplied across {company.supplyStates}. We maintain strong relationships with retailers, wholesalers, temples and distributors.
            </p>
            <Link href="/about" className="inline-flex w-full items-center justify-center gap-2 bg-brand hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold transition-all sm:w-auto">
              Read More About Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-5 sm:p-6">
            <h3 className="text-lg font-bold mb-5 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-brand" /> Company Factsheet
            </h3>
            <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {companyFacts.map((f) => (
                <div key={f.label} className="border-b border-white/10 pb-3">
                  <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">{f.label}</div>
                  <div className="text-sm font-semibold">{f.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-orange-50/50">
        <div className="page-shell">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-brand uppercase tracking-widest mb-2">Why Choose {company.name}</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Trusted B2B Supplier Since {company.establishedYear}</h2>
          </div>
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: ShieldCheck, title: 'Verified Supplier', desc: 'GST, TrustSEAL & MSME registered with authentic documentation.' },
              { icon: Award, title: 'Premium Quality', desc: 'Pure, authentic ingredients sourced traditionally without chemicals.' },
              { icon: Truck, title: 'Pan-India Delivery', desc: 'Reliable logistics via transport and train across all major states.' },
              { icon: Clock, title: 'Fast Response', desc: `${company.responseRate} — our B2B team replies to inquiries quickly.` },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-xl p-5 border border-orange-100 hover:border-brand hover:shadow-lg transition-all">
                <div className="w-11 h-11 rounded-lg gradient-brand flex items-center justify-center mb-3">
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1.5">{f.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-orange-600 via-brand to-orange-500 p-6 sm:p-8 md:p-12 text-white shadow-xl">
            <div className="absolute inset-0 pattern-bg opacity-10" />
            <div className="relative grid gap-6 items-center md:grid-cols-[1.5fr_1fr]">
              <div>
                <div className="inline-flex max-w-full items-center gap-2 bg-white/20 backdrop-blur border border-white/30 px-3 py-1 rounded-sm text-[11px] font-bold uppercase tracking-wider mb-3">
                  <MapPin className="w-3.5 h-3.5" /> B2B Bulk Orders Welcome
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Ready to place a bulk order?</h2>
                <p className="text-orange-50 max-w-xl">
                  Share your requirements and our team will respond within 24 hours with the most competitive wholesale pricing.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Link href="/contact" className="inline-flex w-full items-center justify-center gap-2 bg-white text-brand hover:bg-orange-50 px-6 py-3 rounded-md font-bold shadow-lg transition-all">
                  <MessageSquare className="w-4 h-4" /> Send Inquiry
                </Link>
                <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="inline-flex w-full items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-md font-bold transition-all text-center">
                  <Phone className="w-4 h-4" /> {company.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter company={company} />
    </div>
  );
}
