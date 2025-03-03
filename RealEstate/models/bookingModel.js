const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
  requestedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", bookingSchema);
