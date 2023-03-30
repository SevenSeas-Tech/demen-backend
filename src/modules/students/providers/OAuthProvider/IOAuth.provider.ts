import { OAuthResponse } from '@accounts:types/Oauth/OAuthResponse';
import { Token } from '@accounts:types/tokens/Token';

export interface IOAuthProvider {
  verify(token: Token): Promise<OAuthResponse>;
}
