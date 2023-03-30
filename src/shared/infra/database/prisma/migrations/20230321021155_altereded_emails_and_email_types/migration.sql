/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `email_types` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `emails` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "email_types_name_key" ON "email_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "emails_email_key" ON "emails"("email");

-- CreateIndex
CREATE INDEX "emails_email_idx" ON "emails"("email");
