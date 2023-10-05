import { Prisma } from '@prisma/client';

export class PatientsMedicalRecord
  implements Prisma.PatientMedicalRecordUncheckedCreateInput
{
  id?: number;
  consultationDate: string | Date;
  diagnosis: string;
  treatment: string;
  prescription?: string;
  notes?: string;
  patientId: number;
}
