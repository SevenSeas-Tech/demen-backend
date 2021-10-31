import { compare, hash } from 'bcryptjs';

import IHashProvider from '../IHash.provider';

class BcryptProvider implements IHashProvider {
  async hash(string: string): Promise<string> {
    return hash(string, 8);
  }

  match(string: string, hash: string): Promise<boolean> {
    return compare(string, hash);
  }
}

export default BcryptProvider;
