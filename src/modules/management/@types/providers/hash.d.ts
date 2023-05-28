export interface HashProviderInterface {
  hash(string: string): Promise<string>;
  match(string: string, hash: string): Promise<boolean>;
}
