import { Injectable } from '@nestjs/common';
import { CreateLibrocontableDto } from './dto/create-librocontable.dto';
import { UpdateLibrocontableDto } from './dto/update-librocontable.dto';

@Injectable()
export class LibrocontableService {
  create(createLibrocontableDto: CreateLibrocontableDto) {
    return 'This action adds a new librocontable';
  }

  findAll() {
    return `This action returns all librocontable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} librocontable`;
  }

  update(id: number, updateLibrocontableDto: UpdateLibrocontableDto) {
    return `This action updates a #${id} librocontable`;
  }

  remove(id: number) {
    return `This action removes a #${id} librocontable`;
  }
}
