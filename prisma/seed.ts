import { PrismaClient, Language } from '@prisma/client'
import { Bible } from './seeds/bible'

const prisma = new PrismaClient()

async function main() {
    const kjv = await prisma.bible.upsert({
        where: {
            name_language: {
                name: 'KJV',
                language: Language.EN
            }
        },
        update: {},
        create: Bible
    })
    console.log({ kjv })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
