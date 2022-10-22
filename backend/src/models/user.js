const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: { type: String },
  middleName: { type: String },
  lastName: { type: String },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
});

const User = mongoose.model("User", userSchema);
