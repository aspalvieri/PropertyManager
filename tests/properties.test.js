const chai = require("chai")
const chaiHttp = require("chai-http");
const expect = chai.expect;
const { app } = require("../app");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Manager = require("../models/Manager");
const Property = require("../models/Property");

chai.use(chaiHttp);
//Useful functions: before, beforeEach, after, afterEach
//To set auth header put .auth(token, { type: "bearer" })  before the send

describe("/properties", () => {
  let user, token;
  before((done) => {
    chai.request(app).post("/api/users/login")
      .send({ username: "test@test.com", password: "123456" })
      .end((err, res) => {
        token = res.body.token.split(" ")[1];
        user = jwt.verify(token, process.env.secret);
        done();
      });
  });
  describe("POST /", () => {
    it("it should NOT create new property (invalid name)", (done) => {
      chai.request(app).post("/api/properties")
      .auth(token, { type: "bearer" })
      .send({ name: " " })
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.body.name).to.eq("Name field is required");
        done();
      });
    });
    it("it should create new property (Test Property)", (done) => {
      chai.request(app).post("/api/properties")
      .auth(token, { type: "bearer" })
      .send({ name: "Test Property" })
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
    });
    it("it should create new property (Test Property)", (done) => {
      chai.request(app).post("/api/properties")
      .auth(token, { type: "bearer" })
      .send({ name: "Test Property" })
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
    });
  });
  describe("GET /", () => {
    it("it should return all properties", (done) => {
      chai.request(app).get("/api/properties")
      .auth(token, { type: "bearer" })
      .send()
      .end((err, res) => {
        expect(res.status).to.eq(200);
        //Expect the properties we got to equal the ones we actually have
        Manager.findOne({ user_id: user.id }).then(manager => {
          expect(res.body.length).to.eq(manager.properties.length);
          done();
        });
      });
    });
  });
});
