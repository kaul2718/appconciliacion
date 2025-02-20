import { Module } from '@nestjs/common';
import { DiferenciaService } from './diferencia.service';
import { DiferenciaController } from './diferencia.controller';
import { Diferencia } from './entities/diferencia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Diferencia])],  // Importa las entidades necesarias
  controllers: [DiferenciaController],
  providers: [DiferenciaService],
  exports: [DiferenciaService],  // Si es necesario exportarlo

})
export class DiferenciaModule { }
