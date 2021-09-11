import { container } from 'tsyringe';

import IHashProvider from './hash-provider/IHash.provider';
import Bcrypt from './hash-provider/implementations/Bcrypt.provider';
import Yup from './validation-provider/implementations/Yup.provider';
import IValidationProvider from './validation-provider/IValidation.provider';

container.registerSingleton<IHashProvider>('HashProvider', Bcrypt);

container.registerSingleton<IValidationProvider>('ValidationProvider', Yup);
