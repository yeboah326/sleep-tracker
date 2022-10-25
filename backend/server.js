const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

// Constants
const PORT = process.env.PORT || "3000";
const DATABASE_USERNAME = process.env.DATABASE_USERNAME || "username";
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "password";
const DATABASE_HOST = process.env.DATABASE_HOST || "localhost";
const DATABASE_PORT = process.env.DATABASE_PORT || "27017";

mongoose
  .connect(
    `mongodb://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/`
  )
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Application running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });