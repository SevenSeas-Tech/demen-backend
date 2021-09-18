import User from '@accounts:entities/User';
import FakeUsersRepository from '@accounts:irepos/fake/FakeUsers.repository';
import IUsersRepository from '@accounts:irepos/IUsers.repository';
import NotFoundError from '@shared/infra/http/middlewares/errors/NotFound.error';

import ShowProfile from '../ShowProfile.service';

describe('Show Profile Service', () => {
  let usersRepository: IUsersRepository;
  let showProfile: ShowProfile;
  let user: User;

  beforeEach(async () => {
    usersRepository = new FakeUsersRepository();
    showProfile = new ShowProfile(usersRepository);

    user = await usersRepository.create({
      name: 'foo',
      lastName: 'bar',
      email: 'foobar@example.com',
      password: 'Password14',
      username: 'foobar'
    });
  });

  it('should return user profile', async () => {
    const profile = await showProfile.execute(user.id);

    expect(profile).toHaveProperty('id');
    expect(profile.id).toEqual(user.id);

    expect(profile).toHaveProperty('username');
    expect(profile.username).toEqual(user.username);

    expect(profile).toHaveProperty('name');
    expect(profile.name).toEqual(user.name);

    expect(profile).toHaveProperty('lastName');
    expect(profile.lastName).toEqual(user.last_name);

    expect(profile).toHaveProperty('email');
    expect(profile.email).toEqual(user.email);

    expect(profile).toHaveProperty('createdAt');
    expect(profile).toHaveProperty('updatedAt');
  });

  it('should not return profile if user does not exist', async () => {
    expect(async () => {
      await showProfile.execute('wrong-id');
    }).rejects.toEqual(new NotFoundError());
  });
});
