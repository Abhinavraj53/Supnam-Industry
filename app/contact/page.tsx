import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { QuoteForm } from '@/components/quote-form';
import { getAllSettings, getCompanyFromSettings } from '@/lib/data';
import { Phone, Mail, MapPin, Clock, MessageSquare, ChevronRight, Building2, BadgeCheck } from 'lucide-react';

export const metadata = { title: 'Contact Us' };

export default async function ContactPage() {
  const settings = await getAllSettings();
  const company = getCompanyFromSettings(settings);

  const info = [
    { icon: Phone, title: 'Call Us', value: company.phone, sub: 'Mon-Sat, 9am to 7pm', link: `tel:${company.phone.replace(/\s/g, '')}` },
    { icon: Mail, title: 'Email Us', value: company.email, sub: 'Reply within 24 hours', link: `mailto:${company.email}` },
    { icon: MapPin, title: 'Visit Us', value: company.address, sub: `Serving ${company.statesCovered} states`, link: '#' },
    { icon: Clock, title: 'Working Hours', value: 'Mon-Sat: 9 AM - 7 PM', sub: 'Sunday closed', link: '#' },
  ];

  const responseShort = company.responseRate.split(' ')[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader logoUrl={settings?.theme?.logoUrl} company={company} />

      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white border-b-4 border-brand">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
            <Link href="/" className="hover:text-brand">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-brand">Contact Us</span>
          </nav>
          <p className="text-xs font-bold text-brand uppercase tracking-widest mb-2">Get In Touch</p>
          <h1 className="text-3xl md:text-4xl font-bold">Contact {company.name}</h1>
          <p className="text-gray-300 mt-2 max-w-2xl">Have questions or need wholesale pricing? Our team responds to {responseShort} of B2B inquiries within 24 hours.</p>
        </div>
      </section>

      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {info.map((i) => (
            <a key={i.title} href={i.link} className="group bg-gray-50 hover:bg-white hover:shadow-lg border border-gray-200 hover:border-brand rounded-lg p-5 transition-all">
              <div className="w-11 h-11 rounded-lg gradient-brand flex items-center justify-center mb-3">
                <i.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-[11px] font-bold text-brand uppercase tracking-wider mb-1">{i.title}</div>
              <div className="font-bold text-gray-900 text-sm group-hover:text-brand transition-colors line-clamp-2">{i.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{i.sub}</div>
            </a>
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-[1fr_1.3fr] gap-8">
          <div className="space-y-5">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
                <Building2 className="w-5 h-5 text-brand" />
                <h3 className="font-bold text-gray-900 uppercase tracking-wider text-sm">Company Info</h3>
              </div>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between gap-4 pb-2 border-b border-gray-100">
                  <dt className="text-gray-500">Business Name</dt>
                  <dd className="font-semibold text-gray-900 text-right">{company.name}</dd>
                </div>
                <div className="flex justify-between gap-4 pb-2 border-b border-gray-100">
                  <dt className="text-gray-500">Registration No.</dt>
                  <dd className="font-semibold text-gray-900 text-right">{company.registrationNo}</dd>
                </div>
                <div className="flex justify-between gap-4 pb-2 border-b border-gray-100">
                  <dt className="text-gray-500">PAN</dt>
                  <dd className="font-semibold text-gray-900 text-right">{company.panNo}</dd>
                </div>
                <div className="flex justify-between gap-4 pb-2 border-b border-gray-100">
                  <dt className="text-gray-500">Turnover</dt>
                  <dd className="font-semibold text-gray-900 text-right">{company.turnover}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-gray-500">Nature</dt>
                  <dd className="font-semibold text-gray-900 text-right">{company.natureOfBusiness}</dd>
                </div>
              </dl>
            </div>

            <div className="bg-gradient-to-br from-brand to-orange-600 rounded-lg p-6 text-white">
              <BadgeCheck className="w-8 h-8 mb-3" />
              <h3 className="font-bold mb-2">Verified B2B Supplier</h3>
              <p className="text-sm text-orange-50 leading-relaxed mb-4">
                GST, TrustSEAL and MSME registered. Trusted by temples, wholesalers and retailers across India.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/10 rounded-md p-2 text-center">
                  <div className="font-bold">{responseShort}</div>
                  <div className="text-[10px] text-orange-100">Response Rate</div>
                </div>
                <div className="bg-white/10 rounded-md p-2 text-center">
                  <div className="font-bold">24 Hr</div>
                  <div className="text-[10px] text-orange-100">Reply Time</div>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
              <img src="https://images.pexels.com/photos/6044227/pexels-photos-6044227.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Contact" className="w-full h-44 object-cover" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100">
              <div className="w-11 h-11 rounded-lg gradient-brand flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Send Us an Inquiry</h2>
                <p className="text-xs text-gray-500">Get wholesale pricing within 24 hours</p>
              </div>
            </div>
            <QuoteForm />
          </div>
        </div>
      </section>

      <SiteFooter company={company} />
    </div>
  );
}
