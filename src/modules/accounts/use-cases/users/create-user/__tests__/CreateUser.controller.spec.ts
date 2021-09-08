import request from 'supertest';

import App from '@shared/infra/http/App';

// TODO: Implement tests

describe('Create User Controller', () => {
  beforeAll(() => {
    request(App);
  });

  it('Should create a user', async () => {
    expect(true);
  });
});
