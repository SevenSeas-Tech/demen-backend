import request from 'supertest';
import { Connection } from 'typeorm';

import { User } from '@accounts:entities/User';
import createConnection from '@shared:typeorm/index';
import App from '@shared/infra/http/App';
// eslint-disable-next-line import-helpers/order-imports
import { ProviderFactory } from '@shared/containers/factories/Provider.factory';
// ! ---- Factory must be after App ------------------------------------------------------------- //

// TODO: implement tests

describe('Show user profile controller', () => {
  let connection: Connection;
  const hashProvider = new ProviderFactory().HashProvider;

  const username = 'admin';
  const adminName = 'admin';
  const email = 'admin@admin.com';
  const password = 'Password12';
  const phone = '99 99999 9999';

  const name = 'foo';
  const lastName = 'bar';
  const googleId = 'googleId';
  const avatar = 'avatar';

  let users: User[];

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

    await connection.query(
      `INSERT INTO employees (username, email, name, last_name, password, phone)
    values ('${username}', '${email}', '${adminName}', '${adminName}', '${passwordHash}', '${phone}')`
    );

    users = await connection.query(`SELECT * FROM users WHERE google_id='${googleId}'`);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  // -------------------------------------------------------------------------------------------- //

  it('should show users profile to admin', async () => {
    const session = await request(App)
      .post('/accounts/sessions/employees')
      .send({ email, password });
    const authorization = `Bearer ${session.body.token}`;

    const user = users[0];

    const response = await request(App).get(`/accounts/users/${user.id}`).set({ authorization });

    const { body } = response;

    expect(response.status).toEqual(201);

    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('googleId');
    expect(body).toHaveProperty('email');
    expect(body).toHaveProperty('avatar');
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('lastName');
  });

  it('should not show user profile inexistent user', async () => {
    const session = await request(App)
      .post('/accounts/sessions/employees')
      .send({ email, password });

    const authorization = `Bearer ${session.body.token}`;

    const invalidId = 'ffffffff-ffff-ffff-ffff-ffffaaaaffff';

    const response = await request(App).get(`/accounts/users/${invalidId}`).set({ authorization });

    const { body } = response;

    expect(response.status).toEqual(404);
    expect(body.message).toEqual('Not Found!');
  });

  it('should not show profile of invalid uuid', async () => {
    const session = await request(App)
      .post('/accounts/sessions/employees')
      .send({ email, password });
    const authorization = `Bearer ${session.body.token}`;

    const invalidId = 'invalid-id';

    const response = await request(App).get(`/accounts/users/${invalidId}`).set({ authorization });

    const { body } = response;

    expect(response.status).toEqual(404);
    expect(body.message).toEqual('Not Found!');
  });

  it('TODO: should show users profile to user', async () => {
    expect(true);
  });

  // -------------------------------------------------------------------------------------------- //

  it('TODO: should not return profile of unauthenticated user', async () => {
    expect(true);
    // const response = await request(App).get('/accounts/users/profile');

    // const { body } = response;
    // expect(response.status).toEqual(401);
    // expect(body).toHaveProperty('message');
    // expect(body.message).toEqual('Unauthorized!');
    // expect(body).toHaveProperty('status');
    // expect(body.status).toEqual('error');
  });
});
