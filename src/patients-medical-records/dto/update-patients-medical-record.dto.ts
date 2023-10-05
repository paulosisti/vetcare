import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientsMedicalRecordDto } from './create-patients-medical-record.dto';

export class UpdatePatientsMedicalRecordDto extends PartialType(CreatePatientsMedicalRecordDto) {}
