/*
  Warnings:

  - The primary key for the `emails` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `emails` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `emails` table. All the data in the column will be lost.
  - Added the required column `address` to the `emails` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "emails_email_key";

-- AlterTable
ALTER TABLE "emails" DROP CONSTRAINT "emails_pkey",
DROP COLUMN "email",
DROP COLUMN "id",
ADD COLUMN     "address" VARCHAR(50) NOT NULL,
ADD CONSTRAINT "emails_pkey" PRIMARY KEY ("address");
