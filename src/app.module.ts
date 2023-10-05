import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CalendarModule } from './calendar/calendar.module';
import { MailModule } from './emails/mail.module';
import { HygienesModule } from './hygienes/hygienes.module';
import { OpenaiModule } from './openai/openai.module';
import { OwnersModule } from './owners/owners.module';
import { ParasiteControllsModule } from './parasite-controlls/parasite-controlls.module';
import { PatientsMedicalRecordsModule } from './patients-medical-records/patients-medical-records.module';
import { PatientsVaccinesModule } from './patients-vaccines/patients-vaccines.module';
import { PatientsModule } from './patients/patients.module';
import { UsersModule } from './users/users.module';
import { VaccinesModule } from './vaccines/vaccines.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PatientsModule,
    OwnersModule,
    CalendarModule,
    UsersModule,
    PatientsMedicalRecordsModule,
    OpenaiModule,
    VaccinesModule,
    PatientsVaccinesModule,
    HygienesModule,
    ParasiteControllsModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
