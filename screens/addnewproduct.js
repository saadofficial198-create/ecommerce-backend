const Product = require("../models/product-model");

const addNewProduct = async (req, res, next) => {
  try {
    console.log("REQ BODY:", req.body);

    const { name, description, price, image, stock, variants } = req.body;

    // Slug no same
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')       // Replace spaces with -
      .replace(/[^\w\-]+/g, '')   // Remove special chars
      .replace(/\-\-+/g, '-')     // Replace multiple dashes
      .replace(/^-+/, '')         // Trim - from start
      .replace(/-+$/, '');        // Trim - from end

    const addNewProduct = {
      name,
      slug,
      description,
    };
    const exitingProduct = await Product.findOne({ slug });

    if (exitingProduct) {
      return next({ status: 400, message: "Product Name Already exists." });
    } else if (variants && variants.length > 0) {
      if (!variants[0].image) {
        return next({ status: 400, message: "First variant image required" });
      }
      addNewProduct.variants = variants;
    } else {
      addNewProduct.price = price;
      addNewProduct.stock = stock;
      addNewProduct.image = image;
    }


    await Product.create(addNewProduct);

    res.status(201).json({ message: "Product Created Successfully" });
  } catch (error) {
    next({
      status: 500,
      extraMessage: "Something went wrong",
      message: error.message,
    });
  }
};

module.exports = addNewProduct;
