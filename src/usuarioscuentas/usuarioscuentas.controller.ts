import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioscuentasService } from './usuarioscuentas.service';
import { CreateUsuarioscuentaDto } from './dto/create-usuarioscuenta.dto';
import { UpdateUsuarioscuentaDto } from './dto/update-usuarioscuenta.dto';

@Controller('usuarioscuentas')
export class UsuarioscuentasController {
  constructor(private readonly usuarioscuentasService: UsuarioscuentasService) {}

  @Post()
  create(@Body() createUsuarioscuentaDto: CreateUsuarioscuentaDto) {
    return this.usuarioscuentasService.create(createUsuarioscuentaDto);
  }

  @Get()
  findAll() {
    return this.usuarioscuentasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioscuentasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioscuentaDto: UpdateUsuarioscuentaDto) {
    return this.usuarioscuentasService.update(+id, updateUsuarioscuentaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioscuentasService.remove(+id);
  }
}
