const mongoose = require("mongoose");
const formatCustomDate = require("../utlis/orderController");
const mediaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  upload: {
    type: Object,
    default: formatCustomDate,
  },
  type: {
    type: String,
    required: true,
  },
}, { timestamps: false });

// Export model
module.exports = mongoose.model("Media", mediaSchema);