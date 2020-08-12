import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ImageUploadService } from './image-upload.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('image-upload')
@UseGuards(JwtAuthGuard)
export class ImageUploadController {
  @Post()
  async create(@Req() request, @Res() response): Promise<any> {
    try {
      await this.imageUploadService.fileupload(request, response);
    } catch (error) {
      return response.status(500).json(`Failed to upload image file: ${error.message}`);
    }
  }
  constructor(private readonly imageUploadService: ImageUploadService) {}
}
