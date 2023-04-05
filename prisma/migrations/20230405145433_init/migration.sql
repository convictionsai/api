-- AlterTable
ALTER TABLE `Chapter` MODIFY `name` VARCHAR(191) NULL,
    MODIFY `description` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Verse` (
    `id` VARCHAR(191) NOT NULL,
    `bibleId` VARCHAR(191) NOT NULL,
    `bookId` VARCHAR(191) NOT NULL,
    `number` INTEGER NOT NULL,
    `name` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `content` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Verse` ADD CONSTRAINT `Verse_bibleId_fkey` FOREIGN KEY (`bibleId`) REFERENCES `Bible`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Verse` ADD CONSTRAINT `Verse_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
