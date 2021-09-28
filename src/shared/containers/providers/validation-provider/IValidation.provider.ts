import { CreateUserDto } from '@accounts:dtos/users/CreateUser.dto';
import { UpdateUserDto } from '@accounts:dtos/users/UpdateUser.dto';
import { LoginCredentials } from '@accounts:types/sessions/Sessions';

// ---------------------------------------------------------------------------------------------- //

interface IValidationProvider {
  validateLogin(credentials: LoginCredentials): Promise<boolean>;
  validateUserCreationData(userData: CreateUserDto): Promise<boolean>;
  validateUserUpdateData(data: UpdateUserDto): Promise<boolean>;
}

export default IValidationProvider;
