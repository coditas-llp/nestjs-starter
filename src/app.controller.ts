import { JwtAuthGuard } from '@app/user/auth/guard/jwt.guard';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
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

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('test-jwt')
  async login() {
    return { test: 'JWT test success' };
  }
}
