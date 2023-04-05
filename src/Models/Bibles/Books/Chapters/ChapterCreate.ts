import { Bible } from '../../Bible';
import { Book } from '../Book';
import { VerseCreate } from './Verses/VerseCreate';

export class ChapterCreate {
    public bible: Bible;
    public book: Book;
    public number: number;
}
