import { createConnection, getConnectionOptions } from 'typeorm';

import type { Connection } from 'typeorm';

// * ---------------------------------------------------------------------- * //

export default async (host = process.env.DATABASE_URL): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
      database: process.env.NODE_ENV === 'test'
        ? 'demen_test'
        : defaultOptions.database
    })
  );
};
