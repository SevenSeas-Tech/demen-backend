import { FakeUsersRepository } from '@accounts:irepos/fake/FakeUsers.repository';
import { IUsersRepository } from '@accounts:irepos/IUsers.repository';

import { CreateUserSessionService } from '../CreateUserSession.service';

// ---------------------------------------------------------------------------------------------- //

describe('Create session', () => {
  let usersRepository: IUsersRepository;
  let createSession: CreateUserSessionService;

  const name = 'Foo';
  const lastName = 'Bar';
  const email = 'foobar@example.com';
  const googleId = 'googleId';
  const avatar = 'avatar';

  beforeEach(async () => {
    usersRepository = new FakeUsersRepository();

    createSession = new CreateUserSessionService(usersRepository);
    console.log(createSession);
    await usersRepository.create({
      name,
      lastName,
      email,
      avatar,
      googleId
    });
  });

  // -------------------------------------------------------------------------------------------- //

  it('should create a session', async () => {
    // const validateCredentials = jest.spyOn(validationProvider, 'validateLogin');
    // const match = jest.spyOn(hashProvider, 'match');
    // const session = await createSession.execute();
    // const { user, token } = session;
    // const isUuid = validate(session.user.id);
    // expect(validateCredentials).toHaveBeenCalled();
    // expect(match).toHaveBeenCalled();
    // expect(session).toHaveProperty('user');
    // expect(session).toHaveProperty('token');
    // expect(token).toBeTruthy();
    // expect(user).toHaveProperty('id');
    // expect(isUuid).toBeTruthy();
    // expect(user).not.toHaveProperty('password');
    // expect(user).not.toHaveProperty('admin');
    // expect(user).toHaveProperty('username');
    // expect(user.username).toEqual(username);
    // expect(user).toHaveProperty('name');
    // expect(user.name).toEqual(name);
    // expect(user).toHaveProperty('lastName');
    // expect(user.lastName).toEqual(lastName);
    // expect(user).toHaveProperty('email');
    // expect(user.email).toEqual(email);
    // expect(user).toHaveProperty('createdAt');
    // expect(user.createdAt).toBeTruthy();
    // expect(user).toHaveProperty('updatedAt');
    // expect(user.updatedAt).toBeTruthy();
  });

  // -------------------------------------------------------------------------------------------- //

  it('should create session with invalid email', async () => {
    // const email = 'invalid-email';
    // expect(async () => {
    //   await createSession.execute({ email, password });
    // }).rejects.toEqual(new InvalidCredentialsError());
  });
});
