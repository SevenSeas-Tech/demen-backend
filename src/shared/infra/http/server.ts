import { App } from '@shared/infra/http/app';

// * ---------------------------------------------------------------------- * //

const server = new App().server;

const port = process.env.PORT || 3000;

// -------------------------------------------------------------------------- //

server.listen(port || 3000, (): void => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Listening at port: ${port}\n\
    Environment: ${process.env.NODE_ENV}
    `);
  }
});
