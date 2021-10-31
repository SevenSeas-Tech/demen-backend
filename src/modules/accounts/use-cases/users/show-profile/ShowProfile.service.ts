import { UserResponseDto } from '@accounts:dtos/users/UserResponse.dto';
import UserMap from '@accounts:mapper/User.map';
import Video from '@lessons:entities/Video';

// ---------------------------------------------------------------------------------------------- //

interface IRequestDto {
  user: {
    id: string;
    username: string;
    email: string;
    name: string;
    lastName: string;
    admin: boolean;
    verified: boolean;
    videos?: Video[];
    createdAt: Date;
    updatedAt: Date;
  };
}

// ---------------------------------------------------------------------------------------------- //
class ShowProfile {
  async execute(data: IRequestDto): Promise<UserResponseDto> {
    const { id, username, email, name, lastName, admin, verified, createdAt, updatedAt } =
      data.user;
    const user = {
      id,
      username,
      password: '',
      email,
      name,
      lastName,
      admin,
      verified,
      videos: [],
      createdAt,
      updatedAt
    };
    return UserMap.toDto(user);
  }
}

export default ShowProfile;
