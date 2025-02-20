import { PartialType } from '@nestjs/mapped-types';
import { CreateAuditoriaconciliacioneDto } from './create-auditoriaconciliacione.dto';

export class UpdateAuditoriaconciliacioneDto extends PartialType(CreateAuditoriaconciliacioneDto) {}
