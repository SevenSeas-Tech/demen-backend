import App from './App';

// * ---------------------------------------------------------------------- * //

const port = process.env.PORT || 3000;

// -------------------------------------------------------------------------- //

App.listen(port || 3000, (): void => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Listening at port: ${port}\n\
    Environment: ${process.env.NODE_ENV}
    `);
  }
});
