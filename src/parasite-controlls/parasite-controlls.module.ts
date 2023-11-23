import { Module } from '@nestjs/common';
import { OwnersModule } from 'src/owners/owners.module';
import { PatientsModule } from 'src/patients/patients.module';
import { PrismaService } from 'src/prisma.service';
import { ParasiteControllsController } from './parasite-controlls.controller';
import { ParasiteControllsService } from './parasite-controlls.service';

@Module({
  controllers: [ParasiteControllsController],
  providers: [ParasiteControllsService, PrismaService],
  imports: [OwnersModule, PatientsModule],
  exports: [ParasiteControllsService],
})
export class ParasiteControllsModule {}
