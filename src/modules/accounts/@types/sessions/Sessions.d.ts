import { UserResponseDto } from '@accounts:dtos/users/UserResponse.dto';
import { Token } from '@accounts:types/tokens/Token';
import { Credentials } from '@accounts:types/users/User';

export type EmployeeCredentials = Pick<Credentials, 'email' | 'password'>;

export type UserSessionResponse = {
  user: UserResponseDto;
  token: Token;
};

export type EmployeeSessionResponse = {
  employee: employeeResponseDto;
  token: Token;
};
