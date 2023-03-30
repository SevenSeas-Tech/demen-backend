-- CreateTable
CREATE TABLE "phones" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "international_code" VARCHAR(10) NOT NULL DEFAULT '+55',
    "phone" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "phones_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "phones" ADD CONSTRAINT "FK_phone_user" FOREIGN KEY ("user_id") REFERENCES "managers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
