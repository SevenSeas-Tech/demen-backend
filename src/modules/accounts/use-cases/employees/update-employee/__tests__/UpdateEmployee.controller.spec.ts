import request from 'supertest';
import { Connection } from 'typeorm';

import createConnection from '@shared:typeorm/index';
import App from '@shared/infra/http/App';
// eslint-disable-next-line import-helpers/order-imports
import { ProviderFactory } from '@shared/containers/factories/Provider.factory';
// ! ---- Provider Factory must be imported after app ------------------------------------------- //

// todo: these tests must be refactored

describe('Update Employee Controller', () => {
  let connection: Connection;

  const hashProvider = new ProviderFactory().HashProvider;

  const name = 'foo';
  const email = 'foo@bar.com';
  const lastName = 'bar';
  const password = 'Password12';
  const username = 'foobar';
  const phone = '99 99999 9999';

  const authorize = async () => {
    const session = await request(App)
      .post('/accounts/sessions/employees')
      .send({ email, password });

    const authorization = `Bearer ${session.body.token}`;
    const { employee } = session.body;

    return { authorization, employee };
  };

  // -------------------------------------------------------------------------------------------- //
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const passwordHash = await hashProvider.hash(password);

    await connection.query(`INSERT INTO employees (username, email, name, last_name, password, phone)
    VALUES ('${username}', '${email}', '${name}', '${lastName}', '${passwordHash}', '${phone}')`);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  // -------------------------------------------------------------------------------------------- //

  it('should update employee name', async () => {
    const name = 'foo2';

    const { authorization, employee } = await authorize();

    const response = await request(App)
      .patch('/accounts/employees/profile')
      .send({ name, lastName })
      .set({ authorization });

    const profile = await request(App).get('/accounts/employees/profile').set({ authorization });

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

    const { authorization, employee } = await authorize();

    const response = await request(App)
      .patch('/accounts/employees/profile')
      .send({ name, lastName })
      .set({ authorization });

    const profile = await request(App).get('/accounts/employees/profile').set({ authorization });

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

  // *** ---- Session Validation ------------------------------------------------------------ *** //

  it('should not update unauthenticated employee', async () => {
    const response = await request(App)
      .patch('/accounts/employees/profile')
      .send({ name, lastName });

    const { body } = response;

    expect(response.status).toEqual(401);

    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Unauthorized!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // *** ---- Missing Data ------------------------------------------------------------------ *** //

  it('should not update employee when name is missing', async () => {
    const lastName = 'bar3';

    const { authorization } = await authorize();

    const response = await request(App)
      .patch('/accounts/employees/profile')
      .send({ lastName })
      .set({ authorization });

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

    const { authorization } = await authorize();

    const response = await request(App)
      .patch('/accounts/employees/profile')
      .send({ name })
      .set({ authorization });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid data!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // *** ---- Data Correction --------------------------------------------------------------- *** //

  it('should update employee without spaces in names', async () => {
    const name = ' foo3 ';
    const lastName = ' bar3 ';

    const { authorization, employee } = await authorize();

    const response = await request(App)
      .patch('/accounts/employees/profile')
      .send({ name, lastName })
      .set({ authorization });

    const profile = await request(App).get('/accounts/employees/profile').set({ authorization });

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

    const { authorization, employee } = await authorize();

    const response = await request(App)
      .patch('/accounts/employees/profile')
      .send({ name, lastName })
      .set({ authorization });

    const profile = await request(App).get('/accounts/employees/profile').set({ authorization });

    const { body } = profile;

    expect(response.status).toEqual(204);

    expect(body.name).toEqual('foo4');
    expect(body.lastName).toEqual('bar4');
    expect(body.updatedAt).not.toEqual(employee.updatedAt);
  });

  // *** ---- Data Validation --------------------------------------------------------------- *** //

  it('should not update employee with name length < 3', async () => {
    const { authorization } = await authorize();

    const response = await request(App)
      .patch('/accounts/employees/profile')
      .send({ name: 'ab', lastName })
      .set({ authorization });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid data!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });

  // -------------------------------------------------------------------------------------------- //

  it('should not update employee with last name length < 3', async () => {
    const { authorization } = await authorize();

    const response = await request(App)
      .patch('/accounts/employees/profile')
      .send({ name, lastName: 'ab' })
      .set({ authorization });

    const { body } = response;

    expect(response.status).toEqual(400);
    expect(body).toHaveProperty('message');
    expect(body.message).toEqual('Invalid data!');
    expect(body).toHaveProperty('status');
    expect(body.status).toEqual('error');
  });
});
