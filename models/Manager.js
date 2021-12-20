const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ManagerSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  properties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "properties"
    }
  ]
}, {
  timestamps: true
});

module.exports = Manager = mongoose.model("managers", ManagerSchema);
