import {defineField, defineType} from 'sanity'

export const contacts = defineType({
  name: 'contacts',
  title: 'Контакты',
  type: 'document',
  fields: [
    // Основные контакты
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
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
      type: 'string',
    }),

    // Социальные сети
    defineField({
      name: 'socialMedia',
      title: 'Социальные сети',
      type: 'object',
      fields: [
        defineField({
          name: 'instagram',
          title: 'Instagram',
          type: 'string',
        }),
        defineField({
          name: 'facebook',
          title: 'Facebook',
          type: 'string',
        }),
        defineField({
          name: 'tiktok',
          title: 'TikTok',
          type: 'string',
        }),
        defineField({
          name: 'youtube',
          title: 'YouTube',
          type: 'string',
        }),
      ],
    }),

    // Адрес и геолокация
    defineField({
      name: 'address',
      title: 'Адрес',
      type: 'object',
      fields: [
        defineField({
          name: 'street',
          title: 'Улица',
          type: 'string',
        }),
        defineField({
          name: 'city',
          title: 'Город',
          type: 'string',
        }),
        defineField({
          name: 'zipCode',
          title: 'Почтовый код',
          type: 'string',
        }),
        defineField({
          name: 'country',
          title: 'Страна',
          type: 'string',
        }),
        defineField({
          name: 'latitude',
          title: 'Широта',
          type: 'number',
        }),
        defineField({
          name: 'longitude',
          title: 'Долгота',
          type: 'number',
        }),
      ],
    }),

    // Режим работы
    defineField({
      name: 'workingHours',
      title: 'Режим работы',
      type: 'object',
      fields: [
        defineField({
          name: 'monday',
          title: 'Понедельник',
          type: 'string',
        }),
        defineField({
          name: 'tuesday',
          title: 'Вторник',
          type: 'string',
        }),
        defineField({
          name: 'wednesday',
          title: 'Среда',
          type: 'string',
        }),
        defineField({
          name: 'thursday',
          title: 'Четверг',
          type: 'string',
        }),
        defineField({
          name: 'friday',
          title: 'Пятница',
          type: 'string',
        }),
        defineField({
          name: 'saturday',
          title: 'Суббота',
          type: 'string',
        }),
        defineField({
          name: 'sunday',
          title: 'Воскресенье',
          type: 'string',
        }),
      ],
    }),

    // Команда
    defineField({
      name: 'team',
      title: 'Команда',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', type: 'string', title: 'Имя'},
            {name: 'role', type: 'string', title: 'Должность'},
            {name: 'bio', type: 'text', title: 'О себе'},
            {name: 'specialization', type: 'string', title: 'Специализация'},
            {name: 'instagram', type: 'string', title: 'Instagram'},
            {
              name: 'photo',
              type: 'image',
              title: 'Фото',
              options: {hotspot: true},
            },
          ],
        },
      ],
    }),

    // Информация о компании
    defineField({
      name: 'about',
      title: 'О компании',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'logo',
      title: 'Логотип',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    }),

    // Банковские реквизиты
    defineField({
      name: 'bankDetails',
      title: 'Банковские реквизиты',
      type: 'object',
      fields: [
        defineField({
          name: 'bankName',
          title: 'Название банка',
          type: 'string',
        }),
        defineField({
          name: 'accountNumber',
          title: 'Номер счета',
          type: 'string',
        }),
        defineField({
          name: 'bic',
          title: 'БИК',
          type: 'string',
        }),
        defineField({
          name: 'inn',
          title: 'ИНН',
          type: 'string',
        }),
      ],
    }),

    // Методы оплаты
    defineField({
      name: 'paymentMethods',
      title: 'Методы оплаты',
      type: 'array',
      of: [{type: 'string'}],
    }),

    // Документы
    defineField({
      name: 'privacyPolicy',
      title: 'Политика конфиденциальности',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'termsConditions',
      title: 'Условия использования',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
