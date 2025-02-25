import { IsEnum, IsOptional, IsNumber, IsString } from 'class-validator';
import { AccionAuditoriaConciliacion } from 'src/common/enums/accionaudit.enum';
import { EstadoConciliacion } from 'src/common/enums/estadoconciliacion.enum';

export class CreateAuditoriaconciliacioneDto {
    @IsEnum(AccionAuditoriaConciliacion)
    accion: AccionAuditoriaConciliacion;

    @IsEnum(EstadoConciliacion)
    @IsOptional()
    estado_anterior?: EstadoConciliacion;

    @IsEnum(EstadoConciliacion)
    @IsOptional()
    estado_nuevo?: EstadoConciliacion;

    @IsNumber()
    @IsOptional()
    diferencia_saldo?: number;

    @IsString()
    @IsOptional()
    comentario?: string;

    // Si el usuario y la conciliación son necesarios, se pueden agregar también
    @IsNumber()
    usuario_id: number;

    @IsNumber()
    conciliacion_id: number;
}
