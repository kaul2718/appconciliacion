import { PartialType } from '@nestjs/mapped-types';
import { CreateDetallesconciliacionDto } from './create-detallesconciliacion.dto';

export class UpdateDetallesconciliacionDto extends PartialType(CreateDetallesconciliacionDto) {}
