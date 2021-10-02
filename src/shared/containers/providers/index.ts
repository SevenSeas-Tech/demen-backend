import { container } from 'tsyringe';

import IHashProvider from './hash-provider/IHash.provider';
import BcryptProvider from './hash-provider/implementations/Bcrypt.provider';
import Yup from './validation-provider/implementations/Yup.provider';
import IValidationProvider from './validation-provider/IValidation.provider';

// ---------------------------------------------------------------------------------------------- //

container.registerSingleton<IHashProvider>('HashProvider', BcryptProvider);

container.registerSingleton<IValidationProvider>('ValidationProvider', Yup);
