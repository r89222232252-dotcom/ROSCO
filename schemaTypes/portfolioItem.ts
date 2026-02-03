import { defineType, defineField } from 'sanity';

export const portfolioItem = defineType({
  name: 'portfolioItem',
  title: 'Портфолио',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Название',
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
      name: 'category',
      title: 'Категория',
      type: 'string',
      options: {
        list: [
          { title: 'Свадьба', value: 'bridal' },
          { title: 'Мероприятие', value: 'event' },
          { title: 'Editorial', value: 'editorial' },
          { title: 'Портрет', value: 'portrait' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mainImage',
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Галерея',
      type: 'array',
      of: [
        {
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
            {
              name: 'caption',
              type: 'string',
              title: 'Подпись',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'services',
      title: 'Услуги использованные',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'service' }],
        },
      ],
    }),
    defineField({
      name: 'artist',
      title: 'Мастер',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Имя',
          type: 'string',
        },
        {
          name: 'role',
          title: 'Роль',
          type: 'string',
          options: {
            list: [
              { title: 'Визажист', value: 'makeup_artist' },
              { title: 'Парикмахер', value: 'hair_stylist' },
              { title: 'Фотограф', value: 'photographer' },
            ],
          },
        },
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'eventDetails',
      title: 'Детали события',
      type: 'object',
      fields: [
        {
          name: 'eventType',
          title: 'Тип события',
          type: 'string',
        },
        {
          name: 'eventDate',
          title: 'Дата события',
          type: 'date',
        },
        {
          name: 'venue',
          title: 'Место',
          type: 'string',
        },
        {
          name: 'client',
          title: 'Клиент (если известен)',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Избранный проект',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Порядок отображения',
      type: 'number',
    }),
    defineField({
      name: 'tags',
      title: 'Теги',
      type: 'array',
      of: [{ type: 'string' }],
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
      category: 'category',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, category } = selection;
      return {
        title,
        subtitle: category || 'Портфолио',
        media: selection.media,
      };
    },
  },
});
