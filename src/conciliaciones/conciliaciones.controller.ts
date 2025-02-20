import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConciliacionesService } from './conciliaciones.service';
import { CreateConciliacioneDto } from './dto/create-conciliacione.dto';
import { UpdateConciliacioneDto } from './dto/update-conciliacione.dto';

@Controller('conciliaciones')
export class ConciliacionesController {
  constructor(private readonly conciliacionesService: ConciliacionesService) {}

  @Post()
  create(@Body() createConciliacioneDto: CreateConciliacioneDto) {
    return this.conciliacionesService.create(createConciliacioneDto);
  }

  @Get()
  findAll() {
    return this.conciliacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conciliacionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConciliacioneDto: UpdateConciliacioneDto) {
    return this.conciliacionesService.update(+id, updateConciliacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conciliacionesService.remove(+id);
  }
}
