import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MocionGateway } from './mocion/mocion.gateway';
import { UsuarioModule } from './usuario/usuario.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolAsambleaModule } from './rol-asamblea/rol-asamblea.module';
import { AsambleaModule } from './asamblea/asamblea.module';
import { MocionModule } from './mocion/mocion.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'mssql',
        host: config.get<string>('DB_HOST'),
        port: parseInt(config.get<string>('DB_PORT') || '1433'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [__dirname + '/entities/*.entity{.ts,.js}'],
        synchronize: false,
        autoLoadEntities: true,
        options: {
          encrypt: false,
          enableArithAbort: true,
        },
      }),
    }),
    AuthModule,
    UsuarioModule,
    RolAsambleaModule,
    AsambleaModule,
    MocionModule
  ],
  controllers: [AppController],
  providers: [AppService, MocionGateway],
})
export class AppModule {}
