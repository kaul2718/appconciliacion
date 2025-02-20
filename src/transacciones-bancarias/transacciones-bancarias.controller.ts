import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransaccionesBancariasService } from './transacciones-bancarias.service';
import { CreateTransaccionesBancariaDto } from './dto/create-transacciones-bancaria.dto';
import { UpdateTransaccionesBancariaDto } from './dto/update-transacciones-bancaria.dto';

@Controller('transacciones-bancarias')
export class TransaccionesBancariasController {
  constructor(private readonly transaccionesBancariasService: TransaccionesBancariasService) {}

  @Post()
  create(@Body() createTransaccionesBancariaDto: CreateTransaccionesBancariaDto) {
    return this.transaccionesBancariasService.create(createTransaccionesBancariaDto);
  }

  @Get()
  findAll() {
    return this.transaccionesBancariasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transaccionesBancariasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransaccionesBancariaDto: UpdateTransaccionesBancariaDto) {
    return this.transaccionesBancariasService.update(+id, updateTransaccionesBancariaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transaccionesBancariasService.remove(+id);
  }
}
