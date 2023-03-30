import request from 'supertest';
import { Connection } from 'typeorm';

import createConnection from '@shared:typeorm/index';
import App from '@shared/infra/http/App';
// eslint-disable-next-line import-helpers/order-imports
import { ProviderFactory } from '@shared/containers/factories/Provider.factory';
// ! ---- Provider Factory must be imported after app ----------------------------------------- ! //

describe('List Users Integration tests', () => {
  let connection: Connection;

  const hashProvider = new ProviderFactory().HashProvider;

  const username = 'foobar';
  const name = 'foo';
  const lastName = 'bar';
  const email = 'foobar@example.com';
  const password = 'Password12';
  const phone = '99 99999 9999';

  const googleId = 'googleId';
  const avatar = 'avatar';

  // -------------------------------------------------------------------------------------------- //

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const passwordHash = await hashProvider.hash(password);

    await connection.query(
      `INSERT INTO users (name, last_name, google_id, email, avatar)
        values('${name}', '${lastName}', '${googleId}', '${email}', '${avatar}')
      `
    );

    await connection.query(`INSERT INTO employees (username, email, name, last_name, password, phone)
    VALUES ('${username}', '${email}', '${name}', '${lastName}', '${passwordHash}', '${phone}')`);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  // -------------------------------------------------------------------------------------------- //

  it('should list all users', async () => {
    const session = await request(App).post('/accounts/sessions/employees').send({
      email,
      password
    });

    const authorization = `Bearer ${session.body.token}`;

    const response = await request(App).get('/accounts/users').set({ authorization });

    const { body } = response;

    expect(response.status).toEqual(201);
    expect(body.length).toEqual(1);
    expect(body[0]).not.toHaveProperty('password');
    expect(body[0]).toHaveProperty('googleId');
    expect(body[0]).toHaveProperty('avatar');
    expect(body[0]).toHaveProperty('name');
    expect(body[0]).toHaveProperty('lastName');
  });

  // -------------------------------------------------------------------------------------------- //
  it('TODO: should not list users to another user', async () => {
    expect(true);
  });

  // -------------------------------------------------------------------------------------------- //
  it('should not list users to unauthenticated employee', async () => {
    const response = await request(App).get('/accounts/users');

    const { body } = response;

    expect(response.status).toEqual(401);
    expect(body.status).toEqual('error');
    expect(body.message).toEqual('Unauthorized!');
  });
});
