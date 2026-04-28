import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';
import { isAuthenticated } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function PUT(req: NextRequest) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const supabase = createAdminClient();
    const { key, value } = await req.json();
    if (!key) return NextResponse.json({ error: 'Missing key' }, { status: 400 });

    const existing = await supabase.from('settings').select('id').eq('key', key).maybeSingle();
    if (existing.error) return NextResponse.json({ error: existing.error.message }, { status: 500 });

    if (existing.data) {
      const { error } = await supabase
        .from('settings')
        .update({ value, updated_at: new Date().toISOString() })
        .eq('key', key);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      const { error } = await supabase.from('settings').insert({ key, value });
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to save settings' }, { status: 500 });
  }
}
