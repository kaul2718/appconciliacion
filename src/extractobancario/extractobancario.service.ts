import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExtractosBancarios } from './entities/extractobancario.entity';
import { MovimientoExtracto } from 'src/movimientoextracto/entities/movimientoextracto.entity';
import { CreateExtractobancarioDto } from './dto/create-extractobancario.dto';
import * as csv from 'csv-parser'; // Para procesar archivos CSV.
import * as fs from 'fs'; // Para leer el archivo.
import { Express } from 'express';
import { TransaccionesBancarias } from 'src/transacciones-bancarias/entities/transacciones-bancaria.entity';

@Injectable()
export class ExtractoBancarioService {
  constructor(
    @InjectRepository(ExtractosBancarios)
    private readonly extractoRepository: Repository<ExtractosBancarios>,
    @InjectRepository(MovimientoExtracto)
    private readonly movimientoRepository: Repository<MovimientoExtracto>,
    @InjectRepository(TransaccionesBancarias) // Inyecta el repositorio de transacciones
    private readonly transaccionRepository: Repository<TransaccionesBancarias>,
  ) { }

  // Crear un nuevo extracto bancario y procesar el archivo
  async create(createExtractoDTO: CreateExtractobancarioDto, filePath: string): Promise<ExtractosBancarios> {
    // Guardar el extracto en la base de datos
    const nuevoExtracto = this.extractoRepository.create(createExtractoDTO);
    const extractoGuardado = await this.extractoRepository.save(nuevoExtracto);

    // Procesar el archivo CSV
    const movimientos: MovimientoExtracto[] = [];

    // Retornar una promesa para manejar el procesamiento del archivo
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          // Transformar cada fila del CSV en un movimiento
          const movimiento = this.movimientoRepository.create({
            extracto: extractoGuardado,
            fecha: new Date(row.fecha), // Asegúrate de que el formato de fecha sea correcto.
            descripcion: row.descripcion,
            monto: parseFloat(row.monto),
            tipo: row.tipo, // Asegúrate de que coincida con el enum ['ingreso', 'egreso'].
            referencia: row.referencia,
          });
          movimientos.push(movimiento);
        })
        .on('end', async () => {
          try {
            // Guardar todos los movimientos en la base de datos
            await this.movimientoRepository.save(movimientos);
            resolve(extractoGuardado); // Retornar el extracto guardado
          } catch (error) {
            reject(error); // Manejar errores
          }
        })
        .on('error', (error) => {
          reject(error); // Manejar errores de lectura del archivo
        });
    });
  }

  // Obtener todos los extractos bancarios
  async findAll(): Promise<ExtractosBancarios[]> {
    return await this.extractoRepository.find();
  }

  // Obtener un extracto bancario por ID
  async findOne(id: number): Promise<ExtractosBancarios> {
    const extracto = await this.extractoRepository.findOne({ where: { id } });
    if (!extracto) {
      throw new NotFoundException(`Extracto con ID ${id} no encontrado`);
    }
    return extracto;
  }

  // Comparar transacciones con los movimientos de un extracto
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