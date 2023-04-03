import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HealthStatusDTO } from './dto/health-status.dto';

@ApiTags()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOkResponse({ type: HealthStatusDTO })
  @HttpCode(HttpStatus.OK)
  @Get('health-status')
  getHello(): HealthStatusDTO {
    return this.appService.getHealthStatus();
  }
}
