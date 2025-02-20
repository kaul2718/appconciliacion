import { Module } from '@nestjs/common';
import { CuentabancariaService } from './cuentabancaria.service';
import { CuentabancariaController } from './cuentabancaria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuentaBancaria } from './entities/cuentabancaria.entity';
import { UsuariosCuentas } from 'src/usuarioscuentas/dto/create-usuarioscuenta.dto';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CuentaBancaria,UsuariosCuentas,User])],  // Importa las entidades necesarias
  controllers: [CuentabancariaController],
  providers: [CuentabancariaService],
  exports: [CuentabancariaService],  // Si es necesario exportarlo

})
export class CuentabancariaModule { }
