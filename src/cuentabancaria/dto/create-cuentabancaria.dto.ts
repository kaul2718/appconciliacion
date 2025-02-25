import { IsString, IsNotEmpty, Length, IsEnum, IsOptional } from 'class-validator';
import { TipoCuentaBancaria } from 'src/common/enums/tipocuenta.enum';
export class CreateCuentabancariaDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 100, { message: 'El nombre del banco debe tener entre 3 y 100 caracteres' })
    nombre_banco: string;

    @IsNotEmpty()
    @IsString()
    @Length(5, 50, { message: 'El número de cuenta debe tener entre 5 y 50 caracteres' })
    numero_cuenta: string;

    @IsNotEmpty()
    @IsEnum(TipoCuentaBancaria, { message: 'El tipo de cuenta bancaria no es válido' })
    tipo: TipoCuentaBancaria;

    @IsNotEmpty()
    @IsString()
    @Length(3, 10, { message: 'La moneda debe tener entre 3 y 10 caracteres' })
    moneda: string;
    
    @IsOptional()
    saldo: number = 0;  // Establecer un valor predeterminado
}
