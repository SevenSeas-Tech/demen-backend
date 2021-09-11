import request from 'supertest';
import { Connection } from 'typeorm';
import { validate } from 'uuid';

import createConnection from '@shared:typeorm/index';
import App from '@shared/infra/http/App';

describe('Create Session Controller', () => {
  let connection: Connection;

  const username = 'foobar';
  const name = 'Foo';
  const lastName = 'Bar';
  const email = 'foobar@example.com';
  const password = 'Password12';

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    await request(App).post('/accounts/users').send({
      username,
      name,
      lastName,
      email,
      password,
    });
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should create a session', async () => {
    const response = await request(App).post('/accounts/sessions').send({ email, password });

    const { user, token } = response.body;

    const isUuid = validate(user.id);

    expect(response.status).toEqual(201);

    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('token');
    expect(token).toBeTruthy();

    expect(user).toHaveProperty('id');
    expect(isUuid).toBeTruthy();

    expect(user).toHaveProperty('username');
    expect(user.username).toEqual(username);

    expect(user).toHaveProperty('name');
    expect(user.name).toEqual(name);

    expect(user).toHaveProperty('lastName');
    expect(user.lastName).toEqual(lastName);

    expect(user).toHaveProperty('email');
    expect(user.email).toEqual(email);

    expect(user).toHaveProperty('createdAt');
    expect(user.createdAt).toBeTruthy();
    expect(user).toHaveProperty('updatedAt');
    expect(user.updatedAt).toBeTruthy();
  });

  it('should not create session with invalid email', async () => {
    const email = 'foobar2@example.com';

    const response = await request(App).post('/accounts/sessions').send({ email, password });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Incorrect password or email');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  it('should not create session with invalid password', async () => {
    const password = 'Password14';

    const response = await request(App).post('/accounts/sessions').send({ email, password });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Incorrect password or email');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  it('should not create session if password validation failed', async () => {
    const password = 'password12';

    const response = await request(App).post('/accounts/sessions').send({ email, password });
    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Incorrect password or email');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  it('should not create session if email validation failed', async () => {
    const email = 'invalid-email';

    const response = await request(App).post('/accounts/sessions').send({ email, password });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Incorrect password or email');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });
});
