import { Module } from '@nestjs/common';
import { ConciliacionService } from './conciliaciones.service';
import { ConciliacionesController } from './conciliaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conciliaciones } from './entities/conciliacione.entity';
import { DetallesConciliacion } from 'src/detallesconciliacion/entities/detallesconciliacion.entity';
import { TransaccionesBancarias } from 'src/transacciones-bancarias/entities/transacciones-bancaria.entity';
import { MovimientoExtracto } from 'src/movimientoextracto/entities/movimientoextracto.entity';
import { AjustesConciliacion } from 'src/ajustesconciliacion/entities/ajustesconciliacion.entity';
import { AuditoriaConciliaciones } from 'src/auditoriaconciliaciones/entities/auditoriaconciliacione.entity';
import { CuentaBancaria } from 'src/cuentabancaria/entities/cuentabancaria.entity';
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
    ExtractosBancarios,])],  // Importa las entidades necesarias
  controllers: [ConciliacionesController],
  providers: [ConciliacionService],
  exports: [ConciliacionService],  // Si es necesario exportarlo

})
export class ConciliacionesModule { }
