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
    propertyname: { type: String, required: false },
    size: { type: String, required: false },
    price: { type: String, required: true },
    availability: {
      type: String,
      enum: ["Available", "Not Available"],
      default: "Available",
    },
    category: {
      type: String,
      enum: ["Land"],
      required: true,  
    }, 
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["For Sale", "For Rent"],
      required: true,
    }, 
    amenities: { type: [String],
    
       required: false},
   agent: { type: String,
    // enum: ["SolidRoots Properties"],
     required: false },
  },
  { timestamps: true }
);

const Land = mongoose.model("Land", landSchema);

module.exports = Land;
