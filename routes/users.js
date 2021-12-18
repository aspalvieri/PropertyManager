const express = require("express");
const router = express.Router();
const auth = require("../middleware/authorize");
const authRole = require("../middleware/authRole");

//Controller
const usersController = require("../controllers/usersController");

//Routes
router.post("/register", usersController.register);
router.post("/login", usersController.login);
//router.get("/", auth, authRole.manager, usersController.TEST_self);

module.exports = router;
