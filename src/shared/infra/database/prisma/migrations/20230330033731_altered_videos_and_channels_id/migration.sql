/*
  Warnings:

  - The primary key for the `channels` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `videos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `published_at` to the `videos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "issues" DROP CONSTRAINT "issues_video_id_fkey";

-- DropForeignKey
ALTER TABLE "videos" DROP CONSTRAINT "videos_channel_id_fkey";

-- AlterTable
ALTER TABLE "channels" DROP CONSTRAINT "channels_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "channels_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "issues" ALTER COLUMN "video_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "videos" DROP CONSTRAINT "videos_pkey",
ADD COLUMN     "published_at" TIMESTAMP NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "channel_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "videos_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "issues" ADD CONSTRAINT "issues_video_id_fkey" FOREIGN KEY ("video_id") REFERENCES "videos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
