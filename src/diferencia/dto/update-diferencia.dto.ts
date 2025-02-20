import { PartialType } from '@nestjs/mapped-types';
import { CreateDiferenciaDto } from './create-diferencia.dto';

export class UpdateDiferenciaDto extends PartialType(CreateDiferenciaDto) {}
