'use client';

import { useEffect, useState } from 'react';
import { AdminShell } from '@/components/admin/admin-shell';
import { supabase } from '@/lib/supabase';
import { DEFAULT_COMPANY, Company } from '@/lib/data';
import { Loader as Loader2, Palette, Image as ImageIcon, Chrome as Home, Building2, Phone, ChartBar as BarChart3, Share2 } from 'lucide-react';

export default function SettingsPage() {
  const [theme, setTheme] = useState({ primaryColor: '#f97316', logoUrl: '' });
  const [homepage, setHomepage] = useState({ heroTitle: '', heroSubtitle: '', heroDescription: '', heroImage: '' });
  const [company, setCompany] = useState<Company>(DEFAULT_COMPANY);
  const [loading, setLoading] = useState<string | null>(null);
  const [savedMsg, setSavedMsg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('settings').select('*');
      (data || []).forEach((s: any) => {
        if (s.key === 'theme') setTheme((prev) => ({ ...prev, ...s.value }));
        if (s.key === 'homepage') setHomepage((prev) => ({ ...prev, ...s.value }));
        if (s.key === 'company') setCompany((prev) => ({ ...prev, ...s.value }));
      });
    })();
  }, []);

  const save = async (key: string, value: any) => {
    setLoading(key);
    setSavedMsg('');
    setError('');
    const res = await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value }),
    });
    setLoading(null);
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      setError(json.error || `Failed to save ${key}`);
      return;
    }
    setSavedMsg(`${key} saved successfully!`);
    setTimeout(() => setSavedMsg(''), 2500);
  };

  const presetColors = ['#f97316', '#dc2626', '#ea580c', '#d97706', '#059669', '#0891b2', '#2563eb', '#db2777'];

  const field = (label: string, value: string, onChange: (v: string) => void, placeholder = '') => (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1.5">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-brand" />
    </div>
  );

  const updateCompany = (patch: Partial<Company>) => setCompany({ ...company, ...patch });

  return (
    <AdminShell>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Theme & Settings</h1>
        <p className="text-gray-500 mt-1">Control all content, company info, stats, and branding across the website</p>
      </div>

      {savedMsg && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-2.5 capitalize">{savedMsg}</div>
      )}

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-2.5">{error}</div>
      )}

      <div className="space-y-6">
        <section className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
            <Palette className="w-5 h-5 text-brand" />
            <h2 className="font-bold text-gray-900">Theme & Branding</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">Primary Color</label>
              <div className="flex items-center gap-3 mb-3">
                <input type="color" value={theme.primaryColor} onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })} className="w-14 h-11 rounded-lg border cursor-pointer" />
                <input type="text" value={theme.primaryColor} onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })} className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm font-mono w-32" />
              </div>
              <div className="flex gap-2 flex-wrap">
                {presetColors.map((c) => (
                  <button key={c} onClick={() => setTheme({ ...theme, primaryColor: c })} className="w-9 h-9 rounded-lg border-2 transition" style={{ backgroundColor: c, borderColor: theme.primaryColor === c ? '#1f2937' : 'transparent' }} />
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Logo URL</label>
              <input type="text" placeholder="https://..." value={theme.logoUrl} onChange={(e) => setTheme({ ...theme, logoUrl: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm" />
              {theme.logoUrl && <img src={theme.logoUrl} alt="Logo preview" className="mt-3 h-14 object-contain" />}
            </div>
            <button onClick={() => save('theme', theme)} disabled={loading === 'theme'} className="bg-brand hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold inline-flex items-center gap-2">
              {loading === 'theme' ? <Loader2 className="w-4 h-4 animate-spin" /> : null} Save Theme
            </button>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
            <Home className="w-5 h-5 text-brand" />
            <h2 className="font-bold text-gray-900">Homepage Hero</h2>
          </div>
          <div className="space-y-4">
            {field('Hero Title', homepage.heroTitle, (v) => setHomepage({ ...homepage, heroTitle: v }), 'SAPNAM INDUSTRY')}
            {field('Hero Subtitle', homepage.heroSubtitle, (v) => setHomepage({ ...homepage, heroSubtitle: v }), 'AAPKI AASTHA KA SAARTHI')}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Hero Description</label>
              <textarea rows={3} value={homepage.heroDescription} onChange={(e) => setHomepage({ ...homepage, heroDescription: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1"><ImageIcon className="w-3.5 h-3.5" /> Hero Image URL</label>
              <input value={homepage.heroImage} onChange={(e) => setHomepage({ ...homepage, heroImage: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm" />
              {homepage.heroImage && <img src={homepage.heroImage} alt="" className="mt-3 w-full max-w-md h-48 object-cover rounded-lg" />}
            </div>
            <button onClick={() => save('homepage', homepage)} disabled={loading === 'homepage'} className="bg-brand hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold inline-flex items-center gap-2">
              {loading === 'homepage' ? <Loader2 className="w-4 h-4 animate-spin" /> : null} Save Homepage
            </button>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
            <Building2 className="w-5 h-5 text-brand" />
            <h2 className="font-bold text-gray-900">Company Information</h2>
          </div>
          <p className="text-xs text-gray-500 mb-4">These details appear in the header, footer, homepage factsheet, about page, and contact page.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {field('Company Name', company.name, (v) => updateCompany({ name: v }))}
            {field('Tagline', company.tagline, (v) => updateCompany({ tagline: v }))}
            {field('Nature of Business', company.natureOfBusiness, (v) => updateCompany({ natureOfBusiness: v }))}
            {field('Legal Status', company.legalStatus, (v) => updateCompany({ legalStatus: v }))}
            {field('Year Established', company.establishedYear, (v) => updateCompany({ establishedYear: v }))}
            {field('Annual Turnover', company.turnover, (v) => updateCompany({ turnover: v }))}
            {field('GST / Registration No.', company.registrationNo, (v) => updateCompany({ registrationNo: v }))}
            {field('PAN Number', company.panNo, (v) => updateCompany({ panNo: v }))}
            {field('Supply States', company.supplyStates, (v) => updateCompany({ supplyStates: v }))}
            {field('Supply Mode', company.supplyMode, (v) => updateCompany({ supplyMode: v }))}
            {field('Response Rate', company.responseRate, (v) => updateCompany({ responseRate: v }), '79% Within 24 Hrs')}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <Phone className="w-4 h-4 text-brand" />
              <h3 className="font-semibold text-gray-900 text-sm">Contact Details</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {field('Phone Number', company.phone, (v) => updateCompany({ phone: v }))}
              {field('Email', company.email, (v) => updateCompany({ email: v }))}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Address</label>
                <textarea rows={2} value={company.address} onChange={(e) => updateCompany({ address: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm" />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-brand" />
              <h3 className="font-semibold text-gray-900 text-sm">Achievement Counters (About Page)</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {field('Years Experience', company.yearsExperience, (v) => updateCompany({ yearsExperience: v }), '9+')}
              {field('Product Varieties', company.productVarieties, (v) => updateCompany({ productVarieties: v }), '50+')}
              {field('Devotees Served', company.devoteesServed, (v) => updateCompany({ devoteesServed: v }), '10K+')}
              {field('States Covered', company.statesCovered, (v) => updateCompany({ statesCovered: v }), '4+')}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <Share2 className="w-4 h-4 text-brand" />
              <h3 className="font-semibold text-gray-900 text-sm">Social Media URLs</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {field('Facebook URL', company.facebook, (v) => updateCompany({ facebook: v }), 'https://facebook.com/...')}
              {field('Instagram URL', company.instagram, (v) => updateCompany({ instagram: v }), 'https://instagram.com/...')}
              {field('Twitter URL', company.twitter, (v) => updateCompany({ twitter: v }), 'https://twitter.com/...')}
              {field('LinkedIn URL', company.linkedin, (v) => updateCompany({ linkedin: v }), 'https://linkedin.com/...')}
            </div>
          </div>

          <div className="mt-6">
            <button onClick={() => save('company', company)} disabled={loading === 'company'} className="bg-brand hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold inline-flex items-center gap-2">
              {loading === 'company' ? <Loader2 className="w-4 h-4 animate-spin" /> : null} Save Company Info
            </button>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
