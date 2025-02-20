import { IsDate, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateLibrocontableDto {
    @IsDate()
    @IsNotEmpty()
    fecha: Date;

    @IsNumber()
    @IsNotEmpty()
    saldo: number;

    @IsNumber()
    @IsNotEmpty()
    cuentaId: number; // Relación con CuentaBancaria
}
