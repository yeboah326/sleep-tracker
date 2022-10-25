const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const Sleep = require("../src/models/sleep_models");
const { login_user, create_user } = require("./test_helpers/user_test_helper");
const {
  create_sleep,
  reverse_string,
} = require("./test_helpers/sleep_test_helper");
const {
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
} = require("../config/constants");

beforeEach(async function () {
  await mongoose.connect(
    `mongodb://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/`
  );
  //   await mongoose.connection.db.dropCollection("sleep_tracker_users");
});

afterEach(async function () {
  await mongoose.connection.db.dropCollection("sleep_tracker_users");
  await mongoose.connection.db.dropCollection("sleep_tracker_sleeps");
  await mongoose.connection.close();
});

describe("POST /api/sleep", function test_sleep_create_success() {
  it("creates a new sleep instance for the user", async () => {
    await create_user();
    const { token } = await login_user();
    const res = await request(app)
      .post("/api/sleep")
      .send({
        sleep_start: "2022-10-22T11:58:31.215Z",
        sleep_stop: "2022-10-22T18:31:55.215Z",
      })
      .set("Authorization", `Bearer ${token}`);

    const created_sleep = await Sleep.find().exec();

    expect(res.statusCode).toBe(201);
    expect(created_sleep[0].sleep_start.toISOString()).toBe(
      "2022-10-22T11:58:31.215Z"
    );
    expect(created_sleep[0].sleep_stop.toISOString()).toBe(
      "2022-10-22T18:31:55.215Z"
    );
    expect(created_sleep[0].username).toBe("gasante");
    expect(created_sleep[0].sleep_duration_hours).toBeTruthy();
    expect(created_sleep[0].sleep_duration_minutes).toBeTruthy();
    expect(created_sleep[0].sleep_duration_seconds).toBeTruthy();
  });
});

describe("POST /api/sleep", function test_sleep_create_unauthorized() {
  it("creates a new sleep instance for the user", async () => {
    await create_user();
    const { token } = await login_user();
    const res = await request(app).post("/api/sleep").send({
      sleep_start: "2022-10-22T11:58:31.215Z",
      sleep_stop: "2022-10-22T18:31:55.215Z",
    });

    const created_sleep = await Sleep.find().exec();

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Token expired");
    expect(created_sleep.length).toBe(0);
  });
});

describe("GET /api/sleep/:sleep_id", function test_sleep_get_by_sleep_id_success() {
  it("gets a sleep instance when given a sleep id", async () => {
    await create_user();
    const { token } = await login_user();
    const created_sleep = await create_sleep(token);

    const res = await request(app)
      .get(`/api/sleep/${created_sleep._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(created_sleep);
  });
});

describe("GET /api/sleep/:sleep_id", function test_sleep_get_by_sleep_id_not_found() {
  it("gets a sleep instance that does not exist", async () => {
    await create_user();
    const { token } = await login_user();
    const created_sleep = await create_sleep(token);

    const res = await request(app)
      .get(`/api/sleep/${reverse_string(created_sleep._id)}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toEqual("Sleep with given ID not found");
  });
});

describe("POST /api/sleep/:sleep_id", function test_sleep_get_by_sleep_id_unauthorized() {
  it("gets a sleep instance when given a sleep id", async () => {
    await create_user();
    const { token } = await login_user();
    const created_sleep = await create_sleep(token);

    const res = await request(app).get(`/api/sleep/${created_sleep._id}`);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Token expired");
  });
});

describe("POST /api/sleep/users/:username", function test_sleep_get_all_by_username_sucess() {
  it("gets all sleep instances when given a username", async () => {
    await create_user();
    const { token } = await login_user();
    const created_sleep = await create_sleep(token);

    const res = await request(app)
      .get(`/api/sleep/${created_sleep._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(created_sleep);
  });
});

describe("POST /api/sleep/users/:username", function test_sleep_get_all_by_username_unauthorized() {
  it("gets all sleep instances when given a username", async () => {
    await create_user();
    const { token } = await login_user();
    const created_sleep = await create_sleep(token);

    const res = await request(app).get(`/api/sleep/${created_sleep._id}`);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Token expired");
  });
});

describe("PATCH /api/sleep/:sleep_id", function test_sleep_update_by_sleep_sleep_id_success() {
  it("updates the sleep_start or the sleep_stop of a sleep instance", async () => {
    await create_user();
    const { token } = await login_user();
    const created_sleep = await create_sleep(token);

    const res = await request(app)
      .patch(`/api/sleep/${created_sleep._id}`)
      .send({
        sleep_start: "2022-10-22T02:58:31.215Z",
      })
      .set("Authorization", `Bearer ${token}`);

    // Get the update sleep document
    const updated_sleep = await Sleep.findById(created_sleep._id).exec();

    expect(res.statusCode).toBe(200);
    expect(updated_sleep.sleep_start.toISOString()).toBe(
      "2022-10-22T02:58:31.215Z"
    );
  });
});

describe("PATCH /api/sleep/:sleep_id", function test_sleep_update_by_sleep_sleep_id_not_found() {
  it("tries to update a sleep instance that does not exist", async () => {
    await create_user();
    const { token } = await login_user();
    const created_sleep = await create_sleep(token);

    const res = await request(app)
      .patch(`/api/sleep/${reverse_string(created_sleep._id)}`)
      .send({
        sleep_start: "2022-10-22T02:58:31.215Z",
      })
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toEqual("Sleep with given ID not found");
  });
});

describe("PATCH /api/sleep/:sleep_id", function test_sleep_update_by_sleep_id_unauthorized() {
  it("tries to update a sleep instance but is unauthorized", async () => {
    await create_user();
    const { token } = await login_user();
    const created_sleep = await create_sleep(token);

    const res = await request(app)
      .patch(`/api/sleep/${reverse_string(created_sleep._id)}`)
      .send({
        sleep_start: "2022-10-22T02:58:31.215Z",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Token expired");
  });
});

describe("DELETE /api/sleep/:sleep_id", function test_sleep_delete_by_sleep_id_success() {
  it("deletes a sleep instance", async () => {
    await create_user();
    const { token } = await login_user();
    const { _id } = await create_sleep(token);

    const res = await request(app)
      .delete(`/api/sleep/${_id}`)
      .set("Authorization", `Bearer ${token}`);

    // Try to get deleted document
    const deleted_sleep = await Sleep.findById(_id).exec();

    expect(res.statusCode).toBe(200);
    expect(deleted_sleep).toBe(null);
  });
});

describe("DELETE /api/sleep/:sleep_id", function test_sleep_delete_by_sleep_id_unauthorized() {
  it("tries to delete a sleep instance but is unauthorized", async () => {
    await create_user();
    const { token } = await login_user();
    const { _id } = await create_sleep(token);

    const res = await request(app).delete(`/api/sleep/${reverse_string(_id)}`);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Token expired");
  });
});
