/* eslint-disable @typescript-eslint/require-await */

import type { HashProviderInterface } from 'modules/management/@types/providers/hash';

// * ---------------------------------------------------------------------- * //

class TestHashProvider implements HashProviderInterface {
  async hash(string: string): Promise<string> {
    return `hash${string}`;
  }

  // ------------------------------------------------------------------------ //

  async match(string: string, hash: string): Promise<boolean> {
    return string === hash;
  }
}

// * ---------------------------------------------------------------------- * //

export { TestHashProvider };
