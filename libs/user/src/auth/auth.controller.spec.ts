import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRequestDTO } from './dto/auth.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  const accessToken = faker.random.alphaNumeric();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should call authService.login with the correct parameters', async () => {
      const authRequest: AuthRequestDTO = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      const authServiceSpy = jest
        .spyOn(authService, 'login')
        .mockResolvedValue({ access_token: accessToken });

      await controller.login(authRequest);

      expect(authServiceSpy).toHaveBeenCalledWith(authRequest);
    });

    it('should return the access token from authService.login', async () => {
      const authRequest: AuthRequestDTO = {
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      jest
        .spyOn(authService, 'login')
        .mockResolvedValue({ access_token: accessToken });

      const result = await controller.login(authRequest);

      expect(result).toEqual({ access_token: accessToken });
    });
  });
});
