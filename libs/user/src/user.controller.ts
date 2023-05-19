import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserRequestDTO } from './dto/create-user-request.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async login(@Body() requestBody: CreateUserRequestDTO) {
    return this.userService.createUser(requestBody);
  }
}
