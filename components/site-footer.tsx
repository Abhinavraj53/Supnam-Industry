import Link from 'next/link';
import { Flame, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, BadgeCheck, ShieldCheck, Clock, Building2 } from 'lucide-react';
import { Company, DEFAULT_COMPANY } from '@/lib/data';

export function SiteFooter({ company }: { company?: Company }) {
  const c = company || DEFAULT_COMPANY;

  const categoryLinks = [
    'Agarbatti', 'Dhoop', 'Kapoor', 'Hawan Cup', 'Gangajal',
    'Kumkum', 'Ashtgandha', 'Yantra', 'Pujan Books',
  ];

  const socials = [
    { url: c.facebook, icon: Facebook },
    { url: c.instagram, icon: Instagram },
    { url: c.twitter, icon: Twitter },
    { url: c.linkedin, icon: Linkedin },
  ].filter((s) => s.url);

  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs">
            <BadgeCheck className="w-5 h-5 text-brand" />
            <span><span className="text-white font-bold">GST</span> Registered</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs">
            <ShieldCheck className="w-5 h-5 text-brand" />
            <span><span className="text-white font-bold">TrustSEAL</span> Verified</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs">
            <Clock className="w-5 h-5 text-brand" />
            <span><span className="text-white font-bold">{c.responseRate.split(' ')[0]}</span> Response Rate</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs">
            <Building2 className="w-5 h-5 text-brand" />
            <span><span className="text-white font-bold">{c.turnover}</span> Turnover</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-lg gradient-brand flex items-center justify-center">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-white font-bold">{c.name}</div>
              <div className="text-[10px] text-brand font-semibold tracking-widest">{c.tagline}</div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-gray-400 mb-5">
            {c.natureOfBusiness} of authentic pujan products — Agarbatti, Dhoop, Kapoor, Hawan Samagri, Gangajal, Kumkum, Ashtgandha, Yantra and Pujan Books.
          </p>
          {socials.length > 0 && (
            <div className="flex gap-2">
              {socials.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-800 hover:bg-brand rounded-md flex items-center justify-center transition-colors">
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm border-b border-gray-800 pb-2">Our Products</h3>
          <ul className="grid grid-cols-1 gap-2 text-sm">
            {categoryLinks.map((cat) => (
              <li key={cat}>
                <Link href="/categories" className="hover:text-brand transition-colors flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-brand rounded-full" /> {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm border-b border-gray-800 pb-2">Useful Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-brand transition-colors flex items-center gap-1.5"><span className="w-1 h-1 bg-brand rounded-full" /> Home</Link></li>
            <li><Link href="/about" className="hover:text-brand transition-colors flex items-center gap-1.5"><span className="w-1 h-1 bg-brand rounded-full" /> About Us</Link></li>
            <li><Link href="/categories" className="hover:text-brand transition-colors flex items-center gap-1.5"><span className="w-1 h-1 bg-brand rounded-full" /> All Categories</Link></li>
            <li><Link href="/categories" className="hover:text-brand transition-colors flex items-center gap-1.5"><span className="w-1 h-1 bg-brand rounded-full" /> Our Products</Link></li>
            <li><Link href="/contact" className="hover:text-brand transition-colors flex items-center gap-1.5"><span className="w-1 h-1 bg-brand rounded-full" /> Contact Us</Link></li>
            <li><Link href="/contact" className="hover:text-brand transition-colors flex items-center gap-1.5"><span className="w-1 h-1 bg-brand rounded-full" /> Request a Quote</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm border-b border-gray-800 pb-2">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-0.5 text-brand flex-shrink-0" />
              <span className="text-gray-400">{c.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-4 h-4 mt-0.5 text-brand flex-shrink-0" />
              <a href={`tel:${c.phone.replace(/\s/g, '')}`} className="text-gray-400 hover:text-brand">{c.phone}</a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-4 h-4 mt-0.5 text-brand flex-shrink-0" />
              <a href={`mailto:${c.email}`} className="text-gray-400 hover:text-brand">{c.email}</a>
            </li>
          </ul>
          <div className="mt-5 bg-gray-800 rounded-md p-3 text-xs">
            <div className="text-gray-400 mb-1">Registration No.</div>
            <div className="text-white font-semibold">{c.registrationNo}</div>
            <div className="text-gray-400 mt-2 mb-1">PAN</div>
            <div className="text-white font-semibold">{c.panNo}</div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} {c.name}. All rights reserved.</p>
          <p>Made with devotion for devotees across India</p>
        </div>
      </div>
    </footer>
  );
}
