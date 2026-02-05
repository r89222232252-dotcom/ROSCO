import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { NextRequest, NextResponse } from 'next/server';

const EXPERTS_DIR = join(process.cwd(), 'public', 'images', 'experts');

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const file = form.get('file') as Blob | null;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    // extract name
    let fileName = `expert-${Date.now()}`;
    if (typeof file === 'object' && file && 'name' in file && typeof (file as { name?: unknown }).name === 'string') {
      fileName = (file as { name: string }).name;
    }
    // const ext = extname(fileName) || '.jpg'; // удалено как неиспользуемое
    const safeName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.\-_]/g, '_')}`;

    await mkdir(EXPERTS_DIR, { recursive: true });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const savePath = join(EXPERTS_DIR, safeName);
    await writeFile(savePath, buffer);

    const publicPath = `/images/experts/${safeName}`;

    return NextResponse.json({ success: true, path: publicPath });
  } catch (error) {
    console.error('Error uploading expert image:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
