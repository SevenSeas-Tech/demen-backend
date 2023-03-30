import { FakeUsersRepository } from '@accounts:irepos/fake/FakeUsers.repository';
import { IUsersRepository } from '@accounts:irepos/IUsers.repository';

import { ListUsersService } from '../ListUsers.service';

describe('List Users Service', () => {
  const email = 'foobar@example.com';
  const name = 'foo';
  const lastName = 'bar';
  const avatar = 'avatar';
  const googleId = 'googleId';

  let usersRepository: IUsersRepository;
  let listUsers: ListUsersService;

  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    listUsers = new ListUsersService(usersRepository);
  });

  // -------------------------------------------------------------------------------------------- //

  it('should list all users', async () => {
    await usersRepository.create({ email, name, lastName, avatar, googleId });

    const users = await listUsers.execute();

    expect(users.length).toEqual(1);
    expect(users[0]).toHaveProperty('id');
    expect(users[0]).toHaveProperty('googleId');

    expect(users[0]).not.toHaveProperty('password');

    expect(users[0]).toHaveProperty('email');

    expect(users[0]).toHaveProperty('avatar');
    expect(users[0]).toHaveProperty('name');
    expect(users[0]).toHaveProperty('lastName');

    expect(users[0]).toHaveProperty('createdAt');
    expect(users[0]).toHaveProperty('updatedAt');
  });
});
