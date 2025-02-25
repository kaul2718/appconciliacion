import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetallesconciliacionService } from './detallesconciliacion.service';
import { CreateDetallesconciliacionDto } from './dto/create-detallesconciliacion.dto';
import { UpdateDetallesconciliacionDto } from './dto/update-detallesconciliacion.dto';
import { DetallesConciliacion } from './entities/detallesconciliacion.entity';

@Controller('detallesconciliacion')
export class DetallesconciliacionController {
  constructor(private readonly detallesconciliacionService: DetallesconciliacionService) { }

  @Post(':id/detalles')
  async createDetalles(
    @Param('id') id: number,
    @Body() createDetallesConciliacionDto: CreateDetallesconciliacionDto,
  ): Promise<DetallesConciliacion> {
    return this.detallesconciliacionService.createDetalles(id, createDetallesConciliacionDto);
  }
  
}
