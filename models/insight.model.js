const mongoose = require("mongoose");

const InsightSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Please enter image name"],
    },
    content: {
      type: String,
      required: true,
      default: 0,
    }
  },

  { 
    timestamps: true 
}
);

const Insight = mongoose.model("Product", InsightSchema);

module.exports = Insight;