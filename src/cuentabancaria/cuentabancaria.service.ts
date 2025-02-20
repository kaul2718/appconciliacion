import { Injectable } from '@nestjs/common';
import { CreateCuentabancariaDto } from './dto/create-cuentabancaria.dto';
import { UpdateCuentabancariaDto } from './dto/update-cuentabancaria.dto';

@Injectable()
export class CuentabancariaService {
  create(createCuentabancariaDto: CreateCuentabancariaDto) {
    return 'This action adds a new cuentabancaria';
  }

  findAll() {
    return `This action returns all cuentabancaria`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cuentabancaria`;
  }

  update(id: number, updateCuentabancariaDto: UpdateCuentabancariaDto) {
    return `This action updates a #${id} cuentabancaria`;
  }

  remove(id: number) {
    return `This action removes a #${id} cuentabancaria`;
  }
}
