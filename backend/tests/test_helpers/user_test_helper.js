const request = require("supertest");
const app = require("../../app");

async function create_user() {
  await request(app).post("/api/user/signup").send({
    first_name: "Gideon",
    last_name: "Asante",
    username: "gasante",
    email: "gasante@gmail.com",
    password: "test123",
  });
}

async function login_user() {
  const res = await request(app).post("/api/user/login").send({
    username: "gasante",
    password: "test123",
  });
  return res.body;
}

module.exports = { create_user, login_user };
