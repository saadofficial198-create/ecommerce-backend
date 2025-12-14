const Product = require("../models/product-model");

const allProducts = async (req, res, next) => {
  try {
    const products = await Product.find(); // <-- sari products nikal layga
    res.status(200).json(products); // front-end ko data bhej dega
  } catch (error) {
    next({
      status: 500,
      message: "Something went wrong",
      extraMessage: error.message,
    });
  }
};

module.exports = allProducts;