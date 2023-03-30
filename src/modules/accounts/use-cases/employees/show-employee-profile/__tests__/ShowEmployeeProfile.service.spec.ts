import { Employee } from '@accounts:entities/Employee';
import { FakeEmployeesRepository } from '@accounts:irepos/fake/FakeEmployees.repository';
import { IEmployeesRepository } from '@accounts:irepos/IEmployees.repository';
import { NotFoundError } from '@shared/infra/http/middlewares/errors/NotFound.error';

import { ShowEmployeeProfileService } from '../ShowEmployeeProfile.service';

// ---------------------------------------------------------------------------------------------- //

describe('Show Employee Profile Service', () => {
  let showEmployeeProfile: ShowEmployeeProfileService;
  let employeesRepository: IEmployeesRepository;
  let employee: Employee;

  beforeEach(async () => {
    employeesRepository = new FakeEmployeesRepository();
    showEmployeeProfile = new ShowEmployeeProfileService(employeesRepository);

    employee = await employeesRepository.create({
      name: 'foo',
      lastName: 'bar',
      email: 'foobar@example.com',
      password: 'Password14',
      username: 'foobar',
      phone: '99 99999 9999'
    });
  });

  // -------------------------------------------------------------------------------------------- //

  it('should return employee profile', async () => {
    const profile = await showEmployeeProfile.execute({ id: employee.id });

    expect(profile).toHaveProperty('id');
    expect(profile.id).toEqual(employee.id);

    expect(profile).toHaveProperty('username');
    expect(profile.username).toEqual(employee.username);

    expect(profile).not.toHaveProperty('password');

    expect(profile).toHaveProperty('name');
    expect(profile.name).toEqual(employee.name);

    expect(profile).toHaveProperty('lastName');
    expect(profile.lastName).toEqual(employee.lastName);

    expect(profile).toHaveProperty('phone');
    expect(profile.phone).toEqual(employee.phone);

    expect(profile).toHaveProperty('email');
    expect(profile.email).toEqual(employee.email);

    expect(profile).toHaveProperty('createdAt');
    expect(profile).toHaveProperty('updatedAt');
  });

  it('should not return inexistent user profile', async () => {
    expect(async () => {
      await showEmployeeProfile.execute({ id: 'ffffaaaa-ffff-ffff-ffff-ffffaaaaffff' });
    }).rejects.toEqual(new NotFoundError());
  });

  it('should not show profile of invalid id', async () => {
    expect(async () => {
      await showEmployeeProfile.execute({ id: 'invalid-id' });
    }).rejects.toEqual(new NotFoundError());
  });
});
