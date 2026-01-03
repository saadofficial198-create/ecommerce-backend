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
  createdAtFormatted: {
    type: Object,
    default: formatCustomDate,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    required: true,
  },
}, { timestamps: false });

// Export model
const mediaModel = mongoose.model("Media", mediaSchema);

module.exports = mediaModel;