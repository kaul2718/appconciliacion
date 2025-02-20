import { Injectable } from '@nestjs/common';
import { CreateConciliacioneDto } from './dto/create-conciliacione.dto';
import { UpdateConciliacioneDto } from './dto/update-conciliacione.dto';

@Injectable()
export class ConciliacionesService {
  create(createConciliacioneDto: CreateConciliacioneDto) {
    return 'This action adds a new conciliacione';
  }

  findAll() {
    return `This action returns all conciliaciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} conciliacione`;
  }

  update(id: number, updateConciliacioneDto: UpdateConciliacioneDto) {
    return `This action updates a #${id} conciliacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} conciliacione`;
  }
}
