import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuditoriaconciliacionesService } from './auditoriaconciliaciones.service';
import { CreateAuditoriaconciliacioneDto } from './dto/create-auditoriaconciliacione.dto';
import { UpdateAuditoriaconciliacioneDto } from './dto/update-auditoriaconciliacione.dto';

@Controller('auditoriaconciliaciones')
export class AuditoriaconciliacionesController {
  constructor(private readonly auditoriaconciliacionesService: AuditoriaconciliacionesService) {}

  @Post()
  create(@Body() createAuditoriaconciliacioneDto: CreateAuditoriaconciliacioneDto) {
    return this.auditoriaconciliacionesService.create(createAuditoriaconciliacioneDto);
  }

  @Get()
  findAll() {
    return this.auditoriaconciliacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auditoriaconciliacionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuditoriaconciliacioneDto: UpdateAuditoriaconciliacioneDto) {
    return this.auditoriaconciliacionesService.update(+id, updateAuditoriaconciliacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auditoriaconciliacionesService.remove(+id);
  }
}
