import { UserResponseDto } from '@accounts:dtos/users/UserResponse.dto';
import { User } from '@accounts:entities/User';

class UserMap {
  static toDto({
    id,
    googleId,
    email,
    avatar,
    name,
    lastName,
    createdAt,
    updatedAt
  }: User): UserResponseDto {
    const user = {
      id,
      googleId,
      email,
      avatar,
      name,
      lastName,
      createdAt,
      updatedAt
    };

    return user;
  }
}

export { UserMap };
