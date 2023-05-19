import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RoleModule } from './role/role.module';
import { Role } from './role/entities/role.entity';

@Module({
  providers: [UserService],
  exports: [UserService],
  imports: [AuthModule, TypeOrmModule.forFeature([User]), RoleModule],
  controllers: [AuthController, UserController],
})
export class UserModule {}
