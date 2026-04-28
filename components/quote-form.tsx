'use client';

import { useState } from 'react';
import { CircleCheck as CheckCircle2, Loader as Loader2, Send } from 'lucide-react';

export function QuoteForm({ productName = '', compact = false }: { productName?: string; compact?: boolean }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    product_name: productName,
    quantity: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
      setForm({ name: '', phone: '', email: '', product_name: productName, quantity: '', message: '' });
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <CheckCircle2 className="w-14 h-14 text-green-600 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Quote Request Sent!</h3>
        <p className="text-gray-600 text-sm">Our team will contact you within 24 hours with the best wholesale pricing.</p>
        <button onClick={() => setStatus('idle')} className="mt-4 text-brand font-semibold text-sm hover:underline">
          Submit another request
        </button>
      </div>
    );
  }

  const inputCls = 'w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand focus:ring-2 focus:ring-orange-100 transition';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={compact ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name *</label>
          <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone *</label>
          <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email *</label>
        <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
      </div>
      <div className={compact ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Product Name</label>
          <input type="text" value={form.product_name} onChange={(e) => setForm({ ...form, product_name: e.target.value })} className={inputCls} placeholder="e.g. Sandal Agarbatti" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Quantity Required</label>
          <input type="text" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className={inputCls} placeholder="e.g. 500 packs" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1.5">Message / Requirements</label>
        <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputCls} placeholder="Tell us about your requirements..." />
      </div>

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">{errorMsg}</div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full inline-flex items-center justify-center gap-2 bg-brand hover:bg-orange-600 disabled:opacity-60 text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg shadow-orange-500/30 transition"
      >
        {status === 'loading' ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
        ) : (
          <><Send className="w-4 h-4" /> Submit Quote Request</>
        )}
      </button>
    </form>
  );
}
