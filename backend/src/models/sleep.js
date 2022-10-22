const mongoose = require("mongoose");

const sleepSchema = mongoose.Schema({
  sleepStart: { type: Date, default: Date.now },
  sleepStop: { type: Date, default: Date.now },
  sleepDuration: { type: Number },
  username: { type: String },
});

const Sleep = mongoose.model("Sleep", sleepSchema);

module.exports = Sleep;
