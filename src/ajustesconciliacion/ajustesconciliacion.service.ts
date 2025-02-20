import { Injectable } from '@nestjs/common';
import { CreateAjustesconciliacionDto } from './dto/create-ajustesconciliacion.dto';
import { UpdateAjustesconciliacionDto } from './dto/update-ajustesconciliacion.dto';

@Injectable()
export class AjustesconciliacionService {
  create(createAjustesconciliacionDto: CreateAjustesconciliacionDto) {
    return 'This action adds a new ajustesconciliacion';
  }

  findAll() {
    return `This action returns all ajustesconciliacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ajustesconciliacion`;
  }

  update(id: number, updateAjustesconciliacionDto: UpdateAjustesconciliacionDto) {
    return `This action updates a #${id} ajustesconciliacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} ajustesconciliacion`;
  }
}
