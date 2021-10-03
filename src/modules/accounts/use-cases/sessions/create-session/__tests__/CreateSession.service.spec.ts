import { validate } from 'uuid';

import FakeTokenProvider from '@accounts:containers/providers/token-provider/implementations/FakeToken.provider';
import ITokenProvider from '@accounts:containers/providers/token-provider/IToken.provider';
import FakeUsersRepository from '@accounts:irepos/fake/FakeUsers.repository';
import IUsersRepository from '@accounts:irepos/IUsers.repository';
import IHashProvider from '@shared/containers/providers/hash-provider/IHash.provider';
import FakeHashProvider from '@shared/containers/providers/hash-provider/implementations/FakeHash.provider';
import FakeValidationProvider from '@shared/containers/providers/validation-provider/FakeValidation.provider';
import IValidationProvider from '@shared/containers/providers/validation-provider/IValidation.provider';

import CreateSession from '../CreateSession.service';
import InvalidCredentialsError from '../errors/InvalidCredentials.error';

// ---------------------------------------------------------------------------------------------- //

describe('Create session', () => {
  let usersRepository: IUsersRepository;
  let tokenProvider: ITokenProvider;
  let hashProvider: IHashProvider;
  let validationProvider: IValidationProvider;
  let createSession: CreateSession;

  const username = 'foobar';
  const name = 'Foo';
  const lastName = 'Bar';
  const email = 'foobar@example.com';
  const password = 'Password12';

  beforeEach(async () => {
    usersRepository = new FakeUsersRepository();
    tokenProvider = new FakeTokenProvider();
    hashProvider = new FakeHashProvider();
    validationProvider = new FakeValidationProvider();

    createSession = new CreateSession(
      usersRepository,
      tokenProvider,
      hashProvider,
      validationProvider
    );

    await usersRepository.create({
      username,
      name,
      lastName,
      email,
      password
    });
  });

  // -------------------------------------------------------------------------------------------- //

  it('should create a session', async () => {
    const validateCredentials = jest.spyOn(validationProvider, 'validateLogin');
    const match = jest.spyOn(hashProvider, 'match');

    const session = await createSession.execute({ email, password });

    const { user, token } = session;
    const isUuid = validate(session.user.id);

    expect(validateCredentials).toHaveBeenCalled();
    expect(match).toHaveBeenCalled();

    expect(session).toHaveProperty('user');
    expect(session).toHaveProperty('token');
    expect(token).toBeTruthy();

    expect(user).toHaveProperty('id');
    expect(isUuid).toBeTruthy();

    expect(user).not.toHaveProperty('password');
    expect(user).not.toHaveProperty('admin');

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
  });

  // -------------------------------------------------------------------------------------------- //

  it('should create session with invalid email', async () => {
    const email = 'invalid-email';

    expect(async () => {
      await createSession.execute({ email, password });
    }).rejects.toEqual(new InvalidCredentialsError());
  });

  // -------------------------------------------------------------------------------------------- //

  it('should create session with invalid password', async () => {
    const password = 'invalid-password';

    expect(async () => {
      await createSession.execute({ email, password });
    }).rejects.toEqual(new InvalidCredentialsError());
  });
});
