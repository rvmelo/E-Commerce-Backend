module.exports = {
  "type":"postgres",
  "url": process.env.DATABASE_URL,
  "entities": [
    process.env.APP_ENV === 'production' ? "./dist/models/*.js" : "./src/models/*.ts"
  ],
  "ssl": process.env.APP_ENV !== 'development',
  "extra": process.env.APP_ENV !== 'development' ? {
    "ssl": {
      "rejectUnauthorized": false
    }
  } : {},
  "migrations": [
    process.env.APP_ENV === 'production' ? "./dist/database/migrations/*.js" : "./src/database/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}
