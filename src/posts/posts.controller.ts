import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PostEntity } from './post.entity';
import { PostsService } from './posts.service';

@Crud({
  model: {
    type: PostEntity
  }
  //   dto: {
  //     create: CreateUserDto
  //   }
})
@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController implements CrudController<PostEntity> {
  constructor(public readonly service: PostsService) {}
}
