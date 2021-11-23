import { container } from 'tsyringe';

import Jwt from './token-provider/implementations/Jwt.provider';
import { ITokenProvider } from './token-provider/IToken.provider';

container.registerSingleton<ITokenProvider>('TokenProvider', Jwt);
