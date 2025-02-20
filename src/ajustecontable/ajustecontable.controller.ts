import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AjustecontableService } from './ajustecontable.service';
import { CreateAjustecontableDto } from './dto/create-ajustecontable.dto';
import { UpdateAjustecontableDto } from './dto/update-ajustecontable.dto';

@Controller('ajustecontable')
export class AjustecontableController {
  constructor(private readonly ajustecontableService: AjustecontableService) {}

  @Post()
  create(@Body() createAjustecontableDto: CreateAjustecontableDto) {
    return this.ajustecontableService.create(createAjustecontableDto);
  }

  @Get()
  findAll() {
    return this.ajustecontableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ajustecontableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAjustecontableDto: UpdateAjustecontableDto) {
    return this.ajustecontableService.update(+id, updateAjustecontableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ajustecontableService.remove(+id);
  }
}
