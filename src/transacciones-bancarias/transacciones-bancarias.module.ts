import { Module } from '@nestjs/common';
import { TransaccionesBancariasService } from './transacciones-bancarias.service';
import { TransaccionesBancariasController } from './transacciones-bancarias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransaccionesBancarias } from './entities/transacciones-bancaria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransaccionesBancarias])],  // Importa las entidades necesarias
  controllers: [TransaccionesBancariasController],
  providers: [TransaccionesBancariasService],
  exports: [TransaccionesBancariasService],  // Si es necesario exportarlo

})
export class TransaccionesBancariasModule { }
