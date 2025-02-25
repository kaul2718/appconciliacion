import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransaccionesBancarias } from 'src/transacciones-bancarias/entities/transacciones-bancaria.entity';
import { MovimientoExtracto } from 'src/movimientoextracto/entities/movimientoextracto.entity';
import { Conciliaciones } from './entities/conciliacione.entity';
import { DetallesConciliacion } from 'src/detallesconciliacion/entities/detallesconciliacion.entity';
import { CreateConciliacioneDto } from './dto/create-conciliacione.dto';
import { UpdateConciliacioneDto } from './dto/update-conciliacione.dto';
import { CuentaBancaria } from 'src/cuentabancaria/entities/cuentabancaria.entity';
import { ExtractosBancarios } from 'src/extractobancario/entities/extractobancario.entity';

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
    @InjectRepository(CuentaBancaria)
    private readonly cuentaRepository: Repository<CuentaBancaria>,
    @InjectRepository(ExtractosBancarios)
    private readonly extractoRepository: Repository<ExtractosBancarios>,
  ) { }


  //CREA UNA NUEVA CONCILIACION CON FECHA INICIO Y FECHA FIN, CON ID CUENTA BANCARIA Y ID EXTRACTO BANCARIO
  async create(createConciliacionDTO: CreateConciliacioneDto): Promise<Conciliaciones> {
    const { cuentaId, extractoId, fecha_inicio, fecha_fin } = createConciliacionDTO;
    // Verificar que cuenta y extracto existan
    const cuenta = await this.cuentaRepository.findOne({ where: { id: cuentaId } });
    if (!cuenta) throw new NotFoundException(`Cuenta con ID ${cuentaId} no encontrada`);
    const extracto = await this.extractoRepository.findOne({ where: { id: extractoId } });
    if (!extracto) throw new NotFoundException(`Extracto con ID ${extractoId} no encontrado`);
    // Validar fechas
    if (new Date(fecha_inicio) > new Date(fecha_fin)) {
      throw new BadRequestException('La fecha de inicio no puede ser mayor que la fecha de fin.');
    }
    const nuevaConciliacion = this.conciliacionRepository.create({
      ...createConciliacionDTO,
      cuenta,
      extracto,
    });
    return await this.conciliacionRepository.save(nuevaConciliacion);
  }

  //TRAE TODAS LAS CONCILIACIONES 
  async findAll(): Promise<Conciliaciones[]> {
    return await this.conciliacionRepository.find({ relations: ['cuenta', 'extracto'] });
  }

  //TRAE  LAS CONCILIACIONES POR ID
  async findOne(id: number): Promise<Conciliaciones> {
    const conciliacion = await this.conciliacionRepository.findOne({
      where: { id },
      relations: ['cuenta', 'extracto'],
    });

    if (!conciliacion) {
      throw new NotFoundException(`Conciliación con ID ${id} no encontrada`);
    }

    return conciliacion;
  }


  //ACTUALIZA LA CONCILIACION EN BASE AL ID - PUEDE SERVIR PARA APROBAR O RECHAZAR EL ESTADO
  async update(id: number, updateConciliacionDTO: UpdateConciliacioneDto): Promise<Conciliaciones> {
    const conciliacion = await this.findOne(id);
    // Validar fechas si se están actualizando
    if (updateConciliacionDTO.fecha_inicio && updateConciliacionDTO.fecha_fin) {
      if (new Date(updateConciliacionDTO.fecha_inicio) > new Date(updateConciliacionDTO.fecha_fin)) {
        throw new BadRequestException('La fecha de inicio no puede ser mayor que la fecha de fin.');
      }
    }
    Object.assign(conciliacion, updateConciliacionDTO);
    return await this.conciliacionRepository.save(conciliacion);
  }

  // GENERA TODA LA COMPARACIÓN ENTRE LAS TRANSACCIONES BANCARIAS Y EL EXTRACTO BANCARIO
  async compararTransaccionesConExtracto(cuentaId: number, extractoId: number) {
    // Verificar que la cuenta y el extracto existan
    const cuenta = await this.cuentaRepository.findOne({ where: { id: cuentaId } });
    if (!cuenta) throw new NotFoundException(`Cuenta con ID ${cuentaId} no encontrada`);

    const extracto = await this.extractoRepository.findOne({ where: { id: extractoId } });
    if (!extracto) throw new NotFoundException(`Extracto con ID ${extractoId} no encontrado`);

    // Obtener transacciones y movimientos del extracto
    const transacciones = await this.transaccionRepository.find({ where: { cuenta: { id: cuentaId } } });
    const movimientos = await this.movimientoRepository.find({ where: { extracto: { id: extractoId } } });

    let saldoCalculado = cuenta.saldo; // Ajusta si el saldo inicial está en otro lugar
    const coincidencias = [];
    const diferencias = [];

    // Comparar transacciones con movimientos
    transacciones.forEach((transaccion) => {
      const transaccionFecha = new Date(transaccion.fecha);
      const transaccionMonto = Number(transaccion.monto);
      console.log('🔍 Analizando transacción:', transaccion);

      const movimiento = movimientos.find((mov) => {
        const movimientoFecha = new Date(mov.fecha);
        const movimientoMonto = Number(mov.monto);
        return (
          movimientoFecha.getTime() === transaccionFecha.getTime() &&
          movimientoMonto === transaccionMonto &&
          mov.tipo === transaccion.tipo
        );
      });

      if (movimiento) {
        console.log('✅ Coincidencia encontrada:', { transaccion, movimiento });
        coincidencias.push({ transaccion, movimiento });
      } else {
        // Registrar diferencias
        const posiblesDiferencias = movimientos.map((mov) => ({
          id: mov.id,
          fechaDiferente: new Date(mov.fecha).getTime() !== transaccionFecha.getTime(),
          montoDiferente: Number(mov.monto) !== transaccionMonto,
          tipoDiferente: mov.tipo !== transaccion.tipo,
          movimiento: mov
        }));

        console.log('⚠️ Diferencia encontrada:', transaccion);
        console.table(posiblesDiferencias);

        diferencias.push({
          transaccion,
          motivo: posiblesDiferencias.length > 0 ? posiblesDiferencias : 'No hay movimientos similares en el extracto'
        });
      }

      // Actualizar saldo calculado
      saldoCalculado += transaccion.tipo === 'Ingreso' ? transaccionMonto : -transaccionMonto;
    });

    // Verificar si el saldo final del extracto coincide con el saldo calculado
    const saldoCoincide = saldoCalculado === Number(extracto.saldoFinal);

    return {
      coincidencias,
      diferencias,
      saldoCalculado,
      saldoFinalExtracto: extracto.saldoFinal,
      saldoCoincide,
    };
  }

}
