// Load User model
const User = require("../models/User");
const Manager = require("../models/Manager");
const Landlord = require("../models/Landlord");
const Tenant = require("../models/Tenant");
const Property = require("../models/Property");
const validatePropertyInput = require("../validation/property");

exports.getProperties = (req, res) => {
  if (req.user.role === "manager") {
    Manager.findOne({ user_id: req.user.id }).populate("properties").then(manager => {
      if (!manager || !manager.properties)
        return res.status(400).json({ error: "Manager not found" });
      res.status(200).json(manager.properties);
    }).catch(err => {
      console.log(err);
      return res.status(400).json({ error: "Manager not found" });
    });
  }
  else if (req.user.role === "landlord") {
    //ping landlord's manager and get properties from there
  }
}

exports.createProperty = (req, res) => {
  const { errors, isValid } = validatePropertyInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Property.create({ name: req.body.name, manager_id: req.user.roleUser._id }).then(property => {
    Manager.updateOne({ user_id: req.user.id }, { "$push": { properties: property.id } }/*, { new: true }*/)/*.populate("properties")*/.then(() => {
      res.status(200).json(property);
    }).catch(err => console.log(err));
  }).catch(err => console.log(err));
};
