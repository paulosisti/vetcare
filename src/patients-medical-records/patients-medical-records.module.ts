import { Module } from '@nestjs/common';
import { PatientsModule } from 'src/patients/patients.module';
import { PrismaService } from 'src/prisma.service';
import { PatientsMedicalRecordsController } from './patients-medical-records.controller';
import { PatientsMedicalRecordsService } from './patients-medical-records.service';

@Module({
  imports: [PatientsModule],
  controllers: [PatientsMedicalRecordsController],
  providers: [PatientsMedicalRecordsService, PrismaService],
  exports: [PatientsMedicalRecordsService],
})
export class PatientsMedicalRecordsModule {}
