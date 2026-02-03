import {defineField, defineType} from 'sanity'

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
      options: {hotspot: true},
    }),
    defineField({
      name: 'serviceType',
      title: 'Тип услуги',
      type: 'string',
      options: {
        list: [
          {title: 'Макияж', value: 'makeup'},
          {title: 'Волосы', value: 'hair'},
          {title: 'Комбо', value: 'combo'},
          {title: 'Не указано', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'eventType',
      title: 'Тип события',
      type: 'string',
      options: {
        list: [
          {title: 'Свадьба', value: 'bridal'},
          {title: 'Мероприятие', value: 'event'},
          {title: 'Фотосессия', value: 'photoshoot'},
          {title: 'Не указано', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'service',
      title: 'Услуга',
      type: 'reference',
      to: [{type: 'service'}],
    }),
    defineField({
      name: 'portfolio',
      title: 'Портфолио',
      type: 'reference',
      to: [{type: 'portfolioItem'}],
    }),
    defineField({
      name: 'isVerified',
      title: 'Проверенный отзыв',
      type: 'boolean',
      initialValue: false,
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
  ],
  preview: {
    select: {
      title: 'clientName',
      rating: 'rating',
    },
    prepare({title, rating}) {
      return {
        title: title,
        subtitle: `⭐ ${rating}/5`,
      }
    },
  },
})
