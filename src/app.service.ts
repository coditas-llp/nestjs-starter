import { CustomLoggerService } from '@app/core/custom-logger/custom-logger.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private customLoggerService: CustomLoggerService) {}

  getHello(): string {
    this.customLoggerService.log('Inside getHello function');
    return 'Hello World!';
  }
}
