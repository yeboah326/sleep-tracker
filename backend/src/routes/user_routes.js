const express = require("express");
const user_controllers = require("../controllers/user_controller");
const user_router = express.Router();
const authenticate_token = require("../middleware/authenticate_token");

user_router.post("/signup", user_controllers.user_signup);

user_router.post("/login", user_controllers.user_login);

user_router.get(
  "/:user_id",
  authenticate_token,
  user_controllers.user_get_info_by_user_id
);

user_router.delete(
  "/:user_id",
  authenticate_token,
  user_controllers.user_delete_by_user_id
);

module.exports = user_router;
