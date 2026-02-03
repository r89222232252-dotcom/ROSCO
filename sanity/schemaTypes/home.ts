import {defineField, defineType} from 'sanity'

export const home = defineType({
  name: 'home',
  title: 'Главная Страница',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Название',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Подзаголовок',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Логотип',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'heroImage',
      title: 'Главное изображение',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'description',
      title: 'Описание',
      type: 'text',
    }),
    defineField({
      name: 'ctaText',
      title: 'Текст кнопки CTA',
      type: 'string',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'URL кнопки CTA',
      type: 'string',
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
        defineField({
          name: 'keywords',
          title: 'Ключевые слова',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'logo',
    },
  },
})
