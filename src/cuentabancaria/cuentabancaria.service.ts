import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCuentabancariaDto } from './dto/create-cuentabancaria.dto';
import { UpdateCuentabancariaDto } from './dto/update-cuentabancaria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CuentaBancaria } from './entities/cuentabancaria.entity';

@Injectable()
export class CuentabancariaService {
  constructor(
    @InjectRepository(CuentaBancaria)
    private readonly cuentaBancariaRepository: Repository<CuentaBancaria>,
  ) { }

  // Crear una nueva cuenta bancaria con validaciones
  async create(createCuentaBancariaDTO: CreateCuentabancariaDto): Promise<CuentaBancaria> {
    // Validar si el número de cuenta ya existe
    const cuentaExistente = await this.cuentaBancariaRepository.findOne({
      where: { numero_cuenta: createCuentaBancariaDTO.numero_cuenta },
    });
    if (cuentaExistente) {
      throw new ConflictException(`El número de cuenta ${createCuentaBancariaDTO.numero_cuenta} ya está en uso`);
    }

    // Crear y guardar la cuenta bancaria
    const nuevaCuenta = this.cuentaBancariaRepository.create(createCuentaBancariaDTO);
    return await this.cuentaBancariaRepository.save(nuevaCuenta);
  }

  // Obtener todas las cuentas bancarias, excluyendo las eliminadas
  async findAll(): Promise<CuentaBancaria[]> {
    return await this.cuentaBancariaRepository.find({
      where: {
        deletedAt: null, // Filtramos para que no se incluyan las cuentas con deletedAt
      },
    });
  }
  // Obtener una cuenta bancaria por ID con validación y excluyendo las eliminadas
  async findOne(id: number): Promise<CuentaBancaria> {
    if (!id || id <= 0) {
      throw new BadRequestException('El ID debe ser un número positivo válido');
    }

    const cuenta = await this.cuentaBancariaRepository.findOne({
      where: {
        id,
        deletedAt: null, // Filtramos para que no se incluya una cuenta eliminada
      },
    });

    if (!cuenta) {
      throw new NotFoundException(`Cuenta bancaria con ID ${id} no encontrada`);
    }

    return cuenta;
  }
  // Actualizar una cuenta bancaria con validaciones
  async update(id: number, updateCuentaBancariaDTO: UpdateCuentabancariaDto): Promise<CuentaBancaria> {
    const cuenta = await this.findOne(id); // Verifica si la cuenta existe

    // Si el usuario intenta cambiar el número de cuenta, verificar que no esté en uso
    if (updateCuentaBancariaDTO.numero_cuenta && updateCuentaBancariaDTO.numero_cuenta !== cuenta.numero_cuenta) {
      const cuentaExistente = await this.cuentaBancariaRepository.findOne({
        where: { numero_cuenta: updateCuentaBancariaDTO.numero_cuenta },
      });
      if (cuentaExistente) {
        throw new ConflictException(`El número de cuenta ${updateCuentaBancariaDTO.numero_cuenta} ya está en uso`);
      }
    }

    const cuentaActualizada = { ...cuenta, ...updateCuentaBancariaDTO };
    return await this.cuentaBancariaRepository.save(cuentaActualizada);
  }

  // Eliminar una cuenta bancaria con validaciones
  async remove(id: number): Promise<void> {
    const cuenta = await this.findOne(id); // Verifica si la cuenta existe
    await this.cuentaBancariaRepository.softRemove(cuenta);
  }

  // Restaurar una cuenta bancaria eliminada
  async restore(id: number): Promise<{ message: string }> {
    const cuenta = await this.cuentaBancariaRepository.findOne({ where: { id }, withDeleted: true });

    if (!cuenta) {
      throw new NotFoundException(`Cuenta bancaria con ID ${id} no encontrada`);
    }

    if (!cuenta.deletedAt) {
      throw new ConflictException(`La cuenta bancaria con ID ${id} no está eliminada`);
    }

    await this.cuentaBancariaRepository.restore(id);
    return { message: `Cuenta bancaria con ID ${id} restaurada exitosamente` };
  }
}