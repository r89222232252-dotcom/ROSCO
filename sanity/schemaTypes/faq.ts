import {defineField, defineType} from 'sanity'

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
      of: [{type: 'block'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Категория',
      type: 'string',
      options: {
        list: [
          {title: 'Услуги', value: 'services'},
          {title: 'Бронирование', value: 'booking'},
          {title: 'Платежи', value: 'payment'},
          {title: 'Отмена', value: 'cancellation'},
          {title: 'Другое', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Теги',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'relatedService',
      title: 'Связанная услуга',
      type: 'reference',
      to: [{type: 'service'}],
    }),
    defineField({
      name: 'displayOrder',
      title: 'Порядок отображения',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'featured',
      title: 'Показать на главной',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'views',
      title: 'Просмотры',
      type: 'number',
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      name: 'helpfulCount',
      title: 'Считают полезным',
      type: 'number',
      initialValue: 0,
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'question',
      category: 'category',
    },
    prepare({title, category}) {
      return {
        title: title,
        subtitle: category,
      }
    },
  },
})
