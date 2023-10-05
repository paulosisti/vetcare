/* eslint-disable prettier/prettier */
import { Transform } from 'class-transformer';

export const TransformDate = Transform((params) => new Date(params.value));
