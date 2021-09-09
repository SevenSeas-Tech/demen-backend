export default {
  expiresInJwt: '1d',
  expiresInRefresh: '30d',
  expiresInPassword: '20m',

  secretJwt: process.env.JWT_SECRET as string,
  secretRefresh: process.env.JWT_REFRESH_SECRET as string,
  secretPassword: process.env.JWT_PASSWORD_SECRET as string,
};
