const express = require("express");
const logger = require("morgan");
require('dotenv').config()

const app = express();

// Constants
const PORT = process.env.PORT || '5000';

// Routers
const user_router = require("./src/routes/user_routes");
const sleep_router = require("./src/routes/sleep_routes");

// Add middleware to parse json requests body
app.use(express.json())

// Add logging functionality to the app
app.use(logger("short"));

// Add routers to main app
app.use("/users", user_router);
app.use("/sleep", sleep_router);

// Run the server on port 3000
app.listen(PORT, function () {
  console.log(`Application running on port ${PORT}`);
});
