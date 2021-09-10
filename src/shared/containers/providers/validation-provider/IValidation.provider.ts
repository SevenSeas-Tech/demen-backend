import { CreateUserDto } from '@accounts:dtos/users/CreateUser.dto';
import { LoginCredentials } from '@accounts:types/sessions/Sessions';

interface IValidationProvider {
  validateLogin(credentials: LoginCredentials): boolean;
  validateUser(userData: CreateUserDto): boolean;
}

export default IValidationProvider;
