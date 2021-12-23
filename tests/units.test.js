const chai = require("chai")
const chaiHttp = require("chai-http");
const expect = chai.expect;
const { app } = require("../app");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Manager = require("../models/Manager");
const Property = require("../models/Property");
const Unit = require("../models/Unit");
const mongoose = require("mongoose");

chai.use(chaiHttp);
//Useful functions: before, beforeEach, after, afterEach
//To set auth header put .auth(token, { type: "bearer" })  before the send

describe("/units", () => {
  let user, token, property;
  before((done) => {
    chai.request(app).post("/api/users/login")
      .send({ username: "test@test.com", password: "123456" })
      .end((err, res) => {
        token = res.body.token.split(" ")[1];
        user = jwt.verify(token, process.env.secret);
        chai.request(app).post("/api/properties")
          .auth(token, { type: "bearer" })
          .send({ name: "Unit Test Property" })
          .end((err, res) => {
            property = res.body;
            done();
          });
      });
  });
  describe("POST /", () => {
    it("it should NOT create new unit (invalid name)", (done) => {
      chai.request(app).post("/api/units")
      .auth(token, { type: "bearer" })
      .send({ id: property._id, name: " " })
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.body.name).to.eq("Name field is required");
        done();
      });
    });
    it("it should NOT create new unit (invalid property ID)", (done) => {
      chai.request(app).post("/api/units")
      .auth(token, { type: "bearer" })
      .send({ id: new mongoose.Types.ObjectId(), name: " " })
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.body.name).to.eq("Name field is required");
        done();
      });
    });
    it("it should create new unit (Test Unit)", (done) => {
      chai.request(app).post("/api/units")
      .auth(token, { type: "bearer" })
      .send({ id: property._id, name: "Test Unit" })
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
    });
  });
  describe("GET /", () => {
    it("it should return all units", (done) => {
      chai.request(app).get("/api/units")
      .auth(token, { type: "bearer" })
      .query({ id: property._id })
      .end((err, res) => {
        expect(res.status).to.eq(200);
        //Expect the properties we got to equal the ones we actually have
        Property.findOne({ _id: property._id, manager_id: user.roleUser._id }).then(property => {
          expect(res.body.length).to.eq(property.units.length);
          done();
        });
      });
    });
  });
});
