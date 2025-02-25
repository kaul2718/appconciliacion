import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuariosCuentas } from './entities/usuarioscuenta.entity';
import { User } from 'src/users/entities/user.entity';
import { CuentaBancaria } from 'src/cuentabancaria/entities/cuentabancaria.entity';

@Injectable()
export class UsuariosCuentasService {
  constructor(
    @InjectRepository(UsuariosCuentas)
    private readonly usuariosCuentasRepository: Repository<UsuariosCuentas>,
    @InjectRepository(User)
    private readonly usuariosRepository: Repository<User>,
    @InjectRepository(CuentaBancaria)
    private readonly cuentasBancariasRepository: Repository<CuentaBancaria>,
  ) {}

  // Asignar una cuenta a un usuario
  async asignarCuentaAUsuario(usuarioId: number, cuentaId: number): Promise<UsuariosCuentas> {
    const usuario = await this.usuariosRepository.findOne({ where: { id: usuarioId } });
    const cuenta = await this.cuentasBancariasRepository.findOne({ where: { id: cuentaId } });

    if (!usuario || !cuenta) {
      throw new Error('Usuario o cuenta no encontrados');
    }

    const usuarioCuenta = this.usuariosCuentasRepository.create({ usuario, cuenta });
    return this.usuariosCuentasRepository.save(usuarioCuenta);
  }

  // Obtener las cuentas de un usuario
  async obtenerCuentasDeUsuario(usuarioId: number): Promise<CuentaBancaria[]> {
    const usuarioCuentas = await this.usuariosCuentasRepository.find({
      where: { usuario: { id: usuarioId } },
      relations: ['cuenta'],
    });

    return usuarioCuentas.map((uc) => uc.cuenta);
  }

  // Obtener los usuarios de una cuenta
  async obtenerUsuariosDeCuenta(cuentaId: number): Promise<User[]> {
    const usuarioCuentas = await this.usuariosCuentasRepository.find({
      where: { cuenta: { id: cuentaId } },
      relations: ['usuario'],
    });

    return usuarioCuentas.map((uc) => uc.usuario);
  }
}