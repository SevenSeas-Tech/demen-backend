import CreateUser from '../CreateUser.service';

describe('Create User Controller', () => {
  let createUser: CreateUser;

  beforeEach(() => {
    createUser = new CreateUser();

    expect(createUser);
  });

  it('Should create a user', async () => {
    expect(true);
  });
});
