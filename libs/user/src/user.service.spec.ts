import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should call the findOne method on the usersRepository with the provided email', async () => {
      const email = faker.internet.email();
      const expectedUser = {
        id: 1,
        email,
        password: faker.internet.password(),
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(expectedUser);

      const result = await service.findOne(email);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { email },
      });
      expect(result).toBe(expectedUser);
    });

    it('should return undefined if the user is not found', async () => {
      const email = faker.internet.email();
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      const result = await service.findOne(email);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { email },
      });
      expect(result).toBeUndefined();
    });
  });
});
