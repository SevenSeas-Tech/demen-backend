import { sign, verify } from 'jsonwebtoken';

import { authConfig } from '@config/auth/auth.config';

import type { TokenPayload, TypeConfig } from '@management:provider-types/jwt-token';
import type {
  SessionToken,
  TokenData,
  TokenProviderInterface
} from '@management:provider-types/token';

// * --------------------------------------------------------------------- *  //

class JsonWebTokenProvider implements TokenProviderInterface {
  private secret = '';
  private expiresIn = '';
  private tokenTypeMap: Map<string, TypeConfig> = new Map();

  // *** --- constructor ------------------------------------------------ *** //

  constructor() {
    const {
      expiresJwt,
      expiresPassword,
      expiresRefresh,
      secretJwt,
      secretPassword,
      secretRefresh
    } = authConfig;

    this.tokenTypeMap
      .set('jwt', { secret: secretJwt, expiresIn: expiresJwt });

    this.tokenTypeMap
      .set('refresh', { secret: secretRefresh, expiresIn: expiresRefresh });

    this.tokenTypeMap
      .set('password', { secret: secretPassword, expiresIn: expiresPassword });
  }

  // *** --- methods ---------------------------------------------------- *** //

  sign(data: TokenData, type = 'jwt'): SessionToken {
    const { id, email } = data;

    this.setSecret(type);

    const token = sign({ email }, this.secret, {
      subject: id,
      expiresIn: this.expiresIn
    });

    return token;
  }

  // ------------------------------------------------------------------------ //

  verify(token: SessionToken, type = 'jwt'): TokenData {
    this.setSecret(type);

    const { sub: id, email } = verify(token, this.secret ) as TokenPayload;

    return { id, email };
  }

  // * --- Private Methods ------------------------------------------------ * //

  private setSecret(type: string): void {
    const data = this.tokenTypeMap.get(type);

    if (!data) return;

    const { secret, expiresIn } = data;

    this.secret = secret;
    this.expiresIn = expiresIn;
  }
}

// * ---------------------------------------------------------------------- * //

export { JsonWebTokenProvider };
