const app = require("./app");
const mongoose = require("mongoose");
const {
  PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
} = require("./config/constants");

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
