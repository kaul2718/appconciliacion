import { Injectable } from '@nestjs/common';
import { CreateUsuarioscuentaDto } from './dto/create-usuarioscuenta.dto';
import { UpdateUsuarioscuentaDto } from './dto/update-usuarioscuenta.dto';

@Injectable()
export class UsuarioscuentasService {
  create(createUsuarioscuentaDto: CreateUsuarioscuentaDto) {
    return 'This action adds a new usuarioscuenta';
  }

  findAll() {
    return `This action returns all usuarioscuentas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuarioscuenta`;
  }

  update(id: number, updateUsuarioscuentaDto: UpdateUsuarioscuentaDto) {
    return `This action updates a #${id} usuarioscuenta`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuarioscuenta`;
  }
}
