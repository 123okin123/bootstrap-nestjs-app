import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ImageEntity } from 'src/image-upload/image.entity';
import { UserEntity } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDTO } from './dto/create-post.dto';
import { PostEntity } from './post.entity';

export type User = any;

@Injectable()
export class PostsService extends TypeOrmCrudService<PostEntity> {
  async create(req, dto: CreatePostDTO): Promise<PostEntity> {
    const post = new PostEntity();
    post.description = dto.description;
    const images = await this.imageRepository.findByIds(dto.imageIds);
    const user = await this.usersRepository.findOne(req.user.id);
    post.images = images;
    post.user = user;
    return this.postRepository.save(post);
  }

  async update(uuid: string, dto: CreatePostDTO): Promise<PostEntity> {
    const images = await this.imageRepository.findByIds(dto.imageIds);
    let post = await this.postRepository.findOneOrFail(uuid, { relations: ['images'] });
    post = this.postRepository.create(dto);
    post.images = images;
    return this.postRepository.save(post);
  }

  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {
    super(postRepository);
  }
}
