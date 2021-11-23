import { sign, verify } from 'jsonwebtoken';

import { SignTokenDto } from '@accounts:dtos/tokens/SignToken.dto';
import { Token, TokenPayload, TokenResponse } from '@accounts:types/tokens/Token';
import authConfig from '@config/auth/auth.config';

import { ITokenProvider } from '../IToken.provider';

// ---------------------------------------------------------------------------------------------  //

class Jwt implements ITokenProvider {
  private secret?: string;
  private expiresIn?: string;

  // *** ---------------------- Methods ----------------------------------------------------- *** //

  sign(data: SignTokenDto, type = 'jwt'): Token {
    const { id, email } = data;

    // ------------------------------------------------------------------------------------------ //
    this.setSecret(type);

    const token = sign({ email }, this.secret as string, {
      subject: id,
      expiresIn: this.expiresIn
    });

    return token;
  }

  verify(token: Token, type = 'jwt'): TokenResponse {
    this.setSecret(type);

    const { sub: id, email } = verify(token, this.secret as string) as TokenPayload;

    return { id, email };
  }

  // * ----------------------- Private Methods ------------------------------------------------ * //
  private setSecret(type: string): void {
    switch (type) {
      case 'refresh':
        this.secret = authConfig.secretRefresh;
        this.expiresIn = authConfig.expiresInRefresh;
        break;

      case 'password':
        this.secret = authConfig.secretPassword;
        this.expiresIn = authConfig.expiresInPassword;
        break;

      case 'jwt':
        this.secret = authConfig.secretJwt;
        this.expiresIn = authConfig.expiresInJwt;
        break;

      default:
        break;
    }
  }
}

export default Jwt;
