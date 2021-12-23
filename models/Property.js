const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PropertySchema = new Schema({
  manager_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "managers",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  units: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "units"
    }
  ]
}, {
  timestamps: true
});

module.exports = Property = mongoose.model("properties", PropertySchema);
