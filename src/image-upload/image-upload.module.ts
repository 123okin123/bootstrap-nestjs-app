import { ImageUploadService } from './image-upload.service';
import { ImageUploadController } from './image-upload.controller';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ImageEntity } from './image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterExtendedModule } from 'nestjs-multer-extended';

@Module({
  imports: [
    TypeOrmModule.forFeature([ImageEntity]),
    ConfigModule,
    MulterExtendedModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
        bucket: configService.get<string>('AWS_S3_BUCKET_NAME'),
        acl: 'public-read',
        fileSize: 10 * 1024 * 1024,
        basePath: configService.get<string>('AWS_S3_BASE_PATH'),
        region: 'us-west-2'
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [ImageUploadController],
  providers: [ImageUploadService],
  exports: [ImageUploadService]
})
export class ImageUploadModule {}
