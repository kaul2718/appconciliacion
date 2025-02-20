import { Module } from '@nestjs/common';
import { LibrocontableService } from './librocontable.service';
import { LibrocontableController } from './librocontable.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibroContable } from './entities/librocontable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LibroContable])],  // Importa las entidades necesarias
  controllers: [LibrocontableController],
  providers: [LibrocontableService],
  exports: [LibrocontableService],  // Si es necesario exportarlo

})
export class LibrocontableModule { }
