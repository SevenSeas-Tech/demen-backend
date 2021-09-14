import request from 'supertest';
import { Connection } from 'typeorm';

import createConnection from '@shared:typeorm/index';
import App from '@shared/infra/http/App';

let connection: Connection;

describe('Create User Controller', () => {
  const name = 'Foo';
  const email = 'foo@bar.com';
  const lastName = 'Bar';
  const password = 'Password12';
  const username = 'foobar';

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  // *** --------------------------------- User Creation ------------------------------------ *** //

  it('Should create a user', async () => {
    const response = await request(App).post('/accounts/users').send({
      username,
      name,
      lastName,
      email,
      password
    });

    const user = response.body;

    expect(response.status).toEqual(201);

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

  // *** ---------------------- Uniqueness Validation Tests --------------------------------- *** //

  it('should not create user if username is taken', async () => {
    const response = await request(App)
      .post('/accounts/users')
      .send({
        username,
        name,
        lastName,
        email: `2${email}`,
        password
      });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Username is already taken!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  it('should not create user if email is in use', async () => {
    const response = await request(App)
      .post('/accounts/users')
      .send({
        username: `${username}2`,
        name,
        lastName,
        email,
        password
      });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Email is already in use!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // *** ------------------------- String Validation Tests ---------------------------------- *** //

  it('should not create user with invalid email', async () => {
    const response = await request(App).post('/accounts/users').send({
      username,
      name,
      lastName,
      email: 'invalid-email',
      password
    });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid data!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  it('should not create user with name length < 3', async () => {
    const response = await request(App).post('/accounts/users').send({
      username,
      name: 'ab',
      lastName,
      email,
      password
    });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid data!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  it('should not create user with last name length < 3', async () => {
    const response = await request(App).post('/accounts/users').send({
      username,
      name,
      lastName: 'ab',
      email,
      password
    });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid data!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  it('should not create user with username length < 3', async () => {
    const response = await request(App)
      .post('/accounts/users')
      .send({
        username: 'ab',
        name,
        lastName,
        email: `s3${email}`,
        password
      });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid data!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  it('should not create user with spaces on names', async () => {
    const username = 'foobar-names';
    const email = 'nospaces@names.com';
    const response = await request(App).post('/accounts/users').send({
      username,
      name: ' Foo ',
      lastName: ' Bar ',
      email,
      password
    });

    const user = response.body;

    expect(response.status).toEqual(201);

    expect(user).toHaveProperty('username');
    expect(user.username).toEqual(username);

    expect(user).toHaveProperty('name');
    expect(user.name).toEqual(name);

    expect(user).toHaveProperty('lastName');
    expect(user.lastName).toEqual(lastName);

    expect(user).toHaveProperty('email');
    expect(user.email).toEqual(email);
  });

  it('should not create user with spaces on email', async () => {
    const response = await request(App).post('/accounts/users').send({
      username,
      name,
      lastName,
      email: ' foobar@example.com ',
      password
    });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid data!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // *** ------------------------ Password Validation --------------------------------------- *** //
  it('should not create user when password has no numbers', async () => {
    const response = await request(App).post('/accounts/users').send({
      username,
      name,
      lastName,
      email,
      password: 'Password'
    });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid data!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  it('should not create user when password has no capitalized letters', async () => {
    const response = await request(App).post('/accounts/users').send({
      username,
      name,
      lastName,
      email,
      password: 'password14'
    });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid data!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  it('should not create user when password has length < 6', async () => {
    const response = await request(App).post('/accounts/users').send({
      username,
      name,
      lastName,
      email,
      password: 'Less6'
    });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid data!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  it('should not create user when password has length > 16', async () => {
    const response = await request(App).post('/accounts/users').send({
      username,
      name,
      lastName,
      email,
      password: 'HugePassword00017'
    });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid data!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  it('should not create user when password has 3 repeated', async () => {
    const response = await request(App).post('/accounts/users').send({
      username,
      name,
      lastName,
      email,
      password: 'Password111'
    });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid data!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });
});
