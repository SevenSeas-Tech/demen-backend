import { container } from 'tsyringe';

import { JwtProvider } from './token-provider/implementations/Jwt.provider';
import { ITokenProvider } from './token-provider/IToken.provider';

container.registerSingleton<ITokenProvider>('TokenProvider', JwtProvider);
