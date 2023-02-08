import { CustomLoggerService } from '@app/core/custom-logger/custom-logger.service';
import { CustomRequest } from '@app/core/custom-logger/interface/request.interface';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
import { nanoid } from 'nanoid';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: CustomLoggerService) {}

  public use(req: CustomRequest, res: Response, next: () => void): void {
    req.id = req.header('X-Request-Id') || nanoid();
    res.setHeader('X-Request-Id', req.id);
    this.logger.log(`${req.method} ${req.originalUrl}`);
    return next();
  }
}
