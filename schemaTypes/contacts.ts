import { defineType, defineField } from 'sanity';

export const contacts = defineType({
  name: 'contacts',
  title: 'Контакты',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Название сайта',
      type: 'string',
      initialValue: 'BEAUTY ATELIER',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Телефон',
      type: 'string',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'string',
    }),
    defineField({
      name: 'telegram',
      title: 'Telegram',
      type: 'object',
      fields: [
        {
          name: 'username',
          title: 'Ник в Telegram',
          type: 'string',
        },
        {
          name: 'url',
          title: 'URL профиля',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'socialMedia',
      title: 'Социальные сети',
      type: 'object',
      fields: [
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'object',
          fields: [
            {
              name: 'username',
              title: 'Ник',
              type: 'string',
            },
            {
              name: 'url',
              title: 'URL профиля',
              type: 'url',
            },
          ],
        },
        {
          name: 'facebook',
          title: 'Facebook',
          type: 'url',
        },
        {
          name: 'tiktok',
          title: 'TikTok',
          type: 'object',
          fields: [
            {
              name: 'username',
              title: 'Ник',
              type: 'string',
            },
            {
              name: 'url',
              title: 'URL профиля',
              type: 'url',
            },
          ],
        },
        {
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
        },
      ],
    }),
    defineField({
      name: 'address',
      title: 'Адрес',
      type: 'object',
      fields: [
        {
          name: 'street',
          title: 'Улица',
          type: 'string',
        },
        {
          name: 'city',
          title: 'Город',
          type: 'string',
        },
        {
          name: 'country',
          title: 'Страна',
          type: 'string',
        },
        {
          name: 'zipCode',
          title: 'Почтовый индекс',
          type: 'string',
        },
        {
          name: 'latitude',
          title: 'Широта',
          type: 'number',
        },
        {
          name: 'longitude',
          title: 'Долгота',
          type: 'number',
        },
      ],
    }),
    defineField({
      name: 'workingHours',
      title: 'Режим работы',
      type: 'object',
      fields: [
        {
          name: 'monday',
          title: 'Понедельник',
          type: 'string',
        },
        {
          name: 'tuesday',
          title: 'Вторник',
          type: 'string',
        },
        {
          name: 'wednesday',
          title: 'Среда',
          type: 'string',
        },
        {
          name: 'thursday',
          title: 'Четверг',
          type: 'string',
        },
        {
          name: 'friday',
          title: 'Пятница',
          type: 'string',
        },
        {
          name: 'saturday',
          title: 'Суббота',
          type: 'string',
        },
        {
          name: 'sunday',
          title: 'Воскресенье',
          type: 'string',
        },
        {
          name: 'note',
          title: 'Примечание',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'team',
      title: 'Команда',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Имя',
              type: 'string',
            },
            {
              name: 'role',
              title: 'Должность',
              type: 'string',
            },
            {
              name: 'bio',
              title: 'Биография',
              type: 'text',
              rows: 2,
            },
            {
              name: 'image',
              title: 'Фото',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'specialization',
              title: 'Специализация',
              type: 'array',
              of: [{ type: 'string' }],
            },
            {
              name: 'instagram',
              title: 'Instagram',
              type: 'url',
            },
            {
              name: 'email',
              title: 'Email',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'about',
      title: 'О компании',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'logo',
      title: 'Логотип',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    }),
    defineField({
      name: 'bankDetails',
      title: 'Банковские реквизиты',
      type: 'object',
      fields: [
        {
          name: 'accountHolder',
          title: 'Владелец счета',
          type: 'string',
        },
        {
          name: 'bankName',
          title: 'Название банка',
          type: 'string',
        },
        {
          name: 'accountNumber',
          title: 'Номер счета',
          type: 'string',
        },
        {
          name: 'routingNumber',
          title: 'Маршрутный номер',
          type: 'string',
        },
        {
          name: 'iban',
          title: 'IBAN',
          type: 'string',
        },
        {
          name: 'swift',
          title: 'SWIFT',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'paymentMethods',
      title: 'Методы оплаты',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'privacyPolicy',
      title: 'Политика конфиденциальности',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'termsConditions',
      title: 'Условия использования',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: {
      title: 'siteName',
      media: 'logo',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Контакты',
        subtitle: 'Информация о компании',
        media: selection.media,
      };
    },
  },
});
