import { IsDecimal, IsInt, IsOptional, IsString } from "class-validator";

export class CreateAjustesconciliacionDto {
    @IsInt()
    @IsOptional()
    conciliacionId?: number;

    @IsInt()
    @IsOptional()
    usuarioId?: number;

    @IsInt()
    @IsOptional()
    transaccionId?: number;

    @IsInt()
    @IsOptional()
    movimientoId?: number;

    @IsOptional()
    @IsDecimal()
    montoAjustado?: number;

    @IsString()
    comentario: string;
}
