const ROLES = require("../models/Roles");

const roleExists = (role) => {
  return ROLES.includes(role);
};

exports.manager = (req, res, next) => {
  if (!req.user.role || !roleExists(req.user.role) || req.user.role !== "manager")
    return res.status(403).json({ error: "Invalid authorization role" });
  return next();
};

exports.landlord = (req, res, next) => {
  if (!req.user.role || !roleExists(req.user.role) || (req.user.role !== "manager" && req.user.role !== "landlord"))
    return res.status(403).json({ error: "Invalid authorization role" });
  return next();
};

exports.tenant = (req, res, next) => {
  if (!req.user.role || !roleExists(req.user.role) || (req.user.role !== "manager" && req.user.role !== "landlord" && req.user.role !== "tenant"))
    return res.status(403).json({ error: "Invalid authorization role" });
  return next();
};
