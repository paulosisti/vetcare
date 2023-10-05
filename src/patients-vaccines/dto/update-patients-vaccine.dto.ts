import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientsVaccineDto } from './create-patients-vaccine.dto';

export class UpdatePatientsVaccineDto extends PartialType(
  CreatePatientsVaccineDto,
) {}
