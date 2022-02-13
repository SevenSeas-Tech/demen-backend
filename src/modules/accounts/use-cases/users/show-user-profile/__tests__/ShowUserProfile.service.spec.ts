import { User } from '@accounts:entities/User';
import { FakeUsersRepository } from '@accounts:irepos/fake/FakeUsers.repository';
import { IUsersRepository } from '@accounts:irepos/IUsers.repository';
import { ShowUserProfileService } from '@accounts:use-cases/users/show-user-profile/ShowUserProfile.service';
import { NotFoundError } from '@shared/infra/http/middlewares/errors/NotFound.error';

describe('Show Profile Service', () => {
  let showUserProfile: ShowUserProfileService;
  let usersRepository: IUsersRepository;

  const googleId = 'googleId';
  const avatar = 'avatar';
  const name = 'foo';
  const lastName = 'bar';
  const email = 'foobar@example.com';

  let user: User;

  beforeEach(async () => {
    usersRepository = new FakeUsersRepository();
    showUserProfile = new ShowUserProfileService(usersRepository);

    user = await usersRepository.create({ name, lastName, avatar, email, googleId });
  });

  // -------------------------------------------------------------------------------------------- //

  it('should return user profile', async () => {
    const profile = await showUserProfile.execute({ id: user.id });

    expect(profile).toHaveProperty('id');
    expect(profile.id).toEqual(user.id);

    expect(profile).toHaveProperty('name');
    expect(profile.name).toEqual(user.name);

    expect(profile).toHaveProperty('lastName');
    expect(profile.lastName).toEqual(user.lastName);

    expect(profile).toHaveProperty('email');
    expect(profile.email).toEqual(user.email);

    expect(profile).toHaveProperty('createdAt');
    expect(profile).toHaveProperty('updatedAt');
  });

  it('should not show profile of inexistent user', async () => {
    expect(async () => {
      await showUserProfile.execute({ id: 'id' });
    }).rejects.toEqual(new NotFoundError());
  });
});
