import { PrismaClient } from '@prisma/client';

import type { Database } from '@shared/@types/database';

// * ---------------------------------------------------------------------- * //

class PrismaDatabase implements Database {
  private static INSTANCE: PrismaDatabase;
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

  async connect(): Promise<void> {
    await this.client.$connect();

    return;
  }

  async disconnect(): Promise<void> {
    await this.client.$disconnect();
  }

  async cleanDatabase(): Promise<void> {
    await this.client.$executeRaw`TRUNCATE TABLE managers CASCADE`;
    await this.client.$executeRaw`TRUNCATE TABLE emails CASCADE`;
    await this.client.$executeRaw`TRUNCATE TABLE email_types CASCADE`;
  }
}

// * ---------------------------------------------------------------------- * //

export { PrismaDatabase };
