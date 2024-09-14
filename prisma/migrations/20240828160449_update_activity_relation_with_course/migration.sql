/*
  Warnings:

  - You are about to drop the column `courseId` on the `Event` table. All the data in the column will be lost.
  - Added the required column `eventId` to the `Answer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_formId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "courseId";

-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "eventId" TEXT NOT NULL,
ALTER COLUMN "formId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE SET NULL ON UPDATE CASCADE;
