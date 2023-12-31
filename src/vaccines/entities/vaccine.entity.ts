import { Prisma } from '@prisma/client';

export class Vaccine implements Prisma.VaccineUncheckedCreateInput {
  id?: number;
  name: string;
  dateAdministered: string | Date;
  notes?: string;
  patientId: number;
}
