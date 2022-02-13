import { validate } from 'uuid';

import FakeTokenProvider from '@accounts:containers/providers/token-provider/implementations/FakeToken.provider';
import { ITokenProvider } from '@accounts:containers/providers/token-provider/IToken.provider';
import { FakeEmployeesRepository } from '@accounts:irepos/fake/FakeEmployees.repository';
import { IEmployeesRepository } from '@accounts:irepos/IEmployees.repository';
import { InvalidCredentialsError } from '@accounts:use-cases/sessions/errors/InvalidCredentials.error';
import { IHashProvider } from '@shared/containers/providers/hash-provider/IHash.provider';
import { FakeHashProvider } from '@shared/containers/providers/hash-provider/implementations/FakeHash.provider';
import { FakeValidationProvider } from '@shared/containers/providers/validation-provider/FakeValidation.provider';
import { IValidationProvider } from '@shared/containers/providers/validation-provider/IValidation.provider';

import { CreateEmployeeSessionService } from '../CreateEmployeeSession.service';

// ---------------------------------------------------------------------------------------------- //

describe('Create session', () => {
  let employeesRepository: IEmployeesRepository;
  let tokenProvider: ITokenProvider;
  let hashProvider: IHashProvider;
  let validationProvider: IValidationProvider;
  let createSession: CreateEmployeeSessionService;

  const username = 'foobar';
  const name = 'Foo';
  const lastName = 'Bar';
  const email = 'foobar@example.com';
  const password = 'Password12';
  const phone = '99 99999 9999';

  beforeEach(async () => {
    employeesRepository = new FakeEmployeesRepository();
    tokenProvider = new FakeTokenProvider();
    hashProvider = new FakeHashProvider();
    validationProvider = new FakeValidationProvider();

    createSession = new CreateEmployeeSessionService(
      employeesRepository,
      tokenProvider,
      hashProvider,
      validationProvider
    );

    await employeesRepository.create({
      username,
      name,
      lastName,
      email,
      password,
      phone
    });
  });

  // -------------------------------------------------------------------------------------------- //

  it('should create a session', async () => {
    const validateCredentials = jest.spyOn(validationProvider, 'validateLogin');
    const match = jest.spyOn(hashProvider, 'match');

    const session = await createSession.execute({ email, password });

    const { employee, token } = session;
    const isUuid = validate(session.employee.id);

    expect(validateCredentials).toHaveBeenCalled();
    expect(match).toHaveBeenCalled();

    expect(session).toHaveProperty('user');
    expect(session).toHaveProperty('token');
    expect(token).toBeTruthy();

    expect(employee).toHaveProperty('id');
    expect(isUuid).toBeTruthy();

    expect(employee).not.toHaveProperty('password');
    expect(employee).not.toHaveProperty('admin');

    expect(employee).toHaveProperty('username');
    expect(employee.username).toEqual(username);

    expect(employee).toHaveProperty('name');
    expect(employee.name).toEqual(name);

    expect(employee).toHaveProperty('lastName');
    expect(employee.lastName).toEqual(lastName);

    expect(employee).toHaveProperty('email');
    expect(employee.email).toEqual(email);

    expect(employee).toHaveProperty('createdAt');
    expect(employee.createdAt).toBeTruthy();
    expect(employee).toHaveProperty('updatedAt');
    expect(employee.updatedAt).toBeTruthy();
  });

  // -------------------------------------------------------------------------------------------- //

  it('should create session with invalid email', async () => {
    const email = 'invalid-email';

    expect(async () => {
      await createSession.execute({ email, password });
    }).rejects.toEqual(new InvalidCredentialsError());
  });

  // -------------------------------------------------------------------------------------------- //

  it('should create session with invalid password', async () => {
    const password = 'invalid-password';

    expect(async () => {
      await createSession.execute({ email, password });
    }).rejects.toEqual(new InvalidCredentialsError());
  });
});
