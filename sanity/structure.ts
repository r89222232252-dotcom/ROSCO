import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('BEAUTY ATELIER')
    .items([
      // Главная
      S.documentTypeListItem('home').title('🏠 Главная страница'),
      S.divider(),

      // Контент
      S.documentTypeListItem('service').title('💅 Услуги'),
      S.documentTypeListItem('portfolioItem').title('📸 Портфолио'),
      S.documentTypeListItem('review').title('⭐ Отзывы'),
      S.documentTypeListItem('faq').title('❓ FAQ'),
      S.divider(),

      // Информация
      S.documentTypeListItem('contacts').title('📞 Контакты'),
      S.divider(),

      // Блог (старое)
      S.documentTypeListItem('post').title('📝 Posts'),
      S.documentTypeListItem('category').title('🏷️ Categories'),
      S.documentTypeListItem('author').title('👤 Authors'),
      S.divider(),

      // Остальное
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            'post',
            'category',
            'author',
            'home',
            'service',
            'portfolioItem',
            'review',
            'faq',
            'contacts',
          ].includes(item.getId()!),
      ),
    ])
