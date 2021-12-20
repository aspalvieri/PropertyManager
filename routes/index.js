// Our Express app module
const express = require('express');
const app = express();

// Importing the pageRoutes
const userRoutes = require("./users");
const propertyRoutes = require("./properties");

// Registering our routes
app.use("/users", userRoutes);
app.use("/properties", propertyRoutes);

// Exporting the changes
module.exports = app;
