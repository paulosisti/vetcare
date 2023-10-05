import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { TransformDate } from 'src/decorators/transform-date.decorator';

export class CreateVaccineDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsDate()
  @TransformDate
  dateAdministered: string | Date;

  @IsString()
  notes?: string;
}
