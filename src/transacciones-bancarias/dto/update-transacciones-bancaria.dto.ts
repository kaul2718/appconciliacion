import { PartialType } from '@nestjs/mapped-types';
import { CreateTransaccionesBancariaDto } from './create-transacciones-bancaria.dto';

export class UpdateTransaccionesBancariaDto extends PartialType(CreateTransaccionesBancariaDto) {}
