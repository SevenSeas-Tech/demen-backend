import { validate } from 'uuid';

import FakeTokenProvider from '@accounts:containers/providers/token-provider/implementations/FakeToken.provider';
import ITokenProvider from '@accounts:containers/providers/token-provider/IToken.provider';
import User from '@accounts:entities/User';
import FakeUsersRepository from '@accounts:irepos/fake/FakeUsers.repository';
import IUsersRepository from '@accounts:irepos/IUsers.repository';
import IHashProvider from '@shared/containers/providers/hash-provider/IHash.provider';
import FakeHashProvider from '@shared/containers/providers/hash-provider/implementations/FakeHash.provider';

import CreateSession from '../CreateSession.service';

describe('Create session', () => {
  let usersRepository: IUsersRepository;
  let tokenProvider: ITokenProvider;
  let hashProvider: IHashProvider;
  let createSession: CreateSession;
  let user: User;

  beforeEach(async () => {
    usersRepository = new FakeUsersRepository();
    tokenProvider = new FakeTokenProvider();
    hashProvider = new FakeHashProvider();
    createSession = new CreateSession(usersRepository, tokenProvider, hashProvider);

    user = await usersRepository.create({
      username: 'username',
      name: 'Foo',
      lastName: 'Bar',
      email: 'foobar@example.com',
      password: 'password',
    });
  });

  it('should create a session', async () => {
    const { email, password } = user;

    const session = await createSession.execute({ email, password });

    const isUuid = validate(session.user.id);

    expect(session).toHaveProperty('token');
    expect(session).toHaveProperty('user');
    expect(session.user).toHaveProperty('id');
    expect(isUuid).toEqual(true);
    expect(session.user).toHaveProperty('email');
    expect(session.user.email).toEqual(email);
    expect(session.user).toHaveProperty('username');
    expect(session.user.username).toEqual(user.username);
    expect(session.user).toHaveProperty('createdAt');
    expect(session.user).toHaveProperty('updatedAt');
  });
});
