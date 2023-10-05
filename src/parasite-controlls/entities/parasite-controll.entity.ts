import { Prisma } from '@prisma/client';

export class ParasiteControll
  implements Prisma.ParasiteControlUncheckedCreateInput
{
  id?: number;
  controlDate: string | Date;
  controlType: string;
  patientId: number;
}
