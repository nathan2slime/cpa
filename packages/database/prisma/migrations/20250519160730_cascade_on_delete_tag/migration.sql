-- DropForeignKey
ALTER TABLE "TagOnEvent" DROP CONSTRAINT "TagOnEvent_tagId_fkey";

-- DropForeignKey
ALTER TABLE "TagOnForm" DROP CONSTRAINT "TagOnForm_tagId_fkey";

-- AddForeignKey
ALTER TABLE "TagOnEvent" ADD CONSTRAINT "TagOnEvent_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagOnForm" ADD CONSTRAINT "TagOnForm_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
