import { container } from 'tsyringe';

import type { TokenProvider } from '@management:types/providers/token';

import { JsonWebTokenProvider } from '@management:providers/token/jwt';

// * ---------------------------------------------------------------------- * //

container.registerSingleton<TokenProvider>('TokenProvider', JsonWebTokenProvider);
