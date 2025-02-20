import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetallesconciliacionService } from './detallesconciliacion.service';
import { CreateDetallesconciliacionDto } from './dto/create-detallesconciliacion.dto';
import { UpdateDetallesconciliacionDto } from './dto/update-detallesconciliacion.dto';

@Controller('detallesconciliacion')
export class DetallesconciliacionController {
  constructor(private readonly detallesconciliacionService: DetallesconciliacionService) {}

  @Post()
  create(@Body() createDetallesconciliacionDto: CreateDetallesconciliacionDto) {
    return this.detallesconciliacionService.create(createDetallesconciliacionDto);
  }

  @Get()
  findAll() {
    return this.detallesconciliacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detallesconciliacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetallesconciliacionDto: UpdateDetallesconciliacionDto) {
    return this.detallesconciliacionService.update(+id, updateDetallesconciliacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detallesconciliacionService.remove(+id);
  }
}
