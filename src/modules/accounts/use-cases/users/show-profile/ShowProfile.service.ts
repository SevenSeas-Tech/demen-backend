import { inject, injectable } from 'tsyringe';

import User from '@accounts:entities/User';
import IUsersRepository from '@accounts:irepos/IUsers.repository';
import { Uuid } from '@accounts:types/users/User';
import NotFoundError from '@shared/infra/http/middlewares/errors/NotFound.error';

@injectable()
class ShowProfile {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: Uuid): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundError();
    }

    return user;
  }
}

export default ShowProfile;
