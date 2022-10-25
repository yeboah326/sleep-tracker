const Sleep = require("../models/sleep_models");

async function sleep_create(req, res) {
  try {
    const sleep = req.body;
    sleep.username = req.user.username;

    let new_sleep = await Sleep.create(sleep);

    if (new_sleep) {
      res.status(200).json(new_sleep);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

async function sleep_get_by_sleep_id(req, res) {
  try {
    const sleep = await Sleep.findById(req.params.sleep_id);
    if (sleep) {
      res.status(200).json(sleep);
    } else {
      res.status(404).json({ message: "Sleep with given ID not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

async function sleep_get_all_by_username(req, res) {
  try {
    const sleeps = await Sleep.find({ username: req.params.username });
    res.status(200).json({ sleeps });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

async function sleep_update_by_sleep_sleep_id(req, res) {
  try {
    let sleep = await Sleep.findById(req.params.sleep_id);
    if (sleep) {
      if (req.body.sleep_start) {
        sleep.sleep_start = req.body.sleep_start;
      } else if (req.body.sleep_stop) {
        sleep.sleep_stop = req.body.sleep_stop;
      }
      await sleep.save();
      res.status(200).json({ message: "Sleep updated successfully" });
    } else {
      res.status(404).json({ message: "Sleep with given ID not found" });
    }
  } catch (err) {
    res.status(err).json({ message: err });
  }
}

async function sleep_delete_by_sleep_id(req, res, next) {
  try {
    await Sleep.deleteOne({ _id: req.params.sleep_id });
    res.status(200).json({
      message: `Sleep with ID:${req.params.sleep_id} deleted successfully`,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
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
