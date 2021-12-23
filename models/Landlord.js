const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LandlordSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  }
}, {
  timestamps: true
});

module.exports = Landlord = mongoose.model("landlords", LandlordSchema);
