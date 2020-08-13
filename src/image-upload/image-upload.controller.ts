import { Controller, Post, UploadedFile, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { AmazonS3FileInterceptor } from 'nestjs-multer-extended';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AWSFile } from './dto/aws-file.dto';
import { ImageUploadService } from './image-upload.service';
import { ImageEntity } from './image.entity';

@Controller('image-upload')
@UseGuards(JwtAuthGuard)
export class ImageUploadController {
  @Post()
  @UseInterceptors(
    AmazonS3FileInterceptor('file', {
      randomFilename: true,
      thumbnail: { suffix: 'thumb', width: 200, height: 200 },
      limits: { fileSize: 7 * 1024 * 1024 },
      resize: { width: 1000, height: 1000 }
    })
  )
  uploadFile(@UploadedFile() file: AWSFile): Promise<ImageEntity> {
    console.log(file);
    return this.imageUploadService.createImage(file);
  }
  constructor(private readonly imageUploadService: ImageUploadService) {}
}
