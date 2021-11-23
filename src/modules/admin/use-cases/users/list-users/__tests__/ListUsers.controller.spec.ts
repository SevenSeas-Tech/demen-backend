import request from 'supertest';
import { Connection } from 'typeorm';

import createConnection from '@shared:typeorm/index';
import App from '@shared/infra/http/App';
// eslint-disable-next-line import-helpers/order-imports
import ProviderContainer from '@shared/containers/middlewares/Provider.container';
// ! --- Provider Container must be imported after app ---------------------------------------- ! //

// ---------------------------------------------------------------------------------------------- //

describe('List Users Integration tests', () => {
  let connection: Connection;

  const hashProvider = new ProviderContainer().HashProvider;

  const username = 'admin';
  const name = 'admin';
  const lastName = 'admin';
  const email = 'admin@example.com';
  const password = 'Password12';

  // -------------------------------------------------------------------------------------------- //

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const passwordHash = await hashProvider.hash(password);

    await connection.query(
      `INSERT INTO USERS (name, last_name, password, admin, email, username)
        values('${name}', '${lastName}', '${passwordHash}', true, '${email}', '${username}')
      `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  // -------------------------------------------------------------------------------------------- //

  it('should list all users', async () => {
    const session = await request(App).post('/accounts/sessions').send({
      email,
      password
    });

    const { token } = session.body;

    const response = await request(App)
      .get('/admin/users')
      .set({ authorization: `Bearer ${token}` });

    const { body } = response;

    expect(response.status).toEqual(201);
    expect(body.length).toEqual(1);
    expect(body[0]).not.toHaveProperty('password');
    expect(body[0]).toHaveProperty('admin');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should not list users to non admin user', async () => {
    const email = 'foobar@example.com';

    await request(App).post('/accounts/users').send({
      name: 'foo',
      lastName: 'bar',
      email,
      username: 'foobar',
      password
    });

    const session = await request(App).post('/accounts/sessions').send({
      email,
      password
    });

    const { token } = session.body;

    const response = await request(App)
      .get('/admin/users')
      .set({ authorization: `Bearer ${token}` });

    const { body } = response;

    expect(response.status).toEqual(404);
    expect(body.status).toEqual('error');
    expect(body.message).toEqual('Not Found!');
  });

  // -------------------------------------------------------------------------------------------- //
  it('should not list users to unauthenticated user', async () => {
    const response = await request(App).get('/admin/users');

    const { body } = response;

    expect(response.status).toEqual(401);
    expect(body.status).toEqual('error');
    expect(body.message).toEqual('Unauthorized!');
  });
});
