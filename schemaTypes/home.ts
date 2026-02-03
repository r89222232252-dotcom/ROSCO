import { defineType, defineField } from 'sanity';

export const home = defineType({
  name: 'home',
  title: 'Главная страница',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Подзаголовок',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'description',
      title: 'Описание',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'Логотип',
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
      name: 'heroImage',
      title: 'Главное изображение',
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
      name: 'ctaText',
      title: 'Текст кнопки CTA',
      type: 'string',
    }),
    defineField({
      name: 'ctaUrl',
      title: 'URL кнопки CTA',
      type: 'url',
    }),
    defineField({
      name: 'featuredServices',
      title: 'Избранные услуги',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'service' }],
        },
      ],
    }),
    defineField({
      name: 'testimonialSection',
      title: 'Секция отзывов',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Включить',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'title',
          title: 'Заголовок секции',
          type: 'string',
        },
        {
          name: 'featuredReviews',
          title: 'Избранные отзывы',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'review' }],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 2,
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
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
      media: 'logo',
    },
  },
});
