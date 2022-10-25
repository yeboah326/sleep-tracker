const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Routers
const user_router = require("./src/routes/user_routes");
const sleep_router = require("./src/routes/sleep_routes");

// Add middleware to parse json requests body
app.use(express.json());

// Add logging functionality to the app
app.use(logger("short"));

// Add routers to main app
app.use("/api/user", user_router);
app.use("/api/sleep", sleep_router);

module.exports = app