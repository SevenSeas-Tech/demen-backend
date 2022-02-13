import request from 'supertest';
import { Connection } from 'typeorm';

import { Employee } from '@accounts:entities/Employee';
import createConnection from '@shared:typeorm/index';
import App from '@shared/infra/http/App';
// eslint-disable-next-line import-helpers/order-imports
import { ProviderFactory } from '@shared/containers/factories/Provider.factory';

// ! ---- Factory must come after App ----------------------------------------------------------- //

describe('Update Employee Controller', () => {
  let connection: Connection;
  const hashProvider = new ProviderFactory().HashProvider;

  const name = 'foo';
  const email = 'foo@bar.com';
  const lastName = 'bar';
  const password = 'Password12';
  const username = 'foobar';
  const phone = '99 99999 9999';

  let employee: Employee;

  // -------------------------------------------------------------------------------------------- //

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const passwordHash = await hashProvider.hash(password);

    await connection.query(`INSERT INTO employees (username, email, name, last_name, password, phone)
    VALUES ('${username}', '${email}', '${name}', '${lastName}', '${passwordHash}', '${phone}')`);

    employee = await connection.query(`SELECT * FROM employees WHERE username='${username}'`);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  // -------------------------------------------------------------------------------------------- //

  it('should show employee profile', async () => {
    const session = await request(App).post('/accounts/sessions/employees').send({
      email,
      password
    });

    const { employee, token } = session.body;

    const response = await request(App)
      .get(`/accounts/employees/${employee.id}`)
      .set({ authorization: `Bearer ${token}` });

    const { body } = response;

    expect(response.status).toEqual(201);
    expect(body).toHaveProperty('id');
    expect(body.id).toEqual(employee.id);

    expect(body).not.toHaveProperty('password');

    expect(body).toEqual(employee);
  });

  // -------------------------------------------------------------------------------------------- //

  it('should not return profile of unauthenticated user', async () => {
    const response = await request(App).get(`/accounts/employees/${employee.id}`);

    const { body } = response;
    expect(response.status).toEqual(401);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Unauthorized!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });
});
