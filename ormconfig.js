
const entities;
const migrations;

if (process.env.ENVIRONMENT === 'development'){
  entities = ["./src/modules/**/infra/typeorm/entities/*.ts"];
  migrations = ["./src/shared/infra/typeorm/migrations/*.ts"]
}
else {
  entities = ["./dist/modules/**/infra/typeorm/entities/*.js"]
  migrations = ["./dist/shared/infra/typeorm/migrations/*.js"]
}
  module.exports = {
  "type": "postgres",
  "host": process.env.DATABASE_URL,
  "port": process.env.DB_PORT,
  "username": process.env.USERNAME,
  "password": process.env.PASSWORD,
  "database": "demen",
  "entities": entities,
  "migrations": migrations,
  "cli": {
    "migrationsDir": "./src/shared/infra/typeorm/migrations"
  }
}
