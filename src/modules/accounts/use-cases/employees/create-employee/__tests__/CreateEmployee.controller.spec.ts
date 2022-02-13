import request from 'supertest';
import { Connection } from 'typeorm';

import createConnection from '@shared:typeorm/index';
import { BcryptProvider } from '@shared/containers/providers/hash-provider/implementations/Bcrypt.provider';
import App from '@shared/infra/http/App';

// ---------------------------------------------------------------------------------------------- //

// TODO: Create tests for phone validation

describe('Create Employee Controller', () => {
  let connection: Connection;
  const hashProvider = new BcryptProvider();

  const name = 'foo';
  const email = 'foo@bar.com';
  const lastName = 'bar';
  const password = 'Password12';
  const username = 'foobar';
  const phone = '99 99999 9999';

  const adminEmail = 'admin@admin.com';

  const authorize = async () => {
    const session = await request(App)
      .post('/accounts/sessions/employees')
      .send({ email: adminEmail, password });
    const authorization = `Bearer ${session.body.token}`;

    return authorization;
  };

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    const adminPassword = await hashProvider.hash(password);

    await connection.query(`INSERT INTO employees (username, email, name, last_name, password, phone)
    VALUES ('admin', '${adminEmail}', 'admin', 'admin', '${adminPassword}', '${phone}')`);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  // *** ----  Employee Creation ------------------------------------------------------------ *** //
  it('Should create a employee', async () => {
    const authorization = await authorize();

    const response = await request(App)
      .post('/accounts/employees')
      .send({
        username,
        name,
        lastName,
        email,
        password,
        phone
      })
      .set({ authorization });

    const employee = response.body;

    expect(response.status).toEqual(201);

    expect(employee).toHaveProperty('username');
    expect(employee.username).toEqual(username);

    expect(employee).not.toHaveProperty('password');
    expect(employee).not.toHaveProperty('videos');

    expect(employee).toHaveProperty('name');
    expect(employee.name).toEqual(name);

    expect(employee).toHaveProperty('lastName');
    expect(employee.lastName).toEqual(lastName);

    expect(employee).toHaveProperty('email');
    expect(employee.email).toEqual(email);

    expect(employee).toHaveProperty('phone');
    expect(employee.phone).toEqual(phone);

    expect(employee).toHaveProperty('createdAt');
    expect(employee.createdAt).toBeTruthy();

    expect(employee).toHaveProperty('updatedAt');
    expect(employee.updatedAt).toBeTruthy();
  });

  // *** ---- Uniqueness Validation Tests --------------------------------------------------- *** //
  it('should not create employee if username is taken', async () => {
    const authorization = await authorize();

    const response = await request(App)
      .post('/accounts/employees')
      .send({
        username,
        name,
        lastName,
        email: `2${email}`,
        password,
        phone
      })
      .set({ authorization });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Username is already taken!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should not create employee if email is in use', async () => {
    const authorization = await authorize();

    const response = await request(App)
      .post('/accounts/employees')
      .send({
        username: `${username}2`,
        name,
        lastName,
        email,
        password,
        phone
      })
      .set({ authorization });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Email is already in use!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // *** ---- Email Validation Tests -------------------------------------------------------- *** //
  it('should not create employee with invalid email', async () => {
    const authorization = await authorize();

    const response = await request(App)
      .post('/accounts/employees')
      .send({
        username,
        name,
        lastName,
        email: 'invalid-email',
        password,
        phone
      })
      .set({ authorization });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid data!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should not create employee when email has spaces', async () => {
    const authorization = await authorize();

    const response = await request(App)
      .post('/accounts/employees')
      .send({
        username,
        name,
        lastName,
        email: ' foobar@example.com ',
        password,
        phone
      })
      .set({ authorization });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid data!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // *** ---- User Validation Tests --------------------------------------------------------- *** //
  it('should not create employee with username length < 5', async () => {
    const authorization = await authorize();

    const response = await request(App)
      .post('/accounts/employees')
      .send({
        username: 'abcd',
        name,
        lastName,
        email,
        password,
        phone
      })
      .set({ authorization });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid data!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should not create employee with username is bigger than 16 characters', async () => {
    const authorization = await authorize();

    const response = await request(App)
      .post('/accounts/employees')
      .send({
        username: 'foo_bar_huge_0017',
        name,
        lastName,
        email,
        password,
        phone
      })
      .set({ authorization });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid data!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should not create employee with username containing symbols', async () => {
    const authorization = await authorize();

    const response = await request(App)
      .post('/accounts/employees')
      .send({
        username: 'foobar_?',
        name,
        lastName,
        email,
        password,
        phone
      })
      .set({ authorization });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid data!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should not create employee with username starting with number', async () => {
    const authorization = await authorize();

    const response = await request(App)
      .post('/accounts/employees')
      .send({
        username: '3foobar',
        name,
        lastName,
        email,
        password,
        phone
      })
      .set({ authorization });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid data!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should not create employee when username has more than one word', async () => {
    const authorization = await authorize();

    const response = await request(App)
      .post('/accounts/employees')
      .send({
        username: 'foobar bar',
        name,
        lastName,
        email,
        password
      })
      .set({ authorization });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid data!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // *** ---- Name Validation Tests --------------------------------------------------------- *** //
  it('should not create employee with name length < 3', async () => {
    const authorization = await authorize();

    const response = await request(App)
      .post('/accounts/employees')
      .send({
        username,
        name: 'ab',
        lastName,
        email,
        password,
        phone
      })
      .set({ authorization });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid data!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should not create employee with last name length < 3', async () => {
    const authorization = await authorize();

    const response = await request(App)
      .post('/accounts/employees')
      .send({
        username,
        name,
        lastName: 'ab',
        email,
        password,
        phone
      })
      .set({ authorization });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid data!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should create employee without spaces on names', async () => {
    const authorization = await authorize();

    const email = 'nospaces@names.com';

    const response = await request(App)
      .post('/accounts/employees')
      .send({
        username: 'foobar_space',
        name: ' foo ',
        lastName: ' bar ',
        email,
        password,
        phone
      })
      .set({ authorization });

    const employee = response.body;

    expect(response.status).toEqual(201);
    expect(employee.name).toEqual(name);
    expect(employee.lastName).toEqual(lastName);
  });

  // -------------------------------------------------------------------------------------------- //

  it('should create employee using lower letters on names', async () => {
    const authorization = await authorize();

    const username = 'foobar_cap';
    const email = 'nocapitalized@names.com';
    const response = await request(App)
      .post('/accounts/employees')
      .send({
        username,
        name: 'Foo',
        lastName: 'Bar',
        email,
        password,
        phone
      })
      .set({ authorization });

    const employee = response.body;

    expect(response.status).toEqual(201);

    expect(employee.name).toEqual(name);
    expect(employee.lastName).toEqual(lastName);
  });

  // *** ---- Password Validation ----------------------------------------------------------- *** //
  it('should not create employee when password has no numbers', async () => {
    const authorization = await authorize();

    const response = await request(App)
      .post('/accounts/employees')
      .send({
        username,
        name,
        lastName,
        email,
        password: 'Password',
        phone
      })
      .set({ authorization });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid data!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should not create employee when password has no capitalized letters', async () => {
    const authorization = await authorize();

    const response = await request(App)
      .post('/accounts/employees')
      .send({
        username,
        name,
        lastName,
        email,
        password: 'password14',
        phone
      })
      .set({ authorization });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid data!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should not create employee when password has length < 6', async () => {
    const authorization = await authorize();

    const response = await request(App)
      .post('/accounts/employees')
      .send({
        username,
        name,
        lastName,
        email,
        password: 'Less6',
        phone
      })
      .set({ authorization });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid data!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should not create employee when password has length > 16', async () => {
    const authorization = await authorize();

    const response = await request(App)
      .post('/accounts/employees')
      .send({
        username,
        name,
        lastName,
        email,
        password: 'HugePassword00017',
        phone
      })
      .set({ authorization });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid data!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should not create employee when password has 3 repeated', async () => {
    const authorization = await authorize();

    const response = await request(App)
      .post('/accounts/employees')
      .send({
        username,
        name,
        lastName,
        email,
        password: 'Password111',
        phone
      })
      .set({ authorization });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid data!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });
});
