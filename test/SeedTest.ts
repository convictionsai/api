require('dotenv').config({ path: `.env.${ process.env.ENVIRONMENT || 'local' }` });

import { Test } from '@nestjs/testing';
import { first, firstValueFrom } from 'rxjs';
import { APIModule } from '../src/APIModule';
import { BiblesService } from '../src/Bibles/BiblesService';
import { BooksService } from '../src/Bibles/Books/BooksService';
import { ChaptersService } from '../src/Bibles/Books/Chapters/ChaptersService';
import { Bible } from '../src/Models/Bibles/Bible';
import { Language } from '../src/Models/Languages/Language';

const data = require('/Users/matthewdavis/workspace/convictions.ai/data/bible/json/en_kjv.json');

const books: {
    chapters: {
        verses: string[]
    }[]
}[] = [];

for (let i = 0; i < data.length; i++) {
    // console.log(`${ data[i].name } (${ data[i].abbrev }) = ${ data[i].chapters.length } chapters`);
    const chapters: { verses: string[] }[] = [];
    for (let c = 0; c < data[i].chapters.length; c++) {
        // console.log(`    ${ c } = ${ data[i].chapters[c].length } verses`);
        const verses: string[] = [];
        for (let v = 0; v < data[i].chapters[c].length; v++) {
            // console.log(`        ${ i }:${ c }:${ v }: ${ data[i].chapters[c][v] }`);
            verses.push(data[i].chapters[c][v]);
        }
        chapters.push({ verses });
    }
    books.push({
        chapters
    });
}

describe('Redeploy cameras Tests', () => {

    let biblesService: BiblesService;
    let booksService: BooksService;
    let chaptersService: ChaptersService;

    let bible: Bible;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [
                APIModule
            ]
        }).compile();
        biblesService = module.get(BiblesService);
        booksService = module.get(BooksService);
        chaptersService = module.get(ChaptersService);
    });

    test('Create bibles', async () => {
        try {
            bible = await firstValueFrom(biblesService.create({
                name: 'KJV',
                language: Language.en,
                description: 'King James Version (KJV)'
            }));
        } catch (e) {
            bible = await firstValueFrom(biblesService.getById('8d143877-edb5-4a70-ae36-34355f1bc815'))
        }
    });

    test('Create books', async () => {
        for (let b = 0; b < books.length; b++) {
            const book = await booksService.create({
                bible,
                number: b + 1
            });
            for ( let c = 0; c < books[b].chapters.length; c++) {
                const chapter = await chaptersService.create({
                    bible,
                    book,
                    number: c + 1
                })
            }
        }
    });
});
