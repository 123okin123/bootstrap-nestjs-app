import { Base } from 'src/base.entity';
import { ImageEntity } from 'src/image-upload/image.entity';
import { UserEntity } from 'src/users/user.entity';
import { Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('posts')
export class PostEntity extends Base {
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
