import { Module } from '@nestjs/common';
import { UsuarioscuentasService } from './usuarioscuentas.service';
import { UsuarioscuentasController } from './usuarioscuentas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosCuentas } from './entities/usuarioscuenta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuariosCuentas])],  // Importa las entidades necesarias
  controllers: [UsuarioscuentasController],
  providers: [UsuarioscuentasService],
  exports: [UsuarioscuentasService],

})
export class UsuarioscuentasModule { }
