import request from 'supertest';
import { Connection } from 'typeorm';
import { validate } from 'uuid';

import createConnection from '@shared:typeorm/index';
import App from '@shared/infra/http/App';
// eslint-disable-next-line import-helpers/order-imports
import { ProviderFactory } from '@shared/containers/factories/Provider.factory';
// ! ---- Provider Factory must be imported after app ------------------------------------------- //

describe('Create Employee Session Controller', () => {
  let connection: Connection;

  const hashProvider = new ProviderFactory().HashProvider;

  const username = 'foobar';
  const name = 'foo';
  const lastName = 'bar';
  const email = 'foobar@example.com';
  const password = 'Password12';
  const phone = '99 99999 9999';

  // -------------------------------------------------------------------------------------------- //

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const passwordHash = await hashProvider.hash(password);

    await connection.query(`INSERT INTO employees (username, email, name, last_name, password, phone)
    VALUES ('${username}', '${email}', '${name}', '${lastName}', '${passwordHash}', '${phone}')`);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  // -------------------------------------------------------------------------------------------- //

  it('should create a session', async () => {
    const response = await request(App)
      .post('/accounts/sessions/employees')
      .send({ email, password });

    const { employee, token } = response.body;

    const isUuid = validate(employee.id);

    expect(response.status).toEqual(201);

    expect(response.body).toHaveProperty('employee');
    expect(response.body).toHaveProperty('token');
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

  it('should not create session with invalid email', async () => {
    const email = 'foobar2@example.com';

    const response = await request(App)
      .post('/accounts/sessions/employees')
      .send({ email, password });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Incorrect password or email');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should not create session with invalid password', async () => {
    const password = 'Password14';

    const response = await request(App)
      .post('/accounts/sessions/employees')
      .send({ email, password });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Incorrect password or email');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should not create session if password validation failed', async () => {
    const password = 'password12';

    const response = await request(App)
      .post('/accounts/sessions/employees')
      .send({ email, password });
    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Incorrect password or email');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should not create session if email validation failed', async () => {
    const email = 'invalid-email';

    const response = await request(App)
      .post('/accounts/sessions/employees')
      .send({ email, password });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Incorrect password or email');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });
});
