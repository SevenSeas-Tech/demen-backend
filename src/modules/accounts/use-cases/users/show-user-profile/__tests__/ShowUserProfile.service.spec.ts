// ---------------------------------------------------------------------------------------------- //

import { ShowUserProfileService } from '../ShowUserProfile.service';

describe('Show Profile Service', () => {
  let showUserProfile: ShowUserProfileService;

  const user = {
    id: 'id',
    googleId: 'googleId',
    avatar: 'avatar',
    name: 'foo',
    lastName: 'bar',
    email: 'foobar@example.com',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(async () => {
    showUserProfile = new ShowUserProfileService();
  });

  // -------------------------------------------------------------------------------------------- //

  it('should return user profile', async () => {
    const profile = await showUserProfile.execute({ user });

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
});
