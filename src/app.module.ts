import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PatientsModule } from './patients/patients.module';
import { OwnersModule } from './owners/owners.module';

@Module({
  imports: [ConfigModule.forRoot(), PatientsModule, OwnersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
