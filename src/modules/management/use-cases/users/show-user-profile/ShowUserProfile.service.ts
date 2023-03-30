import { inject, injectable } from 'tsyringe';
import { validate } from 'uuid';

import { UserResponseDto } from '@accounts:dtos/users/UserResponse.dto';
import { IUsersRepository } from '@accounts:irepos/IUsers.repository';
import { UserMap } from '@accounts:mapper/User.map';
import { NotFoundError } from '@shared/infra/http/middlewares/errors/NotFound.error';

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
      throw new NotFoundError();
    }

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundError();
    }

    return UserMap.toDto(user);
  }
}
