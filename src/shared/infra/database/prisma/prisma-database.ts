import { PrismaClient } from '@prisma/client';

import type { Database } from '@shared/@types/database';

// * ---------------------------------------------------------------------- * //

class PrismaDatabase implements Database {
  static INSTANCE: PrismaDatabase;
  public client: PrismaClient;

  // ------------------------------------------------------------------------ //

  private constructor() {
    if (!global.prisma) global.prisma = new PrismaClient();

    this.client = global.prisma;
  }

  // ------------------------------------------------------------------------ //

  static getInstance(): PrismaDatabase {
    if (!this.INSTANCE) this.INSTANCE = new PrismaDatabase();

    return this.INSTANCE;
  }

  // ------------------------------------------------------------------------ //

  async createConnection(): Promise<void> {
    await this.client.$connect();

    return;
  }
}

// * ---------------------------------------------------------------------- * //

export { PrismaDatabase };
