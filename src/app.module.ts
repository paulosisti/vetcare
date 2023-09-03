import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PatientsModule } from './patients/patients.module';

@Module({
  imports: [ConfigModule.forRoot(), PatientsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
