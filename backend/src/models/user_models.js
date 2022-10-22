const mongoose = require("mongoose");

const user_schema = mongoose.Schema({
  first_name: { type: String },
  middle_name: { type: String },
  last_name: { type: String },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
});

const User = mongoose.model("User", user_schema);
