import { Injectable } from '@nestjs/common';
import { CreateTransaccionesBancariaDto } from './dto/create-transacciones-bancaria.dto';
import { UpdateTransaccionesBancariaDto } from './dto/update-transacciones-bancaria.dto';

@Injectable()
export class TransaccionesBancariasService {
  create(createTransaccionesBancariaDto: CreateTransaccionesBancariaDto) {
    return 'This action adds a new transaccionesBancaria';
  }

  findAll() {
    return `This action returns all transaccionesBancarias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaccionesBancaria`;
  }

  update(id: number, updateTransaccionesBancariaDto: UpdateTransaccionesBancariaDto) {
    return `This action updates a #${id} transaccionesBancaria`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaccionesBancaria`;
  }
}
