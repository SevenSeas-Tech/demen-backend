import { ShowEmployeeProfileService } from '../ShowEmployeeProfile.service';

// ---------------------------------------------------------------------------------------------- //

describe('Show Employee Profile Service', () => {
  let showEmployeeProfile: ShowEmployeeProfileService;

  const employee = {
    id: 'id',
    name: 'foo',
    lastName: 'bar',
    email: 'foobar@example.com',
    password: 'Password14',
    username: 'foobar',
    phone: '99 99999 9999',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(async () => {
    showEmployeeProfile = new ShowEmployeeProfileService();
  });

  // -------------------------------------------------------------------------------------------- //

  it('should return employee profile', async () => {
    const profile = await showEmployeeProfile.execute({ employee });

    expect(profile).toHaveProperty('id');
    expect(profile.id).toEqual(employee.id);

    expect(profile).toHaveProperty('username');
    expect(profile.username).toEqual(employee.username);

    expect(profile).not.toHaveProperty('password');
    expect(profile).not.toHaveProperty('admin');

    expect(profile).toHaveProperty('name');
    expect(profile.name).toEqual(employee.name);

    expect(profile).toHaveProperty('lastName');
    expect(profile.lastName).toEqual(employee.lastName);

    expect(profile).toHaveProperty('email');
    expect(profile.email).toEqual(employee.email);

    expect(profile).toHaveProperty('createdAt');
    expect(profile).toHaveProperty('updatedAt');
  });
});
