import { CreateUserDto } from '@accounts:dtos/users/CreateUser.dto';
import { UpdateUserDto } from '@accounts:dtos/users/UpdateUser.dto';
import { LoginCredentials } from '@accounts:types/sessions/Sessions';

import IValidationProvider from './IValidation.provider';

class FakeValidationProvider implements IValidationProvider {
  async validateLogin(_: LoginCredentials): Promise<boolean> {
    return true;
  }

  async validateUserCreationData(_: CreateUserDto): Promise<boolean> {
    return true;
  }

  async validateUserUpdateData(_: UpdateUserDto): Promise<boolean> {
    return true;
  }
}

export default FakeValidationProvider;
