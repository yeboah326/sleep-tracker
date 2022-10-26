require("dotenv").config();

const PORT = process.env.PORT;
const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_PORT = process.env.DATABASE_PORT;
const JWT_TOKEN = process.env.JWT_TOKEN;
const SALT_FACTOR = parseInt(process.env.SALT_FACTOR);

module.exports = {
  PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
  JWT_TOKEN,
  SALT_FACTOR,
};
