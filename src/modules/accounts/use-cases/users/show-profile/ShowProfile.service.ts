import { inject, injectable } from 'tsyringe';

import { UserResponseDto } from '@accounts:dtos/users/UserResponse.dto';
import IUsersRepository from '@accounts:irepos/IUsers.repository';
import UserMap from '@accounts:mapper/User.map';
import { Uuid } from '@accounts:types/users/User';
import NotFoundError from '@shared/infra/http/middlewares/errors/NotFound.error';

@injectable()
class ShowProfile {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: Uuid): Promise<UserResponseDto> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundError();
    }

    return UserMap.toDto(user);
  }
}

export default ShowProfile;
