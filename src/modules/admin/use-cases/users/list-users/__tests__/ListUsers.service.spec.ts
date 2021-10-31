import FakeUsersRepository from '@accounts:irepos/fake/FakeUsers.repository';
import IUsersRepository from '@accounts:irepos/IUsers.repository';
import ListUsers from '@admin:use-cases/users/list-users/ListUsers.service';

describe('List Users', () => {
  const email = 'foobar@example.com';
  const name = 'foo';
  const lastName = 'bar';
  const password = 'Password12';
  const username = 'foobar';

  let usersRepository: IUsersRepository;
  let listUsers: ListUsers;

  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    listUsers = new ListUsers(usersRepository);
  });

  // -------------------------------------------------------------------------------------------- //

  it('should list all users', async () => {
    await usersRepository.create({ email, name, lastName, password, username });

    const users = await listUsers.execute();

    expect(users.length).toEqual(1);
    expect(users[0]).toHaveProperty('id');

    expect(users[0]).not.toHaveProperty('password');
    expect(users[0]).toHaveProperty('admin');

    expect(users[0]).toHaveProperty('createdAt');
    expect(users[0]).toHaveProperty('updatedAt');
  });

  // -------------------------------------------------------------------------------------------- //
});
