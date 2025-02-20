import { Injectable } from '@nestjs/common';
import { CreateDetallesconciliacionDto } from './dto/create-detallesconciliacion.dto';
import { UpdateDetallesconciliacionDto } from './dto/update-detallesconciliacion.dto';

@Injectable()
export class DetallesconciliacionService {
  create(createDetallesconciliacionDto: CreateDetallesconciliacionDto) {
    return 'This action adds a new detallesconciliacion';
  }

  findAll() {
    return `This action returns all detallesconciliacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detallesconciliacion`;
  }

  update(id: number, updateDetallesconciliacionDto: UpdateDetallesconciliacionDto) {
    return `This action updates a #${id} detallesconciliacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} detallesconciliacion`;
  }
}
