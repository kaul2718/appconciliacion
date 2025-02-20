import { Injectable } from '@nestjs/common';
import { CreateConciliacionbancariaDto } from './dto/create-conciliacionbancaria.dto';
import { UpdateConciliacionbancariaDto } from './dto/update-conciliacionbancaria.dto';

@Injectable()
export class ConciliacionbancariaService {
  create(createConciliacionbancariaDto: CreateConciliacionbancariaDto) {
    return 'This action adds a new conciliacionbancaria';
  }

  findAll() {
    return `This action returns all conciliacionbancaria`;
  }

  findOne(id: number) {
    return `This action returns a #${id} conciliacionbancaria`;
  }

  update(id: number, updateConciliacionbancariaDto: UpdateConciliacionbancariaDto) {
    return `This action updates a #${id} conciliacionbancaria`;
  }

  remove(id: number) {
    return `This action removes a #${id} conciliacionbancaria`;
  }
}
