import { Prisma } from '@prisma/client';

export class Hygiene implements Prisma.HygieneUncheckedCreateInput {
  id?: number;
  serviceDate: string | Date;
  notes?: string;
  patientId: number;
}
