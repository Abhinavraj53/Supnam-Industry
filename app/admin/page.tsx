import { AdminShell } from '@/components/admin/admin-shell';
import { createAdminClient, supabase } from '@/lib/supabase';
import { Package, Tag, FileText, TrendingUp } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [pRes, cRes] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('categories').select('*', { count: 'exact', head: true }),
  ]);

  let quotes: any[] = [];
  let quoteCount = 0;
  let thisMonthCount = 0;
  let adminError = '';

  try {
    const admin = createAdminClient();
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const [countRes, recentRes, monthRes] = await Promise.all([
      admin.from('quotes').select('*', { count: 'exact', head: true }),
      admin.from('quotes').select('*').order('created_at', { ascending: false }).limit(5),
      admin
        .from('quotes')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', monthStart.toISOString()),
    ]);

    if (countRes.error) throw countRes.error;
    if (recentRes.error) throw recentRes.error;
    if (monthRes.error) throw monthRes.error;

    quoteCount = countRes.count || 0;
    quotes = recentRes.data || [];
    thisMonthCount = monthRes.count || 0;
  } catch (error: any) {
    adminError = error.message || 'Failed to load quote data';
  }

  const stats = [
    { label: 'Total Products', value: pRes.count || 0, icon: Package, color: 'bg-orange-100 text-brand' },
    { label: 'Categories', value: cRes.count || 0, icon: Tag, color: 'bg-blue-100 text-blue-600' },
    { label: 'Quote Requests', value: quoteCount, icon: FileText, color: 'bg-green-100 text-green-600' },
    { label: 'This Month', value: thisMonthCount, icon: TrendingUp, color: 'bg-pink-100 text-pink-600' },
  ];

  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here is an overview of your store.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.color} mb-3`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {adminError && (
        <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-800 text-sm rounded-2xl px-4 py-3">
          {adminError}
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="font-bold text-gray-900 mb-4">Recent Quote Requests</h2>
        {quotes.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase text-gray-500 border-b border-gray-100">
                  <th className="py-3 pr-4">Name</th>
                  <th className="py-3 pr-4">Product</th>
                  <th className="py-3 pr-4">Phone</th>
                  <th className="py-3 pr-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((q: any) => (
                  <tr key={q.id} className="border-b border-gray-50">
                    <td className="py-3 pr-4 font-medium text-gray-900">{q.name}</td>
                    <td className="py-3 pr-4 text-gray-600">{q.product_name || '—'}</td>
                    <td className="py-3 pr-4 text-gray-600">{q.phone}</td>
                    <td className="py-3 pr-4 text-gray-500 text-xs">{new Date(q.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">
            {adminError ? 'Quote data is unavailable until the admin Supabase key is configured.' : 'No quote requests yet.'}
          </p>
        )}
      </div>
    </AdminShell>
  );
}
