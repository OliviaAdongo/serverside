const mongoose = require("mongoose");

const InsightSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Please enter image name"],
    },

    title: {
      type: String,
      required: true,
      default: 0,
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

const Insight = mongoose.model("Insight", InsightSchema);

module.exports = Insight;