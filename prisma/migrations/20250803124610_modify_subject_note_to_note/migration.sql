/*
  Warnings:

  - You are about to drop the `subject_note` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."subject_note" DROP CONSTRAINT "subject_note_subjectId_fkey";

-- DropTable
DROP TABLE "public"."subject_note";

-- CreateTable
CREATE TABLE "public"."note" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "chapter" TEXT,
    "subjectDate" TIMESTAMP(3) NOT NULL,
    "noteType" "public"."NoteType" NOT NULL DEFAULT 'COURSE',
    "files" TEXT[],
    "tags" TEXT[],
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "note_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."note" ADD CONSTRAINT "note_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "public"."subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
