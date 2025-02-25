import { Controller, Post, Param } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { Reportes } from './entities/reporte.entity';

@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @Post(':conciliacionId')
  async generarReporte(@Param('conciliacionId') conciliacionId: number): Promise<Reportes> {
    return this.reportesService.generarReporteConciliacion(conciliacionId);
  }
}
