import { Module } from '@nestjs/common';
import { AjustesconciliacionService } from './ajustesconciliacion.service';
import { AjustesconciliacionController } from './ajustesconciliacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AjustesConciliacion } from './entities/ajustesconciliacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AjustesConciliacion])],  // Importa las entidades necesarias
  controllers: [AjustesconciliacionController],
  providers: [AjustesconciliacionService],
  exports: [AjustesconciliacionService],  // Si es necesario exportarlo

})
export class AjustesconciliacionModule { }
