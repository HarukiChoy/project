import type { Knex } from "knex";
import dotenv from "dotenv";

// Update with your config settings.
dotenv.config();

const config: { [key: string]: Knex.Config } = {
  local: {
    client: "sqlite3",
    connection: {
      filename: "./dev.sqlite3",
    },
  },

  development: {
    client: "postgresql",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
  
  test: {
    client: "postgresql",
    connection: {
      database: process.env.TEST_DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

module.exports = config;
