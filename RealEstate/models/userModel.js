const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ["buyer", "seller"], required: true },
  profilePic: { type: String, default: "" }, // ✅ Add this
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
