import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user.service';
import { AuthRequestDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (user && isPasswordMatch) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: AuthRequestDTO) {
    const { email, password } = user;
    const payload = { email };
    const userDetails = await this.validateUser(email, password);
    if (!userDetails || !userDetails.id)
      throw new BadRequestException('Invalid credentials');
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
