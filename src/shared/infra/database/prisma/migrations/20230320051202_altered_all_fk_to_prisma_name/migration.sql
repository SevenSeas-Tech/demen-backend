-- RenameForeignKey
ALTER TABLE "emails" RENAME CONSTRAINT "FK_email_type" TO "emails_type_id_fkey";

-- RenameForeignKey
ALTER TABLE "emails" RENAME CONSTRAINT "FK_email_user" TO "emails_user_id_fkey";

-- RenameForeignKey
ALTER TABLE "phones" RENAME CONSTRAINT "FK_phone_user" TO "phones_user_id_fkey";

-- RenameForeignKey
ALTER TABLE "tokens" RENAME CONSTRAINT "FK_token_type" TO "tokens_type_id_fkey";

-- RenameForeignKey
ALTER TABLE "tokens" RENAME CONSTRAINT "FK_token_user" TO "tokens_user_id_fkey";

-- RenameForeignKey
ALTER TABLE "videos" RENAME CONSTRAINT "FK_video_channel" TO "videos_channel_id_fkey";

-- RenameForeignKey
ALTER TABLE "videos" RENAME CONSTRAINT "FK_video_institution" TO "videos_institution_id_fkey";

-- RenameForeignKey
ALTER TABLE "videos" RENAME CONSTRAINT "FK_video_teacher" TO "videos_teacher_id_fkey";

-- RenameForeignKey
ALTER TABLE "videos" RENAME CONSTRAINT "FK_video_user" TO "videos_user_id_fkey";
