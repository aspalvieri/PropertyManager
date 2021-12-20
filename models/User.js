const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ROLES = require("./Roles");

// Create Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ROLES,
    required: true
  }
}, {
  timestamps: true
});

module.exports = User = mongoose.model("users", UserSchema);
