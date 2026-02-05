import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
    const apiToken = process.env.SANITY_API_TOKEN;


    if (!projectId || !dataset) {
      return NextResponse.json(
        { error: '❌ Не настроены NEXT_PUBLIC_SANITY_PROJECT_ID или NEXT_PUBLIC_SANITY_DATASET' },
        { status: 500 }
      );
    }

    if (!apiToken) {
      return NextResponse.json(
        { error: '❌ SANITY_API_TOKEN не установлен в .env.local\n\nДля загрузки в облако Sanity нужен API токен:\n1. Зайди на sanity.io\n2. Перейди в проект\n3. Скопируй API Token\n4. Добавь SANITY_API_TOKEN в .env.local\n5. Перезагрузи сервер' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Файл не найден' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);


    const uploadUrl = `https://${projectId}.api.sanity.io/v2021-06-07/assets/images/${dataset}`;
    
    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': file.type || 'image/jpeg',
      },
      body: buffer,
    });


    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Ошибка Sanity:', errorText);
      return NextResponse.json(
        { error: `Ошибка Sanity API (${response.status}): ${errorText}` },
        { status: response.status }
      );
    }

    const assetData = await response.json();

    return NextResponse.json({
      success: true,
      message: '✅ Фото успешно загружено в облако Sanity',
      assetId: assetData.document._id,
      url: assetData.document.url,
    });
  } catch (error) {
    console.error('❌ Ошибка загрузки:', error);
    return NextResponse.json(
      { error: `❌ Ошибка при загрузке: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}` },
      { status: 500 }
    );
  }
}
