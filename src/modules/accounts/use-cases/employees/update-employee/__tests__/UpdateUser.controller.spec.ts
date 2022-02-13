import request from 'supertest';
import { Connection } from 'typeorm';

import createConnection from '@shared:typeorm/index';
import App from '@shared/infra/http/App';

// ---------------------------------------------------------------------------------------------- //
// todo: these tests must be refactored

describe('Update Employee Controller', () => {
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

  it('should update employee name', async () => {
    const name = 'foo2';

    const session = await request(App).post('/accounts/sessions').send({ email, password });

    const { employee, token } = session.body;

    const response = await request(App)
      .patch('/accounts/users/profile')
      .send({ name, lastName })
      .set({ Authorization: `Bearer ${token}` });

    const profile = await request(App)
      .get('/accounts/users/profile')
      .set({ Authorization: `Bearer ${token}` });

    const { body } = profile;

    expect(response.status).toEqual(204);

    expect(body.id).toEqual(employee.id);
    expect(body.email).toEqual(employee.email);
    expect(body.username).toEqual(employee.username);
    expect(body.name).toEqual(name);
    expect(body.lastName).toEqual(employee.lastName);
    expect(body.createdAt).toEqual(employee.createdAt);
    expect(body.updatedAt).not.toEqual(employee.updatedAt);
  });

  // -------------------------------------------------------------------------------------------- //

  it('should update employee last name', async () => {
    const name = 'foo2'; // * Modified on last test * //
    const lastName = 'bar2';

    const session = await request(App).post('/accounts/sessions').send({ email, password });

    const { employee, token } = session.body;

    const response = await request(App)
      .patch('/accounts/users/profile')
      .send({ name, lastName })
      .set({ Authorization: `Bearer ${token}` });

    const profile = await request(App)
      .get('/accounts/users/profile')
      .set({ Authorization: `Bearer ${token}` });

    const { body } = profile;

    expect(response.status).toEqual(204);

    expect(body.id).toEqual(employee.id);
    expect(body.email).toEqual(employee.email);
    expect(body.username).toEqual(employee.username);
    expect(body.name).toEqual(employee.name);
    expect(body.lastName).toEqual(lastName);
    expect(body.createdAt).toEqual(employee.createdAt);
    expect(body.updatedAt).not.toEqual(employee.updatedAt);
  });

  // *** ---------------------- Session Validation ------------------------------------------ *** //

  it('should not update unauthenticated employee', async () => {
    const response = await request(App).patch('/accounts/users/profile').send({ name, lastName });
    const { body } = response;

    expect(response.status).toEqual(401);

    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Unauthorized!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // *** ------------------------ Missing Data ---------------------------------------------- *** //

  it('should not update employee when name is missing', async () => {
    const lastName = 'bar3';

    const session = await request(App).post('/accounts/sessions').send({ email, password });

    const { token } = session.body;

    const response = await request(App)
      .patch('/accounts/users/profile')
      .send({ lastName })
      .set({ Authorization: `Bearer ${token}` });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid data!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should not update employee when last name is missing', async () => {
    const name = 'foo3';

    const session = await request(App).post('/accounts/sessions').send({ email, password });

    const { token } = session.body;

    const response = await request(App)
      .patch('/accounts/users/profile')
      .send({ name })
      .set({ Authorization: `Bearer ${token}` });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid data!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // *** ------------------------ Data Correction ------------------------------------------- *** //

  it('should update employee without spaces in names', async () => {
    const name = ' foo3 ';
    const lastName = ' bar3 ';

    const session = await request(App).post('/accounts/sessions').send({ email, password });

    const { employee, token } = session.body;

    const response = await request(App)
      .patch('/accounts/users/profile')
      .send({ name, lastName })
      .set({ Authorization: `Bearer ${token}` });

    const profile = await request(App)
      .get('/accounts/users/profile')
      .set({ Authorization: `Bearer ${token}` });

    const { body } = profile;

    expect(response.status).toEqual(204);

    expect(body.name).toEqual('foo3');
    expect(body.lastName).toEqual('bar3');
    expect(body.updatedAt).not.toEqual(employee.updatedAt);
  });

  // -------------------------------------------------------------------------------------------- //

  it('should update employee with lower letters only in names', async () => {
    const name = 'Foo4';
    const lastName = 'Bar4';

    const session = await request(App).post('/accounts/sessions').send({ email, password });

    const { employee, token } = session.body;

    const response = await request(App)
      .patch('/accounts/users/profile')
      .send({ name, lastName })
      .set({ Authorization: `Bearer ${token}` });

    const profile = await request(App)
      .get('/accounts/users/profile')
      .set({ Authorization: `Bearer ${token}` });

    const { body } = profile;

    expect(response.status).toEqual(204);

    expect(body.name).toEqual('foo4');
    expect(body.lastName).toEqual('bar4');
    expect(body.updatedAt).not.toEqual(employee.updatedAt);
  });

  // *** ------------------------ Data Validation ------------------------------------------- *** //

  it('should not update employee with name length < 3', async () => {
    const session = await request(App).post('/accounts/sessions').send({ email, password });

    const { token } = session.body;

    const response = await request(App)
      .patch('/accounts/users/profile')
      .send({ name: 'ab', lastName })
      .set({ Authorization: `Bearer ${token}` });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid data!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should not update employee with last name length < 3', async () => {
    const session = await request(App).post('/accounts/sessions').send({ email, password });

    const { token } = session.body;

    const response = await request(App)
      .patch('/accounts/users/profile')
      .send({ name, lastName: 'ab' })
      .set({ Authorization: `Bearer ${token}` });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid data!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });
});
