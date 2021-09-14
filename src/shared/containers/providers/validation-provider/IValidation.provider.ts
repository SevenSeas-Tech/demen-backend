import { CreateUserDto } from '@accounts:dtos/users/CreateUser.dto';
import { LoginCredentials } from '@accounts:types/sessions/Sessions';

interface IValidationProvider {
  validateLogin(credentials: LoginCredentials): Promise<boolean>;
  validateUser(userData: CreateUserDto): Promise<boolean>;
}

export default IValidationProvider;
