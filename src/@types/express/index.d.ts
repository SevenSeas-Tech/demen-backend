declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    user: {
      id: string;
      username: string;
      email: string;
      name: string;
      lastName: string;
      admin: boolean;
      verified: boolean;
      createdAt: Date;
      updatedAt: Date;
    };
  }
}
