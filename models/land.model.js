const mongoose = require("mongoose");

const landSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    location: { type: String, required: true },
    price: { type: String, required: true },
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

const Land = mongoose.model("Land", landSchema);

module.exports = Land;
