const mongoose = require("mongoose");

const sleep_schema = mongoose.Schema({
  sleep_start: { type: Date, default: Date.now },
  sleep_stop: { type: Date, default: Date.now },
  sleep_duration: { type: Number },
  username: { type: String },
});

const Sleep = mongoose.model("Sleep", sleep_schema);

module.exports = Sleep;
