import { UserResponseDto } from '@accounts:dtos/users/UserResponse.dto';
import User from '@accounts:entities/User';

class UserMap {
  static toDto({
    id,
    username,
    email,
    name,
    lastName,
    verified,
    createdAt,
    updatedAt
  }: User): UserResponseDto {
    const user = {
      id,
      username,
      email,
      name,
      lastName,
      verified,
      createdAt,
      updatedAt
    };

    return user;
  }
}

export default UserMap;
