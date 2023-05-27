-- DropForeignKey
ALTER TABLE `Book` DROP FOREIGN KEY `Book_bibleId_fkey`;

-- DropForeignKey
ALTER TABLE `Chapter` DROP FOREIGN KEY `Chapter_bibleId_fkey`;

-- DropForeignKey
ALTER TABLE `Chapter` DROP FOREIGN KEY `Chapter_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `QAResultToBook` DROP FOREIGN KEY `QAResultToBook_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `QAResultToBook` DROP FOREIGN KEY `QAResultToBook_qAResultId_fkey`;

-- DropForeignKey
ALTER TABLE `Verse` DROP FOREIGN KEY `Verse_bibleId_fkey`;

-- DropForeignKey
ALTER TABLE `Verse` DROP FOREIGN KEY `Verse_bookId_fkey`;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_bibleId_fkey` FOREIGN KEY (`bibleId`) REFERENCES `Bible`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chapter` ADD CONSTRAINT `Chapter_bibleId_fkey` FOREIGN KEY (`bibleId`) REFERENCES `Bible`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Chapter` ADD CONSTRAINT `Chapter_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Verse` ADD CONSTRAINT `Verse_bibleId_fkey` FOREIGN KEY (`bibleId`) REFERENCES `Bible`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Verse` ADD CONSTRAINT `Verse_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QAResultToBook` ADD CONSTRAINT `QAResultToBook_qAResultId_fkey` FOREIGN KEY (`qAResultId`) REFERENCES `QAResult`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QAResultToBook` ADD CONSTRAINT `QAResultToBook_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
