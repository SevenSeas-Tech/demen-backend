import { SignTokenDto } from '@accounts:dtos/tokens/SignToken.dto';
import { Token, TokenResponse } from '@accounts:types/tokens/Token';

interface ITokenProvider {
  sign(data: SignTokenDto, type: string): Token;
  verify(token: Token, type: string): TokenResponse;
}

export default ITokenProvider;
