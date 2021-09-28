import IUsersRepository from '@accounts:irepos/IUsers.repository';
import UsersRepository from '@accounts:repos/Users.repository';

class RepositoryContainer {
  UsersRepository: IUsersRepository;

  constructor() {
    this.UsersRepository = new UsersRepository();
  }
}

export default RepositoryContainer;
