import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { getAllSettings, getCompanyFromSettings } from '@/lib/data';
import {
  Factory, MapPin, Truck, Award, Users, Target, Heart,
  BadgeCheck, ChevronRight, Building2, Calendar, Briefcase,
  TrendingUp, Globe, ShieldCheck,
} from 'lucide-react';

export const metadata = { title: 'About Us' };

export default async function AboutPage() {
  const settings = await getAllSettings();
  const company = getCompanyFromSettings(settings);

  const factSheet = [
    { icon: Factory, label: 'Nature of Business', value: company.natureOfBusiness },
    { icon: Briefcase, label: 'Legal Status of Firm', value: company.legalStatus },
    { icon: Calendar, label: 'Year of Establishment', value: company.establishedYear },
    { icon: TrendingUp, label: 'Annual Turnover', value: company.turnover },
    { icon: Users, label: 'GST Registration No.', value: company.registrationNo },
    { icon: BadgeCheck, label: 'PAN No.', value: company.panNo },
    { icon: MapPin, label: 'Registered Address', value: company.address },
    { icon: Globe, label: 'Supply State', value: company.supplyStates },
    { icon: Truck, label: 'Supply Mode', value: company.supplyMode },
  ];

  const values = [
    { icon: Heart, title: 'Devotion', desc: 'Every product crafted with spiritual reverence and authenticity.' },
    { icon: Users, title: 'Community', desc: 'Serving devotees, temples and retailers across India with trust.' },
    { icon: Target, title: 'Purity', desc: 'Uncompromising commitment to traditionally sourced ingredients.' },
    { icon: Award, title: 'Excellence', desc: 'Quality you can trust, generation after generation.' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader logoUrl={settings?.theme?.logoUrl} company={company} />

      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border-b-4 border-brand">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
            <Link href="/" className="hover:text-brand">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-brand">About Us</span>
          </nav>
          <p className="text-xs font-bold text-brand uppercase tracking-widest mb-2">Who We Are</p>
          <h1 className="text-3xl md:text-4xl font-bold">About {company.name}</h1>
          <p className="text-gray-300 mt-2 max-w-3xl">{company.natureOfBusiness} of premium quality pujan products, serving devotees, temples and wholesalers across India since {company.establishedYear}.</p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-brand px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider mb-4">
              <Building2 className="w-3.5 h-3.5" /> Our Company
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5 leading-tight">A Legacy of Faith & Quality in Pujan Products</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {company.name} is engaged in manufacturing and trading of pujan products with good quality ranges of <span className="font-semibold text-gray-900">agarbatti, dhoop, kapoor, hawan cup, gangajal, kumkum, ashtgandha, yantra</span> and <span className="font-semibold text-gray-900">pujan books</span>.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our products are most prominently supplied across {company.supplyStates}. We maintain strong relationships with retailers, wholesalers, temples and distributors, offering reliable B2B services at competitive prices.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              Every product we offer is carefully selected for authenticity and spiritual significance. Our commitment to quality has earned us the trust of thousands of devotees and businesses across India.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/categories" className="inline-flex items-center gap-2 bg-brand hover:bg-orange-600 text-white px-6 py-3 rounded-md font-semibold transition-all">
                View Our Products
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white border-2 border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 px-6 py-3 rounded-md font-semibold transition-all">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.pexels.com/photos/37116936/pexels-photo-37116936.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Pujan Products"
                className="w-full h-[460px] object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white border border-orange-100 rounded-xl shadow-lg p-4 grid grid-cols-2 gap-4">
              <div className="text-center pr-4 border-r border-gray-200">
                <div className="text-2xl font-bold text-brand">{company.devoteesServed}</div>
                <div className="text-[10px] uppercase tracking-wider text-gray-500">Devotees Served</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand">{company.statesCovered}</div>
                <div className="text-[10px] uppercase tracking-wider text-gray-500">States Covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="border-b-2 border-brand pb-4 mb-8">
            <p className="text-xs font-bold text-brand uppercase tracking-widest mb-1">Company Profile</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Factsheet</h2>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 [&>*:nth-child(n+4)]:border-t">
              {factSheet.map((f, idx) => (
                <div key={f.label} className={`p-5 flex items-start gap-3 ${idx >= 3 ? 'lg:border-t' : ''}`}>
                  <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <f.icon className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider">{f.label}</div>
                    <div className="text-gray-900 font-bold mt-1 text-sm">{f.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="border-b-2 border-brand pb-4 mb-8">
            <p className="text-xs font-bold text-brand uppercase tracking-widest mb-1">Our Values</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">What Drives Us</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v) => (
              <div key={v.title} className="bg-gray-50 hover:bg-white border border-gray-200 hover:border-brand hover:shadow-lg rounded-lg p-5 text-center transition-all">
                <div className="w-12 h-12 mx-auto rounded-lg gradient-brand flex items-center justify-center mb-3">
                  <v.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1.5">{v.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-6 text-center">
          <div className="p-6 border-r border-gray-800 last:border-0">
            <ShieldCheck className="w-10 h-10 text-brand mx-auto mb-3" />
            <div className="text-3xl font-bold mb-1">100%</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Authentic Products</div>
          </div>
          <div className="p-6 md:border-r border-gray-800">
            <Award className="w-10 h-10 text-brand mx-auto mb-3" />
            <div className="text-3xl font-bold mb-1">{company.productVarieties}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Product Varieties</div>
          </div>
          <div className="p-6 md:border-r border-gray-800">
            <Users className="w-10 h-10 text-brand mx-auto mb-3" />
            <div className="text-3xl font-bold mb-1">{company.devoteesServed}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Happy Customers</div>
          </div>
          <div className="p-6">
            <Calendar className="w-10 h-10 text-brand mx-auto mb-3" />
            <div className="text-3xl font-bold mb-1">{company.yearsExperience}</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Years Experience</div>
          </div>
        </div>
      </section>

      <SiteFooter company={company} />
    </div>
  );
}
