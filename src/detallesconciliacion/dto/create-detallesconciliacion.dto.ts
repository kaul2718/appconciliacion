import { IsNumber, IsOptional, IsEnum, IsString, IsDecimal, IsDateString, MaxLength, IsBoolean, isNumber } from 'class-validator';
import { TipoConciliacion } from 'src/common/enums/tipoconciliacion.enum';

export class CreateDetallesconciliacionDto {
    @IsNumber()
    conciliacion_id: number;

    @IsOptional()
    @IsNumber()
    transaccion_id?: number;

    @IsOptional()
    @IsNumber()
    extracto_id?: number;

    @IsEnum(TipoConciliacion)
    tipo: TipoConciliacion;

    @IsNumber()
    diferencia: number; 

    @IsOptional()
    @IsString()
    @MaxLength(255)
    comentario?: string;

    @IsOptional()
    @IsBoolean()
    fecha_diferente?: boolean;

    @IsOptional()
    @IsBoolean()
    monto_diferente?: boolean;

    @IsOptional()
    @IsDateString()
    diferencia_fecha?: string;
}
