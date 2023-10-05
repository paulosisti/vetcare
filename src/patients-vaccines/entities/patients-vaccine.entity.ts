import { Prisma } from '@prisma/client';

export class PatientsVaccine
  implements Prisma.PatientVaccineUncheckedCreateInput
{
  id?: number;
  patientId: number;
  vaccineId: number;
}
