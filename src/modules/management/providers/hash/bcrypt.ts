import { compare, hash } from 'bcryptjs';

import type { HashProviderInterface } from 'modules/management/@types/providers/hash';

// * ---------------------------------------------------------------------- * //

class BcryptHashProvider implements HashProviderInterface {
  async hash(string: string): Promise<string> {
    return hash(string, 8);
  }

  // ------------------------------------------------------------------------ //

  match(string: string, hash: string): Promise<boolean> {
    return compare(string, hash);
  }
}

// * ---------------------------------------------------------------------- * //

export { BcryptHashProvider };
