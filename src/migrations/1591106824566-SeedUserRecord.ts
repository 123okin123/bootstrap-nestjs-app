import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { UserEntity } from 'src/users/user.entity';

export class SeedUserRecord1591106824566 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = getRepository(UserEntity).create({
      username: 'niko',
      password: 'v%re$1%3432F'
    });

    await getRepository(UserEntity).save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // getRepository(UserEntity).delete()
  }
}
