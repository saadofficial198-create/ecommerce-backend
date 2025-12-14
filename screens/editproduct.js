const Product = require("../models/product-model");
const mongoose = require("mongoose");

const EditProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    if (!req.body) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    const { name, description, price, image } = req.body;

    if (!name || !description || !price || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, image },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    next({
      status: 500,
      message: "Something went wrong",
      extraMessage: error.message,
    });
  }
};

module.exports = EditProduct;
