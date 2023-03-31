-- AlterTable
ALTER TABLE "issues" ALTER COLUMN "closed_at" DROP NOT NULL,
ALTER COLUMN "closed_at" DROP DEFAULT;
