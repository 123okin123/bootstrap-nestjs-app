import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageEntity } from './image.entity';
import { AWSFile } from './dto/aws-file.dto';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class ImageUploadService extends TypeOrmCrudService<ImageEntity> {
  async createImage(createImageDTO: AWSFile): Promise<ImageEntity> {
    const image = new ImageEntity();
    image.contentType = createImageDTO.ContentType;
    image.encoding = createImageDTO.encoding;
    image.height = createImageDTO.height;
    image.key = createImageDTO.key;
    image.mimetype = createImageDTO.mimetype;
    image.originalname = createImageDTO.originalname;
    image.size = createImageDTO.size;
    image.url = createImageDTO.Location;
    image.width = createImageDTO.width;
    return this.imagesRepository.save(image);
  }

  constructor(
    @InjectRepository(ImageEntity)
    private imagesRepository: Repository<ImageEntity>
  ) {
    super(imagesRepository);
  }
}
