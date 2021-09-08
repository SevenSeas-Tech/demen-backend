import { compare, hash } from 'bcryptjs';

import IHashProvider from '../IHashProvider';

class Bcrypt implements IHashProvider {
  async hash(string: string): Promise<string> {
    return hash(string, 8);
  }

  match(string: string, hash: string): Promise<boolean> {
    return compare(string, hash);
  }
}

export default Bcrypt;
