import { Base } from 'src/base.entity';
import { ImageEntity } from 'src/image-upload/image.entity';
import { UserEntity } from 'src/users/user.entity';
import { Entity, ManyToOne, OneToMany, Column } from 'typeorm';

@Entity('posts')
export class PostEntity extends Base {
  @Column({ default: '' })
  description: string;

  @ManyToOne(
    type => UserEntity,
    user => user.posts
  )
  user: UserEntity;

  @OneToMany(
    type => ImageEntity,
    image => image.post
  )
  images: ImageEntity[];
}
