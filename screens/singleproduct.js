const Product = require("../models/product-model");

const getSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    next({
      status: 500,
      message: "Something went wrong",
      extraMessage: error.message,
    });
  }
};

module.exports = getSingleProduct;