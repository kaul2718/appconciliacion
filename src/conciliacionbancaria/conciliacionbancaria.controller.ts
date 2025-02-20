import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConciliacionbancariaService } from './conciliacionbancaria.service';
import { CreateConciliacionbancariaDto } from './dto/create-conciliacionbancaria.dto';
import { UpdateConciliacionbancariaDto } from './dto/update-conciliacionbancaria.dto';

@Controller('conciliacionbancaria')
export class ConciliacionbancariaController {
  constructor(private readonly conciliacionbancariaService: ConciliacionbancariaService) {}

  @Post()
  create(@Body() createConciliacionbancariaDto: CreateConciliacionbancariaDto) {
    return this.conciliacionbancariaService.create(createConciliacionbancariaDto);
  }

  @Get()
  findAll() {
    return this.conciliacionbancariaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conciliacionbancariaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConciliacionbancariaDto: UpdateConciliacionbancariaDto) {
    return this.conciliacionbancariaService.update(+id, updateConciliacionbancariaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conciliacionbancariaService.remove(+id);
  }
}
