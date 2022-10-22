const mongoose = require("mongoose");

const sleep_schema = mongoose.Schema({
  sleep_start: { type: Date, default: Date.now },
  sleep_stop: { type: Date, default: Date.now },
  username: { type: String },
  sleep_duration_hours: { type: Number },
  sleep_duration_minutes: { type: Number },
  sleep_duration_seconds: { type: Number },
});

const Sleep = mongoose.model("Sleep", sleep_schema);

module.exports = Sleep;
