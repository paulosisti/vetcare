import { Module } from '@nestjs/common';
import { OwnersModule } from 'src/owners/owners.module';
import { PrismaService } from 'src/prisma.service';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';

@Module({
  imports: [OwnersModule],
  controllers: [PatientsController],
  providers: [PatientsService, PrismaService],
  exports: [PatientsService],
})
export class PatientsModule {}
