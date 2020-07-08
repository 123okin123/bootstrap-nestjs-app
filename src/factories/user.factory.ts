import { UserEntity } from '../users/user.entity';
import { define } from 'typeorm-seeding';
import Faker from 'faker';

define(UserEntity, (faker: typeof Faker) => {
  const gender = faker.random.number(1);
  const firstName = faker.name.firstName(gender);
  const lastName = faker.name.lastName(gender);

  const user = new UserEntity();
  user.email = `${firstName}.${lastName}@email.com`;
  user.firstName = firstName;
  user.lastName = lastName;
  user.password = '12345678';
  // user.password = faker.random.word();
  return user;
});
