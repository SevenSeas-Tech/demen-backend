/*
  Warnings:

  - You are about to alter the column `name` on the `token_types` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(15)`.

*/
-- AlterTable
ALTER TABLE "token_types" ALTER COLUMN "name" SET DATA TYPE VARCHAR(15);

-- CreateTable
CREATE TABLE "email_types" (
    "id" UUID NOT NULL,
    "name" VARCHAR(15) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_types_pkey" PRIMARY KEY ("id")
);
