import { IHashProvider } from '../IHash.provider';

class FakeHashProvider implements IHashProvider {
  async hash(string: string): Promise<string> {
    return `hash${string}`;
  }

  async match(string: string, hash: string): Promise<boolean> {
    return string === hash;
  }
}

export { FakeHashProvider };
