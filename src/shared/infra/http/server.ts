import 'reflect-metadata';
import App from './App';

App.listen(process.env.PORT, () => {
  if (process.env.ENVIRONMENT === 'development') {
    console.log(`Listening at port: ${process.env.PORT}\n\
    Environment: ${process.env.NODE_ENV}
    `);
  }
});
