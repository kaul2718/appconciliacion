import { Module } from '@nestjs/common';
import { UsuariosCuentasService } from './usuarioscuentas.service';
import { UsuariosCuentasController } from './usuarioscuentas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosCuentas } from './entities/usuarioscuenta.entity';
import { User } from 'src/users/entities/user.entity';
import { CuentaBancaria } from 'src/cuentabancaria/entities/cuentabancaria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuariosCuentas,User,CuentaBancaria])],  // Importa las entidades necesarias
  controllers: [UsuariosCuentasController],
  providers: [UsuariosCuentasService],
  exports: [UsuariosCuentasService],

})
export class UsuarioscuentasModule { }
