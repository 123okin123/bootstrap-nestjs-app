import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { UserEntity } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

export type User = any;

@Injectable()
export class UsersService {
  async findOne(params: Partial<UserEntity>): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: params });
  }

  async findAll(): Promise<UserEntity[] | undefined> {
    return this.userRepository.find();
  }

  async create(user: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.create(user);
  }

  async update(id: string, user: UserEntity): Promise<UpdateResult> {
    return this.userRepository.update(id, user);
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
}
