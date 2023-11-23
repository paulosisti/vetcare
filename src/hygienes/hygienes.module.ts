import { Module } from '@nestjs/common';
import { OwnersModule } from 'src/owners/owners.module';
import { PatientsModule } from 'src/patients/patients.module';
import { PrismaService } from 'src/prisma.service';
import { HygienesController } from './hygienes.controller';
import { HygienesService } from './hygienes.service';

@Module({
  controllers: [HygienesController],
  providers: [HygienesService, PrismaService],
  imports: [OwnersModule, PatientsModule],
  exports: [HygienesService],
})
export class HygienesModule {}
