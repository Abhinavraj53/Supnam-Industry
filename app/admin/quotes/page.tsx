'use client';

import { useEffect, useState } from 'react';
import { AdminShell } from '@/components/admin/admin-shell';
import { Mail, Phone, Loader as Loader2 } from 'lucide-react';

type Quote = {
  id: string;
  name: string;
  phone: string;
  email: string;
  product_name: string | null;
  quantity: string | null;
  message: string | null;
  created_at: string;
};

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/admin/quotes');
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || 'Failed to load');
        setQuotes(json.quotes || []);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AdminShell>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Quote Requests</h1>
        <p className="text-gray-500 mt-1">All customer quote submissions</p>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-2.5">{error}</div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left text-xs uppercase text-gray-600">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Message</th>
                <th className="py-3 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="py-10 text-center text-gray-500"><Loader2 className="w-5 h-5 animate-spin inline" /></td></tr>
              ) : quotes.length === 0 ? (
                <tr><td colSpan={6} className="py-10 text-center text-gray-500">No quote requests yet.</td></tr>
              ) : quotes.map((q) => (
                <tr key={q.id} className="border-t border-gray-100 hover:bg-orange-50/40">
                  <td className="py-3 px-4 font-medium text-gray-900">{q.name}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5 text-gray-700 text-xs"><Phone className="w-3 h-3 text-brand" /> {q.phone}</div>
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs mt-1"><Mail className="w-3 h-3 text-brand" /> {q.email}</div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{q.product_name || '—'}</td>
                  <td className="py-3 px-4 text-gray-600">{q.quantity || '—'}</td>
                  <td className="py-3 px-4 text-gray-600 max-w-xs truncate" title={q.message || ''}>{q.message || '—'}</td>
                  <td className="py-3 px-4 text-gray-500 text-xs whitespace-nowrap">{new Date(q.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
