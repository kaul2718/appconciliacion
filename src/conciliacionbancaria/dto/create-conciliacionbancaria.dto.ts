import { IsDate, IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateConciliacionbancariaDto {
    @IsDate()
    @IsNotEmpty()
    fecha: Date;

    @IsString()
    @IsNotEmpty()
    estado: string;

    @IsNumber()
    @IsNotEmpty()
    saldoDiferencia: number;

    @IsNumber()
    @IsNotEmpty()
    extractoId: number; // Relación con ExtractoBancario

    @IsNumber()
    @IsNotEmpty()
    libroId: number; // Relación con LibroContable

    @IsNumber()
    @IsNotEmpty()
    userId: number; // Relación con User
}
