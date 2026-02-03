# 🚀 Sanity CMS - Инструкция по использованию

## 📋 Обзор

Созданы 6 типов данных (schema types) для управления контентом BEAUTY ATELIER через Sanity CMS.

---

## ✅ Что создано

### Файлы schemaTypes:

```
schemaTypes/
├── index.ts                    ✅ Экспорт всех типов
├── home.ts                     ✅ Главная страница (логотип, héro)
├── service.ts                  ✅ Услуги и прайс
├── portfolioItem.ts            ✅ Портфолио проекты
├── review.ts                   ✅ Отзывы клиентов
├── faq.ts                      ✅ FAQ вопросы
└── contacts.ts                 ✅ Контакты и информация
```

---

## 🎯 Быстрый старт

### Шаг 1: Инициализация Sanity проекта

```bash
npm install sanity next-sanity
npx sanity@latest init
```

### Шаг 2: Скопируйте schemaTypes в проект

```bash
# Скопируйте папку schemaTypes в ваш проект Sanity
# (обычно в sanity/schemaTypes/)
```

### Шаг 3: Обновите sanity.config.ts

```typescript
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'beauty-atelier',
  title: 'BEAUTY ATELIER',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
});
```

### Шаг 4: Запустите Sanity Studio

```bash
npm run dev
# Откройте http://localhost:3000
```

---

## 📊 Структура данных

### 1. **home** - Главная страница (1 документ)
- Логотип
- Главное изображение
- Основной текст
- Кнопка CTA
- SEO данные

### 2. **service** - Услуги (много документов)
- Название и описание
- Категория (макияж, волосы, комбо)
- Цены и пакеты
- Длительность
- Фотография

### 3. **portfolioItem** - Портфолио (много документов)
- Название проекта
- Категория (свадьба, мероприятие, editorial)
- Главное изображение + галерея
- Детали события
- Информация о мастере

### 4. **review** - Отзывы (много документов)
- Имя и фото клиента
- Текст отзыва
- Рейтинг (1-5 звезд)
- Связь с услугой/портфолио
- Статус проверки

### 5. **faq** - FAQ (много документов)
- Вопрос
- Ответ (может быть с изображениями)
- Категория
- Поведение пользователей (просмотры, полезность)

### 6. **contacts** - Контакты (1 документ)
- Телефон, Email, WhatsApp
- Социальные сети (Telegram, Instagram, TikTok, YouTube)
- Адрес и геолокация
- Режим работы
- Информация о команде
- Банковские реквизиты
- Документы (политика, условия)

---

## 🔧 Конфигурация

### .env.local

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-28
SANITY_API_TOKEN=your_api_token
```

### Получите Project ID и Dataset:
1. Откройте [sanity.io](https://sanity.io)
2. Создайте новый проект или используйте существующий
3. Перейдите в Settings → API
4. Скопируйте Project ID и Dataset

---

## 📖 Примеры использования GROQ

### Получить главную страницу
```groq
*[_type == "home"][0] {
  title,
  subtitle,
  description,
  logo,
  heroImage,
  ctaText,
  ctaUrl,
  seo
}
```

### Получить все услуги
```groq
*[_type == "service"] | sort(displayOrder asc) {
  _id,
  title,
  slug,
  image,
  category,
  pricing {
    basePrice,
    discountPrice,
    duration
  }
}
```

### Получить портфолио по категории
```groq
*[_type == "portfolioItem" && category == "bridal"] | sort(displayOrder asc) {
  _id,
  title,
  slug,
  mainImage,
  category,
  gallery
}
```

### Получить все отзывы
```groq
*[_type == "review"] | sort(displayOrder asc) {
  _id,
  clientName,
  content,
  rating,
  clientImage,
  featured
}
```

### Получить FAQ
```groq
*[_type == "faq"] | sort(displayOrder asc) {
  _id,
  question,
  answer,
  category,
  featured
}
```

### Получить контакты
```groq
*[_type == "contacts"][0] {
  email,
  phone,
  telegram,
  socialMedia,
  address,
  workingHours,
  team
}
```

---

## 🔗 Интеграция с Next.js

### Установка клиента (sanity/client.ts)

```typescript
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-28',
  useCdn: true,
});

export async function getServiceBySlug(slug: string) {
  return client.fetch(
    `*[_type == "service" && slug.current == $slug][0]`,
    { slug }
  );
}

export async function getAllPortfolioItems() {
  return client.fetch(
    `*[_type == "portfolioItem"] | sort(displayOrder asc)`
  );
}

export async function getReviews() {
  return client.fetch(
    `*[_type == "review"] | sort(displayOrder asc)`
  );
}

export async function getContacts() {
  return client.fetch(`*[_type == "contacts"][0]`);
}

export async function getFAQs() {
  return client.fetch(`*[_type == "faq"] | sort(displayOrder asc)`);
}
```

### Использование в компонентах

```typescript
// app/service/[slug]/page.tsx
import { getServiceBySlug } from '@/sanity/client';

export default async function ServicePage({ params }) {
  const service = await getServiceBySlug(params.slug);
  
  if (!service) return <div>Service not found</div>;
  
  return (
    <div>
      <h1>{service.title}</h1>
      <p>{service.description}</p>
      <p>Цена: {service.pricing.basePrice} {service.pricing.currency}</p>
    </div>
  );
}
```

---

## 🎨 Использование с Portable Text

Для полей типа `array of blocks` (например, в `answer` в FAQ):

```typescript
import { PortableText } from '@portabletext/react';

export function FAQAnswer({ content }) {
  return <PortableText value={content} />;
}
```

---

## 🖼️ Работа с изображениями

### URL изображения
```typescript
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/client';

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

// Использование
<img src={urlFor(service.image).url()} alt={service.image.alt} />
```

---

## 🔒 Безопасность

### Публичные API ключи (для клиента)
- Project ID - публичный
- Dataset - публичный

### Приватные API ключи (для сервера)
- API Token - **НИКОГДА** не делитесь!
- Храните в `.env.local`
- Используйте только на сервере (Server Components)

---

## 📝 Развертывание

### На Vercel

1. Добавьте environment variables:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=...
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-28
```

2. Раскомитьте и запушьте:
```bash
git add schemaTypes
git commit -m "Add Sanity CMS schema types"
git push
```

3. Sanity Studio будет доступна на `yourdomain.com/studio`

---

## 🐛 Troubleshooting

### "Module not found: sanity"
```bash
npm install sanity next-sanity
```

### Изображения не загружаются
- Проверьте, что `NEXT_PUBLIC_SANITY_PROJECT_ID` правильный
- Убедитесь, что `useCdn: true` в конфигурации

### GROQ запрос возвращает null
- Проверьте, что документ опубликован (не в draft)
- Проверьте синтаксис GROQ запроса
- Используйте `*[_type == "..."]` вместо специфического ID

### Ошибка при публикации
- Проверьте, что все required поля заполнены
- Проверьте types в defineField()

---

## 📚 Полезные ресурсы

- [Sanity Docs](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Portable Text](https://www.sanity.io/docs/block-content)
- [Image API](https://www.sanity.io/docs/image-url)
- [Next.js Integration](https://www.sanity.io/docs/next-js)

---

## 🎯 Следующие шаги

1. ✅ Инициализировать Sanity проект
2. ✅ Скопировать schemaTypes
3. ✅ Обновить конфигурацию
4. ✅ Запустить Sanity Studio
5. ✅ Создать первый контент (например, главную страницу)
6. ✅ Подключить клиент в Next.js
7. ✅ Использовать данные в компонентах
8. ✅ Развернуть на Vercel

---

**Версия:** 1.0.0  
**Дата:** January 28, 2026  
**Status:** ✅ Ready to Use
