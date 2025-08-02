/*
  Warnings:

  - You are about to drop the column `endDate` on the `evenement` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `evenement` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `evenement` table. All the data in the column will be lost.
  - You are about to drop the column `hourEnd` on the `schedule` table. All the data in the column will be lost.
  - You are about to drop the column `hourStart` on the `schedule` table. All the data in the column will be lost.
  - You are about to drop the column `validityEndTime` on the `schedule` table. All the data in the column will be lost.
  - You are about to drop the column `validityStartTime` on the `schedule` table. All the data in the column will be lost.
  - Added the required column `maxEnd` to the `schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minHour` to the `schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."evenement" DROP CONSTRAINT "evenement_subjectId_fkey";

-- AlterTable
ALTER TABLE "public"."assignment" ADD COLUMN     "hourEnd" INTEGER,
ADD COLUMN     "hourStart" INTEGER,
ADD COLUMN     "scheduleId" TEXT;

-- AlterTable
ALTER TABLE "public"."evenement" DROP COLUMN "endDate",
DROP COLUMN "startDate",
DROP COLUMN "subjectId",
ADD COLUMN     "hourEnd" INTEGER,
ADD COLUMN     "hourStart" INTEGER,
ADD COLUMN     "scheduleId" TEXT;

-- AlterTable
ALTER TABLE "public"."schedule" DROP COLUMN "hourEnd",
DROP COLUMN "hourStart",
DROP COLUMN "validityEndTime",
DROP COLUMN "validityStartTime",
ADD COLUMN     "maxEnd" INTEGER NOT NULL,
ADD COLUMN     "minHour" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."subject" ADD COLUMN     "description" TEXT,
ADD COLUMN     "hourEnd" INTEGER,
ADD COLUMN     "hourStart" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."assignment" ADD CONSTRAINT "assignment_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "public"."schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."evenement" ADD CONSTRAINT "evenement_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "public"."schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
