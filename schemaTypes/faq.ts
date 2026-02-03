import { defineType, defineField } from 'sanity';

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Вопрос',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Ответ',
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Категория',
      type: 'string',
      options: {
        list: [
          { title: 'Услуги', value: 'services' },
          { title: 'Бронирование', value: 'booking' },
          { title: 'Цены', value: 'pricing' },
          { title: 'Портфолио', value: 'portfolio' },
          { title: 'Прочее', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Теги',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'relatedService',
      title: 'Связанная услуга',
      type: 'reference',
      to: [{ type: 'service' }],
    }),
    defineField({
      name: 'displayOrder',
      title: 'Порядок отображения',
      type: 'number',
    }),
    defineField({
      name: 'featured',
      title: 'Популярный вопрос',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'views',
      title: 'Количество просмотров',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'helpfulCount',
      title: 'Сколько нашли полезным',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Опубликовано',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'question',
      category: 'category',
    },
    prepare(selection) {
      const { title, category } = selection;
      return {
        title: title || 'Без вопроса',
        subtitle: category || 'FAQ',
      };
    },
  },
});
