import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@accounts:irepos/IUsers.repository';
import { AdminUserResponseDto } from '@admin:dtos/users/AdminUserResponse.dto';
import AdminUserMap from '@admin:mapper/AdminUser.map';

// ---------------------------------------------------------------------------------------------- //

@injectable()
class ListUsers {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(): Promise<AdminUserResponseDto[]> {
    const users = await this.usersRepository.findAll();

    const mappedUsers = users.map(user => {
      return AdminUserMap.toDto(user);
    });

    return mappedUsers;
  }
}

// ---------------------------------------------------------------------------------------------- //

export default ListUsers;
