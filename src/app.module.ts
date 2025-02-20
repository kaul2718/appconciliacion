import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CuentabancariaModule } from './cuentabancaria/cuentabancaria.module';
import { ExtractobancarioModule } from './extractobancario/extractobancario.module';
import { ConfigModule } from '@nestjs/config';
import { UsuarioscuentasModule } from './usuarioscuentas/usuarioscuentas.module';
import { TransaccionesBancariasModule } from './transacciones-bancarias/transacciones-bancarias.module';
import { ConciliacionesModule } from './conciliaciones/conciliaciones.module';
import { DetallesconciliacionModule } from './detallesconciliacion/detallesconciliacion.module';
import { AjustesconciliacionModule } from './ajustesconciliacion/ajustesconciliacion.module';
import { AuditoriaconciliacionesModule } from './auditoriaconciliaciones/auditoriaconciliaciones.module';
import { ReportesModule } from './reportes/reportes.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.DB_SSL === 'true',
      extra: {
        ssl:
          process.env.DB_SSL === 'true'
            ? {
              rejectUnauthorized: false,
            }
            : null,
      },
    }),
    AuthModule,
    CuentabancariaModule,
    ExtractobancarioModule,
    UsuarioscuentasModule,
    TransaccionesBancariasModule,
    ConciliacionesModule,
    DetallesconciliacionModule,
    AjustesconciliacionModule,
    AuditoriaconciliacionesModule,
    ReportesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

// El módulo es quien dice qué controllers y servicios trabajan juntos.
// Es como armar un grupo de panas con una misión específica, como manejar los clientes o los pedidos.