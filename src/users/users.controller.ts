import { Body, Controller, Delete, Get, Param, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  @Get()
  async findAll(): Promise<UserEntity[]> {
    return await this.userService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.findOne({ id: id });
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body(new ValidationPipe()) payload: UserEntity): Promise<UpdateResult> {
    return this.userService.update(id, payload);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.delete(id);
  }

  constructor(private readonly userService: UsersService) {}
}
