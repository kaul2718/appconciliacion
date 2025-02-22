import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransaccionesBancariaDto } from './dto/create-transacciones-bancaria.dto';
import { UpdateTransaccionesBancariaDto } from './dto/update-transacciones-bancaria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TransaccionesBancarias } from './entities/transacciones-bancaria.entity';
import { CuentaBancaria } from 'src/cuentabancaria/entities/cuentabancaria.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransaccionesBancariasService {
  constructor(
    @InjectRepository(TransaccionesBancarias)
    private readonly transaccionRepository: Repository<TransaccionesBancarias>,

    @InjectRepository(CuentaBancaria)
    private readonly cuentaBancariaRepository: Repository<CuentaBancaria>,
  ) { }

  // Crear una nueva transacción
  async create(createTransaccionDTO: CreateTransaccionesBancariaDto): Promise<TransaccionesBancarias> {
    // Convierte el cuenta_id de string a number
    const cuentaId = Number(createTransaccionDTO.cuenta_id);

    // Verifica si la conversión fue exitosa
    if (isNaN(cuentaId)) {
      throw new BadRequestException('El ID de la cuenta debe ser un número válido');
    }

    // Buscar la cuenta bancaria con el cuenta_id convertido
    const cuenta = await this.cuentaBancariaRepository.findOne({ where: { id: cuentaId } });

    if (!cuenta) {
      throw new NotFoundException(`Cuenta bancaria con ID ${cuentaId} no encontrada`);
    }

    // Crear la nueva transacción, asignando la cuenta encontrada
    const nuevaTransaccion = this.transaccionRepository.create({
      ...createTransaccionDTO,
      cuenta, // Asignando el objeto completo de la cuenta
    });

    return await this.transaccionRepository.save(nuevaTransaccion);
  }

  // Obtener todas las transacciones (sin las eliminadas), incluyendo la cuenta bancaria
  async findAll(): Promise<TransaccionesBancarias[]> {
    return await this.transaccionRepository.find({
      where: { deletedAt: null }, // Excluir las transacciones eliminadas
      relations: ['cuenta'], // Incluir la relación con la cuenta bancaria
    });
  }

  // Obtener una transacción por ID (sin la eliminada), incluyendo la cuenta bancaria
  async findOne(id: number): Promise<TransaccionesBancarias> {
    const transaccion = await this.transaccionRepository.findOne({
      where: { id, deletedAt: null }, // Asegura que no sea una transacción eliminada
      relations: ['cuenta'], // Incluir la relación con la cuenta bancaria
    });

    if (!transaccion) {
      throw new NotFoundException(`Transacción con ID ${id} no encontrada o eliminada`);
    }

    return transaccion;
  }


  // Actualizar una transacción
  async update(id: number, updateTransaccionDTO: UpdateTransaccionesBancariaDto): Promise<TransaccionesBancarias> {
    const transaccion = await this.findOne(id); // Verifica si la transacción existe

    if (transaccion.deletedAt) {
      throw new BadRequestException('La transacción ya ha sido eliminada y no puede ser actualizada');
    }

    // Ejemplo: si el monto no es válido
    if (updateTransaccionDTO.monto && updateTransaccionDTO.monto <= 0) {
      throw new BadRequestException('El monto debe ser mayor que cero');
    }

    const transaccionActualizada = { ...transaccion, ...updateTransaccionDTO };
    return await this.transaccionRepository.save(transaccionActualizada);
  }

  // Eliminar una transacción (soft delete)
  async remove(id: number): Promise<{ message: string }> {
    const transaccion = await this.findOne(id); // Verifica si la transacción existe

    if (transaccion.deletedAt) {
      throw new BadRequestException('La transacción ya ha sido eliminada');
    }

    transaccion.deletedAt = new Date(); // Marca la transacción como eliminada
    await this.transaccionRepository.save(transaccion); // Guarda la transacción con el campo deletedAt actualizado

    return { message: `Transacción con ID ${id} eliminada correctamente` };
  }
}
