/* eslint-disable @typescript-eslint/require-await */

import type { HashProvider } from '@shared/@types/providers/hash';

// * ---------------------------------------------------------------------- * //

class TestHashProvider implements HashProvider {
  async hash(string: string): Promise<string> {
    return `hash${string}`;
  }

  async match(string: string, hash: string): Promise<boolean> {
    return string === hash;
  }
}

// * ---------------------------------------------------------------------- * //

export { TestHashProvider };
