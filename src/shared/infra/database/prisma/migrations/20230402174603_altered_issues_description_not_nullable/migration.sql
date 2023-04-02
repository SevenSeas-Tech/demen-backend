/*
  Warnings:

  - Made the column `description` on table `issues` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "issues" ALTER COLUMN "description" SET NOT NULL;
