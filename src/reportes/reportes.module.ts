import { Module } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { ReportesController } from './reportes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reportes } from './entities/reporte.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reportes])],  // Importa las entidades necesarias
  controllers: [ReportesController],
  providers: [ReportesService],
    exports: [ReportesService],  // Si es necesario exportarlo
  
})
export class ReportesModule { }
