import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { UserEntity } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

export type User = any;

@Injectable()
export class UsersService extends TypeOrmCrudService<UserEntity> {
  async create(user: CreateUserDto): Promise<UserEntity> {
    user.password = await UserEntity.hashPassword(user.password);
    return this.userRepository.save(user);
  }

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
    super(userRepository);
  }
}
