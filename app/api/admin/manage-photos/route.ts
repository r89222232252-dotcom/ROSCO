import { unlink, rename } from 'fs/promises';
import { join, basename } from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, photoPath, newCategory } = body;

    if (!photoPath) {
      return NextResponse.json({ error: 'Путь к фото не указан' }, { status: 400 });
    }

    // Валидация пути (защита от Directory Traversal)
    if (photoPath.includes('..') || photoPath.startsWith('/')) {
      return NextResponse.json({ error: 'Некорректный путь' }, { status: 400 });
    }

    if (action === 'delete') {
      // Удаление фото
      const fullPath = join(process.cwd(), 'public', photoPath);
      await unlink(fullPath);
      return NextResponse.json({ success: true, message: 'Фото удалено' });
    } else if (action === 'move') {
      // Перемещение между категориями
      if (!newCategory) {
        return NextResponse.json({ error: 'Новая категория не указана' }, { status: 400 });
      }

      const oldFullPath = join(process.cwd(), 'public', photoPath);
      const filename = basename(photoPath);
      const newFullPath = join(process.cwd(), 'public', 'images', 'portfolio', newCategory, filename);

      await rename(oldFullPath, newFullPath);

      return NextResponse.json({
        success: true,
        message: `Фото перемещено в ${newCategory}`,
        newPath: `/images/portfolio/${newCategory}/${filename}`,
      });
    } else {
      return NextResponse.json({ error: 'Неизвестное действие' }, { status: 400 });
    }
  } catch (error) {
    console.error('❌ Ошибка управления фото:', error);
    return NextResponse.json(
      { error: `Ошибка: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}` },
      { status: 500 }
    );
  }
}
