//Require tests in the order of execution
describe("/api", () => {
  require("./users.test");
  require("./properties.test");
});
