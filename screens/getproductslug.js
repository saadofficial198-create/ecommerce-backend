const Product = require("../models/product-model");

const getProductSlug = async (req, res, next) => {
try {
    const slug = req.params.slug;
    const product = await Product.findOne({ slug });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = getProductSlug;