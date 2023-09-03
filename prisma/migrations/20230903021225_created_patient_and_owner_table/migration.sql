-- CreateTable
CREATE TABLE "Owner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "gender" TEXT NOT NULL,
    "maritalStatus" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "photoUrl" TEXT,
    "preferredPaymentMethod" TEXT,
    "petInsuranceDetails" TEXT,
    "additionalNotes" TEXT,
    "registrationDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3),
    "sex" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "weight" DECIMAL(65,30),
    "allergies" TEXT,
    "medications" TEXT,
    "ownerId" INTEGER NOT NULL,
    "emergencyContact" TEXT,
    "photoUrl" TEXT,
    "currentStatus" TEXT NOT NULL,
    "additionalNotes" TEXT,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
