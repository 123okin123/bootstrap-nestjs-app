import { Base } from 'src/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('images')
export class ImageEntity extends Base {
  @Column({ type: 'text' })
  url: string;
}
