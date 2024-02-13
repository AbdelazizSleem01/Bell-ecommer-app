import mongoose from "mongoose";

const googleSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  authSource: {
    type: String,
    enum: ["self", "google"],
    default: "self",
  },
});

module.exports = mongoose.model("User", googleSchema);
