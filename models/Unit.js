const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UnitSchema = new Schema({
  property_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "properties",
    required: true
  },
  name: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = Unit = mongoose.model("units", UnitSchema);
