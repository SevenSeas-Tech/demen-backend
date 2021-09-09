import { UserResponseDto } from '@accounts:dtos/users/UserResponse.dto';
import { Token } from '@accounts:types/tokens/Token';
import { Credentials } from '@accounts:types/users/User';

export type LoginCredentials = Pick<Credentials, 'username' | 'email' | 'password'>;

export type SessionResponse = {
  user: UserResponseDto;
  token: Token;
};
