// Our Express app module
const express = require('express');
const app = express();

// Importing the pageRoutes
const userRoutes = require("./users");
const propertyRoutes = require("./properties");
const unitRoutes = require("./units");

// Registering our routes
app.use("/users", userRoutes);
app.use("/properties", propertyRoutes);
app.use("/units", unitRoutes);

// Exporting the changes
module.exports = app;
