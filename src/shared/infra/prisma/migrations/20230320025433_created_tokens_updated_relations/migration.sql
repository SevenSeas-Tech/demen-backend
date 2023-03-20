-- CreateTable
CREATE TABLE "tokens" (
    "id" UUID NOT NULL,
    "valid_until" TIMESTAMP NOT NULL,
    "is_expired" BOOLEAN NOT NULL,
    "user_id" UUID NOT NULL,
    "type_id" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "FK_token_type" FOREIGN KEY ("type_id") REFERENCES "token_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tokens" ADD CONSTRAINT "FK_token_user" FOREIGN KEY ("user_id") REFERENCES "managers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
