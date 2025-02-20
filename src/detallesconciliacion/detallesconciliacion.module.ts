import { Module } from '@nestjs/common';
import { DetallesconciliacionService } from './detallesconciliacion.service';
import { DetallesconciliacionController } from './detallesconciliacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallesConciliacion } from './entities/detallesconciliacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetallesConciliacion])],  // Importa las entidades necesarias
  controllers: [DetallesconciliacionController],
  providers: [DetallesconciliacionService],
  exports: [DetallesconciliacionService],  // Si es necesario exportarlo

})
export class DetallesconciliacionModule { }
