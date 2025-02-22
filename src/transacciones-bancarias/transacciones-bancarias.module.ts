import { Module } from '@nestjs/common';
import { TransaccionesBancariasService } from './transacciones-bancarias.service';
import { TransaccionesBancariasController } from './transacciones-bancarias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransaccionesBancarias } from './entities/transacciones-bancaria.entity';
import { CuentaBancaria } from 'src/cuentabancaria/entities/cuentabancaria.entity';
import { Conciliaciones } from 'src/conciliaciones/entities/conciliacione.entity';
import { DetallesConciliacion } from 'src/detallesconciliacion/entities/detallesconciliacion.entity';
import { MovimientoExtracto } from 'src/movimientoextracto/entities/movimientoextracto.entity';
import { AjustesConciliacion } from 'src/ajustesconciliacion/entities/ajustesconciliacion.entity';
import { AuditoriaConciliaciones } from 'src/auditoriaconciliaciones/entities/auditoriaconciliacione.entity';
import { ExtractosBancarios } from 'src/extractobancario/entities/extractobancario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransaccionesBancarias,
    CuentaBancaria,
    Conciliaciones,
    DetallesConciliacion,
    MovimientoExtracto,
    AjustesConciliacion,
    AuditoriaConciliaciones,
    ExtractosBancarios])],  // Importa las entidades necesarias
  controllers: [TransaccionesBancariasController],
  providers: [TransaccionesBancariasService],
  exports: [TransaccionesBancariasService],  // Si es necesario exportarlo

})
export class TransaccionesBancariasModule { }
