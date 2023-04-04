import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  exports: [UserService],
  imports: [AuthModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
})
export class UserModule {}
