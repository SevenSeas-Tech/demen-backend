
  module.exports = {
  "type": "postgres",
  "host": process.env.DATABASE_URL,
  "port": process.env.DB_PORT,
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASSWORD,
  "database": "demen",
  "entities": [process.env.TYPEORM_ENTITIES],
  "migrations": [process.env.TYPEORM_MIGRATIONS],
  "cli": {
    "migrationsDir": process.env.MIGRATIONS_DIR
  }
}
