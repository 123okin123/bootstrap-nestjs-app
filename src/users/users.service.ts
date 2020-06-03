import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

export type User = any;

@Injectable()
export class UsersService {
  async findOne(username: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
}
