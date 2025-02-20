import { PartialType } from '@nestjs/mapped-types';
import { CreateCuentabancariaDto } from './create-cuentabancaria.dto';

export class UpdateCuentabancariaDto extends PartialType(CreateCuentabancariaDto) {}
