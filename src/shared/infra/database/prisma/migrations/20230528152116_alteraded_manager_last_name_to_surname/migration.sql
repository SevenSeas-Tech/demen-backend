/*
  Warnings:

  - You are about to drop the column `last_name` on the `managers` table. All the data in the column will be lost.
  - Added the required column `surname` to the `managers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "managers" DROP COLUMN "last_name",
ADD COLUMN     "surname" VARCHAR(15) NOT NULL;
