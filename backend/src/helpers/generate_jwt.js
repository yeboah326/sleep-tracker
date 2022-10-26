const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = require("../../config/constants");

function generate_jwt(username) {
  return jwt.sign(username, JWT_TOKEN, { expiresIn: "10800s" });
}

module.exports = generate_jwt;
