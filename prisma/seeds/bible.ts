import { Books } from './books'
import { Language } from '@prisma/client'

export const Bible = {
    name: 'KJV',
    language: Language.EN,
    description: 'King James Version (KJV)',
    Book: {
        create: Books
    }
}
