import { IsDate, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { TransformDate } from 'src/decorators/transform-date.decorator';

export class CreatePatientsMedicalRecordDto {
  @IsDate()
  @IsNotEmpty()
  @TransformDate
  consultationDate: Date;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  diagnosis: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  treatment: string;

  @IsString()
  prescription?: string;

  @IsString()
  notes?: string;

  @IsNotEmpty()
  patientId: number;
}
