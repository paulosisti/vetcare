import { Module } from '@nestjs/common';
import { PatientsModule } from 'src/patients/patients.module';
import { PrismaService } from 'src/prisma.service';
import { VaccinesController } from './vaccines.controller';
import { VaccinesService } from './vaccines.service';

@Module({
  controllers: [VaccinesController],
  providers: [VaccinesService, PrismaService],
  imports: [PatientsModule],
})
export class VaccinesModule {}
