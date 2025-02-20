import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
export class CreateDiferenciaDto {
    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @IsNumber()
    @IsNotEmpty()
    monto: number;

    @IsNumber()
    @IsNotEmpty()
    conciliacionId: number; // Relación con ConciliacionBancaria
}
