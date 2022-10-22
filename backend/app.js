const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Constants
const PORT = process.env.PORT || "3000";
const DATABASE_USERNAME = process.env.DATABASE_USERNAME || "username";
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "password";
const DATABASE_HOST = process.env.DATABASE_HOST || "localhost";
const DATABASE_PORT = process.env.DATABASE_PORT || "27017";

// Database connection
mongoose.connect(
  `mongodb://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/`
);

// Routers
const user_router = require("./src/routes/user_routes");
const sleep_router = require("./src/routes/sleep_routes");

// Add middleware to parse json requests body
app.use(express.json());

// Add logging functionality to the app
app.use(logger("short"));

// Add routers to main app
app.use("/user", user_router);
app.use("/sleep", sleep_router);

// Run the server on port 3000
app.listen(PORT, function () {
  console.log(`Application running on port ${PORT}`);
});
