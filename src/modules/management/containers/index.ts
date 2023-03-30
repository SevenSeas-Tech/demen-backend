import '@accounts:containers/providers/';

import { container } from 'tsyringe';

import { IEmployeesRepository } from '@accounts:irepos/IEmployees.repository';
import { IUsersRepository } from '@accounts:irepos/IUsers.repository';
import { EmployeesRepository } from '@accounts:repos/Employees.repository';
import { UsersRepository } from '@accounts:repos/Users.repository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

container.registerSingleton<IEmployeesRepository>('EmployeesRepository', EmployeesRepository);
