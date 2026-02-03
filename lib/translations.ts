export type Language = 'ru' | 'en';

export const translations = {
  nav: {
    ru: {
      portfolio: 'Портфолио',
      experts: 'Эксперты',
      packages: 'Пакеты',
      process: 'Процесс',
      reviews: 'Отзывы',
      faq: 'FAQ',
      contact: 'Контакты',
      telegram: 'Написать в Telegram',
    },
    en: {
      portfolio: 'Portfolio',
      experts: 'Experts',
      packages: 'Packages',
      process: 'Process',
      reviews: 'Reviews',
      faq: 'FAQ',
      contact: 'Contact',
      telegram: 'Message on Telegram',
    },
  },
  hero: {
    ru: {
      title: 'BEAUTY ATELIER — премиальные образы для свадеб и мероприятий',
      subtitle: 'Мы создаем не просто образ - мы дарим ощущение непревзойденности.',
      cta1: 'Записаться на консультацию',
      cta2: 'Показать портфолио',
    },
    en: {
      title: 'BEAUTY ATELIER — Premium bridal & event looks',
      subtitle: 'We create not just a look - we give you a feeling of excellence.',
      cta1: 'Book a consultation',
      cta2: 'View portfolio',
    },
  },
  portfolio: {
    ru: {
      title: 'Портфолио',
      subtitle: 'От элегантной классики до выразительных, эффектных образов. Каждый образ — отражение именно вашей красоты и характера',
      all: 'Все',
      bridal: 'Свадьба',
      event: 'Мероприятие',
      editorial: 'Editorial',
    },
    en: {
      title: 'Portfolio',
      subtitle: 'From elegant classics to expressive, striking looks. Every look is a reflection of your unique beauty and character',
      all: 'All',
      bridal: 'Bridal',
      event: 'Event',
      editorial: 'Editorial',
    },
  },
  experts: {
    ru: {
      title: 'Эксперты',
      sofia: {
        name: 'София Шамсимухаметова',
        subtitle: 'Топ-визажист · Визажист №1 в Ташкенте (2025)',
        points: [
          'Официально признана визажистом №1 в 2025 году',
          'Опыт масштабных мероприятий и съёмок',
          'Образ: стойкость, фотогеничность, идеальная кожа',
        ],
      },
      farrukh: {
        name: 'Фаррух Шамуратов',
        subtitle: 'Стилист-парикмахер международного класса',
        points: [
          'Чемпион Европы, призёр Чемпионата мира',
          'Специализация: роскошные продуманные образы',
          'Практикующий тренер, авторская методика',
        ],
      },
    },
    en: {
      title: 'Experts',
      sofia: {
        name: 'Sofia Shamsimuhametova',
        subtitle: 'Top Makeup Artist · #1 Makeup Artist in Tashkent (2025)',
        points: [
          'Officially awarded #1 in 2025',
          'Large-scale events & shootings experience',
          'Long-lasting, photo-ready, refined skin finish',
        ],
      },
      farrukh: {
        name: 'Farrukh Shamuratov',
        subtitle: 'International Hair Stylist',
        points: [
          'European Champion, World Championship medalist',
          'Signature: luxurious, well-structured looks',
          'Educator with an author\'s methodology',
        ],
      },
    },
  },
  packages: {
    ru: {
      title: 'Пакеты услуг',
      subtitle: 'Индивидуальный подход к каждому событию',
      items: [
        {
          name: 'Bridal Full Look',
          description: 'Пробный образ и финальный образ в день торжества',
        },
        {
          name: 'Event Look',
          description: 'Вечерний образ под формат события',
        },
        {
          name: 'On-site for Events',
          description: 'Выезд и сопровождение',
        },
        {
          name: 'Team / Group',
          description: 'Создание образов для нескольких персон',
        },
      ],
      note: 'Стоимость рассчитывается индивидуально в зависимости от формата и сложности',
    },
    en: {
      title: 'Service Packages',
      subtitle: 'Tailored approach for every occasion',
      items: [
        {
          name: 'Bridal Full Look',
          description: 'Trial look and final look on your wedding day',
        },
        {
          name: 'Event Look',
          description: 'Evening look tailored to the event format',
        },
        {
          name: 'On-site for Events',
          description: 'Travel and on-site support',
        },
        {
          name: 'Team / Group',
          description: 'Creating looks for multiple people',
        },
      ],
      note: 'Pricing calculated individually based on format and complexity',
    },
  },
  process: {
    ru: {
      title: 'Процесс работы',
      steps: [
        {
          title: 'Консультация',
          description: 'Обсуждаем формат события, ваши пожелания и создаём концепцию образа',
        },
        {
          title: 'Подготовка',
          description: 'Подбираем палитру, текстуры и технику под ваш тип внешности',
        },
        {
          title: 'Создание образа',
          description: 'Реализуем образ с учётом всех деталей и вашего комфорта',
        },
        {
          title: 'Финальные штрихи',
          description: 'Проверяем стойкость, фотогеничность и сопровождаем при необходимости',
        },
      ],
    },
    en: {
      title: 'Our Process',
      steps: [
        {
          title: 'Consultation',
          description: 'We discuss your event format, preferences and create a concept',
        },
        {
          title: 'Preparation',
          description: 'Select palette, textures and technique for your features',
        },
        {
          title: 'Creating the look',
          description: 'Execute the look with attention to detail and your comfort',
        },
        {
          title: 'Final touches',
          description: 'Check durability, photo-readiness and provide support if needed',
        },
      ],
    },
  },
  reviews: {
    ru: {
      title: 'Отзывы',
      items: [
        {
          name: 'Алина К.',
          text: 'София создала для меня идеальный свадебный образ. Макияж держался весь день, а на фотографиях я выглядела потрясающе. Профессионализм на высшем уровне!',
        },
        {
          name: 'Мария С.',
          text: 'Фаррух — настоящий мастер своего дела. Причёска была не только красивой, но и невероятно удобной. Я чувствовала себя королевой!',
        },
        {
          name: 'Дина Р.',
          text: 'Работа с дуэтом BEAUTY ATELIER — это особенный опыт. Они не просто делают макияж и причёску, они создают целостный образ, который подчёркивает твою индивидуальность.',
        },
        {
          name: 'Камила Т.',
          text: 'Обратилась к Софии для вечернего мероприятия. Образ получился элегантным и современным. Все спрашивали, кто мой визажист!',
        },
        {
          name: 'Наталья В.',
          text: 'Фаррух и София работают как единый организм. Их синхронность и профессионализм создают атмосферу спокойствия и уверенности.',
        },
        {
          name: 'Жасмин А.',
          text: 'Невероятное качество работы! Editorial образ для фотосессии превзошёл все ожидания. Рекомендую всем, кто ценит высокий стандарт.',
        },
      ],
    },
    en: {
      title: 'Reviews',
      items: [
        {
          name: 'Alina K.',
          text: 'Sofia created the perfect bridal look for me. The makeup lasted all day, and I looked stunning in photos. Highest level of professionalism!',
        },
        {
          name: 'Maria S.',
          text: 'Farrukh is a true master. The hairstyle was not only beautiful but incredibly comfortable. I felt like a queen!',
        },
        {
          name: 'Dina R.',
          text: 'Working with the BEAUTY ATELIER duo is a special experience. They don\'t just do makeup and hair, they create a complete look that highlights your individuality.',
        },
        {
          name: 'Kamila T.',
          text: 'I contacted Sofia for an evening event. The look was elegant and modern. Everyone asked who my makeup artist was!',
        },
        {
          name: 'Natalia V.',
          text: 'Farrukh and Sofia work like a single organism. Their synchronicity and professionalism create an atmosphere of calm and confidence.',
        },
        {
          name: 'Jasmine A.',
          text: 'Incredible quality of work! The editorial look for the photoshoot exceeded all expectations. Highly recommend to those who value high standards.',
        },
      ],
    },
  },
  faq: {
    ru: {
      title: 'Частые вопросы',
      items: [
        {
          question: 'Как проходит консультация?',
          answer: 'Консультация проходит онлайн или очно. Мы обсуждаем формат события, ваши пожелания, показываем примеры работ и создаём концепцию образа.',
        },
        {
          question: 'Сколько времени занимает создание образа?',
          answer: 'В среднем 2-3 часа для полного образа (макияж + причёска). Для сложных свадебных образов может потребоваться до 4 часов.',
        },
        {
          question: 'Выезжаете ли вы на мероприятия?',
          answer: 'Да, мы предоставляем услугу выезда и сопровождения на мероприятии для финальных штрихов и коррекции образа.',
        },
        {
          question: 'Работаете ли вы с группами?',
          answer: 'Да, у нас есть пакет для команд и групп. Мы составляем расписание так, чтобы все были готовы вовремя.',
        },
        {
          question: 'Какие косметические средства используете?',
          answer: 'Мы работаем только с профессиональной премиальной косметикой ведущих мировых брендов, гарантирующей стойкость и безопасность.',
        },
        {
          question: 'Как записаться на услугу?',
          answer: 'Свяжитесь с нами через Telegram (@beauty_atelier), по телефону +998 90-688-22-66 или напишите на email info@beauty-atelier.pro. Мы обсудим детали и подберём удобное время.',
        },
      ],
    },
    en: {
      title: 'FAQ',
      items: [
        {
          question: 'How does the consultation work?',
          answer: 'Consultation takes place online or in person. We discuss the event format, your preferences, show work examples and create a look concept.',
        },
        {
          question: 'How long does it take to create a look?',
          answer: 'On average 2-3 hours for a full look (makeup + hair). Complex bridal looks may require up to 4 hours.',
        },
        {
          question: 'Do you travel to events?',
          answer: 'Yes, we provide on-site service and support at the event for final touches and look corrections.',
        },
        {
          question: 'Do you work with groups?',
          answer: 'Yes, we have a package for teams and groups. We create a schedule to ensure everyone is ready on time.',
        },
        {
          question: 'What cosmetic products do you use?',
          answer: 'We work only with professional premium cosmetics from leading global brands, ensuring durability and safety.',
        },
        {
          question: 'How to book a service?',
          answer: 'Contact us via Telegram (@beauty_atelier), phone +998 90-688-22-66, or email info@beauty-atelier.pro. We\'ll discuss details and find a convenient time.',
        },
      ],
    },
  },
  finalCta: {
    ru: {
      title: 'Хотите образ, который выглядит дорого и держится весь день?',
      button: 'Написать в Telegram',
    },
    en: {
      title: 'Want a look that feels premium and lasts all day?',
      button: 'Message on Telegram',
    },
  },
  footer: {
    ru: {
      slogan: 'Мы создаём не просто образ — мы создаём состояние непревзойдённости',
      phone: 'Телефон',
      social: 'Социальные сети',
    },
    en: {
      slogan: 'We don\'t just create a look — we create a state of excellence',
      phone: 'Phone',
      social: 'Social Media',
    },
  },
};
