import {defineField, defineType} from 'sanity'

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
      title: 'URL Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Краткое описание',
      type: 'text',
    }),
    defineField({
      name: 'fullDescription',
      title: 'Полное описание',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'category',
      title: 'Категория',
      type: 'string',
      options: {
        list: [
          {title: 'Макияж', value: 'makeup'},
          {title: 'Волосы', value: 'hair'},
          {title: 'Комбо', value: 'combo'},
          {title: 'Special', value: 'special'},
        ],
      },
    }),
    defineField({
      name: 'image',
      title: 'Изображение',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'pricing',
      title: 'Цены',
      type: 'object',
      fields: [
        defineField({
          name: 'basePrice',
          title: 'Базовая цена',
          type: 'number',
        }),
        defineField({
          name: 'discountPrice',
          title: 'Цена со скидкой',
          type: 'number',
        }),
        defineField({
          name: 'currency',
          title: 'Валюта',
          type: 'string',
          initialValue: 'руб',
        }),
        defineField({
          name: 'duration',
          title: 'Длительность (минут)',
          type: 'number',
        }),
        defineField({
          name: 'packages',
          title: 'Пакеты',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'name', type: 'string', title: 'Название пакета'},
                {name: 'price', type: 'number', title: 'Цена'},
                {name: 'description', type: 'string', title: 'Описание'},
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'features',
      title: 'Особенности',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'availability',
      title: 'Доступность',
      type: 'object',
      fields: [
        defineField({
          name: 'available',
          title: 'Доступна',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'availableFrom',
          title: 'Доступна с',
          type: 'date',
        }),
        defineField({
          name: 'availableUntil',
          title: 'Доступна до',
          type: 'date',
        }),
      ],
    }),
    defineField({
      name: 'displayOrder',
      title: 'Порядок отображения',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'SEO Название',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'SEO Описание',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'image',
    },
    prepare({title, category, media}) {
      return {
        title: title,
        subtitle: category,
        media: media,
      }
    },
  },
})
