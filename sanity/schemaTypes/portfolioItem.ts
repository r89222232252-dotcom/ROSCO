import {defineField, defineType} from 'sanity'

export const portfolioItem = defineType({
  name: 'portfolioItem',
  title: 'Портфолио',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Название проекта',
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
      name: 'mainImage',
      title: 'Главное изображение',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Галерея',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Альтернативный текст',
              type: 'string',
            }),
            defineField({
              name: 'caption',
              title: 'Подпись',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Категория',
      type: 'string',
      options: {
        list: [
          {title: 'Свадьба', value: 'bridal'},
          {title: 'Мероприятие', value: 'event'},
          {title: 'Editorial', value: 'editorial'},
          {title: 'Портрет', value: 'portrait'},
        ],
      },
    }),
    defineField({
      name: 'services',
      title: 'Используемые услуги',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'service'}],
        },
      ],
    }),
    defineField({
      name: 'artist',
      title: 'Мастер',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Имя мастера',
          type: 'string',
        }),
        defineField({
          name: 'role',
          title: 'Специализация',
          type: 'string',
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'eventDetails',
      title: 'Детали события',
      type: 'object',
      fields: [
        defineField({
          name: 'eventDate',
          title: 'Дата события',
          type: 'date',
        }),
        defineField({
          name: 'location',
          title: 'Место проведения',
          type: 'string',
        }),
        defineField({
          name: 'clientName',
          title: 'Имя клиента',
          type: 'string',
        }),
        defineField({
          name: 'description',
          title: 'Описание события',
          type: 'text',
        }),
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Показать на главной',
      type: 'boolean',
      initialValue: false,
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
      media: 'mainImage',
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
