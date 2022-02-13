import { inject, injectable } from 'tsyringe';
import { validate } from 'uuid';

import { UserResponseDto } from '@accounts:dtos/users/UserResponse.dto';
import { IUsersRepository } from '@accounts:irepos/IUsers.repository';
import { UserMap } from '@accounts:mapper/User.map';

import { UserNotFoundError } from './errors/UserNotFound.error';

// ---------------------------------------------------------------------------------------------- //

interface IRequestDto {
  id: string;
}

// ---------------------------------------------------------------------------------------------- //
@injectable()
export class ShowUserProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: IRequestDto): Promise<UserResponseDto> {
    const { id } = data;

    const isUuid = validate(id);

    if (!isUuid) {
      throw new UserNotFoundError();
    }

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return UserMap.toDto(user);
  }
}
