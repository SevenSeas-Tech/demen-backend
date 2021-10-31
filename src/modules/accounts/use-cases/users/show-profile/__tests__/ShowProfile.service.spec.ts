import ShowProfile from '@accounts:use-cases/users/show-profile/ShowProfile.service';

// ---------------------------------------------------------------------------------------------- //

describe('Show Profile Service', () => {
  let showProfile: ShowProfile;

  const user = {
    id: 'id',
    name: 'foo',
    lastName: 'bar',
    email: 'foobar@example.com',
    password: 'Password14',
    username: 'foobar',
    admin: false,
    verified: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(async () => {
    showProfile = new ShowProfile();
  });

  // -------------------------------------------------------------------------------------------- //

  it('should return user profile', async () => {
    const profile = await showProfile.execute({ user });

    expect(profile).toHaveProperty('id');
    expect(profile.id).toEqual(user.id);

    expect(profile).toHaveProperty('username');
    expect(profile.username).toEqual(user.username);

    expect(profile).not.toHaveProperty('password');
    expect(profile).not.toHaveProperty('admin');

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
