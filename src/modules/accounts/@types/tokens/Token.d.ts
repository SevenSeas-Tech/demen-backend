import { Email, Uuid } from '@accounts:types/users/User';

export type Token = string;

export type TokenPayload = {
  sub: string;
  email: Email;
  iat: number;
  exp: number;
};

export type TokenResponse = {
  id: Uuid;
  email: Email;
};
