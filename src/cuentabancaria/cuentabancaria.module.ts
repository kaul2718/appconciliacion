import { Module } from '@nestjs/common';
import { CuentabancariaService } from './cuentabancaria.service';
import { CuentabancariaController } from './cuentabancaria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuentaBancaria } from './entities/cuentabancaria.entity';
import { UsuariosCuentas } from 'src/usuarioscuentas/dto/create-usuarioscuenta.dto';
import { User } from 'src/users/entities/user.entity';
import { TransaccionesBancarias } from 'src/transacciones-bancarias/entities/transacciones-bancaria.entity';
import { Conciliaciones } from 'src/conciliaciones/entities/conciliacione.entity';
import { DetallesConciliacion } from 'src/detallesconciliacion/entities/detallesconciliacion.entity';
import { MovimientoExtracto } from 'src/movimientoextracto/entities/movimientoextracto.entity';
import { AjustesConciliacion } from 'src/ajustesconciliacion/entities/ajustesconciliacion.entity';
import { AuditoriaConciliaciones } from 'src/auditoriaconciliaciones/entities/auditoriaconciliacione.entity';
import { ExtractosBancarios } from 'src/extractobancario/entities/extractobancario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conciliaciones,
    DetallesConciliacion,
    TransaccionesBancarias,
    MovimientoExtracto,
    AjustesConciliacion,
    AuditoriaConciliaciones,
    Conciliaciones,
    CuentaBancaria,
    ExtractosBancarios,
    UsuariosCuentas,
    User])],  // Importa las entidades necesarias
  controllers: [CuentabancariaController],
  providers: [CuentabancariaService],
  exports: [CuentabancariaService],  // Si es necesario exportarlo

})
export class CuentabancariaModule { }
