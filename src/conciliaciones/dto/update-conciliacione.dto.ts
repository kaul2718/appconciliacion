import { PartialType } from '@nestjs/mapped-types';
import { CreateConciliacioneDto } from './create-conciliacione.dto';

export class UpdateConciliacioneDto extends PartialType(CreateConciliacioneDto) {}
