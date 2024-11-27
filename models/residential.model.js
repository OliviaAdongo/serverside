const mongoose = require("mongoose");

const residentialSchema = new mongoose.Schema(
  {
    location: { type: String, required: true },
    price: { type: String, required: true },
    availability: {
      type: String,
      enum: ["Available", "Not Available"],
      default: "Available",
    },
    category: {
      type: String,
      enum: ["Commercial", "Residential"],
      required: true,
    },
    status: {
      type: String,
      enum: ["For Sale", "For Rent"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Residential = mongoose.model("Residential", residentialSchema);

module.exports = Residential;
