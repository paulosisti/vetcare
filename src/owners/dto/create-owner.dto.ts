import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { TransformDate } from 'src/decorators/transform-date.decorator';

export class CreateOwnerDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsNotEmpty({ message: 'Address is required' })
  @IsString({ message: 'Address must be a string' })
  address: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  password = 'senha123';

  @IsNotEmpty({ message: 'Phone number is required' })
  @IsString({ message: 'Phone number must be a string' })
  phoneNumber: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsOptional()
  @IsDate()
  @TransformDate
  dateOfBirth?: string | Date;

  @IsNotEmpty({ message: 'Gender is required' })
  @IsString({ message: 'Gender must be a string' })
  gender: string;

  @IsNotEmpty({ message: 'Marital status is required' })
  @IsString({ message: 'Marital status must be a string' })
  maritalStatus: string;

  @IsNotEmpty({ message: 'Occupation is required' })
  @IsString({ message: 'Occupation must be a string' })
  occupation: string;

  @IsOptional()
  @IsUrl({}, { message: 'Photo URL must be valid' })
  photoUrl?: string | null;

  @IsOptional()
  @IsString({ message: 'Preferred payment method must be a string' })
  preferredPaymentMethod?: string;

  @IsOptional()
  @IsString({ message: 'Pet insurance details must be a string' })
  petInsuranceDetails?: string;

  @IsOptional()
  @IsString({ message: 'Additional notes must be a string' })
  additionalNotes?: string;

  @IsNotEmpty({ message: 'Registration date is required' })
  @IsDate()
  @TransformDate
  registrationDate: string | Date;
}
