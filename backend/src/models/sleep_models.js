const mongoose = require("mongoose");
const compute_duration_between_dates = require("../helpers/duration");
const { $where } = require("./user_models");

const sleep_schema = mongoose.Schema({
  sleep_start: { type: Date, default: Date.now, required: true },
  sleep_stop: { type: Date, default: Date.now, required: true },
  username: { type: String, required: true },
  sleep_duration_hours: { type: Number },
  sleep_duration_minutes: { type: Number },
  sleep_duration_seconds: { type: Number },
});

sleep_schema.pre("save", function (done) {
  const sleep = this;
  const { hours, minutes, seconds } = compute_duration_between_dates(
    sleep.sleep_start,
    sleep.sleep_stop
  );
  sleep.sleep_duration_hours = hours;
  sleep.sleep_duration_minutes = minutes;
  sleep.sleep_duration_seconds = seconds;
  done();
});

const Sleep = new mongoose.model("sleep_tracker_sleep", sleep_schema);

module.exports = Sleep;
