'use client';

import { useEffect, useState } from 'react';
import { AdminShell } from '@/components/admin/admin-shell';
import { supabase, Category } from '@/lib/supabase';
import { CategoryIcon } from '@/components/category-icon';
import { Plus, Pencil, Trash2, X, Loader as Loader2 } from 'lucide-react';

const iconOptions = ['Flame', 'Wind', 'Sparkles', 'Leaf', 'Droplet', 'Circle', 'Hexagon', 'BookOpen', 'Package'];

export default function AdminCategories() {
  const [cats, setCats] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Partial<Category> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    const { data } = await supabase.from('categories').select('*').order('name');
    setCats(data || []);
  };
  useEffect(() => { load(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setError('');
    setLoading(true);
    const res = await fetch('/api/admin/categories', {
      method: editing.id ? 'PUT' : 'POST',
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
    setError(json.error || 'Failed to save category');
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this category?')) return;
    setError('');
    const res = await fetch(`/api/admin/categories?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      load();
      return;
    }
    if (res.status === 401) {
      window.location.href = '/admin/login';
      return;
    }
    const json = await res.json().catch(() => ({}));
    setError(json.error || 'Failed to delete category');
  };

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-500 mt-1">Manage product categories</p>
        </div>
        <button onClick={() => setEditing({ icon: 'Package' })} className="inline-flex items-center gap-2 bg-brand hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-2.5">{error}</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cats.map((c) => (
          <div key={c.id} className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center">
                <CategoryIcon name={c.icon} className="w-5 h-5 text-brand" />
              </div>
              <div className="flex gap-1">
                <button onClick={() => setEditing(c)} className="p-2 hover:bg-orange-50 rounded-lg text-gray-600 hover:text-brand"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => remove(c.id)} className="p-2 hover:bg-red-50 rounded-lg text-gray-600 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900">{c.name}</h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{c.description}</p>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setEditing(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{editing.id ? 'Edit' : 'Add'} Category</h2>
              <button onClick={() => setEditing(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={save} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Name *</label>
                <input required value={editing.name || ''} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Description</label>
                <textarea value={editing.description || ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Image URL</label>
                <input value={editing.image_url || ''} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Icon</label>
                <div className="grid grid-cols-5 gap-2">
                  {iconOptions.map((i) => (
                    <button key={i} type="button" onClick={() => setEditing({ ...editing, icon: i })} className={`p-3 rounded-lg border transition ${editing.icon === i ? 'border-brand bg-orange-50' : 'border-gray-200'}`}>
                      <CategoryIcon name={i} className="w-5 h-5 mx-auto text-brand" />
                    </button>
                  ))}
                </div>
              </div>
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
