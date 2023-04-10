import { CustomLoggerService } from '@app/core/custom-logger/custom-logger.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { HealthStatusDTO } from './dto/health-status.dto';

describe('AppService', () => {
  let appService: AppService;
  let customLoggerService: CustomLoggerService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: CustomLoggerService,
          useValue: {
            log: jest.fn(),
          },
        },
      ],
    }).compile();

    appService = app.get<AppService>(AppService);
    customLoggerService = app.get<CustomLoggerService>(CustomLoggerService);
  });

  describe('getHealthStatus', () => {
    it('should return a HealthStatusDTO', () => {
      const expected: HealthStatusDTO = { message: 'Apis are working!' };
      const result: HealthStatusDTO = appService.getHealthStatus();

      expect(result).toEqual(expected);
    });

    it('should log a message', () => {
      appService.getHealthStatus();

      expect(customLoggerService.log).toHaveBeenCalledWith(
        'Inside getHealthStatus function',
      );
    });
  });
});
