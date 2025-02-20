import { PartialType } from '@nestjs/mapped-types';
import { CreateLibrocontableDto } from './create-librocontable.dto';

export class UpdateLibrocontableDto extends PartialType(CreateLibrocontableDto) {}
