const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const { create_user } = require("./test_helpers/user_test_helper");
const User = require("../src/models/user_models");
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
});

afterEach(async function () {
  await mongoose.connection.db.dropCollection("sleep_tracker_users");
  //   await mongoose.connection.db.dropCollection("sleep_tracker_sleeps");
  await mongoose.connection.close();
});

describe("POST /api/user/signup", function test_user_signup_success() {
  it("should create a new user", async () => {
    const res = await request(app).post("/api/user/signup").send({
      first_name: "Gideon",
      last_name: "Asante",
      username: "gasante",
      email: "gasante@gmail.com",
      password: "test123",
    });
    // Query to get the created user from the database
    const created_user = await User.findOne({ username: "gasante" }).exec();

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User created successfully");
    expect(created_user.first_name).toBe("Gideon");
    expect(created_user.last_name).toBe("Asante");
    expect(created_user.username).toBe("gasante");
    expect(created_user.email).toBe("gasante@gmail.com");
  });
});

describe("POST /api/user/signup", function test_user_signup_already_exists() {
  it("try to create a user but return an error since user alredy exists", async () => {
    await create_user();

    const res = await request(app).post("/api/user/signup").send({
      first_name: "Gideon",
      last_name: "Asante",
      username: "gasante",
      email: "gasante@gmail.com",
      password: "test123",
    });
    expect(res.statusCode).toBe(400);
  });
});

describe("POST /api/user/login", function test_user_login_success() {
  it("should login the user", async () => {
    await create_user();

    const res = await request(app).post("/api/user/login").send({
      username: "gasante",
      password: "test123",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeTruthy();
  });
});

describe("POST /api/user/login", function test_user_login_not_found() {
  it("should try to login with an unregistered username", async () => {
    await create_user();
    const res = await request(app).post("/api/user/login").send({
      username: "gasantes",
      password: "test123",
    });
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("User does not exist");
  });
});

describe("POST /api/user/login", function test_user_login_wrong_credentials() {
  it("should try to login with the wrong password for a registered user", async () => {
    await create_user();

    const res = await request(app).post("/api/user/login").send({
      username: "gasante",
      password: "test1234",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      "Either the username or password is incorrect"
    );
  });
});
