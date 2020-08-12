import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';

export type User = any;

@Injectable()
export class PostsService extends TypeOrmCrudService<PostEntity> {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>
  ) {
    super(postRepository);
  }
}
