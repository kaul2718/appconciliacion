import { Injectable } from '@nestjs/common';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts'; // Importar directamente vfs_fonts
import * as fs from 'fs';
import { Conciliaciones } from 'src/conciliaciones/entities/conciliacione.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reportes } from './entities/reporte.entity';
import { CuentaBancaria } from 'src/cuentabancaria/entities/cuentabancaria.entity';

@Injectable()
export class ReportesService {
  constructor(
    @InjectRepository(Reportes)
    private readonly reportesRepository: Repository<Reportes>,
    @InjectRepository(Conciliaciones)
    private readonly conciliacionesRepository: Repository<Conciliaciones>,
    @InjectRepository(CuentaBancaria)
    private readonly cuentabancariaRepository: Repository<CuentaBancaria>,
  ) {
    // Inicializar las fuentes de pdfMake
    pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfFonts; // Manejar ambas versiones
  }

  // Método para generar el PDF
  async generarReporteConciliacion(conciliacionId: number): Promise<Reportes> {
    // Obtener la conciliación con sus relaciones
    const conciliacion = await this.conciliacionesRepository.findOne({
      where: { id: conciliacionId },
      relations: ['cuenta', 'cuenta.usuarios', 'cuenta.usuarios.usuario'], // Cambiado 'usuariosCuentas' a 'usuarios'
    });

    // Asegurarse de que la conciliación y la cuenta existan
    if (!conciliacion || !conciliacion.cuenta) {
      throw new Error('Conciliación o cuenta no encontrada');
    }

    // Obtener el primer usuario relacionado con la cuenta
    const usuario = conciliacion.cuenta.usuarios[0]?.usuario;

    // Generar el contenido del reporte
    const contenido = this.generarContenidoReporte(conciliacion, usuario);

    // Definir el documento PDF
    const docDefinition = {
      content: contenido,
      defaultStyle: {
        font: 'Roboto', // Usando la fuente personalizada
      },
      fonts: {
        Roboto: {
          normal: 'Roboto-Regular.ttf',
          bold: 'Roboto-Bold.ttf',
        },
      },
    };

    // Crear el PDF
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);

    // Guardar el archivo PDF en el sistema
    const archivo = `reporte_conciliacion_${conciliacionId}.pdf`;
    const archivoRuta = `./reports/${archivo}`;

    // Crear directorio si no existe
    if (!fs.existsSync('./reports')) {
      fs.mkdirSync('./reports');
    }

    // Guardar el PDF en el sistema de archivos
    return new Promise((resolve, reject) => {
      pdfDocGenerator.getBuffer((buffer) => {
        fs.writeFileSync(archivoRuta, buffer);

        // Guardar el reporte en la base de datos
        const reporte = new Reportes();
        reporte.conciliacion = conciliacion;
        reporte.archivo = archivoRuta;
        reporte.creado_en = new Date();

        this.reportesRepository.save(reporte)
          .then((savedReport) => resolve(savedReport))
          .catch((error) => reject(error));
      });
    });
  }

  // Método para estructurar el contenido del reporte
  private generarContenidoReporte(conciliacion: Conciliaciones, usuario: any) {
    return [
      { text: 'Reporte de Conciliación Bancaria', style: 'header' },
      { text: `Conciliación: ${conciliacion.id}`, style: 'subheader' },
      {
        table: {
          body: [
            ['Cuenta Bancaria', conciliacion.cuenta ? conciliacion.cuenta.numero_cuenta : 'No disponible'],
            ['Nombre del Banco', conciliacion.cuenta ? conciliacion.cuenta.nombre_banco : 'No disponible'],
            ['Saldo Conciliado', conciliacion.extracto ? conciliacion.extracto.saldoFinal : 'No disponible'],
            ['Fecha de Conciliación', conciliacion.fecha_inicio],
            ['Usuario que realizó la conciliación', usuario ? usuario.nombre : 'No disponible'],
            ['Correo del Usuario', usuario ? usuario.correo : 'No disponible'],
          ],
        },
        style: 'tableExample',
      },
    ];
  }
}