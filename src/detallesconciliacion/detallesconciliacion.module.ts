import { Module } from '@nestjs/common';
import { DetallesconciliacionService } from './detallesconciliacion.service';
import { DetallesconciliacionController } from './detallesconciliacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallesConciliacion } from './entities/detallesconciliacion.entity';
import { Conciliaciones } from 'src/conciliaciones/entities/conciliacione.entity';
import { TransaccionesBancarias } from 'src/transacciones-bancarias/entities/transacciones-bancaria.entity';
import { ExtractosBancarios } from 'src/extractobancario/entities/extractobancario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetallesConciliacion,Conciliaciones,TransaccionesBancarias,ExtractosBancarios])],  // Importa las entidades necesarias
  controllers: [DetallesconciliacionController],
  providers: [DetallesconciliacionService],
  exports: [DetallesconciliacionService],  // Si es necesario exportarlo

})
export class DetallesconciliacionModule { }
