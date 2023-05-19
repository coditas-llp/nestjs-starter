import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  create(role: CreateRoleDto) {
    return this.roleRepository.save(this.roleRepository.create(role));
  }

  findAll() {
    return this.roleRepository.find();
  }

  findOne(id: number) {
    return this.roleRepository.findOneByOrFail({ id });
  }

  update(id: number, role: UpdateRoleDto) {
    return this.roleRepository.update(
      {
        id,
      },
      role,
    );
  }

  remove(id: number) {
    return this.roleRepository.delete(id);
  }
}
