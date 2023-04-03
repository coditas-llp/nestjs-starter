import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfig } from './constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>(DBConfig.DATABASE_HOST),
        port: configService.get<number>(DBConfig.DATABASE_PORT),
        username: configService.get<string>(DBConfig.DATABASE_USERNAME),
        password: configService.get<string>(DBConfig.DATABASE_PASSWORD),
        database: configService.get<string>(DBConfig.DATABASE_NAME),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppConfigModule {}
