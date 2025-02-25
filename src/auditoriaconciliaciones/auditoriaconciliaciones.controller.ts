import { Controller, Post, Body, Get, Param, NotFoundException, Patch, Delete } from '@nestjs/common';
import { AuditoriaConciliacionesService } from './auditoriaconciliaciones.service';
import { CreateAuditoriaconciliacioneDto } from './dto/create-auditoriaconciliacione.dto';
import { AuditoriaConciliaciones } from './entities/auditoriaconciliacione.entity';
import { UpdateAuditoriaconciliacioneDto } from './dto/update-auditoriaconciliacione.dto';

@Controller('auditoria-conciliaciones')
export class AuditoriaConciliacionesController {
  constructor(
    private readonly auditoriaService: AuditoriaConciliacionesService,
  ) { }

  // Crear una nueva auditoría
  @Post()
  async create(
    @Body() createDto: CreateAuditoriaconciliacioneDto,
  ): Promise<AuditoriaConciliaciones> {
    return this.auditoriaService.create(createDto);
  }

  // Obtener todas las auditorías
  @Get()
  async findAll(): Promise<AuditoriaConciliaciones[]> {
    return this.auditoriaService.findAll();
  }

  // Obtener una auditoría por su ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<AuditoriaConciliaciones> {
    return this.auditoriaService.findById(id);
  }

  // Actualizar una auditoría de conciliación
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDto: UpdateAuditoriaconciliacioneDto,
  ) {
    return this.auditoriaService.update(id, updateDto);
  }

  // Eliminar una auditoría de conciliación
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.auditoriaService.delete(id);
  }
}
