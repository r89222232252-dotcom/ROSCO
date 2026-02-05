import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;


    if (!file) {
      return NextResponse.json({ error: '❌ Файл не найден' }, { status: 400 });
    }

    if (!category) {
      return NextResponse.json({ error: '❌ Категория не выбрана' }, { status: 400 });
    }

    // Определяем путь сохранения
    let uploadPath = '';
    switch(category) {
      case 'bridal':
        uploadPath = 'images/portfolio/bridal';
        break;
      case 'event':
        uploadPath = 'images/portfolio/event';
        break;
      case 'editorial':
        uploadPath = 'images/portfolio/editorial';
        break;
      case 'experts':
        uploadPath = 'images/experts';
        break;
      default:
        return NextResponse.json({ error: '❌ Неизвестная категория: ' + category }, { status: 400 });
    }

    // Создаем полный путь (public folder)
    const fullPath = join(process.cwd(), 'public', uploadPath);

    // Создаем директорию если её нет
    try {
      await mkdir(fullPath, { recursive: true });
    } catch (mkdirError) {
      console.error('❌ Ошибка создания папки:', mkdirError);
      throw mkdirError;
    }

    // Генерируем имя файла
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}-${sanitizedName}`;
    const filepath = join(fullPath, filename);


    // Конвертируем file в buffer и сохраняем
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);


    return NextResponse.json({
      success: true,
      message: '✅ Фото успешно загружено',
      filename: filename,
      path: `/${uploadPath}/${filename}`,
    });
  } catch (error) {
    console.error('❌ Ошибка загрузки:', error);
    return NextResponse.json(
      { error: `❌ Ошибка при загрузке: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}` },
      { status: 500 }
    );
  }
}
