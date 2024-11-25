const mongoose = require("mongoose");

const residentialSchema = new mongoose.Schema(
  {
    location: { type: String, required: true },
    price: { type: Number, required: true },
    availability: {
      type: String,
      enum: ["available", "not available"],
      default: "available",
    },
    category: {
      type: String,
      enum: ["agricultural", "commercial", "residential"],
      required: true,
    },
    status: {
      type: String,
      enum: ["for sale", "not for sale"],
      required: true,
    },
  },
  { timestamps: true }
);

const Residential = mongoose.model("Residential", residentialSchema);

module.exports = Residential;
