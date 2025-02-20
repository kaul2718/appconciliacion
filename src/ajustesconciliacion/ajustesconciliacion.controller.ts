import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AjustesconciliacionService } from './ajustesconciliacion.service';
import { CreateAjustesconciliacionDto } from './dto/create-ajustesconciliacion.dto';
import { UpdateAjustesconciliacionDto } from './dto/update-ajustesconciliacion.dto';

@Controller('ajustesconciliacion')
export class AjustesconciliacionController {
  constructor(private readonly ajustesconciliacionService: AjustesconciliacionService) {}

  @Post()
  create(@Body() createAjustesconciliacionDto: CreateAjustesconciliacionDto) {
    return this.ajustesconciliacionService.create(createAjustesconciliacionDto);
  }

  @Get()
  findAll() {
    return this.ajustesconciliacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ajustesconciliacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAjustesconciliacionDto: UpdateAjustesconciliacionDto) {
    return this.ajustesconciliacionService.update(+id, updateAjustesconciliacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ajustesconciliacionService.remove(+id);
  }
}
