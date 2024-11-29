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
      enum: ["Available", "Not Available"],
      default: "available",
    },
    category: {
      type: String,
      enum: ["Agricultural", "Commercial", "residentialpropertyesidential"],
      required: true,
    },
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
