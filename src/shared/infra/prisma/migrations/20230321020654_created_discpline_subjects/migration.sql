-- CreateTable
CREATE TABLE "discipline_subjects" (
    "discipline_id" UUID NOT NULL,
    "subject_id" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "discipline_subjects_pkey" PRIMARY KEY ("discipline_id","subject_id")
);

-- AddForeignKey
ALTER TABLE "discipline_subjects" ADD CONSTRAINT "discipline_subjects_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "discipline_subjects" ADD CONSTRAINT "discipline_subjects_discipline_id_fkey" FOREIGN KEY ("discipline_id") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
