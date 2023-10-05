import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { TransformDate } from 'src/decorators/transform-date.decorator';

export class CreateHygieneDto {
  @IsNotEmpty()
  @IsDate()
  @TransformDate
  serviceDate: string | Date;

  @IsNotEmpty()
  @IsString()
  notes?: string;

  @IsNotEmpty()
  patientId: number;
}
