
import type { SessionToken, TokenData, TokenProvider } from '@management:types/providers/token';

// * ---------------------------------------------------------------------- * //

class TokenProviderMock implements TokenProvider {
  sign(data: TokenData, _: string): SessionToken {
    const { id, email } = data;

    return `token ${id} ${email}`;
  }

  // ------------------------------------------------------------------------ //

  verify(token: SessionToken, _: string): TokenData {
    const [ , id, email ] = token.split(' ');

    return { id, email };
  }
}

// * ---------------------------------------------------------------------- * //

export { TokenProviderMock };
