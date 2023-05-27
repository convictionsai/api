/*
  Warnings:

  - A unique constraint covering the columns `[name,language]` on the table `Bible` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Bible_name_language_key` ON `Bible`(`name`, `language`);
