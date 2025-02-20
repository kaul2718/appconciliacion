import { Module } from '@nestjs/common';
import { ConciliacionbancariaService } from './conciliacionbancaria.service';
import { ConciliacionbancariaController } from './conciliacionbancaria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConciliacionBancaria } from './entities/conciliacionbancaria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConciliacionBancaria])],  // Importa las entidades necesarias
  controllers: [ConciliacionbancariaController],
  providers: [ConciliacionbancariaService],
  exports: [ConciliacionbancariaService],  // Si es necesario exportarlo
})
export class ConciliacionbancariaModule { }
