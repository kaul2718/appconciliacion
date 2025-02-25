import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetallesConciliacion } from './entities/detallesconciliacion.entity';
import { Conciliaciones } from 'src/conciliaciones/entities/conciliacione.entity';
import { TransaccionesBancarias } from 'src/transacciones-bancarias/entities/transacciones-bancaria.entity';
import { ExtractosBancarios } from 'src/extractobancario/entities/extractobancario.entity';
import { CreateDetallesconciliacionDto } from './dto/create-detallesconciliacion.dto';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class DetallesconciliacionService {
  constructor(
    @InjectRepository(DetallesConciliacion)
    private readonly detallesConciliacionRepository: Repository<DetallesConciliacion>,

    @InjectRepository(Conciliaciones)
    private readonly conciliacionesRepository: Repository<Conciliaciones>,

    @InjectRepository(TransaccionesBancarias)
    private readonly transaccionRepository: Repository<TransaccionesBancarias>,

    @InjectRepository(ExtractosBancarios)
    private readonly extractoRepository: Repository<ExtractosBancarios>,
  ) {}

  /* Método para crear detalles de conciliación manualmente.*/
  async createDetalles(
    id: number,
    createDetallesConciliacionDto: CreateDetallesconciliacionDto,
  ): Promise<DetallesConciliacion> {
    // Buscar la conciliación
    const conciliacion = await this.conciliacionesRepository.findOne({ where: { id } });
    if (!conciliacion) {
      throw new Error('Conciliación no encontrada');
    }

    // Buscar la transacción si se proporciona
    let transaccion = undefined;
    if (createDetallesConciliacionDto.transaccion_id) {
      transaccion = await this.transaccionRepository.findOne({ where: { id: createDetallesConciliacionDto.transaccion_id } });
      if (!transaccion) {
        throw new Error('Transacción no encontrada');
      }
    }

    // Buscar el extracto si se proporciona
    let extracto = undefined;
    if (createDetallesConciliacionDto.extracto_id) {
      extracto = await this.extractoRepository.findOne({ where: { id: createDetallesConciliacionDto.extracto_id } });
      if (!extracto) {
        throw new Error('Extracto no encontrado');
      }
    }

    // Crear el nuevo objeto DetallesConciliacion
    const detallesConciliacion = this.detallesConciliacionRepository.create({
      conciliacion,
      transaccion,
      extracto,
      tipo: createDetallesConciliacionDto.tipo,
      diferencia: createDetallesConciliacionDto.diferencia,
      comentario: createDetallesConciliacionDto.comentario,
    });

    return this.detallesConciliacionRepository.save(detallesConciliacion);
  }
}
