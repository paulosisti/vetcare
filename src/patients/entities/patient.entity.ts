import { Prisma } from '@prisma/client';
import { DecimalJsLike } from '@prisma/client/runtime/library';

export class Patient implements Prisma.PatientUncheckedCreateInput {
  id?: number;
  name: string;
  species: string;
  breed: string;
  dateOfBirth?: string | Date;
  sex: string;
  color: string;
  weight?: string | number | Prisma.Decimal | DecimalJsLike;
  allergies?: string;
  medications?: string;
  ownerId: number;
  emergencyContact?: string;
  photoUrl?: string;
  currentStatus: string;
  additionalNotes?: string;
}
