import { Injectable } from '@nestjs/common';
import { CreateMovimientoextractoDto } from './dto/create-movimientoextracto.dto';
import { UpdateMovimientoextractoDto } from './dto/update-movimientoextracto.dto';

@Injectable()
export class MovimientoextractoService {
  create(createMovimientoextractoDto: CreateMovimientoextractoDto) {
    return 'This action adds a new movimientoextracto';
  }

  findAll() {
    return `This action returns all movimientoextracto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movimientoextracto`;
  }

  update(id: number, updateMovimientoextractoDto: UpdateMovimientoextractoDto) {
    return `This action updates a #${id} movimientoextracto`;
  }

  remove(id: number) {
    return `This action removes a #${id} movimientoextracto`;
  }
}
