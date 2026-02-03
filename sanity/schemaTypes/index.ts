import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {home} from './home'
import {service} from './service'
import {portfolioItem} from './portfolioItem'
import {review} from './review'
import {faq} from './faq'
import {contacts} from './contacts'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    home,
    service,
    portfolioItem,
    review,
    faq,
    contacts,
  ],
}
