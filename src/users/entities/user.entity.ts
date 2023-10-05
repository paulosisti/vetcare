import { Prisma } from '@prisma/client';

export class User implements Prisma.UserUncheckedCreateInput {
  id?: number;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  currentStatus: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
