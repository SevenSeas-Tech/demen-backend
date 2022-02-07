import request from 'supertest';
import { Connection } from 'typeorm';

import createConnection from '@shared:typeorm/index';
import App from '@shared/infra/http/App';

// ---------------------------------------------------------------------------------------------- //

describe('Create Employee Controller', () => {
  let connection: Connection;

  const name = 'foo';
  const email = 'foo@bar.com';
  const lastName = 'bar';
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
  it('Should create a employee', async () => {
    const response = await request(App).post('/accounts/users').send({
      username,
      name,
      lastName,
      email,
      password
    });

    const employee = response.body;

    expect(response.status).toEqual(201);

    expect(employee).toHaveProperty('username');
    expect(employee.username).toEqual(username);

    expect(employee).not.toHaveProperty('password');
    expect(employee).not.toHaveProperty('admin');
    expect(employee).not.toHaveProperty('videos');

    expect(employee).toHaveProperty('name');
    expect(employee.name).toEqual(name);

    expect(employee).toHaveProperty('lastName');
    expect(employee.lastName).toEqual(lastName);

    expect(employee).toHaveProperty('email');
    expect(employee.email).toEqual(email);

    // ! The property verified is undefined because it's generates on DB (same as id)! //
    // expect(employee).toHaveProperty('verified');
    // expect(employee.verified).toEqual(false);

    expect(employee).toHaveProperty('createdAt');
    expect(employee.createdAt).toBeTruthy();

    expect(employee).toHaveProperty('updatedAt');
    expect(employee.updatedAt).toBeTruthy();
  });

  // *** ---------------------- Uniqueness Validation Tests --------------------------------- *** //
  it('should not create employee if username is taken', async () => {
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

  // -------------------------------------------------------------------------------------------- //

  it('should not create employee if email is in use', async () => {
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

  // *** ------------------------- Email Validation Tests ---------------------------------- *** //
  it('should not create employee with invalid email', async () => {
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

  // -------------------------------------------------------------------------------------------- //

  it('should not create employee when email has spaces', async () => {
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

  // *** ------------------------- User Validation Tests ------------------------------------ *** //
  it('should not create employee with username length < 5', async () => {
    const response = await request(App).post('/accounts/users').send({
      username: 'abcd',
      name,
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

  // -------------------------------------------------------------------------------------------- //

  it('should not create employee with username is bigger than 16 characters', async () => {
    const response = await request(App).post('/accounts/users').send({
      username: 'foo_bar_huge_0017',
      name,
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

  // -------------------------------------------------------------------------------------------- //

  it('should not create employee with username containing symbols', async () => {
    const response = await request(App).post('/accounts/users').send({
      username: 'foobar_?',
      name,
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

  // -------------------------------------------------------------------------------------------- //

  it('should not create employee with username starting with number', async () => {
    const response = await request(App).post('/accounts/users').send({
      username: '3foobar',
      name,
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

  // -------------------------------------------------------------------------------------------- //

  it('should not create employee when username has more than one word', async () => {
    const response = await request(App).post('/accounts/users').send({
      username: 'foobar bar',
      name,
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

  // *** ------------------------- Name Validation Tests ------------------------------------ *** //
  it('should not create employee with name length < 3', async () => {
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

  // -------------------------------------------------------------------------------------------- //

  it('should not create employee with last name length < 3', async () => {
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

  // -------------------------------------------------------------------------------------------- //

  it('should create employee without spaces on names', async () => {
    const email = 'nospaces@names.com';

    const response = await request(App).post('/accounts/users').send({
      username: 'foobar_space',
      name: ' foo ',
      lastName: ' bar ',
      email,
      password
    });

    const employee = response.body;

    expect(response.status).toEqual(201);
    expect(employee.name).toEqual(name);
    expect(employee.lastName).toEqual(lastName);
  });

  // -------------------------------------------------------------------------------------------- //

  it('should create employee using lower letters on names', async () => {
    const username = 'foobar_cap';
    const email = 'nocapitalized@names.com';
    const response = await request(App).post('/accounts/users').send({
      username,
      name: 'Foo',
      lastName: 'Bar',
      email,
      password
    });

    const employee = response.body;

    expect(response.status).toEqual(201);

    expect(employee.name).toEqual(name);
    expect(employee.lastName).toEqual(lastName);
  });

  // *** ------------------------ Password Validation --------------------------------------- *** //
  it('should not create employee when password has no numbers', async () => {
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

  // -------------------------------------------------------------------------------------------- //

  it('should not create employee when password has no capitalized letters', async () => {
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

  // -------------------------------------------------------------------------------------------- //

  it('should not create employee when password has length < 6', async () => {
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

  // -------------------------------------------------------------------------------------------- //

  it('should not create employee when password has length > 16', async () => {
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

  // -------------------------------------------------------------------------------------------- //

  it('should not create employee when password has 3 repeated', async () => {
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
