const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ManagerSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = Manager = mongoose.model("managers", ManagerSchema);
