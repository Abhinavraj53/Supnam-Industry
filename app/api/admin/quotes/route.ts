import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';
import { isAuthenticated } from '@/lib/admin-auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ quotes: data || [] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to load quotes' }, { status: 500 });
  }
}
