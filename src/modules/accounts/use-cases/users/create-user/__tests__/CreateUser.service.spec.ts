import FakeUsersRepository from '@accounts:irepos/fake/FakeUsers.repository';
import IUsersRepository from '@accounts:irepos/IUsers.repository';
import CreateUser from '@accounts:use-cases/users/create-user/CreateUser.service';
import IHashProvider from '@shared/containers/providers/hash-provider/IHash.provider';
import FakeHashProvider from '@shared/containers/providers/hash-provider/implementations/FakeHash.provider';
import FakeValidationProvider from '@shared/containers/providers/validation-provider/FakeValidation.provider';
import IValidationProvider from '@shared/containers/providers/validation-provider/IValidation.provider';

import EmailInUseError from '../errors/EmailInUse.error';
import UsernameTakenError from '../errors/UsernameTaken.error';

// ---------------------------------------------------------------------------------------------- //

describe('Create User Service', () => {
  let createUser: CreateUser;
  let hashProvider: IHashProvider;
  let validationProvider: IValidationProvider;
  let usersRepository: IUsersRepository;

  const name = 'foo';
  const email = 'foo@bar.com';
  const lastName = 'bar';
  const password = 'Password12';
  const username = 'foobar';

  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    validationProvider = new FakeValidationProvider();

    createUser = new CreateUser(usersRepository, hashProvider, validationProvider);
  });

  // -------------------------------------------------------------------------------------------- //

  it('Should create a user', async () => {
    const hash = jest.spyOn(hashProvider, 'hash');
    const validateUser = jest.spyOn(validationProvider, 'validateUserCreationData');

    const user = await createUser.execute({
      email,
      name,
      lastName,
      password,
      username
    });

    expect(user).toHaveProperty('id');

    expect(user).toHaveProperty('username');
    expect(user.username).toEqual(username);

    expect(user).toHaveProperty('name');
    expect(user.name).toEqual(name);

    expect(user).toHaveProperty('lastName');
    expect(user.lastName).toEqual(lastName);

    expect(user).toHaveProperty('email');
    expect(user.email).toEqual(email);

    expect(user).toHaveProperty('createdAt');
    expect(user.createdAt).toBeTruthy();

    expect(user).toHaveProperty('updatedAt');
    expect(user.updatedAt).toBeTruthy();

    expect(hash).toHaveBeenCalled();
    expect(validateUser).toHaveBeenCalled();
  });

  // -------------------------------------------------------------------------------------------- //

  it('should not create if username is taken', async () => {
    await createUser.execute({
      email,
      name,
      lastName,
      password,
      username
    });

    expect(async () => {
      await createUser.execute({
        email: 'foo2@bar.com',
        name: 'Foo2',
        lastName: 'Bar2',
        password,
        username
      });
    }).rejects.toEqual(new UsernameTakenError());
  });

  // -------------------------------------------------------------------------------------------- //

  it('should not create if email is already in use', async () => {
    await createUser.execute({
      email,
      name,
      lastName,
      password,
      username
    });

    expect(async () => {
      await createUser.execute({
        email,
        name: 'Foo2',
        lastName: 'Bar2',
        password,
        username: 'foobar2'
      });
    }).rejects.toEqual(new EmailInUseError());
  });

  // *** ------------------------- String Validation ---------------------------------------- *** //

  it('should create user without spaces in names', async () => {
    const user = await createUser.execute({
      email,
      name: ' foo ',
      lastName: ' bar ',
      password,
      username: ' foobar '
    });

    expect(user.username).toEqual(username);
    expect(user.name).toEqual(name);
    expect(user.lastName).toEqual(lastName);
  });

  // -------------------------------------------------------------------------------------------- //

  it('should create user with lower letters only in names', async () => {
    const user = await createUser.execute({
      email,
      name: 'Foo',
      lastName: 'Bar',
      password,
      username
    });

    expect(user.name).toEqual(name);
    expect(user.lastName).toEqual(lastName);
  });
});
