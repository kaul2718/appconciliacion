import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditoriaConciliaciones } from './entities/auditoriaconciliacione.entity';
import { CreateAuditoriaconciliacioneDto } from './dto/create-auditoriaconciliacione.dto';
import { UpdateAuditoriaconciliacioneDto } from './dto/update-auditoriaconciliacione.dto';
import { Conciliaciones } from 'src/conciliaciones/entities/conciliacione.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuditoriaConciliacionesService {
  constructor(
    @InjectRepository(AuditoriaConciliaciones)
    private readonly auditoriaRepository: Repository<AuditoriaConciliaciones>,
    @InjectRepository(Conciliaciones)
    private readonly conciliacionesRepository: Repository<Conciliaciones>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  // Crear nueva auditoría de conciliación
  async create(createDto: CreateAuditoriaconciliacioneDto): Promise<AuditoriaConciliaciones> {

    // Verificar si la conciliación existe
    const conciliacion = await this.conciliacionesRepository.findOne({
      where: { id: createDto.conciliacion_id },
    });

    if (!conciliacion) {
      throw new HttpException(
        `Conciliación con id ${createDto.conciliacion_id} no encontrada`,
        HttpStatus.NOT_FOUND,
      );
    }

    // Verificar si el usuario existe
    const usuario = await this.usersRepository.findOne({
      where: { id: createDto.usuario_id },
    });

    if (!usuario) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    // Crear y guardar el registro de auditoría
    const auditoria = this.auditoriaRepository.create({
      ...createDto,
      conciliacion,
      usuario,
    });

    // Guardar la auditoría en la base de datos
    return this.auditoriaRepository.save(auditoria);
  }

  // Obtener todas las auditorías de conciliación
  async findAll(): Promise<AuditoriaConciliaciones[]> {
    return this.auditoriaRepository.find({
      relations: ['conciliacion', 'usuario'], // Relacionar conciliación y usuario
    });
  }

  // Obtener auditoría por ID
  async findById(id: number): Promise<AuditoriaConciliaciones> {
    const auditoria = await this.auditoriaRepository.findOne({
      where: { id },
      relations: ['conciliacion', 'usuario'],
    });

    if (!auditoria) {
      throw new NotFoundException(`Auditoría con ID ${id} no encontrada`);
    }

    return auditoria;
  }

  // Actualizar auditoría de conciliación
  async update(id: number, updateDto: UpdateAuditoriaconciliacioneDto): Promise<AuditoriaConciliaciones> {
    // Verificar si la auditoría existe
    const auditoria = await this.auditoriaRepository.findOne({
      where: { id },
      relations: ['conciliacion', 'usuario'], // Asegúrate de cargar las relaciones si es necesario
    });

    if (!auditoria) {
      throw new Error('Auditoría no encontrada');
    }

    // Verificar si la conciliación existe (si el ID fue proporcionado)
    if (updateDto.conciliacion_id) {
      const conciliacion = await this.conciliacionesRepository.findOne({
        where: { id: updateDto.conciliacion_id },
      });
      if (!conciliacion) {
        throw new Error('Conciliación no encontrada');
      }
      auditoria.conciliacion = conciliacion;
    }

    // Verificar si el usuario existe (si el ID fue proporcionado)
    if (updateDto.usuario_id) {
      const usuario = await this.usersRepository.findOne({
        where: { id: updateDto.usuario_id },
      });
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }
      auditoria.usuario = usuario;
    }

    // Actualizar los otros campos de la auditoría
    Object.assign(auditoria, updateDto);

    // Guardar y retornar la auditoría actualizada
    return this.auditoriaRepository.save(auditoria);
  }
  // Eliminar auditoría de conciliación
  async delete(id: number): Promise<void> {
    // Verificar si la auditoría existe
    const auditoria = await this.auditoriaRepository.findOne({ where: { id } });

    if (!auditoria) {
      throw new Error('Auditoría no encontrada');
    }

    // Eliminar la auditoría
    await this.auditoriaRepository.remove(auditoria);
  }
}
