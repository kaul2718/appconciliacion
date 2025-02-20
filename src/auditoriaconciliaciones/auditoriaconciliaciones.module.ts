import { Module } from '@nestjs/common';
import { AuditoriaconciliacionesService } from './auditoriaconciliaciones.service';
import { AuditoriaconciliacionesController } from './auditoriaconciliaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditoriaConciliaciones } from './entities/auditoriaconciliacione.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuditoriaConciliaciones])],  // Importa las entidades necesarias
  controllers: [AuditoriaconciliacionesController],
  providers: [AuditoriaconciliacionesService],
  exports: [AuditoriaconciliacionesService],  // Si es necesario exportarlo

})
export class AuditoriaconciliacionesModule { }
