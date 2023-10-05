import { PartialType } from '@nestjs/mapped-types';
import { CreateHygieneDto } from './create-hygiene.dto';

export class UpdateHygieneDto extends PartialType(CreateHygieneDto) {}
