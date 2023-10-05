import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { TransformDate } from 'src/decorators/transform-date.decorator';

export class CreateParasiteControllDto {
  @IsDate()
  @TransformDate
  controlDate: string | Date;

  @IsNotEmpty({ message: 'controlType is required' })
  @IsString({ message: 'controlType must be a string' })
  controlType: string;

  @IsNotEmpty()
  patientId: number;
}
