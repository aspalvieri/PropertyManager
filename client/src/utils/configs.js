const VERSION = "0.0.3"; //Change this to force-log everyone

const configs = {
  test: {
    SERVER_URI: "http://localhost:5000",
    VERSION
  },
  development: {
    //SERVER_URI: "http://localhost:5000",
    SERVER_URI: "http://192.168.0.15:5000",
    VERSION
  },
  production: {
    SERVER_URI: "http://localhost:5000",
    VERSION
  },
};

module.exports.config = configs[process.env.NODE_ENV];
