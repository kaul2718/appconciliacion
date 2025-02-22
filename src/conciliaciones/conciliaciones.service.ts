import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransaccionesBancarias } from 'src/transacciones-bancarias/entities/transacciones-bancaria.entity';
import { MovimientoExtracto } from 'src/movimientoextracto/entities/movimientoextracto.entity';
import { Conciliaciones } from './entities/conciliacione.entity';
import { DetallesConciliacion } from 'src/detallesconciliacion/entities/detallesconciliacion.entity';
import { CreateConciliacioneDto } from './dto/create-conciliacione.dto';
import { UpdateConciliacioneDto } from './dto/update-conciliacione.dto';

@Injectable()
export class ConciliacionService {
  constructor(
    @InjectRepository(Conciliaciones)
    private readonly conciliacionRepository: Repository<Conciliaciones>,
    @InjectRepository(DetallesConciliacion)
    private readonly detalleRepository: Repository<DetallesConciliacion>,
    @InjectRepository(TransaccionesBancarias)
    private readonly transaccionRepository: Repository<TransaccionesBancarias>,
    @InjectRepository(MovimientoExtracto)
    private readonly movimientoRepository: Repository<MovimientoExtracto>,
  ) {}

  // Métodos CRUD
  async create(createConciliacionDTO: CreateConciliacioneDto): Promise<Conciliaciones> {
    const nuevaConciliacion = this.conciliacionRepository.create(createConciliacionDTO);
    return await this.conciliacionRepository.save(nuevaConciliacion);
  }

  async findAll(): Promise<Conciliaciones[]> {
    return await this.conciliacionRepository.find();
  }

  async findOne(id: number): Promise<Conciliaciones> {
    const conciliacion = await this.conciliacionRepository.findOne({ where: { id } });
    if (!conciliacion) {
      throw new NotFoundException(`Conciliación con ID ${id} no encontrada`);
    }
    return conciliacion;
  }

  async update(id: number, updateConciliacionDTO: UpdateConciliacioneDto): Promise<Conciliaciones> {
    const conciliacion = await this.findOne(id); // Verifica si la conciliación existe
    const conciliacionActualizada = { ...conciliacion, ...updateConciliacionDTO };
    return await this.conciliacionRepository.save(conciliacionActualizada);
  }

  async getDetalles(id: number): Promise<DetallesConciliacion[]> {
    const conciliacion = await this.findOne(id); // Verifica si la conciliación existe
    return this.detalleRepository.find({ where: { conciliacion: { id } } });
  }

  // Lógica de comparación
  async compararTransaccionesConExtracto(cuentaId: number, extractoId: number) {
    // Obtener las transacciones de la cuenta
    const transacciones = await this.transaccionRepository.find({
      where: { cuenta: { id: cuentaId } },
    });

    // Obtener los movimientos del extracto
    const movimientos = await this.movimientoRepository.find({
      where: { extracto: { id: extractoId } },
    });

    // Comparar transacciones con movimientos
    const coincidencias = [];
    const diferencias = [];

    transacciones.forEach((transaccion) => {
      const movimiento = movimientos.find(
        (mov) =>
          mov.fecha.getTime() === transaccion.fecha.getTime() &&
          mov.monto === transaccion.monto &&
          mov.tipo === transaccion.tipo,
      );

      if (movimiento) {
        coincidencias.push({ transaccion, movimiento });
      } else {
        diferencias.push(transaccion);
      }
    });

    return { coincidencias, diferencias };
  }
}