declare namespace Express {
  export interface Request {
    user: {
      id: string;
      googleId: string;
      avatar: string;
      email: string;
      name: string;
      lastName: string;
      createdAt: Date;
      updatedAt: Date;
    };

    employee: {
      id: string;
      username: string;
      email: string;
      name: string;
      lastName: string;
      phone: string;
      videos?: Video[];
      createdAt: Date;
      updatedAt: Date;
    };
  }
}
