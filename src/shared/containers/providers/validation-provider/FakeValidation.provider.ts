import { CreateUserDto } from '@accounts:dtos/users/CreateUser.dto';
import { LoginCredentials } from '@accounts:types/sessions/Sessions';

import IValidationProvider from './IValidation.provider';

class FakeValidationProvider implements IValidationProvider {
  async validateLogin(_: LoginCredentials): Promise<boolean> {
    return true;
  }

  async validateUser(_: CreateUserDto): Promise<boolean> {
    return true;
  }

  trimStrings(strings: string[]): string[] {
    return strings.map(string => string.trim());
  }
}

export default FakeValidationProvider;
