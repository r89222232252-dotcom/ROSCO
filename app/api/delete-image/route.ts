import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const { filename } = await req.json();
  if (!filename) {
    return NextResponse.json({ error: 'No filename provided' }, { status: 400 });
  }

  const { error } = await supabase.storage.from('portfolio').remove([filename]);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
