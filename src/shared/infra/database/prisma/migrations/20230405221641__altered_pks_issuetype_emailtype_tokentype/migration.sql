/*
  Warnings:

  - The primary key for the `email_types` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `email_types` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `email_types` table. All the data in the column will be lost.
  - The primary key for the `issue_types` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `issue_types` table. All the data in the column will be lost.
  - You are about to alter the column `type_id` on the `issues` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `VarChar(15)`.
  - The primary key for the `token_types` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `token_types` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `token_types` table. All the data in the column will be lost.
  - Added the required column `type` to the `email_types` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type_id` on the `emails` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `type` to the `issue_types` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `token_types` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type_id` on the `tokens` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "emails" DROP CONSTRAINT "emails_type_id_fkey";

-- DropForeignKey
ALTER TABLE "issues" DROP CONSTRAINT "issues_type_id_fkey";

-- DropForeignKey
ALTER TABLE "tokens" DROP CONSTRAINT "tokens_type_id_fkey";

-- DropIndex
DROP INDEX "email_types_name_key";

-- AlterTable
ALTER TABLE "email_types" DROP CONSTRAINT "email_types_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "type" VARCHAR(15) NOT NULL,
ADD CONSTRAINT "email_types_pkey" PRIMARY KEY ("type");

-- AlterTable
ALTER TABLE "emails" DROP COLUMN "type_id",
ADD COLUMN     "type_id" VARCHAR(15) NOT NULL;

-- AlterTable
ALTER TABLE "issue_types" DROP CONSTRAINT "issue_types_pkey",
DROP COLUMN "name",
ADD COLUMN     "type" VARCHAR(15) NOT NULL,
ADD CONSTRAINT "issue_types_pkey" PRIMARY KEY ("type");

-- AlterTable
ALTER TABLE "issues" ALTER COLUMN "type_id" SET DATA TYPE VARCHAR(15);

-- AlterTable
ALTER TABLE "token_types" DROP CONSTRAINT "token_types_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "type" VARCHAR(15) NOT NULL,
ADD CONSTRAINT "token_types_pkey" PRIMARY KEY ("type");

-- AlterTable
ALTER TABLE "tokens" DROP COLUMN "type_id",
ADD COLUMN     "type_id" VARCHAR(15) NOT NULL;

-- AddForeignKey
ALTER TABLE "emails" ADD CONSTRAINT "emails_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "email_types"("type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issues" ADD CONSTRAINT "issues_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "issue_types"("type") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "token_types"("type") ON DELETE RESTRICT ON UPDATE CASCADE;
