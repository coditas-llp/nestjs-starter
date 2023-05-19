import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserRequestDTO } from './dto/create-user-request.dto';
import { UpdateUserRequestDTO } from './dto/update-user-request.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User | undefined> {
    return this.usersRepository.findOneByOrFail({ id });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneByOrFail({ email });
  }

  async createUser(user: CreateUserRequestDTO): Promise<User> {
    const { password } = user;
    const hashedPassword = await hash(
      password,
      parseInt(process.env.SALT_CHARACTER_LENGTH),
    );

    user.password = hashedPassword;
    return this.usersRepository.save(this.usersRepository.create(user));
  }

  findAll() {
    return this.usersRepository.find();
  }

  update(id: number, user: UpdateUserRequestDTO) {
    return this.usersRepository.update(
      {
        id,
      },
      user,
    );
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
