import { FakeEmployeesRepository } from '@accounts:irepos/fake/FakeEmployees.repository';
import { IEmployeesRepository } from '@accounts:irepos/IEmployees.repository';

import { ListEmployeesService } from '../ListEmployees.service';

// ---------------------------------------------------------------------------------------------- //
describe('List Employees', () => {
  const email = 'foobar@example.com';
  const name = 'foo';
  const lastName = 'bar';
  const username = 'foobar';
  const password = 'Password123';
  const phone = '99 99999 9999';

  let employeesRepository: IEmployeesRepository;
  let listEmployees: ListEmployeesService;

  beforeEach(() => {
    employeesRepository = new FakeEmployeesRepository();
    listEmployees = new ListEmployeesService(employeesRepository);
  });

  // -------------------------------------------------------------------------------------------- //

  it('should list all employees', async () => {
    await employeesRepository.create({ username, email, name, lastName, password, phone });

    const employees = await listEmployees.execute();

    expect(employees.length).toEqual(1);
    expect(employees[0]).toHaveProperty('id');

    expect(employees[0]).not.toHaveProperty('password');

    expect(employees[0]).toHaveProperty('phone');
    expect(employees[0]).toHaveProperty('username');
    expect(employees[0]).toHaveProperty('email');
    expect(employees[0]).toHaveProperty('name');
    expect(employees[0]).toHaveProperty('lastName');

    expect(employees[0]).toHaveProperty('createdAt');
    expect(employees[0]).toHaveProperty('updatedAt');
  });
});
