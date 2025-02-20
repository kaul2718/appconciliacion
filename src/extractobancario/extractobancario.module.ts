import { Module } from '@nestjs/common';
import { ExtractobancarioService } from './extractobancario.service';
import { ExtractobancarioController } from './extractobancario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExtractoBancario } from './entities/extractobancario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExtractoBancario])],  // Importa las entidades necesarias
  controllers: [ExtractobancarioController],
  providers: [ExtractobancarioService],
  exports: [ExtractobancarioService],  // Si es necesario exportarlo

})
export class ExtractobancarioModule { }
