import JwtProvider from '@accounts:containers/providers/token-provider/implementations/Jwt.provider';
import ITokenProvider from '@accounts:containers/providers/token-provider/IToken.provider';

class ProviderContainer {
  TokenProvider: ITokenProvider;

  constructor() {
    this.TokenProvider = new JwtProvider();
  }
}

export default ProviderContainer;
