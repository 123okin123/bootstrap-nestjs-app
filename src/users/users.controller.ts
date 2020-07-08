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
  }
})
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController implements CrudController<UserEntity> {
  // @Get()
  // async findAll(): Promise<UserEntity[]> {
  //   return await this.service.findAll();
  // }

  // @Get('/:id')
  // async findOne(@Param('id') id: string): Promise<UserEntity> {
  //   return this.service.findOne({ id: id });
  // }

  // @Put('/:id')
  // async update(@Param('id') id: string, @Body(new ValidationPipe()) payload: UserEntity): Promise<UpdateResult> {
  //   return this.service.update(id, payload);
  // }

  // @Delete('/:id')
  // async delete(@Param('id') id: string): Promise<DeleteResult> {
  //   return this.service.delete(id);
  // }

  constructor(public readonly service: UsersService) {}
}
