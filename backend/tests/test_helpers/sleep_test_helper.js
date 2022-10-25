const request = require("supertest");
const app = require("../../app");

async function create_sleep(token) {
  const sleep = await request(app)
    .post("/api/sleep")
    .send({
      sleep_start: "2022-10-22T11:58:31.215Z",
      sleep_stop: "2022-10-22T18:31:55.215Z",
    })
    .set("Authorization", `Bearer ${token}`);
  return sleep.body;
}

function reverse_string(str) {
  return str === "" ? "" : reverse_string(str.substr(1)) + str.charAt(0);
}

module.exports = { create_sleep, reverse_string };
