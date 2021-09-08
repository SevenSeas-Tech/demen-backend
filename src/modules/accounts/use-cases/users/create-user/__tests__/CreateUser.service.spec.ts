import FakeUsersRepository from '@accounts:irepos/fake/FakeUsersRepository';
import IUsersRepository from '@accounts:irepos/IUsersRepository';
import CreateUser from '@accounts:use-cases/users/create-user/CreateUser.service';
import IHashProvider from '@shared/containers/providers/hash-provider/IHashProvider';

// TODO: Implement tests

describe('Create User Service', () => {
  let createUser: CreateUser;
  let hashProvider: IHashProvider;
  let usersRepository: IUsersRepository;

  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    createUser = new CreateUser(usersRepository, hashProvider);

    expect(createUser);
  });

  it('Should create a user', async () => {
    expect(true);
  });
});
