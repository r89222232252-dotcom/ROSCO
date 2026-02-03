import { readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { NextRequest, NextResponse } from 'next/server';

const SETTINGS_FILE = join(process.cwd(), 'public', 'admin', 'settings.json');
const VERSIONS_DIR = join(process.cwd(), 'public', 'admin', 'versions');

async function ensureSettingsFile() {
  try {
    await readFile(SETTINGS_FILE);
  } catch {
    await mkdir(join(process.cwd(), 'public', 'admin'), { recursive: true });
    const initial = {
      homeBackground: null,
      expertsBackground: null,
      homeBackgroundScale: 100,
      expertsBackgroundScale: 100,
      hero: {
        title: { ru: '', en: '' },
        subtitle: { ru: '', en: '' },
        location: { ru: '', en: '' },
        ctaText: { ru: '', en: '' }
      },
      experts: [],
      siteTexts: { nav: {}, footer: {} }
    };
    await writeFile(SETTINGS_FILE, JSON.stringify(initial, null, 2));
  }
}

export async function GET() {
  try {
    await ensureSettingsFile();
    const content = await readFile(SETTINGS_FILE, 'utf-8');
    const settings = JSON.parse(content);
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error('Error reading settings:', error);
    return NextResponse.json({ success: false, error: 'Ошибка чтения настроек' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ success: false, error: 'Неверный запрос' }, { status: 400 });
    }

    await ensureSettingsFile();
    const content = await readFile(SETTINGS_FILE, 'utf-8');
    const settings = JSON.parse(content);

    // Merge body into settings (shallow merge for top-level keys)
    const allowedTopKeys = ['hero', 'experts', 'siteTexts', 'homeBackground', 'expertsBackground', 'homeBackgroundScale', 'expertsBackgroundScale'];
    for (const key of Object.keys(body)) {
      if (!allowedTopKeys.includes(key)) continue;
      settings[key] = body[key];
    }

    // create versions dir and save timestamped backup
    await mkdir(VERSIONS_DIR, { recursive: true });
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await writeFile(join(VERSIONS_DIR, `settings-${timestamp}.json`), JSON.stringify(settings, null, 2));

    // write settings
    await writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2));

    return NextResponse.json({ success: true, message: 'Settings saved', settings });
  } catch (error) {
    console.error('Error saving settings:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
