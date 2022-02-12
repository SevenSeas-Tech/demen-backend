import { IUsersRepository } from '@accounts:irepos/IUsers.repository';
import { UsersRepository } from '@accounts:repos/Users.repository';

class RepositoryFactory {
  UsersRepository: IUsersRepository;

  constructor() {
    this.UsersRepository = new UsersRepository();
  }
}

export { RepositoryFactory };
