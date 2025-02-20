import { IsOptional, Matches, IsEmail, MinLength, IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Role } from 'src/common/enums/rol.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  
    @IsOptional()
    nombre?: string;
  
    @IsOptional()
    @IsEmail({}, { message: 'El correo debe ser válido.' })
    correo?: string;
  
    @IsOptional()
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
    password?: string;
  
    @IsOptional()
    @IsEnum(Role, { message: `El rol debe ser uno de los siguientes: ${Object.values(Role).join(', ')}.` })
    role?: Role;
}
