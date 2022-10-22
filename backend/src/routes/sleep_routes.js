const express = require("express");
const Sleep = require("../models/sleep");
const sleep_controller = require("../controllers/sleep_controllers");
const sleep_router = express.Router();

sleep_router.post("/", function sleep_create(req, res, next) {});

sleep_router.get("/:sleep_id", sleep_controller.sleep_get_by_sleep_id);

sleep_router.get("/:user_id", sleep_controller.sleep_get_all_by_user_id);

sleep_router.patch("/:sleep_id", sleep_controller.sleep_update_by_sleep_sleep_id);

sleep_router.delete("/:sleep_id", sleep_controller.sleep_delete_by_sleep_id);

sleep_router.delete("/:user_id", sleep_controller.sleep_delete_all_by_user_id);

module.exports = sleep_router;
