import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovimientoextractoService } from './movimientoextracto.service';
import { CreateMovimientoextractoDto } from './dto/create-movimientoextracto.dto';
import { UpdateMovimientoextractoDto } from './dto/update-movimientoextracto.dto';

@Controller('movimientoextracto')
export class MovimientoextractoController {
  constructor(private readonly movimientoextractoService: MovimientoextractoService) {}

  @Post()
  create(@Body() createMovimientoextractoDto: CreateMovimientoextractoDto) {
    return this.movimientoextractoService.create(createMovimientoextractoDto);
  }

  @Get()
  findAll() {
    return this.movimientoextractoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movimientoextractoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovimientoextractoDto: UpdateMovimientoextractoDto) {
    return this.movimientoextractoService.update(+id, updateMovimientoextractoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movimientoextractoService.remove(+id);
  }
}
