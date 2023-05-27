/*
  Warnings:

  - You are about to drop the column `bookId` on the `QAResult` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `QAResult` DROP FOREIGN KEY `QAResult_bookId_fkey`;

-- AlterTable
ALTER TABLE `QAResult` DROP COLUMN `bookId`;

-- CreateTable
CREATE TABLE `QAResultToBook` (
    `id` VARCHAR(191) NOT NULL,
    `qAResultId` VARCHAR(191) NOT NULL,
    `bookId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `QAResultToBook` ADD CONSTRAINT `QAResultToBook_qAResultId_fkey` FOREIGN KEY (`qAResultId`) REFERENCES `QAResult`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QAResultToBook` ADD CONSTRAINT `QAResultToBook_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
