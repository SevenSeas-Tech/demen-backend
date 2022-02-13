import { IEmployeesRepository } from '@accounts:irepos/IEmployees.repository';
import { IUsersRepository } from '@accounts:irepos/IUsers.repository';
import { EmployeesRepository } from '@accounts:repos/Employees.repository';
import { UsersRepository } from '@accounts:repos/Users.repository';

class RepositoryFactory {
  UsersRepository: IUsersRepository;
  EmployeesRepository: IEmployeesRepository;

  constructor() {
    this.UsersRepository = new UsersRepository();
    this.EmployeesRepository = new EmployeesRepository();
  }
}

export { RepositoryFactory };
