import { Prisma } from '@prisma/client';
import { DecimalJsLike } from '@prisma/client/runtime/library';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TransformDate } from 'src/decorators/transform-date.decorator';

export class CreatePatientDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Species is required' })
  @IsString({ message: 'Species must be a string' })
  species: string;

  @IsNotEmpty({ message: 'Breed is required' })
  @IsString({ message: 'Breed must be a string' })
  breed: string;

  @IsOptional()
  @IsDate()
  @TransformDate
  dateOfBirth?: string | Date;

  @IsNotEmpty({ message: 'Sex is required' })
  @IsString({ message: 'Sex must be a string' })
  sex: string;

  @IsNotEmpty({ message: 'Color is required' })
  @IsString({ message: 'Color must be a string' })
  color: string;

  @IsOptional()
  @IsNumber({}, { message: 'Weight must be a number' })
  weight?: string | number | Prisma.Decimal | DecimalJsLike;

  @IsOptional()
  @IsString({ message: 'Allergies must be a string' })
  allergies?: string;

  @IsOptional()
  @IsString({ message: 'Medications must be a string' })
  medications?: string;

  @IsOptional()
  @IsString({ message: 'Emergency contact must be a string' })
  emergencyContact?: string;

  @IsOptional()
  photoUrl?: string;

  @IsNotEmpty({ message: 'Current status is required' })
  @IsString({ message: 'Current status must be a string' })
  currentStatus: string;

  @IsOptional()
  @IsString({ message: 'Additional notes must be a string' })
  additionalNotes?: string;

  @IsNotEmpty({ message: 'Owner is required' })
  @IsNumber()
  ownerId: number;
}
