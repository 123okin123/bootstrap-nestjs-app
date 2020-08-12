import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Base } from 'src/base.entity';

@Entity('posts')
export class PostEntity extends Base {}
