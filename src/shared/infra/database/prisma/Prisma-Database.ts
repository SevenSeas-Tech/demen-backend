import { PrismaClient } from '@prisma/client';

import type { Database } from '@shared/@types/database';

// * ---------------------------------------------------------------------- * //

class PrismaDatabase implements Database {
  prisma = new PrismaClient();

  async createConnection(): Promise<void> {
    await this.prisma.$connect();
  }
}

// * ---------------------------------------------------------------------- * //

export { PrismaDatabase };
