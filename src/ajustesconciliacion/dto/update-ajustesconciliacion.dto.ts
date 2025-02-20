import { PartialType } from '@nestjs/mapped-types';
import { CreateAjustesconciliacionDto } from './create-ajustesconciliacion.dto';

export class UpdateAjustesconciliacionDto extends PartialType(CreateAjustesconciliacionDto) {}
