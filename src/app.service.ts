import { CustomLoggerService } from '@app/core/custom-logger/custom-logger.service';
import { Injectable } from '@nestjs/common';
import { HealthStatusDTO } from './dto/health-status.dto';

@Injectable()
export class AppService {
  constructor(private customLoggerService: CustomLoggerService) {}

  getHealthStatus(): HealthStatusDTO {
    this.customLoggerService.log('Inside getHealthStatus function');
    return { data: 'Apis are working!' };
  }
}
