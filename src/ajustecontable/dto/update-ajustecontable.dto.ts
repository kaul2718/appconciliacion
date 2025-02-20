import { PartialType } from '@nestjs/mapped-types';
import { CreateAjustecontableDto } from './create-ajustecontable.dto';

export class UpdateAjustecontableDto extends PartialType(CreateAjustecontableDto) {}
