import { sign, verify } from 'jsonwebtoken';

import type {
  MapElement,
  SessionToken,
  TokenData,
  TokenPayload,
  TokenProvider
} from '@management:types/providers/token';

import { authConfig } from '@config/auth/auth.config';

// * --------------------------------------------------------------------- *  //

class JsonWebTokenProvider implements TokenProvider {
  private secret = '';
  private expiresIn = '';
  private tokenTypeMap: Map<string, MapElement> = new Map();

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
