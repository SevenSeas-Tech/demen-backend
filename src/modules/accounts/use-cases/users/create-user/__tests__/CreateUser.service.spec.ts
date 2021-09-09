import FakeUsersRepository from '@accounts:irepos/fake/FakeUsers.repository';
import IUsersRepository from '@accounts:irepos/IUsers.repository';
import CreateUser from '@accounts:use-cases/users/create-user/CreateUser.service';
import IHashProvider from '@shared/containers/providers/hash-provider/IHash.provider';
import FakeHashProvider from '@shared/containers/providers/hash-provider/implementations/FakeHash.provider';

import EmailInUseError from '../errors/EmailInUse.error';
import UsernameTakenError from '../errors/UsernameTaken.error';

describe('Create User Service', () => {
  let createUser: CreateUser;
  let hashProvider: IHashProvider;
  let usersRepository: IUsersRepository;

  beforeEach(() => {
    // ! ---------------------- Providers e repositorios -------------------------------------- ! //

    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();

    // ! -------------------------------------------------------------------------------------- ! //

    createUser = new CreateUser(usersRepository, hashProvider);
  });

  it('Should create a user', async () => {
    const hash = jest.spyOn(hashProvider, 'hash');

    const user = await createUser.execute({
      email: 'foo@bar.com',
      name: 'Foo',
      lastName: 'Bar',
      password: 'secret',
      username: 'foobar',
    });

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('username');
    expect(user.username).toEqual('foobar');
    expect(user).toHaveProperty('name');
    expect(user.name).toEqual('Foo');
    expect(user).toHaveProperty('lastName');
    expect(user.lastName).toEqual('Bar');
    expect(user).toHaveProperty('email');
    expect(user.email).toEqual('foo@bar.com');
    expect(user).toHaveProperty('createdAt');
    expect(user).toHaveProperty('updatedAt');
    expect(hash).toHaveBeenCalled();
  });

  it('should not create if username is taken', async () => {
    await createUser.execute({
      email: 'foo@bar.com',
      name: 'Foo',
      lastName: 'Bar',
      password: 'secret',
      username: 'foobar',
    });

    expect(async () => {
      await createUser.execute({
        email: 'foo2@bar.com',
        name: 'Foo2',
        lastName: 'Bar2',
        password: 'secret',
        username: 'foobar',
      });
    }).rejects.toEqual(new UsernameTakenError());
  });

  it('should not create if email is already in use', async () => {
    await createUser.execute({
      email: 'foo@bar.com',
      name: 'Foo',
      lastName: 'Bar',
      password: 'secret',
      username: 'foobar',
    });

    expect(async () => {
      await createUser.execute({
        email: 'foo@bar.com',
        name: 'Foo2',
        lastName: 'Bar2',
        password: 'secret',
        username: 'foobar2',
      });
    }).rejects.toEqual(new EmailInUseError());
  });
});
