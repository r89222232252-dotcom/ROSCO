import { writeFile, readFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { NextRequest, NextResponse } from 'next/server';

const SETTINGS_FILE = join(process.cwd(), 'public', 'admin', 'settings.json');

async function ensureSettingsFile() {
  try {
    await readFile(SETTINGS_FILE);
  } catch {
    const dir = join(process.cwd(), 'public', 'admin');
    await mkdir(dir, { recursive: true });
    await writeFile(SETTINGS_FILE, JSON.stringify({
      homeBackground: null,
      homeBackgroundScale: 100,
      expertsBackground: null,
      expertsBackgroundScale: 100,
    }, null, 2));
  }
}

export async function GET() {
  try {
    await ensureSettingsFile();
    const content = await readFile(SETTINGS_FILE, 'utf-8');
    const settings = JSON.parse(content);
    
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error('❌ Ошибка чтения настроек:', error);
    return NextResponse.json(
      { success: false, error: 'Ошибка чтения настроек' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { backgroundType, backgroundPath, backgroundScale } = body;

    if (!backgroundType || !['homeBackground', 'expertsBackground'].includes(backgroundType)) {
      return NextResponse.json(
        { error: 'Некорректный тип фона' },
        { status: 400 }
      );
    }

    await ensureSettingsFile();
    const content = await readFile(SETTINGS_FILE, 'utf-8');
    const settings = JSON.parse(content);

    settings[backgroundType] = backgroundPath;
    if (backgroundScale !== undefined) {
      settings[backgroundType + 'Scale'] = backgroundScale;
    }

    await writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2));

    console.log(`✅ Фон обновлен: ${backgroundType} = ${backgroundPath}, масштаб = ${backgroundScale || 100}%`);

    return NextResponse.json({
      success: true,
      message: 'Фон успешно установлен',
      settings,
    });
  } catch (error) {
    console.error('❌ Ошибка сохранения настроек:', error);
    return NextResponse.json(
      { error: `Ошибка: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}` },
      { status: 500 }
    );
  }
}
