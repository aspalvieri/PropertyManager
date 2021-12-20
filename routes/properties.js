const express = require("express");
const router = express.Router();
const auth = require("../middleware/authorize");
const authRole = require("../middleware/authRole");

//Controller
const propertiesController = require("../controllers/propertiesController");

//Routes
router.get("/", auth, authRole.landlord, propertiesController.getProperties);
router.post("/", auth, authRole.manager, propertiesController.createProperty);

module.exports = router;
