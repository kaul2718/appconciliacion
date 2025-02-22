import { PartialType } from '@nestjs/mapped-types';
import { CreateMovimientoextractoDto } from './create-movimientoextracto.dto';

export class UpdateMovimientoextractoDto extends PartialType(CreateMovimientoextractoDto) {}
