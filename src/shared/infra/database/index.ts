
import { PrismaDatabase } from './prisma/Prisma-Database';

import type { Database } from '@shared/@types/database';

// * ---------------------------------------------------------------------- * //

const database: Database = new PrismaDatabase();

// * ---------------------------------------------------------------------- * //

export { database };
