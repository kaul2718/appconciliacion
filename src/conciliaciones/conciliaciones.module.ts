import { Module } from '@nestjs/common';
import { ConciliacionesService } from './conciliaciones.service';
import { ConciliacionesController } from './conciliaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conciliaciones } from './entities/conciliacione.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conciliaciones])],  // Importa las entidades necesarias
  controllers: [ConciliacionesController],
  providers: [ConciliacionesService],
  exports: [ConciliacionesService],  // Si es necesario exportarlo

})
export class ConciliacionesModule { }
