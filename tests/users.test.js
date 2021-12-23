const chai = require("chai")
const chaiHttp = require("chai-http");
const expect = chai.expect;
const { app } = require("../app");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Manager = require("../models/Manager");
const Property = require("../models/Property");
const Unit = require("../models/Unit");

chai.use(chaiHttp);
//Useful functions: before, beforeEach, after, afterEach
//To set auth header put .auth(token, { type: "bearer" })  before the send

describe("/users", () => {
  before((done) => {
    User.deleteMany({}, (err) => {
      Manager.deleteMany({}, (err) => {
        Property.deleteMany({}, (err) => {
          Unit.deleteMany({}, (err) => {
            done();
          });
        });
      });
    });
  });
  describe("POST /register", () => {
    it("it should create a new user (test@test.com)", (done) => {
      let user = {
        email: "test@test.com",
        password: "123456",
        password2: "123456"
      };
      chai.request(app).post("/api/users/register")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
    });
    it("it should NOT create a new user (email already exists)", (done) => {
      let user = {
        email: "test@test.com",
        password: "123456",
        password2: "123456"
      };
      chai.request(app).post("/api/users/register")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.body.email).to.eq("User already exists!");
        done();
      });
    });
    it("it should NOT create a new user (password too short)", (done) => {
      let user = {
        email: "test@test.com",
        password: "12345",
        password2: "12345"
      };
      chai.request(app).post("/api/users/register")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.body.password).to.eq("Password must be at least 6 characters");
        done();
      });
    });
  });
  describe("POST /login", () => {
    it("it should NOT login user (password incorrect)", (done) => {
      let user = {
        username: "test@test.com",
        password: "abcdef"
      };
      chai.request(app).post("/api/users/login")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.eq(400);
        expect(res.body.passwordincorrect).to.eq("Password incorrect");
        done();
      });
    });
    it("it should NOT login user (user not found)", (done) => {
      let user = {
        username: "test2@test.com",
        password: "123456"
      };
      chai.request(app).post("/api/users/login")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.eq(404);
        expect(res.body.usernotfound).to.eq("User not found");
        done();
      });
    });
    it("it should login user (test@test.com)", (done) => {
      let user = {
        username: "test@test.com",
        password: "123456"
      };
      chai.request(app).post("/api/users/login")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        expect(res.body.token.startsWith("Bearer ")).to.be.true;
        const user = jwt.verify(res.body.token.split(" ")[1], process.env.secret);
        expect(user.username).to.eq("test@test.com");
        //expect(user.roleUser.user_id).to.eq(user.id);
        done();
        /*
        Property.create({ name: "Test Property" }).then(prop => {
          console.log(prop);
          Manager.findOneAndUpdate({ user_id: user.id }, { "$push": { properties: prop.id } }, { new: true }).then(() => {
            Manager.findOneAndUpdate({ user_id: user.id }, { "$push": { properties: prop.id } }, { new: true }).populate("properties").then(manager => {
              console.log(manager);
              done();
            });
          });
        });
        */
      });
    });
  });
});
