import { Controller, UseGuards, Req, Param, ParseUUIDPipe } from '@nestjs/common';
import { Crud, CrudController, Override, ParsedRequest, CrudRequest, ParsedBody, CreateManyDto, CrudAuth } from '@nestjsx/crud';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PostEntity } from './post.entity';
import { PostsService } from './posts.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { UserEntity } from 'src/users/user.entity';
import { ImageUploadService } from 'src/image-upload/image-upload.service';
import { getConnection, UpdateResult } from 'typeorm';
import { Request } from 'express';

@Crud({
  model: {
    type: PostEntity
  },
  dto: {
    create: CreatePostDTO,
    update: CreatePostDTO
  },
  routes: {
    exclude: ['createManyBase']
  },
  query: {
    join: {
      images: {
        eager: true
      },
      user: {
        eager: true
      }
    }
  }
})
@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController implements CrudController<PostEntity> {
  get base(): CrudController<PostEntity> {
    return this;
  }

  @Override()
  async createOne(@Req() req, @ParsedBody() dto: CreatePostDTO): Promise<PostEntity> {
    return this.service.create(req, dto);
  }

  @Override()
  async updateOne(@Param('id', new ParseUUIDPipe()) id: string, @ParsedBody() dto: CreatePostDTO): Promise<PostEntity> {
    return this.service.update(id, dto);
  }
  constructor(public readonly service: PostsService, public readonly imageUploadService: ImageUploadService) {}
}
