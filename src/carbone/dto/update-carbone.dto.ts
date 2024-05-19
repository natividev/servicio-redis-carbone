import { PartialType } from '@nestjs/mapped-types';
import { CreateCarboneDto } from './create-carbone.dto';

export class UpdateCarboneDto extends PartialType(CreateCarboneDto) {}
