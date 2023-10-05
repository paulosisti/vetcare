import { IsInt, IsNotEmpty } from 'class-validator';

export class CreatePatientsVaccineDto {
  @IsNotEmpty()
  @IsInt()
  patientId: number;

  @IsNotEmpty()
  @IsInt()
  vaccineId: number;
}
