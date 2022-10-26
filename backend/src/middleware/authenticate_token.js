const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = require("../../config/constants");

function authenticate_token(req, res, next) {
  const auth_header = req.headers["authorization"];
  const token = auth_header && auth_header.split(" ")[1];

  if (token === null) {
    return res
      .status(401)
      .json({ message: "User is not authorized to perform this action" });
  } else {
    jwt.verify(token, JWT_TOKEN, function (err, user) {
      if (err) {
        return res.status(400).json({ message: "Token expired" });
      } else {
        req.user = user;
        next();
      }
    });
  }
}

module.exports = authenticate_token;
