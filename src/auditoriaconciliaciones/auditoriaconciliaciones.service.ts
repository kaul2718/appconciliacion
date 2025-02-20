import { Injectable } from '@nestjs/common';
import { CreateAuditoriaconciliacioneDto } from './dto/create-auditoriaconciliacione.dto';
import { UpdateAuditoriaconciliacioneDto } from './dto/update-auditoriaconciliacione.dto';

@Injectable()
export class AuditoriaconciliacionesService {
  create(createAuditoriaconciliacioneDto: CreateAuditoriaconciliacioneDto) {
    return 'This action adds a new auditoriaconciliacione';
  }

  findAll() {
    return `This action returns all auditoriaconciliaciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auditoriaconciliacione`;
  }

  update(id: number, updateAuditoriaconciliacioneDto: UpdateAuditoriaconciliacioneDto) {
    return `This action updates a #${id} auditoriaconciliacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} auditoriaconciliacione`;
  }
}
