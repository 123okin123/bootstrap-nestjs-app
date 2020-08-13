import { Base } from 'src/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PostEntity } from 'src/posts/post.entity';
import { AWSFile } from './dto/aws-file.dto';

@Entity('images')
export class ImageEntity extends Base {
  @Column({ type: 'text' })
  url: string;

  @Column({ type: 'text' })
  originalname: string;

  @Column({ type: 'text' })
  encoding: string;

  @Column({ type: 'text' })
  mimetype: string;

  @Column({ type: 'text' })
  key: string;

  @Column({ type: 'integer' })
  width: number;

  @Column({ type: 'integer' })
  height: number;

  @Column({ type: 'integer' })
  size: number;

  @Column({ type: 'text' })
  contentType: string;

  @ManyToOne(
    type => PostEntity,
    post => post.images
  )
  post: PostEntity;
}
