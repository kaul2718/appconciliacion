import { Module } from '@nestjs/common';
import { AjustesConciliacionService } from './ajustesconciliacion.service';
import { AjustesconciliacionController } from './ajustesconciliacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AjustesConciliacion } from './entities/ajustesconciliacion.entity';
import { User } from 'src/users/entities/user.entity';
import { Conciliaciones } from 'src/conciliaciones/entities/conciliacione.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AjustesConciliacion,User,Conciliaciones])],  // Importa las entidades necesarias
  controllers: [AjustesconciliacionController],
  providers: [AjustesConciliacionService],
  exports: [AjustesConciliacionService],  // Si es necesario exportarlo

})
export class AjustesconciliacionModule { }
