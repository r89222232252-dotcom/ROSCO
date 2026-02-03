import { defineType, defineField } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Услуга',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Название услуги',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      title: 'Описание',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'fullDescription',
      title: 'Полное описание',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Альтернативный текст',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Изображение',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Альтернативный текст',
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Категория',
      type: 'string',
      options: {
        list: [
          { title: 'Макияж', value: 'makeup' },
          { title: 'Волосы', value: 'hair' },
          { title: 'Комбо', value: 'combo' },
          { title: 'Спецпредложения', value: 'special' },
        ],
      },
    }),
    defineField({
      name: 'pricing',
      title: 'Ценообразование',
      type: 'object',
      fields: [
        {
          name: 'basePrice',
          title: 'Базовая цена',
          type: 'number',
        },
        {
          name: 'currency',
          title: 'Валюта',
          type: 'string',
          initialValue: 'UZS',
        },
        {
          name: 'discountPrice',
          title: 'Цена со скидкой',
          type: 'number',
        },
        {
          name: 'duration',
          title: 'Время выполнения (минуты)',
          type: 'number',
        },
        {
          name: 'packages',
          title: 'Пакеты',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'name',
                  title: 'Название пакета',
                  type: 'string',
                },
                {
                  name: 'price',
                  title: 'Цена',
                  type: 'number',
                },
                {
                  name: 'description',
                  title: 'Описание',
                  type: 'text',
                  rows: 2,
                },
                {
                  name: 'features',
                  title: 'Особенности',
                  type: 'array',
                  of: [{ type: 'string' }],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'features',
      title: 'Особенности',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'availability',
      title: 'Доступность',
      type: 'object',
      fields: [
        {
          name: 'available',
          title: 'Доступна',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'availableFrom',
          title: 'Доступна с',
          type: 'datetime',
        },
        {
          name: 'availableUntil',
          title: 'Доступна до',
          type: 'datetime',
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Теги',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'displayOrder',
      title: 'Порядок отображения',
      type: 'number',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Опубликовано',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      price: 'pricing.basePrice',
      media: 'image',
    },
    prepare(selection) {
      const { title, category, price } = selection;
      return {
        title,
        subtitle: `${category ? `${category} • ` : ''}${price ? `${price} UZS` : ''}`,
        media: selection.media,
      };
    },
  },
});
