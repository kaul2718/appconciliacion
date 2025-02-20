import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CuentabancariaService } from './cuentabancaria.service';
import { CreateCuentabancariaDto } from './dto/create-cuentabancaria.dto';
import { UpdateCuentabancariaDto } from './dto/update-cuentabancaria.dto';

@Controller('cuentabancaria')
export class CuentabancariaController {
  constructor(private readonly cuentabancariaService: CuentabancariaService) {}

  @Post()
  create(@Body() createCuentabancariaDto: CreateCuentabancariaDto) {
    return this.cuentabancariaService.create(createCuentabancariaDto);
  }

  @Get()
  findAll() {
    return this.cuentabancariaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuentabancariaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCuentabancariaDto: UpdateCuentabancariaDto) {
    return this.cuentabancariaService.update(+id, updateCuentabancariaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cuentabancariaService.remove(+id);
  }
}
