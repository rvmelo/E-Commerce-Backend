module.exports = {
  "type":"postgres",
  "url": process.env.DATABASE_URL,
  "entities": [
    "./dist/models/*.js"
  ],
  "ssl": true,
  "extra": {
    "ssl": {
      "rejectUnauthorized": false
    }
  },
  "migrations": [
    "./dist/database/migrations/*.js"
  ],
  "cli": {
    "migrationsDir":"./dist/database/migrations"
  }
}
