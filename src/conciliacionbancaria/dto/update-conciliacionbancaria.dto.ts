import { PartialType } from '@nestjs/mapped-types';
import { CreateConciliacionbancariaDto } from './create-conciliacionbancaria.dto';

export class UpdateConciliacionbancariaDto extends PartialType(CreateConciliacionbancariaDto) {}
