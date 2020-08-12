import { Req, Res, Injectable } from '@nestjs/common';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from './image.entity';
import { Repository } from 'typeorm';

const s3 = new AWS.S3();

@Injectable()
export class ImageUploadService {
  upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: this.configService.get<string>('AWS_S3_BUCKET_NAME'),
      acl: 'private',
      key: function(request, file, cb) {
        cb(null, `${Date.now().toString()} - ${file.originalname}`);
      }
    })
  }).array('upload', 1);

  async fileupload(@Req() req, @Res() res): Promise<any> {
    try {
      this.upload(req, res, function(error) {
        if (error) {
          console.log(error);
          return res.status(404).json(`Failed to upload image file: ${error}`);
        }
        return res.status(201).json(req.files[0].location);
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(`Failed to upload image file: ${error}`);
    }
  }

  async saveImage(image: ImageEntity): Promise<ImageEntity> {
    return this.imagesRepository.save(image);
  }

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(ImageEntity)
    private imagesRepository: Repository<ImageEntity>
  ) {
    AWS.config.update({
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY')
    });
  }
}
