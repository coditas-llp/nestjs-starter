import { JwtAuthGuard } from '@app/user/auth/guard/jwt.guard';
import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthStatusDTO } from './dto/health-status.dto';

const healthStatusMessage = 'Apis are working!';
describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getHealthStatus: jest.fn().mockResolvedValue({
              message: healthStatusMessage,
            } as HealthStatusDTO),
          },
        },
      ],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
    appService = moduleRef.get<AppService>(AppService);
  });

  describe('getHealthStatus', () => {
    it('should return health status', async () => {
      const result = await appController.getHealthStatus();
      expect(result).toEqual({ message: healthStatusMessage });
      expect(appService.getHealthStatus).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should return test JWT success message', async () => {
      const result = await appController.login();
      expect(result).toEqual({ test: 'JWT test success' });
    });

    it('should JwtAuthGuard be applied', async () => {
      const guards = Reflect.getMetadata(
        '__guards__',
        AppController.prototype.login,
      );
      const guard = new guards[0]();

      expect(guard).toBeInstanceOf(JwtAuthGuard);
    });
  });
});
