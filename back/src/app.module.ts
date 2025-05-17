import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MotionGateway } from './motion/motion.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'mcamim',
      password: 'mcamim',
      database: 'AsambleaCS',
      synchronize: false,
      autoLoadEntities: true,
      options: {
        encrypt: false,
        enableArithAbort: true,
      },
    }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, MotionGateway],
})
export class AppModule {}
