import { UserResponseDto } from '@accounts:dtos/users/UserResponse.dto';
import { UserMap } from '@accounts:mapper/User.map';

// ---------------------------------------------------------------------------------------------- //

interface IRequestDto {
  user: {
    id: string;
    googleId: string;
    avatar: string;
    email: string;
    name: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

// ---------------------------------------------------------------------------------------------- //
export class ShowUserProfileService {
  async execute(data: IRequestDto): Promise<UserResponseDto> {
    const { id, googleId, avatar, email, name, lastName, createdAt, updatedAt } = data.user;
    const user = {
      id,
      googleId,
      avatar,
      email,
      name,
      lastName,
      createdAt,
      updatedAt
    };
    return UserMap.toDto(user);
  }
}
