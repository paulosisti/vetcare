-- CreateTable
CREATE TABLE "Vaccine" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dateAdministered" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Vaccine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientVaccine" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "vaccineId" INTEGER NOT NULL,

    CONSTRAINT "PatientVaccine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hygiene" (
    "id" SERIAL NOT NULL,
    "serviceDate" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "patientId" INTEGER NOT NULL,

    CONSTRAINT "Hygiene_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParasiteControl" (
    "id" SERIAL NOT NULL,
    "controlDate" TIMESTAMP(3) NOT NULL,
    "controlType" TEXT NOT NULL,
    "patientId" INTEGER NOT NULL,

    CONSTRAINT "ParasiteControl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PatientToVaccine" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PatientToVaccine_AB_unique" ON "_PatientToVaccine"("A", "B");

-- CreateIndex
CREATE INDEX "_PatientToVaccine_B_index" ON "_PatientToVaccine"("B");

-- AddForeignKey
ALTER TABLE "PatientVaccine" ADD CONSTRAINT "PatientVaccine_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientVaccine" ADD CONSTRAINT "PatientVaccine_vaccineId_fkey" FOREIGN KEY ("vaccineId") REFERENCES "Vaccine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hygiene" ADD CONSTRAINT "Hygiene_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParasiteControl" ADD CONSTRAINT "ParasiteControl_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PatientToVaccine" ADD CONSTRAINT "_PatientToVaccine_A_fkey" FOREIGN KEY ("A") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PatientToVaccine" ADD CONSTRAINT "_PatientToVaccine_B_fkey" FOREIGN KEY ("B") REFERENCES "Vaccine"("id") ON DELETE CASCADE ON UPDATE CASCADE;
