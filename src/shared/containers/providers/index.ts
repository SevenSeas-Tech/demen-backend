import { container } from 'tsyringe';

import IHashProvider from './hash-provider/IHash.provider';
import Bcrypt from './hash-provider/implementations/Bcrypt.provider';

container.registerSingleton<IHashProvider>('HashProvider', Bcrypt);
