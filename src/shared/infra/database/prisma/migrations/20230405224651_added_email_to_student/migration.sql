/*
  Warnings:

  - Added the required column `email` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "students" ADD COLUMN     "email" VARCHAR(30) NOT NULL;
