import { PartialType } from '@nestjs/mapped-types';
import { CreateParasiteControllDto } from './create-parasite-controll.dto';

export class UpdateParasiteControllDto extends PartialType(CreateParasiteControllDto) {}
