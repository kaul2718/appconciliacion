import { Module } from '@nestjs/common';
import { CuentabancariaService } from './cuentabancaria.service';
import { CuentabancariaController } from './cuentabancaria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuentaBancaria } from './entities/cuentabancaria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CuentaBancaria])],  // Importa las entidades necesarias
  controllers: [CuentabancariaController],
  providers: [CuentabancariaService],
  exports: [CuentabancariaService],  // Si es necesario exportarlo

})
export class CuentabancariaModule { }
