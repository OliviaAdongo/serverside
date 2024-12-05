const mongoose = require("mongoose");

const landSchema = new mongoose.Schema(
  {
    images: {
      type: [String],
      validate: {
        validator: (arr) => arr.length >= 1 && arr.length <= 10,
        message: "You must provide between 1 and 10 images.",
      },
    },
    location: { type: String, required: true },
    price: { type: String, required: true },
    availability: {
      type: String,
      enum: ["Available", "Not Available"],
      default: "Available",
    },
    category: {
      type: String,
      enum: ["Land", "Commercial", "Residential"],
      required: true,
    },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["For Sale", "For Rent"],
      required: true,
    },
  },
  { timestamps: true }
);

const Land = mongoose.model("Land", landSchema);

module.exports = Land;
