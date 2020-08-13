import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { UserRole } from 'src/auth/enum/user-role.enum';
import { UserStatus } from 'src/auth/enum/user-status.enum';
import { Base } from 'src/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { PostEntity } from 'src/posts/post.entity';

@Entity('users')
export class UserEntity extends Base {
  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  firstName: string;

  @Column({ type: 'varchar', nullable: false })
  lastName: string;

  @Exclude()
  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.PENDING })
  status: UserStatus;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(
    type => PostEntity,
    post => post.user
  )
  posts: PostEntity[];

  static async hashPassword(password): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
