import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExtractosBancarios } from './entities/extractobancario.entity';
import { MovimientoExtracto } from 'src/movimientoextracto/entities/movimientoextracto.entity';
import { CreateExtractobancarioDto } from './dto/create-extractobancario.dto';
import * as csv from 'csv-parser'; // Para procesar archivos CSV.
import * as fs from 'fs'; // Para leer el archivo.
import { Express } from 'express';
import { CuentaBancaria } from 'src/cuentabancaria/entities/cuentabancaria.entity';
import { TipoMovimientoFinanciero } from 'src/common/enums/tipomovimientofinan';

@Injectable()
export class ExtractoBancarioService {
  constructor(
    @InjectRepository(ExtractosBancarios)
    private readonly extractoRepository: Repository<ExtractosBancarios>,
    @InjectRepository(MovimientoExtracto)
    private readonly movimientoRepository: Repository<MovimientoExtracto>,
    @InjectRepository(CuentaBancaria)
    private readonly cuentaRepository: Repository<CuentaBancaria>,
  ) { }

  // Crear un nuevo extracto bancario y procesar el archivo
  async create(createExtractoDTO: CreateExtractobancarioDto, filePath: string): Promise<ExtractosBancarios> {
    // Buscar la cuenta correspondiente usando el cuenta_id
    const cuenta = await this.cuentaRepository.findOne({ where: { id: createExtractoDTO.cuenta_id } });
    if (!cuenta) {
      throw new NotFoundException(`Cuenta con ID ${createExtractoDTO.cuenta_id} no encontrada.`);
    }
    // Crear el nuevo extracto con los datos del DTO y la ruta del archivo
    const nuevoExtracto = this.extractoRepository.create({
      ...createExtractoDTO, // Esto incluye fecha
      archivo: filePath, // Asignar la ruta del archivo
      cuenta, // Asignar la cuenta correspondiente
    });
    const extractoGuardado = await this.extractoRepository.save(nuevoExtracto);
    return this.procesarArchivoCSV(filePath, extractoGuardado);
  }

  //AQUI PROCESA EL ARCHIVO ESTE ENDPOINT localhost:3000/api/v1/extractos-bancarios/upload Cuando subo se carga de una a su nueva tabla
  private async procesarArchivoCSV(filePath: string, extracto: ExtractosBancarios): Promise<ExtractosBancarios> {
    return new Promise(async (resolve, reject) => {
      const movimientos: MovimientoExtracto[] = [];

      // Obtener el saldo inicial de la cuenta
      const cuenta = await this.cuentaRepository.findOne({ where: { id: extracto.cuenta.id } });
      if (!cuenta) {
        reject(new NotFoundException(`Cuenta con ID ${extracto.cuenta.id} no encontrada.`));
        return;
      }

      // Revisar si hay movimientos previos en el extracto actual
      const primerMovimientoDelExtracto = await this.movimientoRepository.findOne({
        where: { extracto: extracto },
        order: { fecha: 'ASC' } // Tomar el primer movimiento del extracto
      });

      let saldoActual = primerMovimientoDelExtracto
        ? Number(primerMovimientoDelExtracto.saldo)
        : 0; // Si no hay, empezar desde 0      console.log(`Saldo inicial de la cuenta: ${saldoActual}`);

      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          console.log('Procesando fila:', row); // Ver los datos de cada fila

          try {
            // Validar campos obligatorios
            if (!row.fecha || !row.descripcion || !row.monto || !row.tipo) {
              throw new Error(`Fila inválida: ${JSON.stringify(row)}`);
            }

            // Convertir el monto a número
            const monto = isNaN(parseFloat(row.monto)) ? 0 : parseFloat(row.monto);

            // Calcular el saldo después del movimiento
            if (row.tipo === TipoMovimientoFinanciero.ING) {
              saldoActual += monto; // Incrementar saldo en caso de ingreso
            } else if (row.tipo === TipoMovimientoFinanciero.EGR) {
              saldoActual -= monto; // Decrementar saldo en caso de egreso
            } else {
              throw new Error(`Tipo de movimiento inválido: ${row.tipo}`);
            }

            // Crear el movimiento con el saldo actualizado
            const movimiento = this.movimientoRepository.create({
              extracto: extracto,
              fecha: new Date(row.fecha),
              descripcion: row.descripcion,
              monto: monto,
              tipo: row.tipo,
              referencia: row.referencia || null,
              saldo: saldoActual, // Guardar el saldo después del movimiento
            });

            movimientos.push(movimiento);
          } catch (error) {
            console.error('Error procesando fila CSV:', row, error);
            reject(new BadRequestException(`Error en el formato del archivo CSV: ${error.message}`));
          }
        })
        .on('end', async () => {
          try {
            // Guardar los movimientos en la base de datos
            await this.movimientoRepository.save(movimientos);
            console.log('Movimientos guardados en la base de datos');

            // Actualizar el saldo final de la cuenta
            cuenta.saldo = saldoActual;
            await this.cuentaRepository.save(cuenta);
            console.log(`Saldo final de la cuenta actualizado: ${saldoActual}`);

            // Resolver la promesa con el extracto guardado
            resolve(extracto);
          } catch (error) {
            reject(new BadRequestException('Error al guardar los movimientos en la base de datos.'));
          }
        })
        .on('error', (error) => {
          reject(new BadRequestException(`Error al leer el archivo CSV: ${error.message}`));
        });
    });
  }


  // Obtener todos los extractos bancarios
  async findAll(): Promise<ExtractosBancarios[]> {
    return await this.extractoRepository.find();
  }

  // Obtener un extracto bancario por ID
  async findOne(id: number) {
    const extracto = await this.extractoRepository.findOne({
      where: { id },
      relations: ['cuenta'], // Asegura que `cuenta` se incluya
    });

    console.log('Extracto encontrado:', extracto); // Log para ver el resultado
    return extracto;
  }
}