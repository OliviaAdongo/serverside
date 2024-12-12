const mongoose = require("mongoose");

const commercialSchema = new mongoose.Schema(
  {
    images: {
      type: [String],
      validate: {
        validator: (arr) => arr.length >= 1 && arr.length <= 10,
        message: "You must provide between 1 and 10 images.",
      },
    },
    location: { type: String, required: true },
    propertyname: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: String, required: true },
    availability: {
      type: String,
      enum: ["Available", "Not Available"],
      default: "Available",
    }, 
    category: {
      type: String,
      enum: ["Commercial"],
      required: true,
    },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["For Sale", "For Rent"],
      required: true,
    },
    agent: { type: String, required: true },
    amenities: { type: [String], required: true },
  },
  { timestamps: true }
);

const Commercial = mongoose.model("Commercial", commercialSchema);

module.exports = Commercial;
