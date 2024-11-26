const mongoose = require("mongoose");

const commercialSchema = new mongoose.Schema(
  {
    location: { type: String, required: true },
    price: { type: String, required: true },
    availability: {
      type: String,
      enum: ["available", "not available"],
      default: "available",
    },
    category: {
      type: String,
      enum: ["agricultural", "residential", "commercial"],
      required: true,
    },
    status: {
      type: String,
      enum: ["for sale", "not for sale"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Commercial = mongoose.model("Commercial", commercialSchema);

module.exports = Commercial;