/*
  Warnings:

  - You are about to drop the column `activityId` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `open` on the `Form` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Form` table. All the data in the column will be lost.
  - Added the required column `courseId` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formId` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `open` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsible` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Form" DROP CONSTRAINT "Form_activityId_fkey";

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "courseId" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "formId" TEXT NOT NULL,
ADD COLUMN     "open" BOOLEAN NOT NULL,
ADD COLUMN     "responsible" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Form" DROP COLUMN "activityId",
DROP COLUMN "endDate",
DROP COLUMN "open",
DROP COLUMN "startDate";

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
