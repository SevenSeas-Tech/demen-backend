import { User } from '@accounts:entities/User';
import { FakeUsersRepository } from '@accounts:irepos/fake/FakeUsers.repository';
import { IUsersRepository } from '@accounts:irepos/IUsers.repository';
import { UpdateUserService } from '@accounts:use-cases/users/update-user/UpdateUser.service';
import { FakeValidationProvider } from '@shared:providers/validation-provider/FakeValidation.provider';
import { IValidationProvider } from '@shared:providers/validation-provider/IValidation.provider';

// ---------------------------------------------------------------------------------------------- //
// TODO: these tests must be refactored!!

describe('Update Employee', () => {
  const email = 'foobar@example.com';
  const name = 'foo';
  const lastName = 'bar';
  const newName = 'foot';
  const newLastName = 'barr';
  const avatar = 'avatar';
  const googleId = 'googleId';

  let usersRepository: IUsersRepository;
  let validationProvider: IValidationProvider;
  let updateUser: UpdateUserService;
  let user: User;

  // -------------------------------------------------------------------------------------------- //

  beforeEach(async () => {
    usersRepository = new FakeUsersRepository();
    validationProvider = new FakeValidationProvider();

    updateUser = new UpdateUserService(usersRepository, validationProvider);

    user = await usersRepository.create({ name, lastName, email, avatar, googleId });
  });

  // -------------------------------------------------------------------------------------------- //

  it('should update user name', async () => {
    const validateData = jest.spyOn(validationProvider, 'validateUserUpdateData');

    await updateUser.execute({ id: user.id, name: newName, lastName });

    const updatedUser = await usersRepository.findById(user.id);

    expect(updatedUser?.name).toEqual(newName);

    expect(updatedUser?.lastName).toEqual(lastName);

    expect(validateData).toBeCalled();
  });

  // -------------------------------------------------------------------------------------------- //

  it('should update user last name', async () => {
    const validateData = jest.spyOn(validationProvider, 'validateUserUpdateData');

    await updateUser.execute({ id: user.id, name, lastName: newLastName });

    const updatedUser = await usersRepository.findById(user.id);

    expect(updatedUser?.name).toEqual(name);
    expect(updatedUser?.lastName).toEqual(newLastName);

    expect(validateData).toBeCalled();
  });

  // -------------------------------------------------------------------------------------------- //

  it('should update user without spaces in names', async () => {
    await updateUser.execute({
      id: user.id,
      name: ' foot ',
      lastName: ' barr '
    });

    const updatedUser = await usersRepository.findById(user.id);

    expect(updatedUser?.name).toEqual(newName);
    expect(updatedUser?.lastName).toEqual(newLastName);
  });

  // -------------------------------------------------------------------------------------------- //

  it('should update user with lower letters only in names', async () => {
    await updateUser.execute({
      id: user.id,
      name: 'Foot',
      lastName: 'Barr'
    });

    const updatedUser = await usersRepository.findById(user.id);

    expect(updatedUser?.name).toEqual(newName);
    expect(updatedUser?.lastName).toEqual(newLastName);
  });
});
