// Load User model
const User = require("../models/User");
const Manager = require("../models/Manager");
const Landlord = require("../models/Landlord");
const Tenant = require("../models/Tenant");
const Property = require("../models/Property");
const Unit = require("../models/Unit");
const validateUnitInput = require("../validation/unit");

exports.getUnits = (req, res) => {
  if (req.user.role === "manager") {
    Property.findOne({ _id: req.query.id, manager_id: req.user.roleUser._id }).populate("units").then(property => {
      if (!property || !property.units)
        return res.status(404).json({ error: "Property not found" });
      return res.status(200).json(property.units);
    }).catch(err => {
      console.log(err);
      return res.status(404).json({ error: "Property not found" });
    });
  }
  else if (req.user.role === "landlord") {
    //ping landlord's manager and get properties from there
  }
}

exports.createUnit = (req, res) => {
  const { errors, isValid } = validateUnitInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Unit.create({ property_id: req.body.id, name: req.body.name }).then(unit => {
    Property.updateOne({ _id: req.body.id, manager_id: req.user.roleUser._id }, { "$push": { units: unit.id } }/*, { new: true }*/)/*.populate("properties")*/.then(() => {
      res.status(200).json(unit);
    }).catch(err => console.log(err));
  }).catch(err => console.log(err));
};
