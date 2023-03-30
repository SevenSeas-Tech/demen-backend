import request from 'supertest';
import { Connection } from 'typeorm';

import createConnection from '@shared:typeorm/index';
import App from '@shared/infra/http/App';
// eslint-disable-next-line import-helpers/order-imports
import { ProviderFactory } from '@shared/containers/factories/Provider.factory';
// ! ---- Provider Factory must be imported after app ----------------------------------------- ! //

// ---------------------------------------------------------------------------------------------- //

describe('List Employees Controller', () => {
  let connection: Connection;

  const hashProvider = new ProviderFactory().HashProvider;

  const username = 'admin';
  const name = 'admin';
  const lastName = 'admin';
  const email = 'admin@example.com';
  const password = 'Password12';
  const phone = '99 99999 9999';

  // -------------------------------------------------------------------------------------------- //

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const passwordHash = await hashProvider.hash(password);

    await connection.query(
      `INSERT INTO EMPLOYEES (name, last_name, password, email, username, phone)
        values('${name}', '${lastName}', '${passwordHash}', '${email}', '${username}', '${phone}')
      `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  // -------------------------------------------------------------------------------------------- //

  it('should list all employees', async () => {
    const session = await request(App).post('/accounts/sessions/employees').send({
      email,
      password
    });

    const { token } = session.body;

    const response = await request(App)
      .get('/accounts/employees')
      .set({ authorization: `Bearer ${token}` });

    const { body } = response;

    expect(response.status).toEqual(201);
    expect(body.length).toEqual(1);
    expect(body[0]).not.toHaveProperty('password');

    expect(body[0]).toHaveProperty('id');
    expect(body[0]).toHaveProperty('username');
    expect(body[0]).toHaveProperty('name');
    expect(body[0]).toHaveProperty('lastName');
    expect(body[0]).toHaveProperty('phone');
    expect(body[0]).toHaveProperty('email');
  });

  // -------------------------------------------------------------------------------------------- //
  it('should not list employees to unauthenticated employee', async () => {
    const response = await request(App).get('/accounts/employees');

    const { body } = response;

    expect(response.status).toEqual(401);
    expect(body.status).toEqual('error');
    expect(body.message).toEqual('Unauthorized!');
  });
});
