import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AjustesConciliacion } from './entities/ajustesconciliacion.entity';
import { CreateAjustesconciliacionDto } from './dto/create-ajustesconciliacion.dto';
import { Conciliaciones } from 'src/conciliaciones/entities/conciliacione.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AjustesConciliacionService {
  constructor(
    @InjectRepository(AjustesConciliacion)
    private readonly ajustesRepository: Repository<AjustesConciliacion>,
    @InjectRepository(Conciliaciones)
    private readonly conciliacionesRepository: Repository<Conciliaciones>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async registrarAjuste(dto: CreateAjustesconciliacionDto) {
    const conciliacion = await this.conciliacionesRepository.findOne({ where: { id: dto.conciliacionId } });
    if (!conciliacion) throw new NotFoundException(`Conciliación con ID ${dto.conciliacionId} no encontrada`);

    const usuario = await this.userRepository.findOne({ where: { id: dto.usuarioId } });
    if (!usuario) throw new NotFoundException(`Usuario con ID ${dto.usuarioId} no encontrado`);

    const ajuste = this.ajustesRepository.create({
      conciliacion,
      usuario,
      monto_ajustado: dto.montoAjustado,
      comentario: dto.comentario,
    });

    return this.ajustesRepository.save(ajuste);
  }
}
