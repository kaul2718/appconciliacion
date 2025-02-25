import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AjustesConciliacionService } from './ajustesconciliacion.service';
import { CreateAjustesconciliacionDto } from './dto/create-ajustesconciliacion.dto';
import { UpdateAjustesconciliacionDto } from './dto/update-ajustesconciliacion.dto';

@Controller('ajustesconciliacion')
export class AjustesconciliacionController {
  constructor(private readonly ajustesconciliacionService: AjustesConciliacionService) {}

  @Post()
  registrarAjuste(@Body() dto: CreateAjustesconciliacionDto) {
    return this.ajustesconciliacionService.registrarAjuste(dto);
  }
}
