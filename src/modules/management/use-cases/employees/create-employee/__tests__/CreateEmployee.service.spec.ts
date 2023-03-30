import { EmailInUseError } from '@accounts:errors/EmailInUse.error';
import { FakeEmployeesRepository } from '@accounts:irepos/fake/FakeEmployees.repository';
import { IEmployeesRepository } from '@accounts:irepos/IEmployees.repository';
import { IHashProvider } from '@shared/containers/providers/hash-provider/IHash.provider';
import { FakeHashProvider } from '@shared/containers/providers/hash-provider/implementations/FakeHash.provider';
import { FakeValidationProvider } from '@shared/containers/providers/validation-provider/FakeValidation.provider';
import { IValidationProvider } from '@shared/containers/providers/validation-provider/IValidation.provider';

import { CreateEmployeeService } from '../CreateEmployee.service';
import { UsernameTakenError } from '../errors/UsernameTaken.error';

// ---------------------------------------------------------------------------------------------- //

// Todo: Create a tests for phone validation

describe('Create Employee Service', () => {
  let createEmployee: CreateEmployeeService;
  let hashProvider: IHashProvider;
  let validationProvider: IValidationProvider;
  let employeesRepository: IEmployeesRepository;

  const name = 'foo';
  const email = 'foo@bar.com';
  const lastName = 'bar';
  const password = 'Password12';
  const username = 'foobar';
  const phone = '(51) 99999-9999';

  beforeEach(() => {
    employeesRepository = new FakeEmployeesRepository();
    hashProvider = new FakeHashProvider();
    validationProvider = new FakeValidationProvider();

    createEmployee = new CreateEmployeeService(
      employeesRepository,
      hashProvider,
      validationProvider
    );
  });

  // -------------------------------------------------------------------------------------------- //

  it('Should create a employee', async () => {
    const hash = jest.spyOn(hashProvider, 'hash');
    const validateUser = jest.spyOn(validationProvider, 'validateEmployeeCreationData');

    const employee = await createEmployee.execute({
      email,
      name,
      lastName,
      password,
      username,
      phone
    });

    expect(employee).toHaveProperty('id');

    expect(employee).not.toHaveProperty('password');
    expect(employee).not.toHaveProperty('videos');

    expect(employee).toHaveProperty('username');
    expect(employee.username).toEqual(username);

    expect(employee).toHaveProperty('name');
    expect(employee.name).toEqual(name);

    expect(employee).toHaveProperty('lastName');
    expect(employee.lastName).toEqual(lastName);

    expect(employee).toHaveProperty('phone');
    expect(employee.phone).toEqual(phone);

    expect(employee).toHaveProperty('email');
    expect(employee.email).toEqual(email);

    expect(employee).toHaveProperty('createdAt');
    expect(employee.createdAt).toBeTruthy();

    expect(employee).toHaveProperty('updatedAt');
    expect(employee.updatedAt).toBeTruthy();

    expect(hash).toHaveBeenCalled();
    expect(validateUser).toHaveBeenCalled();
  });

  // -------------------------------------------------------------------------------------------- //

  it('should not create employee if username is taken', async () => {
    await createEmployee.execute({
      email,
      name,
      lastName,
      password,
      username,
      phone
    });

    expect(async () => {
      await createEmployee.execute({
        email: 'foo2@bar.com',
        name: 'Foo2',
        lastName: 'Bar2',
        password,
        username,
        phone
      });
    }).rejects.toEqual(new UsernameTakenError());
  });

  // -------------------------------------------------------------------------------------------- //

  it('should not create employee if email is already in use', async () => {
    await createEmployee.execute({
      email,
      name,
      lastName,
      password,
      username,
      phone
    });

    expect(async () => {
      await createEmployee.execute({
        email,
        name: 'Foo2',
        lastName: 'Bar2',
        password,
        username: 'foobar2',
        phone
      });
    }).rejects.toEqual(new EmailInUseError());
  });

  // *** ---- String Validation ------------------------------------------------------------- *** //

  it('should create employee without spaces in names', async () => {
    const employee = await createEmployee.execute({
      email,
      name: ' foo ',
      lastName: ' bar ',
      password,
      username: ' foobar ',
      phone
    });

    expect(employee.username).toEqual(username);
    expect(employee.name).toEqual(name);
    expect(employee.lastName).toEqual(lastName);
  });

  // -------------------------------------------------------------------------------------------- //

  it('should create employee with lower letters only in names', async () => {
    const employee = await createEmployee.execute({
      email,
      name: 'Foo',
      lastName: 'Bar',
      password,
      username,
      phone
    });

    expect(employee.name).toEqual(name);
    expect(employee.lastName).toEqual(lastName);
  });
});
