import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],  // Añadir el repositorio al módulo
  providers: [UsersService],
  exports: [UsersService],  // Si es necesario exportarlo
})
export class UsersModule {}