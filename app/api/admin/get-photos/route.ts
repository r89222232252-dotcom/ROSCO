import { readdir } from 'fs/promises';
import { join } from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');

    const categories = ['bridal', 'event', 'editorial'];
    const results: Record<string, string[]> = {};

    // Если указана конкретная категория
    if (category && categories.includes(category)) {
      const folderPath = join(process.cwd(), 'public', 'images', 'portfolio', category);
      try {
        const files = await readdir(folderPath);
        const imageFiles = files.filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f));
        results[category] = imageFiles.map(f => `/images/portfolio/${category}/${f}`);
      } catch (err) {
        results[category] = [];
      }
    } else {
      // Получить фото из всех категорий
      for (const cat of categories) {
        const folderPath = join(process.cwd(), 'public', 'images', 'portfolio', cat);
        try {
          const files = await readdir(folderPath);
          const imageFiles = files.filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f));
          results[cat] = imageFiles.map(f => `/images/portfolio/${cat}/${f}`);
        } catch (err) {
          results[cat] = [];
        }
      }
    }

    return NextResponse.json({
      success: true,
      photos: results,
    });
  } catch (error) {
    console.error('❌ Ошибка получения фото:', error);
    return NextResponse.json(
      { error: `Ошибка при получении фото: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}` },
      { status: 500 }
    );
  }
}
