const mongoose = require("mongoose");

const commercialSchema = new mongoose.Schema(
  {
    location: { type: String, required: true },
    price: { type: String, required: true },
    availability: {
      type: String,
      enum: ["Available", "Not Available"],
      default: "available",
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

const Commercial = mongoose.model("Commercial", commercialSchema);

module.exports = Commercial;