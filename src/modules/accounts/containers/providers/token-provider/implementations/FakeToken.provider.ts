import { SignTokenDto } from '@accounts:dtos/tokens/SignToken.dto';
import { TokenResponse } from '@accounts:types/tokens/Token';

import ITokenProvider from '../IToken.provider';

class FakeTokenProvider implements ITokenProvider {
  sign(data: SignTokenDto, _: string): string {
    const { id, email } = data;

    return `token ${id} ${email}`;
  }
  verify(token: string, _: string): TokenResponse {
    const [, id, email] = token.split(' ');

    return { id, email };
  }
}

export default FakeTokenProvider;
