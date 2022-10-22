const Sleep = require("../models/sleep_models");
const compute_duration_between_dates = require("../helpers/duration");

async function sleep_create(req, res, next) {
  const sleep = req.body;
  const { hours, minutes, seconds } = compute_duration_between_dates(
    sleep.sleep_start,
    sleep.sleep_stop
  );
  sleep.sleep_duration_hours = hours;
  sleep.sleep_duration_minutes = minutes;
  sleep.sleep_duration_seconds = seconds;
  console.log(sleep);

  let new_sleep = await Sleep.create({ sleep });
  if (new_sleep) {
    res.status(200).json({ message: "Drone created successfully" });
  }
}

async function sleep_get_by_sleep_id(req, res, next) {}

async function sleep_get_all_by_user_id(req, res, next) {}

async function sleep_update_by_sleep_sleep_id(req, res, next) {}

async function sleep_delete_by_sleep_id(req, res, next) {}

async function sleep_delete_all_by_user_id(req, res, next) {}

module.exports = {
  sleep_create,
  sleep_get_by_sleep_id,
  sleep_get_all_by_user_id,
  sleep_update_by_sleep_sleep_id,
  sleep_delete_by_sleep_id,
  sleep_delete_all_by_user_id,
};
