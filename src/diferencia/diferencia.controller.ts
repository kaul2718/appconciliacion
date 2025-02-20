import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DiferenciaService } from './diferencia.service';
import { CreateDiferenciaDto } from './dto/create-diferencia.dto';
import { UpdateDiferenciaDto } from './dto/update-diferencia.dto';

@Controller('diferencia')
export class DiferenciaController {
  constructor(private readonly diferenciaService: DiferenciaService) {}

  @Post()
  create(@Body() createDiferenciaDto: CreateDiferenciaDto) {
    return this.diferenciaService.create(createDiferenciaDto);
  }

  @Get()
  findAll() {
    return this.diferenciaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diferenciaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiferenciaDto: UpdateDiferenciaDto) {
    return this.diferenciaService.update(+id, updateDiferenciaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diferenciaService.remove(+id);
  }
}
