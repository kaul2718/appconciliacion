import { IsString, IsNotEmpty } from 'class-validator';
export class CreateCuentabancariaDto {
    @IsString()
    @IsNotEmpty()
    numeroCuenta: string;

    @IsString()
    @IsNotEmpty()
    banco: string;
}
