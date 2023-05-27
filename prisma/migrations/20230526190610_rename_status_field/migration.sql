/*
  Warnings:

  - You are about to drop the column `qaResultStatus` on the `QAResult` table. All the data in the column will be lost.
  - Added the required column `status` to the `QAResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `QAResult` DROP COLUMN `qaResultStatus`,
    ADD COLUMN `status` ENUM('ACTIVE', 'EXPIRED', 'BLOCKED', 'FAILED') NOT NULL;
