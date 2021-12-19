const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TenantSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = Tenant = mongoose.model("tenants", TenantSchema);
