import { Injectable } from '@nestjs/common';
import { CreateDiferenciaDto } from './dto/create-diferencia.dto';
import { UpdateDiferenciaDto } from './dto/update-diferencia.dto';

@Injectable()
export class DiferenciaService {
  create(createDiferenciaDto: CreateDiferenciaDto) {
    return 'This action adds a new diferencia';
  }

  findAll() {
    return `This action returns all diferencia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} diferencia`;
  }

  update(id: number, updateDiferenciaDto: UpdateDiferenciaDto) {
    return `This action updates a #${id} diferencia`;
  }

  remove(id: number) {
    return `This action removes a #${id} diferencia`;
  }
}
