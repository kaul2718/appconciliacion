import { Module } from '@nestjs/common';
import { AuditoriaConciliacionesService } from './auditoriaconciliaciones.service';
import { AuditoriaConciliacionesController } from './auditoriaconciliaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditoriaConciliaciones } from './entities/auditoriaconciliacione.entity';
import { User } from 'src/users/entities/user.entity';
import { Conciliaciones } from 'src/conciliaciones/entities/conciliacione.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuditoriaConciliaciones,User,Conciliaciones])],  // Importa las entidades necesarias
  controllers: [AuditoriaConciliacionesController],
  providers: [AuditoriaConciliacionesService],
  exports: [AuditoriaConciliacionesService],  // Si es necesario exportarlo

})
export class AuditoriaconciliacionesModule { }
