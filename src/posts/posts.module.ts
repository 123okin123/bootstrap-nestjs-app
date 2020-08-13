import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostEntity } from './post.entity';
import { PostsController } from './posts.controller';
import { ImageUploadModule } from 'src/image-upload/image-upload.module';
import { ImageEntity } from 'src/image-upload/image.entity';
import { UserEntity } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, ImageEntity, UserEntity]), ImageUploadModule],
  providers: [PostsService],
  exports: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}
