import { Controller, Post, Get, Param, Body, NotFoundException } from '@nestjs/common';
import { UsuariosCuentasService } from './usuarioscuentas.service';
import { UsuariosCuentas } from './entities/usuarioscuenta.entity';
import { CuentaBancaria } from 'src/cuentabancaria/entities/cuentabancaria.entity';
import { User } from 'src/users/entities/user.entity';
@Controller('usuarios-cuentas')
export class UsuariosCuentasController {
  constructor(private readonly usuariosCuentasService: UsuariosCuentasService) { }

  // Asignar una cuenta a un usuario
  @Post('asignar')
  async asignarCuentaAUsuario(
    @Body('usuarioId') usuarioId: number,
    @Body('cuentaId') cuentaId: number,
  ): Promise<UsuariosCuentas> {
    return this.usuariosCuentasService.asignarCuentaAUsuario(usuarioId, cuentaId);
  }

  // Obtener las cuentas de un usuario
  @Get('usuario/:usuarioId/cuentas')
  async obtenerCuentasDeUsuario(@Param('usuarioId') usuarioId: number): Promise<CuentaBancaria[]> {
    return this.usuariosCuentasService.obtenerCuentasDeUsuario(usuarioId);
  }

  // Obtener los usuarios de una cuenta
  @Get('cuenta/:cuentaId/usuarios')
  async obtenerUsuariosDeCuenta(@Param('cuentaId') cuentaId: number): Promise<User[]> {
    return this.usuariosCuentasService.obtenerUsuariosDeCuenta(cuentaId);
  }
}