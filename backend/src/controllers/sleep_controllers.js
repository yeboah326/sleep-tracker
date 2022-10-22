const Sleep = require("../models/sleep_models");
const compute_duration_between_dates = require("../helpers/duration");

async function sleep_create(req, res) {
  const sleep = req.body;
  const { hours, minutes, seconds } = compute_duration_between_dates(
    sleep.sleep_start,
    sleep.sleep_stop
  );
  sleep.sleep_duration_hours = hours;
  sleep.sleep_duration_minutes = minutes;
  sleep.sleep_duration_seconds = seconds;

  let new_sleep = await Sleep.create(sleep);

  if (new_sleep) {
    res.status(200).json({ message: "Drone created successfully" });
  }
}

async function sleep_get_by_sleep_id(req, res) {
  const sleep = await Sleep.findById(req.params.sleep_id);
  if (sleep) {
    res.status(200).json(sleep);
  } else {
    res.status(404).json({ message: "Sleep with given ID not found" });
  }
}

async function sleep_get_all_by_username(req, res) {
  const sleeps = await Sleep.find({ username: req.params.username });
  res.status(200).json({ sleeps });
}

async function sleep_update_by_sleep_sleep_id(req, res) {
  const sleep = await Sleep.findById(req.params.sleep_id);
  if (sleep) {
    await Sleep.updateOne({ _id: sleep._id }, { ...req.body });
    res.status(200).json({ message: "Sleep updated successfully" });
  } else {
    res.status(404).json({ message: "Sleep with given ID not found" });
  }
}

async function sleep_delete_by_sleep_id(req, res, next) {
  await Sleep.deleteOne({ _id: req.params.sleep_id });
  res.status(200).json({
    message: `Sleep with ID:${req.params.sleep_id} deleted successfully`,
  });
}

async function sleep_delete_all_by_user_id(req, res, next) {}

module.exports = {
  sleep_create,
  sleep_get_by_sleep_id,
  sleep_get_all_by_username,
  sleep_update_by_sleep_sleep_id,
  sleep_delete_by_sleep_id,
  sleep_delete_all_by_user_id,
};
