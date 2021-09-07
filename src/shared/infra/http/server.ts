import 'reflect-metadata';
import 'dotenv/config';

import '@shared/infra/typeorm';
import '@shared:containers/index';

import app from './App';

app.listen(process.env.PORT, () => {
  if (process.env.ENVIRONMENT === 'development') {
    console.log(`Listening at port: ${process.env.PORT}\n\
    Environment: ${process.env.ENVIRONMENT}
    `);
  }
});
