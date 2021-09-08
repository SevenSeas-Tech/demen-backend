import { container } from 'tsyringe';

import IHashProvider from '@shared:containers/providers/hash-provider/IHashProvider';
import Bcrypt from '@shared:containers/providers/hash-provider/implementations/Bcrypt';

container.registerSingleton<IHashProvider>('HashProvider', Bcrypt);
