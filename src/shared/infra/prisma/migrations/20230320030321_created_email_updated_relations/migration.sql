-- CreateTable
CREATE TABLE "emails" (
    "id" UUID NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "user_id" UUID NOT NULL,
    "type_id" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "emails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "emails" ADD CONSTRAINT "FK_email_type" FOREIGN KEY ("type_id") REFERENCES "email_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "emails" ADD CONSTRAINT "FK_email_user" FOREIGN KEY ("user_id") REFERENCES "managers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
