import { Module } from '@nestjs/common';
import { MovimientoextractoService } from './movimientoextracto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtractosBancarios } from 'src/extractobancario/entities/extractobancario.entity';
import { CuentaBancaria } from 'src/cuentabancaria/entities/cuentabancaria.entity';
import { MovimientoExtracto } from './entities/movimientoextracto.entity';
import { TransaccionesBancarias } from 'src/transacciones-bancarias/entities/transacciones-bancaria.entity';
import { DetallesConciliacion } from 'src/detallesconciliacion/entities/detallesconciliacion.entity';
import { AjustesConciliacion } from 'src/ajustesconciliacion/entities/ajustesconciliacion.entity';
import { AuditoriaConciliaciones } from 'src/auditoriaconciliaciones/entities/auditoriaconciliacione.entity';
import { Conciliaciones } from 'src/conciliaciones/entities/conciliacione.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovimientoExtracto, 
    ExtractosBancarios,
    TransaccionesBancarias,
    DetallesConciliacion,
    AjustesConciliacion,
    AuditoriaConciliaciones,
    Conciliaciones,
    CuentaBancaria])],  // Importa las entidades necesarias
  providers: [MovimientoextractoService],
  exports: [MovimientoextractoService],

})
export class MovimientoextractoModule { }
