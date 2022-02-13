import '@accounts:containers/providers/';

import { container } from 'tsyringe';

import { IUsersRepository } from '@accounts:irepos/IUsers.repository';
import { UsersRepository } from '@accounts:repos/Users.repository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
