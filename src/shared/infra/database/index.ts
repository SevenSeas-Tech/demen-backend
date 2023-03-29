
import { PrismaDatabase } from './prisma/Prisma-Database';

import type { Database } from './@types';

// * ---------------------------------------------------------------------- * //

const database: Database = new PrismaDatabase();

// * ---------------------------------------------------------------------- * //

export { database };
