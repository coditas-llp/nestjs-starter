import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLoggerService } from '@app/core/custom-logger/custom-logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as pkg from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appPort = process.env.APP_PORT || 3333;
  const globalPrefix = 'api';
  const customLogger = new CustomLoggerService();

  app.setGlobalPrefix(globalPrefix);
  app.enableCors();

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle(`${pkg.name} APIs`)
      .setDescription(`${pkg.name} Backend APIs`)
      .setVersion(`${pkg.version}`)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(appPort, () => {
    customLogger.log(
      `Listening at http://localhost:${appPort}/${globalPrefix}`,
    );
  });
}
bootstrap();
