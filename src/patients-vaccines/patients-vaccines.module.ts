import { Module } from '@nestjs/common';
import { PatientsModule } from 'src/patients/patients.module';
import { PrismaService } from 'src/prisma.service';
import { PatientsVaccinesController } from './patients-vaccines.controller';
import { PatientsVaccinesService } from './patients-vaccines.service';

@Module({
  controllers: [PatientsVaccinesController],
  providers: [PatientsVaccinesService, PrismaService],
  imports: [PatientsModule],
})
export class PatientsVaccinesModule {}
