export interface Database {
  connect(): void;
  disconnect(): void;
  cleanDatabase(): void;
}
