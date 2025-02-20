import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioscuentaDto } from './create-usuarioscuenta.dto';

export class UpdateUsuarioscuentaDto extends PartialType(CreateUsuarioscuentaDto) {}
