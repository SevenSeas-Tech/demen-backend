import { OAuth2Client } from 'google-auth-library';

import { IOAuthProvider } from '@accounts:containers/providers/OAuthProvider/IOAuth.provider';
import { OAuthResponse } from '@accounts:types/Oauth/OAuthResponse';
import { Token } from '@accounts:types/tokens/Token';
import AppError from '@shared/errors/App.error';

// ---------------------------------------------------------------------------------------------- //
class GoogleAuthProvider implements IOAuthProvider {
  private client: OAuth2Client;
  private clientId = process.env.G_CLIENT_ID;

  constructor() {
    this.client = new OAuth2Client(this.clientId);
  }

  async verify(token: Token): Promise<OAuthResponse> {
    const ticket = await this.client.verifyIdToken({
      idToken: token,
      audience: this.clientId
    });

    const payload = ticket.getPayload();

    if (!payload) {
      throw new AppError('Invalid Token');
    }

    const userId = payload.sub;
    const name = payload.given_name as string;
    const lastName = payload.family_name as string;
    const email = payload.email as string;
    const avatar = payload.picture as string;

    return {
      userId,
      name,
      lastName,
      email,
      avatar
    };
  }
}

// ---------------------------------------------------------------------------------------------- //
export { GoogleAuthProvider };
