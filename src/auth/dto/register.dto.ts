import { IsString, IsNotEmpty, IsEmail, Matches, Length } from 'class-validator';
import { Role } from '../../common/enums/rol.enum';
import { Transform } from 'class-transformer';

export class RegisterDto {

  @Transform(({value})=> value.trim())
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'El correo no es válido.' })
  correo: string;
  
  @Transform(({value})=> value.trim())
  @IsNotEmpty()
  @IsString()
  @Length(8, 20, { message: 'La contraseña debe tener entre 6 y 20 caracteres.' })
  password: string;

  @IsString()
  role: Role;
}
