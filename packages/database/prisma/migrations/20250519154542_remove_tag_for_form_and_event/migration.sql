/*
  Warnings:

  - You are about to drop the column `eventId` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `formId` on the `Tag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_formId_fkey";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "eventId",
DROP COLUMN "formId";
