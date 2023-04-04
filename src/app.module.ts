import { CoreModule } from '@app/core/core.module';
import { UserModule } from '@app/user';
import { MiddlewareConsumer, Module, Scope } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { HttpErrorFilter } from './filter/error.filter';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { RequestInterceptor } from './middleware/request.interceptor';
import { ResponseInterceptor } from './middleware/response.interceptor';

@Module({
  imports: [AppConfigModule, CoreModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: RequestInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {
  constructor() {
    // this.runMigrations();
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }

  async runMigrations() {
    /**
     * TO Run DB migrations with the code
     * get the error if the migration is failed
     */
    const options = ConfigService.getOrmConfig('migration_datasource');
    const connection = new DataSource(options);
    await connection.initialize();
    try {
      await connection.runMigrations();
    } catch (error) {
    } finally {
      await connection.destroy();
    }
  }
}
