import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLoggerService } from '@app/core/custom-logger/custom-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appPort = process.env.APP_PORT || 3333;
  const globalPrefix = 'api';
  const customLogger = new CustomLoggerService();

  app.setGlobalPrefix(globalPrefix);

  await app.listen(appPort, () => {
    customLogger.log(
      `Listening at http://localhost:${appPort}/${globalPrefix}`,
    );
  });
}
bootstrap();
