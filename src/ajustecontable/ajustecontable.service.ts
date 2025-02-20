import { Injectable } from '@nestjs/common';
import { CreateAjustecontableDto } from './dto/create-ajustecontable.dto';
import { UpdateAjustecontableDto } from './dto/update-ajustecontable.dto';

@Injectable()
export class AjustecontableService {
  create(createAjustecontableDto: CreateAjustecontableDto) {
    return 'This action adds a new ajustecontable';
  }

  findAll() {
    return `This action returns all ajustecontable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ajustecontable`;
  }

  update(id: number, updateAjustecontableDto: UpdateAjustecontableDto) {
    return `This action updates a #${id} ajustecontable`;
  }

  remove(id: number) {
    return `This action removes a #${id} ajustecontable`;
  }
}
