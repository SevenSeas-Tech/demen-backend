import request from 'supertest';
import { Connection } from 'typeorm';

import createConnection from '@shared:typeorm/index';
import App from '@shared/infra/http/App';

// ---------------------------------------------------------------------------------------------- //

// TODO: implement tests

describe('Show user profile', () => {
  let connection: Connection;

  // -------------------------------------------------------------------------------------------- //

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  // -------------------------------------------------------------------------------------------- //

  it('should show users profile', async () => {
    expect(1).toEqual(1);
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
