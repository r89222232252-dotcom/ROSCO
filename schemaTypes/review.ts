import { defineType, defineField } from 'sanity';

export const review = defineType({
  name: 'review',
  title: 'Отзыв',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Имя клиента',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Текст отзыва',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Рейтинг',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(5),
    }),
    defineField({
      name: 'clientImage',
      title: 'Фото клиента',
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
      name: 'serviceType',
      title: 'Тип услуги',
      type: 'string',
      options: {
        list: [
          { title: 'Макияж', value: 'makeup' },
          { title: 'Волосы', value: 'hair' },
          { title: 'Комбо', value: 'combo' },
          { title: 'Другое', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'eventType',
      title: 'Тип события',
      type: 'string',
      options: {
        list: [
          { title: 'Свадьба', value: 'wedding' },
          { title: 'Мероприятие', value: 'event' },
          { title: 'Фотосессия', value: 'photoshoot' },
          { title: 'Прочее', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'service',
      title: 'Услуга',
      type: 'reference',
      to: [{ type: 'service' }],
    }),
    defineField({
      name: 'portfolio',
      title: 'Портфолио',
      type: 'reference',
      to: [{ type: 'portfolioItem' }],
    }),
    defineField({
      name: 'isVerified',
      title: 'Проверенный отзыв',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'featured',
      title: 'Избранный отзыв',
      type: 'boolean',
      initialValue: false,
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
      title: 'clientName',
      rating: 'rating',
      verified: 'isVerified',
    },
    prepare(selection) {
      const { title, rating, verified } = selection;
      return {
        title: title || 'Без имени',
        subtitle: `⭐ ${rating || 0}/5 ${verified ? '✓ Проверено' : ''}`,
      };
    },
  },
});
