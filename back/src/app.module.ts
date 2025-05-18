import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MocionGateway } from './mocion/mocion.gateway';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || ''),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/entities/*.entity{.ts,.js}'],
      synchronize: false,
      autoLoadEntities: true,
      options: {
        encrypt: false,
        enableArithAbort: true,
      },
    }),
    AuthModule,
    UsuarioModule
  ],
  controllers: [AppController],
  providers: [AppService, MocionGateway],
})
export class AppModule {}
