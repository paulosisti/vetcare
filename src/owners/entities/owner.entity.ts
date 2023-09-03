import { Prisma } from '@prisma/client';

export class Owner implements Prisma.OwnerUncheckedCreateInput {
  id?: number;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  dateOfBirth?: string | Date;
  gender: string;
  maritalStatus: string;
  occupation: string;
  photoUrl?: string;
  preferredPaymentMethod?: string;
  petInsuranceDetails?: string;
  additionalNotes?: string;
  registrationDate: string | Date;
  patients?: Prisma.PatientUncheckedCreateNestedManyWithoutOwnerInput;
}