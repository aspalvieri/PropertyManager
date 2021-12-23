const express = require("express");
const router = express.Router();
const auth = require("../middleware/authorize");
const authRole = require("../middleware/authRole");

//Controller
const unitsController = require("../controllers/unitsController");

//Routes
router.get("/", auth, authRole.landlord, unitsController.getUnits);
router.post("/", auth, authRole.manager, unitsController.createUnit);

module.exports = router;
