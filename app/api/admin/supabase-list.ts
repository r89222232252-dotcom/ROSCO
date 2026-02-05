import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(request: NextRequest) {
  try {
    const folder = request.nextUrl.searchParams.get('folder') || '';
    // Получение списка файлов из Supabase Storage (bucket: 'media')
    const { data, error } = await supabase.storage.from('portfolio').list(folder, { limit: 100, offset: 0 });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    // Добавить публичные ссылки
    const files = (data || []).map(file => ({
      ...file,
      url: supabase.storage.from('portfolio').getPublicUrl(folder ? `${folder}/${file.name}` : file.name).data.publicUrl,
    }));
    return NextResponse.json({ success: true, files });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
