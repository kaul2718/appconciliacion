import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { TransaccionesBancariasService } from './transacciones-bancarias.service';
import { CreateTransaccionesBancariaDto } from './dto/create-transacciones-bancaria.dto';
import { UpdateTransaccionesBancariaDto } from './dto/update-transacciones-bancaria.dto';
import { TransaccionesBancarias } from './entities/transacciones-bancaria.entity';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Auth(Role.ADMIN)
@Controller('transacciones-bancarias')
export class TransaccionesBancariasController {
  constructor(private readonly transaccionService: TransaccionesBancariasService) {}

  // Crear una nueva transacción
  @Auth(Role.GECONT || Role.CONT)
  @Post()
  async create(@Body() createTransaccionDTO: CreateTransaccionesBancariaDto): Promise<TransaccionesBancarias> {
    return this.transaccionService.create(createTransaccionDTO);
  }

  // Obtener todas las transacciones
  @Auth(Role.GECONT || Role.CONT)  
  @Get()
  async findAll(): Promise<TransaccionesBancarias[]> {
    return this.transaccionService.findAll();
  }

  // Obtener una transacción por ID
  @Auth(Role.GECONT || Role.CONT)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<TransaccionesBancarias> {
    try {
      return await this.transaccionService.findOne(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // Actualizar una transacción
  @Auth(Role.GECONT || Role.CONT)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTransaccionDTO: UpdateTransaccionesBancariaDto,
  ): Promise<TransaccionesBancarias> {
    return this.transaccionService.update(id, updateTransaccionDTO);
  }

  // Eliminar una transacción
  @Auth(Role.GECONT || Role.CONT)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.transaccionService.remove(id);
  }
}
