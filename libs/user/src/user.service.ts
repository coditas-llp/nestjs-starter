import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserRequestDTO } from './dto/create-user-request.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
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
}
