import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put } from '@nestjs/common';
import { CuentabancariaService } from './cuentabancaria.service';
import { CreateCuentabancariaDto } from './dto/create-cuentabancaria.dto';
import { UpdateCuentabancariaDto } from './dto/update-cuentabancaria.dto';
import { CuentaBancaria } from './entities/cuentabancaria.entity';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';


@Auth(Role.ADMIN)
@Controller('cuentabancaria')
export class CuentabancariaController {
  constructor(private readonly cuentabancariaService: CuentabancariaService) { }

  // Crear una nueva cuenta bancaria
  @Auth(Role.GECONT || Role.CONT)
  @Post()
  async create(@Body() createCuentaBancariaDTO: CreateCuentabancariaDto): Promise<CuentaBancaria> {
    return this.cuentabancariaService.create(createCuentaBancariaDTO);
  }

  // Obtener todas las cuentas bancarias
  @Auth(Role.GECONT || Role.CONT)
  @Get()
  async findAll(): Promise<CuentaBancaria[]> {
    return this.cuentabancariaService.findAll();
  }

  // Obtener una cuenta bancaria por ID
  @Auth(Role.GECONT || Role.CONT)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CuentaBancaria> {
    try {
      return await this.cuentabancariaService.findOne(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // Actualizar una cuenta bancaria
  @Auth(Role.GECONT || Role.CONT)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCuentaBancariaDTO: UpdateCuentabancariaDto,): Promise<CuentaBancaria> {
    return this.cuentabancariaService.update(id, updateCuentaBancariaDTO);
  }

  // Eliminar una cuenta bancaria
  @Auth(Role.GECONT || Role.CONT)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    await this.cuentabancariaService.remove(id);
    return { message: 'Cuenta bancaria eliminada correctamente' };
  }
  @Auth(Role.GECONT || Role.CONT)
  @Patch('restore/:id')
  async restore(@Param('id') id: number): Promise<{ message: string }> {
    return this.cuentabancariaService.restore(id);
  }
}
