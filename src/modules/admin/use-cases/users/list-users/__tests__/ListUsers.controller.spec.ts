import request from 'supertest';
import { Connection } from 'typeorm';

import createConnection from '@shared:typeorm/index';
import App from '@shared/infra/http/App';
// eslint-disable-next-line import-helpers/order-imports
import ProviderContainer from '@shared/containers/middlewares/Provider.container'; // ! after app

// ---------------------------------------------------------------------------------------------- //

describe('List Users Integration tests', () => {
  let connection: Connection;

  const hashProvider = new ProviderContainer().HashProvider;

  const username = 'administrator';
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

    console.log(session.body);

    const { token } = session.body;

    console.log(token);

    const response = await request(App)
      .get('/admin/users')
      .set({ authorization: `Bearer ${token}` });

    // const body = response;
    // console.log(body);

    expect(response.status).toEqual(201);
  });
});
