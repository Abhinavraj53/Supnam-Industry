'use client';

import { useEffect, useState } from 'react';
import { AdminShell } from '@/components/admin/admin-shell';
import { supabase, Product, Category } from '@/lib/supabase';
import { Plus, Pencil, Trash2, X, Loader as Loader2, Star } from 'lucide-react';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    const [p, c] = await Promise.all([
      supabase.from('products').select('*, categories(*)').order('created_at', { ascending: false }),
      supabase.from('categories').select('*').order('name'),
    ]);
    setProducts((p.data as Product[]) || []);
    setCategories(c.data || []);
  };

  useEffect(() => { load(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setError('');
    setLoading(true);
    const isEdit = !!editing.id;
    const res = await fetch('/api/admin/products', {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    });
    setLoading(false);
    if (res.ok) {
      setEditing(null);
      load();
      return;
    }
    if (res.status === 401) {
      window.location.href = '/admin/login';
      return;
    }
    const json = await res.json().catch(() => ({}));
    setError(json.error || 'Failed to save product');
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    setError('');
    const res = await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      load();
      return;
    }
    if (res.status === 401) {
      window.location.href = '/admin/login';
      return;
    }
    const json = await res.json().catch(() => ({}));
    setError(json.error || 'Failed to delete product');
  };

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 mt-1">Manage your product catalog</p>
        </div>
        <button onClick={() => setEditing({ images: [], featured: false, min_order: '1 Piece' })} className="inline-flex items-center gap-2 bg-brand hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-2.5">{error}</div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left text-xs uppercase text-gray-600">
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">MOQ</th>
              <th className="py-3 px-4">Featured</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-gray-100">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    {p.images[0] && <img src={p.images[0]} className="w-10 h-10 rounded-lg object-cover" alt="" />}
                    <div className="font-medium text-gray-900">{p.name}</div>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">{p.categories?.name || '—'}</td>
                <td className="py-3 px-4 text-gray-600">{p.price_range}</td>
                <td className="py-3 px-4 text-gray-600">{p.min_order}</td>
                <td className="py-3 px-4">{p.featured && <Star className="w-4 h-4 text-brand fill-brand" />}</td>
                <td className="py-3 px-4 text-right space-x-2">
                  <button onClick={() => setEditing(p)} className="p-2 hover:bg-orange-50 rounded-lg text-gray-600 hover:text-brand"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => remove(p.id)} className="p-2 hover:bg-red-50 rounded-lg text-gray-600 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr><td colSpan={6} className="py-10 text-center text-gray-500">No products yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{editing.id ? 'Edit' : 'Add'} Product</h2>
              <button onClick={() => setEditing(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={save} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Name *" required value={editing.name || ''} onChange={(v) => setEditing({ ...editing, name: v })} />
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Category</label>
                  <select value={editing.category_id || ''} onChange={(e) => setEditing({ ...editing, category_id: e.target.value || null })} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm">
                    <option value="">—</option>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>
              <Field label="Description" textarea value={editing.description || ''} onChange={(v) => setEditing({ ...editing, description: v })} />
              <Field label="Image URL (Cloudinary or Pexels)" value={editing.images?.[0] || ''} onChange={(v) => setEditing({ ...editing, images: v ? [v] : [] })} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="Price Range" value={editing.price_range || ''} onChange={(v) => setEditing({ ...editing, price_range: v })} />
                <Field label="Min Order" value={editing.min_order || ''} onChange={(v) => setEditing({ ...editing, min_order: v })} />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={editing.featured || false} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} />
                Featured Product
              </label>
              <button type="submit" disabled={loading} className="w-full bg-brand hover:bg-orange-600 text-white py-3 rounded-xl font-semibold">
                {loading ? <Loader2 className="w-4 h-4 animate-spin inline" /> : 'Save'}
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}

function Field({ label, value, onChange, textarea, required }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean; required?: boolean }) {
  const cls = 'w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-brand focus:ring-2 focus:ring-orange-100';
  return (
    <div className={textarea ? 'col-span-2' : ''}>
      <label className="block text-xs font-semibold text-gray-700 mb-1.5">{label}</label>
      {textarea ? (
        <textarea required={required} value={value} onChange={(e) => onChange(e.target.value)} rows={3} className={cls} />
      ) : (
        <input required={required} value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
    </div>
  );
}
