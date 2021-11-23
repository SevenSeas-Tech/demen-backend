import { JwtProvider } from '@accounts:containers/providers/token-provider/implementations/Jwt.provider';
import { ITokenProvider } from '@accounts:containers/providers/token-provider/IToken.provider';
import IHashProvider from '@shared:containers/providers/hash-provider/IHash.provider';
import BcryptProvider from '@shared:containers/providers/hash-provider/implementations/Bcrypt.provider';

// ---------------------------------------------------------------------------------------------- //

class ProviderContainer {
  TokenProvider: ITokenProvider;
  HashProvider: IHashProvider;

  constructor() {
    this.TokenProvider = new JwtProvider();
    this.HashProvider = new BcryptProvider();
  }
}

// ---------------------------------------------------------------------------------------------- //

export default ProviderContainer;
