-- CreateTable
CREATE TABLE "course_disciplines" (
    "course_id" UUID NOT NULL,
    "discipline_id" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "course_disciplines_pkey" PRIMARY KEY ("course_id","discipline_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "course_disciplines_course_id_key" ON "course_disciplines"("course_id");

-- CreateIndex
CREATE UNIQUE INDEX "course_disciplines_discipline_id_key" ON "course_disciplines"("discipline_id");

-- AddForeignKey
ALTER TABLE "course_disciplines" ADD CONSTRAINT "course_disciplines_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_disciplines" ADD CONSTRAINT "course_disciplines_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
