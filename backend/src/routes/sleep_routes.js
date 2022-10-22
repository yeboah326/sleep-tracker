const express = require("express");
const sleep_controller = require("../controllers/sleep_controllers");
const sleep_router = express.Router();

sleep_router.post("/", sleep_controller.sleep_create);

sleep_router.get("/:sleep_id", sleep_controller.sleep_get_by_sleep_id);

sleep_router.get(
  "/users/:username",
  sleep_controller.sleep_get_all_by_username
);

sleep_router.patch(
  "/:sleep_id",
  sleep_controller.sleep_update_by_sleep_sleep_id
);

sleep_router.delete("/:sleep_id", sleep_controller.sleep_delete_by_sleep_id);

sleep_router.delete("/:user_id", sleep_controller.sleep_delete_all_by_user_id);

module.exports = sleep_router;
