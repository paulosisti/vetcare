/*
  Warnings:

  - You are about to drop the `PatientVaccine` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PatientToVaccine` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `patientId` to the `Vaccine` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PatientVaccine" DROP CONSTRAINT "PatientVaccine_patientId_fkey";

-- DropForeignKey
ALTER TABLE "PatientVaccine" DROP CONSTRAINT "PatientVaccine_vaccineId_fkey";

-- DropForeignKey
ALTER TABLE "_PatientToVaccine" DROP CONSTRAINT "_PatientToVaccine_A_fkey";

-- DropForeignKey
ALTER TABLE "_PatientToVaccine" DROP CONSTRAINT "_PatientToVaccine_B_fkey";

-- AlterTable
ALTER TABLE "Vaccine" ADD COLUMN     "patientId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "PatientVaccine";

-- DropTable
DROP TABLE "_PatientToVaccine";

-- AddForeignKey
ALTER TABLE "Vaccine" ADD CONSTRAINT "Vaccine_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
