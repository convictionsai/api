-- AlterTable
ALTER TABLE `Verse` MODIFY `content` TEXT NOT NULL;

-- CreateTable
CREATE TABLE `QAResult` (
    `id` VARCHAR(191) NOT NULL,
    `hash` VARCHAR(191) NOT NULL,
    `prompt` TEXT NOT NULL,
    `answer` TEXT NOT NULL,
    `tokens` INTEGER NOT NULL,
    `time` INTEGER NOT NULL,
    `qaResultStatus` ENUM('ACTIVE', 'EXPIRED', 'BLOCKED', 'FAILED') NOT NULL,
    `hit` ENUM('CACHE', 'LIVE') NOT NULL,
    `bookId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `QAResult` ADD CONSTRAINT `QAResult_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
