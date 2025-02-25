import { Controller, Get, Post, Body, Patch, Param, NotFoundException } from '@nestjs/common';
import { ConciliacionService } from './conciliaciones.service';
import { CreateConciliacioneDto } from './dto/create-conciliacione.dto';
import { UpdateConciliacioneDto } from './dto/update-conciliacione.dto';
import { Conciliaciones } from './entities/conciliacione.entity';

@Controller('conciliaciones')
export class ConciliacionesController {
  constructor(private readonly conciliacionService: ConciliacionService) { }

  // Crear una nueva conciliación
  @Post()
  async create(@Body() createConciliacionDTO: CreateConciliacioneDto): Promise<Conciliaciones> {
    return this.conciliacionService.create(createConciliacionDTO);
  }

  // Obtener todas las conciliaciones
  @Get()
  async findAll(): Promise<Conciliaciones[]> {
    return this.conciliacionService.findAll();
  }

  // Obtener una conciliación por ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Conciliaciones> {
    try {
      return await this.conciliacionService.findOne(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // SIRVE PARA APROBAR O RECHAZAR UNA CONCILIACION
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateConciliacionDTO: UpdateConciliacioneDto,
  ): Promise<Conciliaciones> {
    return this.conciliacionService.update(id, updateConciliacionDTO);
  }


  //OJO TALVEZ VAYA EN DETALLESCONCILIACION RECURSO  
  // Comparar transacciones con los movimientos de un extracto
  @Get(':id/comparar')
  async compararTransaccionesConExtracto(@Param('id') conciliacionId: number) {
    const conciliacion = await this.conciliacionService.findOne(conciliacionId);
    if (!conciliacion) {
      throw new NotFoundException(`Conciliación con ID ${conciliacionId} no encontrada`);
    }
    const cuentaId = conciliacion.cuenta.id;
    const extractoId = conciliacion.extracto.id;
    return this.conciliacionService.compararTransaccionesConExtracto(cuentaId, extractoId);
  }
}