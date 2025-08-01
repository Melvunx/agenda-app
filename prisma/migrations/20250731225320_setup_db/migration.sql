/*
  Warnings:

  - A unique constraint covering the columns `[accountId,providerId]` on the table `account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[identifier,value]` on the table `verification` will be added. If there are existing duplicate values, this will fail.
  - Made the column `createdAt` on table `verification` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `verification` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."Weekday" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "public"."Semester" AS ENUM ('S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8');

-- CreateEnum
CREATE TYPE "public"."Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('TO_DO', 'PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."NoteType" AS ENUM ('COURSE', 'TD', 'TP', 'RESUME', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."EventType" AS ENUM ('LECTURE', 'TUTORIAL', 'EXAM', 'MEETING', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."CourseType" AS ENUM ('LECTURE', 'EXAM', 'TP', 'TD', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."AssignmentType" AS ENUM ('HOMEWORK', 'PROJECT', 'EXAM', 'PRESENTATION', 'TP', 'OTHER');

-- AlterTable
ALTER TABLE "public"."account" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."session" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."user" ALTER COLUMN "emailVerified" SET DEFAULT false,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."verification" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- CreateTable
CREATE TABLE "public"."schedule" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "weekday" "public"."Weekday" NOT NULL,
    "hourStart" TIMESTAMP(3) NOT NULL,
    "hourEnd" TIMESTAMP(3) NOT NULL,
    "validityStartTime" TIMESTAMP(3) NOT NULL,
    "validityEndTime" TIMESTAMP(3) NOT NULL,
    "courseType" "public"."CourseType" NOT NULL DEFAULT 'LECTURE',
    "recurrence" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."subject" (
    "id" TEXT NOT NULL,
    "scheduleId" TEXT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#3498db',
    "teacher" TEXT,
    "room" TEXT,
    "semester" "public"."Semester" NOT NULL DEFAULT 'S1',
    "schoolYear" TEXT NOT NULL DEFAULT '2025-2026',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."assignment" (
    "id" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "assignmentType" "public"."AssignmentType" NOT NULL DEFAULT 'HOMEWORK',
    "dueDate" TIMESTAMP(3) NOT NULL,
    "limitDate" TIMESTAMP(3) NOT NULL,
    "status" "public"."Status" NOT NULL DEFAULT 'TO_DO',
    "priority" "public"."Priority" NOT NULL DEFAULT 'MEDIUM',
    "files" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."subject_note" (
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

    CONSTRAINT "subject_note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."evenement" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subjectId" TEXT,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "eventType" "public"."EventType" NOT NULL DEFAULT 'LECTURE',
    "location" TEXT,
    "color" TEXT NOT NULL DEFAULT '#129aa5',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "evenement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subject_code_key" ON "public"."subject"("code");

-- CreateIndex
CREATE UNIQUE INDEX "account_accountId_providerId_key" ON "public"."account"("accountId", "providerId");

-- CreateIndex
CREATE UNIQUE INDEX "verification_identifier_value_key" ON "public"."verification"("identifier", "value");

-- AddForeignKey
ALTER TABLE "public"."schedule" ADD CONSTRAINT "schedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."subject" ADD CONSTRAINT "subject_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "public"."schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."assignment" ADD CONSTRAINT "assignment_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "public"."subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."subject_note" ADD CONSTRAINT "subject_note_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "public"."subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."evenement" ADD CONSTRAINT "evenement_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "public"."subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
