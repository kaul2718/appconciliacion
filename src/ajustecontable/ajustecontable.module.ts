import { Module } from '@nestjs/common';
import { AjustecontableService } from './ajustecontable.service';
import { AjustecontableController } from './ajustecontable.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AjusteContable } from './entities/ajustecontable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AjusteContable])],  // Importa las entidades necesarias
  controllers: [AjustecontableController],
  providers: [AjustecontableService],
  exports: [AjustecontableService],  // Si es necesario exportarlo

})
export class AjustecontableModule { }
