const User = require("../models/user_models");
const generate_jwt = require("../helpers/generate_jwt");
require("dotenv").config();

async function user_signup(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      res.status(400).json({ message: "User already exists in the database" });
    } else {
      const new_user = await User.create(req.body);
      if (new_user) {
        res.status(201).json({ message: "User created successfully" });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

async function user_login(req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const password_correct = await user.check_password(req.body.password);
      if (password_correct) {
        const token = generate_jwt({ username: req.body.username });
        res.status(200).json({ token });
      } else {
        res
          .status(400)
          .json({ message: "Either the username or password is incorrect" });
      }
    } else {
      res.status(404).json({ message: "User does not exist" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

async function user_get_info_by_user_id(req, res) {
  try {
    const user = await User.findById(req.params.user_id);
    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ message: "User with given ID does not exist" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

async function user_delete_by_user_id(req, res) {
  try {
    const user = await User.findById(req.params.user_id);
    if (user) {
      await User.deleteOne({ _id: req.params.user_id });
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User with given ID does not exist" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

module.exports = {
  user_signup,
  user_login,
  user_get_info_by_user_id,
  user_delete_by_user_id,
};
