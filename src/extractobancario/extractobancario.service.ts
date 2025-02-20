import { Injectable } from '@nestjs/common';
import { CreateExtractobancarioDto } from './dto/create-extractobancario.dto';
import { UpdateExtractobancarioDto } from './dto/update-extractobancario.dto';

@Injectable()
export class ExtractobancarioService {
  create(createExtractobancarioDto: CreateExtractobancarioDto) {
    return 'This action adds a new extractobancario';
  }

  findAll() {
    return `This action returns all extractobancario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} extractobancario`;
  }

  update(id: number, updateExtractobancarioDto: UpdateExtractobancarioDto) {
    return `This action updates a #${id} extractobancario`;
  }

  remove(id: number) {
    return `This action removes a #${id} extractobancario`;
  }
}
