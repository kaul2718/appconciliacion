import { PartialType } from '@nestjs/mapped-types';
import { CreateExtractobancarioDto } from './create-extractobancario.dto';

export class UpdateExtractobancarioDto extends PartialType(CreateExtractobancarioDto) {}
