import { Seeder, Factory } from 'typeorm-seeding';

import { Connection } from 'typeorm';
import { UserEntity } from 'src/users/user.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(UserEntity)().createMany(10);
  }
}
