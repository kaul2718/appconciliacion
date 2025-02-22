import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtractoBancarioService } from './extractobancario.service';
import { ExtractoBancarioController } from './extractobancario.controller';
import { ExtractosBancarios } from './entities/extractobancario.entity';
import { CuentaBancaria } from '../cuentabancaria/entities/cuentabancaria.entity';
import { MovimientoExtracto } from '../movimientoextracto/entities/movimientoextracto.entity';
import { TransaccionesBancarias } from '../transacciones-bancarias/entities/transacciones-bancaria.entity';
import { ConciliacionesModule } from '../conciliaciones/conciliaciones.module'; // Importa el módulo
import { DetallesConciliacion } from '../detallesconciliacion/entities/detallesconciliacion.entity';
import { Conciliaciones } from '../conciliaciones/entities/conciliacione.entity';
import { AjustesConciliacion } from '../ajustesconciliacion/entities/ajustesconciliacion.entity';
import { AuditoriaConciliaciones } from '../auditoriaconciliaciones/entities/auditoriaconciliacione.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExtractosBancarios,
      TransaccionesBancarias,
      DetallesConciliacion,
      MovimientoExtracto,
      AjustesConciliacion,
      AuditoriaConciliaciones,
      Conciliaciones,
      CuentaBancaria,
    ]), 
    ConciliacionesModule, // Importa el módulo aquí, fuera de TypeOrmModule.forFeature()
  ],
  controllers: [ExtractoBancarioController],
  providers: [ExtractoBancarioService],
  exports: [ExtractoBancarioService], // Si es necesario exportarlo
})
export class ExtractobancarioModule {}