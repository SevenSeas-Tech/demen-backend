import '@management:containers/providers/';

import { container } from 'tsyringe';
import { EmployeesRepository } from '@management:repos/Employees.repository';
import { UsersRepository } from '@management:repos/Users.repository';

import type { IEmployeesRepository } from '@management:irepos/IEmployees.repository';
import type { IUsersRepository } from '@management:irepos/IUsers.repository';

// * ---------------------------------------------------------------------- * //

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

container.registerSingleton<IEmployeesRepository>('EmployeesRepository', EmployeesRepository);
