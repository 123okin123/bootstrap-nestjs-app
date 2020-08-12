import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

@Crud({
  model: {
    type: UserEntity
  },
  routes: {
    exclude: ['createOneBase', 'createManyBase']
  },
  dto: {
    create: CreateUserDto
  },
  query: {
    // exclude: ['password']
  },
  params: {
    slug: {
      field: 'id',
      type: 'uuid',
      primary: true
    }
  }
})
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController implements CrudController<UserEntity> {
  constructor(public readonly service: UsersService) {}
}
