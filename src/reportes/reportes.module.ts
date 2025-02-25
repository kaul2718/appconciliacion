import { Module } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { ReportesController } from './reportes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reportes } from './entities/reporte.entity';
import { Conciliaciones } from 'src/conciliaciones/entities/conciliacione.entity';
import { ExtractosBancarios } from 'src/extractobancario/entities/extractobancario.entity';
import { MovimientoExtracto } from 'src/movimientoextracto/entities/movimientoextracto.entity';
import { CuentaBancaria } from 'src/cuentabancaria/entities/cuentabancaria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reportes,Conciliaciones,ExtractosBancarios,MovimientoExtracto,CuentaBancaria])],  // Importa las entidades necesarias
  controllers: [ReportesController],
  providers: [ReportesService],
    exports: [ReportesService],  // Si es necesario exportarlo
  
})
export class ReportesModule { }
