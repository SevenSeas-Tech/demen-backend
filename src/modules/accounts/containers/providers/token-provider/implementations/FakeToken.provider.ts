import { SignTokenDto } from '@accounts:dtos/tokens/SignToken.dto';
import { TokenResponse } from '@accounts:types/tokens/Token';

import ITokenProvider from '../IToken.provider';

class FakeTokenProvider implements ITokenProvider {
  sign(data: SignTokenDto, _: string): string {
    const { id, admin } = data;

    return `token ${id} ${admin}`;
  }
  verify(token: string, _: string): TokenResponse {
    const [, id, adminString] = token.split(' ');
    let admin: boolean;

    switch (adminString) {
      case 'true':
        admin = true;
        break;
      default:
        admin = false;
        break;
    }

    return { id, admin };
  }
}

export default FakeTokenProvider;
