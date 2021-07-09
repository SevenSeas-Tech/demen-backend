import 'reflect-metadata';
import 'dotenv/config';

import '@shared/infra/typeorm';

import app from './app';

app.listen(process.env.PORT, () => {
  if (process.env.ENVIRONMENT === 'development') {
    console.log(`Listening at port: ${process.env.PORT}\n\
    Environment: ${process.env.ENVIRONMENT}
    `);
  }
});
