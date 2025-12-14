const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  color: String,
  colorCode: String,
  size: String,
  stock: Number,
  price: Number,
  image: String,
});


const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  image: { type: String },
  description: { type: String, required: true },
  variants: [variantSchema],
  price: { type: Number },
  stock: { type: Number },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
