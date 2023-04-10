import { faker } from '@faker-js/faker';
import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user.service';
import { AuthService } from './auth.service';
import { AuthRequestDTO } from './dto/auth.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('validateUser', () => {
    it('should return user details if the email and password are valid', async () => {
      const email = faker.internet.email();
      const password = faker.internet.password();

      const user = {
        id: 1,
        email,
        password: await bcrypt.hash(password, 10),
      };

      jest
        .spyOn(userService, 'findOne')
        .mockImplementation(() => Promise.resolve(user));

      const userDetails = await authService.validateUser(email, password);

      expect(userDetails).toEqual({
        id: user.id,
        email: user.email,
      });
    });

    it('should return null if the email or password is invalid', async () => {
      const email = faker.internet.email();
      const password = faker.internet.password();

      const user = {
        id: 1,
        email,
        password: await bcrypt.hash(password, 10),
      };

      jest
        .spyOn(userService, 'findOne')
        .mockImplementation(() => Promise.resolve(user));

      const userDetails = await authService.validateUser(
        email,
        'wrong_password',
      );

      expect(userDetails).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access token if the user credentials are valid', async () => {
      const email = faker.internet.email();
      const password = faker.internet.password();

      const user = {
        id: 1,
        email,
        password: await bcrypt.hash(password, 10),
      };

      const authRequestDTO: AuthRequestDTO = {
        email,
        password,
      };

      jest
        .spyOn(authService, 'validateUser')
        .mockImplementation(() => Promise.resolve(user));
      jest.spyOn(jwtService, 'sign').mockReturnValue('access_token');

      const response = await authService.login(authRequestDTO);

      expect(response).toEqual({
        access_token: 'access_token',
      });
    });

    it('should throw BadRequestException if the user credentials are invalid', async () => {
      const email = faker.internet.email();
      const password = faker.internet.password();

      const authRequestDTO: AuthRequestDTO = {
        email,
        password,
      };

      jest.spyOn(authService, 'validateUser').mockReturnValue(null);

      expect(authService.login(authRequestDTO)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
