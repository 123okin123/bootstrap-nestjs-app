import { ImageUploadService } from './image-upload.service';
import { ImageUploadController } from './image-upload.controller';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImageEntity } from './image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ImageEntity]), ConfigModule],
  controllers: [ImageUploadController],
  providers: [ImageUploadService],
  exports: [ImageUploadService]
})
export class ImageUploadModule {}
