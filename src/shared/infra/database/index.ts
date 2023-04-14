
import { PrismaDatabase } from './prisma/prisma-database';

import type { Database } from '@shared/@types/database';

// * ---------------------------------------------------------------------- * //

const database: Database = PrismaDatabase.getInstance();

// * ---------------------------------------------------------------------- * //

export { database };
