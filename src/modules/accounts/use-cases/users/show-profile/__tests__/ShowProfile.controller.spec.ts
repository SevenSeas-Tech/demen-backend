import request from 'supertest';
import { Connection } from 'typeorm';

import createConnection from '@shared:typeorm/index';
import App from '@shared/infra/http/App';

// ---------------------------------------------------------------------------------------------- //

describe('Create User Controller', () => {
  let connection: Connection;

  const name = 'foo';
  const email = 'foo@bar.com';
  const lastName = 'bar';
  const password = 'Password12';
  const username = 'foobar';

  // -------------------------------------------------------------------------------------------- //

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    await request(App).post('/accounts/users').send({
      username,
      name,
      lastName,
      email,
      password
    });
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  // -------------------------------------------------------------------------------------------- //

  it('should show users profile', async () => {
    const session = await request(App).post('/accounts/sessions').send({
      email,
      password
    });

    const { user, token } = session.body;

    const response = await request(App)
      .get('/accounts/users/profile')
      .set({ Authorization: `Bearer ${token}` });

    const { body } = response;

    expect(response.status).toEqual(201);

    expect(body).toHaveProperty('id');
    expect(body.id).toEqual(user.id);
    expect(body).toEqual(user);
  });

  // -------------------------------------------------------------------------------------------- //

  it('should not return profile of unauthenticated user', async () => {
    const response = await request(App).get('/accounts/users/profile');

    const { body } = response;
    expect(response.status).toEqual(401);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Unauthorized!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });
});
