// * ---------------------------------------------------------------------- * //

export type TypeConfig = {
  secret: string;
  expiresIn: string;
}

// -------------------------------------------------------------------------- //

export type TokenPayload = {
  sub: string;
  email: string;
  iat: number;
  exp: number;
};
