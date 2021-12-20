const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PropertySchema = new Schema({
  name: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = Property = mongoose.model("properties", PropertySchema);
