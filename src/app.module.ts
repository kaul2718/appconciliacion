import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AjustecontableModule } from './ajustecontable/ajustecontable.module';
import { ConciliacionbancariaModule } from './conciliacionbancaria/conciliacionbancaria.module';
import { CuentabancariaModule } from './cuentabancaria/cuentabancaria.module';
import { DiferenciaModule } from './diferencia/diferencia.module';
import { ExtractobancarioModule } from './extractobancario/extractobancario.module';
import { LibrocontableModule } from './librocontable/librocontable.module';
import { ConfigModule } from '@nestjs/config';

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
    AjustecontableModule,
    ConciliacionbancariaModule,
    CuentabancariaModule,
    DiferenciaModule,
    ExtractobancarioModule,
    LibrocontableModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

// El módulo es quien dice qué controllers y servicios trabajan juntos.
// Es como armar un grupo de panas con una misión específica, como manejar los clientes o los pedidos.