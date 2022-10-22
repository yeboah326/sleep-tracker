const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const SALT_FACTOR = parseInt(process.env.SALT_FACTOR);

const user_schema = mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
});

user_schema.pre("save", function (done) {
  const user = this;
  if (!user.isModified("password")) {
    return done();
  }
  bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
    if (err) return done(err);
    bcrypt.hash(user.password, salt, function (err, hashedPassword) {
      if (err) return done(err);
      user.password = hashedPassword;
      done();
    });
  });
});

user_schema.methods.check_password = function (guess) {
  bcrypt.compare(guess, this.password, function (err, isMatch) {
    if (err) {
      return err;
    } else {
      console.log("Password is correct");
      return { isMatch };
    }
  });
};

const User = mongoose.model("sleep_tracker_user", user_schema);

module.exports = User;
