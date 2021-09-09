import request from 'supertest';
import { Connection } from 'typeorm';

import createConnection from '@shared:typeorm/index';
import App from '@shared/infra/http/App';

let connection: Connection;

describe('Create User Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should create a user', async () => {
    const response = await request(App).post('/accounts/users').send({
      username: 'foobar',
      name: 'Foo',
      lastName: 'Bar',
      email: 'foobar@example.com',
      password: 'secret',
    });

    const user = response.body;

    expect(response.status).toEqual(201);
    expect(user).toHaveProperty('username');
    expect(user.username).toEqual('foobar');
    expect(user).toHaveProperty('name');
    expect(user.name).toEqual('Foo');
    expect(user).toHaveProperty('lastName');
    expect(user.lastName).toEqual('Bar');
    expect(user).toHaveProperty('email');
    expect(user.email).toEqual('foobar@example.com');
    expect(user).toHaveProperty('createdAt');
    expect(user).toHaveProperty('updatedAt');
  });

  it('should not create user if username is taken', async () => {
    await request(App).post('/accounts/users').send({
      username: 'foobar',
      name: 'Foo',
      lastName: 'Bar',
      email: 'foobar@example.com',
      password: 'secret',
    });

    const response = await request(App).post('/accounts/users').send({
      username: 'foobar',
      name: 'Foo',
      lastName: 'Bar',
      email: 'other@example.com',
      password: 'secret',
    });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Username is already taken!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  it('should not create user if email is in use', async () => {
    await request(App).post('/accounts/users').send({
      username: 'foobar',
      name: 'Foo',
      lastName: 'Bar',
      email: 'foobar@example.com',
      password: 'secret',
    });

    const response = await request(App).post('/accounts/users').send({
      username: 'other',
      name: 'Foo',
      lastName: 'Bar',
      email: 'foobar@example.com',
      password: 'secret',
    });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Email is already in use!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });
});
