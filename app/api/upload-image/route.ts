
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('image') as File;
  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const fileName = `${Date.now()}_${file.name}`;
  const arrayBuffer = await file.arrayBuffer();
  const { data, error } = await supabase.storage
    .from('portfolio')
    .upload(fileName, arrayBuffer, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const publicUrl = supabase.storage.from('portfolio').getPublicUrl(fileName).data.publicUrl;
  return NextResponse.json({ url: publicUrl });
}
