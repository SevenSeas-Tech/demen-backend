import type {
  SessionToken,
  TokenData,
  TokenProviderInterface
} from '@management:provider-types/token';

// * ---------------------------------------------------------------------- * //

class TestTokenProvider implements TokenProviderInterface {
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

export { TestTokenProvider };
