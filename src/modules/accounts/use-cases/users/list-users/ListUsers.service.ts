import { inject, injectable } from 'tsyringe';

import { UserResponseDto } from '@accounts:dtos/users/UserResponse.dto';
import { IUsersRepository } from '@accounts:irepos/IUsers.repository';
import { UserMap } from '@accounts:mapper/User.map';

// ---------------------------------------------------------------------------------------------- //

@injectable()
export class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(): Promise<UserResponseDto[]> {
    const users = await this.usersRepository.findAll();

    const mappedUsers = users.map(user => {
      return UserMap.toDto(user);
    });

    return mappedUsers;
  }
}
