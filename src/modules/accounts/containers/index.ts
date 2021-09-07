import { container } from 'tsyringe';

import IUsersRepository from '@accounts:irepos/IUsersRepository';
import UsersRepository from '@accounts:repos/UsersRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
